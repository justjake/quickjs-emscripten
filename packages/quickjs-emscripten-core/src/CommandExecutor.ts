import type {
  FuncListSlotType,
  JSValueSlotType,
  Brand,
  CommandPointer,
  EitherFFI,
  EitherModule,
  FuncListSlot,
  JSContextPointer,
  JSValuePointer,
  JSValueSlot,
  JSVoidPointer,
  UInt32Pointer,
} from "@jitl/quickjs-ffi-types"
import { SlotType } from "@jitl/quickjs-ffi-types"
import type { CommandBuilder, InputBinding } from "./CommandBuilder"
import type {
  BasePolicy,
  BatchStateView,
  CommandPc,
  CommandPcOrNone,
  DiagnosticsSink,
  PlannerEmitter,
  PrepassView,
  RefLocation,
  RefStateView,
  SlotIndex,
  SlotIndexOrNone,
  SlotPlanner,
  SpillPtr,
} from "./CommandExecutorPolicy"
import { NoSpillBatchCutPolicy, PlanCode } from "./CommandExecutorPolicy"
import {
  CommandRefType,
  type CommandRef,
  type CommandWriteHelpers,
  type EncodedBufferRef,
  type JSValueRef,
} from "./command-types"
import type { Memory } from "./internal/memory-region"
import {
  forEachConsumedRef,
  forEachReadRef,
  forEachWriteRef,
  SLOT_FREE,
  SLOT_LOAD,
  SLOT_STORE,
  writeCommand,
  writeSlotFree,
  writeSlotLoad,
  writeSlotStore,
  type Command,
} from "./ops"
import type { QuickJSHandle } from "./types"

const COMMAND_SIZE_BYTES = 16
const COMMAND_OK = 0
const DEFAULT_COMMAND_CAPACITY = 256
const DEFAULT_JSVALUE_SLOT_CAPACITY = 32
const DEFAULT_FUNCLIST_SLOT_CAPACITY = 8
const DEFAULT_JSVALUE_SLOT_BYTES = 16
const DEFAULT_FUNCLIST_SLOT_BYTES = 8
const DEFAULT_ARENA_BYTES = 1024
const EMPTY_RETURN_REFS: readonly JSValueRef[] = []
const EMPTY_COMMANDS: readonly Command[] = []
const SLOT_BANK_ORDER: readonly [TrackedSlotType, TrackedSlotType] = [
  SlotType.JSValueSlotType,
  SlotType.FuncListSlotType,
]

type InternalContext = {
  ctx: { value: JSContextPointer }
  memory: { heapValueHandle(ptr: JSValuePointer): QuickJSHandle }
  module: EitherModule
  runtime: {
    hostRefs: { delete(hostRefId: number): void }
  }
}

type RefPrepass = {
  epoch: number
  firstUse: CommandPc
  lastUse: CommandPc
  uses: CommandPc[]
  producedAt: CommandPcOrNone
  returned: boolean
  executorOwned: boolean
}

type RefState = {
  location: RefLocation
  slot: SlotIndex
  spillPtr: SpillPtr
}

type SlotBankState = {
  type: TrackedSlotType
  slotsPtr: number
  slotBytes: number
  capacity: number
  free: number[]
  slotToRef: Int32Array
}

type TrackedSlotType = typeof JSValueSlotType | typeof FuncListSlotType

type SlotBankTable<T> = Record<number, T>

const UNDO_REF_STATE = 1
const UNDO_SLOT_TO_REF = 2
const UNDO_FREE_POP = 3
const UNDO_FREE_PUSH = 4

export interface CommandExecutorOptions {
  commandCapacity?: number
  jsValueSlotCapacity?: number
  funcListSlotCapacity?: number
  jsValueSlotBytes?: number
  funcListSlotBytes?: number
  arenaBytes?: number
  allocations: CommandExecutorAllocations
  policy?: BasePolicy
  memory?: Memory<number>
}

export interface CommandExecutorAllocations {
  commandBufferPtr: number
  jsValueSlotsPtr: number
  funcListSlotsPtr: number
  outStatusPtr: number
  outErrorPtr: number
  arenaPtr: number
}

export interface ExecuteCommandOptions {
  returnRefs?: readonly JSValueRef[]
}

export interface ExecuteCommandResult {
  handles: Map<JSValueRef, QuickJSHandle>
  successfulCount: number
  batchesExecuted: number
}

export class CommandExecutorError extends Error {
  readonly failedCommandIndex: number
  readonly successfulCommandCount: number

  constructor(message: string, failedCommandIndex: number, successfulCommandCount: number) {
    super(message)
    this.failedCommandIndex = failedCommandIndex
    this.successfulCommandCount = successfulCommandCount
  }
}

class ModuleMemory implements Memory<number> {
  private epochValue = 0
  private heapToken: ArrayBufferLike

  constructor(private readonly module: EitherModule) {
    this.heapToken = module.HEAPU8.buffer
  }

  epoch(): number {
    this.refresh()
    return this.epochValue
  }

  uint8(): Uint8Array {
    this.refresh()
    return this.module.HEAPU8
  }

  uint32(): Uint32Array {
    this.refresh()
    return this.module.HEAPU32
  }

  malloc(size: number): number {
    return this.module._malloc(size)
  }

  realloc(ptr: number, size: number): number {
    const next = this.module._malloc(size)
    this.module.HEAPU8.copyWithin(next, ptr, ptr + size)
    this.module._free(ptr)
    return next
  }

  free(ptr: number): void {
    this.module._free(ptr)
  }

  private refresh(): void {
    const next = this.module.HEAPU8.buffer
    if (next !== this.heapToken) {
      this.heapToken = next
      this.epochValue++
    }
  }
}

class BatchArena {
  readonly ptr: number
  readonly capacity: number
  private usedValue = 0

  constructor(ptr: number, initialCapacity: number) {
    if (!Number.isInteger(ptr) || ptr < 0) {
      throw new Error(`Invalid arena ptr: ${ptr}`)
    }
    this.capacity = Math.max(1, initialCapacity)
    this.ptr = ptr
  }

  reset(): void {
    this.usedValue = 0
  }

