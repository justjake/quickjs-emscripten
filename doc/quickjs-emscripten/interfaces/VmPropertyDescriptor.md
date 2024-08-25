[quickjs-emscripten](../../packages.md) • **quickjs-emscripten** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../exports.md) / VmPropertyDescriptor

# Interface: VmPropertyDescriptor\<VmHandle\>

From https://www.figma.com/blog/how-we-built-the-figma-plugin-system/

## Contents

- [Type parameters](VmPropertyDescriptor.md#type-parameters)
- [Properties](VmPropertyDescriptor.md#properties)
  - [configurable?](VmPropertyDescriptor.md#configurable)
  - [enumerable?](VmPropertyDescriptor.md#enumerable)
  - [get?](VmPropertyDescriptor.md#get)
  - [set?](VmPropertyDescriptor.md#set)
  - [value?](VmPropertyDescriptor.md#value)

## Type parameters

• **VmHandle**

## Properties

### configurable?

> **configurable**?: `boolean`

#### Source

[packages/quickjs-emscripten-core/src/vm-interface.ts:85](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L85)

***

### enumerable?

> **enumerable**?: `boolean`

#### Source

[packages/quickjs-emscripten-core/src/vm-interface.ts:86](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L86)

***

### get?

> **get**?: (`this`) => `VmHandle`

#### Parameters

• **this**: `VmHandle`

#### Returns

`VmHandle`

#### Source

[packages/quickjs-emscripten-core/src/vm-interface.ts:87](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L87)

***

### set?

> **set**?: (`this`, `value`) => `void`

#### Parameters

• **this**: `VmHandle`

• **value**: `VmHandle`

#### Returns

`void`

#### Source

[packages/quickjs-emscripten-core/src/vm-interface.ts:88](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L88)

***

### value?

> **value**?: `VmHandle`

#### Source

[packages/quickjs-emscripten-core/src/vm-interface.ts:84](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L84)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
