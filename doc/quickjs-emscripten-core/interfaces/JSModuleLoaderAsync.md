[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../README.md) / JSModuleLoaderAsync

# Interface: JSModuleLoaderAsync()

Defined in: [packages/quickjs-emscripten-core/src/types.ts:74](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L74)

> **JSModuleLoaderAsync**(`moduleName`, `context`): [`JSModuleLoadResult`](../type-aliases/JSModuleLoadResult.md) | `Promise`<[`JSModuleLoadResult`](../type-aliases/JSModuleLoadResult.md)>

Defined in: [packages/quickjs-emscripten-core/src/types.ts:76](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L76)

Load module (async)

## Contents

* [Parameters](#parameters)
  * [moduleName](#modulename)
  * [context](#context)
* [Returns](#returns)

## Parameters

### moduleName

`string`

### context

[`QuickJSAsyncContext`](../classes/QuickJSAsyncContext.md)

## Returns

[`JSModuleLoadResult`](../type-aliases/JSModuleLoadResult.md) | `Promise`<[`JSModuleLoadResult`](../type-aliases/JSModuleLoadResult.md)>
