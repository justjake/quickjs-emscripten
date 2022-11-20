import { QuickJSContext } from "./context"
import { debugLog } from "./debug"
import { QuickJSAsyncEmscriptenModule } from "./emscripten-types"
import { QuickJSAsyncFFI } from "./variants"
import { EvalDetectModule, EvalFlags, JSRuntimePointer, JSValuePointer } from "./types-ffi"
import { Lifetime } from "./lifetime"
import { QuickJSModuleCallbacks } from "./module"
import { QuickJSAsyncRuntime } from "./runtime-asyncify"
import { ContextEvalOptions, evalOptionsToFlags, QuickJSHandle } from "./types"
import { VmCallResult } from "./vm-interface"

export type AsyncFunctionImplementation = (
  this: QuickJSHandle,
  ...args: QuickJSHandle[]
) => Promise<QuickJSHandle | VmCallResult<QuickJSHandle> | void>

/**
 * Asyncified version of [[QuickJSContext]].
 *
 * *Asyncify* allows normally synchronous code to wait for asynchronous Promises
 * or callbacks. The asyncified version of QuickJSContext can wait for async
 * host functions as though they were synchronous.
 */
export class QuickJSAsyncContext extends QuickJSContext {
  public declare runtime: QuickJSAsyncRuntime
  /** @private */
  protected declare module: QuickJSAsyncEmscriptenModule
  /** @private */
  protected declare ffi: QuickJSAsyncFFI
  /** @private */
  protected declare rt: Lifetime<JSRuntimePointer>
  /** @private */
  protected declare callbacks: QuickJSModuleCallbacks

  /**
   * Asyncified version of [[evalCode]].
   */
  async evalCodeAsync(
    code: string,
    filename: string = "eval.js",
    /** See [[EvalFlags]] for number semantics */
    options?: number | ContextEvalOptions
  ): Promise<VmCallResult<QuickJSHandle>> {
    const detectModule = (options === undefined ? 1 : 0) as EvalDetectModule
    const flags = evalOptionsToFlags(options) as EvalFlags
    let resultPtr = 0 as JSValuePointer
    try {
      resultPtr = await this.memory
        .newHeapCharPointer(code)
        .consume((charHandle) =>
          this.ffi.QTS_Eval_MaybeAsync(
            this.ctx.value,
            charHandle.value,
            filename,
            detectModule,
            flags
          )
        )
    } catch (error) {
      debugLog("QTS_Eval_MaybeAsync threw", error)
      throw error
    }
    const errorPtr = this.ffi.QTS_ResolveException(this.ctx.value, resultPtr)
    if (errorPtr) {
      this.ffi.QTS_FreeValuePointer(this.ctx.value, resultPtr)
      return { error: this.memory.heapValueHandle(errorPtr) }
    }
    return { value: this.memory.heapValueHandle(resultPtr) }
  }

  /**
   * Similar to [[newFunction]].
   * Convert an async host Javascript function into a synchronous QuickJS function value.
   *
   * Whenever QuickJS calls this function, the VM's stack will be unwound while
   * waiting the async function to complete, and then restored when the returned
   * promise resolves.
   *
   * Asyncified functions must never call other asyncified functions or
   * `import`, even indirectly, because the stack cannot be unwound twice.
   *
   * See [Emscripten's docs on Asyncify](https://emscripten.org/docs/porting/asyncify.html).
   */
  newAsyncifiedFunction(name: string, fn: AsyncFunctionImplementation): QuickJSHandle {
    return this.newFunction(name, fn as any)
  }
}
