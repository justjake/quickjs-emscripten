[quickjs-emscripten](../../packages.md) • **quickjs-emscripten-core** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../exports.md) / QuickJSAsyncVariant

# Interface: QuickJSAsyncVariant

An ASYNCIFY build variant.

quickjs-emscripten provides multiple build variants of the core WebAssembly
module. These variants are each intended for a different use case.

To create an instance of the library using a specific build variant, pass the
build variant to newQuickJSWASMModule or newQuickJSAsyncWASMModule.

## Contents

- [Properties](QuickJSAsyncVariant.md#properties)
  - [importFFI](QuickJSAsyncVariant.md#importffi)
  - [importModuleLoader](QuickJSAsyncVariant.md#importmoduleloader)
  - [type](QuickJSAsyncVariant.md#type)

## Properties

### importFFI

> **`readonly`** **importFFI**: () => `Promise`\<(`module`) => [`QuickJSAsyncFFI`](QuickJSAsyncFFI.md)\>

#### Returns

`Promise`\<(`module`) => [`QuickJSAsyncFFI`](QuickJSAsyncFFI.md)\>

>
>

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:492

***

### importModuleLoader

> **`readonly`** **importModuleLoader**: () => `Promise`\<`EmscriptenImport`\<[`QuickJSAsyncEmscriptenModule`](QuickJSAsyncEmscriptenModule.md)\>\>

#### Returns

`Promise`\<`EmscriptenImport`\<[`QuickJSAsyncEmscriptenModule`](QuickJSAsyncEmscriptenModule.md)\>\>

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:493

***

### type

> **`readonly`** **type**: `"async"`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:491

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
