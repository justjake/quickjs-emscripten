[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../README.md) / newQuickJSWASMModule

# Function: newQuickJSWASMModule()

> **newQuickJSWASMModule**(`variantOrPromise?`): `Promise`<[`QuickJSWASMModule`](../classes/QuickJSWASMModule.md)>

Defined in: [packages/quickjs-emscripten/src/variants.ts:25](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten/src/variants.ts#L25)

Create a new, completely isolated WebAssembly module containing the QuickJS library.
See the documentation on [QuickJSWASMModule](../classes/QuickJSWASMModule.md).

Note that there is a hard limit on the number of WebAssembly modules in older
versions of v8:
https://bugs.chromium.org/p/v8/issues/detail?id=12076

* [Parameters](#parameters)

  * [variantOrPromise?](#variantorpromise)

* [Returns](#returns)

## Parameters

### variantOrPromise?

[`PromisedDefault`](../type-aliases/PromisedDefault.md)<[`QuickJSSyncVariant`](../interfaces/QuickJSSyncVariant.md)> = `RELEASE_SYNC`

Optionally, pass a [QuickJSSyncVariant](../interfaces/QuickJSSyncVariant.md) to construct a different WebAssembly module.

## Returns

`Promise`<[`QuickJSWASMModule`](../classes/QuickJSWASMModule.md)>
