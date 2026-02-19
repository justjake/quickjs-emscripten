import assert from "assert"
import { describe, it } from "vitest"
import { ArrayBufferMemory } from "./memory-region"
import { StringAllocator, utf8ByteLength } from "./StringAllocator"

function readCString(bytes: Uint8Array, ptr: number): Uint8Array {
  let end = ptr
  while (end < bytes.length && bytes[end] !== 0) {
    end++
  }
  return bytes.subarray(ptr, end)
}

describe("StringAllocator", () => {
  it("encodes ASCII strings with null terminators", () => {
    const memory = new ArrayBufferMemory(64, 20)
    const manager = new StringAllocator(memory)

    manager.reset()
    manager.addString("ab")
    manager.addString("xyz")
    const { ptrs, byteLengths } = manager.finish()

    assert.ok(ptrs instanceof Uint32Array)
    assert.deepStrictEqual([...byteLengths], [2, 3])

    const bytes = memory.uint8()
    assert.deepStrictEqual([...bytes.subarray(ptrs[0], ptrs[0] + 3)], [97, 98, 0])
    assert.deepStrictEqual([...bytes.subarray(ptrs[1], ptrs[1] + 4)], [120, 121, 122, 0])
  })

  it("encodes multibyte UTF-8 correctly", () => {
    const memory = new ArrayBufferMemory(128, 8)
    const manager = new StringAllocator(memory)
    const encoder = new TextEncoder()
    const input = ["é", "😀", "漢字"]

    manager.reset()
    for (const value of input) {
      manager.addString(value)
    }
    const { ptrs, byteLengths } = manager.finish()
    const bytes = memory.uint8()

    for (let i = 0; i < input.length; i++) {
      const expected = encoder.encode(input[i])
      assert.strictEqual(byteLengths[i], expected.byteLength)
      assert.deepStrictEqual([...bytes.subarray(ptrs[i], ptrs[i] + expected.byteLength)], [...expected])
      assert.strictEqual(bytes[ptrs[i] + expected.byteLength], 0)
    }
  })

  it("handles empty strings", () => {
    const memory = new ArrayBufferMemory(64, 8)
    const manager = new StringAllocator(memory)

    manager.reset()
    manager.addString("")
    const { ptrs, byteLengths } = manager.finish()

    assert.strictEqual(byteLengths[0], 0)
    assert.strictEqual(memory.uint8()[ptrs[0]], 0)
  })

  it("preserves embedded NUL bytes in payload", () => {
    const memory = new ArrayBufferMemory(64, 8)
    const manager = new StringAllocator(memory)

    manager.reset()
    manager.addString("a\u0000b")
    const { ptrs, byteLengths } = manager.finish()
    const bytes = memory.uint8()

    assert.strictEqual(byteLengths[0], 3)
    assert.deepStrictEqual([...bytes.subarray(ptrs[0], ptrs[0] + 4)], [97, 0, 98, 0])
  })

  it("supports large batches without per-result object allocation", () => {
    const memory = new ArrayBufferMemory(256, 8)
    const manager = new StringAllocator(memory, { initialStringCapacity: 4 })
    const count = 500

    manager.reset()
    for (let i = 0; i < count; i++) {
      manager.addString(`k${i}`)
    }
    const { ptrs, byteLengths } = manager.finish()

    assert.strictEqual(ptrs.length, count)
    assert.strictEqual(byteLengths.length, count)
    assert.ok(ptrs instanceof Uint32Array)
  })

  it("reuses allocator after reset", () => {
    const memory = new ArrayBufferMemory(64, 24)
    const manager = new StringAllocator(memory)

    manager.reset()
    manager.addString("first")
    const first = manager.finish()

    manager.reset()
    manager.addString("second")
    const second = manager.finish()

    assert.strictEqual(first.ptrs[0], 24)
    assert.strictEqual(second.ptrs[0], 24)
  })

  it("returned ptr+len and ptr-only reads both work", () => {
    const memory = new ArrayBufferMemory(64, 12)
    const manager = new StringAllocator(memory)
    const encoder = new TextEncoder()
    const value = "hello"

    manager.reset()
    manager.addString(value)
    const { ptrs, byteLengths } = manager.finish()
    const ptr = ptrs[0]
    const bytes = memory.uint8()

    const explicit = bytes.subarray(ptr, ptr + byteLengths[0])
    const cString = readCString(bytes, ptr)
    const expected = encoder.encode(value)

    assert.deepStrictEqual([...explicit], [...expected])
    assert.deepStrictEqual([...cString], [...expected])
  })
})

describe("utf8ByteLength", () => {
  it("matches TextEncoder byteLength for representative inputs", () => {
    const encoder = new TextEncoder()
    const inputs = ["", "abc", "é", "😀", "a\u0000b", "\ud800", "\udc00", "漢字"]

    for (const value of inputs) {
      assert.strictEqual(utf8ByteLength(value), encoder.encode(value).byteLength)
    }
  })
})
