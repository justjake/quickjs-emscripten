import type { SuccessOrFail } from "./vm-interface"
import type { MaybeAsyncBlock } from "./asyncify-helpers"
import { maybeAsync } from "./asyncify-helpers"
import { QTS_DEBUG } from "./debug"
import { QuickJSUseAfterFree } from "./errors"
import type { QuickJSHandle } from "./types"

/**
 * An object that can be disposed.
 * {@link Lifetime} is the canonical implementation of Disposable.
 * Use {@link Scope} to manage cleaning up multiple disposables.
 */
export interface Disposable {
  /**
   * Dispose of the underlying resources used by this object.
   */
  dispose(): void

  /**
   * @returns true if the object is alive
   * @returns false after the object has been {@link dispose}d
   */
  alive: boolean

  /**
   * A method that is used to release resources held by an object. Called by the semantics of the `using` statement.
   */
  [Symbol.dispose](): void
}

/**
 * Base abstract class that helps implement {@link Disposable} by providing a default implementation of {@link Symbol.dispose}.
 */
export abstract class UsingDisposable implements Disposable {
  /**
   * @returns true if the object is alive
   * @returns false after the object has been {@link dispose}d
   */
  declare abstract readonly alive: boolean
  /**
   * Dispose of the underlying resources used by this object.
   */
  abstract dispose(): void
  /**
   * Just calls the standard .dispose() method of this class.
   */
  [Symbol.dispose]() {
    return this.dispose()
  }
}

// Polyfill as needed if Symbol.dispose is not available.
// This polyfill matches ESBuild's behavior.
const SymbolDispose = Symbol.dispose ?? Symbol.for("Symbol.dispose")
const prototypeAsAny = UsingDisposable.prototype as any
if (!prototypeAsAny[SymbolDispose]) {
  prototypeAsAny[SymbolDispose] = function () {
    return this.dispose()
  }
}

/**
 * A lifetime prevents access to a value after the lifetime has been
 * {@link dispose}ed.
 *
 * Typically, quickjs-emscripten uses Lifetimes to protect C memory pointers.
 */
export class Lifetime<T, TCopy = never, Owner = never>
  extends UsingDisposable
  implements Disposable
{
  protected _alive: boolean = true
  protected _constructorStack = QTS_DEBUG ? new Error("Lifetime constructed").stack : undefined

  /**
   * When the Lifetime is disposed, it will call `disposer(_value)`. Use the
   * disposer function to implement whatever cleanup needs to happen at the end
   * of `value`'s lifetime.
   *
   * `_owner` is not used or controlled by the lifetime. It's just metadata for
   * the creator.
   */
  constructor(
    protected readonly _value: T,
    protected readonly copier?: (value: T | TCopy) => TCopy,
    protected readonly disposer?: (value: T | TCopy) => void,
    protected readonly _owner?: Owner,
  ) {
    super()
  }

  get alive() {
    return this._alive
  }

  /**
   * The value this Lifetime protects. You must never retain the value - it
   * may become invalid, leading to memory errors.
   *
   * @throws If the lifetime has been {@link dispose}d already.
   */
  get value() {
    this.assertAlive()
    return this._value
  }

  get owner() {
    return this._owner
  }

  get dupable() {
    return !!this.copier
  }

  /**
   * Create a new handle pointing to the same {@link value}.
   */
  dup() {
    this.assertAlive()
    if (!this.copier) {
      throw new Error("Non-dupable lifetime")
    }
    return new Lifetime<TCopy, TCopy, Owner>(
      this.copier(this._value),
      this.copier,
      this.disposer,
      this._owner,
    )
  }

  /**
   * Call `map` with this lifetime, then dispose the lifetime.
   * @return the result of `map(this)`.
   */
  consume<O>(map: (lifetime: this) => O): O
  // A specific type definition is needed for our common use-case
  // https://github.com/microsoft/TypeScript/issues/30271
  consume<O>(map: (lifetime: QuickJSHandle) => O): O
  consume<O>(map: (lifetime: any) => O): O {
    this.assertAlive()
    const result = map(this)
    this.dispose()
    return result
  }

  /**
   * Call `map` with this lifetime, returning the result.
   * Does not dispose the lifetime.
   * @return the result of `map(this)`.
   */
  map<O>(map: (lifetime: this) => O): O
  map<O>(map: (lifetime: QuickJSHandle) => O): O
  map<O>(map: (lifetime: any) => O): O {
    this.assertAlive()
    return map(this)
  }

  /**
   * Call `fn` with this lifetime, then return `this`. Does not dispose the
   * lifetime. Useful for imperative operations within an expression, like when
   * you're building up objects, or to add logging in the middle of a call chain.
   * @returns this
   */
  tap(fn: (lifetime: this) => void): this
  tap(fn: (lifetime: QuickJSHandle) => void): QuickJSHandle
  tap(fn: (lifetime: any) => void): any {
    fn(this)
    return this
  }

  /**
   * Dispose of {@link value} and perform cleanup.
   */
  dispose() {
    this.assertAlive()
    if (this.disposer) {
      this.disposer(this._value)
    }
    this._alive = false
  }

  private assertAlive() {
    if (!this.alive) {
      if (this._constructorStack) {
        throw new QuickJSUseAfterFree(
          `Lifetime not alive\n${this._constructorStack}\nLifetime used`,
        )
      }
      throw new QuickJSUseAfterFree("Lifetime not alive")
    }
  }
}

