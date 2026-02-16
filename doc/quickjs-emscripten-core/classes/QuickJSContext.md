[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../README.md) / QuickJSContext

# Class: QuickJSContext

Defined in: [packages/quickjs-emscripten-core/src/context.ts:188](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L188)

QuickJSContext wraps a QuickJS Javascript context (JSContext\*) within a
runtime. The contexts within the same runtime may exchange objects freely.
You can think of separate runtimes like different domains in a browser, and
the contexts within a runtime like the different windows open to the same
domain. The [runtime](#runtime) references the context's runtime.

This class's methods return [QuickJSHandle](../type-aliases/QuickJSHandle.md), which wrap C pointers (JSValue\*).
It's the caller's responsibility to call `.dispose()` on any
handles you create to free memory once you're done with the handle.

Use [QuickJSRuntime#newContext](QuickJSRuntime.md#newcontext) or [QuickJSWASMModule#newContext](QuickJSWASMModule.md#newcontext)
to create a new QuickJSContext.

Create QuickJS values inside the interpreter with methods like
[newNumber](#newnumber), [newString](#newstring), [newArray](#newarray), [newObject](#newobject),
[newFunction](#newfunction), and [newPromise](#newpromise).

Call [setProp](#setprop) or [defineProp](#defineprop) to customize objects. Use those methods
with [global](#global) to expose the values you create to the interior of the
interpreter, so they can be used in [evalCode](#evalcode).

Use [evalCode](#evalcode) or [callFunction](#callfunction) to execute Javascript inside the VM. If
you're using asynchronous code inside the QuickJSContext, you may need to also
call [QuickJSRuntime#executePendingJobs](QuickJSRuntime.md#executependingjobs). Executing code inside the runtime returns a
result object representing successful execution or an error. You must dispose
of any such results to avoid leaking memory inside the VM.

Implement memory and CPU constraints at the runtime level, using [runtime](#runtime).
See [QuickJSRuntime](QuickJSRuntime.md) for more information.

## Contents

* [Extends](#extends)
* [Extended by](#extended-by)
* [Implements](#implements)
* [Constructors](#constructors)
  * [Constructor](#constructor)
* [Properties](#properties)
  * [runtime](#runtime-1)
* [Accessors](#accessors)
  * [alive](#alive)
  * [false](#false)
  * [global](#global)
  * [null](#null)
  * [true](#true)
  * [undefined](#undefined)
* [Methods](#methods)
  * [\[dispose\]()](#dispose)
  * [callFunction()](#callfunction)
  * [callMethod()](#callmethod)
  * [decodeBinaryJSON()](#decodebinaryjson)
  * [defineProp()](#defineprop)
  * [dispose()](#dispose-1)
  * [dump()](#dump)
  * [encodeBinaryJSON()](#encodebinaryjson)
  * [eq()](#eq)
  * [evalCode()](#evalcode)
  * [fail()](#fail)
  * [getArrayBuffer()](#getarraybuffer)
  * [getBigInt()](#getbigint)
  * [getIterator()](#getiterator)
  * [getLength()](#getlength)
  * [getNumber()](#getnumber)
  * [getOwnPropertyNames()](#getownpropertynames)
  * [getPromiseState()](#getpromisestate)
  * [getProp()](#getprop)
  * [getString()](#getstring)
  * [getSymbol()](#getsymbol)
  * [getWellKnownSymbol()](#getwellknownsymbol)
  * [newArray()](#newarray)
  * [newArrayBuffer()](#newarraybuffer)
  * [newBigInt()](#newbigint)
  * [newConstructorFunction()](#newconstructorfunction)
  * [newError()](#newerror)
  * [newFunction()](#newfunction)
  * [newFunctionWithOptions()](#newfunctionwithoptions)
  * [newHostRef()](#newhostref)
  * [newNumber()](#newnumber)
  * [newObject()](#newobject)
  * [newPromise()](#newpromise)
  * [newString()](#newstring)
  * [newSymbolFor()](#newsymbolfor)
  * [newUniqueSymbol()](#newuniquesymbol)
  * [resolvePromise()](#resolvepromise)
  * [sameValue()](#samevalue)
  * [sameValueZero()](#samevaluezero)
  * [setProp()](#setprop)
  * [success()](#success)
  * [throw()](#throw)
  * [toHostRef()](#tohostref)
  * [typeof()](#typeof)
  * [unwrapHostRef()](#unwraphostref)
  * [unwrapResult()](#unwrapresult)

## Extends

* [`UsingDisposable`](UsingDisposable.md)

## Extended by

* [`QuickJSAsyncContext`](QuickJSAsyncContext.md)

## Implements

* [`LowLevelJavascriptVm`](../interfaces/LowLevelJavascriptVm.md)<[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)>
* [`Disposable`](../interfaces/Disposable.md)

## Constructors

### Constructor

> **new QuickJSContext**(`args`): `QuickJSContext`

Defined in: [packages/quickjs-emscripten-core/src/context.ts:233](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L233)

Use [QuickJSRuntime#newContext](QuickJSRuntime.md#newcontext) or [QuickJSWASMModule#newContext](QuickJSWASMModule.md#newcontext)
to create a new QuickJSContext.

#### Parameters

##### args

###### callbacks

`QuickJSModuleCallbacks`

###### ctx

[`Lifetime`](Lifetime.md)<[`JSContextPointer`](../type-aliases/JSContextPointer.md)>

###### ffi

[`EitherFFI`](../type-aliases/EitherFFI.md)

###### module

[`EitherModule`](../type-aliases/EitherModule.md)

###### ownedLifetimes?

[`Disposable`](../interfaces/Disposable.md)\[]

###### rt

[`Lifetime`](Lifetime.md)<[`JSRuntimePointer`](../type-aliases/JSRuntimePointer.md)>

###### runtime

[`QuickJSRuntime`](QuickJSRuntime.md)

#### Returns

`QuickJSContext`

#### Overrides

[`UsingDisposable`](UsingDisposable.md).[`constructor`](UsingDisposable.md#constructor)

## Properties

### runtime

> `readonly` **runtime**: [`QuickJSRuntime`](QuickJSRuntime.md)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:195](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L195)

The runtime that created this context.

## Accessors

### alive

#### Get Signature

> **get** **alive**(): `boolean`

Defined in: [packages/quickjs-emscripten-core/src/context.ts:264](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L264)

##### Returns

`boolean`

true if the object is alive

#### Implementation of

[`Disposable`](../interfaces/Disposable.md).[`alive`](../interfaces/Disposable.md#alive)

#### Overrides

[`UsingDisposable`](UsingDisposable.md).[`alive`](UsingDisposable.md#alive)

***

### false

#### Get Signature

> **get** **false**(): [`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:322](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L322)

[`false`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/false).

##### Returns

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

***

### global

#### Get Signature

> **get** **global**(): [`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:337](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L337)

[`global`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects).
A handle to the global object inside the interpreter.
You can set properties to create global variables.

##### Returns

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

#### Implementation of

[`LowLevelJavascriptVm`](../interfaces/LowLevelJavascriptVm.md).[`global`](../interfaces/LowLevelJavascriptVm.md#global)

***

### null

#### Get Signature

> **get** **null**(): [`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:296](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L296)

[`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null).

##### Returns

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

***

### true

#### Get Signature

> **get** **true**(): [`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:309](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L309)

[`true`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/true).

##### Returns

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

***

### undefined

#### Get Signature

> **get** **undefined**(): [`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:283](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L283)

[`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined).

##### Returns

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

#### Implementation of

[`LowLevelJavascriptVm`](../interfaces/LowLevelJavascriptVm.md).[`undefined`](../interfaces/LowLevelJavascriptVm.md#undefined)

## Methods

### \[dispose]\()

> **\[dispose]**(): `void`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:47](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L47)

Just calls the standard .dispose() method of this class.

#### Returns

`void`

#### Implementation of

[`Disposable`](../interfaces/Disposable.md).[`[dispose]`](../interfaces/Disposable.md#dispose)

#### Inherited from

[`UsingDisposable`](UsingDisposable.md).[`[dispose]`](UsingDisposable.md#dispose)

***

### callFunction()

#### Call Signature

> **callFunction**(`func`, `thisVal`, `args?`): `QuickJSContextResult`<[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)>

Defined in: [packages/quickjs-emscripten-core/src/context.ts:1180](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1180)

[`func.call(thisVal, ...args)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) or
[`func.apply(thisVal, args)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply).
Call a JSValue as a function.

See [unwrapResult](#unwrapresult), which will throw if the function returned an error, or
return the result handle directly. If evaluation returned a handle containing
a promise, use [resolvePromise](#resolvepromise) to convert it to a native promise and
[runtime](#runtime).[QuickJSRuntime#executePendingJobs](QuickJSRuntime.md#executependingjobs) to finish evaluating the promise.

##### Parameters

###### func

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

###### thisVal

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

###### args?

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)\[]

##### Returns

`QuickJSContextResult`<[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)>

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

##### Implementation of

[`LowLevelJavascriptVm`](../interfaces/LowLevelJavascriptVm.md).[`callFunction`](../interfaces/LowLevelJavascriptVm.md#callfunction)

#### Call Signature

> **callFunction**(`func`, `thisVal`, ...`args`): `QuickJSContextResult`<[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)>

Defined in: [packages/quickjs-emscripten-core/src/context.ts:1185](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1185)

[`func.call(thisVal, ...args)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) or
[`func.apply(thisVal, args)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply).
Call a JSValue as a function.

See [unwrapResult](#unwrapresult), which will throw if the function returned an error, or
return the result handle directly. If evaluation returned a handle containing
a promise, use [resolvePromise](#resolvepromise) to convert it to a native promise and
[runtime](#runtime).[QuickJSRuntime#executePendingJobs](QuickJSRuntime.md#executependingjobs) to finish evaluating the promise.

##### Parameters

###### func

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

###### thisVal

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

###### args

...[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)\[]

##### Returns

`QuickJSContextResult`<[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)>

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

##### Implementation of

`LowLevelJavascriptVm.callFunction`

***

### callMethod()

> **callMethod**(`thisHandle`, `key`, `args?`): `QuickJSContextResult`<[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)>

Defined in: [packages/quickjs-emscripten-core/src/context.ts:1234](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1234)

`handle[key](...args)`

Call a method on a JSValue. This is a convenience method that calls [getProp](#getprop) and [callFunction](#callfunction).

#### Parameters

##### thisHandle

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

##### key

[`QuickJSPropertyKey`](../type-aliases/QuickJSPropertyKey.md)

##### args?

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)\[] = `[]`

#### Returns

`QuickJSContextResult`<[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)>

A result. If the function threw synchronously, `result.error` be a
handle to the exception. Otherwise `result.value` will be a handle to the
value.

***

### decodeBinaryJSON()

> **decodeBinaryJSON**(`handle`): [`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

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

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

#### Returns

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

***

### defineProp()

> **defineProp**(`handle`, `key`, `descriptor`): `void`

Defined in: [packages/quickjs-emscripten-core/src/context.ts:1121](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1121)

[`Object.defineProperty(handle, key, descriptor)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).

#### Parameters

##### handle

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

##### key

[`QuickJSPropertyKey`](../type-aliases/QuickJSPropertyKey.md)

The property may be specified as a JSValue handle, or as a
Javascript string or number (which will be converted automatically to a JSValue).

##### descriptor

[`VmPropertyDescriptor`](../interfaces/VmPropertyDescriptor.md)<[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)>

#### Returns

`void`

#### Implementation of

[`LowLevelJavascriptVm`](../interfaces/LowLevelJavascriptVm.md).[`defineProp`](../interfaces/LowLevelJavascriptVm.md#defineprop)

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

#### Implementation of

[`Disposable`](../interfaces/Disposable.md).[`dispose`](../interfaces/Disposable.md#dispose-1)

#### Overrides

[`UsingDisposable`](UsingDisposable.md).[`dispose`](UsingDisposable.md#dispose-1)

***

### dump()

> **dump**(`handle`): `any`

Defined in: [packages/quickjs-emscripten-core/src/context.ts:1355](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1355)

Dump a JSValue to Javascript in a best-effort fashion.
If the value is a promise, dumps the promise's state.
Returns `handle.toString()` if it cannot be serialized to JSON.

#### Parameters

##### handle

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

#### Returns

`any`

***

### encodeBinaryJSON()

> **encodeBinaryJSON**(`handle`): [`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

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

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

#### Returns

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

***

### eq()

> **eq**(`handle`, `other`): `boolean`

Defined in: [packages/quickjs-emscripten-core/src/context.ts:932](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L932)

`handle === other` - IsStrictlyEqual.
See [Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness).

#### Parameters

##### handle

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

##### other

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

#### Returns

`boolean`

***

### evalCode()

> **evalCode**(`code`, `filename?`, `options?`): `QuickJSContextResult`<[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)>

Defined in: [packages/quickjs-emscripten-core/src/context.ts:1277](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1277)

Like [`eval(code)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#Description).

Evaluates `code`, as though it's in a file named `filename`, with options `options`.

* When `options.type` is `"global"`, the code is evaluated in the global
  scope of the QuickJSContext, and the return value is the result of the last
  expression.
* When `options.type` is `"module"`, the code is evaluated is a module scope.
  It may use `import` and `export` if [runtime](#runtime).[QuickJSRuntime#setModuleLoader](QuickJSRuntime.md#setmoduleloader) was called.
  It may use top-level await if supported by the underlying QuickJS library.
  The return value is the module's exports, or a promise for the module's exports.
* When `options.type` is unset, the code is evaluated as a module if it
  contains an `import` or `export` statement, otherwise it is evaluated in
  the global scope.

When working with async code, you many need to call [runtime](#runtime).[QuickJSRuntime#executePendingJobs](QuickJSRuntime.md#executependingjobs)
to execute callbacks pending after synchronous evaluation returns.

See [unwrapResult](#unwrapresult), which will throw if the function returned an error, or
return the result handle directly. If evaluation returned a handle containing
a promise, use [resolvePromise](#resolvepromise) to convert it to a native promise and
[QuickJSRuntime#executePendingJobs](QuickJSRuntime.md#executependingjobs) to finish evaluating the promise.

*Note*: to protect against infinite loops, provide an interrupt handler to
[QuickJSRuntime#setInterruptHandler](QuickJSRuntime.md#setinterrupthandler). You can use [shouldInterruptAfterDeadline](../functions/shouldInterruptAfterDeadline.md) to
create a time-based deadline.

#### Parameters

##### code

`string`

##### filename?

`string` = `"eval.js"`

##### options?

If no options are passed, a heuristic will be used to detect if `code` is
an ES module.

See [EvalFlags](../variables/EvalFlags.md) for number semantics.

`number` | [`ContextEvalOptions`](../interfaces/ContextEvalOptions.md)

#### Returns

`QuickJSContextResult`<[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)>

The last statement's value. If the code threw synchronously,
`result.error` will be a handle to the exception. If execution was
interrupted, the error will have name `InternalError` and message
`interrupted`.

#### Implementation of

[`LowLevelJavascriptVm`](../interfaces/LowLevelJavascriptVm.md).[`evalCode`](../interfaces/LowLevelJavascriptVm.md#evalcode)

***

### fail()

> `protected` **fail**(`error`): [`DisposableFail`](DisposableFail.md)<[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)>

Defined in: [packages/quickjs-emscripten-core/src/context.ts:1539](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1539)

#### Parameters

##### error

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

#### Returns

[`DisposableFail`](DisposableFail.md)<[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)>

***

### getArrayBuffer()

> **getArrayBuffer**(`handle`): [`Lifetime`](Lifetime.md)<`Uint8Array`<`ArrayBufferLike`>>

Defined in: [packages/quickjs-emscripten-core/src/context.ts:811](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L811)

Coverts `handle` to a JavaScript ArrayBuffer

#### Parameters

##### handle

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

#### Returns

[`Lifetime`](Lifetime.md)<`Uint8Array`<`ArrayBufferLike`>>

***

### getBigInt()

> **getBigInt**(`handle`): `bigint`

Defined in: [packages/quickjs-emscripten-core/src/context.ts:802](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L802)

Converts `handle` to a Javascript bigint.

#### Parameters

##### handle

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

#### Returns

`bigint`

***

### getIterator()

> **getIterator**(`iterableHandle`): `QuickJSContextResult`<`QuickJSIterator`>

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

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

#### Returns

`QuickJSContextResult`<`QuickJSIterator`>

***

### getLength()

> **getLength**(`handle`): `number` | `undefined`

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

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

#### Returns

`number` | `undefined`

a number if the handle has a numeric length property, otherwise `undefined`.

***

### getNumber()

> **getNumber**(`handle`): `number`

Defined in: [packages/quickjs-emscripten-core/src/context.ts:773](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L773)

Converts `handle` into a Javascript number.

#### Parameters

##### handle

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

#### Returns

`number`

`NaN` on error, otherwise a `number`.

#### Implementation of

[`LowLevelJavascriptVm`](../interfaces/LowLevelJavascriptVm.md).[`getNumber`](../interfaces/LowLevelJavascriptVm.md#getnumber)

***

### getOwnPropertyNames()

> **getOwnPropertyNames**(`handle`, `options?`): `QuickJSContextResult`<[`DisposableArray`](../type-aliases/DisposableArray.md)<[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)>>

Defined in: [packages/quickjs-emscripten-core/src/context.ts:1028](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1028)

`Object.getOwnPropertyNames(handle)`.
Similar to the [standard semantics](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames),
but with extra, non-standard options for:

* fetching array indexes as numbers (`numbers: true`)
* including symbols (`symbols: true`)
* only iterating over enumerable properties (`onlyEnumerable: true`)

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

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

##### options?

`GetOwnPropertyNamesOptions` = `...`

#### Returns

`QuickJSContextResult`<[`DisposableArray`](../type-aliases/DisposableArray.md)<[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)>>

an an array of handles of the property names. The array itself is disposable for your convenience.

#### Throws

QuickJSEmptyGetOwnPropertyNames if no options are set.

***

### getPromiseState()

> **getPromiseState**(`handle`): [`JSPromiseState`](../type-aliases/JSPromiseState.md)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:836](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L836)

Get the current state of a QuickJS promise, see [JSPromiseState](../type-aliases/JSPromiseState.md) for the possible states.
This can be used to expect a promise to be fulfilled when combined with [unwrapResult](#unwrapresult):

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

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

#### Returns

[`JSPromiseState`](../type-aliases/JSPromiseState.md)

***

### getProp()

> **getProp**(`handle`, `key`): [`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:961](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L961)

`handle[key]`.
Get a property from a JSValue.

#### Parameters

##### handle

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

##### key

[`QuickJSPropertyKey`](../type-aliases/QuickJSPropertyKey.md)

The property may be specified as a JSValue handle, or as a
Javascript string (which will be converted automatically).

#### Returns

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

#### Implementation of

[`LowLevelJavascriptVm`](../interfaces/LowLevelJavascriptVm.md).[`getProp`](../interfaces/LowLevelJavascriptVm.md#getprop)

***

### getString()

> **getString**(`handle`): `string`

Defined in: [packages/quickjs-emscripten-core/src/context.ts:781](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L781)

Converts `handle` to a Javascript string.

#### Parameters

##### handle

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

#### Returns

`string`

#### Implementation of

[`LowLevelJavascriptVm`](../interfaces/LowLevelJavascriptVm.md).[`getString`](../interfaces/LowLevelJavascriptVm.md#getstring)

***

### getSymbol()

> **getSymbol**(`handle`): `symbol`

Defined in: [packages/quickjs-emscripten-core/src/context.ts:790](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L790)

Converts `handle` into a Javascript symbol. If the symbol is in the global
registry in the guest, it will be created with Symbol.for on the host.

#### Parameters

##### handle

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

#### Returns

`symbol`

***

### getWellKnownSymbol()

> **getWellKnownSymbol**(`name`): [`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:397](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L397)

Access a well-known symbol that is a property of the global Symbol object, like `Symbol.iterator`.

#### Parameters

##### name

`string`

#### Returns

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

***

### newArray()

> **newArray**(): [`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:439](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L439)

`[]`.
Create a new QuickJS [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

#### Returns

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

***

### newArrayBuffer()

> **newArrayBuffer**(`buffer`): [`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:447](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L447)

Create a new QuickJS [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer).

#### Parameters

##### buffer

`ArrayBufferLike`

#### Returns

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

***

### newBigInt()

> **newBigInt**(`num`): [`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:405](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L405)

Create a QuickJS [bigint](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) value.

#### Parameters

##### num

`bigint`

#### Returns

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

***

### newConstructorFunction()

#### Call Signature

> **newConstructorFunction**(`fn`): [`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:635](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L635)

Convert a Javascript function into a QuickJS constructor function.
See [newFunction](#newfunction) for more details.

##### Parameters

###### fn

[`VmFunctionImplementation`](../type-aliases/VmFunctionImplementation.md)<[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)>

##### Returns

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

#### Call Signature

> **newConstructorFunction**(`name`, `fn`): [`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:636](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L636)

Convert a Javascript function into a QuickJS constructor function.
See [newFunction](#newfunction) for more details.

##### Parameters

###### name

`string` | `undefined`

###### fn

[`VmFunctionImplementation`](../type-aliases/VmFunctionImplementation.md)<[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)>

##### Returns

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

***

### newError()

#### Call Signature

> **newError**(`error`): [`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:679](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L679)

##### Parameters

###### error

###### message

`string`

###### name

`string`

##### Returns

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

#### Call Signature

> **newError**(`message`): [`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:680](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L680)

##### Parameters

###### message

`string`

##### Returns

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

#### Call Signature

> **newError**(): [`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:681](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L681)

##### Returns

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

***

### newFunction()

#### Call Signature

> **newFunction**(`fn`): [`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:612](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L612)

Convert a Javascript function into a QuickJS function value.
See [VmFunctionImplementation](../type-aliases/VmFunctionImplementation.md) for more details.

A [VmFunctionImplementation](../type-aliases/VmFunctionImplementation.md) should not free its arguments or its return
value. A VmFunctionImplementation should also not retain any references to
its return value.

For constructors (functions that will be called with `new ...`), use [newConstructorFunction](#newconstructorfunction).

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

To implement an async function, create a promise with [newPromise](#newpromise), then
return the deferred promise handle from `deferred.handle` from your
function implementation:

```typescript
const deferred = vm.newPromise()
someNativeAsyncFunction().then(deferred.resolve)
return deferred.handle
```

##### Parameters

###### fn

[`VmFunctionImplementation`](../type-aliases/VmFunctionImplementation.md)<[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)>

##### Returns

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

##### Implementation of

[`LowLevelJavascriptVm`](../interfaces/LowLevelJavascriptVm.md).[`newFunction`](../interfaces/LowLevelJavascriptVm.md#newfunction)

#### Call Signature

> **newFunction**(`name`, `fn`): [`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:613](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L613)

Convert a Javascript function into a QuickJS function value.
See [VmFunctionImplementation](../type-aliases/VmFunctionImplementation.md) for more details.

A [VmFunctionImplementation](../type-aliases/VmFunctionImplementation.md) should not free its arguments or its return
value. A VmFunctionImplementation should also not retain any references to
its return value.

For constructors (functions that will be called with `new ...`), use [newConstructorFunction](#newconstructorfunction).

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

To implement an async function, create a promise with [newPromise](#newpromise), then
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

[`VmFunctionImplementation`](../type-aliases/VmFunctionImplementation.md)<[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)>

##### Returns

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

##### Implementation of

`LowLevelJavascriptVm.newFunction`

***

### newFunctionWithOptions()

> **newFunctionWithOptions**(`args`): [`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:661](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L661)

Lower-level API for creating functions.
See [newFunction](#newfunction) for more details on how to use functions.

#### Parameters

##### args

###### fn

[`VmFunctionImplementation`](../type-aliases/VmFunctionImplementation.md)<[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)>

###### isConstructor

`boolean`

###### length

`number`

###### name

`string` | `undefined`

#### Returns

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

***

### newHostRef()

> **newHostRef**<`T`>(`value`): `HostRef`<`T`>

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

`HostRef`<`T`>

***

### newNumber()

> **newNumber**(`num`): [`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:356](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L356)

Converts a Javascript number into a QuickJS value.

#### Parameters

##### num

`number`

#### Returns

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

#### Implementation of

[`LowLevelJavascriptVm`](../interfaces/LowLevelJavascriptVm.md).[`newNumber`](../interfaces/LowLevelJavascriptVm.md#newnumber)

***

### newObject()

> **newObject**(`prototype?`): [`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:425](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L425)

`{}`.
Create a new QuickJS [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer).

#### Parameters

##### prototype?

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

Like [`Object.create`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create).

#### Returns

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

#### Implementation of

[`LowLevelJavascriptVm`](../interfaces/LowLevelJavascriptVm.md).[`newObject`](../interfaces/LowLevelJavascriptVm.md#newobject)

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

#### Call Signature

> **newPromise**(`promise`): [`QuickJSDeferredPromise`](QuickJSDeferredPromise.md)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:468](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L468)

Create a new [QuickJSDeferredPromise](QuickJSDeferredPromise.md) that resolves when the
given native Promise<QuickJSHandle> resolves. Rejections will be coerced
to a QuickJS error.

You can still resolve/reject the created promise "early" using its methods.

##### Parameters

###### promise

`Promise`<[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)>

##### Returns

[`QuickJSDeferredPromise`](QuickJSDeferredPromise.md)

#### Call Signature

> **newPromise**(`newPromiseFn`): [`QuickJSDeferredPromise`](QuickJSDeferredPromise.md)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:475](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L475)

Construct a new native Promise<QuickJSHandle>, and then convert it into a
[QuickJSDeferredPromise](QuickJSDeferredPromise.md).

You can still resolve/reject the created promise "early" using its methods.

##### Parameters

###### newPromiseFn

[`PromiseExecutor`](../type-aliases/PromiseExecutor.md)<[`QuickJSHandle`](../type-aliases/QuickJSHandle.md), `Error` | [`QuickJSHandle`](../type-aliases/QuickJSHandle.md)>

##### Returns

[`QuickJSDeferredPromise`](QuickJSDeferredPromise.md)

***

### newString()

> **newString**(`str`): [`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:363](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L363)

Create a QuickJS [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) value.

#### Parameters

##### str

`string`

#### Returns

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

#### Implementation of

[`LowLevelJavascriptVm`](../interfaces/LowLevelJavascriptVm.md).[`newString`](../interfaces/LowLevelJavascriptVm.md#newstring)

***

### newSymbolFor()

> **newSymbolFor**(`key`): [`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:386](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L386)

Get a symbol from the [global registry](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#shared_symbols_in_the_global_symbol_registry) for the given key.
All symbols created with the same key will be the same value.

#### Parameters

##### key

`string` | `symbol`

#### Returns

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

***

### newUniqueSymbol()

> **newUniqueSymbol**(`description`): [`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:374](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L374)

Create a QuickJS [symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) value.
No two symbols created with this function will be the same value.

#### Parameters

##### description

`string` | `symbol`

#### Returns

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

***

### resolvePromise()

> **resolvePromise**(`promiseLikeHandle`): `Promise`<`QuickJSContextResult`<[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)>>

Defined in: [packages/quickjs-emscripten-core/src/context.ts:875](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L875)

`Promise.resolve(value)`.
Convert a handle containing a Promise-like value inside the VM into an
actual promise on the host.

#### Parameters

##### promiseLikeHandle

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

A handle to a Promise-like value with a `.then(onSuccess, onError)` method.

#### Returns

`Promise`<`QuickJSContextResult`<[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)>>

#### Remarks

You may need to call [runtime](#runtime).[QuickJSRuntime#executePendingJobs](QuickJSRuntime.md#executependingjobs) to ensure that the promise is resolved.

***

### sameValue()

> **sameValue**(`handle`, `other`): `boolean`

Defined in: [packages/quickjs-emscripten-core/src/context.ts:940](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L940)

`Object.is(a, b)`
See [Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness).

#### Parameters

##### handle

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

##### other

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

#### Returns

`boolean`

***

### sameValueZero()

> **sameValueZero**(`handle`, `other`): `boolean`

Defined in: [packages/quickjs-emscripten-core/src/context.ts:948](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L948)

SameValueZero comparison.
See [Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness).

#### Parameters

##### handle

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

##### other

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

#### Returns

`boolean`

***

### setProp()

> **setProp**(`handle`, `key`, `value`): `void`

Defined in: [packages/quickjs-emscripten-core/src/context.ts:1106](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1106)

`handle[key] = value`.
Set a property on a JSValue.

#### Parameters

##### handle

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

##### key

[`QuickJSPropertyKey`](../type-aliases/QuickJSPropertyKey.md)

The property may be specified as a JSValue handle, or as a
Javascript string or number (which will be converted automatically to a JSValue).

##### value

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

#### Returns

`void`

#### Remarks

Note that the QuickJS authors recommend using [defineProp](#defineprop) to define new
properties.

#### Implementation of

[`LowLevelJavascriptVm`](../interfaces/LowLevelJavascriptVm.md).[`setProp`](../interfaces/LowLevelJavascriptVm.md#setprop)

***

### success()

> `protected` **success**<`S`>(`value`): [`DisposableSuccess`](DisposableSuccess.md)<`S`>

Defined in: [packages/quickjs-emscripten-core/src/context.ts:1535](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1535)

#### Type Parameters

##### S

`S`

#### Parameters

##### value

`S`

#### Returns

[`DisposableSuccess`](DisposableSuccess.md)<`S`>

***

### throw()

> **throw**(`error`): [`JSValuePointer`](../type-aliases/JSValuePointer.md)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:1314](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1314)

**`Experimental`**

Throw an error in the VM, interrupted whatever current execution is in progress when execution resumes.

#### Parameters

##### error

`Error` | [`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

#### Returns

[`JSValuePointer`](../type-aliases/JSValuePointer.md)

***

### toHostRef()

> **toHostRef**<`T`>(`handle`): `HostRef`<`T`> | `undefined`

Defined in: [packages/quickjs-emscripten-core/src/context.ts:732](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L732)

If `handle` is a `HostRef<T>.handle`, return a new `HostRef<T>` instance wrapping the handle.

You must call HostRef#dispose or otherwise consume the HostRef#handle to ensure the handle is not leaked.

#### Type Parameters

##### T

`T` *extends* `object`

#### Parameters

##### handle

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

#### Returns

`HostRef`<`T`> | `undefined`

***

### typeof()

> **typeof**(`handle`): `string`

Defined in: [packages/quickjs-emscripten-core/src/context.ts:764](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L764)

`typeof` operator. **Not** [standards compliant](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof).

#### Parameters

##### handle

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

#### Returns

`string`

#### Remarks

Does not support BigInt values correctly.

#### Implementation of

[`LowLevelJavascriptVm`](../interfaces/LowLevelJavascriptVm.md).[`typeof`](../interfaces/LowLevelJavascriptVm.md#typeof)

***

### unwrapHostRef()

> **unwrapHostRef**<`T`>(`handle`): `T`

Defined in: [packages/quickjs-emscripten-core/src/context.ts:747](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L747)

If `handle` is a `HostRef<T>.handle`, return the host value `T`.

#### Type Parameters

##### T

`T` *extends* `object`

#### Parameters

##### handle

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

#### Returns

`T`

#### Throws

QuickJSHostRefInvalid if `handle` is not a `HostRef<T>.handle`

***

### unwrapResult()

> **unwrapResult**<`T`>(`result`): `T`

Defined in: [packages/quickjs-emscripten-core/src/context.ts:1398](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L1398)

Unwrap a SuccessOrFail result such as a [VmCallResult](../type-aliases/VmCallResult.md) or a
[ExecutePendingJobsResult](../type-aliases/ExecutePendingJobsResult.md), where the fail branch contains a handle to a QuickJS error value.
If the result is a success, returns the value.
If the result is an error, converts the error to a native object and throws the error.

#### Type Parameters

##### T

`T`

#### Parameters

##### result

[`SuccessOrFail`](../type-aliases/SuccessOrFail.md)<`T`, [`QuickJSHandle`](../type-aliases/QuickJSHandle.md)>

#### Returns

`T`
