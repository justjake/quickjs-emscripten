import { debug } from "./debug"
import {
  Asyncify,
  AsyncifySleepResult,
  EitherModule,
  EmscriptenModuleCallbacks,
} from "./emscripten-types"
import {
  JSContextPointer,
  JSRuntimePointer,
  QTS_C_To_HostCallbackFuncPointer,
  QTS_C_To_HostInterruptFuncPointer,
  JSValuePointer,
  JSValueConstPointer,
  JSModuleDefPointer,
  QTS_C_To_HostLoadModuleFuncPointer,
} from "./ffi-types"
import { EitherFFI } from "./types"

/**
 * @private
 */
export type CToHostCallbackFunctionImplementation = (
  ctx: JSContextPointer,
  this_ptr: JSValueConstPointer,
  argc: number,
  argv: JSValueConstPointer,
  fn_id: number
) => JSValuePointer

/**
 * @private
 */
export type CToHostAsyncCallbackFunctionImplementation = (
  ctx: JSContextPointer,
  this_ptr: JSValueConstPointer,
  argc: number,
  argv: JSValueConstPointer,
  fn_id: number
) => JSValuePointer | Promise<JSValuePointer>

/**
 * @private
 */
export type CToHostInterruptImplementation = (rt: JSRuntimePointer) => 0 | 1

/**
 * @private
 */
export type CToHostModuleLoaderImplementation = (
  rt: JSRuntimePointer,
  ctx: JSContextPointer,
  moduleName: string
) => JSModuleDefPointer | Promise<JSModuleDefPointer>

/**
 * @private
 */
export interface ContextCallbacks {
  cToHostCallbackFunction: CToHostCallbackFunctionImplementation
}

/**
 * @private
 */
export interface RuntimeCallbacks {
  cToHostInterrupt: CToHostInterruptImplementation
  cToHostLoadModule: CToHostModuleLoaderImplementation
}

class QuickJSEmscriptenModuleCallbacks implements EmscriptenModuleCallbacks {
  public callFunction: EmscriptenModuleCallbacks["callFunction"]
  public shouldInterrupt: EmscriptenModuleCallbacks["shouldInterrupt"]
  public loadModule: EmscriptenModuleCallbacks["loadModule"]
  constructor(args: EmscriptenModuleCallbacks) {
    this.callFunction = args.callFunction
    this.shouldInterrupt = args.shouldInterrupt
    this.loadModule = args.loadModule
  }
}

/**
 * We use static functions per module to dispatch runtime or context calls from
 * C to the host.  This class manages the indirection from a specific runtime or
 * context pointer to the appropriate callback handler.
 *
 * @private
 */
export class QuickJSModuleCallbacks {
  private module: EitherModule
  private ffi: EitherFFI
  private contextCallbacks = new Map<JSContextPointer, ContextCallbacks>()
  private runtimeCallbacks = new Map<JSRuntimePointer, RuntimeCallbacks>()

  constructor(module: EitherModule, ffi: EitherFFI) {
    this.module = module
    this.ffi = ffi
    this.module.callbacks = this.cToHostCallbacks
  }

  setRuntimeCallbacks(rt: JSRuntimePointer, callbacks: RuntimeCallbacks) {
    this.runtimeCallbacks.set(rt, callbacks)
  }

  deleteRuntime(rt: JSRuntimePointer) {
    this.runtimeCallbacks.delete(rt)
  }

  setContextCallbacks(ctx: JSContextPointer, callbacks: ContextCallbacks) {
    this.contextCallbacks.set(ctx, callbacks)
  }

  deleteContext(ctx: JSContextPointer) {
    this.contextCallbacks.delete(ctx)
  }

  private maybeSuspendOrResumeAsync<T>(
    asyncify: Asyncify | undefined,
    fn: () => T | Promise<T>
  ): T | AsyncifySleepResult<T> {
    if (asyncify) {
      // We must always call asyncify.handleSync around our function.
      // This allows asyncify to resume suspended execution on the second call.
      // Asyncify internally can detect sync behavior, and avoid suspending.
      return asyncify.handleSleep((done) => {
        try {
          const result = fn()
          if (result instanceof Promise) {
            result.then(done)
            result.catch((error) =>
              console.error("QuickJS: cannot handle error in suspended function", error)
            )
          } else {
            done(result)
          }
        } catch (error) {
          debug("asyncify.handleSleep error", error)
          throw error
        }
      })
    }

    // No asyncify - we should never return a promise.
    const value = fn()
    if (value instanceof Promise) {
      throw new Error("Promise return value not supported in non-asyncify context.")
    }
    return value
  }

  private cToHostCallbacks = new QuickJSEmscriptenModuleCallbacks({
    callFunction: (asyncify, ctx, this_ptr, argc, argv, fn_id) =>
      this.maybeSuspendOrResumeAsync(asyncify, () => {
        try {
          const vm = this.contextCallbacks.get(ctx)
          if (!vm) {
            throw new Error(`QuickJSVm(ctx = ${ctx}) not found for C function call "${fn_id}"`)
          }
          return vm.cToHostCallbackFunction(ctx, this_ptr, argc, argv, fn_id)
        } catch (error) {
          console.error("[C to host error: returning null]", error)
          return 0 as JSValuePointer
        }
      }),

    shouldInterrupt: (asyncify, rt) =>
      this.maybeSuspendOrResumeAsync(asyncify, () => {
        try {
          const vm = this.runtimeCallbacks.get(rt)
          if (!vm) {
            throw new Error(`QuickJSRuntime(rt = ${rt}) not found for C interrupt`)
          }
          return vm.cToHostInterrupt(rt)
        } catch (error) {
          console.error("[C to host interrupt: returning error]", error)
          return 1
        }
      }),

    loadModule: (asyncify, rt, ctx, moduleName) =>
      this.maybeSuspendOrResumeAsync(asyncify, () => {
        try {
          const runtimeCallbacks = this.runtimeCallbacks.get(rt)
          if (!runtimeCallbacks) {
            throw new Error(`QuickJSRuntime(rt = ${rt}) not fond for C module loader`)
          }

          const loadModule = runtimeCallbacks.cToHostLoadModule
          if (!loadModule) {
            throw new Error(`QuickJSRuntime(rt = ${rt}) does not support module loading`)
          }
          return loadModule(rt, ctx, moduleName)
        } catch (error) {
          console.error("[C to host module loader error: returning null]", error)
          return 0 as JSModuleDefPointer
        }
      }),
  })
}
