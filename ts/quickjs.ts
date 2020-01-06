import QuickJSModuleLoader from '../build/wrapper/wasm/quickjs-emscripten-module'
import { LowLevelJavascriptVm } from './types'

const QuickJSModule = QuickJSModuleLoader()
const initialized = new Promise(resolve => { QuickJSModule.onRuntimeInitialized = resolve })

// FFI types
const pointerBrand = Symbol('pointer')
type Pointer<Brand extends string> = number & { [pointerBrand]: Brand }
type RuntimePointer = Pointer<'JSRuntime'>
type ContextPointer = Pointer<'JSContext'>
type ValuePointer = Pointer<'JSValue'>

/**
 * QuickJSFFI contains `cwrap` declarations that expose C functions from the Emscripten module.
 * @private
 */
class QuickJSFFI {
  newRuntime: () => RuntimePointer =
    QuickJSModule.cwrap('JS_NewRuntime', 'number', [])
  freeRuntime: (rt: RuntimePointer) => void =
    QuickJSModule.cwrap('JS_FreeRuntime', null, ['number'])

  newContext: (rt: RuntimePointer) => ContextPointer =
    QuickJSModule.cwrap('JS_NewContext', 'number', ['number'])
  freeContext: (ctx: ContextPointer) => void =
    QuickJSModule.cwrap('JS_FreeContext', null, ['number'])

  // TODO: implement
  freeJSValuePointer: (ctx: ContextPointer, value: ValuePointer) => void =
    QuickJSModule.cwrap('QTS_FreeValuePointer', null, ['number', 'number'])

  newObject: (ctx: ContextPointer) => ValuePointer =
    QuickJSModule.cwrap('QTS_NewObject', 'number', ['number'])
  newFloat64: (ctx: ContextPointer, num: number) => ValuePointer =
    QuickJSModule.cwrap('QTS_NewFloat64', 'number', ['number', 'number'])
  newString: (ctx: ContextPointer, str: string) => ValuePointer =
    QuickJSModule.cwrap('QTS_NewString', 'number', ['number', 'string'])

  typeof: (ctx: ContextPointer, val: ValuePointer) => string =
    QuickJSModule.cwrap('QTS_GetFloat64', 'number', ['number', 'number'])
  getFloat64: (ctx: ContextPointer, val: ValuePointer) => number =
    QuickJSModule.cwrap('QTS_GetFloat64', 'number', ['number', 'number'])
  getString: (ctx: ContextPointer, val: ValuePointer) => string =
    QuickJSModule.cwrap('QTS_GetString', 'string', ['number', 'number'])

  evalToJSON: (code: string) => string = QuickJSModule.cwrap('QTS_EvalToJSON', 'string', ['string'])
}

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
  private readonly ctx: Freeable<ContextPointer>
  private readonly rt: Freeable<RuntimePointer>

  constructor(args: {
    ffi: QuickJSFFI
    ctx: ContextPointer
    rt: RuntimePointer
  }) {
    this.ffi = args.ffi
    this.ctx = new Freeable(args.ctx, ctx => this.ffi.freeContext(ctx))
    this.rt = new Freeable(args.rt, rt => this.ffi.freeRuntime(rt))
  }

  // interface

  typeof(handle: QuickJSValueHandle) {
    // no need to check owner
    return this.ffi.typeof(this.ctx.value, handle.pointer.value)
  }

  getNumber(handle: QuickJSValueHandle) {
    this.assertOwned(handle)
    return this.ffi.toFloat64(this.ctx.value, handle.pointer.value)
  }

  getString(handle: QuickJSValueHandle) {
    this.assertOwned(handle)
    return this.ffi.toString(this.ctx.value, handle.pointer.value)
  }

  // TODO: finish implementation

  // customizations

  free() {
    this.ctx.free()
    this.rt.free()
  }

  freeHandle(handle: QuickJSValueHandle) {
    this.assertOwned(handle)
    this.ffi.freeJSValuePointer(this.ctx.value, handle.pointer.value)
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
class QuickJSValueHandle implements VmHandle {
  readonly vm: QuickJSVm
  readonly pointer: Freeable<ValuePointer>

  constructor(vm: QuickJSVm, pointer: ValuePointer) {
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
  private ffi = new QuickJSFFI()

  createVm(): QuickJSVm {
    const rtPointer = this.ffi.newRuntime()
    const ctxPointer = this.ffi.newContext(rtPointer)
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
