import { QuickJSWrongOwner } from "./errors"
import { Lifetime } from "./lifetime"
import type { QuickJSHandle } from "./types"

export type OwnedValueId = number
export type SlotId = number

export const DEFAULT_JS_VALUE_BANK = "jsValue" as const
export type DefaultJSValueBank = typeof DEFAULT_JS_VALUE_BANK

export interface ValueRef<TBank extends string = string> {
  bank: TBank
  valueId: OwnedValueId
}

export function valueRef<TBank extends string>(bank: TBank, valueId: OwnedValueId): ValueRef<TBank> {
  return { bank, valueId }
}

type SlotResolver<TBank extends string> = (ref: ValueRef<TBank>) => SlotId

/**
 * Planner command representation.
 *
 * `reads` and `writes` are logical values in specific slot banks. The planner
 * resolves those logical IDs to concrete slots at emit time.
 */
export interface Command<TOp = unknown, TBank extends string = string> {
  op: TOp
  reads: readonly ValueRef<TBank>[]
  writes?: readonly ValueRef<TBank>[]
  isBarrier?: boolean
  label?: string
}

/**
 * Hypothetical command execution interface used by the planner.
 */
export interface QuickJSBatchDriver<TOp = unknown, TBank extends string = string, ParkedAlias = unknown> {
  readonly slotBanks: readonly TBank[]
  readonly commandCapacity: number

  getSlotCapacity(bank: TBank): number

  emit(command: Command<TOp, TBank>, resolveSlot: SlotResolver<TBank>, indexInBatch: number): void
  emitFree(bank: TBank, slot: SlotId, indexInBatch: number): void
  executeBatch(commandCount: number): number

  getSlot(bank: TBank, slot: SlotId): ParkedAlias
  setSlot(bank: TBank, slot: SlotId, alias: ParkedAlias): void
}

export interface InitialValueBinding<TBank extends string = string, ParkedAlias = unknown> {
  ref: ValueRef<TBank>
  slot?: SlotId
  parkedAlias?: ParkedAlias
  retained?: boolean
}

export interface ExecuteCommandPlanOptions<TBank extends string = string, ParkedAlias = unknown> {
  retainedRefs?: Iterable<ValueRef<TBank>>
  initialValues?: ReadonlyArray<InitialValueBinding<TBank, ParkedAlias>>
  enableFastPath?: boolean
}

export interface ExecuteCommandPlanResult<TBank extends string = string> {
  commandsExecuted: number
  batchesExecuted: number
  peakResidentValues: number
  usedFastPath: boolean
  residentSlotByBank: ReadonlyMap<TBank, ReadonlyMap<OwnedValueId, SlotId>>
}

export class QuickJSBatchExecutionError extends Error {
  name = "QuickJSBatchExecutionError"

  constructor(args: {
    message: string
    failedCommandIndex: number
    batchIndex: number
    executedInBatch: number
    attemptedInBatch: number
  }) {
    super(args.message)
    this.failedCommandIndex = args.failedCommandIndex
    this.batchIndex = args.batchIndex
    this.executedInBatch = args.executedInBatch
    this.attemptedInBatch = args.attemptedInBatch
  }

  failedCommandIndex: number
  batchIndex: number
  executedInBatch: number
  attemptedInBatch: number
}

type PlannerValueState<ParkedAlias> = {
  remainingReads: number
  retained: boolean
  residentSlot: number
  parkedAlias?: ParkedAlias
  freed: boolean
  written: boolean
}

type PlannerBankState<TBank extends string, ParkedAlias> = {
  bank: TBank
  slotCapacity: number
  slotToValue: Int32Array
  values: PlannerValueState<ParkedAlias>[]
  remainingReads: Int32Array
  retainedFlags: Uint8Array
  initialWritten: Uint8Array
  pinEpochByValue: Uint32Array
  pinEpoch: number
}

type PlannerBankAnalysis<TBank extends string> = {
  bank: TBank
  slotCapacity: number
  remainingReads: Int32Array
  retainedFlags: Uint8Array
  initialWritten: Uint8Array
  initialSlotOwner: Int32Array
}

function createDenseArray<T>(length: number, factory: () => T): T[] {
  const arr = new Array<T>(length)
  for (let i = 0; i < length; i++) {
    arr[i] = factory()
  }
  return arr
}

