[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../README.md) / getQuickJS

# Function: getQuickJS()

> **getQuickJS**(): `Promise`<[`QuickJSWASMModule`](../classes/QuickJSWASMModule.md)>

Defined in: [packages/quickjs-emscripten/src/mod.ts:28](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten/src/mod.ts#L28)

Get a shared singleton [QuickJSWASMModule](../classes/QuickJSWASMModule.md). Use this to evaluate code
or create Javascript environments.

This is the top-level entrypoint for the quickjs-emscripten library.

If you need strictest possible isolation guarantees, you may create a
separate [QuickJSWASMModule](../classes/QuickJSWASMModule.md) via [newQuickJSWASMModule](newQuickJSWASMModule.md).

To work with the asyncified version of this library, see these functions:

* [newAsyncRuntime](newAsyncRuntime.md).
* [newAsyncContext](newAsyncContext.md).
* [newQuickJSAsyncWASMModule](newQuickJSAsyncWASMModule.md).

- [Returns](#returns)

## Returns

`Promise`<[`QuickJSWASMModule`](../classes/QuickJSWASMModule.md)>
