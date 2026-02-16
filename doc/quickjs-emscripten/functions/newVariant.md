[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../README.md) / newVariant

# Function: newVariant()

> **newVariant**<`T`>(`baseVariant`, `options`): `T`

Defined in: [packages/quickjs-emscripten-core/src/from-variant.ts:162](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/from-variant.ts#L162)

Create a new variant by overriding how Emscripten obtains the WebAssembly module.
This may be necessary in Cloudflare Workers, which can't compile WebAssembly modules from binary data.

* [Type Parameters](#type-parameters)

  * [T](#t)

* [Parameters](#parameters)

  * [baseVariant](#basevariant)
  * [options](#options)

* [Returns](#returns)

## Type Parameters

### T

`T` *extends* [`QuickJSVariant`](../type-aliases/QuickJSVariant.md)

## Parameters

### baseVariant

`T`

### options

[`CustomizeVariantOptions`](../interfaces/CustomizeVariantOptions.md)

## Returns

`T`
