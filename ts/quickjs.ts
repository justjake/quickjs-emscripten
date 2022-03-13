import QuickJSModuleLoader from "./quickjs.emscripten-module"
import { QuickJSFFI } from "./ffi"
import { QuickJSEmscriptenModule } from "./emscripten-types"
import { Lifetime, WeakLifetime, StaticLifetime, Scope, Disposable } from "./lifetime"
import {
  ExecutePendingJobsResult,
  InterruptHandler,
  JSValue,
  JSValueConst,
  QuickJSEvalOptions,
  QuickJSHandle,
  QuickJSPropertyKey,
  QuickJSContext,
  StaticJSValue,
} from "./context"
import { QuickJSDeferredPromise } from "./deferred-promise"
import { QuickJSModuleCallbacks } from "./quickjs-module"
import { newAsyncRuntime, QuickJSRuntimeAsync } from "./runtime-asyncify"
import { QuickJSContextAsync } from "./context-asyncify"
import { QuickJSRuntime } from "./runtime"

// Exports of types moved out of this file
export { Lifetime, WeakLifetime, StaticLifetime, Scope, Disposable }
export {
  QuickJSContext as QuickJSVm,
  InterruptHandler,
  StaticJSValue,
  JSValueConst,
  JSValue,
  QuickJSHandle,
  QuickJSPropertyKey,
  ExecutePendingJobsResult,
  QuickJSEvalOptions,
  QuickJSDeferredPromise,
}

/**
 * QuickJS presents a Javascript interface to QuickJS, a Javascript interpreter that
 * supports ES2019.
 *
 * QuickJS is a singleton. Use the [[getQuickJS]] function to instantiate
 * or retrieve an instance.
 *
 * Use the {@link QuickJS.newContext} method to create a {@link QuickJSVm}.
 *
 * Use the {@link QuickJS.evalCode} method as a shortcut evaluate Javascript safely
 * and return the result as a native Javascript value.
 *
 * @public
 */
class QuickJS {
  private syncFFI: QuickJSFFI
  private syncModule: QuickJSEmscriptenModule
  private syncCallbacks: QuickJSModuleCallbacks

  constructor(module: QuickJSEmscriptenModule) {
    this.syncModule = module
    this.syncFFI = new QuickJSFFI(this.syncModule)
    this.syncCallbacks = new QuickJSModuleCallbacks(module, this.syncFFI)
  }

  newRuntime(): QuickJSRuntime {
    const rt = new Lifetime(this.syncFFI.QTS_NewRuntime(), undefined, (rt_ptr) => {
      this.syncCallbacks.deleteRuntime(rt_ptr)
      this.syncFFI.QTS_FreeRuntime(rt_ptr)
    })
    return new QuickJSRuntime({
      module: this.syncModule,
      callbacks: this.syncCallbacks,
      ffi: this.syncFFI,
      rt,
    })
  }

  /**
   * Create a QuickJS VM.
   *
   * Each VM is completely independent - you cannot share handles between
   * VMs.
   */
  newContext(): QuickJSContext {
    const runtime = this.newRuntime()
    const context = runtime.newContext({ ownedLifetimes: [runtime] })
    runtime.context = context
    return context
  }

  /** @experimental */
  async newAsyncRuntime(): Promise<QuickJSRuntimeAsync> {
    return newAsyncRuntime()
  }

  async newAsyncContext(): Promise<QuickJSContextAsync> {
    const runtime = await this.newAsyncRuntime()
    const context = runtime.newContext({ ownedLifetimes: [runtime] })
    runtime.context = context
    return context
  }

  /**
   * One-off evaluate code without needing to create a VM.
   *
   * To protect against infinite loops, use the `shouldInterrupt` option. The
   * [[shouldInterruptAfterDeadline]] function will create a time-based deadline.
   *
   * If you need more control over how the code executes, create a
   * [[QuickJSVm]] instance and use its [[QuickJSVm.evalCode]] method.
   *
   * Asynchronous callbacks may not run during the first call to `evalCode`. If you need to
   * work with async code inside QuickJS, you should create a VM and use [[QuickJSVm.executePendingJobs]].
   *
   * @returns The result is coerced to a native Javascript value using JSON
   * serialization, so properties and values unsupported by JSON will be dropped.
   *
   * @throws If `code` throws during evaluation, the exception will be
   * converted into a native Javascript value and thrown.
   *
   * @throws if `options.shouldInterrupt` interrupted execution, will throw a Error
   * with name `"InternalError"` and  message `"interrupted"`.
   */
  evalCode(code: string, options: QuickJSEvalOptions = {}): unknown {
    return Scope.withScope((scope) => {
      const vm = scope.manage(this.newContext())

      if (options.shouldInterrupt) {
        vm.runtime.setInterruptHandler(options.shouldInterrupt)
      }

      if (options.memoryLimitBytes !== undefined) {
        vm.runtime.setMemoryLimit(options.memoryLimitBytes)
      }

      const result = vm.evalCode(code, "eval.js", 0)

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

// export type { QuickJS }

/**
 * Returns an interrupt handler that interrupts Javascript execution after a deadline time.
 *
 * @param deadline - Interrupt execution if it's still running after this time.
 *   Number values are compared against `Date.now()`
 */
export function shouldInterruptAfterDeadline(deadline: Date | number): InterruptHandler {
  const deadlineAsNumber = typeof deadline === "number" ? deadline : deadline.getTime()

  return function () {
    return Date.now() > deadlineAsNumber
  }
}

let singleton: QuickJS | undefined = undefined
const singletonPromise = QuickJSModuleLoader().then((module) => {
  module.type = "sync"
  singleton = new QuickJS(module)
  return singleton
})

/**
 * This is the top-level entrypoint for the quickjs-emscripten library.
 * Get the root QuickJS API.
 */
export async function getQuickJS(): Promise<QuickJS> {
  return await singletonPromise
}

/**
 * Provides synchronous access to the QuickJS API once [[getQuickJS]] has resolved at
 * least once.
 * @throws If called before `getQuickJS` resolves.
 */
export function getQuickJSSync(): QuickJS {
  if (!singleton) {
    throw new Error("QuickJS not initialized. Await getQuickJS() at least once.")
  }
  return singleton
}
