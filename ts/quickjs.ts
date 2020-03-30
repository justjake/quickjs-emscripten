import ModuleLoader  = require('./quickjs-emscripten-module');
import QuickJSEmscriptenModule = require('./quickjs-emscripten');
import {
  QuickJSFFI,
  JSContextPointer,
  JSValuePointer,
  JSRuntimePointer,
  JSValueConstPointer,
  JSValueConstPointerPointer,
  QTS_C_To_HostCallbackFuncPointer,
  QTS_C_To_HostInterruptFuncPointer,
} from './ffi'
import {
  LowLevelJavascriptVm,
  VmPropertyDescriptor,
  VmCallResult,
  VmFunctionImplementation,
} from './vm-interface'

let isReady = false

const QuickJSModule: QuickJSEmscriptenModule = ModuleLoader()

/**
 * This promise will be fufilled when the QuickJS emscripten module has initialized
 * and the {@link QuickJS} instance can be created.
 */
const ready = new Promise(resolve => {
  QuickJSModule.onRuntimeInitialized = resolve
}).then(() => {
  isReady = true
})

type CToHostCallbackFunctionImplementation = (
  ctx: JSContextPointer,
  this_ptr: JSValueConstPointer,
  argc: number,
  argv: JSValueConstPointer,
  fn_data_ptr: JSValueConstPointer
) => JSValuePointer

type CToHostInterruptImplementation = (rt: JSRuntimePointer) => 0 | 1

/**
 * Determines if a VM's execution should be interrupted.
 *
 * Return `true` to interrupt JS execution.
 * Return `false` or `undefined` to continue JS execution.
 */
export type ShouldInterruptHandler = (vm: QuickJSVm) => boolean | undefined

/**
 * A lifetime prevents access to a value after the lifetime has been
 * [[dispose]]ed.
 *
 * Typically, quickjs-emscripten uses Lifetimes to protect C memory pointers.
 */
export class Lifetime<T, Owner = never> {
  private _alive: boolean = true

  /**
   * When the Lifetime is disposed, it will call `disposer(_value)`. Use the
   * disposer function to implement whatever cleanup needs to happen at the end
   * of `value`'s lifetime.
   *
   * `_owner` is not used or controlled by the lifetime. It's just metadata for
   * the creator.
   */
  constructor(
    private readonly _value: T,
    private readonly disposer?: (value: T) => void,
    private readonly _owner?: Owner
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
      throw new Error('Lifetime not alive')
    }
  }
}

/**
 * A Lifetime that lives forever. Used for constants.
 */
export class StaticLifetime<T, Owner = never> extends Lifetime<T, Owner> {
  // Dispose does nothing.
  dispose() {}
}

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
 * Create QuickJS values with methods like [[newNumber]], [[newString]], [[newObject]], and [[newFunction]].
 *
 * Call [[setProp]] or [[defineProp]] to customize objects. Use those methods with [[global]] to expose the
 * values you create to the interior of the interpreter, so they can be used in [[evalCode]].
 */
export class QuickJSVm implements LowLevelJavascriptVm<QuickJSHandle> {
  private readonly ctx: Lifetime<JSContextPointer>
  private readonly rt: Lifetime<JSRuntimePointer>

  private readonly module: typeof QuickJSModule
  private readonly ffi: QuickJSFFI
  private _undefined: QuickJSHandle | undefined = undefined
  private _global: QuickJSHandle | undefined = undefined
  private readonly lifetimes: Lifetime<any, any>[] = []

