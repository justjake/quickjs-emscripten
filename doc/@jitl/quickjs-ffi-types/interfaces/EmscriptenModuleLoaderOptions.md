[quickjs-emscripten](../../../packages.md) • **@jitl/quickjs-ffi-types** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../../packages.md) / [@jitl/quickjs-ffi-types](../exports.md) / EmscriptenModuleLoaderOptions

# Interface: EmscriptenModuleLoaderOptions

It's possible to provide these parameters to an emscripten module loader.

## Contents

- [Extended By](EmscriptenModuleLoaderOptions.md#extended-by)
- [Properties](EmscriptenModuleLoaderOptions.md#properties)
  - [wasmBinary?](EmscriptenModuleLoaderOptions.md#wasmbinary)
- [Methods](EmscriptenModuleLoaderOptions.md#methods)
  - [instantiateWasm()?](EmscriptenModuleLoaderOptions.md#instantiatewasm)
  - [locateFile()?](EmscriptenModuleLoaderOptions.md#locatefile)
  - [monitorRunDependencies()?](EmscriptenModuleLoaderOptions.md#monitorrundependencies)

## Extended By

- [`EmscriptenModule`](EmscriptenModule.md)

## Properties

### wasmBinary?

> **wasmBinary**?: `ArrayBuffer`

Compile this to WebAssembly.Module

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:81](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L81)

## Methods

### instantiateWasm()?

> **`optional`** **instantiateWasm**(`imports`, `onSuccess`): `Exports` \| `Promise`\<`Exports`\>

Create an instance of the WASM module, call onSuccess(instance), then return instance.exports

#### Parameters

• **imports**: `Imports`

• **onSuccess**: (`instance`) => `void`

#### Returns

`Exports` \| `Promise`\<`Exports`\>

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:84](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L84)

***

### locateFile()?

> **`optional`** **locateFile**(`fileName`, `relativeTo`): `string`

Give a path or URL where Emscripten should locate the given file

#### Parameters

• **fileName**: `string`

• **relativeTo**: `string`

Often `''` (empty string)

#### Returns

`string`

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:74](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L74)

***

### monitorRunDependencies()?

> **`optional`** **monitorRunDependencies**(`left`): `void`

Called by emscripten as dependencies blocking initialization are added or fulfilled. May only be called in debug builds.

#### Parameters

• **left**: `number`

#### Returns

`void`

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:90](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L90)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
