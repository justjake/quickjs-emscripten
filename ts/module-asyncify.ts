import { QuickJSAsyncContext } from "./context-asyncify"
import { QuickJSAsyncEmscriptenModule } from "./emscripten-types"
import { QuickJSNotImplemented } from "./errors"
import { QuickJSAsyncFFI } from "./variants"
import { Lifetime, Scope } from "./lifetime"
import {
  applyBaseRuntimeOptions,
  applyModuleEvalRuntimeOptions,
  ModuleEvalOptions,
  QuickJSWASMModule,
} from "./module"
import { QuickJSAsyncRuntime } from "./runtime-asyncify"
import { AsyncRuntimeOptions, ContextOptions, RuntimeOptions } from "./types"

/**
 * Asyncified version of [[QuickJSWASMModule]].
 *
 * Due to limitations of Emscripten's ASYNCIFY process, only a single async
 * function call can happen at a time across the entire WebAssembly module.
 *
 * That means that all runtimes, contexts, functions, etc created inside this
 * WebAssembly are limited to a single concurrent async action.
 * **Multiple concurrent async actions is an error.**
 *
 * To allow for multiple concurrent async actions, you must create multiple WebAssembly
 * modules.
 */
export class QuickJSAsyncWASMModule extends QuickJSWASMModule {
  /** @private */
  protected ffi: QuickJSAsyncFFI
  /** @private */
  protected module: QuickJSAsyncEmscriptenModule

  /** @private */
  constructor(module: QuickJSAsyncEmscriptenModule, ffi: QuickJSAsyncFFI) {
    super(module, ffi)
    this.ffi = ffi
    this.module = module
  }

  /**
   * Create a new async runtime inside this WebAssembly module. All runtimes inside a
   * module are limited to a single async call at a time. For multiple
   * concurrent async actions, create multiple WebAssembly modules.
   */
  override newRuntime(options: AsyncRuntimeOptions = {}): QuickJSAsyncRuntime {
    const rt = new Lifetime(this.ffi.QTS_NewRuntime(), undefined, (rt_ptr) => {
      this.callbacks.deleteRuntime(rt_ptr)
      this.ffi.QTS_FreeRuntime(rt_ptr)
    })
    const runtime = new QuickJSAsyncRuntime({
      module: this.module,
      ffi: this.ffi,
      rt,
      callbacks: this.callbacks,
    })

    applyBaseRuntimeOptions(runtime, options)

    if (options.moduleLoader) {
      runtime.setModuleLoader(options.moduleLoader)
    }

    return runtime
  }

  /**
   * A simplified API to create a new [[QuickJSRuntime]] and a
   * [[QuickJSContext]] inside that runtime at the same time. The runtime will
   * be disposed when the context is disposed.
   */
  override newContext(options: ContextOptions = {}): QuickJSAsyncContext {
    const runtime = this.newRuntime()
    const lifetimes = options.ownedLifetimes ? options.ownedLifetimes.concat([runtime]) : [runtime]
    const context = runtime.newContext({ ...options, ownedLifetimes: lifetimes })
    runtime.context = context
    return context
  }

  /** Synchronous evalCode is not supported. */
  override evalCode(): never {
    throw new QuickJSNotImplemented("QuickJSWASMModuleAsyncify.evalCode: use evalCodeAsync instead")
  }

  /**
   * One-off evaluate code without needing to create a [[QuickJSRuntimeAsync]] or
   * [[QuickJSContextSync]] explicitly.
   *
   * This version allows for asynchronous Ecmascript module loading.
   *
   * Note that only a single async action can occur at a time inside the entire WebAssembly module.
   * **Multiple concurrent async actions is an error.**
   *
   * See the documentation for [[QuickJSWASMModule.evalCode]] for more details.
   */
  evalCodeAsync(code: string, options: ModuleEvalOptions): Promise<unknown> {
    // TODO: we should really figure out generator for the Promise monad...
    return Scope.withScopeAsync(async (scope) => {
      const vm = scope.manage(this.newContext())
      applyModuleEvalRuntimeOptions(vm.runtime, options)
      const result = await vm.evalCodeAsync(code, "eval.js")

      if (options.memoryLimitBytes !== undefined) {
        // Remove memory limit so we can dump the result without exceeding it.
        vm.runtime.setMemoryLimit(-1)
      }

      if (result.error) {
        const error = vm.dump(scope.manage(result.error))
        throw error
      }

      const value = vm.dump(scope.manage(result.value))
      return value
    })
  }
}
