[quickjs-emscripten](../../packages.md) • **quickjs-emscripten-core** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../exports.md) / QuickJSFFI

# Interface: QuickJSFFI

Low-level FFI bindings to QuickJS's Emscripten module.
See instead [QuickJSContext](../classes/QuickJSContext.md), the public Javascript interface exposed by this
library.

## Contents

- [Unstable](QuickJSFFI.md#unstable)
- [Properties](QuickJSFFI.md#properties)
  - [DEBUG](QuickJSFFI.md#debug)
  - [QTS\_ArgvGetJSValueConstPointer](QuickJSFFI.md#qts-argvgetjsvalueconstpointer)
  - [QTS\_BuildIsAsyncify](QuickJSFFI.md#qts-buildisasyncify)
  - [QTS\_BuildIsDebug](QuickJSFFI.md#qts-buildisdebug)
  - [QTS\_BuildIsSanitizeLeak](QuickJSFFI.md#qts-buildissanitizeleak)
  - [QTS\_Call](QuickJSFFI.md#qts-call)
  - [QTS\_DefineProp](QuickJSFFI.md#qts-defineprop)
  - [QTS\_Dump](QuickJSFFI.md#qts-dump)
  - [QTS\_DupValuePointer](QuickJSFFI.md#qts-dupvaluepointer)
  - [QTS\_Eval](QuickJSFFI.md#qts-eval)
  - [QTS\_ExecutePendingJob](QuickJSFFI.md#qts-executependingjob)
  - [QTS\_FreeCString](QuickJSFFI.md#qts-freecstring)
  - [QTS\_FreeContext](QuickJSFFI.md#qts-freecontext)
  - [QTS\_FreeRuntime](QuickJSFFI.md#qts-freeruntime)
  - [QTS\_FreeValuePointer](QuickJSFFI.md#qts-freevaluepointer)
  - [QTS\_FreeValuePointerRuntime](QuickJSFFI.md#qts-freevaluepointerruntime)
  - [QTS\_FreeVoidPointer](QuickJSFFI.md#qts-freevoidpointer)
  - [QTS\_GetArrayBuffer](QuickJSFFI.md#qts-getarraybuffer)
  - [QTS\_GetArrayBufferLength](QuickJSFFI.md#qts-getarraybufferlength)
  - [QTS\_GetFalse](QuickJSFFI.md#qts-getfalse)
  - [QTS\_GetFloat64](QuickJSFFI.md#qts-getfloat64)
  - [QTS\_GetGlobalObject](QuickJSFFI.md#qts-getglobalobject)
  - [QTS\_GetNull](QuickJSFFI.md#qts-getnull)
  - [QTS\_GetProp](QuickJSFFI.md#qts-getprop)
  - [QTS\_GetString](QuickJSFFI.md#qts-getstring)
  - [QTS\_GetSymbolDescriptionOrKey](QuickJSFFI.md#qts-getsymboldescriptionorkey)
  - [QTS\_GetTrue](QuickJSFFI.md#qts-gettrue)
  - [QTS\_GetUndefined](QuickJSFFI.md#qts-getundefined)
  - [QTS\_IsGlobalSymbol](QuickJSFFI.md#qts-isglobalsymbol)
  - [QTS\_IsJobPending](QuickJSFFI.md#qts-isjobpending)
  - [QTS\_NewArray](QuickJSFFI.md#qts-newarray)
  - [QTS\_NewArrayBuffer](QuickJSFFI.md#qts-newarraybuffer)
  - [QTS\_NewContext](QuickJSFFI.md#qts-newcontext)
  - [QTS\_NewError](QuickJSFFI.md#qts-newerror)
  - [QTS\_NewFloat64](QuickJSFFI.md#qts-newfloat64)
  - [QTS\_NewFunction](QuickJSFFI.md#qts-newfunction)
  - [QTS\_NewObject](QuickJSFFI.md#qts-newobject)
  - [QTS\_NewObjectProto](QuickJSFFI.md#qts-newobjectproto)
  - [QTS\_NewPromiseCapability](QuickJSFFI.md#qts-newpromisecapability)
  - [QTS\_NewRuntime](QuickJSFFI.md#qts-newruntime)
  - [QTS\_NewString](QuickJSFFI.md#qts-newstring)
  - [QTS\_NewSymbol](QuickJSFFI.md#qts-newsymbol)
  - [QTS\_RecoverableLeakCheck](QuickJSFFI.md#qts-recoverableleakcheck)
  - [QTS\_ResolveException](QuickJSFFI.md#qts-resolveexception)
  - [QTS\_RuntimeComputeMemoryUsage](QuickJSFFI.md#qts-runtimecomputememoryusage)
  - [QTS\_RuntimeDisableInterruptHandler](QuickJSFFI.md#qts-runtimedisableinterrupthandler)
  - [QTS\_RuntimeDisableModuleLoader](QuickJSFFI.md#qts-runtimedisablemoduleloader)
  - [QTS\_RuntimeDumpMemoryUsage](QuickJSFFI.md#qts-runtimedumpmemoryusage)
  - [QTS\_RuntimeEnableInterruptHandler](QuickJSFFI.md#qts-runtimeenableinterrupthandler)
  - [QTS\_RuntimeEnableModuleLoader](QuickJSFFI.md#qts-runtimeenablemoduleloader)
  - [QTS\_RuntimeSetMaxStackSize](QuickJSFFI.md#qts-runtimesetmaxstacksize)
  - [QTS\_RuntimeSetMemoryLimit](QuickJSFFI.md#qts-runtimesetmemorylimit)
  - [QTS\_SetProp](QuickJSFFI.md#qts-setprop)
  - [QTS\_TestStringArg](QuickJSFFI.md#qts-teststringarg)
  - [QTS\_Throw](QuickJSFFI.md#qts-throw)
  - [QTS\_Typeof](QuickJSFFI.md#qts-typeof)
  - [QTS\_bjson\_decode](QuickJSFFI.md#qts-bjson-decode)
  - [QTS\_bjson\_encode](QuickJSFFI.md#qts-bjson-encode)

## Unstable

The FFI interface is considered private and may change.

## Properties

### DEBUG

> **`readonly`** **DEBUG**: `boolean`

Set at compile time.

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:306

***

### QTS\_ArgvGetJSValueConstPointer

> **QTS\_ArgvGetJSValueConstPointer**: (`argv`, `index`) => [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Parameters

• **argv**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

• **index**: `number`

#### Returns

[`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:357

***

### QTS\_BuildIsAsyncify

> **QTS\_BuildIsAsyncify**: () => `number`

#### Returns

`number`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:355

***

### QTS\_BuildIsDebug

> **QTS\_BuildIsDebug**: () => `number`

#### Returns

`number`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:354

***

### QTS\_BuildIsSanitizeLeak

> **QTS\_BuildIsSanitizeLeak**: () => `number`

#### Returns

`number`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:313

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

packages/quickjs-ffi-types/dist/index.d.ts:346

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

packages/quickjs-ffi-types/dist/index.d.ts:345

***

### QTS\_Dump

> **QTS\_Dump**: (`ctx`, `obj`) => [`JSBorrowedCharPointer`](../exports.md#jsborrowedcharpointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **obj**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

[`JSBorrowedCharPointer`](../exports.md#jsborrowedcharpointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:348

***

### QTS\_DupValuePointer

> **QTS\_DupValuePointer**: (`ctx`, `val`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **val**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:327

***

### QTS\_Eval

> **QTS\_Eval**: (`ctx`, `js_code`, `filename`, `detectModule`, `evalFlags`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **js\_code**: [`BorrowedHeapCharPointer`](../exports.md#borrowedheapcharpointer)

• **filename**: `string`

• **detectModule**: `EvalDetectModule`

• **evalFlags**: [`EvalFlags`](../exports.md#evalflags)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:349

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

packages/quickjs-ffi-types/dist/index.d.ts:342

***

### QTS\_FreeCString

> **QTS\_FreeCString**: (`ctx`, `str`) => `void`

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **str**: [`JSBorrowedCharPointer`](../exports.md#jsborrowedcharpointer)

#### Returns

`void`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:326

***

### QTS\_FreeContext

> **QTS\_FreeContext**: (`ctx`) => `void`

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

#### Returns

`void`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:322

***

### QTS\_FreeRuntime

> **QTS\_FreeRuntime**: (`rt`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

#### Returns

`void`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:320

***

### QTS\_FreeValuePointer

> **QTS\_FreeValuePointer**: (`ctx`, `value`) => `void`

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **value**: [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

`void`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:323

***

### QTS\_FreeValuePointerRuntime

> **QTS\_FreeValuePointerRuntime**: (`rt`, `value`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

• **value**: [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

`void`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:324

***

### QTS\_FreeVoidPointer

> **QTS\_FreeVoidPointer**: (`ctx`, `ptr`) => `void`

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **ptr**: [`JSVoidPointer`](../exports.md#jsvoidpointer)

#### Returns

`void`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:325

***

### QTS\_GetArrayBuffer

> **QTS\_GetArrayBuffer**: (`ctx`, `data`) => [`JSVoidPointer`](../exports.md#jsvoidpointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **data**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

[`JSVoidPointer`](../exports.md#jsvoidpointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:336

***

### QTS\_GetArrayBufferLength

> **QTS\_GetArrayBufferLength**: (`ctx`, `data`) => `number`

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **data**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

`number`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:337

***

### QTS\_GetFalse

> **QTS\_GetFalse**: () => [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:317

***

### QTS\_GetFloat64

> **QTS\_GetFloat64**: (`ctx`, `value`) => `number`

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **value**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

`number`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:333

***

### QTS\_GetGlobalObject

> **QTS\_GetGlobalObject**: (`ctx`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:351

***

### QTS\_GetNull

> **QTS\_GetNull**: () => [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:316

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

packages/quickjs-ffi-types/dist/index.d.ts:343

***

### QTS\_GetString

> **QTS\_GetString**: (`ctx`, `value`) => [`JSBorrowedCharPointer`](../exports.md#jsborrowedcharpointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **value**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

[`JSBorrowedCharPointer`](../exports.md#jsborrowedcharpointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:335

***

### QTS\_GetSymbolDescriptionOrKey

> **QTS\_GetSymbolDescriptionOrKey**: (`ctx`, `value`) => [`JSBorrowedCharPointer`](../exports.md#jsborrowedcharpointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **value**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

[`JSBorrowedCharPointer`](../exports.md#jsborrowedcharpointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:339

***

### QTS\_GetTrue

> **QTS\_GetTrue**: () => [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:318

***

### QTS\_GetUndefined

> **QTS\_GetUndefined**: () => [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:315

***

### QTS\_IsGlobalSymbol

> **QTS\_IsGlobalSymbol**: (`ctx`, `value`) => `number`

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **value**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

`number`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:340

***

### QTS\_IsJobPending

> **QTS\_IsJobPending**: (`rt`) => `number`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

#### Returns

`number`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:341

***

### QTS\_NewArray

> **QTS\_NewArray**: (`ctx`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:330

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

packages/quickjs-ffi-types/dist/index.d.ts:331

***

### QTS\_NewContext

> **QTS\_NewContext**: (`rt`, `intrinsics`) => [`JSContextPointer`](../exports.md#jscontextpointer)

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

• **intrinsics**: [`IntrinsicsFlags`](../exports.md#intrinsicsflags)

#### Returns

[`JSContextPointer`](../exports.md#jscontextpointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:321

***

### QTS\_NewError

> **QTS\_NewError**: (`ctx`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:308

***

### QTS\_NewFloat64

> **QTS\_NewFloat64**: (`ctx`, `num`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **num**: `number`

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:332

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

packages/quickjs-ffi-types/dist/index.d.ts:356

***

### QTS\_NewObject

> **QTS\_NewObject**: (`ctx`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:328

***

### QTS\_NewObjectProto

> **QTS\_NewObjectProto**: (`ctx`, `proto`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **proto**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:329

***

### QTS\_NewPromiseCapability

> **QTS\_NewPromiseCapability**: (`ctx`, `resolve_funcs_out`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **resolve\_funcs\_out**: [`JSValuePointerPointer`](../exports.md#jsvaluepointerpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:352

***

### QTS\_NewRuntime

> **QTS\_NewRuntime**: () => [`JSRuntimePointer`](../exports.md#jsruntimepointer)

#### Returns

[`JSRuntimePointer`](../exports.md#jsruntimepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:319

***

### QTS\_NewString

> **QTS\_NewString**: (`ctx`, `string`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **string**: [`BorrowedHeapCharPointer`](../exports.md#borrowedheapcharpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:334

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

packages/quickjs-ffi-types/dist/index.d.ts:338

***

### QTS\_RecoverableLeakCheck

> **QTS\_RecoverableLeakCheck**: () => `number`

#### Returns

`number`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:312

***

### QTS\_ResolveException

> **QTS\_ResolveException**: (`ctx`, `maybe_exception`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **maybe\_exception**: [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:347

***

### QTS\_RuntimeComputeMemoryUsage

> **QTS\_RuntimeComputeMemoryUsage**: (`rt`, `ctx`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:310

***

### QTS\_RuntimeDisableInterruptHandler

> **QTS\_RuntimeDisableInterruptHandler**: (`rt`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

#### Returns

`void`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:359

***

### QTS\_RuntimeDisableModuleLoader

> **QTS\_RuntimeDisableModuleLoader**: (`rt`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

#### Returns

`void`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:361

***

### QTS\_RuntimeDumpMemoryUsage

> **QTS\_RuntimeDumpMemoryUsage**: (`rt`) => [`OwnedHeapCharPointer`](../exports.md#ownedheapcharpointer)

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

#### Returns

[`OwnedHeapCharPointer`](../exports.md#ownedheapcharpointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:311

***

### QTS\_RuntimeEnableInterruptHandler

> **QTS\_RuntimeEnableInterruptHandler**: (`rt`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

#### Returns

`void`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:358

***

### QTS\_RuntimeEnableModuleLoader

> **QTS\_RuntimeEnableModuleLoader**: (`rt`, `use_custom_normalize`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

• **use\_custom\_normalize**: `number`

#### Returns

`void`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:360

***

### QTS\_RuntimeSetMaxStackSize

> **QTS\_RuntimeSetMaxStackSize**: (`rt`, `stack_size`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

• **stack\_size**: `number`

#### Returns

`void`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:314

***

### QTS\_RuntimeSetMemoryLimit

> **QTS\_RuntimeSetMemoryLimit**: (`rt`, `limit`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

• **limit**: `number`

#### Returns

`void`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:309

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

packages/quickjs-ffi-types/dist/index.d.ts:344

***

### QTS\_TestStringArg

> **QTS\_TestStringArg**: (`string`) => `void`

#### Parameters

• **string**: `string`

#### Returns

`void`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:353

***

### QTS\_Throw

> **QTS\_Throw**: (`ctx`, `error`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **error**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:307

***

### QTS\_Typeof

> **QTS\_Typeof**: (`ctx`, `value`) => [`OwnedHeapCharPointer`](../exports.md#ownedheapcharpointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **value**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

[`OwnedHeapCharPointer`](../exports.md#ownedheapcharpointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:350

***

### QTS\_bjson\_decode

> **QTS\_bjson\_decode**: (`ctx`, `data`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **data**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:363

***

### QTS\_bjson\_encode

> **QTS\_bjson\_encode**: (`ctx`, `val`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **val**: [`JSValueConstPointer`](../exports.md#jsvalueconstpointer) \| [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:362

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
