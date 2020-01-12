[quickjs-emscripten - v0.1.0b](../README.md) › [Globals](../globals.md) › ["vm-interface"](../modules/_vm_interface_.md) › [LowLevelJavascriptVm](_vm_interface_.lowleveljavascriptvm.md)

# Interface: LowLevelJavascriptVm <**VmHandle**>

A minimal interface to a Javascript execution environment.

Higher-level tools should build over the LowLevelJavascriptVm interface to
share as much as possible between executors.

From https://www.figma.com/blog/how-we-built-the-figma-plugin-system/

## Type parameters

▪ **VmHandle**

## Hierarchy

* **LowLevelJavascriptVm**

## Implemented by

* [QuickJSVm](../classes/_quickjs_.quickjsvm.md)

## Index

### Properties

* [global](_vm_interface_.lowleveljavascriptvm.md#global)
* [undefined](_vm_interface_.lowleveljavascriptvm.md#undefined)

### Methods

* [callFunction](_vm_interface_.lowleveljavascriptvm.md#callfunction)
* [defineProp](_vm_interface_.lowleveljavascriptvm.md#defineprop)
* [evalCode](_vm_interface_.lowleveljavascriptvm.md#evalcode)
* [getNumber](_vm_interface_.lowleveljavascriptvm.md#getnumber)
* [getProp](_vm_interface_.lowleveljavascriptvm.md#getprop)
* [getString](_vm_interface_.lowleveljavascriptvm.md#getstring)
* [newFunction](_vm_interface_.lowleveljavascriptvm.md#newfunction)
* [newNumber](_vm_interface_.lowleveljavascriptvm.md#newnumber)
* [newObject](_vm_interface_.lowleveljavascriptvm.md#newobject)
* [newString](_vm_interface_.lowleveljavascriptvm.md#newstring)
* [setProp](_vm_interface_.lowleveljavascriptvm.md#setprop)
* [typeof](_vm_interface_.lowleveljavascriptvm.md#typeof)

## Properties

###  global

• **global**: *VmHandle*

*Defined in [vm-interface.ts:25](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/vm-interface.ts#L25)*

___

###  undefined

• **undefined**: *VmHandle*

*Defined in [vm-interface.ts:26](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/vm-interface.ts#L26)*

## Methods

###  callFunction

▸ **callFunction**(`func`: VmHandle, `thisVal`: VmHandle, ...`args`: VmHandle[]): *[VmCallResult](../modules/_vm_interface_.md#vmcallresult)‹VmHandle›*

*Defined in [vm-interface.ts:47](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/vm-interface.ts#L47)*

**Parameters:**

Name | Type |
------ | ------ |
`func` | VmHandle |
`thisVal` | VmHandle |
`...args` | VmHandle[] |

**Returns:** *[VmCallResult](../modules/_vm_interface_.md#vmcallresult)‹VmHandle›*

___

###  defineProp

▸ **defineProp**(`handle`: VmHandle, `key`: string | VmHandle, `descriptor`: [VmPropertyDescriptor](_vm_interface_.vmpropertydescriptor.md)‹VmHandle›): *void*

*Defined in [vm-interface.ts:41](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/vm-interface.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`handle` | VmHandle |
`key` | string &#124; VmHandle |
`descriptor` | [VmPropertyDescriptor](_vm_interface_.vmpropertydescriptor.md)‹VmHandle› |

**Returns:** *void*

___

###  evalCode

▸ **evalCode**(`code`: string): *[VmCallResult](../modules/_vm_interface_.md#vmcallresult)‹VmHandle›*

*Defined in [vm-interface.ts:48](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/vm-interface.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`code` | string |

**Returns:** *[VmCallResult](../modules/_vm_interface_.md#vmcallresult)‹VmHandle›*

___

###  getNumber

▸ **getNumber**(`handle`: VmHandle): *number*

*Defined in [vm-interface.ts:30](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/vm-interface.ts#L30)*

**Parameters:**

Name | Type |
------ | ------ |
`handle` | VmHandle |

**Returns:** *number*

___

###  getProp

▸ **getProp**(`handle`: VmHandle, `key`: string | VmHandle): *VmHandle*

*Defined in [vm-interface.ts:39](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/vm-interface.ts#L39)*

**Parameters:**

Name | Type |
------ | ------ |
`handle` | VmHandle |
`key` | string &#124; VmHandle |

**Returns:** *VmHandle*

___

###  getString

▸ **getString**(`handle`: VmHandle): *string*

*Defined in [vm-interface.ts:31](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/vm-interface.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`handle` | VmHandle |

**Returns:** *string*

___

###  newFunction

▸ **newFunction**(`name`: string, `value`: [VmFunctionImplementation](../modules/_vm_interface_.md#vmfunctionimplementation)‹VmHandle›): *VmHandle*

*Defined in [vm-interface.ts:36](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/vm-interface.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`value` | [VmFunctionImplementation](../modules/_vm_interface_.md#vmfunctionimplementation)‹VmHandle› |

**Returns:** *VmHandle*

___

###  newNumber

▸ **newNumber**(`value`: number): *VmHandle*

*Defined in [vm-interface.ts:33](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/vm-interface.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |

**Returns:** *VmHandle*

___

###  newObject

▸ **newObject**(`prototype?`: VmHandle): *VmHandle*

*Defined in [vm-interface.ts:35](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/vm-interface.ts#L35)*

**Parameters:**

Name | Type |
------ | ------ |
`prototype?` | VmHandle |

**Returns:** *VmHandle*

___

###  newString

▸ **newString**(`value`: string): *VmHandle*

*Defined in [vm-interface.ts:34](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/vm-interface.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | string |

**Returns:** *VmHandle*

___

###  setProp

▸ **setProp**(`handle`: VmHandle, `key`: string | VmHandle, `value`: VmHandle): *void*

*Defined in [vm-interface.ts:40](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/vm-interface.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`handle` | VmHandle |
`key` | string &#124; VmHandle |
`value` | VmHandle |

**Returns:** *void*

___

###  typeof

▸ **typeof**(`handle`: VmHandle): *string*

*Defined in [vm-interface.ts:28](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/vm-interface.ts#L28)*

**Parameters:**

Name | Type |
------ | ------ |
`handle` | VmHandle |

**Returns:** *string*
