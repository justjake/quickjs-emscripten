[quickjs-emscripten](../README.md) / [Exports](../modules.md) / VmPropertyDescriptor

# Interface: VmPropertyDescriptor<VmHandle\>

From https://www.figma.com/blog/how-we-built-the-figma-plugin-system/

## Type parameters

| Name |
| :------ |
| `VmHandle` |

## Table of contents

### Properties

- [configurable](VmPropertyDescriptor.md#configurable)
- [enumerable](VmPropertyDescriptor.md#enumerable)
- [value](VmPropertyDescriptor.md#value)

### Methods

- [get](VmPropertyDescriptor.md#get)
- [set](VmPropertyDescriptor.md#set)

## Properties

### configurable

• `Optional` **configurable**: `boolean`

#### Defined in

[ts/vm-interface.ts:85](https://github.com/justjake/quickjs-emscripten/blob/main/ts/vm-interface.ts#L85)

___

### enumerable

• `Optional` **enumerable**: `boolean`

#### Defined in

[ts/vm-interface.ts:86](https://github.com/justjake/quickjs-emscripten/blob/main/ts/vm-interface.ts#L86)

___

### value

• `Optional` **value**: `VmHandle`

#### Defined in

[ts/vm-interface.ts:84](https://github.com/justjake/quickjs-emscripten/blob/main/ts/vm-interface.ts#L84)

## Methods

### get

▸ `Optional` **get**(): `VmHandle`

#### Returns

`VmHandle`

#### Defined in

[ts/vm-interface.ts:87](https://github.com/justjake/quickjs-emscripten/blob/main/ts/vm-interface.ts#L87)

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

[ts/vm-interface.ts:88](https://github.com/justjake/quickjs-emscripten/blob/main/ts/vm-interface.ts#L88)
