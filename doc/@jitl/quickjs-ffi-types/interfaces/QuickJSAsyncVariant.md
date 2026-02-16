[**quickjs-emscripten**](../../../README.md)

***

[quickjs-emscripten](../../../packages.md) / [@jitl/quickjs-ffi-types](../README.md) / QuickJSAsyncVariant

# Interface: QuickJSAsyncVariant

Defined in: [variant-types.ts:43](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/variant-types.ts#L43)

An ASYNCIFY build variant.

quickjs-emscripten provides multiple build variants of the core WebAssembly
module. These variants are each intended for a different use case.

To create an instance of the library using a specific build variant, pass the
build variant to newQuickJSWASMModule or newQuickJSAsyncWASMModule.

## Contents

* [Properties](#properties)
  * [importFFI()](#importffi)
  * [importModuleLoader()](#importmoduleloader)
  * [type](#type)

## Properties

### importFFI()

> `readonly` **importFFI**: () => `Promise`<(`module`) => [`QuickJSAsyncFFI`](QuickJSAsyncFFI.md)>

Defined in: [variant-types.ts:45](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/variant-types.ts#L45)

#### Returns

`Promise`<(`module`) => [`QuickJSAsyncFFI`](QuickJSAsyncFFI.md)>

***

### importModuleLoader()

> `readonly` **importModuleLoader**: () => `Promise`<`EmscriptenImport`<[`QuickJSAsyncEmscriptenModule`](QuickJSAsyncEmscriptenModule.md)>>

Defined in: [variant-types.ts:46](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/variant-types.ts#L46)

#### Returns

`Promise`<`EmscriptenImport`<[`QuickJSAsyncEmscriptenModule`](QuickJSAsyncEmscriptenModule.md)>>

***

### type

> `readonly` **type**: `"async"`

Defined in: [variant-types.ts:44](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/variant-types.ts#L44)
