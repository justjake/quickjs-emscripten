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
  - [QTS\_GetDebugLogEnabled](QuickJSFFI.md#qts-getdebuglogenabled)
  - [QTS\_GetFalse](QuickJSFFI.md#qts-getfalse)
  - [QTS\_GetFloat64](QuickJSFFI.md#qts-getfloat64)
  - [QTS\_GetGlobalObject](QuickJSFFI.md#qts-getglobalobject)
  - [QTS\_GetLength](QuickJSFFI.md#qts-getlength)
  - [QTS\_GetModuleNamespace](QuickJSFFI.md#qts-getmodulenamespace)
  - [QTS\_GetNull](QuickJSFFI.md#qts-getnull)
  - [QTS\_GetOwnPropertyNames](QuickJSFFI.md#qts-getownpropertynames)
  - [QTS\_GetProp](QuickJSFFI.md#qts-getprop)
  - [QTS\_GetPropNumber](QuickJSFFI.md#qts-getpropnumber)
  - [QTS\_GetString](QuickJSFFI.md#qts-getstring)
  - [QTS\_GetSymbolDescriptionOrKey](QuickJSFFI.md#qts-getsymboldescriptionorkey)
  - [QTS\_GetTrue](QuickJSFFI.md#qts-gettrue)
  - [QTS\_GetUndefined](QuickJSFFI.md#qts-getundefined)
  - [QTS\_IsEqual](QuickJSFFI.md#qts-isequal)
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
  - [QTS\_PromiseResult](QuickJSFFI.md#qts-promiseresult)
  - [QTS\_PromiseState](QuickJSFFI.md#qts-promisestate)
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
  - [QTS\_SetDebugLogEnabled](QuickJSFFI.md#qts-setdebuglogenabled)
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

[packages/quickjs-ffi-types/src/ffi.ts:39](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L39)

***

### QTS\_ArgvGetJSValueConstPointer

> **QTS\_ArgvGetJSValueConstPointer**: (`argv`, `index`) => [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Parameters

• **argv**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

• **index**: `number`

#### Returns

[`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:199](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L199)

***

### QTS\_BuildIsAsyncify

> **QTS\_BuildIsAsyncify**: () => `number`

#### Returns

`number`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:197](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L197)

***

### QTS\_BuildIsDebug

> **QTS\_BuildIsDebug**: () => `number`

#### Returns

`number`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:196](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L196)

***

### QTS\_BuildIsSanitizeLeak

> **QTS\_BuildIsSanitizeLeak**: () => `number`

#### Returns

`number`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:47](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L47)

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

[packages/quickjs-ffi-types/src/ffi.ts:141](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L141)

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

[packages/quickjs-ffi-types/src/ffi.ts:123](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L123)

***

### QTS\_Dump

> **QTS\_Dump**: (`ctx`, `obj`) => [`JSBorrowedCharPointer`](../exports.md#jsborrowedcharpointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **obj**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSBorrowedCharPointer`](../exports.md#jsborrowedcharpointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:149](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L149)

***

### QTS\_DupValuePointer

> **QTS\_DupValuePointer**: (`ctx`, `val`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **val**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:61](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L61)

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

[packages/quickjs-ffi-types/src/ffi.ts:153](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L153)

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

[packages/quickjs-ffi-types/src/ffi.ts:102](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L102)

***

### QTS\_FreeCString

> **QTS\_FreeCString**: (`ctx`, `str`) => `void`

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **str**: [`JSBorrowedCharPointer`](../exports.md#jsborrowedcharpointer)

#### Returns

`void`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:60](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L60)

***

### QTS\_FreeContext

> **QTS\_FreeContext**: (`ctx`) => `void`

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

#### Returns

`void`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:56](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L56)

***

### QTS\_FreeRuntime

> **QTS\_FreeRuntime**: (`rt`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

#### Returns

`void`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:54](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L54)

***

### QTS\_FreeValuePointer

> **QTS\_FreeValuePointer**: (`ctx`, `value`) => `void`

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **value**: [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

`void`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:57](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L57)

***

### QTS\_FreeValuePointerRuntime

> **QTS\_FreeValuePointerRuntime**: (`rt`, `value`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

• **value**: [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

`void`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:58](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L58)

***

### QTS\_FreeVoidPointer

> **QTS\_FreeVoidPointer**: (`ctx`, `ptr`) => `void`

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **ptr**: [`JSVoidPointer`](../exports.md#jsvoidpointer)

#### Returns

`void`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:59](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L59)

***

### QTS\_GetArrayBuffer

> **QTS\_GetArrayBuffer**: (`ctx`, `data`) => [`JSVoidPointer`](../exports.md#jsvoidpointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **data**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSVoidPointer`](../exports.md#jsvoidpointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:83](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L83)

***

### QTS\_GetArrayBufferLength

> **QTS\_GetArrayBufferLength**: (`ctx`, `data`) => `number`

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **data**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

`number`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:87](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L87)

***

### QTS\_GetDebugLogEnabled

> **QTS\_GetDebugLogEnabled**: (`rt`) => `number`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

#### Returns

`number`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:194](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L194)

***

### QTS\_GetFalse

> **QTS\_GetFalse**: () => [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:51](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L51)

***

### QTS\_GetFloat64

> **QTS\_GetFloat64**: (`ctx`, `value`) => `number`

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **value**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

`number`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:77](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L77)

***

### QTS\_GetGlobalObject

> **QTS\_GetGlobalObject**: (`ctx`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:180](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L180)

***

### QTS\_GetLength

> **QTS\_GetLength**: (`ctx`, `out_len`, `value`) => `number`

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **out\_len**: [`UInt32Pointer`](../exports.md#uint32pointer)

• **value**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

`number`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:169](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L169)

***

### QTS\_GetModuleNamespace

> **QTS\_GetModuleNamespace**: (`ctx`, `module_func_obj`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **module\_func\_obj**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:161](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L161)

***

### QTS\_GetNull

> **QTS\_GetNull**: () => [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:50](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L50)

***

### QTS\_GetOwnPropertyNames

> **QTS\_GetOwnPropertyNames**: (`ctx`, `out_ptrs`, `out_len`, `obj`, `flags`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **out\_ptrs**: [`JSValuePointerPointerPointer`](../exports.md#jsvaluepointerpointerpointer)

• **out\_len**: [`UInt32Pointer`](../exports.md#uint32pointer)

• **obj**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

• **flags**: `number`

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:134](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L134)

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

[packages/quickjs-ffi-types/src/ffi.ts:107](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L107)

***

### QTS\_GetPropNumber

> **QTS\_GetPropNumber**: (`ctx`, `this_val`, `prop_name`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **this\_val**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

• **prop\_name**: `number`

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:112](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L112)

***

### QTS\_GetString

> **QTS\_GetString**: (`ctx`, `value`) => [`JSBorrowedCharPointer`](../exports.md#jsborrowedcharpointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **value**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSBorrowedCharPointer`](../exports.md#jsborrowedcharpointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:79](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L79)

***

### QTS\_GetSymbolDescriptionOrKey

> **QTS\_GetSymbolDescriptionOrKey**: (`ctx`, `value`) => [`JSBorrowedCharPointer`](../exports.md#jsborrowedcharpointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **value**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSBorrowedCharPointer`](../exports.md#jsborrowedcharpointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:96](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L96)

***

### QTS\_GetTrue

> **QTS\_GetTrue**: () => [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:52](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L52)

***

### QTS\_GetUndefined

> **QTS\_GetUndefined**: () => [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:49](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L49)

***

### QTS\_IsEqual

> **QTS\_IsEqual**: (`ctx`, `a`, `b`, `op`) => `number`

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **a**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

• **b**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

• **op**: [`IsEqualOp`](../exports.md#isequalop)

#### Returns

`number`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:174](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L174)

***

### QTS\_IsGlobalSymbol

> **QTS\_IsGlobalSymbol**: (`ctx`, `value`) => `number`

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **value**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

`number`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:100](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L100)

***

### QTS\_IsJobPending

> **QTS\_IsJobPending**: (`rt`) => `number`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

#### Returns

`number`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:101](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L101)

***

### QTS\_NewArray

> **QTS\_NewArray**: (`ctx`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:70](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L70)

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

[packages/quickjs-ffi-types/src/ffi.ts:71](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L71)

***

### QTS\_NewContext

> **QTS\_NewContext**: (`rt`, `intrinsics`) => [`JSContextPointer`](../exports.md#jscontextpointer)

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

• **intrinsics**: [`IntrinsicsFlags`](../exports.md#intrinsicsflags)

#### Returns

[`JSContextPointer`](../exports.md#jscontextpointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:55](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L55)

***

### QTS\_NewError

> **QTS\_NewError**: (`ctx`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:42](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L42)

***

### QTS\_NewFloat64

> **QTS\_NewFloat64**: (`ctx`, `num`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **num**: `number`

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:76](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L76)

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

[packages/quickjs-ffi-types/src/ffi.ts:198](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L198)

***

### QTS\_NewObject

> **QTS\_NewObject**: (`ctx`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:65](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L65)

***

### QTS\_NewObjectProto

> **QTS\_NewObjectProto**: (`ctx`, `proto`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **proto**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:66](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L66)

***

### QTS\_NewPromiseCapability

> **QTS\_NewPromiseCapability**: (`ctx`, `resolve_funcs_out`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **resolve\_funcs\_out**: [`JSValuePointerPointer`](../exports.md#jsvaluepointerpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:181](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L181)

***

### QTS\_NewRuntime

> **QTS\_NewRuntime**: () => [`JSRuntimePointer`](../exports.md#jsruntimepointer)

#### Returns

[`JSRuntimePointer`](../exports.md#jsruntimepointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:53](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L53)

***

### QTS\_NewString

> **QTS\_NewString**: (`ctx`, `string`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **string**: [`BorrowedHeapCharPointer`](../exports.md#borrowedheapcharpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:78](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L78)

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

[packages/quickjs-ffi-types/src/ffi.ts:91](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L91)

***

### QTS\_PromiseResult

> **QTS\_PromiseResult**: (`ctx`, `promise`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **promise**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:189](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L189)

***

### QTS\_PromiseState

> **QTS\_PromiseState**: (`ctx`, `promise`) => [`JSPromiseStateEnum`](../exports.md#jspromisestateenum-1)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **promise**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSPromiseStateEnum`](../exports.md#jspromisestateenum-1)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:185](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L185)

***

### QTS\_RecoverableLeakCheck

> **QTS\_RecoverableLeakCheck**: () => `number`

#### Returns

`number`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:46](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L46)

***

### QTS\_ResolveException

> **QTS\_ResolveException**: (`ctx`, `maybe_exception`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **maybe\_exception**: [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:148](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L148)

***

### QTS\_RuntimeComputeMemoryUsage

> **QTS\_RuntimeComputeMemoryUsage**: (`rt`) => `JSMemoryUsagePointer`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

#### Returns

`JSMemoryUsagePointer`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:44](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L44)

***

### QTS\_RuntimeDisableInterruptHandler

> **QTS\_RuntimeDisableInterruptHandler**: (`rt`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

#### Returns

`void`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:204](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L204)

***

### QTS\_RuntimeDisableModuleLoader

> **QTS\_RuntimeDisableModuleLoader**: (`rt`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

#### Returns

`void`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:206](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L206)

***

### QTS\_RuntimeDumpMemoryUsage

> **QTS\_RuntimeDumpMemoryUsage**: (`rt`) => [`OwnedHeapCharPointer`](../exports.md#ownedheapcharpointer)

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

#### Returns

[`OwnedHeapCharPointer`](../exports.md#ownedheapcharpointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:45](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L45)

***

### QTS\_RuntimeEnableInterruptHandler

> **QTS\_RuntimeEnableInterruptHandler**: (`rt`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

#### Returns

`void`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:203](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L203)

***

### QTS\_RuntimeEnableModuleLoader

> **QTS\_RuntimeEnableModuleLoader**: (`rt`, `use_custom_normalize`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

• **use\_custom\_normalize**: `number`

#### Returns

`void`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:205](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L205)

***

### QTS\_RuntimeSetMaxStackSize

> **QTS\_RuntimeSetMaxStackSize**: (`rt`, `stack_size`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

• **stack\_size**: `number`

#### Returns

`void`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:48](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L48)

***

### QTS\_RuntimeSetMemoryLimit

> **QTS\_RuntimeSetMemoryLimit**: (`rt`, `limit`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

• **limit**: `number`

#### Returns

`void`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:43](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L43)

***

### QTS\_SetDebugLogEnabled

> **QTS\_SetDebugLogEnabled**: (`rt`, `is_enabled`) => `void`

#### Parameters

• **rt**: [`JSRuntimePointer`](../exports.md#jsruntimepointer)

• **is\_enabled**: `number`

#### Returns

`void`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:195](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L195)

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

[packages/quickjs-ffi-types/src/ffi.ts:117](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L117)

***

### QTS\_TestStringArg

> **QTS\_TestStringArg**: (`string`) => `void`

#### Parameters

• **string**: `string`

#### Returns

`void`

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:193](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L193)

***

### QTS\_Throw

> **QTS\_Throw**: (`ctx`, `error`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **error**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:41](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L41)

***

### QTS\_Typeof

> **QTS\_Typeof**: (`ctx`, `value`) => [`OwnedHeapCharPointer`](../exports.md#ownedheapcharpointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **value**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`OwnedHeapCharPointer`](../exports.md#ownedheapcharpointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:165](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L165)

***

### QTS\_bjson\_decode

> **QTS\_bjson\_decode**: (`ctx`, `data`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **data**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:211](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L211)

***

### QTS\_bjson\_encode

> **QTS\_bjson\_encode**: (`ctx`, `val`) => [`JSValuePointer`](../exports.md#jsvaluepointer)

#### Parameters

• **ctx**: [`JSContextPointer`](../exports.md#jscontextpointer)

• **val**: [`JSValuePointer`](../exports.md#jsvaluepointer) \| [`JSValueConstPointer`](../exports.md#jsvalueconstpointer)

#### Returns

[`JSValuePointer`](../exports.md#jsvaluepointer)

#### Source

[packages/quickjs-ffi-types/src/ffi.ts:207](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi.ts#L207)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
