// ts/ffi-types.ts

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
type JSRuntimePointer = Pointer<'JSRuntime'>

/**
 * `JSContext*`.
 */
type JSContextPointer = Pointer<'JSContext'>

/**
 * `JSValue*`.
 * See [[JSValue]].
 */
type JSValuePointer = Pointer<'JSValue'>

/**
 * `JSValueConst*
 * See [[JSValueConst]] and [[StaticJSValue]].
 */
type JSValueConstPointer = Pointer<'JSValueConst'>

/**
 * Used internally for Javascript-to-C function calls.
 */
type JSValuePointerPointer = Pointer<'JSValue[]'>

/**
 * Used internally for Javascript-to-C function calls.
 */
type JSValueConstPointerPointer = Pointer<'JSValueConst[]'>

/**
 * Used internally for C-to-Javascript function calls.
 */
type JSCFunctionPointer = Pointer<'JSCFunction'>

/**
 * Used internally for C-to-Javascript function calls.
 */
type QTS_C_To_HostCallbackFuncPointer = Pointer<'C_To_HostCallbackFunc'>

/**
 * Used internally for C-to-Javascript interrupt handlers.
 */
type QTS_C_To_HostInterruptFuncPointer = Pointer<'C_To_HostInterruptFunc'>
