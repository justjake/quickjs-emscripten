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

### Functions

- [getQuickJS](quickjs.md#getquickjs)
- [getQuickJSSync](quickjs.md#getquickjssync)
- [shouldInterruptAfterDeadline](quickjs.md#shouldinterruptafterdeadline)

## References

### Disposable

Re-exports [Disposable](../interfaces/lifetime.Disposable.md)

___

### ExecutePendingJobsResult

Re-exports [ExecutePendingJobsResult](vm.md#executependingjobsresult)

___

### InterruptHandler

Re-exports [InterruptHandler](vm.md#interrupthandler)

___

### JSValue

Re-exports [JSValue](vm.md#jsvalue)

___

### JSValueConst

Re-exports [JSValueConst](vm.md#jsvalueconst)

___

### Lifetime

Re-exports [Lifetime](../classes/lifetime.Lifetime.md)

___

### QuickJSDeferredPromise

Re-exports [QuickJSDeferredPromise](../classes/deferred_promise.QuickJSDeferredPromise.md)

___

### QuickJSEvalOptions

Re-exports [QuickJSEvalOptions](../interfaces/vm.QuickJSEvalOptions.md)

___

### QuickJSHandle

Re-exports [QuickJSHandle](vm.md#quickjshandle)

___

### QuickJSPropertyKey

Re-exports [QuickJSPropertyKey](vm.md#quickjspropertykey)

___

### QuickJSVm

Re-exports [QuickJSVm](../classes/vm.QuickJSVm.md)

___

### Scope

Re-exports [Scope](../classes/lifetime.Scope.md)

___

### StaticJSValue

Re-exports [StaticJSValue](vm.md#staticjsvalue)

___

### StaticLifetime

Re-exports [StaticLifetime](../classes/lifetime.StaticLifetime.md)

___

### WeakLifetime

Re-exports [WeakLifetime](../classes/lifetime.WeakLifetime.md)

## Functions

### getQuickJS

▸ **getQuickJS**(): `Promise`<`QuickJS`\>

This is the top-level entrypoint for the quickjs-emscripten library.
Get the root QuickJS API.

#### Returns

`Promise`<`QuickJS`\>

#### Defined in

[quickjs.ts:291](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L291)

___

### getQuickJSSync

▸ **getQuickJSSync**(): `QuickJS`

Provides synchronous access to the QuickJS API once [getQuickJS](quickjs.md#getquickjs) has resolved at
least once.

**`throws`** If called before `getQuickJS` resolves.

#### Returns

`QuickJS`

#### Defined in

[quickjs.ts:300](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L300)

___

### shouldInterruptAfterDeadline

▸ **shouldInterruptAfterDeadline**(`deadline`): [`InterruptHandler`](vm.md#interrupthandler)

Returns an interrupt handler that interrupts Javascript execution after a deadline time.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `deadline` | `number` \| `Date` | Interrupt execution if it's still running after this time.   Number values are compared against `Date.now()` |

#### Returns

[`InterruptHandler`](vm.md#interrupthandler)

#### Defined in

[quickjs.ts:273](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L273)
