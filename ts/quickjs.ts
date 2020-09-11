import QuickJSModuleLoader from './quickjs-emscripten-module'
import {
  QuickJSFFI,
  JSContextPointer,
  JSValuePointer,
  JSRuntimePointer,
  JSValueConstPointer,
  JSValueConstPointerPointer,
  JSValuePointerPointer,
  QTS_C_To_HostCallbackFuncPointer,
  QTS_C_To_HostInterruptFuncPointer,
  HeapCharPointer,
} from './ffi'
import {
  LowLevelJavascriptVm,
  VmPropertyDescriptor,
  VmCallResult,
  VmFunctionImplementation,
  SuccessOrFail,
} from './vm-interface'
import { QuickJSEmscriptenModule } from './emscripten-types'
import { Lifetime, WeakLifetime, StaticLifetime, Scope, Disposable } from './lifetime'
export { Lifetime, WeakLifetime, StaticLifetime, Scope, Disposable }

let QuickJSModule: QuickJSEmscriptenModule | undefined = undefined

/**
 * This promise will be fufilled when the QuickJS emscripten module has initialized
 * and the {@link QuickJS} instance can be created.
 */
const ready = QuickJSModuleLoader().then(loadedModule => {
  QuickJSModule = loadedModule
})

/**
 * @throws if not ready
 */
function getQuickJSEmscriptenModule(): QuickJSEmscriptenModule {
  if (!QuickJSModule) {
    throw new Error(
      'QuickJS WASM module not initialized. Either wait for `ready` or use getQuickJS()'
    )
  }
  return QuickJSModule
}

type CToHostCallbackFunctionImplementation = (
  ctx: JSContextPointer,
  this_ptr: JSValueConstPointer,
  argc: number,
  argv: JSValueConstPointer,
  fn_data_ptr: JSValueConstPointer
) => JSValuePointer

type CToHostInterruptImplementation = (rt: JSRuntimePointer) => 0 | 1

/**
 * Callback called regularly while the VM executes code.
 * Determines if a VM's execution should be interrupted.
 *
 * @returns `true` to interrupt JS execution inside the VM.
 * @returns `false` or `undefined` to continue JS execution inside the VM.
 */
export type InterruptHandler = (vm: QuickJSVm) => boolean | undefined

export type QuickJSPropertyKey = number | string | QuickJSHandle

