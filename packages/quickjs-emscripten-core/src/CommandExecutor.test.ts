import { describe, expect, it, vi } from "vitest"
import { CommandBuilder } from "./CommandBuilder"
import { CommandExecutor, CommandExecutorError } from "./CommandExecutor"
import { HostRefMap } from "./host-ref"
import { JSValueLifetime } from "./lifetime"
import * as Op from "./ops"
import type { QuickJSContext } from "./context"
import type { QuickJSHandle } from "./types"
import type { Memory } from "./internal/memory-region"

class TestMemory implements Memory<number> {
  private bytes: Uint8Array
  private words: Uint32Array
  private epochValue = 0
  private nextPtr = 0
  mallocCalls = 0
  reallocCalls = 0

  constructor(initialSize: number) {
    this.bytes = new Uint8Array(initialSize)
    this.words = new Uint32Array(this.bytes.buffer)
  }

  epoch(): number {
    return this.epochValue
  }

  uint8(): Uint8Array {
    return this.bytes
  }

  uint32(): Uint32Array {
    return this.words
  }

  malloc(size: number): number {
    this.mallocCalls++
    const ptr = this.nextPtr
    this.nextPtr += size
    this.ensureCapacity(this.nextPtr)
    return ptr
  }

  realloc(ptr: number, size: number): number {
    this.reallocCalls++
    this.ensureCapacity(ptr + size)
    return ptr
  }

  free(_ptr: number): void {}

  writeCString(value: string): number {
    const bytes = new TextEncoder().encode(value)
    const ptr = this.malloc(bytes.byteLength + 1)
    this.uint8().set(bytes, ptr)
    this.uint8()[ptr + bytes.byteLength] = 0
    return ptr
  }

  private ensureCapacity(required: number): void {
    if (required <= this.bytes.byteLength) {
      return
    }
    let next = this.bytes.byteLength
    while (next < required) {
      next <<= 1
    }
    const grown = new Uint8Array(next)
    grown.set(this.bytes, 0)
    this.bytes = grown
    this.words = new Uint32Array(grown.buffer)
    this.epochValue++
  }
}

type ExecuteCall = {
  count: number
  kinds: number[]
  slotAs: number[]
}

function readCString(bytes: Uint8Array, ptr: number): string {
  let end = ptr
  while (end < bytes.length && bytes[end] !== 0) {
    end++
  }
  return new TextDecoder().decode(bytes.subarray(ptr, end))
}

function makeFakeHandle(memory: TestMemory): QuickJSHandle {
  const ptr = memory.malloc(16)
  return new JSValueLifetime(ptr as any) as unknown as QuickJSHandle
}

function makeHarness(args: {
  executeResults?: number[]
  executeStatus?: number[]
  commandCapacity?: number
  jsValueSlotCapacity?: number
  funcListSlotCapacity?: number
  jsValueSlotBytes?: number
  funcListSlotBytes?: number
  arenaBytes?: number
} = {}): {
  executor: CommandExecutor
  context: QuickJSContext
  calls: ExecuteCall[]
  memory: TestMemory
  getDupCalls: () => number
  getMallocCalls: () => number
  getReallocCalls: () => number
} {
  const executeResults = [...(args.executeResults ?? [])]
  const executeStatus = [...(args.executeStatus ?? [])]
  const memory = new TestMemory(1024)
  const calls: ExecuteCall[] = []
  let dupCalls = 0

  const module = {
    get HEAPU8() {
      return memory.uint8()
    },
    get HEAPU32() {
      return memory.uint32()
    },
    _malloc(size: number) {
      return memory.malloc(size)
    },
    _free(ptr: number) {
      memory.free(ptr)
    },
    UTF8ToString(ptr: number) {
      return readCString(memory.uint8(), ptr)
    },
  }

  const ffi = {
    QTS_DupValuePointer: (_ctx: number, ptr: number) => {
      dupCalls++
      return ptr
    },
    QTS_FreeVoidPointer: () => {},
    QTS_ExecuteCommands: (
      _ctx: number,
      count: number,
      commandBufferPtr: number,
      _jsSlotsPtr: number,
      _jsSlotsCount: number,
      _funclistSlotsPtr: number,
      _funclistSlotsCount: number,
      outStatusPtr: number,
      outErrorPtr: number,
    ) => {
      const bytes = memory.uint8()
      const kinds: number[] = []
      const slotAs: number[] = []
      for (let i = 0; i < count; i++) {
        kinds.push(bytes[commandBufferPtr + i * 16] ?? -1)
        slotAs.push(bytes[commandBufferPtr + i * 16 + 1] ?? -1)
      }
      calls.push({ count, kinds, slotAs })

      const status = executeStatus.shift() ?? 0
      const words = memory.uint32()
      words[outStatusPtr >>> 2] = status
      words[outErrorPtr >>> 2] = status ? memory.writeCString("ffi execute failure") : 0
      return executeResults.shift() ?? count
    },
  }

  const runtime = {
    hostRefs: new HostRefMap(),
    assertOwned: vi.fn(),
  }
  const context = {
    ctx: { value: 1 },
    runtime,
    module,
    memory: {
      heapValueHandle(ptr: number): QuickJSHandle {
        return new JSValueLifetime(ptr as any) as unknown as QuickJSHandle
      },
    },
  } as unknown as QuickJSContext

  const commandCapacity = args.commandCapacity ?? 128
  const jsValueSlotCapacity = args.jsValueSlotCapacity ?? 8
  const funcListSlotCapacity = args.funcListSlotCapacity ?? 4
  const jsValueSlotBytes = args.jsValueSlotBytes ?? 16
  const funcListSlotBytes = args.funcListSlotBytes ?? 8
  const arenaBytes = args.arenaBytes ?? 1024
  const executor = new CommandExecutor(module as any, ffi as any, {
    memory,
    commandCapacity,
    jsValueSlotCapacity,
    funcListSlotCapacity,
    jsValueSlotBytes,
    funcListSlotBytes,
    arenaBytes,
    allocations: {
      commandBufferPtr: memory.malloc(commandCapacity * 16),
      jsValueSlotsPtr: memory.malloc(jsValueSlotCapacity * jsValueSlotBytes),
      funcListSlotsPtr: memory.malloc(funcListSlotCapacity * funcListSlotBytes),
      outStatusPtr: memory.malloc(4),
      outErrorPtr: memory.malloc(4),
      arenaPtr: memory.malloc(arenaBytes),
    },
  })

  return {
    executor,
    context,
    calls,
    memory,
    getDupCalls: () => dupCalls,
    getMallocCalls: () => memory.mallocCalls,
    getReallocCalls: () => memory.reallocCalls,
  }
}

