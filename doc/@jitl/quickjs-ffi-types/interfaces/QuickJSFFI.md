[quickjs-emscripten](../../../packages.md) • **@jitl/quickjs-ffi-types** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../../packages.md) / [@jitl/quickjs-ffi-types](../exports.md) / QuickJSFFI

# Interface: QuickJSFFI

Low-level FFI bindings to QuickJS's Emscripten module.
See instead QuickJSContext, the public Javascript interface exposed by this
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

[packages/quickjs-ffi-types/src/ffi.ts:32](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L32)

***

### QTS\_ArgvGetJSValueConstPointer

> **QTS\_ArgvGetJSValueConstPointer**: (`argv`, `index`) => [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Parameters

• **argv**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

• **index**: `number`

#### Returns

[`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:154](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L154)

***

### QTS\_BuildIsAsyncify

> **QTS\_BuildIsAsyncify**: () => `number`

#### Returns

`number`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:152](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L152)

***

### QTS\_BuildIsDebug

> **QTS\_BuildIsDebug**: () => `number`

#### Returns

`number`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:151](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L151)

***

### QTS\_BuildIsSanitizeLeak

> **QTS\_BuildIsSanitizeLeak**: () => `number`

#### Returns

`number`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:40](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L40)

***

### QTS\_Call

> **QTS\_Call**: (`ctx`, `func_obj`, `this_obj`, `argc`, `argv_ptrs`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **func\_obj**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

• **this\_obj**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

• **argc**: `number`

• **argv\_ptrs**: [`JSValueConstPointerPointer`](../exports.md#jsvalueconstpointerpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:122](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L122)

***

### QTS\_DefineProp

> **QTS\_DefineProp**: (`ctx`, `this_val`, `prop_name`, `prop_value`, `get`, `set`, `configurable`, `enumerable`, `has_value`) => `void`

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **this\_val**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

• **prop\_name**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

• **prop\_value**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

• **get**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

• **set**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

• **configurable**: `boolean`

• **enumerable**: `boolean`

• **has\_value**: `boolean`

#### Returns

`void`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:111](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L111)

***

### QTS\_Dump

> **QTS\_Dump**: (`ctx`, `obj`) => [`JSBorrowedCharPointer`](../exports.md#jsborrowedcharpointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **obj**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSBorrowedCharPointer`](../exports.md#jsborrowedcharpointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:130](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L130)

***

### QTS\_DupValuePointer

> **QTS\_DupValuePointer**: (`ctx`, `val`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **val**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:54](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L54)

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

[packages/quickjs-ffi-types/src/ffi.ts:134](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L134)

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

[packages/quickjs-ffi-types/src/ffi.ts:95](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L95)

***

### QTS\_FreeCString

> **QTS\_FreeCString**: (`ctx`, `str`) => `void`

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **str**: [`JSBorrowedCharPointer`](../exports.md#jsborrowedcharpointer)

#### Returns

`void`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:53](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L53)

***

### QTS\_FreeContext

> **QTS\_FreeContext**: (`ctx`) => `void`

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

#### Returns

`void`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:49](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L49)

***

### QTS\_FreeRuntime

> **QTS\_FreeRuntime**: (`rt`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

#### Returns

`void`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:47](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L47)

***

### QTS\_FreeValuePointer

> **QTS\_FreeValuePointer**: (`ctx`, `value`) => `void`

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **value**: [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

`void`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:50](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L50)

***

### QTS\_FreeValuePointerRuntime

> **QTS\_FreeValuePointerRuntime**: (`rt`, `value`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

• **value**: [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

`void`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:51](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L51)

***

### QTS\_FreeVoidPointer

> **QTS\_FreeVoidPointer**: (`ctx`, `ptr`) => `void`

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **ptr**: [`JSVoidPointer`](../exports.md#jsvoidpointer)

#### Returns

`void`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:52](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L52)

***

### QTS\_GetArrayBuffer

> **QTS\_GetArrayBuffer**: (`ctx`, `data`) => [`JSVoidPointer`](../exports.md#jsvoidpointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **data**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSVoidPointer`](../exports.md#jsvoidpointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:76](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L76)

***

### QTS\_GetArrayBufferLength

> **QTS\_GetArrayBufferLength**: (`ctx`, `data`) => `number`

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **data**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

`number`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:80](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L80)

***

### QTS\_GetFalse

> **QTS\_GetFalse**: () => [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:44](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L44)

***

### QTS\_GetFloat64

> **QTS\_GetFloat64**: (`ctx`, `value`) => `number`

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **value**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

`number`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:70](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L70)

***

### QTS\_GetGlobalObject

> **QTS\_GetGlobalObject**: (`ctx`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:145](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L145)

***

### QTS\_GetNull

> **QTS\_GetNull**: () => [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:43](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L43)

***

### QTS\_GetProp

> **QTS\_GetProp**: (`ctx`, `this_val`, `prop_name`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **this\_val**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

• **prop\_name**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:100](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L100)

***

### QTS\_GetString

> **QTS\_GetString**: (`ctx`, `value`) => [`JSBorrowedCharPointer`](../exports.md#jsborrowedcharpointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **value**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSBorrowedCharPointer`](../exports.md#jsborrowedcharpointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:72](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L72)

***

### QTS\_GetSymbolDescriptionOrKey

> **QTS\_GetSymbolDescriptionOrKey**: (`ctx`, `value`) => [`JSBorrowedCharPointer`](../exports.md#jsborrowedcharpointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **value**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSBorrowedCharPointer`](../exports.md#jsborrowedcharpointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:89](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L89)

***

### QTS\_GetTrue

> **QTS\_GetTrue**: () => [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:45](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L45)

***

### QTS\_GetUndefined

> **QTS\_GetUndefined**: () => [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:42](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L42)

***

### QTS\_IsGlobalSymbol

> **QTS\_IsGlobalSymbol**: (`ctx`, `value`) => `number`

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **value**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

`number`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:93](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L93)

***

### QTS\_IsJobPending

> **QTS\_IsJobPending**: (`rt`) => `number`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

#### Returns

`number`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:94](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L94)

***

### QTS\_NewArray

> **QTS\_NewArray**: (`ctx`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:63](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L63)

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

[packages/quickjs-ffi-types/src/ffi.ts:64](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L64)

***

### QTS\_NewContext

> **QTS\_NewContext**: (`rt`) => [`JSContextPointer`](../exports.md#jscontextpointer)

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

#### Returns

[`JSContextPointer`](../exports.md#jscontextpointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:48](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L48)

***

### QTS\_NewError

> **QTS\_NewError**: (`ctx`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:35](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L35)

***

### QTS\_NewFloat64

> **QTS\_NewFloat64**: (`ctx`, `num`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **num**: `number`

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:69](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L69)

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

[packages/quickjs-ffi-types/src/ffi.ts:153](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L153)

***

### QTS\_NewObject

> **QTS\_NewObject**: (`ctx`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:58](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L58)

***

### QTS\_NewObjectProto

> **QTS\_NewObjectProto**: (`ctx`, `proto`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **proto**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:59](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L59)

***

### QTS\_NewPromiseCapability

> **QTS\_NewPromiseCapability**: (`ctx`, `resolve_funcs_out`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **resolve\_funcs\_out**: [`JSValuePointerPointer`](../exports.md#jsvaluepointerpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:146](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L146)

***

### QTS\_NewRuntime

> **QTS\_NewRuntime**: () => [`JSRuntimePointer`](../exports.md#jsruntimepointer)

#### Returns

[`JSRuntimePointer`](../exports.md#jsruntimepointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:46](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L46)

***

### QTS\_NewString

> **QTS\_NewString**: (`ctx`, `string`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **string**: [`BorrowedHeapCharPointer`](../exports.md#borrowedheapcharpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:71](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L71)

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

[packages/quickjs-ffi-types/src/ffi.ts:84](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L84)

***

### QTS\_RecoverableLeakCheck

> **QTS\_RecoverableLeakCheck**: () => `number`

#### Returns

`number`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:39](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L39)

***

### QTS\_ResolveException

> **QTS\_ResolveException**: (`ctx`, `maybe_exception`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **maybe\_exception**: [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:129](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L129)

***

### QTS\_RuntimeComputeMemoryUsage

> **QTS\_RuntimeComputeMemoryUsage**: (`rt`, `ctx`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:37](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L37)

***

### QTS\_RuntimeDisableInterruptHandler

> **QTS\_RuntimeDisableInterruptHandler**: (`rt`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

#### Returns

`void`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:159](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L159)

***

### QTS\_RuntimeDisableModuleLoader

> **QTS\_RuntimeDisableModuleLoader**: (`rt`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

#### Returns

`void`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:161](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L161)

***

### QTS\_RuntimeDumpMemoryUsage

> **QTS\_RuntimeDumpMemoryUsage**: (`rt`) => [`OwnedHeapCharPointer`](../exports.md#ownedheapcharpointer)

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

#### Returns

[`OwnedHeapCharPointer`](../exports.md#ownedheapcharpointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:38](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L38)

***

### QTS\_RuntimeEnableInterruptHandler

> **QTS\_RuntimeEnableInterruptHandler**: (`rt`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

#### Returns

`void`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:158](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L158)

***

### QTS\_RuntimeEnableModuleLoader

> **QTS\_RuntimeEnableModuleLoader**: (`rt`, `use_custom_normalize`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

• **use\_custom\_normalize**: `number`

#### Returns

`void`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:160](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L160)

***

### QTS\_RuntimeSetMaxStackSize

> **QTS\_RuntimeSetMaxStackSize**: (`rt`, `stack_size`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

• **stack\_size**: `number`

#### Returns

`void`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:41](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L41)

***

### QTS\_RuntimeSetMemoryLimit

> **QTS\_RuntimeSetMemoryLimit**: (`rt`, `limit`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

• **limit**: `number`

#### Returns

`void`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:36](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L36)

***

### QTS\_SetProp

> **QTS\_SetProp**: (`ctx`, `this_val`, `prop_name`, `prop_value`) => `void`

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **this\_val**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

• **prop\_name**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

• **prop\_value**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

`void`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:105](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L105)

***

### QTS\_TestStringArg

> **QTS\_TestStringArg**: (`string`) => `void`

#### Parameters

• **string**: `string`

#### Returns

`void`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:150](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L150)

***

### QTS\_Throw

> **QTS\_Throw**: (`ctx`, `error`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **error**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:34](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L34)

***

### QTS\_Typeof

> **QTS\_Typeof**: (`ctx`, `value`) => [`OwnedHeapCharPointer`](../exports.md#ownedheapcharpointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **value**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`OwnedHeapCharPointer`](../exports.md#ownedheapcharpointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:141](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L141)

***

### QTS\_bjson\_decode

> **QTS\_bjson\_decode**: (`ctx`, `data`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **data**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:166](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L166)

***

### QTS\_bjson\_encode

> **QTS\_bjson\_encode**: (`ctx`, `val`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **val**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:162](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L162)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