function estimatePeakResidentForBank<TOp, TBank extends string>(
  commands: readonly Command<TOp, TBank>[],
  bank: TBank,
  retained: Uint8Array,
  remainingReads: Int32Array,
  initialWritten: Uint8Array,
): number {
  if (remainingReads.length === 0) {
    return 0
  }

  const workingReads = new Int32Array(remainingReads)
  const live = new Uint8Array(remainingReads.length)

  let liveCount = 0
  let peak = 0

  for (let id = 0; id < live.length; id++) {
    if (initialWritten[id] === 1 && (workingReads[id] > 0 || retained[id] === 1)) {
      live[id] = 1
      liveCount++
    }
  }

  peak = liveCount

  for (const command of commands) {
    if (command.writes) {
      for (const write of command.writes) {
        if (write.bank !== bank) {
          continue
        }
        if (live[write.valueId] === 0) {
          live[write.valueId] = 1
          liveCount++
        }
      }
    }

    for (const read of command.reads) {
      if (read.bank !== bank) {
        continue
      }
      workingReads[read.valueId] -= 1
      if (workingReads[read.valueId] === 0 && retained[read.valueId] === 0 && live[read.valueId] === 1) {
        live[read.valueId] = 0
        liveCount--
      }
    }

    if (liveCount > peak) {
      peak = liveCount
    }
  }

  return peak
}

function assertRefHasKnownBank<TBank extends string>(
  ref: ValueRef<TBank>,
  bankIndexByName: Map<TBank, number>,
): number {
  const bankIndex = bankIndexByName.get(ref.bank)
  if (bankIndex === undefined) {
    throw new Error(`Unknown slot bank: ${String(ref.bank)}`)
  }
  if (ref.valueId < 0) {
    throw new Error(`Invalid value id for bank ${String(ref.bank)}: ${ref.valueId}`)
  }
  return bankIndex
}

function assertRefInBounds<TBank extends string, ParkedAlias>(
  ref: ValueRef<TBank>,
  bankStates: readonly PlannerBankState<TBank, ParkedAlias>[],
  bankIndexByName: Map<TBank, number>,
): PlannerBankState<TBank, ParkedAlias> {
  const bankIndex = assertRefHasKnownBank(ref, bankIndexByName)
  const bankState = bankStates[bankIndex]
  if (ref.valueId >= bankState.values.length) {
    throw new Error(`Unknown value id ${ref.valueId} for bank ${String(ref.bank)}`)
  }
  return bankState
}

