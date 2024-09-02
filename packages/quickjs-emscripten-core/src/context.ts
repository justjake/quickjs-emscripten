import { IsEqualOp, JSPromiseStateEnum } from "@jitl/quickjs-ffi-types"
import type {
  EvalFlags,
  EitherModule,
  EvalDetectModule,
  JSBorrowedCharPointer,
  JSContextPointer,
  JSRuntimePointer,
  JSValueConstPointer,
  JSValuePointer,
  JSValuePointerPointer,
  EitherFFI,
  UInt32Pointer,
  JSValuePointerPointerPointer,
  JSVoidPointer,
} from "@jitl/quickjs-ffi-types"
import type { JSPromiseState } from "./deferred-promise"
import { QuickJSDeferredPromise } from "./deferred-promise"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { shouldInterruptAfterDeadline } from "./interrupt-helpers"
import {
  QuickJSEmptyGetOwnPropertyNames,
  QuickJSNotImplemented,
  QuickJSPromisePending,
  QuickJSUnwrapError,
} from "./errors"
import type { Disposable, DisposableArray, DisposableFail, DisposableSuccess } from "./lifetime"
import {
  DisposableResult,
  Lifetime,
  Scope,
  StaticLifetime,
  UsingDisposable,
  WeakLifetime,
  createDisposableArray,
} from "./lifetime"
import type { HeapTypedArray } from "./memory"
import { ModuleMemory } from "./memory"
import type { ContextCallbacks, QuickJSModuleCallbacks } from "./module"
import type {
  QuickJSRuntime,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ExecutePendingJobsResult,
} from "./runtime"
import type {
  ContextEvalOptions,
  GetOwnPropertyNamesOptions,
  JSValue,
  PromiseExecutor,
  QuickJSHandle,
  StaticJSValue,
} from "./types"
import { evalOptionsToFlags, getOwnPropertyNamesOptionsToFlags } from "./types"
import type {
  LowLevelJavascriptVm,
  SuccessOrFail,
  VmFunctionImplementation,
  VmPropertyDescriptor,
} from "./vm-interface"
import { QuickJSIterator } from "./QuickJSIterator"

export type QuickJSContextResult<S> = DisposableResult<S, QuickJSHandle>

/**
 * Property key for getting or setting a property on a handle with
 * {@link QuickJSContext#getProp}, {@link QuickJSContext#setProp}, or {@link QuickJSContext#defineProp}.
 */
export type QuickJSPropertyKey = number | string | QuickJSHandle

/**
 * @private
 */
class ContextMemory extends ModuleMemory implements Disposable {
  readonly owner: QuickJSRuntime
  readonly ctx: Lifetime<JSContextPointer>
  readonly rt: Lifetime<JSRuntimePointer>
  readonly module: EitherModule
  readonly ffi: EitherFFI
  readonly scope = new Scope()

  /** @private */
  constructor(args: {
    owner: QuickJSRuntime
    module: EitherModule
    ffi: EitherFFI
    ctx: Lifetime<JSContextPointer>
    rt: Lifetime<JSRuntimePointer>
    ownedLifetimes?: Disposable[]
  }) {
    super(args.module)
    args.ownedLifetimes?.forEach((lifetime) => this.scope.manage(lifetime))
    this.owner = args.owner
    this.module = args.module
    this.ffi = args.ffi
    this.rt = args.rt
    this.ctx = this.scope.manage(args.ctx)
  }

  get alive() {
    return this.scope.alive
  }

  dispose() {
    return this.scope.dispose()
  }

  [Symbol.dispose]() {
    return this.dispose()
  }

  /**
   * Track `lifetime` so that it is disposed when this scope is disposed.
   */
  manage<T extends Disposable>(lifetime: T): T {
    return this.scope.manage(lifetime)
  }

  copyJSValue = (ptr: JSValuePointer | JSValueConstPointer) => {
    return this.ffi.QTS_DupValuePointer(this.ctx.value, ptr)
  }

  freeJSValue = (ptr: JSValuePointer) => {
    this.ffi.QTS_FreeValuePointer(this.ctx.value, ptr)
  }

  consumeJSCharPointer(ptr: JSBorrowedCharPointer): string {
    const str = this.module.UTF8ToString(ptr)
    this.ffi.QTS_FreeCString(this.ctx.value, ptr)
    return str
  }

  heapValueHandle(ptr: JSValuePointer): JSValue {
    return new Lifetime(ptr, this.copyJSValue, this.freeJSValue, this.owner)
  }

  /** Manage a heap pointer with the lifetime of the context */
  staticHeapValueHandle(ptr: JSValuePointer | JSValueConstPointer): StaticJSValue {
    this.manage(this.heapValueHandle(ptr as JSValuePointer))
    // This isn't technically a static lifetime, but since it has the same
    // lifetime as the VM, it's okay to fake one since when the VM is
    // disposed, no other functions will accept the value.
    return new StaticLifetime(ptr as JSValueConstPointer, this.owner) as StaticJSValue
  }
}

/**
 * QuickJSContext wraps a QuickJS Javascript context (JSContext*) within a
 * runtime. The contexts within the same runtime may exchange objects freely.
 * You can think of separate runtimes like different domains in a browser, and
 * the contexts within a runtime like the different windows open to the same
 * domain. The {@link runtime} references the context's runtime.
 *
 * This class's methods return {@link QuickJSHandle}, which wrap C pointers (JSValue*).
 * It's the caller's responsibility to call `.dispose()` on any
 * handles you create to free memory once you're done with the handle.
 *
 * Use {@link QuickJSRuntime#newContext} or {@link QuickJSWASMModule#newContext}
 * to create a new QuickJSContext.
 *
 * Create QuickJS values inside the interpreter with methods like
 * {@link newNumber}, {@link newString}, {@link newArray}, {@link newObject},
 * {@link newFunction}, and {@link newPromise}.
 *
 * Call {@link setProp} or {@link defineProp} to customize objects. Use those methods
 * with {@link global} to expose the values you create to the interior of the
 * interpreter, so they can be used in {@link evalCode}.
 *
 * Use {@link evalCode} or {@link callFunction} to execute Javascript inside the VM. If
 * you're using asynchronous code inside the QuickJSContext, you may need to also
 * call {@link QuickJSRuntime#executePendingJobs}. Executing code inside the runtime returns a
 * result object representing successful execution or an error. You must dispose
 * of any such results to avoid leaking memory inside the VM.
 *
 * Implement memory and CPU constraints at the runtime level, using {@link runtime}.
 * See {@link QuickJSRuntime} for more information.
 *
 */
