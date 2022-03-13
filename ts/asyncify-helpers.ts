function* awaitYield<T>(value: T | Promise<T>) {
  return (yield value) as T
}

function awaitYieldOf<T, Yielded>(
  generator: Generator<Yielded | Promise<Yielded>, T, Yielded>
): Generator<T | Promise<T>, T, T> {
  return awaitYield(awaitEachYieldedPromise(generator))
}

export type AwaitYield = typeof awaitYield & {
  of: typeof awaitYieldOf
}

const AwaitYield: AwaitYield = awaitYield as AwaitYield
AwaitYield.of = awaitYieldOf

/**
 * Create a function that may or may not be async, using a generator
 *
 * Within the generator, call `yield* awaited(maybePromise)` to await a value
 * that may or may not be a promise.
 *
 * If the inner function never yields a promise, it will return synchronously.
 */
export function maybeAsyncFn<
  /** Function arguments */
  Args extends any[],
  This,
  /** Function return type */
  Return,
  /** Yields to unwrap */
  Yielded
>(
  that: This,
  fn: (
    this: This,
    awaited: AwaitYield,
    ...args: Args
  ) => Generator<Yielded | Promise<Yielded>, Return, Yielded>
): (...args: Args) => Return | Promise<Return> {
  return (...args: Args) => {
    const generator = fn.call(that, AwaitYield, ...args)
    return awaitEachYieldedPromise(generator)
  }
}

class Example {
  private maybeAsyncMethod = maybeAsyncFn(this, function* (awaited, a: number) {
    yield* awaited(new Promise((resolve) => setTimeout(resolve, a)))
    return 5
  })
}

export type MaybeAsyncBlock<Return, This, Yielded, Args extends any[] = []> = (
  this: This,
  awaited: AwaitYield,
  ...args: Args
) => Generator<Yielded | Promise<Yielded>, Return, Yielded>

export function maybeAsync<Return, This, Yielded>(
  that: This,
  startGenerator: (
    this: This,
    await: AwaitYield
  ) => Generator<Yielded | Promise<Yielded>, Return, Yielded>
): Return | Promise<Return> {
  const generator = startGenerator.call(that, AwaitYield)
  return awaitEachYieldedPromise(generator)
}

export function awaitEachYieldedPromise<Yielded, Returned>(
  gen: Generator<Yielded | Promise<Yielded>, Returned, Yielded>
): Returned | Promise<Returned> {
  type NextResult = ReturnType<typeof gen.next>

  function handleNextStep(step: NextResult): Returned | Promise<Returned> {
    if (step.done) {
      return step.value
    }

    if (step.value instanceof Promise) {
      return step.value.then(
        (value) => handleNextStep(gen.next(value)),
        (error) => handleNextStep(gen.throw(error))
      )
    }

    return handleNextStep(gen.next(step.value))
  }

  return handleNextStep(gen.next())
}