export function executeCommandPlan<TOp, TBank extends string, ParkedAlias>(
  commands: readonly Command<TOp, TBank>[],
  driver: QuickJSBatchDriver<TOp, TBank, ParkedAlias>,
  options: ExecuteCommandPlanOptions<TBank, ParkedAlias> = {},
): ExecuteCommandPlanResult<TBank> {
  const commandCapacity = driver.commandCapacity
  if (commandCapacity <= 0) {
    throw new Error(`Invalid command capacity: ${commandCapacity}`)
  }

  if (driver.slotBanks.length === 0) {
    throw new Error("At least one slot bank is required")
  }

  const bankList: TBank[] = []
  const bankIndexByName = new Map<TBank, number>()
  for (const bank of driver.slotBanks) {
    if (bankIndexByName.has(bank)) {
      continue
    }
    bankIndexByName.set(bank, bankList.length)
    bankList.push(bank)
  }

  const bankCount = bankList.length
  const maxValueIdByBank = new Int32Array(bankCount)
  maxValueIdByBank.fill(-1)

  const noteRef = (ref: ValueRef<TBank>) => {
    const bankIndex = assertRefHasKnownBank(ref, bankIndexByName)
    if (ref.valueId > maxValueIdByBank[bankIndex]) {
      maxValueIdByBank[bankIndex] = ref.valueId
    }
  }

  for (const command of commands) {
    for (const read of command.reads) {
      noteRef(read)
    }
    if (command.writes) {
      for (const write of command.writes) {
        noteRef(write)
      }
    }
  }

  const retainedRefs = [...(options.retainedRefs ?? [])]
  for (const retainedRef of retainedRefs) {
    noteRef(retainedRef)
  }

  for (const initial of options.initialValues ?? []) {
    noteRef(initial.ref)
  }

  const bankAnalysis = new Array<PlannerBankAnalysis<TBank>>(bankCount)
  for (let i = 0; i < bankCount; i++) {
    const bank = bankList[i]
    const slotCapacity = driver.getSlotCapacity(bank)
    if (slotCapacity <= 0) {
      throw new Error(`Invalid slot capacity for bank ${String(bank)}: ${slotCapacity}`)
    }

    const maxValueId = maxValueIdByBank[i]
    const length = maxValueId >= 0 ? maxValueId + 1 : 0

    const initialSlotOwner = new Int32Array(slotCapacity)
    initialSlotOwner.fill(-1)

    bankAnalysis[i] = {
      bank,
      slotCapacity,
      remainingReads: new Int32Array(length),
      retainedFlags: new Uint8Array(length),
      initialWritten: new Uint8Array(length),
      initialSlotOwner,
    }
  }

  for (const command of commands) {
    for (const read of command.reads) {
      const bankIndex = assertRefHasKnownBank(read, bankIndexByName)
      const analysis = bankAnalysis[bankIndex]
      analysis.remainingReads[read.valueId] += 1
    }
  }

  for (const retainedRef of retainedRefs) {
    const bankIndex = assertRefHasKnownBank(retainedRef, bankIndexByName)
    const analysis = bankAnalysis[bankIndex]
    analysis.retainedFlags[retainedRef.valueId] = 1
  }

  for (const initial of options.initialValues ?? []) {
    const bankIndex = assertRefHasKnownBank(initial.ref, bankIndexByName)
    const analysis = bankAnalysis[bankIndex]

    analysis.initialWritten[initial.ref.valueId] = 1

    if (initial.retained) {
      analysis.retainedFlags[initial.ref.valueId] = 1
    }

    if (initial.slot !== undefined) {
      if (initial.slot < 0 || initial.slot >= analysis.slotCapacity) {
        throw new Error(
          `Initial slot out of range in bank ${String(initial.ref.bank)}: ${initial.slot}`,
        )
      }
      if (analysis.initialSlotOwner[initial.slot] !== -1) {
        throw new Error(
          `Initial slot collision in bank ${String(initial.ref.bank)} at slot ${initial.slot}`,
        )
      }
      analysis.initialSlotOwner[initial.slot] = initial.ref.valueId
    }
  }

  const enableFastPath = options.enableFastPath ?? true
  let fitsFastPath = commands.length <= commandCapacity
  for (const analysis of bankAnalysis) {
    const estimatedPeak = estimatePeakResidentForBank(
      commands,
      analysis.bank,
      analysis.retainedFlags,
      analysis.remainingReads,
      analysis.initialWritten,
    )
    if (estimatedPeak > analysis.slotCapacity) {
      fitsFastPath = false
      break
    }
  }

  const usedFastPath = enableFastPath && fitsFastPath
  const allowParking = !usedFastPath

  const bankStates = new Array<PlannerBankState<TBank, ParkedAlias>>(bankCount)
  for (let i = 0; i < bankCount; i++) {
    const analysis = bankAnalysis[i]
    const slotToValue = new Int32Array(analysis.slotCapacity)
    slotToValue.fill(-1)

    const values = createDenseArray<PlannerValueState<ParkedAlias>>(
      analysis.remainingReads.length,
      () => ({
        remainingReads: 0,
        retained: false,
        residentSlot: -1,
        parkedAlias: undefined,
        freed: false,
        written: false,
      }),
    )

    for (let valueId = 0; valueId < values.length; valueId++) {
      const valueState = values[valueId]
      valueState.remainingReads = analysis.remainingReads[valueId]
      valueState.retained = analysis.retainedFlags[valueId] === 1
    }

    bankStates[i] = {
      bank: analysis.bank,
      slotCapacity: analysis.slotCapacity,
      slotToValue,
      values,
      remainingReads: analysis.remainingReads,
      retainedFlags: analysis.retainedFlags,
      initialWritten: analysis.initialWritten,
      pinEpochByValue: new Uint32Array(values.length),
      pinEpoch: 1,
    }
  }

  for (const initial of options.initialValues ?? []) {
    const bankState = assertRefInBounds(initial.ref, bankStates, bankIndexByName)
    const valueState = bankState.values[initial.ref.valueId]
    valueState.written = true

    if (initial.slot !== undefined) {
      valueState.residentSlot = initial.slot
      bankState.slotToValue[initial.slot] = initial.ref.valueId
    }

    if (initial.parkedAlias !== undefined) {
      valueState.parkedAlias = initial.parkedAlias
    }
  }

  let batchCount = 0
  let globalExecuted = 0
  let batchIndex = 0
  let peakResidentValues = 0

  const residentValueCount = () => {
    let n = 0
    for (const bankState of bankStates) {
      const slots = bankState.slotToValue
      for (let i = 0; i < slots.length; i++) {
        if (slots[i] !== -1) {
          n++
        }
      }
    }
    return n
  }

  const updatePeakResident = () => {
    const n = residentValueCount()
    if (n > peakResidentValues) {
      peakResidentValues = n
    }
  }

  const flushBatch = () => {
    if (batchCount === 0) {
      return
    }
    const attempted = batchCount
    const executed = driver.executeBatch(attempted)
    if (executed !== attempted) {
      throw new QuickJSBatchExecutionError({
        message: `Batch execution failed after ${executed}/${attempted} commands`,
        failedCommandIndex: globalExecuted + executed,
        batchIndex,
        executedInBatch: executed,
        attemptedInBatch: attempted,
      })
    }
    globalExecuted += attempted
    batchCount = 0
    batchIndex++
  }

  const ensureCommandCapacity = (needed: number) => {
    if (batchCount + needed > commandCapacity) {
      flushBatch()
    }
  }

  const clearResident = (
    bankState: PlannerBankState<TBank, ParkedAlias>,
    slot: number,
    valueId: number,
  ) => {
    bankState.slotToValue[slot] = -1
    bankState.values[valueId].residentSlot = -1
  }

  const emitFree = (bank: TBank, slot: number) => {
    ensureCommandCapacity(1)
    driver.emitFree(bank, slot, batchCount)
    batchCount++
  }

  const isPinned = (bankState: PlannerBankState<TBank, ParkedAlias>, valueId: number): boolean =>
    bankState.pinEpochByValue[valueId] === bankState.pinEpoch

  const advancePinEpoch = (bankState: PlannerBankState<TBank, ParkedAlias>) => {
    if (bankState.pinEpoch >= 0xfffffffe) {
      bankState.pinEpochByValue.fill(0)
      bankState.pinEpoch = 1
      return
    }
    bankState.pinEpoch += 1
  }

  const releaseDeadValue = (
    bankState: PlannerBankState<TBank, ParkedAlias>,
    valueId: number,
  ) => {
    const state = bankState.values[valueId]
    if (state.retained || state.freed || state.remainingReads > 0) {
      return
    }

    if (state.residentSlot < 0) {
      if (state.parkedAlias === undefined) {
        throw new Error(
          `Value ${valueId} in bank ${String(bankState.bank)} is dead but has no resident slot and no parked alias`,
        )
      }

      const restoreSlot = allocateSlot(bankState)
      driver.setSlot(bankState.bank, restoreSlot, state.parkedAlias)
      state.parkedAlias = undefined
      state.residentSlot = restoreSlot
      bankState.slotToValue[restoreSlot] = valueId
      updatePeakResident()
    }

    const slot = state.residentSlot
    emitFree(bankState.bank, slot)
    clearResident(bankState, slot, valueId)
    state.parkedAlias = undefined
    state.freed = true
  }

  const allocateSlot = (bankState: PlannerBankState<TBank, ParkedAlias>): number => {
    for (let slot = 0; slot < bankState.slotCapacity; slot++) {
      if (bankState.slotToValue[slot] === -1) {
        return slot
      }
    }

    for (let slot = 0; slot < bankState.slotCapacity; slot++) {
      const valueId = bankState.slotToValue[slot]
      if (valueId === -1 || isPinned(bankState, valueId)) {
        continue
      }
      const valueState = bankState.values[valueId]
      if (valueState.remainingReads === 0 && !valueState.retained && !valueState.freed) {
        releaseDeadValue(bankState, valueId)
        if (bankState.slotToValue[slot] === -1) {
          return slot
        }
      }
    }

    if (!allowParking) {
      throw new Error(`Out of slots (${bankState.slotCapacity}) in fast path for bank ${String(bankState.bank)}`)
    }

    let parkedCandidate = -1
    let evictCandidate = -1

    for (let slot = 0; slot < bankState.slotCapacity; slot++) {
      const valueId = bankState.slotToValue[slot]
      if (valueId === -1 || isPinned(bankState, valueId)) {
        continue
      }
      const valueState = bankState.values[valueId]
      if (valueState.parkedAlias !== undefined) {
        parkedCandidate = slot
        break
      }
      if (evictCandidate === -1) {
        evictCandidate = slot
      }
    }

    if (parkedCandidate !== -1) {
      const valueId = bankState.slotToValue[parkedCandidate]
      clearResident(bankState, parkedCandidate, valueId)
      return parkedCandidate
    }

    if (evictCandidate !== -1) {
      const valueId = bankState.slotToValue[evictCandidate]
      const alias = driver.getSlot(bankState.bank, evictCandidate)
      bankState.values[valueId].parkedAlias = alias
      clearResident(bankState, evictCandidate, valueId)
      return evictCandidate
    }

    throw new Error(`Out of slots (${bankState.slotCapacity}) with all values pinned in bank ${String(bankState.bank)}`)
  }

  const ensureResidentByBank = (
    bankState: PlannerBankState<TBank, ParkedAlias>,
    valueId: number,
  ): number => {
    const state = bankState.values[valueId]
    if (state.freed) {
      throw new Error(
        `Value ${valueId} in bank ${String(bankState.bank)} was already freed but is still referenced`,
      )
    }
    if (state.residentSlot >= 0) {
      return state.residentSlot
    }
    if (state.parkedAlias === undefined) {
      throw new Error(
        `Value ${valueId} in bank ${String(bankState.bank)} is not resident and has no parked alias`,
      )
    }

    const slot = allocateSlot(bankState)
    driver.setSlot(bankState.bank, slot, state.parkedAlias)
    state.parkedAlias = undefined
    state.residentSlot = slot
    bankState.slotToValue[slot] = valueId
    updatePeakResident()
    return slot
  }

  const ensureResident = (ref: ValueRef<TBank>): number => {
    const bankState = assertRefInBounds(ref, bankStates, bankIndexByName)
    return ensureResidentByBank(bankState, ref.valueId)
  }

  const resolveSlot: SlotResolver<TBank> = (ref) => {
    const bankState = assertRefInBounds(ref, bankStates, bankIndexByName)
    const state = bankState.values[ref.valueId]
    if (state.residentSlot < 0) {
      throw new Error(
        `Cannot resolve slot for non-resident value ${ref.valueId} in bank ${String(ref.bank)}`,
      )
    }
    return state.residentSlot
  }

  const postCommandReclaim = (ref: ValueRef<TBank>) => {
    const bankState = assertRefInBounds(ref, bankStates, bankIndexByName)
    const state = bankState.values[ref.valueId]
    if (state.remainingReads > 0 || state.retained || state.freed) {
      return
    }
    releaseDeadValue(bankState, ref.valueId)
  }

  const touchedBankIndexes: number[] = []
  const touchedBankMarks = new Uint8Array(bankCount)

  const markPinned = (ref: ValueRef<TBank>) => {
    const bankIndex = assertRefHasKnownBank(ref, bankIndexByName)
    const bankState = bankStates[bankIndex]
    if (ref.valueId >= bankState.values.length) {
      throw new Error(`Unknown value id ${ref.valueId} for bank ${String(ref.bank)}`)
    }

    if (touchedBankMarks[bankIndex] === 0) {
      touchedBankMarks[bankIndex] = 1
      touchedBankIndexes.push(bankIndex)
      advancePinEpoch(bankState)
    }

    bankState.pinEpochByValue[ref.valueId] = bankState.pinEpoch
  }

  for (const command of commands) {
    if (command.isBarrier && batchCount > 0) {
      flushBatch()
    }

    touchedBankIndexes.length = 0

    for (const read of command.reads) {
      markPinned(read)
    }
    if (command.writes) {
      for (const write of command.writes) {
        markPinned(write)
      }
    }

    for (const read of command.reads) {
      ensureResident(read)
    }

    if (command.writes) {
      for (const writeRef of command.writes) {
        const bankState = assertRefInBounds(writeRef, bankStates, bankIndexByName)
        const state = bankState.values[writeRef.valueId]

        if (state.written && state.residentSlot === -1 && state.parkedAlias === undefined) {
          throw new Error(
            `Command tried to rewrite value ${writeRef.valueId} in bank ${String(writeRef.bank)}, which is unsupported`,
          )
        }
        if (state.residentSlot >= 0 || state.parkedAlias !== undefined) {
          throw new Error(
            `Command writes value ${writeRef.valueId} in bank ${String(writeRef.bank)} that is already live`,
          )
        }

        const slot = allocateSlot(bankState)
        state.written = true
        state.residentSlot = slot
        bankState.slotToValue[slot] = writeRef.valueId
        updatePeakResident()
      }
    }

    ensureCommandCapacity(1)
    driver.emit(command, resolveSlot, batchCount)
    batchCount++

    for (const read of command.reads) {
      const bankState = assertRefInBounds(read, bankStates, bankIndexByName)
      const state = bankState.values[read.valueId]
      state.remainingReads -= 1
      if (state.remainingReads < 0) {
        throw new Error(
          `Read count for value ${read.valueId} in bank ${String(read.bank)} went negative`,
        )
      }
    }

    for (const read of command.reads) {
      postCommandReclaim(read)
    }
    if (command.writes) {
      for (const writeRef of command.writes) {
        postCommandReclaim(writeRef)
      }
    }

    if (command.isBarrier) {
      flushBatch()
    }

    for (const bankIndex of touchedBankIndexes) {
      touchedBankMarks[bankIndex] = 0
    }
  }

  for (const bankState of bankStates) {
    for (let valueId = 0; valueId < bankState.values.length; valueId++) {
      const valueState = bankState.values[valueId]
      if (!valueState.retained) {
        continue
      }
      if (!valueState.written) {
        throw new Error(`Retained value ${valueId} in bank ${String(bankState.bank)} was never written`)
      }
      ensureResidentByBank(bankState, valueId)
    }
  }

  flushBatch()

  const residentSlotByBank = new Map<TBank, Map<OwnedValueId, SlotId>>()
  for (const bankState of bankStates) {
    const slots = new Map<OwnedValueId, SlotId>()
    for (let valueId = 0; valueId < bankState.values.length; valueId++) {
      const slot = bankState.values[valueId].residentSlot
      if (slot >= 0) {
        slots.set(valueId, slot)
      }
    }
    residentSlotByBank.set(bankState.bank, slots)
  }

  return {
    commandsExecuted: globalExecuted,
    batchesExecuted: batchIndex,
    peakResidentValues,
    usedFastPath,
    residentSlotByBank,
  }
}

