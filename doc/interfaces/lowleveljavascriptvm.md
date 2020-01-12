[quickjs-emscripten - v0.1.0b](../README.md) › [Globals](../globals.md) › [LowLevelJavascriptVm](lowleveljavascriptvm.md)

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

* [QuickJSVm](../classes/quickjsvm.md)

## Index

### Properties

* [global](lowleveljavascriptvm.md#global)
* [undefined](lowleveljavascriptvm.md#undefined)

### Methods

* [callFunction](lowleveljavascriptvm.md#callfunction)
* [defineProp](lowleveljavascriptvm.md#defineprop)
* [evalCode](lowleveljavascriptvm.md#evalcode)
* [getNumber](lowleveljavascriptvm.md#getnumber)
* [getProp](lowleveljavascriptvm.md#getprop)
* [getString](lowleveljavascriptvm.md#getstring)
* [newFunction](lowleveljavascriptvm.md#newfunction)
* [newNumber](lowleveljavascriptvm.md#newnumber)
* [newObject](lowleveljavascriptvm.md#newobject)
* [newString](lowleveljavascriptvm.md#newstring)
* [setProp](lowleveljavascriptvm.md#setprop)
* [typeof](lowleveljavascriptvm.md#typeof)

## Properties

###  global

• **global**: *VmHandle*

*Defined in [vm-interface.ts:46](https://github.com/justjake/quickjs-emscripten/blob/f464b72/ts/vm-interface.ts#L46)*

___

###  undefined

• **undefined**: *VmHandle*

*Defined in [vm-interface.ts:47](https://github.com/justjake/quickjs-emscripten/blob/f464b72/ts/vm-interface.ts#L47)*

## Methods

###  callFunction

▸ **callFunction**(`func`: VmHandle, `thisVal`: VmHandle, ...`args`: VmHandle[]): *[VmCallResult](../globals.md#vmcallresult)‹VmHandle›*

*Defined in [vm-interface.ts:68](https://github.com/justjake/quickjs-emscripten/blob/f464b72/ts/vm-interface.ts#L68)*

**Parameters:**

Name | Type |
------ | ------ |
`func` | VmHandle |
`thisVal` | VmHandle |
`...args` | VmHandle[] |

**Returns:** *[VmCallResult](../globals.md#vmcallresult)‹VmHandle›*

___

###  defineProp

▸ **defineProp**(`handle`: VmHandle, `key`: string | VmHandle, `descriptor`: [VmPropertyDescriptor](vmpropertydescriptor.md)‹VmHandle›): *void*

*Defined in [vm-interface.ts:62](https://github.com/justjake/quickjs-emscripten/blob/f464b72/ts/vm-interface.ts#L62)*

**Parameters:**

Name | Type |
------ | ------ |
`handle` | VmHandle |
`key` | string &#124; VmHandle |
`descriptor` | [VmPropertyDescriptor](vmpropertydescriptor.md)‹VmHandle› |

**Returns:** *void*

___

###  evalCode

▸ **evalCode**(`code`: string): *[VmCallResult](../globals.md#vmcallresult)‹VmHandle›*

*Defined in [vm-interface.ts:69](https://github.com/justjake/quickjs-emscripten/blob/f464b72/ts/vm-interface.ts#L69)*

**Parameters:**

Name | Type |
------ | ------ |
`code` | string |

**Returns:** *[VmCallResult](../globals.md#vmcallresult)‹VmHandle›*

___

###  getNumber

▸ **getNumber**(`handle`: VmHandle): *number*

*Defined in [vm-interface.ts:51](https://github.com/justjake/quickjs-emscripten/blob/f464b72/ts/vm-interface.ts#L51)*

**Parameters:**

Name | Type |
------ | ------ |
`handle` | VmHandle |

**Returns:** *number*

___

###  getProp

▸ **getProp**(`handle`: VmHandle, `key`: string | VmHandle): *VmHandle*

*Defined in [vm-interface.ts:60](https://github.com/justjake/quickjs-emscripten/blob/f464b72/ts/vm-interface.ts#L60)*

**Parameters:**

Name | Type |
------ | ------ |
`handle` | VmHandle |
`key` | string &#124; VmHandle |

**Returns:** *VmHandle*

___

###  getString

▸ **getString**(`handle`: VmHandle): *string*

*Defined in [vm-interface.ts:52](https://github.com/justjake/quickjs-emscripten/blob/f464b72/ts/vm-interface.ts#L52)*

**Parameters:**

Name | Type |
------ | ------ |
`handle` | VmHandle |

**Returns:** *string*

___

###  newFunction

▸ **newFunction**(`name`: string, `value`: [VmFunctionImplementation](../globals.md#vmfunctionimplementation)‹VmHandle›): *VmHandle*

*Defined in [vm-interface.ts:57](https://github.com/justjake/quickjs-emscripten/blob/f464b72/ts/vm-interface.ts#L57)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`value` | [VmFunctionImplementation](../globals.md#vmfunctionimplementation)‹VmHandle› |

**Returns:** *VmHandle*

___

###  newNumber

▸ **newNumber**(`value`: number): *VmHandle*

*Defined in [vm-interface.ts:54](https://github.com/justjake/quickjs-emscripten/blob/f464b72/ts/vm-interface.ts#L54)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | number |

**Returns:** *VmHandle*

___

###  newObject

▸ **newObject**(`prototype?`: VmHandle): *VmHandle*

*Defined in [vm-interface.ts:56](https://github.com/justjake/quickjs-emscripten/blob/f464b72/ts/vm-interface.ts#L56)*

**Parameters:**

Name | Type |
------ | ------ |
`prototype?` | VmHandle |

**Returns:** *VmHandle*

___

###  newString

▸ **newString**(`value`: string): *VmHandle*

*Defined in [vm-interface.ts:55](https://github.com/justjake/quickjs-emscripten/blob/f464b72/ts/vm-interface.ts#L55)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | string |

**Returns:** *VmHandle*

___

###  setProp

▸ **setProp**(`handle`: VmHandle, `key`: string | VmHandle, `value`: VmHandle): *void*

*Defined in [vm-interface.ts:61](https://github.com/justjake/quickjs-emscripten/blob/f464b72/ts/vm-interface.ts#L61)*

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

*Defined in [vm-interface.ts:49](https://github.com/justjake/quickjs-emscripten/blob/f464b72/ts/vm-interface.ts#L49)*

**Parameters:**

Name | Type |
------ | ------ |
`handle` | VmHandle |

**Returns:** *string*