/**
 * A Lifetime that lives forever. Used for constants.
 */
export class StaticLifetime<T, Owner = never> extends Lifetime<T, T, Owner> {
  constructor(value: T, owner?: Owner) {
    super(value, undefined, undefined, owner)
  }

  // Static lifetime doesn't need a copier to be copiable
  get dupable() {
    return true
  }

  // Copy returns the same instance.
  dup() {
    return this
  }

  // Dispose does nothing.
  dispose() {}
}

/**
 * A Lifetime that does not own its `value`. A WeakLifetime never calls its
 * `disposer` function, but can be `dup`ed to produce regular lifetimes that
 * do.
 *
 * Used for function arguments.
 */
export class WeakLifetime<T, TCopy = never, Owner = never> extends Lifetime<T, TCopy, Owner> {
  constructor(
    value: T,
    copier?: (value: T | TCopy) => TCopy,
    disposer?: (value: TCopy) => void,
    owner?: Owner,
  ) {
    // We don't care if the disposer doesn't support freeing T
    super(value, copier, disposer as (value: T | TCopy) => void, owner)
  }

  dispose() {
    this._alive = false
  }
}

function scopeFinally(scope: Scope, blockError: Error | undefined) {
  // console.log('scopeFinally', scope, blockError)
  let disposeError: Error | undefined
  try {
    scope.dispose()
  } catch (error) {
    disposeError = error as any
  }

  if (blockError && disposeError) {
    Object.assign(blockError, {
      message: `${blockError.message}\n Then, failed to dispose scope: ${disposeError.message}`,
      disposeError,
    })
    throw blockError
  }

  if (blockError || disposeError) {
    throw blockError || disposeError
  }
}

/**
 * Scope helps reduce the burden of manually tracking and disposing of
 * Lifetimes. See {@link withScope}. and {@link withScopeAsync}.
 */
export class Scope extends UsingDisposable implements Disposable {
  /**
   * Run `block` with a new Scope instance that will be disposed after the block returns.
   * Inside `block`, call `scope.manage` on each lifetime you create to have the lifetime
   * automatically disposed after the block returns.
   *
   * @warning Do not use with async functions. Instead, use {@link withScopeAsync}.
   */
  static withScope<R>(block: (scope: Scope) => R): R {
    const scope = new Scope()
    let blockError: Error | undefined
    try {
      return block(scope)
    } catch (error) {
      blockError = error as any
      throw error
    } finally {
      scopeFinally(scope, blockError)
    }
  }

  static withScopeMaybeAsync<Return, This, Yielded>(
    _this: This,
    block: MaybeAsyncBlock<Return, This, Yielded, [Scope]>,
  ): Return | Promise<Return> {
    return maybeAsync(undefined, function* (awaited) {
      const scope = new Scope()
      let blockError: Error | undefined
      try {
        return yield* awaited.of(block.call(_this, awaited, scope))
      } catch (error) {
        blockError = error as any
        throw error
      } finally {
        scopeFinally(scope, blockError)
      }
    })
  }

