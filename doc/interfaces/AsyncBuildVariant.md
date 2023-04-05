[quickjs-emscripten](../README.md) / [Exports](../modules.md) / AsyncBuildVariant

# Interface: AsyncBuildVariant

quickjs-emscripten provides multiple build variants of the core WebAssembly
module. These variants are each intended for a different use case.

To create an instance of the library using a specific build variant, pass the
build variant to [newQuickJSWASMModule](../modules.md#newquickjswasmmodule) or [newQuickJSAsyncWASMModule](../modules.md#newquickjsasyncwasmmodule).

Asyncified build variants:

- [RELEASE_ASYNC](../modules.md#release_async) - This is the default asyncified build variant, for general purpose use.
- [DEBUG_ASYNC](../modules.md#debug_async) - Asyncified build variant with debug logging.

## Table of contents

### Properties

- [type](AsyncBuildVariant.md#type)

### Methods

- [importFFI](AsyncBuildVariant.md#importffi)
- [importModuleLoader](AsyncBuildVariant.md#importmoduleloader)

## Properties

### type

• **type**: ``"async"``

#### Defined in

[ts/variants.ts:54](https://github.com/justjake/quickjs-emscripten/blob/main/ts/variants.ts#L54)

## Methods

### importFFI

▸ **importFFI**(): `Promise`<`QuickJSAsyncFFIConstructor`\>

#### Returns

`Promise`<`QuickJSAsyncFFIConstructor`\>

#### Defined in

[ts/variants.ts:55](https://github.com/justjake/quickjs-emscripten/blob/main/ts/variants.ts#L55)

___

### importModuleLoader

▸ **importModuleLoader**(): `Promise`<`EmscriptenModuleLoader`<`QuickJSAsyncEmscriptenModule`\>\>

#### Returns

`Promise`<`EmscriptenModuleLoader`<`QuickJSAsyncEmscriptenModule`\>\>

#### Defined in

[ts/variants.ts:56](https://github.com/justjake/quickjs-emscripten/blob/main/ts/variants.ts#L56)
