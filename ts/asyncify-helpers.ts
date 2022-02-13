import { isSuccess, SuccessOrFail } from './vm-interface'

/**
 * @private
 *
 * Idea for a way to write function implementations to be both async and sync.
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
      value => value,
      error => fail(error)
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
    // console.log('intoPromiseLike: is promise', value)
    return value
  }

  // console.log('intoPromiseLike: sync', value)
  return new SyncPromise({ value })
}

/** @private */
export function unwrapPromiseLike<T>(promise: SyncPromise<T> | Promise<T>): T | Promise<T> {
  if (promise instanceof SyncPromise) {
    // console.log('unwrapPromiseLike: is sync', promise.state)
    if (isSuccess(promise.state)) {
      return promise.state.value
    } else {
      throw promise.state.error
    }
  }

  // console.log('unwrapPromiseLike: is promise', promise)
  return promise
}
