import type { JSContextPointer, JSValueConstPointer, JSValuePointer } from "@jitl/quickjs-ffi-types"
import { EvalFlags } from "@jitl/quickjs-ffi-types"
import type { QuickJSContext } from "./context"
import type { SuccessOrFail, VmFunctionImplementation } from "./vm-interface"
import type { Disposable, Lifetime } from "./lifetime"
import type { QuickJSAsyncContext } from "./context-asyncify"
import type { InterruptHandler, QuickJSRuntime } from "./runtime"

/**
 * A QuickJSHandle to a constant that will never change, and does not need to
 * be disposed.
 */
export type StaticJSValue = Lifetime<JSValueConstPointer, JSValueConstPointer, QuickJSRuntime>

/**
 * A QuickJSHandle to a borrowed value that does not need to be disposed.
 *
 * In QuickJS, a JSValueConst is a "borrowed" reference that isn't owned by the
 * current scope. That means that the current scope should not `JS_FreeValue`
 * it, or retain a reference to it after the scope exits, because it may be
 * freed by its owner.
 *
 * quickjs-emscripten takes care of disposing JSValueConst references.
 */
export type JSValueConst = Lifetime<JSValueConstPointer, JSValuePointer, QuickJSRuntime>

/**
 * A owned QuickJSHandle that should be disposed or returned.
 *
 * The QuickJS interpreter passes Javascript values between functions as
 * `JSValue` structs that references some internal data. Because passing
 * structs cross the Empscripten FFI interfaces is bothersome, we use pointers
 * to these structs instead.
 *
 * A JSValue reference is "owned" in its scope. before exiting the scope, it
 * should be freed,  by calling `JS_FreeValue(ctx, js_value)`) or returned from
 * the scope. We extend that contract - a JSValuePointer (`JSValue*`) must also
 * be `free`d.
 *
 * You can do so from Javascript by calling the .dispose() method.
 */
export type JSValue = Lifetime<JSValuePointer, JSValuePointer, QuickJSRuntime>

/**
 * Wraps a C pointer to a QuickJS JSValue, which represents a Javascript value inside
 * a QuickJS virtual machine.
 *
 * Values must not be shared between QuickJSContext instances.
 * You must dispose of any handles you create by calling the `.dispose()` method.
 */
export type QuickJSHandle = StaticJSValue | JSValue | JSValueConst

export type JSModuleExport =
  | {
      type: "function"
      name: string
      implementation: (vm: QuickJSContext) => VmFunctionImplementation<QuickJSHandle>
    }
  | { type: "value"; name: string; value: (vm: QuickJSContext) => QuickJSHandle }

export interface JSModuleDefinition {
  name: string
  exports: JSModuleExport[]
}

export type JSModuleLoadSuccess = string
export type JSModuleLoadFailure = Error | QuickJSHandle
export type JSModuleLoadResult =
  | JSModuleLoadSuccess
  | SuccessOrFail<JSModuleLoadSuccess, JSModuleLoadFailure>

export interface JSModuleLoaderAsync {
  /** Load module (async) */
  (
    moduleName: string,
    context: QuickJSAsyncContext,
  ): JSModuleLoadResult | Promise<JSModuleLoadResult>
}
export interface JSModuleLoader {
  /** Load module (sync) */
  (moduleName: string, context: QuickJSContext): JSModuleLoadResult
}

export type JSModuleNormalizeSuccess = string
export type JSModuleNormalizeFailure = Error | QuickJSHandle
export type JSModuleNormalizeResult =
  | JSModuleNormalizeSuccess
  | SuccessOrFail<JSModuleNormalizeSuccess, JSModuleNormalizeFailure>

export interface JSModuleNormalizerAsync {
  (
    baseModuleName: string,
    requestedName: string,
    vm: QuickJSAsyncContext,
  ): JSModuleNormalizeResult | Promise<JSModuleNormalizeResult>
}
export interface JSModuleNormalizer extends JSModuleNormalizerAsync {
  (baseModuleName: string, requestedName: string, vm: QuickJSContext): JSModuleNormalizeResult
}

type TODO<hint extends string = "?", typeHint = unknown> = hint & typeHint & never

const UnstableSymbol = Symbol("Unstable")

export type PartiallyImplemented<T> = never &
  T & {
    [UnstableSymbol]: "This feature may unimplemented, broken, throw errors, etc."
  }

export interface RuntimeOptionsBase {
  interruptHandler?: InterruptHandler
  maxStackSizeBytes?: number
  memoryLimitBytes?: number

