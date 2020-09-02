[quickjs-emscripten](README.md) › [Globals](globals.md)

# quickjs-emscripten

## Index

### Classes

* [Lifetime](classes/lifetime.md)
* [QuickJS](classes/quickjs.md)
* [QuickJSDeferredPromise](classes/quickjsdeferredpromise.md)
* [QuickJSFFI](classes/quickjsffi.md)
* [QuickJSVm](classes/quickjsvm.md)
* [Scope](classes/scope.md)
* [StaticLifetime](classes/staticlifetime.md)
* [WeakLifetime](classes/weaklifetime.md)

### Interfaces

* [Disposable](interfaces/disposable.md)
* [LowLevelJavascriptVm](interfaces/lowleveljavascriptvm.md)
* [QuickJSEmscriptenModule](interfaces/quickjsemscriptenmodule.md)
* [QuickJSEvalOptions](interfaces/quickjsevaloptions.md)
* [VmPropertyDescriptor](interfaces/vmpropertydescriptor.md)

### Type aliases

* [ExecutePendingJobsResult](globals.md#executependingjobsresult)
* [InterruptHandler](globals.md#interrupthandler)
* [JSCFunctionPointer](globals.md#jscfunctionpointer)
* [JSContextPointer](globals.md#jscontextpointer)
* [JSRuntimePointer](globals.md#jsruntimepointer)
* [JSValue](globals.md#jsvalue)
* [JSValueConst](globals.md#jsvalueconst)
* [JSValueConstPointer](globals.md#jsvalueconstpointer)
* [JSValueConstPointerPointer](globals.md#jsvalueconstpointerpointer)
* [JSValuePointer](globals.md#jsvaluepointer)
* [JSValuePointerPointer](globals.md#jsvaluepointerpointer)
* [Pointer](globals.md#pointer)
* [QTS_C_To_HostCallbackFuncPointer](globals.md#qts_c_to_hostcallbackfuncpointer)
* [QTS_C_To_HostInterruptFuncPointer](globals.md#qts_c_to_hostinterruptfuncpointer)
* [QuickJSHandle](globals.md#quickjshandle)
* [QuickJSPropertyKey](globals.md#quickjspropertykey)
* [StaticJSValue](globals.md#staticjsvalue)
* [SuccessOrFail](globals.md#successorfail)
* [VmCallResult](globals.md#vmcallresult)
* [VmFunctionImplementation](globals.md#vmfunctionimplementation)

### Functions

* [getQuickJS](globals.md#getquickjs)
* [getQuickJSSync](globals.md#getquickjssync)
* [shouldInterruptAfterDeadline](globals.md#shouldinterruptafterdeadline)

## Type aliases

###  ExecutePendingJobsResult

Ƭ **ExecutePendingJobsResult**: *[SuccessOrFail](globals.md#successorfail)‹number, [QuickJSHandle](globals.md#quickjshandle)›*

*Defined in [quickjs.ts:212](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L212)*

Used as an optional for the results of executing pendingJobs.
On success, `value` contains the number of async jobs executed
by the runtime.
`{ value: number } | { error: QuickJSHandle }`.

___

###  InterruptHandler

Ƭ **InterruptHandler**: *function*

*Defined in [quickjs.ts:63](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L63)*

Callback called regularly while the VM executes code.
Determines if a VM's execution should be interrupted.

**`returns`** `true` to interrupt JS execution inside the VM.

**`returns`** `false` or `undefined` to continue JS execution inside the VM.

#### Type declaration:

▸ (`vm`: [QuickJSVm](classes/quickjsvm.md)): *boolean | undefined*

**Parameters:**

Name | Type |
------ | ------ |
`vm` | [QuickJSVm](classes/quickjsvm.md) |

___

###  JSCFunctionPointer

Ƭ **JSCFunctionPointer**: *[Pointer](globals.md#pointer)‹"JSCFunction"›*

*Defined in [ffi.ts:49](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L49)*

Used internally for C-to-Javascript function calls.

___

###  JSContextPointer

Ƭ **JSContextPointer**: *[Pointer](globals.md#pointer)‹"JSContext"›*

*Defined in [ffi.ts:22](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L22)*

`JSContext*`.

___

###  JSRuntimePointer

Ƭ **JSRuntimePointer**: *[Pointer](globals.md#pointer)‹"JSRuntime"›*

*Defined in [ffi.ts:17](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L17)*

`JSRuntime*`.

___

###  JSValue

Ƭ **JSValue**: *[Lifetime](classes/lifetime.md)‹[JSValuePointer](globals.md#jsvaluepointer), [JSValuePointer](globals.md#jsvaluepointer), [QuickJSVm](classes/quickjsvm.md)›*

*Defined in [quickjs.ts:951](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L951)*

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

___

###  JSValueConst

Ƭ **JSValueConst**: *[Lifetime](classes/lifetime.md)‹[JSValueConstPointer](globals.md#jsvalueconstpointer), [JSValuePointer](globals.md#jsvaluepointer), [QuickJSVm](classes/quickjsvm.md)›*

*Defined in [quickjs.ts:934](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L934)*

A QuickJSHandle to a borrowed value that does not need to be disposed.

In QuickJS, a JSValueConst is a "borrowed" reference that isn't owned by the
current scope. That means that the current scope should not `JS_FreeValue`
it, or retain a reference to it after the scope exits, because it may be
freed by its owner.

quickjs-emscripten takes care of disposing JSValueConst references.

___

###  JSValueConstPointer

Ƭ **JSValueConstPointer**: *[Pointer](globals.md#pointer)‹"JSValueConst"›*

*Defined in [ffi.ts:34](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L34)*

`JSValueConst*
See [JSValueConst](globals.md#jsvalueconst) and [StaticJSValue](globals.md#staticjsvalue).

___

###  JSValueConstPointerPointer

Ƭ **JSValueConstPointerPointer**: *[Pointer](globals.md#pointer)‹"JSValueConst[]"›*

*Defined in [ffi.ts:44](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L44)*

Used internally for Javascript-to-C function calls.

___

###  JSValuePointer

Ƭ **JSValuePointer**: *[Pointer](globals.md#pointer)‹"JSValue"›*

*Defined in [ffi.ts:28](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L28)*

`JSValue*`.
See [JSValue](globals.md#jsvalue).

___

###  JSValuePointerPointer

Ƭ **JSValuePointerPointer**: *[Pointer](globals.md#pointer)‹"JSValue[]"›*

*Defined in [ffi.ts:39](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L39)*

Used internally for Javascript-to-C function calls.

___

###  Pointer

Ƭ **Pointer**: *number & object*

*Defined in [ffi.ts:12](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L12)*

C pointer to export type `CType`. Pointer types are used internally for FFI, but
are not intended for external use.

**`unstable`** This export type is considered private and may change.

___

###  QTS_C_To_HostCallbackFuncPointer

Ƭ **QTS_C_To_HostCallbackFuncPointer**: *[Pointer](globals.md#pointer)‹"C_To_HostCallbackFunc"›*

*Defined in [ffi.ts:54](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L54)*

Used internally for C-to-Javascript function calls.

___

###  QTS_C_To_HostInterruptFuncPointer

Ƭ **QTS_C_To_HostInterruptFuncPointer**: *[Pointer](globals.md#pointer)‹"C_To_HostInterruptFunc"›*

*Defined in [ffi.ts:59](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L59)*

Used internally for C-to-Javascript interrupt handlers.

___

###  QuickJSHandle

Ƭ **QuickJSHandle**: *[StaticJSValue](globals.md#staticjsvalue) | [JSValue](globals.md#jsvalue) | [JSValueConst](globals.md#jsvalueconst)*

*Defined in [quickjs.ts:960](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L960)*

Wraps a C pointer to a QuickJS JSValue, which represents a Javascript value inside
a QuickJS virtual machine.

Values must not be shared between QuickJSVm instances.
You must dispose of any handles you create by calling the `.dispose()` method.

___

###  QuickJSPropertyKey

Ƭ **QuickJSPropertyKey**: *number | string | [QuickJSHandle](globals.md#quickjshandle)*

*Defined in [quickjs.ts:65](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L65)*

___

###  StaticJSValue

Ƭ **StaticJSValue**: *[Lifetime](classes/lifetime.md)‹[JSValueConstPointer](globals.md#jsvalueconstpointer), [JSValueConstPointer](globals.md#jsvalueconstpointer), [QuickJSVm](classes/quickjsvm.md)›*

*Defined in [quickjs.ts:922](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L922)*

A QuickJSHandle to a constant that will never change, and does not need to
be disposed.

___

###  SuccessOrFail

Ƭ **SuccessOrFail**: *object | object*

*Defined in [vm-interface.ts:5](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm-interface.ts#L5)*

Used as an optional.
`{ value: S } | { error: E }`.

___

###  VmCallResult

Ƭ **VmCallResult**: *[SuccessOrFail](globals.md#successorfail)‹VmHandle, VmHandle›*

*Defined in [vm-interface.ts:18](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm-interface.ts#L18)*

Used as an optional for results of a Vm call.
`{ value: VmHandle } | { error: VmHandle }`.

___

###  VmFunctionImplementation

Ƭ **VmFunctionImplementation**: *function*

*Defined in [vm-interface.ts:32](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm-interface.ts#L32)*

A VmFunctionImplementation takes handles as arguments.
It should return a handle, or be void.

To indicate an exception, a VMs can throw either a handle (transferred
directly) or any other Javascript value (only the poperties `name` and
`message` will be transferred). Or, the VmFunctionImplementation may return
a VmCallResult's `{ error: handle }` error variant.

VmFunctionImplementation should not free its arguments or its return value.
It should not retain a reference to its return value or thrown error.

#### Type declaration:

▸ (`this`: VmHandle, ...`args`: VmHandle[]): *VmHandle | [VmCallResult](globals.md#vmcallresult)‹VmHandle› | void*

**Parameters:**

Name | Type |
------ | ------ |
`this` | VmHandle |
`...args` | VmHandle[] |

## Functions

###  getQuickJS

▸ **getQuickJS**(): *Promise‹[QuickJS](classes/quickjs.md)›*

*Defined in [quickjs.ts:1169](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L1169)*

This is the top-level entrypoint for the quickjs-emscripten library.
Get the root QuickJS API.

**Returns:** *Promise‹[QuickJS](classes/quickjs.md)›*

___

###  getQuickJSSync

▸ **getQuickJSSync**(): *[QuickJS](classes/quickjs.md)*

*Defined in [quickjs.ts:1182](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L1182)*

Provides synchronous access to the QuickJS API once [getQuickJS](globals.md#getquickjs) has resolved at
least once.

**`throws`** If called before `getQuickJS` resolves.

**Returns:** *[QuickJS](classes/quickjs.md)*

___

###  shouldInterruptAfterDeadline

▸ **shouldInterruptAfterDeadline**(`deadline`: Date | number): *[InterruptHandler](globals.md#interrupthandler)*

*Defined in [quickjs.ts:1155](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L1155)*

Returns an interrupt handler that interrupts Javascript execution after a deadline time.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`deadline` | Date &#124; number | Interrupt execution if it's still running after this time.   Number values are compared against `Date.now()`  |

**Returns:** *[InterruptHandler](globals.md#interrupthandler)*
