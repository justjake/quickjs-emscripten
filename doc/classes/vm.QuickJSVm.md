[quickjs-emscripten](../README.md) / [Exports](../modules.md) / [vm](../modules/vm.md) / QuickJSVm

# Class: QuickJSVm

[vm](../modules/vm.md).QuickJSVm

QuickJSVm wraps a QuickJS Javascript runtime (JSRuntime*) and context (JSContext*).
This class's methods return [QuickJSHandle](../modules/vm.md#quickjshandle), which wrap C pointers (JSValue*).
It's the caller's responsibility to call `.dispose()` on any
handles you create to free memory once you're done with the handle.

Each QuickJSVm instance is isolated. You cannot share handles between different
QuickJSVm instances. You should create separate QuickJSVm instances for
untrusted code from different sources for isolation.

Use [[QuickJS.createVm]] to create a new QuickJSVm.

Create QuickJS values inside the interpreter with methods like
[newNumber](vm.QuickJSVm.md#newnumber), [newString](vm.QuickJSVm.md#newstring), [newArray](vm.QuickJSVm.md#newarray), [newObject](vm.QuickJSVm.md#newobject),
[newFunction](vm.QuickJSVm.md#newfunction), and [newPromise](vm.QuickJSVm.md#newpromise).

Call [setProp](vm.QuickJSVm.md#setprop) or [defineProp](vm.QuickJSVm.md#defineprop) to customize objects. Use those methods
with [global](vm.QuickJSVm.md#global) to expose the values you create to the interior of the
interpreter, so they can be used in [evalCode](vm.QuickJSVm.md#evalcode).

Use [evalCode](vm.QuickJSVm.md#evalcode) or [callFunction](vm.QuickJSVm.md#callfunction) to execute Javascript inside the VM. If
you're using asynchronous code inside the QuickJSVm, you may need to also
call [executePendingJobs](vm.QuickJSVm.md#executependingjobs). Executing code inside the runtime returns a
result object representing successful execution or an error. You must dispose
of any such results to avoid leaking memory inside the VM.

Implement memory and CPU constraints with [setInterruptHandler](vm.QuickJSVm.md#setinterrupthandler)
(called regularly while the interpreter runs) and [setMemoryLimit](vm.QuickJSVm.md#setmemorylimit).
Use [computeMemoryUsage](vm.QuickJSVm.md#computememoryusage) or [dumpMemoryUsage](vm.QuickJSVm.md#dumpmemoryusage) to guide memory limit
tuning.

## Hierarchy

- `PureQuickJSVm`

  ↳ **`QuickJSVm`**

## Implements

- [`LowLevelJavascriptVm`](../interfaces/vm_interface.LowLevelJavascriptVm.md)<[`QuickJSHandle`](../modules/vm.md#quickjshandle)\>
- [`Disposable`](../interfaces/lifetime.Disposable.md)

## Table of contents

### Constructors

- [constructor](vm.QuickJSVm.md#constructor)

### Accessors

- [alive](vm.QuickJSVm.md#alive)
- [false](vm.QuickJSVm.md#false)
- [global](vm.QuickJSVm.md#global)
- [null](vm.QuickJSVm.md#null)
- [true](vm.QuickJSVm.md#true)
- [undefined](vm.QuickJSVm.md#undefined)

### Methods

- [callFunction](vm.QuickJSVm.md#callfunction)
- [computeMemoryUsage](vm.QuickJSVm.md#computememoryusage)
- [defineProp](vm.QuickJSVm.md#defineprop)
- [dispose](vm.QuickJSVm.md#dispose)
- [dump](vm.QuickJSVm.md#dump)
- [dumpMemoryUsage](vm.QuickJSVm.md#dumpmemoryusage)
- [evalCode](vm.QuickJSVm.md#evalcode)
- [executePendingJobs](vm.QuickJSVm.md#executependingjobs)
- [getNumber](vm.QuickJSVm.md#getnumber)
- [getProp](vm.QuickJSVm.md#getprop)
- [getString](vm.QuickJSVm.md#getstring)
- [hasPendingJob](vm.QuickJSVm.md#haspendingjob)
- [newArray](vm.QuickJSVm.md#newarray)
- [newFunction](vm.QuickJSVm.md#newfunction)
- [newNumber](vm.QuickJSVm.md#newnumber)
- [newObject](vm.QuickJSVm.md#newobject)
- [newPromise](vm.QuickJSVm.md#newpromise)
- [newString](vm.QuickJSVm.md#newstring)
- [removeInterruptHandler](vm.QuickJSVm.md#removeinterrupthandler)
- [resolvePromise](vm.QuickJSVm.md#resolvepromise)
- [setInterruptHandler](vm.QuickJSVm.md#setinterrupthandler)
- [setMemoryLimit](vm.QuickJSVm.md#setmemorylimit)
- [setProp](vm.QuickJSVm.md#setprop)
- [typeof](vm.QuickJSVm.md#typeof)
- [unwrapResult](vm.QuickJSVm.md#unwrapresult)

## Constructors

### constructor

• **new QuickJSVm**(`args`)

Use {@link QuickJS.createVm} to create a QuickJSVm instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.ctx` | [`Lifetime`](lifetime.Lifetime.md)<[`JSContextPointer`](../modules/ffi_types.md#jscontextpointer), `never`, `never`\> |
| `args.ffi` | [`QuickJSFFI`](ffi.QuickJSFFI.md) |
| `args.module` | [`QuickJSEmscriptenModule`](../interfaces/emscripten_types.QuickJSEmscriptenModule.md) |
| `args.rt` | [`Lifetime`](lifetime.Lifetime.md)<[`JSRuntimePointer`](../modules/ffi_types.md#jsruntimepointer), `never`, `never`\> |

#### Overrides

PureQuickJSVm.constructor

#### Defined in

[vm.ts:556](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L556)

## Accessors

### alive

• `get` **alive**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[Disposable](../interfaces/lifetime.Disposable.md).[alive](../interfaces/lifetime.Disposable.md#alive)

#### Inherited from

PureQuickJSVm.alive

#### Defined in

[vm.ts:263](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L263)

___

### false

• `get` **false**(): [`QuickJSHandle`](../modules/vm.md#quickjshandle)

[`false`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/false).

#### Returns

[`QuickJSHandle`](../modules/vm.md#quickjshandle)

#### Inherited from

PureQuickJSVm.false

#### Defined in

[vm.ts:321](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L321)

___

### global

• `get` **global**(): [`QuickJSHandle`](../modules/vm.md#quickjshandle)

[`global`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects).
A handle to the global object inside the interpreter.
You can set properties to create global variables.

#### Returns

[`QuickJSHandle`](../modules/vm.md#quickjshandle)

#### Implementation of

[LowLevelJavascriptVm](../interfaces/vm_interface.LowLevelJavascriptVm.md).[global](../interfaces/vm_interface.LowLevelJavascriptVm.md#global)

#### Inherited from

PureQuickJSVm.global

#### Defined in

[vm.ts:336](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L336)

___

### null

• `get` **null**(): [`QuickJSHandle`](../modules/vm.md#quickjshandle)

[`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null).

#### Returns

[`QuickJSHandle`](../modules/vm.md#quickjshandle)

#### Inherited from

PureQuickJSVm.null

#### Defined in

[vm.ts:295](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L295)

___

### true

• `get` **true**(): [`QuickJSHandle`](../modules/vm.md#quickjshandle)

[`true`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/true).

#### Returns

[`QuickJSHandle`](../modules/vm.md#quickjshandle)

#### Inherited from

PureQuickJSVm.true

#### Defined in

[vm.ts:308](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L308)

___

### undefined

• `get` **undefined**(): [`QuickJSHandle`](../modules/vm.md#quickjshandle)

[`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined).

#### Returns

[`QuickJSHandle`](../modules/vm.md#quickjshandle)

#### Implementation of

[LowLevelJavascriptVm](../interfaces/vm_interface.LowLevelJavascriptVm.md).[undefined](../interfaces/vm_interface.LowLevelJavascriptVm.md#undefined)

#### Inherited from

PureQuickJSVm.undefined

#### Defined in

[vm.ts:282](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L282)

## Methods

### callFunction

▸ **callFunction**(`func`, `thisVal`, ...`args`): [`VmCallResult`](../modules/vm_interface.md#vmcallresult)<[`QuickJSHandle`](../modules/vm.md#quickjshandle)\>

[`func.call(thisVal, ...args)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call).
Call a JSValue as a function.

See [unwrapResult](vm.QuickJSVm.md#unwrapresult), which will throw if the function returned an error, or
return the result handle directly. If evaluation returned a handle containing
a promise, use [resolvePromise](vm.QuickJSVm.md#resolvepromise) to convert it to a native promise and
[executePendingJobs](vm.QuickJSVm.md#executependingjobs) to finish evaluating the promise.

#### Parameters

| Name | Type |
| :------ | :------ |
| `func` | [`QuickJSHandle`](../modules/vm.md#quickjshandle) |
| `thisVal` | [`QuickJSHandle`](../modules/vm.md#quickjshandle) |
| `...args` | [`QuickJSHandle`](../modules/vm.md#quickjshandle)[] |

#### Returns

[`VmCallResult`](../modules/vm_interface.md#vmcallresult)<[`QuickJSHandle`](../modules/vm.md#quickjshandle)\>

A result. If the function threw synchronously, `result.error` be a
handle to the exception. Otherwise `result.value` will be a handle to the
value.

#### Implementation of

[LowLevelJavascriptVm](../interfaces/vm_interface.LowLevelJavascriptVm.md).[callFunction](../interfaces/vm_interface.LowLevelJavascriptVm.md#callfunction)

#### Defined in

[vm.ts:764](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L764)

___

### computeMemoryUsage

▸ **computeMemoryUsage**(): [`QuickJSHandle`](../modules/vm.md#quickjshandle)

Compute memory usage for this runtime. Returns the result as a handle to a
JSValue object. Use [dump](vm.QuickJSVm.md#dump) to convert to a native object.
Calling this method will allocate more memory inside the runtime. The information
is accurate as of just before the call to `computeMemoryUsage`.
For a human-digestible representation, see [dumpMemoryUsage](vm.QuickJSVm.md#dumpmemoryusage).

#### Returns

[`QuickJSHandle`](../modules/vm.md#quickjshandle)

#### Inherited from

PureQuickJSVm.computeMemoryUsage

#### Defined in

[vm.ts:501](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L501)

___

### defineProp

▸ **defineProp**(`handle`, `key`, `descriptor`): `void`

[`Object.defineProperty(handle, key, descriptor)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handle` | [`QuickJSHandle`](../modules/vm.md#quickjshandle) | - |
| `key` | [`QuickJSPropertyKey`](../modules/vm.md#quickjspropertykey) | The property may be specified as a JSValue handle, or as a Javascript string or number (which will be converted automatically to a JSValue). |
| `descriptor` | [`VmPropertyDescriptor`](../interfaces/vm_interface.VmPropertyDescriptor.md)<[`QuickJSHandle`](../modules/vm.md#quickjshandle)\> | - |

#### Returns

`void`

#### Implementation of

[LowLevelJavascriptVm](../interfaces/vm_interface.LowLevelJavascriptVm.md).[defineProp](../interfaces/vm_interface.LowLevelJavascriptVm.md#defineprop)

#### Defined in

[vm.ts:717](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L717)

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

#### Inherited from

PureQuickJSVm.dispose

#### Defined in

[vm.ts:273](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L273)

___

### dump

▸ **dump**(`handle`): `any`

Dump a JSValue to Javascript in a best-effort fashion.
Returns `handle.toString()` if it cannot be serialized to JSON.

#### Parameters

| Name | Type |
| :------ | :------ |
| `handle` | [`QuickJSHandle`](../modules/vm.md#quickjshandle) |

#### Returns

`any`

#### Defined in

[vm.ts:852](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L852)

___

### dumpMemoryUsage

▸ **dumpMemoryUsage**(): `string`

#### Returns

`string`

a human-readable description of memory usage in this runtime.
For programmatic access to this information, see [computeMemoryUsage](vm.QuickJSVm.md#computememoryusage).

#### Inherited from

PureQuickJSVm.dumpMemoryUsage

#### Defined in

[vm.ts:511](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L511)

___

### evalCode

▸ **evalCode**(`code`, `filename?`): [`VmCallResult`](../modules/vm_interface.md#vmcallresult)<[`QuickJSHandle`](../modules/vm.md#quickjshandle)\>

Like [`eval(code)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#Description).
Evaluates the Javascript source `code` in the global scope of this VM.
When working with async code, you many need to call [executePendingJobs](vm.QuickJSVm.md#executependingjobs)
to execute callbacks pending after synchronous evaluation returns.

See [unwrapResult](vm.QuickJSVm.md#unwrapresult), which will throw if the function returned an error, or
return the result handle directly. If evaluation returned a handle containing
a promise, use [resolvePromise](vm.QuickJSVm.md#resolvepromise) to convert it to a native promise and
[executePendingJobs](vm.QuickJSVm.md#executependingjobs) to finish evaluating the promise.

*Note*: to protect against infinite loops, provide an interrupt handler to
[setInterruptHandler](vm.QuickJSVm.md#setinterrupthandler). You can use [shouldInterruptAfterDeadline](../modules/quickjs.md#shouldinterruptafterdeadline) to
create a time-based deadline.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `code` | `string` | `undefined` |
| `filename` | `string` | `'eval.js'` |

#### Returns

[`VmCallResult`](../modules/vm_interface.md#vmcallresult)<[`QuickJSHandle`](../modules/vm.md#quickjshandle)\>

The last statement's value. If the code threw synchronously,
`result.error` will be a handle to the exception. If execution was
interrupted, the error will have name `InternalError` and message
`interrupted`.

#### Implementation of

[LowLevelJavascriptVm](../interfaces/vm_interface.LowLevelJavascriptVm.md).[evalCode](../interfaces/vm_interface.LowLevelJavascriptVm.md#evalcode)

#### Defined in

[vm.ts:803](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L803)

___

### executePendingJobs

▸ **executePendingJobs**(`maxJobsToExecute?`): [`ExecutePendingJobsResult`](../modules/vm.md#executependingjobsresult)

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

[`ExecutePendingJobsResult`](../modules/vm.md#executependingjobsresult)

On success, the number of executed jobs. On error, the exception
that stopped execution. Note that executePendingJobs will not normally return
errors thrown inside async functions or rejected promises. Those errors are
available by calling [resolvePromise](vm.QuickJSVm.md#resolvepromise) on the promise handle returned by
the async function.

#### Defined in

[vm.ts:832](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L832)

___

### getNumber

▸ **getNumber**(`handle`): `number`

Converts `handle` into a Javascript number.

#### Parameters

| Name | Type |
| :------ | :------ |
| `handle` | [`QuickJSHandle`](../modules/vm.md#quickjshandle) |

#### Returns

`number`

`NaN` on error, otherwise a `number`.

#### Implementation of

[LowLevelJavascriptVm](../interfaces/vm_interface.LowLevelJavascriptVm.md).[getNumber](../interfaces/vm_interface.LowLevelJavascriptVm.md#getnumber)

#### Defined in

[vm.ts:583](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L583)

___

### getProp

▸ **getProp**(`handle`, `key`): [`QuickJSHandle`](../modules/vm.md#quickjshandle)

`handle[key]`.
Get a property from a JSValue.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handle` | [`QuickJSHandle`](../modules/vm.md#quickjshandle) | - |
| `key` | [`QuickJSPropertyKey`](../modules/vm.md#quickjspropertykey) | The property may be specified as a JSValue handle, or as a Javascript string (which will be converted automatically). |

#### Returns

[`QuickJSHandle`](../modules/vm.md#quickjshandle)

#### Implementation of

[LowLevelJavascriptVm](../interfaces/vm_interface.LowLevelJavascriptVm.md).[getProp](../interfaces/vm_interface.LowLevelJavascriptVm.md#getprop)

#### Defined in

[vm.ts:681](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L681)

___

### getString

▸ **getString**(`handle`): `string`

Converts `handle` to a Javascript string.

#### Parameters

| Name | Type |
| :------ | :------ |
| `handle` | [`QuickJSHandle`](../modules/vm.md#quickjshandle) |

#### Returns

`string`

#### Implementation of

[LowLevelJavascriptVm](../interfaces/vm_interface.LowLevelJavascriptVm.md).[getString](../interfaces/vm_interface.LowLevelJavascriptVm.md#getstring)

#### Defined in

[vm.ts:591](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L591)

___

### hasPendingJob

▸ **hasPendingJob**(): `boolean`

In QuickJS, promises and async functions create pendingJobs. These do not execute
immediately and need to be run by calling [executePendingJobs](vm.QuickJSVm.md#executependingjobs).

#### Returns

`boolean`

true if there is at least one pendingJob queued up.

#### Inherited from

PureQuickJSVm.hasPendingJob

#### Defined in

[vm.ts:433](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L433)

___

### newArray

▸ **newArray**(): [`QuickJSHandle`](../modules/vm.md#quickjshandle)

`[]`.
Create a new QuickJS [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

#### Returns

[`QuickJSHandle`](../modules/vm.md#quickjshandle)

#### Inherited from

PureQuickJSVm.newArray

#### Defined in

[vm.ts:394](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L394)

___

### newFunction

▸ **newFunction**(`name`, `fn`): [`QuickJSHandle`](../modules/vm.md#quickjshandle)

Convert a Javascript function into a QuickJS function value.
See [VmFunctionImplementation](../modules/vm_interface.md#vmfunctionimplementation) for more details.

A [VmFunctionImplementation](../modules/vm_interface.md#vmfunctionimplementation) should not free its arguments or its return
value. A VmFunctionImplementation should also not retain any references to
its return value.

To implement an async function, create a promise with [newPromise](vm.QuickJSVm.md#newpromise), then
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
| `fn` | [`VmFunctionImplementation`](../modules/vm_interface.md#vmfunctionimplementation)<[`QuickJSHandle`](../modules/vm.md#quickjshandle)\> |

#### Returns

[`QuickJSHandle`](../modules/vm.md#quickjshandle)

#### Implementation of

[LowLevelJavascriptVm](../interfaces/vm_interface.LowLevelJavascriptVm.md).[newFunction](../interfaces/vm_interface.LowLevelJavascriptVm.md#newfunction)

#### Defined in

[vm.ts:614](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L614)

___

### newNumber

▸ **newNumber**(`num`): [`QuickJSHandle`](../modules/vm.md#quickjshandle)

Converts a Javascript number into a QuickJS value.

#### Parameters

| Name | Type |
| :------ | :------ |
| `num` | `number` |

#### Returns

[`QuickJSHandle`](../modules/vm.md#quickjshandle)

#### Implementation of

[LowLevelJavascriptVm](../interfaces/vm_interface.LowLevelJavascriptVm.md).[newNumber](../interfaces/vm_interface.LowLevelJavascriptVm.md#newnumber)

#### Inherited from

PureQuickJSVm.newNumber

#### Defined in

[vm.ts:360](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L360)

___

### newObject

▸ **newObject**(`prototype?`): [`QuickJSHandle`](../modules/vm.md#quickjshandle)

`{}`.
Create a new QuickJS [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prototype?` | [`QuickJSHandle`](../modules/vm.md#quickjshandle) | Like [`Object.create`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create). |

#### Returns

[`QuickJSHandle`](../modules/vm.md#quickjshandle)

#### Implementation of

[LowLevelJavascriptVm](../interfaces/vm_interface.LowLevelJavascriptVm.md).[newObject](../interfaces/vm_interface.LowLevelJavascriptVm.md#newobject)

#### Inherited from

PureQuickJSVm.newObject

#### Defined in

[vm.ts:380](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L380)

___

### newPromise

▸ **newPromise**(): [`QuickJSDeferredPromise`](deferred_promise.QuickJSDeferredPromise.md)

Create a new [QuickJSDeferredPromise](deferred_promise.QuickJSDeferredPromise.md). Use `deferred.resolve(handle)` and
`deferred.reject(handle)` to fulfill the promise handle available at `deferred.handle`.
Note that you are responsible for calling `deferred.dispose()` to free the underlying
resources; see the documentation on [QuickJSDeferredPromise](deferred_promise.QuickJSDeferredPromise.md) for details.

#### Returns

[`QuickJSDeferredPromise`](deferred_promise.QuickJSDeferredPromise.md)

#### Inherited from

PureQuickJSVm.newPromise

#### Defined in

[vm.ts:405](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L405)

___

### newString

▸ **newString**(`str`): [`QuickJSHandle`](../modules/vm.md#quickjshandle)

Create a QuickJS [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) value.

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

[`QuickJSHandle`](../modules/vm.md#quickjshandle)

#### Implementation of

[LowLevelJavascriptVm](../interfaces/vm_interface.LowLevelJavascriptVm.md).[newString](../interfaces/vm_interface.LowLevelJavascriptVm.md#newstring)

#### Inherited from

PureQuickJSVm.newString

#### Defined in

[vm.ts:367](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L367)

___

### removeInterruptHandler

▸ **removeInterruptHandler**(): `void`

Remove the interrupt handler, if any.
See [setInterruptHandler](vm.QuickJSVm.md#setinterrupthandler).

#### Returns

`void`

#### Inherited from

PureQuickJSVm.removeInterruptHandler

#### Defined in

[vm.ts:459](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L459)

___

### resolvePromise

▸ **resolvePromise**(`promiseLikeHandle`): `Promise`<[`VmCallResult`](../modules/vm_interface.md#vmcallresult)<[`QuickJSHandle`](../modules/vm.md#quickjshandle)\>\>

`Promise.resolve(value)`.
Convert a handle containing a Promise-like value inside the VM into an
actual promise on the host.

**`remarks`**
You may need to call [executePendingJobs](vm.QuickJSVm.md#executependingjobs) to ensure that the promise is resolved.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `promiseLikeHandle` | [`QuickJSHandle`](../modules/vm.md#quickjshandle) | A handle to a Promise-like value with a `.then(onSuccess, onError)` method. |

#### Returns

`Promise`<[`VmCallResult`](../modules/vm_interface.md#vmcallresult)<[`QuickJSHandle`](../modules/vm.md#quickjshandle)\>\>

#### Defined in

[vm.ts:640](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L640)

___

### setInterruptHandler

▸ **setInterruptHandler**(`cb`): `void`

Set a callback which is regularly called by the QuickJS engine when it is
executing code. This callback can be used to implement an execution
timeout.

The interrupt handler can be removed with [removeInterruptHandler](vm.QuickJSVm.md#removeinterrupthandler).

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | [`InterruptHandler`](../modules/vm.md#interrupthandler) |

#### Returns

`void`

#### Inherited from

PureQuickJSVm.setInterruptHandler

#### Defined in

[vm.ts:447](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L447)

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

#### Inherited from

PureQuickJSVm.setMemoryLimit

#### Defined in

[vm.ts:486](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L486)

___

### setProp

▸ **setProp**(`handle`, `key`, `value`): `void`

`handle[key] = value`.
Set a property on a JSValue.

**`remarks`**
Note that the QuickJS authors recommend using [defineProp](vm.QuickJSVm.md#defineprop) to define new
properties.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handle` | [`QuickJSHandle`](../modules/vm.md#quickjshandle) | - |
| `key` | [`QuickJSPropertyKey`](../modules/vm.md#quickjspropertykey) | The property may be specified as a JSValue handle, or as a Javascript string or number (which will be converted automatically to a JSValue). |
| `value` | [`QuickJSHandle`](../modules/vm.md#quickjshandle) | - |

#### Returns

`void`

#### Implementation of

[LowLevelJavascriptVm](../interfaces/vm_interface.LowLevelJavascriptVm.md).[setProp](../interfaces/vm_interface.LowLevelJavascriptVm.md#setprop)

#### Defined in

[vm.ts:702](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L702)

___

### typeof

▸ **typeof**(`handle`): `string`

`typeof` operator. **Not** [standards compliant](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof).

**`remarks`**
Does not support BigInt values correctly.

#### Parameters

| Name | Type |
| :------ | :------ |
| `handle` | [`QuickJSHandle`](../modules/vm.md#quickjshandle) |

#### Returns

`string`

#### Implementation of

[LowLevelJavascriptVm](../interfaces/vm_interface.LowLevelJavascriptVm.md).[typeof](../interfaces/vm_interface.LowLevelJavascriptVm.md#typeof)

#### Defined in

[vm.ts:573](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L573)

___

### unwrapResult

▸ **unwrapResult**<`T`\>(`result`): `T`

Unwrap a SuccessOrFail result such as a [VmCallResult](../modules/vm_interface.md#vmcallresult) or a
[ExecutePendingJobsResult](../modules/vm.md#executependingjobsresult), where the fail branch contains a handle to a QuickJS error value.
If the result is a success, returns the value.
If the result is an error, converts the error to a native object and throws the error.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `result` | [`SuccessOrFail`](../modules/vm_interface.md#successorfail)<`T`, [`QuickJSHandle`](../modules/vm.md#quickjshandle)\> |

#### Returns

`T`

#### Defined in

[vm.ts:877](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L877)
