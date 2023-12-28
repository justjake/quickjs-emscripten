[quickjs-emscripten](../../packages.md) • **quickjs-emscripten** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../exports.md) / QuickJSEmscriptenModule

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

[`quickjs-emscripten.EmscriptenModule.FAST_MEMORY`](EmscriptenModule.md#fast-memory)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:204

***

### HEAP16

> **HEAP16**: `Int16Array`

#### Inherited from

[`quickjs-emscripten.EmscriptenModule.HEAP16`](EmscriptenModule.md#heap16)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:195

***

### HEAP32

> **HEAP32**: `Int32Array`

#### Inherited from

[`quickjs-emscripten.EmscriptenModule.HEAP32`](EmscriptenModule.md#heap32)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:196

***

### HEAP8

> **HEAP8**: `Int8Array`

#### Inherited from

[`quickjs-emscripten.EmscriptenModule.HEAP8`](EmscriptenModule.md#heap8)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:194

***

### HEAPF32

> **HEAPF32**: `Float32Array`

#### Inherited from

[`quickjs-emscripten.EmscriptenModule.HEAPF32`](EmscriptenModule.md#heapf32)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:200

***

### HEAPF64

> **HEAPF64**: `Float64Array`

#### Inherited from

[`quickjs-emscripten.EmscriptenModule.HEAPF64`](EmscriptenModule.md#heapf64)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:201

***

### HEAPU16

> **HEAPU16**: `Uint16Array`

#### Inherited from

[`quickjs-emscripten.EmscriptenModule.HEAPU16`](EmscriptenModule.md#heapu16)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:198

***

### HEAPU32

> **HEAPU32**: `Uint32Array`

#### Inherited from

[`quickjs-emscripten.EmscriptenModule.HEAPU32`](EmscriptenModule.md#heapu32)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:199

***

### HEAPU8

> **HEAPU8**: `Uint8Array`

#### Inherited from

[`quickjs-emscripten.EmscriptenModule.HEAPU8`](EmscriptenModule.md#heapu8)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:197

***

### TOTAL\_MEMORY

> **TOTAL\_MEMORY**: `number`

#### Inherited from

[`quickjs-emscripten.EmscriptenModule.TOTAL_MEMORY`](EmscriptenModule.md#total-memory)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:203

***

### TOTAL\_STACK

> **TOTAL\_STACK**: `number`

#### Inherited from

[`quickjs-emscripten.EmscriptenModule.TOTAL_STACK`](EmscriptenModule.md#total-stack)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:202

***

### callbacks

> **callbacks**: `EmscriptenModuleCallbacks`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:240

***

### type

> **type**: `"sync"`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:239

***

### wasmBinary?

> **wasmBinary**?: `ArrayBuffer`

Compile this to WebAssembly.Module

#### Inherited from

[`quickjs-emscripten.EmscriptenModule.wasmBinary`](EmscriptenModule.md#wasmbinary)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:163

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

[`quickjs-emscripten.EmscriptenModule.UTF8ToString`](EmscriptenModule.md#utf8tostring)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:189

***

### \_free()

> **\_free**(`ptr`): `void`

#### Parameters

• **ptr**: `number`

#### Returns

`void`

#### Inherited from

[`quickjs-emscripten.EmscriptenModule._free`](EmscriptenModule.md#free)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:192

***

### \_malloc()

> **\_malloc**(`size`): `number`

#### Parameters

• **size**: `number`

#### Returns

`number`

#### Inherited from

[`quickjs-emscripten.EmscriptenModule._malloc`](EmscriptenModule.md#malloc)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:191

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

[`quickjs-emscripten.EmscriptenModule.cwrap`](EmscriptenModule.md#cwrap)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:193

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

[`quickjs-emscripten.EmscriptenModule.instantiateWasm`](EmscriptenModule.md#instantiatewasm)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:165

***

### lengthBytesUTF8()

> **lengthBytesUTF8**(`str`): `number`

#### Parameters

• **str**: `string`

#### Returns

`number`

#### Inherited from

[`quickjs-emscripten.EmscriptenModule.lengthBytesUTF8`](EmscriptenModule.md#lengthbytesutf8)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:190

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

[`quickjs-emscripten.EmscriptenModule.locateFile`](EmscriptenModule.md#locatefile)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:159

***

### monitorRunDependencies()?

> **`optional`** **monitorRunDependencies**(`left`): `void`

Called by emscripten as dependencies blocking initialization are added or fulfilled. May only be called in debug builds.

#### Parameters

• **left**: `number`

#### Returns

`void`

#### Inherited from

[`quickjs-emscripten.EmscriptenModule.monitorRunDependencies`](EmscriptenModule.md#monitorrundependencies)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:167

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

[`quickjs-emscripten.EmscriptenModule.stringToUTF8`](EmscriptenModule.md#stringtoutf8)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:184

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