// -----------------------------------------------------------------------------
// Structured clone producer + caller
// -----------------------------------------------------------------------------

export type StructuredCloneOp =
  | { kind: "NEW_OBJECT" }
  | { kind: "NEW_ARRAY" }
  | { kind: "NEW_MAP" }
  | { kind: "NEW_SET" }
  | { kind: "NEW_DATE"; timestampMs: number }
  | { kind: "NEW_FLOAT64"; value: number }
  | { kind: "NEW_INT32"; value: number }
  | { kind: "NEW_BIGINT"; value: bigint }
  | { kind: "NEW_STRING"; value: string }
  | { kind: "NEW_BOOL"; value: boolean }
  | { kind: "NEW_NULL" }
  | { kind: "NEW_UNDEFINED" }
  | { kind: "LOAD_HANDLE"; handle: QuickJSHandle }
  | { kind: "SET_STR_VALUE"; key: string }
  | { kind: "SET_STR_NULL"; key: string }
  | { kind: "SET_STR_UNDEF"; key: string }
  | { kind: "SET_STR_BOOL"; key: string; value: boolean }
  | { kind: "SET_STR_INT32"; key: string; value: number }
  | { kind: "SET_STR_F64"; key: string; value: number }
  | { kind: "SET_STR_BIGINT"; key: string; value: bigint }
  | { kind: "SET_STR_STRING"; key: string; value: string }
  | { kind: "SET_IDX_VALUE"; index: number }
  | { kind: "SET_IDX_NULL"; index: number }
  | { kind: "SET_IDX_UNDEF"; index: number }
  | { kind: "SET_IDX_BOOL"; index: number; value: boolean }
  | { kind: "SET_IDX_INT32"; index: number; value: number }
  | { kind: "SET_IDX_F64"; index: number; value: number }
  | { kind: "SET_IDX_BIGINT"; index: number; value: bigint }
  | { kind: "SET_IDX_STRING"; index: number; value: string }
  | { kind: "MAP_SET" }
  | { kind: "SET_ADD" }