  reserve(byteLength: number): number {
    if (!Number.isInteger(byteLength) || byteLength <= 0) {
      throw new Error(`Invalid reserve byteLength: ${byteLength}`)
    }

    const required = this.usedValue + byteLength
    if (required > this.capacity) {
      throw new Error(
        `BatchArena overflow: required=${required}, capacity=${this.capacity}. Increase arenaBytes or split inputs across batches.`,
      )
    }

    const ptr = this.ptr + this.usedValue
    this.usedValue += byteLength
    return ptr
  }
}

export class CommandExecutor
  implements
    CommandWriteHelpers,
    BatchStateView,
    SlotPlanner,
    RefStateView,
    PrepassView,
    PlannerEmitter,
    DiagnosticsSink
{
  private readonly module: EitherModule
  private readonly ffi: EitherFFI
  private readonly memory: Memory<number>
  private readonly policy: BasePolicy
  private readonly encodedResults: Array<EncodedBufferRef<number, number>> = [
    { ptr: 0, len: 0 },
    { ptr: 0, len: 0 },
    { ptr: 0, len: 0 },
    { ptr: 0, len: 0 },
    { ptr: 0, len: 0 },
    { ptr: 0, len: 0 },
    { ptr: 0, len: 0 },
    { ptr: 0, len: 0 },
  ]
  private encodedResultCursor = 0
  private utf8MeasuredLength = 0
  private utf8ContainsNull = false

  private commandCapacity: number
  private readonly banks: SlotBankTable<{
    ptr: number
    capacity: number
    slotBytes: number
  }>

  private commandBufferPtr: number
  private commandView?: DataView
  private commandViewEpoch = -1

  private readonly outStatusPtr: number
  private readonly outErrorPtr: number

  private readonly arena: BatchArena
  private readonly refState: RefStateMap
  private readonly prepassTable = new RefPrepassTable()

  // Active execute() state used by writeCommand helpers.
  private activeCommands: readonly Command[] = EMPTY_COMMANDS
  private activePrepass?: RefPrepassTable
  private activeRefState?: RefStateMap
  private activeCtxPtr?: JSContextPointer
  private diagnosticsMessage: string | null = null
  private readonly batchCheckpoints: number[] = []
  private batchCheckpointCount = 0
  private flushOk = true
  private flushSuccessfulSourceCount = 0
  private flushFailedPc = -1
  private flushMessage = ""
  private readonly liveRefs: number[] = []
  private readonly liveBanks: number[] = []
  private readonly liveSlots: number[] = []

  private readonly policyContext: {
    commands: readonly Command[]
    prepass: PrepassView
    refs: RefStateView
    slots: SlotPlanner
    batch: BatchStateView
    emit: PlannerEmitter
    spill: null
    diagnostics: DiagnosticsSink
  }

  // Active batch tracking.
  private batchCount = 0
  private batchSourcePcs: number[] = []
  private batchStartPc = -1
  private batchSourceCount = 0

  constructor(module: EitherModule, ffi: EitherFFI, options: CommandExecutorOptions) {
    this.module = module
    this.ffi = ffi
    this.memory = options.memory ?? new ModuleMemory(module)
    this.policy = options.policy ?? new NoSpillBatchCutPolicy()
    const allocations = options.allocations
    if (!allocations) {
      throw new Error(
        "CommandExecutor requires options.allocations with preallocated buffer pointers",
      )
    }

    this.commandCapacity = options.commandCapacity ?? DEFAULT_COMMAND_CAPACITY
    const jsValueSlotCapacity = options.jsValueSlotCapacity ?? DEFAULT_JSVALUE_SLOT_CAPACITY
    const funcListSlotCapacity = options.funcListSlotCapacity ?? DEFAULT_FUNCLIST_SLOT_CAPACITY
    const jsValueSlotBytes = options.jsValueSlotBytes ?? DEFAULT_JSVALUE_SLOT_BYTES
    const funcListSlotBytes = options.funcListSlotBytes ?? DEFAULT_FUNCLIST_SLOT_BYTES

    this.commandBufferPtr = allocations.commandBufferPtr
    this.banks = {
      [SlotType.JSValueSlotType]: {
        ptr: allocations.jsValueSlotsPtr,
        capacity: jsValueSlotCapacity,
        slotBytes: jsValueSlotBytes,
      },
      [SlotType.FuncListSlotType]: {
        ptr: allocations.funcListSlotsPtr,
        capacity: funcListSlotCapacity,
        slotBytes: funcListSlotBytes,
      },
    }
    this.outStatusPtr = allocations.outStatusPtr
    this.outErrorPtr = allocations.outErrorPtr
    this.arena = new BatchArena(allocations.arenaPtr, options.arenaBytes ?? DEFAULT_ARENA_BYTES)
    this.refState = new RefStateMap(this.banks, this.memory)

    this.policyContext = {
      commands: this.activeCommands,
      prepass: this,
      refs: this,
      slots: this,
      batch: this,
      emit: this,
      spill: null,
      diagnostics: this,
    }
  }

  execute(builder: CommandBuilder, options?: ExecuteCommandOptions): ExecuteCommandResult {
    const context = builder.context as unknown as InternalContext
    const ctxPtr = context.ctx.value
    const commands = builder.getCommands()
    const inputBindings = builder.getInputBindings()
    const functionBindings = builder.getFunctionBindings()
    const returnRefs = options?.returnRefs ?? EMPTY_RETURN_REFS

    if (commands.length === 0) {
      builder.finalizeConsumedInputs(0)
      return { handles: new Map(), successfulCount: 0, batchesExecuted: 0 }
    }

    this.resetBatch()

    const state = this.refState
    state.resetForExecute(inputBindings)
    const prepass = this.prepassTable
    prepass.build(commands, inputBindings, returnRefs)
    prepass.ensureInitialized(state)
    state.beginPlanning()
    this.resetBatchCheckpoints(state)

    let successfulSourceCount = 0
    let batchesExecuted = 0
    let failedPc: CommandPcOrNone = -1
    this.activeCommands = commands
    this.activePrepass = prepass
    this.activeRefState = state
    this.activeCtxPtr = ctxPtr
    this.diagnosticsMessage = null
    this.policyContext.commands = commands

    this.policy.begin(this.policyContext)

    try {
      let pc = 0
      while (pc < commands.length) {
        const result = this.policy.planAt(pc)
        if (result === PlanCode.PLANNED) {
          pc++
          this.pushBatchCheckpoint(state)
          continue
        }

        if (result === PlanCode.BATCH_FULL_BEFORE_COMMAND) {
          if (this.batchCount === 0) {
            throw new CommandExecutorError(
              this.diagnosticsMessage ?? "Batch cut requested with empty batch",
              pc,
              successfulSourceCount,
            )
          }
          this.flushBatch(ctxPtr)
          successfulSourceCount += this.flushSuccessfulSourceCount
          batchesExecuted++
          if (!this.flushOk) {
            state.rollbackPlanning(this.batchCheckpointAt(this.flushSuccessfulSourceCount))
            failedPc = this.flushFailedPc
            throw new CommandExecutorError(this.flushMessage, failedPc, successfulSourceCount)
          }
          state.commitPlanning()
          this.resetBatchCheckpoints(state)
          continue
        }

        failedPc = pc
        throw new CommandExecutorError(
          this.diagnosticsMessage ?? `Command ${pc} cannot fit in configured capacities`,
          pc,
          successfulSourceCount,
        )
      }

      if (this.batchCount > 0) {
        this.flushBatch(ctxPtr)
        successfulSourceCount += this.flushSuccessfulSourceCount
        batchesExecuted++
        if (!this.flushOk) {
          state.rollbackPlanning(this.batchCheckpointAt(this.flushSuccessfulSourceCount))
          failedPc = this.flushFailedPc
          throw new CommandExecutorError(this.flushMessage, failedPc, successfulSourceCount)
        }
        state.commitPlanning()
        this.resetBatchCheckpoints(state)
      }

      const handles = this.collectReturnHandles(returnRefs, state, context)
      this.policy.end(successfulSourceCount, -1)
      state.endPlanning()
      this.cleanupLiveSlots(ctxPtr, state, prepass)
      builder.finalizeConsumedInputs(successfulSourceCount)
      return {
        handles,
        successfulCount: successfulSourceCount,
        batchesExecuted,
      }
    } catch (error) {
      this.policy.end(successfulSourceCount, failedPc)
      state.endPlanning()
      this.cleanupLiveSlots(ctxPtr, state, prepass)
      builder.finalizeConsumedInputs(successfulSourceCount)

      for (let i = 0; i < functionBindings.length; i++) {
        context.runtime.hostRefs.delete(functionBindings[i]!.hostRefId as number)
      }

      if (error instanceof CommandExecutorError) {
        throw error
      }

      throw new CommandExecutorError(
        error instanceof Error ? error.message : String(error),
        failedPc < 0 ? 0 : failedPc,
        successfulSourceCount,
      )
    } finally {
      this.activeCommands = EMPTY_COMMANDS
      this.activePrepass = undefined
      this.activeRefState = undefined
      this.activeCtxPtr = undefined
      this.diagnosticsMessage = null
      this.policyContext.commands = this.activeCommands
      this.batchCheckpointCount = 0
      this.resetBatch()
    }
  }

  remainingCommandCapacity(): number {
    return this.commandCapacity - this.batchCount
  }

  isEmpty(): boolean {
    return this.batchCount === 0
  }

  tryAlloc(bank: SlotType): SlotIndexOrNone {
    return this.requireActiveRefState().tryAlloc(bank)
  }

  free(bank: SlotType, slot: SlotIndex): void {
    this.requireActiveRefState().freeSlot(bank, slot)
  }

  forEachLiveRefInBank(bank: SlotType, visit: (ref: CommandRef, slot: SlotIndex) => void): void {
    this.requireActiveRefState().forEachLiveRef(bank, visit)
  }

  location(ref: CommandRef): RefLocation {
    return this.requireActiveRefState().location(ref)
  }

  slotOf(ref: CommandRef): SlotIndex {
    return this.requireActiveRefState().slotOf(ref)
  }

  spillPtrOf(ref: CommandRef): SpillPtr {
    return this.requireActiveRefState().spillPtrOf(ref)
  }

  markInSlot(ref: CommandRef, slot: SlotIndex): void {
    this.requireActiveRefState().markInSlot(ref, slot)
  }

  markSpilled(ref: CommandRef, spillPtr: SpillPtr): void {
    this.requireActiveRefState().markSpilled(ref, spillPtr)
  }

  markDead(ref: CommandRef): void {
    this.requireActiveRefState().markDead(ref)
  }

  firstUse(ref: CommandRef): CommandPc {
    return this.requireActivePrepass().firstUse(ref)
  }

  lastUse(ref: CommandRef): CommandPc {
    return this.requireActivePrepass().lastUse(ref)
  }

  nextUseAfter(ref: CommandRef, pc: CommandPc): CommandPcOrNone {
    return this.requireActivePrepass().nextUseAfter(ref, pc)
  }

  producedAt(ref: CommandRef): CommandPcOrNone {
    return this.requireActivePrepass().producedAt(ref)
  }

  isReturned(ref: CommandRef): boolean {
    return this.requireActivePrepass().isReturned(ref)
  }

  isExecutorOwned(ref: CommandRef): boolean {
    return this.requireActivePrepass().isExecutorOwned(ref)
  }

  emitPlannerOp(op: Command): void {
    this.appendPlannerCommand(op)
  }

  emitSourceCommand(pc: CommandPc): void {
    const command = this.activeCommands[pc]
    if (!command) {
      throw new Error(`Invalid command index: ${pc}`)
    }
    this.appendSourceCommand(command, pc)
  }

  setFatalPlanningError(message: string): void {
    this.diagnosticsMessage = message
  }

  private resetBatchCheckpoints(state: RefStateMap): void {
    this.batchCheckpointCount = 1
    this.batchCheckpoints[0] = state.checkpoint()
  }

  private pushBatchCheckpoint(state: RefStateMap): void {
    this.batchCheckpoints[this.batchCheckpointCount] = state.checkpoint()
    this.batchCheckpointCount++
  }

  private batchCheckpointAt(successfulSourceCount: number): number {
    if (successfulSourceCount < 0 || successfulSourceCount >= this.batchCheckpointCount) {
      return this.batchCheckpoints[0] ?? 0
    }
    return this.batchCheckpoints[successfulSourceCount] ?? 0
  }

  private requireActiveRefState(): RefStateMap {
    if (!this.activeRefState) {
      throw new Error("Ref state view accessed without active execution state")
    }
    return this.activeRefState
  }

  private requireActivePrepass(): RefPrepassTable {
    if (!this.activePrepass) {
      throw new Error("Prepass view accessed without active execution state")
    }
    return this.activePrepass
  }

  resolveRef<T extends Brand<number, any>>(
    ref: T,
  ): T["brand"] extends JSValueSlotType
    ? JSValueSlot
    : T["brand"] extends FuncListSlotType
      ? FuncListSlot
      : never {
    if (!this.activeRefState) {
      throw new Error("resolveRef called without active execution state")
    }
    return this.activeRefState.slotOf(ref as unknown as CommandRef) as any
  }

  encodeUtf8<Ptr extends number = number, Len extends number = number>(
    value: string,
    maxLength?: number,
    errorOnNull?: boolean,
  ): EncodedBufferRef<Ptr, Len> {
    this.measureUtf8(value)
    const payloadLength = this.utf8MeasuredLength
    if (errorOnNull && this.utf8ContainsNull) {
      throw new Error("UTF-8 input contains NUL byte")
    }
    let len = payloadLength

    if (maxLength !== undefined) {
      if (!Number.isInteger(maxLength) || maxLength < 0) {
        throw new Error(`Invalid maxLength: ${maxLength}`)
      }

      if (errorOnNull === false) {
        if (this.utf8ContainsNull) {
          if (payloadLength > maxLength) {
            throw new Error(
              `UTF-8 length overflow with embedded NUL: ${payloadLength} > ${maxLength}`,
            )
          }
        } else if (payloadLength > maxLength) {
          len = 0
        }
      } else if (payloadLength > maxLength) {
        throw new Error(`UTF-8 length overflow: ${payloadLength} > ${maxLength}`)
      }
    }

    const ptr = this.arena.reserve(payloadLength + 1)
    const heap = this.memory.uint8()
    const written = this.writeUtf8ToHeap(value, heap, ptr)
    heap[ptr + written] = 0
    return this.recordEncodedResult(ptr, len)
  }

  encodeBytes<Ptr extends number = number, Len extends number = number>(
    value: Uint8Array,
    maxLength?: number,
  ): EncodedBufferRef<Ptr, Len> {
    const byteLength = value.byteLength
    if (maxLength !== undefined) {
      if (!Number.isInteger(maxLength) || maxLength < 0) {
        throw new Error(`Invalid maxLength: ${maxLength}`)
      }
      if (byteLength > maxLength) {
        throw new Error(`Byte length overflow: ${byteLength} > ${maxLength}`)
      }
    }
    const ptr = this.arena.reserve(byteLength)
    this.memory.uint8().set(value, ptr)
    return this.recordEncodedResult(ptr, byteLength)
  }

  private recordEncodedResult<Ptr extends number, Len extends number>(
    ptr: number,
    len: number,
  ): EncodedBufferRef<Ptr, Len> {
    const index = this.encodedResultCursor
    this.encodedResultCursor++
    if (this.encodedResultCursor >= this.encodedResults.length) {
      this.encodedResultCursor = 0
    }
    const slot = this.encodedResults[index] as EncodedBufferRef<number, number>
    slot.ptr = ptr
    slot.len = len
    return slot as EncodedBufferRef<Ptr, Len>
  }

  private measureUtf8(value: string): void {
    let length = 0
    let containsNull = false

    for (let i = 0; i < value.length; i++) {
      const code = value.charCodeAt(i)
      if (code === 0) {
        containsNull = true
      }
      if (code <= 0x7f) {
        length += 1
        continue
      }
      if (code <= 0x7ff) {
        length += 2
        continue
      }
      if (code >= 0xd800 && code <= 0xdbff) {
        const next = i + 1 < value.length ? value.charCodeAt(i + 1) : -1
        if (next >= 0xdc00 && next <= 0xdfff) {
          length += 4
          i++
          continue
        }
        length += 3
        continue
      }
      if (code >= 0xdc00 && code <= 0xdfff) {
        length += 3
        continue
      }
      length += 3
    }

    this.utf8MeasuredLength = length
    this.utf8ContainsNull = containsNull
  }

  private writeUtf8ToHeap(value: string, heap: Uint8Array, ptr: number): number {
    let offset = ptr

    for (let i = 0; i < value.length; i++) {
      const code = value.charCodeAt(i)
      if (code <= 0x7f) {
        heap[offset++] = code
        continue
      }
      if (code <= 0x7ff) {
        heap[offset++] = 0xc0 | (code >> 6)
        heap[offset++] = 0x80 | (code & 0x3f)
        continue
      }
      if (code >= 0xd800 && code <= 0xdbff) {
        const next = i + 1 < value.length ? value.charCodeAt(i + 1) : -1
        if (next >= 0xdc00 && next <= 0xdfff) {
          const codePoint = ((code - 0xd800) << 10) + (next - 0xdc00) + 0x10000
          heap[offset++] = 0xf0 | (codePoint >> 18)
          heap[offset++] = 0x80 | ((codePoint >> 12) & 0x3f)
          heap[offset++] = 0x80 | ((codePoint >> 6) & 0x3f)
          heap[offset++] = 0x80 | (codePoint & 0x3f)
          i++
          continue
        }
        offset = writeUtf8Replacement(heap, offset)
        continue
      }
      if (code >= 0xdc00 && code <= 0xdfff) {
        offset = writeUtf8Replacement(heap, offset)
        continue
      }
      heap[offset++] = 0xe0 | (code >> 12)
      heap[offset++] = 0x80 | ((code >> 6) & 0x3f)
      heap[offset++] = 0x80 | (code & 0x3f)
    }

    return offset - ptr
  }

  private appendSourceCommand(command: Command, pc: number): void {
    this.ensureBatchCapacity()
    const view = this.ensureCommandView()
    const offset = (this.batchCount * COMMAND_SIZE_BYTES) as any

    if (command.opcode === SLOT_STORE) {
      const inSlot = this.resolveRef(command.inSlot as CommandRef)
      writeSlotStore(view, offset, inSlot as any, command.inSlotType as any, command.outPtr as any)
    } else if (command.opcode === SLOT_LOAD) {
      const outSlot = this.resolveRef(command.outSlot as CommandRef)
      writeSlotLoad(view, offset, outSlot as any, command.outSlotType as any, command.inPtr as any)
    } else if (command.opcode === SLOT_FREE) {
      const targetSlot = this.resolveRef(command.targetSlot as CommandRef)
      writeSlotFree(view, offset, targetSlot as any, command.targetSlotType as any)
    } else {
      writeCommand(view, offset, command, this)
    }

    this.batchSourcePcs.push(pc)
    this.batchCount++
    if (this.batchStartPc < 0) {
      this.batchStartPc = pc
    }
    this.batchSourceCount++
  }

  private appendPlannerCommand(command: Command): void {
    this.ensureBatchCapacity()
    const view = this.ensureCommandView()
    const offset = (this.batchCount * COMMAND_SIZE_BYTES) as any

    if (command.opcode === SLOT_STORE) {
      writeSlotStore(
        view,
        offset,
        command.inSlot as any,
        command.inSlotType as any,
        command.outPtr as any,
      )
    } else if (command.opcode === SLOT_LOAD) {
      writeSlotLoad(
        view,
        offset,
        command.outSlot as any,
        command.outSlotType as any,
        command.inPtr as any,
      )
    } else if (command.opcode === SLOT_FREE) {
      writeSlotFree(view, offset, command.targetSlot as any, command.targetSlotType as any)
    } else {
      writeCommand(view, offset, command, this)
    }

    this.batchSourcePcs.push(-1)
    this.batchCount++
  }

  private ensureBatchCapacity(): void {
    if (this.batchCount >= this.commandCapacity) {
      throw new Error("Command buffer overflow while planning batch")
    }
  }

  private flushBatch(ctxPtr: JSContextPointer): void {
    const attempted = this.batchCount
    if (attempted === 0) {
      this.flushOk = true
      this.flushSuccessfulSourceCount = 0
      this.flushFailedPc = -1
      this.flushMessage = ""
      return
    }
    const jsValueBank = this.banks[SlotType.JSValueSlotType]
    const funcListBank = this.banks[SlotType.FuncListSlotType]

    const words = this.memory.uint32()
    words[this.outStatusPtr >>> 2] = COMMAND_OK
    words[this.outErrorPtr >>> 2] = 0

    const executed = this.ffi.QTS_ExecuteCommands(
      ctxPtr,
      attempted,
      this.commandBufferPtr as unknown as CommandPointer,
      jsValueBank.ptr as unknown as JSValuePointer,
      jsValueBank.capacity,
      funcListBank.ptr as unknown as JSVoidPointer,
      funcListBank.capacity,
      this.outStatusPtr as unknown as UInt32Pointer,
      this.outErrorPtr as unknown as UInt32Pointer,
    )

    const status = this.memory.uint32()[this.outStatusPtr >>> 2] ?? COMMAND_OK
    const errorPtr = this.memory.uint32()[this.outErrorPtr >>> 2] ?? 0
    const successfulSourceCount = countSuccessfulSources(this.batchSourcePcs, executed)

    this.policy.onBatchFlushed(
      this.batchStartPc < 0 ? 0 : this.batchStartPc,
      this.batchSourceCount,
      executed,
    )

    const failedPc = findFailedSourcePc(this.batchSourcePcs, executed)
    const message =
      status === COMMAND_OK && executed === attempted
        ? ""
        : (this.readErrorMessage(errorPtr) ??
          `QTS_ExecuteCommands failed after ${executed}/${attempted}`)

    this.flushOk = status === COMMAND_OK && executed === attempted
    this.flushSuccessfulSourceCount = successfulSourceCount
    this.flushFailedPc = failedPc
    this.flushMessage = message
    this.resetBatch()
  }

  private collectReturnHandles(
    returnRefs: readonly JSValueRef[],
    state: RefStateMap,
    context: InternalContext,
  ): Map<JSValueRef, QuickJSHandle> {
    const handles = new Map<JSValueRef, QuickJSHandle>()
    const ctxPtr = this.activeCtxPtr as JSContextPointer
    const jsValueBank = this.banks[SlotType.JSValueSlotType]

    for (let i = 0; i < returnRefs.length; i++) {
      const ref = returnRefs[i]!
      if (CommandRefType(ref) !== SlotType.JSValueSlotType) {
        throw new Error(`Unsupported return ref slot type: ${CommandRefType(ref)}`)
      }
      if (state.location(ref) !== 1 /* IN_SLOT */) {
        throw new Error(`Return ref is not resident in slot: ${ref}`)
      }
      const slot = state.slotOf(ref)
      const slotPtr = jsValueBank.ptr + slot * jsValueBank.slotBytes
      const dup = this.ffi.QTS_DupValuePointer(ctxPtr, slotPtr as unknown as JSValuePointer)
      handles.set(ref, context.memory.heapValueHandle(dup))
      state.releaseRefWithoutFree(ref)
    }

    return handles
  }

  private cleanupLiveSlots(
    ctxPtr: JSContextPointer,
    state: RefStateMap,
    prepass: RefPrepassTable,
  ): void {
    const liveCount = state.collectLiveSlotsInto(this.liveRefs, this.liveBanks, this.liveSlots)
    if (liveCount === 0) {
      return
    }

    this.resetBatch()
    const view = this.ensureCommandView()

    for (let i = 0; i < liveCount; i++) {
      const ref = this.liveRefs[i]! as CommandRef
      if (!prepass.isExecutorOwned(ref)) {
        state.releaseRefWithoutFree(ref)
        continue
      }
      if (this.batchCount >= this.commandCapacity) {
        this.flushCleanupBatch(ctxPtr)
      }
      const offset = (this.batchCount * COMMAND_SIZE_BYTES) as any
      writeSlotFree(view, offset, this.liveSlots[i] as any, this.liveBanks[i] as any)
      this.batchCount++
      this.batchSourcePcs.push(-1)
    }

    this.flushCleanupBatch(ctxPtr)
    state.markAllDead()
  }

  private flushCleanupBatch(ctxPtr: JSContextPointer): void {
    if (this.batchCount === 0) {
      return
    }
    const jsValueBank = this.banks[SlotType.JSValueSlotType]
    const funcListBank = this.banks[SlotType.FuncListSlotType]

    this.ffi.QTS_ExecuteCommands(
      ctxPtr,
      this.batchCount,
      this.commandBufferPtr as unknown as CommandPointer,
      jsValueBank.ptr as unknown as JSValuePointer,
      jsValueBank.capacity,
      funcListBank.ptr as unknown as JSVoidPointer,
      funcListBank.capacity,
      this.outStatusPtr as unknown as UInt32Pointer,
      this.outErrorPtr as unknown as UInt32Pointer,
    )
    this.resetBatch()
  }

  private readErrorMessage(errorPtr: number): string | null {
    if (!errorPtr) {
      return null
    }
    try {
      return this.module.UTF8ToString(errorPtr as any)
    } catch {
      return null
    }
  }

  private ensureCommandView(): DataView {
    const epoch = this.memory.epoch()
    if (!this.commandView || this.commandViewEpoch !== epoch) {
      const bytes = this.memory.uint8()
      this.commandView = new DataView(
        bytes.buffer,
        this.commandBufferPtr,
        this.commandCapacity * COMMAND_SIZE_BYTES,
      )
      this.commandViewEpoch = epoch
    }
    return this.commandView
  }

  private resetBatch(): void {
    this.batchCount = 0
    this.batchSourcePcs.length = 0
    this.batchStartPc = -1
    this.batchSourceCount = 0
    this.arena.reset()
  }
}

