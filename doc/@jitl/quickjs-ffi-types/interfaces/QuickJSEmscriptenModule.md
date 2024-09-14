[quickjs-emscripten](../../../packages.md) • **@jitl/quickjs-ffi-types** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../../packages.md) / [@jitl/quickjs-ffi-types](../exports.md) / QuickJSEmscriptenModule

# Interface: QuickJSEmscriptenModule

Typings for the features we use to interface with our Emscripten build of
QuickJS.

## Contents

- [Extends](QuickJSEmscriptenModule.md#extends)
- [Properties](QuickJSEmscriptenModule.md#properties)
  - [HEAPU8](QuickJSEmscriptenModule.md#heapu8)
  - [callbacks](QuickJSEmscriptenModule.md#callbacks)
  - [type](QuickJSEmscriptenModule.md#type)
  - [wasmBinary?](QuickJSEmscriptenModule.md#wasmbinary)
  - [wasmMemory?](QuickJSEmscriptenModule.md#wasmmemory)
- [Methods](QuickJSEmscriptenModule.md#methods)
  - [UTF8ToString()](QuickJSEmscriptenModule.md#utf8tostring)
  - [\_free()](QuickJSEmscriptenModule.md#free)
  - [\_malloc()](QuickJSEmscriptenModule.md#malloc)
  - [cwrap()](QuickJSEmscriptenModule.md#cwrap)
  - [getValue()](QuickJSEmscriptenModule.md#getvalue)
  - [instantiateWasm()?](QuickJSEmscriptenModule.md#instantiatewasm)
  - [lengthBytesUTF8()](QuickJSEmscriptenModule.md#lengthbytesutf8)
  - [locateFile()?](QuickJSEmscriptenModule.md#locatefile)
  - [monitorRunDependencies()?](QuickJSEmscriptenModule.md#monitorrundependencies)
  - [stringToUTF8()](QuickJSEmscriptenModule.md#stringtoutf8)

## Extends

- [`EmscriptenModule`](EmscriptenModule.md)

## Properties

### HEAPU8

> **HEAPU8**: `Uint8Array`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.HEAPU8`](EmscriptenModule.md#heapu8)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:162](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L162)

***

### callbacks

> **callbacks**: `EmscriptenModuleCallbacks`

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:239](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L239)

***

### type

> **type**: `"sync"`

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:238](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L238)

***

### wasmBinary?

> **wasmBinary**?: `ArrayBuffer`

Compile this to WebAssembly.Module

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.wasmBinary`](EmscriptenModule.md#wasmbinary)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:104](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L104)

***

### wasmMemory?

> **wasmMemory**?: `Memory`

If provided, use this WebAssembly.Memory instead of an automatically created one.

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.wasmMemory`](EmscriptenModule.md#wasmmemory)

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

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.UTF8ToString`](EmscriptenModule.md#utf8tostring)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:144](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L144)

***

### \_free()

> **\_free**(`ptr`): `void`

#### Parameters

• **ptr**: `number`

#### Returns

`void`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule._free`](EmscriptenModule.md#free)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:148](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L148)

***

### \_malloc()

> **\_malloc**(`size`): `number`

#### Parameters

• **size**: `number`

#### Returns

`number`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule._malloc`](EmscriptenModule.md#malloc)

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

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.cwrap`](EmscriptenModule.md#cwrap)

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

##### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.getValue`](EmscriptenModule.md#getvalue)

##### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:155](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L155)

#### getValue(ptr, type)

> **getValue**(`ptr`, `type`): `bigint`

##### Parameters

• **ptr**: `number`

• **type**: `"i64"`

##### Returns

`bigint`

##### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.getValue`](EmscriptenModule.md#getvalue)

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

[`@jitl/quickjs-ffi-types.EmscriptenModule.instantiateWasm`](EmscriptenModule.md#instantiatewasm)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:110](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L110)

***

### lengthBytesUTF8()

> **lengthBytesUTF8**(`str`): `number`

#### Parameters

• **str**: `string`

#### Returns

`number`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.lengthBytesUTF8`](EmscriptenModule.md#lengthbytesutf8)

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

[`@jitl/quickjs-ffi-types.EmscriptenModule.locateFile`](EmscriptenModule.md#locatefile)

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

[`@jitl/quickjs-ffi-types.EmscriptenModule.monitorRunDependencies`](EmscriptenModule.md#monitorrundependencies)

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

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.stringToUTF8`](EmscriptenModule.md#stringtoutf8)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:139](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L139)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
