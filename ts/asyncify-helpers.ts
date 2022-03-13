import { debug } from "./debug"
import { isSuccess, SuccessOrFail } from "./vm-interface"

/**
 * @private
 *
 * Idea for a way to write function implementations to be both async and sync.
 *
 * TODO: write a generator replacement for this.
 */
export class SyncPromise<T> {
  constructor(public state: SuccessOrFail<T, unknown>) {}

  then<R, R2 = never>(
    onSuccess: (value: T) => R,
    onFail?: (error: unknown) => R2
  ): SyncPromise<R | R2> {
    try {
      if (isSuccess(this.state)) {
        return new SyncPromise({ value: onSuccess(this.state.value) })
      } else if (onFail) {
        return new SyncPromise({ value: onFail(this.state.error) })
      } else {
        return new SyncPromise(this.state)
      }
    } catch (error) {
      return new SyncPromise({ error })
    }
  }

  catch<R>(fail: (error: unknown) => R): SyncPromise<T | R> {
    return this.then(
      (value) => value,
      (error) => fail(error)
    )
  }

  finally(callback: () => void): SyncPromise<T> {
    callback()
    return this
  }
}
/** @private */
export function newPromiseLike<T>(fn: () => T | Promise<T>): SyncPromise<T> | Promise<T> {
  try {
    return intoPromiseLike(fn())
  } catch (error) {
    return new SyncPromise({ error })
  }
}

/** @private */
export function intoPromiseLike<T>(value: T | Promise<T>): SyncPromise<T> | Promise<T> {
  if (value instanceof Promise) {
    debug("intoPromiseLike: async", value)
    return value
  }

  debug("intoPromiseLike: sync", value)
  return new SyncPromise({ value })
}

/** @private */
export function unwrapPromiseLike<T>(promise: SyncPromise<T> | Promise<T>): T | Promise<T> {
  if (promise instanceof SyncPromise) {
    debug("unwrapPromiseLike: sync", promise.state)
    if (isSuccess(promise.state)) {
      return promise.state.value
    } else {
      throw promise.state.error
    }
  }

  debug("unwrapPromiseLike: async", promise)
  return promise
}
