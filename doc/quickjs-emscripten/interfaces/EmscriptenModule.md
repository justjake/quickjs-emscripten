[quickjs-emscripten](../../packages.md) • **quickjs-emscripten** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../exports.md) / EmscriptenModule

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

packages/quickjs-ffi-types/dist/index.d.ts:261

***

### HEAP16

> **HEAP16**: `Int16Array`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:252

***

### HEAP32

> **HEAP32**: `Int32Array`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:253

***

### HEAP8

> **HEAP8**: `Int8Array`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:251

***

### HEAPF32

> **HEAPF32**: `Float32Array`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:257

***

### HEAPF64

> **HEAPF64**: `Float64Array`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:258

***

### HEAPU16

> **HEAPU16**: `Uint16Array`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:255

***

### HEAPU32

> **HEAPU32**: `Uint32Array`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:256

***

### HEAPU8

> **HEAPU8**: `Uint8Array`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:254

***

### TOTAL\_MEMORY

> **TOTAL\_MEMORY**: `number`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:260

***

### TOTAL\_STACK

> **TOTAL\_STACK**: `number`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:259

***

### wasmBinary?

> **wasmBinary**?: `ArrayBuffer`

Compile this to WebAssembly.Module

#### Inherited from

[`quickjs-emscripten.EmscriptenModuleLoaderOptions.wasmBinary`](EmscriptenModuleLoaderOptions.md#wasmbinary)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:218

***

### wasmMemory?

> **wasmMemory**?: `Memory`

If provided, use this WebAssembly.Memory instead of an automatically created one.

#### Inherited from

[`quickjs-emscripten.EmscriptenModuleLoaderOptions.wasmMemory`](EmscriptenModuleLoaderOptions.md#wasmmemory)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:220

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

packages/quickjs-ffi-types/dist/index.d.ts:246

***

### \_free()

> **\_free**(`ptr`): `void`

#### Parameters

• **ptr**: `number`

#### Returns

`void`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:249

***

### \_malloc()

> **\_malloc**(`size`): `number`

#### Parameters

• **size**: `number`

#### Returns

`number`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:248

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

packages/quickjs-ffi-types/dist/index.d.ts:250

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

[`quickjs-emscripten.EmscriptenModuleLoaderOptions.instantiateWasm`](EmscriptenModuleLoaderOptions.md#instantiatewasm)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:222

***

### lengthBytesUTF8()

> **lengthBytesUTF8**(`str`): `number`

#### Parameters

• **str**: `string`

#### Returns

`number`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:247

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

[`quickjs-emscripten.EmscriptenModuleLoaderOptions.locateFile`](EmscriptenModuleLoaderOptions.md#locatefile)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:214

***

### monitorRunDependencies()?

> **`optional`** **monitorRunDependencies**(`left`): `void`

Called by emscripten as dependencies blocking initialization are added or fulfilled. May only be called in debug builds.

#### Parameters

• **left**: `number`

#### Returns

`void`

#### Inherited from

[`quickjs-emscripten.EmscriptenModuleLoaderOptions.monitorRunDependencies`](EmscriptenModuleLoaderOptions.md#monitorrundependencies)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:224

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

packages/quickjs-ffi-types/dist/index.d.ts:241

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
