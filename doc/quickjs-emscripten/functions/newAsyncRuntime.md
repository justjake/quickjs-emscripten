[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../README.md) / newAsyncRuntime

# Function: newAsyncRuntime()

> **newAsyncRuntime**(`options?`): `Promise`<[`QuickJSAsyncRuntime`](../classes/QuickJSAsyncRuntime.md)>

Defined in: [packages/quickjs-emscripten/src/mod.ts:59](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten/src/mod.ts#L59)

Create a new [QuickJSAsyncRuntime](../classes/QuickJSAsyncRuntime.md) in a separate WebAssembly module.

Each runtime is isolated in a separate WebAssembly module, so that errors in
one runtime cannot contaminate another runtime, and each runtime can execute
an asynchronous action without conflicts.

Note that there is a hard limit on the number of WebAssembly modules in older
versions of v8:
https://bugs.chromium.org/p/v8/issues/detail?id=12076

* [Parameters](#parameters)

  * [options?](#options)

* [Returns](#returns)

## Parameters

### options?

[`AsyncRuntimeOptions`](../interfaces/AsyncRuntimeOptions.md)

## Returns

`Promise`<[`QuickJSAsyncRuntime`](../classes/QuickJSAsyncRuntime.md)>
