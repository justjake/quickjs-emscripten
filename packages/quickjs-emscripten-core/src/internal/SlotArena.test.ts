import assert from "assert"
import { describe, it } from "vitest"
import { SlotArena, FreeList, type Memory } from "./SlotArena"

describe("FreeList", () => {
  it("allocates bump-first then recycled LIFO", () => {
    const freeList = new FreeList<number>(3)

    const a = freeList.alloc()
    const b = freeList.alloc()
    const c = freeList.alloc()

    assert.strictEqual(a, 0)
    assert.strictEqual(b, 1)
    assert.strictEqual(c, 2)

    freeList.free(1)
    freeList.free(2)

    assert.strictEqual(freeList.alloc(), 2)
    assert.strictEqual(freeList.alloc(), 1)
  })

  it("throws on double free in strict mode", () => {
    const freeList = new FreeList<number>(2)
    const slot = freeList.alloc()
    freeList.free(slot)

    assert.throws(() => freeList.free(slot), /Double free/)
  })

  it("supports grow", () => {
    const freeList = new FreeList<number>(1)
    assert.strictEqual(freeList.alloc(), 0)
    assert.throws(() => freeList.alloc(), /full/)

    freeList.grow(3)
    assert.strictEqual(freeList.alloc(), 1)
    assert.strictEqual(freeList.alloc(), 2)
  })
})

describe("SlotArena", () => {
  it("enforces strict exact size when memory is provided without ptr", () => {
    assert.throws(() => new SlotArena(16, 2, new Uint8Array(31)), /must equal 32/)
    assert.doesNotThrow(() => new SlotArena(16, 2, new Uint8Array(32)))
  })

  it("copies bytes in and out of internal arena", () => {
    const arena = new SlotArena<number>(16, 2)
    const src = new Uint8Array(16)
    for (let i = 0; i < src.length; i++) {
      src[i] = i + 1
    }

    arena.copyFromBytes(src, 0, 0)
    arena.copySlot(0, 1)

    const out = new Uint8Array(16)
    arena.copyToBytes(1, out, 0)
    assert.deepStrictEqual([...out], [...src])
  })

  it("uses provider memory on each operation", () => {
    const memA = new Uint8Array(16)
    const memB = new Uint8Array(16)
    for (let i = 0; i < 16; i++) {
      memA[i] = i + 1
      memB[i] = i + 101
    }

    let useA = true
    let calls = 0
    const arena = new SlotArena<number>(16, 1, () => {
      calls++
      return useA ? memA : memB
    })

    const src = new Uint8Array(16)
    src.fill(9)
    arena.copyFromBytes(src, 0, 0)

    useA = false
    const out = new Uint8Array(16)
    arena.copyToBytes(0, out, 0)

    assert.deepStrictEqual([...out], [...memB])
    assert.ok(calls >= 2)
  })

  it("supports Memory malloc/realloc in grow", () => {
    let backing = new Uint8Array(24)
    let allocated = 0
    let resizedTo = -1

    const memoryObject: Memory<number> = {
      uint8: () => backing,
      uint32: () => new Uint32Array(backing.buffer, backing.byteOffset, backing.byteLength >>> 2),
      malloc: (bytes) => {
        allocated = bytes
        return 8
      },
      realloc: (ptr, bytes) => {
        assert.strictEqual(ptr, 8)
        resizedTo = bytes
        const next = new Uint8Array(ptr + bytes)
        next.set(backing.subarray(0, Math.min(backing.length, next.length)), 0)
        backing = next
        return 8
      },
      free: () => {},
    }

    const arena = new SlotArena<number>(8, 2, memoryObject)
    assert.strictEqual(allocated, 16)

    const src = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8])
    arena.copyFromBytes(src, 0, 0)
    assert.deepStrictEqual([...backing.subarray(8, 16)], [...src])

    arena.grow(3)
    assert.strictEqual(resizedTo, 24)
    assert.strictEqual(arena.capacity, 3)
  })

  it("throws when Memory ptr is not 4-byte aligned", () => {
    const backing = new Uint8Array(32)
    const memoryObject: Memory<number> = {
      uint8: () => backing,
      uint32: () => new Uint32Array(backing.buffer, backing.byteOffset, backing.byteLength >>> 2),
      malloc: () => 2,
      realloc: () => 2,
      free: () => {},
    }

    assert.throws(() => new SlotArena<number>(8, 2, memoryObject), /4-byte aligned/)
  })

  it("disallows grow for raw memory without resize", () => {
    const arena = new SlotArena<number>(8, 2, new Uint8Array(16))
    assert.throws(() => arena.grow(3), /only supported/)
  })

  it("allocator methods are composed from FreeList", () => {
    const arena = new SlotArena<number>(8, 2)
    const a = arena.alloc()
    const b = arena.alloc()

    assert.strictEqual(a, 0)
    assert.strictEqual(b, 1)

    arena.free(a)
    assert.strictEqual(arena.alloc(), 0)

    arena.resetAllocator()
    assert.strictEqual(arena.alloc(), 0)
  })
})
