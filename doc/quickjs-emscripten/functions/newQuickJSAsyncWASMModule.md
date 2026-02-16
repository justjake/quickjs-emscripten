[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../README.md) / newQuickJSAsyncWASMModule

# Function: newQuickJSAsyncWASMModule()

> **newQuickJSAsyncWASMModule**(`variantOrPromise?`): `Promise`<[`QuickJSAsyncWASMModule`](../classes/QuickJSAsyncWASMModule.md)>

Defined in: [packages/quickjs-emscripten/src/variants.ts:47](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten/src/variants.ts#L47)

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

  * [variantOrPromise?](#variantorpromise)

* [Returns](#returns)

## Parameters

### variantOrPromise?

[`PromisedDefault`](../type-aliases/PromisedDefault.md)<[`QuickJSAsyncVariant`](../interfaces/QuickJSAsyncVariant.md)> = `RELEASE_ASYNC`

Optionally, pass a [QuickJSAsyncVariant](../interfaces/QuickJSAsyncVariant.md) to construct a different WebAssembly module.

## Returns

`Promise`<[`QuickJSAsyncWASMModule`](../classes/QuickJSAsyncWASMModule.md)>
