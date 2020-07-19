// Internal interface - don't export. Consumers should use SuccessOrFail
// discriminating union type.
interface Result<S, F> {
  isSuccess: boolean
  value?: S

  isFailure: boolean
  failure?: F

  /**
   * Return the successful value, or throw an error if the result
   * is a failure
   */
  unwrap(): S | never
}

/**
 * A successful result.
 * Use [[value]] or call [[unwrap]] to retreive the value.
 */
export class Success<T> implements Result<T, never> {
  constructor(public value: T) {}

  readonly isSuccess = true as const
  readonly isFailure = false as const
  readonly failure = undefined

  unwrap(): T {
    return this.value
  }
}

/**
 * A failure result.
 * Use [[failure]] to retrieve the failure value.
 * Call [[unwrap]] to throw as an Error.
 */
export class Failure<T> implements Result<never, T> {
  constructor(public failure: T, private unwrapper: (error: T) => never) {}

  readonly isSuccess = false as const
  readonly isFailure = true as const

  unwrap(): never {
    return this.unwrapper(this.failure)
  }
}

/**
 * Represents the results of an operation that can fail.
 */
export type SuccessOrFail<S, F> = Success<S> | Failure<F>
