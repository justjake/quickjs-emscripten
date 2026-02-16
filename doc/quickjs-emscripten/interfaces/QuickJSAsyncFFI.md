[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../README.md) / QuickJSAsyncFFI

# Interface: QuickJSAsyncFFI

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:429

Low-level FFI bindings to QuickJS's Emscripten module.
See instead [QuickJSContext](../classes/QuickJSContext.md), the public Javascript interface exposed by this
library.

## Contents

* [Unstable](#unstable)
* [Properties](#properties)
  * [DEBUG](#debug)
  * [QTS\_ArgvGetJSValueConstPointer()](#qts_argvgetjsvalueconstpointer)
  * [QTS\_bjson\_decode()](#qts_bjson_decode)
  * [QTS\_bjson\_encode()](#qts_bjson_encode)
  * [QTS\_BuildIsAsyncify()](#qts_buildisasyncify)
  * [QTS\_BuildIsDebug()](#qts_buildisdebug)
  * [QTS\_BuildIsSanitizeLeak()](#qts_buildissanitizeleak)
  * [QTS\_Call()](#qts_call)
  * [QTS\_Call\_MaybeAsync()](#qts_call_maybeasync)
  * [QTS\_DefineProp()](#qts_defineprop)
  * [QTS\_Dump()](#qts_dump)
  * [QTS\_Dump\_MaybeAsync()](#qts_dump_maybeasync)
  * [QTS\_DupValuePointer()](#qts_dupvaluepointer)
  * [QTS\_Eval()](#qts_eval)
  * [QTS\_Eval\_MaybeAsync()](#qts_eval_maybeasync)
  * [QTS\_ExecutePendingJob()](#qts_executependingjob)
  * [QTS\_ExecutePendingJob\_MaybeAsync()](#qts_executependingjob_maybeasync)
  * [QTS\_FreeContext()](#qts_freecontext)
  * [QTS\_FreeCString()](#qts_freecstring)
  * [QTS\_FreeRuntime()](#qts_freeruntime)
  * [QTS\_FreeValuePointer()](#qts_freevaluepointer)
  * [QTS\_FreeValuePointerRuntime()](#qts_freevaluepointerruntime)
  * [QTS\_FreeVoidPointer()](#qts_freevoidpointer)
  * [QTS\_GetArrayBuffer()](#qts_getarraybuffer)
  * [QTS\_GetArrayBufferLength()](#qts_getarraybufferlength)
  * [QTS\_GetDebugLogEnabled()](#qts_getdebuglogenabled)
  * [QTS\_GetFalse()](#qts_getfalse)
  * [QTS\_GetFloat64()](#qts_getfloat64)
  * [QTS\_GetGlobalObject()](#qts_getglobalobject)
  * [QTS\_GetHostRefId()](#qts_gethostrefid)
  * [QTS\_GetLength()](#qts_getlength)
  * [QTS\_GetModuleNamespace()](#qts_getmodulenamespace)
  * [QTS\_GetNull()](#qts_getnull)
  * [QTS\_GetOwnPropertyNames()](#qts_getownpropertynames)
  * [QTS\_GetOwnPropertyNames\_MaybeAsync()](#qts_getownpropertynames_maybeasync)
  * [QTS\_GetProp()](#qts_getprop)
  * [QTS\_GetProp\_MaybeAsync()](#qts_getprop_maybeasync)
  * [QTS\_GetPropNumber()](#qts_getpropnumber)
  * [QTS\_GetPropNumber\_MaybeAsync()](#qts_getpropnumber_maybeasync)
  * [QTS\_GetString()](#qts_getstring)
  * [QTS\_GetSymbolDescriptionOrKey()](#qts_getsymboldescriptionorkey)
  * [QTS\_GetSymbolDescriptionOrKey\_MaybeAsync()](#qts_getsymboldescriptionorkey_maybeasync)
  * [QTS\_GetTrue()](#qts_gettrue)
  * [QTS\_GetUndefined()](#qts_getundefined)
  * [QTS\_IsEqual()](#qts_isequal)
  * [QTS\_IsGlobalSymbol()](#qts_isglobalsymbol)
  * [QTS\_IsJobPending()](#qts_isjobpending)
  * [QTS\_NewArray()](#qts_newarray)
  * [QTS\_NewArrayBuffer()](#qts_newarraybuffer)
  * [QTS\_NewContext()](#qts_newcontext)
  * [QTS\_NewError()](#qts_newerror)
  * [QTS\_NewFloat64()](#qts_newfloat64)
  * [QTS\_NewFunction()](#qts_newfunction)
  * [QTS\_NewHostRef()](#qts_newhostref)
  * [QTS\_NewObject()](#qts_newobject)
  * [QTS\_NewObjectProto()](#qts_newobjectproto)
  * [QTS\_NewPromiseCapability()](#qts_newpromisecapability)
  * [QTS\_NewRuntime()](#qts_newruntime)
  * [QTS\_NewString()](#qts_newstring)
  * [QTS\_NewSymbol()](#qts_newsymbol)
  * [QTS\_PromiseResult()](#qts_promiseresult)
  * [QTS\_PromiseState()](#qts_promisestate)
  * [QTS\_RecoverableLeakCheck()](#qts_recoverableleakcheck)
  * [QTS\_ResolveException()](#qts_resolveexception)
  * [QTS\_RuntimeComputeMemoryUsage()](#qts_runtimecomputememoryusage)
  * [QTS\_RuntimeDisableInterruptHandler()](#qts_runtimedisableinterrupthandler)
  * [QTS\_RuntimeDisableModuleLoader()](#qts_runtimedisablemoduleloader)
  * [QTS\_RuntimeDumpMemoryUsage()](#qts_runtimedumpmemoryusage)
  * [QTS\_RuntimeEnableInterruptHandler()](#qts_runtimeenableinterrupthandler)
  * [QTS\_RuntimeEnableModuleLoader()](#qts_runtimeenablemoduleloader)
  * [QTS\_RuntimeSetMaxStackSize()](#qts_runtimesetmaxstacksize)
  * [QTS\_RuntimeSetMemoryLimit()](#qts_runtimesetmemorylimit)
  * [QTS\_SetDebugLogEnabled()](#qts_setdebuglogenabled)
  * [QTS\_SetProp()](#qts_setprop)
  * [QTS\_SetProp\_MaybeAsync()](#qts_setprop_maybeasync)
  * [QTS\_TestStringArg()](#qts_teststringarg)
  * [QTS\_Throw()](#qts_throw)
  * [QTS\_Typeof()](#qts_typeof)

## Unstable

The FFI interface is considered private and may change.

## Properties

### DEBUG

> `readonly` **DEBUG**: `boolean`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:431

Set at compile time.

***

### QTS\_ArgvGetJSValueConstPointer()

> **QTS\_ArgvGetJSValueConstPointer**: (`argv`, `index`) => [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:502

#### Parameters

##### argv

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

##### index

`number`

#### Returns

[`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

***

### QTS\_bjson\_decode()

> **QTS\_bjson\_decode**: (`ctx`, `data`) => [`JSValuePointer`](../type-aliases/JSValuePointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:508

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### data

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

#### Returns

[`JSValuePointer`](../type-aliases/JSValuePointer.md)

***

### QTS\_bjson\_encode()

> **QTS\_bjson\_encode**: (`ctx`, `val`) => [`JSValuePointer`](../type-aliases/JSValuePointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:507

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### val

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

#### Returns

[`JSValuePointer`](../type-aliases/JSValuePointer.md)

***

### QTS\_BuildIsAsyncify()

> **QTS\_BuildIsAsyncify**: () => `number`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:500

#### Returns

`number`

***

### QTS\_BuildIsDebug()

> **QTS\_BuildIsDebug**: () => `number`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:499

#### Returns

`number`

***

### QTS\_BuildIsSanitizeLeak()

> **QTS\_BuildIsSanitizeLeak**: () => `number`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:438

#### Returns

`number`

***

### QTS\_Call()

> **QTS\_Call**: (`ctx`, `func_obj`, `this_obj`, `argc`, `argv_ptrs`) => [`JSValuePointer`](../type-aliases/JSValuePointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:481

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### func\_obj

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

##### this\_obj

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

##### argc

`number`

##### argv\_ptrs

[`JSValueConstPointerPointer`](../type-aliases/JSValueConstPointerPointer.md)

#### Returns

[`JSValuePointer`](../type-aliases/JSValuePointer.md)

***

### QTS\_Call\_MaybeAsync()

> **QTS\_Call\_MaybeAsync**: (`ctx`, `func_obj`, `this_obj`, `argc`, `argv_ptrs`) => [`JSValuePointer`](../type-aliases/JSValuePointer.md) | `Promise`<[`JSValuePointer`](../type-aliases/JSValuePointer.md)>

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:482

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### func\_obj

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

##### this\_obj

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

##### argc

`number`

##### argv\_ptrs

[`JSValueConstPointerPointer`](../type-aliases/JSValueConstPointerPointer.md)

#### Returns

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | `Promise`<[`JSValuePointer`](../type-aliases/JSValuePointer.md)>

***

### QTS\_DefineProp()

> **QTS\_DefineProp**: (`ctx`, `this_val`, `prop_name`, `prop_value`, `get`, `set`, `configurable`, `enumerable`, `has_value`) => `void`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:478

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### this\_val

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

##### prop\_name

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

##### prop\_value

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

##### get

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

##### set

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

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

> **QTS\_Dump**: (`ctx`, `obj`) => [`JSBorrowedCharPointer`](../type-aliases/JSBorrowedCharPointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:484

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### obj

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

#### Returns

[`JSBorrowedCharPointer`](../type-aliases/JSBorrowedCharPointer.md)

***

### QTS\_Dump\_MaybeAsync()

> **QTS\_Dump\_MaybeAsync**: (`ctx`, `obj`) => [`JSBorrowedCharPointer`](../type-aliases/JSBorrowedCharPointer.md) | `Promise`<[`JSBorrowedCharPointer`](../type-aliases/JSBorrowedCharPointer.md)>

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:485

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### obj

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

#### Returns

[`JSBorrowedCharPointer`](../type-aliases/JSBorrowedCharPointer.md) | `Promise`<[`JSBorrowedCharPointer`](../type-aliases/JSBorrowedCharPointer.md)>

***

### QTS\_DupValuePointer()

> **QTS\_DupValuePointer**: (`ctx`, `val`) => [`JSValuePointer`](../type-aliases/JSValuePointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:454

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### val

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

#### Returns

[`JSValuePointer`](../type-aliases/JSValuePointer.md)

***

### QTS\_Eval()

> **QTS\_Eval**: (`ctx`, `js_code`, `js_code_length`, `filename`, `detectModule`, `evalFlags`) => [`JSValuePointer`](../type-aliases/JSValuePointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:486

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### js\_code

[`BorrowedHeapCharPointer`](../type-aliases/BorrowedHeapCharPointer.md)

##### js\_code\_length

`number`

##### filename

`string`

##### detectModule

`EvalDetectModule`

##### evalFlags

[`EvalFlags`](../variables/EvalFlags.md)

#### Returns

[`JSValuePointer`](../type-aliases/JSValuePointer.md)

***

### QTS\_Eval\_MaybeAsync()

> **QTS\_Eval\_MaybeAsync**: (`ctx`, `js_code`, `js_code_length`, `filename`, `detectModule`, `evalFlags`) => [`JSValuePointer`](../type-aliases/JSValuePointer.md) | `Promise`<[`JSValuePointer`](../type-aliases/JSValuePointer.md)>

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:487

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### js\_code

[`BorrowedHeapCharPointer`](../type-aliases/BorrowedHeapCharPointer.md)

##### js\_code\_length

`number`

##### filename

`string`

##### detectModule

`EvalDetectModule`

##### evalFlags

[`EvalFlags`](../variables/EvalFlags.md)

#### Returns

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | `Promise`<[`JSValuePointer`](../type-aliases/JSValuePointer.md)>

***

### QTS\_ExecutePendingJob()

> **QTS\_ExecutePendingJob**: (`rt`, `maxJobsToExecute`, `lastJobContext`) => [`JSValuePointer`](../type-aliases/JSValuePointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:470

#### Parameters

##### rt

[`JSRuntimePointer`](../type-aliases/JSRuntimePointer.md)

##### maxJobsToExecute

`number`

##### lastJobContext

[`JSContextPointerPointer`](../type-aliases/JSContextPointerPointer.md)

#### Returns

[`JSValuePointer`](../type-aliases/JSValuePointer.md)

***

### QTS\_ExecutePendingJob\_MaybeAsync()

> **QTS\_ExecutePendingJob\_MaybeAsync**: (`rt`, `maxJobsToExecute`, `lastJobContext`) => [`JSValuePointer`](../type-aliases/JSValuePointer.md) | `Promise`<[`JSValuePointer`](../type-aliases/JSValuePointer.md)>

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:471

#### Parameters

##### rt

[`JSRuntimePointer`](../type-aliases/JSRuntimePointer.md)

##### maxJobsToExecute

`number`

##### lastJobContext

[`JSContextPointerPointer`](../type-aliases/JSContextPointerPointer.md)

#### Returns

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | `Promise`<[`JSValuePointer`](../type-aliases/JSValuePointer.md)>

***

### QTS\_FreeContext()

> **QTS\_FreeContext**: (`ctx`) => `void`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:449

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

#### Returns

`void`

***

### QTS\_FreeCString()

> **QTS\_FreeCString**: (`ctx`, `str`) => `void`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:453

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### str

[`JSBorrowedCharPointer`](../type-aliases/JSBorrowedCharPointer.md)

#### Returns

`void`

***

### QTS\_FreeRuntime()

> **QTS\_FreeRuntime**: (`rt`) => `void`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:447

#### Parameters

##### rt

[`JSRuntimePointer`](../type-aliases/JSRuntimePointer.md)

#### Returns

`void`

***

### QTS\_FreeValuePointer()

> **QTS\_FreeValuePointer**: (`ctx`, `value`) => `void`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:450

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### value

[`JSValuePointer`](../type-aliases/JSValuePointer.md)

#### Returns

`void`

***

### QTS\_FreeValuePointerRuntime()

> **QTS\_FreeValuePointerRuntime**: (`rt`, `value`) => `void`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:451

#### Parameters

##### rt

[`JSRuntimePointer`](../type-aliases/JSRuntimePointer.md)

##### value

[`JSValuePointer`](../type-aliases/JSValuePointer.md)

#### Returns

`void`

***

### QTS\_FreeVoidPointer()

> **QTS\_FreeVoidPointer**: (`ctx`, `ptr`) => `void`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:452

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### ptr

[`JSVoidPointer`](../type-aliases/JSVoidPointer.md)

#### Returns

`void`

***

### QTS\_GetArrayBuffer()

> **QTS\_GetArrayBuffer**: (`ctx`, `data`) => [`JSVoidPointer`](../type-aliases/JSVoidPointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:463

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### data

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

#### Returns

[`JSVoidPointer`](../type-aliases/JSVoidPointer.md)

***

### QTS\_GetArrayBufferLength()

> **QTS\_GetArrayBufferLength**: (`ctx`, `data`) => `number`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:464

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### data

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

#### Returns

`number`

***

### QTS\_GetDebugLogEnabled()

> **QTS\_GetDebugLogEnabled**: (`rt`) => `number`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:497

#### Parameters

##### rt

[`JSRuntimePointer`](../type-aliases/JSRuntimePointer.md)

#### Returns

`number`

***

### QTS\_GetFalse()

> **QTS\_GetFalse**: () => [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:442

#### Returns

[`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

***

### QTS\_GetFloat64()

> **QTS\_GetFloat64**: (`ctx`, `value`) => `number`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:460

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### value

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

#### Returns

`number`

***

### QTS\_GetGlobalObject()

> **QTS\_GetGlobalObject**: (`ctx`) => [`JSValuePointer`](../type-aliases/JSValuePointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:492

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

#### Returns

[`JSValuePointer`](../type-aliases/JSValuePointer.md)

***

### QTS\_GetHostRefId()

> **QTS\_GetHostRefId**: (`value`) => `HostRefId`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:445

#### Parameters

##### value

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

#### Returns

`HostRefId`

***

### QTS\_GetLength()

> **QTS\_GetLength**: (`ctx`, `out_len`, `value`) => `number`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:490

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### out\_len

[`UInt32Pointer`](../type-aliases/UInt32Pointer.md)

##### value

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

#### Returns

`number`

***

### QTS\_GetModuleNamespace()

> **QTS\_GetModuleNamespace**: (`ctx`, `module_func_obj`) => [`JSValuePointer`](../type-aliases/JSValuePointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:488

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### module\_func\_obj

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

#### Returns

[`JSValuePointer`](../type-aliases/JSValuePointer.md)

***

### QTS\_GetNull()

> **QTS\_GetNull**: () => [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:441

#### Returns

[`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

***

### QTS\_GetOwnPropertyNames()

> **QTS\_GetOwnPropertyNames**: (`ctx`, `out_ptrs`, `out_len`, `obj`, `flags`) => [`JSValuePointer`](../type-aliases/JSValuePointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:479

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### out\_ptrs

[`JSValuePointerPointerPointer`](../type-aliases/JSValuePointerPointerPointer.md)

##### out\_len

[`UInt32Pointer`](../type-aliases/UInt32Pointer.md)

##### obj

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

##### flags

`number`

#### Returns

[`JSValuePointer`](../type-aliases/JSValuePointer.md)

***

### QTS\_GetOwnPropertyNames\_MaybeAsync()

> **QTS\_GetOwnPropertyNames\_MaybeAsync**: (`ctx`, `out_ptrs`, `out_len`, `obj`, `flags`) => [`JSValuePointer`](../type-aliases/JSValuePointer.md) | `Promise`<[`JSValuePointer`](../type-aliases/JSValuePointer.md)>

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:480

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### out\_ptrs

[`JSValuePointerPointerPointer`](../type-aliases/JSValuePointerPointerPointer.md)

##### out\_len

[`UInt32Pointer`](../type-aliases/UInt32Pointer.md)

##### obj

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

##### flags

`number`

#### Returns

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | `Promise`<[`JSValuePointer`](../type-aliases/JSValuePointer.md)>

***

### QTS\_GetProp()

> **QTS\_GetProp**: (`ctx`, `this_val`, `prop_name`) => [`JSValuePointer`](../type-aliases/JSValuePointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:472

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### this\_val

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

##### prop\_name

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

#### Returns

[`JSValuePointer`](../type-aliases/JSValuePointer.md)

***

### QTS\_GetProp\_MaybeAsync()

> **QTS\_GetProp\_MaybeAsync**: (`ctx`, `this_val`, `prop_name`) => [`JSValuePointer`](../type-aliases/JSValuePointer.md) | `Promise`<[`JSValuePointer`](../type-aliases/JSValuePointer.md)>

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:473

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### this\_val

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

##### prop\_name

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

#### Returns

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | `Promise`<[`JSValuePointer`](../type-aliases/JSValuePointer.md)>

***

### QTS\_GetPropNumber()

> **QTS\_GetPropNumber**: (`ctx`, `this_val`, `prop_name`) => [`JSValuePointer`](../type-aliases/JSValuePointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:474

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### this\_val

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

##### prop\_name

`number`

#### Returns

[`JSValuePointer`](../type-aliases/JSValuePointer.md)

***

### QTS\_GetPropNumber\_MaybeAsync()

> **QTS\_GetPropNumber\_MaybeAsync**: (`ctx`, `this_val`, `prop_name`) => [`JSValuePointer`](../type-aliases/JSValuePointer.md) | `Promise`<[`JSValuePointer`](../type-aliases/JSValuePointer.md)>

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:475

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### this\_val

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

##### prop\_name

`number`

#### Returns

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | `Promise`<[`JSValuePointer`](../type-aliases/JSValuePointer.md)>

***

### QTS\_GetString()

> **QTS\_GetString**: (`ctx`, `value`) => [`JSBorrowedCharPointer`](../type-aliases/JSBorrowedCharPointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:462

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### value

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

#### Returns

[`JSBorrowedCharPointer`](../type-aliases/JSBorrowedCharPointer.md)

***

### QTS\_GetSymbolDescriptionOrKey()

> **QTS\_GetSymbolDescriptionOrKey**: (`ctx`, `value`) => [`JSBorrowedCharPointer`](../type-aliases/JSBorrowedCharPointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:466

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### value

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

#### Returns

[`JSBorrowedCharPointer`](../type-aliases/JSBorrowedCharPointer.md)

***

### QTS\_GetSymbolDescriptionOrKey\_MaybeAsync()

> **QTS\_GetSymbolDescriptionOrKey\_MaybeAsync**: (`ctx`, `value`) => [`JSBorrowedCharPointer`](../type-aliases/JSBorrowedCharPointer.md) | `Promise`<[`JSBorrowedCharPointer`](../type-aliases/JSBorrowedCharPointer.md)>

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:467

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### value

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

#### Returns

[`JSBorrowedCharPointer`](../type-aliases/JSBorrowedCharPointer.md) | `Promise`<[`JSBorrowedCharPointer`](../type-aliases/JSBorrowedCharPointer.md)>

***

### QTS\_GetTrue()

> **QTS\_GetTrue**: () => [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:443

#### Returns

[`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

***

### QTS\_GetUndefined()

> **QTS\_GetUndefined**: () => [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:440

#### Returns

[`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

***

### QTS\_IsEqual()

> **QTS\_IsEqual**: (`ctx`, `a`, `b`, `op`) => `number`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:491

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### a

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

##### b

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

##### op

[`IsEqualOp`](../variables/IsEqualOp.md)

#### Returns

`number`

***

### QTS\_IsGlobalSymbol()

> **QTS\_IsGlobalSymbol**: (`ctx`, `value`) => `number`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:468

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### value

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

#### Returns

`number`

***

### QTS\_IsJobPending()

> **QTS\_IsJobPending**: (`rt`) => `number`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:469

#### Parameters

##### rt

[`JSRuntimePointer`](../type-aliases/JSRuntimePointer.md)

#### Returns

`number`

***

### QTS\_NewArray()

> **QTS\_NewArray**: (`ctx`) => [`JSValuePointer`](../type-aliases/JSValuePointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:457

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

#### Returns

[`JSValuePointer`](../type-aliases/JSValuePointer.md)

***

### QTS\_NewArrayBuffer()

> **QTS\_NewArrayBuffer**: (`ctx`, `buffer`, `length`) => [`JSValuePointer`](../type-aliases/JSValuePointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:458

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### buffer

[`JSVoidPointer`](../type-aliases/JSVoidPointer.md)

##### length

`number`

#### Returns

[`JSValuePointer`](../type-aliases/JSValuePointer.md)

***

### QTS\_NewContext()

> **QTS\_NewContext**: (`rt`, `intrinsics`) => [`JSContextPointer`](../type-aliases/JSContextPointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:448

#### Parameters

##### rt

[`JSRuntimePointer`](../type-aliases/JSRuntimePointer.md)

##### intrinsics

[`IntrinsicsFlags`](../variables/IntrinsicsFlags.md)

#### Returns

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

***

### QTS\_NewError()

> **QTS\_NewError**: (`ctx`) => [`JSValuePointer`](../type-aliases/JSValuePointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:433

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

#### Returns

[`JSValuePointer`](../type-aliases/JSValuePointer.md)

***

### QTS\_NewFloat64()

> **QTS\_NewFloat64**: (`ctx`, `num`) => [`JSValuePointer`](../type-aliases/JSValuePointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:459

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### num

`number`

#### Returns

[`JSValuePointer`](../type-aliases/JSValuePointer.md)

***

### QTS\_NewFunction()

> **QTS\_NewFunction**: (`ctx`, `name`, `arg_length`, `is_constructor`, `host_ref_id`) => [`JSValuePointer`](../type-aliases/JSValuePointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:501

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### name

`string`

##### arg\_length

`number`

##### is\_constructor

`boolean`

##### host\_ref\_id

`HostRefId`

#### Returns

[`JSValuePointer`](../type-aliases/JSValuePointer.md)

***

### QTS\_NewHostRef()

> **QTS\_NewHostRef**: (`ctx`, `id`) => [`JSValuePointer`](../type-aliases/JSValuePointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:444

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### id

`HostRefId`

#### Returns

[`JSValuePointer`](../type-aliases/JSValuePointer.md)

***

### QTS\_NewObject()

> **QTS\_NewObject**: (`ctx`) => [`JSValuePointer`](../type-aliases/JSValuePointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:455

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

#### Returns

[`JSValuePointer`](../type-aliases/JSValuePointer.md)

***

### QTS\_NewObjectProto()

> **QTS\_NewObjectProto**: (`ctx`, `proto`) => [`JSValuePointer`](../type-aliases/JSValuePointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:456

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### proto

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

#### Returns

[`JSValuePointer`](../type-aliases/JSValuePointer.md)

***

### QTS\_NewPromiseCapability()

> **QTS\_NewPromiseCapability**: (`ctx`, `resolve_funcs_out`) => [`JSValuePointer`](../type-aliases/JSValuePointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:493

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### resolve\_funcs\_out

[`JSValuePointerPointer`](../type-aliases/JSValuePointerPointer.md)

#### Returns

[`JSValuePointer`](../type-aliases/JSValuePointer.md)

***

### QTS\_NewRuntime()

> **QTS\_NewRuntime**: () => [`JSRuntimePointer`](../type-aliases/JSRuntimePointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:446

#### Returns

[`JSRuntimePointer`](../type-aliases/JSRuntimePointer.md)

***

### QTS\_NewString()

> **QTS\_NewString**: (`ctx`, `string`) => [`JSValuePointer`](../type-aliases/JSValuePointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:461

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### string

[`BorrowedHeapCharPointer`](../type-aliases/BorrowedHeapCharPointer.md)

#### Returns

[`JSValuePointer`](../type-aliases/JSValuePointer.md)

***

### QTS\_NewSymbol()

> **QTS\_NewSymbol**: (`ctx`, `description`, `isGlobal`) => [`JSValuePointer`](../type-aliases/JSValuePointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:465

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### description

[`BorrowedHeapCharPointer`](../type-aliases/BorrowedHeapCharPointer.md)

##### isGlobal

`number`

#### Returns

[`JSValuePointer`](../type-aliases/JSValuePointer.md)

***

### QTS\_PromiseResult()

> **QTS\_PromiseResult**: (`ctx`, `promise`) => [`JSValuePointer`](../type-aliases/JSValuePointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:495

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### promise

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

#### Returns

[`JSValuePointer`](../type-aliases/JSValuePointer.md)

***

### QTS\_PromiseState()

> **QTS\_PromiseState**: (`ctx`, `promise`) => [`JSPromiseStateEnum`](../type-aliases/JSPromiseStateEnum.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:494

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### promise

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

#### Returns

[`JSPromiseStateEnum`](../type-aliases/JSPromiseStateEnum.md)

***

### QTS\_RecoverableLeakCheck()

> **QTS\_RecoverableLeakCheck**: () => `number`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:437

#### Returns

`number`

***

### QTS\_ResolveException()

> **QTS\_ResolveException**: (`ctx`, `maybe_exception`) => [`JSValuePointer`](../type-aliases/JSValuePointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:483

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### maybe\_exception

[`JSValuePointer`](../type-aliases/JSValuePointer.md)

#### Returns

[`JSValuePointer`](../type-aliases/JSValuePointer.md)

***

### QTS\_RuntimeComputeMemoryUsage()

> **QTS\_RuntimeComputeMemoryUsage**: (`rt`, `ctx`) => [`JSValuePointer`](../type-aliases/JSValuePointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:435

#### Parameters

##### rt

[`JSRuntimePointer`](../type-aliases/JSRuntimePointer.md)

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

#### Returns

[`JSValuePointer`](../type-aliases/JSValuePointer.md)

***

### QTS\_RuntimeDisableInterruptHandler()

> **QTS\_RuntimeDisableInterruptHandler**: (`rt`) => `void`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:504

#### Parameters

##### rt

[`JSRuntimePointer`](../type-aliases/JSRuntimePointer.md)

#### Returns

`void`

***

### QTS\_RuntimeDisableModuleLoader()

> **QTS\_RuntimeDisableModuleLoader**: (`rt`) => `void`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:506

#### Parameters

##### rt

[`JSRuntimePointer`](../type-aliases/JSRuntimePointer.md)

#### Returns

`void`

***

### QTS\_RuntimeDumpMemoryUsage()

> **QTS\_RuntimeDumpMemoryUsage**: (`rt`) => [`OwnedHeapCharPointer`](../type-aliases/OwnedHeapCharPointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:436

#### Parameters

##### rt

[`JSRuntimePointer`](../type-aliases/JSRuntimePointer.md)

#### Returns

[`OwnedHeapCharPointer`](../type-aliases/OwnedHeapCharPointer.md)

***

### QTS\_RuntimeEnableInterruptHandler()

> **QTS\_RuntimeEnableInterruptHandler**: (`rt`) => `void`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:503

#### Parameters

##### rt

[`JSRuntimePointer`](../type-aliases/JSRuntimePointer.md)

#### Returns

`void`

***

### QTS\_RuntimeEnableModuleLoader()

> **QTS\_RuntimeEnableModuleLoader**: (`rt`, `use_custom_normalize`) => `void`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:505

#### Parameters

##### rt

[`JSRuntimePointer`](../type-aliases/JSRuntimePointer.md)

##### use\_custom\_normalize

`number`

#### Returns

`void`

***

### QTS\_RuntimeSetMaxStackSize()

> **QTS\_RuntimeSetMaxStackSize**: (`rt`, `stack_size`) => `void`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:439

#### Parameters

##### rt

[`JSRuntimePointer`](../type-aliases/JSRuntimePointer.md)

##### stack\_size

`number`

#### Returns

`void`

***

### QTS\_RuntimeSetMemoryLimit()

> **QTS\_RuntimeSetMemoryLimit**: (`rt`, `limit`) => `void`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:434

#### Parameters

##### rt

[`JSRuntimePointer`](../type-aliases/JSRuntimePointer.md)

##### limit

`number`

#### Returns

`void`

***

### QTS\_SetDebugLogEnabled()

> **QTS\_SetDebugLogEnabled**: (`rt`, `is_enabled`) => `void`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:498

#### Parameters

##### rt

[`JSRuntimePointer`](../type-aliases/JSRuntimePointer.md)

##### is\_enabled

`number`

#### Returns

`void`

***

### QTS\_SetProp()

> **QTS\_SetProp**: (`ctx`, `this_val`, `prop_name`, `prop_value`) => `void`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:476

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### this\_val

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

##### prop\_name

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

##### prop\_value

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

#### Returns

`void`

***

### QTS\_SetProp\_MaybeAsync()

> **QTS\_SetProp\_MaybeAsync**: (`ctx`, `this_val`, `prop_name`, `prop_value`) => `void` | `Promise`<`void`>

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:477

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### this\_val

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

##### prop\_name

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

##### prop\_value

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

#### Returns

`void` | `Promise`<`void`>

***

### QTS\_TestStringArg()

> **QTS\_TestStringArg**: (`string`) => `void`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:496

#### Parameters

##### string

`string`

#### Returns

`void`

***

### QTS\_Throw()

> **QTS\_Throw**: (`ctx`, `error`) => [`JSValuePointer`](../type-aliases/JSValuePointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:432

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### error

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

#### Returns

[`JSValuePointer`](../type-aliases/JSValuePointer.md)

***

### QTS\_Typeof()

> **QTS\_Typeof**: (`ctx`, `value`) => [`OwnedHeapCharPointer`](../type-aliases/OwnedHeapCharPointer.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:489

#### Parameters

##### ctx

[`JSContextPointer`](../type-aliases/JSContextPointer.md)

##### value

[`JSValuePointer`](../type-aliases/JSValuePointer.md) | [`JSValueConstPointer`](../type-aliases/JSValueConstPointer.md)

#### Returns

[`OwnedHeapCharPointer`](../type-aliases/OwnedHeapCharPointer.md)
