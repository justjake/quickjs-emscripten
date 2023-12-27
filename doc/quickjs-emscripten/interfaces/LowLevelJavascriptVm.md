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

quickjs-emscripten-core/dist/index.d.ts:56

***

### undefined

> **undefined**: `VmHandle`

#### Source

quickjs-emscripten-core/dist/index.d.ts:57

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

quickjs-emscripten-core/dist/index.d.ts:68

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

quickjs-emscripten-core/dist/index.d.ts:67

***

### evalCode()

> **evalCode**(`code`, `filename`?): [`VmCallResult`](../exports.md#vmcallresultvmhandle)\<`VmHandle`\>

#### Parameters

• **code**: `string`

• **filename?**: `string`

#### Returns

[`VmCallResult`](../exports.md#vmcallresultvmhandle)\<`VmHandle`\>

#### Source

quickjs-emscripten-core/dist/index.d.ts:69

***

### getNumber()

> **getNumber**(`handle`): `number`

#### Parameters

• **handle**: `VmHandle`

#### Returns

`number`

#### Source

quickjs-emscripten-core/dist/index.d.ts:59

***

### getProp()

> **getProp**(`handle`, `key`): `VmHandle`

#### Parameters

• **handle**: `VmHandle`

• **key**: `string` \| `VmHandle`

#### Returns

`VmHandle`

#### Source

quickjs-emscripten-core/dist/index.d.ts:65

***

### getString()

> **getString**(`handle`): `string`

#### Parameters

• **handle**: `VmHandle`

#### Returns

`string`

#### Source

quickjs-emscripten-core/dist/index.d.ts:60

***

### newFunction()

> **newFunction**(`name`, `value`): `VmHandle`

#### Parameters

• **name**: `string`

• **value**: [`VmFunctionImplementation`](../exports.md#vmfunctionimplementationvmhandle)\<`VmHandle`\>

#### Returns

`VmHandle`

#### Source

quickjs-emscripten-core/dist/index.d.ts:64

***

### newNumber()

> **newNumber**(`value`): `VmHandle`

#### Parameters

• **value**: `number`

#### Returns

`VmHandle`

#### Source

quickjs-emscripten-core/dist/index.d.ts:61

***

### newObject()

> **newObject**(`prototype`?): `VmHandle`

#### Parameters

• **prototype?**: `VmHandle`

#### Returns

`VmHandle`

#### Source

quickjs-emscripten-core/dist/index.d.ts:63

***

### newString()

> **newString**(`value`): `VmHandle`

#### Parameters

• **value**: `string`

#### Returns

`VmHandle`

#### Source

quickjs-emscripten-core/dist/index.d.ts:62

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

quickjs-emscripten-core/dist/index.d.ts:66

***

### typeof()

> **typeof**(`handle`): `string`

#### Parameters

• **handle**: `VmHandle`

#### Returns

`string`

#### Source

quickjs-emscripten-core/dist/index.d.ts:58

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