class RefPrepassTable {
  private readonly byRef = new Map<number, RefPrepass>()
  private readonly activeRefs: number[] = []
  private activeRefCount = 0
  private epoch = 0
  private currentPc: CommandPc = -1
  private readonly onReadRef = (ref: CommandRef): void => {
    this.noteUse(ref, this.currentPc)
  }
  private readonly onWriteRef = (ref: CommandRef): void => {
    this.noteRef(ref)
    this.setProducedAt(ref, this.currentPc)
  }

  build(
    commands: readonly Command[],
    inputBindings: readonly InputBinding[],
    returnRefs: readonly JSValueRef[],
  ): void {
    this.beginBuild()

    for (let pc = 0; pc < commands.length; pc++) {
      this.currentPc = pc
      const command = commands[pc]!
      forEachReadRef(command, this.onReadRef)
      forEachConsumedRef(command, this.onReadRef)
      forEachWriteRef(command, this.onWriteRef)
    }

    for (let i = 0; i < inputBindings.length; i++) {
      const ref = inputBindings[i]!.ref as CommandRef
      this.noteRef(ref)
      this.setInput(ref)
    }

    for (let i = 0; i < returnRefs.length; i++) {
      this.setReturned(returnRefs[i] as CommandRef)
    }
  }

  firstUse(ref: CommandRef): CommandPc {
    const meta = this.byRef.get(ref as number)
    return meta && meta.epoch === this.epoch ? meta.firstUse : -1
  }

