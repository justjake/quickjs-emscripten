[quickjs-emscripten](../README.md) / [Exports](../modules.md) / QuickJSAsyncContext

# Class: QuickJSAsyncContext

Asyncified version of [QuickJSContext].

*Asyncify* allows normally synchronous code to wait for asynchronous Promises
or callbacks. The asyncified version of QuickJSContext can wait for async
host functions as though they were synchronous.

## Hierarchy

- [`QuickJSContext`](QuickJSContext.md)

  ↳ **`QuickJSAsyncContext`**

## Table of contents

### Constructors

- [constructor](QuickJSAsyncContext.md#constructor)

### Properties

- [callbacks](QuickJSAsyncContext.md#callbacks)
- [ffi](QuickJSAsyncContext.md#ffi)
- [module](QuickJSAsyncContext.md#module)
- [rt](QuickJSAsyncContext.md#rt)
- [runtime](QuickJSAsyncContext.md#runtime)

### Accessors

- [alive](QuickJSAsyncContext.md#alive)
- [false](QuickJSAsyncContext.md#false)
- [global](QuickJSAsyncContext.md#global)
- [null](QuickJSAsyncContext.md#null)
- [true](QuickJSAsyncContext.md#true)
- [undefined](QuickJSAsyncContext.md#undefined)

### Methods

- [callFunction](QuickJSAsyncContext.md#callfunction)
- [defineProp](QuickJSAsyncContext.md#defineprop)
- [dispose](QuickJSAsyncContext.md#dispose)
- [dump](QuickJSAsyncContext.md#dump)
- [evalCode](QuickJSAsyncContext.md#evalcode)
- [evalCodeAsync](QuickJSAsyncContext.md#evalcodeasync)
- [getNumber](QuickJSAsyncContext.md#getnumber)
- [getProp](QuickJSAsyncContext.md#getprop)
- [getString](QuickJSAsyncContext.md#getstring)
- [newArray](QuickJSAsyncContext.md#newarray)
- [newAsyncifiedFunction](QuickJSAsyncContext.md#newasyncifiedfunction)
- [newError](QuickJSAsyncContext.md#newerror)
- [newFunction](QuickJSAsyncContext.md#newfunction)
- [newNumber](QuickJSAsyncContext.md#newnumber)
- [newObject](QuickJSAsyncContext.md#newobject)
- [newPromise](QuickJSAsyncContext.md#newpromise)
- [newString](QuickJSAsyncContext.md#newstring)
- [resolvePromise](QuickJSAsyncContext.md#resolvepromise)
- [setProp](QuickJSAsyncContext.md#setprop)
- [throw](QuickJSAsyncContext.md#throw)
- [typeof](QuickJSAsyncContext.md#typeof)
- [unwrapResult](QuickJSAsyncContext.md#unwrapresult)

## Constructors

### constructor

• **new QuickJSAsyncContext**(`args`)

Use {@link QuickJS.createVm} to create a QuickJSContext instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.callbacks` | `QuickJSModuleCallbacks` |
| `args.ctx` | [`Lifetime`](Lifetime.md)<`JSContextPointer`, `never`, `never`\> |
| `args.ffi` | `EitherFFI` |
| `args.module` | `EitherModule` |
| `args.ownedLifetimes` | [`Disposable`](../interfaces/Disposable.md)[] |
| `args.rt` | [`Lifetime`](Lifetime.md)<`JSRuntimePointer`, `never`, `never`\> |
| `args.runtime` | [`QuickJSRuntime`](QuickJSRuntime.md) |

#### Inherited from

[QuickJSContext](QuickJSContext.md).[constructor](QuickJSContext.md#constructor)

#### Defined in

[ts/context.ts:163](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context.ts#L163)

## Properties

### callbacks

• `Protected` **callbacks**: `QuickJSModuleCallbacks`

#### Defined in

[ts/context-asyncify.ts:29](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context-asyncify.ts#L29)

___

### ffi

• `Protected` **ffi**: `QuickJSAsyncFFI`

#### Overrides

QuickJSContext.ffi

#### Defined in

[ts/context-asyncify.ts:27](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context-asyncify.ts#L27)

___

### module

• `Protected` **module**: `QuickJSAsyncEmscriptenModule`

#### Overrides

QuickJSContext.module

#### Defined in

[ts/context-asyncify.ts:26](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context-asyncify.ts#L26)

___

### rt

• `Protected` **rt**: [`Lifetime`](Lifetime.md)<`JSRuntimePointer`, `never`, `never`\>

#### Overrides

QuickJSContext.rt

#### Defined in

[ts/context-asyncify.ts:28](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context-asyncify.ts#L28)

___

### runtime

• **runtime**: [`QuickJSAsyncRuntime`](QuickJSAsyncRuntime.md)

The runtime that created this context.

#### Overrides

[QuickJSContext](QuickJSContext.md).[runtime](QuickJSContext.md#runtime)

#### Defined in

[ts/context-asyncify.ts:25](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context-asyncify.ts#L25)

## Accessors

### alive

• `get` **alive**(): `boolean`

#### Returns

`boolean`

#### Inherited from

QuickJSContext.alive

#### Defined in

[ts/context.ts:190](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context.ts#L190)

___

### false

• `get` **false**(): [`QuickJSHandle`](../modules.md#quickjshandle)

[`false`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/false).

#### Returns

[`QuickJSHandle`](../modules.md#quickjshandle)

#### Inherited from

QuickJSContext.false

#### Defined in

[ts/context.ts:248](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context.ts#L248)

___

### global

• `get` **global**(): [`QuickJSHandle`](../modules.md#quickjshandle)

[`global`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects).
A handle to the global object inside the interpreter.
You can set properties to create global variables.

#### Returns

[`QuickJSHandle`](../modules.md#quickjshandle)

#### Inherited from

QuickJSContext.global

#### Defined in

[ts/context.ts:263](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context.ts#L263)

___

### null

• `get` **null**(): [`QuickJSHandle`](../modules.md#quickjshandle)

[`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null).

#### Returns

[`QuickJSHandle`](../modules.md#quickjshandle)

#### Inherited from

QuickJSContext.null

#### Defined in

[ts/context.ts:222](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context.ts#L222)

___

### true

• `get` **true**(): [`QuickJSHandle`](../modules.md#quickjshandle)

[`true`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/true).

#### Returns

[`QuickJSHandle`](../modules.md#quickjshandle)

#### Inherited from

QuickJSContext.true

#### Defined in

[ts/context.ts:235](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context.ts#L235)

___

### undefined

• `get` **undefined**(): [`QuickJSHandle`](../modules.md#quickjshandle)

[`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined).

#### Returns

[`QuickJSHandle`](../modules.md#quickjshandle)

#### Inherited from

QuickJSContext.undefined

#### Defined in

[ts/context.ts:209](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context.ts#L209)

## Methods

### callFunction

▸ **callFunction**(`func`, `thisVal`, ...`args`): [`VmCallResult`](../modules.md#vmcallresult)<[`QuickJSHandle`](../modules.md#quickjshandle)\>

[`func.call(thisVal, ...args)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call).
Call a JSValue as a function.

See [unwrapResult](QuickJSAsyncContext.md#unwrapresult), which will throw if the function returned an error, or
return the result handle directly. If evaluation returned a handle containing
a promise, use [resolvePromise](QuickJSAsyncContext.md#resolvepromise) to convert it to a native promise and
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

#### Inherited from

[QuickJSContext](QuickJSContext.md).[callFunction](QuickJSContext.md#callfunction)

#### Defined in

[ts/context.ts:608](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context.ts#L608)

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

#### Inherited from

[QuickJSContext](QuickJSContext.md).[defineProp](QuickJSContext.md#defineprop)

#### Defined in

[ts/context.ts:559](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context.ts#L559)

___

### dispose

▸ **dispose**(): `void`

Dispose of this VM's underlying resources.

**`throws`** Calling this method without disposing of all created handles
will result in an error.

#### Returns

`void`

#### Inherited from

[QuickJSContext](QuickJSContext.md).[dispose](QuickJSContext.md#dispose)

#### Defined in

[ts/context.ts:200](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context.ts#L200)

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

#### Inherited from

[QuickJSContext](QuickJSContext.md).[dump](QuickJSContext.md#dump)

#### Defined in

[ts/context.ts:725](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context.ts#L725)

___

### evalCode

▸ **evalCode**(`code`, `filename?`, `options?`): [`VmCallResult`](../modules.md#vmcallresult)<[`QuickJSHandle`](../modules.md#quickjshandle)\>

Like [`eval(code)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#Description).
Evaluates the Javascript source `code` in the global scope of this VM.
When working with async code, you many need to call [executePendingJobs](QuickJSRuntime.md#executependingjobs)
to execute callbacks pending after synchronous evaluation returns.

See [unwrapResult](QuickJSAsyncContext.md#unwrapresult), which will throw if the function returned an error, or
return the result handle directly. If evaluation returned a handle containing
a promise, use [resolvePromise](QuickJSAsyncContext.md#resolvepromise) to convert it to a native promise and
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

#### Inherited from

[QuickJSContext](QuickJSContext.md).[evalCode](QuickJSContext.md#evalcode)

#### Defined in

[ts/context.ts:655](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context.ts#L655)

___

### evalCodeAsync

▸ **evalCodeAsync**(`code`, `filename?`, `options?`): `Promise`<[`VmCallResult`](../modules.md#vmcallresult)<[`QuickJSHandle`](../modules.md#quickjshandle)\>\>

Asyncified version of [evalCode].

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `code` | `string` | `undefined` |
| `filename` | `string` | `"eval.js"` |
| `options?` | `number` \| [`ContextEvalOptions`](../interfaces/ContextEvalOptions.md) | `undefined` |

#### Returns

`Promise`<[`VmCallResult`](../modules.md#vmcallresult)<[`QuickJSHandle`](../modules.md#quickjshandle)\>\>

#### Defined in

[ts/context-asyncify.ts:34](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context-asyncify.ts#L34)

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

#### Inherited from

[QuickJSContext](QuickJSContext.md).[getNumber](QuickJSContext.md#getnumber)

#### Defined in

[ts/context.ts:457](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context.ts#L457)

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

#### Inherited from

[QuickJSContext](QuickJSContext.md).[getProp](QuickJSContext.md#getprop)

#### Defined in

[ts/context.ts:523](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context.ts#L523)

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

#### Inherited from

[QuickJSContext](QuickJSContext.md).[getString](QuickJSContext.md#getstring)

#### Defined in

[ts/context.ts:465](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context.ts#L465)

___

### newArray

▸ **newArray**(): [`QuickJSHandle`](../modules.md#quickjshandle)

`[]`.
Create a new QuickJS [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

#### Returns

[`QuickJSHandle`](../modules.md#quickjshandle)

#### Inherited from

[QuickJSContext](QuickJSContext.md).[newArray](QuickJSContext.md#newarray)

#### Defined in

[ts/context.ts:321](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context.ts#L321)

___

### newAsyncifiedFunction

▸ **newAsyncifiedFunction**(`name`, `fn`): [`QuickJSHandle`](../modules.md#quickjshandle)

Similar to [newFunction].
Convert an async host Javascript function into a synchronous QuickJS function value.

Whenever QuickJS calls this function, the VM's stack will be unwound while
waiting the async function to complete, and then restored when the returned
promise resolves.

Asyncified functions must never call other asyncified functions or
`import`, even indirectly, because the stack cannot be unwound twice.

See [Emscripten's docs on Asyncify](https://emscripten.org/docs/porting/asyncify.html).

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `fn` | `AsyncFunctionImplementation` |

#### Returns

[`QuickJSHandle`](../modules.md#quickjshandle)

#### Defined in

[ts/context-asyncify.ts:80](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context-asyncify.ts#L80)

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

#### Inherited from

[QuickJSContext](QuickJSContext.md).[newError](QuickJSContext.md#newerror)

#### Defined in

[ts/context.ts:412](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context.ts#L412)

▸ **newError**(`message`): [`QuickJSHandle`](../modules.md#quickjshandle)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

[`QuickJSHandle`](../modules.md#quickjshandle)

#### Inherited from

[QuickJSContext](QuickJSContext.md).[newError](QuickJSContext.md#newerror)

#### Defined in

[ts/context.ts:413](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context.ts#L413)

▸ **newError**(): [`QuickJSHandle`](../modules.md#quickjshandle)

#### Returns

[`QuickJSHandle`](../modules.md#quickjshandle)

#### Inherited from

[QuickJSContext](QuickJSContext.md).[newError](QuickJSContext.md#newerror)

#### Defined in

[ts/context.ts:414](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context.ts#L414)

___

### newFunction

▸ **newFunction**(`name`, `fn`): [`QuickJSHandle`](../modules.md#quickjshandle)

Convert a Javascript function into a QuickJS function value.
See [VmFunctionImplementation](../modules.md#vmfunctionimplementation) for more details.

A [VmFunctionImplementation](../modules.md#vmfunctionimplementation) should not free its arguments or its return
value. A VmFunctionImplementation should also not retain any references to
its return value.

To implement an async function, create a promise with [newPromise](QuickJSAsyncContext.md#newpromise), then
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

#### Inherited from

[QuickJSContext](QuickJSContext.md).[newFunction](QuickJSContext.md#newfunction)

#### Defined in

[ts/context.ts:406](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context.ts#L406)

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

#### Inherited from

[QuickJSContext](QuickJSContext.md).[newNumber](QuickJSContext.md#newnumber)

#### Defined in

[ts/context.ts:287](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context.ts#L287)

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

#### Inherited from

[QuickJSContext](QuickJSContext.md).[newObject](QuickJSContext.md#newobject)

#### Defined in

[ts/context.ts:307](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context.ts#L307)

___

### newPromise

▸ **newPromise**(): [`QuickJSDeferredPromise`](QuickJSDeferredPromise.md)

Create a new [QuickJSDeferredPromise](QuickJSDeferredPromise.md). Use `deferred.resolve(handle)` and
`deferred.reject(handle)` to fulfill the promise handle available at `deferred.handle`.
Note that you are responsible for calling `deferred.dispose()` to free the underlying
resources; see the documentation on [QuickJSDeferredPromise](QuickJSDeferredPromise.md) for details.

#### Returns

[`QuickJSDeferredPromise`](QuickJSDeferredPromise.md)

#### Inherited from

[QuickJSContext](QuickJSContext.md).[newPromise](QuickJSContext.md#newpromise)

#### Defined in

[ts/context.ts:332](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context.ts#L332)

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

#### Inherited from

[QuickJSContext](QuickJSContext.md).[newPromise](QuickJSContext.md#newpromise)

#### Defined in

[ts/context.ts:340](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context.ts#L340)

▸ **newPromise**(`newPromiseFn`): [`QuickJSDeferredPromise`](QuickJSDeferredPromise.md)

Construct a new native Promise<QuickJSHandle>, and then convert it into a
[QuickJSDeferredPromise](QuickJSDeferredPromise.md).

You can still resolve/reject the created promise "early" using its methods.

#### Parameters

| Name | Type |
| :------ | :------ |
| `newPromiseFn` | `PromiseExecutor`<[`QuickJSHandle`](../modules.md#quickjshandle), [`QuickJSHandle`](../modules.md#quickjshandle) \| `Error`\> |

#### Returns

[`QuickJSDeferredPromise`](QuickJSDeferredPromise.md)

#### Inherited from

[QuickJSContext](QuickJSContext.md).[newPromise](QuickJSContext.md#newpromise)

#### Defined in

[ts/context.ts:347](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context.ts#L347)

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

#### Inherited from

[QuickJSContext](QuickJSContext.md).[newString](QuickJSContext.md#newstring)

#### Defined in

[ts/context.ts:294](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context.ts#L294)

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

#### Inherited from

[QuickJSContext](QuickJSContext.md).[resolvePromise](QuickJSContext.md#resolvepromise)

#### Defined in

[ts/context.ts:480](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context.ts#L480)

___

### setProp

▸ **setProp**(`handle`, `key`, `value`): `void`

`handle[key] = value`.
Set a property on a JSValue.

**`remarks`**
Note that the QuickJS authors recommend using [defineProp](QuickJSAsyncContext.md#defineprop) to define new
properties.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handle` | [`QuickJSHandle`](../modules.md#quickjshandle) | - |
| `key` | [`QuickJSPropertyKey`](../modules.md#quickjspropertykey) | The property may be specified as a JSValue handle, or as a Javascript string or number (which will be converted automatically to a JSValue). |
| `value` | [`QuickJSHandle`](../modules.md#quickjshandle) | - |

#### Returns

`void`

#### Inherited from

[QuickJSContext](QuickJSContext.md).[setProp](QuickJSContext.md#setprop)

#### Defined in

[ts/context.ts:544](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context.ts#L544)

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

#### Inherited from

[QuickJSContext](QuickJSContext.md).[throw](QuickJSContext.md#throw)

#### Defined in

[ts/context.ts:685](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context.ts#L685)

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

#### Inherited from

[QuickJSContext](QuickJSContext.md).[typeof](QuickJSContext.md#typeof)

#### Defined in

[ts/context.ts:448](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context.ts#L448)

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

#### Inherited from

[QuickJSContext](QuickJSContext.md).[unwrapResult](QuickJSContext.md#unwrapresult)

#### Defined in

[ts/context.ts:750](https://github.com/justjake/quickjs-emscripten/blob/master/ts/context.ts#L750)
