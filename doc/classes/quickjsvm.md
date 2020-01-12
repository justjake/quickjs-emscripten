[quickjs-emscripten - v0.1.0b](../README.md) › [Globals](../globals.md) › [QuickJSVm](quickjsvm.md)

# Class: QuickJSVm

QuickJSVm wraps a QuickJS Javascript runtime (JSRuntime*) and context (JSContext*).
This class's methods return [QuickJSHandle](../globals.md#quickjshandle), which wrap C pointers (JSValue*).
It's the caller's responsibility to call `.dispose()` on any
handles you create to free memory once you're done with the handle.

You cannot share handles between different QuickJSVm instances.

Use [QuickJS.createVm](quickjs.md#createvm) to create a new QuickJSVm

## Hierarchy

* **QuickJSVm**

## Implements

* [LowLevelJavascriptVm](../interfaces/lowleveljavascriptvm.md)‹[QuickJSHandle](../globals.md#quickjshandle)›

## Index

### Constructors

* [constructor](quickjsvm.md#constructor)

### Properties

* [ctx](quickjsvm.md#ctx)
* [rt](quickjsvm.md#rt)

### Accessors

* [global](quickjsvm.md#global)
* [undefined](quickjsvm.md#undefined)

### Methods

* [callFunction](quickjsvm.md#callfunction)
* [defineProp](quickjsvm.md#defineprop)
* [dispose](quickjsvm.md#dispose)
* [dump](quickjsvm.md#dump)
* [evalCode](quickjsvm.md#evalcode)
* [getNumber](quickjsvm.md#getnumber)
* [getProp](quickjsvm.md#getprop)
* [getString](quickjsvm.md#getstring)
* [newFunction](quickjsvm.md#newfunction)
* [newNumber](quickjsvm.md#newnumber)
* [newObject](quickjsvm.md#newobject)
* [newString](quickjsvm.md#newstring)
* [setProp](quickjsvm.md#setprop)
* [typeof](quickjsvm.md#typeof)
* [unwrapResult](quickjsvm.md#unwrapresult)

## Constructors

###  constructor

\+ **new QuickJSVm**(`args`: object): *[QuickJSVm](quickjsvm.md)*

*Defined in [quickjs.ts:116](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/quickjs.ts#L116)*

Use [QuickJS.createVm](quickjs.md#createvm) to create a QuickJSVm instance.

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *[QuickJSVm](quickjsvm.md)*

## Properties

###  ctx

• **ctx**: *[Lifetime](lifetime.md)‹[JSContextPointer](../globals.md#jscontextpointer)›*

*Defined in [quickjs.ts:109](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/quickjs.ts#L109)*

___

###  rt

• **rt**: *[Lifetime](lifetime.md)‹[JSRuntimePointer](../globals.md#jsruntimepointer)›*

*Defined in [quickjs.ts:110](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/quickjs.ts#L110)*

## Accessors

###  global

• **get global**(): *[Lifetime](lifetime.md)‹number & object, [QuickJSVm](quickjsvm.md)‹›› | [Lifetime](lifetime.md)‹number & object, [QuickJSVm](quickjsvm.md)‹››*

*Defined in [quickjs.ts:151](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/quickjs.ts#L151)*

[`global`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects).
A handle to the global object inside the interpreter.
You can set properties to create global variables.

**Returns:** *[Lifetime](lifetime.md)‹number & object, [QuickJSVm](quickjsvm.md)‹›› | [Lifetime](lifetime.md)‹number & object, [QuickJSVm](quickjsvm.md)‹››*

___

###  undefined

• **get undefined**(): *[Lifetime](lifetime.md)‹number & object, [QuickJSVm](quickjsvm.md)‹›› | [Lifetime](lifetime.md)‹number & object, [QuickJSVm](quickjsvm.md)‹››*

*Defined in [quickjs.ts:136](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/quickjs.ts#L136)*

[`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined).

**Returns:** *[Lifetime](lifetime.md)‹number & object, [QuickJSVm](quickjsvm.md)‹›› | [Lifetime](lifetime.md)‹number & object, [QuickJSVm](quickjsvm.md)‹››*

## Methods

###  callFunction

▸ **callFunction**(`func`: [QuickJSHandle](../globals.md#quickjshandle), `thisVal`: [QuickJSHandle](../globals.md#quickjshandle), ...`args`: [QuickJSHandle](../globals.md#quickjshandle)[]): *[VmCallResult](../globals.md#vmcallresult)‹[QuickJSHandle](../globals.md#quickjshandle)›*

*Defined in [quickjs.ts:341](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/quickjs.ts#L341)*

[`func.call(thisVal, ...args)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call).
Call a JSValue as a function.

See [unwrapResult], which will throw if the function returned an error, or
return the result handle directly.

**Parameters:**

Name | Type |
------ | ------ |
`func` | [QuickJSHandle](../globals.md#quickjshandle) |
`thisVal` | [QuickJSHandle](../globals.md#quickjshandle) |
`...args` | [QuickJSHandle](../globals.md#quickjshandle)[] |

**Returns:** *[VmCallResult](../globals.md#vmcallresult)‹[QuickJSHandle](../globals.md#quickjshandle)›*

A result. If the function threw, result `error` be a handle to the exception.

___

###  defineProp

▸ **defineProp**(`handle`: [QuickJSHandle](../globals.md#quickjshandle), `key`: string | [QuickJSHandle](../globals.md#quickjshandle), `descriptor`: [VmPropertyDescriptor](../interfaces/vmpropertydescriptor.md)‹[QuickJSHandle](../globals.md#quickjshandle)›): *void*

*Defined in [quickjs.ts:296](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/quickjs.ts#L296)*

[`Object.defineProperty(handle, key, descriptor)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`handle` | [QuickJSHandle](../globals.md#quickjshandle) | - |
`key` | string &#124; [QuickJSHandle](../globals.md#quickjshandle) | The property may be specified as a JSValue handle, or as a Javascript string (which will be converted automatically).  |
`descriptor` | [VmPropertyDescriptor](../interfaces/vmpropertydescriptor.md)‹[QuickJSHandle](../globals.md#quickjshandle)› | - |

**Returns:** *void*

___

###  dispose

▸ **dispose**(): *void*

*Defined in [quickjs.ts:437](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/quickjs.ts#L437)*

Dispose of this VM's underlying resources.

**`throws`** If Calling this method without disposing of all created handles
will result in an error.

**Returns:** *void*

___

###  dump

▸ **dump**(`handle`: [QuickJSHandle](../globals.md#quickjshandle)): *any*

*Defined in [quickjs.ts:391](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/quickjs.ts#L391)*

Dump a JSValue to Javascript in a best-effort fashion.
Returns `handle.toString()` if it cannot be serialized to JSON.

**Parameters:**

Name | Type |
------ | ------ |
`handle` | [QuickJSHandle](../globals.md#quickjshandle) |

**Returns:** *any*

___

###  evalCode

▸ **evalCode**(`code`: string): *[VmCallResult](../globals.md#vmcallresult)‹[QuickJSHandle](../globals.md#quickjshandle)›*

*Implementation of [LowLevelJavascriptVm](../interfaces/lowleveljavascriptvm.md)*

*Defined in [quickjs.ts:375](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/quickjs.ts#L375)*

Like [`eval(code)`].
Evauatetes the Javascript source `code` in the global scope of this VM.

See [unwrapResult], which will throw if the function returned an error, or
return the result handle directly.

**Parameters:**

Name | Type |
------ | ------ |
`code` | string |

**Returns:** *[VmCallResult](../globals.md#vmcallresult)‹[QuickJSHandle](../globals.md#quickjshandle)›*

The last statement's vlaue. If the code threw, result `error` be
a handle to the exception.

___

###  getNumber

▸ **getNumber**(`handle`: [QuickJSHandle](../globals.md#quickjshandle)): *number*

*Defined in [quickjs.ts:189](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/quickjs.ts#L189)*

Converts `handle` into a Javascript number.

**Parameters:**

Name | Type |
------ | ------ |
`handle` | [QuickJSHandle](../globals.md#quickjshandle) |

**Returns:** *number*

`NaN` on error, othewise a `number`.

___

###  getProp

▸ **getProp**(`handle`: [QuickJSHandle](../globals.md#quickjshandle), `key`: string | [QuickJSHandle](../globals.md#quickjshandle)): *[QuickJSHandle](../globals.md#quickjshandle)*

*Defined in [quickjs.ts:256](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/quickjs.ts#L256)*

`handle[key]`.
Get a property from a JSValue.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`handle` | [QuickJSHandle](../globals.md#quickjshandle) | - |
`key` | string &#124; [QuickJSHandle](../globals.md#quickjshandle) | The property may be specified as a JSValue handle, or as a Javascript string (which will be converted automatically).  |

**Returns:** *[QuickJSHandle](../globals.md#quickjshandle)*

___

###  getString

▸ **getString**(`handle`: [QuickJSHandle](../globals.md#quickjshandle)): *string*

*Defined in [quickjs.ts:204](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/quickjs.ts#L204)*

Converts `handle` to a Javascript string.

**Parameters:**

Name | Type |
------ | ------ |
`handle` | [QuickJSHandle](../globals.md#quickjshandle) |

**Returns:** *string*

___

###  newFunction

▸ **newFunction**(`name`: string, `fn`: [VmFunctionImplementation](../globals.md#vmfunctionimplementation)‹[QuickJSHandle](../globals.md#quickjshandle)›): *[QuickJSHandle](../globals.md#quickjshandle)*

*Implementation of [LowLevelJavascriptVm](../interfaces/lowleveljavascriptvm.md)*

*Defined in [quickjs.ts:233](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/quickjs.ts#L233)*

Convert a Javascript function into a QuickJS function value.
See [VmFunctionImplementation](../globals.md#vmfunctionimplementation) for more details.

A [VmFunctionImplementation](../globals.md#vmfunctionimplementation) should not free its arguments or its retun
value. A VmFunctionImplementation should also not retain any references to
its veturn value.

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`fn` | [VmFunctionImplementation](../globals.md#vmfunctionimplementation)‹[QuickJSHandle](../globals.md#quickjshandle)› |

**Returns:** *[QuickJSHandle](../globals.md#quickjshandle)*

___

###  newNumber

▸ **newNumber**(`num`: number): *[QuickJSHandle](../globals.md#quickjshandle)*

*Implementation of [LowLevelJavascriptVm](../interfaces/lowleveljavascriptvm.md)*

*Defined in [quickjs.ts:181](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/quickjs.ts#L181)*

Converts a Javascript number into a QuckJS value.

**Parameters:**

Name | Type |
------ | ------ |
`num` | number |

**Returns:** *[QuickJSHandle](../globals.md#quickjshandle)*

___

###  newObject

▸ **newObject**(`prototype?`: [QuickJSHandle](../globals.md#quickjshandle)): *[Lifetime](lifetime.md)‹number & object, [QuickJSVm](quickjsvm.md)‹››*

*Implementation of [LowLevelJavascriptVm](../interfaces/lowleveljavascriptvm.md)*

*Defined in [quickjs.ts:215](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/quickjs.ts#L215)*

`{}`.
Create a new QuickJS [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`prototype?` | [QuickJSHandle](../globals.md#quickjshandle) | Like [`Object.create`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create).  |

**Returns:** *[Lifetime](lifetime.md)‹number & object, [QuickJSVm](quickjsvm.md)‹››*

___

###  newString

▸ **newString**(`str`: string): *[Lifetime](lifetime.md)‹number & object, [QuickJSVm](quickjsvm.md)‹››*

*Implementation of [LowLevelJavascriptVm](../interfaces/lowleveljavascriptvm.md)*

*Defined in [quickjs.ts:197](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/quickjs.ts#L197)*

Create a QuickJS [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) value.

**Parameters:**

Name | Type |
------ | ------ |
`str` | string |

**Returns:** *[Lifetime](lifetime.md)‹number & object, [QuickJSVm](quickjsvm.md)‹››*

___

###  setProp

▸ **setProp**(`handle`: [QuickJSHandle](../globals.md#quickjshandle), `key`: string | [QuickJSHandle](../globals.md#quickjshandle), `value`: [QuickJSHandle](../globals.md#quickjshandle)): *void*

*Defined in [quickjs.ts:279](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/quickjs.ts#L279)*

`handle[key] = value`.
Set a property on a JSValue.

**`remarks`** 
Note that the QuickJS authors recommend using [defineProp](quickjsvm.md#defineprop) to define new
properties.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`handle` | [QuickJSHandle](../globals.md#quickjshandle) | - |
`key` | string &#124; [QuickJSHandle](../globals.md#quickjshandle) | The property may be specified as a JSValue handle, or as a Javascript string (which will be converted automatically).  |
`value` | [QuickJSHandle](../globals.md#quickjshandle) | - |

**Returns:** *void*

___

###  typeof

▸ **typeof**(`handle`: [QuickJSHandle](../globals.md#quickjshandle)): *string*

*Defined in [quickjs.ts:173](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/quickjs.ts#L173)*

`typeof` operator. **Not** [standards compliant](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof).

**`remarks`** 
Does not support BigInt values correctly.

**Parameters:**

Name | Type |
------ | ------ |
`handle` | [QuickJSHandle](../globals.md#quickjshandle) |

**Returns:** *string*

___

###  unwrapResult

▸ **unwrapResult**(`result`: [VmCallResult](../globals.md#vmcallresult)‹[QuickJSHandle](../globals.md#quickjshandle)›): *[QuickJSHandle](../globals.md#quickjshandle)*

*Defined in [quickjs.ts:413](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/quickjs.ts#L413)*

Unwrap a VmCallResult, returning it's value on success, and throwing the dumped
error on failure.

**Parameters:**

Name | Type |
------ | ------ |
`result` | [VmCallResult](../globals.md#vmcallresult)‹[QuickJSHandle](../globals.md#quickjshandle)› |

**Returns:** *[QuickJSHandle](../globals.md#quickjshandle)*
