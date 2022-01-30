import QuickJSModuleLoader from './quickjs-emscripten-module'
import {
  JSContextPointer,
  JSValuePointer,
  JSRuntimePointer,
  QTS_C_To_HostCallbackFuncPointer,
  QTS_C_To_HostInterruptFuncPointer,
} from './ffi-types'
import { QuickJSFFI } from './ffi'
import { QuickJSEmscriptenModule, EitherModule } from './emscripten-types'
import { Lifetime, WeakLifetime, StaticLifetime, Scope, Disposable } from './lifetime'
import {
  CToHostCallbackFunctionImplementation,
  CToHostInterruptImplementation,
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
import type { QuickJSAsyncFFI } from './ffi-asyncify'
import { QuickJSDeferredPromise } from './deferred-promise'

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
 * Each Emscripten module of QuickJS needs a single C callback dispatcher.
 */
class QuickJSModuleCallbacks {
  private module: EitherModule
  private ffi: QuickJSFFI | QuickJSAsyncFFI
  private vmMap = new Map<JSContextPointer, QuickJSVm>()
  private rtMap = new Map<JSRuntimePointer, QuickJSVm>()

  constructor(
    module: EitherModule,
    ffi: QuickJSFFI | QuickJSAsyncFFI
  ) {
    this.module = module
    this.ffi = ffi

    const pointerType = 'i'
    const intType = 'i'
    const functionCallbackWasmTypes = [
      pointerType, // return
      pointerType, // ctx
      pointerType, // this_ptr
      intType, // argc
      pointerType, // argv
      pointerType, // fn_data_ptr
    ]
    const funcCallbackFp = this.module.addFunction(
      this.cToHostCallbackFunction,
      functionCallbackWasmTypes.join('')
    ) as QTS_C_To_HostCallbackFuncPointer
    this.ffi.QTS_SetHostCallback(funcCallbackFp)

    const interruptCallbackWasmTypes = [
      intType, // return 0 no interrupt, !=0 interrupt
      pointerType, // rt_ptr
    ]
    const interruptCallbackFp = this.module.addFunction(
      this.cToHostInterrupt,
      interruptCallbackWasmTypes.join('')
    ) as QTS_C_To_HostInterruptFuncPointer
    this.ffi.QTS_SetInterruptCallback(interruptCallbackFp)
  }

  addVM(rt: JSRuntimePointer, ctx: JSContextPointer, vm: QuickJSVm) {
    this.vmMap.set(ctx, vm)
    this.rtMap.set(rt, vm)
  }

  deleteRuntime(rt: JSRuntimePointer) {
    this.rtMap.delete(rt)
  }

  deleteContext(ctx: JSContextPointer) {
    this.vmMap.delete(ctx)
  }

  // We need to send this into C-land
  private cToHostCallbackFunction: CToHostCallbackFunctionImplementation = (
    ctx,
    this_ptr,
    argc,
    argv,
    fn_data_ptr
  ) => {
    try {
      const vm = this.vmMap.get(ctx)
      if (!vm) {
        const fn_name = this.ffi.QTS_GetString(ctx, fn_data_ptr)
        throw new Error(`QuickJSVm(ctx = ${ctx}) not found for C function call "${fn_name}"`)
      }
      return vm.cToHostCallbackFunction(ctx, this_ptr, argc, argv, fn_data_ptr)
    } catch (error) {
      console.error('[C to host error: returning null]', error)
      return 0 as JSValuePointer
    }
  }

  private cToHostInterrupt: CToHostInterruptImplementation = rt => {
    try {
      const vm = this.rtMap.get(rt)
      if (!vm) {
        throw new Error(`QuickJSVm(rt = ${rt}) not found for C interrupt`)
      }
      return vm.cToHostInterrupt(rt)
    } catch (error) {
      console.error('[C to host interrupt: returning error]', error)
      return 1
    }
  }
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
    this.syncCallbacks.addVM(rt.value, ctx.value, vm)
    return vm
  }

  /**
   * Create an asyncified QuickJS VM.
   * @todo Better docs
   */
  // async createAsyncVm(): Promise<QuickJSAsyncVm> {
  //   const { default: createModule } = await import('./quickjs-emscripten-module-asyncify')
  //   const { QuickJSAsyncFFI } = await import('./ffi-asyncify')
  //   const { QuickJSAsyncVm } = await import('./quickjsasyncvm')
  //   const module = await createModule()
  //   const ffi = new QuickJSFFI(module)
  //   const asyncFFI = new QuickJSAsyncFFI(module)
  //   const callbacks = new QuickJSModuleCallbacks(module, asyncFFI)
  //   const rt = new Lifetime(asyncFFI.QTS_NewRuntime(), undefined, rt_ptr => {
  //     callbacks.deleteRuntime(rt_ptr)
  //     asyncFFI.QTS_FreeRuntime(rt_ptr)
  //   })
  //   const ctx = new Lifetime(asyncFFI.QTS_NewContext(rt.value), undefined, ctx_ptr => {
  //     callbacks.deleteContext(ctx_ptr)
  //     asyncFFI.QTS_FreeContext(ctx_ptr)
  //   })
  //   const vm = new QuickJSAsyncVm({
  //     module,
  //     ffi,
  //     asyncFFI,
  //     rt,
  //     ctx,
  //   })
  //   return vm
  // }

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
