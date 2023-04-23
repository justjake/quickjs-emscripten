import type { QuickJSAsyncWASMModule } from "./module-asyncify"
import { Lifetime } from "."
import { QuickJSAsyncContext } from "./context-asyncify"
import { QuickJSAsyncEmscriptenModule } from "./emscripten-types"
import { QuickJSAsyncFFI } from "./variants"
import { JSContextPointer, JSRuntimePointer } from "./types-ffi"
import { QuickJSModuleCallbacks } from "./module"
import { QuickJSRuntime } from "./runtime"
import {
  ContextOptions,
  DefaultIntrinsics,
  JSModuleLoader,
  JSModuleLoaderAsync,
  JSModuleNormalizer,
  JSModuleNormalizerAsync,
} from "./types"

export class QuickJSAsyncRuntime extends QuickJSRuntime {
  public context: QuickJSAsyncContext | undefined

  /** @private */
  protected declare module: QuickJSAsyncEmscriptenModule
  /** @private */
  protected declare ffi: QuickJSAsyncFFI
  /** @private */
  protected declare rt: Lifetime<JSRuntimePointer>
  /** @private */
  protected declare callbacks: QuickJSModuleCallbacks
  /** @private */
  protected declare contextMap: Map<JSContextPointer, QuickJSAsyncContext>

  /** @private */
  constructor(args: {
    module: QuickJSAsyncEmscriptenModule
    ffi: QuickJSAsyncFFI
    rt: Lifetime<JSRuntimePointer>
    callbacks: QuickJSModuleCallbacks
  }) {
    super(args)
  }

  override newContext(options: ContextOptions = {}): QuickJSAsyncContext {
    if (options.intrinsics && options.intrinsics !== DefaultIntrinsics) {
      throw new Error("TODO: Custom intrinsics are not supported yet")
    }

    const ctx = new Lifetime(this.ffi.QTS_NewContext(this.rt.value), undefined, (ctx_ptr) => {
      this.contextMap.delete(ctx_ptr)
      this.callbacks.deleteContext(ctx_ptr)
      this.ffi.QTS_FreeContext(ctx_ptr)
    })

    const context = new QuickJSAsyncContext({
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

  public override setModuleLoader(
    moduleLoader: JSModuleLoaderAsync,
    moduleNormalizer?: JSModuleNormalizerAsync
  ): void {
    super.setModuleLoader(
      moduleLoader as JSModuleLoader,
      moduleNormalizer as JSModuleNormalizer | undefined
    )
  }

  /**
   * Set the max stack size for this runtime in bytes.
   * To remove the limit, set to `0`.
   *
   * Setting this limit also adjusts the global `ASYNCIFY_STACK_SIZE` for the entire {@link QuickJSAsyncWASMModule}.
   * See the [pull request](https://github.com/justjake/quickjs-emscripten/pull/114) for more details.
   */
  public override setMaxStackSize(stackSize: number): void {
    return super.setMaxStackSize(stackSize)
  }
}
