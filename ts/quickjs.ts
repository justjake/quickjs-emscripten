import QuickJSModuleLoader from '../build/wrapper/wasm/quickjs-emscripten-module'
import { QuickJSFFI, JSContextPointer, JSValuePointer, JSRuntimePointer } from '../build/wrapper/wasm/ffi'
import { LowLevelJavascriptVm, VmPropertyDescriptor } from './types'

const QuickJSModule = QuickJSModuleLoader()
const initialized = new Promise(resolve => { QuickJSModule.onRuntimeInitialized = resolve })

class Freeable<T> {
  private _freed: boolean = false
  constructor(
    private readonly _value: T,
    private readonly freeImpl?: (value: T) => void
  ) {}

  get freed() { return this._freed }
  free() {
    this.assertAlive()
    if (this.freeImpl) {
      this.freeImpl(this._value)
    }
    this._freed = true
  }
  get value() {
    this.assertAlive()
    return this._value
  }
  assertAlive() {
    if (this._freed) {
      throw new Error('Already freed')
    }
  }
}

class QuickJSVm implements LowLevelJavascriptVm<QuickJSValueHandle> {
  readonly ctx: Freeable<JSContextPointer>
  readonly rt: Freeable<JSRuntimePointer>

  private readonly module: typeof QuickJSModule
  private readonly ffi: QuickJSFFI
  private _undefined: QuickJSValueHandle | undefined = undefined
  private readonly allocatedFunctionPointers: number[] = []

  constructor(args: {
    module: typeof QuickJSModule
    ffi: QuickJSFFI
    ctx: JSContextPointer
    rt: JSRuntimePointer
  }) {
    this.module = args.module
    this.ffi = args.ffi
    this.ctx = new Freeable(args.ctx, ctx => this.ffi.QTS_FreeContext(ctx))
    this.rt = new Freeable(args.rt, rt => this.ffi.QTS_FreeRuntime(rt))
  }

  // interface
  get undefined() {
    if (this._undefined) {
      return this._undefined
    }

    const ptr = this.ffi.QTS_GetUndefined()
    return this._undefined = new QuickJSValueStatic(ptr)
  }

  typeof(handle: QuickJSValueHandle) {
    // no need to check owner
    return this.ffi.QTS_Typeof(this.ctx.value, handle.value)
  }

  newNumber(num: number): QuickJSValueHandle {
    const ptr = this.ffi.QTS_NewFloat64(this.ctx.value, num)
    return new QuickJSValueHeap(this, ptr)
  }

  getNumber(handle: QuickJSValueHandle) {
    this.assertOwned(handle)
    return this.ffi.QTS_GetFloat64(this.ctx.value, handle.value)
  }

  newString(str: string) {
    const ptr = this.ffi.QTS_NewString(this.ctx.value, str)
    return new QuickJSValueHeap(this, ptr)
  }

  getString(handle: QuickJSValueHandle) {
    this.assertOwned(handle)
    return this.ffi.QTS_GetString(this.ctx.value, handle.value)
  }

  newObject(prototype?: QuickJSValueHandle) {
    const ptr = prototype ?
      this.ffi.QTS_NewObjectProto(this.ctx.value, prototype.value) :
      this.ffi.QTS_NewObject(this.ctx.value)
    return new QuickJSValueHeap(this, ptr)
  }