export interface StructuredCloneBuildOptions<TBank extends string = DefaultJSValueBank> {
  move?: boolean
  targetOwner?: unknown
  jsValueBank?: TBank
}

export interface StructuredClonePlan<TBank extends string = DefaultJSValueBank> {
  commands: Command<StructuredCloneOp, TBank>[]
  rootRef: ValueRef<TBank>
  rootValueId: OwnedValueId
  movedHandles: QuickJSHandle[]
}

type ContainerKind = "object" | "array" | "map" | "set"

type PendingContainer = {
  kind: ContainerKind
  input: object
  valueId: OwnedValueId
}

function isQuickJSHandleLike(value: unknown): value is QuickJSHandle {
  return value instanceof Lifetime
}

function isInt32(value: number): boolean {
  return Number.isInteger(value) && value >= -2147483648 && value <= 2147483647
}

function addCommand<TBank extends string>(
  commands: Command<StructuredCloneOp, TBank>[],
  op: StructuredCloneOp,
  reads: readonly ValueRef<TBank>[],
  write?: ValueRef<TBank>,
): void {
  commands.push({ op, reads, writes: write ? [write] : undefined })
}

function materializePrimitive<TBank extends string>(
  value: null | undefined | boolean | number | bigint | string,
  bank: TBank,
  nextValueId: () => number,
  commands: Command<StructuredCloneOp, TBank>[],
): OwnedValueId {
  const valueId = nextValueId()
  const write = valueRef(bank, valueId)

  if (value === null) {
    addCommand(commands, { kind: "NEW_NULL" }, [], write)
    return valueId
  }
  if (value === undefined) {
    addCommand(commands, { kind: "NEW_UNDEFINED" }, [], write)
    return valueId
  }
  if (typeof value === "boolean") {
    addCommand(commands, { kind: "NEW_BOOL", value }, [], write)
    return valueId
  }
  if (typeof value === "string") {
    addCommand(commands, { kind: "NEW_STRING", value }, [], write)
    return valueId
  }
  if (typeof value === "bigint") {
    addCommand(commands, { kind: "NEW_BIGINT", value }, [], write)
    return valueId
  }
  if (Number.isNaN(value) || !Number.isFinite(value)) {
    addCommand(commands, { kind: "NEW_FLOAT64", value }, [], write)
    return valueId
  }
  if (isInt32(value)) {
    addCommand(commands, { kind: "NEW_INT32", value }, [], write)
    return valueId
  }
  addCommand(commands, { kind: "NEW_FLOAT64", value }, [], write)
  return valueId
}

