[quickjs-emscripten](../../packages.md) • **@jitl/quickjs-ffi-types** • [Readme](README.md) \| [Exports](exports.md)

***

[quickjs-emscripten](../../packages.md) / @jitl/quickjs-ffi-types

# @jitl/quickjs-ffi-types

## Contents

- [Interfaces](exports.md#interfaces)
- [Type Aliases](exports.md#type-aliases)
  - [BorrowedHeapCharPointer](exports.md#borrowedheapcharpointer)
  - [EitherFFI](exports.md#eitherffi)
  - [EitherModule](exports.md#eithermodule)
  - [JSBorrowedCharPointer](exports.md#jsborrowedcharpointer)
  - [JSContextPointer](exports.md#jscontextpointer)
  - [JSContextPointerPointer](exports.md#jscontextpointerpointer)
  - [JSModuleDefPointer](exports.md#jsmoduledefpointer)
  - [JSPromiseStateEnum](exports.md#jspromisestateenum)
  - [JSRuntimePointer](exports.md#jsruntimepointer)
  - [JSValueConstPointer](exports.md#jsvalueconstpointer)
  - [JSValueConstPointerPointer](exports.md#jsvalueconstpointerpointer)
  - [JSValuePointer](exports.md#jsvaluepointer)
  - [JSValuePointerPointer](exports.md#jsvaluepointerpointer)
  - [JSVoidPointer](exports.md#jsvoidpointer)
  - [OwnedHeapCharPointer](exports.md#ownedheapcharpointer)
  - [QTS\_C\_To\_HostCallbackFuncPointer](exports.md#qts-c-to-hostcallbackfuncpointer)
  - [QTS\_C\_To\_HostInterruptFuncPointer](exports.md#qts-c-to-hostinterruptfuncpointer)
  - [QTS\_C\_To\_HostLoadModuleFuncPointer](exports.md#qts-c-to-hostloadmodulefuncpointer)
  - [QuickJSVariant](exports.md#quickjsvariant)
- [Variables](exports.md#variables)
  - [EvalFlags](exports.md#evalflags)
  - [IntrinsicsFlags](exports.md#intrinsicsflags)
  - [JSPromiseStateEnum](exports.md#jspromisestateenum-1)
- [Functions](exports.md#functions)
  - [assertSync()](exports.md#assertsync)

## Interfaces

- [EmscriptenModule](interfaces/EmscriptenModule.md)
- [EmscriptenModuleLoader](interfaces/EmscriptenModuleLoader.md)
- [EmscriptenModuleLoaderOptions](interfaces/EmscriptenModuleLoaderOptions.md)
- [QuickJSAsyncEmscriptenModule](interfaces/QuickJSAsyncEmscriptenModule.md)
- [QuickJSAsyncFFI](interfaces/QuickJSAsyncFFI.md)
- [QuickJSAsyncVariant](interfaces/QuickJSAsyncVariant.md)
- [QuickJSEmscriptenModule](interfaces/QuickJSEmscriptenModule.md)
- [QuickJSFFI](interfaces/QuickJSFFI.md)
- [QuickJSSyncVariant](interfaces/QuickJSSyncVariant.md)
- [SourceMapData](interfaces/SourceMapData.md)

## Type Aliases

### BorrowedHeapCharPointer

> **BorrowedHeapCharPointer**: `Pointer`\<`"const char"` \| `"char"` \| `"js const char"`\>

Used internally for Javascript-to-C calls that may contain strings too large
for the Emscripten stack.

#### Source

[packages/quickjs-ffi-types/src/ffi-types.ts:77](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L77)

***

### EitherFFI

> **EitherFFI**: [`QuickJSFFI`](interfaces/QuickJSFFI.md) \| [`QuickJSAsyncFFI`](interfaces/QuickJSAsyncFFI.md)

#### Source

[packages/quickjs-ffi-types/src/variant-types.ts:50](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/variant-types.ts#L50)

***

### EitherModule

> **EitherModule**: [`QuickJSEmscriptenModule`](interfaces/QuickJSEmscriptenModule.md) \| [`QuickJSAsyncEmscriptenModule`](interfaces/QuickJSAsyncEmscriptenModule.md)

#### Source

[packages/quickjs-ffi-types/src/emscripten-types.ts:246](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L246)

***

### JSBorrowedCharPointer

> **JSBorrowedCharPointer**: `Pointer`\<`"js const char"`\>

Used internally for Javascript-to-C calls that may contain strings too large
for the Emscripten stack.

#### Source

[packages/quickjs-ffi-types/src/ffi-types.ts:89](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L89)

***

### JSContextPointer

> **JSContextPointer**: `Pointer`\<`"JSContext"`\>

`JSContext*`.

#### Source

[packages/quickjs-ffi-types/src/ffi-types.ts:19](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L19)

***

### JSContextPointerPointer

> **JSContextPointerPointer**: `Pointer`\<`"JSContext"`\>

`JSContext**`. Used internally for execute pending jobs.

#### Source

[packages/quickjs-ffi-types/src/ffi-types.ts:24](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L24)

***

### JSModuleDefPointer

> **JSModuleDefPointer**: `Pointer`\<`"JSModuleDef"`\>

`JSModuleDef*`.

#### Source

[packages/quickjs-ffi-types/src/ffi-types.ts:29](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L29)

***

### JSPromiseStateEnum

> **JSPromiseStateEnum**: `Brand`\<*typeof* [`JSPromiseStateEnum`](exports.md#jspromisestateenum-1)\[keyof *typeof* [`JSPromiseStateEnum`](exports.md#jspromisestateenum-1)\], `"JSPromiseStateEnum"`\>

State of a promise.

#### Source

[packages/quickjs-ffi-types/src/ffi-types.ts:114](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L114)

***

### JSRuntimePointer

> **JSRuntimePointer**: `Pointer`\<`"JSRuntime"`\>

`JSRuntime*`.

#### Source

[packages/quickjs-ffi-types/src/ffi-types.ts:14](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L14)

***

### JSValueConstPointer

> **JSValueConstPointer**: `Pointer`\<`"JSValueConst"`\>

`JSValueConst*
See JSValueConst and StaticJSValue.

#### Source

[packages/quickjs-ffi-types/src/ffi-types.ts:41](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L41)

***

### JSValueConstPointerPointer

> **JSValueConstPointerPointer**: `Pointer`\<`"JSValueConst[]"`\>

Used internally for Javascript-to-C function calls.

#### Source

[packages/quickjs-ffi-types/src/ffi-types.ts:51](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L51)

***

### JSValuePointer

> **JSValuePointer**: `Pointer`\<`"JSValue"`\>

`JSValue*`.
See JSValue.

#### Source

[packages/quickjs-ffi-types/src/ffi-types.ts:35](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L35)

***

### JSValuePointerPointer

> **JSValuePointerPointer**: `Pointer`\<`"JSValue[]"`\>

Used internally for Javascript-to-C function calls.

#### Source

[packages/quickjs-ffi-types/src/ffi-types.ts:46](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L46)

***

### JSVoidPointer

> **JSVoidPointer**: `Pointer`\<`any`\>

Opaque pointer that was allocated by js_malloc.

#### Source

[packages/quickjs-ffi-types/src/ffi-types.ts:94](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L94)

***

### OwnedHeapCharPointer

> **OwnedHeapCharPointer**: `Pointer`\<`"char"`\>

Used internally for Javascript-to-C calls that may contain strings too large
for the Emscripten stack.

#### Source

[packages/quickjs-ffi-types/src/ffi-types.ts:83](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L83)

***

### QTS\_C\_To\_HostCallbackFuncPointer

> **QTS\_C\_To\_HostCallbackFuncPointer**: `Pointer`\<`"C_To_HostCallbackFunc"`\>

Used internally for C-to-Javascript function calls.

#### Source

[packages/quickjs-ffi-types/src/ffi-types.ts:61](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L61)

***

### QTS\_C\_To\_HostInterruptFuncPointer

> **QTS\_C\_To\_HostInterruptFuncPointer**: `Pointer`\<`"C_To_HostInterruptFunc"`\>

Used internally for C-to-Javascript interrupt handlers.

#### Source

[packages/quickjs-ffi-types/src/ffi-types.ts:66](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L66)

***

### QTS\_C\_To\_HostLoadModuleFuncPointer

> **QTS\_C\_To\_HostLoadModuleFuncPointer**: `Pointer`\<`"C_To_HostLoadModuleFunc"`\>

Used internally for C-to-Javascript module loading.

#### Source

[packages/quickjs-ffi-types/src/ffi-types.ts:71](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L71)

***

### QuickJSVariant

> **QuickJSVariant**: [`QuickJSSyncVariant`](interfaces/QuickJSSyncVariant.md) \| [`QuickJSAsyncVariant`](interfaces/QuickJSAsyncVariant.md)

#### Source

[packages/quickjs-ffi-types/src/variant-types.ts:49](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/variant-types.ts#L49)

## Variables

### EvalFlags

> **EvalFlags**: `Object`

Bitfield options for JS_Eval() C function.

#### Type declaration

##### JS\_EVAL\_FLAG\_BACKTRACE\_BARRIER

> **`readonly`** **JS\_EVAL\_FLAG\_BACKTRACE\_BARRIER**: `number`

don't include the stack frames before this eval in the Error() backtraces

##### JS\_EVAL\_FLAG\_COMPILE\_ONLY

> **`readonly`** **JS\_EVAL\_FLAG\_COMPILE\_ONLY**: `number`

compile but do not run. The result is an object with a
JS_TAG_FUNCTION_BYTECODE or JS_TAG_MODULE tag. It can be executed
with JS_EvalFunction().

##### JS\_EVAL\_FLAG\_STRICT

> **`readonly`** **JS\_EVAL\_FLAG\_STRICT**: `number`

force 'strict' mode

##### JS\_EVAL\_FLAG\_STRIP

> **`readonly`** **JS\_EVAL\_FLAG\_STRIP**: `number`

force 'strip' mode

##### JS\_EVAL\_TYPE\_DIRECT

> **`readonly`** **JS\_EVAL\_TYPE\_DIRECT**: `number`

direct call (internal use)

##### JS\_EVAL\_TYPE\_GLOBAL

> **`readonly`** **JS\_EVAL\_TYPE\_GLOBAL**: `number`

global code (default)

##### JS\_EVAL\_TYPE\_INDIRECT

> **`readonly`** **JS\_EVAL\_TYPE\_INDIRECT**: `number`

indirect call (internal use)

##### JS\_EVAL\_TYPE\_MASK

> **`readonly`** **JS\_EVAL\_TYPE\_MASK**: `number`

##### JS\_EVAL\_TYPE\_MODULE

> **`readonly`** **JS\_EVAL\_TYPE\_MODULE**: `number`

module code

#### Source

[packages/quickjs-ffi-types/src/ffi-types.ts:99](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L99)

***

### IntrinsicsFlags

> **IntrinsicsFlags**: `Object`

Bitfield options for QTS_NewContext intrinsices

#### Type declaration

##### BaseObjects

> **`readonly`** **BaseObjects**: `number`

##### BigDecimal

> **`readonly`** **BigDecimal**: `number`

##### BigFloat

> **`readonly`** **BigFloat**: `number`

##### BigInt

> **`readonly`** **BigInt**: `number`

##### BignumExt

> **`readonly`** **BignumExt**: `number`

##### Date

> **`readonly`** **Date**: `number`

##### Eval

> **`readonly`** **Eval**: `number`

##### JSON

> **`readonly`** **JSON**: `number`

##### MapSet

> **`readonly`** **MapSet**: `number`

##### OperatorOverloading

> **`readonly`** **OperatorOverloading**: `number`

##### Promise

> **`readonly`** **Promise**: `number`

##### Proxy

> **`readonly`** **Proxy**: `number`

##### RegExp

> **`readonly`** **RegExp**: `number`

##### RegExpCompiler

> **`readonly`** **RegExpCompiler**: `number`

##### StringNormalize

> **`readonly`** **StringNormalize**: `number`

##### TypedArrays

> **`readonly`** **TypedArrays**: `number`

#### Source

[packages/quickjs-ffi-types/src/ffi-types.ts:104](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L104)

***

### JSPromiseStateEnum

> **JSPromiseStateEnum**: `Object`

#### Type declaration

##### Fulfilled

> **`readonly`** **Fulfilled**: `1` = `1`

##### Pending

> **`readonly`** **Pending**: `0` = `0`

##### Rejected

> **`readonly`** **Rejected**: `2` = `2`

#### Source

[packages/quickjs-ffi-types/src/ffi-types.ts:114](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L114)

## Functions

### assertSync()

> **assertSync**\<`Args`, `R`\>(`fn`): (...`args`) => `R`

#### Type parameters

• **Args** extends `any`[]

• **R**

#### Parameters

• **fn**: (...`args`) => `R`

#### Returns

`Function`

> ##### Parameters
>
> • ...**args**: `Args`
>
> ##### Returns
>
> `R`
>

#### Source

[packages/quickjs-ffi-types/src/ffi-types.ts:119](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L119)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
