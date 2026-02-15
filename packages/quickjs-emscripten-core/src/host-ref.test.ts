import assert from "assert"
import { describe, it } from "vitest"
import { HostRefMap, INVALID_HOST_REF_ID } from "./host-ref"
import { QuickJSHostRefInvalid, QuickJSHostRefRangeExceeded } from "./errors"

const INT32_MAX = 2147483647

describe("HostRefMap", () => {
  describe("put", () => {
    it("stores a value and returns an ID", () => {
      const map = new HostRefMap()
      const value = { name: "test" }
      const id = map.put(value)
      assert.notStrictEqual(id, INVALID_HOST_REF_ID)
      assert.strictEqual(typeof id, "number")
    })

    it("returns unique IDs for different values", () => {
      const map = new HostRefMap()
      const id1 = map.put({ a: 1 })
      const id2 = map.put({ b: 2 })
      const id3 = map.put({ c: 3 })
      assert.notStrictEqual(id1, id2)
      assert.notStrictEqual(id2, id3)
      assert.notStrictEqual(id1, id3)
    })

    it("never returns INVALID_HOST_REF_ID (0)", () => {
      const map = new HostRefMap()
      const ids: number[] = []
      // Allocate enough IDs to potentially hit 0 if the implementation is wrong
      for (let i = 0; i < 1000; i++) {
        ids.push(map.put({ i }))
      }
      assert.ok(!ids.includes(INVALID_HOST_REF_ID))
    })
  })

  describe("get", () => {
    it("retrieves a stored value by ID", () => {
      const map = new HostRefMap()
      const value = { name: "test" }
      const id = map.put(value)
      const retrieved = map.get(id)
      assert.strictEqual(retrieved, value)
    })

    it("throws QuickJSHostRefInvalid for INVALID_HOST_REF_ID", () => {
      const map = new HostRefMap()
      assert.throws(
        () => map.get(INVALID_HOST_REF_ID),
        (err) => err instanceof QuickJSHostRefInvalid && err.message.includes("no host reference id defined"),
      )
    })

    it("throws QuickJSHostRefInvalid for non-existent ID", () => {
      const map = new HostRefMap()
      assert.throws(
        () => map.get(12345 as any),
        (err) => err instanceof QuickJSHostRefInvalid && err.message.includes("is not defined"),
      )
    })

    it("throws QuickJSHostRefInvalid after value is deleted", () => {
      const map = new HostRefMap()
      const id = map.put({ value: "test" })
      map.delete(id)
      assert.throws(
        () => map.get(id),
        (err) => err instanceof QuickJSHostRefInvalid,
      )
    })
  })

  describe("delete", () => {
    it("removes the value from the map", () => {
      const map = new HostRefMap()
      const value = { name: "test" }
      const id = map.put(value)
      map.delete(id)
      assert.throws(() => map.get(id), QuickJSHostRefInvalid)
    })

    it("throws QuickJSHostRefInvalid for INVALID_HOST_REF_ID", () => {
      const map = new HostRefMap()
      assert.throws(
        () => map.delete(INVALID_HOST_REF_ID),
        (err) => err instanceof QuickJSHostRefInvalid && err.message.includes("no host reference id defined"),
      )
    })

    it("throws QuickJSHostRefInvalid for non-existent ID", () => {
      const map = new HostRefMap()
      assert.throws(
        () => map.delete(99999 as any),
        (err) => err instanceof QuickJSHostRefInvalid && err.message.includes("is not defined"),
      )
    })

    it("allows deleting the same ID only once", () => {
      const map = new HostRefMap()
      const id = map.put({ value: "test" })
      map.delete(id)
      assert.throws(() => map.delete(id), QuickJSHostRefInvalid)
    })
  })

  describe("ID recycling (freelist)", () => {
    it("reuses deleted IDs", () => {
      const map = new HostRefMap()
      const id1 = map.put({ first: true })
      map.delete(id1)
      const id2 = map.put({ second: true })
      // The deleted ID should be reused
      assert.strictEqual(id1, id2)
    })

    it("reuses IDs in FIFO order", () => {
      const map = new HostRefMap()
      const id1 = map.put({ a: 1 })
      const id2 = map.put({ b: 2 })
      const id3 = map.put({ c: 3 })

      map.delete(id1)
      map.delete(id2)

      // Should reuse id1 first (FIFO)
      const newId1 = map.put({ d: 4 })
      assert.strictEqual(newId1, id1)

      // Should reuse id2 next
      const newId2 = map.put({ e: 5 })
      assert.strictEqual(newId2, id2)

      // Should allocate new ID
      const newId3 = map.put({ f: 6 })
      assert.notStrictEqual(newId3, id1)
      assert.notStrictEqual(newId3, id2)
      assert.notStrictEqual(newId3, id3)
    })

    it("recycled ID correctly stores new value", () => {
      const map = new HostRefMap()
      const oldValue = { old: true }
      const newValue = { new: true }

      const id = map.put(oldValue)
      assert.strictEqual(map.get(id), oldValue)

      map.delete(id)
      const reusedId = map.put(newValue)

      assert.strictEqual(id, reusedId)
      assert.strictEqual(map.get(reusedId), newValue)
    })
  })

  describe("multiple values", () => {
    it("stores and retrieves multiple distinct values", () => {
      const map = new HostRefMap()
      const values = [{ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }, { e: 5 }]
      const ids = values.map((v) => map.put(v))

      for (let i = 0; i < values.length; i++) {
        assert.strictEqual(map.get(ids[i]), values[i])
      }
    })

    it("deleting one value does not affect others", () => {
      const map = new HostRefMap()
      const value1 = { first: true }
      const value2 = { second: true }
      const value3 = { third: true }

      const id1 = map.put(value1)
      const id2 = map.put(value2)
      const id3 = map.put(value3)

      map.delete(id2)

      assert.strictEqual(map.get(id1), value1)
      assert.throws(() => map.get(id2), QuickJSHostRefInvalid)
      assert.strictEqual(map.get(id3), value3)
    })
  })

  describe("group cleanup", () => {
    it("cleans up empty groups when last entry is deleted", () => {
      const map = new HostRefMap()
      // Access private groups for testing
      const groups = (map as any).groups as Map<number, Map<number, object>>

      const id = map.put({ test: true })
      const groupId = id >> 8

      assert.ok(groups.has(groupId), "group should exist after put")
      map.delete(id)
      assert.ok(!groups.has(groupId), "group should be deleted when empty")
    })
  })

  describe("range exceeded", () => {
    it("throws QuickJSHostRefRangeExceeded when all IDs are exhausted", () => {
      const map = new HostRefMap()
      // Manipulate private nextId to be at the limit
      ;(map as any).nextId = INT32_MAX

      // First allocation at INT32_MAX should succeed
      const id = map.put({ final: true })
      assert.strictEqual(id, INT32_MAX)

      // Next allocation should throw
      assert.throws(
        () => map.put({ overflow: true }),
        (err) =>
          err instanceof QuickJSHostRefRangeExceeded &&
          err.message.includes("too many host refs created"),
      )
    })

    it("can still use freelist even when range is exhausted", () => {
      const map = new HostRefMap()
      ;(map as any).nextId = INT32_MAX

      const id = map.put({ value: 1 })
      map.delete(id)

      // Should be able to reuse the freed ID
      const reusedId = map.put({ value: 2 })
      assert.strictEqual(reusedId, id)
    })
  })
})