function emitInlineObjectSet<TBank extends string>(
  commands: Command<StructuredCloneOp, TBank>[],
  bank: TBank,
  targetValueId: OwnedValueId,
  key: string,
  value: unknown,
): boolean {
  const targetRef = valueRef(bank, targetValueId)

  if (value === null) {
    addCommand(commands, { kind: "SET_STR_NULL", key }, [targetRef])
    return true
  }
  if (value === undefined) {
    addCommand(commands, { kind: "SET_STR_UNDEF", key }, [targetRef])
    return true
  }
  if (typeof value === "boolean") {
    addCommand(commands, { kind: "SET_STR_BOOL", key, value }, [targetRef])
    return true
  }
  if (typeof value === "string") {
    addCommand(commands, { kind: "SET_STR_STRING", key, value }, [targetRef])
    return true
  }
  if (typeof value === "bigint") {
    addCommand(commands, { kind: "SET_STR_BIGINT", key, value }, [targetRef])
    return true
  }
  if (typeof value === "number") {
    if (isInt32(value)) {
      addCommand(commands, { kind: "SET_STR_INT32", key, value }, [targetRef])
    } else {
      addCommand(commands, { kind: "SET_STR_F64", key, value }, [targetRef])
    }
    return true
  }
  return false
}

function emitInlineArraySet<TBank extends string>(
  commands: Command<StructuredCloneOp, TBank>[],
  bank: TBank,
  targetValueId: OwnedValueId,
  index: number,
  value: unknown,
): boolean {
  const targetRef = valueRef(bank, targetValueId)

  if (value === null) {
    addCommand(commands, { kind: "SET_IDX_NULL", index }, [targetRef])
    return true
  }
  if (value === undefined) {
    addCommand(commands, { kind: "SET_IDX_UNDEF", index }, [targetRef])
    return true
  }
  if (typeof value === "boolean") {
    addCommand(commands, { kind: "SET_IDX_BOOL", index, value }, [targetRef])
    return true
  }
  if (typeof value === "string") {
    addCommand(commands, { kind: "SET_IDX_STRING", index, value }, [targetRef])
    return true
  }
  if (typeof value === "bigint") {
    addCommand(commands, { kind: "SET_IDX_BIGINT", index, value }, [targetRef])
    return true
  }
  if (typeof value === "number") {
    if (isInt32(value)) {
      addCommand(commands, { kind: "SET_IDX_INT32", index, value }, [targetRef])
    } else {
      addCommand(commands, { kind: "SET_IDX_F64", index, value }, [targetRef])
    }
    return true
  }
  return false
}