  lastUse(ref: CommandRef): CommandPc {
    const meta = this.byRef.get(ref as number)
    return meta && meta.epoch === this.epoch ? meta.lastUse : -1
  }

  nextUseAfter(ref: CommandRef, pc: CommandPc): CommandPcOrNone {
    const meta = this.byRef.get(ref as number)
    if (!meta || meta.epoch !== this.epoch) {
      return -1
    }
    const uses = meta.uses
    for (let i = 0; i < uses.length; i++) {
      const usePc = uses[i]!
      if (usePc > pc) {
        return usePc
      }
    }
    return -1
  }

  producedAt(ref: CommandRef): CommandPcOrNone {
    const meta = this.byRef.get(ref as number)
    return meta && meta.epoch === this.epoch ? meta.producedAt : -1
  }

  isReturned(ref: CommandRef): boolean {
    const meta = this.byRef.get(ref as number)
    return !!(meta && meta.epoch === this.epoch && meta.returned)
  }

  isExecutorOwned(ref: CommandRef): boolean {
    const meta = this.byRef.get(ref as number)
    return !!(meta && meta.epoch === this.epoch && meta.executorOwned)
  }

  setReturned(ref: CommandRef): void {
    this.noteRef(ref).returned = true
  }

  setProducedAt(ref: CommandRef, pc: CommandPc): void {
    const meta = this.noteRef(ref)
    meta.executorOwned = true
    if (meta.producedAt < 0) {
      meta.producedAt = pc
    }
  }

