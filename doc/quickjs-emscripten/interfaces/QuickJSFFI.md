[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../README.md) / QuickJSFFI

# Interface: QuickJSFFI

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:349

Low-level FFI bindings to QuickJS's Emscripten module.
See instead [QuickJSContext](../classes/QuickJSContext.md), the public Javascript interface exposed by this
library.

## Unstable

The FFI interface is considered private and may change.

## Properties

### DEBUG

> `readonly` **DEBUG**: `boolean`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:351

Set at compile time.

***

### QTS\_ArgvGetJSValueConstPointer()

> **QTS\_ArgvGetJSValueConstPointer**: (`argv`, `index`) => [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:413

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

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:419

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

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:418

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

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:411

#### Returns

`number`

***

### QTS\_BuildIsDebug()

> **QTS\_BuildIsDebug**: () => `number`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:410

#### Returns

`number`

***

### QTS\_BuildIsSanitizeLeak()

> **QTS\_BuildIsSanitizeLeak**: () => `number`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:358

#### Returns

`number`

***

### QTS\_Call()

> **QTS\_Call**: (`ctx`, `func_obj`, `this_obj`, `argc`, `argv_ptrs`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:395

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

### QTS\_DefineProp()

> **QTS\_DefineProp**: (`ctx`, `this_val`, `prop_name`, `prop_value`, `get`, `set`, `configurable`, `enumerable`, `has_value`) => `void`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:393

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

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:397

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### obj

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

#### Returns

[`JSBorrowedCharPointer`](../README.md#jsborrowedcharpointer)

***

### QTS\_DupValuePointer()

> **QTS\_DupValuePointer**: (`ctx`, `val`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:374

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

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:398

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

### QTS\_ExecutePendingJob()

> **QTS\_ExecutePendingJob**: (`rt`, `maxJobsToExecute`, `lastJobContext`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:389

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

### QTS\_FreeContext()

> **QTS\_FreeContext**: (`ctx`) => `void`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:369

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

#### Returns

`void`

***

### QTS\_FreeCString()

> **QTS\_FreeCString**: (`ctx`, `str`) => `void`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:373

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

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:367

#### Parameters

##### rt

[`JSRuntimePointer`](../README.md#jsruntimepointer)

#### Returns

`void`

***

### QTS\_FreeValuePointer()

> **QTS\_FreeValuePointer**: (`ctx`, `value`) => `void`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:370

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

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:371

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

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:372

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

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:383

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

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:384

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

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:408

#### Parameters

##### rt

[`JSRuntimePointer`](../README.md#jsruntimepointer)

#### Returns

`number`

***

### QTS\_GetFalse()

> **QTS\_GetFalse**: () => [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:362

#### Returns

[`JSValueConstPointer`](../README.md#jsvalueconstpointer)

***

### QTS\_GetFloat64()

> **QTS\_GetFloat64**: (`ctx`, `value`) => `number`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:380

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

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:403

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

#### Returns

[`JSValuePointer`](../README.md#jsvaluepointer)

***

### QTS\_GetHostRefId()

> **QTS\_GetHostRefId**: (`value`) => `HostRefId`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:365

#### Parameters

##### value

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

#### Returns

`HostRefId`

***

### QTS\_GetLength()

> **QTS\_GetLength**: (`ctx`, `out_len`, `value`) => `number`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:401

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

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:399

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

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:361

#### Returns

[`JSValueConstPointer`](../README.md#jsvalueconstpointer)

***

### QTS\_GetOwnPropertyNames()

> **QTS\_GetOwnPropertyNames**: (`ctx`, `out_ptrs`, `out_len`, `obj`, `flags`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:394

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

### QTS\_GetProp()

> **QTS\_GetProp**: (`ctx`, `this_val`, `prop_name`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:390

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

### QTS\_GetPropNumber()

> **QTS\_GetPropNumber**: (`ctx`, `this_val`, `prop_name`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:391

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

### QTS\_GetString()

> **QTS\_GetString**: (`ctx`, `value`) => [`JSBorrowedCharPointer`](../README.md#jsborrowedcharpointer)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:382

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

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:386

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### value

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

#### Returns

[`JSBorrowedCharPointer`](../README.md#jsborrowedcharpointer)

***

### QTS\_GetTrue()

> **QTS\_GetTrue**: () => [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:363

#### Returns

[`JSValueConstPointer`](../README.md#jsvalueconstpointer)

***

### QTS\_GetUndefined()

> **QTS\_GetUndefined**: () => [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:360

#### Returns

[`JSValueConstPointer`](../README.md#jsvalueconstpointer)

***

### QTS\_IsEqual()

> **QTS\_IsEqual**: (`ctx`, `a`, `b`, `op`) => `number`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:402

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

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:387

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

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:388

#### Parameters

##### rt

[`JSRuntimePointer`](../README.md#jsruntimepointer)

#### Returns

`number`

***

### QTS\_NewArray()

> **QTS\_NewArray**: (`ctx`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:377

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

#### Returns

[`JSValuePointer`](../README.md#jsvaluepointer)

***

### QTS\_NewArrayBuffer()

> **QTS\_NewArrayBuffer**: (`ctx`, `buffer`, `length`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:378

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

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:368

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

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:353

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

#### Returns

[`JSValuePointer`](../README.md#jsvaluepointer)

***

### QTS\_NewFloat64()

> **QTS\_NewFloat64**: (`ctx`, `num`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:379

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

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:412

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

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:364

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

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:375

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

#### Returns

[`JSValuePointer`](../README.md#jsvaluepointer)

***

### QTS\_NewObjectProto()

> **QTS\_NewObjectProto**: (`ctx`, `proto`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:376

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

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:404

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

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:366

#### Returns

[`JSRuntimePointer`](../README.md#jsruntimepointer)

***

### QTS\_NewString()

> **QTS\_NewString**: (`ctx`, `string`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:381

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

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:385

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

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:406

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

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:405

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

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:357

#### Returns

`number`

***

### QTS\_ResolveException()

> **QTS\_ResolveException**: (`ctx`, `maybe_exception`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:396

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

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:355

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

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:415

#### Parameters

##### rt

[`JSRuntimePointer`](../README.md#jsruntimepointer)

#### Returns

`void`

***

### QTS\_RuntimeDisableModuleLoader()

> **QTS\_RuntimeDisableModuleLoader**: (`rt`) => `void`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:417

#### Parameters

##### rt

[`JSRuntimePointer`](../README.md#jsruntimepointer)

#### Returns

`void`

***

### QTS\_RuntimeDumpMemoryUsage()

> **QTS\_RuntimeDumpMemoryUsage**: (`rt`) => [`OwnedHeapCharPointer`](../README.md#ownedheapcharpointer)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:356

#### Parameters

##### rt

[`JSRuntimePointer`](../README.md#jsruntimepointer)

#### Returns

[`OwnedHeapCharPointer`](../README.md#ownedheapcharpointer)

***

### QTS\_RuntimeEnableInterruptHandler()

> **QTS\_RuntimeEnableInterruptHandler**: (`rt`) => `void`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:414

#### Parameters

##### rt

[`JSRuntimePointer`](../README.md#jsruntimepointer)

#### Returns

`void`

***

### QTS\_RuntimeEnableModuleLoader()

> **QTS\_RuntimeEnableModuleLoader**: (`rt`, `use_custom_normalize`) => `void`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:416

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

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:359

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

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:354

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

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:409

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

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:392

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

### QTS\_TestStringArg()

> **QTS\_TestStringArg**: (`string`) => `void`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:407

#### Parameters

##### string

`string`

#### Returns

`void`

***

### QTS\_Throw()

> **QTS\_Throw**: (`ctx`, `error`) => [`JSValuePointer`](../README.md#jsvaluepointer)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:352

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

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:400

#### Parameters

##### ctx

[`JSContextPointer`](../README.md#jscontextpointer)

##### value

[`JSValuePointer`](../README.md#jsvaluepointer) | [`JSValueConstPointer`](../README.md#jsvalueconstpointer)

#### Returns

[`OwnedHeapCharPointer`](../README.md#ownedheapcharpointer)
