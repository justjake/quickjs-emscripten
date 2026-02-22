import type {
  CommandPointer,
  EitherFFI,
  EitherModule,
  JSContextPointer,
  JSValuePointer,
  JSVoidPointer,
  UInt32Pointer,
} from "@jitl/quickjs-ffi-types"
import { SlotType } from "@jitl/quickjs-ffi-types"
import type {
  RefResolver,
  CommandRef,
  CommandWriteHelpers,
  EncodedBufferRef,
  JSValueRef,
} from "./command-types"
import { CommandRefId, CommandRefType } from "./command-types"
import type { CommandBuilder, InputBinding } from "./CommandBuilder"
import {
  CommandBufferView,
  readErrorMessage,
  type SlotBank,
  type SlotBankTable,
  type TrackedSlotType,
} from "./command-executor-utils"
import { ByteRegionAllocator } from "./internal/ByteRegionAllocator"
import type { Memory } from "./internal/memory-region"
import { StringAllocator, utf8ByteLength, type StringAllocation } from "./internal/StringAllocator"
import { ModuleMemory } from "./memory"
import {
  forEachConsumedRef,
  forEachReadRef,
  forEachWriteRef,
  writeCommand,
  writeSlotFree,
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

type InternalContext = {
  ctx: { value: JSContextPointer }
  memory: { heapValueHandle(ptr: JSValuePointer): QuickJSHandle }
  module: EitherModule
  runtime: {
    hostRefs: { delete(hostRefId: number): void }
  }
}

export interface DirectCommandExecutorOptions {
  commandCapacity?: number
  jsValueSlotCapacity?: number
  funcListSlotCapacity?: number
  jsValueSlotBytes?: number
  funcListSlotBytes?: number
  arenaBytes?: number
  allocations: DirectCommandExecutorAllocations
  memory?: Memory<number>
}

export interface DirectCommandExecutorAllocations {
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

export class DirectCommandExecutorError extends Error {
  readonly failedCommandIndex: number
  readonly successfulCommandCount: number

  constructor(message: string, failedCommandIndex: number, successfulCommandCount: number) {
    super(message)
    this.failedCommandIndex = failedCommandIndex
    this.successfulCommandCount = successfulCommandCount
  }
}

// Dummy result returned during collection phase
const DUMMY_ENCODED: EncodedBufferRef<number, number> = { ptr: 0, len: 0 }

/**
 * First-pass helper that collects strings into StringAllocator
 * and validates encoding parameters. Bytes are allocated immediately.
 */
class StringCollector implements CommandWriteHelpers {
  private readonly stringAllocator: StringAllocator<number>
  private readonly bytesArena: ByteRegionAllocator<number>
  private readonly memory: Memory<number>
  readonly resolveRef: RefResolver

  // Track byte allocations for second pass
  private readonly byteAllocations: Array<{ ptr: number; len: number }> = []

  // Track len overrides for strings (when maxLength causes len=0)
  private readonly lenOverrides: Array<number | undefined> = []

  constructor(
    stringAllocator: StringAllocator<number>,
    bytesArena: ByteRegionAllocator<number>,
    memory: Memory<number>,
    resolveRef: RefResolver,
  ) {
    this.stringAllocator = stringAllocator
    this.bytesArena = bytesArena
    this.memory = memory
    this.resolveRef = resolveRef
  }

  encodeUtf8<Ptr extends number = number, Len extends number = number>(
    value: string,
    maxLength?: number,
    errorOnNull?: boolean,
  ): EncodedBufferRef<Ptr, Len> {
    const payloadLength = utf8ByteLength(value)
    const containsNull = value.includes("\0")

    if (errorOnNull && containsNull) {
      throw new Error("UTF-8 input contains NUL byte")
    }

    let lenOverride: number | undefined

    if (maxLength !== undefined) {
      if (!Number.isInteger(maxLength) || maxLength < 0) {
        throw new Error(`Invalid maxLength: ${maxLength}`)
      }

      if (errorOnNull === false) {
        if (containsNull && payloadLength > maxLength) {
          throw new Error(
            `UTF-8 length overflow with embedded NUL: ${payloadLength} > ${maxLength}`,
          )
        }
        // When errorOnNull=false and no null, overflow means len=0
        if (!containsNull && payloadLength > maxLength) {
          lenOverride = 0
        }
      } else if (payloadLength > maxLength) {
        throw new Error(`UTF-8 length overflow: ${payloadLength} > ${maxLength}`)
      }
    }

    this.stringAllocator.addString(value)
    this.lenOverrides.push(lenOverride)
    return DUMMY_ENCODED as EncodedBufferRef<Ptr, Len>
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

    // Allocate bytes immediately since ByteRegionAllocator doesn't batch
    const ptr = this.bytesArena.reserve(byteLength)
    this.memory.uint8().set(value, ptr)
    this.byteAllocations.push({ ptr, len: byteLength })

    return DUMMY_ENCODED as EncodedBufferRef<Ptr, Len>
  }

  getByteAllocations(): Array<{ ptr: number; len: number }> {
    return this.byteAllocations
  }

  getLenOverrides(): Array<number | undefined> {
    return this.lenOverrides
  }
}

/**
 * Second-pass helper that emits pre-allocated string pointers.
 */
class StringEmitter implements CommandWriteHelpers {
  private readonly stringAllocation: StringAllocation
  private readonly byteAllocations: readonly { ptr: number; len: number }[]
  private readonly lenOverrides: readonly (number | undefined)[]
  private stringCursor = 0
  private bytesCursor = 0
  readonly resolveRef: RefResolver

  constructor(
    stringAllocation: StringAllocation,
    byteAllocations: readonly { ptr: number; len: number }[],
    lenOverrides: readonly (number | undefined)[],
    resolveRef: RefResolver,
  ) {
    this.stringAllocation = stringAllocation
    this.byteAllocations = byteAllocations
    this.lenOverrides = lenOverrides
    this.resolveRef = resolveRef
  }

  encodeUtf8<Ptr extends number = number, Len extends number = number>(
    _value: string,
    _maxLength?: number,
    _errorOnNull?: boolean,
  ): EncodedBufferRef<Ptr, Len> {
    const index = this.stringCursor++
    const ptr = this.stringAllocation.ptrs[index]!
    const lenOverride = this.lenOverrides[index]
    const len = lenOverride !== undefined ? lenOverride : this.stringAllocation.byteLengths[index]!
    return { ptr, len } as EncodedBufferRef<Ptr, Len>
  }

  encodeBytes<Ptr extends number = number, Len extends number = number>(
    _value: Uint8Array,
    _maxLength?: number,
  ): EncodedBufferRef<Ptr, Len> {
    const alloc = this.byteAllocations[this.bytesCursor++]!
    return { ptr: alloc.ptr, len: alloc.len } as EncodedBufferRef<Ptr, Len>
  }
}

export class DirectCommandExecutor {
  private readonly module: EitherModule
  private readonly ffi: EitherFFI
  private readonly memory: Memory<number>
  private readonly bytesArena: ByteRegionAllocator<number>
  private readonly stringAllocator: StringAllocator<number>
  private readonly commandCapacity: number
  private readonly commandBufferPtr: number
  private readonly outStatusPtr: number
  private readonly outErrorPtr: number

  private readonly banks: SlotBankTable<SlotBank>
  private readonly commandBufView: CommandBufferView

  constructor(module: EitherModule, ffi: EitherFFI, options: DirectCommandExecutorOptions) {
    this.module = module
    this.ffi = ffi
    this.memory = options.memory ?? new ModuleMemory(module)

    const allocations = options.allocations
    if (!allocations) {
      throw new Error(
        "DirectCommandExecutor requires options.allocations with preallocated buffer pointers",
      )
    }

    this.commandCapacity = options.commandCapacity ?? DEFAULT_COMMAND_CAPACITY
    const jsValueSlotCapacity = options.jsValueSlotCapacity ?? DEFAULT_JSVALUE_SLOT_CAPACITY
    const funcListSlotCapacity = options.funcListSlotCapacity ?? DEFAULT_FUNCLIST_SLOT_CAPACITY
    const jsValueSlotBytes = options.jsValueSlotBytes ?? DEFAULT_JSVALUE_SLOT_BYTES
    const funcListSlotBytes = options.funcListSlotBytes ?? DEFAULT_FUNCLIST_SLOT_BYTES
    const arenaBytes = options.arenaBytes ?? DEFAULT_ARENA_BYTES

    this.commandBufferPtr = allocations.commandBufferPtr
    this.outStatusPtr = allocations.outStatusPtr
    this.outErrorPtr = allocations.outErrorPtr

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

    this.commandBufView = new CommandBufferView(this.memory, this.commandBufferPtr, this.commandCapacity)
    this.bytesArena = new ByteRegionAllocator(allocations.arenaPtr, arenaBytes)
    this.stringAllocator = new StringAllocator(this.memory)
  }

  resolveRef: RefResolver = (ref) => {
    const refId = CommandRefId(ref)
    return (refId - 1) as any
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

    // Phase 1: Validate capacity
    const maxRefIds = this.findMaxRefIds(commands, inputBindings, returnRefs)
    this.validateCapacity(maxRefIds)

    if (commands.length > this.commandCapacity) {
      throw new DirectCommandExecutorError(
        `Too many commands: ${commands.length} > ${this.commandCapacity}`,
        0,
        0,
      )
    }

    // Phase 2: First pass - collect strings and validate encoding
    this.stringAllocator.reset()
    this.bytesArena.reset()
    const collector = new StringCollector(
      this.stringAllocator,
      this.bytesArena,
      this.memory,
      this.resolveRef,
    )

    // Dry run to collect strings (command buffer contents are ignored)
    const dummyBuf = this.commandBufView.get()
    for (let i = 0; i < commands.length; i++) {
      const offset = (i * COMMAND_SIZE_BYTES) as any
      writeCommand(dummyBuf, offset, commands[i]!, collector)
    }

    // Phase 3: Allocate all strings
    const stringAllocation = this.stringAllocator.finish()

    // Phase 4: Materialize input bindings to slots
    this.materializeInputBindings(inputBindings)

    // Phase 5: Second pass - write commands with pre-allocated strings
    const emitter = new StringEmitter(
      stringAllocation,
      collector.getByteAllocations(),
      collector.getLenOverrides(),
      this.resolveRef,
    )
    const view = this.commandBufView.get()
    for (let i = 0; i < commands.length; i++) {
      const offset = (i * COMMAND_SIZE_BYTES) as any
      writeCommand(view, offset, commands[i]!, emitter)
    }

    // Phase 6: Execute batch
    const jsValueBank = this.banks[SlotType.JSValueSlotType]
    const funcListBank = this.banks[SlotType.FuncListSlotType]

    const words = this.memory.uint32()
    words[this.outStatusPtr >>> 2] = COMMAND_OK
    words[this.outErrorPtr >>> 2] = 0

    const executed = this.ffi.QTS_ExecuteCommands(
      ctxPtr,
      commands.length,
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

    // Phase 7: Handle result
    if (status !== COMMAND_OK || executed !== commands.length) {
      const message =
        readErrorMessage(this.module, errorPtr) ??
        `QTS_ExecuteCommands failed after ${executed}/${commands.length}`

      this.cleanupProducedRefs(ctxPtr, commands, executed)

      for (let i = 0; i < functionBindings.length; i++) {
        context.runtime.hostRefs.delete(functionBindings[i]!.hostRefId as number)
      }

      builder.finalizeConsumedInputs(executed)
      throw new DirectCommandExecutorError(message, executed, executed)
    }

    // Phase 8: Collect return handles
    const handles = this.collectReturnHandles(returnRefs, context)

    // Phase 9: Cleanup non-returned produced refs
    this.cleanupProducedRefs(ctxPtr, commands, executed, returnRefs)

    // Phase 10: Finalize consumed inputs
    builder.finalizeConsumedInputs(commands.length)

    return {
      handles,
      successfulCount: commands.length,
      batchesExecuted: 1,
    }
  }

  private findMaxRefIds(
    commands: readonly Command[],
    inputBindings: readonly InputBinding[],
    returnRefs: readonly JSValueRef[],
  ): SlotBankTable<number> {
    const maxRefIds: SlotBankTable<number> = {
      [SlotType.JSValueSlotType]: 0,
      [SlotType.FuncListSlotType]: 0,
    }

    const updateMax = (ref: CommandRef): void => {
      const bank = CommandRefType(ref) as TrackedSlotType
      const refId = CommandRefId(ref)
      if (refId > maxRefIds[bank]) {
        maxRefIds[bank] = refId
      }
    }

    for (let i = 0; i < commands.length; i++) {
      const command = commands[i]!
      forEachReadRef(command, updateMax)
      forEachWriteRef(command, updateMax)
      forEachConsumedRef(command, updateMax)
    }

    for (let i = 0; i < inputBindings.length; i++) {
      updateMax(inputBindings[i]!.ref as CommandRef)
    }

    for (let i = 0; i < returnRefs.length; i++) {
      updateMax(returnRefs[i] as CommandRef)
    }

    return maxRefIds
  }

  private validateCapacity(maxRefIds: SlotBankTable<number>): void {
    const jsValueMax = maxRefIds[SlotType.JSValueSlotType]
    const jsValueCapacity = this.banks[SlotType.JSValueSlotType].capacity
    if (jsValueMax > jsValueCapacity) {
      throw new DirectCommandExecutorError(
        `JSValue slot capacity exceeded: need ${jsValueMax} slots, have ${jsValueCapacity}`,
        0,
        0,
      )
    }

    const funcListMax = maxRefIds[SlotType.FuncListSlotType]
    const funcListCapacity = this.banks[SlotType.FuncListSlotType].capacity
    if (funcListMax > funcListCapacity) {
      throw new DirectCommandExecutorError(
        `FuncList slot capacity exceeded: need ${funcListMax} slots, have ${funcListCapacity}`,
        0,
        0,
      )
    }
  }

  private materializeInputBindings(inputBindings: readonly InputBinding[]): void {
    const heap = this.memory.uint8()
    for (let i = 0; i < inputBindings.length; i++) {
      const binding = inputBindings[i]!
      const ref = binding.ref as CommandRef
      const bank = this.banks[CommandRefType(ref) as TrackedSlotType]
      const slot = this.resolveRef(ref)
      const src = binding.handle.value as unknown as number
      const dst = bank.ptr + slot * bank.slotBytes
      heap.copyWithin(dst, src, src + bank.slotBytes)
    }
  }

  private collectReturnHandles(
    returnRefs: readonly JSValueRef[],
    context: InternalContext,
  ): Map<JSValueRef, QuickJSHandle> {
    const handles = new Map<JSValueRef, QuickJSHandle>()
    const ctxPtr = context.ctx.value
    const jsValueBank = this.banks[SlotType.JSValueSlotType]

    for (let i = 0; i < returnRefs.length; i++) {
      const ref = returnRefs[i]!
      if (CommandRefType(ref) !== SlotType.JSValueSlotType) {
        throw new Error(`Unsupported return ref slot type: ${CommandRefType(ref)}`)
      }
      const slot = this.resolveRef(ref)
      const slotPtr = jsValueBank.ptr + slot * jsValueBank.slotBytes
      const dup = this.ffi.QTS_DupValuePointer(ctxPtr, slotPtr as unknown as JSValuePointer)
      handles.set(ref, context.memory.heapValueHandle(dup))
    }

    return handles
  }

  private cleanupProducedRefs(
    ctxPtr: JSContextPointer,
    commands: readonly Command[],
    executedCount: number,
    skipRefs?: readonly JSValueRef[],
  ): void {
    const producedRefs = new Set<number>()
    const skipRefSet = new Set<number>()

    if (skipRefs) {
      for (let i = 0; i < skipRefs.length; i++) {
        skipRefSet.add(skipRefs[i] as number)
      }
    }

    for (let i = 0; i < executedCount; i++) {
      const command = commands[i]!
      forEachWriteRef(command, (ref) => {
        if (!skipRefSet.has(ref as number)) {
          producedRefs.add(ref as number)
        }
      })
    }

    if (producedRefs.size === 0) {
      return
    }

    const view = this.commandBufView.get()
    let cleanupCount = 0

    const producedRefsArray = Array.from(producedRefs)
    for (let j = 0; j < producedRefsArray.length; j++) {
      const refNum = producedRefsArray[j]!
      if (cleanupCount >= this.commandCapacity) {
        this.flushCleanupBatch(ctxPtr, cleanupCount)
        cleanupCount = 0
      }
      const ref = refNum as unknown as CommandRef
      const bank = CommandRefType(ref) as TrackedSlotType
      const slot = this.resolveRef(ref)
      const offset = (cleanupCount * COMMAND_SIZE_BYTES) as any
      writeSlotFree(view, offset, slot, bank)
      cleanupCount++
    }

    if (cleanupCount > 0) {
      this.flushCleanupBatch(ctxPtr, cleanupCount)
    }
  }

  private flushCleanupBatch(ctxPtr: JSContextPointer, count: number): void {
    if (count === 0) {
      return
    }
    const jsValueBank = this.banks[SlotType.JSValueSlotType]
    const funcListBank = this.banks[SlotType.FuncListSlotType]

    this.ffi.QTS_ExecuteCommands(
      ctxPtr,
      count,
      this.commandBufferPtr as unknown as CommandPointer,
      jsValueBank.ptr as unknown as JSValuePointer,
      jsValueBank.capacity,
      funcListBank.ptr as unknown as JSVoidPointer,
      funcListBank.capacity,
      this.outStatusPtr as unknown as UInt32Pointer,
      this.outErrorPtr as unknown as UInt32Pointer,
    )
  }
}
