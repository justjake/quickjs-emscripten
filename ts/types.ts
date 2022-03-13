import type { QuickJSFFI } from './ffi'
import type { QuickJSAsyncFFI } from './ffi-asyncify'
import { QuickJSHandle, QuickJSContext } from './context'
import { SuccessOrFail, VmFunctionImplementation } from './vm-interface'
import { Disposable } from './lifetime'
import { EvalFlags, JSContextPointer } from './ffi-types'
import { QuickJSContextAsync } from './context-asyncify'

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

export type JSModuleLoadSuccess = string | /** TODO */ PartiallyImplemented<JSModuleDefinition>

export type JSModuleLoadFailure = Error | QuickJSHandle

export type JSModuleLoadResult =
  | JSModuleLoadSuccess
  | SuccessOrFail<JSModuleLoadSuccess, JSModuleLoadFailure>

export interface JSModuleLoaderAsync {
  /** Load module (async) */
  (vm: QuickJSContextAsync, moduleName: string): JSModuleLoadResult | Promise<JSModuleLoadResult>
}
export interface JSModuleLoader extends JSModuleLoaderAsync {
  /** Load module (sync) */
  (vm: QuickJSContext, moduleName: string): JSModuleLoadResult
}

type TODO<hint extends string = '?', typeHint = unknown> = never

const UnstableSymbol = Symbol('Unstable')

export type PartiallyImplemented<T> = T & {
  [UnstableSymbol]: 'This feature may unimplemented, broken, throw errors, etc.'
}

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
  intrinsics?: PartiallyImplemented<Intrinsic[]> | typeof DefaultIntrinsics

  /**
   * Wrap the provided context instead of constructing a new one.
   * @private
   */
  contextPointer?: JSContextPointer

  /**
   * Extra lifetimes the context should dispose of after it is destroyed.
   * @private
   */
  ownedLifetimes?: Disposable[]
}

export interface ContextEvalOptions {
  /** Global code (default) */
  type?: 'global' | 'module'
  /** Force "strict" mode */
  strict?: boolean
  /** Force "strip" mode */
  strip?: boolean
  /**
   * compile but do not run. The result is an object with a
   * JS_TAG_FUNCTION_BYTECODE or JS_TAG_MODULE tag. It can be executed
   * with JS_EvalFunction().
   */
  compileOnly?: boolean
  /** don't include the stack frames before this eval in the Error() backtraces */
  backtraceBarrier?: boolean
}

/** Convert [[EvalOptions]] to a bitfield flags */
export function evalOptionsToFlags(evalOptions: ContextEvalOptions | number | undefined): number {
  if (typeof evalOptions === 'number') {
    return evalOptions
  }

  if (evalOptions === undefined) {
    return 0
  }

  const { type, strict, strip, compileOnly, backtraceBarrier } = evalOptions
  let flags = 0
  if (type === 'global') flags |= EvalFlags.JS_EVAL_TYPE_GLOBAL
  if (type === 'module') flags |= EvalFlags.JS_EVAL_TYPE_MODULE
  if (strict) flags |= EvalFlags.JS_EVAL_FLAG_STRICT
  if (strip) flags |= EvalFlags.JS_EVAL_FLAG_STRIP
  if (compileOnly) flags |= EvalFlags.JS_EVAL_FLAG_COMPILE_ONLY
  if (backtraceBarrier) flags |= EvalFlags.JS_EVAL_FLAG_BACKTRACE_BARRIER
  return flags
}
