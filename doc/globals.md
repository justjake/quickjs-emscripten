[quickjs-emscripten - v0.1.0b](README.md) › [Globals](globals.md)

# quickjs-emscripten - v0.1.0b

## Index

### Classes

* [Lifetime](classes/lifetime.md)
* [QuickJS](classes/quickjs.md)
* [QuickJSVm](classes/quickjsvm.md)

### Interfaces

* [LowLevelJavascriptVm](interfaces/lowleveljavascriptvm.md)
* [VmPropertyDescriptor](interfaces/vmpropertydescriptor.md)

### Type aliases

* [JSCFunctionPointer](globals.md#jscfunctionpointer)
* [JSContextPointer](globals.md#jscontextpointer)
* [JSRuntimePointer](globals.md#jsruntimepointer)
* [JSValue](globals.md#jsvalue)
* [JSValueConst](globals.md#jsvalueconst)
* [JSValueConstPointer](globals.md#jsvalueconstpointer)
* [JSValueConstPointerPointer](globals.md#jsvalueconstpointerpointer)
* [JSValuePointer](globals.md#jsvaluepointer)
* [Pointer](globals.md#pointer)
* [QTS_C_To_HostCallbackFuncPointer](globals.md#qts_c_to_hostcallbackfuncpointer)
* [QuickJSHandle](globals.md#quickjshandle)
* [StaticJSValue](globals.md#staticjsvalue)
* [SuccessOrFail](globals.md#successorfail)
* [VmCallResult](globals.md#vmcallresult)
* [VmFunctionImplementation](globals.md#vmfunctionimplementation)

### Functions

* [getInstance](globals.md#getinstance)

## Type aliases

###  JSCFunctionPointer

Ƭ **JSCFunctionPointer**: *[Pointer](globals.md#pointer)‹"JSCFunction"›*

*Defined in [ffi.ts:10](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/ffi.ts#L10)*

___

###  JSContextPointer

Ƭ **JSContextPointer**: *[Pointer](globals.md#pointer)‹"JSContext"›*

*Defined in [ffi.ts:6](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/ffi.ts#L6)*

___

###  JSRuntimePointer

Ƭ **JSRuntimePointer**: *[Pointer](globals.md#pointer)‹"JSRuntime"›*

*Defined in [ffi.ts:5](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/ffi.ts#L5)*

___

###  JSValue

Ƭ **JSValue**: *[Lifetime](classes/lifetime.md)‹[JSValuePointer](globals.md#jsvaluepointer), [QuickJSVm](classes/quickjsvm.md)›*

*Defined in [quickjs.ts:573](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/quickjs.ts#L573)*

A owned QuickJSHandle that should be disposed.

___

###  JSValueConst

Ƭ **JSValueConst**: *[Lifetime](classes/lifetime.md)‹[JSValueConstPointer](globals.md#jsvalueconstpointer), [QuickJSVm](classes/quickjsvm.md)›*

*Defined in [quickjs.ts:568](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/quickjs.ts#L568)*

A QuickJSHandle to a borrowed value that does not need to be disposed.

___

###  JSValueConstPointer

Ƭ **JSValueConstPointer**: *[Pointer](globals.md#pointer)‹"JSValueConst"›*

*Defined in [ffi.ts:8](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/ffi.ts#L8)*

___

###  JSValueConstPointerPointer

Ƭ **JSValueConstPointerPointer**: *[Pointer](globals.md#pointer)‹"JSValueConst[]"›*

*Defined in [ffi.ts:9](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/ffi.ts#L9)*

___

###  JSValuePointer

Ƭ **JSValuePointer**: *[Pointer](globals.md#pointer)‹"JSValue"›*

*Defined in [ffi.ts:7](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/ffi.ts#L7)*

___

###  Pointer

Ƭ **Pointer**: *number & object*

*Defined in [ffi.ts:4](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/ffi.ts#L4)*

___

###  QTS_C_To_HostCallbackFuncPointer

Ƭ **QTS_C_To_HostCallbackFuncPointer**: *[Pointer](globals.md#pointer)‹"C_To_HostCallbackFuncPointer"›*

*Defined in [ffi.ts:11](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/ffi.ts#L11)*

___

###  QuickJSHandle

Ƭ **QuickJSHandle**: *[StaticJSValue](globals.md#staticjsvalue) | [JSValue](globals.md#jsvalue) | [JSValueConst](globals.md#jsvalueconst)*

*Defined in [quickjs.ts:582](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/quickjs.ts#L582)*

Wraps a C pointer to a QuickJS JSValue, which represents a Javascript value inside
a QuickJS virtual machine.

Values must not be shared between QuickJSVm instances.
You must dispose of any handles you create by calling the `.dispose()` method.

___

###  StaticJSValue

Ƭ **StaticJSValue**: *[Lifetime](classes/lifetime.md)‹[JSValueConstPointer](globals.md#jsvalueconstpointer)›*

*Defined in [quickjs.ts:563](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/quickjs.ts#L563)*

A QuickJSHandle to a constant that will never change, and does not need to be disposed.

___

###  SuccessOrFail

Ƭ **SuccessOrFail**: *object | object*

*Defined in [vm-interface.ts:5](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/vm-interface.ts#L5)*

Used as an optional.
`{ value: S } | { error: E }`.

___

###  VmCallResult

Ƭ **VmCallResult**: *[SuccessOrFail](globals.md#successorfail)‹VmHandle, VmHandle›*

*Defined in [vm-interface.ts:18](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/vm-interface.ts#L18)*

Used as an optional.
`{ value: VmHandle } | { error: VmHandle }`.

___

###  VmFunctionImplementation

Ƭ **VmFunctionImplementation**: *function*

*Defined in [vm-interface.ts:32](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/vm-interface.ts#L32)*

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

###  getInstance

▸ **getInstance**(): *Promise‹[QuickJS](classes/quickjs.md)›*

*Defined in [quickjs.ts:707](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/quickjs.ts#L707)*

This is the top-level entrypoint for the quickjs-emscripten library.
Get the root QuickJS API.

**Returns:** *Promise‹[QuickJS](classes/quickjs.md)›*
