[quickjs-emscripten - v0.1.0b](../README.md) › [Globals](../globals.md) › ["vm-interface"](_vm_interface_.md)

# External module: "vm-interface"

## Index

### Interfaces

* [LowLevelJavascriptVm](../interfaces/_vm_interface_.lowleveljavascriptvm.md)
* [VmPropertyDescriptor](../interfaces/_vm_interface_.vmpropertydescriptor.md)

### Type aliases

* [SuccessOrFail](_vm_interface_.md#successorfail)
* [VmCallResult](_vm_interface_.md#vmcallresult)
* [VmFunctionImplementation](_vm_interface_.md#vmfunctionimplementation)

## Type aliases

###  SuccessOrFail

Ƭ **SuccessOrFail**: *object | object*

*Defined in [vm-interface.ts:1](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/vm-interface.ts#L1)*

___

###  VmCallResult

Ƭ **VmCallResult**: *[SuccessOrFail](_vm_interface_.md#successorfail)‹VmHandle, VmHandle›*

*Defined in [vm-interface.ts:10](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/vm-interface.ts#L10)*

___

###  VmFunctionImplementation

Ƭ **VmFunctionImplementation**: *function*

*Defined in [vm-interface.ts:11](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/vm-interface.ts#L11)*

#### Type declaration:

▸ (`this`: VmHandle, ...`args`: VmHandle[]): *VmHandle | void*

**Parameters:**

Name | Type |
------ | ------ |
`this` | VmHandle |
`...args` | VmHandle[] |
