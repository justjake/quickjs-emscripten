[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../README.md) / QuickJSSyncVariant

# Interface: QuickJSSyncVariant

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:527

A standard (sync) build variant.

quickjs-emscripten provides multiple build variants of the core WebAssembly
module. These variants are each intended for a different use case.

To create an instance of the library using a specific build variant, pass the
build variant to [newQuickJSWASMModule](../functions/newQuickJSWASMModule.md) or [newQuickJSAsyncWASMModule](../functions/newQuickJSAsyncWASMModule.md).

* [Properties](#properties)

  * [importFFI()](#importffi)
  * [importModuleLoader()](#importmoduleloader)
  * [type](#type)

## Properties

### importFFI()

> `readonly` **importFFI**: () => `Promise`<(`module`) => [`QuickJSFFI`](QuickJSFFI.md)>

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:529

#### Returns

`Promise`<(`module`) => [`QuickJSFFI`](QuickJSFFI.md)>

***

### importModuleLoader()

> `readonly` **importModuleLoader**: () => `Promise`<`EmscriptenImport`<[`QuickJSEmscriptenModule`](QuickJSEmscriptenModule.md)>>

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:530

#### Returns

`Promise`<`EmscriptenImport`<[`QuickJSEmscriptenModule`](QuickJSEmscriptenModule.md)>>

***

### type

> `readonly` **type**: `"sync"`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:528
