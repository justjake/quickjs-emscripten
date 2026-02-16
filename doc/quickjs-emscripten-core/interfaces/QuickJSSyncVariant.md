[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../README.md) / QuickJSSyncVariant

# Interface: QuickJSSyncVariant

Defined in: [packages/quickjs-ffi-types/src/variant-types.ts:28](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/variant-types.ts#L28)

A standard (sync) build variant.

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

> `readonly` **importFFI**: () => `Promise`<(`module`) => [`QuickJSFFI`](QuickJSFFI.md)>

Defined in: [packages/quickjs-ffi-types/src/variant-types.ts:30](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/variant-types.ts#L30)

#### Returns

`Promise`<(`module`) => [`QuickJSFFI`](QuickJSFFI.md)>

***

### importModuleLoader()

> `readonly` **importModuleLoader**: () => `Promise`<`EmscriptenImport`<[`QuickJSEmscriptenModule`](QuickJSEmscriptenModule.md)>>

Defined in: [packages/quickjs-ffi-types/src/variant-types.ts:31](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/variant-types.ts#L31)

#### Returns

`Promise`<`EmscriptenImport`<[`QuickJSEmscriptenModule`](QuickJSEmscriptenModule.md)>>

***

### type

> `readonly` **type**: `"sync"`

Defined in: [packages/quickjs-ffi-types/src/variant-types.ts:29](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/variant-types.ts#L29)
