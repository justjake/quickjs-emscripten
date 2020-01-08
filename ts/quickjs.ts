import QuickJSModuleLoader from '../build/wrapper/wasm/quickjs-emscripten-module'
import { QuickJSFFI, JSContextPointer, JSValuePointer, JSRuntimePointer } from '../build/wrapper/wasm/ffi'
import { LowLevelJavascriptVm, VmPropertyDescriptor, VmCallResult } from './types'

const QuickJSModule = QuickJSModuleLoader()
const initialized = new Promise(resolve => { QuickJSModule.onRuntimeInitialized = resolve })

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

/**
 * Idea around managing a group of lifetimes
 * @experimental
 */
export class LifetimeScope<T> {
  static readonly Disposer = <T>(lifetimes: Lifetime<T>[]) => {
    for (const lifetime of lifetimes) {
      lifetime.dispose()
    }
  }

  private readonly lifetime = new Lifetime<Lifetime<T>[]>([], LifetimeScope.Disposer)

  get alive() {
    return this.lifetime.alive
  }

  create(value: T, disposer?: (val: T) => void) {
    const lifetime = new Lifetime(value, disposer)
    this.add(lifetime)
    return lifetime
  }

  add(lifetime: Lifetime<T>) {
    this.lifetime.value.push(lifetime)
  }

  dispose() {
    this.lifetime.dispose()
  }
}

export class QuickJSVm implements LowLevelJavascriptVm<QuickJSHandle> {
  readonly ctx: Lifetime<JSContextPointer>
  readonly rt: Lifetime<JSRuntimePointer>

  private readonly module: typeof QuickJSModule
  private readonly ffi: QuickJSFFI
  private _undefined: QuickJSHandle | undefined = undefined
  private readonly lifetimes: Lifetime<any>[] = []

  constructor(args: {
    module: typeof QuickJSModule
    ffi: QuickJSFFI
    ctx: JSContextPointer
    rt: JSRuntimePointer
  }) {
    this.module = args.module
    this.ffi = args.ffi
    this.ctx = new Lifetime(args.ctx, ctx => this.ffi.QTS_FreeContext(ctx))
    this.rt = new Lifetime(args.rt, rt => this.ffi.QTS_FreeRuntime(rt))
  }

  // interface
  get undefined() {
    if (this._undefined) {
      return this._undefined
    }

    const ptr = this.ffi.QTS_GetUndefined()
    return this._undefined = new Lifetime(ptr)
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
    const ptr = prototype ?
      this.ffi.QTS_NewObjectProto(this.ctx.value, prototype.value) :
      this.ffi.QTS_NewObject(this.ctx.value)
    return this.heapValueHandle(ptr)
  }

  newFunction(name: string, fn: (this: QuickJSHandle, ...args: QuickJSHandle[]) => QuickJSHandle | void): QuickJSHandle {
    const functionAdapter = (ctx: JSContextPointer, this_ptr: JSValueConstPointer, argc: number, argv: JSValueConstPointer) => {
      // Double-check the context matches up
      if (ctx !== this.ctx.value) {
        throw new Error('function callback for a different context')
      }

      // TODO: seperate class for JSValueConst wrappers with ownership & dup
      // although... these don't need to be free()'d because they're on the stack...
      const thisHandle: JSValueConst = new Lifetime(this_ptr, undefined, this)
      const args = new Array<JSValueConst>(argc)
      for (let i = 0; i<argc; i++) {
        const ptr = this.ffi.QTS_ArgvGetJSValueConstPointer(argv, i)
        args[i] = new Lifetime(ptr, undefined, this)
      }
      const result = fn.apply(thisHandle, args)
      const resultPtr = (result || this.undefined).value

      // no use-afterr-free: dispose stack variables so we don't retain them by accident
      thisHandle.dispose()
      args.forEach(arg => arg.dispose())

      return resultPtr
    }

    // https://emscripten.org/docs/porting/connecting_cpp_and_javascript/Interacting-with-code.html#interacting-with-code-call-function-pointers-from-c
    // https://github.com/emscripten-core/emscripten/blob/1.29.12/tests/test_core.py#L6237
    const fp = this.module.addFunction(functionAdapter, 'iiiii') as JSCFunctionPointer
    const fpLifetime = new Lifetime(fp, fp => this.module.removeFunction(fp))
    this.lifetimes.push(fpLifetime)

    const jsValueFunctionPointer = this.ffi.QTS_NewFunction(this.ctx.value, fp, name);
    return this.heapValueHandle(jsValueFunctionPointer)
  }

