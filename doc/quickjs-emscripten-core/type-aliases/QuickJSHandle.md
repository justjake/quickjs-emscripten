[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../README.md) / QuickJSHandle

# Type Alias: QuickJSHandle

> **QuickJSHandle** = [`StaticJSValue`](StaticJSValue.md) | [`JSValue`](JSValue.md) | [`JSValueConst`](JSValueConst.md)

Defined in: [packages/quickjs-emscripten-core/src/types.ts:53](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L53)

Wraps a C pointer to a QuickJS JSValue, which represents a Javascript value inside
a QuickJS virtual machine.

Values must not be shared between QuickJSContext instances.
You must dispose of any handles you create by calling the `.dispose()` method.
