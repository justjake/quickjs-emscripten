import assert from "assert"
import { describe, it } from "vitest"
import { type Memory, ArrayBufferMemory } from "./memory-region"
import { PtrTypedArray } from "./PtrTypedArray"

describe("PtrTypedArray", () => {
  it("reuses cached view until memory epoch changes", () => {
    const memory = new ArrayBufferMemory(16)
    const ptr = memory.malloc(8)

    const viewPtr = new PtrTypedArray(memory, Uint32Array, ptr, 2)
    const viewA = viewPtr.typedArray()
    viewA[0] = 11
    viewA[1] = 22

    const viewB = viewPtr.typedArray()
    assert.strictEqual(viewA, viewB)

    const epochBefore = memory.epoch()
    memory.realloc(ptr, 32)
    assert.ok(memory.epoch() > epochBefore)

    const viewC = viewPtr.typedArray()
    assert.notStrictEqual(viewC, viewA)
    assert.deepStrictEqual([...viewC], [11, 22])
  })

  it("maps ptr offsets relative to Memory.uint8() window", () => {
    const backing = new Uint8Array(64)
    const bytes = backing.subarray(8, 40)
    const words = new Uint32Array(backing.buffer, bytes.byteOffset, bytes.byteLength >>> 2)

    const memory: Memory<number> = {
      epoch: () => 0,
      uint8: () => bytes,
      uint32: () => words,
      malloc: () => 0,
      realloc: (ptr) => ptr,
      free: () => {},
    }

    const viewPtr = new PtrTypedArray(memory, Uint8Array, 4, 3)
    viewPtr.withTypedArray((view) => {
      view.set([1, 2, 3], 0)
    })

    assert.deepStrictEqual([...backing.subarray(12, 15)], [1, 2, 3])
  })

  it("supports rebinding ptr and length", () => {
    const memory = new ArrayBufferMemory(32)
    const viewPtr = new PtrTypedArray(memory, Uint8Array, 0, 4)

    const first = viewPtr.typedArray()
    first.set([5, 6, 7, 8], 0)
    assert.deepStrictEqual([...memory.uint8().subarray(0, 4)], [5, 6, 7, 8])

    viewPtr.rebind(8, 4)
    const second = viewPtr.typedArray()
    assert.notStrictEqual(second, first)
    second.set([9, 10, 11, 12], 0)

    assert.deepStrictEqual([...memory.uint8().subarray(8, 12)], [9, 10, 11, 12])
  })

  it("supports typed-array read/write through view()", () => {
    const memory = new ArrayBufferMemory(16)
    const viewPtr = new PtrTypedArray(memory, Uint8Array, 2, 4)

    const view = viewPtr.typedArray()
    view[0] = 99
    assert.strictEqual(view[0], 99)
    assert.strictEqual(memory.uint8()[2], 99)
  })

  it("converts to PtrArrayBuffer, DataView, and another PtrTypedArray", () => {
    const memory = new ArrayBufferMemory(64)
    const typed = new PtrTypedArray(memory, Uint16Array, 8, 4)
    typed.typedArray().set([1, 2, 3, 4], 0)

    const buffer = typed.buffer
    assert.strictEqual(buffer.byteLength, 8)

    typed.withDataView((dataView) => {
      dataView.setUint16(0, 0x00ff, true)
    })
    const value = typed.dataView().getUint16(0, true)

    const bytes = typed.asPtrTypedArray(Uint8Array)
    assert.strictEqual(bytes.length, 8)
    assert.strictEqual(value, 0x00ff)
    assert.strictEqual(bytes.typedArray()[0], 0xff)
  })
})
