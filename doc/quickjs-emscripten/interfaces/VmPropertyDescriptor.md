[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../README.md) / VmPropertyDescriptor

# Interface: VmPropertyDescriptor\<VmHandle>

Defined in: [packages/quickjs-emscripten-core/src/vm-interface.ts:83](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L83)

From https://www.figma.com/blog/how-we-built-the-figma-plugin-system/

## Contents

* [Type Parameters](#type-parameters)
  * [VmHandle](#vmhandle)
* [Properties](#properties)
  * [configurable?](#configurable)
  * [enumerable?](#enumerable)
  * [get()?](#get)
  * [set()?](#set)
  * [value?](#value-1)

## Type Parameters

### VmHandle

`VmHandle`

## Properties

### configurable?

> `optional` **configurable**: `boolean`

Defined in: [packages/quickjs-emscripten-core/src/vm-interface.ts:85](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L85)

***

### enumerable?

> `optional` **enumerable**: `boolean`

Defined in: [packages/quickjs-emscripten-core/src/vm-interface.ts:86](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L86)

***

### get()?

> `optional` **get**: (`this`) => `VmHandle`

Defined in: [packages/quickjs-emscripten-core/src/vm-interface.ts:87](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L87)

#### Parameters

##### this

`VmHandle`

#### Returns

`VmHandle`

***

### set()?

> `optional` **set**: (`this`, `value`) => `void`

Defined in: [packages/quickjs-emscripten-core/src/vm-interface.ts:88](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L88)

#### Parameters

##### this

`VmHandle`

##### value

`VmHandle`

#### Returns

`void`

***

### value?

> `optional` **value**: `VmHandle`

Defined in: [packages/quickjs-emscripten-core/src/vm-interface.ts:84](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L84)
