[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../README.md) / AsyncFunctionImplementation

# Type Alias: AsyncFunctionImplementation()

> **AsyncFunctionImplementation** = (`this`, ...`args`) => `Promise`<[`QuickJSHandle`](QuickJSHandle.md) | [`VmCallResult`](VmCallResult.md)<[`QuickJSHandle`](QuickJSHandle.md)> | `void`>

Defined in: [packages/quickjs-emscripten-core/src/context-asyncify.ts:18](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context-asyncify.ts#L18)

* [Parameters](#parameters)

  * [this](#this)
  * [args](#args)

* [Returns](#returns)

## Parameters

### this

[`QuickJSHandle`](QuickJSHandle.md)

### args

...[`QuickJSHandle`](QuickJSHandle.md)\[]

## Returns

`Promise`<[`QuickJSHandle`](QuickJSHandle.md) | [`VmCallResult`](VmCallResult.md)<[`QuickJSHandle`](QuickJSHandle.md)> | `void`>
