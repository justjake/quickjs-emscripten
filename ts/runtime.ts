import { EitherModule, QuickJSAsyncEmscriptenModule } from './emscripten-types'
import { QuickJSAsyncFFI } from './ffi-asyncify'
import { JSRuntimePointer, JSContextPointer, JSModuleDefPointer } from './ffi-types'
import { Disposable, Lifetime } from './quickjs'
import { QuickJSModuleCallbacks, CToHostModuleLoaderImplementation } from './quickjs-module'
import { ContextOptions, DefaultIntrinsics, EitherFFI, JSModuleLoader } from './types'
import { QuickJSContext } from './context'
import { intoPromiseLike, newPromiseLike, unwrapPromiseLike } from './asyncify-helpers'

/**
 * A runtime represents a Javascript runtime corresponding to an object heap.
 * Inside a given runtime, no multi-threading is supported.
 */
// TODO: RuntimeCallbacks
export class QuickJSRuntime implements Disposable {
  /** @private */
  protected module: EitherModule
  /** @private */
  protected ffi: EitherFFI
  /** @private */
  protected rt: Lifetime<JSRuntimePointer>
  /** @private */
  protected callbacks: QuickJSModuleCallbacks

  /** @private */
  protected contextMap = new Map<JSContextPointer, QuickJSContext>()
  /** @private */
  protected moduleLoader: JSModuleLoader | undefined

  constructor(args: {
    module: EitherModule
    ffi: EitherFFI
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

  setModuleLoader(moduleLoader: JSModuleLoader): void {
    this.moduleLoader = moduleLoader
    this.ffi.QTS_RuntimeEnableModuleLoader(this.rt.value)
  }

  removeModuleLoader(): void {
    this.moduleLoader = undefined
    this.ffi.QTS_RuntimeDisableModuleLoader(this.rt.value)
  }

  newContext(options: ContextOptions = {}): QuickJSContext {
    if (options.intrinsics && options.intrinsics !== DefaultIntrinsics) {
      throw new Error('TODO: Custom intrinsics are not supported yet')
    }

    const ctx = new Lifetime(this.ffi.QTS_NewContext(this.rt.value), undefined, ctx_ptr => {
      this.contextMap.delete(ctx_ptr)
      this.callbacks.deleteContext(ctx_ptr)
      this.ffi.QTS_FreeContext(ctx_ptr)
    })

    const context = new QuickJSContext({
      module: this.module,
      ctx,
      ffi: this.ffi,
      manageRt: false,
      rt: this.rt,
    })
    this.contextMap.set(ctx.value, context)
    this.callbacks.setContextCallbacks(ctx.value, context)

    return context
  }

  /**
   * @private
   */
  cToHostModuleLoader: CToHostModuleLoaderImplementation = (rt, ctx, moduleName) => {
    const moduleLoader = this.moduleLoader
    if (!moduleLoader) {
      throw new Error('Runtime has no module loader')
    }

    if (rt !== this.rt.value) {
      throw new Error('Runtime pointer mismatch')
    }

    const context = this.contextMap.get(ctx)
    if (!context) {
      // TODO
      throw new Error(`QuickJSContext not found for pointer ${ctx}`)
    }

    const maybeAsync = newPromiseLike(() => moduleLoader(context, moduleName))
      .then(result => {
        if ('error' in result && result.error) {
          throw result.error
        }

        if (typeof result.value === 'string') {
          const compiledModule = context.compileModule(moduleName, result.value)
          return compiledModule.value
        }

        // TODO
        throw new Error(`TODO: module definition not implemented.`)
      })
      .catch(error => {
        context.throw(error as any)
        return 0 as JSModuleDefPointer
      })

    return unwrapPromiseLike(maybeAsync)
  }
}
