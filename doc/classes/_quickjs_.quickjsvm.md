[quickjs-emscripten - v0.1.0b](../README.md) › [Globals](../globals.md) › ["quickjs"](../modules/_quickjs_.md) › [QuickJSVm](_quickjs_.quickjsvm.md)

# Class: QuickJSVm

QuickJSVm wraps a QuickJS Javascript runtime (JSRuntime*) and context (JSContext*).
This class's methods return [QuickJSHandle](../modules/_quickjs_.md#quickjshandle), which wrap C pointers (JSValue*).
It's the caller's responsibility to call `.dispose()` on any
handles you create to free memory once you're done with the handle.

You cannot share handles between different QuickJSVm instances.

Use [QuickJS.createVm](_quickjs_.quickjs.md#createvm) to create a new QuickJSVm

## Hierarchy

* **QuickJSVm**

## Implements

* [LowLevelJavascriptVm](../interfaces/_vm_interface_.lowleveljavascriptvm.md)‹[QuickJSHandle](../modules/_quickjs_.md#quickjshandle)›

## Index

### Constructors

* [constructor](_quickjs_.quickjsvm.md#constructor)

### Properties

* [ctx](_quickjs_.quickjsvm.md#ctx)
* [rt](_quickjs_.quickjsvm.md#rt)

### Accessors

* [global](_quickjs_.quickjsvm.md#global)
* [undefined](_quickjs_.quickjsvm.md#undefined)

### Methods

* [callFunction](_quickjs_.quickjsvm.md#callfunction)
* [defineProp](_quickjs_.quickjsvm.md#defineprop)
* [dispose](_quickjs_.quickjsvm.md#dispose)
* [dump](_quickjs_.quickjsvm.md#dump)
* [evalCode](_quickjs_.quickjsvm.md#evalcode)
* [getNumber](_quickjs_.quickjsvm.md#getnumber)
* [getProp](_quickjs_.quickjsvm.md#getprop)
* [getString](_quickjs_.quickjsvm.md#getstring)
* [newFunction](_quickjs_.quickjsvm.md#newfunction)
* [newNumber](_quickjs_.quickjsvm.md#newnumber)
* [newObject](_quickjs_.quickjsvm.md#newobject)
* [newString](_quickjs_.quickjsvm.md#newstring)
* [setProp](_quickjs_.quickjsvm.md#setprop)
* [typeof](_quickjs_.quickjsvm.md#typeof)
* [unwrapResult](_quickjs_.quickjsvm.md#unwrapresult)

## Constructors

###  constructor

\+ **new QuickJSVm**(`args`: object): *[QuickJSVm](_quickjs_.quickjsvm.md)*

*Defined in [quickjs.ts:95](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/quickjs.ts#L95)*

Use [QuickJS.createVm](_quickjs_.quickjs.md#createvm) to create a QuickJSVm instance.

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *[QuickJSVm](_quickjs_.quickjsvm.md)*

## Properties

###  ctx

• **ctx**: *[Lifetime](_quickjs_.lifetime.md)‹[JSContextPointer](../modules/_ffi_.md#jscontextpointer)›*

*Defined in [quickjs.ts:88](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/quickjs.ts#L88)*

___

###  rt

• **rt**: *[Lifetime](_quickjs_.lifetime.md)‹[JSRuntimePointer](../modules/_ffi_.md#jsruntimepointer)›*

*Defined in [quickjs.ts:89](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/quickjs.ts#L89)*

## Accessors

###  global

• **get global**(): *[Lifetime](_quickjs_.lifetime.md)‹number & object, [QuickJSVm](_quickjs_.quickjsvm.md)‹›› | [Lifetime](_quickjs_.lifetime.md)‹number & object, [QuickJSVm](_quickjs_.quickjsvm.md)‹››*

*Defined in [quickjs.ts:127](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/quickjs.ts#L127)*

A handle to the global object inside the interpreter.
You can set properties to create global variables.

**Returns:** *[Lifetime](_quickjs_.lifetime.md)‹number & object, [QuickJSVm](_quickjs_.quickjsvm.md)‹›› | [Lifetime](_quickjs_.lifetime.md)‹number & object, [QuickJSVm](_quickjs_.quickjsvm.md)‹››*

___

###  undefined

• **get undefined**(): *[Lifetime](_quickjs_.lifetime.md)‹number & object, [QuickJSVm](_quickjs_.quickjsvm.md)‹›› | [Lifetime](_quickjs_.lifetime.md)‹number & object, [QuickJSVm](_quickjs_.quickjsvm.md)‹››*

*Defined in [quickjs.ts:113](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/quickjs.ts#L113)*

**Returns:** *[Lifetime](_quickjs_.lifetime.md)‹number & object, [QuickJSVm](_quickjs_.quickjsvm.md)‹›› | [Lifetime](_quickjs_.lifetime.md)‹number & object, [QuickJSVm](_quickjs_.quickjsvm.md)‹››*

## Methods

###  callFunction

▸ **callFunction**(`func`: [QuickJSHandle](../modules/_quickjs_.md#quickjshandle), `thisVal`: [QuickJSHandle](../modules/_quickjs_.md#quickjshandle), ...`args`: [QuickJSHandle](../modules/_quickjs_.md#quickjshandle)[]): *[VmCallResult](../modules/_vm_interface_.md#vmcallresult)‹[QuickJSHandle](../modules/_quickjs_.md#quickjshandle)›*

*Defined in [quickjs.ts:251](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/quickjs.ts#L251)*

**Parameters:**

Name | Type |
------ | ------ |
`func` | [QuickJSHandle](../modules/_quickjs_.md#quickjshandle) |
`thisVal` | [QuickJSHandle](../modules/_quickjs_.md#quickjshandle) |
`...args` | [QuickJSHandle](../modules/_quickjs_.md#quickjshandle)[] |

**Returns:** *[VmCallResult](../modules/_vm_interface_.md#vmcallresult)‹[QuickJSHandle](../modules/_quickjs_.md#quickjshandle)›*

___

###  defineProp

▸ **defineProp**(`handle`: [QuickJSHandle](../modules/_quickjs_.md#quickjshandle), `key`: string | [QuickJSHandle](../modules/_quickjs_.md#quickjshandle), `descriptor`: [VmPropertyDescriptor](../interfaces/_vm_interface_.vmpropertydescriptor.md)‹[QuickJSHandle](../modules/_quickjs_.md#quickjshandle)›): *void*

*Defined in [quickjs.ts:215](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/quickjs.ts#L215)*

**Parameters:**

Name | Type |
------ | ------ |
`handle` | [QuickJSHandle](../modules/_quickjs_.md#quickjshandle) |
`key` | string &#124; [QuickJSHandle](../modules/_quickjs_.md#quickjshandle) |
`descriptor` | [VmPropertyDescriptor](../interfaces/_vm_interface_.vmpropertydescriptor.md)‹[QuickJSHandle](../modules/_quickjs_.md#quickjshandle)› |

**Returns:** *void*

___

###  dispose

▸ **dispose**(): *void*

*Defined in [quickjs.ts:336](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/quickjs.ts#L336)*

Dispose of this VM's underlying resources.
Calling this method without disposing of all created handles will result
in an error.

**Returns:** *void*

___

###  dump

▸ **dump**(`handle`: [QuickJSHandle](../modules/_quickjs_.md#quickjshandle)): *any*

*Defined in [quickjs.ts:291](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/quickjs.ts#L291)*

Dump a JSValue to Javascript in a best-effort fashion.
Returns the object's .toString() if it cannot be serialized to JSON.

**Parameters:**

Name | Type |
------ | ------ |
`handle` | [QuickJSHandle](../modules/_quickjs_.md#quickjshandle) |

**Returns:** *any*

___

###  evalCode

▸ **evalCode**(`code`: string): *[VmCallResult](../modules/_vm_interface_.md#vmcallresult)‹[QuickJSHandle](../modules/_quickjs_.md#quickjshandle)›*

*Implementation of [LowLevelJavascriptVm](../interfaces/_vm_interface_.lowleveljavascriptvm.md)*

*Defined in [quickjs.ts:275](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/quickjs.ts#L275)*

**Parameters:**

Name | Type |
------ | ------ |
`code` | string |

**Returns:** *[VmCallResult](../modules/_vm_interface_.md#vmcallresult)‹[QuickJSHandle](../modules/_quickjs_.md#quickjshandle)›*

___

###  getNumber

▸ **getNumber**(`handle`: [QuickJSHandle](../modules/_quickjs_.md#quickjshandle)): *number*

*Defined in [quickjs.ts:152](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/quickjs.ts#L152)*

**Parameters:**

Name | Type |
------ | ------ |
`handle` | [QuickJSHandle](../modules/_quickjs_.md#quickjshandle) |

**Returns:** *number*

___

###  getProp

▸ **getProp**(`handle`: [QuickJSHandle](../modules/_quickjs_.md#quickjshandle), `key`: string | [QuickJSHandle](../modules/_quickjs_.md#quickjshandle)): *[QuickJSHandle](../modules/_quickjs_.md#quickjshandle)*

*Defined in [quickjs.ts:192](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/quickjs.ts#L192)*

**Parameters:**

Name | Type |
------ | ------ |
`handle` | [QuickJSHandle](../modules/_quickjs_.md#quickjshandle) |
`key` | string &#124; [QuickJSHandle](../modules/_quickjs_.md#quickjshandle) |

**Returns:** *[QuickJSHandle](../modules/_quickjs_.md#quickjshandle)*

___

###  getString

▸ **getString**(`handle`: [QuickJSHandle](../modules/_quickjs_.md#quickjshandle)): *string*

*Defined in [quickjs.ts:161](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/quickjs.ts#L161)*

**Parameters:**

Name | Type |
------ | ------ |
`handle` | [QuickJSHandle](../modules/_quickjs_.md#quickjshandle) |

**Returns:** *string*

___

###  newFunction

▸ **newFunction**(`name`: string, `fn`: [VmFunctionImplementation](../modules/_vm_interface_.md#vmfunctionimplementation)‹[QuickJSHandle](../modules/_quickjs_.md#quickjshandle)›): *[QuickJSHandle](../modules/_quickjs_.md#quickjshandle)*

*Implementation of [LowLevelJavascriptVm](../interfaces/_vm_interface_.lowleveljavascriptvm.md)*

*Defined in [quickjs.ts:176](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/quickjs.ts#L176)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`fn` | [VmFunctionImplementation](../modules/_vm_interface_.md#vmfunctionimplementation)‹[QuickJSHandle](../modules/_quickjs_.md#quickjshandle)› |

**Returns:** *[QuickJSHandle](../modules/_quickjs_.md#quickjshandle)*

___

###  newNumber

▸ **newNumber**(`num`: number): *[QuickJSHandle](../modules/_quickjs_.md#quickjshandle)*

*Implementation of [LowLevelJavascriptVm](../interfaces/_vm_interface_.lowleveljavascriptvm.md)*

*Defined in [quickjs.ts:148](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/quickjs.ts#L148)*

**Parameters:**

Name | Type |
------ | ------ |
`num` | number |

**Returns:** *[QuickJSHandle](../modules/_quickjs_.md#quickjshandle)*

___

###  newObject

▸ **newObject**(`prototype?`: [QuickJSHandle](../modules/_quickjs_.md#quickjshandle)): *[Lifetime](_quickjs_.lifetime.md)‹number & object, [QuickJSVm](_quickjs_.quickjsvm.md)‹››*

*Implementation of [LowLevelJavascriptVm](../interfaces/_vm_interface_.lowleveljavascriptvm.md)*

*Defined in [quickjs.ts:166](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/quickjs.ts#L166)*

**Parameters:**

Name | Type |
------ | ------ |
`prototype?` | [QuickJSHandle](../modules/_quickjs_.md#quickjshandle) |

**Returns:** *[Lifetime](_quickjs_.lifetime.md)‹number & object, [QuickJSVm](_quickjs_.quickjsvm.md)‹››*

___

###  newString

▸ **newString**(`str`: string): *[Lifetime](_quickjs_.lifetime.md)‹number & object, [QuickJSVm](_quickjs_.quickjsvm.md)‹››*

*Implementation of [LowLevelJavascriptVm](../interfaces/_vm_interface_.lowleveljavascriptvm.md)*

*Defined in [quickjs.ts:157](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/quickjs.ts#L157)*

**Parameters:**

Name | Type |
------ | ------ |
`str` | string |

**Returns:** *[Lifetime](_quickjs_.lifetime.md)‹number & object, [QuickJSVm](_quickjs_.quickjsvm.md)‹››*

___

###  setProp

▸ **setProp**(`handle`: [QuickJSHandle](../modules/_quickjs_.md#quickjshandle), `key`: string | [QuickJSHandle](../modules/_quickjs_.md#quickjshandle), `value`: [QuickJSHandle](../modules/_quickjs_.md#quickjshandle)): *void*

*Defined in [quickjs.ts:204](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/quickjs.ts#L204)*

**Parameters:**

Name | Type |
------ | ------ |
`handle` | [QuickJSHandle](../modules/_quickjs_.md#quickjshandle) |
`key` | string &#124; [QuickJSHandle](../modules/_quickjs_.md#quickjshandle) |
`value` | [QuickJSHandle](../modules/_quickjs_.md#quickjshandle) |

**Returns:** *void*

___

###  typeof

▸ **typeof**(`handle`: [QuickJSHandle](../modules/_quickjs_.md#quickjshandle)): *string*

*Defined in [quickjs.ts:143](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/quickjs.ts#L143)*

**Parameters:**

Name | Type |
------ | ------ |
`handle` | [QuickJSHandle](../modules/_quickjs_.md#quickjshandle) |

**Returns:** *string*

___

###  unwrapResult

▸ **unwrapResult**(`result`: [VmCallResult](../modules/_vm_interface_.md#vmcallresult)‹[QuickJSHandle](../modules/_quickjs_.md#quickjshandle)›): *[QuickJSHandle](../modules/_quickjs_.md#quickjshandle)*

*Defined in [quickjs.ts:313](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/quickjs.ts#L313)*

Unwrap a VmCallResult, returning it's value on success, and throwing the dumped
error on failure.

**Parameters:**

Name | Type |
------ | ------ |
`result` | [VmCallResult](../modules/_vm_interface_.md#vmcallresult)‹[QuickJSHandle](../modules/_quickjs_.md#quickjshandle)› |

**Returns:** *[QuickJSHandle](../modules/_quickjs_.md#quickjshandle)*
