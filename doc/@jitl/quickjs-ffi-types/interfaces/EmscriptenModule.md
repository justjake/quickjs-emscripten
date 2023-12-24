[quickjs-emscripten](../../../packages.md) • **@jitl/quickjs-ffi-types** • [Readme](../index.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../../packages.md) / [@jitl/quickjs-ffi-types](../exports.md) / EmscriptenModule

# Interface: EmscriptenModule

Typings for the features we use to interface with our Emscripten build of
QuickJS.

## Contents

- [Extended By](EmscriptenModule.md#extended-by)
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
- [Methods](EmscriptenModule.md#methods)
  - [UTF8ToString()](EmscriptenModule.md#utf8tostring)
  - [\_free()](EmscriptenModule.md#free)
  - [\_malloc()](EmscriptenModule.md#malloc)
  - [cwrap()](EmscriptenModule.md#cwrap)
  - [lengthBytesUTF8()](EmscriptenModule.md#lengthbytesutf8)
  - [stringToUTF8()](EmscriptenModule.md#stringtoutf8)

## Extended By

- [`QuickJSEmscriptenModule`](QuickJSEmscriptenModule.md)
- [`QuickJSAsyncEmscriptenModule`](QuickJSAsyncEmscriptenModule.md)

## Properties

### FAST\_MEMORY

> **FAST\_MEMORY**: `number`

#### Source

[emscripten-types.ts:87](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L87)

***

### HEAP16

> **HEAP16**: `Int16Array`

#### Source

[emscripten-types.ts:77](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L77)

***

### HEAP32

> **HEAP32**: `Int32Array`

#### Source

[emscripten-types.ts:78](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L78)

***

### HEAP8

> **HEAP8**: `Int8Array`

#### Source

[emscripten-types.ts:76](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L76)

***

### HEAPF32

> **HEAPF32**: `Float32Array`

#### Source

[emscripten-types.ts:82](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L82)

***

### HEAPF64

> **HEAPF64**: `Float64Array`

#### Source

[emscripten-types.ts:83](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L83)

***

### HEAPU16

> **HEAPU16**: `Uint16Array`

#### Source

[emscripten-types.ts:80](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L80)

***

### HEAPU32

> **HEAPU32**: `Uint32Array`

#### Source

[emscripten-types.ts:81](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L81)

***

### HEAPU8

> **HEAPU8**: `Uint8Array`

#### Source

[emscripten-types.ts:79](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L79)

***

### TOTAL\_MEMORY

> **TOTAL\_MEMORY**: `number`

#### Source

[emscripten-types.ts:86](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L86)

***

### TOTAL\_STACK

> **TOTAL\_STACK**: `number`

#### Source

[emscripten-types.ts:85](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L85)

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

[emscripten-types.ts:63](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L63)

***

### \_free()

> **\_free**(`ptr`): `void`

#### Parameters

• **ptr**: `number`

#### Returns

`void`

#### Source

[emscripten-types.ts:67](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L67)

***

### \_malloc()

> **\_malloc**(`size`): `number`

#### Parameters

• **size**: `number`

#### Returns

`number`

#### Source

[emscripten-types.ts:66](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L66)

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

[emscripten-types.ts:68](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L68)

***

### lengthBytesUTF8()

> **lengthBytesUTF8**(`str`): `number`

#### Parameters

• **str**: `string`

#### Returns

`number`

#### Source

[emscripten-types.ts:64](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L64)

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

[emscripten-types.ts:58](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L58)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
