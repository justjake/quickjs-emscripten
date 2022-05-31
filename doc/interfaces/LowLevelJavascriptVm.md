[quickjs-emscripten](../README.md) / [Exports](../modules.md) / LowLevelJavascriptVm

# Interface: LowLevelJavascriptVm<VmHandle\>

A minimal interface to a Javascript execution environment.

Higher-level tools should build over the LowLevelJavascriptVm interface to
share as much as possible between executors.

From https://www.figma.com/blog/how-we-built-the-figma-plugin-system/

## Type parameters

| Name |
| :------ |
| `VmHandle` |

## Implemented by

- [`QuickJSContext`](../classes/QuickJSContext.md)

## Table of contents

### Properties

- [global](LowLevelJavascriptVm.md#global)
- [undefined](LowLevelJavascriptVm.md#undefined)

### Methods

- [callFunction](LowLevelJavascriptVm.md#callfunction)
- [defineProp](LowLevelJavascriptVm.md#defineprop)
- [evalCode](LowLevelJavascriptVm.md#evalcode)
- [getNumber](LowLevelJavascriptVm.md#getnumber)
- [getProp](LowLevelJavascriptVm.md#getprop)
- [getString](LowLevelJavascriptVm.md#getstring)
- [newFunction](LowLevelJavascriptVm.md#newfunction)
- [newNumber](LowLevelJavascriptVm.md#newnumber)
- [newObject](LowLevelJavascriptVm.md#newobject)
- [newString](LowLevelJavascriptVm.md#newstring)
- [setProp](LowLevelJavascriptVm.md#setprop)
- [typeof](LowLevelJavascriptVm.md#typeof)

## Properties

### global

• **global**: `VmHandle`

#### Defined in

[ts/vm-interface.ts:54](https://github.com/justjake/quickjs-emscripten/blob/main/ts/vm-interface.ts#L54)

___

### undefined

• **undefined**: `VmHandle`

#### Defined in

[ts/vm-interface.ts:55](https://github.com/justjake/quickjs-emscripten/blob/main/ts/vm-interface.ts#L55)

## Methods

### callFunction

▸ **callFunction**(`func`, `thisVal`, ...`args`): [`VmCallResult`](../modules.md#vmcallresult)<`VmHandle`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `func` | `VmHandle` |
| `thisVal` | `VmHandle` |
| `...args` | `VmHandle`[] |

#### Returns

[`VmCallResult`](../modules.md#vmcallresult)<`VmHandle`\>

#### Defined in

[ts/vm-interface.ts:76](https://github.com/justjake/quickjs-emscripten/blob/main/ts/vm-interface.ts#L76)

___

### defineProp

▸ **defineProp**(`handle`, `key`, `descriptor`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `handle` | `VmHandle` |
| `key` | `string` \| `VmHandle` |
| `descriptor` | [`VmPropertyDescriptor`](VmPropertyDescriptor.md)<`VmHandle`\> |

#### Returns

`void`

#### Defined in

[ts/vm-interface.ts:70](https://github.com/justjake/quickjs-emscripten/blob/main/ts/vm-interface.ts#L70)

___

### evalCode

▸ **evalCode**(`code`, `filename?`): [`VmCallResult`](../modules.md#vmcallresult)<`VmHandle`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `string` |
| `filename?` | `string` |

#### Returns

[`VmCallResult`](../modules.md#vmcallresult)<`VmHandle`\>

#### Defined in

[ts/vm-interface.ts:77](https://github.com/justjake/quickjs-emscripten/blob/main/ts/vm-interface.ts#L77)

___

### getNumber

▸ **getNumber**(`handle`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `handle` | `VmHandle` |

#### Returns

`number`

#### Defined in

[ts/vm-interface.ts:59](https://github.com/justjake/quickjs-emscripten/blob/main/ts/vm-interface.ts#L59)

___

### getProp

▸ **getProp**(`handle`, `key`): `VmHandle`

#### Parameters

| Name | Type |
| :------ | :------ |
| `handle` | `VmHandle` |
| `key` | `string` \| `VmHandle` |

#### Returns

`VmHandle`

#### Defined in

[ts/vm-interface.ts:68](https://github.com/justjake/quickjs-emscripten/blob/main/ts/vm-interface.ts#L68)

___

### getString

▸ **getString**(`handle`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `handle` | `VmHandle` |

#### Returns

`string`

#### Defined in

[ts/vm-interface.ts:60](https://github.com/justjake/quickjs-emscripten/blob/main/ts/vm-interface.ts#L60)

___

### newFunction

▸ **newFunction**(`name`, `value`): `VmHandle`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `value` | [`VmFunctionImplementation`](../modules.md#vmfunctionimplementation)<`VmHandle`\> |

#### Returns

`VmHandle`

#### Defined in

[ts/vm-interface.ts:65](https://github.com/justjake/quickjs-emscripten/blob/main/ts/vm-interface.ts#L65)

___

### newNumber

▸ **newNumber**(`value`): `VmHandle`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`VmHandle`

#### Defined in

[ts/vm-interface.ts:62](https://github.com/justjake/quickjs-emscripten/blob/main/ts/vm-interface.ts#L62)

___

### newObject

▸ **newObject**(`prototype?`): `VmHandle`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prototype?` | `VmHandle` |

#### Returns

`VmHandle`

#### Defined in

[ts/vm-interface.ts:64](https://github.com/justjake/quickjs-emscripten/blob/main/ts/vm-interface.ts#L64)

___

### newString

▸ **newString**(`value`): `VmHandle`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`VmHandle`

#### Defined in

[ts/vm-interface.ts:63](https://github.com/justjake/quickjs-emscripten/blob/main/ts/vm-interface.ts#L63)

___

### setProp

▸ **setProp**(`handle`, `key`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `handle` | `VmHandle` |
| `key` | `string` \| `VmHandle` |
| `value` | `VmHandle` |

#### Returns

`void`

#### Defined in

[ts/vm-interface.ts:69](https://github.com/justjake/quickjs-emscripten/blob/main/ts/vm-interface.ts#L69)

___

### typeof

▸ **typeof**(`handle`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `handle` | `VmHandle` |

#### Returns

`string`

#### Defined in

[ts/vm-interface.ts:57](https://github.com/justjake/quickjs-emscripten/blob/main/ts/vm-interface.ts#L57)
