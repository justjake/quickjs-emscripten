import assert from "assert"
import { describe, it } from "vitest"
import { DisposableResult, Lifetime, Scope, createDisposableArray } from "./lifetime"

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

  describe("using statement", () => {
    it("disposes the lifetime", () => {
      let outerLifetime

      {
        using lifetime = new Lifetime(1)
        outerLifetime = lifetime
        assert.strictEqual(outerLifetime.alive, true)
      }

      assert.strictEqual(outerLifetime.alive, false)
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
        scope.manage(new Lifetime("first", undefined, () => increment()))
        return scope.manage(new Lifetime("second", undefined, () => increment()))
      })

      assert.strictEqual(secondLifetime.alive, false)
      assert.strictEqual(count(), 2)
    })
  })
})

describe("createDisposableArray", () => {
  it("is alive if any element is alive", () => {
    const lifetimes = [new Lifetime(1), new Lifetime(2)]
    const result = createDisposableArray(lifetimes)
    assert.strictEqual(result.alive, true)

    lifetimes[0].dispose()
    assert.strictEqual(result.alive, true)

    lifetimes[1].dispose()
    assert.strictEqual(result.alive, false)
  })

  it(".dispose() disposes all alive elements and ignores dead elements", () => {
    const lifetimes = [new Lifetime(1), new Lifetime(2)]
    lifetimes[0].dispose()
    const result = createDisposableArray(lifetimes)
    result.dispose()
    assert.strictEqual(lifetimes[0].alive, false)
    assert.strictEqual(lifetimes[1].alive, false)
  })
})

describe("DisposableResult", () => {
  function itBehavesAsDisposable(factory: <T>(v: T) => DisposableResult<T, T>) {
    it("is alive when the value is not disposable", () => {
      const result = factory(false)
      assert.strictEqual(result.alive, true)
    })

    it("is alive when the value is disposable and alive", () => {
      const lifetime = new Lifetime(1)
      const result = factory(lifetime)
      assert.strictEqual(result.alive, true)
      lifetime.dispose()
      assert.strictEqual(result.alive, false)
    })

    it("disposes the value when dispose is called", () => {
      const lifetime = new Lifetime(1)
      const result = factory(lifetime)
      result.dispose()
      assert.strictEqual(lifetime.alive, false)
    })

    it("can call unwrapOr", () => {
      const result = factory("hi")
      result.unwrapOr(0)
    })
  }

  describe("success", () => {
    itBehavesAsDisposable((v) => DisposableResult.success(v))

    it("unwrap returns the value", () => {
      const val = {}
      const result = DisposableResult.success(val)
      assert.strictEqual(result.unwrap(), val)
    })

    it("unwrapOr returns the value", () => {
      const val = {}
      const result = DisposableResult.success(val)
      assert.strictEqual(result.unwrapOr(0), val)
    })
  })

  describe("fail", () => {
    itBehavesAsDisposable((v) => DisposableResult.fail(v, () => {}))

    it("unwrap calls the onUnwrap", () => {
      let calledWith: unknown = undefined
      const expectedError = new Error("will throw")
      const result = DisposableResult.fail("error", (v) => {
        calledWith = v
        throw expectedError
      })
      assert.throws(
        () => result.unwrap(),
        (e) => e === expectedError,
      )
      assert.strictEqual(calledWith, result)
    })

    it("throws even if unwrap doesnt", () => {
      const result = DisposableResult.fail("error", () => {})
      assert.throws(() => result.unwrap())
    })

    it("unwrapOr returns the fallback", () => {
      const fallback = {}
      const result = DisposableResult.fail("error", () => {})
      assert.strictEqual(result.unwrapOr(fallback), fallback)
    })
  })
})
