[quickjs-emscripten](../README.md) / [Exports](../modules.md) / [vm-interface](../modules/vm_interface.md) / LowLevelJavascriptVm

# Interface: LowLevelJavascriptVm<VmHandle\>

[vm-interface](../modules/vm_interface.md).LowLevelJavascriptVm

A minimal interface to a Javascript execution environment.

Higher-level tools should build over the LowLevelJavascriptVm interface to
share as much as possible between executors.

From https://www.figma.com/blog/how-we-built-the-figma-plugin-system/

## Type parameters

| Name |
| :------ |
| `VmHandle` |

## Implemented by

- [`QuickJSVm`](../classes/quickjsvm.QuickJSVm.md)

## Table of contents

### Properties

- [global](vm_interface.LowLevelJavascriptVm.md#global)
- [undefined](vm_interface.LowLevelJavascriptVm.md#undefined)

### Methods

- [callFunction](vm_interface.LowLevelJavascriptVm.md#callfunction)
- [defineProp](vm_interface.LowLevelJavascriptVm.md#defineprop)
- [evalCode](vm_interface.LowLevelJavascriptVm.md#evalcode)
- [getNumber](vm_interface.LowLevelJavascriptVm.md#getnumber)
- [getProp](vm_interface.LowLevelJavascriptVm.md#getprop)
- [getString](vm_interface.LowLevelJavascriptVm.md#getstring)
- [newFunction](vm_interface.LowLevelJavascriptVm.md#newfunction)
- [newNumber](vm_interface.LowLevelJavascriptVm.md#newnumber)
- [newObject](vm_interface.LowLevelJavascriptVm.md#newobject)
- [newString](vm_interface.LowLevelJavascriptVm.md#newstring)
- [setProp](vm_interface.LowLevelJavascriptVm.md#setprop)
- [typeof](vm_interface.LowLevelJavascriptVm.md#typeof)

## Properties

### global

• **global**: `VmHandle`

#### Defined in

[vm-interface.ts:46](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm-interface.ts#L46)

___

### undefined

• **undefined**: `VmHandle`

#### Defined in

[vm-interface.ts:47](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm-interface.ts#L47)

## Methods

### callFunction

▸ **callFunction**(`func`, `thisVal`, ...`args`): [`VmCallResult`](../modules/vm_interface.md#vmcallresult)<`VmHandle`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `func` | `VmHandle` |
| `thisVal` | `VmHandle` |
| `...args` | `VmHandle`[] |

#### Returns

[`VmCallResult`](../modules/vm_interface.md#vmcallresult)<`VmHandle`\>

#### Defined in

[vm-interface.ts:68](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm-interface.ts#L68)

___

### defineProp

▸ **defineProp**(`handle`, `key`, `descriptor`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `handle` | `VmHandle` |
| `key` | `string` \| `VmHandle` |
| `descriptor` | [`VmPropertyDescriptor`](vm_interface.VmPropertyDescriptor.md)<`VmHandle`\> |

#### Returns

`void`

#### Defined in

[vm-interface.ts:62](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm-interface.ts#L62)

___

### evalCode

▸ **evalCode**(`code`, `filename?`): [`VmCallResult`](../modules/vm_interface.md#vmcallresult)<`VmHandle`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `string` |
| `filename?` | `string` |

#### Returns

[`VmCallResult`](../modules/vm_interface.md#vmcallresult)<`VmHandle`\>

#### Defined in

[vm-interface.ts:69](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm-interface.ts#L69)

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

[vm-interface.ts:51](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm-interface.ts#L51)

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

[vm-interface.ts:60](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm-interface.ts#L60)

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

[vm-interface.ts:52](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm-interface.ts#L52)

___

### newFunction

▸ **newFunction**(`name`, `value`): `VmHandle`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `value` | [`VmFunctionImplementation`](../modules/vm_interface.md#vmfunctionimplementation)<`VmHandle`\> |

#### Returns

`VmHandle`

#### Defined in

[vm-interface.ts:57](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm-interface.ts#L57)

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

[vm-interface.ts:54](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm-interface.ts#L54)

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

[vm-interface.ts:56](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm-interface.ts#L56)

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

[vm-interface.ts:55](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm-interface.ts#L55)

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

[vm-interface.ts:61](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm-interface.ts#L61)

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

[vm-interface.ts:49](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm-interface.ts#L49)
