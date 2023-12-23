import assert from "assert"
import { maybeAsyncFn } from "./asyncify-helpers"

describe("maybeAsync", () => {
  const addPromises = maybeAsyncFn(
    undefined,
    function* (awaited, a: number | Promise<number>, b: number | Promise<number>) {
      return (yield* awaited(a)) + (yield* awaited(b))
    }
  )

  it("has sync output for sync inputs", () => {
    const sum2 = addPromises(5, 6)
    assert.strictEqual(sum2, 11)
  })

  it("has async output for async inputs", async () => {
    const result = addPromises(Promise.resolve(1), 2)
    assert(result instanceof Promise, "is promise")
    const sum = await result
    assert.strictEqual(sum, 3, "sums correctly")
  })

  it("throws any sync errors", () => {
    const fn = maybeAsyncFn(undefined, function* () {
      throw new Error("sync error")
    })

    assert.throws(() => fn(), /sync error/)
  })

  it("it throws async errors", () => {
    const fn = maybeAsyncFn(undefined, function* (awaited) {
      yield* awaited(new Promise((resolve) => setTimeout(resolve, 50)))
      throw new Error("async error")
    })

    assert.rejects(() => fn(), /async error/)
  })
})