export function buildStructuredCloneCommands<TBank extends string = DefaultJSValueBank>(
  input: unknown,
  options: StructuredCloneBuildOptions<TBank> = {},
): StructuredClonePlan<TBank> {
  const move = options.move ?? false
  const jsValueBank = (options.jsValueBank ?? DEFAULT_JS_VALUE_BANK) as TBank
  const commands: Command<StructuredCloneOp, TBank>[] = []
  const movedHandles = new Set<QuickJSHandle>()
  const objectToValueId = new WeakMap<object, OwnedValueId>()
  const pendingContainers: PendingContainer[] = []

  let nextId = 0
  const nextValueId = () => {
    const id = nextId
    nextId += 1
    return id
  }

  const materializeReference = (value: unknown): OwnedValueId => {
    if (
      value === null ||
      value === undefined ||
      typeof value === "boolean" ||
      typeof value === "number" ||
      typeof value === "bigint" ||
      typeof value === "string"
    ) {
      return materializePrimitive(value, jsValueBank, nextValueId, commands)
    }

    if (typeof value !== "object") {
      throw new TypeError(`Unsupported structuredClone value type: ${typeof value}`)
    }

    if (isQuickJSHandleLike(value)) {
      if (options.targetOwner !== undefined && value.owner && value.owner !== options.targetOwner) {
        throw new QuickJSWrongOwner("Handle is not owned by target runtime")
      }

      const existingHandleId = objectToValueId.get(value)
      if (existingHandleId !== undefined) {
        return existingHandleId
      }

      const valueId = nextValueId()
      objectToValueId.set(value, valueId)
      addCommand(commands, { kind: "LOAD_HANDLE", handle: value }, [], valueRef(jsValueBank, valueId))
      if (move) {
        movedHandles.add(value)
      }
      return valueId
    }

    const existing = objectToValueId.get(value)
    if (existing !== undefined) {
      return existing
    }

    if (Array.isArray(value)) {
      const valueId = nextValueId()
      objectToValueId.set(value, valueId)
      addCommand(commands, { kind: "NEW_ARRAY" }, [], valueRef(jsValueBank, valueId))
      pendingContainers.push({ kind: "array", input: value, valueId })
      return valueId
    }

    if (value instanceof Date) {
      const valueId = nextValueId()
      objectToValueId.set(value, valueId)
      addCommand(commands, { kind: "NEW_DATE", timestampMs: value.getTime() }, [], valueRef(jsValueBank, valueId))
      return valueId
    }

    if (value instanceof Map) {
      const valueId = nextValueId()
      objectToValueId.set(value, valueId)
      addCommand(commands, { kind: "NEW_MAP" }, [], valueRef(jsValueBank, valueId))
      pendingContainers.push({ kind: "map", input: value, valueId })
      return valueId
    }

    if (value instanceof Set) {
      const valueId = nextValueId()
      objectToValueId.set(value, valueId)
      addCommand(commands, { kind: "NEW_SET" }, [], valueRef(jsValueBank, valueId))
      pendingContainers.push({ kind: "set", input: value, valueId })
      return valueId
    }

    if (ArrayBuffer.isView(value) || value instanceof ArrayBuffer) {
      throw new TypeError("Typed arrays and ArrayBuffer are not yet supported by this clone producer")
    }

    const valueId = nextValueId()
    objectToValueId.set(value, valueId)
    addCommand(commands, { kind: "NEW_OBJECT" }, [], valueRef(jsValueBank, valueId))
    pendingContainers.push({ kind: "object", input: value, valueId })
    return valueId
  }

  const rootValueId = materializeReference(input)
  const rootRef = valueRef(jsValueBank, rootValueId)

  for (let i = 0; i < pendingContainers.length; i++) {
    const pending = pendingContainers[i]
    const targetId = pending.valueId
    const targetRef = valueRef(jsValueBank, targetId)

    if (pending.kind === "object") {
      const source = pending.input as Record<string, unknown>
      for (const [key, value] of Object.entries(source)) {
        if (emitInlineObjectSet(commands, jsValueBank, targetId, key, value)) {
          continue
        }
        const childId = materializeReference(value)
        addCommand(commands, { kind: "SET_STR_VALUE", key }, [targetRef, valueRef(jsValueBank, childId)])
      }
      continue
    }

    if (pending.kind === "array") {
      const source = pending.input as unknown[]
      for (let index = 0; index < source.length; index++) {
        if (!Object.prototype.hasOwnProperty.call(source, index)) {
          continue
        }
        const value = source[index]
        if (emitInlineArraySet(commands, jsValueBank, targetId, index, value)) {
          continue
        }
        const childId = materializeReference(value)
        addCommand(commands, { kind: "SET_IDX_VALUE", index }, [targetRef, valueRef(jsValueBank, childId)])
      }
      continue
    }

    if (pending.kind === "map") {
      const source = pending.input as Map<unknown, unknown>
      for (const [key, value] of source.entries()) {
        const keyId = materializeReference(key)
        const valueId = materializeReference(value)
        addCommand(commands, { kind: "MAP_SET" }, [targetRef, valueRef(jsValueBank, keyId), valueRef(jsValueBank, valueId)])
      }
      continue
    }

    if (pending.kind === "set") {
      const source = pending.input as Set<unknown>
      for (const value of source.values()) {
        const valueId = materializeReference(value)
        addCommand(commands, { kind: "SET_ADD" }, [targetRef, valueRef(jsValueBank, valueId)])
      }
    }
  }

  return {
    commands,
    rootRef,
    rootValueId,
    movedHandles: [...movedHandles],
  }
}