  /**
   * Run `block` with a new Scope instance that will be disposed after the
   * block's returned promise settles. Inside `block`, call `scope.manage` on each
   * lifetime you create to have the lifetime automatically disposed after the
   * block returns.
   */
  static async withScopeAsync<R>(block: (scope: Scope) => Promise<R>): Promise<R> {
    const scope = new Scope()
    let blockError: Error | undefined
    try {
      return await block(scope)
    } catch (error) {
      blockError = error as any
      throw error
    } finally {
      scopeFinally(scope, blockError)
    }
  }

  private _disposables: Lifetime<Set<Disposable>> = new Lifetime(new Set())

  /**
   * Track `lifetime` so that it is disposed when this scope is disposed.
   */
  manage = <T extends Disposable>(lifetime: T): T => {
    this._disposables.value.add(lifetime)
    return lifetime
  }

  get alive() {
    return this._disposables.alive
  }

  dispose() {
    const lifetimes = Array.from(this._disposables.value.values()).reverse()
    for (const lifetime of lifetimes) {
      if (lifetime.alive) {
        lifetime.dispose()
      }
    }
    this._disposables.dispose()
  }
}

/**
 * An `Array` that also implements {@link Disposable}:
 *
 * - Considered {@link Disposable#alive} if any of its elements are `alive`.
 * - When {@link Disposable#dispose}d, it will dispose of all its elements that are `alive`.
 */
export type DisposableArray<T> = T[] & Disposable

/**
 * Create an array that also implements {@link Disposable}.
 */
export function createDisposableArray<T extends Disposable>(
  items?: Iterable<T>,
): DisposableArray<T> {
  const array = items ? Array.from(items) : []

  function disposeAlive() {
    return array.forEach((disposable) => (disposable.alive ? disposable.dispose() : undefined))
  }

  function someIsAlive() {
    return array.some((disposable) => disposable.alive)
  }

  Object.defineProperty(array, SymbolDispose, {
    configurable: true,
    enumerable: false,
    value: disposeAlive,
  })

  Object.defineProperty(array, "dispose", {
    configurable: true,
    enumerable: false,
    value: disposeAlive,
  })

  Object.defineProperty(array, "alive", {
    configurable: true,
    enumerable: false,
    get: someIsAlive,
  })

  return array as T[] & Disposable
}

function isDisposable(value: unknown): value is { alive: boolean; dispose(): unknown } {
  return Boolean(
    value &&
      (typeof value === "object" || typeof value === "function") &&
      "alive" in value &&
      typeof value.alive === "boolean" &&
      "dispose" in value &&
      typeof value.dispose === "function",
  )
}

abstract class AbstractDisposableResult extends UsingDisposable implements Disposable {
  static success<S, F>(value: S): DisposableSuccess<S> {
    return new DisposableSuccess(value) satisfies SuccessOrFail<S, F>
  }

  static fail<S, F>(error: F, onUnwrap: (status: SuccessOrFail<S, F>) => void): DisposableFail<F> {
    return new DisposableFail(
      error,
      onUnwrap as (status: SuccessOrFail<never, F>) => void,
    ) satisfies SuccessOrFail<S, F>
  }

  static is<S, F>(result: SuccessOrFail<S, F>): result is DisposableResult<S, F> {
    return result instanceof AbstractDisposableResult
  }

  abstract get alive(): boolean
  abstract dispose(): void
}

export class DisposableSuccess<S> extends AbstractDisposableResult {
  declare error?: undefined

  constructor(readonly value: S) {
    super()
  }

  override get alive() {
    return isDisposable(this.value) ? this.value.alive : true
  }

  override dispose(): void {
    if (isDisposable(this.value)) {
      this.value.dispose()
    }
  }

  unwrap(): S {
    return this.value
  }

  unwrapOr<T>(_fallback: T): S | T {
    return this.value
  }
}

export class DisposableFail<F> extends AbstractDisposableResult {
  constructor(
    readonly error: F,
    private readonly onUnwrap: (status: SuccessOrFail<never, F>) => void,
  ) {
    super()
  }

  override get alive(): boolean {
    return isDisposable(this.error) ? this.error.alive : true
  }

  override dispose(): void {
    if (isDisposable(this.error)) {
      this.error.dispose()
    }
  }

  unwrap(): never {
    this.onUnwrap(this)
    throw this.error
  }

  unwrapOr<T>(fallback: T): T {
    return fallback
  }
}

export type DisposableResult<S, F> = DisposableSuccess<S> | DisposableFail<F>
export const DisposableResult = AbstractDisposableResult
