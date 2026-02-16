[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../README.md) / VmFunctionImplementation

# Type Alias: VmFunctionImplementation()\<VmHandle>

> **VmFunctionImplementation**<`VmHandle`> = (`this`, ...`args`) => `VmHandle` | [`VmCallResult`](VmCallResult.md)<`VmHandle`> | `void`

Defined in: [packages/quickjs-emscripten-core/src/vm-interface.ts:40](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L40)

A VmFunctionImplementation takes handles as arguments.
It should return a handle, or be void.

To indicate an exception, a VMs can throw either a handle (transferred
directly) or any other Javascript value (only the poperties `name` and
`message` will be transferred). Or, the VmFunctionImplementation may return
a VmCallResult's `{ error: handle }` error variant.

VmFunctionImplementation should not free its arguments or its return value.
It should not retain a reference to its return value or thrown error.

* [Type Parameters](#type-parameters)

  * [VmHandle](#vmhandle)

* [Parameters](#parameters)

  * [this](#this)
  * [args](#args)

* [Returns](#returns)

## Type Parameters

### VmHandle

`VmHandle`

## Parameters

### this

`VmHandle`

### args

...`VmHandle`\[]

## Returns

`VmHandle` | [`VmCallResult`](VmCallResult.md)<`VmHandle`> | `void`
