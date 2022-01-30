/**
 * C pointer to type `CType`. Pointer types are used internally for FFI, but
 * are not intended for external use.
 *
 * @unstable This type is considered private and may change.
 */
type Pointer<CType extends string> = number & { ctype: CType }

/**
 * `JSRuntime*`.
 */
export type JSRuntimePointer = Pointer<'JSRuntime'>

/**
 * `JSContext*`.
 */
export type JSContextPointer = Pointer<'JSContext'>

/**
 * `JSValue*`.
 * See [[JSValue]].
 */
export type JSValuePointer = Pointer<'JSValue'>

/**
 * `JSValueConst*
 * See [[JSValueConst]] and [[StaticJSValue]].
 */
export type JSValueConstPointer = Pointer<'JSValueConst'>

/**
 * Used internally for Javascript-to-C function calls.
 */
export type JSValuePointerPointer = Pointer<'JSValue[]'>

/**
 * Used internally for Javascript-to-C function calls.
 */
export type JSValueConstPointerPointer = Pointer<'JSValueConst[]'>

/**
 * Used internally for C-to-Javascript function calls.
 */
// type JSCFunctionPointer = Pointer<'JSCFunction'>

/**
 * Used internally for C-to-Javascript function calls.
 */
export type QTS_C_To_HostCallbackFuncPointer = Pointer<'C_To_HostCallbackFunc'>

/**
 * Used internally for C-to-Javascript interrupt handlers.
 */
export type QTS_C_To_HostInterruptFuncPointer = Pointer<'C_To_HostInterruptFunc'>

/**
 * Used internally for Javascript-to-C calls that may contain strings too large
 * for the Emscripten stack.
 */
export type HeapCharPointer = Pointer<'char'>
