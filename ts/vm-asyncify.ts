import { QuickJSAsyncEmscriptenModule } from './emscripten-types'
import { QuickJSAsyncFFI } from './ffi-asyncify'
import { JSContextPointer, JSModuleDefPointer, JSRuntimePointer, JSValuePointer, JSVoidPointer } from './ffi-types'
import { Lifetime, WeakLifetime } from './lifetime'
import { Disposable, Scope } from './quickjs'
import { ContextCallbacks, CToHostCallbackFunctionImplementation, CToHostModuleLoaderImplementation, QuickJSModuleCallbacks } from './quickjs-module'
import { PureQuickJSVm, QuickJSHandle, QuickJSPropertyKey, QuickJSVm } from './vm'
import { SuccessOrFail, VmFunctionImplementation } from './vm-interface'

class SyncPromise<T> {
  constructor(public value: T) {}

  then<R>(fn: (value: T) => R): SyncPromise<R> {
    return new SyncPromise(fn(this.value))
  }
}

function intoPromise<T>(value: T | Promise<T>): SyncPromise<T> | Promise<T> {
  if (value instanceof Promise) {
    return value
  }

  return new SyncPromise(value)
}

function unwrapPromise<T>(promise: SyncPromise<T> | Promise<T>): T | Promise<T> {
  if (promise instanceof SyncPromise) {
    return promise.value
  }

  return promise
}

function assertSync<T>(value: T | Promise<T>): T {
  if (value && typeof value === 'object' && value instanceof Promise) {
    throw new Error('Function unexpectedly returned a Promise')
  }
  return value
}

export type ModuleExport = 
  | { type: 'function', name: string, implementation: (vm: QuickJSVm) => VmFunctionImplementation<QuickJSHandle> }
  | { type: 'value', name: string, value: (vm: QuickJSVm) => QuickJSHandle }

export interface ModuleDefinition {
  name: string
  exports: ModuleExport[]
}

export type ModuleLoadSuccess = 
  | string 
  | /** TODO */ ModuleDefinition

export type ModuleLoadFailure =
  | Error
  | QuickJSHandle

export type ModuleLoadResult = SuccessOrFail<ModuleLoadSuccess, ModuleLoadFailure>

export interface ModuleLoader {
  (vm: QuickJSAsyncContext, moduleName: string): ModuleLoadResult
}

type TODO<hint extends string = '?', typeHint = unknown> = never

export interface RuntimeOptions {
  moduleLoader?: ModuleLoader
  interruptHandler?: TODO<'JS_SetInterruptHandler'>
  promiseRejectionHandler?: TODO<'JSHostPromiseRejectionTracker'>
  runtimeInfo?: TODO<'JS_SetRuntimeInfo', string>
  memoryLimit?: TODO<'JS_SetMemoryLimit', number>
  gcThreshold?: TODO<'JS_SetGCThreshold', number>
  maxStackSize?: TODO<'JS_SetMaxStackSize', number>
  sharedArrayBufferFunctions?: TODO<'JS_SetJSSharedArrayBufferFunctions', { sab_alloc: TODO, sab_free: TODO, sab_dup: TODO, sab_opaque: TODO }>
}

export type Intrinsic =
  | 'BaseObjects'
  | 'Date'
  | 'Eval'
  | 'StringNormalize'
  | 'RegExp'
  | 'RegExpCompiler'
  | 'JSON'
  | 'Proxy'
  | 'MapSet'
  | 'TypedArrays'
  | 'Promise'
  | 'BigInt'
  | 'BigFloat'
  | 'BigDecimal'
  | 'OperatorOverloading'
  | 'BignumExt'

// For informational purposes
const DefaultIntrinsicsList = [
  'BaseObjects',
  'Date',
  'Eval',
  'StringNormalize',
  'RegExp',
  'JSON',
  'Proxy',
  'MapSet',
  'TypedArrays',
  'Promise',
] as const

