[quickjs-emscripten](../README.md) / [Exports](../modules.md) / [quickjsasyncvm](../modules/quickjsasyncvm.md) / QuickJSAsyncVm

# Class: QuickJSAsyncVm

[quickjsasyncvm](../modules/quickjsasyncvm.md).QuickJSAsyncVm

## Hierarchy

- [`QuickJSVm`](quickjsvm.QuickJSVm.md)

  ↳ **`QuickJSAsyncVm`**

## Table of contents

### Constructors

- [constructor](quickjsasyncvm.QuickJSAsyncVm.md#constructor)

### Properties

- [\_false](quickjsasyncvm.QuickJSAsyncVm.md#_false)
- [\_global](quickjsasyncvm.QuickJSAsyncVm.md#_global)
- [\_null](quickjsasyncvm.QuickJSAsyncVm.md#_null)
- [\_scope](quickjsasyncvm.QuickJSAsyncVm.md#_scope)
- [\_true](quickjsasyncvm.QuickJSAsyncVm.md#_true)
- [\_undefined](quickjsasyncvm.QuickJSAsyncVm.md#_undefined)
- [asyncFFI](quickjsasyncvm.QuickJSAsyncVm.md#asyncffi)
- [ctx](quickjsasyncvm.QuickJSAsyncVm.md#ctx)
- [ffi](quickjsasyncvm.QuickJSAsyncVm.md#ffi)
- [module](quickjsasyncvm.QuickJSAsyncVm.md#module)
- [rt](quickjsasyncvm.QuickJSAsyncVm.md#rt)

### Accessors

- [alive](quickjsasyncvm.QuickJSAsyncVm.md#alive)
- [false](quickjsasyncvm.QuickJSAsyncVm.md#false)
- [global](quickjsasyncvm.QuickJSAsyncVm.md#global)
- [null](quickjsasyncvm.QuickJSAsyncVm.md#null)
- [true](quickjsasyncvm.QuickJSAsyncVm.md#true)
- [undefined](quickjsasyncvm.QuickJSAsyncVm.md#undefined)

### Methods

- [callFunction](quickjsasyncvm.QuickJSAsyncVm.md#callfunction)
- [computeMemoryUsage](quickjsasyncvm.QuickJSAsyncVm.md#computememoryusage)
- [defineProp](quickjsasyncvm.QuickJSAsyncVm.md#defineprop)
- [dispose](quickjsasyncvm.QuickJSAsyncVm.md#dispose)
- [dump](quickjsasyncvm.QuickJSAsyncVm.md#dump)
- [dumpMemoryUsage](quickjsasyncvm.QuickJSAsyncVm.md#dumpmemoryusage)
- [evalCode](quickjsasyncvm.QuickJSAsyncVm.md#evalcode)
- [executePendingJobs](quickjsasyncvm.QuickJSAsyncVm.md#executependingjobs)
- [getNumber](quickjsasyncvm.QuickJSAsyncVm.md#getnumber)
- [getProp](quickjsasyncvm.QuickJSAsyncVm.md#getprop)
- [getString](quickjsasyncvm.QuickJSAsyncVm.md#getstring)
- [hasPendingJob](quickjsasyncvm.QuickJSAsyncVm.md#haspendingjob)
- [newArray](quickjsasyncvm.QuickJSAsyncVm.md#newarray)
- [newFunction](quickjsasyncvm.QuickJSAsyncVm.md#newfunction)
- [newNumber](quickjsasyncvm.QuickJSAsyncVm.md#newnumber)
- [newObject](quickjsasyncvm.QuickJSAsyncVm.md#newobject)
- [newPromise](quickjsasyncvm.QuickJSAsyncVm.md#newpromise)
- [newString](quickjsasyncvm.QuickJSAsyncVm.md#newstring)
- [removeInterruptHandler](quickjsasyncvm.QuickJSAsyncVm.md#removeinterrupthandler)
- [resolvePromise](quickjsasyncvm.QuickJSAsyncVm.md#resolvepromise)
- [setInterruptHandler](quickjsasyncvm.QuickJSAsyncVm.md#setinterrupthandler)
- [setMemoryLimit](quickjsasyncvm.QuickJSAsyncVm.md#setmemorylimit)
- [setProp](quickjsasyncvm.QuickJSAsyncVm.md#setprop)
- [typeof](quickjsasyncvm.QuickJSAsyncVm.md#typeof)
- [unwrapResult](quickjsasyncvm.QuickJSAsyncVm.md#unwrapresult)

## Constructors

### constructor

• **new QuickJSAsyncVm**(`args`)

Use [QuickJS.createAsyncVm](quickjs.QuickJS.md#createasyncvm) to create a QuickJSAsyncVm instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.asyncFFI` | [`QuickJSAsyncFFI`](ffi_asyncify.QuickJSAsyncFFI.md) |
| `args.ctx` | [`Lifetime`](lifetime.Lifetime.md)<[`JSContextPointer`](../modules/ffi_types.md#jscontextpointer), `never`, `never`\> |
| `args.ffi` | [`QuickJSFFI`](ffi.QuickJSFFI.md) |
| `args.module` | [`QuickJSEmscriptenModule`](../interfaces/emscripten_types.QuickJSEmscriptenModule.md) |
| `args.rt` | [`Lifetime`](lifetime.Lifetime.md)<[`JSRuntimePointer`](../modules/ffi_types.md#jsruntimepointer), `never`, `never`\> |

#### Overrides

[QuickJSVm](quickjsvm.QuickJSVm.md).[constructor](quickjsvm.QuickJSVm.md#constructor)

#### Defined in

[quickjsasyncvm.ts:15](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsasyncvm.ts#L15)

## Properties

### \_false

• `Protected` **\_false**: `undefined` \| [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle) = `undefined`

#### Inherited from

[QuickJSVm](quickjsvm.QuickJSVm.md).[_false](quickjsvm.QuickJSVm.md#_false)

#### Defined in

[quickjsvm.ts:156](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L156)

___

### \_global

• `Protected` **\_global**: `undefined` \| [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle) = `undefined`

#### Inherited from

[QuickJSVm](quickjsvm.QuickJSVm.md).[_global](quickjsvm.QuickJSVm.md#_global)

#### Defined in

[quickjsvm.ts:158](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L158)

___

### \_null

• `Protected` **\_null**: `undefined` \| [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle) = `undefined`

#### Inherited from

[QuickJSVm](quickjsvm.QuickJSVm.md).[_null](quickjsvm.QuickJSVm.md#_null)

#### Defined in

[quickjsvm.ts:155](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L155)

___

### \_scope

• `Protected` **\_scope**: [`Scope`](lifetime.Scope.md)

#### Inherited from

[QuickJSVm](quickjsvm.QuickJSVm.md).[_scope](quickjsvm.QuickJSVm.md#_scope)

#### Defined in

[quickjsvm.ts:159](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L159)

___

### \_true

• `Protected` **\_true**: `undefined` \| [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle) = `undefined`

#### Inherited from

[QuickJSVm](quickjsvm.QuickJSVm.md).[_true](quickjsvm.QuickJSVm.md#_true)

#### Defined in

[quickjsvm.ts:157](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L157)

___

### \_undefined

• `Protected` **\_undefined**: `undefined` \| [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle) = `undefined`

#### Inherited from

[QuickJSVm](quickjsvm.QuickJSVm.md).[_undefined](quickjsvm.QuickJSVm.md#_undefined)

#### Defined in

[quickjsvm.ts:154](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L154)

___

### asyncFFI

• `Protected` `Readonly` **asyncFFI**: [`QuickJSAsyncFFI`](ffi_asyncify.QuickJSAsyncFFI.md)

#### Defined in

[quickjsasyncvm.ts:10](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsasyncvm.ts#L10)

___

### ctx

• `Protected` `Readonly` **ctx**: [`Lifetime`](lifetime.Lifetime.md)<[`JSContextPointer`](../modules/ffi_types.md#jscontextpointer), `never`, `never`\>

#### Inherited from

[QuickJSVm](quickjsvm.QuickJSVm.md).[ctx](quickjsvm.QuickJSVm.md#ctx)

#### Defined in

[quickjsvm.ts:149](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L149)

___

### ffi

• `Protected` `Readonly` **ffi**: [`QuickJSFFI`](ffi.QuickJSFFI.md)

#### Inherited from

[QuickJSVm](quickjsvm.QuickJSVm.md).[ffi](quickjsvm.QuickJSVm.md#ffi)

#### Defined in

[quickjsvm.ts:153](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L153)

___

### module

• `Protected` `Readonly` **module**: [`QuickJSEmscriptenModuleAsyncify`](../interfaces/emscripten_types.QuickJSEmscriptenModuleAsyncify.md)

#### Overrides

[QuickJSVm](quickjsvm.QuickJSVm.md).[module](quickjsvm.QuickJSVm.md#module)

#### Defined in

[quickjsasyncvm.ts:9](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsasyncvm.ts#L9)

___

### rt

• `Protected` `Readonly` **rt**: [`Lifetime`](lifetime.Lifetime.md)<[`JSRuntimePointer`](../modules/ffi_types.md#jsruntimepointer), `never`, `never`\>

#### Inherited from

[QuickJSVm](quickjsvm.QuickJSVm.md).[rt](quickjsvm.QuickJSVm.md#rt)

#### Defined in

[quickjsvm.ts:150](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L150)

## Accessors

### alive

• `get` **alive**(): `boolean`

#### Returns

`boolean`

#### Inherited from

QuickJSVm.alive

#### Defined in

[quickjsvm.ts:717](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L717)

___

### false

• `get` **false**(): [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)

[`false`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/false).

#### Returns

[`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)

#### Inherited from

QuickJSVm.false

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

#### Inherited from

QuickJSVm.global

#### Defined in

[quickjsvm.ts:233](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L233)

___

### null

• `get` **null**(): [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)

[`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null).

#### Returns

[`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)

#### Inherited from

QuickJSVm.null

#### Defined in

[quickjsvm.ts:192](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L192)

___

### true

• `get` **true**(): [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)

[`true`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/true).

#### Returns

[`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)

#### Inherited from

QuickJSVm.true

#### Defined in

[quickjsvm.ts:205](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L205)

___

### undefined

• `get` **undefined**(): [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)

[`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined).

#### Returns

[`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)

#### Inherited from

QuickJSVm.undefined

#### Defined in

[quickjsvm.ts:179](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L179)

## Methods

### callFunction

▸ **callFunction**(`func`, `thisVal`, ...`args`): [`VmCallResult`](../modules/vm_interface.md#vmcallresult)<[`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)\>

[`func.call(thisVal, ...args)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call).
Call a JSValue as a function.

See [unwrapResult](quickjsasyncvm.QuickJSAsyncVm.md#unwrapresult), which will throw if the function returned an error, or
return the result handle directly. If evaluation returned a handle containing
a promise, use [resolvePromise](quickjsasyncvm.QuickJSAsyncVm.md#resolvepromise) to convert it to a native promise and
[executePendingJobs](quickjsasyncvm.QuickJSAsyncVm.md#executependingjobs) to finish evaluating the promise.

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

#### Inherited from

[QuickJSVm](quickjsvm.QuickJSVm.md).[callFunction](quickjsvm.QuickJSVm.md#callfunction)

#### Defined in

[quickjsvm.ts:516](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L516)

___

### computeMemoryUsage

▸ **computeMemoryUsage**(): [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)

Compute memory usage for this runtime. Returns the result as a handle to a
JSValue object. Use [dump](quickjsasyncvm.QuickJSAsyncVm.md#dump) to convert to a native object.
Calling this method will allocate more memory inside the runtime. The information
is accurate as of just before the call to `computeMemoryUsage`.
For a human-digestible representation, see [dumpMemoryUsage](quickjsasyncvm.QuickJSAsyncVm.md#dumpmemoryusage).

#### Returns

[`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)

#### Inherited from

[QuickJSVm](quickjsvm.QuickJSVm.md).[computeMemoryUsage](quickjsvm.QuickJSVm.md#computememoryusage)

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

#### Inherited from

[QuickJSVm](quickjsvm.QuickJSVm.md).[defineProp](quickjsvm.QuickJSVm.md#defineprop)

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

#### Inherited from

[QuickJSVm](quickjsvm.QuickJSVm.md).[dispose](quickjsvm.QuickJSVm.md#dispose)

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

#### Inherited from

[QuickJSVm](quickjsvm.QuickJSVm.md).[dump](quickjsvm.QuickJSVm.md#dump)

#### Defined in

[quickjsvm.ts:614](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L614)

___

### dumpMemoryUsage

▸ **dumpMemoryUsage**(): `string`

#### Returns

`string`

a human-readable description of memory usage in this runtime.
For programmatic access to this information, see [computeMemoryUsage](quickjsasyncvm.QuickJSAsyncVm.md#computememoryusage).

#### Inherited from

[QuickJSVm](quickjsvm.QuickJSVm.md).[dumpMemoryUsage](quickjsvm.QuickJSVm.md#dumpmemoryusage)

#### Defined in

[quickjsvm.ts:702](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L702)

___

### evalCode

▸ **evalCode**(`code`, `filename?`): [`VmCallResult`](../modules/vm_interface.md#vmcallresult)<[`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)\>

Like [`eval(code)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#Description).
Evaluates the Javascript source `code` in the global scope of this VM.
When working with async code, you many need to call [executePendingJobs](quickjsasyncvm.QuickJSAsyncVm.md#executependingjobs)
to execute callbacks pending after synchronous evaluation returns.

See [unwrapResult](quickjsasyncvm.QuickJSAsyncVm.md#unwrapresult), which will throw if the function returned an error, or
return the result handle directly. If evaluation returned a handle containing
a promise, use [resolvePromise](quickjsasyncvm.QuickJSAsyncVm.md#resolvepromise) to convert it to a native promise and
[executePendingJobs](quickjsasyncvm.QuickJSAsyncVm.md#executependingjobs) to finish evaluating the promise.

*Note*: to protect against infinite loops, provide an interrupt handler to
[setInterruptHandler](quickjsasyncvm.QuickJSAsyncVm.md#setinterrupthandler). You can use [shouldInterruptAfterDeadline](../modules/quickjs.md#shouldinterruptafterdeadline) to
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

#### Inherited from

[QuickJSVm](quickjsvm.QuickJSVm.md).[evalCode](quickjsvm.QuickJSVm.md#evalcode)

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
available by calling [resolvePromise](quickjsasyncvm.QuickJSAsyncVm.md#resolvepromise) on the promise handle returned by
the async function.

#### Inherited from

[QuickJSVm](quickjsvm.QuickJSVm.md).[executePendingJobs](quickjsvm.QuickJSVm.md#executependingjobs)

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

#### Inherited from

[QuickJSVm](quickjsvm.QuickJSVm.md).[getNumber](quickjsvm.QuickJSVm.md#getnumber)

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

#### Inherited from

[QuickJSVm](quickjsvm.QuickJSVm.md).[getProp](quickjsvm.QuickJSVm.md#getprop)

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

#### Inherited from

[QuickJSVm](quickjsvm.QuickJSVm.md).[getString](quickjsvm.QuickJSVm.md#getstring)

#### Defined in

[quickjsvm.ts:292](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L292)

___

### hasPendingJob

▸ **hasPendingJob**(): `boolean`

In QuickJS, promises and async functions create pendingJobs. These do not execute
immediately and need to be run by calling [executePendingJobs](quickjsasyncvm.QuickJSAsyncVm.md#executependingjobs).

#### Returns

`boolean`

true if there is at least one pendingJob queued up.

#### Inherited from

[QuickJSVm](quickjsvm.QuickJSVm.md).[hasPendingJob](quickjsvm.QuickJSVm.md#haspendingjob)

#### Defined in

[quickjsvm.ts:604](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L604)

___

### newArray

▸ **newArray**(): [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)

`[]`.
Create a new QuickJS [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

#### Returns

[`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)

#### Inherited from

[QuickJSVm](quickjsvm.QuickJSVm.md).[newArray](quickjsvm.QuickJSVm.md#newarray)

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

To implement an async function, create a promise with [newPromise](quickjsasyncvm.QuickJSAsyncVm.md#newpromise), then
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

#### Inherited from

[QuickJSVm](quickjsvm.QuickJSVm.md).[newFunction](quickjsvm.QuickJSVm.md#newfunction)

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

#### Inherited from

[QuickJSVm](quickjsvm.QuickJSVm.md).[newNumber](quickjsvm.QuickJSVm.md#newnumber)

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

#### Inherited from

[QuickJSVm](quickjsvm.QuickJSVm.md).[newObject](quickjsvm.QuickJSVm.md#newobject)

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

#### Inherited from

[QuickJSVm](quickjsvm.QuickJSVm.md).[newPromise](quickjsvm.QuickJSVm.md#newpromise)

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

#### Inherited from

[QuickJSVm](quickjsvm.QuickJSVm.md).[newString](quickjsvm.QuickJSVm.md#newstring)

#### Defined in

[quickjsvm.ts:282](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L282)

___

### removeInterruptHandler

▸ **removeInterruptHandler**(): `void`

Remove the interrupt handler, if any.
See [setInterruptHandler](quickjsasyncvm.QuickJSAsyncVm.md#setinterrupthandler).

#### Returns

`void`

#### Inherited from

[QuickJSVm](quickjsvm.QuickJSVm.md).[removeInterruptHandler](quickjsvm.QuickJSVm.md#removeinterrupthandler)

#### Defined in

[quickjsvm.ts:710](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L710)

___

### resolvePromise

▸ **resolvePromise**(`promiseLikeHandle`): `Promise`<[`VmCallResult`](../modules/vm_interface.md#vmcallresult)<[`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)\>\>

`Promise.resolve(value)`.
Convert a handle containing a Promise-like value inside the VM into an
actual promise on the host.

**`remarks`**
You may need to call [executePendingJobs](quickjsasyncvm.QuickJSAsyncVm.md#executependingjobs) to ensure that the promise is resolved.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `promiseLikeHandle` | [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle) | A handle to a Promise-like value with a `.then(onSuccess, onError)` method. |

#### Returns

`Promise`<[`VmCallResult`](../modules/vm_interface.md#vmcallresult)<[`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)\>\>

#### Inherited from

[QuickJSVm](quickjsvm.QuickJSVm.md).[resolvePromise](quickjsvm.QuickJSVm.md#resolvepromise)

#### Defined in

[quickjsvm.ts:392](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L392)

___

### setInterruptHandler

▸ **setInterruptHandler**(`cb`): `void`

Set a callback which is regularly called by the QuickJS engine when it is
executing code. This callback can be used to implement an execution
timeout.

The interrupt handler can be removed with [removeInterruptHandler](quickjsasyncvm.QuickJSAsyncVm.md#removeinterrupthandler).

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | [`InterruptHandler`](../modules/quickjsvm.md#interrupthandler) |

#### Returns

`void`

#### Inherited from

[QuickJSVm](quickjsvm.QuickJSVm.md).[setInterruptHandler](quickjsvm.QuickJSVm.md#setinterrupthandler)

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

#### Inherited from

[QuickJSVm](quickjsvm.QuickJSVm.md).[setMemoryLimit](quickjsvm.QuickJSVm.md#setmemorylimit)

#### Defined in

[quickjsvm.ts:677](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L677)

___

### setProp

▸ **setProp**(`handle`, `key`, `value`): `void`

`handle[key] = value`.
Set a property on a JSValue.

**`remarks`**
Note that the QuickJS authors recommend using [defineProp](quickjsasyncvm.QuickJSAsyncVm.md#defineprop) to define new
properties.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handle` | [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle) | - |
| `key` | [`QuickJSPropertyKey`](../modules/quickjsvm.md#quickjspropertykey) | The property may be specified as a JSValue handle, or as a Javascript string or number (which will be converted automatically to a JSValue). |
| `value` | [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle) | - |

#### Returns

`void`

#### Inherited from

[QuickJSVm](quickjsvm.QuickJSVm.md).[setProp](quickjsvm.QuickJSVm.md#setprop)

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

#### Inherited from

[QuickJSVm](quickjsvm.QuickJSVm.md).[typeof](quickjsvm.QuickJSVm.md#typeof)

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

#### Inherited from

[QuickJSVm](quickjsvm.QuickJSVm.md).[unwrapResult](quickjsvm.QuickJSVm.md#unwrapresult)

#### Defined in

[quickjsvm.ts:639](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L639)
