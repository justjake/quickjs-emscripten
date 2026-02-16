[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../README.md) / newQuickJSWASMModuleFromVariant

# Function: newQuickJSWASMModuleFromVariant()

> **newQuickJSWASMModuleFromVariant**(`variantOrPromise`): `Promise`<[`QuickJSWASMModule`](../classes/QuickJSWASMModule.md)>

Defined in: [packages/quickjs-emscripten-core/src/from-variant.ts:38](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/from-variant.ts#L38)

Create a new, completely isolated WebAssembly module containing the QuickJS library.
See the documentation on [QuickJSWASMModule](../classes/QuickJSWASMModule.md).

Note that there is a hard limit on the number of WebAssembly modules in older
versions of v8:
https://bugs.chromium.org/p/v8/issues/detail?id=12076

## Contents

* [Parameters](#parameters)
  * [variantOrPromise](#variantorpromise)
* [Returns](#returns)
* [Example](#example)

## Parameters

### variantOrPromise

[`PromisedDefault`](../type-aliases/PromisedDefault.md)<[`QuickJSSyncVariant`](../interfaces/QuickJSSyncVariant.md)>

A [QuickJSSyncVariant](../interfaces/QuickJSSyncVariant.md) to construct the WebAssembly module.

## Returns

`Promise`<[`QuickJSWASMModule`](../classes/QuickJSWASMModule.md)>

## Example

```ts
const quickjs = new newQuickJSWASMModuleFromVariant(
  import('@jitl/quickjs-browser-release-sync-wasm')
)
```