export interface ExecuteStructuredCloneOptions<
  TBank extends string = DefaultJSValueBank,
  ParkedAlias = unknown,
> extends StructuredCloneBuildOptions<TBank>,
    Omit<ExecuteCommandPlanOptions<TBank, ParkedAlias>, "retainedRefs"> {}

export interface ExecuteStructuredCloneResult<TBank extends string = DefaultJSValueBank> {
  rootRef: ValueRef<TBank>
  rootValueId: OwnedValueId
  rootSlot: SlotId
  plan: ExecuteCommandPlanResult<TBank>
}

export function executeStructuredClone<TBank extends string, ParkedAlias>(args: {
  input: unknown
  driver: QuickJSBatchDriver<StructuredCloneOp, TBank, ParkedAlias>
  options?: ExecuteStructuredCloneOptions<TBank, ParkedAlias>
}): ExecuteStructuredCloneResult<TBank> {
  const options = args.options ?? {}
  const built = buildStructuredCloneCommands<TBank>(args.input, {
    move: options.move,
    targetOwner: options.targetOwner,
    jsValueBank: options.jsValueBank,
  })

  const plan = executeCommandPlan(built.commands, args.driver, {
    ...options,
    retainedRefs: [built.rootRef],
  })

  if (options.move) {
    for (const handle of built.movedHandles) {
      handle.dispose()
    }
  }

  const rootBank = plan.residentSlotByBank.get(built.rootRef.bank)
  if (!rootBank) {
    throw new Error(`Root bank ${String(built.rootRef.bank)} has no resident slot map`)
  }

  const rootSlot = rootBank.get(built.rootRef.valueId)
  if (rootSlot === undefined) {
    throw new Error(`Root value ${built.rootValueId} is not resident after clone execution`)
  }

  return {
    rootRef: built.rootRef,
    rootValueId: built.rootValueId,
    rootSlot,
    plan,
  }
}