  setInput(ref: CommandRef): void {
    this.noteRef(ref).executorOwned = false
  }

  noteUse(ref: CommandRef, pc: CommandPc): void {
    const meta = this.noteRef(ref)
    if (meta.firstUse < 0) {
      meta.firstUse = pc
    }
    if (pc > meta.lastUse) {
      meta.lastUse = pc
    }
    meta.uses.push(pc)
  }

  ensureInitialized(state: RefStateMap): void {
    for (let i = 0; i < this.activeRefCount; i++) {
      const ref = this.activeRefs[i]!
      state.ensureRef(ref as CommandRef)
    }
  }

  private beginBuild(): void {
    this.epoch++
    this.activeRefCount = 0
    this.currentPc = -1
  }

  private noteRef(ref: CommandRef): RefPrepass {
    const key = ref as number
    let meta = this.byRef.get(key)
    if (!meta) {
      meta = {
        epoch: this.epoch,
        firstUse: -1,
        lastUse: -1,
        uses: [],
        producedAt: -1,
        returned: false,
        executorOwned: false,
      }
      this.byRef.set(key, meta)
      this.activeRefs[this.activeRefCount++] = key
      return meta
    }
    if (meta.epoch !== this.epoch) {
      meta.epoch = this.epoch
      meta.firstUse = -1
      meta.lastUse = -1
      meta.uses.length = 0
      meta.producedAt = -1
      meta.returned = false
      meta.executorOwned = false
      this.activeRefs[this.activeRefCount++] = key
    }
    return meta
  }
}

