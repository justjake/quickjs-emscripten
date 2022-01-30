[quickjs-emscripten](../README.md) / [Exports](../modules.md) / quickjsvm

# Module: quickjsvm

## Table of contents

### Classes

- [QuickJSVm](../classes/quickjsvm.QuickJSVm.md)

### Interfaces

- [QuickJSEvalOptions](../interfaces/quickjsvm.QuickJSEvalOptions.md)

### Type aliases

- [ExecutePendingJobsResult](quickjsvm.md#executependingjobsresult)
- [InterruptHandler](quickjsvm.md#interrupthandler)
- [JSValue](quickjsvm.md#jsvalue)
- [JSValueConst](quickjsvm.md#jsvalueconst)
- [QuickJSHandle](quickjsvm.md#quickjshandle)
- [QuickJSPropertyKey](quickjsvm.md#quickjspropertykey)
- [StaticJSValue](quickjsvm.md#staticjsvalue)

## Type aliases

### ExecutePendingJobsResult

Ƭ **ExecutePendingJobsResult**: [`SuccessOrFail`](vm_interface.md#successorfail)<`number`, [`QuickJSHandle`](quickjsvm.md#quickjshandle)\>

Used as an optional for the results of executing pendingJobs.
On success, `value` contains the number of async jobs executed
by the runtime.
`{ value: number } | { error: QuickJSHandle }`.

#### Defined in

[quickjsvm.ts:99](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L99)

___

### InterruptHandler

Ƭ **InterruptHandler**: (`vm`: [`QuickJSVm`](../classes/quickjsvm.QuickJSVm.md)) => `boolean` \| `undefined`

#### Type declaration

▸ (`vm`): `boolean` \| `undefined`

Callback called regularly while the VM executes code.
Determines if a VM's execution should be interrupted.

##### Parameters

| Name | Type |
| :------ | :------ |
| `vm` | [`QuickJSVm`](../classes/quickjsvm.QuickJSVm.md) |

##### Returns

`boolean` \| `undefined`

`true` to interrupt JS execution inside the VM.

#### Defined in

[quickjsvm.ts:89](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L89)

___

### JSValue

Ƭ **JSValue**: [`Lifetime`](../classes/lifetime.Lifetime.md)<[`JSValuePointer`](ffi_types.md#jsvaluepointer), [`JSValuePointer`](ffi_types.md#jsvaluepointer), [`QuickJSVm`](../classes/quickjsvm.QuickJSVm.md)\>

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

[quickjsvm.ts:55](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L55)

___

### JSValueConst

Ƭ **JSValueConst**: [`Lifetime`](../classes/lifetime.Lifetime.md)<[`JSValueConstPointer`](ffi_types.md#jsvalueconstpointer), [`JSValuePointer`](ffi_types.md#jsvaluepointer), [`QuickJSVm`](../classes/quickjsvm.QuickJSVm.md)\>

A QuickJSHandle to a borrowed value that does not need to be disposed.

In QuickJS, a JSValueConst is a "borrowed" reference that isn't owned by the
current scope. That means that the current scope should not `JS_FreeValue`
it, or retain a reference to it after the scope exits, because it may be
freed by its owner.

quickjs-emscripten takes care of disposing JSValueConst references.

#### Defined in

[quickjsvm.ts:38](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L38)

___

### QuickJSHandle

Ƭ **QuickJSHandle**: [`StaticJSValue`](quickjsvm.md#staticjsvalue) \| [`JSValue`](quickjsvm.md#jsvalue) \| [`JSValueConst`](quickjsvm.md#jsvalueconst)

Wraps a C pointer to a QuickJS JSValue, which represents a Javascript value inside
a QuickJS virtual machine.

Values must not be shared between QuickJSVm instances.
You must dispose of any handles you create by calling the `.dispose()` method.

#### Defined in

[quickjsvm.ts:64](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L64)

___

### QuickJSPropertyKey

Ƭ **QuickJSPropertyKey**: `number` \| `string` \| [`QuickJSHandle`](quickjsvm.md#quickjshandle)

#### Defined in

[quickjsvm.ts:91](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L91)

___

### StaticJSValue

Ƭ **StaticJSValue**: [`Lifetime`](../classes/lifetime.Lifetime.md)<[`JSValueConstPointer`](ffi_types.md#jsvalueconstpointer), [`JSValueConstPointer`](ffi_types.md#jsvalueconstpointer), [`QuickJSVm`](../classes/quickjsvm.QuickJSVm.md)\>

A QuickJSHandle to a constant that will never change, and does not need to
be disposed.

#### Defined in

[quickjsvm.ts:26](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L26)
