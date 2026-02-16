[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / @jitl/quickjs-ffi-types

# @jitl/quickjs-ffi-types

This is an internal package, part of [quickjs-emscripten](https://github.com/justjake/quickjs-emscripten).

See the main package for documentation.

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

> **BorrowedHeapCharPointer** = `Pointer`\<`"const char"` \| `"char"` \| `"js const char"`\>

Defined in: [ffi-types.ts:82](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L82)

Used internally for Javascript-to-C calls that may contain strings too large
for the Emscripten stack.

***

### EitherFFI

> **EitherFFI** = [`QuickJSFFI`](interfaces/QuickJSFFI.md) \| [`QuickJSAsyncFFI`](interfaces/QuickJSAsyncFFI.md)

Defined in: [variant-types.ts:50](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/variant-types.ts#L50)

***

### EitherModule

> **EitherModule** = [`QuickJSEmscriptenModule`](interfaces/QuickJSEmscriptenModule.md) \| [`QuickJSAsyncEmscriptenModule`](interfaces/QuickJSAsyncEmscriptenModule.md)

Defined in: [emscripten-types.ts:253](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/emscripten-types.ts#L253)

***

### JSBorrowedCharPointer

> **JSBorrowedCharPointer** = `Pointer`\<`"js const char"`\>

Defined in: [ffi-types.ts:94](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L94)

Used internally for Javascript-to-C calls that may contain strings too large
for the Emscripten stack.

***

### JSContextPointer

> **JSContextPointer** = `Pointer`\<`"JSContext"`\>

Defined in: [ffi-types.ts:19](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L19)

`JSContext*`.

***

### JSContextPointerPointer

> **JSContextPointerPointer** = `Pointer`\<`"JSContext"`\>

Defined in: [ffi-types.ts:24](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L24)

`JSContext**`. Used internally for execute pending jobs.

***

### JSModuleDefPointer

> **JSModuleDefPointer** = `Pointer`\<`"JSModuleDef"`\>

Defined in: [ffi-types.ts:29](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L29)

`JSModuleDef*`.

***

### JSPromiseStateEnum

> **JSPromiseStateEnum** = `Brand`\<*typeof* [`JSPromiseStateEnum`](#jspromisestateenum-1)\[keyof *typeof* [`JSPromiseStateEnum`](#jspromisestateenum-1)\], `"JSPromiseStateEnum"`\>

Defined in: [ffi-types.ts:136](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L136)

State of a promise.

***

### JSRuntimePointer

> **JSRuntimePointer** = `Pointer`\<`"JSRuntime"`\>

Defined in: [ffi-types.ts:14](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L14)

`JSRuntime*`.

***

### JSValueConstPointer

> **JSValueConstPointer** = `Pointer`\<`"JSValueConst"`\>

Defined in: [ffi-types.ts:41](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L41)

`JSValueConst*
See JSValueConst and StaticJSValue.

***

### JSValueConstPointerPointer

> **JSValueConstPointerPointer** = `Pointer`\<`"JSValueConst[]"`\>

Defined in: [ffi-types.ts:56](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L56)

Used internally for Javascript-to-C function calls.

***

### JSValuePointer

> **JSValuePointer** = `Pointer`\<`"JSValue"`\>

Defined in: [ffi-types.ts:35](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L35)

`JSValue*`.
See JSValue.

***

### JSValuePointerPointer

> **JSValuePointerPointer** = `Pointer`\<`"JSValue[]"`\>

Defined in: [ffi-types.ts:46](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L46)

Used internally for Javascript-to-C function calls.

***

### JSValuePointerPointerPointer

> **JSValuePointerPointerPointer** = `Pointer`\<`"*JSValue[]"`\>

Defined in: [ffi-types.ts:51](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L51)

Used internally for Javascript-to-C function calls.

***

### JSVoidPointer

> **JSVoidPointer** = `Pointer`\<`any`\>

Defined in: [ffi-types.ts:99](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L99)

Opaque pointer that was allocated by js_malloc.

***

### OwnedHeapCharPointer

> **OwnedHeapCharPointer** = `Pointer`\<`"char"`\>

Defined in: [ffi-types.ts:88](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L88)

Used internally for Javascript-to-C calls that may contain strings too large
for the Emscripten stack.

***

### QTS\_C\_To\_HostCallbackFuncPointer

> **QTS\_C\_To\_HostCallbackFuncPointer** = `Pointer`\<`"C_To_HostCallbackFunc"`\>

Defined in: [ffi-types.ts:66](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L66)

Used internally for C-to-Javascript function calls.

***

### QTS\_C\_To\_HostInterruptFuncPointer

> **QTS\_C\_To\_HostInterruptFuncPointer** = `Pointer`\<`"C_To_HostInterruptFunc"`\>

Defined in: [ffi-types.ts:71](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L71)

Used internally for C-to-Javascript interrupt handlers.

***

### QTS\_C\_To\_HostLoadModuleFuncPointer

> **QTS\_C\_To\_HostLoadModuleFuncPointer** = `Pointer`\<`"C_To_HostLoadModuleFunc"`\>

Defined in: [ffi-types.ts:76](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L76)

Used internally for C-to-Javascript module loading.

***

### QuickJSVariant

> **QuickJSVariant** = [`QuickJSSyncVariant`](interfaces/QuickJSSyncVariant.md) \| [`QuickJSAsyncVariant`](interfaces/QuickJSAsyncVariant.md)

Defined in: [variant-types.ts:49](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/variant-types.ts#L49)

***

### UInt32Pointer

> **UInt32Pointer** = `Pointer`\<`"uint32_t"`\>

Defined in: [ffi-types.ts:101](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L101)

## Variables

### EvalFlags

> **EvalFlags**: `object`

Defined in: [ffi-types.ts:106](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L106)

Bitfield options for JS_Eval() C function.

#### Type Declaration

##### JS\_EVAL\_FLAG\_BACKTRACE\_BARRIER

> `readonly` **JS\_EVAL\_FLAG\_BACKTRACE\_BARRIER**: `number`

don't include the stack frames before this eval in the Error() backtraces

##### JS\_EVAL\_FLAG\_COMPILE\_ONLY

> `readonly` **JS\_EVAL\_FLAG\_COMPILE\_ONLY**: `number`

compile but do not run. The result is an object with a
JS_TAG_FUNCTION_BYTECODE or JS_TAG_MODULE tag. It can be executed
with JS_EvalFunction().

##### JS\_EVAL\_FLAG\_STRICT

> `readonly` **JS\_EVAL\_FLAG\_STRICT**: `number`

force 'strict' mode

##### JS\_EVAL\_FLAG\_STRIP

> `readonly` **JS\_EVAL\_FLAG\_STRIP**: `number`

force 'strip' mode

##### JS\_EVAL\_TYPE\_DIRECT

> `readonly` **JS\_EVAL\_TYPE\_DIRECT**: `number`

direct call (internal use)

##### JS\_EVAL\_TYPE\_GLOBAL

> `readonly` **JS\_EVAL\_TYPE\_GLOBAL**: `number`

global code (default)

##### JS\_EVAL\_TYPE\_INDIRECT

> `readonly` **JS\_EVAL\_TYPE\_INDIRECT**: `number`

indirect call (internal use)

##### JS\_EVAL\_TYPE\_MASK

> `readonly` **JS\_EVAL\_TYPE\_MASK**: `number`

##### JS\_EVAL\_TYPE\_MODULE

> `readonly` **JS\_EVAL\_TYPE\_MODULE**: `number`

module code

***

### GetOwnPropertyNamesFlags

> **GetOwnPropertyNamesFlags**: `object`

Defined in: [ffi-types.ts:121](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L121)

Bitfield options for QTS_GetOwnPropertyNames

#### Type Declaration

##### JS\_GPN\_ENUM\_ONLY

> **JS\_GPN\_ENUM\_ONLY**: `number`

##### JS\_GPN\_PRIVATE\_MASK

> **JS\_GPN\_PRIVATE\_MASK**: `number`

##### JS\_GPN\_SET\_ENUM

> **JS\_GPN\_SET\_ENUM**: `number`

##### JS\_GPN\_STRING\_MASK

> **JS\_GPN\_STRING\_MASK**: `number`

##### JS\_GPN\_SYMBOL\_MASK

> **JS\_GPN\_SYMBOL\_MASK**: `number`

##### QTS\_GPN\_NUMBER\_MASK

> **QTS\_GPN\_NUMBER\_MASK**: `number`

##### QTS\_STANDARD\_COMPLIANT\_NUMBER

> **QTS\_STANDARD\_COMPLIANT\_NUMBER**: `number`

***

### IntrinsicsFlags

> **IntrinsicsFlags**: `object`

Defined in: [ffi-types.ts:111](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L111)

Bitfield options for QTS_NewContext intrinsics

#### Type Declaration

##### BaseObjects

> `readonly` **BaseObjects**: `number`

##### BigDecimal

> `readonly` **BigDecimal**: `number`

##### BigFloat

> `readonly` **BigFloat**: `number`

##### BigInt

> `readonly` **BigInt**: `number`

##### BignumExt

> `readonly` **BignumExt**: `number`

##### Date

> `readonly` **Date**: `number`

##### Eval

> `readonly` **Eval**: `number`

##### JSON

> `readonly` **JSON**: `number`

##### MapSet

> `readonly` **MapSet**: `number`

##### OperatorOverloading

> `readonly` **OperatorOverloading**: `number`

##### Promise

> `readonly` **Promise**: `number`

##### Proxy

> `readonly` **Proxy**: `number`

##### RegExp

> `readonly` **RegExp**: `number`

##### RegExpCompiler

> `readonly` **RegExpCompiler**: `number`

##### StringNormalize

> `readonly` **StringNormalize**: `number`

##### TypedArrays

> `readonly` **TypedArrays**: `number`

***

### IsEqualOp

> **IsEqualOp**: `object`

Defined in: [ffi-types.ts:126](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L126)

#### Type Declaration

##### IsSameValue

> **IsSameValue**: [`IsEqualOp`](#isequalop)

##### IsSameValueZero

> **IsSameValueZero**: [`IsEqualOp`](#isequalop)

##### IsStrictlyEqual

> **IsStrictlyEqual**: [`IsEqualOp`](#isequalop)

***

### JSPromiseStateEnum

> **JSPromiseStateEnum**: `object`

Defined in: [ffi-types.ts:136](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L136)

#### Type Declaration

##### Fulfilled

> `readonly` **Fulfilled**: `1` = `1`

##### Pending

> `readonly` **Pending**: `0` = `0`

##### Rejected

> `readonly` **Rejected**: `2` = `2`

## Functions

### assertSync()

> **assertSync**\<`Args`, `R`\>(`fn`): (...`args`) => `R`

Defined in: [ffi-types.ts:141](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L141)

#### Type Parameters

##### Args

`Args` *extends* `any`[]

##### R

`R`

#### Parameters

##### fn

(...`args`) => `R`

#### Returns

> (...`args`): `R`

##### Parameters

###### args

...`Args`

##### Returns

`R`
