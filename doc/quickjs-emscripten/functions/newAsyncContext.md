[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../README.md) / newAsyncContext

# Function: newAsyncContext()

> **newAsyncContext**(`options?`): `Promise`<[`QuickJSAsyncContext`](../classes/QuickJSAsyncContext.md)>

Defined in: [packages/quickjs-emscripten/src/mod.ts:76](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten/src/mod.ts#L76)

Create a new [QuickJSAsyncContext](../classes/QuickJSAsyncContext.md) (with an associated runtime) in an
separate WebAssembly module.

Each context is isolated in a separate WebAssembly module, so that errors in
one runtime cannot contaminate another runtime, and each runtime can execute
an asynchronous action without conflicts.

Note that there is a hard limit on the number of WebAssembly modules in older
versions of v8:
https://bugs.chromium.org/p/v8/issues/detail?id=12076

## Contents

* [Parameters](#parameters)
  * [options?](#options)
* [Returns](#returns)

## Parameters

### options?

[`ContextOptions`](../interfaces/ContextOptions.md)

## Returns

`Promise`<[`QuickJSAsyncContext`](../classes/QuickJSAsyncContext.md)>
