[quickjs-emscripten](../README.md) › [Globals](../globals.md) › [QuickJSVm](quickjsvm.md)

# Class: QuickJSVm

QuickJSVm wraps a QuickJS Javascript runtime (JSRuntime*) and context (JSContext*).
This class's methods return [QuickJSHandle](../globals.md#quickjshandle), which wrap C pointers (JSValue*).
It's the caller's responsibility to call `.dispose()` on any
handles you create to free memory once you're done with the handle.

Each QuickJSVm instance is isolated. You cannot share handles between different
QuickJSVm instances. You should create separate QuickJSVm instances for
untrusted code from different sources for isolation.

Use [QuickJS.createVm](quickjs.md#createvm) to create a new QuickJSVm.

Create QuickJS values inside the interpreter with methods like
[newNumber](quickjsvm.md#newnumber), [newString](quickjsvm.md#newstring), [newArray](quickjsvm.md#newarray), [newObject](quickjsvm.md#newobject),
[newFunction](quickjsvm.md#newfunction), and [newPromise](quickjsvm.md#newpromise).

Call [setProp](quickjsvm.md#setprop) or [defineProp](quickjsvm.md#defineprop) to customize objects. Use those methods
with [global](quickjsvm.md#global) to expose the values you create to the interior of the
interpreter, so they can be used in [evalCode](quickjsvm.md#evalcode).

Use [evalCode](quickjsvm.md#evalcode) or [callFunction](quickjsvm.md#callfunction) to execute Javascript inside the VM. If
you're using asynchronous code inside the QuickJSVm, you may need to also
call [executePendingJobs](quickjsvm.md#executependingjobs). Executing code inside the runtime returns a
result object representing successful execution or an error. You must dispose
of any such results to avoid leaking memory inside the VM.

Implement memory and CPU constraints with [setInterruptHandler](quickjsvm.md#setinterrupthandler)
(called regularly while the interpreter runs) and [setMemoryLimit](quickjsvm.md#setmemorylimit).
Use [computeMemoryUsage](quickjsvm.md#computememoryusage) or [dumpMemoryUsage](quickjsvm.md#dumpmemoryusage) to guide memory limit
tuning.

## Hierarchy

* **QuickJSVm**

## Implements

* [LowLevelJavascriptVm](../interfaces/lowleveljavascriptvm.md)‹[QuickJSHandle](../globals.md#quickjshandle)›
* [Disposable](../interfaces/disposable.md)

## Index

### Constructors

* [constructor](quickjsvm.md#constructor)

### Accessors

* [alive](quickjsvm.md#alive)
* [false](quickjsvm.md#false)
* [global](quickjsvm.md#global)
* [null](quickjsvm.md#null)
* [true](quickjsvm.md#true)
* [undefined](quickjsvm.md#undefined)

### Methods

* [callFunction](quickjsvm.md#callfunction)
* [computeMemoryUsage](quickjsvm.md#computememoryusage)
* [defineProp](quickjsvm.md#defineprop)
* [dispose](quickjsvm.md#dispose)
* [dump](quickjsvm.md#dump)
* [dumpMemoryUsage](quickjsvm.md#dumpmemoryusage)
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
* [newPromise](quickjsvm.md#newpromise)
* [newString](quickjsvm.md#newstring)
* [removeInterruptHandler](quickjsvm.md#removeinterrupthandler)
* [resolvePromise](quickjsvm.md#resolvepromise)
* [setInterruptHandler](quickjsvm.md#setinterrupthandler)
* [setMemoryLimit](quickjsvm.md#setmemorylimit)
* [setProp](quickjsvm.md#setprop)
* [typeof](quickjsvm.md#typeof)
* [unwrapResult](quickjsvm.md#unwrapresult)

## Constructors

###  constructor

\+ **new QuickJSVm**(`args`: object): *[QuickJSVm](quickjsvm.md)*

*Defined in [quickjs.ts:257](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L257)*

Use [QuickJS.createVm](quickjs.md#createvm) to create a QuickJSVm instance.

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *[QuickJSVm](quickjsvm.md)*

## Accessors

###  alive

• **get alive**(): *boolean*

*Defined in [quickjs.ts:815](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L815)*

**Returns:** *boolean*

___

###  false

• **get false**(): *[QuickJSHandle](../globals.md#quickjshandle)*

*Defined in [quickjs.ts:316](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L316)*

[`false`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/false).

**Returns:** *[QuickJSHandle](../globals.md#quickjshandle)*

___

###  global

• **get global**(): *[QuickJSHandle](../globals.md#quickjshandle)*

*Defined in [quickjs.ts:331](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L331)*

[`global`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects).
A handle to the global object inside the interpreter.
You can set properties to create global variables.

**Returns:** *[QuickJSHandle](../globals.md#quickjshandle)*

___

###  null

• **get null**(): *[QuickJSHandle](../globals.md#quickjshandle)*

*Defined in [quickjs.ts:290](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L290)*

[`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null).

**Returns:** *[QuickJSHandle](../globals.md#quickjshandle)*

___

###  true

• **get true**(): *[QuickJSHandle](../globals.md#quickjshandle)*

*Defined in [quickjs.ts:303](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L303)*

[`true`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/true).

**Returns:** *[QuickJSHandle](../globals.md#quickjshandle)*

___

###  undefined

• **get undefined**(): *[QuickJSHandle](../globals.md#quickjshandle)*

*Defined in [quickjs.ts:277](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L277)*

[`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined).

**Returns:** *[QuickJSHandle](../globals.md#quickjshandle)*

## Methods

###  callFunction

▸ **callFunction**(`func`: [QuickJSHandle](../globals.md#quickjshandle), `thisVal`: [QuickJSHandle](../globals.md#quickjshandle), ...`args`: [QuickJSHandle](../globals.md#quickjshandle)[]): *[VmCallResult](../globals.md#vmcallresult)‹[QuickJSHandle](../globals.md#quickjshandle)›*

*Defined in [quickjs.ts:614](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L614)*

[`func.call(thisVal, ...args)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call).
Call a JSValue as a function.

See [unwrapResult](quickjsvm.md#unwrapresult), which will throw if the function returned an error, or
return the result handle directly. If evaluation returned a handle containing
a promise, use [resolvePromise](quickjsvm.md#resolvepromise) to convert it to a native promise and
[executePendingJobs](quickjsvm.md#executependingjobs) to finish evaluating the promise.

**Parameters:**

Name | Type |
------ | ------ |
`func` | [QuickJSHandle](../globals.md#quickjshandle) |
`thisVal` | [QuickJSHandle](../globals.md#quickjshandle) |
`...args` | [QuickJSHandle](../globals.md#quickjshandle)[] |

**Returns:** *[VmCallResult](../globals.md#vmcallresult)‹[QuickJSHandle](../globals.md#quickjshandle)›*

A result. If the function threw synchronously, `result.error` be a
handle to the exception. Otherwise `result.value` will be a handle to the
value.

___

###  computeMemoryUsage

▸ **computeMemoryUsage**(): *[QuickJSHandle](../globals.md#quickjshandle)*

*Defined in [quickjs.ts:790](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L790)*

Compute memory usage for this runtime. Returns the result as a handle to a
JSValue object. Use [dump](quickjsvm.md#dump) to convert to a native object.
Calling this method will allocate more memory inside the runtime. The information
is accurate as of just before the call to `computeMemoryUsage`.
For a human-digestible representation, see [dumpMemoryUsage](quickjsvm.md#dumpmemoryusage).

**Returns:** *[QuickJSHandle](../globals.md#quickjshandle)*

___

###  defineProp

▸ **defineProp**(`handle`: [QuickJSHandle](../globals.md#quickjshandle), `key`: [QuickJSPropertyKey](../globals.md#quickjspropertykey), `descriptor`: [VmPropertyDescriptor](../interfaces/vmpropertydescriptor.md)‹[QuickJSHandle](../globals.md#quickjshandle)›): *void*

*Defined in [quickjs.ts:567](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L567)*

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

*Implementation of [Disposable](../interfaces/disposable.md)*

*Defined in [quickjs.ts:825](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L825)*

Dispose of this VM's underlying resources.

**`throws`** Calling this method without disposing of all created handles
will result in an error.

**Returns:** *void*

___

###  dump

▸ **dump**(`handle`: [QuickJSHandle](../globals.md#quickjshandle)): *any*

*Defined in [quickjs.ts:712](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L712)*

Dump a JSValue to Javascript in a best-effort fashion.
Returns `handle.toString()` if it cannot be serialized to JSON.

**Parameters:**

Name | Type |
------ | ------ |
`handle` | [QuickJSHandle](../globals.md#quickjshandle) |

**Returns:** *any*

___

###  dumpMemoryUsage

▸ **dumpMemoryUsage**(): *string*

*Defined in [quickjs.ts:800](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L800)*

**Returns:** *string*

a human-readable description of memory usage in this runtime.
For programmatic access to this information, see [computeMemoryUsage](quickjsvm.md#computememoryusage).

___

###  evalCode

▸ **evalCode**(`code`: string): *[VmCallResult](../globals.md#vmcallresult)‹[QuickJSHandle](../globals.md#quickjshandle)›*

*Implementation of [LowLevelJavascriptVm](../interfaces/lowleveljavascriptvm.md)*

*Defined in [quickjs.ts:653](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L653)*

Like [`eval(code)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#Description).
Evaluates the Javascript source `code` in the global scope of this VM.
When working with async code, you many need to call [executePendingJobs](quickjsvm.md#executependingjobs)
to execute callbacks pending after synchronous evaluation returns.

See [unwrapResult](quickjsvm.md#unwrapresult), which will throw if the function returned an error, or
return the result handle directly. If evaluation returned a handle containing
a promise, use [resolvePromise](quickjsvm.md#resolvepromise) to convert it to a native promise and
[executePendingJobs](quickjsvm.md#executependingjobs) to finish evaluating the promise.

*Note*: to protect against infinite loops, provide an interrupt handler to
[setInterruptHandler](quickjsvm.md#setinterrupthandler). You can use [shouldInterruptAfterDeadline](../globals.md#shouldinterruptafterdeadline) to
create a time-based deadline.

**Parameters:**

Name | Type |
------ | ------ |
`code` | string |

**Returns:** *[VmCallResult](../globals.md#vmcallresult)‹[QuickJSHandle](../globals.md#quickjshandle)›*

The last statement's value. If the code threw synchronously,
`result.error` will be a handle to the exception. If execution was
interrupted, the error will have name `InternalError` and message
`interrupted`.

___

###  executePendingJobs

▸ **executePendingJobs**(`maxJobsToExecute`: number): *[ExecutePendingJobsResult](../globals.md#executependingjobsresult)*

*Defined in [quickjs.ts:682](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L682)*

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
that stopped execution. Note that executePendingJobs will not normally return
errors thrown inside async functions or rejected promises. Those errors are
available by calling [resolvePromise](quickjsvm.md#resolvepromise) on the promise handle returned by
the async function.

___

###  getNumber

▸ **getNumber**(`handle`: [QuickJSHandle](../globals.md#quickjshandle)): *number*

*Defined in [quickjs.ts:372](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L372)*

Converts `handle` into a Javascript number.

**Parameters:**

Name | Type |
------ | ------ |
`handle` | [QuickJSHandle](../globals.md#quickjshandle) |

**Returns:** *number*

`NaN` on error, otherwise a `number`.

___

###  getProp

▸ **getProp**(`handle`: [QuickJSHandle](../globals.md#quickjshandle), `key`: [QuickJSPropertyKey](../globals.md#quickjspropertykey)): *[QuickJSHandle](../globals.md#quickjshandle)*

*Defined in [quickjs.ts:531](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L531)*

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

*Defined in [quickjs.ts:390](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L390)*

Converts `handle` to a Javascript string.

**Parameters:**

Name | Type |
------ | ------ |
`handle` | [QuickJSHandle](../globals.md#quickjshandle) |

**Returns:** *string*

___

###  hasPendingJob

▸ **hasPendingJob**(): *boolean*

*Defined in [quickjs.ts:702](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L702)*

In QuickJS, promises and async functions create pendingJobs. These do not execute
immediately and need to be run by calling [executePendingJobs](quickjsvm.md#executependingjobs).

**Returns:** *boolean*

true if there is at least one pendingJob queued up.

___

###  newArray

▸ **newArray**(): *[QuickJSHandle](../globals.md#quickjshandle)*

*Defined in [quickjs.ts:415](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L415)*

`[]`.
Create a new QuickJS [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

**Returns:** *[QuickJSHandle](../globals.md#quickjshandle)*

___

###  newFunction

▸ **newFunction**(`name`: string, `fn`: [VmFunctionImplementation](../globals.md#vmfunctionimplementation)‹[QuickJSHandle](../globals.md#quickjshandle)›): *[QuickJSHandle](../globals.md#quickjshandle)*

*Implementation of [LowLevelJavascriptVm](../interfaces/lowleveljavascriptvm.md)*

*Defined in [quickjs.ts:438](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L438)*

Convert a Javascript function into a QuickJS function value.
See [VmFunctionImplementation](../globals.md#vmfunctionimplementation) for more details.

A [VmFunctionImplementation](../globals.md#vmfunctionimplementation) should not free its arguments or its return
value. A VmFunctionImplementation should also not retain any references to
its return value.

To implement an async function, create a promise with [newPromise](quickjsvm.md#newpromise), then
return the deferred promise handle from `deferred.handle` from your
function implementation:

```
const deferred = vm.newPromise()
someNativeAsyncFunction().then(deferred.resolve)
return deferred.handle
```

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

*Defined in [quickjs.ts:364](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L364)*

Converts a Javascript number into a QuickJS value.

**Parameters:**

Name | Type |
------ | ------ |
`num` | number |

**Returns:** *[QuickJSHandle](../globals.md#quickjshandle)*

___

###  newObject

▸ **newObject**(`prototype?`: [QuickJSHandle](../globals.md#quickjshandle)): *[QuickJSHandle](../globals.md#quickjshandle)*

*Implementation of [LowLevelJavascriptVm](../interfaces/lowleveljavascriptvm.md)*

*Defined in [quickjs.ts:401](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L401)*

`{}`.
Create a new QuickJS [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`prototype?` | [QuickJSHandle](../globals.md#quickjshandle) | Like [`Object.create`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create).  |

**Returns:** *[QuickJSHandle](../globals.md#quickjshandle)*

___

###  newPromise

▸ **newPromise**(): *[QuickJSDeferredPromise](quickjsdeferredpromise.md)*

*Defined in [quickjs.ts:460](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L460)*

Create a new [QuickJSDeferredPromise](quickjsdeferredpromise.md). Use `deferred.resolve(handle)` and
`deferred.reject(handle)` to fulfill the promise handle available at `deferred.handle`.
Note that you are responsible for calling `deferred.dispose()` to free the underlying
resources; see the documentation on [QuickJSDeferredPromise](quickjsdeferredpromise.md) for details.

**Returns:** *[QuickJSDeferredPromise](quickjsdeferredpromise.md)*

___

###  newString

▸ **newString**(`str`: string): *[QuickJSHandle](../globals.md#quickjshandle)*

*Implementation of [LowLevelJavascriptVm](../interfaces/lowleveljavascriptvm.md)*

*Defined in [quickjs.ts:380](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L380)*

Create a QuickJS [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) value.

**Parameters:**

Name | Type |
------ | ------ |
`str` | string |

**Returns:** *[QuickJSHandle](../globals.md#quickjshandle)*

___

###  removeInterruptHandler

▸ **removeInterruptHandler**(): *void*

*Defined in [quickjs.ts:808](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L808)*

Remove the interrupt handler, if any.
See [setInterruptHandler](quickjsvm.md#setinterrupthandler).

**Returns:** *void*

___

###  resolvePromise

▸ **resolvePromise**(`promiseLikeHandle`: [QuickJSHandle](../globals.md#quickjshandle)): *Promise‹[VmCallResult](../globals.md#vmcallresult)‹[QuickJSHandle](../globals.md#quickjshandle)››*

*Defined in [quickjs.ts:490](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L490)*

`Promise.resolve(value)`.
Convert a handle containing a Promise-like value inside the VM into an
actual promise on the host.

**`remarks`** 
You may need to call [executePendingJobs](quickjsvm.md#executependingjobs) to ensure that the promise is resolved.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`promiseLikeHandle` | [QuickJSHandle](../globals.md#quickjshandle) | A handle to a Promise-like value with a `.then(onSuccess, onError)` method.  |

**Returns:** *Promise‹[VmCallResult](../globals.md#vmcallresult)‹[QuickJSHandle](../globals.md#quickjshandle)››*

___

###  setInterruptHandler

▸ **setInterruptHandler**(`cb`: [InterruptHandler](../globals.md#interrupthandler)): *void*

*Defined in [quickjs.ts:763](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L763)*

Set a callback which is regularly called by the QuickJS engine when it is
executing code. This callback can be used to implement an execution
timeout.

The interrupt handler can be removed with [removeInterruptHandler](quickjsvm.md#removeinterrupthandler).

**Parameters:**

Name | Type |
------ | ------ |
`cb` | [InterruptHandler](../globals.md#interrupthandler) |

**Returns:** *void*

___

###  setMemoryLimit

▸ **setMemoryLimit**(`limitBytes`: number): *void*

*Defined in [quickjs.ts:775](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L775)*

Set the max memory this runtime can allocate.
To remove the limit, set to `-1`.

**Parameters:**

Name | Type |
------ | ------ |
`limitBytes` | number |

**Returns:** *void*

___

###  setProp

▸ **setProp**(`handle`: [QuickJSHandle](../globals.md#quickjshandle), `key`: [QuickJSPropertyKey](../globals.md#quickjspropertykey), `value`: [QuickJSHandle](../globals.md#quickjshandle)): *void*

*Defined in [quickjs.ts:552](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L552)*

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

###  typeof

▸ **typeof**(`handle`: [QuickJSHandle](../globals.md#quickjshandle)): *string*

*Defined in [quickjs.ts:356](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L356)*

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

*Defined in [quickjs.ts:737](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L737)*

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
