import { QuickJSContextAsync } from './context-asyncify'
import { QuickJSAsyncEmscriptenModule } from './emscripten-types'
import { QuickJSAsyncFFI } from './ffi-asyncify'
import { JSContextPointer, JSRuntimePointer } from './ffi-types'
import { Lifetime } from './quickjs'
import { QuickJSModuleCallbacks } from './quickjs-module'
import { QuickJSRuntime } from './runtime'
import { ContextOptions, DefaultIntrinsics, RuntimeOptions } from './types'

/**
 * Create a new [QuickJSAsyncRuntime].
 *
 * Each runtime is isolated in a separate WebAssembly module, so that errors in
 * one runtime cannot contaminate another runtime.
 *
 * Note that there is a hard limit on the number of WebAssembly modules in older
 * versions of v8:
 * https://bugs.chromium.org/p/v8/issues/detail?id=12076
 *
 * TODO: Allow passing a WASM module if it's okay to share it between multiple
 * async runtimes.
 */
export async function newAsyncRuntime(options: RuntimeOptions = {}): Promise<QuickJSRuntimeAsync> {
  const { default: newModule } = await import('./quickjs-asyncify.emscripten-module')
  const module = await newModule()
  module.type = 'async'
  const ffi = new QuickJSAsyncFFI(module)
  const callbacks = new QuickJSModuleCallbacks(module, ffi)
  const rt = new Lifetime(ffi.QTS_NewRuntime(), undefined, rt_ptr => {
    callbacks.deleteRuntime(rt_ptr)
    ffi.QTS_FreeRuntime(rt_ptr)
  })

  const runtime = new QuickJSRuntimeAsync({
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

export class QuickJSRuntimeAsync extends QuickJSRuntime {
  public context: QuickJSContextAsync | undefined

  /** @private */
  protected declare module: QuickJSAsyncEmscriptenModule
  /** @private */
  protected declare ffi: QuickJSAsyncFFI
  /** @private */
  protected declare rt: Lifetime<JSRuntimePointer>
  /** @private */
  protected declare callbacks: QuickJSModuleCallbacks
  /** @private */
  protected declare contextMap: Map<JSContextPointer, QuickJSContextAsync>

  constructor(args: {
    module: QuickJSAsyncEmscriptenModule
    ffi: QuickJSAsyncFFI
    rt: Lifetime<JSRuntimePointer>
    callbacks: QuickJSModuleCallbacks
  }) {
    super(args)
  }

  override newContext(options: ContextOptions = {}): QuickJSContextAsync {
    if (options.intrinsics && options.intrinsics !== DefaultIntrinsics) {
      throw new Error('TODO: Custom intrinsics are not supported yet')
    }

    const ctx = new Lifetime(this.ffi.QTS_NewContext(this.rt.value), undefined, ctx_ptr => {
      this.contextMap.delete(ctx_ptr)
      this.callbacks.deleteContext(ctx_ptr)
      this.ffi.QTS_FreeContext(ctx_ptr)
    })

    const context = new QuickJSContextAsync({
      module: this.module,
      ctx,
      ffi: this.ffi,
      rt: this.rt,
      ownedLifetimes: [],
      runtime: this,
      callbacks: this.callbacks,
    })
    this.contextMap.set(ctx.value, context)

    return context
  }

  public override getContexts(): IterableIterator<QuickJSContextAsync> {
    return this.contextMap.values()
  }
}
