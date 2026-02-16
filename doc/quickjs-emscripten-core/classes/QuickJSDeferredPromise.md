[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../README.md) / QuickJSDeferredPromise

# Class: QuickJSDeferredPromise

Defined in: [packages/quickjs-emscripten-core/src/deferred-promise.ts:71](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/deferred-promise.ts#L71)

QuickJSDeferredPromise wraps a QuickJS promise [handle](#handle) and allows
[resolve](#resolve)ing or [reject](#reject)ing that promise. Use it to bridge asynchronous
code on the host to APIs inside a QuickJSContext.

Managing the lifetime of promises is tricky. There are three
[QuickJSHandle](../type-aliases/QuickJSHandle.md)s inside of each deferred promise object: (1) the promise
itself, (2) the `resolve` callback, and (3) the `reject` callback.

* If the promise will be fulfilled before the end of it's [owner](#owner)'s lifetime,
  the only cleanup necessary is `deferred.handle.dispose()`, because
  calling [resolve](#resolve) or [reject](#reject) will dispose of both callbacks automatically.

* As the return value of a [VmFunctionImplementation](../type-aliases/VmFunctionImplementation.md), return [handle](#handle),
  and ensure that either [resolve](#resolve) or [reject](#reject) will be called. No other
  clean-up is necessary.

* In other cases, call [dispose](#dispose-1), which will dispose [handle](#handle) as well as the
  QuickJS handles that back [resolve](#resolve) and [reject](#reject). For this object,
  [dispose](#dispose-1) is idempotent.

- [Extends](#extends)

- [Implements](#implements)

- [Constructors](#constructors)

  * [Constructor](#constructor)

- [Properties](#properties)

  * [context](#context-1)
  * [handle](#handle)
  * [owner](#owner)
  * [settled](#settled)

- [Accessors](#accessors)

  * [alive](#alive)

- [Methods](#methods)

  * [\[dispose\]()](#dispose)
  * [dispose()](#dispose-1)
  * [reject()](#reject)
  * [resolve()](#resolve)

## Extends

* [`UsingDisposable`](UsingDisposable.md)

## Implements

* [`Disposable`](../interfaces/Disposable.md)

## Constructors

### Constructor

> **new QuickJSDeferredPromise**(`args`): `QuickJSDeferredPromise`

Defined in: [packages/quickjs-emscripten-core/src/deferred-promise.ts:95](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/deferred-promise.ts#L95)

Use [QuickJSContext#newPromise](QuickJSContext.md#newpromise) to create a new promise instead of calling
this constructor directly.

#### Parameters

##### args

###### context

[`QuickJSContext`](QuickJSContext.md)

###### promiseHandle

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

###### rejectHandle

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

###### resolveHandle

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

#### Returns

`QuickJSDeferredPromise`

#### Overrides

[`UsingDisposable`](UsingDisposable.md).[`constructor`](UsingDisposable.md#constructor)

## Properties

### context

> **context**: [`QuickJSContext`](QuickJSContext.md)

Defined in: [packages/quickjs-emscripten-core/src/deferred-promise.ts:73](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/deferred-promise.ts#L73)

***

### handle

> **handle**: [`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

Defined in: [packages/quickjs-emscripten-core/src/deferred-promise.ts:80](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/deferred-promise.ts#L80)

A handle of the Promise instance inside the QuickJSContext.
You must dispose [handle](#handle) or the entire QuickJSDeferredPromise once you
are finished with it.

***

### owner

> **owner**: [`QuickJSRuntime`](QuickJSRuntime.md)

Defined in: [packages/quickjs-emscripten-core/src/deferred-promise.ts:72](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/deferred-promise.ts#L72)

***

### settled

> **settled**: `Promise`<`void`>

Defined in: [packages/quickjs-emscripten-core/src/deferred-promise.ts:85](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/deferred-promise.ts#L85)

A native promise that will resolve once this deferred is settled.

## Accessors

### alive

#### Get Signature

> **get** **alive**(): `boolean`

Defined in: [packages/quickjs-emscripten-core/src/deferred-promise.ts:166](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/deferred-promise.ts#L166)

##### Returns

`boolean`

true if the object is alive

#### Implementation of

[`Disposable`](../interfaces/Disposable.md).[`alive`](../interfaces/Disposable.md#alive)

#### Overrides

[`UsingDisposable`](UsingDisposable.md).[`alive`](UsingDisposable.md#alive)

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

### dispose()

> **dispose**(): `void`

Defined in: [packages/quickjs-emscripten-core/src/deferred-promise.ts:170](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/deferred-promise.ts#L170)

Dispose of the underlying resources used by this object.

#### Returns

`void`

#### Implementation of

[`Disposable`](../interfaces/Disposable.md).[`dispose`](../interfaces/Disposable.md#dispose-1)

#### Overrides

[`UsingDisposable`](UsingDisposable.md).[`dispose`](UsingDisposable.md#dispose-1)

***

### reject()

> **reject**(`value?`): `void`

Defined in: [packages/quickjs-emscripten-core/src/deferred-promise.ts:147](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/deferred-promise.ts#L147)

Reject [handle](#handle) with the given value, if any.
Calling this method after calling [dispose](#dispose-1) is a no-op.

Note that after rejecting a promise, you may need to call
[QuickJSRuntime#executePendingJobs](QuickJSRuntime.md#executependingjobs) to propagate the result to the promise's
callbacks.

#### Parameters

##### value?

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

#### Returns

`void`

***

### resolve()

> **resolve**(`value?`): `void`

Defined in: [packages/quickjs-emscripten-core/src/deferred-promise.ts:120](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/deferred-promise.ts#L120)

Resolve [handle](#handle) with the given value, if any.
Calling this method after calling [dispose](#dispose-1) is a no-op.

Note that after resolving a promise, you may need to call
[QuickJSRuntime#executePendingJobs](QuickJSRuntime.md#executependingjobs) to propagate the result to the promise's
callbacks.

#### Parameters

##### value?

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

#### Returns

`void`
