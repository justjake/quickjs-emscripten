[quickjs-emscripten](../../packages.md) • **quickjs-emscripten-core** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../exports.md) / QuickJSAsyncContext

# Class: QuickJSAsyncContext

Asyncified version of [QuickJSContext](QuickJSContext.md).

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
  - [`[dispose]`()](QuickJSAsyncContext.md#dispose)
  - [callFunction()](QuickJSAsyncContext.md#callfunction)
  - [callMethod()](QuickJSAsyncContext.md#callmethod)
  - [decodeBinaryJSON()](QuickJSAsyncContext.md#decodebinaryjson)
  - [defineProp()](QuickJSAsyncContext.md#defineprop)
  - [dispose()](QuickJSAsyncContext.md#dispose)
  - [dump()](QuickJSAsyncContext.md#dump)
  - [encodeBinaryJSON()](QuickJSAsyncContext.md#encodebinaryjson)
  - [eq()](QuickJSAsyncContext.md#eq)
  - [evalCode()](QuickJSAsyncContext.md#evalcode)
  - [evalCodeAsync()](QuickJSAsyncContext.md#evalcodeasync)
  - [fail()](QuickJSAsyncContext.md#fail)
  - [getArrayBuffer()](QuickJSAsyncContext.md#getarraybuffer)
  - [getBigInt()](QuickJSAsyncContext.md#getbigint)
  - [getIterator()](QuickJSAsyncContext.md#getiterator)
  - [getLength()](QuickJSAsyncContext.md#getlength)
  - [getNumber()](QuickJSAsyncContext.md#getnumber)
  - [getOwnPropertyNames()](QuickJSAsyncContext.md#getownpropertynames)
  - [getPromiseState()](QuickJSAsyncContext.md#getpromisestate)
  - [getProp()](QuickJSAsyncContext.md#getprop)
  - [getString()](QuickJSAsyncContext.md#getstring)
  - [getSymbol()](QuickJSAsyncContext.md#getsymbol)
  - [getWellKnownSymbol()](QuickJSAsyncContext.md#getwellknownsymbol)
  - [newArray()](QuickJSAsyncContext.md#newarray)
  - [newArrayBuffer()](QuickJSAsyncContext.md#newarraybuffer)
  - [newAsyncifiedFunction()](QuickJSAsyncContext.md#newasyncifiedfunction)
  - [newBigInt()](QuickJSAsyncContext.md#newbigint)
  - [newConstructorFunction()](QuickJSAsyncContext.md#newconstructorfunction)
  - [newError()](QuickJSAsyncContext.md#newerror)
  - [newFunction()](QuickJSAsyncContext.md#newfunction)
  - [newFunctionWithOptions()](QuickJSAsyncContext.md#newfunctionwithoptions)
  - [newHostRef()](QuickJSAsyncContext.md#newhostref)
  - [newNumber()](QuickJSAsyncContext.md#newnumber)
  - [newObject()](QuickJSAsyncContext.md#newobject)
  - [newPromise()](QuickJSAsyncContext.md#newpromise)
  - [newString()](QuickJSAsyncContext.md#newstring)
  - [newSymbolFor()](QuickJSAsyncContext.md#newsymbolfor)
  - [newUniqueSymbol()](QuickJSAsyncContext.md#newuniquesymbol)
  - [resolvePromise()](QuickJSAsyncContext.md#resolvepromise)
  - [sameValue()](QuickJSAsyncContext.md#samevalue)
  - [sameValueZero()](QuickJSAsyncContext.md#samevaluezero)
  - [setProp()](QuickJSAsyncContext.md#setprop)
  - [success()](QuickJSAsyncContext.md#success)
  - [throw()](QuickJSAsyncContext.md#throw)
  - [toHostRef()](QuickJSAsyncContext.md#tohostref)
  - [typeof()](QuickJSAsyncContext.md#typeof)
  - [unwrapHostRef()](QuickJSAsyncContext.md#unwraphostref)
  - [unwrapResult()](QuickJSAsyncContext.md#unwrapresult)

## Extends

- [`QuickJSContext`](QuickJSContext.md)

## Constructors

### new QuickJSAsyncContext(args)

> **new QuickJSAsyncContext**(`args`): [`QuickJSAsyncContext`](QuickJSAsyncContext.md)

Use [QuickJSRuntime#newContext](QuickJSRuntime.md#newcontext) or [QuickJSWASMModule#newContext](QuickJSWASMModule.md#newcontext)
to create a new QuickJSContext.

#### Parameters

• **args**: `Object`

• **args\.callbacks**: `QuickJSModuleCallbacks`

• **args\.ctx**: [`Lifetime`](Lifetime.md)\<[`JSContextPointer`](../exports.md#jscontextpointer), `never`, `never`\>

• **args\.ffi**: [`EitherFFI`](../exports.md#eitherffi)

• **args\.module**: [`EitherModule`](../exports.md#eithermodule)

• **args\.ownedLifetimes?**: [`Disposable`](../interfaces/Disposable.md)[]

• **args\.rt**: [`Lifetime`](Lifetime.md)\<[`JSRuntimePointer`](../exports.md#jsruntimepointer), `never`, `never`\>

• **args\.runtime**: [`QuickJSRuntime`](QuickJSRuntime.md)

#### Returns

[`QuickJSAsyncContext`](QuickJSAsyncContext.md)

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.constructor`](QuickJSContext.md#constructors)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:233](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L233)

## Properties

### runtime

> **runtime**: [`QuickJSAsyncRuntime`](QuickJSAsyncRuntime.md)

The runtime that created this context.

#### Overrides

[`quickjs-emscripten-core.QuickJSContext.runtime`](QuickJSContext.md#runtime)

#### Source

[packages/quickjs-emscripten-core/src/context-asyncify.ts:31](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context-asyncify.ts#L31)

## Accessors

### alive

> **`get`** **alive**(): `boolean`

#### Returns

`boolean`

true if the object is alive

false after the object has been [dispose](QuickJSAsyncContext.md#dispose-1)d

#### Source

[packages/quickjs-emscripten-core/src/context.ts:264](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L264)

***

### false

> **`get`** **false**(): [`QuickJSHandle`](../exports.md#quickjshandle)

[`false`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/false).

#### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:322](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L322)

***

### global

> **`get`** **global**(): [`QuickJSHandle`](../exports.md#quickjshandle)

[`global`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects).
A handle to the global object inside the interpreter.
You can set properties to create global variables.

#### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:337](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L337)

***

### null

> **`get`** **null**(): [`QuickJSHandle`](../exports.md#quickjshandle)

[`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null).

#### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:296](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L296)

***

### true

> **`get`** **true**(): [`QuickJSHandle`](../exports.md#quickjshandle)

[`true`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/true).

#### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:309](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L309)

***

### undefined

> **`get`** **undefined**(): [`QuickJSHandle`](../exports.md#quickjshandle)

[`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined).

#### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:283](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L283)

## Methods

### `[dispose]`()

> **[dispose]**(): `void`

Just calls the standard .dispose() method of this class.

#### Returns

`void`

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.[dispose]`](QuickJSContext.md#dispose)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:47](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L47)

***

### callFunction()

#### callFunction(func, thisVal, args)

> **callFunction**(`func`, `thisVal`, `args`?): `QuickJSContextResult`\<[`QuickJSHandle`](../exports.md#quickjshandle)\>

[`func.call(thisVal, ...args)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) or
[`func.apply(thisVal, args)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply).
Call a JSValue as a function.

See [unwrapResult](QuickJSAsyncContext.md#unwrapresult), which will throw if the function returned an error, or
return the result handle directly. If evaluation returned a handle containing
a promise, use [resolvePromise](QuickJSAsyncContext.md#resolvepromise) to convert it to a native promise and
[runtime](QuickJSAsyncContext.md#runtime).[QuickJSRuntime#executePendingJobs](QuickJSRuntime.md#executependingjobs) to finish evaluating the promise.

##### Parameters

• **func**: [`QuickJSHandle`](../exports.md#quickjshandle)

• **thisVal**: [`QuickJSHandle`](../exports.md#quickjshandle)

• **args?**: [`QuickJSHandle`](../exports.md#quickjshandle)[]

##### Returns

`QuickJSContextResult`\<[`QuickJSHandle`](../exports.md#quickjshandle)\>

A result. If the function threw synchronously, `result.error` be a
handle to the exception. Otherwise `result.value` will be a handle to the
value.

Example:

```typescript
using parseIntHandle = context.getProp(global, "parseInt")
using stringHandle = context.newString("42")
using resultHandle = context.callFunction(parseIntHandle, context.undefined, stringHandle).unwrap()
console.log(context.dump(resultHandle)) // 42
```

##### Inherited from

[`quickjs-emscripten-core.QuickJSContext.callFunction`](QuickJSContext.md#callfunction)

##### Source

[packages/quickjs-emscripten-core/src/context.ts:1180](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1180)

#### callFunction(func, thisVal, args)

> **callFunction**(`func`, `thisVal`, ...`args`): `QuickJSContextResult`\<[`QuickJSHandle`](../exports.md#quickjshandle)\>

##### Parameters

• **func**: [`QuickJSHandle`](../exports.md#quickjshandle)

• **thisVal**: [`QuickJSHandle`](../exports.md#quickjshandle)

• ...**args**: [`QuickJSHandle`](../exports.md#quickjshandle)[]

##### Returns

`QuickJSContextResult`\<[`QuickJSHandle`](../exports.md#quickjshandle)\>

##### Inherited from

[`quickjs-emscripten-core.QuickJSContext.callFunction`](QuickJSContext.md#callfunction)

##### Source

[packages/quickjs-emscripten-core/src/context.ts:1185](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1185)

***

### callMethod()

> **callMethod**(`thisHandle`, `key`, `args`): `QuickJSContextResult`\<[`QuickJSHandle`](../exports.md#quickjshandle)\>

`handle[key](...args)`

Call a method on a JSValue. This is a convenience method that calls [getProp](QuickJSAsyncContext.md#getprop) and [callFunction](QuickJSAsyncContext.md#callfunction).

#### Parameters

• **thisHandle**: [`QuickJSHandle`](../exports.md#quickjshandle)

• **key**: [`QuickJSPropertyKey`](../exports.md#quickjspropertykey)

• **args**: [`QuickJSHandle`](../exports.md#quickjshandle)[]= `[]`

#### Returns

`QuickJSContextResult`\<[`QuickJSHandle`](../exports.md#quickjshandle)\>

A result. If the function threw synchronously, `result.error` be a
handle to the exception. Otherwise `result.value` will be a handle to the
value.

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.callMethod`](QuickJSContext.md#callmethod)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:1234](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1234)

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

[packages/quickjs-emscripten-core/src/context.ts:1530](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1530)

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

[packages/quickjs-emscripten-core/src/context.ts:1121](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1121)

***

### dispose()

> **dispose**(): `void`

Dispose of this VM's underlying resources.

#### Returns

`void`

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.dispose`](QuickJSContext.md#dispose-1)

#### Throws

Calling this method without disposing of all created handles
will result in an error.

#### Source

[packages/quickjs-emscripten-core/src/context.ts:274](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L274)

***

### dump()

> **dump**(`handle`): `any`

Dump a JSValue to Javascript in a best-effort fashion.
If the value is a promise, dumps the promise's state.
Returns `handle.toString()` if it cannot be serialized to JSON.

#### Parameters

• **handle**: [`QuickJSHandle`](../exports.md#quickjshandle)

#### Returns

`any`

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.dump`](QuickJSContext.md#dump)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:1355](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1355)

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

[packages/quickjs-emscripten-core/src/context.ts:1513](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1513)

***

### eq()

> **eq**(`handle`, `other`): `boolean`

`handle === other` - IsStrictlyEqual.
See [Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness).

#### Parameters

• **handle**: [`QuickJSHandle`](../exports.md#quickjshandle)

• **other**: [`QuickJSHandle`](../exports.md#quickjshandle)

#### Returns

`boolean`

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.eq`](QuickJSContext.md#eq)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:932](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L932)

***

### evalCode()

> **evalCode**(`code`, `filename`, `options`?): `QuickJSContextResult`\<[`QuickJSHandle`](../exports.md#quickjshandle)\>

Like [`eval(code)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#Description).

Evaluates `code`, as though it's in a file named `filename`, with options `options`.

- When `options.type` is `"global"`, the code is evaluated in the global
  scope of the QuickJSContext, and the return value is the result of the last
  expression.
- When `options.type` is `"module"`, the code is evaluated is a module scope.
  It may use `import` and `export` if [runtime](QuickJSAsyncContext.md#runtime).[QuickJSRuntime#setModuleLoader](QuickJSRuntime.md#setmoduleloader) was called.
  It may use top-level await if supported by the underlying QuickJS library.
  The return value is the module's exports, or a promise for the module's exports.
- When `options.type` is unset, the code is evaluated as a module if it
  contains an `import` or `export` statement, otherwise it is evaluated in
  the global scope.

When working with async code, you many need to call [runtime](QuickJSAsyncContext.md#runtime).[QuickJSRuntime#executePendingJobs](QuickJSRuntime.md#executependingjobs)
to execute callbacks pending after synchronous evaluation returns.

See [unwrapResult](QuickJSAsyncContext.md#unwrapresult), which will throw if the function returned an error, or
return the result handle directly. If evaluation returned a handle containing
a promise, use [resolvePromise](QuickJSAsyncContext.md#resolvepromise) to convert it to a native promise and
[QuickJSRuntime#executePendingJobs](QuickJSRuntime.md#executependingjobs) to finish evaluating the promise.

*Note*: to protect against infinite loops, provide an interrupt handler to
[QuickJSRuntime#setInterruptHandler](QuickJSRuntime.md#setinterrupthandler). You can use [shouldInterruptAfterDeadline](../exports.md#shouldinterruptafterdeadline) to
create a time-based deadline.

#### Parameters

• **code**: `string`

• **filename**: `string`= `"eval.js"`

• **options?**: `number` \| [`ContextEvalOptions`](../interfaces/ContextEvalOptions.md)

If no options are passed, a heuristic will be used to detect if `code` is
an ES module.

See [EvalFlags](../exports.md#evalflags) for number semantics.

#### Returns

`QuickJSContextResult`\<[`QuickJSHandle`](../exports.md#quickjshandle)\>

The last statement's value. If the code threw synchronously,
`result.error` will be a handle to the exception. If execution was
interrupted, the error will have name `InternalError` and message
`interrupted`.

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.evalCode`](QuickJSContext.md#evalcode)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:1277](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1277)

***

### evalCodeAsync()

> **evalCodeAsync**(`code`, `filename`, `options`?): `Promise`\<`QuickJSContextResult`\<[`QuickJSHandle`](../exports.md#quickjshandle)\>\>

Asyncified version of [evalCode](QuickJSAsyncContext.md#evalcode).

#### Parameters

• **code**: `string`

• **filename**: `string`= `"eval.js"`

• **options?**: `number` \| [`ContextEvalOptions`](../interfaces/ContextEvalOptions.md)

See [EvalFlags](../exports.md#evalflags) for number semantics

#### Returns

`Promise`\<`QuickJSContextResult`\<[`QuickJSHandle`](../exports.md#quickjshandle)\>\>

#### Source

[packages/quickjs-emscripten-core/src/context-asyncify.ts:44](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context-asyncify.ts#L44)

***

### fail()

> **`protected`** **fail**(`error`): [`DisposableFail`](DisposableFail.md)\<[`QuickJSHandle`](../exports.md#quickjshandle)\>

#### Parameters

• **error**: [`QuickJSHandle`](../exports.md#quickjshandle)

#### Returns

[`DisposableFail`](DisposableFail.md)\<[`QuickJSHandle`](../exports.md#quickjshandle)\>

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.fail`](QuickJSContext.md#fail)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:1539](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1539)

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

[packages/quickjs-emscripten-core/src/context.ts:811](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L811)

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

[packages/quickjs-emscripten-core/src/context.ts:802](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L802)

***

### getIterator()

> **getIterator**(`iterableHandle`): `QuickJSContextResult`\<`QuickJSIterator`\>

`handle[Symbol.iterator]()`. See [QuickJSIterator]([object Object]).
Returns a host iterator that wraps and proxies calls to a guest iterator handle.
Each step of the iteration returns a result, either an error or a handle to the next value.
Once the iterator is done, the handle is automatically disposed, and the iterator
is considered done if the handle is disposed.

```typescript
for (using entriesHandle of context.getIterator(mapHandle).unwrap()) {
  using keyHandle = context.getProp(entriesHandle, 0)
  using valueHandle = context.getProp(entriesHandle, 1)
  console.log(context.dump(keyHandle), '->', context.dump(valueHandle))
}
```

#### Parameters

• **iterableHandle**: [`QuickJSHandle`](../exports.md#quickjshandle)

#### Returns

`QuickJSContextResult`\<`QuickJSIterator`\>

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.getIterator`](QuickJSContext.md#getiterator)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:1081](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1081)

***

### getLength()

> **getLength**(`handle`): `undefined` \| `number`

`handle.length` as a host number.

Example use:
```typescript
const length = context.getLength(arrayHandle) ?? 0
for (let i = 0; i < length; i++) {
  using value = context.getProp(arrayHandle, i)
  console.log(`array[${i}] =`, context.dump(value))
}
```

#### Parameters

• **handle**: [`QuickJSHandle`](../exports.md#quickjshandle)

#### Returns

`undefined` \| `number`

a number if the handle has a numeric length property, otherwise `undefined`.

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.getLength`](QuickJSContext.md#getlength)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:991](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L991)

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

[packages/quickjs-emscripten-core/src/context.ts:773](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L773)

***

### getOwnPropertyNames()

> **getOwnPropertyNames**(`handle`, `options`): `QuickJSContextResult`\<[`DisposableArray`](../exports.md#disposablearrayt)\<[`QuickJSHandle`](../exports.md#quickjshandle)\>\>

`Object.getOwnPropertyNames(handle)`.
Similar to the [standard semantics](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames),
but with extra, non-standard options for:

- fetching array indexes as numbers (`numbers: true`)
- including symbols (`symbols: true`)
- only iterating over enumerable properties (`onlyEnumerable: true`)

The default behavior is to emulate the standard:
```typescript
context.getOwnPropertyNames(handle, { strings: true, numbersAsStrings: true })
```

Note when passing an explicit options object, you must set at least one
option, and `strings` are not included unless specified.

Example use:
```typescript
for (using prop of context.getOwnPropertyNames(objectHandle).unwrap()) {
  using value = context.getProp(handle, prop)
  console.log(context.dump(prop), '->', context.dump(value))
}
```

#### Parameters

• **handle**: [`QuickJSHandle`](../exports.md#quickjshandle)

• **options**: `GetOwnPropertyNamesOptions`= `undefined`

#### Returns

`QuickJSContextResult`\<[`DisposableArray`](../exports.md#disposablearrayt)\<[`QuickJSHandle`](../exports.md#quickjshandle)\>\>

an an array of handles of the property names. The array itself is disposable for your convenience.

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.getOwnPropertyNames`](QuickJSContext.md#getownpropertynames)

#### Throws

QuickJSEmptyGetOwnPropertyNames if no options are set.

#### Source

[packages/quickjs-emscripten-core/src/context.ts:1028](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1028)

***

### getPromiseState()

> **getPromiseState**(`handle`): [`JSPromiseState`](../exports.md#jspromisestate)

Get the current state of a QuickJS promise, see [JSPromiseState](../exports.md#jspromisestate) for the possible states.
This can be used to expect a promise to be fulfilled when combined with [unwrapResult](QuickJSAsyncContext.md#unwrapresult):

```typescript
const promiseHandle = context.evalCode(`Promise.resolve(42)`);
const resultHandle = context.unwrapResult(
 context.getPromiseState(promiseHandle)
);
context.getNumber(resultHandle) === 42; // true
resultHandle.dispose();
```

#### Parameters

• **handle**: [`QuickJSHandle`](../exports.md#quickjshandle)

#### Returns

[`JSPromiseState`](../exports.md#jspromisestate)

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.getPromiseState`](QuickJSContext.md#getpromisestate)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:836](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L836)

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

[packages/quickjs-emscripten-core/src/context.ts:961](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L961)

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

[packages/quickjs-emscripten-core/src/context.ts:781](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L781)

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

[packages/quickjs-emscripten-core/src/context.ts:790](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L790)

***

### getWellKnownSymbol()

> **getWellKnownSymbol**(`name`): [`QuickJSHandle`](../exports.md#quickjshandle)

Access a well-known symbol that is a property of the global Symbol object, like `Symbol.iterator`.

#### Parameters

• **name**: `string`

#### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.getWellKnownSymbol`](QuickJSContext.md#getwellknownsymbol)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:397](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L397)

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

[packages/quickjs-emscripten-core/src/context.ts:439](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L439)

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

[packages/quickjs-emscripten-core/src/context.ts:447](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L447)

***

### newAsyncifiedFunction()

> **newAsyncifiedFunction**(`name`, `fn`): [`QuickJSHandle`](../exports.md#quickjshandle)

Similar to [newFunction](QuickJSAsyncContext.md#newfunction).
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

[packages/quickjs-emscripten-core/src/context-asyncify.ts:91](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context-asyncify.ts#L91)

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

[packages/quickjs-emscripten-core/src/context.ts:405](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L405)

***

### newConstructorFunction()

#### newConstructorFunction(fn)

> **newConstructorFunction**(`fn`): [`QuickJSHandle`](../exports.md#quickjshandle)

Convert a Javascript function into a QuickJS constructor function.
See [newFunction](QuickJSAsyncContext.md#newfunction) for more details.

##### Parameters

• **fn**: [`VmFunctionImplementation`](../exports.md#vmfunctionimplementationvmhandle)\<[`QuickJSHandle`](../exports.md#quickjshandle)\>

##### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

##### Inherited from

[`quickjs-emscripten-core.QuickJSContext.newConstructorFunction`](QuickJSContext.md#newconstructorfunction)

##### Source

[packages/quickjs-emscripten-core/src/context.ts:635](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L635)

#### newConstructorFunction(name, fn)

> **newConstructorFunction**(`name`, `fn`): [`QuickJSHandle`](../exports.md#quickjshandle)

##### Parameters

• **name**: `undefined` \| `string`

• **fn**: [`VmFunctionImplementation`](../exports.md#vmfunctionimplementationvmhandle)\<[`QuickJSHandle`](../exports.md#quickjshandle)\>

##### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

##### Inherited from

[`quickjs-emscripten-core.QuickJSContext.newConstructorFunction`](QuickJSContext.md#newconstructorfunction)

##### Source

[packages/quickjs-emscripten-core/src/context.ts:636](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L636)

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

[packages/quickjs-emscripten-core/src/context.ts:679](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L679)

#### newError(message)

> **newError**(`message`): [`QuickJSHandle`](../exports.md#quickjshandle)

##### Parameters

• **message**: `string`

##### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

##### Inherited from

[`quickjs-emscripten-core.QuickJSContext.newError`](QuickJSContext.md#newerror)

##### Source

[packages/quickjs-emscripten-core/src/context.ts:680](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L680)

#### newError(undefined)

> **newError**(): [`QuickJSHandle`](../exports.md#quickjshandle)

##### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

##### Inherited from

[`quickjs-emscripten-core.QuickJSContext.newError`](QuickJSContext.md#newerror)

##### Source

[packages/quickjs-emscripten-core/src/context.ts:681](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L681)

***

### newFunction()

#### newFunction(fn)

> **newFunction**(`fn`): [`QuickJSHandle`](../exports.md#quickjshandle)

Convert a Javascript function into a QuickJS function value.
See [VmFunctionImplementation](../exports.md#vmfunctionimplementationvmhandle) for more details.

A [VmFunctionImplementation](../exports.md#vmfunctionimplementationvmhandle) should not free its arguments or its return
value. A VmFunctionImplementation should also not retain any references to
its return value.

For constructors (functions that will be called with `new ...`), use [newConstructorFunction](QuickJSAsyncContext.md#newconstructorfunction).

The function argument handles are automatically disposed when the function
returns. If you want to retain a handle beyond the end of the function, you
can call [Lifetime#dup](Lifetime.md#dup) to create a copy of the handle that you own
and must dispose manually. For example, you need to use this API and do some
extra book keeping to implement `setInterval`:

```typescript
// This won't work because `callbackHandle` expires when the function returns,
// so when the interval fires, the callback handle is already disposed.
const WRONG_setIntervalHandle = context.newFunction("setInterval", (callbackHandle, delayHandle) => {
  const delayMs = context.getNumber(delayHandle)
  const intervalId = globalThis.setInterval(() => {
    // ERROR: callbackHandle is already disposed here.
    context.callFunction(callbackHandle)
  }, intervalId)
  return context.newNumber(intervalId)
})

// This works since we dup the callbackHandle.
// We just need to make sure we clean it up manually when the interval is cleared --
// so we need to keep track of those interval IDs, and make sure we clean all
// of them up when we dispose the owning context.

const setIntervalHandle = context.newFunction("setInterval", (callbackHandle, delayHandle) => {
  // Ensure the guest can't overload us by scheduling too many intervals.
  if (QuickJSInterval.INTERVALS.size > 100) {
    throw new Error(`Too many intervals scheduled already`)
  }

  const delayMs = context.getNumber(delayHandle)
  const longLivedCallbackHandle = callbackHandle.dup()
  const intervalId = globalThis.setInterval(() => {
    context.callFunction(longLivedCallbackHandle)
  }, intervalId)
  const disposable = new QuickJSInterval(longLivedCallbackHandle, context, intervalId)
  QuickJSInterval.INTERVALS.set(intervalId, disposable)
  return context.newNumber(intervalId)
})

const clearIntervalHandle = context.newFunction("clearInterval", (intervalIdHandle) => {
  const intervalId = context.getNumber(intervalIdHandle)
  const disposable = QuickJSInterval.INTERVALS.get(intervalId)
  disposable?.dispose()
})

class QuickJSInterval extends UsingDisposable {
  static INTERVALS = new Map<number, QuickJSInterval>()

  static disposeContext(context: QuickJSContext) {
    for (const interval of QuickJSInterval.INTERVALS.values()) {
      if (interval.context === context) {
        interval.dispose()
      }
    }
  }

  constructor(
    public fnHandle: QuickJSHandle,
    public context: QuickJSContext,
    public intervalId: number,
  ) {
    super()
  }

  dispose() {
    globalThis.clearInterval(this.intervalId)
    this.fnHandle.dispose()
    QuickJSInterval.INTERVALS.delete(this.fnHandle.value)
  }

  get alive() {
    return this.fnHandle.alive
  }
}
```

To implement an async function, create a promise with [newPromise](QuickJSAsyncContext.md#newpromise), then
return the deferred promise handle from `deferred.handle` from your
function implementation:

```typescript
const deferred = vm.newPromise()
someNativeAsyncFunction().then(deferred.resolve)
return deferred.handle
```

##### Parameters

• **fn**: [`VmFunctionImplementation`](../exports.md#vmfunctionimplementationvmhandle)\<[`QuickJSHandle`](../exports.md#quickjshandle)\>

##### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

##### Inherited from

[`quickjs-emscripten-core.QuickJSContext.newFunction`](QuickJSContext.md#newfunction)

##### Source

[packages/quickjs-emscripten-core/src/context.ts:612](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L612)

#### newFunction(name, fn)

> **newFunction**(`name`, `fn`): [`QuickJSHandle`](../exports.md#quickjshandle)

##### Parameters

• **name**: `undefined` \| `string`

• **fn**: [`VmFunctionImplementation`](../exports.md#vmfunctionimplementationvmhandle)\<[`QuickJSHandle`](../exports.md#quickjshandle)\>

##### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

##### Inherited from

[`quickjs-emscripten-core.QuickJSContext.newFunction`](QuickJSContext.md#newfunction)

##### Source

[packages/quickjs-emscripten-core/src/context.ts:613](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L613)

***

### newFunctionWithOptions()

> **newFunctionWithOptions**(`args`): [`QuickJSHandle`](../exports.md#quickjshandle)

Lower-level API for creating functions.
See [newFunction](QuickJSAsyncContext.md#newfunction) for more details on how to use functions.

#### Parameters

• **args**: `Object`

• **args\.fn**: [`VmFunctionImplementation`](../exports.md#vmfunctionimplementationvmhandle)\<[`QuickJSHandle`](../exports.md#quickjshandle)\>

• **args\.isConstructor**: `boolean`

• **args\.length**: `number`

• **args\.name**: `undefined` \| `string`

#### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.newFunctionWithOptions`](QuickJSContext.md#newfunctionwithoptions)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:661](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L661)

***

### newHostRef()

> **newHostRef**\<`T`\>(`value`): `HostRef`\<`T`\>

Create an opaque handle object that stores a reference to a host JavaScript object.

The guest cannot access the host object directly, but you may use
getHostRef to convert a HostRef handle back into a HostRef`<T>`  from
inside a function implementation.

You must call [HostRef#dispose]([object Object]) or otherwise consume the [HostRef#handle]([object Object]) to ensure the handle is not leaked.

#### Type parameters

• **T** extends `object`

#### Parameters

• **value**: `T`

#### Returns

`HostRef`\<`T`\>

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.newHostRef`](QuickJSContext.md#newhostref)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:716](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L716)

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

[packages/quickjs-emscripten-core/src/context.ts:356](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L356)

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

[packages/quickjs-emscripten-core/src/context.ts:425](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L425)

***

### newPromise()

#### newPromise(undefined)

> **newPromise**(): [`QuickJSDeferredPromise`](QuickJSDeferredPromise.md)

Create a new [QuickJSDeferredPromise](QuickJSDeferredPromise.md). Use `deferred.resolve(handle)` and
`deferred.reject(handle)` to fulfill the promise handle available at `deferred.handle`.
Note that you are responsible for calling `deferred.dispose()` to free the underlying
resources; see the documentation on [QuickJSDeferredPromise](QuickJSDeferredPromise.md) for details.

##### Returns

[`QuickJSDeferredPromise`](QuickJSDeferredPromise.md)

##### Inherited from

[`quickjs-emscripten-core.QuickJSContext.newPromise`](QuickJSContext.md#newpromise)

##### Source

[packages/quickjs-emscripten-core/src/context.ts:460](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L460)

#### newPromise(promise)

> **newPromise**(`promise`): [`QuickJSDeferredPromise`](QuickJSDeferredPromise.md)

Create a new [QuickJSDeferredPromise](QuickJSDeferredPromise.md) that resolves when the
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

[packages/quickjs-emscripten-core/src/context.ts:468](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L468)

#### newPromise(newPromiseFn)

> **newPromise**(`newPromiseFn`): [`QuickJSDeferredPromise`](QuickJSDeferredPromise.md)

Construct a new native Promise`<QuickJSHandle>` , and then convert it into a
[QuickJSDeferredPromise](QuickJSDeferredPromise.md).

You can still resolve/reject the created promise "early" using its methods.

##### Parameters

• **newPromiseFn**: [`PromiseExecutor`](../exports.md#promiseexecutorresolvet-rejectt)\<[`QuickJSHandle`](../exports.md#quickjshandle), `Error` \| [`QuickJSHandle`](../exports.md#quickjshandle)\>

##### Returns

[`QuickJSDeferredPromise`](QuickJSDeferredPromise.md)

##### Inherited from

[`quickjs-emscripten-core.QuickJSContext.newPromise`](QuickJSContext.md#newpromise)

##### Source

[packages/quickjs-emscripten-core/src/context.ts:475](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L475)

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

[packages/quickjs-emscripten-core/src/context.ts:363](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L363)

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

[packages/quickjs-emscripten-core/src/context.ts:386](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L386)

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

[packages/quickjs-emscripten-core/src/context.ts:374](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L374)

***

### resolvePromise()

> **resolvePromise**(`promiseLikeHandle`): `Promise`\<`QuickJSContextResult`\<[`QuickJSHandle`](../exports.md#quickjshandle)\>\>

`Promise.resolve(value)`.
Convert a handle containing a Promise-like value inside the VM into an
actual promise on the host.

#### Parameters

• **promiseLikeHandle**: [`QuickJSHandle`](../exports.md#quickjshandle)

A handle to a Promise-like value with a `.then(onSuccess, onError)` method.

#### Returns

`Promise`\<`QuickJSContextResult`\<[`QuickJSHandle`](../exports.md#quickjshandle)\>\>

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.resolvePromise`](QuickJSContext.md#resolvepromise)

#### Remarks

You may need to call [runtime](QuickJSAsyncContext.md#runtime).[QuickJSRuntime#executePendingJobs](QuickJSRuntime.md#executependingjobs) to ensure that the promise is resolved.

#### Source

[packages/quickjs-emscripten-core/src/context.ts:875](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L875)

***

### sameValue()

> **sameValue**(`handle`, `other`): `boolean`

`Object.is(a, b)`
See [Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness).

#### Parameters

• **handle**: [`QuickJSHandle`](../exports.md#quickjshandle)

• **other**: [`QuickJSHandle`](../exports.md#quickjshandle)

#### Returns

`boolean`

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.sameValue`](QuickJSContext.md#samevalue)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:940](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L940)

***

### sameValueZero()

> **sameValueZero**(`handle`, `other`): `boolean`

SameValueZero comparison.
See [Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness).

#### Parameters

• **handle**: [`QuickJSHandle`](../exports.md#quickjshandle)

• **other**: [`QuickJSHandle`](../exports.md#quickjshandle)

#### Returns

`boolean`

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.sameValueZero`](QuickJSContext.md#samevaluezero)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:948](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L948)

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

Note that the QuickJS authors recommend using [defineProp](QuickJSAsyncContext.md#defineprop) to define new
properties.

#### Source

[packages/quickjs-emscripten-core/src/context.ts:1106](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1106)

***

### success()

> **`protected`** **success**\<`S`\>(`value`): [`DisposableSuccess`](DisposableSuccess.md)\<`S`\>

#### Type parameters

• **S**

#### Parameters

• **value**: `S`

#### Returns

[`DisposableSuccess`](DisposableSuccess.md)\<`S`\>

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.success`](QuickJSContext.md#success)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:1535](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1535)

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

[packages/quickjs-emscripten-core/src/context.ts:1314](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1314)

***

### toHostRef()

> **toHostRef**\<`T`\>(`handle`): `undefined` \| `HostRef`\<`T`\>

If `handle` is a `HostRef<T>.handle`, return a new `HostRef<T>` instance wrapping the handle.

You must call [HostRef#dispose]([object Object]) or otherwise consume the [HostRef#handle]([object Object]) to ensure the handle is not leaked.

#### Type parameters

• **T** extends `object`

#### Parameters

• **handle**: [`QuickJSHandle`](../exports.md#quickjshandle)

#### Returns

`undefined` \| `HostRef`\<`T`\>

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.toHostRef`](QuickJSContext.md#tohostref)

#### Source

[packages/quickjs-emscripten-core/src/context.ts:732](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L732)

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

[packages/quickjs-emscripten-core/src/context.ts:764](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L764)

***

### unwrapHostRef()

> **unwrapHostRef**\<`T`\>(`handle`): `T`

If `handle` is a `HostRef<T>.handle`, return the host value `T`.

#### Type parameters

• **T** extends `object`

#### Parameters

• **handle**: [`QuickJSHandle`](../exports.md#quickjshandle)

#### Returns

`T`

#### Inherited from

[`quickjs-emscripten-core.QuickJSContext.unwrapHostRef`](QuickJSContext.md#unwraphostref)

#### Throws

QuickJSHostRefInvalid if `handle` is not a `HostRef<T>.handle`

#### Source

[packages/quickjs-emscripten-core/src/context.ts:747](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L747)

***

### unwrapResult()

> **unwrapResult**\<`T`\>(`result`): `T`

Unwrap a SuccessOrFail result such as a [VmCallResult](../exports.md#vmcallresultvmhandle) or a
[ExecutePendingJobsResult](../exports.md#executependingjobsresult), where the fail branch contains a handle to a QuickJS error value.
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

[packages/quickjs-emscripten-core/src/context.ts:1398](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1398)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
