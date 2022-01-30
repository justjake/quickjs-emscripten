[quickjs-emscripten](../README.md) / [Exports](../modules.md) / [deferred-promise](../modules/deferred_promise.md) / QuickJSDeferredPromise

# Class: QuickJSDeferredPromise

[deferred-promise](../modules/deferred_promise.md).QuickJSDeferredPromise

QuickJSDeferredPromise wraps a QuickJS promise [handle](deferred_promise.QuickJSDeferredPromise.md#handle) and allows
[resolve](deferred_promise.QuickJSDeferredPromise.md#resolve)ing or [reject](deferred_promise.QuickJSDeferredPromise.md#reject)ing that promise. Use it to bridge asynchronous
code on the host to APIs inside a QuickJSVm.

Managing the lifetime of promises is tricky. There are three
[QuickJSHandle](../modules/vm.md#quickjshandle)s inside of each deferred promise object: (1) the promise
itself, (2) the `resolve` callback, and (3) the `reject` callback.

- If the promise will be fulfilled before the end of it's [owner](deferred_promise.QuickJSDeferredPromise.md#owner)'s lifetime,
  the only cleanup necessary is `deferred.handle.dispose()`, because
  calling [resolve](deferred_promise.QuickJSDeferredPromise.md#resolve) or [reject](deferred_promise.QuickJSDeferredPromise.md#reject) will dispose of both callbacks automatically.

- As the return value of a [VmFunctionImplementation](../modules/vm_interface.md#vmfunctionimplementation), return [handle](deferred_promise.QuickJSDeferredPromise.md#handle),
  and ensure that either [resolve](deferred_promise.QuickJSDeferredPromise.md#resolve) or [reject](deferred_promise.QuickJSDeferredPromise.md#reject) will be called. No other
  clean-up is necessary.

- In other cases, call [dispose](deferred_promise.QuickJSDeferredPromise.md#dispose), which will dispose [handle](deferred_promise.QuickJSDeferredPromise.md#handle) as well as the
  QuickJS handles that back [resolve](deferred_promise.QuickJSDeferredPromise.md#resolve) and [reject](deferred_promise.QuickJSDeferredPromise.md#reject). For this object,
  [dispose](deferred_promise.QuickJSDeferredPromise.md#dispose) is idempotent.

## Implements

- [`Disposable`](../interfaces/lifetime.Disposable.md)

## Table of contents

### Constructors

- [constructor](deferred_promise.QuickJSDeferredPromise.md#constructor)

### Properties

- [handle](deferred_promise.QuickJSDeferredPromise.md#handle)
- [owner](deferred_promise.QuickJSDeferredPromise.md#owner)
- [settled](deferred_promise.QuickJSDeferredPromise.md#settled)

### Accessors

- [alive](deferred_promise.QuickJSDeferredPromise.md#alive)

### Methods

- [dispose](deferred_promise.QuickJSDeferredPromise.md#dispose)
- [reject](deferred_promise.QuickJSDeferredPromise.md#reject)
- [resolve](deferred_promise.QuickJSDeferredPromise.md#resolve)

## Constructors

### constructor

• **new QuickJSDeferredPromise**(`args`)

Use [QuickJSVm.newPromise](vm.QuickJSVm.md#newpromise) to create a new promise instead of calling
this constructor directly.

**`unstable`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.owner` | [`QuickJSVm`](vm.QuickJSVm.md) |
| `args.promiseHandle` | [`QuickJSHandle`](../modules/vm.md#quickjshandle) |
| `args.rejectHandle` | [`QuickJSHandle`](../modules/vm.md#quickjshandle) |
| `args.resolveHandle` | [`QuickJSHandle`](../modules/vm.md#quickjshandle) |

#### Defined in

[deferred-promise.ts:52](https://github.com/justjake/quickjs-emscripten/blob/master/ts/deferred-promise.ts#L52)

## Properties

### handle

• **handle**: [`QuickJSHandle`](../modules/vm.md#quickjshandle)

A handle of the Promise instance inside the QuickJSVm.
You must dispose [handle](deferred_promise.QuickJSDeferredPromise.md#handle) or the entire QuickJSDeferredPromise once you
are finished with it.

#### Defined in

[deferred-promise.ts:36](https://github.com/justjake/quickjs-emscripten/blob/master/ts/deferred-promise.ts#L36)

___

### owner

• **owner**: [`QuickJSVm`](vm.QuickJSVm.md)

The QuickJSVm this promise was created by.

#### Defined in

[deferred-promise.ts:29](https://github.com/justjake/quickjs-emscripten/blob/master/ts/deferred-promise.ts#L29)

___

### settled

• **settled**: `Promise`<`void`\>

A native promise that will resolve once this deferred is settled.

#### Defined in

[deferred-promise.ts:41](https://github.com/justjake/quickjs-emscripten/blob/master/ts/deferred-promise.ts#L41)

## Accessors

### alive

• `get` **alive**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[Disposable](../interfaces/lifetime.Disposable.md).[alive](../interfaces/lifetime.Disposable.md#alive)

#### Defined in

[deferred-promise.ts:121](https://github.com/justjake/quickjs-emscripten/blob/master/ts/deferred-promise.ts#L121)

## Methods

### dispose

▸ **dispose**(): `void`

Dispose of the underlying resources used by this object.

#### Returns

`void`

#### Implementation of

[Disposable](../interfaces/lifetime.Disposable.md).[dispose](../interfaces/lifetime.Disposable.md#dispose)

#### Defined in

[deferred-promise.ts:125](https://github.com/justjake/quickjs-emscripten/blob/master/ts/deferred-promise.ts#L125)

___

### reject

▸ **reject**(`value?`): `void`

Reject [handle](deferred_promise.QuickJSDeferredPromise.md#handle) with the given value, if any.
Calling this method after calling [dispose](deferred_promise.QuickJSDeferredPromise.md#dispose) is a no-op.

Note that after rejecting a promise, you may need to call
[QuickJSVm.executePendingJobs](vm.QuickJSVm.md#executependingjobs) to propagate the result to the promise's
callbacks.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | [`QuickJSHandle`](../modules/vm.md#quickjshandle) |

#### Returns

`void`

#### Defined in

[deferred-promise.ts:102](https://github.com/justjake/quickjs-emscripten/blob/master/ts/deferred-promise.ts#L102)

___

### resolve

▸ **resolve**(`value?`): `void`

Resolve [handle](deferred_promise.QuickJSDeferredPromise.md#handle) with the given value, if any.
Calling this method after calling [dispose](deferred_promise.QuickJSDeferredPromise.md#dispose) is a no-op.

Note that after resolving a promise, you may need to call
[QuickJSVm.executePendingJobs](vm.QuickJSVm.md#executependingjobs) to propagate the result to the promise's
callbacks.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | [`QuickJSHandle`](../modules/vm.md#quickjshandle) |

#### Returns

`void`

#### Defined in

[deferred-promise.ts:75](https://github.com/justjake/quickjs-emscripten/blob/master/ts/deferred-promise.ts#L75)
