[quickjs-emscripten](../../../packages.md) • **@jitl/quickjs-ffi-types** • [Readme](../index.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../../packages.md) / [@jitl/quickjs-ffi-types](../exports.md) / QuickJSSyncVariant

# Interface: QuickJSSyncVariant

A standard (sync) build variant.

quickjs-emscripten provides multiple build variants of the core WebAssembly
module. These variants are each intended for a different use case.

To create an instance of the library using a specific build variant, pass the
build variant to newQuickJSWASMModule or newQuickJSAsyncWASMModule.

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

[variant-types.ts:30](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/variant-types.ts#L30)

***

### importModuleLoader

> **`readonly`** **importModuleLoader**: () => `Promise`\<`EmscriptenImport`\<[`QuickJSEmscriptenModule`](QuickJSEmscriptenModule.md)\>\>

#### Returns

`Promise`\<`EmscriptenImport`\<[`QuickJSEmscriptenModule`](QuickJSEmscriptenModule.md)\>\>

#### Source

[variant-types.ts:31](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/variant-types.ts#L31)

***

### type

> **`readonly`** **type**: `"sync"`

#### Source

[variant-types.ts:29](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/variant-types.ts#L29)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
