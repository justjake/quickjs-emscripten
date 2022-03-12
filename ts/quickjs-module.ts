import { EitherModule } from './emscripten-types'
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

const POINTER_TYPE = 'i'
const INT_TYPE = 'i'
const FUNCTION_CALLBACK_WASM_TYPES = [
  POINTER_TYPE, // return
  POINTER_TYPE, // ctx
  POINTER_TYPE, // this_ptr
  INT_TYPE, // argc
  POINTER_TYPE, // argv
  POINTER_TYPE, // fn_data_ptr
]
const FUNCTION_CALLBACK_WASM_TYPES_STRING = FUNCTION_CALLBACK_WASM_TYPES.join('')

const INTERRUPT_CALLBACK_WASM_TYPES = [
  INT_TYPE, // return 0 no interrupt, !=0 interrupt
  POINTER_TYPE, // rt_ptr
]
const INTERRUPT_CALLBACK_WASM_TYPES_STRING = INTERRUPT_CALLBACK_WASM_TYPES.join('')

const MODULE_LOADER_CALLBACK_WASM_TYPES = [
  POINTER_TYPE, // return JSModuleDefPointer
  POINTER_TYPE, // rt
  POINTER_TYPE, // ctx
  POINTER_TYPE, // moduleName string
]
const MODULE_LOADER_CALLBACK_WASM_TYPES_STRING = MODULE_LOADER_CALLBACK_WASM_TYPES.join('')

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

    const funcCallbackFp = this.module.addFunction(
      this.cToHostCallbackFunction,
      FUNCTION_CALLBACK_WASM_TYPES_STRING
    ) as QTS_C_To_HostCallbackFuncPointer
    this.ffi.QTS_SetHostCallback(funcCallbackFp)

    const interruptCallbackFp = this.module.addFunction(
      this.cToHostInterrupt,
      INTERRUPT_CALLBACK_WASM_TYPES_STRING
    ) as QTS_C_To_HostInterruptFuncPointer
    this.ffi.QTS_SetInterruptCallback(interruptCallbackFp)

    const moduleLoaderCallbackFp = this.module.addFunction(
      this.cToHostModuleLoader,
      MODULE_LOADER_CALLBACK_WASM_TYPES_STRING
    ) as QTS_C_To_HostLoadModuleFuncPointer
    this.ffi.QTS_SetLoadModuleFunc(moduleLoaderCallbackFp)
    // TODO: should we removeFunction on dispose?

    if (module.type === 'async') {
      module.cToHostAsyncCallback = this.cToHostCallbackFunction
    }
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

  // We need to send this into C-land
  private cToHostCallbackFunction: CToHostCallbackFunctionImplementation = (
    ctx,
    this_ptr,
    argc,
    argv,
    fn_id
  ) => {
    try {
      const vm = this.contextCallbacks.get(ctx)
      if (!vm) {
        throw new Error(`QuickJSVm(ctx = ${ctx}) not found for C function call "${fn_id}"`)
      }
      return vm.cToHostCallbackFunction(ctx, this_ptr, argc, argv, fn_id)
    } catch (error) {
      console.error('[C to host error: returning null]', error)
      return 0 as JSValuePointer
    }
  }

  private cToHostInterrupt: CToHostInterruptImplementation = rt => {
    try {
      const vm = this.runtimeCallbacks.get(rt)
      if (!vm) {
        throw new Error(`QuickJSRuntime(rt = ${rt}) not found for C interrupt`)
      }
      return vm.cToHostInterrupt(rt)
    } catch (error) {
      console.error('[C to host interrupt: returning error]', error)
      return 1
    }
  }

  private cToHostModuleLoader: CToHostModuleLoaderImplementation = (rt, ctx, moduleName) => {
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
      console.error('[C to host module loader error: returning null]', error)
      return 0 as JSModuleDefPointer
    }
  }
}
