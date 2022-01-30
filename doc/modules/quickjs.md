[quickjs-emscripten](../README.md) / [Exports](../modules.md) / quickjs

# Module: quickjs

## Table of contents

### References

- [Disposable](quickjs.md#disposable)
- [ExecutePendingJobsResult](quickjs.md#executependingjobsresult)
- [InterruptHandler](quickjs.md#interrupthandler)
- [JSValue](quickjs.md#jsvalue)
- [JSValueConst](quickjs.md#jsvalueconst)
- [Lifetime](quickjs.md#lifetime)
- [QuickJSDeferredPromise](quickjs.md#quickjsdeferredpromise)
- [QuickJSEvalOptions](quickjs.md#quickjsevaloptions)
- [QuickJSHandle](quickjs.md#quickjshandle)
- [QuickJSPropertyKey](quickjs.md#quickjspropertykey)
- [QuickJSVm](quickjs.md#quickjsvm)
- [Scope](quickjs.md#scope)
- [StaticJSValue](quickjs.md#staticjsvalue)
- [StaticLifetime](quickjs.md#staticlifetime)
- [WeakLifetime](quickjs.md#weaklifetime)

### Classes

- [QuickJS](../classes/quickjs.QuickJS.md)

### Functions

- [getQuickJS](quickjs.md#getquickjs)
- [getQuickJSSync](quickjs.md#getquickjssync)
- [shouldInterruptAfterDeadline](quickjs.md#shouldinterruptafterdeadline)

## References

### Disposable

Re-exports [Disposable](../interfaces/lifetime.Disposable.md)

___

### ExecutePendingJobsResult

Re-exports [ExecutePendingJobsResult](quickjsvm.md#executependingjobsresult)

___

### InterruptHandler

Re-exports [InterruptHandler](quickjsvm.md#interrupthandler)

___

### JSValue

Re-exports [JSValue](quickjsvm.md#jsvalue)

___

### JSValueConst

Re-exports [JSValueConst](quickjsvm.md#jsvalueconst)

___

### Lifetime

Re-exports [Lifetime](../classes/lifetime.Lifetime.md)

___

### QuickJSDeferredPromise

Re-exports [QuickJSDeferredPromise](../classes/deferred_promise.QuickJSDeferredPromise.md)

___

### QuickJSEvalOptions

Re-exports [QuickJSEvalOptions](../interfaces/quickjsvm.QuickJSEvalOptions.md)

___

### QuickJSHandle

Re-exports [QuickJSHandle](quickjsvm.md#quickjshandle)

___

### QuickJSPropertyKey

Re-exports [QuickJSPropertyKey](quickjsvm.md#quickjspropertykey)

___

### QuickJSVm

Re-exports [QuickJSVm](../classes/quickjsvm.QuickJSVm.md)

___

### Scope

Re-exports [Scope](../classes/lifetime.Scope.md)

___

### StaticJSValue

Re-exports [StaticJSValue](quickjsvm.md#staticjsvalue)

___

### StaticLifetime

Re-exports [StaticLifetime](../classes/lifetime.StaticLifetime.md)

___

### WeakLifetime

Re-exports [WeakLifetime](../classes/lifetime.WeakLifetime.md)

## Functions

### getQuickJS

▸ **getQuickJS**(): `Promise`<[`QuickJS`](../classes/quickjs.QuickJS.md)\>

This is the top-level entrypoint for the quickjs-emscripten library.
Get the root QuickJS API.

#### Returns

`Promise`<[`QuickJS`](../classes/quickjs.QuickJS.md)\>

#### Defined in

[quickjs.ts:292](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L292)

___

### getQuickJSSync

▸ **getQuickJSSync**(): [`QuickJS`](../classes/quickjs.QuickJS.md)

Provides synchronous access to the QuickJS API once [getQuickJS](quickjs.md#getquickjs) has resolved at
least once.

**`throws`** If called before `getQuickJS` resolves.

#### Returns

[`QuickJS`](../classes/quickjs.QuickJS.md)

#### Defined in

[quickjs.ts:301](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L301)

___

### shouldInterruptAfterDeadline

▸ **shouldInterruptAfterDeadline**(`deadline`): [`InterruptHandler`](quickjsvm.md#interrupthandler)

Returns an interrupt handler that interrupts Javascript execution after a deadline time.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `deadline` | `number` \| `Date` | Interrupt execution if it's still running after this time.   Number values are compared against `Date.now()` |

#### Returns

[`InterruptHandler`](quickjsvm.md#interrupthandler)

#### Defined in

[quickjs.ts:274](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L274)
