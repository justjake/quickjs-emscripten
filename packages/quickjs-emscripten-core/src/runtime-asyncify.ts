import type {
  QuickJSAsyncEmscriptenModule,
  QuickJSAsyncFFI,
  JSContextPointer,
  JSRuntimePointer,
} from "@jitl/quickjs-ffi-types"
import { QuickJSAsyncContext } from "./context-asyncify"
import type {
  // Used in doc
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  QuickJSAsyncWASMModule,
} from "./module-asyncify"
import type { QuickJSModuleCallbacks } from "./module"
import { QuickJSRuntime } from "./runtime"
import type {
  ContextOptions,
  JSModuleLoader,
  JSModuleLoaderAsync,
  JSModuleNormalizer,
  JSModuleNormalizerAsync,
} from "./types"
import { intrinsicsToFlags } from "./types"
import { Lifetime } from "./lifetime"

export class QuickJSAsyncRuntime extends QuickJSRuntime {
  declare public context: QuickJSAsyncContext | undefined

  /** @private */
  declare protected module: QuickJSAsyncEmscriptenModule
  /** @private */
  declare protected ffi: QuickJSAsyncFFI
  /** @private */
  declare protected rt: Lifetime<JSRuntimePointer>
  /** @private */
  declare protected callbacks: QuickJSModuleCallbacks
  /** @private */
  declare protected contextMap: Map<JSContextPointer, QuickJSAsyncContext>

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
    const intrinsics = intrinsicsToFlags(options.intrinsics)
    const ctx = new Lifetime(
      this.ffi.QTS_NewContext(this.rt.value, intrinsics),
      undefined,
      (ctx_ptr) => {
        this.contextMap.delete(ctx_ptr)
        this.callbacks.deleteContext(ctx_ptr)
        this.ffi.QTS_FreeContext(ctx_ptr)
      },
    )

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
    moduleNormalizer?: JSModuleNormalizerAsync,
  ): void {
    super.setModuleLoader(
      moduleLoader as JSModuleLoader,
      moduleNormalizer as JSModuleNormalizer | undefined,
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
