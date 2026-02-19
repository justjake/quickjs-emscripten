import assert from "assert"
import { describe, it } from "vitest"
import { ByteRegionAllocator } from "./ByteRegionAllocator"

describe("ByteRegionAllocator", () => {
  it("allocates monotonic pointers within a region", () => {
    const allocator = new ByteRegionAllocator<number>(12, 16)

    const a = allocator.reserve(5)
    const b = allocator.reserve(3)
    const c = allocator.reserve(7)

    assert.strictEqual(a, 12)
    assert.strictEqual(b, 17)
    assert.strictEqual(c, 20)
    assert.strictEqual(allocator.used, 15)
  })

  it("reset resets bump offset", () => {
    const allocator = new ByteRegionAllocator<number>(16, 16)

    allocator.reserve(10)
    allocator.reserve(6)
    allocator.reset()

    const ptr = allocator.reserve(4)
    assert.strictEqual(ptr, 16)
    assert.strictEqual(allocator.used, 4)
  })

  it("throws when reservation exceeds capacity", () => {
    const allocator = new ByteRegionAllocator<number>(8, 16)
    assert.throws(() => allocator.reserve(17), /overflow/)
  })

  it("setRegion replaces pointer and capacity", () => {
    const allocator = new ByteRegionAllocator<number>(8, 8)
    allocator.reserve(4)

    allocator.setRegion(32, 24)
    const ptr = allocator.reserve(8)

    assert.strictEqual(ptr, 32)
    assert.strictEqual(allocator.capacity, 24)
    assert.strictEqual(allocator.used, 8)
  })
})

