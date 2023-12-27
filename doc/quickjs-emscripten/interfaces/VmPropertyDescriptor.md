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

quickjs-emscripten-core/dist/index.d.ts:76

***

### enumerable?

> **enumerable**?: `boolean`

#### Source

quickjs-emscripten-core/dist/index.d.ts:77

***

### get?

> **get**?: (`this`) => `VmHandle`

#### Parameters

• **this**: `VmHandle`

#### Returns

`VmHandle`

#### Source

quickjs-emscripten-core/dist/index.d.ts:78

***

### set?

> **set**?: (`this`, `value`) => `void`

#### Parameters

• **this**: `VmHandle`

• **value**: `VmHandle`

#### Returns

`void`

#### Source

quickjs-emscripten-core/dist/index.d.ts:79

***

### value?

> **value**?: `VmHandle`

#### Source

quickjs-emscripten-core/dist/index.d.ts:75

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
