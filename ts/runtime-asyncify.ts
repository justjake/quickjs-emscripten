import { Lifetime } from "."
import { QuickJSAsyncContext } from "./context-asyncify"
import { QuickJSAsyncEmscriptenModule } from "./emscripten-types"
import { QuickJSModuleCallbacks } from "./module"
import type { QuickJSAsyncWASMModule } from "./module-asyncify"
import { QuickJSRuntime } from "./runtime"
import {
  ContextOptions,
  Intrinsic,
  JSModuleLoader,
  JSModuleLoaderAsync,
  JSModuleNormalizer,
  JSModuleNormalizerAsync
} from "./types"
import { JSContextPointer, JSRuntimePointer } from "./types-ffi"
import { QuickJSAsyncFFI } from "./variants"

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
    const ctxPtr = this.getNewContextPointer(options)

    const ctx = new Lifetime(ctxPtr, undefined, (ctx_ptr) => {
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

  private getNewContextPointer(options: ContextOptions = {}): JSContextPointer {
    let contextPointer

    if (options.intrinsics) {
      contextPointer = this.ffi.QTS_NewContextRaw(this.rt.value)
      this.addContextIntrinsics(contextPointer, options.intrinsics)
    } else {
      contextPointer = this.ffi.QTS_NewContext(this.rt.value)
    }

    return contextPointer
  }

  private addContextIntrinsics(ctxPtr: JSContextPointer, intrinsics: Intrinsic[]): void {
    for (const intrinsic of intrinsics) {
      switch (intrinsic) {
        case "BaseObjects":
          // Intrinsic - Base Objects is always added by quickjs as this is the minimum objects required to evaluate js code
          break
        case "Eval":
          // Intrinsic - Eval is required to use evalCode
          this.ffi.QTS_AddIntrinsicEval(ctxPtr)
          break
        case "Date":
          this.ffi.QTS_AddIntrinsicDate(ctxPtr)
          break
        case "StringNormalize":
          this.ffi.QTS_AddIntrinsicStringNormalize(ctxPtr)
          break
        case "RegExp":
          this.ffi.QTS_AddIntrinsicRegExp(ctxPtr)
          break
        case "RegExpCompiler":
          this.ffi.QTS_AddIntrinsicRegExpCompiler(ctxPtr)
          break
        case "JSON":
          this.ffi.QTS_AddIntrinsicJSON(ctxPtr)
          break
        case "Proxy":
          this.ffi.QTS_AddIntrinsicProxy(ctxPtr)
          break
        case "MapSet":
          this.ffi.QTS_AddIntrinsicMapSet(ctxPtr)
          break
        case "TypedArrays":
          this.ffi.QTS_AddIntrinsicTypedArrays(ctxPtr)
          break
        case "Promise":
          this.ffi.QTS_AddIntrinsicPromise(ctxPtr)
          break
        case "BigInt":
          this.ffi.QTS_AddIntrinsicBigInt(ctxPtr)
          break
        case "BigFloat":
          this.ffi.QTS_AddIntrinsicBigFloat(ctxPtr)
          break
        case "BigDecimal":
          this.ffi.QTS_AddIntrinsicBigDecimal(ctxPtr)
          break
        case "OperatorOverloading":
          this.ffi.QTS_AddIntrinsicOperators(ctxPtr)
          break
        case "BignumExt":
          this.ffi.QTS_EnableBignumExt(ctxPtr, true)
          break
        default:
          throw new Error(`Unknown Intrinsic: ${intrinsic}`)
      }
    }
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
