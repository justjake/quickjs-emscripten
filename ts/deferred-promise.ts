import type { Disposable } from "./lifetime"
import type { QuickJSHandle } from "./types"
import type { QuickJSRuntime } from "./runtime"
import type { QuickJSContext } from "./context"
export type { PromiseExecutor } from "./types"

/**
 * QuickJSDeferredPromise wraps a QuickJS promise [[handle]] and allows
 * [[resolve]]ing or [[reject]]ing that promise. Use it to bridge asynchronous
 * code on the host to APIs inside a QuickJSContext.
 *
 * Managing the lifetime of promises is tricky. There are three
 * [[QuickJSHandle]]s inside of each deferred promise object: (1) the promise
 * itself, (2) the `resolve` callback, and (3) the `reject` callback.
 *
 * - If the promise will be fulfilled before the end of it's [[owner]]'s lifetime,
 *   the only cleanup necessary is `deferred.handle.dispose()`, because
 *   calling [[resolve]] or [[reject]] will dispose of both callbacks automatically.
 *
 * - As the return value of a [[VmFunctionImplementation]], return [[handle]],
 *   and ensure that either [[resolve]] or [[reject]] will be called. No other
 *   clean-up is necessary.
 *
 * - In other cases, call [[dispose]], which will dispose [[handle]] as well as the
 *   QuickJS handles that back [[resolve]] and [[reject]]. For this object,
 *   [[dispose]] is idempotent.
 */
export class QuickJSDeferredPromise implements Disposable {
  public owner: QuickJSRuntime
  public context: QuickJSContext

  /**
   * A handle of the Promise instance inside the QuickJSContext.
   * You must dispose [[handle]] or the entire QuickJSDeferredPromise once you
   * are finished with it.
   */
  public handle: QuickJSHandle

  /**
   * A native promise that will resolve once this deferred is settled.
   */
  public settled: Promise<void>

  private resolveHandle: QuickJSHandle
  private rejectHandle: QuickJSHandle
  private onSettled!: () => void

  /**
   * Use [[QuickJSContext.newPromise]] to create a new promise instead of calling
   * this constructor directly.
   * @unstable
   */
  constructor(args: {
    context: QuickJSContext
    promiseHandle: QuickJSHandle
    resolveHandle: QuickJSHandle
    rejectHandle: QuickJSHandle
  }) {
    this.context = args.context
    this.owner = args.context.runtime
    this.handle = args.promiseHandle
    this.settled = new Promise((resolve) => {
      this.onSettled = resolve
    })
    this.resolveHandle = args.resolveHandle
    this.rejectHandle = args.rejectHandle
  }

  /**
   * Resolve [[handle]] with the given value, if any.
   * Calling this method after calling [[dispose]] is a no-op.
   *
   * Note that after resolving a promise, you may need to call
   * [[QuickJSContext.executePendingJobs]] to propagate the result to the promise's
   * callbacks.
   */
  resolve = (value?: QuickJSHandle) => {
    if (!this.resolveHandle.alive) {
      return
    }

    this.context
      .unwrapResult(
        this.context.callFunction(
          this.resolveHandle,
          this.context.undefined,
          value || this.context.undefined
        )
      )
      .dispose()

    this.disposeResolvers()
    this.onSettled()
  }

  /**
   * Reject [[handle]] with the given value, if any.
   * Calling this method after calling [[dispose]] is a no-op.
   *
   * Note that after rejecting a promise, you may need to call
   * [[QuickJSContext.executePendingJobs]] to propagate the result to the promise's
   * callbacks.
   */
  reject = (value?: QuickJSHandle) => {
    if (!this.rejectHandle.alive) {
      return
    }

    this.context
      .unwrapResult(
        this.context.callFunction(
          this.rejectHandle,
          this.context.undefined,
          value || this.context.undefined
        )
      )
      .dispose()

    this.disposeResolvers()
    this.onSettled()
  }

  get alive() {
    return this.handle.alive || this.resolveHandle.alive || this.rejectHandle.alive
  }

  dispose = () => {
    if (this.handle.alive) {
      this.handle.dispose()
    }
    this.disposeResolvers()
  }

  private disposeResolvers() {
    if (this.resolveHandle.alive) {
      this.resolveHandle.dispose()
    }

    if (this.rejectHandle.alive) {
      this.rejectHandle.dispose()
    }
  }
}
