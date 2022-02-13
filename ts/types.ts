import type { QuickJSFFI } from './ffi'
import type { QuickJSAsyncFFI } from './ffi-asyncify'
import { QuickJSHandle, QuickJSContext } from './context'
import { QuickJSAsyncContext } from './vm-asyncify'
import { SuccessOrFail, VmFunctionImplementation } from './vm-interface'

export type EitherFFI = QuickJSFFI | QuickJSAsyncFFI

export type JSModuleExport =
  | {
      type: 'function'
      name: string
      implementation: (vm: QuickJSContext) => VmFunctionImplementation<QuickJSHandle>
    }
  | { type: 'value'; name: string; value: (vm: QuickJSContext) => QuickJSHandle }

export interface JSModuleDefinition {
  name: string
  exports: JSModuleExport[]
}

export type JSModuleLoadSuccess = string | /** TODO */ JSModuleDefinition

export type JSModuleLoadFailure = Error | QuickJSHandle

export type JSModuleLoadResult = SuccessOrFail<JSModuleLoadSuccess, JSModuleLoadFailure>

export interface JSModuleLoader {
  /** Load module (sync) */
  (vm: QuickJSContext, moduleName: string): JSModuleLoadResult
  /** Load module (async) */
  (vm: QuickJSAsyncContext, moduleName: string): Promise<JSModuleLoadResult>
}

type TODO<hint extends string = '?', typeHint = unknown> = never

export interface RuntimeOptions {
  moduleLoader?: JSModuleLoader
  interruptHandler?: TODO<'JS_SetInterruptHandler'>
  promiseRejectionHandler?: TODO<'JSHostPromiseRejectionTracker'>
  runtimeInfo?: TODO<'JS_SetRuntimeInfo', string>
  memoryLimit?: TODO<'JS_SetMemoryLimit', number>
  gcThreshold?: TODO<'JS_SetGCThreshold', number>
  maxStackSize?: TODO<'JS_SetMaxStackSize', number>
  sharedArrayBufferFunctions?: TODO<
    'JS_SetJSSharedArrayBufferFunctions',
    { sab_alloc: TODO; sab_free: TODO; sab_dup: TODO; sab_opaque: TODO }
  >
}

export type Intrinsic =
  | 'BaseObjects'
  | 'Date'
  | 'Eval'
  | 'StringNormalize'
  | 'RegExp'
  | 'RegExpCompiler'
  | 'JSON'
  | 'Proxy'
  | 'MapSet'
  | 'TypedArrays'
  | 'Promise'
  | 'BigInt'
  | 'BigFloat'
  | 'BigDecimal'
  | 'OperatorOverloading'
  | 'BignumExt'

// For informational purposes
const DefaultIntrinsicsList = [
  'BaseObjects',
  'Date',
  'Eval',
  'StringNormalize',
  'RegExp',
  'JSON',
  'Proxy',
  'MapSet',
  'TypedArrays',
  'Promise',
] as const

export const DefaultIntrinsics = Symbol('DefaultIntrinsics')

export interface ContextOptions {
  /**
   * What built-in objects and language features to enable?
   * If unset, the default intrinsics will be used.
   * To omit all intrinsics, pass an empty array.
   */
  intrinsics?: Intrinsic[] | typeof DefaultIntrinsics
}
