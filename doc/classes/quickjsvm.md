[quickjs-emscripten](../README.md) › [Globals](../globals.md) › [QuickJSVm](quickjsvm.md)

# Class: QuickJSVm

QuickJSVm wraps a QuickJS Javascript runtime (JSRuntime*) and context (JSContext*).
This class's methods return [QuickJSHandle](../globals.md#quickjshandle), which wrap C pointers (JSValue*).
It's the caller's responsibility to call `.dispose()` on any
handles you create to free memory once you're done with the handle.

Each QuickJSVm instance is isolated. You cannot share handles between different
QuickJSVm instances. You should create separate QuickJSVm instances for
untrusted code from different souces for isolation.

Use [QuickJS.createVm](quickjs.md#createvm) to create a new QuickJSVm.

Create QuickJS values with methods like [newNumber](quickjsvm.md#newnumber), [newString](quickjsvm.md#newstring), [newArray](quickjsvm.md#newarray), [newObject](quickjsvm.md#newobject), and [newFunction](quickjsvm.md#newfunction).

Call [setProp](quickjsvm.md#setprop) or [defineProp](quickjsvm.md#defineprop) to customize objects. Use those methods with [global](quickjsvm.md#global) to expose the
values you create to the interior of the interpreter, so they can be used in [evalCode](quickjsvm.md#evalcode).

Use [evalCode](quickjsvm.md#evalcode) or [callFunction](quickjsvm.md#callfunction) to execute Javascript inside the VM.
If you're using asynchronous code inside the QuickJSVm, you may need to also call [executePendingJobs](quickjsvm.md#executependingjobs).

## Hierarchy

* **QuickJSVm**

## Implements

* [LowLevelJavascriptVm](../interfaces/lowleveljavascriptvm.md)‹[QuickJSHandle](../globals.md#quickjshandle)›

## Index

### Constructors

* [constructor](quickjsvm.md#constructor)

### Accessors

* [false](quickjsvm.md#false)
* [global](quickjsvm.md#global)
* [null](quickjsvm.md#null)
* [true](quickjsvm.md#true)
* [undefined](quickjsvm.md#undefined)

### Methods

* [callFunction](quickjsvm.md#callfunction)
* [defineProp](quickjsvm.md#defineprop)
* [dispose](quickjsvm.md#dispose)
* [dump](quickjsvm.md#dump)
* [evalCode](quickjsvm.md#evalcode)
* [executePendingJobs](quickjsvm.md#executependingjobs)
* [getNumber](quickjsvm.md#getnumber)
* [getProp](quickjsvm.md#getprop)
* [getString](quickjsvm.md#getstring)
* [hasPendingJob](quickjsvm.md#haspendingjob)
* [newArray](quickjsvm.md#newarray)
* [newFunction](quickjsvm.md#newfunction)
* [newNumber](quickjsvm.md#newnumber)
* [newObject](quickjsvm.md#newobject)
* [newString](quickjsvm.md#newstring)
* [removeShouldInterruptHandler](quickjsvm.md#removeshouldinterrupthandler)
* [setProp](quickjsvm.md#setprop)
* [setShouldInterruptHandler](quickjsvm.md#setshouldinterrupthandler)
* [typeof](quickjsvm.md#typeof)
* [unwrapResult](quickjsvm.md#unwrapresult)

## Constructors

###  constructor

\+ **new QuickJSVm**(`args`: object): *[QuickJSVm](quickjsvm.md)*

*Defined in [quickjs.ts:170](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L170)*

Use [QuickJS.createVm](quickjs.md#createvm) to create a QuickJSVm instance.

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *[QuickJSVm](quickjsvm.md)*

## Accessors

###  false

• **get false**(): *[QuickJSHandle](../globals.md#quickjshandle)*

*Defined in [quickjs.ts:229](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L229)*

[`false`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/false).

**Returns:** *[QuickJSHandle](../globals.md#quickjshandle)*

___

###  global

• **get global**(): *[QuickJSHandle](../globals.md#quickjshandle)*

*Defined in [quickjs.ts:244](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L244)*

[`global`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects).
A handle to the global object inside the interpreter.
You can set properties to create global variables.

**Returns:** *[QuickJSHandle](../globals.md#quickjshandle)*

___

###  null

• **get null**(): *[QuickJSHandle](../globals.md#quickjshandle)*

*Defined in [quickjs.ts:203](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L203)*

[`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null).

**Returns:** *[QuickJSHandle](../globals.md#quickjshandle)*

___

###  true

• **get true**(): *[QuickJSHandle](../globals.md#quickjshandle)*

*Defined in [quickjs.ts:216](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L216)*

[`true`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/true).

**Returns:** *[QuickJSHandle](../globals.md#quickjshandle)*

___

###  undefined

• **get undefined**(): *[QuickJSHandle](../globals.md#quickjshandle)*

*Defined in [quickjs.ts:190](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L190)*

[`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined).

**Returns:** *[QuickJSHandle](../globals.md#quickjshandle)*

## Methods

###  callFunction

▸ **callFunction**(`func`: [QuickJSHandle](../globals.md#quickjshandle), `thisVal`: [QuickJSHandle](../globals.md#quickjshandle), ...`args`: [QuickJSHandle](../globals.md#quickjshandle)[]): *[VmCallResult](../globals.md#vmcallresult)‹[QuickJSHandle](../globals.md#quickjshandle)›*

*Defined in [quickjs.ts:449](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L449)*

[`func.call(thisVal, ...args)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call).
Call a JSValue as a function.

See [unwrapResult](quickjsvm.md#unwrapresult), which will throw if the function returned an error, or
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

▸ **defineProp**(`handle`: [QuickJSHandle](../globals.md#quickjshandle), `key`: [QuickJSPropertyKey](../globals.md#quickjspropertykey), `descriptor`: [VmPropertyDescriptor](../interfaces/vmpropertydescriptor.md)‹[QuickJSHandle](../globals.md#quickjshandle)›): *void*

*Defined in [quickjs.ts:400](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L400)*

[`Object.defineProperty(handle, key, descriptor)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`handle` | [QuickJSHandle](../globals.md#quickjshandle) | - |
`key` | [QuickJSPropertyKey](../globals.md#quickjspropertykey) | The property may be specified as a JSValue handle, or as a Javascript string or number (which will be converted automatically to a JSValue).  |
`descriptor` | [VmPropertyDescriptor](../interfaces/vmpropertydescriptor.md)‹[QuickJSHandle](../globals.md#quickjshandle)› | - |

**Returns:** *void*

___

###  dispose

▸ **dispose**(): *void*

*Defined in [quickjs.ts:623](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L623)*

Dispose of this VM's underlying resources.

**`throws`** Calling this method without disposing of all created handles
will result in an error.

**Returns:** *void*

___

###  dump

▸ **dump**(`handle`: [QuickJSHandle](../globals.md#quickjshandle)): *any*

*Defined in [quickjs.ts:546](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L546)*

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

*Defined in [quickjs.ts:492](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L492)*

Like [`eval(code)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#Description).
Evauatetes the Javascript source `code` in the global scope of this VM.
When working with async code, you many need to call [executePendingJobs](quickjsvm.md#executependingjobs)
to execute callbacks pending after synchronous evaluation returns.

See [unwrapResult](quickjsvm.md#unwrapresult), which will throw if the function returned an error, or
return the result handle directly.

*Note*: to protect against infinite loops, provide an interrupt handler to
[setShouldInterruptHandler](quickjsvm.md#setshouldinterrupthandler). You can use [shouldInterruptAfterDeadline](../globals.md#shouldinterruptafterdeadline) to
create a time-based deadline.

**Parameters:**

Name | Type |
------ | ------ |
`code` | string |

**Returns:** *[VmCallResult](../globals.md#vmcallresult)‹[QuickJSHandle](../globals.md#quickjshandle)›*

The last statement's value. If the code threw, result `error` will be
a handle to the exception. If execution was interrupted, the error will
have name `InternalError` and message `interrupted`.

___

###  executePendingJobs

▸ **executePendingJobs**(`maxJobsToExecute`: number): *[ExecutePendingJobsResult](../globals.md#executependingjobsresult)*

*Defined in [quickjs.ts:516](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L516)*

Execute pendingJobs on the VM until `maxJobsToExecute` jobs are executed
(default all pendingJobs), the queue is exhausted, or the runtime
encounters an exception.

In QuickJS, promises and async functions create pendingJobs. These do not execute
immediately and need to triggered to run.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`maxJobsToExecute` | number |  -1 | When negative, run all pending jobs. Otherwise execute at most `maxJobsToExecute` before returning.  |

**Returns:** *[ExecutePendingJobsResult](../globals.md#executependingjobsresult)*

On success, the number of executed jobs. On error, the exception
that stopped execution.

___

###  getNumber

▸ **getNumber**(`handle`: [QuickJSHandle](../globals.md#quickjshandle)): *number*

*Defined in [quickjs.ts:285](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L285)*

Converts `handle` into a Javascript number.

**Parameters:**

Name | Type |
------ | ------ |
`handle` | [QuickJSHandle](../globals.md#quickjshandle) |

**Returns:** *number*

`NaN` on error, othewise a `number`.

___

###  getProp

▸ **getProp**(`handle`: [QuickJSHandle](../globals.md#quickjshandle), `key`: [QuickJSPropertyKey](../globals.md#quickjspropertykey)): *[QuickJSHandle](../globals.md#quickjshandle)*

*Defined in [quickjs.ts:361](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L361)*

`handle[key]`.
Get a property from a JSValue.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`handle` | [QuickJSHandle](../globals.md#quickjshandle) | - |
`key` | [QuickJSPropertyKey](../globals.md#quickjspropertykey) | The property may be specified as a JSValue handle, or as a Javascript string (which will be converted automatically).  |

**Returns:** *[QuickJSHandle](../globals.md#quickjshandle)*

___

###  getString

▸ **getString**(`handle`: [QuickJSHandle](../globals.md#quickjshandle)): *string*

*Defined in [quickjs.ts:300](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L300)*

Converts `handle` to a Javascript string.

**Parameters:**

Name | Type |
------ | ------ |
`handle` | [QuickJSHandle](../globals.md#quickjshandle) |

**Returns:** *string*

___

###  hasPendingJob

▸ **hasPendingJob**(): *boolean*

*Defined in [quickjs.ts:536](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L536)*

In QuickJS, promises and async functions create pendingJobs. These do not execute
immediately and need to be run by calling [executePendingJobs](quickjsvm.md#executependingjobs).

**Returns:** *boolean*

true if there is at least one pendingJob queued up.

___

###  newArray

▸ **newArray**(): *[QuickJSHandle](../globals.md#quickjshandle)*

*Defined in [quickjs.ts:325](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L325)*

`[]`.
Create a new QuickJS [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

**Returns:** *[QuickJSHandle](../globals.md#quickjshandle)*

___

###  newFunction

▸ **newFunction**(`name`: string, `fn`: [VmFunctionImplementation](../globals.md#vmfunctionimplementation)‹[QuickJSHandle](../globals.md#quickjshandle)›): *[QuickJSHandle](../globals.md#quickjshandle)*

*Implementation of [LowLevelJavascriptVm](../interfaces/lowleveljavascriptvm.md)*

*Defined in [quickjs.ts:338](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L338)*

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

*Defined in [quickjs.ts:277](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L277)*

Converts a Javascript number into a QuckJS value.

**Parameters:**

Name | Type |
------ | ------ |
`num` | number |

**Returns:** *[QuickJSHandle](../globals.md#quickjshandle)*

___

###  newObject

▸ **newObject**(`prototype?`: [QuickJSHandle](../globals.md#quickjshandle)): *[QuickJSHandle](../globals.md#quickjshandle)*

*Implementation of [LowLevelJavascriptVm](../interfaces/lowleveljavascriptvm.md)*

*Defined in [quickjs.ts:311](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L311)*

`{}`.
Create a new QuickJS [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`prototype?` | [QuickJSHandle](../globals.md#quickjshandle) | Like [`Object.create`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create).  |

**Returns:** *[QuickJSHandle](../globals.md#quickjshandle)*

___

###  newString

▸ **newString**(`str`: string): *[QuickJSHandle](../globals.md#quickjshandle)*

*Implementation of [LowLevelJavascriptVm](../interfaces/lowleveljavascriptvm.md)*

*Defined in [quickjs.ts:293](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L293)*

Create a QuickJS [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) value.

**Parameters:**

Name | Type |
------ | ------ |
`str` | string |

**Returns:** *[QuickJSHandle](../globals.md#quickjshandle)*

___

###  removeShouldInterruptHandler

▸ **removeShouldInterruptHandler**(): *void*

*Defined in [quickjs.ts:610](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L610)*

Remove the interrupt handler, if any.
See [setShouldInterruptHandler](quickjsvm.md#setshouldinterrupthandler).

**Returns:** *void*

___

###  setProp

▸ **setProp**(`handle`: [QuickJSHandle](../globals.md#quickjshandle), `key`: [QuickJSPropertyKey](../globals.md#quickjspropertykey), `value`: [QuickJSHandle](../globals.md#quickjshandle)): *void*

*Defined in [quickjs.ts:385](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L385)*

`handle[key] = value`.
Set a property on a JSValue.

**`remarks`** 
Note that the QuickJS authors recommend using [defineProp](quickjsvm.md#defineprop) to define new
properties.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`handle` | [QuickJSHandle](../globals.md#quickjshandle) | - |
`key` | [QuickJSPropertyKey](../globals.md#quickjspropertykey) | The property may be specified as a JSValue handle, or as a Javascript string or number (which will be converted automatically to a JSValue).  |
`value` | [QuickJSHandle](../globals.md#quickjshandle) | - |

**Returns:** *void*

___

###  setShouldInterruptHandler

▸ **setShouldInterruptHandler**(`cb`: [ShouldInterruptHandler](../globals.md#shouldinterrupthandler)): *void*

*Defined in [quickjs.ts:598](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L598)*

Set a callback which is regularly called by the QuickJS engine when it is
executing code. This callback can be used to implement an execution
timeout.

The interrupt handler can be removed with [removeShouldInterruptHandler](quickjsvm.md#removeshouldinterrupthandler).

**Parameters:**

Name | Type |
------ | ------ |
`cb` | [ShouldInterruptHandler](../globals.md#shouldinterrupthandler) |

**Returns:** *void*

___

###  typeof

▸ **typeof**(`handle`: [QuickJSHandle](../globals.md#quickjshandle)): *string*

*Defined in [quickjs.ts:269](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L269)*

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

▸ **unwrapResult**<**T**>(`result`: [SuccessOrFail](../globals.md#successorfail)‹T, [QuickJSHandle](../globals.md#quickjshandle)›): *T*

*Defined in [quickjs.ts:571](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L571)*

Unwrap a SuccessOrFail result such as a [VmCallResult](../globals.md#vmcallresult) or a
[ExecutePendingJobsResult](../globals.md#executependingjobsresult), where the fail branch contains a handle to a QuickJS error value.
If the result is a success, returns the value.
If the result is an error, converts the error to a native object and throws the error.

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`result` | [SuccessOrFail](../globals.md#successorfail)‹T, [QuickJSHandle](../globals.md#quickjshandle)› |

**Returns:** *T*
