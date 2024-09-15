[quickjs-emscripten](../../packages.md) • **quickjs-emscripten** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../exports.md) / QuickJSSyncVariant

# Interface: QuickJSSyncVariant

A standard (sync) build variant.

quickjs-emscripten provides multiple build variants of the core WebAssembly
module. These variants are each intended for a different use case.

To create an instance of the library using a specific build variant, pass the
build variant to [newQuickJSWASMModule](../exports.md#newquickjswasmmodule) or [newQuickJSAsyncWASMModule](../exports.md#newquickjsasyncwasmmodule).

## Contents

- [Properties](QuickJSSyncVariant.md#properties)
  - [importFFI](QuickJSSyncVariant.md#importffi)
  - [importModuleLoader](QuickJSSyncVariant.md#importmoduleloader)
  - [type](QuickJSSyncVariant.md#type)

## Properties

### importFFI

> **`readonly`** **importFFI**: () => `Promise`\<(`module`) => [`QuickJSFFI`](QuickJSFFI.md)\>

#### Returns

`Promise`\<(`module`) => [`QuickJSFFI`](QuickJSFFI.md)\>

>
>

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:516

***

### importModuleLoader

> **`readonly`** **importModuleLoader**: () => `Promise`\<`EmscriptenImport`\<[`QuickJSEmscriptenModule`](QuickJSEmscriptenModule.md)\>\>

#### Returns

`Promise`\<`EmscriptenImport`\<[`QuickJSEmscriptenModule`](QuickJSEmscriptenModule.md)\>\>

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:517

***

### type

> **`readonly`** **type**: `"sync"`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:515

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