  promiseRejectionHandler?: TODO<"JSHostPromiseRejectionTracker">
  runtimeInfo?: TODO<"JS_SetRuntimeInfo", string>
  gcThreshold?: TODO<"JS_SetGCThreshold", number>
  sharedArrayBufferFunctions?: TODO<
    "JS_SetJSSharedArrayBufferFunctions",
    { sab_alloc: TODO; sab_free: TODO; sab_dup: TODO; sab_opaque: TODO }
  >

  /**
   * Extra lifetimes the runtime should dispose of after it is destroyed.
   * @private
   */
  ownedLifetimes?: Disposable[]
}

export interface RuntimeOptions extends RuntimeOptionsBase {
  moduleLoader?: JSModuleLoader
}

export interface AsyncRuntimeOptions extends RuntimeOptionsBase {
  moduleLoader?: JSModuleLoaderAsync | JSModuleLoader
}

/**
 * Language features that can be enabled or disabled in a QuickJSContext.
 * @see {@link ContextOptions}
 */
export type Intrinsic = keyof typeof IntrinsicEnum

/** @private */
const IntrinsicEnum = {
  BaseObjects: 1 << 0,
  Date: 1 << 1,
  Eval: 1 << 2,
  StringNormalize: 1 << 3,
  RegExp: 1 << 4,
  RegExpCompiler: 1 << 5,
  JSON: 1 << 6,
  Proxy: 1 << 7,
  MapSet: 1 << 8,
  TypedArrays: 1 << 9,
  Promise: 1 << 10,
  BigInt: 1 << 11,
  BigFloat: 1 << 12,
  BigDecimal: 1 << 13,
  OperatorOverloading: 1 << 14,
  BignumExt: 1 << 15,
} as const

/**
 * An array containing the default {@link Intrinsic} language features enabled in a QuickJSContext.
 * @see {@link ContextOptions}
 */
export const DefaultIntrinsics = [
  "BaseObjects",
  "Date",
  "Eval",
  "StringNormalize",
  "RegExp",
  "JSON",
  "Proxy",
  "MapSet",
  "TypedArrays",
  "Promise",
] as const satisfies Intrinsic[]

/**
 * @private
 */
export function intrinsicsToEnum(intrinsics: Array<Intrinsic | Intrinsic[]> | undefined): number {
  if (!intrinsics) {
    return 0
  }

  let result = 0
  for (const intrinsic of intrinsics) {
    if (Array.isArray(intrinsic)) {
      result |= intrinsicsToEnum(intrinsic)
    } else {
      result |= IntrinsicEnum[intrinsic] ?? 0
    }
  }
  return result
}

/**
 * Options for creating a {@link QuickJSContext} or {@link QuickJSAsyncContext}
 * Pass to {@link QuickJSRuntime#newContext}.
 */
export interface ContextOptions {
  /**
   * What built-in objects and language features to enable?
   * If unset, the default intrinsics will be used.
   * To omit all intrinsics, pass an empty array.
   *
   * To remove a specific intrinsic, but retain the other defaults,
   * filter it from {@link DefaultIntrinsics} array:
   * ```ts
   * const contextWithoutDateOrEval = runtime.newContext({
   *   intrinsics: DefaultIntrinsics.filter(x => x !== "Date" && x !== "Eval")
   * })
   * ```
   */
  intrinsics?: Array<Intrinsic | Intrinsic[]>

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
  type?: "global" | "module"
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

/** Convert {@link ContextEvalOptions} to a bitfield flags */
export function evalOptionsToFlags(evalOptions: ContextEvalOptions | number | undefined): number {
  if (typeof evalOptions === "number") {
    return evalOptions
  }

  if (evalOptions === undefined) {
    return 0
  }

  const { type, strict, strip, compileOnly, backtraceBarrier } = evalOptions
  let flags = 0
  if (type === "global") flags |= EvalFlags.JS_EVAL_TYPE_GLOBAL
  if (type === "module") flags |= EvalFlags.JS_EVAL_TYPE_MODULE
  if (strict) flags |= EvalFlags.JS_EVAL_FLAG_STRICT
  if (strip) flags |= EvalFlags.JS_EVAL_FLAG_STRIP
  if (compileOnly) flags |= EvalFlags.JS_EVAL_FLAG_COMPILE_ONLY
  if (backtraceBarrier) flags |= EvalFlags.JS_EVAL_FLAG_BACKTRACE_BARRIER
  return flags
}

export type PromiseExecutor<ResolveT, RejectT> = (
  resolve: (value: ResolveT | PromiseLike<ResolveT>) => void,
  reject: (reason: RejectT) => void,
) => void

export function concat<T>(...values: Array<T[] | T | undefined>): T[] {
  let result: T[] = []
  for (const value of values) {
    if (value !== undefined) {
      result = result.concat(value)
    }
  }
  return result
}
