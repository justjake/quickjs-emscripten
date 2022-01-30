[quickjs-emscripten](../README.md) / [Exports](../modules.md) / [emscripten-types](../modules/emscripten_types.md) / QuickJSEmscriptenModule

# Interface: QuickJSEmscriptenModule

[emscripten-types](../modules/emscripten_types.md).QuickJSEmscriptenModule

## Hierarchy

- `EmscriptenModule`

  ↳ **`QuickJSEmscriptenModule`**

## Table of contents

### Properties

- [FAST\_MEMORY](emscripten_types.QuickJSEmscriptenModule.md#fast_memory)
- [HEAP16](emscripten_types.QuickJSEmscriptenModule.md#heap16)
- [HEAP32](emscripten_types.QuickJSEmscriptenModule.md#heap32)
- [HEAP8](emscripten_types.QuickJSEmscriptenModule.md#heap8)
- [HEAPF32](emscripten_types.QuickJSEmscriptenModule.md#heapf32)
- [HEAPF64](emscripten_types.QuickJSEmscriptenModule.md#heapf64)
- [HEAPU16](emscripten_types.QuickJSEmscriptenModule.md#heapu16)
- [HEAPU32](emscripten_types.QuickJSEmscriptenModule.md#heapu32)
- [HEAPU8](emscripten_types.QuickJSEmscriptenModule.md#heapu8)
- [TOTAL\_MEMORY](emscripten_types.QuickJSEmscriptenModule.md#total_memory)
- [TOTAL\_STACK](emscripten_types.QuickJSEmscriptenModule.md#total_stack)
- [type](emscripten_types.QuickJSEmscriptenModule.md#type)

### Methods

- [\_free](emscripten_types.QuickJSEmscriptenModule.md#_free)
- [\_malloc](emscripten_types.QuickJSEmscriptenModule.md#_malloc)
- [addFunction](emscripten_types.QuickJSEmscriptenModule.md#addfunction)
- [cwrap](emscripten_types.QuickJSEmscriptenModule.md#cwrap)
- [lengthBytesUTF8](emscripten_types.QuickJSEmscriptenModule.md#lengthbytesutf8)
- [removeFunction](emscripten_types.QuickJSEmscriptenModule.md#removefunction)
- [stringToUTF8](emscripten_types.QuickJSEmscriptenModule.md#stringtoutf8)

## Properties

### FAST\_MEMORY

• **FAST\_MEMORY**: `number`

#### Inherited from

EmscriptenModule.FAST\_MEMORY

#### Defined in

[emscripten-types.ts:67](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L67)

___

### HEAP16

• **HEAP16**: `Int16Array`

#### Inherited from

EmscriptenModule.HEAP16

#### Defined in

[emscripten-types.ts:57](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L57)

___

### HEAP32

• **HEAP32**: `Int32Array`

#### Inherited from

EmscriptenModule.HEAP32

#### Defined in

[emscripten-types.ts:58](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L58)

___

### HEAP8

• **HEAP8**: `Int8Array`

#### Inherited from

EmscriptenModule.HEAP8

#### Defined in

[emscripten-types.ts:56](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L56)

___

### HEAPF32

• **HEAPF32**: `Float32Array`

#### Inherited from

EmscriptenModule.HEAPF32

#### Defined in

[emscripten-types.ts:62](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L62)

___

### HEAPF64

• **HEAPF64**: `Float64Array`

#### Inherited from

EmscriptenModule.HEAPF64

#### Defined in

[emscripten-types.ts:63](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L63)

___

### HEAPU16

• **HEAPU16**: `Uint16Array`

#### Inherited from

EmscriptenModule.HEAPU16

#### Defined in

[emscripten-types.ts:60](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L60)

___

### HEAPU32

• **HEAPU32**: `Uint32Array`

#### Inherited from

EmscriptenModule.HEAPU32

#### Defined in

[emscripten-types.ts:61](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L61)

___

### HEAPU8

• **HEAPU8**: `Uint8Array`

#### Inherited from

EmscriptenModule.HEAPU8

#### Defined in

[emscripten-types.ts:59](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L59)

___

### TOTAL\_MEMORY

• **TOTAL\_MEMORY**: `number`

#### Inherited from

EmscriptenModule.TOTAL\_MEMORY

#### Defined in

[emscripten-types.ts:66](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L66)

___

### TOTAL\_STACK

• **TOTAL\_STACK**: `number`

#### Inherited from

EmscriptenModule.TOTAL\_STACK

#### Defined in

[emscripten-types.ts:65](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L65)

___

### type

• **type**: ``"sync"``

**`todo`** Implement this field

#### Defined in

[emscripten-types.ts:72](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L72)

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

EmscriptenModule.\_free

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

EmscriptenModule.\_malloc

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

EmscriptenModule.addFunction

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

EmscriptenModule.cwrap

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

EmscriptenModule.lengthBytesUTF8

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

EmscriptenModule.removeFunction

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

EmscriptenModule.stringToUTF8

#### Defined in

[emscripten-types.ts:43](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L43)
