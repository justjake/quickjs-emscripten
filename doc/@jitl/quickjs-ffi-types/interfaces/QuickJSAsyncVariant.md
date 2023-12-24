[quickjs-emscripten](../../../packages.md) • **@jitl/quickjs-ffi-types** • [Readme](../index.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../../packages.md) / [@jitl/quickjs-ffi-types](../exports.md) / QuickJSAsyncVariant

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

[variant-types.ts:45](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/variant-types.ts#L45)

***

### importModuleLoader

> **`readonly`** **importModuleLoader**: () => `Promise`\<`EmscriptenImport`\<[`QuickJSAsyncEmscriptenModule`](QuickJSAsyncEmscriptenModule.md)\>\>

#### Returns

`Promise`\<`EmscriptenImport`\<[`QuickJSAsyncEmscriptenModule`](QuickJSAsyncEmscriptenModule.md)\>\>

#### Source

[variant-types.ts:46](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/variant-types.ts#L46)

***

### type

> **`readonly`** **type**: `"async"`

#### Source

[variant-types.ts:44](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/variant-types.ts#L44)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
