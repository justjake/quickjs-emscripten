[quickjs-emscripten](../../../packages.md) • **@jitl/quickjs-ffi-types** • [Readme](../index.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../../packages.md) / [@jitl/quickjs-ffi-types](../exports.md) / QuickJSAsyncEmscriptenModule

# Interface: QuickJSAsyncEmscriptenModule

Typings for the features we use to interface with our Emscripten build of
QuickJS.

## Contents

- [Extends](QuickJSAsyncEmscriptenModule.md#extends)
- [Properties](QuickJSAsyncEmscriptenModule.md#properties)
  - [FAST\_MEMORY](QuickJSAsyncEmscriptenModule.md#fast-memory)
  - [HEAP16](QuickJSAsyncEmscriptenModule.md#heap16)
  - [HEAP32](QuickJSAsyncEmscriptenModule.md#heap32)
  - [HEAP8](QuickJSAsyncEmscriptenModule.md#heap8)
  - [HEAPF32](QuickJSAsyncEmscriptenModule.md#heapf32)
  - [HEAPF64](QuickJSAsyncEmscriptenModule.md#heapf64)
  - [HEAPU16](QuickJSAsyncEmscriptenModule.md#heapu16)
  - [HEAPU32](QuickJSAsyncEmscriptenModule.md#heapu32)
  - [HEAPU8](QuickJSAsyncEmscriptenModule.md#heapu8)
  - [TOTAL\_MEMORY](QuickJSAsyncEmscriptenModule.md#total-memory)
  - [TOTAL\_STACK](QuickJSAsyncEmscriptenModule.md#total-stack)
  - [callbacks](QuickJSAsyncEmscriptenModule.md#callbacks)
  - [type](QuickJSAsyncEmscriptenModule.md#type)
- [Methods](QuickJSAsyncEmscriptenModule.md#methods)
  - [UTF8ToString()](QuickJSAsyncEmscriptenModule.md#utf8tostring)
  - [\_free()](QuickJSAsyncEmscriptenModule.md#free)
  - [\_malloc()](QuickJSAsyncEmscriptenModule.md#malloc)
  - [cwrap()](QuickJSAsyncEmscriptenModule.md#cwrap)
  - [lengthBytesUTF8()](QuickJSAsyncEmscriptenModule.md#lengthbytesutf8)
  - [stringToUTF8()](QuickJSAsyncEmscriptenModule.md#stringtoutf8)

## Extends

- [`EmscriptenModule`](EmscriptenModule.md)

## Properties

### FAST\_MEMORY

> **FAST\_MEMORY**: `number`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.FAST_MEMORY`](EmscriptenModule.md#fast-memory)

#### Source

[emscripten-types.ts:87](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L87)

***

### HEAP16

> **HEAP16**: `Int16Array`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.HEAP16`](EmscriptenModule.md#heap16)

#### Source

[emscripten-types.ts:77](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L77)

***

### HEAP32

> **HEAP32**: `Int32Array`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.HEAP32`](EmscriptenModule.md#heap32)

#### Source

[emscripten-types.ts:78](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L78)

***

### HEAP8

> **HEAP8**: `Int8Array`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.HEAP8`](EmscriptenModule.md#heap8)

#### Source

[emscripten-types.ts:76](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L76)

***

### HEAPF32

> **HEAPF32**: `Float32Array`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.HEAPF32`](EmscriptenModule.md#heapf32)

#### Source

[emscripten-types.ts:82](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L82)

***

### HEAPF64

> **HEAPF64**: `Float64Array`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.HEAPF64`](EmscriptenModule.md#heapf64)

#### Source

[emscripten-types.ts:83](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L83)

***

### HEAPU16

> **HEAPU16**: `Uint16Array`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.HEAPU16`](EmscriptenModule.md#heapu16)

#### Source

[emscripten-types.ts:80](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L80)

***

### HEAPU32

> **HEAPU32**: `Uint32Array`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.HEAPU32`](EmscriptenModule.md#heapu32)

#### Source

[emscripten-types.ts:81](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L81)

***

### HEAPU8

> **HEAPU8**: `Uint8Array`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.HEAPU8`](EmscriptenModule.md#heapu8)

#### Source

[emscripten-types.ts:79](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L79)

***

### TOTAL\_MEMORY

> **TOTAL\_MEMORY**: `number`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.TOTAL_MEMORY`](EmscriptenModule.md#total-memory)

#### Source

[emscripten-types.ts:86](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L86)

***

### TOTAL\_STACK

> **TOTAL\_STACK**: `number`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.TOTAL_STACK`](EmscriptenModule.md#total-stack)

#### Source

[emscripten-types.ts:85](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L85)

***

### callbacks

> **callbacks**: `EmscriptenModuleCallbacks`

#### Source

[emscripten-types.ts:162](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L162)

***

### type

> **type**: `"async"`

#### Todo

Implement this field

#### Source

[emscripten-types.ts:161](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L161)

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

[emscripten-types.ts:63](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L63)

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

[emscripten-types.ts:67](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L67)

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

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.cwrap`](EmscriptenModule.md#cwrap)

#### Source

[emscripten-types.ts:68](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L68)

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

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.stringToUTF8`](EmscriptenModule.md#stringtoutf8)

#### Source

[emscripten-types.ts:58](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L58)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
