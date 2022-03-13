import { debug } from './debug'
import { Asyncify, EitherModule, EmscriptenModuleCallbacks } from './emscripten-types'
import {
  JSContextPointer,
  JSRuntimePointer,
  QTS_C_To_HostCallbackFuncPointer,
  QTS_C_To_HostInterruptFuncPointer,
  JSValuePointer,
  JSValueConstPointer,
  JSModuleDefPointer,
  QTS_C_To_HostLoadModuleFuncPointer,
} from './ffi-types'
import { EitherFFI } from './types'

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
  public callFunction: EmscriptenModuleCallbacks['callFunction']
  public shouldInterrupt: EmscriptenModuleCallbacks['shouldInterrupt']
  public loadModule: EmscriptenModuleCallbacks['loadModule']
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

  private maybeSuspend<T>(asyncify: Asyncify | undefined, value: T | Promise<T>) {
    if (value instanceof Promise) {
      if (!asyncify) {
        throw new Error('Promise return value not supported in non-asyncify context.')
      }
      debug('cToHostCallbacks: suspending', value)
      return asyncify.handleAsync(() => value)
    }
    return value
  }

  private cToHostCallbacks = new QuickJSEmscriptenModuleCallbacks({
    callFunction: (asyncify, ctx, this_ptr, argc, argv, fn_id) => {
      try {
        const vm = this.contextCallbacks.get(ctx)
        if (!vm) {
          throw new Error(`QuickJSVm(ctx = ${ctx}) not found for C function call "${fn_id}"`)
        }
        return this.maybeSuspend(
          asyncify,
          vm.cToHostCallbackFunction(ctx, this_ptr, argc, argv, fn_id)
        )
      } catch (error) {
        console.error('[C to host error: returning null]', error)
        return 0 as JSValuePointer
      }
    },

    shouldInterrupt: (asyncify, rt) => {
      try {
        const vm = this.runtimeCallbacks.get(rt)
        if (!vm) {
          throw new Error(`QuickJSRuntime(rt = ${rt}) not found for C interrupt`)
        }
        return this.maybeSuspend(asyncify, vm.cToHostInterrupt(rt))
      } catch (error) {
        console.error('[C to host interrupt: returning error]', error)
        return 1
      }
    },

    loadModule: (asyncify, rt, ctx, moduleName) => {
      try {
        const runtimeCallbacks = this.runtimeCallbacks.get(rt)
        if (!runtimeCallbacks) {
          throw new Error(`QuickJSRuntime(rt = ${rt}) not fond for C module loader`)
        }

        const loadModule = runtimeCallbacks.cToHostLoadModule
        if (!loadModule) {
          throw new Error(`QuickJSRuntime(rt = ${rt}) does not support module loading`)
        }
        return this.maybeSuspend(asyncify, loadModule(rt, ctx, moduleName))
      } catch (error) {
        console.error('[C to host module loader error: returning null]', error)
        return 0 as JSModuleDefPointer
      }
    },
  })
}
