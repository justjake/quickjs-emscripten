[quickjs-emscripten](../../packages.md) • **quickjs-emscripten-core** • [Readme](../index.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../exports.md) / QuickJSAsyncContext

# Class: QuickJSAsyncContext

Asyncified version of [[QuickJSContext]].

*Asyncify* allows normally synchronous code to wait for asynchronous Promises
or callbacks. The asyncified version of QuickJSContext can wait for async
host functions as though they were synchronous.

## Contents

- [Extends](QuickJSAsyncContext.md#extends)
- [Constructors](QuickJSAsyncContext.md#constructors)
  - [new QuickJSAsyncContext(args)](QuickJSAsyncContext.md#new-quickjsasynccontextargs)
- [Properties](QuickJSAsyncContext.md#properties)
  - [runtime](QuickJSAsyncContext.md#runtime)
- [Accessors](QuickJSAsyncContext.md#accessors)
  - [alive](QuickJSAsyncContext.md#alive)
  - [false](QuickJSAsyncContext.md#false)
  - [global](QuickJSAsyncContext.md#global)
  - [null](QuickJSAsyncContext.md#null)
  - [true](QuickJSAsyncContext.md#true)
  - [undefined](QuickJSAsyncContext.md#undefined)
- [Methods](QuickJSAsyncContext.md#methods)
  - [callFunction()](QuickJSAsyncContext.md#callfunction)
  - [decodeBinaryJSON()](QuickJSAsyncContext.md#decodebinaryjson)
  - [defineProp()](QuickJSAsyncContext.md#defineprop)
  - [dispose()](QuickJSAsyncContext.md#dispose)
  - [dump()](QuickJSAsyncContext.md#dump)
  - [encodeBinaryJSON()](QuickJSAsyncContext.md#encodebinaryjson)
  - [evalCode()](QuickJSAsyncContext.md#evalcode)
  - [evalCodeAsync()](QuickJSAsyncContext.md#evalcodeasync)
  - [getArrayBuffer()](QuickJSAsyncContext.md#getarraybuffer)
  - [getBigInt()](QuickJSAsyncContext.md#getbigint)
  - [getNumber()](QuickJSAsyncContext.md#getnumber)
  - [getProp()](QuickJSAsyncContext.md#getprop)
  - [getString()](QuickJSAsyncContext.md#getstring)
  - [getSymbol()](QuickJSAsyncContext.md#getsymbol)
  - [newArray()](QuickJSAsyncContext.md#newarray)
  - [newArrayBuffer()](QuickJSAsyncContext.md#newarraybuffer)
  - [newAsyncifiedFunction()](QuickJSAsyncContext.md#newasyncifiedfunction)
  - [newBigInt()](QuickJSAsyncContext.md#newbigint)
  - [newError()](QuickJSAsyncContext.md#newerror)
  - [newFunction()](QuickJSAsyncContext.md#newfunction)
  - [newNumber()](QuickJSAsyncContext.md#newnumber)
  - [newObject()](QuickJSAsyncContext.md#newobject)
  - [newPromise()](QuickJSAsyncContext.md#newpromise)
  - [newString()](QuickJSAsyncContext.md#newstring)
  - [newSymbolFor()](QuickJSAsyncContext.md#newsymbolfor)
  - [newUniqueSymbol()](QuickJSAsyncContext.md#newuniquesymbol)
  - [resolvePromise()](QuickJSAsyncContext.md#resolvepromise)
  - [setProp()](QuickJSAsyncContext.md#setprop)
  - [throw()](QuickJSAsyncContext.md#throw)
  - [typeof()](QuickJSAsyncContext.md#typeof)
  - [unwrapResult()](QuickJSAsyncContext.md#unwrapresult)

## Extends

- [`QuickJSContext`](QuickJSContext.md)

## Constructors

### new QuickJSAsyncContext(args)

> **new QuickJSAsyncContext**(`args`): [`QuickJSAsyncContext`](QuickJSAsyncContext.md)

Use QuickJS.createVm to create a QuickJSContext instance.

#### Parameters

• **args**: `Object`

• **args\.callbacks**: `QuickJSModuleCallbacks`

• **args\.ctx**: [`Lifetime`](Lifetime.md)\<[`JSContextPointer`](../exports.md#jscontextpointer), `never`, `never`\>

• **args\.ffi**: `EitherFFI`

• **args\.module**: [`EitherModule`](../exports.md#eithermodule)

• **args\.ownedLifetimes?**: [`Disposable`](../interfaces/Disposable.md)[]

• **args\.rt**: [`Lifetime`](Lifetime.md)\<[`JSRuntimePointer`](../exports.md#jsruntimepointer), `never`, `never`\>

• **args\.runtime**: `QuickJSRuntime`

#### Returns

[`QuickJSAsyncContext`](QuickJSAsyncContext.md)

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.constructor`](QuickJSContext.md#constructors)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:172](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L172)

## Properties

### runtime

> **runtime**: [`QuickJSAsyncRuntime`](QuickJSAsyncRuntime.md)

The runtime that created this context.

#### Overrides

[`quickjs-emscripten-core.QuickJSContext.runtime`](QuickJSContext.md#runtime)

#### Source

[packages/quickjs-emscripten-core/src/context-asyncify.ts:30](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context-asyncify.ts#L30)

## Accessors

### alive

> **`get`** **alive**(): `boolean`

#### Returns

`boolean`

true if the object is alive

false after the object has been [[dispose]]d

#### Source

[packages/quickjs-emscripten-core/src/context.ts:199](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L199)

***

### false

> **`get`** **false**(): [`QuickJSHandle`](../exports.md#quickjshandle)

[`false`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/false).

#### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:257](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L257)

***

### global

> **`get`** **global**(): [`QuickJSHandle`](../exports.md#quickjshandle)

[`global`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects).
A handle to the global object inside the interpreter.
You can set properties to create global variables.

#### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:272](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L272)

***

### null

> **`get`** **null**(): [`QuickJSHandle`](../exports.md#quickjshandle)

[`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null).

#### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:231](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L231)

***

### true

> **`get`** **true**(): [`QuickJSHandle`](../exports.md#quickjshandle)

[`true`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/true).

#### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:244](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L244)

***

### undefined

> **`get`** **undefined**(): [`QuickJSHandle`](../exports.md#quickjshandle)

[`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined).

#### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:218](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L218)

## Methods

### callFunction()

> **callFunction**(`func`, `thisVal`, ...`args`): [`VmCallResult`](../exports.md#vmcallresultvmhandle)\<[`QuickJSHandle`](../exports.md#quickjshandle)\>

[`func.call(thisVal, ...args)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call).
Call a JSValue as a function.

See [[unwrapResult]], which will throw if the function returned an error, or
return the result handle directly. If evaluation returned a handle containing
a promise, use [[resolvePromise]] to convert it to a native promise and
[[executePendingJobs]] to finish evaluating the promise.

#### Parameters

• **func**: [`QuickJSHandle`](../exports.md#quickjshandle)

• **thisVal**: [`QuickJSHandle`](../exports.md#quickjshandle)

• ...**args**: [`QuickJSHandle`](../exports.md#quickjshandle)[]

#### Returns

[`VmCallResult`](../exports.md#vmcallresultvmhandle)\<[`QuickJSHandle`](../exports.md#quickjshandle)\>

A result. If the function threw synchronously, `result.error` be a
handle to the exception. Otherwise `result.value` will be a handle to the
value.

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.callFunction`](QuickJSContext.md#callfunction)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:705](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L705)

***

### decodeBinaryJSON()

> **decodeBinaryJSON**(`handle`): [`QuickJSHandle`](../exports.md#quickjshandle)

Outputs Handle of the given QuickJS Object in binary form

```ts
// imagine receiving data from another via IPC
socket.on("data", chunk => {
 context.newArrayBuffer(chunk)
   ?.consume(handle => context.decodeBinaryJSON(handle))
   ?.consume(handle => console.log(context.dump(handle)))
})
```

#### Parameters

• **handle**: [`QuickJSHandle`](../exports.md#quickjshandle)

#### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.decodeBinaryJSON`](QuickJSContext.md#decodebinaryjson)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:996](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L996)

***

### defineProp()

> **defineProp**(`handle`, `key`, `descriptor`): `void`

[`Object.defineProperty(handle, key, descriptor)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).

#### Parameters

• **handle**: [`QuickJSHandle`](../exports.md#quickjshandle)

• **key**: [`QuickJSPropertyKey`](../exports.md#quickjspropertykey)

The property may be specified as a JSValue handle, or as a
Javascript string or number (which will be converted automatically to a JSValue).

• **descriptor**: [`VmPropertyDescriptor`](../interfaces/VmPropertyDescriptor.md)\<[`QuickJSHandle`](../exports.md#quickjshandle)\>

#### Returns

`void`

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.defineProp`](QuickJSContext.md#defineprop)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:656](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L656)

***

### dispose()

> **dispose**(): `void`

Dispose of this VM's underlying resources.

#### Returns

`void`

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.dispose`](QuickJSContext.md#dispose)

#### Throws

Calling this method without disposing of all created handles
will result in an error.

#### Source

[packages/quickjs-emscripten-core/src/context.ts:209](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L209)

***

### dump()

> **dump**(`handle`): `any`

Dump a JSValue to Javascript in a best-effort fashion.
Returns `handle.toString()` if it cannot be serialized to JSON.

#### Parameters

• **handle**: [`QuickJSHandle`](../exports.md#quickjshandle)

#### Returns

`any`

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.dump`](QuickJSContext.md#dump)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:822](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L822)

***

### encodeBinaryJSON()

> **encodeBinaryJSON**(`handle`): [`QuickJSHandle`](../exports.md#quickjshandle)

Outputs QuickJS Objects in binary form

**WARNING**: QuickJS's binary JSON doesn't have a standard so expect it to change between version

```ts
// imagine sending data to another via IPC
let dataLifetime = context.newString("This is an example")
 ?.consume(handle => context.encodeBinaryJSON(handle))
 ?.consume(handle => context.getArrayBuffer(handle))
socket.write(dataLifetime?.value)
```

#### Parameters

• **handle**: [`QuickJSHandle`](../exports.md#quickjshandle)

#### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.encodeBinaryJSON`](QuickJSContext.md#encodebinaryjson)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:979](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L979)

***

### evalCode()

> **evalCode**(`code`, `filename`, `options`?): [`VmCallResult`](../exports.md#vmcallresultvmhandle)\<[`QuickJSHandle`](../exports.md#quickjshandle)\>

Like [`eval(code)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#Description).
Evaluates the Javascript source `code` in the global scope of this VM.
When working with async code, you many need to call [[executePendingJobs]]
to execute callbacks pending after synchronous evaluation returns.

See [[unwrapResult]], which will throw if the function returned an error, or
return the result handle directly. If evaluation returned a handle containing
a promise, use [[resolvePromise]] to convert it to a native promise and
[[executePendingJobs]] to finish evaluating the promise.

*Note*: to protect against infinite loops, provide an interrupt handler to
[[setInterruptHandler]]. You can use [[shouldInterruptAfterDeadline]] to
create a time-based deadline.

#### Parameters

• **code**: `string`

• **filename**: `string`= `"eval.js"`

• **options?**: `number` \| [`ContextEvalOptions`](../interfaces/ContextEvalOptions.md)

If no options are passed, a heuristic will be used to detect if `code` is
an ES module.

See [[EvalFlags]] for number semantics.

#### Returns

[`VmCallResult`](../exports.md#vmcallresultvmhandle)\<[`QuickJSHandle`](../exports.md#quickjshandle)\>

The last statement's value. If the code threw synchronously,
`result.error` will be a handle to the exception. If execution was
interrupted, the error will have name `InternalError` and message
`interrupted`.

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.evalCode`](QuickJSContext.md#evalcode)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:752](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L752)

***

### evalCodeAsync()

> **evalCodeAsync**(`code`, `filename`, `options`?): `Promise`\<[`VmCallResult`](../exports.md#vmcallresultvmhandle)\<[`QuickJSHandle`](../exports.md#quickjshandle)\>\>

Asyncified version of [[evalCode]].

#### Parameters

• **code**: `string`

• **filename**: `string`= `"eval.js"`

• **options?**: `number` \| [`ContextEvalOptions`](../interfaces/ContextEvalOptions.md)

See [[EvalFlags]] for number semantics

#### Returns

`Promise`\<[`VmCallResult`](../exports.md#vmcallresultvmhandle)\<[`QuickJSHandle`](../exports.md#quickjshandle)\>\>

#### Source

[packages/quickjs-emscripten-core/src/context-asyncify.ts:43](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context-asyncify.ts#L43)

***

### getArrayBuffer()

> **getArrayBuffer**(`handle`): [`Lifetime`](Lifetime.md)\<`Uint8Array`, `never`, `never`\>

Coverts `handle` to a JavaScript ArrayBuffer

#### Parameters

• **handle**: [`QuickJSHandle`](../exports.md#quickjshandle)

#### Returns

[`Lifetime`](Lifetime.md)\<`Uint8Array`, `never`, `never`\>

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.getArrayBuffer`](QuickJSContext.md#getarraybuffer)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:555](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L555)

***

### getBigInt()

> **getBigInt**(`handle`): `bigint`

Converts `handle` to a Javascript bigint.

#### Parameters

• **handle**: [`QuickJSHandle`](../exports.md#quickjshandle)

#### Returns

`bigint`

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.getBigInt`](QuickJSContext.md#getbigint)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:546](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L546)

***

### getNumber()

> **getNumber**(`handle`): `number`

Converts `handle` into a Javascript number.

#### Parameters

• **handle**: [`QuickJSHandle`](../exports.md#quickjshandle)

#### Returns

`number`

`NaN` on error, otherwise a `number`.

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.getNumber`](QuickJSContext.md#getnumber)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:517](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L517)

***

### getProp()

> **getProp**(`handle`, `key`): [`QuickJSHandle`](../exports.md#quickjshandle)

`handle[key]`.
Get a property from a JSValue.

#### Parameters

• **handle**: [`QuickJSHandle`](../exports.md#quickjshandle)

• **key**: [`QuickJSPropertyKey`](../exports.md#quickjspropertykey)

The property may be specified as a JSValue handle, or as a
Javascript string (which will be converted automatically).

#### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.getProp`](QuickJSContext.md#getprop)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:620](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L620)

***

### getString()

> **getString**(`handle`): `string`

Converts `handle` to a Javascript string.

#### Parameters

• **handle**: [`QuickJSHandle`](../exports.md#quickjshandle)

#### Returns

`string`

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.getString`](QuickJSContext.md#getstring)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:525](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L525)

***

### getSymbol()

> **getSymbol**(`handle`): `symbol`

Converts `handle` into a Javascript symbol. If the symbol is in the global
registry in the guest, it will be created with Symbol.for on the host.

#### Parameters

• **handle**: [`QuickJSHandle`](../exports.md#quickjshandle)

#### Returns

`symbol`

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.getSymbol`](QuickJSContext.md#getsymbol)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:534](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L534)

***

### newArray()

> **newArray**(): [`QuickJSHandle`](../exports.md#quickjshandle)

`[]`.
Create a new QuickJS [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

#### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.newArray`](QuickJSContext.md#newarray)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:371](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L371)

***

### newArrayBuffer()

> **newArrayBuffer**(`buffer`): [`QuickJSHandle`](../exports.md#quickjshandle)

Create a new QuickJS [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer).

#### Parameters

• **buffer**: `ArrayBufferLike`

#### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.newArrayBuffer`](QuickJSContext.md#newarraybuffer)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:379](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L379)

***

### newAsyncifiedFunction()

> **newAsyncifiedFunction**(`name`, `fn`): [`QuickJSHandle`](../exports.md#quickjshandle)

Similar to [[newFunction]].
Convert an async host Javascript function into a synchronous QuickJS function value.

Whenever QuickJS calls this function, the VM's stack will be unwound while
waiting the async function to complete, and then restored when the returned
promise resolves.

Asyncified functions must never call other asyncified functions or
`import`, even indirectly, because the stack cannot be unwound twice.

See [Emscripten's docs on Asyncify](https://emscripten.org/docs/porting/asyncify.html).

#### Parameters

• **name**: `string`

• **fn**: [`AsyncFunctionImplementation`](../exports.md#asyncfunctionimplementation)

#### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

#### Source

[packages/quickjs-emscripten-core/src/context-asyncify.ts:89](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context-asyncify.ts#L89)

***

### newBigInt()

> **newBigInt**(`num`): [`QuickJSHandle`](../exports.md#quickjshandle)

Create a QuickJS [bigint](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) value.

#### Parameters

• **num**: `bigint`

#### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.newBigInt`](QuickJSContext.md#newbigint)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:337](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L337)

***

### newError()

#### newError(error)

> **newError**(`error`): [`QuickJSHandle`](../exports.md#quickjshandle)

##### Parameters

• **error**: `Object`

• **error\.message**: `string`

• **error\.name**: `string`

##### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

##### Inherited from

[`quickjs-emscripten-core.QuickJSContext.newError`](QuickJSContext.md#newerror)

##### Source

[packages/quickjs-emscripten-core/src/context.ts:472](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L472)

#### newError(message)

> **newError**(`message`): [`QuickJSHandle`](../exports.md#quickjshandle)

##### Parameters

• **message**: `string`

##### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

##### Inherited from

[`quickjs-emscripten-core.QuickJSContext.newError`](QuickJSContext.md#newerror)

##### Source

[packages/quickjs-emscripten-core/src/context.ts:473](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L473)

#### newError(undefined)

> **newError**(): [`QuickJSHandle`](../exports.md#quickjshandle)

##### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

##### Inherited from

[`quickjs-emscripten-core.QuickJSContext.newError`](QuickJSContext.md#newerror)

##### Source

[packages/quickjs-emscripten-core/src/context.ts:474](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L474)

***

### newFunction()

> **newFunction**(`name`, `fn`): [`QuickJSHandle`](../exports.md#quickjshandle)

Convert a Javascript function into a QuickJS function value.
See [[VmFunctionImplementation]] for more details.

A [[VmFunctionImplementation]] should not free its arguments or its return
value. A VmFunctionImplementation should also not retain any references to
its return value.

To implement an async function, create a promise with [[newPromise]], then
return the deferred promise handle from `deferred.handle` from your
function implementation:

```
const deferred = vm.newPromise()
someNativeAsyncFunction().then(deferred.resolve)
return deferred.handle
```

#### Parameters

• **name**: `string`

• **fn**: [`VmFunctionImplementation`](../exports.md#vmfunctionimplementationvmhandle)\<[`QuickJSHandle`](../exports.md#quickjshandle)\>

#### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.newFunction`](QuickJSContext.md#newfunction)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:466](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L466)

***

### newNumber()

> **newNumber**(`num`): [`QuickJSHandle`](../exports.md#quickjshandle)

Converts a Javascript number into a QuickJS value.

#### Parameters

• **num**: `number`

#### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.newNumber`](QuickJSContext.md#newnumber)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:296](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L296)

***

### newObject()

> **newObject**(`prototype`?): [`QuickJSHandle`](../exports.md#quickjshandle)

`{}`.
Create a new QuickJS [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer).

#### Parameters

• **prototype?**: [`QuickJSHandle`](../exports.md#quickjshandle)

Like [`Object.create`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create).

#### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.newObject`](QuickJSContext.md#newobject)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:357](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L357)

***

### newPromise()

#### newPromise(undefined)

> **newPromise**(): [`QuickJSDeferredPromise`](QuickJSDeferredPromise.md)

Create a new [[QuickJSDeferredPromise]]. Use `deferred.resolve(handle)` and
`deferred.reject(handle)` to fulfill the promise handle available at `deferred.handle`.
Note that you are responsible for calling `deferred.dispose()` to free the underlying
resources; see the documentation on [[QuickJSDeferredPromise]] for details.

##### Returns

[`QuickJSDeferredPromise`](QuickJSDeferredPromise.md)

##### Inherited from

[`quickjs-emscripten-core.QuickJSContext.newPromise`](QuickJSContext.md#newpromise)

##### Source

[packages/quickjs-emscripten-core/src/context.ts:392](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L392)

#### newPromise(promise)

> **newPromise**(`promise`): [`QuickJSDeferredPromise`](QuickJSDeferredPromise.md)

Create a new [[QuickJSDeferredPromise]] that resolves when the
given native Promise`<QuickJSHandle>`  resolves. Rejections will be coerced
to a QuickJS error.

You can still resolve/reject the created promise "early" using its methods.

##### Parameters

• **promise**: `Promise`\<[`QuickJSHandle`](../exports.md#quickjshandle)\>

##### Returns

[`QuickJSDeferredPromise`](QuickJSDeferredPromise.md)

##### Inherited from

[`quickjs-emscripten-core.QuickJSContext.newPromise`](QuickJSContext.md#newpromise)

##### Source

[packages/quickjs-emscripten-core/src/context.ts:400](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L400)

#### newPromise(newPromiseFn)

> **newPromise**(`newPromiseFn`): [`QuickJSDeferredPromise`](QuickJSDeferredPromise.md)

Construct a new native Promise`<QuickJSHandle>` , and then convert it into a
[[QuickJSDeferredPromise]].

You can still resolve/reject the created promise "early" using its methods.

##### Parameters

• **newPromiseFn**: [`PromiseExecutor`](../exports.md#promiseexecutorresolvet-rejectt)\<[`QuickJSHandle`](../exports.md#quickjshandle), `Error` \| [`QuickJSHandle`](../exports.md#quickjshandle)\>

##### Returns

[`QuickJSDeferredPromise`](QuickJSDeferredPromise.md)

##### Inherited from

[`quickjs-emscripten-core.QuickJSContext.newPromise`](QuickJSContext.md#newpromise)

##### Source

[packages/quickjs-emscripten-core/src/context.ts:407](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L407)

***

### newString()

> **newString**(`str`): [`QuickJSHandle`](../exports.md#quickjshandle)

Create a QuickJS [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) value.

#### Parameters

• **str**: `string`

#### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.newString`](QuickJSContext.md#newstring)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:303](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L303)

***

### newSymbolFor()

> **newSymbolFor**(`key`): [`QuickJSHandle`](../exports.md#quickjshandle)

Get a symbol from the [global registry](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#shared_symbols_in_the_global_symbol_registry) for the given key.
All symbols created with the same key will be the same value.

#### Parameters

• **key**: `string` \| `symbol`

#### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.newSymbolFor`](QuickJSContext.md#newsymbolfor)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:326](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L326)

***

### newUniqueSymbol()

> **newUniqueSymbol**(`description`): [`QuickJSHandle`](../exports.md#quickjshandle)

Create a QuickJS [symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) value.
No two symbols created with this function will be the same value.

#### Parameters

• **description**: `string` \| `symbol`

#### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.newUniqueSymbol`](QuickJSContext.md#newuniquesymbol)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:314](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L314)

***

### resolvePromise()

> **resolvePromise**(`promiseLikeHandle`): `Promise`\<[`VmCallResult`](../exports.md#vmcallresultvmhandle)\<[`QuickJSHandle`](../exports.md#quickjshandle)\>\>

`Promise.resolve(value)`.
Convert a handle containing a Promise-like value inside the VM into an
actual promise on the host.

#### Parameters

• **promiseLikeHandle**: [`QuickJSHandle`](../exports.md#quickjshandle)

A handle to a Promise-like value with a `.then(onSuccess, onError)` method.

#### Returns

`Promise`\<[`VmCallResult`](../exports.md#vmcallresultvmhandle)\<[`QuickJSHandle`](../exports.md#quickjshandle)\>\>

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.resolvePromise`](QuickJSContext.md#resolvepromise)

#### Remarks

You may need to call [[executePendingJobs]] to ensure that the promise is resolved.

#### Source

[packages/quickjs-emscripten-core/src/context.ts:577](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L577)

***

### setProp()

> **setProp**(`handle`, `key`, `value`): `void`

`handle[key] = value`.
Set a property on a JSValue.

#### Parameters

• **handle**: [`QuickJSHandle`](../exports.md#quickjshandle)

• **key**: [`QuickJSPropertyKey`](../exports.md#quickjspropertykey)

The property may be specified as a JSValue handle, or as a
Javascript string or number (which will be converted automatically to a JSValue).

• **value**: [`QuickJSHandle`](../exports.md#quickjshandle)

#### Returns

`void`

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.setProp`](QuickJSContext.md#setprop)

#### Remarks

Note that the QuickJS authors recommend using [[defineProp]] to define new
properties.

#### Source

[packages/quickjs-emscripten-core/src/context.ts:641](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L641)

***

### throw()

> **throw**(`error`): [`JSValuePointer`](../exports.md#jsvaluepointer)

Throw an error in the VM, interrupted whatever current execution is in progress when execution resumes.

#### Parameters

• **error**: `Error` \| [`QuickJSHandle`](../exports.md#quickjshandle)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.throw`](QuickJSContext.md#throw)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:782](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L782)

***

### typeof()

> **typeof**(`handle`): `string`

`typeof` operator. **Not** [standards compliant](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof).

#### Parameters

• **handle**: [`QuickJSHandle`](../exports.md#quickjshandle)

#### Returns

`string`

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.typeof`](QuickJSContext.md#typeof)

#### Remarks

Does not support BigInt values correctly.

#### Source

[packages/quickjs-emscripten-core/src/context.ts:508](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L508)

***

### unwrapResult()

> **unwrapResult**\<`T`\>(`result`): `T`

Unwrap a SuccessOrFail result such as a [[VmCallResult]] or a
[[ExecutePendingJobsResult]], where the fail branch contains a handle to a QuickJS error value.
If the result is a success, returns the value.
If the result is an error, converts the error to a native object and throws the error.

#### Type parameters

• **T**

#### Parameters

• **result**: [`SuccessOrFail`](../exports.md#successorfails-f)\<`T`, [`QuickJSHandle`](../exports.md#quickjshandle)\>

#### Returns

`T`

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.unwrapResult`](QuickJSContext.md#unwrapresult)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:851](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L851)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