export const DefaultIntrinsics = Symbol('DefaultIntrinsics') 

export interface ContextOptions {
  /**
   * What built-in objects and language features to enable?
   * If unset, the default intrinsics will be used.
   * To omit all intrinsics, pass an empty array.
   */
  intrinsics?: Intrinsic[] | typeof DefaultIntrinsics
}

/**
 * Create a new [QuickJSAsyncRuntime].
 * 
 * Each runtime is isolated in a separate WebAssembly module, so that errors in
 * one runtime cannot contaminate another runtime.
 */
export async function newRuntime(options: RuntimeOptions = {}): Promise<QuickJSAsyncRuntime> {
  const { default: newModule } = await import('./quickjs-emscripten-module-asyncify')
  const module = await newModule()
  const ffi = new QuickJSAsyncFFI(module)
  const callbacks = new QuickJSModuleCallbacks(module, ffi)
    const rt = new Lifetime(ffi.QTS_NewRuntime(), undefined, rt_ptr => {
      callbacks.deleteRuntime(rt_ptr)
      ffi.QTS_FreeRuntime(rt_ptr)
    })
    const runtime = new QuickJSAsyncRuntime({
      module,
      ffi,
      rt,
      callbacks,
    })

    if (options.moduleLoader) {
      runtime.setModuleLoader(options.moduleLoader)
    }

    return runtime
}

/**
 * A runtime represents a Javascript runtime corresponding to an object heap.
 * Inside a given runtime, no multi-threading is supported.
 */
export class QuickJSAsyncRuntime implements Disposable {
  private module: QuickJSAsyncEmscriptenModule
  private ffi: QuickJSAsyncFFI
  private rt: Lifetime<JSRuntimePointer>
  private callbacks: QuickJSModuleCallbacks

  private contextMap = new Map<JSContextPointer, QuickJSAsyncContext>()
  private moduleLoader: ModuleLoader | undefined

  constructor(args: {
    module: QuickJSAsyncEmscriptenModule
    ffi: QuickJSAsyncFFI
    rt: Lifetime<JSRuntimePointer>
    callbacks: QuickJSModuleCallbacks
  }) {
    this.module = args.module
    this.ffi = args.ffi
    this.rt = args.rt
    this.callbacks = args.callbacks
  }

  get alive() {
    return this.rt.alive
  }

  dispose() {
    return this.rt.dispose()
  }

  setModuleLoader(moduleLoader: ModuleLoader): void {
    this.moduleLoader = moduleLoader
    this.ffi.QTS_RuntimeEnableModuleLoader(this.rt.value)
  }

  removeModuleLoader(): void {
    this.moduleLoader = undefined
    this.ffi.QTS_RuntimeDisableModuleLoader(this.rt.value)
  }

  newContext(options: ContextOptions = {}): QuickJSAsyncContext {
    if (options.intrinsics && options.intrinsics !== DefaultIntrinsics) {
      throw new Error('TODO: Custom intrinsics are not supported yet')
    }

    const ctx = new Lifetime(this.ffi.QTS_NewContext(this.rt.value), undefined, ctx_ptr => {
      this.contextMap.delete(ctx_ptr)
      this.callbacks.deleteContext(ctx_ptr)
      this.ffi.QTS_FreeContext(ctx_ptr)
    })

    const context = new QuickJSAsyncContext({
      module: this.module,
      ctx,
      ffi: this.ffi,
      rt: this.rt,
    })
    this.contextMap.set(ctx.value, context)
    // this.callbacks.setContextCallbacks(ctx.value, context)

    return context
  }