// TODO: Manage own callback registration
export class QuickJSContext
  extends UsingDisposable
  implements LowLevelJavascriptVm<QuickJSHandle>, Disposable
{
  /**
   * The runtime that created this context.
   */
  public readonly runtime: QuickJSRuntime

  /** @private */
  protected readonly ctx: Lifetime<JSContextPointer>
  /** @private */
  protected readonly rt: Lifetime<JSRuntimePointer>
  /** @private */
  protected readonly module: EitherModule
  /** @private */
  protected readonly ffi: EitherFFI
  /** @private */
  protected memory: ContextMemory

  /** @private */
  protected _undefined: QuickJSHandle | undefined = undefined
  /** @private */
  protected _null: QuickJSHandle | undefined = undefined
  /** @private */
  protected _false: QuickJSHandle | undefined = undefined
  /** @private */
  protected _true: QuickJSHandle | undefined = undefined
  /** @private */
  protected _global: QuickJSHandle | undefined = undefined
  /** @private */
  protected _BigInt: QuickJSHandle | undefined = undefined
  /** @private  */
  protected uint32Out: HeapTypedArray<Uint32Array, UInt32Pointer>
  /** @private */
  protected _Symbol: QuickJSHandle | undefined = undefined
  /** @private */
  protected _SymbolIterator: QuickJSHandle | undefined = undefined
  /** @private */
  protected _SymbolAsyncIterator: QuickJSHandle | undefined = undefined

  /**
   * Use {@link QuickJSRuntime#newContext} or {@link QuickJSWASMModule#newContext}
   * to create a new QuickJSContext.
   */
  constructor(args: {
    module: EitherModule
    ffi: EitherFFI
    ctx: Lifetime<JSContextPointer>
    rt: Lifetime<JSRuntimePointer>
    runtime: QuickJSRuntime
    ownedLifetimes?: Disposable[]
    callbacks: QuickJSModuleCallbacks
  }) {
    super()
    this.runtime = args.runtime
    this.module = args.module
    this.ffi = args.ffi
    this.rt = args.rt
    this.ctx = args.ctx
    this.memory = new ContextMemory({
      ...args,
      owner: this.runtime,
    })
    args.callbacks.setContextCallbacks(this.ctx.value, this.cToHostCallbacks)
    this.dump = this.dump.bind(this)
    this.getString = this.getString.bind(this)
    this.getNumber = this.getNumber.bind(this)
    this.resolvePromise = this.resolvePromise.bind(this)
    this.uint32Out = this.memory.manage(
      this.memory.newTypedArray<Uint32Array, UInt32Pointer>(Uint32Array, 1),
    )
  }

  // @implement Disposable ----------------------------------------------------

  get alive() {
    return this.memory.alive
  }

  /**
   * Dispose of this VM's underlying resources.
   *
   * @throws Calling this method without disposing of all created handles
   * will result in an error.
   */
  dispose() {
    this.memory.dispose()
  }

  // Globals ------------------------------------------------------------------

  /**
   * [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined).
   */
  get undefined(): QuickJSHandle {
    if (this._undefined) {
      return this._undefined
    }

    // Undefined is a constant, immutable value in QuickJS.
    const ptr = this.ffi.QTS_GetUndefined()
    return (this._undefined = new StaticLifetime(ptr))
  }

  /**
   * [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null).
   */
  get null(): QuickJSHandle {
    if (this._null) {
      return this._null
    }

    // Null is a constant, immutable value in QuickJS.
    const ptr = this.ffi.QTS_GetNull()
    return (this._null = new StaticLifetime(ptr))
  }

  /**
   * [`true`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/true).
   */
  get true(): QuickJSHandle {
    if (this._true) {
      return this._true
    }

    // True is a constant, immutable value in QuickJS.
    const ptr = this.ffi.QTS_GetTrue()
    return (this._true = new StaticLifetime(ptr))
  }

  /**
   * [`false`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/false).
   */
  get false(): QuickJSHandle {
    if (this._false) {
      return this._false
    }

    // False is a constant, immutable value in QuickJS.
    const ptr = this.ffi.QTS_GetFalse()
    return (this._false = new StaticLifetime(ptr))
  }

  /**
   * [`global`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects).
   * A handle to the global object inside the interpreter.
   * You can set properties to create global variables.
   */
  get global(): QuickJSHandle {
    if (this._global) {
      return this._global
    }

    // The global is a JSValue, but since it's lifetime is as long as the VM's,
    // we should manage it.
    const ptr = this.ffi.QTS_GetGlobalObject(this.ctx.value)

    // Automatically clean up this reference when we dispose
    this._global = this.memory.staticHeapValueHandle(ptr)
    return this._global
  }

  // New values ---------------------------------------------------------------

  /**
   * Converts a Javascript number into a QuickJS value.
   */
  newNumber(num: number): QuickJSHandle {
    return this.memory.heapValueHandle(this.ffi.QTS_NewFloat64(this.ctx.value, num))
  }

  /**
   * Create a QuickJS [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) value.
   */
  newString(str: string): QuickJSHandle {
    const ptr = this.memory
      .newHeapCharPointer(str)
      .consume((charHandle) => this.ffi.QTS_NewString(this.ctx.value, charHandle.value.ptr))
    return this.memory.heapValueHandle(ptr)
  }

  /**
   * Create a QuickJS [symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) value.
   * No two symbols created with this function will be the same value.
   */
  newUniqueSymbol(description: string | symbol): QuickJSHandle {
    const key = (typeof description === "symbol" ? description.description : description) ?? ""
    const ptr = this.memory
      .newHeapCharPointer(key)
      .consume((charHandle) => this.ffi.QTS_NewSymbol(this.ctx.value, charHandle.value.ptr, 0))
    return this.memory.heapValueHandle(ptr)
  }

  /**
   * Get a symbol from the [global registry](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#shared_symbols_in_the_global_symbol_registry) for the given key.
   * All symbols created with the same key will be the same value.
   */
  newSymbolFor(key: string | symbol): QuickJSHandle {
    const description = (typeof key === "symbol" ? key.description : key) ?? ""
    const ptr = this.memory
      .newHeapCharPointer(description)
      .consume((charHandle) => this.ffi.QTS_NewSymbol(this.ctx.value, charHandle.value.ptr, 1))
    return this.memory.heapValueHandle(ptr)
  }

  /**
   * Access a well-known symbol that is a property of the global Symbol object, like `Symbol.iterator`.
   */
  getWellKnownSymbol(name: string): QuickJSHandle {
    this._Symbol ??= this.memory.manage(this.getProp(this.global, "Symbol"))
    return this.getProp(this._Symbol, name)
  }

  /**
   * Create a QuickJS [bigint](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) value.
   */
  newBigInt(num: bigint): QuickJSHandle {
    if (!this._BigInt) {
      const bigIntHandle = this.getProp(this.global, "BigInt")
      this.memory.manage(bigIntHandle)
      this._BigInt = new StaticLifetime(bigIntHandle.value as JSValueConstPointer, this.runtime)
    }

    const bigIntHandle = this._BigInt
    const asString = String(num)
    return this.newString(asString).consume((handle) =>
      this.unwrapResult(this.callFunction(bigIntHandle, this.undefined, handle)),
    )
  }

  /**
   * `{}`.
   * Create a new QuickJS [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer).
   *
   * @param prototype - Like [`Object.create`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create).
   */
  newObject(prototype?: QuickJSHandle): QuickJSHandle {
    if (prototype) {
      this.runtime.assertOwned(prototype)
    }
    const ptr = prototype
      ? this.ffi.QTS_NewObjectProto(this.ctx.value, prototype.value)
      : this.ffi.QTS_NewObject(this.ctx.value)
    return this.memory.heapValueHandle(ptr)
  }

  /**
   * `[]`.
   * Create a new QuickJS [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).
   */
  newArray(): QuickJSHandle {
    const ptr = this.ffi.QTS_NewArray(this.ctx.value)
    return this.memory.heapValueHandle(ptr)
  }

  /**
   *  Create a new QuickJS [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer).
   */
  newArrayBuffer(buffer: ArrayBufferLike): QuickJSHandle {
    const array = new Uint8Array(buffer)
    const handle = this.memory.newHeapBufferPointer(array)
    const ptr = this.ffi.QTS_NewArrayBuffer(this.ctx.value, handle.value.pointer, array.length)
    return this.memory.heapValueHandle(ptr)
  }

  /**
   * Create a new {@link QuickJSDeferredPromise}. Use `deferred.resolve(handle)` and
   * `deferred.reject(handle)` to fulfill the promise handle available at `deferred.handle`.
   * Note that you are responsible for calling `deferred.dispose()` to free the underlying
   * resources; see the documentation on {@link QuickJSDeferredPromise} for details.
   */
  newPromise(): QuickJSDeferredPromise
  /**
   * Create a new {@link QuickJSDeferredPromise} that resolves when the
   * given native Promise<QuickJSHandle> resolves. Rejections will be coerced
   * to a QuickJS error.
   *
   * You can still resolve/reject the created promise "early" using its methods.
   */
  newPromise(promise: Promise<QuickJSHandle>): QuickJSDeferredPromise
  /**
   * Construct a new native Promise<QuickJSHandle>, and then convert it into a
   * {@link QuickJSDeferredPromise}.
   *
   * You can still resolve/reject the created promise "early" using its methods.
   */
  newPromise(
    newPromiseFn: PromiseExecutor<QuickJSHandle, Error | QuickJSHandle>,
  ): QuickJSDeferredPromise
  newPromise(
    value?: PromiseExecutor<QuickJSHandle, Error | QuickJSHandle> | Promise<QuickJSHandle>,
  ): QuickJSDeferredPromise {
    const deferredPromise = Scope.withScope((scope) => {
      const mutablePointerArray = scope.manage(
        this.memory.newMutablePointerArray<JSValuePointerPointer>(2),
      )
      const promisePtr = this.ffi.QTS_NewPromiseCapability(
        this.ctx.value,
        mutablePointerArray.value.ptr,
      )
      const promiseHandle = this.memory.heapValueHandle(promisePtr)
      const [resolveHandle, rejectHandle] = Array.from(mutablePointerArray.value.typedArray).map(
        (jsvaluePtr) => this.memory.heapValueHandle(jsvaluePtr as any),
      )
      return new QuickJSDeferredPromise({
        context: this,
        promiseHandle,
        resolveHandle,
        rejectHandle,
      })
    })

    if (value && typeof value === "function") {
      value = new Promise(value)
    }

    if (value) {
      Promise.resolve(value).then(deferredPromise.resolve, (error) =>
        error instanceof Lifetime
          ? deferredPromise.reject(error)
          : this.newError(error).consume(deferredPromise.reject),
      )
    }

    return deferredPromise
  }

  /**
   * Convert a Javascript function into a QuickJS function value.
   * See {@link VmFunctionImplementation} for more details.
   *
   * A {@link VmFunctionImplementation} should not free its arguments or its return
   * value. A VmFunctionImplementation should also not retain any references to
   * its return value.
   *
   * The function argument handles are automatically disposed when the function
   * returns. If you want to retain a handle beyond the end of the function, you
   * can call {@link Lifetime#dup} to create a copy of the handle that you own
   * and must dispose manually. For example, you need to use this API and do some
   * extra book keeping to implement `setInterval`:
   *
   * ```typescript
   * // This won't work because `callbackHandle` expires when the function returns,
   * // so when the interval fires, the callback handle is already disposed.
   * const WRONG_setIntervalHandle = context.newFunction("setInterval", (callbackHandle, delayHandle) => {
   *   const delayMs = context.getNumber(delayHandle)
   *   const intervalId = globalThis.setInterval(() => {
   *     // ERROR: callbackHandle is already disposed here.
   *     context.callFunction(callbackHandle)
   *   }, intervalId)
   *   return context.newNumber(intervalId)
   * })
   *
   * // This works since we dup the callbackHandle.
   * // We just need to make sure we clean it up manually when the interval is cleared --
   * // so we need to keep track of those interval IDs, and make sure we clean all
   * // of them up when we dispose the owning context.
   *
   * const setIntervalHandle = context.newFunction("setInterval", (callbackHandle, delayHandle) => {
   *   // Ensure the guest can't overload us by scheduling too many intervals.
   *   if (QuickJSInterval.INTERVALS.size > 100) {
   *     throw new Error(`Too many intervals scheduled already`)
   *   }
   *
   *   const delayMs = context.getNumber(delayHandle)
   *   const longLivedCallbackHandle = callbackHandle.dup()
   *   const intervalId = globalThis.setInterval(() => {
   *     context.callFunction(longLivedCallbackHandle)
   *   }, intervalId)
   *   const disposable = new QuickJSInterval(longLivedCallbackHandle, context, intervalId)
   *   QuickJSInterval.INTERVALS.set(intervalId, disposable)
   *   return context.newNumber(intervalId)
   * })
   *
   * const clearIntervalHandle = context.newFunction("clearInterval", (intervalIdHandle) => {
   *   const intervalId = context.getNumber(intervalIdHandle)
   *   const disposable = QuickJSInterval.INTERVALS.get(intervalId)
   *   disposable?.dispose()
   * })
   *
   * class QuickJSInterval extends UsingDisposable {
   *   static INTERVALS = new Map<number, QuickJSInterval>()
   *
   *   static disposeContext(context: QuickJSContext) {
   *     for (const interval of QuickJSInterval.INTERVALS.values()) {
   *       if (interval.context === context) {
   *         interval.dispose()
   *       }
   *     }
   *   }
   *
   *   constructor(
   *     public fnHandle: QuickJSHandle,
   *     public context: QuickJSContext,
   *     public intervalId: number,
   *   ) {
   *     super()
   *   }
   *
   *   dispose() {
   *     globalThis.clearInterval(this.intervalId)
   *     this.fnHandle.dispose()
   *     QuickJSInterval.INTERVALS.delete(this.fnHandle.value)
   *   }
   *
   *   get alive() {
   *     return this.fnHandle.alive
   *   }
   * }
   * ```
   *
   * To implement an async function, create a promise with {@link newPromise}, then
   * return the deferred promise handle from `deferred.handle` from your
   * function implementation:
   *
   * ```typescript
   * const deferred = vm.newPromise()
   * someNativeAsyncFunction().then(deferred.resolve)
   * return deferred.handle
   * ```
   */
  newFunction(name: string, fn: VmFunctionImplementation<QuickJSHandle>): QuickJSHandle {
    const fnId = ++this.fnNextId
    this.setFunction(fnId, fn)
    return this.memory.heapValueHandle(this.ffi.QTS_NewFunction(this.ctx.value, fnId, name))
  }

  newError(error: { name: string; message: string }): QuickJSHandle
  newError(message: string): QuickJSHandle
  newError(): QuickJSHandle
  newError(error?: string | { name: string; message: string }): QuickJSHandle {
    const errorHandle = this.memory.heapValueHandle(this.ffi.QTS_NewError(this.ctx.value))

    if (error && typeof error === "object") {
      if (error.name !== undefined) {
        this.newString(error.name).consume((handle) => this.setProp(errorHandle, "name", handle))
      }

      if (error.message !== undefined) {
        this.newString(error.message).consume((handle) =>
          this.setProp(errorHandle, "message", handle),
        )
      }
    } else if (typeof error === "string") {
      this.newString(error).consume((handle) => this.setProp(errorHandle, "message", handle))
    } else if (error !== undefined) {
      // This isn't supported in the type signature but maybe it will make life easier.
      this.newString(String(error)).consume((handle) =>
        this.setProp(errorHandle, "message", handle),
      )
    }

    return errorHandle
  }

  // Read values --------------------------------------------------------------

  /**
   * `typeof` operator. **Not** [standards compliant](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof).
   *
   * @remarks
   * Does not support BigInt values correctly.
   */
  typeof(handle: QuickJSHandle) {
    this.runtime.assertOwned(handle)
    return this.memory.consumeHeapCharPointer(this.ffi.QTS_Typeof(this.ctx.value, handle.value))
  }

  /**
   * Converts `handle` into a Javascript number.
   * @returns `NaN` on error, otherwise a `number`.
   */
  getNumber(handle: QuickJSHandle): number {
    this.runtime.assertOwned(handle)
    return this.ffi.QTS_GetFloat64(this.ctx.value, handle.value)
  }

  /**
   * Converts `handle` to a Javascript string.
   */
  getString(handle: QuickJSHandle): string {
    this.runtime.assertOwned(handle)
    return this.memory.consumeJSCharPointer(this.ffi.QTS_GetString(this.ctx.value, handle.value))
  }

  /**
   * Converts `handle` into a Javascript symbol. If the symbol is in the global
   * registry in the guest, it will be created with Symbol.for on the host.
   */
  getSymbol(handle: QuickJSHandle): symbol {
    this.runtime.assertOwned(handle)
    const key = this.memory.consumeJSCharPointer(
      this.ffi.QTS_GetSymbolDescriptionOrKey(this.ctx.value, handle.value),
    )
    const isGlobal = this.ffi.QTS_IsGlobalSymbol(this.ctx.value, handle.value)
    return isGlobal ? Symbol.for(key) : Symbol(key)
  }

  /**
   * Converts `handle` to a Javascript bigint.
   */
  getBigInt(handle: QuickJSHandle): bigint {
    this.runtime.assertOwned(handle)
    const asString = this.getString(handle)
    return BigInt(asString)
  }

  /**
   * Coverts `handle` to a JavaScript ArrayBuffer
   */
  getArrayBuffer(handle: QuickJSHandle): Lifetime<Uint8Array> {
    this.runtime.assertOwned(handle)
    const len = this.ffi.QTS_GetArrayBufferLength(this.ctx.value, handle.value)
    const ptr = this.ffi.QTS_GetArrayBuffer(this.ctx.value, handle.value)
    if (!ptr) {
      throw new Error("Couldn't allocate memory to get ArrayBuffer")
    }
    return new Lifetime(this.module.HEAPU8.subarray(ptr, ptr + len), undefined, () =>
      this.module._free(ptr),
    )
  }

  /**
   * Get the current state of a QuickJS promise, see {@link JSPromiseState} for the possible states.
   * This can be used to expect a promise to be fulfilled when combined with {@link unwrapResult}:
   *
   * ```typescript
   * const promiseHandle = context.evalCode(`Promise.resolve(42)`);
   * const resultHandle = context.unwrapResult(
   *  context.getPromiseState(promiseHandle)
   * );
   * context.getNumber(resultHandle) === 42; // true
   * resultHandle.dispose();
   * ```
   */
  getPromiseState(handle: QuickJSHandle): JSPromiseState {
    this.runtime.assertOwned(handle)
    const state = this.ffi.QTS_PromiseState(this.ctx.value, handle.value)
    if (state < 0) {
      // Not a promise, but act like `await` would with non-promise, and just return the value.
      return { type: "fulfilled", value: handle, notAPromise: true }
    }

    if (state === JSPromiseStateEnum.Pending) {
      return {
        type: "pending",
        get error() {
          return new QuickJSPromisePending(`Cannot unwrap a pending promise`)
        },
      }
    }

    const ptr = this.ffi.QTS_PromiseResult(this.ctx.value, handle.value)
    const result = this.memory.heapValueHandle(ptr)
    if (state === JSPromiseStateEnum.Fulfilled) {
      return { type: "fulfilled", value: result }
    }
    if (state === JSPromiseStateEnum.Rejected) {
      return { type: "rejected", error: result }
    }
    result.dispose()
    throw new Error(`Unknown JSPromiseStateEnum: ${state}`)
  }

  /**
   * `Promise.resolve(value)`.
   * Convert a handle containing a Promise-like value inside the VM into an
   * actual promise on the host.
   *
   * @remarks
   * You may need to call {@link runtime}.{@link QuickJSRuntime#executePendingJobs} to ensure that the promise is resolved.
   *
   * @param promiseLikeHandle - A handle to a Promise-like value with a `.then(onSuccess, onError)` method.
   */
  resolvePromise(promiseLikeHandle: QuickJSHandle): Promise<QuickJSContextResult<QuickJSHandle>> {
    this.runtime.assertOwned(promiseLikeHandle)
    const vmResolveResult = Scope.withScope((scope) => {
      const vmPromise = scope.manage(this.getProp(this.global, "Promise"))
      const vmPromiseResolve = scope.manage(this.getProp(vmPromise, "resolve"))
      return this.callFunction(vmPromiseResolve, vmPromise, promiseLikeHandle)
    })
    if (vmResolveResult.error) {
      return Promise.resolve(vmResolveResult)
    }

    return new Promise<QuickJSContextResult<QuickJSHandle>>((resolve) => {
      Scope.withScope((scope) => {
        const resolveHandle = scope.manage(
          this.newFunction("resolve", (value) => {
            resolve(this.success(value && value.dup()))
          }),
        )

        const rejectHandle = scope.manage(
          this.newFunction("reject", (error) => {
            resolve(this.fail(error && error.dup()))
          }),
        )

        const promiseHandle = scope.manage(vmResolveResult.value)
        const promiseThenHandle = scope.manage(this.getProp(promiseHandle, "then"))
        this.callFunction(promiseThenHandle, promiseHandle, resolveHandle, rejectHandle)
          .unwrap()
          .dispose()
      })
    })
  }

  // Compare -----------------------------------------------------------

  private isEqual(
    a: QuickJSHandle,
    b: QuickJSHandle,
    equalityType: IsEqualOp = IsEqualOp.IsStrictlyEqual,
  ): boolean {
    if (a === b) {
      return true
    }
    this.runtime.assertOwned(a)
    this.runtime.assertOwned(b)
    const result = this.ffi.QTS_IsEqual(this.ctx.value, a.value, b.value, equalityType)
    if (result === -1) {
      throw new QuickJSNotImplemented("WASM variant does not expose equality")
    }
    return Boolean(result)
  }

  /**
   * `handle === other` - IsStrictlyEqual.
   * See [Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness).
   */
  eq(handle: QuickJSHandle, other: QuickJSHandle): boolean {
    return this.isEqual(handle, other, IsEqualOp.IsStrictlyEqual)
  }

  /**
   * `Object.is(a, b)`
   * See [Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness).
   */
  sameValue(handle: QuickJSHandle, other: QuickJSHandle): boolean {
    return this.isEqual(handle, other, IsEqualOp.IsSameValue)
  }

  /**
   * SameValueZero comparison.
   * See [Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness).
   */
  sameValueZero(handle: QuickJSHandle, other: QuickJSHandle): boolean {
    return this.isEqual(handle, other, IsEqualOp.IsSameValueZero)
  }

  // Properties ---------------------------------------------------------------

  /**
   * `handle[key]`.
   * Get a property from a JSValue.
   *
   * @param key - The property may be specified as a JSValue handle, or as a
   * Javascript string (which will be converted automatically).
   */
  getProp(handle: QuickJSHandle, key: QuickJSPropertyKey): QuickJSHandle {
    this.runtime.assertOwned(handle)
    let ptr: JSValuePointer
    if (typeof key === "number" && key >= 0) {
      // Index access fast path
      ptr = this.ffi.QTS_GetPropNumber(this.ctx.value, handle.value, key)
    } else {
      ptr = this.borrowPropertyKey(key).consume((quickJSKey) =>
        this.ffi.QTS_GetProp(this.ctx.value, handle.value, quickJSKey.value),
      )
    }
    const result = this.memory.heapValueHandle(ptr)

    return result
  }

  /**
   * `handle.length` as a host number.
   *
   * Example use:
   * ```typescript
   * const length = context.getLength(arrayHandle) ?? 0
   * for (let i = 0; i < length; i++) {
   *   using value = context.getProp(arrayHandle, i)
   *   console.log(`array[${i}] =`, context.dump(value))
   * }
   * ```
   *
   * @returns a number if the handle has a numeric length property, otherwise `undefined`.
   */
  getLength(handle: QuickJSHandle): number | undefined {
    this.runtime.assertOwned(handle)
    const status = this.ffi.QTS_GetLength(this.ctx.value, this.uint32Out.value.ptr, handle.value)
    if (status < 0) {
      return undefined
    }
    return this.uint32Out.value.typedArray[0]
  }

  /**
   * `Object.getOwnPropertyNames(handle)`.
   * Similar to the [standard semantics](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames),
   * but with extra, non-standard options for:
   *
   * - fetching array indexes as numbers (`numbers: true`)
   * - including symbols (`symbols: true`)
   * - only iterating over enumerable properties (`onlyEnumerable: true`)
   *
   * The default behavior is to emulate the standard:
   * ```typescript
   * context.getOwnPropertyNames(handle, { strings: true, numbersAsStrings: true })
   * ```
   *
   * Note when passing an explicit options object, you must set at least one
   * option, and `strings` are not included unless specified.
   *
   * Example use:
   * ```typescript
   * for (using prop of context.getOwnPropertyNames(objectHandle).unwrap()) {
   *   using value = context.getProp(handle, prop)
   *   console.log(context.dump(prop), '->', context.dump(value))
   * }
   * ```
   *
   * @returns an an array of handles of the property names. The array itself is disposable for your convenience.
   * @throws QuickJSEmptyGetOwnPropertyNames if no options are set.
   */
  getOwnPropertyNames(
    handle: QuickJSHandle,
    options: GetOwnPropertyNamesOptions = {
      strings: true,
      numbersAsStrings: true,
    },
  ): QuickJSContextResult<DisposableArray<QuickJSHandle>> {
    this.runtime.assertOwned(handle)
    handle.value // assert alive
    const flags = getOwnPropertyNamesOptionsToFlags(options)
    if (flags === 0) {
      throw new QuickJSEmptyGetOwnPropertyNames("No options set, will return an empty array")
    }
    return Scope.withScope((scope) => {
      const outPtr = scope.manage(
        this.memory.newMutablePointerArray<JSValuePointerPointerPointer>(1),
      )
      const errorPtr = this.ffi.QTS_GetOwnPropertyNames(
        this.ctx.value,
        outPtr.value.ptr,
        this.uint32Out.value.ptr,
        handle.value,
        flags,
      )
      if (errorPtr) {
        return this.fail(this.memory.heapValueHandle(errorPtr))
      }
      const len = this.uint32Out.value.typedArray[0]
      const ptr = outPtr.value.typedArray[0]
      const pointerArray = new Uint32Array(this.module.HEAP8.buffer, ptr, len)
      const handles = Array.from(pointerArray).map((ptr) =>
        this.memory.heapValueHandle(ptr as JSValuePointer),
      )
      this.ffi.QTS_FreeVoidPointer(this.ctx.value, ptr as JSVoidPointer)
      return this.success(createDisposableArray(handles))
    })
  }

  /**
   * `handle[Symbol.iterator]()`. See {@link QuickJSIterator}.
   * Returns a host iterator that wraps and proxies calls to a guest iterator handle.
   * Each step of the iteration returns a result, either an error or a handle to the next value.
   * Once the iterator is done, the handle is automatically disposed, and the iterator
   * is considered done if the handle is disposed.
   *
   * ```typescript
   * for (using entriesHandle of context.getIterator(mapHandle).unwrap()) {
   *   using keyHandle = context.getProp(entriesHandle, 0)
   *   using valueHandle = context.getProp(entriesHandle, 1)
   *   console.log(context.dump(keyHandle), '->', context.dump(valueHandle))
   * }
   * ```
   */
  getIterator(iterableHandle: QuickJSHandle): QuickJSContextResult<QuickJSIterator> {
    const SymbolIterator = (this._SymbolIterator ??= this.memory.manage(
      this.getWellKnownSymbol("iterator"),
    ))
    return Scope.withScope((scope) => {
      const methodHandle = scope.manage(this.getProp(iterableHandle, SymbolIterator))
      const iteratorCallResult = this.callFunction(methodHandle, iterableHandle)
      if (iteratorCallResult.error) {
        return iteratorCallResult
      }
      return this.success(new QuickJSIterator(iteratorCallResult.value, this))
    })
  }

  /**
   * `handle[key] = value`.
   * Set a property on a JSValue.
   *
   * @remarks
   * Note that the QuickJS authors recommend using {@link defineProp} to define new
   * properties.
   *
   * @param key - The property may be specified as a JSValue handle, or as a
   * Javascript string or number (which will be converted automatically to a JSValue).
   */
  setProp(handle: QuickJSHandle, key: QuickJSPropertyKey, value: QuickJSHandle) {
    this.runtime.assertOwned(handle)
    // free newly allocated value if key was a string or number. No-op if string was already
    // a QuickJS handle.
    this.borrowPropertyKey(key).consume((quickJSKey) =>
      this.ffi.QTS_SetProp(this.ctx.value, handle.value, quickJSKey.value, value.value),
    )
  }

  /**
   * [`Object.defineProperty(handle, key, descriptor)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).
   *
   * @param key - The property may be specified as a JSValue handle, or as a
   * Javascript string or number (which will be converted automatically to a JSValue).
   */
  defineProp(
    handle: QuickJSHandle,
    key: QuickJSPropertyKey,
    descriptor: VmPropertyDescriptor<QuickJSHandle>,
  ): void {
    this.runtime.assertOwned(handle)
    Scope.withScope((scope) => {
      const quickJSKey = scope.manage(this.borrowPropertyKey(key))

      const value = descriptor.value || this.undefined
      const configurable = Boolean(descriptor.configurable)
      const enumerable = Boolean(descriptor.enumerable)
      const hasValue = Boolean(descriptor.value)
      const get = descriptor.get
        ? scope.manage(this.newFunction(descriptor.get.name, descriptor.get))
        : this.undefined
      const set = descriptor.set
        ? scope.manage(this.newFunction(descriptor.set.name, descriptor.set))
        : this.undefined

      this.ffi.QTS_DefineProp(
        this.ctx.value,
        handle.value,
        quickJSKey.value,
        value.value,
        get.value,
        set.value,
        configurable,
        enumerable,
        hasValue,
      )
    })
  }

  // Evaluation ---------------------------------------------------------------

  /**
   * [`func.call(thisVal, ...args)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) or
   * [`func.apply(thisVal, args)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply).
   * Call a JSValue as a function.
   *
   * See {@link unwrapResult}, which will throw if the function returned an error, or
   * return the result handle directly. If evaluation returned a handle containing
   * a promise, use {@link resolvePromise} to convert it to a native promise and
   * {@link runtime}.{@link QuickJSRuntime#executePendingJobs} to finish evaluating the promise.
   *
   * @returns A result. If the function threw synchronously, `result.error` be a
   * handle to the exception. Otherwise `result.value` will be a handle to the
   * value.
   *
   * Example:
   *
   * ```typescript
   * using parseIntHandle = context.getProp(global, "parseInt")
   * using stringHandle = context.newString("42")
   * using resultHandle = context.callFunction(parseIntHandle, context.undefined, stringHandle).unwrap()
   * console.log(context.dump(resultHandle)) // 42
   * ```
   */
  callFunction(
    func: QuickJSHandle,
    thisVal: QuickJSHandle,
    args?: QuickJSHandle[],
  ): QuickJSContextResult<QuickJSHandle>
  callFunction(
    func: QuickJSHandle,
    thisVal: QuickJSHandle,
    ...args: QuickJSHandle[]
  ): QuickJSContextResult<QuickJSHandle>
  callFunction(
    func: QuickJSHandle,
    thisVal: QuickJSHandle,
    ...restArgs: Array<QuickJSHandle | QuickJSHandle[] | undefined>
  ): QuickJSContextResult<QuickJSHandle> {
    this.runtime.assertOwned(func)
    let args
    const firstArg = restArgs[0]
    if (firstArg === undefined || Array.isArray(firstArg)) {
      args = firstArg ?? []
    } else {
      args = restArgs as QuickJSHandle[]
    }

    const resultPtr = this.memory
      .toPointerArray(args)
      .consume((argsArrayPtr) =>
        this.ffi.QTS_Call(
          this.ctx.value,
          func.value,
          thisVal.value,
          args.length,
          argsArrayPtr.value,
        ),
      )

    const errorPtr = this.ffi.QTS_ResolveException(this.ctx.value, resultPtr)
    if (errorPtr) {
      this.ffi.QTS_FreeValuePointer(this.ctx.value, resultPtr)
      return this.fail(this.memory.heapValueHandle(errorPtr))
    }

    return this.success(this.memory.heapValueHandle(resultPtr))
  }

  /**
   * `handle[key](...args)`
   *
   * Call a method on a JSValue. This is a convenience method that calls {@link getProp} and {@link callFunction}.
   *
   * @returns A result. If the function threw synchronously, `result.error` be a
   * handle to the exception. Otherwise `result.value` will be a handle to the
   * value.
   */
  callMethod(
    thisHandle: QuickJSHandle,
    key: QuickJSPropertyKey,
    args: QuickJSHandle[] = [],
  ): QuickJSContextResult<QuickJSHandle> {
    return this.getProp(thisHandle, key).consume((func) =>
      this.callFunction(func, thisHandle, args),
    )
  }

  /**
   * Like [`eval(code)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#Description).
   *
   * Evaluates `code`, as though it's in a file named `filename`, with options `options`.
   *
   * - When `options.type` is `"global"`, the code is evaluated in the global
   *   scope of the QuickJSContext, and the return value is the result of the last
   *   expression.
   * - When `options.type` is `"module"`, the code is evaluated is a module scope.
   *   It may use `import` and `export` if {@link runtime}.{@link QuickJSRuntime#setModuleLoader} was called.
   *   It may use top-level await if supported by the underlying QuickJS library.
   *   The return value is the module's exports, or a promise for the module's exports.
   * - When `options.type` is unset, the code is evaluated as a module if it
   *   contains an `import` or `export` statement, otherwise it is evaluated in
   *   the global scope.
   *
   * When working with async code, you many need to call {@link runtime}.{@link QuickJSRuntime#executePendingJobs}
   * to execute callbacks pending after synchronous evaluation returns.
   *
   * See {@link unwrapResult}, which will throw if the function returned an error, or
   * return the result handle directly. If evaluation returned a handle containing
   * a promise, use {@link resolvePromise} to convert it to a native promise and
   * {@link QuickJSRuntime#executePendingJobs} to finish evaluating the promise.
   *
   * *Note*: to protect against infinite loops, provide an interrupt handler to
   * {@link QuickJSRuntime#setInterruptHandler}. You can use {@link shouldInterruptAfterDeadline} to
   * create a time-based deadline.
   *
   * @returns The last statement's value. If the code threw synchronously,
   * `result.error` will be a handle to the exception. If execution was
   * interrupted, the error will have name `InternalError` and message
   * `interrupted`.
   */
  evalCode(
    code: string,
    filename: string = "eval.js",
    /**
     * If no options are passed, a heuristic will be used to detect if `code` is
     * an ES module.
     *
     * See {@link EvalFlags} for number semantics.
     */
    options?: number | ContextEvalOptions,
  ): QuickJSContextResult<QuickJSHandle> {
    const detectModule = (options === undefined ? 1 : 0) as EvalDetectModule
    const flags = evalOptionsToFlags(options) as EvalFlags
    const resultPtr = this.memory
      .newHeapCharPointer(code)
      .consume((charHandle) =>
        this.ffi.QTS_Eval(
          this.ctx.value,
          charHandle.value.ptr,
          charHandle.value.strlen,
          filename,
          detectModule,
          flags,
        ),
      )
    const errorPtr = this.ffi.QTS_ResolveException(this.ctx.value, resultPtr)
    if (errorPtr) {
      this.ffi.QTS_FreeValuePointer(this.ctx.value, resultPtr)
      return this.fail(this.memory.heapValueHandle(errorPtr))
    }
    return this.success(this.memory.heapValueHandle(resultPtr))
  }

  /**
   * Throw an error in the VM, interrupted whatever current execution is in progress when execution resumes.
   * @experimental
   */
  throw(error: Error | QuickJSHandle) {
    return this.errorToHandle(error).consume((handle) =>
      this.ffi.QTS_Throw(this.ctx.value, handle.value),
    )
  }

  /**
   * @private
   */
  protected borrowPropertyKey(key: QuickJSPropertyKey): QuickJSHandle {
    if (typeof key === "number") {
      return this.newNumber(key)
    }

    if (typeof key === "string") {
      return this.newString(key)
    }

    // key is already a JSValue, but we're borrowing it. Return a static handle
    // for internal use only.
    return new StaticLifetime(key.value as JSValueConstPointer, this.runtime)
  }

  /**
   * @private
   */
  getMemory(rt: JSRuntimePointer): ContextMemory {
    if (rt === this.rt.value) {
      return this.memory
    } else {
      throw new Error("Private API. Cannot get memory from a different runtime")
    }
  }

  // Utilities ----------------------------------------------------------------

  /**
   * Dump a JSValue to Javascript in a best-effort fashion.
   * If the value is a promise, dumps the promise's state.
   * Returns `handle.toString()` if it cannot be serialized to JSON.
   */
  dump(handle: QuickJSHandle): any {
    this.runtime.assertOwned(handle)
    const type = this.typeof(handle)
    if (type === "string") {
      return this.getString(handle)
    } else if (type === "number") {
      return this.getNumber(handle)
    } else if (type === "bigint") {
      return this.getBigInt(handle)
    } else if (type === "undefined") {
      return undefined
    } else if (type === "symbol") {
      return this.getSymbol(handle)
    }

    // It's confusing if we dump(promise) and just get back {} because promise
    // has no properties, so dump promise state.
    const asPromiseState = this.getPromiseState(handle)
    if (asPromiseState.type === "fulfilled" && !asPromiseState.notAPromise) {
      handle.dispose()
      return { type: asPromiseState.type, value: asPromiseState.value.consume(this.dump) }
    } else if (asPromiseState.type === "pending") {
      handle.dispose()
      return { type: asPromiseState.type }
    } else if (asPromiseState.type === "rejected") {
      handle.dispose()
      return { type: asPromiseState.type, error: asPromiseState.error.consume(this.dump) }
    }

    const str = this.memory.consumeJSCharPointer(this.ffi.QTS_Dump(this.ctx.value, handle.value))
    try {
      return JSON.parse(str)
    } catch (err) {
      return str
    }
  }

  /**
   * Unwrap a SuccessOrFail result such as a {@link VmCallResult} or a
   * {@link ExecutePendingJobsResult}, where the fail branch contains a handle to a QuickJS error value.
   * If the result is a success, returns the value.
   * If the result is an error, converts the error to a native object and throws the error.
   */
  unwrapResult<T>(result: SuccessOrFail<T, QuickJSHandle>): T {
    if (result.error) {
      const context: QuickJSContext =
        "context" in result.error ? (result.error as { context: QuickJSContext }).context : this
      const cause = result.error.consume((error) => this.dump(error))

      if (cause && typeof cause === "object" && typeof cause.message === "string") {
        const { message, name, stack, ...rest } = cause
        const exception = new QuickJSUnwrapError(cause, context)

        if (typeof name === "string") {
          exception.name = cause.name
        }

        exception.message = message
        const hostStack = exception.stack
        if (typeof stack === "string") {
          exception.stack = `${name}: ${message}\n${cause.stack}Host: ${hostStack}`
        }

        Object.assign(exception, rest)
        throw exception
      }

      throw new QuickJSUnwrapError(cause)
    }

    return result.value
  }

  /** @private */
  [Symbol.for("nodejs.util.inspect.custom")]() {
    if (!this.alive) {
      return `${this.constructor.name} { disposed }`
    }
    return `${this.constructor.name} { ctx: ${this.ctx.value} rt: ${this.rt.value} }`
  }

  /** @private */
  protected fnNextId = -32768 // min value of signed 16bit int used by Quickjs
  /** @private */
  protected fnMaps = new Map<number, Map<number, VmFunctionImplementation<QuickJSHandle>>>()

  /** @private */
  protected getFunction(fn_id: number): VmFunctionImplementation<QuickJSHandle> | undefined {
    const map_id = fn_id >> 8
    const fnMap = this.fnMaps.get(map_id)
    if (!fnMap) {
      return undefined
    }
    return fnMap.get(fn_id)
  }

  /** @private */
  protected setFunction(fn_id: number, handle: VmFunctionImplementation<QuickJSHandle>) {
    const map_id = fn_id >> 8
    let fnMap = this.fnMaps.get(map_id)
    if (!fnMap) {
      fnMap = new Map<number, VmFunctionImplementation<QuickJSHandle>>()
      this.fnMaps.set(map_id, fnMap)
    }
    return fnMap.set(fn_id, handle)
  }

  /**
   * @hidden
   */
  private cToHostCallbacks: ContextCallbacks = {
    callFunction: (ctx, this_ptr, argc, argv, fn_id) => {
      if (ctx !== this.ctx.value) {
        throw new Error("QuickJSContext instance received C -> JS call with mismatched ctx")
      }

      const fn = this.getFunction(fn_id)
      if (!fn) {
        // this "throw" is not catch-able from the TS side. could we somehow handle this higher up?
        throw new Error(`QuickJSContext had no callback with id ${fn_id}`)
      }

      return Scope.withScopeMaybeAsync(this, function* (awaited, scope) {
        const thisHandle = scope.manage(
          new WeakLifetime(
            this_ptr,
            this.memory.copyJSValue,
            this.memory.freeJSValue,
            this.runtime,
          ),
        )
        const argHandles = new Array<QuickJSHandle>(argc)
        for (let i = 0; i < argc; i++) {
          const ptr = this.ffi.QTS_ArgvGetJSValueConstPointer(argv, i)
          argHandles[i] = scope.manage(
            new WeakLifetime(ptr, this.memory.copyJSValue, this.memory.freeJSValue, this.runtime),
          )
        }

        try {
          const result = yield* awaited(fn.apply(thisHandle, argHandles))
          if (result) {
            if ("error" in result && result.error) {
              this.runtime.debugLog("throw error", result.error)
              throw result.error
            }
            const handle = scope.manage(result instanceof Lifetime ? result : result.value)
            return this.ffi.QTS_DupValuePointer(this.ctx.value, handle.value)
          }
          return 0 as JSValuePointer
        } catch (error) {
          return this.errorToHandle(error as Error).consume((errorHandle) =>
            this.ffi.QTS_Throw(this.ctx.value, errorHandle.value),
          )
        }
      }) as JSValuePointer
    },
  }

  private errorToHandle(error: Error | QuickJSHandle): QuickJSHandle {
    if (error instanceof Lifetime) {
      return error
    }

    return this.newError(error)
  }

  /**
   * Outputs QuickJS Objects in binary form
   *
   * **WARNING**: QuickJS's binary JSON doesn't have a standard so expect it to change between version
   *
   * ```ts
   * // imagine sending data to another via IPC
   * let dataLifetime = context.newString("This is an example")
   *  ?.consume(handle => context.encodeBinaryJSON(handle))
   *  ?.consume(handle => context.getArrayBuffer(handle))
   * socket.write(dataLifetime?.value)
   * ```
   */
  encodeBinaryJSON(handle: QuickJSHandle): QuickJSHandle {
    const ptr = this.ffi.QTS_bjson_encode(this.ctx.value, handle.value)
    return this.memory.heapValueHandle(ptr)
  }

  /**
   * Outputs Handle of the given QuickJS Object in binary form
   *
   * ```ts
   * // imagine receiving data from another via IPC
   * socket.on("data", chunk => {
   *  context.newArrayBuffer(chunk)
   *    ?.consume(handle => context.decodeBinaryJSON(handle))
   *    ?.consume(handle => console.log(context.dump(handle)))
   * })
   * ```
   */
  decodeBinaryJSON(handle: QuickJSHandle): QuickJSHandle {
    const ptr = this.ffi.QTS_bjson_decode(this.ctx.value, handle.value)
    return this.memory.heapValueHandle(ptr)
  }

  protected success<S>(value: S): DisposableSuccess<S> {
    return DisposableResult.success(value)
  }

  protected fail(error: QuickJSHandle): DisposableFail<QuickJSHandle> {
    return DisposableResult.fail(error, (error) => this.unwrapResult(error))
  }
}
