import { Lifetime, Scope } from "./lifetime"
import assert from "assert"

describe("Lifetime", () => {
  describe(".consume", () => {
    it("yeilds the value", () => {
      const lifetime = new Lifetime(1)
      const result = lifetime.consume((l) => l.value + 1)
      assert.strictEqual(result, 2)
    })

    it("disposes the lifetime", () => {
      let disposed = false
      const lifetime = new Lifetime(2, undefined, () => {
        disposed = true
      })
      lifetime.consume((l) => l.value * 2)
      assert.strictEqual(lifetime.alive, false)
      assert.strictEqual(disposed, true)
    })
  })
})

describe("Scope", () => {
  describe(".withScope", () => {
    function counter() {
      let n = 0
      return {
        increment: () => n++,
        count: () => n,
      }
    }
    it("disposes all the lifetimes", () => {
      const { increment, count } = counter()
      const secondLifetime = Scope.withScope((scope) => {
        scope.manage(new Lifetime("first", undefined, (s) => increment()))
        return scope.manage(new Lifetime("second", undefined, (s) => increment()))
      })

      assert.strictEqual(secondLifetime.alive, false)
      assert.strictEqual(count(), 2)
    })
  })
})
