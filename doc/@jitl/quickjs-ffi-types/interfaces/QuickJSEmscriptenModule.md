[quickjs-emscripten](../../../packages.md) • **@jitl/quickjs-ffi-types** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../../packages.md) / [@jitl/quickjs-ffi-types](../exports.md) / QuickJSEmscriptenModule

# Interface: QuickJSEmscriptenModule

Typings for the features we use to interface with our Emscripten build of
QuickJS.

## Contents

- [Extends](QuickJSEmscriptenModule.md#extends)
- [Properties](QuickJSEmscriptenModule.md#properties)
  - [FAST\_MEMORY](QuickJSEmscriptenModule.md#fast-memory)
  - [HEAP16](QuickJSEmscriptenModule.md#heap16)
  - [HEAP32](QuickJSEmscriptenModule.md#heap32)
  - [HEAP8](QuickJSEmscriptenModule.md#heap8)
  - [HEAPF32](QuickJSEmscriptenModule.md#heapf32)
  - [HEAPF64](QuickJSEmscriptenModule.md#heapf64)
  - [HEAPU16](QuickJSEmscriptenModule.md#heapu16)
  - [HEAPU32](QuickJSEmscriptenModule.md#heapu32)
  - [HEAPU8](QuickJSEmscriptenModule.md#heapu8)
  - [TOTAL\_MEMORY](QuickJSEmscriptenModule.md#total-memory)
  - [TOTAL\_STACK](QuickJSEmscriptenModule.md#total-stack)
  - [callbacks](QuickJSEmscriptenModule.md#callbacks)
  - [type](QuickJSEmscriptenModule.md#type)
  - [wasmBinary?](QuickJSEmscriptenModule.md#wasmbinary)
  - [wasmMemory?](QuickJSEmscriptenModule.md#wasmmemory)
- [Methods](QuickJSEmscriptenModule.md#methods)
  - [UTF8ToString()](QuickJSEmscriptenModule.md#utf8tostring)
  - [\_free()](QuickJSEmscriptenModule.md#free)
  - [\_malloc()](QuickJSEmscriptenModule.md#malloc)
  - [cwrap()](QuickJSEmscriptenModule.md#cwrap)
  - [instantiateWasm()?](QuickJSEmscriptenModule.md#instantiatewasm)
  - [lengthBytesUTF8()](QuickJSEmscriptenModule.md#lengthbytesutf8)
  - [locateFile()?](QuickJSEmscriptenModule.md#locatefile)
  - [monitorRunDependencies()?](QuickJSEmscriptenModule.md#monitorrundependencies)
  - [stringToUTF8()](QuickJSEmscriptenModule.md#stringtoutf8)

## Extends

- [`EmscriptenModule`](EmscriptenModule.md)

## Properties

### FAST\_MEMORY

> **FAST\_MEMORY**: `number`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.FAST_MEMORY`](EmscriptenModule.md#fast-memory)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:168](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L168)

***

### HEAP16

> **HEAP16**: `Int16Array`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.HEAP16`](EmscriptenModule.md#heap16)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:158](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L158)

***

### HEAP32

> **HEAP32**: `Int32Array`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.HEAP32`](EmscriptenModule.md#heap32)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:159](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L159)

***

### HEAP8

> **HEAP8**: `Int8Array`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.HEAP8`](EmscriptenModule.md#heap8)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:157](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L157)

***

### HEAPF32

> **HEAPF32**: `Float32Array`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.HEAPF32`](EmscriptenModule.md#heapf32)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:163](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L163)

***

### HEAPF64

> **HEAPF64**: `Float64Array`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.HEAPF64`](EmscriptenModule.md#heapf64)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:164](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L164)

***

### HEAPU16

> **HEAPU16**: `Uint16Array`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.HEAPU16`](EmscriptenModule.md#heapu16)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:161](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L161)

***

### HEAPU32

> **HEAPU32**: `Uint32Array`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.HEAPU32`](EmscriptenModule.md#heapu32)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:162](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L162)

***

### HEAPU8

> **HEAPU8**: `Uint8Array`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.HEAPU8`](EmscriptenModule.md#heapu8)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:160](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L160)

***

### TOTAL\_MEMORY

> **TOTAL\_MEMORY**: `number`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.TOTAL_MEMORY`](EmscriptenModule.md#total-memory)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:167](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L167)

***

### TOTAL\_STACK

> **TOTAL\_STACK**: `number`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.TOTAL_STACK`](EmscriptenModule.md#total-stack)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:166](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L166)

***

### callbacks

> **callbacks**: `EmscriptenModuleCallbacks`

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:237](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L237)

***

### type

> **type**: `"sync"`

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:236](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L236)

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
