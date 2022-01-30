[quickjs-emscripten](../README.md) / [Exports](../modules.md) / [ffi-asyncify](../modules/ffi_asyncify.md) / QuickJSAsyncFFI

# Class: QuickJSAsyncFFI

[ffi-asyncify](../modules/ffi_asyncify.md).QuickJSAsyncFFI

Low-level FFI bindings to QuickJS's Emscripten module.
See instead [QuickJSVm](vm.QuickJSVm.md), the public Javascript interface exposed by this
library.

**`unstable`** The FFI interface is considered private and may change.

## Table of contents

### Constructors

- [constructor](ffi_asyncify.QuickJSAsyncFFI.md#constructor)

### Properties

- [QTS\_ArgvGetJSValueConstPointer](ffi_asyncify.QuickJSAsyncFFI.md#qts_argvgetjsvalueconstpointer)
- [QTS\_Call](ffi_asyncify.QuickJSAsyncFFI.md#qts_call)
- [QTS\_DefineProp](ffi_asyncify.QuickJSAsyncFFI.md#qts_defineprop)
- [QTS\_Dump](ffi_asyncify.QuickJSAsyncFFI.md#qts_dump)
- [QTS\_DupValuePointer](ffi_asyncify.QuickJSAsyncFFI.md#qts_dupvaluepointer)
- [QTS\_Eval](ffi_asyncify.QuickJSAsyncFFI.md#qts_eval)
- [QTS\_ExecutePendingJob](ffi_asyncify.QuickJSAsyncFFI.md#qts_executependingjob)
- [QTS\_FreeContext](ffi_asyncify.QuickJSAsyncFFI.md#qts_freecontext)
- [QTS\_FreeRuntime](ffi_asyncify.QuickJSAsyncFFI.md#qts_freeruntime)
- [QTS\_FreeValuePointer](ffi_asyncify.QuickJSAsyncFFI.md#qts_freevaluepointer)
- [QTS\_GetFalse](ffi_asyncify.QuickJSAsyncFFI.md#qts_getfalse)
- [QTS\_GetFloat64](ffi_asyncify.QuickJSAsyncFFI.md#qts_getfloat64)
- [QTS\_GetGlobalObject](ffi_asyncify.QuickJSAsyncFFI.md#qts_getglobalobject)
- [QTS\_GetNull](ffi_asyncify.QuickJSAsyncFFI.md#qts_getnull)
- [QTS\_GetProp](ffi_asyncify.QuickJSAsyncFFI.md#qts_getprop)
- [QTS\_GetString](ffi_asyncify.QuickJSAsyncFFI.md#qts_getstring)
- [QTS\_GetTrue](ffi_asyncify.QuickJSAsyncFFI.md#qts_gettrue)
- [QTS\_GetUndefined](ffi_asyncify.QuickJSAsyncFFI.md#qts_getundefined)
- [QTS\_IsJobPending](ffi_asyncify.QuickJSAsyncFFI.md#qts_isjobpending)
- [QTS\_NewArray](ffi_asyncify.QuickJSAsyncFFI.md#qts_newarray)
- [QTS\_NewContext](ffi_asyncify.QuickJSAsyncFFI.md#qts_newcontext)
- [QTS\_NewError](ffi_asyncify.QuickJSAsyncFFI.md#qts_newerror)
- [QTS\_NewFloat64](ffi_asyncify.QuickJSAsyncFFI.md#qts_newfloat64)
- [QTS\_NewFunction](ffi_asyncify.QuickJSAsyncFFI.md#qts_newfunction)
- [QTS\_NewObject](ffi_asyncify.QuickJSAsyncFFI.md#qts_newobject)
- [QTS\_NewObjectProto](ffi_asyncify.QuickJSAsyncFFI.md#qts_newobjectproto)
- [QTS\_NewPromiseCapability](ffi_asyncify.QuickJSAsyncFFI.md#qts_newpromisecapability)
- [QTS\_NewRuntime](ffi_asyncify.QuickJSAsyncFFI.md#qts_newruntime)
- [QTS\_NewString](ffi_asyncify.QuickJSAsyncFFI.md#qts_newstring)
- [QTS\_ResolveException](ffi_asyncify.QuickJSAsyncFFI.md#qts_resolveexception)
- [QTS\_RuntimeComputeMemoryUsage](ffi_asyncify.QuickJSAsyncFFI.md#qts_runtimecomputememoryusage)
- [QTS\_RuntimeDisableInterruptHandler](ffi_asyncify.QuickJSAsyncFFI.md#qts_runtimedisableinterrupthandler)
- [QTS\_RuntimeDumpMemoryUsage](ffi_asyncify.QuickJSAsyncFFI.md#qts_runtimedumpmemoryusage)
- [QTS\_RuntimeEnableInterruptHandler](ffi_asyncify.QuickJSAsyncFFI.md#qts_runtimeenableinterrupthandler)
- [QTS\_RuntimeSetMemoryLimit](ffi_asyncify.QuickJSAsyncFFI.md#qts_runtimesetmemorylimit)
- [QTS\_SetHostCallback](ffi_asyncify.QuickJSAsyncFFI.md#qts_sethostcallback)
- [QTS\_SetInterruptCallback](ffi_asyncify.QuickJSAsyncFFI.md#qts_setinterruptcallback)
- [QTS\_SetProp](ffi_asyncify.QuickJSAsyncFFI.md#qts_setprop)
- [QTS\_TestStringArg](ffi_asyncify.QuickJSAsyncFFI.md#qts_teststringarg)
- [QTS\_Throw](ffi_asyncify.QuickJSAsyncFFI.md#qts_throw)
- [QTS\_Typeof](ffi_asyncify.QuickJSAsyncFFI.md#qts_typeof)

## Constructors

### constructor

• **new QuickJSAsyncFFI**(`module`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `module` | [`QuickJSAsyncEmscriptenModule`](../interfaces/emscripten_types.QuickJSAsyncEmscriptenModule.md) |

#### Defined in

[ffi-asyncify.ts:23](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L23)

## Properties

### QTS\_ArgvGetJSValueConstPointer

• **QTS\_ArgvGetJSValueConstPointer**: (`argv`: [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer), `index`: `number`) => [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer)

#### Type declaration

▸ (`argv`, `index`): [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer)

##### Parameters

| Name | Type |
| :------ | :------ |
| `argv` | [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer) |
| `index` | `number` |

##### Returns

[`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer)

#### Defined in

[ffi-asyncify.ts:29](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L29)

___

### QTS\_Call

• **QTS\_Call**: (`ctx`: [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer), `func_obj`: [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer), `this_obj`: [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer), `argc`: `number`, `argv_ptrs`: [`JSValueConstPointerPointer`](../modules/ffi_types.md#jsvalueconstpointerpointer)) => `Promise`<[`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)\>

#### Type declaration

▸ (`ctx`, `func_obj`, `this_obj`, `argc`, `argv_ptrs`): `Promise`<[`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer) |
| `func_obj` | [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer) |
| `this_obj` | [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer) |
| `argc` | `number` |
| `argv_ptrs` | [`JSValueConstPointerPointer`](../modules/ffi_types.md#jsvalueconstpointerpointer) |

##### Returns

`Promise`<[`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)\>

#### Defined in

[ffi-asyncify.ts:219](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L219)

___

### QTS\_DefineProp

• **QTS\_DefineProp**: (`ctx`: [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer), `this_val`: [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer), `prop_name`: [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer), `prop_value`: [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer), `get`: [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer), `set`: [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer), `configurable`: `boolean`, `enumerable`: `boolean`, `has_value`: `boolean`) => `void`

#### Type declaration

▸ (`ctx`, `this_val`, `prop_name`, `prop_value`, `get`, `set`, `configurable`, `enumerable`, `has_value`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer) |
| `this_val` | [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer) |
| `prop_name` | [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer) |
| `prop_value` | [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer) |
| `get` | [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer) |
| `set` | [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer) |
| `configurable` | `boolean` |
| `enumerable` | `boolean` |
| `has_value` | `boolean` |

##### Returns

`void`

#### Defined in

[ffi-asyncify.ts:197](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L197)

___

### QTS\_Dump

• **QTS\_Dump**: (`ctx`: [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer), `obj`: [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)) => `Promise`<`string`\>

#### Type declaration

▸ (`ctx`, `obj`): `Promise`<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer) |
| `obj` | [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer) |

##### Returns

`Promise`<`string`\>

#### Defined in

[ffi-asyncify.ts:237](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L237)

___

### QTS\_DupValuePointer

• **QTS\_DupValuePointer**: (`ctx`: [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer), `val`: [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)) => [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

#### Type declaration

▸ (`ctx`, `val`): [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer) |
| `val` | [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer) |

##### Returns

[`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

#### Defined in

[ffi-asyncify.ts:116](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L116)

___

### QTS\_Eval

• **QTS\_Eval**: (`ctx`: [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer), `js_code`: [`HeapCharPointer`](../modules/ffi_types.md#heapcharpointer), `filename`: `string`) => `Promise`<[`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)\>

#### Type declaration

▸ (`ctx`, `js_code`, `filename`): `Promise`<[`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer) |
| `js_code` | [`HeapCharPointer`](../modules/ffi_types.md#heapcharpointer) |
| `filename` | `string` |

##### Returns

`Promise`<[`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)\>

#### Defined in

[ffi-asyncify.ts:244](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L244)

___

### QTS\_ExecutePendingJob

• **QTS\_ExecutePendingJob**: (`rt`: [`JSRuntimePointer`](../modules/ffi_types.md#jsruntimepointer), `maxJobsToExecute`: `number`) => `Promise`<[`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)\>

#### Type declaration

▸ (`rt`, `maxJobsToExecute`): `Promise`<[`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `rt` | [`JSRuntimePointer`](../modules/ffi_types.md#jsruntimepointer) |
| `maxJobsToExecute` | `number` |

##### Returns

`Promise`<[`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)\>

#### Defined in

[ffi-asyncify.ts:164](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L164)

___

### QTS\_FreeContext

• **QTS\_FreeContext**: (`ctx`: [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer)) => `void`

#### Type declaration

▸ (`ctx`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer) |

##### Returns

`void`

#### Defined in

[ffi-asyncify.ts:107](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L107)

___

### QTS\_FreeRuntime

• **QTS\_FreeRuntime**: (`rt`: [`JSRuntimePointer`](../modules/ffi_types.md#jsruntimepointer)) => `void`

#### Type declaration

▸ (`rt`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `rt` | [`JSRuntimePointer`](../modules/ffi_types.md#jsruntimepointer) |

##### Returns

`void`

#### Defined in

[ffi-asyncify.ts:97](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L97)

___

### QTS\_FreeValuePointer

• **QTS\_FreeValuePointer**: (`ctx`: [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer), `value`: [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)) => `void`

#### Type declaration

▸ (`ctx`, `value`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer) |
| `value` | [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer) |

##### Returns

`void`

#### Defined in

[ffi-asyncify.ts:111](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L111)

___

### QTS\_GetFalse

• **QTS\_GetFalse**: () => [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer)

#### Type declaration

▸ (): [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer)

##### Returns

[`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer)

#### Defined in

[ffi-asyncify.ts:91](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L91)

___

### QTS\_GetFloat64

• **QTS\_GetFloat64**: (`ctx`: [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer), `value`: [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)) => `number`

#### Type declaration

▸ (`ctx`, `value`): `number`

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer) |
| `value` | [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer) |

##### Returns

`number`

#### Defined in

[ffi-asyncify.ts:143](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L143)

___

### QTS\_GetGlobalObject

• **QTS\_GetGlobalObject**: (`ctx`: [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer)) => [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

#### Type declaration

▸ (`ctx`): [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer) |

##### Returns

[`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

#### Defined in

[ffi-asyncify.ts:260](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L260)

___

### QTS\_GetNull

• **QTS\_GetNull**: () => [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer)

#### Type declaration

▸ (): [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer)

##### Returns

[`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer)

#### Defined in

[ffi-asyncify.ts:89](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L89)

___

### QTS\_GetProp

• **QTS\_GetProp**: (`ctx`: [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer), `this_val`: [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer), `prop_name`: [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)) => `Promise`<[`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)\>

#### Type declaration

▸ (`ctx`, `this_val`, `prop_name`): `Promise`<[`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer) |
| `this_val` | [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer) |
| `prop_name` | [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer) |

##### Returns

`Promise`<[`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)\>

#### Defined in

[ffi-asyncify.ts:174](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L174)

___

### QTS\_GetString

• **QTS\_GetString**: (`ctx`: [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer), `value`: [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)) => `string`

#### Type declaration

▸ (`ctx`, `value`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer) |
| `value` | [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer) |

##### Returns

`string`

#### Defined in

[ffi-asyncify.ts:153](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L153)

___

### QTS\_GetTrue

• **QTS\_GetTrue**: () => [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer)

#### Type declaration

▸ (): [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer)

##### Returns

[`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer)

#### Defined in

[ffi-asyncify.ts:93](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L93)

___

### QTS\_GetUndefined

• **QTS\_GetUndefined**: () => [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer)

#### Type declaration

▸ (): [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer)

##### Returns

[`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer)

#### Defined in

[ffi-asyncify.ts:87](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L87)

___

### QTS\_IsJobPending

• **QTS\_IsJobPending**: (`rt`: [`JSRuntimePointer`](../modules/ffi_types.md#jsruntimepointer)) => `number`

#### Type declaration

▸ (`rt`): `number`

##### Parameters

| Name | Type |
| :------ | :------ |
| `rt` | [`JSRuntimePointer`](../modules/ffi_types.md#jsruntimepointer) |

##### Returns

`number`

#### Defined in

[ffi-asyncify.ts:158](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L158)

___

### QTS\_NewArray

• **QTS\_NewArray**: (`ctx`: [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer)) => [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

#### Type declaration

▸ (`ctx`): [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer) |

##### Returns

[`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

#### Defined in

[ffi-asyncify.ts:132](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L132)

___

### QTS\_NewContext

• **QTS\_NewContext**: (`rt`: [`JSRuntimePointer`](../modules/ffi_types.md#jsruntimepointer)) => [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer)

#### Type declaration

▸ (`rt`): [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer)

##### Parameters

| Name | Type |
| :------ | :------ |
| `rt` | [`JSRuntimePointer`](../modules/ffi_types.md#jsruntimepointer) |

##### Returns

[`JSContextPointer`](../modules/ffi_types.md#jscontextpointer)

#### Defined in

[ffi-asyncify.ts:101](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L101)

___

### QTS\_NewError

• **QTS\_NewError**: (`ctx`: [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer)) => [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

#### Type declaration

▸ (`ctx`): [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer) |

##### Returns

[`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

#### Defined in

[ffi-asyncify.ts:52](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L52)

___

### QTS\_NewFloat64

• **QTS\_NewFloat64**: (`ctx`: [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer), `num`: `number`) => [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

#### Type declaration

▸ (`ctx`, `num`): [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer) |
| `num` | `number` |

##### Returns

[`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

#### Defined in

[ffi-asyncify.ts:138](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L138)

___

### QTS\_NewFunction

• **QTS\_NewFunction**: (`ctx`: [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer), `func_data`: [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer), `name`: `string`) => [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

#### Type declaration

▸ (`ctx`, `func_data`, `name`): [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer) |
| `func_data` | [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer) |
| `name` | `string` |

##### Returns

[`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

#### Defined in

[ffi-asyncify.ts:37](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L37)

___

### QTS\_NewObject

• **QTS\_NewObject**: (`ctx`: [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer)) => [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

#### Type declaration

▸ (`ctx`): [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer) |

##### Returns

[`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

#### Defined in

[ffi-asyncify.ts:121](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L121)

___

### QTS\_NewObjectProto

• **QTS\_NewObjectProto**: (`ctx`: [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer), `proto`: [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)) => [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

#### Type declaration

▸ (`ctx`, `proto`): [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer) |
| `proto` | [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer) |

##### Returns

[`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

#### Defined in

[ffi-asyncify.ts:127](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L127)

___

### QTS\_NewPromiseCapability

• **QTS\_NewPromiseCapability**: (`ctx`: [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer), `resolve_funcs_out`: [`JSValuePointerPointer`](../modules/ffi_types.md#jsvaluepointerpointer)) => [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

#### Type declaration

▸ (`ctx`, `resolve_funcs_out`): [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer) |
| `resolve_funcs_out` | [`JSValuePointerPointer`](../modules/ffi_types.md#jsvaluepointerpointer) |

##### Returns

[`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

#### Defined in

[ffi-asyncify.ts:264](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L264)

___

### QTS\_NewRuntime

• **QTS\_NewRuntime**: () => [`JSRuntimePointer`](../modules/ffi_types.md#jsruntimepointer)

#### Type declaration

▸ (): [`JSRuntimePointer`](../modules/ffi_types.md#jsruntimepointer)

##### Returns

[`JSRuntimePointer`](../modules/ffi_types.md#jsruntimepointer)

#### Defined in

[ffi-asyncify.ts:95](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L95)

___

### QTS\_NewString

• **QTS\_NewString**: (`ctx`: [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer), `string`: [`HeapCharPointer`](../modules/ffi_types.md#heapcharpointer)) => [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

#### Type declaration

▸ (`ctx`, `string`): [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer) |
| `string` | [`HeapCharPointer`](../modules/ffi_types.md#heapcharpointer) |

##### Returns

[`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

#### Defined in

[ffi-asyncify.ts:148](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L148)

___

### QTS\_ResolveException

• **QTS\_ResolveException**: (`ctx`: [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer), `maybe_exception`: [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)) => [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

#### Type declaration

▸ (`ctx`, `maybe_exception`): [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer) |
| `maybe_exception` | [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer) |

##### Returns

[`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

#### Defined in

[ffi-asyncify.ts:232](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L232)

___

### QTS\_RuntimeComputeMemoryUsage

• **QTS\_RuntimeComputeMemoryUsage**: (`rt`: [`JSRuntimePointer`](../modules/ffi_types.md#jsruntimepointer), `ctx`: [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer)) => [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

#### Type declaration

▸ (`rt`, `ctx`): [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

##### Parameters

| Name | Type |
| :------ | :------ |
| `rt` | [`JSRuntimePointer`](../modules/ffi_types.md#jsruntimepointer) |
| `ctx` | [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer) |

##### Returns

[`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

#### Defined in

[ffi-asyncify.ts:75](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L75)

___

### QTS\_RuntimeDisableInterruptHandler

• **QTS\_RuntimeDisableInterruptHandler**: (`rt`: [`JSRuntimePointer`](../modules/ffi_types.md#jsruntimepointer)) => `void`

#### Type declaration

▸ (`rt`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `rt` | [`JSRuntimePointer`](../modules/ffi_types.md#jsruntimepointer) |

##### Returns

`void`

#### Defined in

[ffi-asyncify.ts:66](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L66)

___

### QTS\_RuntimeDumpMemoryUsage

• **QTS\_RuntimeDumpMemoryUsage**: (`rt`: [`JSRuntimePointer`](../modules/ffi_types.md#jsruntimepointer)) => `string`

#### Type declaration

▸ (`rt`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `rt` | [`JSRuntimePointer`](../modules/ffi_types.md#jsruntimepointer) |

##### Returns

`string`

#### Defined in

[ffi-asyncify.ts:83](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L83)

___

### QTS\_RuntimeEnableInterruptHandler

• **QTS\_RuntimeEnableInterruptHandler**: (`rt`: [`JSRuntimePointer`](../modules/ffi_types.md#jsruntimepointer)) => `void`

#### Type declaration

▸ (`rt`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `rt` | [`JSRuntimePointer`](../modules/ffi_types.md#jsruntimepointer) |

##### Returns

`void`

#### Defined in

[ffi-asyncify.ts:62](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L62)

___

### QTS\_RuntimeSetMemoryLimit

• **QTS\_RuntimeSetMemoryLimit**: (`rt`: [`JSRuntimePointer`](../modules/ffi_types.md#jsruntimepointer), `limit`: `number`) => `void`

#### Type declaration

▸ (`rt`, `limit`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `rt` | [`JSRuntimePointer`](../modules/ffi_types.md#jsruntimepointer) |
| `limit` | `number` |

##### Returns

`void`

#### Defined in

[ffi-asyncify.ts:70](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L70)

___

### QTS\_SetHostCallback

• **QTS\_SetHostCallback**: (`fp`: [`QTS_C_To_HostCallbackFuncPointer`](../modules/ffi_types.md#qts_c_to_hostcallbackfuncpointer)) => `void`

#### Type declaration

▸ (`fp`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `fp` | [`QTS_C_To_HostCallbackFuncPointer`](../modules/ffi_types.md#qts_c_to_hostcallbackfuncpointer) |

##### Returns

`void`

#### Defined in

[ffi-asyncify.ts:25](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L25)

___

### QTS\_SetInterruptCallback

• **QTS\_SetInterruptCallback**: (`cb`: [`QTS_C_To_HostInterruptFuncPointer`](../modules/ffi_types.md#qts_c_to_hostinterruptfuncpointer)) => `void`

#### Type declaration

▸ (`cb`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | [`QTS_C_To_HostInterruptFuncPointer`](../modules/ffi_types.md#qts_c_to_hostinterruptfuncpointer) |

##### Returns

`void`

#### Defined in

[ffi-asyncify.ts:58](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L58)

___

### QTS\_SetProp

• **QTS\_SetProp**: (`ctx`: [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer), `this_val`: [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer), `prop_name`: [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer), `prop_value`: [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)) => `Promise`<`void`\>

#### Type declaration

▸ (`ctx`, `this_val`, `prop_name`, `prop_value`): `Promise`<`void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer) |
| `this_val` | [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer) |
| `prop_name` | [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer) |
| `prop_value` | [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer) |

##### Returns

`Promise`<`void`\>

#### Defined in

[ffi-asyncify.ts:185](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L185)

___

### QTS\_TestStringArg

• **QTS\_TestStringArg**: (`string`: `string`) => `void`

#### Type declaration

▸ (`string`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `string` | `string` |

##### Returns

`void`

#### Defined in

[ffi-asyncify.ts:272](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L272)

___

### QTS\_Throw

• **QTS\_Throw**: (`ctx`: [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer), `error`: [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)) => [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

#### Type declaration

▸ (`ctx`, `error`): [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer) |
| `error` | [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer) |

##### Returns

[`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)

#### Defined in

[ffi-asyncify.ts:47](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L47)

___

### QTS\_Typeof

• **QTS\_Typeof**: (`ctx`: [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer), `value`: [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer)) => `string`

#### Type declaration

▸ (`ctx`, `value`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`JSContextPointer`](../modules/ffi_types.md#jscontextpointer) |
| `value` | [`JSValueConstPointer`](../modules/ffi_types.md#jsvalueconstpointer) \| [`JSValuePointer`](../modules/ffi_types.md#jsvaluepointer) |

##### Returns

`string`

#### Defined in

[ffi-asyncify.ts:255](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi-asyncify.ts#L255)