class RefStateMap {
  private readonly refs = new Map<number, RefState>()
  private readonly refKeys: number[] = []
  private readonly refStates: RefState[] = []
  private refCount = 0
  private readonly inputByRef = new Map<number, InputBinding>()
  private readonly banks: SlotBankTable<SlotBankState>
  private planning = false
  private undoCount = 0
  private readonly undoKind: number[] = []
  private readonly undoRefKey: number[] = []
  private readonly undoRefLocation: number[] = []
  private readonly undoRefSlot: number[] = []
  private readonly undoRefSpill: number[] = []
  private readonly undoBank: number[] = []
  private readonly undoSlot: number[] = []
  private readonly undoPrevValue: number[] = []

  constructor(
    banks: SlotBankTable<{
      ptr: number
      slotBytes: number
      capacity: number
    }>,
    private readonly memory: Memory<number>,
  ) {
    this.banks = {
      [SlotType.JSValueSlotType]: createSlotBank(
        SlotType.JSValueSlotType,
        banks[SlotType.JSValueSlotType].capacity,
        banks[SlotType.JSValueSlotType].ptr,
        banks[SlotType.JSValueSlotType].slotBytes,
      ),
      [SlotType.FuncListSlotType]: createSlotBank(
        SlotType.FuncListSlotType,
        banks[SlotType.FuncListSlotType].capacity,
        banks[SlotType.FuncListSlotType].ptr,
        banks[SlotType.FuncListSlotType].slotBytes,
      ),
    }
  }