  /**
   * Use {@link QuickJS.createVm} to create a QuickJSVm instance.
   */
  constructor(args: {
    module: typeof QuickJSModule
    ffi: QuickJSFFI
    ctx: Lifetime<JSContextPointer>
    rt: Lifetime<JSRuntimePointer>
  }) {
    this.module = args.module
    this.ffi = args.ffi
    this.ctx = args.ctx
    this.rt = args.rt
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
    this.lifetimes.push(this.heapValueHandle(ptr))

    // This isn't technically a static lifetime, but since it has the same
    // lifetime as the VM, it's okay to fake one since when the VM iss
    // disposed, no other functions will accept the value.
    this._global = new StaticLifetime(ptr, undefined, this)
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
    return this.heapValueHandle(this.ffi.QTS_NewString(this.ctx.value, str))
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
   * Convert a Javascript function into a QuickJS function value.
   * See [[VmFunctionImplementation]] for more details.
   *
   * A [[VmFunctionImplementation]] should not free its arguments or its retun
   * value. A VmFunctionImplementation should also not retain any references to
   * its veturn value.
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
   * `handle[key]`.
   * Get a property from a JSValue.
   *
   * @param key - The property may be specified as a JSValue handle, or as a
   * Javascript string (which will be converted automatically).
   */
  getProp(handle: QuickJSHandle, key: string | QuickJSHandle): QuickJSHandle {
    this.assertOwned(handle)
    const quickJSKey = typeof key === 'string' ? this.newString(key) : key

    const ptr = this.ffi.QTS_GetProp(this.ctx.value, handle.value, quickJSKey.value)
    const result = this.heapValueHandle(ptr)
    if (typeof key === 'string') {
      // we allocated a string
      quickJSKey.dispose()
    }
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
   * Javascript string (which will be converted automatically).
   */
  setProp(handle: QuickJSHandle, key: string | QuickJSHandle, value: QuickJSHandle) {
    this.assertOwned(handle)
    const quickJSKey = typeof key === 'string' ? this.newString(key) : key

    this.ffi.QTS_SetProp(this.ctx.value, handle.value, quickJSKey.value, value.value)

    if (typeof key === 'string') {
      // we allocated a string
      quickJSKey.dispose()
    }
  }

  /**
   * [`Object.defineProperty(handle, key, descriptor)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).
   *
   * @param key - The property may be specified as a JSValue handle, or as a
   * Javascript string (which will be converted automatically).
   */
  defineProp(
    handle: QuickJSHandle,
    key: string | QuickJSHandle,
    descriptor: VmPropertyDescriptor<QuickJSHandle>
  ): void {
    this.assertOwned(handle)
    const quickJSKey = typeof key === 'string' ? this.newString(key) : key

    const value = descriptor.value || this.undefined
    const configurable = Boolean(descriptor.configurable)
    const enumerable = Boolean(descriptor.enumerable)
    const hasValue = Boolean(descriptor.value)
    const get = descriptor.get
      ? this.newFunction(descriptor.get.name, descriptor.get)
      : this.undefined
    const set = descriptor.set
      ? this.newFunction(descriptor.set.name, descriptor.set)
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

    if (typeof key === 'string') {
      // we allocated a string
      quickJSKey.dispose()
    }
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
    const argsArrayPtr = this.toPointerArray(args)
    const resultPtr = this.ffi.QTS_Call(
      this.ctx.value,
      func.value,
      thisVal.value,
      args.length,
      argsArrayPtr.value
    )
    argsArrayPtr.dispose()

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
   *
   * See [[unwrapResult]], which will throw if the function returned an error, or
   * return the result handle directly.
   *
   * *Note*: to protect against infinite loops, provide an interrupt handler to
   * [[setShouldInterruptHandler]]. You can use [[shouldInterruptAfterDeadline]] to
   * create a time-based deadline.
   *
   * @returns The last statement's value. If the code threw, result `error` will be
   * a handle to the exception. If execution was interrupted, the error will
   * have name `InternalError` and message `interrupted`.
   */
  evalCode(code: string): VmCallResult<QuickJSHandle> {
    const resultPtr = this.ffi.QTS_Eval(this.ctx.value, code)
    const errorPtr = this.ffi.QTS_ResolveException(this.ctx.value, resultPtr)
    if (errorPtr) {
      this.ffi.QTS_FreeValuePointer(this.ctx.value, resultPtr)
      return { error: this.heapValueHandle(errorPtr) }
    }
    return { value: this.heapValueHandle(resultPtr) }
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
   * Unwrap a VmCallResult, returning it's value on success, and throwing the dumped
   * error on failure.
   */
  unwrapResult(result: VmCallResult<QuickJSHandle>): QuickJSHandle {
    if (result.error) {
      const dumped = this.dump(result.error)
      result.error.dispose()

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

  private interruptHandler: ShouldInterruptHandler | undefined

  /**
   * Set a callback which is regularly called by the QuickJS engine when it is
   * executing code. This callback can be used to implement an execution
   * timeout.
   *
   * The interrupt handler can be removed with [[removeShouldInterruptHandler]].
   */
  setShouldInterruptHandler(cb: ShouldInterruptHandler) {
    const prevInterruptHandler = this.interruptHandler
    this.interruptHandler = cb
    if (!prevInterruptHandler) {
      this.ffi.QTS_RuntimeEnableInterruptHandler(this.rt.value)
    }
  }

  /**
   * Remove the interrupt handler, if any.
   * See [[setShouldInterruptHandler]].
   */
  removeShouldInterruptHandler() {
    if (this.interruptHandler) {
      this.ffi.QTS_RuntimeDisableInterruptHandler(this.rt.value)
      this.interruptHandler = undefined
    }
  }

  /**
   * Dispose of this VM's underlying resources.
   *
   * @throws Calling this method without disposing of all created handles
   * will result in an error.
   */
  dispose() {
    for (const lifetime of this.lifetimes) {
      if (lifetime.alive) {
        lifetime.dispose()
      }
    }
    this.ctx.dispose()
    this.rt.dispose()
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

    const thisHandle = new Lifetime(this_ptr, undefined, this)
    const argHandles = new Array<QuickJSHandle>(argc)
    for (let i = 0; i < argc; i++) {
      const ptr = this.ffi.QTS_ArgvGetJSValueConstPointer(argv, i)
      argHandles[i] = new Lifetime(ptr, undefined, this)
    }

    let ownedResultPtr = 0 as JSValuePointer
    try {
      let result = fn.apply(thisHandle, argHandles)
      if (result) {
        if ('error' in result && result.error) {
          throw result.error
        }
        const handle = result instanceof Lifetime ? result : result.value
        ownedResultPtr = this.ffi.QTS_DupValue(this.ctx.value, handle.value)
        handle.dispose()
      }
    } catch (error) {
      const errorHandle = this.errorToHandle(error)
      ownedResultPtr = this.ffi.QTS_Throw(this.ctx.value, errorHandle.value)
      errorHandle.dispose()
    }

    // Free the arguments so they can't be retained and re-used after we return.
    if (thisHandle.alive) {
      thisHandle.dispose()
    }
    for (const argHandle of argHandles) {
      if (argHandle.alive) {
        argHandle.dispose()
      }
    }

    return ownedResultPtr as JSValuePointer
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

  private freeJSValue = (ptr: JSValuePointer) => {
    this.ffi.QTS_FreeValuePointer(this.ctx.value, ptr)
  }

  private heapValueHandle(ptr: JSValuePointer): JSValue {
    return new Lifetime(ptr, this.freeJSValue, this)
  }

  private toPointerArray(handleArray: QuickJSHandle[]): Lifetime<JSValueConstPointerPointer> {
    const typedArray = new Int32Array(handleArray.map(handle => handle.value))
    const numBytes = typedArray.length * typedArray.BYTES_PER_ELEMENT
    const ptr = this.module._malloc(numBytes) as JSValueConstPointerPointer
    var heapBytes = new Uint8Array(this.module.HEAPU8.buffer, ptr, numBytes)
    heapBytes.set(new Uint8Array(typedArray.buffer))
    return new Lifetime(ptr, ptr => this.module._free(ptr))
  }

  private errorToHandle(error: Error | QuickJSHandle) {
    if (error instanceof Lifetime) {
      return error
    }

    const errorHandle = this.heapValueHandle(this.ffi.QTS_NewError(this.ctx.value))

    if (error.name !== undefined) {
      const handle = this.newString(error.name)
      this.setProp(errorHandle, 'name', handle)
      handle.dispose()
    }

    if (error.message !== undefined) {
      const handle = this.newString(error.message)
      this.setProp(errorHandle, 'message', handle)
      handle.dispose()
    }

    if (error.stack !== undefined) {
      const handle = this.newString(error.stack)
      // Set to fullStack...? For debugging.
      //this.setProp(errorHandle, 'fullStack', handle)
      handle.dispose()
    }

    return errorHandle
  }
}

/**
 * A QuickJSHandle to a constant that will never change, and does not need to
 * be disposed.
 */
export type StaticJSValue = StaticLifetime<JSValueConstPointer>

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
export type JSValueConst = Lifetime<JSValueConstPointer, QuickJSVm>

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
export type JSValue = Lifetime<JSValuePointer, QuickJSVm>

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
  shouldInterrupt?: ShouldInterruptHandler
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
  private ffi = new QuickJSFFI(QuickJSModule)
  private vmMap = new Map<JSContextPointer, QuickJSVm>()
  private rtMap = new Map<JSRuntimePointer, QuickJSVm>()
  private module = QuickJSModule

  constructor() {
    if (!isReady) {
      throw new Error(
        'QuickJS WASM module not initialized. Either wait for `ready` or use getQuickJS()'
      )
    }

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
    const rt = new Lifetime(this.ffi.QTS_NewRuntime(), rt_ptr => {
      this.rtMap.delete(rt_ptr)
      this.ffi.QTS_FreeRuntime(rt_ptr)
    })
    const ctx = new Lifetime(this.ffi.QTS_NewContext(rt.value), ctx_ptr => {
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
    const vm = this.createVm()

    if (options.shouldInterrupt) {
      vm.setShouldInterruptHandler(options.shouldInterrupt)
    }

    const result = vm.evalCode(code)

    if (result.error) {
      const error = vm.dump(result.error)
      result.error.dispose()
      vm.dispose()
      throw error
    }

    const value = vm.dump(result.value)
    result.value.dispose()
    vm.dispose()

    return value
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
export function shouldInterruptAfterDeadline(deadline: Date | number): ShouldInterruptHandler {
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