describe("CommandExecutor", () => {
  it("executes source commands and returns requested refs as handles", () => {
    const { executor, context, calls } = makeHarness()
    const builder = new CommandBuilder(context)

    const obj = builder.newObject()
    builder.setProp(obj, "x", 123)

    const result = executor.execute(builder, { returnRefs: [obj] })
    expect(result.successfulCount).toBe(builder.getCommands().length)
    expect(result.batchesExecuted).toBeGreaterThan(0)
    expect(result.handles.has(obj)).toBe(true)
    expect(calls.length).toBeGreaterThan(0)
    expect(calls[0]?.kinds[0]).toBe(Op.NEW_OBJECT)
  })

  it("throws CommandExecutorError with failed source index on ffi failure", () => {
    const { executor, context, memory } = makeHarness({
      executeResults: [0],
      executeStatus: [1],
    })
    const builder = new CommandBuilder(context)
    const target = makeFakeHandle(memory)
    const moved = makeFakeHandle(memory)
    builder.setProp(target, "x", builder.consume(moved))

    expect(() => executor.execute(builder)).toThrow(CommandExecutorError)
    expect(moved.alive).toBe(true)
  })

  it("encodes source SLOT_FREE using resolved concrete slot index", () => {
    const { executor, context, calls } = makeHarness()
    const builder = new CommandBuilder(context)

    const funclist = builder.newFuncList(1)
    builder.freeFuncList(funclist)

    executor.execute(builder)

    const allKinds = calls.flatMap((call) => call.kinds)
    const allSlotAs = calls.flatMap((call) => call.slotAs)
    const slotFreeIndex = allKinds.indexOf(Op.SLOT_FREE)
    expect(slotFreeIndex).toBeGreaterThanOrEqual(0)
    expect(allSlotAs[slotFreeIndex]).toBe(0)
  })

  it("does not duplicate borrowed inputs for normal input materialization", () => {
    const { executor, context, memory, getDupCalls } = makeHarness()
    const builder = new CommandBuilder(context)
    const target = makeFakeHandle(memory)

    builder.setProp(target, "x", 123)
    executor.execute(builder)

    expect(getDupCalls()).toBe(0)
  })

  it("restores planned state on partial batch failure before cleanup", () => {
    const { executor, context, calls } = makeHarness({
      executeResults: [1],
      executeStatus: [1],
    })
    const builder = new CommandBuilder(context)
    const obj = builder.newObject()
    builder.setProp(obj, "x", 1)

    expect(() => executor.execute(builder)).toThrow(CommandExecutorError)
    expect(calls.length).toBe(2)
    expect(calls[1]?.kinds).toEqual([Op.SLOT_FREE])
  })

  it("fails when one source command plus planner ops cannot fit in empty command buffer", () => {
    const { executor, context } = makeHarness({ commandCapacity: 1 })
    const builder = new CommandBuilder(context)
    const obj = builder.newObject()
    builder.setProp(obj, "x", 1)

    try {
      executor.execute(builder)
      throw new Error("expected execute to throw")
    } catch (error) {
      expect(error).toBeInstanceOf(CommandExecutorError)
      const commandError = error as CommandExecutorError
      expect(commandError.failedCommandIndex).toBe(1)
      expect(commandError.message).toContain("cannot fit command 1 in empty batch")
      expect(commandError.message).toContain("requires 2 command slots")
    }
  })

  it("does not allocate wasm memory during execute() for non-returning flows", () => {
    const { executor, context, getMallocCalls, getReallocCalls } = makeHarness()
    const builder = new CommandBuilder(context)
    const obj = builder.newObject()
    builder.setProp(obj, "x", 1)

    const mallocBefore = getMallocCalls()
    const reallocBefore = getReallocCalls()
    executor.execute(builder)

    expect(getMallocCalls()).toBe(mallocBefore)
    expect(getReallocCalls()).toBe(reallocBefore)
  })

  it("encodes UTF-8 payloads identically to TextEncoder", () => {
    const { executor, memory } = makeHarness()
    const encoder = new TextEncoder()
    const values = ["plain", "emoji-\ud83d\ude42", "\ud800", "\udc00", "nul\0byte"]

    for (let i = 0; i < values.length; i++) {
      const value = values[i]!
      const encoded = executor.encodeUtf8(value)
      const expected = encoder.encode(value)
      const actual = memory.uint8().slice(encoded.ptr, encoded.ptr + expected.byteLength)

      expect([...actual]).toEqual([...expected])
      expect(encoded.len).toBe(expected.byteLength)
      expect(memory.uint8()[encoded.ptr + expected.byteLength]).toBe(0)
    }
  })
})
