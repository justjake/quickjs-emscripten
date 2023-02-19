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
- [getBigInt](QuickJSContext.md#getbigint)
- [getNumber](QuickJSContext.md#getnumber)
- [getProp](QuickJSContext.md#getprop)
- [getString](QuickJSContext.md#getstring)
- [getSymbol](QuickJSContext.md#getsymbol)
- [newArray](QuickJSContext.md#newarray)
- [newBigInt](QuickJSContext.md#newbigint)
- [newError](QuickJSContext.md#newerror)
- [newFunction](QuickJSContext.md#newfunction)
- [newNumber](QuickJSContext.md#newnumber)
- [newObject](QuickJSContext.md#newobject)
- [newPromise](QuickJSContext.md#newpromise)
- [newString](QuickJSContext.md#newstring)
- [newSymbolFor](QuickJSContext.md#newsymbolfor)
- [newUniqueSymbol](QuickJSContext.md#newuniquesymbol)
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

[ts/context.ts:172](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L172)

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

[ts/context.ts:199](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L199)

___

### false

• `get` **false**(): [`QuickJSHandle`](../modules.md#quickjshandle)

[`false`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/false).

#### Returns

[`QuickJSHandle`](../modules.md#quickjshandle)

#### Defined in

[ts/context.ts:257](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L257)

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

[ts/context.ts:272](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L272)

___

### null

• `get` **null**(): [`QuickJSHandle`](../modules.md#quickjshandle)

[`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null).

#### Returns

[`QuickJSHandle`](../modules.md#quickjshandle)

#### Defined in

[ts/context.ts:231](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L231)

___

### true

• `get` **true**(): [`QuickJSHandle`](../modules.md#quickjshandle)

[`true`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/true).

#### Returns

[`QuickJSHandle`](../modules.md#quickjshandle)

#### Defined in

[ts/context.ts:244](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L244)

___

### undefined

• `get` **undefined**(): [`QuickJSHandle`](../modules.md#quickjshandle)

[`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined).

#### Returns

[`QuickJSHandle`](../modules.md#quickjshandle)

#### Implementation of

[LowLevelJavascriptVm](../interfaces/LowLevelJavascriptVm.md).[undefined](../interfaces/LowLevelJavascriptVm.md#undefined)

#### Defined in

[ts/context.ts:218](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L218)

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

[ts/context.ts:680](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L680)

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

[ts/context.ts:631](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L631)

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

[ts/context.ts:209](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L209)

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

[ts/context.ts:797](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L797)

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

[ts/context.ts:727](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L727)

___

### getBigInt

▸ **getBigInt**(`handle`): `bigint`

Converts `handle` to a Javascript bigint.

#### Parameters

| Name | Type |
| :------ | :------ |
| `handle` | [`QuickJSHandle`](../modules.md#quickjshandle) |

#### Returns

`bigint`

#### Defined in

[ts/context.ts:536](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L536)

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

[ts/context.ts:507](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L507)

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

[ts/context.ts:595](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L595)

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

[ts/context.ts:515](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L515)

___

### getSymbol

▸ **getSymbol**(`handle`): `symbol`

Converts `handle` into a Javascript symbol. If the symbol is in the global
registry in the guest, it will be created with Symbol.for on the host.

#### Parameters

| Name | Type |
| :------ | :------ |
| `handle` | [`QuickJSHandle`](../modules.md#quickjshandle) |

#### Returns

`symbol`

#### Defined in

[ts/context.ts:524](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L524)

___

### newArray

▸ **newArray**(): [`QuickJSHandle`](../modules.md#quickjshandle)

`[]`.
Create a new QuickJS [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

#### Returns

[`QuickJSHandle`](../modules.md#quickjshandle)

#### Defined in

[ts/context.ts:371](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L371)

___

### newBigInt

▸ **newBigInt**(`num`): [`QuickJSHandle`](../modules.md#quickjshandle)

Create a QuickJS [bigint](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) value.

#### Parameters

| Name | Type |
| :------ | :------ |
| `num` | `bigint` |

#### Returns

[`QuickJSHandle`](../modules.md#quickjshandle)

#### Defined in

[ts/context.ts:337](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L337)

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

[ts/context.ts:462](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L462)

▸ **newError**(`message`): [`QuickJSHandle`](../modules.md#quickjshandle)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

[`QuickJSHandle`](../modules.md#quickjshandle)

#### Defined in

[ts/context.ts:463](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L463)

▸ **newError**(): [`QuickJSHandle`](../modules.md#quickjshandle)

#### Returns

[`QuickJSHandle`](../modules.md#quickjshandle)

#### Defined in

[ts/context.ts:464](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L464)

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

[ts/context.ts:456](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L456)

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

[ts/context.ts:296](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L296)

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

[ts/context.ts:357](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L357)

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

[ts/context.ts:382](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L382)

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

[ts/context.ts:390](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L390)

▸ **newPromise**(`newPromiseFn`): [`QuickJSDeferredPromise`](QuickJSDeferredPromise.md)

Construct a new native Promise<QuickJSHandle>, and then convert it into a
[QuickJSDeferredPromise](QuickJSDeferredPromise.md).

You can still resolve/reject the created promise "early" using its methods.

#### Parameters

| Name | Type |
| :------ | :------ |
| `newPromiseFn` | [`PromiseExecutor`](../modules.md#promiseexecutor)<[`QuickJSHandle`](../modules.md#quickjshandle), `Error` \| [`QuickJSHandle`](../modules.md#quickjshandle)\> |

#### Returns

[`QuickJSDeferredPromise`](QuickJSDeferredPromise.md)

#### Defined in

[ts/context.ts:397](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L397)

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

[ts/context.ts:303](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L303)

___

### newSymbolFor

▸ **newSymbolFor**(`key`): [`QuickJSHandle`](../modules.md#quickjshandle)

Get a symbol from the [global registry](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#shared_symbols_in_the_global_symbol_registry) for the given key.
All symbols created with the same key will be the same value.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `symbol` |

#### Returns

[`QuickJSHandle`](../modules.md#quickjshandle)

#### Defined in

[ts/context.ts:326](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L326)

___

### newUniqueSymbol

▸ **newUniqueSymbol**(`description`): [`QuickJSHandle`](../modules.md#quickjshandle)

Create a QuickJS [symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) value.
No two symbols created with this function will be the same value.

#### Parameters

| Name | Type |
| :------ | :------ |
| `description` | `string` \| `symbol` |

#### Returns

[`QuickJSHandle`](../modules.md#quickjshandle)

#### Defined in

[ts/context.ts:314](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L314)

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

[ts/context.ts:552](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L552)

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

[ts/context.ts:616](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L616)

___

### throw

▸ **throw**(`error`): `JSValuePointer`

Throw an error in the VM, interrupted whatever current execution is in progress when execution resumes.

**`experimental`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` \| [`QuickJSHandle`](../modules.md#quickjshandle) |

#### Returns

`JSValuePointer`

#### Defined in

[ts/context.ts:757](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L757)

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

[ts/context.ts:498](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L498)

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

[ts/context.ts:826](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L826)
