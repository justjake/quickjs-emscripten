[quickjs-emscripten](../../packages.md) • **quickjs-emscripten** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../exports.md) / QuickJSAsyncFFI

# Interface: QuickJSAsyncFFI

Low-level FFI bindings to QuickJS's Emscripten module.
See instead [QuickJSContext](../classes/QuickJSContext.md), the public Javascript interface exposed by this
library.

## Contents

- [Unstable](QuickJSAsyncFFI.md#unstable)
- [Properties](QuickJSAsyncFFI.md#properties)
  - [DEBUG](QuickJSAsyncFFI.md#debug)
  - [QTS\_ArgvGetJSValueConstPointer](QuickJSAsyncFFI.md#qts-argvgetjsvalueconstpointer)
  - [QTS\_BuildIsAsyncify](QuickJSAsyncFFI.md#qts-buildisasyncify)
  - [QTS\_BuildIsDebug](QuickJSAsyncFFI.md#qts-buildisdebug)
  - [QTS\_BuildIsSanitizeLeak](QuickJSAsyncFFI.md#qts-buildissanitizeleak)
  - [QTS\_Call](QuickJSAsyncFFI.md#qts-call)
  - [QTS\_Call\_MaybeAsync](QuickJSAsyncFFI.md#qts-call-maybeasync)
  - [QTS\_DefineProp](QuickJSAsyncFFI.md#qts-defineprop)
  - [QTS\_Dump](QuickJSAsyncFFI.md#qts-dump)
  - [QTS\_Dump\_MaybeAsync](QuickJSAsyncFFI.md#qts-dump-maybeasync)
  - [QTS\_DupValuePointer](QuickJSAsyncFFI.md#qts-dupvaluepointer)
  - [QTS\_Eval](QuickJSAsyncFFI.md#qts-eval)
  - [QTS\_Eval\_MaybeAsync](QuickJSAsyncFFI.md#qts-eval-maybeasync)
  - [QTS\_ExecutePendingJob](QuickJSAsyncFFI.md#qts-executependingjob)
  - [QTS\_ExecutePendingJob\_MaybeAsync](QuickJSAsyncFFI.md#qts-executependingjob-maybeasync)
  - [QTS\_FreeCString](QuickJSAsyncFFI.md#qts-freecstring)
  - [QTS\_FreeContext](QuickJSAsyncFFI.md#qts-freecontext)
  - [QTS\_FreeRuntime](QuickJSAsyncFFI.md#qts-freeruntime)
  - [QTS\_FreeValuePointer](QuickJSAsyncFFI.md#qts-freevaluepointer)
  - [QTS\_FreeValuePointerRuntime](QuickJSAsyncFFI.md#qts-freevaluepointerruntime)
  - [QTS\_FreeVoidPointer](QuickJSAsyncFFI.md#qts-freevoidpointer)
  - [QTS\_GetArrayBuffer](QuickJSAsyncFFI.md#qts-getarraybuffer)
  - [QTS\_GetArrayBufferLength](QuickJSAsyncFFI.md#qts-getarraybufferlength)
  - [QTS\_GetDebugLogEnabled](QuickJSAsyncFFI.md#qts-getdebuglogenabled)
  - [QTS\_GetFalse](QuickJSAsyncFFI.md#qts-getfalse)
  - [QTS\_GetFloat64](QuickJSAsyncFFI.md#qts-getfloat64)
  - [QTS\_GetGlobalObject](QuickJSAsyncFFI.md#qts-getglobalobject)
  - [QTS\_GetLength](QuickJSAsyncFFI.md#qts-getlength)
  - [QTS\_GetModuleNamespace](QuickJSAsyncFFI.md#qts-getmodulenamespace)
  - [QTS\_GetNull](QuickJSAsyncFFI.md#qts-getnull)
  - [QTS\_GetOwnPropertyNames](QuickJSAsyncFFI.md#qts-getownpropertynames)
  - [QTS\_GetOwnPropertyNames\_MaybeAsync](QuickJSAsyncFFI.md#qts-getownpropertynames-maybeasync)
  - [QTS\_GetProp](QuickJSAsyncFFI.md#qts-getprop)
  - [QTS\_GetPropNumber](QuickJSAsyncFFI.md#qts-getpropnumber)
  - [QTS\_GetPropNumber\_MaybeAsync](QuickJSAsyncFFI.md#qts-getpropnumber-maybeasync)
  - [QTS\_GetProp\_MaybeAsync](QuickJSAsyncFFI.md#qts-getprop-maybeasync)
  - [QTS\_GetString](QuickJSAsyncFFI.md#qts-getstring)
  - [QTS\_GetSymbolDescriptionOrKey](QuickJSAsyncFFI.md#qts-getsymboldescriptionorkey)
  - [QTS\_GetSymbolDescriptionOrKey\_MaybeAsync](QuickJSAsyncFFI.md#qts-getsymboldescriptionorkey-maybeasync)
  - [QTS\_GetTrue](QuickJSAsyncFFI.md#qts-gettrue)
  - [QTS\_GetUndefined](QuickJSAsyncFFI.md#qts-getundefined)
  - [QTS\_IsEqual](QuickJSAsyncFFI.md#qts-isequal)
  - [QTS\_IsGlobalSymbol](QuickJSAsyncFFI.md#qts-isglobalsymbol)
  - [QTS\_IsJobPending](QuickJSAsyncFFI.md#qts-isjobpending)
  - [QTS\_NewArray](QuickJSAsyncFFI.md#qts-newarray)
  - [QTS\_NewArrayBuffer](QuickJSAsyncFFI.md#qts-newarraybuffer)
  - [QTS\_NewContext](QuickJSAsyncFFI.md#qts-newcontext)
  - [QTS\_NewError](QuickJSAsyncFFI.md#qts-newerror)
  - [QTS\_NewFloat64](QuickJSAsyncFFI.md#qts-newfloat64)
  - [QTS\_NewFunction](QuickJSAsyncFFI.md#qts-newfunction)
  - [QTS\_NewObject](QuickJSAsyncFFI.md#qts-newobject)
  - [QTS\_NewObjectProto](QuickJSAsyncFFI.md#qts-newobjectproto)
  - [QTS\_NewPromiseCapability](QuickJSAsyncFFI.md#qts-newpromisecapability)
  - [QTS\_NewRuntime](QuickJSAsyncFFI.md#qts-newruntime)
  - [QTS\_NewString](QuickJSAsyncFFI.md#qts-newstring)
  - [QTS\_NewSymbol](QuickJSAsyncFFI.md#qts-newsymbol)
  - [QTS\_PromiseResult](QuickJSAsyncFFI.md#qts-promiseresult)
  - [QTS\_PromiseState](QuickJSAsyncFFI.md#qts-promisestate)
  - [QTS\_RecoverableLeakCheck](QuickJSAsyncFFI.md#qts-recoverableleakcheck)
  - [QTS\_ResolveException](QuickJSAsyncFFI.md#qts-resolveexception)
  - [QTS\_RuntimeComputeMemoryUsage](QuickJSAsyncFFI.md#qts-runtimecomputememoryusage)
  - [QTS\_RuntimeDisableInterruptHandler](QuickJSAsyncFFI.md#qts-runtimedisableinterrupthandler)
  - [QTS\_RuntimeDisableModuleLoader](QuickJSAsyncFFI.md#qts-runtimedisablemoduleloader)
  - [QTS\_RuntimeDumpMemoryUsage](QuickJSAsyncFFI.md#qts-runtimedumpmemoryusage)
  - [QTS\_RuntimeEnableInterruptHandler](QuickJSAsyncFFI.md#qts-runtimeenableinterrupthandler)
  - [QTS\_RuntimeEnableModuleLoader](QuickJSAsyncFFI.md#qts-runtimeenablemoduleloader)
  - [QTS\_RuntimeSetMaxStackSize](QuickJSAsyncFFI.md#qts-runtimesetmaxstacksize)
  - [QTS\_RuntimeSetMemoryLimit](QuickJSAsyncFFI.md#qts-runtimesetmemorylimit)
  - [QTS\_SetDebugLogEnabled](QuickJSAsyncFFI.md#qts-setdebuglogenabled)
  - [QTS\_SetProp](QuickJSAsyncFFI.md#qts-setprop)
  - [QTS\_SetProp\_MaybeAsync](QuickJSAsyncFFI.md#qts-setprop-maybeasync)
  - [QTS\_TestStringArg](QuickJSAsyncFFI.md#qts-teststringarg)
  - [QTS\_Throw](QuickJSAsyncFFI.md#qts-throw)
  - [QTS\_Typeof](QuickJSAsyncFFI.md#qts-typeof)
  - [QTS\_bjson\_decode](QuickJSAsyncFFI.md#qts-bjson-decode)
  - [QTS\_bjson\_encode](QuickJSAsyncFFI.md#qts-bjson-encode)

## Unstable

The FFI interface is considered private and may change.

## Properties

### DEBUG

> **`readonly`** **DEBUG**: `boolean`

Set at compile time.

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:424

***

### QTS\_ArgvGetJSValueConstPointer

> **QTS\_ArgvGetJSValueConstPointer**: (`argv`, `index`) => [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Parameters

• **argv**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

• **index**: `number`

#### Returns

[`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:493

***

### QTS\_BuildIsAsyncify

> **QTS\_BuildIsAsyncify**: () => `number`

#### Returns

`number`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:491

***

### QTS\_BuildIsDebug

> **QTS\_BuildIsDebug**: () => `number`

#### Returns

`number`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:490

***

### QTS\_BuildIsSanitizeLeak

> **QTS\_BuildIsSanitizeLeak**: () => `number`

#### Returns

`number`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:431

***

### QTS\_Call

> **QTS\_Call**: (`ctx`, `func_obj`, `this_obj`, `argc`, `argv_ptrs`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **func\_obj**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

• **this\_obj**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

• **argc**: `number`

• **argv\_ptrs**: [`JSValueConstPointerPointer`](../exports.md#jsvalueconstpointerpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:472

***

### QTS\_Call\_MaybeAsync

> **QTS\_Call\_MaybeAsync**: (`ctx`, `func_obj`, `this_obj`, `argc`, `argv_ptrs`) => [`JSValuePointer`](../exports.md#jsvaluepointer) \| `Promise`\<[`JSValuePointer`](../exports.md#jsvaluepointer)\>

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **func\_obj**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

• **this\_obj**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

• **argc**: `number`

• **argv\_ptrs**: [`JSValueConstPointerPointer`](../exports.md#jsvalueconstpointerpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer) \| `Promise`\<[`JSValuePointer`](../exports.md#jsvaluepointer)\>

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:473

***

### QTS\_DefineProp

> **QTS\_DefineProp**: (`ctx`, `this_val`, `prop_name`, `prop_value`, `get`, `set`, `configurable`, `enumerable`, `has_value`) => `void`

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **this\_val**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

• **prop\_name**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

• **prop\_value**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

• **get**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

• **set**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

• **configurable**: `boolean`

• **enumerable**: `boolean`

• **has\_value**: `boolean`

#### Returns

`void`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:469

***

### QTS\_Dump

> **QTS\_Dump**: (`ctx`, `obj`) => [`JSBorrowedCharPointer`](../exports.md#jsborrowedcharpointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **obj**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

[`JSBorrowedCharPointer`](../exports.md#jsborrowedcharpointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:475

***

### QTS\_Dump\_MaybeAsync

> **QTS\_Dump\_MaybeAsync**: (`ctx`, `obj`) => [`JSBorrowedCharPointer`](../exports.md#jsborrowedcharpointer) \| `Promise`\<[`JSBorrowedCharPointer`](../exports.md#jsborrowedcharpointer)\>

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **obj**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

[`JSBorrowedCharPointer`](../exports.md#jsborrowedcharpointer) \| `Promise`\<[`JSBorrowedCharPointer`](../exports.md#jsborrowedcharpointer)\>

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:476

***

### QTS\_DupValuePointer

> **QTS\_DupValuePointer**: (`ctx`, `val`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **val**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:445

***

### QTS\_Eval

> **QTS\_Eval**: (`ctx`, `js_code`, `js_code_length`, `filename`, `detectModule`, `evalFlags`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **js\_code**: [`BorrowedHeapCharPointer`](../exports.md#borrowedheapcharpointer)

• **js\_code\_length**: `number`

• **filename**: `string`

• **detectModule**: `EvalDetectModule`

• **evalFlags**: [`EvalFlags`](../exports.md#evalflags)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:477

***

### QTS\_Eval\_MaybeAsync

> **QTS\_Eval\_MaybeAsync**: (`ctx`, `js_code`, `js_code_length`, `filename`, `detectModule`, `evalFlags`) => [`JSValuePointer`](../exports.md#jsvaluepointer) \| `Promise`\<[`JSValuePointer`](../exports.md#jsvaluepointer)\>

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **js\_code**: [`BorrowedHeapCharPointer`](../exports.md#borrowedheapcharpointer)

• **js\_code\_length**: `number`

• **filename**: `string`

• **detectModule**: `EvalDetectModule`

• **evalFlags**: [`EvalFlags`](../exports.md#evalflags)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer) \| `Promise`\<[`JSValuePointer`](../exports.md#jsvaluepointer)\>

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:478

***

### QTS\_ExecutePendingJob

> **QTS\_ExecutePendingJob**: (`rt`, `maxJobsToExecute`, `lastJobContext`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

• **maxJobsToExecute**: `number`

• **lastJobContext**: [`JSContextPointerPointer`](../exports.md#jscontextpointerpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:461

***

### QTS\_ExecutePendingJob\_MaybeAsync

> **QTS\_ExecutePendingJob\_MaybeAsync**: (`rt`, `maxJobsToExecute`, `lastJobContext`) => [`JSValuePointer`](../exports.md#jsvaluepointer) \| `Promise`\<[`JSValuePointer`](../exports.md#jsvaluepointer)\>

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

• **maxJobsToExecute**: `number`

• **lastJobContext**: [`JSContextPointerPointer`](../exports.md#jscontextpointerpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer) \| `Promise`\<[`JSValuePointer`](../exports.md#jsvaluepointer)\>

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:462

***

### QTS\_FreeCString

> **QTS\_FreeCString**: (`ctx`, `str`) => `void`

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **str**: [`JSBorrowedCharPointer`](../exports.md#jsborrowedcharpointer)

#### Returns

`void`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:444

***

### QTS\_FreeContext

> **QTS\_FreeContext**: (`ctx`) => `void`

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

#### Returns

`void`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:440

***

### QTS\_FreeRuntime

> **QTS\_FreeRuntime**: (`rt`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

#### Returns

`void`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:438

***

### QTS\_FreeValuePointer

> **QTS\_FreeValuePointer**: (`ctx`, `value`) => `void`

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **value**: [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

`void`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:441

***

### QTS\_FreeValuePointerRuntime

> **QTS\_FreeValuePointerRuntime**: (`rt`, `value`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

• **value**: [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

`void`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:442

***

### QTS\_FreeVoidPointer

> **QTS\_FreeVoidPointer**: (`ctx`, `ptr`) => `void`

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **ptr**: [`JSVoidPointer`](../exports.md#jsvoidpointer)

#### Returns

`void`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:443

***

### QTS\_GetArrayBuffer

> **QTS\_GetArrayBuffer**: (`ctx`, `data`) => [`JSVoidPointer`](../exports.md#jsvoidpointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **data**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

[`JSVoidPointer`](../exports.md#jsvoidpointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:454

***

### QTS\_GetArrayBufferLength

> **QTS\_GetArrayBufferLength**: (`ctx`, `data`) => `number`

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **data**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

`number`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:455

***

### QTS\_GetDebugLogEnabled

> **QTS\_GetDebugLogEnabled**: (`rt`) => `number`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

#### Returns

`number`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:488

***

### QTS\_GetFalse

> **QTS\_GetFalse**: () => [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:435

***

### QTS\_GetFloat64

> **QTS\_GetFloat64**: (`ctx`, `value`) => `number`

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **value**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

`number`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:451

***

### QTS\_GetGlobalObject

> **QTS\_GetGlobalObject**: (`ctx`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:483

***

### QTS\_GetLength

> **QTS\_GetLength**: (`ctx`, `out_len`, `value`) => `number`

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **out\_len**: [`UInt32Pointer`](../exports.md#uint32pointer)

• **value**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

`number`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:481

***

### QTS\_GetModuleNamespace

> **QTS\_GetModuleNamespace**: (`ctx`, `module_func_obj`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **module\_func\_obj**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:479

***

### QTS\_GetNull

> **QTS\_GetNull**: () => [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:434

***

### QTS\_GetOwnPropertyNames

> **QTS\_GetOwnPropertyNames**: (`ctx`, `out_ptrs`, `out_len`, `obj`, `flags`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **out\_ptrs**: [`JSValuePointerPointerPointer`](../exports.md#jsvaluepointerpointerpointer)

• **out\_len**: [`UInt32Pointer`](../exports.md#uint32pointer)

• **obj**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

• **flags**: `number`

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:470

***

### QTS\_GetOwnPropertyNames\_MaybeAsync

> **QTS\_GetOwnPropertyNames\_MaybeAsync**: (`ctx`, `out_ptrs`, `out_len`, `obj`, `flags`) => [`JSValuePointer`](../exports.md#jsvaluepointer) \| `Promise`\<[`JSValuePointer`](../exports.md#jsvaluepointer)\>

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **out\_ptrs**: [`JSValuePointerPointerPointer`](../exports.md#jsvaluepointerpointerpointer)

• **out\_len**: [`UInt32Pointer`](../exports.md#uint32pointer)

• **obj**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

• **flags**: `number`

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer) \| `Promise`\<[`JSValuePointer`](../exports.md#jsvaluepointer)\>

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:471

***

### QTS\_GetProp

> **QTS\_GetProp**: (`ctx`, `this_val`, `prop_name`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **this\_val**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

• **prop\_name**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:463

***

### QTS\_GetPropNumber

> **QTS\_GetPropNumber**: (`ctx`, `this_val`, `prop_name`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **this\_val**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

• **prop\_name**: `number`

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:465

***

### QTS\_GetPropNumber\_MaybeAsync

> **QTS\_GetPropNumber\_MaybeAsync**: (`ctx`, `this_val`, `prop_name`) => [`JSValuePointer`](../exports.md#jsvaluepointer) \| `Promise`\<[`JSValuePointer`](../exports.md#jsvaluepointer)\>

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **this\_val**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

• **prop\_name**: `number`

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer) \| `Promise`\<[`JSValuePointer`](../exports.md#jsvaluepointer)\>

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:466

***

### QTS\_GetProp\_MaybeAsync

> **QTS\_GetProp\_MaybeAsync**: (`ctx`, `this_val`, `prop_name`) => [`JSValuePointer`](../exports.md#jsvaluepointer) \| `Promise`\<[`JSValuePointer`](../exports.md#jsvaluepointer)\>

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **this\_val**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

• **prop\_name**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer) \| `Promise`\<[`JSValuePointer`](../exports.md#jsvaluepointer)\>

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:464

***

### QTS\_GetString

> **QTS\_GetString**: (`ctx`, `value`) => [`JSBorrowedCharPointer`](../exports.md#jsborrowedcharpointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **value**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

[`JSBorrowedCharPointer`](../exports.md#jsborrowedcharpointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:453

***

### QTS\_GetSymbolDescriptionOrKey

> **QTS\_GetSymbolDescriptionOrKey**: (`ctx`, `value`) => [`JSBorrowedCharPointer`](../exports.md#jsborrowedcharpointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **value**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

[`JSBorrowedCharPointer`](../exports.md#jsborrowedcharpointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:457

***

### QTS\_GetSymbolDescriptionOrKey\_MaybeAsync

> **QTS\_GetSymbolDescriptionOrKey\_MaybeAsync**: (`ctx`, `value`) => [`JSBorrowedCharPointer`](../exports.md#jsborrowedcharpointer) \| `Promise`\<[`JSBorrowedCharPointer`](../exports.md#jsborrowedcharpointer)\>

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **value**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

[`JSBorrowedCharPointer`](../exports.md#jsborrowedcharpointer) \| `Promise`\<[`JSBorrowedCharPointer`](../exports.md#jsborrowedcharpointer)\>

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:458

***

### QTS\_GetTrue

> **QTS\_GetTrue**: () => [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:436

***

### QTS\_GetUndefined

> **QTS\_GetUndefined**: () => [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:433

***

### QTS\_IsEqual

> **QTS\_IsEqual**: (`ctx`, `a`, `b`, `op`) => `number`

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **a**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

• **b**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

• **op**: [`IsEqualOp`](../exports.md#isequalop)

#### Returns

`number`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:482

***

### QTS\_IsGlobalSymbol

> **QTS\_IsGlobalSymbol**: (`ctx`, `value`) => `number`

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **value**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

`number`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:459

***

### QTS\_IsJobPending

> **QTS\_IsJobPending**: (`rt`) => `number`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

#### Returns

`number`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:460

***

### QTS\_NewArray

> **QTS\_NewArray**: (`ctx`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:448

***

### QTS\_NewArrayBuffer

> **QTS\_NewArrayBuffer**: (`ctx`, `buffer`, `length`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **buffer**: [`JSVoidPointer`](../exports.md#jsvoidpointer)

• **length**: `number`

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:449

***

### QTS\_NewContext

> **QTS\_NewContext**: (`rt`, `intrinsics`) => [`JSContextPointer`](../exports.md#jscontextpointer)

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

• **intrinsics**: [`IntrinsicsFlags`](../exports.md#intrinsicsflags)

#### Returns

[`JSContextPointer`](../exports.md#jscontextpointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:439

***

### QTS\_NewError

> **QTS\_NewError**: (`ctx`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:426

***

### QTS\_NewFloat64

> **QTS\_NewFloat64**: (`ctx`, `num`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **num**: `number`

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:450

***

### QTS\_NewFunction

> **QTS\_NewFunction**: (`ctx`, `func_id`, `name`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **func\_id**: `number`

• **name**: `string`

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:492

***

### QTS\_NewObject

> **QTS\_NewObject**: (`ctx`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:446

***

### QTS\_NewObjectProto

> **QTS\_NewObjectProto**: (`ctx`, `proto`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **proto**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:447

***

### QTS\_NewPromiseCapability

> **QTS\_NewPromiseCapability**: (`ctx`, `resolve_funcs_out`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **resolve\_funcs\_out**: [`JSValuePointerPointer`](../exports.md#jsvaluepointerpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:484

***

### QTS\_NewRuntime

> **QTS\_NewRuntime**: () => [`JSRuntimePointer`](../exports.md#jsruntimepointer)

#### Returns

[`JSRuntimePointer`](../exports.md#jsruntimepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:437

***

### QTS\_NewString

> **QTS\_NewString**: (`ctx`, `string`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **string**: [`BorrowedHeapCharPointer`](../exports.md#borrowedheapcharpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:452

***

### QTS\_NewSymbol

> **QTS\_NewSymbol**: (`ctx`, `description`, `isGlobal`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **description**: [`BorrowedHeapCharPointer`](../exports.md#borrowedheapcharpointer)

• **isGlobal**: `number`

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:456

***

### QTS\_PromiseResult

> **QTS\_PromiseResult**: (`ctx`, `promise`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **promise**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:486

***

### QTS\_PromiseState

> **QTS\_PromiseState**: (`ctx`, `promise`) => [`JSPromiseStateEnum`](../exports.md#jspromisestateenum-1)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **promise**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

[`JSPromiseStateEnum`](../exports.md#jspromisestateenum-1)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:485

***

### QTS\_RecoverableLeakCheck

> **QTS\_RecoverableLeakCheck**: () => `number`

#### Returns

`number`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:430

***

### QTS\_ResolveException

> **QTS\_ResolveException**: (`ctx`, `maybe_exception`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **maybe\_exception**: [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:474

***

### QTS\_RuntimeComputeMemoryUsage

> **QTS\_RuntimeComputeMemoryUsage**: (`rt`, `ctx`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:428

***

### QTS\_RuntimeDisableInterruptHandler

> **QTS\_RuntimeDisableInterruptHandler**: (`rt`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

#### Returns

`void`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:495

***

### QTS\_RuntimeDisableModuleLoader

> **QTS\_RuntimeDisableModuleLoader**: (`rt`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

#### Returns

`void`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:497

***

### QTS\_RuntimeDumpMemoryUsage

> **QTS\_RuntimeDumpMemoryUsage**: (`rt`) => [`OwnedHeapCharPointer`](../exports.md#ownedheapcharpointer)

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

#### Returns

[`OwnedHeapCharPointer`](../exports.md#ownedheapcharpointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:429

***

### QTS\_RuntimeEnableInterruptHandler

> **QTS\_RuntimeEnableInterruptHandler**: (`rt`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

#### Returns

`void`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:494

***

### QTS\_RuntimeEnableModuleLoader

> **QTS\_RuntimeEnableModuleLoader**: (`rt`, `use_custom_normalize`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

• **use\_custom\_normalize**: `number`

#### Returns

`void`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:496

***

### QTS\_RuntimeSetMaxStackSize

> **QTS\_RuntimeSetMaxStackSize**: (`rt`, `stack_size`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

• **stack\_size**: `number`

#### Returns

`void`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:432

***

### QTS\_RuntimeSetMemoryLimit

> **QTS\_RuntimeSetMemoryLimit**: (`rt`, `limit`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

• **limit**: `number`

#### Returns

`void`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:427

***

### QTS\_SetDebugLogEnabled

> **QTS\_SetDebugLogEnabled**: (`rt`, `is_enabled`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

• **is\_enabled**: `number`

#### Returns

`void`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:489

***

### QTS\_SetProp

> **QTS\_SetProp**: (`ctx`, `this_val`, `prop_name`, `prop_value`) => `void`

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **this\_val**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

• **prop\_name**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

• **prop\_value**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

`void`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:467

***

### QTS\_SetProp\_MaybeAsync

> **QTS\_SetProp\_MaybeAsync**: (`ctx`, `this_val`, `prop_name`, `prop_value`) => `void` \| `Promise`\<`void`\>

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **this\_val**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

• **prop\_name**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

• **prop\_value**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

`void` \| `Promise`\<`void`\>

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:468

***

### QTS\_TestStringArg

> **QTS\_TestStringArg**: (`string`) => `void`

#### Parameters

• **string**: `string`

#### Returns

`void`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:487

***

### QTS\_Throw

> **QTS\_Throw**: (`ctx`, `error`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **error**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:425

***

### QTS\_Typeof

> **QTS\_Typeof**: (`ctx`, `value`) => [`OwnedHeapCharPointer`](../exports.md#ownedheapcharpointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **value**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

[`OwnedHeapCharPointer`](../exports.md#ownedheapcharpointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:480

***

### QTS\_bjson\_decode

> **QTS\_bjson\_decode**: (`ctx`, `data`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **data**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:499

***

### QTS\_bjson\_encode

> **QTS\_bjson\_encode**: (`ctx`, `val`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **val**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:498

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
