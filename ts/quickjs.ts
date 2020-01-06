import QuickJSModuleLoader from '../build/wrapper/wasm/quickjs-emscripten-module'
import { QuickJSFFI, JSContextPointer, JSValuePointer, JSRuntimePointer } from '../build/wrapper/wasm/ffi'
import { LowLevelJavascriptVm } from './types'

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
  private readonly ffi: QuickJSFFI
  private readonly ctx: Freeable<JSContextPointer>
  private readonly rt: Freeable<JSRuntimePointer>
  private _undefined: QuickJSValueHandle | undefined = undefined

  constructor(args: {
    ffi: QuickJSFFI
    ctx: JSContextPointer
    rt: JSRuntimePointer
  }) {
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
    return this._undefined = new QuickJSValueHandle(this, ptr)
  }

  typeof(handle: QuickJSValueHandle) {
    // no need to check owner
    return this.ffi.QTS_Typeof(this.ctx.value, handle.pointer.value)
  }

  getNumber(handle: QuickJSValueHandle) {
    this.assertOwned(handle)
    return this.ffi.QTS_GetFloat64(this.ctx.value, handle.pointer.value)
  }

  getString(handle: QuickJSValueHandle) {
    this.assertOwned(handle)
    return this.ffi.QTS_GetString(this.ctx.value, handle.pointer.value)
  }

  // TODO: finish implementation

  // customizations

  free() {
    this.ctx.free()
    this.rt.free()
  }

  freeHandle(handle: QuickJSValueHandle) {
    this.assertOwned(handle)
    this.ffi.QTS_FreeValuePointer(this.ctx.value, handle.pointer.value)
  }

  assertOwned(handle: QuickJSValueHandle) {
    if (handle.vm !== this) {
      throw new Error('Given handle created by a different VM')
    }
  }
}

/**
 * QuickJSHandle wraps a pointer to a QuickJS JSValue
 */
class QuickJSValueHandle {
  readonly vm: QuickJSVm
  readonly pointer: Freeable<JSValuePointer>

  constructor(vm: QuickJSVm, pointer: JSValuePointer) {
    this.vm = vm
    this.pointer = new Freeable(pointer, () => this.vm.freeHandle(this))
  }

  free() {
    this.pointer.free()
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
