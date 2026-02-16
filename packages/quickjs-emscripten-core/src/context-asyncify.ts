import type {
  QuickJSAsyncEmscriptenModule,
  QuickJSAsyncFFI,
  EvalDetectModule,
  EvalFlags,
  JSRuntimePointer,
  JSValuePointer,
} from "@jitl/quickjs-ffi-types"
import type { QuickJSContextResult } from "./context"
import { QuickJSContext } from "./context"
import type { Lifetime } from "./lifetime"
import type { QuickJSModuleCallbacks } from "./module"
import type { QuickJSAsyncRuntime } from "./runtime-asyncify"
import type { ContextEvalOptions, QuickJSHandle } from "./types"
import { evalOptionsToFlags } from "./types"
import type { VmCallResult } from "./vm-interface"

export type AsyncFunctionImplementation = (
  this: QuickJSHandle,
  ...args: QuickJSHandle[]
) => Promise<QuickJSHandle | VmCallResult<QuickJSHandle> | void>

/**
 * Asyncified version of {@link QuickJSContext}.
 *
 * *Asyncify* allows normally synchronous code to wait for asynchronous Promises
 * or callbacks. The asyncified version of QuickJSContext can wait for async
 * host functions as though they were synchronous.
 */
export class QuickJSAsyncContext extends QuickJSContext {
  declare public runtime: QuickJSAsyncRuntime
  /** @private */
  declare protected module: QuickJSAsyncEmscriptenModule
  /** @private */
  declare protected ffi: QuickJSAsyncFFI
  /** @private */
  declare protected rt: Lifetime<JSRuntimePointer>
  /** @private */
  declare protected callbacks: QuickJSModuleCallbacks

  /**
   * Asyncified version of {@link evalCode}.
   */
  async evalCodeAsync(
    code: string,
    filename: string = "eval.js",
    /** See {@link EvalFlags} for number semantics */
    options?: number | ContextEvalOptions,
  ): Promise<QuickJSContextResult<QuickJSHandle>> {
    const detectModule = (options === undefined ? 1 : 0) as EvalDetectModule
    const flags = evalOptionsToFlags(options) as EvalFlags
    let resultPtr = 0 as JSValuePointer
    try {
      resultPtr = await this.memory
        .newHeapCharPointer(code)
        .consume((charHandle) =>
          this.ffi.QTS_Eval_MaybeAsync(
            this.ctx.value,
            charHandle.value.ptr,
            charHandle.value.strlen,
            filename,
            detectModule,
            flags,
          ),
        )
    } catch (error) {
      this.runtime.debugLog("QTS_Eval_MaybeAsync threw", error)
      throw error
    }
    const errorPtr = this.ffi.QTS_ResolveException(this.ctx.value, resultPtr)
    if (errorPtr) {
      this.ffi.QTS_FreeValuePointer(this.ctx.value, resultPtr)
      return this.fail(this.memory.heapValueHandle(errorPtr))
    }
    return this.success(this.memory.heapValueHandle(resultPtr))
  }

  /**
   * Similar to {@link newFunction}.
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
