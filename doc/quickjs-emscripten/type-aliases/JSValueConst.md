[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../README.md) / JSValueConst

# Type Alias: JSValueConst

> **JSValueConst** = [`Lifetime`](../classes/Lifetime.md)<[`JSValueConstPointer`](JSValueConstPointer.md), [`JSValuePointer`](JSValuePointer.md), [`QuickJSRuntime`](../classes/QuickJSRuntime.md)>

Defined in: [packages/quickjs-emscripten-core/src/types.ts:26](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L26)

A QuickJSHandle to a borrowed value that does not need to be disposed.

In QuickJS, a JSValueConst is a "borrowed" reference that isn't owned by the
current scope. That means that the current scope should not `JS_FreeValue`
it, or retain a reference to it after the scope exits, because it may be
freed by its owner.

quickjs-emscripten takes care of disposing JSValueConst references.
