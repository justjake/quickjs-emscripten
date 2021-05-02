[quickjs-emscripten](../README.md) › [Globals](../globals.md) › [QuickJSDeferredPromise](quickjsdeferredpromise.md)

# Class: QuickJSDeferredPromise

QuickJSDeferredPromise wraps a QuickJS promise [handle](quickjsdeferredpromise.md#handle) and allows
[resolve](quickjsdeferredpromise.md#resolve)ing or [reject](quickjsdeferredpromise.md#reject)ing that promise. Use it to bridge asynchronous
code on the host to APIs inside a QuickJSVm.

Managing the lifetime of promises is tricky. There are three
[QuickJSHandle](../globals.md#quickjshandle)s inside of each deferred promise object: (1) the promise
itself, (2) the `resolve` callback, and (3) the `reject` callback.

- If the promise will be fufilled before the end of it's [owner](quickjsdeferredpromise.md#owner)'s lifetime,
  the only cleanup necessary is `deferred.handle.dispose()`, because
  calling [resolve](quickjsdeferredpromise.md#resolve) or [reject](quickjsdeferredpromise.md#reject) will dispose of both callbacks automatically.

- As the return value of a [VmFunctionImplementation](../globals.md#vmfunctionimplementation), return [handle](quickjsdeferredpromise.md#handle),
  and ensure that either [resolve](quickjsdeferredpromise.md#resolve) or [reject](quickjsdeferredpromise.md#reject) will be called. No other
  clean-up is necessary.

- In other cases, call [dispose](quickjsdeferredpromise.md#dispose), which will dispose [handle](quickjsdeferredpromise.md#handle) as well as the
  QuickJS handles that back [resolve](quickjsdeferredpromise.md#resolve) and [reject](quickjsdeferredpromise.md#reject). For this object,
  [dispose](quickjsdeferredpromise.md#dispose) is idempotent.

## Hierarchy

* **QuickJSDeferredPromise**

## Implements

* [Disposable](../interfaces/disposable.md)

## Index

### Constructors

* [constructor](quickjsdeferredpromise.md#constructor)

### Properties

* [handle](quickjsdeferredpromise.md#handle)
* [owner](quickjsdeferredpromise.md#owner)
* [settled](quickjsdeferredpromise.md#settled)

### Accessors

* [alive](quickjsdeferredpromise.md#alive)

### Methods

* [dispose](quickjsdeferredpromise.md#dispose)
* [reject](quickjsdeferredpromise.md#reject)
* [resolve](quickjsdeferredpromise.md#resolve)

## Constructors

###  constructor

\+ **new QuickJSDeferredPromise**(`args`: object): *[QuickJSDeferredPromise](quickjsdeferredpromise.md)*

*Defined in [quickjs.ts:109](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L109)*

Use [QuickJSVm.newPromise](quickjsvm.md#newpromise) to create a new promise instead of calling
this constructor directly.

**`unstable`** 

**Parameters:**

Name | Type |
------ | ------ |
`args` | object |

**Returns:** *[QuickJSDeferredPromise](quickjsdeferredpromise.md)*

## Properties

###  handle

• **handle**: *[QuickJSHandle](../globals.md#quickjshandle)*

*Defined in [quickjs.ts:100](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L100)*

A handle of the Promise instance inside the QuickJSVm.
You must dispose [handle](quickjsdeferredpromise.md#handle) or the entire QuickJSDeferredPromise once you
are finished with it.

___

###  owner

• **owner**: *[QuickJSVm](quickjsvm.md)*

*Defined in [quickjs.ts:93](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L93)*

The QuickJSVm this promise was created by.

___

###  settled

• **settled**: *Promise‹void›*

*Defined in [quickjs.ts:105](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L105)*

A native promise that will resolve once this deferred is settled.

## Accessors

###  alive

• **get alive**(): *boolean*

*Defined in [quickjs.ts:185](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L185)*

**Returns:** *boolean*

## Methods

###  dispose

▸ **dispose**(): *void*

*Implementation of [Disposable](../interfaces/disposable.md)*

*Defined in [quickjs.ts:189](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L189)*

**Returns:** *void*

___

###  reject

▸ **reject**(`value?`: [QuickJSHandle](../globals.md#quickjshandle)): *void*

*Defined in [quickjs.ts:166](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L166)*

Reject [handle](quickjsdeferredpromise.md#handle) with the given value, if any.
Calling this method after calling [dispose](quickjsdeferredpromise.md#dispose) is a no-op.

Note that after rejecting a promise, you may need to call
[QuickJSVm.executePendingJobs](quickjsvm.md#executependingjobs) to propagate the result to the promise's
callbacks.

**Parameters:**

Name | Type |
------ | ------ |
`value?` | [QuickJSHandle](../globals.md#quickjshandle) |

**Returns:** *void*

___

###  resolve

▸ **resolve**(`value?`: [QuickJSHandle](../globals.md#quickjshandle)): *void*

*Defined in [quickjs.ts:139](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L139)*

Resolve [handle](quickjsdeferredpromise.md#handle) with the given value, if any.
Calling this method after calling [dispose](quickjsdeferredpromise.md#dispose) is a no-op.

Note that after resolving a promise, you may need to call
[QuickJSVm.executePendingJobs](quickjsvm.md#executependingjobs) to propagate the result to the promise's
callbacks.

**Parameters:**

Name | Type |
------ | ------ |
`value?` | [QuickJSHandle](../globals.md#quickjshandle) |

**Returns:** *void*
