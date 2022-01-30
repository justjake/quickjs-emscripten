[quickjs-emscripten](../README.md) / [Exports](../modules.md) / vm-interface

# Module: vm-interface

## Table of contents

### Interfaces

- [LowLevelJavascriptVm](../interfaces/vm_interface.LowLevelJavascriptVm.md)
- [VmPropertyDescriptor](../interfaces/vm_interface.VmPropertyDescriptor.md)

### Type aliases

- [SuccessOrFail](vm_interface.md#successorfail)
- [VmCallResult](vm_interface.md#vmcallresult)
- [VmFunctionImplementation](vm_interface.md#vmfunctionimplementation)

## Type aliases

### SuccessOrFail

Ƭ **SuccessOrFail**<`S`, `F`\>: { `error?`: `undefined` ; `value`: `S`  } \| { `error`: `F`  }

Used as an optional.
`{ value: S } | { error: E }`.

#### Type parameters

| Name |
| :------ |
| `S` |
| `F` |

#### Defined in

[vm-interface.ts:5](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm-interface.ts#L5)

___

### VmCallResult

Ƭ **VmCallResult**<`VmHandle`\>: [`SuccessOrFail`](vm_interface.md#successorfail)<`VmHandle`, `VmHandle`\>

Used as an optional for results of a Vm call.
`{ value: VmHandle } | { error: VmHandle }`.

#### Type parameters

| Name |
| :------ |
| `VmHandle` |

#### Defined in

[vm-interface.ts:18](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm-interface.ts#L18)

___

### VmFunctionImplementation

Ƭ **VmFunctionImplementation**<`VmHandle`\>: (`this`: `VmHandle`, ...`args`: `VmHandle`[]) => `VmHandle` \| [`VmCallResult`](vm_interface.md#vmcallresult)<`VmHandle`\> \| `void`

#### Type parameters

| Name |
| :------ |
| `VmHandle` |

#### Type declaration

▸ (`this`, ...`args`): `VmHandle` \| [`VmCallResult`](vm_interface.md#vmcallresult)<`VmHandle`\> \| `void`

A VmFunctionImplementation takes handles as arguments.
It should return a handle, or be void.

To indicate an exception, a VMs can throw either a handle (transferred
directly) or any other Javascript value (only the poperties `name` and
`message` will be transferred). Or, the VmFunctionImplementation may return
a VmCallResult's `{ error: handle }` error variant.

VmFunctionImplementation should not free its arguments or its return value.
It should not retain a reference to its return value or thrown error.

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `VmHandle` |
| `...args` | `VmHandle`[] |

##### Returns

`VmHandle` \| [`VmCallResult`](vm_interface.md#vmcallresult)<`VmHandle`\> \| `void`

#### Defined in

[vm-interface.ts:32](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm-interface.ts#L32)
