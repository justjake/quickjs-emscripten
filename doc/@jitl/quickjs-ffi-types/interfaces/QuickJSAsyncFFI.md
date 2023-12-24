[quickjs-emscripten](../../../packages.md) • **@jitl/quickjs-ffi-types** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../../packages.md) / [@jitl/quickjs-ffi-types](../exports.md) / QuickJSAsyncFFI

# Interface: QuickJSAsyncFFI

Low-level FFI bindings to QuickJS's Emscripten module.
See instead QuickJSContext, the public Javascript interface exposed by this
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
  - [QTS\_GetFalse](QuickJSAsyncFFI.md#qts-getfalse)
  - [QTS\_GetFloat64](QuickJSAsyncFFI.md#qts-getfloat64)
  - [QTS\_GetGlobalObject](QuickJSAsyncFFI.md#qts-getglobalobject)
  - [QTS\_GetNull](QuickJSAsyncFFI.md#qts-getnull)
  - [QTS\_GetProp](QuickJSAsyncFFI.md#qts-getprop)
  - [QTS\_GetProp\_MaybeAsync](QuickJSAsyncFFI.md#qts-getprop-maybeasync)
  - [QTS\_GetString](QuickJSAsyncFFI.md#qts-getstring)
  - [QTS\_GetSymbolDescriptionOrKey](QuickJSAsyncFFI.md#qts-getsymboldescriptionorkey)
  - [QTS\_GetSymbolDescriptionOrKey\_MaybeAsync](QuickJSAsyncFFI.md#qts-getsymboldescriptionorkey-maybeasync)
  - [QTS\_GetTrue](QuickJSAsyncFFI.md#qts-gettrue)
  - [QTS\_GetUndefined](QuickJSAsyncFFI.md#qts-getundefined)
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

[ffi-asyncify.ts:33](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L33)

***

### QTS\_ArgvGetJSValueConstPointer

> **QTS\_ArgvGetJSValueConstPointer**: (`argv`, `index`) => [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

#### Parameters

• **argv**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

• **index**: `number`

#### Returns

[`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

#### Source

[ffi-asyncify.ts:193](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L193)

***

### QTS\_BuildIsAsyncify

> **QTS\_BuildIsAsyncify**: () => `number`

#### Returns

`number`

#### Source

[ffi-asyncify.ts:191](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L191)

***

### QTS\_BuildIsDebug

> **QTS\_BuildIsDebug**: () => `number`

#### Returns

`number`

#### Source

[ffi-asyncify.ts:190](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L190)

***

### QTS\_BuildIsSanitizeLeak

> **QTS\_BuildIsSanitizeLeak**: () => `number`

#### Returns

`number`

#### Source

[ffi-asyncify.ts:41](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L41)

***

### QTS\_Call

> **QTS\_Call**: (`ctx`, `func_obj`, `this_obj`, `argc`, `argv_ptrs`) => [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

• **func\_obj**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

• **this\_obj**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

• **argc**: `number`

• **argv\_ptrs**: [`JSValueConstPointerPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointerpointer)

#### Returns

[`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Source

[ffi-asyncify.ts:143](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L143)

***

### QTS\_Call\_MaybeAsync

> **QTS\_Call\_MaybeAsync**: (`ctx`, `func_obj`, `this_obj`, `argc`, `argv_ptrs`) => [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| `Promise`\<[`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)\>

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

• **func\_obj**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

• **this\_obj**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

• **argc**: `number`

• **argv\_ptrs**: [`JSValueConstPointerPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointerpointer)

#### Returns

[`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| `Promise`\<[`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)\>

#### Source

[ffi-asyncify.ts:150](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L150)

***

### QTS\_DefineProp

> **QTS\_DefineProp**: (`ctx`, `this_val`, `prop_name`, `prop_value`, `get`, `set`, `configurable`, `enumerable`, `has_value`) => `void`

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

• **this\_val**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

• **prop\_name**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

• **prop\_value**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

• **get**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

• **set**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

• **configurable**: `boolean`

• **enumerable**: `boolean`

• **has\_value**: `boolean`

#### Returns

`void`

#### Source

[ffi-asyncify.ts:132](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L132)

***

### QTS\_Dump

> **QTS\_Dump**: (`ctx`, `obj`) => [`JSBorrowedCharPointer`](../../../quickjs-emscripten/exports.md#jsborrowedcharpointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

• **obj**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

#### Returns

[`JSBorrowedCharPointer`](../../../quickjs-emscripten/exports.md#jsborrowedcharpointer)

#### Source

[ffi-asyncify.ts:158](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L158)

***

### QTS\_Dump\_MaybeAsync

> **QTS\_Dump\_MaybeAsync**: (`ctx`, `obj`) => [`JSBorrowedCharPointer`](../../../quickjs-emscripten/exports.md#jsborrowedcharpointer) \| `Promise`\<[`JSBorrowedCharPointer`](../../../quickjs-emscripten/exports.md#jsborrowedcharpointer)\>

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

• **obj**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

#### Returns

[`JSBorrowedCharPointer`](../../../quickjs-emscripten/exports.md#jsborrowedcharpointer) \| `Promise`\<[`JSBorrowedCharPointer`](../../../quickjs-emscripten/exports.md#jsborrowedcharpointer)\>

#### Source

[ffi-asyncify.ts:162](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L162)

***

### QTS\_DupValuePointer

> **QTS\_DupValuePointer**: (`ctx`, `val`) => [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

• **val**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

#### Returns

[`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Source

[ffi-asyncify.ts:55](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L55)

***

### QTS\_Eval

> **QTS\_Eval**: (`ctx`, `js_code`, `filename`, `detectModule`, `evalFlags`) => [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

• **js\_code**: [`BorrowedHeapCharPointer`](../../../quickjs-emscripten/exports.md#borrowedheapcharpointer)

• **filename**: `string`

• **detectModule**: `EvalDetectModule`

• **evalFlags**: [`EvalFlags`](../../../quickjs-emscripten/exports.md#evalflags)

#### Returns

[`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Source

[ffi-asyncify.ts:166](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L166)

***

### QTS\_Eval\_MaybeAsync

> **QTS\_Eval\_MaybeAsync**: (`ctx`, `js_code`, `filename`, `detectModule`, `evalFlags`) => [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| `Promise`\<[`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)\>

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

• **js\_code**: [`BorrowedHeapCharPointer`](../../../quickjs-emscripten/exports.md#borrowedheapcharpointer)

• **filename**: `string`

• **detectModule**: `EvalDetectModule`

• **evalFlags**: [`EvalFlags`](../../../quickjs-emscripten/exports.md#evalflags)

#### Returns

[`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| `Promise`\<[`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)\>

#### Source

[ffi-asyncify.ts:173](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L173)

***

### QTS\_ExecutePendingJob

> **QTS\_ExecutePendingJob**: (`rt`, `maxJobsToExecute`, `lastJobContext`) => [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Parameters

• **rt**: [`JSRuntimePointer`](../../../quickjs-emscripten/exports.md#jsruntimepointer)

• **maxJobsToExecute**: `number`

• **lastJobContext**: [`JSContextPointerPointer`](../../../quickjs-emscripten/exports.md#jscontextpointerpointer)

#### Returns

[`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Source

[ffi-asyncify.ts:100](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L100)

***

### QTS\_ExecutePendingJob\_MaybeAsync

> **QTS\_ExecutePendingJob\_MaybeAsync**: (`rt`, `maxJobsToExecute`, `lastJobContext`) => [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| `Promise`\<[`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)\>

#### Parameters

• **rt**: [`JSRuntimePointer`](../../../quickjs-emscripten/exports.md#jsruntimepointer)

• **maxJobsToExecute**: `number`

• **lastJobContext**: [`JSContextPointerPointer`](../../../quickjs-emscripten/exports.md#jscontextpointerpointer)

#### Returns

[`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| `Promise`\<[`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)\>

#### Source

[ffi-asyncify.ts:105](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L105)

***

### QTS\_FreeCString

> **QTS\_FreeCString**: (`ctx`, `str`) => `void`

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

• **str**: [`JSBorrowedCharPointer`](../../../quickjs-emscripten/exports.md#jsborrowedcharpointer)

#### Returns

`void`

#### Source

[ffi-asyncify.ts:54](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L54)

***

### QTS\_FreeContext

> **QTS\_FreeContext**: (`ctx`) => `void`

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

#### Returns

`void`

#### Source

[ffi-asyncify.ts:50](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L50)

***

### QTS\_FreeRuntime

> **QTS\_FreeRuntime**: (`rt`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../../../quickjs-emscripten/exports.md#jsruntimepointer)

#### Returns

`void`

#### Source

[ffi-asyncify.ts:48](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L48)

***

### QTS\_FreeValuePointer

> **QTS\_FreeValuePointer**: (`ctx`, `value`) => `void`

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

• **value**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Returns

`void`

#### Source

[ffi-asyncify.ts:51](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L51)

***

### QTS\_FreeValuePointerRuntime

> **QTS\_FreeValuePointerRuntime**: (`rt`, `value`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../../../quickjs-emscripten/exports.md#jsruntimepointer)

• **value**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Returns

`void`

#### Source

[ffi-asyncify.ts:52](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L52)

***

### QTS\_FreeVoidPointer

> **QTS\_FreeVoidPointer**: (`ctx`, `ptr`) => `void`

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

• **ptr**: [`JSVoidPointer`](../../../quickjs-emscripten/exports.md#jsvoidpointer)

#### Returns

`void`

#### Source

[ffi-asyncify.ts:53](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L53)

***

### QTS\_GetArrayBuffer

> **QTS\_GetArrayBuffer**: (`ctx`, `data`) => [`JSVoidPointer`](../../../quickjs-emscripten/exports.md#jsvoidpointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

• **data**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

#### Returns

[`JSVoidPointer`](../../../quickjs-emscripten/exports.md#jsvoidpointer)

#### Source

[ffi-asyncify.ts:77](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L77)

***

### QTS\_GetArrayBufferLength

> **QTS\_GetArrayBufferLength**: (`ctx`, `data`) => `number`

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

• **data**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

#### Returns

`number`

#### Source

[ffi-asyncify.ts:81](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L81)

***

### QTS\_GetFalse

> **QTS\_GetFalse**: () => [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

#### Returns

[`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

#### Source

[ffi-asyncify.ts:45](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L45)

***

### QTS\_GetFloat64

> **QTS\_GetFloat64**: (`ctx`, `value`) => `number`

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

• **value**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

#### Returns

`number`

#### Source

[ffi-asyncify.ts:71](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L71)

***

### QTS\_GetGlobalObject

> **QTS\_GetGlobalObject**: (`ctx`) => [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

#### Returns

[`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Source

[ffi-asyncify.ts:184](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L184)

***

### QTS\_GetNull

> **QTS\_GetNull**: () => [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

#### Returns

[`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

#### Source

[ffi-asyncify.ts:44](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L44)

***

### QTS\_GetProp

> **QTS\_GetProp**: (`ctx`, `this_val`, `prop_name`) => [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

• **this\_val**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

• **prop\_name**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

#### Returns

[`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Source

[ffi-asyncify.ts:110](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L110)

***

### QTS\_GetProp\_MaybeAsync

> **QTS\_GetProp\_MaybeAsync**: (`ctx`, `this_val`, `prop_name`) => [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| `Promise`\<[`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)\>

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

• **this\_val**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

• **prop\_name**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

#### Returns

[`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| `Promise`\<[`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)\>

#### Source

[ffi-asyncify.ts:115](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L115)

***

### QTS\_GetString

> **QTS\_GetString**: (`ctx`, `value`) => [`JSBorrowedCharPointer`](../../../quickjs-emscripten/exports.md#jsborrowedcharpointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

• **value**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

#### Returns

[`JSBorrowedCharPointer`](../../../quickjs-emscripten/exports.md#jsborrowedcharpointer)

#### Source

[ffi-asyncify.ts:73](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L73)

***

### QTS\_GetSymbolDescriptionOrKey

> **QTS\_GetSymbolDescriptionOrKey**: (`ctx`, `value`) => [`JSBorrowedCharPointer`](../../../quickjs-emscripten/exports.md#jsborrowedcharpointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

• **value**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

#### Returns

[`JSBorrowedCharPointer`](../../../quickjs-emscripten/exports.md#jsborrowedcharpointer)

#### Source

[ffi-asyncify.ts:90](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L90)

***

### QTS\_GetSymbolDescriptionOrKey\_MaybeAsync

> **QTS\_GetSymbolDescriptionOrKey\_MaybeAsync**: (`ctx`, `value`) => [`JSBorrowedCharPointer`](../../../quickjs-emscripten/exports.md#jsborrowedcharpointer) \| `Promise`\<[`JSBorrowedCharPointer`](../../../quickjs-emscripten/exports.md#jsborrowedcharpointer)\>

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

• **value**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

#### Returns

[`JSBorrowedCharPointer`](../../../quickjs-emscripten/exports.md#jsborrowedcharpointer) \| `Promise`\<[`JSBorrowedCharPointer`](../../../quickjs-emscripten/exports.md#jsborrowedcharpointer)\>

#### Source

[ffi-asyncify.ts:94](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L94)

***

### QTS\_GetTrue

> **QTS\_GetTrue**: () => [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

#### Returns

[`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

#### Source

[ffi-asyncify.ts:46](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L46)

***

### QTS\_GetUndefined

> **QTS\_GetUndefined**: () => [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

#### Returns

[`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

#### Source

[ffi-asyncify.ts:43](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L43)

***

### QTS\_IsGlobalSymbol

> **QTS\_IsGlobalSymbol**: (`ctx`, `value`) => `number`

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

• **value**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

#### Returns

`number`

#### Source

[ffi-asyncify.ts:98](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L98)

***

### QTS\_IsJobPending

> **QTS\_IsJobPending**: (`rt`) => `number`

#### Parameters

• **rt**: [`JSRuntimePointer`](../../../quickjs-emscripten/exports.md#jsruntimepointer)

#### Returns

`number`

#### Source

[ffi-asyncify.ts:99](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L99)

***

### QTS\_NewArray

> **QTS\_NewArray**: (`ctx`) => [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

#### Returns

[`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Source

[ffi-asyncify.ts:64](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L64)

***

### QTS\_NewArrayBuffer

> **QTS\_NewArrayBuffer**: (`ctx`, `buffer`, `length`) => [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

• **buffer**: [`JSVoidPointer`](../../../quickjs-emscripten/exports.md#jsvoidpointer)

• **length**: `number`

#### Returns

[`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Source

[ffi-asyncify.ts:65](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L65)

***

### QTS\_NewContext

> **QTS\_NewContext**: (`rt`) => [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

#### Parameters

• **rt**: [`JSRuntimePointer`](../../../quickjs-emscripten/exports.md#jsruntimepointer)

#### Returns

[`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

#### Source

[ffi-asyncify.ts:49](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L49)

***

### QTS\_NewError

> **QTS\_NewError**: (`ctx`) => [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

#### Returns

[`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Source

[ffi-asyncify.ts:36](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L36)

***

### QTS\_NewFloat64

> **QTS\_NewFloat64**: (`ctx`, `num`) => [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

• **num**: `number`

#### Returns

[`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Source

[ffi-asyncify.ts:70](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L70)

***

### QTS\_NewFunction

> **QTS\_NewFunction**: (`ctx`, `func_id`, `name`) => [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

• **func\_id**: `number`

• **name**: `string`

#### Returns

[`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Source

[ffi-asyncify.ts:192](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L192)

***

### QTS\_NewObject

> **QTS\_NewObject**: (`ctx`) => [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

#### Returns

[`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Source

[ffi-asyncify.ts:59](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L59)

***

### QTS\_NewObjectProto

> **QTS\_NewObjectProto**: (`ctx`, `proto`) => [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

• **proto**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

#### Returns

[`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Source

[ffi-asyncify.ts:60](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L60)

***

### QTS\_NewPromiseCapability

> **QTS\_NewPromiseCapability**: (`ctx`, `resolve_funcs_out`) => [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

• **resolve\_funcs\_out**: [`JSValuePointerPointer`](../../../quickjs-emscripten/exports.md#jsvaluepointerpointer)

#### Returns

[`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Source

[ffi-asyncify.ts:185](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L185)

***

### QTS\_NewRuntime

> **QTS\_NewRuntime**: () => [`JSRuntimePointer`](../../../quickjs-emscripten/exports.md#jsruntimepointer)

#### Returns

[`JSRuntimePointer`](../../../quickjs-emscripten/exports.md#jsruntimepointer)

#### Source

[ffi-asyncify.ts:47](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L47)

***

### QTS\_NewString

> **QTS\_NewString**: (`ctx`, `string`) => [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

• **string**: [`BorrowedHeapCharPointer`](../../../quickjs-emscripten/exports.md#borrowedheapcharpointer)

#### Returns

[`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Source

[ffi-asyncify.ts:72](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L72)

***

### QTS\_NewSymbol

> **QTS\_NewSymbol**: (`ctx`, `description`, `isGlobal`) => [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

• **description**: [`BorrowedHeapCharPointer`](../../../quickjs-emscripten/exports.md#borrowedheapcharpointer)

• **isGlobal**: `number`

#### Returns

[`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Source

[ffi-asyncify.ts:85](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L85)

***

### QTS\_RecoverableLeakCheck

> **QTS\_RecoverableLeakCheck**: () => `number`

#### Returns

`number`

#### Source

[ffi-asyncify.ts:40](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L40)

***

### QTS\_ResolveException

> **QTS\_ResolveException**: (`ctx`, `maybe_exception`) => [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

• **maybe\_exception**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Returns

[`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Source

[ffi-asyncify.ts:157](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L157)

***

### QTS\_RuntimeComputeMemoryUsage

> **QTS\_RuntimeComputeMemoryUsage**: (`rt`, `ctx`) => [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Parameters

• **rt**: [`JSRuntimePointer`](../../../quickjs-emscripten/exports.md#jsruntimepointer)

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

#### Returns

[`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Source

[ffi-asyncify.ts:38](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L38)

***

### QTS\_RuntimeDisableInterruptHandler

> **QTS\_RuntimeDisableInterruptHandler**: (`rt`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../../../quickjs-emscripten/exports.md#jsruntimepointer)

#### Returns

`void`

#### Source

[ffi-asyncify.ts:198](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L198)

***

### QTS\_RuntimeDisableModuleLoader

> **QTS\_RuntimeDisableModuleLoader**: (`rt`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../../../quickjs-emscripten/exports.md#jsruntimepointer)

#### Returns

`void`

#### Source

[ffi-asyncify.ts:200](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L200)

***

### QTS\_RuntimeDumpMemoryUsage

> **QTS\_RuntimeDumpMemoryUsage**: (`rt`) => [`OwnedHeapCharPointer`](../../../quickjs-emscripten/exports.md#ownedheapcharpointer)

#### Parameters

• **rt**: [`JSRuntimePointer`](../../../quickjs-emscripten/exports.md#jsruntimepointer)

#### Returns

[`OwnedHeapCharPointer`](../../../quickjs-emscripten/exports.md#ownedheapcharpointer)

#### Source

[ffi-asyncify.ts:39](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L39)

***

### QTS\_RuntimeEnableInterruptHandler

> **QTS\_RuntimeEnableInterruptHandler**: (`rt`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../../../quickjs-emscripten/exports.md#jsruntimepointer)

#### Returns

`void`

#### Source

[ffi-asyncify.ts:197](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L197)

***

### QTS\_RuntimeEnableModuleLoader

> **QTS\_RuntimeEnableModuleLoader**: (`rt`, `use_custom_normalize`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../../../quickjs-emscripten/exports.md#jsruntimepointer)

• **use\_custom\_normalize**: `number`

#### Returns

`void`

#### Source

[ffi-asyncify.ts:199](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L199)

***

### QTS\_RuntimeSetMaxStackSize

> **QTS\_RuntimeSetMaxStackSize**: (`rt`, `stack_size`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../../../quickjs-emscripten/exports.md#jsruntimepointer)

• **stack\_size**: `number`

#### Returns

`void`

#### Source

[ffi-asyncify.ts:42](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L42)

***

### QTS\_RuntimeSetMemoryLimit

> **QTS\_RuntimeSetMemoryLimit**: (`rt`, `limit`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../../../quickjs-emscripten/exports.md#jsruntimepointer)

• **limit**: `number`

#### Returns

`void`

#### Source

[ffi-asyncify.ts:37](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L37)

***

### QTS\_SetProp

> **QTS\_SetProp**: (`ctx`, `this_val`, `prop_name`, `prop_value`) => `void`

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

• **this\_val**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

• **prop\_name**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

• **prop\_value**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

#### Returns

`void`

#### Source

[ffi-asyncify.ts:120](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L120)

***

### QTS\_SetProp\_MaybeAsync

> **QTS\_SetProp\_MaybeAsync**: (`ctx`, `this_val`, `prop_name`, `prop_value`) => `void` \| `Promise`\<`void`\>

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

• **this\_val**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

• **prop\_name**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

• **prop\_value**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

#### Returns

`void` \| `Promise`\<`void`\>

#### Source

[ffi-asyncify.ts:126](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L126)

***

### QTS\_TestStringArg

> **QTS\_TestStringArg**: (`string`) => `void`

#### Parameters

• **string**: `string`

#### Returns

`void`

#### Source

[ffi-asyncify.ts:189](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L189)

***

### QTS\_Throw

> **QTS\_Throw**: (`ctx`, `error`) => [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

• **error**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

#### Returns

[`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Source

[ffi-asyncify.ts:35](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L35)

***

### QTS\_Typeof

> **QTS\_Typeof**: (`ctx`, `value`) => [`OwnedHeapCharPointer`](../../../quickjs-emscripten/exports.md#ownedheapcharpointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

• **value**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

#### Returns

[`OwnedHeapCharPointer`](../../../quickjs-emscripten/exports.md#ownedheapcharpointer)

#### Source

[ffi-asyncify.ts:180](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L180)

***

### QTS\_bjson\_decode

> **QTS\_bjson\_decode**: (`ctx`, `data`) => [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

• **data**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

#### Returns

[`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Source

[ffi-asyncify.ts:205](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L205)

***

### QTS\_bjson\_encode

> **QTS\_bjson\_encode**: (`ctx`, `val`) => [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../../../quickjs-emscripten/exports.md#jscontextpointer)

• **val**: [`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../../../quickjs-emscripten/exports.md#jsvalueconstpointer)

#### Returns

[`JSValuePointer`](../../../quickjs-emscripten/exports.md#jsvaluepointer)

#### Source

[ffi-asyncify.ts:201](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-asyncify.ts#L201)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