  resetForExecute(inputBindings: readonly InputBinding[]): void {
    this.inputByRef.clear()
    for (let i = 0; i < inputBindings.length; i++) {
      const binding = inputBindings[i]!
      this.inputByRef.set(binding.ref as number, binding)
    }

    for (let bankIndex = 0; bankIndex < SLOT_BANK_ORDER.length; bankIndex++) {
      const bankType = SLOT_BANK_ORDER[bankIndex]
      const bank = this.banks[bankType]
      bank.slotToRef.fill(-1)
      bank.free.length = 0
      for (let slot = bank.capacity - 1; slot >= 0; slot--) {
        bank.free.push(slot)
      }
    }

    for (let i = 0; i < this.refCount; i++) {
      const state = this.refStates[i]!
      state.location = 0 as RefLocation
      state.slot = -1
      state.spillPtr = -1
    }

    this.endPlanning()
  }

  beginPlanning(): void {
    this.planning = true
    this.undoCount = 0
  }

  checkpoint(): number {
    return this.undoCount
  }

  rollbackPlanning(mark: number): void {
    if (!this.planning) {
      return
    }

    let cursor = this.undoCount
    while (cursor > mark) {
      cursor--
      const kind = this.undoKind[cursor] ?? 0
      switch (kind) {
        case UNDO_REF_STATE: {
          const refKey = this.undoRefKey[cursor] ?? -1
          const state = this.refs.get(refKey)
          if (!state) {
            break
          }
          state.location = (this.undoRefLocation[cursor] ?? 0) as RefLocation
          state.slot = this.undoRefSlot[cursor] ?? -1
          state.spillPtr = this.undoRefSpill[cursor] ?? -1
          break
        }
        case UNDO_SLOT_TO_REF: {
          const bank = this.bank(this.undoBank[cursor] ?? -1)
          const slot = this.undoSlot[cursor] ?? -1
          bank.slotToRef[slot] = this.undoPrevValue[cursor] ?? -1
          break
        }
        case UNDO_FREE_POP: {
          const bank = this.bank(this.undoBank[cursor] ?? -1)
          bank.free.push(this.undoSlot[cursor] ?? -1)
          break
        }
        case UNDO_FREE_PUSH: {
          const bank = this.bank(this.undoBank[cursor] ?? -1)
          bank.free.pop()
          break
        }
        default:
          break
      }
    }
    this.undoCount = mark
  }

  commitPlanning(): void {
    this.undoCount = 0
  }

  endPlanning(): void {
    this.planning = false
    this.undoCount = 0
  }

  ensureRef(ref: CommandRef): void {
    const key = ref as number
    if (!this.refs.has(key)) {
      const state: RefState = {
        location: 0 as RefLocation,
        slot: -1,
        spillPtr: -1,
      }
      this.refs.set(key, state)
      this.refKeys[this.refCount] = key
      this.refStates[this.refCount] = state
      this.refCount++
    }
  }

  location(ref: CommandRef): RefLocation {
    return this.get(ref).location
  }

  slotOf(ref: CommandRef): SlotIndex {
    const slot = this.get(ref).slot
    if (slot < 0) {
      throw new Error(`Ref is not in a slot: ${ref}`)
    }
    return slot
  }

  spillPtrOf(ref: CommandRef): SpillPtr {
    return this.get(ref).spillPtr
  }

  markInSlot(ref: CommandRef, slot: SlotIndex): void {
    const state = this.get(ref)
    const refKey = ref as number
    const bank = CommandRefType(ref)
    const bankState = this.bank(bank)
    if (slot < 0 || slot >= bankState.capacity) {
      throw new Error(`Slot out of bounds for bank ${bank}: ${slot}`)
    }

    this.logRefState(refKey, state)
    this.logSlotToRef(bank, slot, bankState.slotToRef[slot] ?? -1)
    bankState.slotToRef[slot] = ref as number

    if (this.inputByRef.has(refKey) && state.location === 0 /* UNMATERIALIZED */) {
      this.materializeInput(ref, slot)
    }

    state.location = 1 as RefLocation
    state.slot = slot
    state.spillPtr = -1
  }

  markSpilled(ref: CommandRef, spillPtr: SpillPtr): void {
    const state = this.get(ref)
    this.logRefState(ref as number, state)
    state.location = 2 as RefLocation
    state.slot = -1
    state.spillPtr = spillPtr
  }

  markDead(ref: CommandRef): void {
    const state = this.get(ref)
    this.logRefState(ref as number, state)
    state.location = 3 as RefLocation
    state.slot = -1
    state.spillPtr = -1
  }

