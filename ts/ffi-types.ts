// ts/ffi-types.ts

/**
 * C pointer to type `CTypeName`.
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
 * `JSValue*`. The QuickJS interpreter passes javascript values between
 * functions as `JSValue` structs that references some internal data. Because
 * passing structs cross the Empscripten FFI interfaces is bothersome, we use
 * pointers to these structs instead.
 *
 * A JSValue reference is "owned" in its scope. before exiting the scope, it
 * should be freed,  by calling `JS_FreeValue(ctx, js_value)`) or returned from
 * the scope. We extend that contract - a JSValuePointer (`JSValue*`) must also
 * be `free`d.
 *
 * You can do so from Javascript by calling the .dispose() method.
 */
type JSValuePointer = Pointer<'JSValue'>

/**
 * `JSValueConst*` (which is just a `#define` fror `JSValue*`). In QuickJS, a
 * JSValueConst is a "borrowed" rerfence that isn't owned by the current scope.
 * That means that the current scope should not `JS_FreeValue` it, or retain a
 * reference to it after the scope exits, because it may be freed by its owner.
 *
 * quickjs-emscripten takes care of disposing JSValueConst references.
 */
type JSValueConstPointer = Pointer<'JSValueConst'>

/**
 * Used internally for passing function arguments
 */
type JSValueConstPointerPointer = Pointer<'JSValueConst[]'>

/**
 * Used internally for C-to-Javascript function calls
 */
type JSCFunctionPointer = Pointer<'JSCFunction'>

/**
 * Used internally for C-to-Javascript function calls
 */
type QTS_C_To_HostCallbackFuncPointer = Pointer<'C_To_HostCallbackFuncPointer'>
