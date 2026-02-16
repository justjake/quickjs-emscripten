[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../README.md) / LowLevelJavascriptVm

# Interface: LowLevelJavascriptVm\<VmHandle\>

Defined in: [packages/quickjs-emscripten-core/src/vm-interface.ts:53](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L53)

A minimal interface to a Javascript execution environment.

Higher-level tools should build over the LowLevelJavascriptVm interface to
share as much as possible between executors.

From https://www.figma.com/blog/how-we-built-the-figma-plugin-system/

## Type Parameters

### VmHandle

`VmHandle`

## Properties

### global

> **global**: `VmHandle`

Defined in: [packages/quickjs-emscripten-core/src/vm-interface.ts:54](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L54)

***

### undefined

> **undefined**: `VmHandle`

Defined in: [packages/quickjs-emscripten-core/src/vm-interface.ts:55](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L55)

## Methods

### callFunction()

> **callFunction**(`func`, `thisVal`, ...`args`): [`VmCallResult`](../README.md#vmcallresult)\<`VmHandle`\>

Defined in: [packages/quickjs-emscripten-core/src/vm-interface.ts:76](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L76)

#### Parameters

##### func

`VmHandle`

##### thisVal

`VmHandle`

##### args

...`VmHandle`[]

#### Returns

[`VmCallResult`](../README.md#vmcallresult)\<`VmHandle`\>

***

### defineProp()

> **defineProp**(`handle`, `key`, `descriptor`): `void`

Defined in: [packages/quickjs-emscripten-core/src/vm-interface.ts:70](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L70)

#### Parameters

##### handle

`VmHandle`

##### key

`string` | `VmHandle`

##### descriptor

[`VmPropertyDescriptor`](VmPropertyDescriptor.md)\<`VmHandle`\>

#### Returns

`void`

***

### evalCode()

> **evalCode**(`code`, `filename?`): [`VmCallResult`](../README.md#vmcallresult)\<`VmHandle`\>

Defined in: [packages/quickjs-emscripten-core/src/vm-interface.ts:77](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L77)

#### Parameters

##### code

`string`

##### filename?

`string`

#### Returns

[`VmCallResult`](../README.md#vmcallresult)\<`VmHandle`\>

***

### getNumber()

> **getNumber**(`handle`): `number`

Defined in: [packages/quickjs-emscripten-core/src/vm-interface.ts:59](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L59)

#### Parameters

##### handle

`VmHandle`

#### Returns

`number`

***

### getProp()

> **getProp**(`handle`, `key`): `VmHandle`

Defined in: [packages/quickjs-emscripten-core/src/vm-interface.ts:68](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L68)

#### Parameters

##### handle

`VmHandle`

##### key

`string` | `VmHandle`

#### Returns

`VmHandle`

***

### getString()

> **getString**(`handle`): `string`

Defined in: [packages/quickjs-emscripten-core/src/vm-interface.ts:60](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L60)

#### Parameters

##### handle

`VmHandle`

#### Returns

`string`

***

### newFunction()

> **newFunction**(`name`, `value`): `VmHandle`

Defined in: [packages/quickjs-emscripten-core/src/vm-interface.ts:65](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L65)

#### Parameters

##### name

`string`

##### value

[`VmFunctionImplementation`](../README.md#vmfunctionimplementation)\<`VmHandle`\>

#### Returns

`VmHandle`

***

### newNumber()

> **newNumber**(`value`): `VmHandle`

Defined in: [packages/quickjs-emscripten-core/src/vm-interface.ts:62](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L62)

#### Parameters

##### value

`number`

#### Returns

`VmHandle`

***

### newObject()

> **newObject**(`prototype?`): `VmHandle`

Defined in: [packages/quickjs-emscripten-core/src/vm-interface.ts:64](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L64)

#### Parameters

##### prototype?

`VmHandle`

#### Returns

`VmHandle`

***

### newString()

> **newString**(`value`): `VmHandle`

Defined in: [packages/quickjs-emscripten-core/src/vm-interface.ts:63](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L63)

#### Parameters

##### value

`string`

#### Returns

`VmHandle`

***

### setProp()

> **setProp**(`handle`, `key`, `value`): `void`

Defined in: [packages/quickjs-emscripten-core/src/vm-interface.ts:69](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L69)

#### Parameters

##### handle

`VmHandle`

##### key

`string` | `VmHandle`

##### value

`VmHandle`

#### Returns

`void`

***

### typeof()

> **typeof**(`handle`): `string`

Defined in: [packages/quickjs-emscripten-core/src/vm-interface.ts:57](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L57)

#### Parameters

##### handle

`VmHandle`

#### Returns

`string`
