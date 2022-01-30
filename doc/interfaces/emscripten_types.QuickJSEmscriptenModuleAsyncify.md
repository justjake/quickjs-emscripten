[quickjs-emscripten](../README.md) / [Exports](../modules.md) / [emscripten-types](../modules/emscripten_types.md) / QuickJSEmscriptenModuleAsyncify

# Interface: QuickJSEmscriptenModuleAsyncify

[emscripten-types](../modules/emscripten_types.md).QuickJSEmscriptenModuleAsyncify

## Hierarchy

- [`QuickJSEmscriptenModule`](emscripten_types.QuickJSEmscriptenModule.md)

  ↳ **`QuickJSEmscriptenModuleAsyncify`**

## Table of contents

### Properties

- [FAST\_MEMORY](emscripten_types.QuickJSEmscriptenModuleAsyncify.md#fast_memory)
- [HEAP16](emscripten_types.QuickJSEmscriptenModuleAsyncify.md#heap16)
- [HEAP32](emscripten_types.QuickJSEmscriptenModuleAsyncify.md#heap32)
- [HEAP8](emscripten_types.QuickJSEmscriptenModuleAsyncify.md#heap8)
- [HEAPF32](emscripten_types.QuickJSEmscriptenModuleAsyncify.md#heapf32)
- [HEAPF64](emscripten_types.QuickJSEmscriptenModuleAsyncify.md#heapf64)
- [HEAPU16](emscripten_types.QuickJSEmscriptenModuleAsyncify.md#heapu16)
- [HEAPU32](emscripten_types.QuickJSEmscriptenModuleAsyncify.md#heapu32)
- [HEAPU8](emscripten_types.QuickJSEmscriptenModuleAsyncify.md#heapu8)
- [TOTAL\_MEMORY](emscripten_types.QuickJSEmscriptenModuleAsyncify.md#total_memory)
- [TOTAL\_STACK](emscripten_types.QuickJSEmscriptenModuleAsyncify.md#total_stack)

### Methods

- [\_free](emscripten_types.QuickJSEmscriptenModuleAsyncify.md#_free)
- [\_malloc](emscripten_types.QuickJSEmscriptenModuleAsyncify.md#_malloc)
- [addFunction](emscripten_types.QuickJSEmscriptenModuleAsyncify.md#addfunction)
- [cwrap](emscripten_types.QuickJSEmscriptenModuleAsyncify.md#cwrap)
- [lengthBytesUTF8](emscripten_types.QuickJSEmscriptenModuleAsyncify.md#lengthbytesutf8)
- [removeFunction](emscripten_types.QuickJSEmscriptenModuleAsyncify.md#removefunction)
- [stringToUTF8](emscripten_types.QuickJSEmscriptenModuleAsyncify.md#stringtoutf8)

## Properties

### FAST\_MEMORY

• **FAST\_MEMORY**: `number`

#### Inherited from

[QuickJSEmscriptenModule](emscripten_types.QuickJSEmscriptenModule.md).[FAST_MEMORY](emscripten_types.QuickJSEmscriptenModule.md#fast_memory)

#### Defined in

[emscripten-types.ts:67](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L67)

___

### HEAP16

• **HEAP16**: `Int16Array`

#### Inherited from

[QuickJSEmscriptenModule](emscripten_types.QuickJSEmscriptenModule.md).[HEAP16](emscripten_types.QuickJSEmscriptenModule.md#heap16)

#### Defined in

[emscripten-types.ts:57](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L57)

___

### HEAP32

• **HEAP32**: `Int32Array`

#### Inherited from

[QuickJSEmscriptenModule](emscripten_types.QuickJSEmscriptenModule.md).[HEAP32](emscripten_types.QuickJSEmscriptenModule.md#heap32)

#### Defined in

[emscripten-types.ts:58](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L58)

___

### HEAP8

• **HEAP8**: `Int8Array`

#### Inherited from

[QuickJSEmscriptenModule](emscripten_types.QuickJSEmscriptenModule.md).[HEAP8](emscripten_types.QuickJSEmscriptenModule.md#heap8)

#### Defined in

[emscripten-types.ts:56](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L56)

___

### HEAPF32

• **HEAPF32**: `Float32Array`

#### Inherited from

[QuickJSEmscriptenModule](emscripten_types.QuickJSEmscriptenModule.md).[HEAPF32](emscripten_types.QuickJSEmscriptenModule.md#heapf32)

#### Defined in

[emscripten-types.ts:62](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L62)

___

### HEAPF64

• **HEAPF64**: `Float64Array`

#### Inherited from

[QuickJSEmscriptenModule](emscripten_types.QuickJSEmscriptenModule.md).[HEAPF64](emscripten_types.QuickJSEmscriptenModule.md#heapf64)

#### Defined in

[emscripten-types.ts:63](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L63)

___

### HEAPU16

• **HEAPU16**: `Uint16Array`

#### Inherited from

[QuickJSEmscriptenModule](emscripten_types.QuickJSEmscriptenModule.md).[HEAPU16](emscripten_types.QuickJSEmscriptenModule.md#heapu16)

#### Defined in

[emscripten-types.ts:60](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L60)

___

### HEAPU32

• **HEAPU32**: `Uint32Array`

#### Inherited from

[QuickJSEmscriptenModule](emscripten_types.QuickJSEmscriptenModule.md).[HEAPU32](emscripten_types.QuickJSEmscriptenModule.md#heapu32)

#### Defined in

[emscripten-types.ts:61](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L61)

___

### HEAPU8

• **HEAPU8**: `Uint8Array`

#### Inherited from

[QuickJSEmscriptenModule](emscripten_types.QuickJSEmscriptenModule.md).[HEAPU8](emscripten_types.QuickJSEmscriptenModule.md#heapu8)

#### Defined in

[emscripten-types.ts:59](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L59)

___

### TOTAL\_MEMORY

• **TOTAL\_MEMORY**: `number`

#### Inherited from

[QuickJSEmscriptenModule](emscripten_types.QuickJSEmscriptenModule.md).[TOTAL_MEMORY](emscripten_types.QuickJSEmscriptenModule.md#total_memory)

#### Defined in

[emscripten-types.ts:66](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L66)

___

### TOTAL\_STACK

• **TOTAL\_STACK**: `number`

#### Inherited from

[QuickJSEmscriptenModule](emscripten_types.QuickJSEmscriptenModule.md).[TOTAL_STACK](emscripten_types.QuickJSEmscriptenModule.md#total_stack)

#### Defined in

[emscripten-types.ts:65](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L65)

## Methods

### \_free

▸ **_free**(`ptr`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ptr` | `number` |

#### Returns

`void`

#### Inherited from

[QuickJSEmscriptenModule](emscripten_types.QuickJSEmscriptenModule.md).[_free](emscripten_types.QuickJSEmscriptenModule.md#_free)

#### Defined in

[emscripten-types.ts:47](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L47)

___

### \_malloc

▸ **_malloc**(`size`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `number` |

#### Returns

`number`

#### Inherited from

[QuickJSEmscriptenModule](emscripten_types.QuickJSEmscriptenModule.md).[_malloc](emscripten_types.QuickJSEmscriptenModule.md#_malloc)

#### Defined in

[emscripten-types.ts:46](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L46)

___

### addFunction

▸ **addFunction**(`fn`, `type`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | `Function` |
| `type` | `string` |

#### Returns

`number`

#### Inherited from

[QuickJSEmscriptenModule](emscripten_types.QuickJSEmscriptenModule.md).[addFunction](emscripten_types.QuickJSEmscriptenModule.md#addfunction)

#### Defined in

[emscripten-types.ts:41](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L41)

___

### cwrap

▸ **cwrap**(`ident`, `returnType`, `argTypes`, `opts?`): (...`args`: `any`[]) => `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ident` | `string` |
| `returnType` | ``null`` \| `ValueType` |
| `argTypes` | `ValueType`[] |
| `opts?` | `CCallOpts` |

#### Returns

`fn`

▸ (...`args`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

##### Returns

`any`

#### Inherited from

[QuickJSEmscriptenModule](emscripten_types.QuickJSEmscriptenModule.md).[cwrap](emscripten_types.QuickJSEmscriptenModule.md#cwrap)

#### Defined in

[emscripten-types.ts:48](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L48)

___

### lengthBytesUTF8

▸ **lengthBytesUTF8**(`str`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`number`

#### Inherited from

[QuickJSEmscriptenModule](emscripten_types.QuickJSEmscriptenModule.md).[lengthBytesUTF8](emscripten_types.QuickJSEmscriptenModule.md#lengthbytesutf8)

#### Defined in

[emscripten-types.ts:44](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L44)

___

### removeFunction

▸ **removeFunction**(`pointer`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pointer` | `number` |

#### Returns

`void`

#### Inherited from

[QuickJSEmscriptenModule](emscripten_types.QuickJSEmscriptenModule.md).[removeFunction](emscripten_types.QuickJSEmscriptenModule.md#removefunction)

#### Defined in

[emscripten-types.ts:42](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L42)

___

### stringToUTF8

▸ **stringToUTF8**(`str`, `outPtr`, `maxBytesToRead?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |
| `outPtr` | `number` |
| `maxBytesToRead?` | `number` |

#### Returns

`void`

#### Inherited from

[QuickJSEmscriptenModule](emscripten_types.QuickJSEmscriptenModule.md).[stringToUTF8](emscripten_types.QuickJSEmscriptenModule.md#stringtoutf8)

#### Defined in

[emscripten-types.ts:43](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L43)