/**
 * QuickJSDeferredPromise wraps a QuickJS promise [[handle]] and allows
 * [[resolve]]ing or [[reject]]ing that promise. Use it to bridge asynchronous
 * code on the host to APIs inside a QuickJSVm.
 *
 * Managing the lifetime of promises is tricky. There are three
 * [[QuickJSHandle]]s inside of each deferred promise object: (1) the promise
 * itself, (2) the `resolve` callback, and (3) the `reject` callback.
 *
 * - If the promise will be fufilled before the end of it's [[owner]]'s lifetime,
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
  /**
   * The QuickJSVm this promise was created by.
   */
  public owner: QuickJSVm

  /**
   * A handle of the Promise instance inside the QuickJSVm.
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
   * Use [[QuickJSVm.newPromise]] to create a new promise instead of calling
   * this constructor directly.
   * @unstable
   */
  constructor(args: {
    owner: QuickJSVm
    promiseHandle: QuickJSHandle
    resolveHandle: QuickJSHandle
    rejectHandle: QuickJSHandle
  }) {
    this.owner = args.owner
    this.handle = args.promiseHandle
    this.settled = new Promise(resolve => {
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
   * [[QuickJSVm.executePendingJobs]] to propagate the result to the promise's
   * callbacks.
   */
  resolve = (value?: QuickJSHandle) => {
    if (!this.resolveHandle.alive) {
      return
    }

    this.owner
      .unwrapResult(
        this.owner.callFunction(
          this.resolveHandle,
          this.owner.undefined,
          value || this.owner.undefined
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
   * [[QuickJSVm.executePendingJobs]] to propagate the result to the promise's
   * callbacks.
   */
  reject = (value?: QuickJSHandle) => {
    if (!this.rejectHandle.alive) {
      return
    }

    this.owner
      .unwrapResult(
        this.owner.callFunction(
          this.rejectHandle,
          this.owner.undefined,
          value || this.owner.undefined
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

/**
 * Used as an optional for the results of executing pendingJobs.
 * On success, `value` contains the number of async jobs executed
 * by the runtime.
 * `{ value: number } | { error: QuickJSHandle }`.
 */
export type ExecutePendingJobsResult = SuccessOrFail<number, QuickJSHandle>

/**
 * QuickJSVm wraps a QuickJS Javascript runtime (JSRuntime*) and context (JSContext*).
 * This class's methods return {@link QuickJSHandle}, which wrap C pointers (JSValue*).
 * It's the caller's responsibility to call `.dispose()` on any
 * handles you create to free memory once you're done with the handle.
 *
 * Each QuickJSVm instance is isolated. You cannot share handles between different
 * QuickJSVm instances. You should create separate QuickJSVm instances for
 * untrusted code from different souces for isolation.
 *
 * Use [[QuickJS.createVm]] to create a new QuickJSVm.
 *
 * Create QuickJS values inside the interpreter with methods like
 * [[newNumber]], [[newString]], [[newArray]], [[newObject]], and
 * [[newFunction]].
 *
 * Call [[setProp]] or [[defineProp]] to customize objects. Use those methods
 * with [[global]] to expose the values you create to the interior of the
 * interpreter, so they can be used in [[evalCode]].
 *
 * Use [[evalCode]] or [[callFunction]] to execute Javascript inside the VM. If
 * you're using asynchronous code inside the QuickJSVm, you may need to also
 * call [[executePendingJobs]].
 *
 * Implement memory and CPU constraints with [[setInterruptHandler]]
 * (called regularly while the interpreter runs) and [[setMemoryLimit]].
 * Use [[computeMemoryUsage]] or [[dumpMemoryUsage]] to guide memory limit
 * tuning.
 */
export class QuickJSVm implements LowLevelJavascriptVm<QuickJSHandle>, Disposable {
  private readonly ctx: Lifetime<JSContextPointer>
  private readonly rt: Lifetime<JSRuntimePointer>

  private readonly module: ReturnType<typeof getQuickJSEmscriptenModule>
  private readonly ffi: QuickJSFFI
  private _undefined: QuickJSHandle | undefined = undefined
  private _null: QuickJSHandle | undefined = undefined
  private _false: QuickJSHandle | undefined = undefined
  private _true: QuickJSHandle | undefined = undefined
  private _global: QuickJSHandle | undefined = undefined
  private _scope = new Scope()

  /**
   * Use {@link QuickJS.createVm} to create a QuickJSVm instance.
   */
  constructor(args: {
    module: ReturnType<typeof getQuickJSEmscriptenModule>
    ffi: QuickJSFFI
    ctx: Lifetime<JSContextPointer>
    rt: Lifetime<JSRuntimePointer>
  }) {
    this.module = args.module
    this.ffi = args.ffi
    this.rt = this._scope.manage(args.rt)
    this.ctx = this._scope.manage(args.ctx)
  }

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

    // Automatically clean up this reference when we dispose(
    this._scope.manage(this.heapValueHandle(ptr))

    // This isn't technically a static lifetime, but since it has the same
    // lifetime as the VM, it's okay to fake one since when the VM is
    // disposed, no other functions will accept the value.
    this._global = new StaticLifetime(ptr, this)
    return this._global
  }

  /**
   * `typeof` operator. **Not** [standards compliant](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof).
   *
   * @remarks
   * Does not support BigInt values correctly.
   */
  typeof(handle: QuickJSHandle) {
    this.assertOwned(handle)
    return this.ffi.QTS_Typeof(this.ctx.value, handle.value)
  }

  /**
   * Converts a Javascript number into a QuckJS value.
   */
  newNumber(num: number): QuickJSHandle {
    return this.heapValueHandle(this.ffi.QTS_NewFloat64(this.ctx.value, num))
  }

  /**
   * Converts `handle` into a Javascript number.
   * @returns `NaN` on error, othewise a `number`.
   */
  getNumber(handle: QuickJSHandle) {
    this.assertOwned(handle)
    return this.ffi.QTS_GetFloat64(this.ctx.value, handle.value)
  }

  /**
   * Create a QuickJS [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) value.
   */
  newString(str: string): QuickJSHandle {
    const ptr = this.newHeapCharPointer(str).consume(charHandle =>
      this.ffi.QTS_NewString(this.ctx.value, charHandle.value)
    )
    return this.heapValueHandle(ptr)
  }

  /**
   * Converts `handle` to a Javascript string.
   */
  getString(handle: QuickJSHandle) {
    this.assertOwned(handle)
    return this.ffi.QTS_GetString(this.ctx.value, handle.value)
  }

  /**
   * `{}`.
   * Create a new QuickJS [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer).
   *
   * @param prototype - Like [`Object.create`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create).
   */
  newObject(prototype?: QuickJSHandle): QuickJSHandle {
    if (prototype) {
      this.assertOwned(prototype)
    }
    const ptr = prototype
      ? this.ffi.QTS_NewObjectProto(this.ctx.value, prototype.value)
      : this.ffi.QTS_NewObject(this.ctx.value)
    return this.heapValueHandle(ptr)
  }

  /**
   * `[]`.
   * Create a new QuickJS [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).
   */
  newArray(): QuickJSHandle {
    const ptr = this.ffi.QTS_NewArray(this.ctx.value)
    return this.heapValueHandle(ptr)
  }

  /**
   * Convert a Javascript function into a QuickJS function value.
   * See [[VmFunctionImplementation]] for more details.
   *
   * A [[VmFunctionImplementation]] should not free its arguments or its retun
   * value. A VmFunctionImplementation should also not retain any references to
   * its veturn value.
   *
   * To implement an async function, create a promise with [[newPromise]], then
   * return the deferred promise handle from `deferred.handle` from your
   * function implementation:
   *
   * ```
   * const deferred = vm.newPromise()
   * someNativeAsyncFunction().then(deferred.resolve)
   * return deferred.handle
   * ```
   */
  newFunction(name: string, fn: VmFunctionImplementation<QuickJSHandle>): QuickJSHandle {
    const fnId = ++this.fnNextId
    this.fnMap.set(fnId, fn)

    const fnIdHandle = this.newNumber(fnId)
    const funcHandle = this.heapValueHandle(
      this.ffi.QTS_NewFunction(this.ctx.value, fnIdHandle.value, name)
    )

    // We need to free fnIdHandle's pointer, but not the JSValue, which is retained inside
    // QuickJS for late.
    this.module._free(fnIdHandle.value)

    return funcHandle
  }

  /**
   * Create a new [[QuickJSDeferredPromise]]. Use `deferred.resolve(handle)` and
   * `deferred.reject(handle)` to fufill the promise handle available at `deferred.handle`.
   * Note that you are responsible for calling `deferred.dispose()` to free the underlying
   * resources; see the documentation on [[QuickJSDeferredPromise]] for details.
   */
  newPromise(): QuickJSDeferredPromise {
    return Scope.withScope(scope => {
      const mutablePointerArray = scope.manage(this.newMutablePointerArray(2))
      const promisePtr = this.ffi.QTS_NewPromiseCapability(
        this.ctx.value,
        mutablePointerArray.value.ptr
      )
      const promiseHandle = this.heapValueHandle(promisePtr)
      const [resolveHandle, rejectHandle] = Array.from(
        mutablePointerArray.value.typedArray
      ).map(jsvaluePtr => this.heapValueHandle(jsvaluePtr as any))
      return new QuickJSDeferredPromise({
        owner: this,
        promiseHandle,
        resolveHandle,
        rejectHandle,
      })
    })
  }

  /**
   * `handle[key]`.
   * Get a property from a JSValue.
   *
   * @param key - The property may be specified as a JSValue handle, or as a
   * Javascript string (which will be converted automatically).
   */
  getProp(handle: QuickJSHandle, key: QuickJSPropertyKey): QuickJSHandle {
    this.assertOwned(handle)
    const ptr = this.borrowPropertyKey(key).consume(quickJSKey =>
      this.ffi.QTS_GetProp(this.ctx.value, handle.value, quickJSKey.value)
    )
    const result = this.heapValueHandle(ptr)

    return result
  }

  /**
   * `handle[key] = value`.
   * Set a property on a JSValue.
   *
   * @remarks
   * Note that the QuickJS authors recommend using [[defineProp]] to define new
   * properties.
   *
   * @param key - The property may be specified as a JSValue handle, or as a
   * Javascript string or number (which will be converted automatically to a JSValue).
   */
  setProp(handle: QuickJSHandle, key: QuickJSPropertyKey, value: QuickJSHandle) {
    this.assertOwned(handle)
    this.borrowPropertyKey(key).consume(quickJSKey =>
      this.ffi.QTS_SetProp(this.ctx.value, handle.value, quickJSKey.value, value.value)
    )
    // free newly allocated value if key was a string or number. No-op if string was already
    // a QuickJS handle.
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
    descriptor: VmPropertyDescriptor<QuickJSHandle>
  ): void {
    this.assertOwned(handle)
    Scope.withScope(scope => {
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
        hasValue
      )
    })
  }

  /**
   * [`func.call(thisVal, ...args)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call).
   * Call a JSValue as a function.
   *
   * See [[unwrapResult]], which will throw if the function returned an error, or
   * return the result handle directly.
   *
   * @returns A result. If the function threw, result `error` be a handle to the exception.
   */
  callFunction(
    func: QuickJSHandle,
    thisVal: QuickJSHandle,
    ...args: QuickJSHandle[]
  ): VmCallResult<QuickJSHandle> {
    this.assertOwned(func)
    const resultPtr = this.toPointerArray(args).consume(argsArrayPtr =>
      this.ffi.QTS_Call(this.ctx.value, func.value, thisVal.value, args.length, argsArrayPtr.value)
    )

    const errorPtr = this.ffi.QTS_ResolveException(this.ctx.value, resultPtr)
    if (errorPtr) {
      this.ffi.QTS_FreeValuePointer(this.ctx.value, resultPtr)
      return { error: this.heapValueHandle(errorPtr) }
    }

    return { value: this.heapValueHandle(resultPtr) }
  }

  /**
   * Like [`eval(code)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#Description).
   * Evauatetes the Javascript source `code` in the global scope of this VM.
   * When working with async code, you many need to call [[executePendingJobs]]
   * to execute callbacks pending after synchronous evaluation returns.
   *
   * See [[unwrapResult]], which will throw if the function returned an error, or
   * return the result handle directly.
   *
   * *Note*: to protect against infinite loops, provide an interrupt handler to
   * [[setInterruptHandler]]. You can use [[shouldInterruptAfterDeadline]] to
   * create a time-based deadline.
   *
   *
   * @returns The last statement's value. If the code threw, result `error` will be
   * a handle to the exception. If execution was interrupted, the error will
   * have name `InternalError` and message `interrupted`.
   */
  evalCode(code: string): VmCallResult<QuickJSHandle> {
    const resultPtr = this.newHeapCharPointer(code).consume(charHandle =>
      this.ffi.QTS_Eval(this.ctx.value, charHandle.value)
    )
    const errorPtr = this.ffi.QTS_ResolveException(this.ctx.value, resultPtr)
    if (errorPtr) {
      this.ffi.QTS_FreeValuePointer(this.ctx.value, resultPtr)
      return { error: this.heapValueHandle(errorPtr) }
    }
    return { value: this.heapValueHandle(resultPtr) }
  }

  /**
   * Execute pendingJobs on the VM until `maxJobsToExecute` jobs are executed
   * (default all pendingJobs), the queue is exhausted, or the runtime
   * encounters an exception.
   *
   * In QuickJS, promises and async functions create pendingJobs. These do not execute
   * immediately and need to triggered to run.
   *
   * @param maxJobsToExecute - When negative, run all pending jobs. Otherwise execute
   * at most `maxJobsToExecute` before returning.
   *
   * @return On success, the number of executed jobs. On error, the exception
   * that stopped execution.
   */
  executePendingJobs(maxJobsToExecute: number = -1): ExecutePendingJobsResult {
    const resultValue = this.heapValueHandle(
      this.ffi.QTS_ExecutePendingJob(this.rt.value, maxJobsToExecute)
    )
    const typeOfRet = this.typeof(resultValue)
    if (typeOfRet === 'number') {
      const executedJobs = this.getNumber(resultValue)
      resultValue.dispose()
      return { value: executedJobs }
    } else {
      return { error: resultValue }
    }
  }

  /**
   * In QuickJS, promises and async functions create pendingJobs. These do not execute
   * immediately and need to be run by calling [[executePendingJobs]].
   *
   * @return true if there is at least one pendingJob queued up.
   */
  hasPendingJob(): boolean {
    return Boolean(this.ffi.QTS_IsJobPending(this.rt.value))
  }

  // customizations

  /**
   * Dump a JSValue to Javascript in a best-effort fashion.
   * Returns `handle.toString()` if it cannot be serialized to JSON.
   */
  dump(handle: QuickJSHandle) {
    this.assertOwned(handle)
    const type = this.typeof(handle)
    if (type === 'string') {
      return this.getString(handle)
    } else if (type === 'number') {
      return this.getNumber(handle)
    } else if (type === 'undefined') {
      return undefined
    }

    const str = this.ffi.QTS_Dump(this.ctx.value, handle.value)
    try {
      return JSON.parse(str)
    } catch (err) {
      return str
    }
  }

  /**
   * Unwrap a SuccessOrFail result such as a [[VmCallResult]] or a
   * [[ExecutePendingJobsResult]], where the fail branch contains a handle to a QuickJS error value.
   * If the result is a success, returns the value.
   * If the result is an error, converts the error to a native object and throws the error.
   */
  unwrapResult<T>(result: SuccessOrFail<T, QuickJSHandle>): T {
    if (result.error) {
      const dumped = result.error.consume(error => this.dump(error))

      if (dumped && typeof dumped === 'object' && typeof dumped.message === 'string') {
        const exception = new Error(dumped.message)
        if (typeof dumped.name === 'string') {
          exception.name = dumped.name
        }
        throw exception
      }
      throw dumped
    }

    return result.value
  }

  private interruptHandler: InterruptHandler | undefined

  /**
   * Set a callback which is regularly called by the QuickJS engine when it is
   * executing code. This callback can be used to implement an execution
   * timeout.
   *
   * The interrupt handler can be removed with [[removeInterruptHandler]].
   */
  setInterruptHandler(cb: InterruptHandler) {
    const prevInterruptHandler = this.interruptHandler
    this.interruptHandler = cb
    if (!prevInterruptHandler) {
      this.ffi.QTS_RuntimeEnableInterruptHandler(this.rt.value)
    }
  }

  /**
   * Set the max memory this runtime can allocate.
   * To remove the limit, set to `-1`.
   */
  setMemoryLimit(limitBytes: number) {
    if (limitBytes < 0 && limitBytes !== -1) {
      throw new Error('Cannot set memory limit to negative number. To unset, pass -1')
    }

    this.ffi.QTS_RuntimeSetMemoryLimit(this.rt.value, limitBytes)
  }

  /**
   * Compute memory usage for this runtime. Returns the result as a handle to a
   * JSValue object. Use [[dump]] to convert to a native object.
   * Calling this method will allocate more memory inside the runtime. The information
   * is accurate as of just before the call to `computeMemoryUsage`.
   * For a human-digestable representation, see [[dumpMemoryUsage]].
   */
  computeMemoryUsage(): QuickJSHandle {
    return this.heapValueHandle(
      this.ffi.QTS_RuntimeComputeMemoryUsage(this.rt.value, this.ctx.value)
    )
  }

  /**
   * @returns a human-readable description of memory usage in this runtime.
   * For programatic access to this information, see [[computeMemoryUsage]].
   */
  dumpMemoryUsage(): string {
    return this.ffi.QTS_RuntimeDumpMemoryUsage(this.rt.value)
  }

  /**
   * Remove the interrupt handler, if any.
   * See [[setInterruptHandler]].
   */
  removeInterruptHandler() {
    if (this.interruptHandler) {
      this.ffi.QTS_RuntimeDisableInterruptHandler(this.rt.value)
      this.interruptHandler = undefined
    }
  }

  get alive() {
    return this._scope.alive
  }

  /**
   * Dispose of this VM's underlying resources.
   *
   * @throws Calling this method without disposing of all created handles
   * will result in an error.
   */
  dispose() {
    this._scope.dispose()
  }

  private fnNextId = 0
  private fnMap = new Map<number, VmFunctionImplementation<QuickJSHandle>>()

  /**
   * @hidden
   */
  cToHostCallbackFunction: CToHostCallbackFunctionImplementation = (
    ctx,
    this_ptr,
    argc,
    argv,
    fn_data
  ) => {
    if (ctx !== this.ctx.value) {
      throw new Error('QuickJSVm instance received C -> JS call with mismatched ctx')
    }

    const fnId = this.ffi.QTS_GetFloat64(ctx, fn_data)
    const fn = this.fnMap.get(fnId)
    if (!fn) {
      throw new Error(`QuickJSVm had no callback with id ${fnId}`)
    }

    return Scope.withScope(scope => {
      const thisHandle = scope.manage(
        new WeakLifetime(this_ptr, this.copyJSValue, this.freeJSValue, this)
      )
      const argHandles = new Array<QuickJSHandle>(argc)
      for (let i = 0; i < argc; i++) {
        const ptr = this.ffi.QTS_ArgvGetJSValueConstPointer(argv, i)
        argHandles[i] = scope.manage(
          new WeakLifetime(ptr, this.copyJSValue, this.freeJSValue, this)
        )
      }

      let ownedResultPtr = 0 as JSValuePointer
      try {
        let result = fn.apply(thisHandle, argHandles)
        if (result) {
          if ('error' in result && result.error) {
            throw result.error
          }
          const handle = scope.manage(result instanceof Lifetime ? result : result.value)
          ownedResultPtr = this.ffi.QTS_DupValuePointer(this.ctx.value, handle.value)
        }
      } catch (error) {
        ownedResultPtr = this.errorToHandle(error).consume(errorHandle =>
          this.ffi.QTS_Throw(this.ctx.value, errorHandle.value)
        )
      }

      return ownedResultPtr as JSValuePointer
    })
  }

  /** @hidden */
  cToHostInterrupt: CToHostInterruptImplementation = rt => {
    if (rt !== this.rt.value) {
      throw new Error('QuickJSVm instance received C -> JS interrupt with mismatched rt')
    }

    const fn = this.interruptHandler
    if (!fn) {
      throw new Error('QuickJSVm had no interrupt handler')
    }

    return fn(this) ? 1 : 0
  }

  private assertOwned(handle: QuickJSHandle) {
    if (handle.owner && handle.owner !== this) {
      throw new Error('Given handle created by a different VM')
    }
  }

  private copyJSValue = (ptr: JSValuePointer | JSValueConstPointer) => {
    return this.ffi.QTS_DupValuePointer(this.ctx.value, ptr)
  }

  private freeJSValue = (ptr: JSValuePointer) => {
    this.ffi.QTS_FreeValuePointer(this.ctx.value, ptr)
  }

  private heapValueHandle(ptr: JSValuePointer): JSValue {
    return new Lifetime(ptr, this.copyJSValue, this.freeJSValue, this)
  }

  private borrowPropertyKey(key: QuickJSPropertyKey): QuickJSHandle {
    if (typeof key === 'number') {
      return this.newNumber(key)
    }

    if (typeof key === 'string') {
      return this.newString(key)
    }

    // key is alerady a JSValue, but we're borrowing it. Return a static handle
    // for intenal use only.
    return new StaticLifetime(key.value as JSValueConstPointer, this)
  }

  private toPointerArray(handleArray: QuickJSHandle[]): Lifetime<JSValueConstPointerPointer> {
    const typedArray = new Int32Array(handleArray.map(handle => handle.value))
    const numBytes = typedArray.length * typedArray.BYTES_PER_ELEMENT
    const ptr = this.module._malloc(numBytes) as JSValueConstPointerPointer
    var heapBytes = new Uint8Array(this.module.HEAPU8.buffer, ptr, numBytes)
    heapBytes.set(new Uint8Array(typedArray.buffer))
    return new Lifetime(ptr, undefined, ptr => this.module._free(ptr))
  }

  private newMutablePointerArray(
    length: number
  ): Lifetime<{ typedArray: Int32Array; ptr: JSValuePointerPointer }> {
    const zeros = new Int32Array(new Array(length).fill(0))
    const numBytes = zeros.length * zeros.BYTES_PER_ELEMENT
    const ptr = this.module._malloc(numBytes) as JSValuePointerPointer
    const typedArray = new Int32Array(this.module.HEAPU8.buffer, ptr, length)
    typedArray.set(zeros)
    return new Lifetime({ typedArray, ptr }, undefined, value => this.module._free(value.ptr))
  }

  private newHeapCharPointer(string: string): Lifetime<HeapCharPointer> {
    const numBytes = this.module.lengthBytesUTF8(string) + 1
    const ptr: HeapCharPointer = this.module._malloc(numBytes) as HeapCharPointer
    this.module.stringToUTF8(string, ptr, numBytes)
    return new Lifetime(ptr, undefined, value => this.module._free(value))
  }

  private errorToHandle(error: Error | QuickJSHandle) {
    if (error instanceof Lifetime) {
      return error
    }

    const errorHandle = this.heapValueHandle(this.ffi.QTS_NewError(this.ctx.value))

    if (error.name !== undefined) {
      this.newString(error.name).consume(handle => this.setProp(errorHandle, 'name', handle))
    }

    if (error.message !== undefined) {
      this.newString(error.message).consume(handle => this.setProp(errorHandle, 'message', handle))
    }

    // Disabled due to security leak concerns
    if (error.stack !== undefined) {
      //const handle = this.newString(error.stack)
      // Set to fullStack...? For debugging.
      //this.setProp(errorHandle, 'fullStack', handle)
      //handle.dispose()
    }

    return errorHandle
  }
}

/**
 * A QuickJSHandle to a constant that will never change, and does not need to
 * be disposed.
 */
export type StaticJSValue = Lifetime<JSValueConstPointer, JSValueConstPointer, QuickJSVm>

/**
 * A QuickJSHandle to a borrowed value that does not need to be disposed.
 *
 * In QuickJS, a JSValueConst is a "borrowed" reference that isn't owned by the
 * current scope. That means that the current scope should not `JS_FreeValue`
 * it, or retain a reference to it after the scope exits, because it may be
 * freed by its owner.
 *
 * quickjs-emscripten takes care of disposing JSValueConst references.
 */
export type JSValueConst = Lifetime<JSValueConstPointer, JSValuePointer, QuickJSVm>

/**
 * A owned QuickJSHandle that should be disposed or returned.
 *
 * The QuickJS interpreter passes Javascript values between functions as
 * `JSValue` structs that references some internal data. Because passing
 * structs cross the Empscripten FFI interfaces is bothersome, we use pointers
 * to these structs instead.
 *
 * A JSValue reference is "owned" in its scope. before exiting the scope, it
 * should be freed,  by calling `JS_FreeValue(ctx, js_value)`) or returned from
 * the scope. We extend that contract - a JSValuePointer (`JSValue*`) must also
 * be `free`d.
 *
 * You can do so from Javascript by calling the .dispose() method.
 */
export type JSValue = Lifetime<JSValuePointer, JSValuePointer, QuickJSVm>

/**
 * Wraps a C pointer to a QuickJS JSValue, which represents a Javascript value inside
 * a QuickJS virtual machine.
 *
 * Values must not be shared between QuickJSVm instances.
 * You must dispose of any handles you create by calling the `.dispose()` method.
 */
export type QuickJSHandle = StaticJSValue | JSValue | JSValueConst

/**
 * Options for [[QuickJS.evalCode]].
 */
export interface QuickJSEvalOptions {
  /**
   * Interrupt evaluation if `shouldInterrupt` returns `true`.
   * See [[shouldInterruptAfterDeadline]].
   */
  shouldInterrupt?: InterruptHandler

  /**
   * Memory limit, in bytes, of WASM heap memory used by the QuickJS VM.
   */
  memoryLimitBytes?: number
}

/**
 * QuickJS presents a Javascript interface to QuickJS, a Javascript interpreter that
 * supports ES2019.
 *
 * QuickJS is a singleton. Use the [[getQuickJS]] function to instantiate
 * or retrieve an instance.
 *
 * Use the {@link QuickJS.createVm} method to create a {@link QuickJSVm}.
 *
 * Use the {@link QuickJS.evalCode} method as a shortcut evaluate Javascript safely
 * and return the result as a native Javascript value.
 */
export class QuickJS {
  private ffi = new QuickJSFFI(getQuickJSEmscriptenModule())
  private vmMap = new Map<JSContextPointer, QuickJSVm>()
  private rtMap = new Map<JSRuntimePointer, QuickJSVm>()
  private module = getQuickJSEmscriptenModule()

  constructor() {
    getQuickJSEmscriptenModule()

    if (singleton) {
      throw new Error(
        'Cannot create another QuickJS instance. Use the instance already created (try getQuickJS())'
      )
    }
    singleton = this

    // This is why we need to be a singleton: each Emscripten module of QuickJS needs
    // a single C callback dispatcher.
    const pointerType = 'i'
    const intType = 'i'
    const functionCallbackWasmTypes = [
      pointerType, // return
      pointerType, // ctx
      pointerType, // this_ptr
      intType, // argc
      pointerType, // argv
      pointerType, // fn_data_ptr
    ]
    const funcCallbackFp = this.module.addFunction(
      this.cToHostCallbackFunction,
      functionCallbackWasmTypes.join('')
    ) as QTS_C_To_HostCallbackFuncPointer
    this.ffi.QTS_SetHostCallback(funcCallbackFp)

    const interruptCallbackWasmTypes = [
      intType, // return 0 no interrupt, !=0 interrrupt
      pointerType, // rt_ptr
    ]
    const interruptCallbackFp = this.module.addFunction(
      this.cToHostInterrupt,
      interruptCallbackWasmTypes.join('')
    ) as QTS_C_To_HostInterruptFuncPointer
    this.ffi.QTS_SetInterruptCallback(interruptCallbackFp)
  }

  /**
   * Create a QuickJS VM.
   *
   * Each VM is completely independent - you cannot share handles between
   * VMs.
   */
  createVm(): QuickJSVm {
    const rt = new Lifetime(this.ffi.QTS_NewRuntime(), undefined, rt_ptr => {
      this.rtMap.delete(rt_ptr)
      this.ffi.QTS_FreeRuntime(rt_ptr)
    })
    const ctx = new Lifetime(this.ffi.QTS_NewContext(rt.value), undefined, ctx_ptr => {
      this.vmMap.delete(ctx_ptr)
      this.ffi.QTS_FreeContext(ctx_ptr)
    })
    const vm = new QuickJSVm({
      module: this.module,
      ffi: this.ffi,
      rt,
      ctx,
    })
    this.vmMap.set(ctx.value, vm)
    this.rtMap.set(rt.value, vm)
    return vm
  }

  /**
   * One-off evaluate code without needing to create a VM.
   *
   * To protect against infinite loops, use the `shouldInterrupt` option. The
   * [[shouldInterruptAfterDeadline]] function will create a time-based deadline.
   *
   * If you need more control over how the code executes, create a
   * [[QuickJSVm]] instance and use its [[QuickJSVm.evalCode]] method.
   *
   * Asynchronous callbacks may not run during the first call to `evalCode`. If you need to
   * work with async code inside QuickJS, you should create a VM and use [[QuickJSVm.executePendingJobs]].
   *
   * @returns The result is coerced to a native Javascript value using JSON
   * serialization, so properties and values unsupported by JSON will be dropped.
   *
   * @throws If `code` throws during evaluation, the exception will be
   * converted into a native Javascript value and thrown.
   *
   * @throws if `options.shouldInterrupt` interrupted execution, will throw a Error
   * with name `"InternalError"` and  message `"interrupted"`.
   */
  evalCode(code: string, options: QuickJSEvalOptions = {}): unknown {
    return Scope.withScope(scope => {
      const vm = scope.manage(this.createVm())

      if (options.shouldInterrupt) {
        vm.setInterruptHandler(options.shouldInterrupt)
      }

      if (options.memoryLimitBytes !== undefined) {
        vm.setMemoryLimit(options.memoryLimitBytes)
      }

      const result = vm.evalCode(code)

      if (options.memoryLimitBytes !== undefined) {
        // Remove memory limit so we can dump the result without exceeding it.
        vm.setMemoryLimit(-1)
      }

      if (result.error) {
        const error = vm.dump(scope.manage(result.error))
        throw error
      }

      const value = vm.dump(scope.manage(result.value))
      return value
    })
  }

  // We need to send this into C-land
  private cToHostCallbackFunction: CToHostCallbackFunctionImplementation = (
    ctx,
    this_ptr,
    argc,
    argv,
    fn_data_ptr
  ) => {
    try {
      const vm = this.vmMap.get(ctx)
      if (!vm) {
        const fn_name = this.ffi.QTS_GetString(ctx, fn_data_ptr)
        throw new Error(`QuickJSVm(ctx = ${ctx}) not found for C function call "${fn_name}"`)
      }
      return vm.cToHostCallbackFunction(ctx, this_ptr, argc, argv, fn_data_ptr)
    } catch (error) {
      console.error('[C to host error: returning null]', error)
      return 0 as JSValuePointer
    }
  }

  private cToHostInterrupt: CToHostInterruptImplementation = rt => {
    try {
      const vm = this.rtMap.get(rt)
      if (!vm) {
        throw new Error(`QuickJSVm(rt = ${rt}) not found for C interrupt`)
      }
      return vm.cToHostInterrupt(rt)
    } catch (error) {
      console.error('[C to host interrupt: returning error]', error)
      return 1
    }
  }
}

/**
 * Returns an interrupt handler that interrupts Javascript execution after a deadline time.
 *
 * @param deadline - Interrupt execution if it's still running after this time.
 *   Number values are compared against `Date.now()`
 */
export function shouldInterruptAfterDeadline(deadline: Date | number): InterruptHandler {
  const deadlineAsNumber = typeof deadline === 'number' ? deadline : deadline.getTime()

  return function() {
    return Date.now() > deadlineAsNumber
  }
}

let singleton: QuickJS | undefined = undefined

/**
 * This is the top-level entrypoint for the quickjs-emscripten library.
 * Get the root QuickJS API.
 */
export async function getQuickJS(): Promise<QuickJS> {
  await ready
  if (!singleton) {
    singleton = new QuickJS()
  }
  return singleton
}

/**
 * Provides synchronous access to the QuickJS API once [[getQuickJS]] has resolved at
 * least once.
 * @throws If called before `getQuickJS` resolves.
 */
export function getQuickJSSync(): QuickJS {
  if (!singleton) {
    throw new Error('QuickJS not initialized. Await getQuickJS() at least once.')
  }
  return singleton
}
