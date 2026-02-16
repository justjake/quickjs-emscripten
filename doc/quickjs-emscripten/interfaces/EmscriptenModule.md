[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../README.md) / EmscriptenModule

# Interface: EmscriptenModule

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:268

Typings for the features we use to interface with our Emscripten build of
QuickJS.

* [Extends](#extends)

* [Extended by](#extended-by)

* [Properties](#properties)

  * [FAST\_MEMORY](#fast_memory)
  * [HEAP16](#heap16)
  * [HEAP32](#heap32)
  * [HEAP8](#heap8)
  * [HEAPF32](#heapf32)
  * [HEAPF64](#heapf64)
  * [HEAPU16](#heapu16)
  * [HEAPU32](#heapu32)
  * [HEAPU8](#heapu8)
  * [TOTAL\_MEMORY](#total_memory)
  * [TOTAL\_STACK](#total_stack)
  * [wasmBinary?](#wasmbinary)
  * [wasmMemory?](#wasmmemory)

* [Methods](#methods)

  * [\_free()](#_free)
  * [\_malloc()](#_malloc)
  * [cwrap()](#cwrap)
  * [instantiateWasm()?](#instantiatewasm)
  * [lengthBytesUTF8()](#lengthbytesutf8)
  * [locateFile()?](#locatefile)
  * [monitorRunDependencies()?](#monitorrundependencies)
  * [stringToUTF8()](#stringtoutf8)
  * [UTF8ToString()](#utf8tostring)

## Extends

* [`EmscriptenModuleLoaderOptions`](EmscriptenModuleLoaderOptions.md)

## Extended by

* [`QuickJSAsyncEmscriptenModule`](QuickJSAsyncEmscriptenModule.md)
* [`QuickJSEmscriptenModule`](QuickJSEmscriptenModule.md)

## Properties

### FAST\_MEMORY

> **FAST\_MEMORY**: `number`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:293

***

### HEAP16

> **HEAP16**: `Int16Array`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:284

***

### HEAP32

> **HEAP32**: `Int32Array`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:285

***

### HEAP8

> **HEAP8**: `Int8Array`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:283

***

### HEAPF32

> **HEAPF32**: `Float32Array`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:289

***

### HEAPF64

> **HEAPF64**: `Float64Array`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:290

***

### HEAPU16

> **HEAPU16**: `Uint16Array`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:287

***

### HEAPU32

> **HEAPU32**: `Uint32Array`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:288

***

### HEAPU8

> **HEAPU8**: `Uint8Array`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:286

***

### TOTAL\_MEMORY

> **TOTAL\_MEMORY**: `number`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:292

***

### TOTAL\_STACK

> **TOTAL\_STACK**: `number`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:291

***

### wasmBinary?

> `optional` **wasmBinary**: `ArrayBuffer`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:250

Compile this to WebAssembly.Module

#### Inherited from

[`EmscriptenModuleLoaderOptions`](EmscriptenModuleLoaderOptions.md).[`wasmBinary`](EmscriptenModuleLoaderOptions.md#wasmbinary)

***

### wasmMemory?

> `optional` **wasmMemory**: `Memory`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:252

If provided, use this WebAssembly.Memory instead of an automatically created one.

#### Inherited from

[`EmscriptenModuleLoaderOptions`](EmscriptenModuleLoaderOptions.md).[`wasmMemory`](EmscriptenModuleLoaderOptions.md#wasmmemory)

## Methods

### \_free()

> **\_free**(`ptr`): `void`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:281

#### Parameters

##### ptr

`number`

#### Returns

`void`

***

### \_malloc()

> **\_malloc**(`size`): `number`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:280

#### Parameters

##### size

`number`

#### Returns

`number`

***

### cwrap()

> **cwrap**(`ident`, `returnType`, `argTypes`, `opts?`): (...`args`) => `any`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:282

#### Parameters

##### ident

`string`

##### returnType

`ValueType` | `null`

##### argTypes

`ValueType`\[]

##### opts?

`CCallOpts`

#### Returns

> (...`args`): `any`

##### Parameters

###### args

...`any`\[]

##### Returns

`any`

***

### instantiateWasm()?

> `optional` **instantiateWasm**(`imports`, `onSuccess`): `Exports` | `Promise`<`Exports`>

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:254

Create an instance of the WASM module, call onSuccess(instance), then return instance.exports

#### Parameters

##### imports

`WebAssembly.Imports`

##### onSuccess

(`instance`) => `void`

#### Returns

`Exports` | `Promise`<`Exports`>

#### Inherited from

[`EmscriptenModuleLoaderOptions`](EmscriptenModuleLoaderOptions.md).[`instantiateWasm`](EmscriptenModuleLoaderOptions.md#instantiatewasm)

***

### lengthBytesUTF8()

> **lengthBytesUTF8**(`str`): `number`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:279

#### Parameters

##### str

`string`

#### Returns

`number`

***

### locateFile()?

> `optional` **locateFile**(`fileName`, `prefix`): `string`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:246

If set, this method will be called when the runtime needs to load a file,
such as a .wasm WebAssembly file, .mem memory init file, or a file
generated by the file packager.

The function receives two parameters:

* `fileName`, the relative path to the file as configured in build
  process, eg `"emscripten-module.wasm"`.
* `prefix` (path to the main JavaScript file’s directory). This may be `''`
  (empty string) in some cases if the Emscripten Javascript code can't locate
  itself. Try logging it in your environment.

It should return the actual URI or path to the requested file.

This lets you host file packages on a different location than the directory
of the JavaScript file (which is the default expectation), for example if
you want to host them on a CDN.

#### Parameters

##### fileName

`string`

##### prefix

`string`

Often `''` (empty string)

#### Returns

`string`

#### Inherited from

[`EmscriptenModuleLoaderOptions`](EmscriptenModuleLoaderOptions.md).[`locateFile`](EmscriptenModuleLoaderOptions.md#locatefile)

***

### monitorRunDependencies()?

> `optional` **monitorRunDependencies**(`left`): `void`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:256

Called by emscripten as dependencies blocking initialization are added or fulfilled. May only be called in debug builds.

#### Parameters

##### left

`number`

#### Returns

`void`

#### Inherited from

[`EmscriptenModuleLoaderOptions`](EmscriptenModuleLoaderOptions.md).[`monitorRunDependencies`](EmscriptenModuleLoaderOptions.md#monitorrundependencies)

***

### stringToUTF8()

> **stringToUTF8**(`str`, `outPtr`, `maxBytesToRead?`): `void`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:273

Write JS `str` to HeapChar pointer.
https://emscripten.org/docs/api\_reference/preamble.js.html#stringToUTF8

#### Parameters

##### str

`string`

##### outPtr

[`OwnedHeapCharPointer`](../type-aliases/OwnedHeapCharPointer.md)

##### maxBytesToRead?

`number`

#### Returns

`void`

***

### UTF8ToString()

> **UTF8ToString**(`ptr`, `maxBytesToRead?`): `string`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:278

HeapChar to JS string.
https://emscripten.org/docs/api\_reference/preamble.js.html#UTF8ToString

#### Parameters

##### ptr

[`BorrowedHeapCharPointer`](../type-aliases/BorrowedHeapCharPointer.md)

##### maxBytesToRead?

`number`

#### Returns

`string`