  newFunction(name: string, fn: (this: QuickJSValueHandle, ...args: QuickJSValueHandle[]) => QuickJSValueHandle | void): QuickJSValueHandle {
    const inner = (ctx: JSContextPointer, this_ptr: JSValueConstPointer, argc: number, argv: JSValueConstPointer) => {
      // Double-check the context matches up
      if (ctx !== this.ctx.value) {
        throw new Error('function callback for a different context')
      }

      // TODO: seperate class for JSValueConst wrappers with ownership & dup
      // although... these don't need to be free()'d because they're on the stack...
      const thisHandle = new QuickJSValueConstStack(this, this_ptr)
      const args = new Array<QuickJSValueConstStack>(argc)
      for (let i = 0; i<argc; i++) {
        const ptr = this.ffi.QTS_ArgvGetJSValueConstPointer(argv, i)
        args[i] = new QuickJSValueConstStack(this, ptr)
      }
      const result = fn.apply(thisHandle, args)
      const resultPtr = (result || this.undefined).value

      // Free all the stack variables so we don't use them by accident.
      thisHandle.free()
      args.forEach(arg => arg.free())

      return resultPtr
    }
    // https://emscripten.org/docs/porting/connecting_cpp_and_javascript/Interacting-with-code.html#interacting-with-code-call-function-pointers-from-c
    // https://github.com/emscripten-core/emscripten/blob/1.29.12/tests/test_core.py#L6237
    const fp = this.module.addFunction(inner, 'iiiii') as JSCFunctionPointer
    this.allocatedFunctionPointers.push(fp)
    const jsValueFunctionPointer = this.ffi.QTS_NewFunction(this.ctx.value, fp, name);
    return new QuickJSValueHeap(this, jsValueFunctionPointer)
  }

  getProp(handle: QuickJSValueHandle, key: string | QuickJSValueHandle): QuickJSValueHandle {
    const quickJSKey = typeof key === 'string' ?
      this.newString(key) :
      key

    const ptr = this.ffi.QTS_GetProp(this.ctx.value, handle.value, quickJSKey.value)
    const result = new QuickJSValueHeap(this, ptr)
    if (typeof key === 'string' && quickJSKey instanceof QuickJSValueHeap) {
      // we allocated a string
      quickJSKey.free()
    }
    return result
  }

  setProp(handle: QuickJSValueHandle, key: string | QuickJSValueHandle, value: QuickJSValueHandle) {
    const quickJSKey = typeof key === 'string' ?
      this.newString(key) :
      key

    this.ffi.QTS_SetProp(this.ctx.value, handle.value, quickJSKey.value, value.value)

    if (typeof key === 'string' && quickJSKey instanceof QuickJSValueHeap) {
      // we allocated a string
      quickJSKey.free()
    }
  }

  defineProp(handle: QuickJSValueHandle, key: string | QuickJSValueHandle, descriptor: VmPropertyDescriptor<QuickJSValueHandle>): void {
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

    if (typeof key === 'string' && quickJSKey instanceof QuickJSValueHeap) {
      // we allocated a string
      quickJSKey.free()
    }
  }

  // customizations

  free() {
    this.ctx.free()
    this.rt.free()
    for (const fp of this.allocatedFunctionPointers) {
      this.module.removeFunction(fp)
    }
  }

  freeHandle(handle: QuickJSValueHeap) {
    this.assertOwned(handle)
    this.ffi.QTS_FreeValuePointer(this.ctx.value, handle.value)
  }

  assertOwned(handle: QuickJSValueHandle) {
    if (handle instanceof QuickJSValueStatic) {
      return
    }

    if (handle.vm !== this) {
      throw new Error('Given handle created by a different VM')
    }
  }
}

type QuickJSValueHandle = QuickJSValueStatic | QuickJSValueHeap | QuickJSValueConstStack

class QuickJSValueStatic {
  constructor(readonly value: JSValuePointer) {}
}

class QuickJSValueConstStack {
  private ptr: Freeable<JSValueConstPointer>

  constructor(readonly vm: QuickJSVm, ptr: JSValueConstPointer) {
    this.ptr = new Freeable(ptr)
  }

  get value() {
    return this.ptr.value
  }

  /**
   * Call to mark this QuickJSValueConstStack pointer as no longer valid.
   * The C runtime manages its memory automatically.
   */
  free() {
    this.ptr.free()
  }
}

class QuickJSValueHeap {
  private ptr: Freeable<JSValuePointer>

  constructor(readonly vm: QuickJSVm, ptr: JSValuePointer) {
    this.ptr = new Freeable(ptr)
  }

  get value() {
    return this.ptr.value
  }

  free() {
    this.vm.freeHandle(this)
    this.ptr.free()
  }
}

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
