[quickjs-emscripten](../README.md) / [Exports](../modules.md) / SyncBuildVariant

# Interface: SyncBuildVariant

quickjs-emscripten provides multiple build variants of the core WebAssembly
module. These variants are each intended for a different use case.

To create an instance of the library using a specific build variant, pass the
build variant to [newQuickJSWASMModule](../modules.md#newquickjswasmmodule) or [newQuickJSAsyncWASMModule](../modules.md#newquickjsasyncwasmmodule).

Synchronous build variants:

- [RELEASE_SYNC](../modules.md#release_sync) - This is the default synchronous variant, for general purpose use.
- [DEBUG_SYNC](../modules.md#debug_sync) - Synchronous build variant for debugging memory leaks.

## Table of contents

### Properties

- [type](SyncBuildVariant.md#type)

### Methods

- [importFFI](SyncBuildVariant.md#importffi)
- [importModuleLoader](SyncBuildVariant.md#importmoduleloader)

## Properties

### type

• **type**: ``"sync"``

#### Defined in

[ts/variants.ts:36](https://github.com/justjake/quickjs-emscripten/blob/main/ts/variants.ts#L36)

## Methods

### importFFI

▸ **importFFI**(): `Promise`<`QuickJSFFIConstructor`\>

#### Returns

`Promise`<`QuickJSFFIConstructor`\>

#### Defined in

[ts/variants.ts:37](https://github.com/justjake/quickjs-emscripten/blob/main/ts/variants.ts#L37)

___

### importModuleLoader

▸ **importModuleLoader**(): `Promise`<`EmscriptenModuleLoader`<`QuickJSEmscriptenModule`\>\>

#### Returns

`Promise`<`EmscriptenModuleLoader`<`QuickJSEmscriptenModule`\>\>

#### Defined in

[ts/variants.ts:38](https://github.com/justjake/quickjs-emscripten/blob/main/ts/variants.ts#L38)