  /**
   * @private
   */
  cToHostModuleLoader: CToHostModuleLoaderImplementation = (rt, ctx, moduleName) => {
    if (!this.moduleLoader) {
      throw new Error('Runtime has no module loader')
    }

    if (rt !== this.rt.value) {
      throw new Error('Runtime pointer mismatch')
    }

    const context = this.contextMap.get(ctx)
    if (!context) {
      // TODO
      throw new Error(`QuickJSAsyncContext not found for pointer ${ctx}`)
    }

    try {
      const result = this.moduleLoader(context, moduleName)
      if ('error' in result && result.error) {
        throw result.error
      }

      if (typeof result.value === 'string') {
        const compiledModule = context.compileModule(moduleName, result.value)
        return compiledModule.value
      }

      // TODO
      throw new Error(`TODO: module definition not implemented.`)
    } catch (error) {
      context.throw(error as any)
      return 0 as JSModuleDefPointer
    }
  }
}

export class QuickJSAsyncContext extends PureQuickJSVm implements ContextCallbacks {
  protected override readonly module: QuickJSAsyncEmscriptenModule
  protected override readonly ffi: QuickJSAsyncFFI

  private fnNextId = 0
  private fnMap = new Map<number, VmFunctionImplementation<QuickJSHandle>>()

  /**
   * Use {@link QuickJS.createAsyncVm} to create a QuickJSAsyncVm instance.
   */
  constructor(args: {
    module: QuickJSAsyncEmscriptenModule
    ffi: QuickJSAsyncFFI
    ctx: Lifetime<JSContextPointer>
    rt: Lifetime<JSRuntimePointer>
  }) {
    super(args)
    const { module, ffi } = args
    this.module = module
    this.ffi = ffi
  }

  compileModule(moduleName: string, source: string): Lifetime<JSModuleDefPointer, never, QuickJSAsyncContext> {
    return Scope.withScope(scope => {
      const sourcePtr = scope.manage(this.memory.newHeapCharPointer(source))
      const moduleDefPtr = this.ffi.QTS_CompileModule(this.ctx.value, moduleName, sourcePtr.value)
      // uh... how do we free this?
      return new Lifetime(moduleDefPtr, undefined, ptr => this.ffi.QTS_FreeVoidPointer(this.ctx.value, ptr as JSVoidPointer))
    })
  }

  setProp(handle: QuickJSHandle, key: QuickJSPropertyKey, value: QuickJSHandle) {
    this.memory.assertOwned(handle)
    return this.borrowPropertyKey(key).consume(quickJSKey =>
      this.ffi.QTS_SetProp(this.ctx.value, handle.value, quickJSKey.value, value.value)
    )
  }

  throw(error: Error | QuickJSHandle) {
    return this.errorToHandle(error).consume(handle => this.ffi.QTS_Throw(this.ctx.value, handle.value))
  }

  /** @private */
  private errorToHandle(error: Error | QuickJSHandle) {
    if (error instanceof Lifetime) {
      return error
    }

    const errorHandle = this.memory.heapValueHandle(this.ffi.QTS_NewError(this.ctx.value))

    if (error.name !== undefined) {
      // TODO: assertSync won't work, because in DEBUG, setProp's FFI will always return `Promise`.
      this.newString(error.name).consume(handle => assertSync(this.setProp(errorHandle, 'name', handle)))
    }

    if (error.message !== undefined) {
      // TODO: assertSync won't work, because in DEBUG, setProp's FFI will always return `Promise`.
      this.newString(error.message).consume(handle => assertSync(this.setProp(errorHandle, 'message', handle)))
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
        new WeakLifetime(this_ptr, this.memory.copyJSValue, this.memory.freeJSValue, this.memory.owner)
      )
      const argHandles = new Array<QuickJSHandle>(argc)
      for (let i = 0; i < argc; i++) {
        const ptr = this.ffi.QTS_ArgvGetJSValueConstPointer(argv, i)
        argHandles[i] = scope.manage(
          new WeakLifetime(ptr, this.memory.copyJSValue, this.memory.freeJSValue, this.memory.owner)
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
        ownedResultPtr = this.errorToHandle(error as Error).consume(errorHandle =>
          this.ffi.QTS_Throw(this.ctx.value, errorHandle.value)
        )
      }

      return ownedResultPtr as JSValuePointer
    })
  }
}
