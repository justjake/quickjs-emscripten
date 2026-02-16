[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../README.md) / newQuickJSAsyncWASMModuleFromVariant

# Function: newQuickJSAsyncWASMModuleFromVariant()

> **newQuickJSAsyncWASMModuleFromVariant**(`variantOrPromise`): `Promise`<[`QuickJSAsyncWASMModule`](../classes/QuickJSAsyncWASMModule.md)>

Defined in: [packages/quickjs-emscripten-core/src/from-variant.ts:76](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/from-variant.ts#L76)

Create a new, completely isolated WebAssembly module containing a version of the QuickJS library
compiled with Emscripten's [ASYNCIFY](https://emscripten.org/docs/porting/asyncify.html) transform.

This version of the library offers features that enable synchronous code
inside the VM to interact with asynchronous code in the host environment.
See the documentation on [QuickJSAsyncWASMModule](../classes/QuickJSAsyncWASMModule.md), [QuickJSAsyncRuntime](../classes/QuickJSAsyncRuntime.md),
and [QuickJSAsyncContext](../classes/QuickJSAsyncContext.md).

Note that there is a hard limit on the number of WebAssembly modules in older
versions of v8:
https://bugs.chromium.org/p/v8/issues/detail?id=12076

* [Parameters](#parameters)

  * [variantOrPromise](#variantorpromise)

* [Returns](#returns)

* [Example](#example)

## Parameters

### variantOrPromise

[`PromisedDefault`](../type-aliases/PromisedDefault.md)<[`QuickJSAsyncVariant`](../interfaces/QuickJSAsyncVariant.md)>

A [QuickJSAsyncVariant](../interfaces/QuickJSAsyncVariant.md) to construct the WebAssembly module.

## Returns

`Promise`<[`QuickJSAsyncWASMModule`](../classes/QuickJSAsyncWASMModule.md)>

## Example

```ts
const quickjs = new newQuickJSAsyncWASMModuleFromVariant(
  import('@jitl/quickjs-browser-debug-asyncify-wasm')
)
```
