[quickjs-emscripten](../README.md) / [Exports](../modules.md) / QuickJSDeferredPromise

# Class: QuickJSDeferredPromise

QuickJSDeferredPromise wraps a QuickJS promise [handle](QuickJSDeferredPromise.md#handle) and allows
[resolve](QuickJSDeferredPromise.md#resolve)ing or [reject](QuickJSDeferredPromise.md#reject)ing that promise. Use it to bridge asynchronous
code on the host to APIs inside a QuickJSContext.

Managing the lifetime of promises is tricky. There are three
[QuickJSHandle](../modules.md#quickjshandle)s inside of each deferred promise object: (1) the promise
itself, (2) the `resolve` callback, and (3) the `reject` callback.

- If the promise will be fulfilled before the end of it's [owner](QuickJSDeferredPromise.md#owner)'s lifetime,
  the only cleanup necessary is `deferred.handle.dispose()`, because
  calling [resolve](QuickJSDeferredPromise.md#resolve) or [reject](QuickJSDeferredPromise.md#reject) will dispose of both callbacks automatically.

- As the return value of a [VmFunctionImplementation](../modules.md#vmfunctionimplementation), return [handle](QuickJSDeferredPromise.md#handle),
  and ensure that either [resolve](QuickJSDeferredPromise.md#resolve) or [reject](QuickJSDeferredPromise.md#reject) will be called. No other
  clean-up is necessary.

- In other cases, call [dispose](QuickJSDeferredPromise.md#dispose), which will dispose [handle](QuickJSDeferredPromise.md#handle) as well as the
  QuickJS handles that back [resolve](QuickJSDeferredPromise.md#resolve) and [reject](QuickJSDeferredPromise.md#reject). For this object,
  [dispose](QuickJSDeferredPromise.md#dispose) is idempotent.

## Implements

- [`Disposable`](../interfaces/Disposable.md)

## Table of contents

### Constructors

- [constructor](QuickJSDeferredPromise.md#constructor)

### Properties

- [context](QuickJSDeferredPromise.md#context)
- [handle](QuickJSDeferredPromise.md#handle)
- [owner](QuickJSDeferredPromise.md#owner)
- [settled](QuickJSDeferredPromise.md#settled)

### Accessors

- [alive](QuickJSDeferredPromise.md#alive)

### Methods

- [dispose](QuickJSDeferredPromise.md#dispose)
- [reject](QuickJSDeferredPromise.md#reject)
- [resolve](QuickJSDeferredPromise.md#resolve)

## Constructors

### constructor

• **new QuickJSDeferredPromise**(`args`)

Use [QuickJSContext.newPromise](QuickJSContext.md#newpromise) to create a new promise instead of calling
this constructor directly.

**`unstable`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.context` | [`QuickJSContext`](QuickJSContext.md) |
| `args.promiseHandle` | [`QuickJSHandle`](../modules.md#quickjshandle) |
| `args.rejectHandle` | [`QuickJSHandle`](../modules.md#quickjshandle) |
| `args.resolveHandle` | [`QuickJSHandle`](../modules.md#quickjshandle) |

#### Defined in

[ts/deferred-promise.ts:53](https://github.com/justjake/quickjs-emscripten/blob/main/ts/deferred-promise.ts#L53)

## Properties

### context

• **context**: [`QuickJSContext`](QuickJSContext.md)

#### Defined in

[ts/deferred-promise.ts:30](https://github.com/justjake/quickjs-emscripten/blob/main/ts/deferred-promise.ts#L30)

___

### handle

• **handle**: [`QuickJSHandle`](../modules.md#quickjshandle)

A handle of the Promise instance inside the QuickJSContext.
You must dispose [handle](QuickJSDeferredPromise.md#handle) or the entire QuickJSDeferredPromise once you
are finished with it.

#### Defined in

[ts/deferred-promise.ts:37](https://github.com/justjake/quickjs-emscripten/blob/main/ts/deferred-promise.ts#L37)

___

### owner

• **owner**: [`QuickJSRuntime`](QuickJSRuntime.md)

#### Defined in

[ts/deferred-promise.ts:29](https://github.com/justjake/quickjs-emscripten/blob/main/ts/deferred-promise.ts#L29)

___

### settled

• **settled**: `Promise`<`void`\>

A native promise that will resolve once this deferred is settled.

#### Defined in

[ts/deferred-promise.ts:42](https://github.com/justjake/quickjs-emscripten/blob/main/ts/deferred-promise.ts#L42)

## Accessors

### alive

• `get` **alive**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[Disposable](../interfaces/Disposable.md).[alive](../interfaces/Disposable.md#alive)

#### Defined in

[ts/deferred-promise.ts:123](https://github.com/justjake/quickjs-emscripten/blob/main/ts/deferred-promise.ts#L123)

## Methods

### dispose

▸ **dispose**(): `void`

Dispose of the underlying resources used by this object.

#### Returns

`void`

#### Implementation of

[Disposable](../interfaces/Disposable.md).[dispose](../interfaces/Disposable.md#dispose)

#### Defined in

[ts/deferred-promise.ts:127](https://github.com/justjake/quickjs-emscripten/blob/main/ts/deferred-promise.ts#L127)

___

### reject

▸ **reject**(`value?`): `void`

Reject [handle](QuickJSDeferredPromise.md#handle) with the given value, if any.
Calling this method after calling [dispose](QuickJSDeferredPromise.md#dispose) is a no-op.

Note that after rejecting a promise, you may need to call
[[QuickJSContext.executePendingJobs]] to propagate the result to the promise's
callbacks.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | [`QuickJSHandle`](../modules.md#quickjshandle) |

#### Returns

`void`

#### Defined in

[ts/deferred-promise.ts:104](https://github.com/justjake/quickjs-emscripten/blob/main/ts/deferred-promise.ts#L104)

___

### resolve

▸ **resolve**(`value?`): `void`

Resolve [handle](QuickJSDeferredPromise.md#handle) with the given value, if any.
Calling this method after calling [dispose](QuickJSDeferredPromise.md#dispose) is a no-op.

Note that after resolving a promise, you may need to call
[[QuickJSContext.executePendingJobs]] to propagate the result to the promise's
callbacks.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | [`QuickJSHandle`](../modules.md#quickjshandle) |

#### Returns

`void`

#### Defined in

[ts/deferred-promise.ts:77](https://github.com/justjake/quickjs-emscripten/blob/main/ts/deferred-promise.ts#L77)
