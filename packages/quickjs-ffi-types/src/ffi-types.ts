/**
 * C pointer to type `CType`. Pointer types are used internally for FFI, but
 * are not intended for external use.
 *
 * @unstable This type is considered private and may change.
 */
type Pointer<CType extends string> = number & { ctype: CType }

type Brand<T, B> = T & { brand: B }

/**
 * `JSRuntime*`.
 */
export type JSRuntimePointer = Pointer<"JSRuntime">

/**
 * `JSContext*`.
 */
export type JSContextPointer = Pointer<"JSContext">

/**
 * `JSContext**`. Used internally for execute pending jobs.
 */
export type JSContextPointerPointer = Pointer<"JSContext">

/**
 * `JSModuleDef*`.
 */
export type JSModuleDefPointer = Pointer<"JSModuleDef">

/**
 * `JSValue*`.
 * See {@link JSValue}.
 */
export type JSValuePointer = Pointer<"JSValue">

/**
 * `JSValueConst*
 * See {@link JSValueConst} and {@link StaticJSValue}.
 */
export type JSValueConstPointer = Pointer<"JSValueConst">

/**
 * Used internally for Javascript-to-C function calls.
 */
export type JSValuePointerPointer = Pointer<"JSValue[]">

/**
 * Used internally for Javascript-to-C function calls.
 */
export type JSValuePointerPointerPointer = Pointer<"*JSValue[]">

/**
 * Used internally for Javascript-to-C function calls.
 */
export type JSValueConstPointerPointer = Pointer<"JSValueConst[]">

/**
 * Used internally for C-to-Javascript function calls.
 */
// type JSCFunctionPointer = Pointer<'JSCFunction'>

/**
 * Used internally for C-to-Javascript function calls.
 */
export type QTS_C_To_HostCallbackFuncPointer = Pointer<"C_To_HostCallbackFunc">

/**
 * Used internally for C-to-Javascript interrupt handlers.
 */
export type QTS_C_To_HostInterruptFuncPointer = Pointer<"C_To_HostInterruptFunc">

/**
 * Used internally for C-to-Javascript module loading.
 */
export type QTS_C_To_HostLoadModuleFuncPointer = Pointer<"C_To_HostLoadModuleFunc">

/**
 * Used internally for Javascript-to-C calls that may contain strings too large
 * for the Emscripten stack.
 */
export type BorrowedHeapCharPointer = Pointer<"const char" | "char" | "js const char">

/**
 * Used internally for Javascript-to-C calls that may contain strings too large
 * for the Emscripten stack.
 */
export type OwnedHeapCharPointer = Pointer<"char">

/**
 * Used internally for Javascript-to-C calls that may contain strings too large
 * for the Emscripten stack.
 */
export type JSBorrowedCharPointer = Pointer<"js const char">

/**
 * Opaque pointer that was allocated by js_malloc.
 */
export type JSVoidPointer = Pointer<any>

export type UInt32Pointer = Pointer<"uint32_t">

/**
 * @private
 */
export type EvalFlags = Brand<number, "EvalFlags">

/**
 * @private
 */
export type IntrinsicsFlags = Brand<number, "IntrinsicsFlags">

/**
 * @private
 */
export type EvalDetectModule = Brand<number, "EvalDetectModule">

/**
 * @private
 */
export type GetOwnPropertyNamesFlags = Brand<number, "GetOwnPropertyNamesFlags">

/**
 * @private
 */
export type IsEqualOp = Brand<number, "IsEqualOp">

/**
 * State of a promise.
 */
export type JSPromiseStateEnum = Brand<
  (typeof JSPromiseStateEnum)[keyof typeof JSPromiseStateEnum],
  "JSPromiseStateEnum"
>

export function assertSync<Args extends any[], R>(fn: (...args: Args) => R): (...args: Args) => R {
  return function mustBeSync(...args: Args): R {
    const result = fn(...args)
    if (result && typeof result === "object" && result instanceof Promise) {
      throw new Error("Function unexpectedly returned a Promise")
    }
    return result
  }
}

/** Bitfield options for JS_Eval() C function. */
export const EvalFlags = {
  /** global code (default) */
  JS_EVAL_TYPE_GLOBAL: 0 << 0,
  /** module code */
  JS_EVAL_TYPE_MODULE: 1 << 0,
  /** direct call (internal use) */
  JS_EVAL_TYPE_DIRECT: 2 << 0,
  /** indirect call (internal use) */
  JS_EVAL_TYPE_INDIRECT: 3 << 0,
  JS_EVAL_TYPE_MASK: 3 << 0,
  /** force 'strict' mode */
  JS_EVAL_FLAG_STRICT: 1 << 3,
  /** force 'strip' mode */
  JS_EVAL_FLAG_STRIP: 1 << 4,
  /**
   * compile but do not run. The result is an object with a
   * JS_TAG_FUNCTION_BYTECODE or JS_TAG_MODULE tag. It can be executed
   * with JS_EvalFunction().
   */
  JS_EVAL_FLAG_COMPILE_ONLY: 1 << 5,
  /** don't include the stack frames before this eval in the Error() backtraces */
  JS_EVAL_FLAG_BACKTRACE_BARRIER: 1 << 6,
} as const

/** Bitfield options for QTS_NewContext intrinsics */
export const IntrinsicsFlags = {
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

export const JSPromiseStateEnum = {
  Pending: 0,
  Fulfilled: 1,
  Rejected: 2,
} as const

/** Bitfield options for QTS_GetOwnPropertyNames */
export const GetOwnPropertyNamesFlags = {
  JS_GPN_STRING_MASK: 1 << 0,
  JS_GPN_SYMBOL_MASK: 1 << 1,
  JS_GPN_PRIVATE_MASK: 1 << 2,
  /* only include the enumerable properties */
  JS_GPN_ENUM_ONLY: 1 << 4,
  /* set theJSPropertyEnum.is_enumerable field */
  JS_GPN_SET_ENUM: 1 << 5,
  /* include numbers. when only this is set, we filter out strings */
  QTS_GPN_NUMBER_MASK: 1 << 6,
  /* Treat numbers as strings */
  QTS_STANDARD_COMPLIANT_NUMBER: 1 << 7,
}

export const IsEqualOp = {
  IsStrictlyEqual: 0 as IsEqualOp,
  IsSameValue: 1 as IsEqualOp,
  IsSameValueZero: 2 as IsEqualOp,
}