  getProp(handle: QuickJSHandle, key: string | QuickJSHandle): QuickJSHandle {
    const quickJSKey = typeof key === 'string' ?
      this.newString(key) :
      key

    const ptr = this.ffi.QTS_GetProp(this.ctx.value, handle.value, quickJSKey.value)
    const result = this.heapValueHandle(ptr)
    if (typeof key === 'string') {
      // we allocated a string
      quickJSKey.dispose()
    }
    return result
  }

  setProp(handle: QuickJSHandle, key: string | QuickJSHandle, value: QuickJSHandle) {
    const quickJSKey = typeof key === 'string' ?
      this.newString(key) :
      key

    this.ffi.QTS_SetProp(this.ctx.value, handle.value, quickJSKey.value, value.value)

    if (typeof key === 'string') {
      // we allocated a string
      quickJSKey.dispose()
    }
  }

  defineProp(handle: QuickJSHandle, key: string | QuickJSHandle, descriptor: VmPropertyDescriptor<QuickJSHandle>): void {
    const quickJSKey = typeof key === 'string' ?
      this.newString(key) :
      key

    const value = descriptor.value || this.undefined
    const configurable = Boolean(descriptor.configurable)
    const enumerable = Boolean(descriptor.enumerable)
    const get = descriptor.get ?
      this.newFunction(descriptor.get.name, descriptor.get) :
      this.undefined
    const set = descriptor.set ?
      this.newFunction(descriptor.set.name, descriptor.set) :
      this.undefined

    this.ffi.QTS_DefineProp(
      this.ctx.value, handle.value, quickJSKey.value,
      value.value,
      get.value,
      set.value,
      configurable,
      enumerable,
    )

    if (typeof key === 'string') {
      // we allocated a string
      quickJSKey.dispose()
    }
  }

  callFunction(func: QuickJSHandle, thisVal: QuickJSHandle, ...args: QuickJSHandle[]): VmCallResult<QuickJSHandle> {
    const argsArrayPtr = this.toPointerArray(args)
    const resultPtr = this.ffi.QTS_Call(this.ctx.value, func.value, thisVal.value, args.length, argsArrayPtr.value)
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
  dump(handle: QuickJSHandle) {
    const str = this.ffi.QTS_Dump(this.ctx.value, handle.value)
    try {
      return JSON.parse(str)
    } catch (err) {
      return str
    }
  }

  dispose() {
    this.ctx.dispose()
    this.rt.dispose()
    for (const lifetime of this.lifetimes) {
      if (lifetime.alive) {
        lifetime.dispose()
      }
    }
  }

  assertOwned(handle: QuickJSHandle) {
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
    var heapBytes = new Uint8Array(this.module.HEAPU8.buffer, ptr, numBytes);
    heapBytes.set(new Uint8Array(typedArray.buffer));
    return new Lifetime(ptr, ptr => this.module._free(ptr))
  }
}

type StaticJSValue = Lifetime<JSValueConstPointer>
type JSValueConst = Lifetime<JSValueConstPointer, QuickJSVm>
type JSValue = Lifetime<JSValuePointer, QuickJSVm>
export type QuickJSHandle = StaticJSValue | JSValue | JSValueConst


/**
 * QuickJS presents a Javascript interface to QuickJS, a Javascript interpreter that
 * supports ES2019.
 */
class QuickJS {
  private ffi = new QuickJSFFI(QuickJSModule)

  createVm(): QuickJSVm {
    const rtPointer = this.ffi.QTS_NewRuntime()
    const ctxPointer = this.ffi.QTS_NewContext(rtPointer)
    return new QuickJSVm({
      module: QuickJSModule,
      ffi: this.ffi,
      rt: rtPointer,
      ctx: ctxPointer,
    })
  }
}

let singleton: QuickJS | undefined = undefined

export async function getInstance() {
  await initialized
  singleton = singleton || new QuickJS()
  return singleton
}
