[quickjs-emscripten](../README.md) / [Exports](../modules.md) / QuickJSContext

# Class: QuickJSContext

QuickJSContext wraps a QuickJS Javascript context (JSContext*) within a
runtime. The contexts within the same runtime may exchange objects freely.
You can think of separate runtimes like different domains in a browser, and
the contexts within a runtime like the different windows open to the same
domain. The [runtime](QuickJSContext.md#runtime) references the context's runtime.

This class's methods return [QuickJSHandle](../modules.md#quickjshandle), which wrap C pointers (JSValue*).
It's the caller's responsibility to call `.dispose()` on any
handles you create to free memory once you're done with the handle.

Use [QuickJSRuntime.newContext](QuickJSRuntime.md#newcontext) or [QuickJSWASMModule.newContext](QuickJSWASMModule.md#newcontext)
to create a new QuickJSContext.

Create QuickJS values inside the interpreter with methods like
[newNumber](QuickJSContext.md#newnumber), [newString](QuickJSContext.md#newstring), [newArray](QuickJSContext.md#newarray), [newObject](QuickJSContext.md#newobject),
[newFunction](QuickJSContext.md#newfunction), and [newPromise](QuickJSContext.md#newpromise).

Call [setProp](QuickJSContext.md#setprop) or [defineProp](QuickJSContext.md#defineprop) to customize objects. Use those methods
with [global](QuickJSContext.md#global) to expose the values you create to the interior of the
interpreter, so they can be used in [evalCode](QuickJSContext.md#evalcode).

Use [evalCode](QuickJSContext.md#evalcode) or [callFunction](QuickJSContext.md#callfunction) to execute Javascript inside the VM. If
you're using asynchronous code inside the QuickJSContext, you may need to also
call [executePendingJobs](QuickJSRuntime.md#executependingjobs). Executing code inside the runtime returns a
result object representing successful execution or an error. You must dispose
of any such results to avoid leaking memory inside the VM.

Implement memory and CPU constraints at the runtime level, using [runtime](QuickJSContext.md#runtime).
See [QuickJSRuntime](QuickJSRuntime.md) for more information.

## Hierarchy

- **`QuickJSContext`**

  ↳ [`QuickJSAsyncContext`](QuickJSAsyncContext.md)

## Implements

- [`LowLevelJavascriptVm`](../interfaces/LowLevelJavascriptVm.md)<[`QuickJSHandle`](../modules.md#quickjshandle)\>
- [`Disposable`](../interfaces/Disposable.md)

## Table of contents

### Constructors

- [constructor](QuickJSContext.md#constructor)

### Properties

- [runtime](QuickJSContext.md#runtime)

### Accessors

- [alive](QuickJSContext.md#alive)
- [false](QuickJSContext.md#false)
- [global](QuickJSContext.md#global)
- [null](QuickJSContext.md#null)
- [true](QuickJSContext.md#true)
- [undefined](QuickJSContext.md#undefined)

### Methods

- [callFunction](QuickJSContext.md#callfunction)
- [defineProp](QuickJSContext.md#defineprop)
- [dispose](QuickJSContext.md#dispose)
- [dump](QuickJSContext.md#dump)
- [evalCode](QuickJSContext.md#evalcode)
- [getNumber](QuickJSContext.md#getnumber)
- [getProp](QuickJSContext.md#getprop)
- [getString](QuickJSContext.md#getstring)
- [newArray](QuickJSContext.md#newarray)
- [newError](QuickJSContext.md#newerror)
- [newFunction](QuickJSContext.md#newfunction)
- [newNumber](QuickJSContext.md#newnumber)
- [newObject](QuickJSContext.md#newobject)
- [newPromise](QuickJSContext.md#newpromise)
- [newString](QuickJSContext.md#newstring)
- [resolvePromise](QuickJSContext.md#resolvepromise)
- [setProp](QuickJSContext.md#setprop)
- [throw](QuickJSContext.md#throw)
- [typeof](QuickJSContext.md#typeof)
- [unwrapResult](QuickJSContext.md#unwrapresult)

## Constructors

### constructor

• **new QuickJSContext**(`args`)

Use {@link QuickJS.createVm} to create a QuickJSContext instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.callbacks` | `QuickJSModuleCallbacks` |
| `args.ctx` | [`Lifetime`](Lifetime.md)<`JSContextPointer`, `never`, `never`\> |
| `args.ffi` | `EitherFFI` |
| `args.module` | `EitherModule` |
| `args.ownedLifetimes?` | [`Disposable`](../interfaces/Disposable.md)[] |
| `args.rt` | [`Lifetime`](Lifetime.md)<`JSRuntimePointer`, `never`, `never`\> |
| `args.runtime` | [`QuickJSRuntime`](QuickJSRuntime.md) |

#### Defined in

[ts/context.ts:170](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L170)

## Properties

### runtime

• `Readonly` **runtime**: [`QuickJSRuntime`](QuickJSRuntime.md)

The runtime that created this context.

#### Defined in

[ts/context.ts:143](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L143)

## Accessors

### alive

• `get` **alive**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[Disposable](../interfaces/Disposable.md).[alive](../interfaces/Disposable.md#alive)

#### Defined in

[ts/context.ts:197](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L197)

___

### false

• `get` **false**(): [`QuickJSHandle`](../modules.md#quickjshandle)

[`false`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/false).

#### Returns

[`QuickJSHandle`](../modules.md#quickjshandle)

#### Defined in

[ts/context.ts:255](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L255)

___

### global

• `get` **global**(): [`QuickJSHandle`](../modules.md#quickjshandle)

[`global`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects).
A handle to the global object inside the interpreter.
You can set properties to create global variables.

#### Returns

[`QuickJSHandle`](../modules.md#quickjshandle)

#### Implementation of

[LowLevelJavascriptVm](../interfaces/LowLevelJavascriptVm.md).[global](../interfaces/LowLevelJavascriptVm.md#global)

#### Defined in

[ts/context.ts:270](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L270)

___

### null

• `get` **null**(): [`QuickJSHandle`](../modules.md#quickjshandle)

[`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null).

#### Returns

[`QuickJSHandle`](../modules.md#quickjshandle)

#### Defined in

[ts/context.ts:229](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L229)

___

### true

• `get` **true**(): [`QuickJSHandle`](../modules.md#quickjshandle)

[`true`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/true).

#### Returns

[`QuickJSHandle`](../modules.md#quickjshandle)

#### Defined in

[ts/context.ts:242](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L242)

___

### undefined

• `get` **undefined**(): [`QuickJSHandle`](../modules.md#quickjshandle)

[`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined).

#### Returns

[`QuickJSHandle`](../modules.md#quickjshandle)

#### Implementation of

[LowLevelJavascriptVm](../interfaces/LowLevelJavascriptVm.md).[undefined](../interfaces/LowLevelJavascriptVm.md#undefined)

#### Defined in

[ts/context.ts:216](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L216)

## Methods

### callFunction

▸ **callFunction**(`func`, `thisVal`, ...`args`): [`VmCallResult`](../modules.md#vmcallresult)<[`QuickJSHandle`](../modules.md#quickjshandle)\>

[`func.call(thisVal, ...args)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call).
Call a JSValue as a function.

See [unwrapResult](QuickJSContext.md#unwrapresult), which will throw if the function returned an error, or
return the result handle directly. If evaluation returned a handle containing
a promise, use [resolvePromise](QuickJSContext.md#resolvepromise) to convert it to a native promise and
[executePendingJobs](QuickJSRuntime.md#executependingjobs) to finish evaluating the promise.

#### Parameters

| Name | Type |
| :------ | :------ |
| `func` | [`QuickJSHandle`](../modules.md#quickjshandle) |
| `thisVal` | [`QuickJSHandle`](../modules.md#quickjshandle) |
| `...args` | [`QuickJSHandle`](../modules.md#quickjshandle)[] |

#### Returns

[`VmCallResult`](../modules.md#vmcallresult)<[`QuickJSHandle`](../modules.md#quickjshandle)\>

A result. If the function threw synchronously, `result.error` be a
handle to the exception. Otherwise `result.value` will be a handle to the
value.

#### Implementation of

[LowLevelJavascriptVm](../interfaces/LowLevelJavascriptVm.md).[callFunction](../interfaces/LowLevelJavascriptVm.md#callfunction)

#### Defined in

[ts/context.ts:615](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L615)

___

### defineProp

▸ **defineProp**(`handle`, `key`, `descriptor`): `void`

[`Object.defineProperty(handle, key, descriptor)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handle` | [`QuickJSHandle`](../modules.md#quickjshandle) | - |
| `key` | [`QuickJSPropertyKey`](../modules.md#quickjspropertykey) | The property may be specified as a JSValue handle, or as a Javascript string or number (which will be converted automatically to a JSValue). |
| `descriptor` | [`VmPropertyDescriptor`](../interfaces/VmPropertyDescriptor.md)<[`QuickJSHandle`](../modules.md#quickjshandle)\> | - |

#### Returns

`void`

#### Implementation of

[LowLevelJavascriptVm](../interfaces/LowLevelJavascriptVm.md).[defineProp](../interfaces/LowLevelJavascriptVm.md#defineprop)

#### Defined in

[ts/context.ts:566](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L566)

___

### dispose

▸ **dispose**(): `void`

Dispose of this VM's underlying resources.

**`throws`** Calling this method without disposing of all created handles
will result in an error.

#### Returns

`void`

#### Implementation of

[Disposable](../interfaces/Disposable.md).[dispose](../interfaces/Disposable.md#dispose)

#### Defined in

[ts/context.ts:207](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L207)

___

### dump

▸ **dump**(`handle`): `any`

Dump a JSValue to Javascript in a best-effort fashion.
Returns `handle.toString()` if it cannot be serialized to JSON.

#### Parameters

| Name | Type |
| :------ | :------ |
| `handle` | [`QuickJSHandle`](../modules.md#quickjshandle) |

#### Returns

`any`

#### Defined in

[ts/context.ts:732](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L732)

___

### evalCode

▸ **evalCode**(`code`, `filename?`, `options?`): [`VmCallResult`](../modules.md#vmcallresult)<[`QuickJSHandle`](../modules.md#quickjshandle)\>

Like [`eval(code)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#Description).
Evaluates the Javascript source `code` in the global scope of this VM.
When working with async code, you many need to call [executePendingJobs](QuickJSRuntime.md#executependingjobs)
to execute callbacks pending after synchronous evaluation returns.

See [unwrapResult](QuickJSContext.md#unwrapresult), which will throw if the function returned an error, or
return the result handle directly. If evaluation returned a handle containing
a promise, use [resolvePromise](QuickJSContext.md#resolvepromise) to convert it to a native promise and
[executePendingJobs](QuickJSRuntime.md#executependingjobs) to finish evaluating the promise.

*Note*: to protect against infinite loops, provide an interrupt handler to
[setInterruptHandler](QuickJSRuntime.md#setinterrupthandler). You can use [shouldInterruptAfterDeadline](../modules.md#shouldinterruptafterdeadline) to
create a time-based deadline.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `code` | `string` | `undefined` |
| `filename` | `string` | `"eval.js"` |
| `options?` | `number` \| [`ContextEvalOptions`](../interfaces/ContextEvalOptions.md) | `undefined` |

#### Returns

[`VmCallResult`](../modules.md#vmcallresult)<[`QuickJSHandle`](../modules.md#quickjshandle)\>

The last statement's value. If the code threw synchronously,
`result.error` will be a handle to the exception. If execution was
interrupted, the error will have name `InternalError` and message
`interrupted`.

#### Implementation of

[LowLevelJavascriptVm](../interfaces/LowLevelJavascriptVm.md).[evalCode](../interfaces/LowLevelJavascriptVm.md#evalcode)

#### Defined in

[ts/context.ts:662](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L662)

___

### getNumber

▸ **getNumber**(`handle`): `number`

Converts `handle` into a Javascript number.

#### Parameters

| Name | Type |
| :------ | :------ |
| `handle` | [`QuickJSHandle`](../modules.md#quickjshandle) |

#### Returns

`number`

`NaN` on error, otherwise a `number`.

#### Implementation of

[LowLevelJavascriptVm](../interfaces/LowLevelJavascriptVm.md).[getNumber](../interfaces/LowLevelJavascriptVm.md#getnumber)

#### Defined in

[ts/context.ts:464](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L464)

___

### getProp

▸ **getProp**(`handle`, `key`): [`QuickJSHandle`](../modules.md#quickjshandle)

`handle[key]`.
Get a property from a JSValue.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handle` | [`QuickJSHandle`](../modules.md#quickjshandle) | - |
| `key` | [`QuickJSPropertyKey`](../modules.md#quickjspropertykey) | The property may be specified as a JSValue handle, or as a Javascript string (which will be converted automatically). |

#### Returns

[`QuickJSHandle`](../modules.md#quickjshandle)

#### Implementation of

[LowLevelJavascriptVm](../interfaces/LowLevelJavascriptVm.md).[getProp](../interfaces/LowLevelJavascriptVm.md#getprop)

#### Defined in

[ts/context.ts:530](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L530)

___

### getString

▸ **getString**(`handle`): `string`

Converts `handle` to a Javascript string.

#### Parameters

| Name | Type |
| :------ | :------ |
| `handle` | [`QuickJSHandle`](../modules.md#quickjshandle) |

#### Returns

`string`

#### Implementation of

[LowLevelJavascriptVm](../interfaces/LowLevelJavascriptVm.md).[getString](../interfaces/LowLevelJavascriptVm.md#getstring)

#### Defined in

[ts/context.ts:472](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L472)

___

### newArray

▸ **newArray**(): [`QuickJSHandle`](../modules.md#quickjshandle)

`[]`.
Create a new QuickJS [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

#### Returns

[`QuickJSHandle`](../modules.md#quickjshandle)

#### Defined in

[ts/context.ts:328](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L328)

___

### newError

▸ **newError**(`error`): [`QuickJSHandle`](../modules.md#quickjshandle)

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Object` |
| `error.message` | `string` |
| `error.name` | `string` |

#### Returns

[`QuickJSHandle`](../modules.md#quickjshandle)

#### Defined in

[ts/context.ts:419](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L419)

▸ **newError**(`message`): [`QuickJSHandle`](../modules.md#quickjshandle)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

[`QuickJSHandle`](../modules.md#quickjshandle)

#### Defined in

[ts/context.ts:420](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L420)

▸ **newError**(): [`QuickJSHandle`](../modules.md#quickjshandle)

#### Returns

[`QuickJSHandle`](../modules.md#quickjshandle)

#### Defined in

[ts/context.ts:421](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L421)

___

### newFunction

▸ **newFunction**(`name`, `fn`): [`QuickJSHandle`](../modules.md#quickjshandle)

Convert a Javascript function into a QuickJS function value.
See [VmFunctionImplementation](../modules.md#vmfunctionimplementation) for more details.

A [VmFunctionImplementation](../modules.md#vmfunctionimplementation) should not free its arguments or its return
value. A VmFunctionImplementation should also not retain any references to
its return value.

To implement an async function, create a promise with [newPromise](QuickJSContext.md#newpromise), then
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
| `fn` | [`VmFunctionImplementation`](../modules.md#vmfunctionimplementation)<[`QuickJSHandle`](../modules.md#quickjshandle)\> |

#### Returns

[`QuickJSHandle`](../modules.md#quickjshandle)

#### Implementation of

[LowLevelJavascriptVm](../interfaces/LowLevelJavascriptVm.md).[newFunction](../interfaces/LowLevelJavascriptVm.md#newfunction)

#### Defined in

[ts/context.ts:413](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L413)

___

### newNumber

▸ **newNumber**(`num`): [`QuickJSHandle`](../modules.md#quickjshandle)

Converts a Javascript number into a QuickJS value.

#### Parameters

| Name | Type |
| :------ | :------ |
| `num` | `number` |

#### Returns

[`QuickJSHandle`](../modules.md#quickjshandle)

#### Implementation of

[LowLevelJavascriptVm](../interfaces/LowLevelJavascriptVm.md).[newNumber](../interfaces/LowLevelJavascriptVm.md#newnumber)

#### Defined in

[ts/context.ts:294](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L294)

___

### newObject

▸ **newObject**(`prototype?`): [`QuickJSHandle`](../modules.md#quickjshandle)

`{}`.
Create a new QuickJS [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prototype?` | [`QuickJSHandle`](../modules.md#quickjshandle) | Like [`Object.create`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create). |

#### Returns

[`QuickJSHandle`](../modules.md#quickjshandle)

#### Implementation of

[LowLevelJavascriptVm](../interfaces/LowLevelJavascriptVm.md).[newObject](../interfaces/LowLevelJavascriptVm.md#newobject)

#### Defined in

[ts/context.ts:314](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L314)

___

### newPromise

▸ **newPromise**(): [`QuickJSDeferredPromise`](QuickJSDeferredPromise.md)

Create a new [QuickJSDeferredPromise](QuickJSDeferredPromise.md). Use `deferred.resolve(handle)` and
`deferred.reject(handle)` to fulfill the promise handle available at `deferred.handle`.
Note that you are responsible for calling `deferred.dispose()` to free the underlying
resources; see the documentation on [QuickJSDeferredPromise](QuickJSDeferredPromise.md) for details.

#### Returns

[`QuickJSDeferredPromise`](QuickJSDeferredPromise.md)

#### Defined in

[ts/context.ts:339](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L339)

▸ **newPromise**(`promise`): [`QuickJSDeferredPromise`](QuickJSDeferredPromise.md)

Create a new [QuickJSDeferredPromise](QuickJSDeferredPromise.md) that resolves when the
given native Promise<QuickJSHandle> resolves. Rejections will be coerced
to a QuickJS error.

You can still resolve/reject the created promise "early" using its methods.

#### Parameters

| Name | Type |
| :------ | :------ |
| `promise` | `Promise`<[`QuickJSHandle`](../modules.md#quickjshandle)\> |

#### Returns

[`QuickJSDeferredPromise`](QuickJSDeferredPromise.md)

#### Defined in

[ts/context.ts:347](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L347)

▸ **newPromise**(`newPromiseFn`): [`QuickJSDeferredPromise`](QuickJSDeferredPromise.md)

Construct a new native Promise<QuickJSHandle>, and then convert it into a
[QuickJSDeferredPromise](QuickJSDeferredPromise.md).

You can still resolve/reject the created promise "early" using its methods.

#### Parameters

| Name | Type |
| :------ | :------ |
| `newPromiseFn` | [`PromiseExecutor`](../modules.md#promiseexecutor)<[`QuickJSHandle`](../modules.md#quickjshandle), [`QuickJSHandle`](../modules.md#quickjshandle) \| `Error`\> |

#### Returns

[`QuickJSDeferredPromise`](QuickJSDeferredPromise.md)

#### Defined in

[ts/context.ts:354](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L354)

___

### newString

▸ **newString**(`str`): [`QuickJSHandle`](../modules.md#quickjshandle)

Create a QuickJS [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) value.

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

[`QuickJSHandle`](../modules.md#quickjshandle)

#### Implementation of

[LowLevelJavascriptVm](../interfaces/LowLevelJavascriptVm.md).[newString](../interfaces/LowLevelJavascriptVm.md#newstring)

#### Defined in

[ts/context.ts:301](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L301)

___

### resolvePromise

▸ **resolvePromise**(`promiseLikeHandle`): `Promise`<[`VmCallResult`](../modules.md#vmcallresult)<[`QuickJSHandle`](../modules.md#quickjshandle)\>\>

`Promise.resolve(value)`.
Convert a handle containing a Promise-like value inside the VM into an
actual promise on the host.

**`remarks`**
You may need to call [executePendingJobs](QuickJSRuntime.md#executependingjobs) to ensure that the promise is resolved.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `promiseLikeHandle` | [`QuickJSHandle`](../modules.md#quickjshandle) | A handle to a Promise-like value with a `.then(onSuccess, onError)` method. |

#### Returns

`Promise`<[`VmCallResult`](../modules.md#vmcallresult)<[`QuickJSHandle`](../modules.md#quickjshandle)\>\>

#### Defined in

[ts/context.ts:487](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L487)

___

### setProp

▸ **setProp**(`handle`, `key`, `value`): `void`

`handle[key] = value`.
Set a property on a JSValue.

**`remarks`**
Note that the QuickJS authors recommend using [defineProp](QuickJSContext.md#defineprop) to define new
properties.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handle` | [`QuickJSHandle`](../modules.md#quickjshandle) | - |
| `key` | [`QuickJSPropertyKey`](../modules.md#quickjspropertykey) | The property may be specified as a JSValue handle, or as a Javascript string or number (which will be converted automatically to a JSValue). |
| `value` | [`QuickJSHandle`](../modules.md#quickjshandle) | - |

#### Returns

`void`

#### Implementation of

[LowLevelJavascriptVm](../interfaces/LowLevelJavascriptVm.md).[setProp](../interfaces/LowLevelJavascriptVm.md#setprop)

#### Defined in

[ts/context.ts:551](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L551)

___

### throw

▸ **throw**(`error`): `JSValuePointer`

Throw an error in the VM, interrupted whatever current execution is in progress when execution resumes.

**`experimental`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | [`QuickJSHandle`](../modules.md#quickjshandle) \| `Error` |

#### Returns

`JSValuePointer`

#### Defined in

[ts/context.ts:692](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L692)

___

### typeof

▸ **typeof**(`handle`): `string`

`typeof` operator. **Not** [standards compliant](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof).

**`remarks`**
Does not support BigInt values correctly.

#### Parameters

| Name | Type |
| :------ | :------ |
| `handle` | [`QuickJSHandle`](../modules.md#quickjshandle) |

#### Returns

`string`

#### Implementation of

[LowLevelJavascriptVm](../interfaces/LowLevelJavascriptVm.md).[typeof](../interfaces/LowLevelJavascriptVm.md#typeof)

#### Defined in

[ts/context.ts:455](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L455)

___

### unwrapResult

▸ **unwrapResult**<`T`\>(`result`): `T`

Unwrap a SuccessOrFail result such as a [VmCallResult](../modules.md#vmcallresult) or a
[ExecutePendingJobsResult](../modules.md#executependingjobsresult), where the fail branch contains a handle to a QuickJS error value.
If the result is a success, returns the value.
If the result is an error, converts the error to a native object and throws the error.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `result` | [`SuccessOrFail`](../modules.md#successorfail)<`T`, [`QuickJSHandle`](../modules.md#quickjshandle)\> |

#### Returns

`T`

#### Defined in

[ts/context.ts:757](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L757)
