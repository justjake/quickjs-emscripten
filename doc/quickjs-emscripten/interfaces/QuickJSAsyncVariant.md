[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../README.md) / QuickJSAsyncVariant

# Interface: QuickJSAsyncVariant

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:541

An ASYNCIFY build variant.

quickjs-emscripten provides multiple build variants of the core WebAssembly
module. These variants are each intended for a different use case.

To create an instance of the library using a specific build variant, pass the
build variant to [newQuickJSWASMModule](../README.md#newquickjswasmmodule) or [newQuickJSAsyncWASMModule](../README.md#newquickjsasyncwasmmodule).

## Properties

### importFFI()

> `readonly` **importFFI**: () => `Promise`\<(`module`) => [`QuickJSAsyncFFI`](QuickJSAsyncFFI.md)\>

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:543

#### Returns

`Promise`\<(`module`) => [`QuickJSAsyncFFI`](QuickJSAsyncFFI.md)\>

***

### importModuleLoader()

> `readonly` **importModuleLoader**: () => `Promise`\<`EmscriptenImport`\<[`QuickJSAsyncEmscriptenModule`](QuickJSAsyncEmscriptenModule.md)\>\>

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:544

#### Returns

`Promise`\<`EmscriptenImport`\<[`QuickJSAsyncEmscriptenModule`](QuickJSAsyncEmscriptenModule.md)\>\>

***

### type

> `readonly` **type**: `"async"`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:542
