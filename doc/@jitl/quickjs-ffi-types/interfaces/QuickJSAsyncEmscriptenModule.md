[quickjs-emscripten](../../../packages.md) • **@jitl/quickjs-ffi-types** • [Readme](../README.md) \| [Exports](../exports.md)

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
  - [wasmBinary?](QuickJSAsyncEmscriptenModule.md#wasmbinary)
- [Methods](QuickJSAsyncEmscriptenModule.md#methods)
  - [UTF8ToString()](QuickJSAsyncEmscriptenModule.md#utf8tostring)
  - [\_free()](QuickJSAsyncEmscriptenModule.md#free)
  - [\_malloc()](QuickJSAsyncEmscriptenModule.md#malloc)
  - [cwrap()](QuickJSAsyncEmscriptenModule.md#cwrap)
  - [instantiateWasm()?](QuickJSAsyncEmscriptenModule.md#instantiatewasm)
  - [lengthBytesUTF8()](QuickJSAsyncEmscriptenModule.md#lengthbytesutf8)
  - [locateFile()?](QuickJSAsyncEmscriptenModule.md#locatefile)
  - [monitorRunDependencies()?](QuickJSAsyncEmscriptenModule.md#monitorrundependencies)
  - [stringToUTF8()](QuickJSAsyncEmscriptenModule.md#stringtoutf8)

## Extends

- [`EmscriptenModule`](EmscriptenModule.md)

## Properties

### FAST\_MEMORY

> **FAST\_MEMORY**: `number`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.FAST_MEMORY`](EmscriptenModule.md#fast-memory)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:142](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L142)

***

### HEAP16

> **HEAP16**: `Int16Array`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.HEAP16`](EmscriptenModule.md#heap16)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:132](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L132)

***

### HEAP32

> **HEAP32**: `Int32Array`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.HEAP32`](EmscriptenModule.md#heap32)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:133](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L133)

***

### HEAP8

> **HEAP8**: `Int8Array`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.HEAP8`](EmscriptenModule.md#heap8)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:131](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L131)

***

### HEAPF32

> **HEAPF32**: `Float32Array`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.HEAPF32`](EmscriptenModule.md#heapf32)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:137](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L137)

***

### HEAPF64

> **HEAPF64**: `Float64Array`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.HEAPF64`](EmscriptenModule.md#heapf64)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:138](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L138)

***

### HEAPU16

> **HEAPU16**: `Uint16Array`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.HEAPU16`](EmscriptenModule.md#heapu16)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:135](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L135)

***

### HEAPU32

> **HEAPU32**: `Uint32Array`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.HEAPU32`](EmscriptenModule.md#heapu32)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:136](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L136)

***

### HEAPU8

> **HEAPU8**: `Uint8Array`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.HEAPU8`](EmscriptenModule.md#heapu8)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:134](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L134)

***

### TOTAL\_MEMORY

> **TOTAL\_MEMORY**: `number`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.TOTAL_MEMORY`](EmscriptenModule.md#total-memory)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:141](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L141)

***

### TOTAL\_STACK

> **TOTAL\_STACK**: `number`

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.TOTAL_STACK`](EmscriptenModule.md#total-stack)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:140](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L140)

***

### callbacks

> **callbacks**: `EmscriptenModuleCallbacks`

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:217](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L217)

***

### type

> **type**: `"async"`

#### Todo

Implement this field

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:216](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L216)

***

### wasmBinary?

> **wasmBinary**?: `ArrayBuffer`

Compile this to WebAssembly.Module

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.wasmBinary`](EmscriptenModule.md#wasmbinary)

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

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.UTF8ToString`](EmscriptenModule.md#utf8tostring)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:118](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L118)

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

[packages/quickjs-ffi-types/src/emscripten-types.ts:122](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L122)

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

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.cwrap`](EmscriptenModule.md#cwrap)

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

[`@jitl/quickjs-ffi-types.EmscriptenModule.instantiateWasm`](EmscriptenModule.md#instantiatewasm)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:84](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L84)

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

[`@jitl/quickjs-ffi-types.EmscriptenModule.locateFile`](EmscriptenModule.md#locatefile)

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

[`@jitl/quickjs-ffi-types.EmscriptenModule.monitorRunDependencies`](EmscriptenModule.md#monitorrundependencies)

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

#### Inherited from

[`@jitl/quickjs-ffi-types.EmscriptenModule.stringToUTF8`](EmscriptenModule.md#stringtoutf8)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:113](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L113)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
