import {
  forEachConsumedReadRef as forEachGeneratedConsumedReadRef,
  forEachReadRef as forEachGeneratedReadRef,
  forEachWriteRef as forEachGeneratedWriteRef,
  type Command as OpsCommand,
} from "./ops"

export type OwnedValueId = number
export type SlotId = number
export type BankId = number

export const REF_BANK_BITS = 8
export const REF_VALUE_BITS = 24
export const REF_MAX_BANK_ID = (1 << REF_BANK_BITS) - 1
export const REF_MAX_VALUE_ID = (1 << REF_VALUE_BITS) - 1

export const DEFAULT_JS_VALUE_BANK_ID = 0

export type LogicalRef = number

export interface StringAllocation {
  ptr(inputStringArrayIndex: number): number
  len(inputStringArrayIndex: number): number
  free?(): void
}

export interface StringAllocator {
  allocateStrings(values: readonly string[]): StringAllocation
}

export type Utf8LengthFieldType = "uint8_t" | "uint32_t"

export function maxUnsignedValue(type: Utf8LengthFieldType): number {
  switch (type) {
    case "uint8_t":
      return 0xff
    case "uint32_t":
      return 0xffffffff
  }
}

export function hasNullByte(value: string): boolean {
  return value.includes("\0")
}

export function packRef(bankId: BankId, valueId: OwnedValueId): LogicalRef {
  if (!Number.isInteger(bankId) || bankId < 0 || bankId > REF_MAX_BANK_ID) {
    throw new Error(`Invalid bank id: ${bankId}`)
  }
  if (!Number.isInteger(valueId) || valueId < 0 || valueId > REF_MAX_VALUE_ID) {
    throw new Error(`Invalid value id: ${valueId}`)
  }

  return (((bankId << REF_VALUE_BITS) | valueId) >>> 0) as LogicalRef
}

export function refBankId(ref: LogicalRef): BankId {
  return (ref >>> REF_VALUE_BITS) & REF_MAX_BANK_ID
}

export function refValueId(ref: LogicalRef): OwnedValueId {
  return ref & REF_MAX_VALUE_ID
}

type SlotResolver = (ref: LogicalRef) => SlotId
export type RefVisitor = (ref: LogicalRef) => void

export interface CommandShape {
  kind: number
  barrier?: boolean
  label?: string
}

export interface CommandOperandAccessors<TCommand extends CommandShape = OpsCommand> {
  forEachReadRef(command: TCommand, visit: RefVisitor): void
  forEachWriteRef(command: TCommand, visit: RefVisitor): void
  forEachConsumedReadRef(command: TCommand, visit: RefVisitor): void
}

const DEFAULT_OPERAND_ACCESSORS: CommandOperandAccessors<OpsCommand> = {
  forEachReadRef: forEachGeneratedReadRef as unknown as CommandOperandAccessors<OpsCommand>["forEachReadRef"],
  forEachWriteRef:
    forEachGeneratedWriteRef as unknown as CommandOperandAccessors<OpsCommand>["forEachWriteRef"],
  forEachConsumedReadRef:
    forEachGeneratedConsumedReadRef as unknown as CommandOperandAccessors<OpsCommand>["forEachConsumedReadRef"],
}

/**
 * Hypothetical command execution interface used by the planner.
 */
export interface QuickJSBatchDriver<
  TCommand extends CommandShape = OpsCommand,
  ParkedAlias = unknown,
> {
  readonly bankCount: number
  readonly commandCapacity: number

  getSlotCapacity(bankId: BankId): number

  emit(command: TCommand, resolveSlot: SlotResolver, indexInBatch: number): void
  emitFree(bankId: BankId, slot: SlotId, indexInBatch: number): void
  executeBatch(commandCount: number): number

  getSlot(bankId: BankId, slot: SlotId): ParkedAlias
  setSlot(bankId: BankId, slot: SlotId, alias: ParkedAlias): void
}

export interface InitialValueBinding<ParkedAlias = unknown> {
  ref: LogicalRef
  slot?: SlotId
  parkedAlias?: ParkedAlias
  retained?: boolean
}

export interface ExecuteCommandPlanOptions<
  ParkedAlias = unknown,
  TCommand extends CommandShape = OpsCommand,
> {
  retainedRefs?: Iterable<LogicalRef>
  initialValues?: ReadonlyArray<InitialValueBinding<ParkedAlias>>
  enableFastPath?: boolean
  operandAccessors?: CommandOperandAccessors<TCommand>
}

