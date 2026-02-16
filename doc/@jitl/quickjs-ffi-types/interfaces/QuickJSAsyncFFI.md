[**quickjs-emscripten**](../../../README.md)

***

[quickjs-emscripten](../../../packages.md) / [@jitl/quickjs-ffi-types](../README.md) / QuickJSAsyncFFI

# Interface: QuickJSAsyncFFI

Defined in: [ffi-async.ts:38](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L38)

Low-level FFI bindings to QuickJS's Emscripten module.
See instead QuickJSContext, the public Javascript interface exposed by this
library.

## Unstable

The FFI interface is considered private and may change.

## Properties

### DEBUG

> `readonly` **DEBUG**: `boolean`

Defined in: [ffi-async.ts:40](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L40)

Set at compile time.

***

### QTS\_ArgvGetJSValueConstPointer()

> **QTS\_ArgvGetJSValueConstPointer**: (`argv`, `index`) => [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

Defined in: [ffi-async.ts:259](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L259)

#### Parameters

##### argv

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

##### index

`number`

#### Returns

[`JSValueConstPointer`](../README.md#jsvalueconstpointer)

***

### QTS\_bjson\_decode()

> **QTS\_bjson\_decode**: (`ctx`, `data`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: [ffi-async.ts:271](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L271)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### data

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

#### Returns

[`JSValuePointer`](../README.md#jsvaluepointer)

***

### QTS\_bjson\_encode()

> **QTS\_bjson\_encode**: (`ctx`, `val`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: [ffi-async.ts:267](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L267)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### val

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

#### Returns

[`JSValuePointer`](../README.md#jsvaluepointer)

***

### QTS\_BuildIsAsyncify()

> **QTS\_BuildIsAsyncify**: () => `number`

Defined in: [ffi-async.ts:251](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L251)

#### Returns

`number`

***

### QTS\_BuildIsDebug()

> **QTS\_BuildIsDebug**: () => `number`

Defined in: [ffi-async.ts:250](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L250)

#### Returns

`number`

***

### QTS\_BuildIsSanitizeLeak()

> **QTS\_BuildIsSanitizeLeak**: () => `number`

Defined in: [ffi-async.ts:48](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L48)

#### Returns

`number`

***

### QTS\_Call()

> **QTS\_Call**: (`ctx`, `func_obj`, `this_obj`, `argc`, `argv_ptrs`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: [ffi-async.ts:176](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L176)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### func\_obj

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

##### this\_obj

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

##### argc

`number`

##### argv\_ptrs

[`JSValueConstPointerPointer`](../README.md#jsvalueconstpointerpointer)

#### Returns

[`JSValuePointer`](../README.md#jsvaluepointer)

***

### QTS\_Call\_MaybeAsync()

> **QTS\_Call\_MaybeAsync**: (`ctx`, `func_obj`, `this_obj`, `argc`, `argv_ptrs`) => [`JSValuePointer`](../README.md#jsvaluepointer) \| `Promise`\<[`JSValuePointer`](../README.md#jsvaluepointer)\>

Defined in: [ffi-async.ts:183](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L183)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### func\_obj

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

##### this\_obj

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

##### argc

`number`

##### argv\_ptrs

[`JSValueConstPointerPointer`](../README.md#jsvalueconstpointerpointer)

#### Returns

[`JSValuePointer`](../README.md#jsvaluepointer) \| `Promise`\<[`JSValuePointer`](../README.md#jsvaluepointer)\>

***

### QTS\_DefineProp()

> **QTS\_DefineProp**: (`ctx`, `this_val`, `prop_name`, `prop_value`, `get`, `set`, `configurable`, `enumerable`, `has_value`) => `void`

Defined in: [ffi-async.ts:151](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L151)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### this\_val

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

##### prop\_name

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

##### prop\_value

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

##### get

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

##### set

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

##### configurable

`boolean`

##### enumerable

`boolean`

##### has\_value

`boolean`

#### Returns

`void`

***

### QTS\_Dump()

> **QTS\_Dump**: (`ctx`, `obj`) => [`JSBorrowedCharPointer`](../README.md#jsborrowedcharpointer)

Defined in: [ffi-async.ts:191](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L191)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### obj

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

#### Returns

[`JSBorrowedCharPointer`](../README.md#jsborrowedcharpointer)

***

### QTS\_Dump\_MaybeAsync()

> **QTS\_Dump\_MaybeAsync**: (`ctx`, `obj`) => [`JSBorrowedCharPointer`](../README.md#jsborrowedcharpointer) \| `Promise`\<[`JSBorrowedCharPointer`](../README.md#jsborrowedcharpointer)\>

Defined in: [ffi-async.ts:195](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L195)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### obj

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

#### Returns

[`JSBorrowedCharPointer`](../README.md#jsborrowedcharpointer) \| `Promise`\<[`JSBorrowedCharPointer`](../README.md#jsborrowedcharpointer)\>

***

### QTS\_DupValuePointer()

> **QTS\_DupValuePointer**: (`ctx`, `val`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: [ffi-async.ts:64](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L64)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### val

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

#### Returns

[`JSValuePointer`](../README.md#jsvaluepointer)

***

### QTS\_Eval()

> **QTS\_Eval**: (`ctx`, `js_code`, `js_code_length`, `filename`, `detectModule`, `evalFlags`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: [ffi-async.ts:199](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L199)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### js\_code

[`BorrowedHeapCharPointer`](../README.md#borrowedheapcharpointer)

##### js\_code\_length

`number`

##### filename

`string`

##### detectModule

`EvalDetectModule`

##### evalFlags

[`EvalFlags`](../README.md#evalflags)

#### Returns

[`JSValuePointer`](../README.md#jsvaluepointer)

***

### QTS\_Eval\_MaybeAsync()

> **QTS\_Eval\_MaybeAsync**: (`ctx`, `js_code`, `js_code_length`, `filename`, `detectModule`, `evalFlags`) => [`JSValuePointer`](../README.md#jsvaluepointer) \| `Promise`\<[`JSValuePointer`](../README.md#jsvaluepointer)\>

Defined in: [ffi-async.ts:207](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L207)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### js\_code

[`BorrowedHeapCharPointer`](../README.md#borrowedheapcharpointer)

##### js\_code\_length

`number`

##### filename

`string`

##### detectModule

`EvalDetectModule`

##### evalFlags

[`EvalFlags`](../README.md#evalflags)

#### Returns

[`JSValuePointer`](../README.md#jsvaluepointer) \| `Promise`\<[`JSValuePointer`](../README.md#jsvaluepointer)\>

***

### QTS\_ExecutePendingJob()

> **QTS\_ExecutePendingJob**: (`rt`, `maxJobsToExecute`, `lastJobContext`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: [ffi-async.ts:109](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L109)

#### Parameters

##### rt

[`JSRuntimePointer`](../README.md#jsruntimepointer)

##### maxJobsToExecute

`number`

##### lastJobContext

[`JSContextPointerPointer`](../README.md#jscontextpointerpointer)

#### Returns

[`JSValuePointer`](../README.md#jsvaluepointer)

***

### QTS\_ExecutePendingJob\_MaybeAsync()

> **QTS\_ExecutePendingJob\_MaybeAsync**: (`rt`, `maxJobsToExecute`, `lastJobContext`) => [`JSValuePointer`](../README.md#jsvaluepointer) \| `Promise`\<[`JSValuePointer`](../README.md#jsvaluepointer)\>

Defined in: [ffi-async.ts:114](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L114)

#### Parameters

##### rt

[`JSRuntimePointer`](../README.md#jsruntimepointer)

##### maxJobsToExecute

`number`

##### lastJobContext

[`JSContextPointerPointer`](../README.md#jscontextpointerpointer)

#### Returns

[`JSValuePointer`](../README.md#jsvaluepointer) \| `Promise`\<[`JSValuePointer`](../README.md#jsvaluepointer)\>

***

### QTS\_FreeContext()

> **QTS\_FreeContext**: (`ctx`) => `void`

Defined in: [ffi-async.ts:59](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L59)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

#### Returns

`void`

***

### QTS\_FreeCString()

> **QTS\_FreeCString**: (`ctx`, `str`) => `void`

Defined in: [ffi-async.ts:63](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L63)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### str

[`JSBorrowedCharPointer`](../README.md#jsborrowedcharpointer)

#### Returns

`void`

***

### QTS\_FreeRuntime()

> **QTS\_FreeRuntime**: (`rt`) => `void`

Defined in: [ffi-async.ts:57](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L57)

#### Parameters

##### rt

[`JSRuntimePointer`](../README.md#jsruntimepointer)

#### Returns

`void`

***

### QTS\_FreeValuePointer()

> **QTS\_FreeValuePointer**: (`ctx`, `value`) => `void`

Defined in: [ffi-async.ts:60](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L60)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### value

[`JSValuePointer`](../README.md#jsvaluepointer)

#### Returns

`void`

***

### QTS\_FreeValuePointerRuntime()

> **QTS\_FreeValuePointerRuntime**: (`rt`, `value`) => `void`

Defined in: [ffi-async.ts:61](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L61)

#### Parameters

##### rt

[`JSRuntimePointer`](../README.md#jsruntimepointer)

##### value

[`JSValuePointer`](../README.md#jsvaluepointer)

#### Returns

`void`

***

### QTS\_FreeVoidPointer()

> **QTS\_FreeVoidPointer**: (`ctx`, `ptr`) => `void`

Defined in: [ffi-async.ts:62](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L62)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### ptr

[`JSVoidPointer`](../README.md#jsvoidpointer)

#### Returns

`void`

***

### QTS\_GetArrayBuffer()

> **QTS\_GetArrayBuffer**: (`ctx`, `data`) => [`JSVoidPointer`](../README.md#jsvoidpointer)

Defined in: [ffi-async.ts:86](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L86)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### data

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

#### Returns

[`JSVoidPointer`](../README.md#jsvoidpointer)

***

### QTS\_GetArrayBufferLength()

> **QTS\_GetArrayBufferLength**: (`ctx`, `data`) => `number`

Defined in: [ffi-async.ts:90](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L90)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### data

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

#### Returns

`number`

***

### QTS\_GetDebugLogEnabled()

> **QTS\_GetDebugLogEnabled**: (`rt`) => `number`

Defined in: [ffi-async.ts:248](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L248)

#### Parameters

##### rt

[`JSRuntimePointer`](../README.md#jsruntimepointer)

#### Returns

`number`

***

### QTS\_GetFalse()

> **QTS\_GetFalse**: () => [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

Defined in: [ffi-async.ts:52](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L52)

#### Returns

[`JSValueConstPointer`](../README.md#jsvalueconstpointer)

***

### QTS\_GetFloat64()

> **QTS\_GetFloat64**: (`ctx`, `value`) => `number`

Defined in: [ffi-async.ts:80](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L80)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### value

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

#### Returns

`number`

***

### QTS\_GetGlobalObject()

> **QTS\_GetGlobalObject**: (`ctx`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: [ffi-async.ts:234](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L234)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

#### Returns

[`JSValuePointer`](../README.md#jsvaluepointer)

***

### QTS\_GetHostRefId()

> **QTS\_GetHostRefId**: (`value`) => `HostRefId`

Defined in: [ffi-async.ts:55](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L55)

#### Parameters

##### value

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

#### Returns

`HostRefId`

***

### QTS\_GetLength()

> **QTS\_GetLength**: (`ctx`, `out_len`, `value`) => `number`

Defined in: [ffi-async.ts:223](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L223)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### out\_len

[`UInt32Pointer`](../README.md#uint32pointer)

##### value

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

#### Returns

`number`

***

### QTS\_GetModuleNamespace()

> **QTS\_GetModuleNamespace**: (`ctx`, `module_func_obj`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: [ffi-async.ts:215](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L215)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### module\_func\_obj

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

#### Returns

[`JSValuePointer`](../README.md#jsvaluepointer)

***

### QTS\_GetNull()

> **QTS\_GetNull**: () => [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

Defined in: [ffi-async.ts:51](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L51)

#### Returns

[`JSValueConstPointer`](../README.md#jsvalueconstpointer)

***

### QTS\_GetOwnPropertyNames()

> **QTS\_GetOwnPropertyNames**: (`ctx`, `out_ptrs`, `out_len`, `obj`, `flags`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: [ffi-async.ts:162](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L162)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### out\_ptrs

[`JSValuePointerPointerPointer`](../README.md#jsvaluepointerpointerpointer)

##### out\_len

[`UInt32Pointer`](../README.md#uint32pointer)

##### obj

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

##### flags

`number`

#### Returns

[`JSValuePointer`](../README.md#jsvaluepointer)

***

### QTS\_GetOwnPropertyNames\_MaybeAsync()

> **QTS\_GetOwnPropertyNames\_MaybeAsync**: (`ctx`, `out_ptrs`, `out_len`, `obj`, `flags`) => [`JSValuePointer`](../README.md#jsvaluepointer) \| `Promise`\<[`JSValuePointer`](../README.md#jsvaluepointer)\>

Defined in: [ffi-async.ts:169](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L169)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### out\_ptrs

[`JSValuePointerPointerPointer`](../README.md#jsvaluepointerpointerpointer)

##### out\_len

[`UInt32Pointer`](../README.md#uint32pointer)

##### obj

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

##### flags

`number`

#### Returns

[`JSValuePointer`](../README.md#jsvaluepointer) \| `Promise`\<[`JSValuePointer`](../README.md#jsvaluepointer)\>

***

### QTS\_GetProp()

> **QTS\_GetProp**: (`ctx`, `this_val`, `prop_name`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: [ffi-async.ts:119](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L119)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### this\_val

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

##### prop\_name

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

#### Returns

[`JSValuePointer`](../README.md#jsvaluepointer)

***

### QTS\_GetProp\_MaybeAsync()

> **QTS\_GetProp\_MaybeAsync**: (`ctx`, `this_val`, `prop_name`) => [`JSValuePointer`](../README.md#jsvaluepointer) \| `Promise`\<[`JSValuePointer`](../README.md#jsvaluepointer)\>

Defined in: [ffi-async.ts:124](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L124)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### this\_val

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

##### prop\_name

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

#### Returns

[`JSValuePointer`](../README.md#jsvaluepointer) \| `Promise`\<[`JSValuePointer`](../README.md#jsvaluepointer)\>

***

### QTS\_GetPropNumber()

> **QTS\_GetPropNumber**: (`ctx`, `this_val`, `prop_name`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: [ffi-async.ts:129](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L129)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### this\_val

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

##### prop\_name

`number`

#### Returns

[`JSValuePointer`](../README.md#jsvaluepointer)

***

### QTS\_GetPropNumber\_MaybeAsync()

> **QTS\_GetPropNumber\_MaybeAsync**: (`ctx`, `this_val`, `prop_name`) => [`JSValuePointer`](../README.md#jsvaluepointer) \| `Promise`\<[`JSValuePointer`](../README.md#jsvaluepointer)\>

Defined in: [ffi-async.ts:134](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L134)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### this\_val

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

##### prop\_name

`number`

#### Returns

[`JSValuePointer`](../README.md#jsvaluepointer) \| `Promise`\<[`JSValuePointer`](../README.md#jsvaluepointer)\>

***

### QTS\_GetString()

> **QTS\_GetString**: (`ctx`, `value`) => [`JSBorrowedCharPointer`](../README.md#jsborrowedcharpointer)

Defined in: [ffi-async.ts:82](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L82)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### value

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

#### Returns

[`JSBorrowedCharPointer`](../README.md#jsborrowedcharpointer)

***

### QTS\_GetSymbolDescriptionOrKey()

> **QTS\_GetSymbolDescriptionOrKey**: (`ctx`, `value`) => [`JSBorrowedCharPointer`](../README.md#jsborrowedcharpointer)

Defined in: [ffi-async.ts:99](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L99)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### value

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

#### Returns

[`JSBorrowedCharPointer`](../README.md#jsborrowedcharpointer)

***

### QTS\_GetSymbolDescriptionOrKey\_MaybeAsync()

> **QTS\_GetSymbolDescriptionOrKey\_MaybeAsync**: (`ctx`, `value`) => [`JSBorrowedCharPointer`](../README.md#jsborrowedcharpointer) \| `Promise`\<[`JSBorrowedCharPointer`](../README.md#jsborrowedcharpointer)\>

Defined in: [ffi-async.ts:103](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L103)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### value

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

#### Returns

[`JSBorrowedCharPointer`](../README.md#jsborrowedcharpointer) \| `Promise`\<[`JSBorrowedCharPointer`](../README.md#jsborrowedcharpointer)\>

***

### QTS\_GetTrue()

> **QTS\_GetTrue**: () => [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

Defined in: [ffi-async.ts:53](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L53)

#### Returns

[`JSValueConstPointer`](../README.md#jsvalueconstpointer)

***

### QTS\_GetUndefined()

> **QTS\_GetUndefined**: () => [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

Defined in: [ffi-async.ts:50](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L50)

#### Returns

[`JSValueConstPointer`](../README.md#jsvalueconstpointer)

***

### QTS\_IsEqual()

> **QTS\_IsEqual**: (`ctx`, `a`, `b`, `op`) => `number`

Defined in: [ffi-async.ts:228](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L228)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### a

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

##### b

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

##### op

[`IsEqualOp`](../README.md#isequalop)

#### Returns

`number`

***

### QTS\_IsGlobalSymbol()

> **QTS\_IsGlobalSymbol**: (`ctx`, `value`) => `number`

Defined in: [ffi-async.ts:107](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L107)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### value

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

#### Returns

`number`

***

### QTS\_IsJobPending()

> **QTS\_IsJobPending**: (`rt`) => `number`

Defined in: [ffi-async.ts:108](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L108)

#### Parameters

##### rt

[`JSRuntimePointer`](../README.md#jsruntimepointer)

#### Returns

`number`

***

### QTS\_NewArray()

> **QTS\_NewArray**: (`ctx`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: [ffi-async.ts:73](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L73)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

#### Returns

[`JSValuePointer`](../README.md#jsvaluepointer)

***

### QTS\_NewArrayBuffer()

> **QTS\_NewArrayBuffer**: (`ctx`, `buffer`, `length`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: [ffi-async.ts:74](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L74)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### buffer

[`JSVoidPointer`](../README.md#jsvoidpointer)

##### length

`number`

#### Returns

[`JSValuePointer`](../README.md#jsvaluepointer)

***

### QTS\_NewContext()

> **QTS\_NewContext**: (`rt`, `intrinsics`) => [`JSContextPointer`](../README.md#jscontextpointer)

Defined in: [ffi-async.ts:58](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L58)

#### Parameters

##### rt

[`JSRuntimePointer`](../README.md#jsruntimepointer)

##### intrinsics

[`IntrinsicsFlags`](../README.md#intrinsicsflags)

#### Returns

[`JSContextPointer`](../README.md#jscontextpointer)

***

### QTS\_NewError()

> **QTS\_NewError**: (`ctx`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: [ffi-async.ts:43](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L43)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

#### Returns

[`JSValuePointer`](../README.md#jsvaluepointer)

***

### QTS\_NewFloat64()

> **QTS\_NewFloat64**: (`ctx`, `num`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: [ffi-async.ts:79](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L79)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### num

`number`

#### Returns

[`JSValuePointer`](../README.md#jsvaluepointer)

***

### QTS\_NewFunction()

> **QTS\_NewFunction**: (`ctx`, `name`, `arg_length`, `is_constructor`, `host_ref_id`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: [ffi-async.ts:252](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L252)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### name

`string`

##### arg\_length

`number`

##### is\_constructor

`boolean`

##### host\_ref\_id

`HostRefId`

#### Returns

[`JSValuePointer`](../README.md#jsvaluepointer)

***

### QTS\_NewHostRef()

> **QTS\_NewHostRef**: (`ctx`, `id`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: [ffi-async.ts:54](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L54)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### id

`HostRefId`

#### Returns

[`JSValuePointer`](../README.md#jsvaluepointer)

***

### QTS\_NewObject()

> **QTS\_NewObject**: (`ctx`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: [ffi-async.ts:68](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L68)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

#### Returns

[`JSValuePointer`](../README.md#jsvaluepointer)

***

### QTS\_NewObjectProto()

> **QTS\_NewObjectProto**: (`ctx`, `proto`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: [ffi-async.ts:69](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L69)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### proto

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

#### Returns

[`JSValuePointer`](../README.md#jsvaluepointer)

***

### QTS\_NewPromiseCapability()

> **QTS\_NewPromiseCapability**: (`ctx`, `resolve_funcs_out`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: [ffi-async.ts:235](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L235)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### resolve\_funcs\_out

[`JSValuePointerPointer`](../README.md#jsvaluepointerpointer)

#### Returns

[`JSValuePointer`](../README.md#jsvaluepointer)

***

### QTS\_NewRuntime()

> **QTS\_NewRuntime**: () => [`JSRuntimePointer`](../README.md#jsruntimepointer)

Defined in: [ffi-async.ts:56](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L56)

#### Returns

[`JSRuntimePointer`](../README.md#jsruntimepointer)

***

### QTS\_NewString()

> **QTS\_NewString**: (`ctx`, `string`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: [ffi-async.ts:81](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L81)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### string

[`BorrowedHeapCharPointer`](../README.md#borrowedheapcharpointer)

#### Returns

[`JSValuePointer`](../README.md#jsvaluepointer)

***

### QTS\_NewSymbol()

> **QTS\_NewSymbol**: (`ctx`, `description`, `isGlobal`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: [ffi-async.ts:94](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L94)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### description

[`BorrowedHeapCharPointer`](../README.md#borrowedheapcharpointer)

##### isGlobal

`number`

#### Returns

[`JSValuePointer`](../README.md#jsvaluepointer)

***

### QTS\_PromiseResult()

> **QTS\_PromiseResult**: (`ctx`, `promise`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: [ffi-async.ts:243](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L243)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### promise

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

#### Returns

[`JSValuePointer`](../README.md#jsvaluepointer)

***

### QTS\_PromiseState()

> **QTS\_PromiseState**: (`ctx`, `promise`) => [`JSPromiseStateEnum`](../README.md#jspromisestateenum)

Defined in: [ffi-async.ts:239](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L239)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### promise

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

#### Returns

[`JSPromiseStateEnum`](../README.md#jspromisestateenum)

***

### QTS\_RecoverableLeakCheck()

> **QTS\_RecoverableLeakCheck**: () => `number`

Defined in: [ffi-async.ts:47](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L47)

#### Returns

`number`

***

### QTS\_ResolveException()

> **QTS\_ResolveException**: (`ctx`, `maybe_exception`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: [ffi-async.ts:190](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L190)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### maybe\_exception

[`JSValuePointer`](../README.md#jsvaluepointer)

#### Returns

[`JSValuePointer`](../README.md#jsvaluepointer)

***

### QTS\_RuntimeComputeMemoryUsage()

> **QTS\_RuntimeComputeMemoryUsage**: (`rt`, `ctx`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: [ffi-async.ts:45](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L45)

#### Parameters

##### rt

[`JSRuntimePointer`](../README.md#jsruntimepointer)

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

#### Returns

[`JSValuePointer`](../README.md#jsvaluepointer)

***

### QTS\_RuntimeDisableInterruptHandler()

> **QTS\_RuntimeDisableInterruptHandler**: (`rt`) => `void`

Defined in: [ffi-async.ts:264](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L264)

#### Parameters

##### rt

[`JSRuntimePointer`](../README.md#jsruntimepointer)

#### Returns

`void`

***

### QTS\_RuntimeDisableModuleLoader()

> **QTS\_RuntimeDisableModuleLoader**: (`rt`) => `void`

Defined in: [ffi-async.ts:266](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L266)

#### Parameters

##### rt

[`JSRuntimePointer`](../README.md#jsruntimepointer)

#### Returns

`void`

***

### QTS\_RuntimeDumpMemoryUsage()

> **QTS\_RuntimeDumpMemoryUsage**: (`rt`) => [`OwnedHeapCharPointer`](../README.md#ownedheapcharpointer)

Defined in: [ffi-async.ts:46](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L46)

#### Parameters

##### rt

[`JSRuntimePointer`](../README.md#jsruntimepointer)

#### Returns

[`OwnedHeapCharPointer`](../README.md#ownedheapcharpointer)

***

### QTS\_RuntimeEnableInterruptHandler()

> **QTS\_RuntimeEnableInterruptHandler**: (`rt`) => `void`

Defined in: [ffi-async.ts:263](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L263)

#### Parameters

##### rt

[`JSRuntimePointer`](../README.md#jsruntimepointer)

#### Returns

`void`

***

### QTS\_RuntimeEnableModuleLoader()

> **QTS\_RuntimeEnableModuleLoader**: (`rt`, `use_custom_normalize`) => `void`

Defined in: [ffi-async.ts:265](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L265)

#### Parameters

##### rt

[`JSRuntimePointer`](../README.md#jsruntimepointer)

##### use\_custom\_normalize

`number`

#### Returns

`void`

***

### QTS\_RuntimeSetMaxStackSize()

> **QTS\_RuntimeSetMaxStackSize**: (`rt`, `stack_size`) => `void`

Defined in: [ffi-async.ts:49](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L49)

#### Parameters

##### rt

[`JSRuntimePointer`](../README.md#jsruntimepointer)

##### stack\_size

`number`

#### Returns

`void`

***

### QTS\_RuntimeSetMemoryLimit()

> **QTS\_RuntimeSetMemoryLimit**: (`rt`, `limit`) => `void`

Defined in: [ffi-async.ts:44](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L44)

#### Parameters

##### rt

[`JSRuntimePointer`](../README.md#jsruntimepointer)

##### limit

`number`

#### Returns

`void`

***

### QTS\_SetDebugLogEnabled()

> **QTS\_SetDebugLogEnabled**: (`rt`, `is_enabled`) => `void`

Defined in: [ffi-async.ts:249](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L249)

#### Parameters

##### rt

[`JSRuntimePointer`](../README.md#jsruntimepointer)

##### is\_enabled

`number`

#### Returns

`void`

***

### QTS\_SetProp()

> **QTS\_SetProp**: (`ctx`, `this_val`, `prop_name`, `prop_value`) => `void`

Defined in: [ffi-async.ts:139](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L139)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### this\_val

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

##### prop\_name

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

##### prop\_value

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

#### Returns

`void`

***

### QTS\_SetProp\_MaybeAsync()

> **QTS\_SetProp\_MaybeAsync**: (`ctx`, `this_val`, `prop_name`, `prop_value`) => `void` \| `Promise`\<`void`\>

Defined in: [ffi-async.ts:145](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L145)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### this\_val

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

##### prop\_name

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

##### prop\_value

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

#### Returns

`void` \| `Promise`\<`void`\>

***

### QTS\_TestStringArg()

> **QTS\_TestStringArg**: (`string`) => `void`

Defined in: [ffi-async.ts:247](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L247)

#### Parameters

##### string

`string`

#### Returns

`void`

***

### QTS\_Throw()

> **QTS\_Throw**: (`ctx`, `error`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: [ffi-async.ts:42](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L42)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### error

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

#### Returns

[`JSValuePointer`](../README.md#jsvaluepointer)

***

### QTS\_Typeof()

> **QTS\_Typeof**: (`ctx`, `value`) => [`OwnedHeapCharPointer`](../README.md#ownedheapcharpointer)

Defined in: [ffi-async.ts:219](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-async.ts#L219)

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### value

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

#### Returns

[`OwnedHeapCharPointer`](../README.md#ownedheapcharpointer)
