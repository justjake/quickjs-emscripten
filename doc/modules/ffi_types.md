[quickjs-emscripten](../README.md) / [Exports](../modules.md) / ffi-types

# Module: ffi-types

## Table of contents

### Type aliases

- [HeapCharPointer](ffi_types.md#heapcharpointer)
- [JSContextPointer](ffi_types.md#jscontextpointer)
- [JSRuntimePointer](ffi_types.md#jsruntimepointer)
- [JSValueConstPointer](ffi_types.md#jsvalueconstpointer)
- [JSValueConstPointerPointer](ffi_types.md#jsvalueconstpointerpointer)
- [JSValuePointer](ffi_types.md#jsvaluepointer)
- [JSValuePointerPointer](ffi_types.md#jsvaluepointerpointer)
- [QTS\_C\_To\_HostCallbackFuncPointer](ffi_types.md#qts_c_to_hostcallbackfuncpointer)
- [QTS\_C\_To\_HostInterruptFuncPointer](ffi_types.md#qts_c_to_hostinterruptfuncpointer)

## Type aliases

### HeapCharPointer

Ƭ **HeapCharPointer**: `Pointer`<``"char"``\>

Used internally for Javascript-to-C calls that may contain strings too large
for the Emscripten stack.

#### Defined in

[ffi-types.ts:60](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-types.ts#L60)

___

### JSContextPointer

Ƭ **JSContextPointer**: `Pointer`<``"JSContext"``\>

`JSContext*`.

#### Defined in

[ffi-types.ts:17](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-types.ts#L17)

___

### JSRuntimePointer

Ƭ **JSRuntimePointer**: `Pointer`<``"JSRuntime"``\>

`JSRuntime*`.

#### Defined in

[ffi-types.ts:12](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-types.ts#L12)

___

### JSValueConstPointer

Ƭ **JSValueConstPointer**: `Pointer`<``"JSValueConst"``\>

`JSValueConst*
See [JSValueConst](quickjsvm.md#jsvalueconst) and [StaticJSValue](quickjsvm.md#staticjsvalue).

#### Defined in

[ffi-types.ts:29](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-types.ts#L29)

___

### JSValueConstPointerPointer

Ƭ **JSValueConstPointerPointer**: `Pointer`<``"JSValueConst[]"``\>

Used internally for Javascript-to-C function calls.

#### Defined in

[ffi-types.ts:39](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-types.ts#L39)

___

### JSValuePointer

Ƭ **JSValuePointer**: `Pointer`<``"JSValue"``\>

`JSValue*`.
See [JSValue](quickjsvm.md#jsvalue).

#### Defined in

[ffi-types.ts:23](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-types.ts#L23)

___

### JSValuePointerPointer

Ƭ **JSValuePointerPointer**: `Pointer`<``"JSValue[]"``\>

Used internally for Javascript-to-C function calls.

#### Defined in

[ffi-types.ts:34](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-types.ts#L34)

___

### QTS\_C\_To\_HostCallbackFuncPointer

Ƭ **QTS\_C\_To\_HostCallbackFuncPointer**: `Pointer`<``"C_To_HostCallbackFunc"``\>

Used internally for C-to-Javascript function calls.

#### Defined in

[ffi-types.ts:49](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-types.ts#L49)

___

### QTS\_C\_To\_HostInterruptFuncPointer

Ƭ **QTS\_C\_To\_HostInterruptFuncPointer**: `Pointer`<``"C_To_HostInterruptFunc"``\>

Used internally for C-to-Javascript interrupt handlers.

#### Defined in

[ffi-types.ts:54](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-types.ts#L54)
