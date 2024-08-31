import type { QuickJSContextResult, QuickJSContext } from "./context"
import { DisposableResult, Lifetime, UsingDisposable } from "./lifetime"
import type { QuickJSRuntime } from "./runtime"
import type { QuickJSHandle } from "./types"

/**
 * Proxies the iteration protocol from the host to a guest iterator.
 * The guest iterator is a QuickJS object with a `next` method.
 * See [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols).
 *
 * If calling the `next` method or any other method of the iteration protocol throws an error,
 * the iterator is disposed after returning the exception as the final value.
 *
 * When the iterator is done, the handle is disposed automatically.
 * The caller is responsible for disposing each successive value.
 *
 * ```typescript
 * for (const nextResult of context.unwrapResult(context.getIterator(arrayHandle)) {
 *   const nextHandle = context.unwrapResult(nextResult)
 *   try {
 *     // Do something with nextHandle
 *     console.log(context.dump(nextHandle))
 *   } finally {
 *     nextHandle.dispose()
 *   }
 * }
 * ```
 */
export class QuickJSIterator
  extends UsingDisposable
  implements Disposable, IterableIterator<QuickJSContextResult<QuickJSHandle>>
{
  public owner: QuickJSRuntime
  private _next: QuickJSHandle | undefined
  private _isDone = false

  constructor(
    public handle: QuickJSHandle,
    public context: QuickJSContext,
  ) {
    super()
    this.owner = context.runtime
  }

  [Symbol.iterator]() {
    return this
  }

  next(value?: QuickJSHandle): IteratorResult<QuickJSContextResult<QuickJSHandle>, any> {
    if (!this.alive || this._isDone) {
      return {
        done: true,
        value: undefined,
      }
    }

    const nextMethod = (this._next ??= this.context.getProp(this.handle, "next"))
    return this.callIteratorMethod(nextMethod, value)
  }

  return(value?: QuickJSHandle): IteratorResult<QuickJSContextResult<QuickJSHandle>, any> {
    if (!this.alive) {
      return {
        done: true,
        value: undefined,
      }
    }

    const returnMethod = this.context.getProp(this.handle, "return")
    if (returnMethod === this.context.undefined && value === undefined) {
      // This may be an automatic call by the host Javascript engine,
      // but the guest iterator doesn't have a `return` method.
      // Don't call it then.
      this.dispose()
      return {
        done: true,
        value: undefined,
      }
    }

    const result = this.callIteratorMethod(returnMethod, value)
    returnMethod.dispose()
    this.dispose()
    return result
  }

  throw(e?: any): IteratorResult<QuickJSContextResult<QuickJSHandle>, any> {
    if (!this.alive) {
      return {
        done: true,
        value: undefined,
      }
    }

    const errorHandle = e instanceof Lifetime ? e : this.context.newError(e)
    const throwMethod = this.context.getProp(this.handle, "throw")
    const result = this.callIteratorMethod(throwMethod, e)
    if (errorHandle.alive) {
      errorHandle.dispose()
    }
    throwMethod.dispose()
    this.dispose()
    return result
  }

  get alive() {
    return this.handle.alive
  }

  dispose() {
    this._isDone = true
    this.handle.dispose()
    this._next?.dispose()
  }

  private callIteratorMethod(
    method: QuickJSHandle,
    input?: QuickJSHandle,
  ): IteratorResult<QuickJSContextResult<QuickJSHandle>, any> {
    const callResult = input
      ? this.context.callFunction(method, this.handle, input)
      : this.context.callFunction(method, this.handle)
    if (callResult.error) {
      this.dispose()
      return {
        value: callResult,
      }
    }

    const done = this.context.getProp(callResult.value, "done").consume((v) => this.context.dump(v))
    if (done) {
      callResult.value.dispose()
      this.dispose()
      return {
        done,
        value: undefined,
      }
    }

    const value = this.context.getProp(callResult.value, "value")
    callResult.value.dispose()
    return {
      value: DisposableResult.success(value),
      done: done as false,
    }
  }
}