  tryAlloc(bank: number): SlotIndexOrNone {
    const state = this.bank(bank)
    if (state.free.length === 0) {
      return -1
    }
    const slot = state.free.pop() as SlotIndex
    this.logFreePop(bank, slot)
    return slot
  }

  freeSlot(bank: number, slot: SlotIndex): void {
    const state = this.bank(bank)
    if (slot < 0 || slot >= state.capacity) {
      throw new Error(`Slot out of bounds for bank ${bank}: ${slot}`)
    }
    this.logSlotToRef(bank, slot, state.slotToRef[slot] ?? -1)
    state.slotToRef[slot] = -1
    this.logFreePush(bank, slot)
    state.free.push(slot)
  }

  forEachLiveRef(bank: number, visit: (ref: CommandRef, slot: SlotIndex) => void): void {
    const state = this.bank(bank)
    for (let slot = 0; slot < state.capacity; slot++) {
      const ref = state.slotToRef[slot]
      if (ref >= 0) {
        visit(ref as CommandRef, slot)
      }
    }
  }

  collectLiveSlotsInto(refsOut: number[], banksOut: number[], slotsOut: number[]): number {
    let outCount = 0
    for (let i = 0; i < this.refCount; i++) {
      const state = this.refStates[i]!
      if (state.location !== 1 /* IN_SLOT */) {
        continue
      }
      const ref = this.refKeys[i]!
      refsOut[outCount] = ref
      banksOut[outCount] = CommandRefType(ref as CommandRef)
      slotsOut[outCount] = state.slot
      outCount++
    }
    return outCount
  }

  releaseRefWithoutFree(ref: CommandRef): void {
    const state = this.get(ref)
    if (state.location !== 1 /* IN_SLOT */) {
      state.location = 3 as RefLocation
      state.slot = -1
      state.spillPtr = -1
      return
    }
    const bank = CommandRefType(ref)
    const bankState = this.bank(bank)
    bankState.slotToRef[state.slot] = -1
    bankState.free.push(state.slot)
    state.location = 3 as RefLocation
    state.slot = -1
    state.spillPtr = -1
  }

  markAllDead(): void {
    for (let bankIndex = 0; bankIndex < SLOT_BANK_ORDER.length; bankIndex++) {
      const bank = SLOT_BANK_ORDER[bankIndex]
      const state = this.banks[bank]
      state.slotToRef.fill(-1)
      state.free.length = 0
      for (let i = state.capacity - 1; i >= 0; i--) {
        state.free.push(i)
      }
    }
    for (let i = 0; i < this.refCount; i++) {
      const state = this.refStates[i]!
      state.location = 3 as RefLocation
      state.slot = -1
      state.spillPtr = -1
    }
  }

  private materializeInput(ref: CommandRef, slot: SlotIndex): void {
    const binding = this.inputByRef.get(ref as number)
    if (!binding) {
      return
    }
    const bankState = this.bank(CommandRefType(ref))
    const src = binding.handle.value as unknown as number
    const dst = bankState.slotsPtr + slot * bankState.slotBytes
    const heap = this.memory.uint8()
    heap.copyWithin(dst, src, src + bankState.slotBytes)
  }

  private get(ref: CommandRef): RefState {
    const state = this.refs.get(ref as number)
    if (!state) {
      throw new Error(`Unknown ref ${ref}`)
    }
    return state
  }

  private bank(bank: number): SlotBankState {
    if (bank === SlotType.JSValueSlotType || bank === SlotType.FuncListSlotType) {
      return this.banks[bank]
    }
    throw new Error(`Unknown slot bank: ${bank}`)
  }

  private logRefState(refKey: number, state: RefState): void {
    if (!this.planning) {
      return
    }
    const idx = this.undoCount++
    this.undoKind[idx] = UNDO_REF_STATE
    this.undoRefKey[idx] = refKey
    this.undoRefLocation[idx] = state.location
    this.undoRefSlot[idx] = state.slot
    this.undoRefSpill[idx] = state.spillPtr
  }

  private logSlotToRef(bank: number, slot: number, previousRef: number): void {
    if (!this.planning) {
      return
    }
    const idx = this.undoCount++
    this.undoKind[idx] = UNDO_SLOT_TO_REF
    this.undoBank[idx] = bank
    this.undoSlot[idx] = slot
    this.undoPrevValue[idx] = previousRef
  }

  private logFreePop(bank: number, slot: number): void {
    if (!this.planning) {
      return
    }
    const idx = this.undoCount++
    this.undoKind[idx] = UNDO_FREE_POP
    this.undoBank[idx] = bank
    this.undoSlot[idx] = slot
  }

  private logFreePush(bank: number, slot: number): void {
    if (!this.planning) {
      return
    }
    const idx = this.undoCount++
    this.undoKind[idx] = UNDO_FREE_PUSH
    this.undoBank[idx] = bank
    this.undoSlot[idx] = slot
  }
}

function createSlotBank(
  type: TrackedSlotType,
  capacity: number,
  slotsPtr: number,
  slotBytes: number,
): SlotBankState {
  const free: number[] = []
  for (let i = capacity - 1; i >= 0; i--) {
    free.push(i)
  }
  const slotToRef = new Int32Array(capacity)
  slotToRef.fill(-1)
  return { type, slotsPtr, slotBytes, capacity, free, slotToRef }
}

function writeUtf8Replacement(heap: Uint8Array, offset: number): number {
  heap[offset++] = 0xef
  heap[offset++] = 0xbf
  heap[offset++] = 0xbd
  return offset
}

function countSuccessfulSources(batchSourcePcs: readonly number[], executed: number): number {
  let count = 0
  const limit = Math.min(executed, batchSourcePcs.length)
  for (let i = 0; i < limit; i++) {
    if ((batchSourcePcs[i] ?? -1) >= 0) {
      count++
    }
  }
  return count
}

function findFailedSourcePc(batchSourcePcs: readonly number[], executed: number): number {
  for (let i = Math.max(0, executed); i < batchSourcePcs.length; i++) {
    const pc = batchSourcePcs[i] ?? -1
    if (pc >= 0) {
      return pc
    }
  }
  return -1
}
