import { maybeAsync, MaybeAsyncBlock } from "./asyncify-helpers"
import { QTS_DEBUG } from "./debug"
import { QuickJSUseAfterFree } from "./errors"
import type { QuickJSHandle } from "./types"

/**
 * An object that can be disposed.
 * [[Lifetime]] is the canonical implementation of Disposable.
 * Use [[Scope]] to manage cleaning up multiple disposables.
 */
export interface Disposable {
  /**
   * Dispose of the underlying resources used by this object.
   */
  dispose(): void

  /**
   * @returns true if the object is alive
   * @returns false after the object has been [[dispose]]d
   */
  alive: boolean
}

/**
 * A lifetime prevents access to a value after the lifetime has been
 * [[dispose]]ed.
 *
 * Typically, quickjs-emscripten uses Lifetimes to protect C memory pointers.
 */
export class Lifetime<T, TCopy = never, Owner = never> implements Disposable {
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
    protected readonly _owner?: Owner
  ) {}

  get alive() {
    return this._alive
  }

  /**
   * The value this Lifetime protects. You must never retain the value - it
   * may become invalid, leading to memory errors.
   *
   * @throws If the lifetime has been [[dispose]]d already.
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
   * Create a new handle pointing to the same [[value]].
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
      this._owner
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
   * Dispose of [[value]] and perform cleanup.
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
          `Lifetime not alive\n${this._constructorStack}\nLifetime used`
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
    owner?: Owner
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
 * Lifetimes. See [[withScope]]. and [[withScopeAsync]].
 */
export class Scope implements Disposable {
  /**
   * Run `block` with a new Scope instance that will be disposed after the block returns.
   * Inside `block`, call `scope.manage` on each lifetime you create to have the lifetime
   * automatically disposed after the block returns.
   *
   * @warning Do not use with async functions. Instead, use [[withScopeAsync]].
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
    block: MaybeAsyncBlock<Return, This, Yielded, [Scope]>
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
  manage<T extends Disposable>(lifetime: T): T {
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