export interface ExecuteCommandPlanResult {
  commandsExecuted: number
  batchesExecuted: number
  peakResidentValues: number
  usedFastPath: boolean
  residentSlotByBankId: ReadonlyMap<BankId, ReadonlyMap<OwnedValueId, SlotId>>
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

type PlannerBankState<ParkedAlias> = {
  bankId: BankId
  slotCapacity: number
  slotToValue: Int32Array
  values: PlannerValueState<ParkedAlias>[]
  pinEpochByValue: Uint32Array
  pinEpoch: number
}

type PlannerBankAnalysis = {
  bankId: BankId
  slotCapacity: number
  remainingReads: Int32Array
  retainedFlags: Uint8Array
  initialWritten: Uint8Array
  slotToValue: Int32Array
}

function createDenseArray<T>(length: number, factory: () => T): T[] {
  const arr = new Array<T>(length)
  for (let i = 0; i < length; i++) {
    arr[i] = factory()
  }
  return arr
}

function estimatePeakResidentForBank<TCommand extends CommandShape>(
  commands: readonly TCommand[],
  operandAccessors: CommandOperandAccessors<TCommand>,
  bankId: BankId,
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
    operandAccessors.forEachWriteRef(command, (writeRef) => {
      if (refBankId(writeRef) !== bankId) {
        return
      }
      const writeValueId = refValueId(writeRef)
      if (live[writeValueId] === 0) {
        live[writeValueId] = 1
        liveCount++
      }
    })

    operandAccessors.forEachReadRef(command, (readRef) => {
      if (refBankId(readRef) !== bankId) {
        return
      }
      const readValueId = refValueId(readRef)
      workingReads[readValueId] -= 1
      if (workingReads[readValueId] === 0 && retained[readValueId] === 0 && live[readValueId] === 1) {
        live[readValueId] = 0
        liveCount--
      }
    })

    if (liveCount > peak) {
      peak = liveCount
    }
  }

  return peak
}

function assertValidBankId(bankId: number, bankCount: number): void {
  if (!Number.isInteger(bankId) || bankId < 0 || bankId >= bankCount) {
    throw new Error(`Unknown slot bank id: ${bankId}`)
  }
}

function assertRefInBounds<ParkedAlias>(
  ref: LogicalRef,
  bankStates: readonly PlannerBankState<ParkedAlias>[],
  bankCount: number,
): PlannerBankState<ParkedAlias> {
  const bankId = refBankId(ref)
  assertValidBankId(bankId, bankCount)
  const bankState = bankStates[bankId]
  const valueId = refValueId(ref)
  if (valueId >= bankState.values.length) {
    throw new Error(`Unknown value id ${valueId} for bank ${bankId}`)
  }
  return bankState
}

