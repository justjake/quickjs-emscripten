import QuickJSModuleLoader from '../build/wrapper/wasm/quickjs-emscripten-module'
import {
  QuickJSFFI,
  JSContextPointer,
  JSValuePointer,
  JSRuntimePointer,
} from '../build/wrapper/wasm/ffi'
import {
  LowLevelJavascriptVm,
  VmPropertyDescriptor,
  VmCallResult,
  VmFunctionImplementation,
} from './types'

const QuickJSModule = QuickJSModuleLoader()
const initialized = new Promise(resolve => {
  QuickJSModule.onRuntimeInitialized = resolve
})

type CToHostCallbackFunctionImplementation = (
  ctx: JSContextPointer,
  this_ptr: JSValueConstPointer,
  argc: number,
  argv: JSValueConstPointer,
  fn_data_ptr: JSValueConstPointer
) => JSValuePointer

class Lifetime<T, Owner = never> {
  private _alive: boolean = true

  constructor(
    private readonly _value: T,
    private readonly disposer?: (value: T) => void,
    private readonly _owner?: Owner
  ) {}

  get alive() {
    return this._alive
  }

  get value() {
    this.assertAlive()
    return this._value
  }

  get owner() {
    return this._owner
  }

  dispose() {
    this.assertAlive()
    if (this.disposer) {
      this.disposer(this._value)
    }
    this._alive = true
  }

  private assertAlive() {
    if (!this._alive) {
      throw new Error('Not alive')
    }
  }
}

export class QuickJSVm implements LowLevelJavascriptVm<QuickJSHandle> {
  readonly ctx: Lifetime<JSContextPointer>
  readonly rt: Lifetime<JSRuntimePointer>

  private readonly module: typeof QuickJSModule
  private readonly ffi: QuickJSFFI
  private _undefined: QuickJSHandle | undefined = undefined
  private _global: QuickJSHandle | undefined = undefined
  private readonly lifetimes: Lifetime<any, any>[] = []

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

  // interface
  get undefined() {
    if (this._undefined) {
      return this._undefined
    }

    // Undefined is a constant, immutable value in QuickJS.
    const ptr = this.ffi.QTS_GetUndefined()
    return (this._undefined = new Lifetime(ptr))
  }

  get global() {
    if (this._global) {
      return this._global
    }

    // The global is a JSValue, but since it's lifetime is as long as the VM's,
    // we should manage it.
    const ptr = this.ffi.QTS_GetGlobalObject(this.ctx.value)

    // Automatically clean up this reference when we dispose(
    this.lifetimes.push(this.heapValueHandle(ptr))

    this._global = new Lifetime(ptr, undefined, this)
    return this._global
  }

  typeof(handle: QuickJSHandle) {
    this.assertOwned(handle)
    return this.ffi.QTS_Typeof(this.ctx.value, handle.value)
  }

  newNumber(num: number): QuickJSHandle {
    return this.heapValueHandle(this.ffi.QTS_NewFloat64(this.ctx.value, num))
  }

  getNumber(handle: QuickJSHandle) {
    this.assertOwned(handle)
    return this.ffi.QTS_GetFloat64(this.ctx.value, handle.value)
  }

  newString(str: string) {
    return this.heapValueHandle(this.ffi.QTS_NewString(this.ctx.value, str))
  }

  getString(handle: QuickJSHandle) {
    this.assertOwned(handle)
    return this.ffi.QTS_GetString(this.ctx.value, handle.value)
  }

  newObject(prototype?: QuickJSHandle) {
    if (prototype) {
      this.assertOwned(prototype)
    }
    const ptr = prototype
      ? this.ffi.QTS_NewObjectProto(this.ctx.value, prototype.value)
      : this.ffi.QTS_NewObject(this.ctx.value)
    return this.heapValueHandle(ptr)
  }

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

  getProp(handle: QuickJSHandle, key: string | QuickJSHandle): QuickJSHandle {
    const quickJSKey = typeof key === 'string' ? this.newString(key) : key

    const ptr = this.ffi.QTS_GetProp(this.ctx.value, handle.value, quickJSKey.value)
    const result = this.heapValueHandle(ptr)
    if (typeof key === 'string') {
      // we allocated a string
      quickJSKey.dispose()
    }
    return result
  }

