[quickjs-emscripten](../../../packages.md) • **@jitl/quickjs-ffi-types** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../../packages.md) / [@jitl/quickjs-ffi-types](../exports.md) / EmscriptenModule

# Interface: EmscriptenModule

Typings for the features we use to interface with our Emscripten build of
QuickJS.

## Contents

- [Extends](EmscriptenModule.md#extends)
- [Properties](EmscriptenModule.md#properties)
  - [FAST\_MEMORY](EmscriptenModule.md#fast-memory)
  - [HEAPU8](EmscriptenModule.md#heapu8)
  - [TOTAL\_MEMORY](EmscriptenModule.md#total-memory)
  - [TOTAL\_STACK](EmscriptenModule.md#total-stack)
  - [wasmBinary?](EmscriptenModule.md#wasmbinary)
  - [wasmMemory?](EmscriptenModule.md#wasmmemory)
- [Methods](EmscriptenModule.md#methods)
  - [UTF8ToString()](EmscriptenModule.md#utf8tostring)
  - [\_free()](EmscriptenModule.md#free)
  - [\_malloc()](EmscriptenModule.md#malloc)
  - [cwrap()](EmscriptenModule.md#cwrap)
  - [instantiateWasm()?](EmscriptenModule.md#instantiatewasm)
  - [lengthBytesUTF8()](EmscriptenModule.md#lengthbytesutf8)
  - [locateFile()?](EmscriptenModule.md#locatefile)
  - [monitorRunDependencies()?](EmscriptenModule.md#monitorrundependencies)
  - [stringToUTF8()](EmscriptenModule.md#stringtoutf8)

## Extends

- [`EmscriptenModuleLoaderOptions`](EmscriptenModuleLoaderOptions.md)

## Properties

### FAST\_MEMORY

> **FAST\_MEMORY**: `number`

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:161](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L161)

***

### HEAPU8

> **HEAPU8**: `Uint8Array`

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:157](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L157)

***

### TOTAL\_MEMORY

> **TOTAL\_MEMORY**: `number`

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:160](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L160)

***

### TOTAL\_STACK

> **TOTAL\_STACK**: `number`

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:159](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L159)

***

### wasmBinary?

> **wasmBinary**?: `ArrayBuffer`

Compile this to WebAssembly.Module

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModuleLoaderOptions.wasmBinary`](EmscriptenModuleLoaderOptions.md#wasmbinary)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:105](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L105)

***

### wasmMemory?

> **wasmMemory**?: `Memory`

If provided, use this WebAssembly.Memory instead of an automatically created one.

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModuleLoaderOptions.wasmMemory`](EmscriptenModuleLoaderOptions.md#wasmmemory)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:108](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L108)

## Methods

### UTF8ToString()

> **UTF8ToString**(`ptr`, `maxBytesToRead`?): `string`

HeapChar to JS string.
https://emscripten.org/docs/api_reference/preamble.js.html#UTF8ToString

#### Parameters

• **ptr**: [`BorrowedHeapCharPointer`](../exports.md#borrowedheapcharpointer)

• **maxBytesToRead?**: `number`

#### Returns

`string`

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:145](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L145)

***

### \_free()

> **\_free**(`ptr`): `void`

#### Parameters

• **ptr**: `number`

#### Returns

`void`

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:149](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L149)

***

### \_malloc()

> **\_malloc**(`size`): `number`

#### Parameters

• **size**: `number`

#### Returns

`number`

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:148](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L148)

***

### cwrap()

> **cwrap**(`ident`, `returnType`, `argTypes`, `opts`?): (...`args`) => `any`

#### Parameters

• **ident**: `string`

• **returnType**: `null` \| `ValueType`

• **argTypes**: `ValueType`[]

• **opts?**: `CCallOpts`

#### Returns

`Function`

> ##### Parameters
>
> • ...**args**: `any`[]
>
> ##### Returns
>
> `any`
>

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:150](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L150)

***

### instantiateWasm()?

> **`optional`** **instantiateWasm**(`imports`, `onSuccess`): `Exports` \| `Promise`\<`Exports`\>

Create an instance of the WASM module, call onSuccess(instance), then return instance.exports

#### Parameters

• **imports**: `Imports`

• **onSuccess**: (`instance`) => `void`

#### Returns

`Exports` \| `Promise`\<`Exports`\>

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModuleLoaderOptions.instantiateWasm`](EmscriptenModuleLoaderOptions.md#instantiatewasm)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:111](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L111)

***

### lengthBytesUTF8()

> **lengthBytesUTF8**(`str`): `number`

#### Parameters

• **str**: `string`

#### Returns

`number`

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:146](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L146)

***

### locateFile()?

> **`optional`** **locateFile**(`fileName`, `prefix`): `string`

If set, this method will be called when the runtime needs to load a file,
such as a .wasm WebAssembly file, .mem memory init file, or a file
generated by the file packager.

The function receives two parameters:

- `fileName`, the relative path to the file as configured in build
process, eg `"emscripten-module.wasm"`.
- `prefix` (path to the main JavaScript file’s directory). This may be `''`
(empty string) in some cases if the Emscripten Javascript code can't locate
itself. Try logging it in your environment.

It should return the actual URI or path to the requested file.

This lets you host file packages on a different location than the directory
of the JavaScript file (which is the default expectation), for example if
you want to host them on a CDN.

#### Parameters

• **fileName**: `string`

• **prefix**: `string`

Often `''` (empty string)

#### Returns

`string`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModuleLoaderOptions.locateFile`](EmscriptenModuleLoaderOptions.md#locatefile)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:98](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L98)

***

### monitorRunDependencies()?

> **`optional`** **monitorRunDependencies**(`left`): `void`

Called by emscripten as dependencies blocking initialization are added or fulfilled. May only be called in debug builds.

#### Parameters

• **left**: `number`

#### Returns

`void`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModuleLoaderOptions.monitorRunDependencies`](EmscriptenModuleLoaderOptions.md#monitorrundependencies)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:117](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L117)

***

### stringToUTF8()

> **stringToUTF8**(`str`, `outPtr`, `maxBytesToRead`?): `void`

Write JS `str` to HeapChar pointer.
https://emscripten.org/docs/api_reference/preamble.js.html#stringToUTF8

#### Parameters

• **str**: `string`

• **outPtr**: [`OwnedHeapCharPointer`](../exports.md#ownedheapcharpointer)

• **maxBytesToRead?**: `number`

#### Returns

`void`

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:140](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L140)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
