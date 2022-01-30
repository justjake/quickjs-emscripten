[quickjs-emscripten](../README.md) / [Exports](../modules.md) / [vm-interface](../modules/vm_interface.md) / VmPropertyDescriptor

# Interface: VmPropertyDescriptor<VmHandle\>

[vm-interface](../modules/vm_interface.md).VmPropertyDescriptor

From https://www.figma.com/blog/how-we-built-the-figma-plugin-system/

## Type parameters

| Name |
| :------ |
| `VmHandle` |

## Table of contents

### Properties

- [configurable](vm_interface.VmPropertyDescriptor.md#configurable)
- [enumerable](vm_interface.VmPropertyDescriptor.md#enumerable)
- [value](vm_interface.VmPropertyDescriptor.md#value)

### Methods

- [get](vm_interface.VmPropertyDescriptor.md#get)
- [set](vm_interface.VmPropertyDescriptor.md#set)

## Properties

### configurable

• `Optional` **configurable**: `boolean`

#### Defined in

[vm-interface.ts:77](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm-interface.ts#L77)

___

### enumerable

• `Optional` **enumerable**: `boolean`

#### Defined in

[vm-interface.ts:78](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm-interface.ts#L78)

___

### value

• `Optional` **value**: `VmHandle`

#### Defined in

[vm-interface.ts:76](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm-interface.ts#L76)

## Methods

### get

▸ `Optional` **get**(): `VmHandle`

#### Returns

`VmHandle`

#### Defined in

[vm-interface.ts:79](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm-interface.ts#L79)

___

### set

▸ `Optional` **set**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `VmHandle` |

#### Returns

`void`

#### Defined in

[vm-interface.ts:80](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm-interface.ts#L80)
