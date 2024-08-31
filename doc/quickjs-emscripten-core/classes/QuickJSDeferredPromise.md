[quickjs-emscripten](../../packages.md) • **quickjs-emscripten-core** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../exports.md) / QuickJSDeferredPromise

# Class: QuickJSDeferredPromise

QuickJSDeferredPromise wraps a QuickJS promise [handle](QuickJSDeferredPromise.md#handle) and allows
[resolve](QuickJSDeferredPromise.md#resolve)ing or [reject](QuickJSDeferredPromise.md#reject)ing that promise. Use it to bridge asynchronous
code on the host to APIs inside a QuickJSContext.

Managing the lifetime of promises is tricky. There are three
[QuickJSHandle](../exports.md#quickjshandle)s inside of each deferred promise object: (1) the promise
itself, (2) the `resolve` callback, and (3) the `reject` callback.

- If the promise will be fulfilled before the end of it's [owner](QuickJSDeferredPromise.md#owner)'s lifetime,
  the only cleanup necessary is `deferred.handle.dispose()`, because
  calling [resolve](QuickJSDeferredPromise.md#resolve) or [reject](QuickJSDeferredPromise.md#reject) will dispose of both callbacks automatically.

- As the return value of a [VmFunctionImplementation](../exports.md#vmfunctionimplementationvmhandle), return [handle](QuickJSDeferredPromise.md#handle),
  and ensure that either [resolve](QuickJSDeferredPromise.md#resolve) or [reject](QuickJSDeferredPromise.md#reject) will be called. No other
  clean-up is necessary.

- In other cases, call [dispose](QuickJSDeferredPromise.md#dispose-1), which will dispose [handle](QuickJSDeferredPromise.md#handle) as well as the
  QuickJS handles that back [resolve](QuickJSDeferredPromise.md#resolve) and [reject](QuickJSDeferredPromise.md#reject). For this object,
  [dispose](QuickJSDeferredPromise.md#dispose-1) is idempotent.

## Contents

- [Extends](QuickJSDeferredPromise.md#extends)
- [Implements](QuickJSDeferredPromise.md#implements)
- [Constructors](QuickJSDeferredPromise.md#constructors)
  - [new QuickJSDeferredPromise(args)](QuickJSDeferredPromise.md#new-quickjsdeferredpromiseargs)
- [Properties](QuickJSDeferredPromise.md#properties)
  - [context](QuickJSDeferredPromise.md#context)
  - [handle](QuickJSDeferredPromise.md#handle)
  - [owner](QuickJSDeferredPromise.md#owner)
  - [settled](QuickJSDeferredPromise.md#settled)
- [Accessors](QuickJSDeferredPromise.md#accessors)
  - [alive](QuickJSDeferredPromise.md#alive)
- [Methods](QuickJSDeferredPromise.md#methods)
  - [`[dispose]`()](QuickJSDeferredPromise.md#dispose)
  - [dispose()](QuickJSDeferredPromise.md#dispose)
  - [reject()](QuickJSDeferredPromise.md#reject)
  - [resolve()](QuickJSDeferredPromise.md#resolve)

## Extends

- [`UsingDisposable`](UsingDisposable.md)

## Implements

- [`Disposable`](../interfaces/Disposable.md)

## Constructors

### new QuickJSDeferredPromise(args)

> **new QuickJSDeferredPromise**(`args`): [`QuickJSDeferredPromise`](QuickJSDeferredPromise.md)

Use [QuickJSContext#newPromise](QuickJSContext.md#newpromise) to create a new promise instead of calling
this constructor directly.

#### Parameters

• **args**: `Object`

• **args\.context**: [`QuickJSContext`](QuickJSContext.md)

• **args\.promiseHandle**: [`QuickJSHandle`](../exports.md#quickjshandle)

• **args\.rejectHandle**: [`QuickJSHandle`](../exports.md#quickjshandle)

• **args\.resolveHandle**: [`QuickJSHandle`](../exports.md#quickjshandle)

#### Returns

[`QuickJSDeferredPromise`](QuickJSDeferredPromise.md)

#### Overrides

[`quickjs-emscripten-core.UsingDisposable.constructor`](UsingDisposable.md#constructors)

#### Source

[packages/quickjs-emscripten-core/src/deferred-promise.ts:95](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/deferred-promise.ts#L95)

## Properties

### context

> **context**: [`QuickJSContext`](QuickJSContext.md)

#### Source

[packages/quickjs-emscripten-core/src/deferred-promise.ts:73](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/deferred-promise.ts#L73)

***

### handle

> **handle**: [`QuickJSHandle`](../exports.md#quickjshandle)

A handle of the Promise instance inside the QuickJSContext.
You must dispose [handle](QuickJSDeferredPromise.md#handle) or the entire QuickJSDeferredPromise once you
are finished with it.

#### Source

[packages/quickjs-emscripten-core/src/deferred-promise.ts:80](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/deferred-promise.ts#L80)

***

### owner

> **owner**: [`QuickJSRuntime`](QuickJSRuntime.md)

#### Source

[packages/quickjs-emscripten-core/src/deferred-promise.ts:72](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/deferred-promise.ts#L72)

***

### settled

> **settled**: `Promise`\<`void`\>

A native promise that will resolve once this deferred is settled.

#### Source

[packages/quickjs-emscripten-core/src/deferred-promise.ts:85](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/deferred-promise.ts#L85)

## Accessors

### alive

> **`get`** **alive**(): `boolean`

#### Returns

`boolean`

true if the object is alive

false after the object has been [dispose](QuickJSDeferredPromise.md#dispose-1)d

#### Source

[packages/quickjs-emscripten-core/src/deferred-promise.ts:166](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/deferred-promise.ts#L166)

## Methods

### `[dispose]`()

> **[dispose]**(): `void`

Just calls the standard .dispose() method of this class.

#### Returns

`void`

#### Implementation of

[`quickjs-emscripten-core.Disposable.[dispose]`](../interfaces/Disposable.md#dispose)

#### Inherited from

[`quickjs-emscripten-core.UsingDisposable.[dispose]`](UsingDisposable.md#dispose)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:47](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L47)

***

### dispose()

> **dispose**(): `void`

Dispose of the underlying resources used by this object.

#### Returns

`void`

#### Implementation of

[`quickjs-emscripten-core.Disposable.dispose`](../interfaces/Disposable.md#dispose-1)

#### Overrides

[`quickjs-emscripten-core.UsingDisposable.dispose`](UsingDisposable.md#abstract-dispose)

#### Source

[packages/quickjs-emscripten-core/src/deferred-promise.ts:170](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/deferred-promise.ts#L170)

***

### reject()

> **reject**(`value`?): `void`

Reject [handle](QuickJSDeferredPromise.md#handle) with the given value, if any.
Calling this method after calling [dispose](QuickJSDeferredPromise.md#dispose-1) is a no-op.

Note that after rejecting a promise, you may need to call
[QuickJSRuntime#executePendingJobs](QuickJSRuntime.md#executependingjobs) to propagate the result to the promise's
callbacks.

#### Parameters

• **value?**: [`QuickJSHandle`](../exports.md#quickjshandle)

#### Returns

`void`

#### Source

[packages/quickjs-emscripten-core/src/deferred-promise.ts:147](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/deferred-promise.ts#L147)

***

### resolve()

> **resolve**(`value`?): `void`

Resolve [handle](QuickJSDeferredPromise.md#handle) with the given value, if any.
Calling this method after calling [dispose](QuickJSDeferredPromise.md#dispose-1) is a no-op.

Note that after resolving a promise, you may need to call
[QuickJSRuntime#executePendingJobs](QuickJSRuntime.md#executependingjobs) to propagate the result to the promise's
callbacks.

#### Parameters

• **value?**: [`QuickJSHandle`](../exports.md#quickjshandle)

#### Returns

`void`

#### Source

[packages/quickjs-emscripten-core/src/deferred-promise.ts:120](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/deferred-promise.ts#L120)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
