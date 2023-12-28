[quickjs-emscripten](../../packages.md) • **quickjs-emscripten** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../exports.md) / CustomizeVariantOptions

# Interface: CustomizeVariantOptions

## Contents

- [Properties](CustomizeVariantOptions.md#properties)
  - [emscriptenModule?](CustomizeVariantOptions.md#emscriptenmodule)
  - [locateFile?](CustomizeVariantOptions.md#locatefile)
  - [log?](CustomizeVariantOptions.md#log)
  - [wasmBinary?](CustomizeVariantOptions.md#wasmbinary)
  - [wasmLocation?](CustomizeVariantOptions.md#wasmlocation)
  - [wasmModule?](CustomizeVariantOptions.md#wasmmodule)
  - [wasmSourceMapData?](CustomizeVariantOptions.md#wasmsourcemapdata)
  - [wasmSourceMapLocation?](CustomizeVariantOptions.md#wasmsourcemaplocation)

## Properties

### emscriptenModule?

> **emscriptenModule**?: [`EmscriptenModuleLoaderOptions`](EmscriptenModuleLoaderOptions.md)

The enumerable properties of this object will be passed verbatim, although they may be overwritten if you pass other options.

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:1325

***

### locateFile?

> **locateFile**?: (`fileName`, `relativeTo`) => `string`

Provide a locateFile callback, see [EmscriptenModuleLoaderOptions#locateFile](EmscriptenModuleLoaderOptions.md#locatefile)

#### Parameters

• **fileName**: `string`

• **relativeTo**: `string`

Often `''` (empty string)

#### Returns

`string`

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:1323

***

### log?

> **log**?: (...`data`) => `void`(`message`?, ...`optionalParams`) => `void`

Debug logger

#### Parameters

• ...**data**: `any`[]

#### Returns

`void`

Debug logger

#### Parameters

• **message?**: `any`

• ...**optionalParams?**: `any`[]

#### Returns

`void`

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:1327

***

### wasmBinary?

> **wasmBinary**?: [`OrLoader`](../exports.md#orloadert)\<`ArrayBuffer`\>

If given, Emscripten will compile the WebAssembly.Module from these bytes.

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:1315

***

### wasmLocation?

> **wasmLocation**?: `string`

If given, Emscripten will try to load the WebAssembly module data from this location (path or URI) as appropriate for the current platform.

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:1313

***

### wasmModule?

> **wasmModule**?: [`OrLoader`](../exports.md#orloadert)\<`Module`\>

If given, Emscripten will instantiate the WebAssembly.Instance from this existing WebAssembly.Module

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:1317

***

### wasmSourceMapData?

> **wasmSourceMapData**?: [`OrLoader`](../exports.md#orloadert)\<`string` \| [`SourceMapData`](SourceMapData.md)\>

If given, we will provide the source map to Emscripten directly. This may only be respected if wasmModule is also provided.

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:1321

***

### wasmSourceMapLocation?

> **wasmSourceMapLocation**?: `string`

If given, Emscripten will try to load the source map for the WebAssembly module from this location (path or URI) as appropriate for the current platform.

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:1319

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
