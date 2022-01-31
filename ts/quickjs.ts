import QuickJSModuleLoader from './quickjs-emscripten-module'
import { QuickJSFFI } from './ffi'
import { QuickJSEmscriptenModule } from './emscripten-types'
import { Lifetime, WeakLifetime, StaticLifetime, Scope, Disposable } from './lifetime'
import {
  ExecutePendingJobsResult,
  InterruptHandler,
  JSValue,
  JSValueConst,
  QuickJSEvalOptions,
  QuickJSHandle,
  QuickJSPropertyKey,
  QuickJSVm,
  StaticJSValue,
} from './vm'
import { newRuntime, QuickJSAsyncContext } from './vm-asyncify'
import { QuickJSDeferredPromise } from './deferred-promise'
import { QuickJSModuleCallbacks } from './quickjs-module'

// Exports of types moved out of this file
export { Lifetime, WeakLifetime, StaticLifetime, Scope, Disposable }
export {
  QuickJSVm,
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
 * Use the {@link QuickJS.createVm} method to create a {@link QuickJSVm}.
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

  /**
   * Create a QuickJS VM.
   *
   * Each VM is completely independent - you cannot share handles between
   * VMs.
   */
  createVm(): QuickJSVm {
    const rt = new Lifetime(this.syncFFI.QTS_NewRuntime(), undefined, rt_ptr => {
      this.syncCallbacks.deleteRuntime(rt_ptr)
      this.syncFFI.QTS_FreeRuntime(rt_ptr)
    })
    const ctx = new Lifetime(this.syncFFI.QTS_NewContext(rt.value), undefined, ctx_ptr => {
      this.syncCallbacks.deleteContext(ctx_ptr)
      this.syncFFI.QTS_FreeContext(ctx_ptr)
    })
    const vm = new QuickJSVm({
      module: this.syncModule,
      ffi: this.syncFFI,
      rt,
      ctx,
    })
    this.syncCallbacks.setRuntimeCallbacks(rt.value, vm)
    this.syncCallbacks.setContextCallbacks(ctx.value, vm)
    return vm
  }

  /**
   * Create an asyncified QuickJS VM.
   * @todo Better docs
   */
  async newAsyncVM(): Promise<QuickJSAsyncContext> {
    const runtime = await newRuntime()
    return runtime.newContext()
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
    return Scope.withScope(scope => {
      const vm = scope.manage(this.createVm())

      if (options.shouldInterrupt) {
        vm.setInterruptHandler(options.shouldInterrupt)
      }

      if (options.memoryLimitBytes !== undefined) {
        vm.setMemoryLimit(options.memoryLimitBytes)
      }

      const result = vm.evalCode(code)

      if (options.memoryLimitBytes !== undefined) {
        // Remove memory limit so we can dump the result without exceeding it.
        vm.setMemoryLimit(-1)
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
  const deadlineAsNumber = typeof deadline === 'number' ? deadline : deadline.getTime()

  return function() {
    return Date.now() > deadlineAsNumber
  }
}

let singleton: QuickJS | undefined = undefined
const singletonPromise = QuickJSModuleLoader().then(module => {
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
    throw new Error('QuickJS not initialized. Await getQuickJS() at least once.')
  }
  return singleton
}
