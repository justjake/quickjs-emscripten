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
  - [HEAP16](EmscriptenModule.md#heap16)
  - [HEAP32](EmscriptenModule.md#heap32)
  - [HEAP8](EmscriptenModule.md#heap8)
  - [HEAPF32](EmscriptenModule.md#heapf32)
  - [HEAPF64](EmscriptenModule.md#heapf64)
  - [HEAPU16](EmscriptenModule.md#heapu16)
  - [HEAPU32](EmscriptenModule.md#heapu32)
  - [HEAPU8](EmscriptenModule.md#heapu8)
  - [TOTAL\_MEMORY](EmscriptenModule.md#total-memory)
  - [TOTAL\_STACK](EmscriptenModule.md#total-stack)
  - [wasmBinary?](EmscriptenModule.md#wasmbinary)
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

[packages/quickjs-ffi-types/src/emscripten-types.ts:142](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L142)

***

### HEAP16

> **HEAP16**: `Int16Array`

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:132](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L132)

***

### HEAP32

> **HEAP32**: `Int32Array`

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:133](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L133)

***

### HEAP8

> **HEAP8**: `Int8Array`

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:131](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L131)

***

### HEAPF32

> **HEAPF32**: `Float32Array`

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:137](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L137)

***

### HEAPF64

> **HEAPF64**: `Float64Array`

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:138](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L138)

***

### HEAPU16

> **HEAPU16**: `Uint16Array`

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:135](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L135)

***

### HEAPU32

> **HEAPU32**: `Uint32Array`

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:136](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L136)

***

### HEAPU8

> **HEAPU8**: `Uint8Array`

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:134](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L134)

***

### TOTAL\_MEMORY

> **TOTAL\_MEMORY**: `number`

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:141](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L141)

***

### TOTAL\_STACK

> **TOTAL\_STACK**: `number`

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:140](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L140)

***

### wasmBinary?

> **wasmBinary**?: `ArrayBuffer`

Compile this to WebAssembly.Module

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModuleLoaderOptions.wasmBinary`](EmscriptenModuleLoaderOptions.md#wasmbinary)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:81](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L81)

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

[packages/quickjs-ffi-types/src/emscripten-types.ts:118](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L118)

***

### \_free()

> **\_free**(`ptr`): `void`

#### Parameters

• **ptr**: `number`

#### Returns

`void`

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:122](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L122)

***

### \_malloc()

> **\_malloc**(`size`): `number`

#### Parameters

• **size**: `number`

#### Returns

`number`

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:121](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L121)

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

[packages/quickjs-ffi-types/src/emscripten-types.ts:123](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L123)

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

[packages/quickjs-ffi-types/src/emscripten-types.ts:84](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L84)

***

### lengthBytesUTF8()

> **lengthBytesUTF8**(`str`): `number`

#### Parameters

• **str**: `string`

#### Returns

`number`

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:119](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L119)

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

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModuleLoaderOptions.locateFile`](EmscriptenModuleLoaderOptions.md#locatefile)

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

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModuleLoaderOptions.monitorRunDependencies`](EmscriptenModuleLoaderOptions.md#monitorrundependencies)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:90](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L90)

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

[packages/quickjs-ffi-types/src/emscripten-types.ts:113](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L113)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
