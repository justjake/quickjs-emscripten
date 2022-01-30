[quickjs-emscripten](../README.md) / [Exports](../modules.md) / [quickjsvm](../modules/quickjsvm.md) / QuickJSVm

# Class: QuickJSVm

[quickjsvm](../modules/quickjsvm.md).QuickJSVm

QuickJSVm wraps a QuickJS Javascript runtime (JSRuntime*) and context (JSContext*).
This class's methods return [QuickJSHandle](../modules/quickjsvm.md#quickjshandle), which wrap C pointers (JSValue*).
It's the caller's responsibility to call `.dispose()` on any
handles you create to free memory once you're done with the handle.

Each QuickJSVm instance is isolated. You cannot share handles between different
QuickJSVm instances. You should create separate QuickJSVm instances for
untrusted code from different sources for isolation.

Use [QuickJS.createVm](quickjs.QuickJS.md#createvm) to create a new QuickJSVm.

Create QuickJS values inside the interpreter with methods like
[newNumber](quickjsvm.QuickJSVm.md#newnumber), [newString](quickjsvm.QuickJSVm.md#newstring), [newArray](quickjsvm.QuickJSVm.md#newarray), [newObject](quickjsvm.QuickJSVm.md#newobject),
[newFunction](quickjsvm.QuickJSVm.md#newfunction), and [newPromise](quickjsvm.QuickJSVm.md#newpromise).

Call [setProp](quickjsvm.QuickJSVm.md#setprop) or [defineProp](quickjsvm.QuickJSVm.md#defineprop) to customize objects. Use those methods
with [global](quickjsvm.QuickJSVm.md#global) to expose the values you create to the interior of the
interpreter, so they can be used in [evalCode](quickjsvm.QuickJSVm.md#evalcode).

Use [evalCode](quickjsvm.QuickJSVm.md#evalcode) or [callFunction](quickjsvm.QuickJSVm.md#callfunction) to execute Javascript inside the VM. If
you're using asynchronous code inside the QuickJSVm, you may need to also
call [executePendingJobs](quickjsvm.QuickJSVm.md#executependingjobs). Executing code inside the runtime returns a
result object representing successful execution or an error. You must dispose
of any such results to avoid leaking memory inside the VM.

Implement memory and CPU constraints with [setInterruptHandler](quickjsvm.QuickJSVm.md#setinterrupthandler)
(called regularly while the interpreter runs) and [setMemoryLimit](quickjsvm.QuickJSVm.md#setmemorylimit).
Use [computeMemoryUsage](quickjsvm.QuickJSVm.md#computememoryusage) or [dumpMemoryUsage](quickjsvm.QuickJSVm.md#dumpmemoryusage) to guide memory limit
tuning.

## Hierarchy

- **`QuickJSVm`**

  ↳ [`QuickJSAsyncVm`](quickjsasyncvm.QuickJSAsyncVm.md)

## Implements

- [`LowLevelJavascriptVm`](../interfaces/vm_interface.LowLevelJavascriptVm.md)<[`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)\>
- [`Disposable`](../interfaces/lifetime.Disposable.md)

## Table of contents

### Constructors

- [constructor](quickjsvm.QuickJSVm.md#constructor)

### Properties

- [\_false](quickjsvm.QuickJSVm.md#_false)
- [\_global](quickjsvm.QuickJSVm.md#_global)
- [\_null](quickjsvm.QuickJSVm.md#_null)
- [\_scope](quickjsvm.QuickJSVm.md#_scope)
- [\_true](quickjsvm.QuickJSVm.md#_true)
- [\_undefined](quickjsvm.QuickJSVm.md#_undefined)
- [ctx](quickjsvm.QuickJSVm.md#ctx)
- [ffi](quickjsvm.QuickJSVm.md#ffi)
- [module](quickjsvm.QuickJSVm.md#module)
- [rt](quickjsvm.QuickJSVm.md#rt)

### Accessors

- [alive](quickjsvm.QuickJSVm.md#alive)
- [false](quickjsvm.QuickJSVm.md#false)
- [global](quickjsvm.QuickJSVm.md#global)
- [null](quickjsvm.QuickJSVm.md#null)
- [true](quickjsvm.QuickJSVm.md#true)
- [undefined](quickjsvm.QuickJSVm.md#undefined)

### Methods

- [callFunction](quickjsvm.QuickJSVm.md#callfunction)
- [computeMemoryUsage](quickjsvm.QuickJSVm.md#computememoryusage)
- [defineProp](quickjsvm.QuickJSVm.md#defineprop)
- [dispose](quickjsvm.QuickJSVm.md#dispose)
- [dump](quickjsvm.QuickJSVm.md#dump)
- [dumpMemoryUsage](quickjsvm.QuickJSVm.md#dumpmemoryusage)
- [evalCode](quickjsvm.QuickJSVm.md#evalcode)
- [executePendingJobs](quickjsvm.QuickJSVm.md#executependingjobs)
- [getNumber](quickjsvm.QuickJSVm.md#getnumber)
- [getProp](quickjsvm.QuickJSVm.md#getprop)
- [getString](quickjsvm.QuickJSVm.md#getstring)
- [hasPendingJob](quickjsvm.QuickJSVm.md#haspendingjob)
- [newArray](quickjsvm.QuickJSVm.md#newarray)
- [newFunction](quickjsvm.QuickJSVm.md#newfunction)
- [newNumber](quickjsvm.QuickJSVm.md#newnumber)
- [newObject](quickjsvm.QuickJSVm.md#newobject)
- [newPromise](quickjsvm.QuickJSVm.md#newpromise)
- [newString](quickjsvm.QuickJSVm.md#newstring)
- [removeInterruptHandler](quickjsvm.QuickJSVm.md#removeinterrupthandler)
- [resolvePromise](quickjsvm.QuickJSVm.md#resolvepromise)
- [setInterruptHandler](quickjsvm.QuickJSVm.md#setinterrupthandler)
- [setMemoryLimit](quickjsvm.QuickJSVm.md#setmemorylimit)
- [setProp](quickjsvm.QuickJSVm.md#setprop)
- [typeof](quickjsvm.QuickJSVm.md#typeof)
- [unwrapResult](quickjsvm.QuickJSVm.md#unwrapresult)

## Constructors

### constructor

• **new QuickJSVm**(`args`)

Use [QuickJS.createVm](quickjs.QuickJS.md#createvm) to create a QuickJSVm instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.ctx` | [`Lifetime`](lifetime.Lifetime.md)<[`JSContextPointer`](../modules/ffi_types.md#jscontextpointer), `never`, `never`\> |
| `args.ffi` | [`QuickJSFFI`](ffi.QuickJSFFI.md) |
| `args.module` | [`QuickJSEmscriptenModule`](../interfaces/emscripten_types.QuickJSEmscriptenModule.md) |
| `args.rt` | [`Lifetime`](lifetime.Lifetime.md)<[`JSRuntimePointer`](../modules/ffi_types.md#jsruntimepointer), `never`, `never`\> |

#### Defined in

[quickjsvm.ts:164](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L164)

## Properties

### \_false

• `Protected` **\_false**: `undefined` \| [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle) = `undefined`

#### Defined in

[quickjsvm.ts:156](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L156)

___

### \_global

• `Protected` **\_global**: `undefined` \| [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle) = `undefined`

#### Defined in

[quickjsvm.ts:158](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L158)

___

### \_null

• `Protected` **\_null**: `undefined` \| [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle) = `undefined`

#### Defined in

[quickjsvm.ts:155](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L155)

___

### \_scope

• `Protected` **\_scope**: [`Scope`](lifetime.Scope.md)

#### Defined in

[quickjsvm.ts:159](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L159)

___

### \_true

• `Protected` **\_true**: `undefined` \| [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle) = `undefined`

#### Defined in

[quickjsvm.ts:157](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L157)

___

### \_undefined

• `Protected` **\_undefined**: `undefined` \| [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle) = `undefined`

#### Defined in

[quickjsvm.ts:154](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L154)

___

### ctx

• `Protected` `Readonly` **ctx**: [`Lifetime`](lifetime.Lifetime.md)<[`JSContextPointer`](../modules/ffi_types.md#jscontextpointer), `never`, `never`\>

#### Defined in

[quickjsvm.ts:149](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L149)

___

### ffi

• `Protected` `Readonly` **ffi**: [`QuickJSFFI`](ffi.QuickJSFFI.md)

#### Defined in

[quickjsvm.ts:153](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L153)

___

### module

• `Protected` `Readonly` **module**: [`QuickJSEmscriptenModule`](../interfaces/emscripten_types.QuickJSEmscriptenModule.md)

#### Defined in

[quickjsvm.ts:152](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L152)

___

### rt

• `Protected` `Readonly` **rt**: [`Lifetime`](lifetime.Lifetime.md)<[`JSRuntimePointer`](../modules/ffi_types.md#jsruntimepointer), `never`, `never`\>

#### Defined in

[quickjsvm.ts:150](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L150)

## Accessors

### alive

• `get` **alive**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[Disposable](../interfaces/lifetime.Disposable.md).[alive](../interfaces/lifetime.Disposable.md#alive)

#### Defined in

[quickjsvm.ts:717](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L717)

___

### false

• `get` **false**(): [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)

[`false`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/false).

#### Returns

[`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)

#### Defined in

[quickjsvm.ts:218](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L218)

___

### global

• `get` **global**(): [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)

[`global`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects).
A handle to the global object inside the interpreter.
You can set properties to create global variables.

#### Returns

[`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)

#### Implementation of

[LowLevelJavascriptVm](../interfaces/vm_interface.LowLevelJavascriptVm.md).[global](../interfaces/vm_interface.LowLevelJavascriptVm.md#global)

#### Defined in

[quickjsvm.ts:233](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L233)

___

### null

• `get` **null**(): [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)

[`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null).

#### Returns

[`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)

#### Defined in

[quickjsvm.ts:192](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L192)

___

### true

• `get` **true**(): [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)

[`true`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/true).

#### Returns

[`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)

#### Defined in

[quickjsvm.ts:205](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L205)

___

### undefined

• `get` **undefined**(): [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)

[`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined).

#### Returns

[`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)

#### Implementation of

[LowLevelJavascriptVm](../interfaces/vm_interface.LowLevelJavascriptVm.md).[undefined](../interfaces/vm_interface.LowLevelJavascriptVm.md#undefined)

#### Defined in

[quickjsvm.ts:179](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L179)

## Methods

### callFunction

▸ **callFunction**(`func`, `thisVal`, ...`args`): [`VmCallResult`](../modules/vm_interface.md#vmcallresult)<[`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)\>

[`func.call(thisVal, ...args)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call).
Call a JSValue as a function.

See [unwrapResult](quickjsvm.QuickJSVm.md#unwrapresult), which will throw if the function returned an error, or
return the result handle directly. If evaluation returned a handle containing
a promise, use [resolvePromise](quickjsvm.QuickJSVm.md#resolvepromise) to convert it to a native promise and
[executePendingJobs](quickjsvm.QuickJSVm.md#executependingjobs) to finish evaluating the promise.

#### Parameters

| Name | Type |
| :------ | :------ |
| `func` | [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle) |
| `thisVal` | [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle) |
| `...args` | [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)[] |

#### Returns

[`VmCallResult`](../modules/vm_interface.md#vmcallresult)<[`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)\>

A result. If the function threw synchronously, `result.error` be a
handle to the exception. Otherwise `result.value` will be a handle to the
value.

#### Implementation of

[LowLevelJavascriptVm](../interfaces/vm_interface.LowLevelJavascriptVm.md).[callFunction](../interfaces/vm_interface.LowLevelJavascriptVm.md#callfunction)

#### Defined in

[quickjsvm.ts:516](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L516)

___

### computeMemoryUsage

▸ **computeMemoryUsage**(): [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)

Compute memory usage for this runtime. Returns the result as a handle to a
JSValue object. Use [dump](quickjsvm.QuickJSVm.md#dump) to convert to a native object.
Calling this method will allocate more memory inside the runtime. The information
is accurate as of just before the call to `computeMemoryUsage`.
For a human-digestible representation, see [dumpMemoryUsage](quickjsvm.QuickJSVm.md#dumpmemoryusage).

#### Returns

[`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)

#### Defined in

[quickjsvm.ts:692](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L692)

___

### defineProp

▸ **defineProp**(`handle`, `key`, `descriptor`): `void`

[`Object.defineProperty(handle, key, descriptor)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handle` | [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle) | - |
| `key` | [`QuickJSPropertyKey`](../modules/quickjsvm.md#quickjspropertykey) | The property may be specified as a JSValue handle, or as a Javascript string or number (which will be converted automatically to a JSValue). |
| `descriptor` | [`VmPropertyDescriptor`](../interfaces/vm_interface.VmPropertyDescriptor.md)<[`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)\> | - |

#### Returns

`void`

#### Implementation of

[LowLevelJavascriptVm](../interfaces/vm_interface.LowLevelJavascriptVm.md).[defineProp](../interfaces/vm_interface.LowLevelJavascriptVm.md#defineprop)

#### Defined in

[quickjsvm.ts:469](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L469)

___

### dispose

▸ **dispose**(): `void`

Dispose of this VM's underlying resources.

**`throws`** Calling this method without disposing of all created handles
will result in an error.

#### Returns

`void`

#### Implementation of

[Disposable](../interfaces/lifetime.Disposable.md).[dispose](../interfaces/lifetime.Disposable.md#dispose)

#### Defined in

[quickjsvm.ts:727](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L727)

___

### dump

▸ **dump**(`handle`): `any`

Dump a JSValue to Javascript in a best-effort fashion.
Returns `handle.toString()` if it cannot be serialized to JSON.

#### Parameters

| Name | Type |
| :------ | :------ |
| `handle` | [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle) |

#### Returns

`any`

#### Defined in

[quickjsvm.ts:614](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L614)

___

### dumpMemoryUsage

▸ **dumpMemoryUsage**(): `string`

#### Returns

`string`

a human-readable description of memory usage in this runtime.
For programmatic access to this information, see [computeMemoryUsage](quickjsvm.QuickJSVm.md#computememoryusage).

#### Defined in

[quickjsvm.ts:702](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L702)

___

### evalCode

▸ **evalCode**(`code`, `filename?`): [`VmCallResult`](../modules/vm_interface.md#vmcallresult)<[`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)\>

Like [`eval(code)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#Description).
Evaluates the Javascript source `code` in the global scope of this VM.
When working with async code, you many need to call [executePendingJobs](quickjsvm.QuickJSVm.md#executependingjobs)
to execute callbacks pending after synchronous evaluation returns.

See [unwrapResult](quickjsvm.QuickJSVm.md#unwrapresult), which will throw if the function returned an error, or
return the result handle directly. If evaluation returned a handle containing
a promise, use [resolvePromise](quickjsvm.QuickJSVm.md#resolvepromise) to convert it to a native promise and
[executePendingJobs](quickjsvm.QuickJSVm.md#executependingjobs) to finish evaluating the promise.

*Note*: to protect against infinite loops, provide an interrupt handler to
[setInterruptHandler](quickjsvm.QuickJSVm.md#setinterrupthandler). You can use [shouldInterruptAfterDeadline](../modules/quickjs.md#shouldinterruptafterdeadline) to
create a time-based deadline.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `code` | `string` | `undefined` |
| `filename` | `string` | `'eval.js'` |

#### Returns

[`VmCallResult`](../modules/vm_interface.md#vmcallresult)<[`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)\>

The last statement's value. If the code threw synchronously,
`result.error` will be a handle to the exception. If execution was
interrupted, the error will have name `InternalError` and message
`interrupted`.

#### Implementation of

[LowLevelJavascriptVm](../interfaces/vm_interface.LowLevelJavascriptVm.md).[evalCode](../interfaces/vm_interface.LowLevelJavascriptVm.md#evalcode)

#### Defined in

[quickjsvm.ts:555](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L555)

___

### executePendingJobs

▸ **executePendingJobs**(`maxJobsToExecute?`): [`ExecutePendingJobsResult`](../modules/quickjsvm.md#executependingjobsresult)

Execute pendingJobs on the VM until `maxJobsToExecute` jobs are executed
(default all pendingJobs), the queue is exhausted, or the runtime
encounters an exception.

In QuickJS, promises and async functions create pendingJobs. These do not execute
immediately and need to triggered to run.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `maxJobsToExecute` | `number` | `-1` | When negative, run all pending jobs. Otherwise execute at most `maxJobsToExecute` before returning. |

#### Returns

[`ExecutePendingJobsResult`](../modules/quickjsvm.md#executependingjobsresult)

On success, the number of executed jobs. On error, the exception
that stopped execution. Note that executePendingJobs will not normally return
errors thrown inside async functions or rejected promises. Those errors are
available by calling [resolvePromise](quickjsvm.QuickJSVm.md#resolvepromise) on the promise handle returned by
the async function.

#### Defined in

[quickjsvm.ts:584](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L584)

___

### getNumber

▸ **getNumber**(`handle`): `number`

Converts `handle` into a Javascript number.

#### Parameters

| Name | Type |
| :------ | :------ |
| `handle` | [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle) |

#### Returns

`number`

`NaN` on error, otherwise a `number`.

#### Implementation of

[LowLevelJavascriptVm](../interfaces/vm_interface.LowLevelJavascriptVm.md).[getNumber](../interfaces/vm_interface.LowLevelJavascriptVm.md#getnumber)

#### Defined in

[quickjsvm.ts:274](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L274)

___

### getProp

▸ **getProp**(`handle`, `key`): [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)

`handle[key]`.
Get a property from a JSValue.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handle` | [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle) | - |
| `key` | [`QuickJSPropertyKey`](../modules/quickjsvm.md#quickjspropertykey) | The property may be specified as a JSValue handle, or as a Javascript string (which will be converted automatically). |

#### Returns

[`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)

#### Implementation of

[LowLevelJavascriptVm](../interfaces/vm_interface.LowLevelJavascriptVm.md).[getProp](../interfaces/vm_interface.LowLevelJavascriptVm.md#getprop)

#### Defined in

[quickjsvm.ts:433](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L433)

___

### getString

▸ **getString**(`handle`): `string`

Converts `handle` to a Javascript string.

#### Parameters

| Name | Type |
| :------ | :------ |
| `handle` | [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle) |

#### Returns

`string`

#### Implementation of

[LowLevelJavascriptVm](../interfaces/vm_interface.LowLevelJavascriptVm.md).[getString](../interfaces/vm_interface.LowLevelJavascriptVm.md#getstring)

#### Defined in

[quickjsvm.ts:292](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L292)

___

### hasPendingJob

▸ **hasPendingJob**(): `boolean`

In QuickJS, promises and async functions create pendingJobs. These do not execute
immediately and need to be run by calling [executePendingJobs](quickjsvm.QuickJSVm.md#executependingjobs).

#### Returns

`boolean`

true if there is at least one pendingJob queued up.

#### Defined in

[quickjsvm.ts:604](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L604)

___

### newArray

▸ **newArray**(): [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)

`[]`.
Create a new QuickJS [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

#### Returns

[`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)

#### Defined in

[quickjsvm.ts:317](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L317)

___

### newFunction

▸ **newFunction**(`name`, `fn`): [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)

Convert a Javascript function into a QuickJS function value.
See [VmFunctionImplementation](../modules/vm_interface.md#vmfunctionimplementation) for more details.

A [VmFunctionImplementation](../modules/vm_interface.md#vmfunctionimplementation) should not free its arguments or its return
value. A VmFunctionImplementation should also not retain any references to
its return value.

To implement an async function, create a promise with [newPromise](quickjsvm.QuickJSVm.md#newpromise), then
return the deferred promise handle from `deferred.handle` from your
function implementation:

```
const deferred = vm.newPromise()
someNativeAsyncFunction().then(deferred.resolve)
return deferred.handle
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `fn` | [`VmFunctionImplementation`](../modules/vm_interface.md#vmfunctionimplementation)<[`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)\> |

#### Returns

[`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)

#### Implementation of

[LowLevelJavascriptVm](../interfaces/vm_interface.LowLevelJavascriptVm.md).[newFunction](../interfaces/vm_interface.LowLevelJavascriptVm.md#newfunction)

#### Defined in

[quickjsvm.ts:340](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L340)

___

### newNumber

▸ **newNumber**(`num`): [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)

Converts a Javascript number into a QuickJS value.

#### Parameters

| Name | Type |
| :------ | :------ |
| `num` | `number` |

#### Returns

[`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)

#### Implementation of

[LowLevelJavascriptVm](../interfaces/vm_interface.LowLevelJavascriptVm.md).[newNumber](../interfaces/vm_interface.LowLevelJavascriptVm.md#newnumber)

#### Defined in

[quickjsvm.ts:266](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L266)

___

### newObject

▸ **newObject**(`prototype?`): [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)

`{}`.
Create a new QuickJS [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prototype?` | [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle) | Like [`Object.create`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create). |

#### Returns

[`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)

#### Implementation of

[LowLevelJavascriptVm](../interfaces/vm_interface.LowLevelJavascriptVm.md).[newObject](../interfaces/vm_interface.LowLevelJavascriptVm.md#newobject)

#### Defined in

[quickjsvm.ts:303](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L303)

___

### newPromise

▸ **newPromise**(): [`QuickJSDeferredPromise`](deferred_promise.QuickJSDeferredPromise.md)

Create a new [QuickJSDeferredPromise](deferred_promise.QuickJSDeferredPromise.md). Use `deferred.resolve(handle)` and
`deferred.reject(handle)` to fulfill the promise handle available at `deferred.handle`.
Note that you are responsible for calling `deferred.dispose()` to free the underlying
resources; see the documentation on [QuickJSDeferredPromise](deferred_promise.QuickJSDeferredPromise.md) for details.

#### Returns

[`QuickJSDeferredPromise`](deferred_promise.QuickJSDeferredPromise.md)

#### Defined in

[quickjsvm.ts:362](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L362)

___

### newString

▸ **newString**(`str`): [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)

Create a QuickJS [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) value.

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

[`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)

#### Implementation of

[LowLevelJavascriptVm](../interfaces/vm_interface.LowLevelJavascriptVm.md).[newString](../interfaces/vm_interface.LowLevelJavascriptVm.md#newstring)

#### Defined in

[quickjsvm.ts:282](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L282)

___

### removeInterruptHandler

▸ **removeInterruptHandler**(): `void`

Remove the interrupt handler, if any.
See [setInterruptHandler](quickjsvm.QuickJSVm.md#setinterrupthandler).

#### Returns

`void`

#### Defined in

[quickjsvm.ts:710](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L710)

___

### resolvePromise

▸ **resolvePromise**(`promiseLikeHandle`): `Promise`<[`VmCallResult`](../modules/vm_interface.md#vmcallresult)<[`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)\>\>

`Promise.resolve(value)`.
Convert a handle containing a Promise-like value inside the VM into an
actual promise on the host.

**`remarks`**
You may need to call [executePendingJobs](quickjsvm.QuickJSVm.md#executependingjobs) to ensure that the promise is resolved.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `promiseLikeHandle` | [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle) | A handle to a Promise-like value with a `.then(onSuccess, onError)` method. |

#### Returns

`Promise`<[`VmCallResult`](../modules/vm_interface.md#vmcallresult)<[`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)\>\>

#### Defined in

[quickjsvm.ts:392](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L392)

___

### setInterruptHandler

▸ **setInterruptHandler**(`cb`): `void`

Set a callback which is regularly called by the QuickJS engine when it is
executing code. This callback can be used to implement an execution
timeout.

The interrupt handler can be removed with [removeInterruptHandler](quickjsvm.QuickJSVm.md#removeinterrupthandler).

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | [`InterruptHandler`](../modules/quickjsvm.md#interrupthandler) |

#### Returns

`void`

#### Defined in

[quickjsvm.ts:665](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L665)

___

### setMemoryLimit

▸ **setMemoryLimit**(`limitBytes`): `void`

Set the max memory this runtime can allocate.
To remove the limit, set to `-1`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `limitBytes` | `number` |

#### Returns

`void`

#### Defined in

[quickjsvm.ts:677](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L677)

___

### setProp

▸ **setProp**(`handle`, `key`, `value`): `void`

`handle[key] = value`.
Set a property on a JSValue.

**`remarks`**
Note that the QuickJS authors recommend using [defineProp](quickjsvm.QuickJSVm.md#defineprop) to define new
properties.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handle` | [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle) | - |
| `key` | [`QuickJSPropertyKey`](../modules/quickjsvm.md#quickjspropertykey) | The property may be specified as a JSValue handle, or as a Javascript string or number (which will be converted automatically to a JSValue). |
| `value` | [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle) | - |

#### Returns

`void`

#### Implementation of

[LowLevelJavascriptVm](../interfaces/vm_interface.LowLevelJavascriptVm.md).[setProp](../interfaces/vm_interface.LowLevelJavascriptVm.md#setprop)

#### Defined in

[quickjsvm.ts:454](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L454)

___

### typeof

▸ **typeof**(`handle`): `string`

`typeof` operator. **Not** [standards compliant](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof).

**`remarks`**
Does not support BigInt values correctly.

#### Parameters

| Name | Type |
| :------ | :------ |
| `handle` | [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle) |

#### Returns

`string`

#### Implementation of

[LowLevelJavascriptVm](../interfaces/vm_interface.LowLevelJavascriptVm.md).[typeof](../interfaces/vm_interface.LowLevelJavascriptVm.md#typeof)

#### Defined in

[quickjsvm.ts:258](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L258)

___

### unwrapResult

▸ **unwrapResult**<`T`\>(`result`): `T`

Unwrap a SuccessOrFail result such as a [VmCallResult](../modules/vm_interface.md#vmcallresult) or a
[ExecutePendingJobsResult](../modules/quickjsvm.md#executependingjobsresult), where the fail branch contains a handle to a QuickJS error value.
If the result is a success, returns the value.
If the result is an error, converts the error to a native object and throws the error.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `result` | [`SuccessOrFail`](../modules/vm_interface.md#successorfail)<`T`, [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)\> |

#### Returns

`T`

#### Defined in

[quickjsvm.ts:639](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L639)
