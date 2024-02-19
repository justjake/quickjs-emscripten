import { UsingDisposable, type Disposable } from "./lifetime"
import type { QuickJSHandle } from "./types"
import type { QuickJSRuntime } from "./runtime"
import type { QuickJSContext } from "./context"
export type { PromiseExecutor } from "./types"

/**
 * A promise state inside QuickJS, which can be pending, fulfilled, or rejected.
 * You can unwrap a JSPromiseState with {@link QuickJSContext#unwrapResult}.
 */
export type JSPromiseState =
  | JSPromiseStatePending
  | JSPromiseStateFulfilled
  | JSPromiseStateRejected

/**
 * Pending promise state.
 * See {@link JSPromiseState}.
 */
export interface JSPromiseStatePending {
  type: "pending"
  /**
   * The error property here allows unwrapping a JSPromiseState with {@link QuickJSContext#unwrapResult}.
   * Unwrapping a pending promise will throw a {@link QuickJSPromisePending} error.
   */
  get error(): Error
}

/**
 * Fulfilled promise state.
 * See {@link JSPromiseState}.
 */
export interface JSPromiseStateFulfilled {
  type: "fulfilled"
  value: QuickJSHandle
  error?: undefined
  /** Trying to get the promise state of a non-Promise value returns a fulfilled state with the original value, and `notAPromise: true`. */
  notAPromise?: boolean
}

/**
 * Rejected promise state.
 * See {@link JSPromiseState}.
 */
export interface JSPromiseStateRejected {
  type: "rejected"
  error: QuickJSHandle
}

/**
 * QuickJSDeferredPromise wraps a QuickJS promise {@link handle} and allows
 * {@link resolve}ing or {@link reject}ing that promise. Use it to bridge asynchronous
 * code on the host to APIs inside a QuickJSContext.
 *
 * Managing the lifetime of promises is tricky. There are three
 * {@link QuickJSHandle}s inside of each deferred promise object: (1) the promise
 * itself, (2) the `resolve` callback, and (3) the `reject` callback.
 *
 * - If the promise will be fulfilled before the end of it's {@link owner}'s lifetime,
 *   the only cleanup necessary is `deferred.handle.dispose()`, because
 *   calling {@link resolve} or {@link reject} will dispose of both callbacks automatically.
 *
 * - As the return value of a {@link VmFunctionImplementation}, return {@link handle},
 *   and ensure that either {@link resolve} or {@link reject} will be called. No other
 *   clean-up is necessary.
 *
 * - In other cases, call {@link dispose}, which will dispose {@link handle} as well as the
 *   QuickJS handles that back {@link resolve} and {@link reject}. For this object,
 *   {@link dispose} is idempotent.
 */
export class QuickJSDeferredPromise extends UsingDisposable implements Disposable {
  public owner: QuickJSRuntime
  public context: QuickJSContext

  /**
   * A handle of the Promise instance inside the QuickJSContext.
   * You must dispose {@link handle} or the entire QuickJSDeferredPromise once you
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
   * Use {@link QuickJSContext#newPromise} to create a new promise instead of calling
   * this constructor directly.
   */
  constructor(args: {
    context: QuickJSContext
    promiseHandle: QuickJSHandle
    resolveHandle: QuickJSHandle
    rejectHandle: QuickJSHandle
  }) {
    super()
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
   * Resolve {@link handle} with the given value, if any.
   * Calling this method after calling {@link dispose} is a no-op.
   *
   * Note that after resolving a promise, you may need to call
   * {@link QuickJSRuntime#executePendingJobs} to propagate the result to the promise's
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
          value || this.context.undefined,
        ),
      )
      .dispose()

    this.disposeResolvers()
    this.onSettled()
  }

  /**
   * Reject {@link handle} with the given value, if any.
   * Calling this method after calling {@link dispose} is a no-op.
   *
   * Note that after rejecting a promise, you may need to call
   * {@link QuickJSRuntime#executePendingJobs} to propagate the result to the promise's
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
          value || this.context.undefined,
        ),
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
