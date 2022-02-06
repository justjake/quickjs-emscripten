import { isSuccess, SuccessOrFail } from './vm-interface'

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
}

export function intoPromise<T>(value: T | Promise<T>): SyncPromise<T> | Promise<T> {
  if (value instanceof Promise) {
    return value
  }

  return new SyncPromise({ value })
}

export function unwrapPromise<T>(promise: SyncPromise<T> | Promise<T>): T | Promise<T> {
  if (promise instanceof SyncPromise) {
    if (isSuccess(promise.state)) {
      return promise.state.value
    } else {
      throw promise.state.error
    }
  }

  return promise
}

function assertSync<T>(value: T | Promise<T>): T {
  if (value && typeof value === 'object' && value instanceof Promise) {
    throw new Error('Function unexpectedly returned a Promise')
  }
  return value
}
