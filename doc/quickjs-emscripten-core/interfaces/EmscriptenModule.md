[quickjs-emscripten](../../packages.md) • **quickjs-emscripten-core** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../exports.md) / EmscriptenModule

# Interface: EmscriptenModule

Typings for the features we use to interface with our Emscripten build of
QuickJS.

## Contents

- [Extends](EmscriptenModule.md#extends)
- [Properties](EmscriptenModule.md#properties)
  - [HEAPU8](EmscriptenModule.md#heapu8)
  - [wasmBinary?](EmscriptenModule.md#wasmbinary)
  - [wasmMemory?](EmscriptenModule.md#wasmmemory)
- [Methods](EmscriptenModule.md#methods)
  - [UTF8ToString()](EmscriptenModule.md#utf8tostring)
  - [\_free()](EmscriptenModule.md#free)
  - [\_malloc()](EmscriptenModule.md#malloc)
  - [cwrap()](EmscriptenModule.md#cwrap)
  - [getValue()](EmscriptenModule.md#getvalue)
  - [instantiateWasm()?](EmscriptenModule.md#instantiatewasm)
  - [lengthBytesUTF8()](EmscriptenModule.md#lengthbytesutf8)
  - [locateFile()?](EmscriptenModule.md#locatefile)
  - [monitorRunDependencies()?](EmscriptenModule.md#monitorrundependencies)
  - [stringToUTF8()](EmscriptenModule.md#stringtoutf8)

## Extends

- [`EmscriptenModuleLoaderOptions`](EmscriptenModuleLoaderOptions.md)

## Properties

### HEAPU8

> **HEAPU8**: `Uint8Array`

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:162](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L162)

***

### wasmBinary?

> **wasmBinary**?: `ArrayBuffer`

Compile this to WebAssembly.Module

#### Inherited from

[`quickjs-emscripten-core.EmscriptenModuleLoaderOptions.wasmBinary`](EmscriptenModuleLoaderOptions.md#wasmbinary)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:104](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L104)

***

### wasmMemory?

> **wasmMemory**?: `Memory`

If provided, use this WebAssembly.Memory instead of an automatically created one.

#### Inherited from

[`quickjs-emscripten-core.EmscriptenModuleLoaderOptions.wasmMemory`](EmscriptenModuleLoaderOptions.md#wasmmemory)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:107](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L107)

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

[packages/quickjs-ffi-types/src/emscripten-types.ts:144](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L144)

***

### \_free()

> **\_free**(`ptr`): `void`

#### Parameters

• **ptr**: `number`

#### Returns

`void`

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:148](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L148)

***

### \_malloc()

> **\_malloc**(`size`): `number`

#### Parameters

• **size**: `number`

#### Returns

`number`

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:147](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L147)

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

[packages/quickjs-ffi-types/src/emscripten-types.ts:149](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L149)

***

### getValue()

#### getValue(ptr, type)

> **getValue**(`ptr`, `type`): `number`

##### Parameters

• **ptr**: `number`

• **type**: `"i8"` \| `"i16"` \| `"i32"` \| `"float"` \| `"double"`

##### Returns

`number`

##### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:155](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L155)

#### getValue(ptr, type)

> **getValue**(`ptr`, `type`): `bigint`

##### Parameters

• **ptr**: `number`

• **type**: `"i64"`

##### Returns

`bigint`

##### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:156](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L156)

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

[`quickjs-emscripten-core.EmscriptenModuleLoaderOptions.instantiateWasm`](EmscriptenModuleLoaderOptions.md#instantiatewasm)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:110](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L110)

***

### lengthBytesUTF8()

> **lengthBytesUTF8**(`str`): `number`

#### Parameters

• **str**: `string`

#### Returns

`number`

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:145](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L145)

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

[`quickjs-emscripten-core.EmscriptenModuleLoaderOptions.locateFile`](EmscriptenModuleLoaderOptions.md#locatefile)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:97](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L97)

***

### monitorRunDependencies()?

> **`optional`** **monitorRunDependencies**(`left`): `void`

Called by emscripten as dependencies blocking initialization are added or fulfilled. May only be called in debug builds.

#### Parameters

• **left**: `number`

#### Returns

`void`

#### Inherited from

[`quickjs-emscripten-core.EmscriptenModuleLoaderOptions.monitorRunDependencies`](EmscriptenModuleLoaderOptions.md#monitorrundependencies)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:116](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L116)

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

[packages/quickjs-ffi-types/src/emscripten-types.ts:139](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L139)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
