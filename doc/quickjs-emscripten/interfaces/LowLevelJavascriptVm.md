[quickjs-emscripten](../../packages.md) • **quickjs-emscripten** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../exports.md) / LowLevelJavascriptVm

# Interface: LowLevelJavascriptVm\<VmHandle\>

A minimal interface to a Javascript execution environment.

Higher-level tools should build over the LowLevelJavascriptVm interface to
share as much as possible between executors.

From https://www.figma.com/blog/how-we-built-the-figma-plugin-system/

## Contents

- [Type parameters](LowLevelJavascriptVm.md#type-parameters)
- [Properties](LowLevelJavascriptVm.md#properties)
  - [global](LowLevelJavascriptVm.md#global)
  - [undefined](LowLevelJavascriptVm.md#undefined)
- [Methods](LowLevelJavascriptVm.md#methods)
  - [callFunction()](LowLevelJavascriptVm.md#callfunction)
  - [defineProp()](LowLevelJavascriptVm.md#defineprop)
  - [evalCode()](LowLevelJavascriptVm.md#evalcode)
  - [getNumber()](LowLevelJavascriptVm.md#getnumber)
  - [getProp()](LowLevelJavascriptVm.md#getprop)
  - [getString()](LowLevelJavascriptVm.md#getstring)
  - [newFunction()](LowLevelJavascriptVm.md#newfunction)
  - [newNumber()](LowLevelJavascriptVm.md#newnumber)
  - [newObject()](LowLevelJavascriptVm.md#newobject)
  - [newString()](LowLevelJavascriptVm.md#newstring)
  - [setProp()](LowLevelJavascriptVm.md#setprop)
  - [typeof()](LowLevelJavascriptVm.md#typeof)

## Type parameters

• **VmHandle**

## Properties

### global

> **global**: `VmHandle`

#### Source

[packages/quickjs-emscripten-core/src/vm-interface.ts:54](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L54)

***

### undefined

> **undefined**: `VmHandle`

#### Source

[packages/quickjs-emscripten-core/src/vm-interface.ts:55](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L55)

## Methods

### callFunction()

> **callFunction**(`func`, `thisVal`, ...`args`): [`VmCallResult`](../exports.md#vmcallresultvmhandle)\<`VmHandle`\>

#### Parameters

• **func**: `VmHandle`

• **thisVal**: `VmHandle`

• ...**args**: `VmHandle`[]

#### Returns

[`VmCallResult`](../exports.md#vmcallresultvmhandle)\<`VmHandle`\>

#### Source

[packages/quickjs-emscripten-core/src/vm-interface.ts:76](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L76)

***

### defineProp()

> **defineProp**(`handle`, `key`, `descriptor`): `void`

#### Parameters

• **handle**: `VmHandle`

• **key**: `string` \| `VmHandle`

• **descriptor**: [`VmPropertyDescriptor`](VmPropertyDescriptor.md)\<`VmHandle`\>

#### Returns

`void`

#### Source

[packages/quickjs-emscripten-core/src/vm-interface.ts:70](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L70)

***

### evalCode()

> **evalCode**(`code`, `filename`?): [`VmCallResult`](../exports.md#vmcallresultvmhandle)\<`VmHandle`\>

#### Parameters

• **code**: `string`

• **filename?**: `string`

#### Returns

[`VmCallResult`](../exports.md#vmcallresultvmhandle)\<`VmHandle`\>

#### Source

[packages/quickjs-emscripten-core/src/vm-interface.ts:77](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L77)

***

### getNumber()

> **getNumber**(`handle`): `number`

#### Parameters

• **handle**: `VmHandle`

#### Returns

`number`

#### Source

[packages/quickjs-emscripten-core/src/vm-interface.ts:59](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L59)

***

### getProp()

> **getProp**(`handle`, `key`): `VmHandle`

#### Parameters

• **handle**: `VmHandle`

• **key**: `string` \| `VmHandle`

#### Returns

`VmHandle`

#### Source

[packages/quickjs-emscripten-core/src/vm-interface.ts:68](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L68)

***

### getString()

> **getString**(`handle`): `string`

#### Parameters

• **handle**: `VmHandle`

#### Returns

`string`

#### Source

[packages/quickjs-emscripten-core/src/vm-interface.ts:60](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L60)

***

### newFunction()

> **newFunction**(`name`, `value`): `VmHandle`

#### Parameters

• **name**: `string`

• **value**: [`VmFunctionImplementation`](../exports.md#vmfunctionimplementationvmhandle)\<`VmHandle`\>

#### Returns

`VmHandle`

#### Source

[packages/quickjs-emscripten-core/src/vm-interface.ts:65](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L65)

***

### newNumber()

> **newNumber**(`value`): `VmHandle`

#### Parameters

• **value**: `number`

#### Returns

`VmHandle`

#### Source

[packages/quickjs-emscripten-core/src/vm-interface.ts:62](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L62)

***

### newObject()

> **newObject**(`prototype`?): `VmHandle`

#### Parameters

• **prototype?**: `VmHandle`

#### Returns

`VmHandle`

#### Source

[packages/quickjs-emscripten-core/src/vm-interface.ts:64](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L64)

***

### newString()

> **newString**(`value`): `VmHandle`

#### Parameters

• **value**: `string`

#### Returns

`VmHandle`

#### Source

[packages/quickjs-emscripten-core/src/vm-interface.ts:63](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L63)

***

### setProp()

> **setProp**(`handle`, `key`, `value`): `void`

#### Parameters

• **handle**: `VmHandle`

• **key**: `string` \| `VmHandle`

• **value**: `VmHandle`

#### Returns

`void`

#### Source

[packages/quickjs-emscripten-core/src/vm-interface.ts:69](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L69)

***

### typeof()

> **typeof**(`handle`): `string`

#### Parameters

• **handle**: `VmHandle`

#### Returns

`string`

#### Source

[packages/quickjs-emscripten-core/src/vm-interface.ts:57](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L57)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