  setProp(handle: QuickJSHandle, key: string | QuickJSHandle, value: QuickJSHandle) {
    const quickJSKey = typeof key === 'string' ? this.newString(key) : key

    this.ffi.QTS_SetProp(this.ctx.value, handle.value, quickJSKey.value, value.value)

    if (typeof key === 'string') {
      // we allocated a string
      quickJSKey.dispose()
    }
  }

  defineProp(
    handle: QuickJSHandle,
    key: string | QuickJSHandle,
    descriptor: VmPropertyDescriptor<QuickJSHandle>
  ): void {
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

  callFunction(
    func: QuickJSHandle,
    thisVal: QuickJSHandle,
    ...args: QuickJSHandle[]
  ): VmCallResult<QuickJSHandle> {
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
   * Returns the object's .toString() if it cannot be serialized to JSON.
   */
  dump(handle: QuickJSHandle) {
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
      argHandles.push(new Lifetime(ptr, undefined, this))
    }

    // TODO: there' still some funky memory management to do here.
    // For values created with vm.new...(), calling .dispose() will both free
    // the pointer, and also call JS_FreeValue, but because we're going to return
    // the JSValue to QuickJS, it will already have been "moved" to be owned by QuickJS -
    // so using JS_FreeValue would be a mistake.
    let ownedResultPtr = this.undefined.value
    const resultHandle = fn.apply(thisHandle, argHandles)
    if (resultHandle) {
      ownedResultPtr = this.ffi.QTS_DupValue(this.ctx.value, resultHandle.value)
      // We assume that QuickJS takes ownership of the underlying value, so we just need to
      // free the pointer to it.
      this.lifetimes.push(new Lifetime(ownedResultPtr, ptr => this.module._free(ptr)))
    }

    // Free the arguments so they can't be retained and re-used after we return.
    thisHandle.dispose()
    argHandles.forEach(argHandle => argHandle.dispose())

    return ownedResultPtr as JSValuePointer
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
}

/**
 * A QuickJSHandle to a constant that will never change, and does not need to be disposed.
 */
type StaticJSValue = Lifetime<JSValueConstPointer>

/**
 * A QuickJSHandle to a borrowed value that does not need to be disposed.
 */
type JSValueConst = Lifetime<JSValueConstPointer, QuickJSVm>

/**
 * A owned QuickJSHandle that should be disposed.
 */
type JSValue = Lifetime<JSValuePointer, QuickJSVm>

/**
 * Wraps a C pointer to a QuickJS JSValue, which represents a Javascript value inside
 * a QuickJS virtual machine.
 *
 * Values must not be shared between QuickJSVm instances.
 * You must dispose of any handles you create by calling the `.dispose()` method.
 */
export type QuickJSHandle = StaticJSValue | JSValue | JSValueConst

/**
 * QuickJS presents a Javascript interface to QuickJS, a Javascript interpreter that
 * supports ES2019.
 */
class QuickJS {
  private ffi = new QuickJSFFI(QuickJSModule)
  private vmMap = new Map<JSContextPointer, QuickJSVm>()
  private module = QuickJSModule

  /**
   * Create a QuickJS VM.
   *
   * Each VM is completely independent - you cannot share handles between
   * VMs.
   */
  createVm(): QuickJSVm {
    const rt = new Lifetime(this.ffi.QTS_NewRuntime(), rt_ptr => this.ffi.QTS_FreeRuntime(rt_ptr))
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
    return vm
  }

  /**
   * One-off evaluate code without needing to create a VM.
   */
  evalCode(code: string): unknown {
    const vm = this.createVm()
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
      console.error(error)
      return 0 as JSValuePointer
    }
  }

  private initialized = false
  initialize() {
    if (this.initialized) {
      return
    }
    this.initialized = true

    const pointerType = 'i'
    const intType = 'i'
    const wasmTypes = [
      pointerType, // return
      pointerType, // ctx
      pointerType, // this_ptr
      intType, // argc
      pointerType, // argv
      pointerType, // fn_data_ptr
    ]
    const fp = this.module.addFunction(
      this.cToHostCallbackFunction,
      wasmTypes.join('')
    ) as QTS_C_To_HostCallbackFuncPointer
    this.ffi.QTS_SetHostCallback(fp)
  }
}

let singleton: QuickJS | undefined = undefined

export async function getInstance(): Promise<QuickJS> {
  await initialized
  if (!singleton) {
    singleton = new QuickJS()
  }
  ;(singleton as any).initialize()
  return singleton
}
