[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../README.md) / JSValue

# Type Alias: JSValue

> **JSValue** = [`Lifetime`](../classes/Lifetime.md)<[`JSValuePointer`](JSValuePointer.md), [`JSValuePointer`](JSValuePointer.md), [`QuickJSRuntime`](../classes/QuickJSRuntime.md)>

Defined in: [packages/quickjs-emscripten-core/src/types.ts:43](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L43)

A owned QuickJSHandle that should be disposed or returned.

The QuickJS interpreter passes Javascript values between functions as
`JSValue` structs that references some internal data. Because passing
structs cross the Empscripten FFI interfaces is bothersome, we use pointers
to these structs instead.

A JSValue reference is "owned" in its scope. before exiting the scope, it
should be freed,  by calling `JS_FreeValue(ctx, js_value)`) or returned from
the scope. We extend that contract - a JSValuePointer (`JSValue*`) must also
be `free`d.

You can do so from Javascript by calling the .dispose() method.
