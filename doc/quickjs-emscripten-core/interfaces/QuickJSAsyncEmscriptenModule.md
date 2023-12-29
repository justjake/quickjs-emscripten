[quickjs-emscripten](../../packages.md) • **quickjs-emscripten-core** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../exports.md) / QuickJSAsyncEmscriptenModule

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

[`quickjs-emscripten-core.EmscriptenModule.FAST_MEMORY`](EmscriptenModule.md#fast-memory)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:226

***

### HEAP16

> **HEAP16**: `Int16Array`

#### Inherited from

[`quickjs-emscripten-core.EmscriptenModule.HEAP16`](EmscriptenModule.md#heap16)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:217

***

### HEAP32

> **HEAP32**: `Int32Array`

#### Inherited from

[`quickjs-emscripten-core.EmscriptenModule.HEAP32`](EmscriptenModule.md#heap32)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:218

***

### HEAP8

> **HEAP8**: `Int8Array`

#### Inherited from

[`quickjs-emscripten-core.EmscriptenModule.HEAP8`](EmscriptenModule.md#heap8)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:216

***

### HEAPF32

> **HEAPF32**: `Float32Array`

#### Inherited from

[`quickjs-emscripten-core.EmscriptenModule.HEAPF32`](EmscriptenModule.md#heapf32)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:222

***

### HEAPF64

> **HEAPF64**: `Float64Array`

#### Inherited from

[`quickjs-emscripten-core.EmscriptenModule.HEAPF64`](EmscriptenModule.md#heapf64)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:223

***

### HEAPU16

> **HEAPU16**: `Uint16Array`

#### Inherited from

[`quickjs-emscripten-core.EmscriptenModule.HEAPU16`](EmscriptenModule.md#heapu16)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:220

***

### HEAPU32

> **HEAPU32**: `Uint32Array`

#### Inherited from

[`quickjs-emscripten-core.EmscriptenModule.HEAPU32`](EmscriptenModule.md#heapu32)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:221

***

### HEAPU8

> **HEAPU8**: `Uint8Array`

#### Inherited from

[`quickjs-emscripten-core.EmscriptenModule.HEAPU8`](EmscriptenModule.md#heapu8)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:219

***

### TOTAL\_MEMORY

> **TOTAL\_MEMORY**: `number`

#### Inherited from

[`quickjs-emscripten-core.EmscriptenModule.TOTAL_MEMORY`](EmscriptenModule.md#total-memory)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:225

***

### TOTAL\_STACK

> **TOTAL\_STACK**: `number`

#### Inherited from

[`quickjs-emscripten-core.EmscriptenModule.TOTAL_STACK`](EmscriptenModule.md#total-stack)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:224

***

### callbacks

> **callbacks**: `EmscriptenModuleCallbacks`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:267

***

### type

> **type**: `"async"`

#### Todo

Implement this field

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:266

***

### wasmBinary?

> **wasmBinary**?: `ArrayBuffer`

Compile this to WebAssembly.Module

#### Inherited from

[`quickjs-emscripten-core.EmscriptenModule.wasmBinary`](EmscriptenModule.md#wasmbinary)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:185

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

[`quickjs-emscripten-core.EmscriptenModule.UTF8ToString`](EmscriptenModule.md#utf8tostring)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:211

***

### \_free()

> **\_free**(`ptr`): `void`

#### Parameters

• **ptr**: `number`

#### Returns

`void`

#### Inherited from

[`quickjs-emscripten-core.EmscriptenModule._free`](EmscriptenModule.md#free)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:214

***

### \_malloc()

> **\_malloc**(`size`): `number`

#### Parameters

• **size**: `number`

#### Returns

`number`

#### Inherited from

[`quickjs-emscripten-core.EmscriptenModule._malloc`](EmscriptenModule.md#malloc)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:213

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

[`quickjs-emscripten-core.EmscriptenModule.cwrap`](EmscriptenModule.md#cwrap)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:215

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

[`quickjs-emscripten-core.EmscriptenModule.instantiateWasm`](EmscriptenModule.md#instantiatewasm)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:187

***

### lengthBytesUTF8()

> **lengthBytesUTF8**(`str`): `number`

#### Parameters

• **str**: `string`

#### Returns

`number`

#### Inherited from

[`quickjs-emscripten-core.EmscriptenModule.lengthBytesUTF8`](EmscriptenModule.md#lengthbytesutf8)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:212

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

[`quickjs-emscripten-core.EmscriptenModule.locateFile`](EmscriptenModule.md#locatefile)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:181

***

### monitorRunDependencies()?

> **`optional`** **monitorRunDependencies**(`left`): `void`

Called by emscripten as dependencies blocking initialization are added or fulfilled. May only be called in debug builds.

#### Parameters

• **left**: `number`

#### Returns

`void`

#### Inherited from

[`quickjs-emscripten-core.EmscriptenModule.monitorRunDependencies`](EmscriptenModule.md#monitorrundependencies)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:189

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

[`quickjs-emscripten-core.EmscriptenModule.stringToUTF8`](EmscriptenModule.md#stringtoutf8)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:206

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
