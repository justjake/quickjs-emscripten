import assert from "assert"
import { describe, it } from "vitest"
import { type Memory, ArrayBufferMemory } from "./memory-region"
import { PtrArrayBuffer } from "./PtrTypedArray"

describe("PtrArrayBuffer", () => {
  it("reuses cached bytes until memory epoch changes", () => {
    const memory = new ArrayBufferMemory(16)
    const ptr = memory.malloc(8)
    const region = new PtrArrayBuffer(memory, ptr, 8)

    const bytesA = region.bytes()
    bytesA.set([1, 2, 3, 4], 0)

    const bytesB = region.bytes()
    assert.strictEqual(bytesA, bytesB)

    const epochBefore = memory.epoch()
    memory.realloc(ptr, 32)
    assert.ok(memory.epoch() > epochBefore)

    const bytesC = region.bytes()
    assert.notStrictEqual(bytesC, bytesA)
    assert.deepStrictEqual([...bytesC.subarray(0, 4)], [1, 2, 3, 4])
  })

  it("maps ptr relative to Memory.uint8() window", () => {
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

    const region = new PtrArrayBuffer(memory, 4, 3)
    region.withBytes((value) => {
      value.set([9, 8, 7], 0)
    })

    assert.deepStrictEqual([...backing.subarray(12, 15)], [9, 8, 7])
  })

  it("supports rebind with byteLength changes", () => {
    const memory = new ArrayBufferMemory(32)
    const region = new PtrArrayBuffer(memory, 0, 4)

    region.bytes().set([10, 20, 30, 40], 0)
    assert.deepStrictEqual([...memory.uint8().subarray(0, 4)], [10, 20, 30, 40])

    region.rebind(8, 4)
    region.bytes().set([1, 2, 3, 4], 0)
    assert.deepStrictEqual([...memory.uint8().subarray(8, 12)], [1, 2, 3, 4])
  })

  it("grows with realloc and preserves existing bytes", () => {
    const memory = new ArrayBufferMemory(16)
    const region = new PtrArrayBuffer(memory, 0, 4)
    region.bytes().set([7, 8, 9, 10], 0)

    region.grow(8)

    assert.strictEqual(region.byteLength, 8)
    assert.deepStrictEqual([...region.bytes().subarray(0, 4)], [7, 8, 9, 10])
    assert.throws(() => region.grow(2), /Cannot shrink/)
  })

  it("creates DataView windows with range checks", () => {
    const memory = new ArrayBufferMemory(32)
    const region = new PtrArrayBuffer(memory, 4, 8)
    const view = region.dataView(2, 4)

    view.setUint16(0, 0xabcd, true)
    assert.strictEqual(memory.uint8()[6], 0xcd)
    assert.throws(() => region.dataView(7, 2), /out of bounds/)
  })

  it("withDataView and asTypedArray work", () => {
    const memory = new ArrayBufferMemory(32)
    const region = new PtrArrayBuffer(memory, 4, 8)

    region.withDataView((dataView) => {
      dataView.setUint32(0, 0x01020304, true)
    })

    const typed = region.asPtrTypedArray(Uint8Array)
    assert.deepStrictEqual([...typed.typedArray().subarray(0, 4)], [4, 3, 2, 1])
    assert.strictEqual(typed.length, 8)
  })

  it("caches full-size DataView and invalidates it on epoch or rebind", () => {
    const memory = new ArrayBufferMemory(16)
    const ptr = memory.malloc(8)
    const region = new PtrArrayBuffer(memory, ptr, 8)

    const fullA = region.dataView()
    const fullB = region.dataView()
    assert.strictEqual(fullA, fullB)

    const subA = region.dataView(1, 2)
    const subB = region.dataView(1, 2)
    assert.notStrictEqual(subA, subB)

    const epochBefore = memory.epoch()
    memory.realloc(ptr, 32)
    assert.ok(memory.epoch() > epochBefore)

    const fullC = region.dataView()
    assert.notStrictEqual(fullC, fullA)

    region.rebind(4, 8)
    const fullD = region.dataView()
    assert.notStrictEqual(fullD, fullC)
  })
})
