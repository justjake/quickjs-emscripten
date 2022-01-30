[quickjs-emscripten](../README.md) / [Exports](../modules.md) / vm

# Module: vm

## Table of contents

### Classes

- [QuickJSVm](../classes/vm.QuickJSVm.md)

### Interfaces

- [QuickJSEvalOptions](../interfaces/vm.QuickJSEvalOptions.md)

### Type aliases

- [ExecutePendingJobsResult](vm.md#executependingjobsresult)
- [InterruptHandler](vm.md#interrupthandler)
- [JSValue](vm.md#jsvalue)
- [JSValueConst](vm.md#jsvalueconst)
- [QuickJSHandle](vm.md#quickjshandle)
- [QuickJSPropertyKey](vm.md#quickjspropertykey)
- [StaticJSValue](vm.md#staticjsvalue)

## Type aliases

### ExecutePendingJobsResult

Ƭ **ExecutePendingJobsResult**: [`SuccessOrFail`](vm_interface.md#successorfail)<`number`, [`QuickJSHandle`](vm.md#quickjshandle)\>

Used as an optional for the results of executing pendingJobs.
On success, `value` contains the number of async jobs executed
by the runtime.
`{ value: number } | { error: QuickJSHandle }`.

#### Defined in

[vm.ts:104](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L104)

___

### InterruptHandler

Ƭ **InterruptHandler**: (`vm`: [`QuickJSVm`](../classes/vm.QuickJSVm.md)) => `boolean` \| `undefined`

#### Type declaration

▸ (`vm`): `boolean` \| `undefined`

Callback called regularly while the VM executes code.
Determines if a VM's execution should be interrupted.

##### Parameters

| Name | Type |
| :------ | :------ |
| `vm` | [`QuickJSVm`](../classes/vm.QuickJSVm.md) |

##### Returns

`boolean` \| `undefined`

`true` to interrupt JS execution inside the VM.

#### Defined in

[vm.ts:90](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L90)

___

### JSValue

Ƭ **JSValue**: [`Lifetime`](../classes/lifetime.Lifetime.md)<[`JSValuePointer`](ffi_types.md#jsvaluepointer), [`JSValuePointer`](ffi_types.md#jsvaluepointer), [`QuickJSVm`](../classes/vm.QuickJSVm.md)\>

A owned QuickJSHandle that should be disposed or returned.

The QuickJS interpreter passes Javascript values between functions as
`JSValue` structs that references some internal data. Because passing
structs cross the Empscripten FFI interfaces is bothersome, we use pointers
to these structs instead.

A JSValue reference is "owned" in its scope. before exiting the scope, it
should be freed,  by calling `JS_FreeValue(ctx, js_value)`) or returned from
the scope. We extend that contract - a JSValuePointer (`JSValue*`) must also
be `free`d.

You can do so from Javascript by calling the .dispose() method.

#### Defined in

[vm.ts:56](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L56)

___

### JSValueConst

Ƭ **JSValueConst**: [`Lifetime`](../classes/lifetime.Lifetime.md)<[`JSValueConstPointer`](ffi_types.md#jsvalueconstpointer), [`JSValuePointer`](ffi_types.md#jsvaluepointer), [`QuickJSVm`](../classes/vm.QuickJSVm.md)\>

A QuickJSHandle to a borrowed value that does not need to be disposed.

In QuickJS, a JSValueConst is a "borrowed" reference that isn't owned by the
current scope. That means that the current scope should not `JS_FreeValue`
it, or retain a reference to it after the scope exits, because it may be
freed by its owner.

quickjs-emscripten takes care of disposing JSValueConst references.

#### Defined in

[vm.ts:39](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L39)

___

### QuickJSHandle

Ƭ **QuickJSHandle**: [`StaticJSValue`](vm.md#staticjsvalue) \| [`JSValue`](vm.md#jsvalue) \| [`JSValueConst`](vm.md#jsvalueconst)

Wraps a C pointer to a QuickJS JSValue, which represents a Javascript value inside
a QuickJS virtual machine.

Values must not be shared between QuickJSVm instances.
You must dispose of any handles you create by calling the `.dispose()` method.

#### Defined in

[vm.ts:65](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L65)

___

### QuickJSPropertyKey

Ƭ **QuickJSPropertyKey**: `number` \| `string` \| [`QuickJSHandle`](vm.md#quickjshandle)

Property key for getting or setting a property on a handle with
[QuickJSVm.getProp], [QuickJSVm.setProp], or [QuickJSVm.defineProp].

#### Defined in

[vm.ts:96](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L96)

___

### StaticJSValue

Ƭ **StaticJSValue**: [`Lifetime`](../classes/lifetime.Lifetime.md)<[`JSValueConstPointer`](ffi_types.md#jsvalueconstpointer), [`JSValueConstPointer`](ffi_types.md#jsvalueconstpointer), [`QuickJSVm`](../classes/vm.QuickJSVm.md)\>

A QuickJSHandle to a constant that will never change, and does not need to
be disposed.

#### Defined in

[vm.ts:27](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L27)