export function executeCommandPlan<TCommand extends CommandShape = OpsCommand, ParkedAlias = unknown>(
  commands: readonly TCommand[],
  driver: QuickJSBatchDriver<TCommand, ParkedAlias>,
  options: ExecuteCommandPlanOptions<ParkedAlias, TCommand> = {},
): ExecuteCommandPlanResult {
  const operandAccessors = (options.operandAccessors ??
    DEFAULT_OPERAND_ACCESSORS) as CommandOperandAccessors<TCommand>
  const commandCapacity = driver.commandCapacity
  if (commandCapacity <= 0) {
    throw new Error(`Invalid command capacity: ${commandCapacity}`)
  }

  const bankCount = driver.bankCount
  if (!Number.isInteger(bankCount) || bankCount <= 0) {
    throw new Error(`Invalid bank count: ${bankCount}`)
  }
  if (bankCount > REF_MAX_BANK_ID + 1) {
    throw new Error(`bankCount ${bankCount} exceeds packed ref bank limit ${REF_MAX_BANK_ID + 1}`)
  }

  const maxValueIdByBank = new Int32Array(bankCount)
  maxValueIdByBank.fill(-1)

  const noteRef = (ref: LogicalRef) => {
    const bankId = refBankId(ref)
    assertValidBankId(bankId, bankCount)
    const valueId = refValueId(ref)
    if (valueId > maxValueIdByBank[bankId]) {
      maxValueIdByBank[bankId] = valueId
    }
  }

  for (const command of commands) {
    operandAccessors.forEachReadRef(command, noteRef)
    operandAccessors.forEachConsumedReadRef(command, noteRef)
    operandAccessors.forEachWriteRef(command, noteRef)
  }

  const retainedRefs = [...(options.retainedRefs ?? [])]
  for (const retainedRef of retainedRefs) {
    noteRef(retainedRef)
  }

  const initialValues = options.initialValues ?? []
  for (const initial of initialValues) {
    noteRef(initial.ref)
  }

  const bankAnalysis = new Array<PlannerBankAnalysis>(bankCount)
  for (let bankId = 0; bankId < bankCount; bankId++) {
    const slotCapacity = driver.getSlotCapacity(bankId)
    if (slotCapacity <= 0) {
      throw new Error(`Invalid slot capacity for bank ${bankId}: ${slotCapacity}`)
    }

    const maxValueId = maxValueIdByBank[bankId]
    const valueCount = maxValueId >= 0 ? maxValueId + 1 : 0

    const slotToValue = new Int32Array(slotCapacity)
    slotToValue.fill(-1)

    bankAnalysis[bankId] = {
      bankId,
      slotCapacity,
      remainingReads: new Int32Array(valueCount),
      retainedFlags: new Uint8Array(valueCount),
      initialWritten: new Uint8Array(valueCount),
      slotToValue,
    }
  }

  for (const command of commands) {
    operandAccessors.forEachReadRef(command, (readRef) => {
      const bankId = refBankId(readRef)
      const valueId = refValueId(readRef)
      const analysis = bankAnalysis[bankId]
      analysis.remainingReads[valueId] += 1
    })
    operandAccessors.forEachConsumedReadRef(command, (consumedRef) => {
      let foundInReads = false
      operandAccessors.forEachReadRef(command, (readRef) => {
        if (readRef === consumedRef) {
          foundInReads = true
        }
      })
      if (!foundInReads) {
        throw new Error(`Consumed ref ${consumedRef} is not listed in command reads`)
      }
    })
  }

  for (const retainedRef of retainedRefs) {
    const bankId = refBankId(retainedRef)
    const valueId = refValueId(retainedRef)
    const analysis = bankAnalysis[bankId]
    analysis.retainedFlags[valueId] = 1
  }

  for (const initial of initialValues) {
    const bankId = refBankId(initial.ref)
    const valueId = refValueId(initial.ref)
    const analysis = bankAnalysis[bankId]

    analysis.initialWritten[valueId] = 1

    if (initial.retained) {
      analysis.retainedFlags[valueId] = 1
    }

    if (initial.slot !== undefined) {
      if (initial.slot < 0 || initial.slot >= analysis.slotCapacity) {
        throw new Error(`Initial slot out of range in bank ${bankId}: ${initial.slot}`)
      }
      if (analysis.slotToValue[initial.slot] !== -1) {
        throw new Error(`Initial slot collision in bank ${bankId} at slot ${initial.slot}`)
      }
      analysis.slotToValue[initial.slot] = valueId
    }
  }

  const enableFastPath = options.enableFastPath ?? true
  let fitsFastPath = commands.length <= commandCapacity
  for (const analysis of bankAnalysis) {
    const estimatedPeak = estimatePeakResidentForBank(
      commands,
      operandAccessors,
      analysis.bankId,
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

  const bankStates = new Array<PlannerBankState<ParkedAlias>>(bankCount)
  for (let bankId = 0; bankId < bankCount; bankId++) {
    const analysis = bankAnalysis[bankId]

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

    bankStates[bankId] = {
      bankId,
      slotCapacity: analysis.slotCapacity,
      slotToValue: analysis.slotToValue,
      values,
      pinEpochByValue: new Uint32Array(values.length),
      pinEpoch: 1,
    }
  }

  let residentValues = 0
  const setResident = (bankState: PlannerBankState<ParkedAlias>, slot: number, valueId: number) => {
    if (bankState.slotToValue[slot] !== -1) {
      throw new Error(`Slot ${slot} in bank ${bankState.bankId} is already occupied`)
    }
    bankState.slotToValue[slot] = valueId
    bankState.values[valueId].residentSlot = slot
    residentValues++
  }

  for (const initial of initialValues) {
    const bankId = refBankId(initial.ref)
    const valueId = refValueId(initial.ref)
    const bankState = bankStates[bankId]
    const valueState = bankState.values[valueId]
    valueState.written = true

    if (initial.slot !== undefined) {
      setResident(bankState, initial.slot, valueId)
    }

    if (initial.parkedAlias !== undefined) {
      valueState.parkedAlias = initial.parkedAlias
    }
  }

  let batchCount = 0
  let globalExecuted = 0
  let batchIndex = 0
  let peakResidentValues = residentValues

  const updatePeakResident = () => {
    if (residentValues > peakResidentValues) {
      peakResidentValues = residentValues
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

  const clearResident = (bankState: PlannerBankState<ParkedAlias>, slot: number, valueId: number) => {
    if (bankState.slotToValue[slot] !== valueId) {
      throw new Error(
        `Slot/value mismatch while clearing resident in bank ${bankState.bankId}: slot=${slot} value=${valueId}`,
      )
    }
    bankState.slotToValue[slot] = -1
    bankState.values[valueId].residentSlot = -1
    residentValues--
  }

  const emitFree = (bankId: BankId, slot: number) => {
    ensureCommandCapacity(1)
    driver.emitFree(bankId, slot, batchCount)
    batchCount++
  }

  const isPinned = (bankState: PlannerBankState<ParkedAlias>, valueId: number): boolean =>
    bankState.pinEpochByValue[valueId] === bankState.pinEpoch

  const advancePinEpoch = (bankState: PlannerBankState<ParkedAlias>) => {
    if (bankState.pinEpoch >= 0xfffffffe) {
      bankState.pinEpochByValue.fill(0)
      bankState.pinEpoch = 1
      return
    }
    bankState.pinEpoch += 1
  }

  const releaseDeadValue = (bankState: PlannerBankState<ParkedAlias>, valueId: number) => {
    const state = bankState.values[valueId]
    if (state.retained || state.freed || state.remainingReads > 0) {
      return
    }

    if (state.residentSlot < 0) {
      if (state.parkedAlias === undefined) {
        throw new Error(
          `Value ${valueId} in bank ${bankState.bankId} is dead but has no resident slot and no parked alias`,
        )
      }

      const restoreSlot = allocateSlot(bankState)
      driver.setSlot(bankState.bankId, restoreSlot, state.parkedAlias)
      state.parkedAlias = undefined
      setResident(bankState, restoreSlot, valueId)
      updatePeakResident()
    }

    const slot = state.residentSlot
    emitFree(bankState.bankId, slot)
    clearResident(bankState, slot, valueId)
    state.parkedAlias = undefined
    state.freed = true
  }

  const allocateSlot = (bankState: PlannerBankState<ParkedAlias>): number => {
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
      throw new Error(`Out of slots (${bankState.slotCapacity}) in fast path for bank ${bankState.bankId}`)
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
      const alias = driver.getSlot(bankState.bankId, evictCandidate)
      bankState.values[valueId].parkedAlias = alias
      clearResident(bankState, evictCandidate, valueId)
      return evictCandidate
    }

    throw new Error(`Out of slots (${bankState.slotCapacity}) with all values pinned in bank ${bankState.bankId}`)
  }

  const ensureResidentByBank = (bankState: PlannerBankState<ParkedAlias>, valueId: number): number => {
    const state = bankState.values[valueId]
    if (state.freed) {
      throw new Error(`Value ${valueId} in bank ${bankState.bankId} was already freed but is still referenced`)
    }
    if (state.residentSlot >= 0) {
      return state.residentSlot
    }
    if (state.parkedAlias === undefined) {
      throw new Error(`Value ${valueId} in bank ${bankState.bankId} is not resident and has no parked alias`)
    }

    const slot = allocateSlot(bankState)
    driver.setSlot(bankState.bankId, slot, state.parkedAlias)
    state.parkedAlias = undefined
    setResident(bankState, slot, valueId)
    updatePeakResident()
    return slot
  }

  const ensureResident = (ref: LogicalRef): number => {
    const bankId = refBankId(ref)
    const valueId = refValueId(ref)
    assertValidBankId(bankId, bankCount)
    const bankState = bankStates[bankId]
    if (valueId >= bankState.values.length) {
      throw new Error(`Unknown value id ${valueId} for bank ${bankId}`)
    }
    return ensureResidentByBank(bankState, valueId)
  }

  const resolveSlot: SlotResolver = (ref) => {
    const bankState = assertRefInBounds(ref, bankStates, bankCount)
    const valueId = refValueId(ref)
    const state = bankState.values[valueId]
    if (state.residentSlot < 0) {
      throw new Error(`Cannot resolve slot for non-resident value ${valueId} in bank ${bankState.bankId}`)
    }
    return state.residentSlot
  }

  const postCommandReclaim = (ref: LogicalRef) => {
    const bankState = assertRefInBounds(ref, bankStates, bankCount)
    const valueId = refValueId(ref)
    const state = bankState.values[valueId]
    if (state.remainingReads > 0 || state.retained || state.freed) {
      return
    }
    releaseDeadValue(bankState, valueId)
  }

  const touchedBankIds: number[] = []
  const touchedBankMarks = new Uint8Array(bankCount)

  const markPinned = (ref: LogicalRef) => {
    const bankId = refBankId(ref)
    const valueId = refValueId(ref)
    assertValidBankId(bankId, bankCount)
    const bankState = bankStates[bankId]
    if (valueId >= bankState.values.length) {
      throw new Error(`Unknown value id ${valueId} for bank ${bankId}`)
    }

    if (touchedBankMarks[bankId] === 0) {
      touchedBankMarks[bankId] = 1
      touchedBankIds.push(bankId)
      advancePinEpoch(bankState)
    }

    bankState.pinEpochByValue[valueId] = bankState.pinEpoch
  }

  const consumeValue = (ref: LogicalRef) => {
    const bankId = refBankId(ref)
    const valueId = refValueId(ref)
    const bankState = bankStates[bankId]
    const state = bankState.values[valueId]

    if (state.remainingReads > 0) {
      throw new Error(`Consumed value ${valueId} in bank ${bankId} is referenced after consumption`)
    }
    if (state.retained) {
      throw new Error(`Consumed value ${valueId} in bank ${bankId} cannot be retained`)
    }
    if (state.residentSlot >= 0) {
      clearResident(bankState, state.residentSlot, valueId)
    }
    state.parkedAlias = undefined
    state.freed = true
  }

  for (const command of commands) {
    if (command.barrier && batchCount > 0) {
      flushBatch()
    }

    touchedBankIds.length = 0

    operandAccessors.forEachReadRef(command, markPinned)
    operandAccessors.forEachWriteRef(command, markPinned)

    operandAccessors.forEachReadRef(command, ensureResident)

    operandAccessors.forEachWriteRef(command, (writeRef) => {
      const bankId = refBankId(writeRef)
      const valueId = refValueId(writeRef)
      const bankState = bankStates[bankId]
      const state = bankState.values[valueId]

      if (state.written && state.residentSlot === -1 && state.parkedAlias === undefined) {
        throw new Error(`Command tried to rewrite value ${valueId} in bank ${bankId}, which is unsupported`)
      }
      if (state.residentSlot >= 0 || state.parkedAlias !== undefined) {
        throw new Error(`Command writes value ${valueId} in bank ${bankId} that is already live`)
      }

      const slot = allocateSlot(bankState)
      state.written = true
      setResident(bankState, slot, valueId)
      updatePeakResident()
    })

    ensureCommandCapacity(1)
    driver.emit(command, resolveSlot, batchCount)
    batchCount++

    operandAccessors.forEachReadRef(command, (readRef) => {
      const bankId = refBankId(readRef)
      const valueId = refValueId(readRef)
      const bankState = bankStates[bankId]
      const state = bankState.values[valueId]
      state.remainingReads -= 1
      if (state.remainingReads < 0) {
        throw new Error(`Read count for value ${valueId} in bank ${bankId} went negative`)
      }
    })

    operandAccessors.forEachConsumedReadRef(command, consumeValue)

    operandAccessors.forEachReadRef(command, postCommandReclaim)
    operandAccessors.forEachWriteRef(command, postCommandReclaim)

    if (command.barrier) {
      flushBatch()
    }

    for (const bankId of touchedBankIds) {
      touchedBankMarks[bankId] = 0
    }
  }

  for (const bankState of bankStates) {
    for (let valueId = 0; valueId < bankState.values.length; valueId++) {
      const valueState = bankState.values[valueId]
      if (!valueState.retained) {
        continue
      }
      if (!valueState.written) {
        throw new Error(`Retained value ${valueId} in bank ${bankState.bankId} was never written`)
      }
      ensureResidentByBank(bankState, valueId)
    }
  }

  flushBatch()

  const residentSlotByBankId = new Map<BankId, Map<OwnedValueId, SlotId>>()
  for (const bankState of bankStates) {
    const slots = new Map<OwnedValueId, SlotId>()
    for (let valueId = 0; valueId < bankState.values.length; valueId++) {
      const slot = bankState.values[valueId].residentSlot
      if (slot >= 0) {
        slots.set(valueId, slot)
      }
    }
    residentSlotByBankId.set(bankState.bankId, slots)
  }

  return {
    commandsExecuted: globalExecuted,
    batchesExecuted: batchIndex,
    peakResidentValues,
    usedFastPath,
    residentSlotByBankId,
  }
}
