[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../README.md) / QuickJSAsyncContext

# Class: QuickJSAsyncContext

Defined in: [packages/quickjs-emscripten-core/src/context-asyncify.ts:30](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context-asyncify.ts#L30)

Asyncified version of [QuickJSContext](QuickJSContext.md).

*Asyncify* allows normally synchronous code to wait for asynchronous Promises
or callbacks. The asyncified version of QuickJSContext can wait for async
host functions as though they were synchronous.

## Extends

- [`QuickJSContext`](QuickJSContext.md)

## Constructors

### Constructor

> **new QuickJSAsyncContext**(`args`): `QuickJSAsyncContext`

Defined in: [packages/quickjs-emscripten-core/src/context.ts:233](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L233)

Use [QuickJSRuntime#newContext](QuickJSRuntime.md#newcontext) or [QuickJSWASMModule#newContext](QuickJSWASMModule.md#newcontext)
to create a new QuickJSContext.

#### Parameters

##### args

###### callbacks

`QuickJSModuleCallbacks`

###### ctx

[`Lifetime`](Lifetime.md)\<[`JSContextPointer`](../README.md#jscontextpointer)\>

###### ffi

[`EitherFFI`](../README.md#eitherffi)

###### module

[`EitherModule`](../README.md#eithermodule)

###### ownedLifetimes?

[`Disposable`](../interfaces/Disposable.md)[]

###### rt

[`Lifetime`](Lifetime.md)\<[`JSRuntimePointer`](../README.md#jsruntimepointer)\>

###### runtime

[`QuickJSRuntime`](QuickJSRuntime.md)

#### Returns

`QuickJSAsyncContext`

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`constructor`](QuickJSContext.md#constructor)

## Properties

### runtime

> **runtime**: [`QuickJSAsyncRuntime`](QuickJSAsyncRuntime.md)

Defined in: [packages/quickjs-emscripten-core/src/context-asyncify.ts:31](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context-asyncify.ts#L31)

The runtime that created this context.

#### Overrides

[`QuickJSContext`](QuickJSContext.md).[`runtime`](QuickJSContext.md#runtime)

## Accessors

### alive

#### Get Signature

> **get** **alive**(): `boolean`

Defined in: [packages/quickjs-emscripten-core/src/context.ts:264](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L264)

##### Returns

`boolean`

true if the object is alive

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`alive`](QuickJSContext.md#alive)

***

### false

#### Get Signature

> **get** **false**(): [`QuickJSHandle`](../README.md#quickjshandle)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:322](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L322)

[`false`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/false).

##### Returns

[`QuickJSHandle`](../README.md#quickjshandle)

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`false`](QuickJSContext.md#false)

***

### global

#### Get Signature

> **get** **global**(): [`QuickJSHandle`](../README.md#quickjshandle)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:337](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L337)

[`global`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects).
A handle to the global object inside the interpreter.
You can set properties to create global variables.

##### Returns

[`QuickJSHandle`](../README.md#quickjshandle)

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`global`](QuickJSContext.md#global)

***

### null

#### Get Signature

> **get** **null**(): [`QuickJSHandle`](../README.md#quickjshandle)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:296](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L296)

[`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null).

##### Returns

[`QuickJSHandle`](../README.md#quickjshandle)

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`null`](QuickJSContext.md#null)

***

### true

#### Get Signature

> **get** **true**(): [`QuickJSHandle`](../README.md#quickjshandle)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:309](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L309)

[`true`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/true).

##### Returns

[`QuickJSHandle`](../README.md#quickjshandle)

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`true`](QuickJSContext.md#true)

***

### undefined

#### Get Signature

> **get** **undefined**(): [`QuickJSHandle`](../README.md#quickjshandle)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:283](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L283)

[`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined).

##### Returns

[`QuickJSHandle`](../README.md#quickjshandle)

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`undefined`](QuickJSContext.md#undefined)

## Methods

### \[dispose\]()

> **\[dispose\]**(): `void`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:47](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L47)

Just calls the standard .dispose() method of this class.

#### Returns

`void`

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`[dispose]`](QuickJSContext.md#dispose)

***

### callFunction()

#### Call Signature

> **callFunction**(`func`, `thisVal`, `args?`): `QuickJSContextResult`\<[`QuickJSHandle`](../README.md#quickjshandle)\>

Defined in: [packages/quickjs-emscripten-core/src/context.ts:1180](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1180)

[`func.call(thisVal, ...args)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) or
[`func.apply(thisVal, args)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply).
Call a JSValue as a function.

See [unwrapResult](QuickJSContext.md#unwrapresult), which will throw if the function returned an error, or
return the result handle directly. If evaluation returned a handle containing
a promise, use [resolvePromise](QuickJSContext.md#resolvepromise) to convert it to a native promise and
[runtime](QuickJSContext.md#runtime).[QuickJSRuntime#executePendingJobs](QuickJSRuntime.md#executependingjobs) to finish evaluating the promise.

##### Parameters

###### func

[`QuickJSHandle`](../README.md#quickjshandle)

###### thisVal

[`QuickJSHandle`](../README.md#quickjshandle)

###### args?

[`QuickJSHandle`](../README.md#quickjshandle)[]

##### Returns

`QuickJSContextResult`\<[`QuickJSHandle`](../README.md#quickjshandle)\>

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

[`QuickJSContext`](QuickJSContext.md).[`callFunction`](QuickJSContext.md#callfunction)

#### Call Signature

> **callFunction**(`func`, `thisVal`, ...`args`): `QuickJSContextResult`\<[`QuickJSHandle`](../README.md#quickjshandle)\>

Defined in: [packages/quickjs-emscripten-core/src/context.ts:1185](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1185)

[`func.call(thisVal, ...args)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) or
[`func.apply(thisVal, args)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply).
Call a JSValue as a function.

See [unwrapResult](QuickJSContext.md#unwrapresult), which will throw if the function returned an error, or
return the result handle directly. If evaluation returned a handle containing
a promise, use [resolvePromise](QuickJSContext.md#resolvepromise) to convert it to a native promise and
[runtime](QuickJSContext.md#runtime).[QuickJSRuntime#executePendingJobs](QuickJSRuntime.md#executependingjobs) to finish evaluating the promise.

##### Parameters

###### func

[`QuickJSHandle`](../README.md#quickjshandle)

###### thisVal

[`QuickJSHandle`](../README.md#quickjshandle)

###### args

...[`QuickJSHandle`](../README.md#quickjshandle)[]

##### Returns

`QuickJSContextResult`\<[`QuickJSHandle`](../README.md#quickjshandle)\>

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

[`QuickJSContext`](QuickJSContext.md).[`callFunction`](QuickJSContext.md#callfunction)

***

### callMethod()

> **callMethod**(`thisHandle`, `key`, `args?`): `QuickJSContextResult`\<[`QuickJSHandle`](../README.md#quickjshandle)\>

Defined in: [packages/quickjs-emscripten-core/src/context.ts:1234](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1234)

`handle[key](...args)`

Call a method on a JSValue. This is a convenience method that calls [getProp](QuickJSContext.md#getprop) and [callFunction](QuickJSContext.md#callfunction).

#### Parameters

##### thisHandle

[`QuickJSHandle`](../README.md#quickjshandle)

##### key

[`QuickJSPropertyKey`](../README.md#quickjspropertykey)

##### args?

[`QuickJSHandle`](../README.md#quickjshandle)[] = `[]`

#### Returns

`QuickJSContextResult`\<[`QuickJSHandle`](../README.md#quickjshandle)\>

A result. If the function threw synchronously, `result.error` be a
handle to the exception. Otherwise `result.value` will be a handle to the
value.

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`callMethod`](QuickJSContext.md#callmethod)

***

### decodeBinaryJSON()

> **decodeBinaryJSON**(`handle`): [`QuickJSHandle`](../README.md#quickjshandle)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:1530](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1530)

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

##### handle

[`QuickJSHandle`](../README.md#quickjshandle)

#### Returns

[`QuickJSHandle`](../README.md#quickjshandle)

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`decodeBinaryJSON`](QuickJSContext.md#decodebinaryjson)

***

### defineProp()

> **defineProp**(`handle`, `key`, `descriptor`): `void`

Defined in: [packages/quickjs-emscripten-core/src/context.ts:1121](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1121)

[`Object.defineProperty(handle, key, descriptor)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).

#### Parameters

##### handle

[`QuickJSHandle`](../README.md#quickjshandle)

##### key

[`QuickJSPropertyKey`](../README.md#quickjspropertykey)

The property may be specified as a JSValue handle, or as a
Javascript string or number (which will be converted automatically to a JSValue).

##### descriptor

[`VmPropertyDescriptor`](../interfaces/VmPropertyDescriptor.md)\<[`QuickJSHandle`](../README.md#quickjshandle)\>

#### Returns

`void`

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`defineProp`](QuickJSContext.md#defineprop)

***

### dispose()

> **dispose**(): `void`

Defined in: [packages/quickjs-emscripten-core/src/context.ts:274](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L274)

Dispose of this VM's underlying resources.

#### Returns

`void`

#### Throws

Calling this method without disposing of all created handles
will result in an error.

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`dispose`](QuickJSContext.md#dispose-1)

***

### dump()

> **dump**(`handle`): `any`

Defined in: [packages/quickjs-emscripten-core/src/context.ts:1355](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1355)

Dump a JSValue to Javascript in a best-effort fashion.
If the value is a promise, dumps the promise's state.
Returns `handle.toString()` if it cannot be serialized to JSON.

#### Parameters

##### handle

[`QuickJSHandle`](../README.md#quickjshandle)

#### Returns

`any`

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`dump`](QuickJSContext.md#dump)

***

### encodeBinaryJSON()

> **encodeBinaryJSON**(`handle`): [`QuickJSHandle`](../README.md#quickjshandle)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:1513](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1513)

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

##### handle

[`QuickJSHandle`](../README.md#quickjshandle)

#### Returns

[`QuickJSHandle`](../README.md#quickjshandle)

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`encodeBinaryJSON`](QuickJSContext.md#encodebinaryjson)

***

### eq()

> **eq**(`handle`, `other`): `boolean`

Defined in: [packages/quickjs-emscripten-core/src/context.ts:932](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L932)

`handle === other` - IsStrictlyEqual.
See [Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness).

#### Parameters

##### handle

[`QuickJSHandle`](../README.md#quickjshandle)

##### other

[`QuickJSHandle`](../README.md#quickjshandle)

#### Returns

`boolean`

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`eq`](QuickJSContext.md#eq)

***

### evalCode()

> **evalCode**(`code`, `filename?`, `options?`): `QuickJSContextResult`\<[`QuickJSHandle`](../README.md#quickjshandle)\>

Defined in: [packages/quickjs-emscripten-core/src/context.ts:1277](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1277)

Like [`eval(code)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#Description).

Evaluates `code`, as though it's in a file named `filename`, with options `options`.

- When `options.type` is `"global"`, the code is evaluated in the global
  scope of the QuickJSContext, and the return value is the result of the last
  expression.
- When `options.type` is `"module"`, the code is evaluated is a module scope.
  It may use `import` and `export` if [runtime](QuickJSContext.md#runtime).[QuickJSRuntime#setModuleLoader](QuickJSRuntime.md#setmoduleloader) was called.
  It may use top-level await if supported by the underlying QuickJS library.
  The return value is the module's exports, or a promise for the module's exports.
- When `options.type` is unset, the code is evaluated as a module if it
  contains an `import` or `export` statement, otherwise it is evaluated in
  the global scope.

When working with async code, you many need to call [runtime](QuickJSContext.md#runtime).[QuickJSRuntime#executePendingJobs](QuickJSRuntime.md#executependingjobs)
to execute callbacks pending after synchronous evaluation returns.

See [unwrapResult](QuickJSContext.md#unwrapresult), which will throw if the function returned an error, or
return the result handle directly. If evaluation returned a handle containing
a promise, use [resolvePromise](QuickJSContext.md#resolvepromise) to convert it to a native promise and
[QuickJSRuntime#executePendingJobs](QuickJSRuntime.md#executependingjobs) to finish evaluating the promise.

*Note*: to protect against infinite loops, provide an interrupt handler to
[QuickJSRuntime#setInterruptHandler](QuickJSRuntime.md#setinterrupthandler). You can use [shouldInterruptAfterDeadline](../README.md#shouldinterruptafterdeadline) to
create a time-based deadline.

#### Parameters

##### code

`string`

##### filename?

`string` = `"eval.js"`

##### options?

If no options are passed, a heuristic will be used to detect if `code` is
an ES module.

See [EvalFlags](../README.md#evalflags) for number semantics.

`number` | [`ContextEvalOptions`](../interfaces/ContextEvalOptions.md)

#### Returns

`QuickJSContextResult`\<[`QuickJSHandle`](../README.md#quickjshandle)\>

The last statement's value. If the code threw synchronously,
`result.error` will be a handle to the exception. If execution was
interrupted, the error will have name `InternalError` and message
`interrupted`.

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`evalCode`](QuickJSContext.md#evalcode)

***

### evalCodeAsync()

> **evalCodeAsync**(`code`, `filename?`, `options?`): `Promise`\<`QuickJSContextResult`\<[`QuickJSHandle`](../README.md#quickjshandle)\>\>

Defined in: [packages/quickjs-emscripten-core/src/context-asyncify.ts:44](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context-asyncify.ts#L44)

Asyncified version of [evalCode](#evalcode).

#### Parameters

##### code

`string`

##### filename?

`string` = `"eval.js"`

##### options?

See [EvalFlags](../README.md#evalflags) for number semantics

`number` | [`ContextEvalOptions`](../interfaces/ContextEvalOptions.md)

#### Returns

`Promise`\<`QuickJSContextResult`\<[`QuickJSHandle`](../README.md#quickjshandle)\>\>

***

### fail()

> `protected` **fail**(`error`): [`DisposableFail`](DisposableFail.md)\<[`QuickJSHandle`](../README.md#quickjshandle)\>

Defined in: [packages/quickjs-emscripten-core/src/context.ts:1539](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1539)

#### Parameters

##### error

[`QuickJSHandle`](../README.md#quickjshandle)

#### Returns

[`DisposableFail`](DisposableFail.md)\<[`QuickJSHandle`](../README.md#quickjshandle)\>

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`fail`](QuickJSContext.md#fail)

***

### getArrayBuffer()

> **getArrayBuffer**(`handle`): [`Lifetime`](Lifetime.md)\<`Uint8Array`\<`ArrayBufferLike`\>\>

Defined in: [packages/quickjs-emscripten-core/src/context.ts:811](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L811)

Coverts `handle` to a JavaScript ArrayBuffer

#### Parameters

##### handle

[`QuickJSHandle`](../README.md#quickjshandle)

#### Returns

[`Lifetime`](Lifetime.md)\<`Uint8Array`\<`ArrayBufferLike`\>\>

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`getArrayBuffer`](QuickJSContext.md#getarraybuffer)

***

### getBigInt()

> **getBigInt**(`handle`): `bigint`

Defined in: [packages/quickjs-emscripten-core/src/context.ts:802](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L802)

Converts `handle` to a Javascript bigint.

#### Parameters

##### handle

[`QuickJSHandle`](../README.md#quickjshandle)

#### Returns

`bigint`

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`getBigInt`](QuickJSContext.md#getbigint)

***

### getIterator()

> **getIterator**(`iterableHandle`): `QuickJSContextResult`\<`QuickJSIterator`\>

Defined in: [packages/quickjs-emscripten-core/src/context.ts:1081](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1081)

`handle[Symbol.iterator]()`. See QuickJSIterator.
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

##### iterableHandle

[`QuickJSHandle`](../README.md#quickjshandle)

#### Returns

`QuickJSContextResult`\<`QuickJSIterator`\>

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`getIterator`](QuickJSContext.md#getiterator)

***

### getLength()

> **getLength**(`handle`): `number` \| `undefined`

Defined in: [packages/quickjs-emscripten-core/src/context.ts:991](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L991)

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

##### handle

[`QuickJSHandle`](../README.md#quickjshandle)

#### Returns

`number` \| `undefined`

a number if the handle has a numeric length property, otherwise `undefined`.

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`getLength`](QuickJSContext.md#getlength)

***

### getNumber()

> **getNumber**(`handle`): `number`

Defined in: [packages/quickjs-emscripten-core/src/context.ts:773](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L773)

Converts `handle` into a Javascript number.

#### Parameters

##### handle

[`QuickJSHandle`](../README.md#quickjshandle)

#### Returns

`number`

`NaN` on error, otherwise a `number`.

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`getNumber`](QuickJSContext.md#getnumber)

***

### getOwnPropertyNames()

> **getOwnPropertyNames**(`handle`, `options?`): `QuickJSContextResult`\<[`DisposableArray`](../README.md#disposablearray)\<[`QuickJSHandle`](../README.md#quickjshandle)\>\>

Defined in: [packages/quickjs-emscripten-core/src/context.ts:1028](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1028)

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

##### handle

[`QuickJSHandle`](../README.md#quickjshandle)

##### options?

`GetOwnPropertyNamesOptions` = `...`

#### Returns

`QuickJSContextResult`\<[`DisposableArray`](../README.md#disposablearray)\<[`QuickJSHandle`](../README.md#quickjshandle)\>\>

an an array of handles of the property names. The array itself is disposable for your convenience.

#### Throws

QuickJSEmptyGetOwnPropertyNames if no options are set.

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`getOwnPropertyNames`](QuickJSContext.md#getownpropertynames)

***

### getPromiseState()

> **getPromiseState**(`handle`): [`JSPromiseState`](../README.md#jspromisestate)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:836](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L836)

Get the current state of a QuickJS promise, see [JSPromiseState](../README.md#jspromisestate) for the possible states.
This can be used to expect a promise to be fulfilled when combined with [unwrapResult](QuickJSContext.md#unwrapresult):

```typescript
const promiseHandle = context.evalCode(`Promise.resolve(42)`);
const resultHandle = context.unwrapResult(
 context.getPromiseState(promiseHandle)
);
context.getNumber(resultHandle) === 42; // true
resultHandle.dispose();
```

#### Parameters

##### handle

[`QuickJSHandle`](../README.md#quickjshandle)

#### Returns

[`JSPromiseState`](../README.md#jspromisestate)

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`getPromiseState`](QuickJSContext.md#getpromisestate)

***

### getProp()

> **getProp**(`handle`, `key`): [`QuickJSHandle`](../README.md#quickjshandle)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:961](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L961)

`handle[key]`.
Get a property from a JSValue.

#### Parameters

##### handle

[`QuickJSHandle`](../README.md#quickjshandle)

##### key

[`QuickJSPropertyKey`](../README.md#quickjspropertykey)

The property may be specified as a JSValue handle, or as a
Javascript string (which will be converted automatically).

#### Returns

[`QuickJSHandle`](../README.md#quickjshandle)

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`getProp`](QuickJSContext.md#getprop)

***

### getString()

> **getString**(`handle`): `string`

Defined in: [packages/quickjs-emscripten-core/src/context.ts:781](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L781)

Converts `handle` to a Javascript string.

#### Parameters

##### handle

[`QuickJSHandle`](../README.md#quickjshandle)

#### Returns

`string`

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`getString`](QuickJSContext.md#getstring)

***

### getSymbol()

> **getSymbol**(`handle`): `symbol`

Defined in: [packages/quickjs-emscripten-core/src/context.ts:790](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L790)

Converts `handle` into a Javascript symbol. If the symbol is in the global
registry in the guest, it will be created with Symbol.for on the host.

#### Parameters

##### handle

[`QuickJSHandle`](../README.md#quickjshandle)

#### Returns

`symbol`

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`getSymbol`](QuickJSContext.md#getsymbol)

***

### getWellKnownSymbol()

> **getWellKnownSymbol**(`name`): [`QuickJSHandle`](../README.md#quickjshandle)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:397](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L397)

Access a well-known symbol that is a property of the global Symbol object, like `Symbol.iterator`.

#### Parameters

##### name

`string`

#### Returns

[`QuickJSHandle`](../README.md#quickjshandle)

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`getWellKnownSymbol`](QuickJSContext.md#getwellknownsymbol)

***

### newArray()

> **newArray**(): [`QuickJSHandle`](../README.md#quickjshandle)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:439](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L439)

`[]`.
Create a new QuickJS [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

#### Returns

[`QuickJSHandle`](../README.md#quickjshandle)

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`newArray`](QuickJSContext.md#newarray)

***

### newArrayBuffer()

> **newArrayBuffer**(`buffer`): [`QuickJSHandle`](../README.md#quickjshandle)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:447](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L447)

Create a new QuickJS [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer).

#### Parameters

##### buffer

`ArrayBufferLike`

#### Returns

[`QuickJSHandle`](../README.md#quickjshandle)

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`newArrayBuffer`](QuickJSContext.md#newarraybuffer)

***

### newAsyncifiedFunction()

> **newAsyncifiedFunction**(`name`, `fn`): [`QuickJSHandle`](../README.md#quickjshandle)

Defined in: [packages/quickjs-emscripten-core/src/context-asyncify.ts:91](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context-asyncify.ts#L91)

Similar to [newFunction](#newfunction).
Convert an async host Javascript function into a synchronous QuickJS function value.

Whenever QuickJS calls this function, the VM's stack will be unwound while
waiting the async function to complete, and then restored when the returned
promise resolves.

Asyncified functions must never call other asyncified functions or
`import`, even indirectly, because the stack cannot be unwound twice.

See [Emscripten's docs on Asyncify](https://emscripten.org/docs/porting/asyncify.html).

#### Parameters

##### name

`string`

##### fn

[`AsyncFunctionImplementation`](../README.md#asyncfunctionimplementation)

#### Returns

[`QuickJSHandle`](../README.md#quickjshandle)

***

### newBigInt()

> **newBigInt**(`num`): [`QuickJSHandle`](../README.md#quickjshandle)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:405](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L405)

Create a QuickJS [bigint](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) value.

#### Parameters

##### num

`bigint`

#### Returns

[`QuickJSHandle`](../README.md#quickjshandle)

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`newBigInt`](QuickJSContext.md#newbigint)

***

### newConstructorFunction()

#### Call Signature

> **newConstructorFunction**(`fn`): [`QuickJSHandle`](../README.md#quickjshandle)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:635](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L635)

Convert a Javascript function into a QuickJS constructor function.
See [newFunction](QuickJSContext.md#newfunction) for more details.

##### Parameters

###### fn

[`VmFunctionImplementation`](../README.md#vmfunctionimplementation)\<[`QuickJSHandle`](../README.md#quickjshandle)\>

##### Returns

[`QuickJSHandle`](../README.md#quickjshandle)

##### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`newConstructorFunction`](QuickJSContext.md#newconstructorfunction)

#### Call Signature

> **newConstructorFunction**(`name`, `fn`): [`QuickJSHandle`](../README.md#quickjshandle)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:636](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L636)

Convert a Javascript function into a QuickJS constructor function.
See [newFunction](QuickJSContext.md#newfunction) for more details.

##### Parameters

###### name

`string` | `undefined`

###### fn

[`VmFunctionImplementation`](../README.md#vmfunctionimplementation)\<[`QuickJSHandle`](../README.md#quickjshandle)\>

##### Returns

[`QuickJSHandle`](../README.md#quickjshandle)

##### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`newConstructorFunction`](QuickJSContext.md#newconstructorfunction)

***

### newError()

#### Call Signature

> **newError**(`error`): [`QuickJSHandle`](../README.md#quickjshandle)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:679](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L679)

##### Parameters

###### error

###### message

`string`

###### name

`string`

##### Returns

[`QuickJSHandle`](../README.md#quickjshandle)

##### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`newError`](QuickJSContext.md#newerror)

#### Call Signature

> **newError**(`message`): [`QuickJSHandle`](../README.md#quickjshandle)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:680](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L680)

##### Parameters

###### message

`string`

##### Returns

[`QuickJSHandle`](../README.md#quickjshandle)

##### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`newError`](QuickJSContext.md#newerror)

#### Call Signature

> **newError**(): [`QuickJSHandle`](../README.md#quickjshandle)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:681](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L681)

##### Returns

[`QuickJSHandle`](../README.md#quickjshandle)

##### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`newError`](QuickJSContext.md#newerror)

***

### newFunction()

#### Call Signature

> **newFunction**(`fn`): [`QuickJSHandle`](../README.md#quickjshandle)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:612](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L612)

Convert a Javascript function into a QuickJS function value.
See [VmFunctionImplementation](../README.md#vmfunctionimplementation) for more details.

A [VmFunctionImplementation](../README.md#vmfunctionimplementation) should not free its arguments or its return
value. A VmFunctionImplementation should also not retain any references to
its return value.

For constructors (functions that will be called with `new ...`), use [newConstructorFunction](QuickJSContext.md#newconstructorfunction).

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

To implement an async function, create a promise with [newPromise](QuickJSContext.md#newpromise), then
return the deferred promise handle from `deferred.handle` from your
function implementation:

```typescript
const deferred = vm.newPromise()
someNativeAsyncFunction().then(deferred.resolve)
return deferred.handle
```

##### Parameters

###### fn

[`VmFunctionImplementation`](../README.md#vmfunctionimplementation)\<[`QuickJSHandle`](../README.md#quickjshandle)\>

##### Returns

[`QuickJSHandle`](../README.md#quickjshandle)

##### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`newFunction`](QuickJSContext.md#newfunction)

#### Call Signature

> **newFunction**(`name`, `fn`): [`QuickJSHandle`](../README.md#quickjshandle)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:613](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L613)

Convert a Javascript function into a QuickJS function value.
See [VmFunctionImplementation](../README.md#vmfunctionimplementation) for more details.

A [VmFunctionImplementation](../README.md#vmfunctionimplementation) should not free its arguments or its return
value. A VmFunctionImplementation should also not retain any references to
its return value.

For constructors (functions that will be called with `new ...`), use [newConstructorFunction](QuickJSContext.md#newconstructorfunction).

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

To implement an async function, create a promise with [newPromise](QuickJSContext.md#newpromise), then
return the deferred promise handle from `deferred.handle` from your
function implementation:

```typescript
const deferred = vm.newPromise()
someNativeAsyncFunction().then(deferred.resolve)
return deferred.handle
```

##### Parameters

###### name

`string` | `undefined`

###### fn

[`VmFunctionImplementation`](../README.md#vmfunctionimplementation)\<[`QuickJSHandle`](../README.md#quickjshandle)\>

##### Returns

[`QuickJSHandle`](../README.md#quickjshandle)

##### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`newFunction`](QuickJSContext.md#newfunction)

***

### newFunctionWithOptions()

> **newFunctionWithOptions**(`args`): [`QuickJSHandle`](../README.md#quickjshandle)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:661](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L661)

Lower-level API for creating functions.
See [newFunction](QuickJSContext.md#newfunction) for more details on how to use functions.

#### Parameters

##### args

###### fn

[`VmFunctionImplementation`](../README.md#vmfunctionimplementation)\<[`QuickJSHandle`](../README.md#quickjshandle)\>

###### isConstructor

`boolean`

###### length

`number`

###### name

`string` \| `undefined`

#### Returns

[`QuickJSHandle`](../README.md#quickjshandle)

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`newFunctionWithOptions`](QuickJSContext.md#newfunctionwithoptions)

***

### newHostRef()

> **newHostRef**\<`T`\>(`value`): `HostRef`\<`T`\>

Defined in: [packages/quickjs-emscripten-core/src/context.ts:716](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L716)

Create an opaque handle object that stores a reference to a host JavaScript object.

The guest cannot access the host object directly, but you may use
getHostRef to convert a HostRef handle back into a HostRef<T> from
inside a function implementation.

You must call HostRef#dispose or otherwise consume the HostRef#handle to ensure the handle is not leaked.

#### Type Parameters

##### T

`T` *extends* `object`

#### Parameters

##### value

`T`

#### Returns

`HostRef`\<`T`\>

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`newHostRef`](QuickJSContext.md#newhostref)

***

### newNumber()

> **newNumber**(`num`): [`QuickJSHandle`](../README.md#quickjshandle)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:356](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L356)

Converts a Javascript number into a QuickJS value.

#### Parameters

##### num

`number`

#### Returns

[`QuickJSHandle`](../README.md#quickjshandle)

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`newNumber`](QuickJSContext.md#newnumber)

***

### newObject()

> **newObject**(`prototype?`): [`QuickJSHandle`](../README.md#quickjshandle)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:425](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L425)

`{}`.
Create a new QuickJS [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer).

#### Parameters

##### prototype?

[`QuickJSHandle`](../README.md#quickjshandle)

Like [`Object.create`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create).

#### Returns

[`QuickJSHandle`](../README.md#quickjshandle)

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`newObject`](QuickJSContext.md#newobject)

***

### newPromise()

#### Call Signature

> **newPromise**(): [`QuickJSDeferredPromise`](QuickJSDeferredPromise.md)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:460](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L460)

Create a new [QuickJSDeferredPromise](QuickJSDeferredPromise.md). Use `deferred.resolve(handle)` and
`deferred.reject(handle)` to fulfill the promise handle available at `deferred.handle`.
Note that you are responsible for calling `deferred.dispose()` to free the underlying
resources; see the documentation on [QuickJSDeferredPromise](QuickJSDeferredPromise.md) for details.

##### Returns

[`QuickJSDeferredPromise`](QuickJSDeferredPromise.md)

##### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`newPromise`](QuickJSContext.md#newpromise)

#### Call Signature

> **newPromise**(`promise`): [`QuickJSDeferredPromise`](QuickJSDeferredPromise.md)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:468](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L468)

Create a new [QuickJSDeferredPromise](QuickJSDeferredPromise.md) that resolves when the
given native Promise<QuickJSHandle> resolves. Rejections will be coerced
to a QuickJS error.

You can still resolve/reject the created promise "early" using its methods.

##### Parameters

###### promise

`Promise`\<[`QuickJSHandle`](../README.md#quickjshandle)\>

##### Returns

[`QuickJSDeferredPromise`](QuickJSDeferredPromise.md)

##### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`newPromise`](QuickJSContext.md#newpromise)

#### Call Signature

> **newPromise**(`newPromiseFn`): [`QuickJSDeferredPromise`](QuickJSDeferredPromise.md)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:475](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L475)

Construct a new native Promise<QuickJSHandle>, and then convert it into a
[QuickJSDeferredPromise](QuickJSDeferredPromise.md).

You can still resolve/reject the created promise "early" using its methods.

##### Parameters

###### newPromiseFn

[`PromiseExecutor`](../README.md#promiseexecutor)\<[`QuickJSHandle`](../README.md#quickjshandle), `Error` \| [`QuickJSHandle`](../README.md#quickjshandle)\>

##### Returns

[`QuickJSDeferredPromise`](QuickJSDeferredPromise.md)

##### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`newPromise`](QuickJSContext.md#newpromise)

***

### newString()

> **newString**(`str`): [`QuickJSHandle`](../README.md#quickjshandle)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:363](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L363)

Create a QuickJS [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) value.

#### Parameters

##### str

`string`

#### Returns

[`QuickJSHandle`](../README.md#quickjshandle)

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`newString`](QuickJSContext.md#newstring)

***

### newSymbolFor()

> **newSymbolFor**(`key`): [`QuickJSHandle`](../README.md#quickjshandle)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:386](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L386)

Get a symbol from the [global registry](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#shared_symbols_in_the_global_symbol_registry) for the given key.
All symbols created with the same key will be the same value.

#### Parameters

##### key

`string` | `symbol`

#### Returns

[`QuickJSHandle`](../README.md#quickjshandle)

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`newSymbolFor`](QuickJSContext.md#newsymbolfor)

***

### newUniqueSymbol()

> **newUniqueSymbol**(`description`): [`QuickJSHandle`](../README.md#quickjshandle)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:374](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L374)

Create a QuickJS [symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) value.
No two symbols created with this function will be the same value.

#### Parameters

##### description

`string` | `symbol`

#### Returns

[`QuickJSHandle`](../README.md#quickjshandle)

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`newUniqueSymbol`](QuickJSContext.md#newuniquesymbol)

***

### resolvePromise()

> **resolvePromise**(`promiseLikeHandle`): `Promise`\<`QuickJSContextResult`\<[`QuickJSHandle`](../README.md#quickjshandle)\>\>

Defined in: [packages/quickjs-emscripten-core/src/context.ts:875](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L875)

`Promise.resolve(value)`.
Convert a handle containing a Promise-like value inside the VM into an
actual promise on the host.

#### Parameters

##### promiseLikeHandle

[`QuickJSHandle`](../README.md#quickjshandle)

A handle to a Promise-like value with a `.then(onSuccess, onError)` method.

#### Returns

`Promise`\<`QuickJSContextResult`\<[`QuickJSHandle`](../README.md#quickjshandle)\>\>

#### Remarks

You may need to call [runtime](QuickJSContext.md#runtime).[QuickJSRuntime#executePendingJobs](QuickJSRuntime.md#executependingjobs) to ensure that the promise is resolved.

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`resolvePromise`](QuickJSContext.md#resolvepromise)

***

### sameValue()

> **sameValue**(`handle`, `other`): `boolean`

Defined in: [packages/quickjs-emscripten-core/src/context.ts:940](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L940)

`Object.is(a, b)`
See [Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness).

#### Parameters

##### handle

[`QuickJSHandle`](../README.md#quickjshandle)

##### other

[`QuickJSHandle`](../README.md#quickjshandle)

#### Returns

`boolean`

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`sameValue`](QuickJSContext.md#samevalue)

***

### sameValueZero()

> **sameValueZero**(`handle`, `other`): `boolean`

Defined in: [packages/quickjs-emscripten-core/src/context.ts:948](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L948)

SameValueZero comparison.
See [Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness).

#### Parameters

##### handle

[`QuickJSHandle`](../README.md#quickjshandle)

##### other

[`QuickJSHandle`](../README.md#quickjshandle)

#### Returns

`boolean`

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`sameValueZero`](QuickJSContext.md#samevaluezero)

***

### setProp()

> **setProp**(`handle`, `key`, `value`): `void`

Defined in: [packages/quickjs-emscripten-core/src/context.ts:1106](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1106)

`handle[key] = value`.
Set a property on a JSValue.

#### Parameters

##### handle

[`QuickJSHandle`](../README.md#quickjshandle)

##### key

[`QuickJSPropertyKey`](../README.md#quickjspropertykey)

The property may be specified as a JSValue handle, or as a
Javascript string or number (which will be converted automatically to a JSValue).

##### value

[`QuickJSHandle`](../README.md#quickjshandle)

#### Returns

`void`

#### Remarks

Note that the QuickJS authors recommend using [defineProp](QuickJSContext.md#defineprop) to define new
properties.

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`setProp`](QuickJSContext.md#setprop)

***

### success()

> `protected` **success**\<`S`\>(`value`): [`DisposableSuccess`](DisposableSuccess.md)\<`S`\>

Defined in: [packages/quickjs-emscripten-core/src/context.ts:1535](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1535)

#### Type Parameters

##### S

`S`

#### Parameters

##### value

`S`

#### Returns

[`DisposableSuccess`](DisposableSuccess.md)\<`S`\>

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`success`](QuickJSContext.md#success)

***

### throw()

> **throw**(`error`): [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:1314](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1314)

**`Experimental`**

Throw an error in the VM, interrupted whatever current execution is in progress when execution resumes.

#### Parameters

##### error

`Error` | [`QuickJSHandle`](../README.md#quickjshandle)

#### Returns

[`JSValuePointer`](../README.md#jsvaluepointer)

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`throw`](QuickJSContext.md#throw)

***

### toHostRef()

> **toHostRef**\<`T`\>(`handle`): `HostRef`\<`T`\> \| `undefined`

Defined in: [packages/quickjs-emscripten-core/src/context.ts:732](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L732)

If `handle` is a `HostRef<T>.handle`, return a new `HostRef<T>` instance wrapping the handle.

You must call HostRef#dispose or otherwise consume the HostRef#handle to ensure the handle is not leaked.

#### Type Parameters

##### T

`T` *extends* `object`

#### Parameters

##### handle

[`QuickJSHandle`](../README.md#quickjshandle)

#### Returns

`HostRef`\<`T`\> \| `undefined`

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`toHostRef`](QuickJSContext.md#tohostref)

***

### typeof()

> **typeof**(`handle`): `string`

Defined in: [packages/quickjs-emscripten-core/src/context.ts:764](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L764)

`typeof` operator. **Not** [standards compliant](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof).

#### Parameters

##### handle

[`QuickJSHandle`](../README.md#quickjshandle)

#### Returns

`string`

#### Remarks

Does not support BigInt values correctly.

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`typeof`](QuickJSContext.md#typeof)

***

### unwrapHostRef()

> **unwrapHostRef**\<`T`\>(`handle`): `T`

Defined in: [packages/quickjs-emscripten-core/src/context.ts:747](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L747)

If `handle` is a `HostRef<T>.handle`, return the host value `T`.

#### Type Parameters

##### T

`T` *extends* `object`

#### Parameters

##### handle

[`QuickJSHandle`](../README.md#quickjshandle)

#### Returns

`T`

#### Throws

QuickJSHostRefInvalid if `handle` is not a `HostRef<T>.handle`

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`unwrapHostRef`](QuickJSContext.md#unwraphostref)

***

### unwrapResult()

> **unwrapResult**\<`T`\>(`result`): `T`

Defined in: [packages/quickjs-emscripten-core/src/context.ts:1398](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1398)

Unwrap a SuccessOrFail result such as a [VmCallResult](../README.md#vmcallresult) or a
[ExecutePendingJobsResult](../README.md#executependingjobsresult), where the fail branch contains a handle to a QuickJS error value.
If the result is a success, returns the value.
If the result is an error, converts the error to a native object and throws the error.

#### Type Parameters

##### T

`T`

#### Parameters

##### result

[`SuccessOrFail`](../README.md#successorfail)\<`T`, [`QuickJSHandle`](../README.md#quickjshandle)\>

#### Returns

`T`

#### Inherited from

[`QuickJSContext`](QuickJSContext.md).[`unwrapResult`](QuickJSContext.md#unwrapresult)
