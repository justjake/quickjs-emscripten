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
 *
 * A owned JSValue that should be disposed or returned.
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
 * You can do so from Javascript by calling the .dispose() method on a Lifetime
 * wrapping a JSValuePointer.
 *
 * See [[QuickJSHandle]].
 */
type JSValuePointer = Pointer<'JSValue'>

/**
 * `JSValueConst*
 *
 * In QuickJS, a JSValueConst is a "borrowed" reference that isn't owned by the
 * current scope. That means that the current scope should not `JS_FreeValue`
 * it, or retain a reference to it after the scope exits, because it may be
 * freed by its owner.
 *
 * quickjs-emscripten takes care of disposing JSValueConst references.
 */
type JSValueConstPointer = Pointer<'JSValueConst'>

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
