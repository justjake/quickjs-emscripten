[quickjs-emscripten](../../packages.md) • **quickjs-emscripten** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../exports.md) / QuickJSDeferredPromise

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

- In other cases, call [dispose](QuickJSDeferredPromise.md#dispose), which will dispose [handle](QuickJSDeferredPromise.md#handle) as well as the
  QuickJS handles that back [resolve](QuickJSDeferredPromise.md#resolve) and [reject](QuickJSDeferredPromise.md#reject). For this object,
  [dispose](QuickJSDeferredPromise.md#dispose) is idempotent.

## Contents

- [Implements](QuickJSDeferredPromise.md#implements)
- [Constructors](QuickJSDeferredPromise.md#constructors)
  - [new QuickJSDeferredPromise(args)](QuickJSDeferredPromise.md#new-quickjsdeferredpromiseargs)
- [Properties](QuickJSDeferredPromise.md#properties)
  - [context](QuickJSDeferredPromise.md#context)
  - [dispose](QuickJSDeferredPromise.md#dispose)
  - [handle](QuickJSDeferredPromise.md#handle)
  - [owner](QuickJSDeferredPromise.md#owner)
  - [reject](QuickJSDeferredPromise.md#reject)
  - [resolve](QuickJSDeferredPromise.md#resolve)
  - [settled](QuickJSDeferredPromise.md#settled)
- [Accessors](QuickJSDeferredPromise.md#accessors)
  - [alive](QuickJSDeferredPromise.md#alive)

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

#### Source

quickjs-emscripten-core/dist/index.d.ts:639

## Properties

### context

> **context**: [`QuickJSContext`](QuickJSContext.md)

#### Source

quickjs-emscripten-core/dist/index.d.ts:621

***

### dispose

> **dispose**: () => `void`

#### Returns

`void`

#### Implementation of

[`quickjs-emscripten.Disposable.dispose`](../interfaces/Disposable.md#dispose)

#### Source

quickjs-emscripten-core/dist/index.d.ts:664

***

### handle

> **handle**: [`QuickJSHandle`](../exports.md#quickjshandle)

A handle of the Promise instance inside the QuickJSContext.
You must dispose [handle](QuickJSDeferredPromise.md#handle) or the entire QuickJSDeferredPromise once you
are finished with it.

#### Source

quickjs-emscripten-core/dist/index.d.ts:627

***

### owner

> **owner**: [`QuickJSRuntime`](QuickJSRuntime.md)

#### Source

quickjs-emscripten-core/dist/index.d.ts:620

***

### reject

> **reject**: (`value`?) => `void`

Reject [handle](QuickJSDeferredPromise.md#handle) with the given value, if any.
Calling this method after calling [dispose](QuickJSDeferredPromise.md#dispose) is a no-op.

Note that after rejecting a promise, you may need to call
[QuickJSRuntime#executePendingJobs](QuickJSRuntime.md#executependingjobs) to propagate the result to the promise's
callbacks.

#### Parameters

• **value?**: [`QuickJSHandle`](../exports.md#quickjshandle)

#### Returns

`void`

#### Source

quickjs-emscripten-core/dist/index.d.ts:662

***

### resolve

> **resolve**: (`value`?) => `void`

Resolve [handle](QuickJSDeferredPromise.md#handle) with the given value, if any.
Calling this method after calling [dispose](QuickJSDeferredPromise.md#dispose) is a no-op.

Note that after resolving a promise, you may need to call
[QuickJSRuntime#executePendingJobs](QuickJSRuntime.md#executependingjobs) to propagate the result to the promise's
callbacks.

#### Parameters

• **value?**: [`QuickJSHandle`](../exports.md#quickjshandle)

#### Returns

`void`

#### Source

quickjs-emscripten-core/dist/index.d.ts:653

***

### settled

> **settled**: `Promise`\<`void`\>

A native promise that will resolve once this deferred is settled.

#### Source

quickjs-emscripten-core/dist/index.d.ts:631

## Accessors

### alive

> **`get`** **alive**(): `boolean`

#### Returns

`boolean`

true if the object is alive

false after the object has been [dispose](QuickJSDeferredPromise.md#dispose)d

#### Source

quickjs-emscripten-core/dist/index.d.ts:663

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
