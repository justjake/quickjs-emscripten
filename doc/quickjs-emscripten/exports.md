[quickjs-emscripten](../packages.md) • **quickjs-emscripten** • [Readme](README.md) \| [Exports](exports.md)

***

[quickjs-emscripten](../packages.md) / quickjs-emscripten

# quickjs-emscripten

## Contents

- [Namespaces](exports.md#namespaces)
- [Classes](exports.md#classes)
- [Interfaces](exports.md#interfaces)
- [Type Aliases](exports.md#type-aliases)
  - [AsyncFunctionImplementation](exports.md#asyncfunctionimplementation)
  - [BorrowedHeapCharPointer](exports.md#borrowedheapcharpointer)
  - [DisposableArray\<T\>](exports.md#disposablearrayt)
  - [DisposableResult\<S, F\>](exports.md#disposableresults-f)
  - [EitherFFI](exports.md#eitherffi)
  - [EitherModule](exports.md#eithermodule)
  - [ExecutePendingJobsResult](exports.md#executependingjobsresult)
  - [InterruptHandler](exports.md#interrupthandler)
  - [Intrinsics](exports.md#intrinsics)
  - [JSBorrowedCharPointer](exports.md#jsborrowedcharpointer)
  - [JSContextPointer](exports.md#jscontextpointer)
  - [JSContextPointerPointer](exports.md#jscontextpointerpointer)
  - [JSModuleDefPointer](exports.md#jsmoduledefpointer)
  - [JSModuleLoadFailure](exports.md#jsmoduleloadfailure)
  - [JSModuleLoadResult](exports.md#jsmoduleloadresult)
  - [JSModuleLoadSuccess](exports.md#jsmoduleloadsuccess)
  - [JSModuleNormalizeFailure](exports.md#jsmodulenormalizefailure)
  - [JSModuleNormalizeResult](exports.md#jsmodulenormalizeresult)
  - [JSModuleNormalizeSuccess](exports.md#jsmodulenormalizesuccess)
  - [JSPromiseState](exports.md#jspromisestate)
  - [JSPromiseStateEnum](exports.md#jspromisestateenum)
  - [JSRuntimePointer](exports.md#jsruntimepointer)
  - [JSValue](exports.md#jsvalue)
  - [JSValueConst](exports.md#jsvalueconst)
  - [JSValueConstPointer](exports.md#jsvalueconstpointer)
  - [JSValueConstPointerPointer](exports.md#jsvalueconstpointerpointer)
  - [JSValuePointer](exports.md#jsvaluepointer)
  - [JSValuePointerPointer](exports.md#jsvaluepointerpointer)
  - [JSValuePointerPointerPointer](exports.md#jsvaluepointerpointerpointer)
  - [JSVoidPointer](exports.md#jsvoidpointer)
  - [OrLoader\<T\>](exports.md#orloadert)
  - [OwnedHeapCharPointer](exports.md#ownedheapcharpointer)
  - [PromiseExecutor\<ResolveT, RejectT\>](exports.md#promiseexecutorresolvet-rejectt)
  - [PromisedDefault\<T\>](exports.md#promiseddefaultt)
  - [QTS\_C\_To\_HostCallbackFuncPointer](exports.md#qts-c-to-hostcallbackfuncpointer)
  - [QTS\_C\_To\_HostInterruptFuncPointer](exports.md#qts-c-to-hostinterruptfuncpointer)
  - [QTS\_C\_To\_HostLoadModuleFuncPointer](exports.md#qts-c-to-hostloadmodulefuncpointer)
  - [QuickJSHandle](exports.md#quickjshandle)
  - [QuickJSPropertyKey](exports.md#quickjspropertykey)
  - [QuickJSVariant](exports.md#quickjsvariant)
  - [StaticJSValue](exports.md#staticjsvalue)
  - [SuccessOrFail\<S, F\>](exports.md#successorfails-f)
  - [UInt32Pointer](exports.md#uint32pointer)
  - [VmCallResult\<VmHandle\>](exports.md#vmcallresultvmhandle)
  - [VmFunctionImplementation\<VmHandle\>](exports.md#vmfunctionimplementationvmhandle)
- [Variables](exports.md#variables)
  - [DEBUG\_ASYNC](exports.md#debug-async)
  - [@jitl/quickjs-wasmfile-debug-asyncify](exports.md#jitlquickjs-wasmfile-debug-asyncify)
  - [DEBUG\_SYNC](exports.md#debug-sync)
  - [@jitl/quickjs-wasmfile-debug-sync](exports.md#jitlquickjs-wasmfile-debug-sync)
  - [DefaultIntrinsics](exports.md#defaultintrinsics)
  - [DisposableResult](exports.md#disposableresult)
  - [EvalFlags](exports.md#evalflags)
  - [GetOwnPropertyNamesFlags](exports.md#getownpropertynamesflags)
  - [IntrinsicsFlags](exports.md#intrinsicsflags)
  - [IsEqualOp](exports.md#isequalop)
  - [JSPromiseStateEnum](exports.md#jspromisestateenum-1)
  - [RELEASE\_ASYNC](exports.md#release-async)
  - [@jitl/quickjs-wasmfile-release-asyncify](exports.md#jitlquickjs-wasmfile-release-asyncify)
  - [RELEASE\_SYNC](exports.md#release-sync)
  - [@jitl/quickjs-wasmfile-release-sync](exports.md#jitlquickjs-wasmfile-release-sync)
- [Functions](exports.md#functions)
  - [assertSync()](exports.md#assertsync)
  - [createDisposableArray()](exports.md#createdisposablearray)
  - [getQuickJS()](exports.md#getquickjs)
  - [getQuickJSSync()](exports.md#getquickjssync)
  - [isFail()](exports.md#isfail)
  - [isSuccess()](exports.md#issuccess)
  - [memoizePromiseFactory()](exports.md#memoizepromisefactory)
  - [newAsyncContext()](exports.md#newasynccontext)
  - [newAsyncRuntime()](exports.md#newasyncruntime)
  - [newQuickJSAsyncWASMModule()](exports.md#newquickjsasyncwasmmodule)
  - [newQuickJSAsyncWASMModuleFromVariant()](exports.md#newquickjsasyncwasmmodulefromvariant)
  - [newQuickJSWASMModule()](exports.md#newquickjswasmmodule)
  - [newQuickJSWASMModuleFromVariant()](exports.md#newquickjswasmmodulefromvariant)
  - [newVariant()](exports.md#newvariant)
  - [setDebugMode()](exports.md#setdebugmode)
  - [shouldInterruptAfterDeadline()](exports.md#shouldinterruptafterdeadline)

## Namespaces

- [errors](namespaces/errors/README.md)

## Classes

- [DisposableFail](classes/DisposableFail.md)
- [DisposableSuccess](classes/DisposableSuccess.md)
- [Lifetime](classes/Lifetime.md)
- [QuickJSAsyncContext](classes/QuickJSAsyncContext.md)
- [QuickJSAsyncRuntime](classes/QuickJSAsyncRuntime.md)
- [QuickJSAsyncWASMModule](classes/QuickJSAsyncWASMModule.md)
- [QuickJSContext](classes/QuickJSContext.md)
- [QuickJSDeferredPromise](classes/QuickJSDeferredPromise.md)
- [QuickJSRuntime](classes/QuickJSRuntime.md)
- [QuickJSWASMModule](classes/QuickJSWASMModule.md)
- [Scope](classes/Scope.md)
- [StaticLifetime](classes/StaticLifetime.md)
- [TestQuickJSWASMModule](classes/TestQuickJSWASMModule.md)
- [UsingDisposable](classes/UsingDisposable.md)
- [WeakLifetime](classes/WeakLifetime.md)

## Interfaces

- [AsyncRuntimeOptions](interfaces/AsyncRuntimeOptions.md)
- [ContextEvalOptions](interfaces/ContextEvalOptions.md)
- [ContextOptions](interfaces/ContextOptions.md)
- [CustomizeVariantOptions](interfaces/CustomizeVariantOptions.md)
- [Disposable](interfaces/Disposable.md)
- [EmscriptenModule](interfaces/EmscriptenModule.md)
- [EmscriptenModuleLoader](interfaces/EmscriptenModuleLoader.md)
- [EmscriptenModuleLoaderOptions](interfaces/EmscriptenModuleLoaderOptions.md)
- [JSModuleLoader](interfaces/JSModuleLoader.md)
- [JSModuleLoaderAsync](interfaces/JSModuleLoaderAsync.md)
- [JSModuleNormalizer](interfaces/JSModuleNormalizer.md)
- [JSModuleNormalizerAsync](interfaces/JSModuleNormalizerAsync.md)
- [JSPromiseStateFulfilled](interfaces/JSPromiseStateFulfilled.md)
- [JSPromiseStatePending](interfaces/JSPromiseStatePending.md)
- [JSPromiseStateRejected](interfaces/JSPromiseStateRejected.md)
- [LowLevelJavascriptVm](interfaces/LowLevelJavascriptVm.md)
- [ModuleEvalOptions](interfaces/ModuleEvalOptions.md)
- [QuickJSAsyncEmscriptenModule](interfaces/QuickJSAsyncEmscriptenModule.md)
- [QuickJSAsyncFFI](interfaces/QuickJSAsyncFFI.md)
- [QuickJSAsyncVariant](interfaces/QuickJSAsyncVariant.md)
- [QuickJSEmscriptenModule](interfaces/QuickJSEmscriptenModule.md)
- [QuickJSFFI](interfaces/QuickJSFFI.md)
- [QuickJSSyncVariant](interfaces/QuickJSSyncVariant.md)
- [RuntimeOptions](interfaces/RuntimeOptions.md)
- [RuntimeOptionsBase](interfaces/RuntimeOptionsBase.md)
- [SourceMapData](interfaces/SourceMapData.md)
- [VmPropertyDescriptor](interfaces/VmPropertyDescriptor.md)

## Type Aliases

### AsyncFunctionImplementation

> **AsyncFunctionImplementation**: (`this`, ...`args`) => `Promise`\<[`QuickJSHandle`](exports.md#quickjshandle) \| [`VmCallResult`](exports.md#vmcallresultvmhandle)\<[`QuickJSHandle`](exports.md#quickjshandle)\> \| `void`\>

#### Parameters

• **this**: [`QuickJSHandle`](exports.md#quickjshandle)

• ...**args**: [`QuickJSHandle`](exports.md#quickjshandle)[]

#### Returns

`Promise`\<[`QuickJSHandle`](exports.md#quickjshandle) \| [`VmCallResult`](exports.md#vmcallresultvmhandle)\<[`QuickJSHandle`](exports.md#quickjshandle)\> \| `void`\>

#### Source

[packages/quickjs-emscripten-core/src/context-asyncify.ts:18](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context-asyncify.ts#L18)

***

### BorrowedHeapCharPointer

> **BorrowedHeapCharPointer**: `Pointer`\<`"const char"` \| `"char"` \| `"js const char"`\>

Used internally for Javascript-to-C calls that may contain strings too large
for the Emscripten stack.

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:70

***

### DisposableArray\<T\>

> **DisposableArray**\<`T`\>: `T`[] & [`Disposable`](interfaces/Disposable.md)

An `Array` that also implements [Disposable](interfaces/Disposable.md):

- Considered [Disposable#alive](interfaces/Disposable.md#alive) if any of its elements are `alive`.
- When [Disposable#dispose](interfaces/Disposable.md#dispose-1)d, it will dispose of all its elements that are `alive`.

#### Type parameters

• **T**

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:354](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L354)

***

### DisposableResult\<S, F\>

> **DisposableResult**\<`S`, `F`\>: [`DisposableSuccess`](classes/DisposableSuccess.md)\<`S`\> \| [`DisposableFail`](classes/DisposableFail.md)\<`F`\>

#### Type parameters

• **S**

• **F**

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:478](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L478)

***

### EitherFFI

> **EitherFFI**: [`QuickJSFFI`](interfaces/QuickJSFFI.md) \| [`QuickJSAsyncFFI`](interfaces/QuickJSAsyncFFI.md)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:534

***

### EitherModule

> **EitherModule**: [`QuickJSEmscriptenModule`](interfaces/QuickJSEmscriptenModule.md) \| [`QuickJSAsyncEmscriptenModule`](interfaces/QuickJSAsyncEmscriptenModule.md)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:328

***

### ExecutePendingJobsResult

> **ExecutePendingJobsResult**: [`DisposableResult`](exports.md#disposableresult)\<`number`, [`QuickJSHandle`](exports.md#quickjshandle) & `Object`\>

Used as an optional for the results of executing pendingJobs.
On success, `value` contains the number of async jobs executed
by the runtime.

#### Source

#### Source

[packages/quickjs-emscripten-core/src/runtime.ts:41](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L41)

***

### InterruptHandler

> **InterruptHandler**: (`runtime`) => `boolean` \| `undefined` \| `void`

Callback called regularly while the VM executes code.
Determines if a VM's execution should be interrupted.

#### Parameters

• **runtime**: [`QuickJSRuntime`](classes/QuickJSRuntime.md)

#### Returns

`boolean` \| `undefined` \| `void`

`true` to interrupt JS execution inside the VM.

`false` or `undefined` to continue JS execution inside the VM.

#### Source

[packages/quickjs-emscripten-core/src/runtime.ts:33](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L33)

***

### Intrinsics

> **Intrinsics**: `Object`

Language features that can be enabled or disabled in a QuickJSContext.

#### See

[ContextOptions](interfaces/ContextOptions.md)

#### Type declaration

##### BaseObjects?

> **BaseObjects**?: `boolean`

##### BigDecimal?

> **BigDecimal**?: `boolean`

##### BigFloat?

> **BigFloat**?: `boolean`

##### BigInt?

> **BigInt**?: `boolean`

##### BignumExt?

> **BignumExt**?: `boolean`

##### Date?

> **Date**?: `boolean`

##### Eval?

> **Eval**?: `boolean`

##### JSON?

> **JSON**?: `boolean`

##### MapSet?

> **MapSet**?: `boolean`

##### OperatorOverloading?

> **OperatorOverloading**?: `boolean`

##### Promise?

> **Promise**?: `boolean`

##### Proxy?

> **Proxy**?: `boolean`

##### RegExp?

> **RegExp**?: `boolean`

##### RegExpCompiler?

> **RegExpCompiler**?: `boolean`

##### StringNormalize?

> **StringNormalize**?: `boolean`

##### TypedArrays?

> **TypedArrays**?: `boolean`

#### Source

[packages/quickjs-emscripten-core/src/types.ts:146](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L146)

***

### JSBorrowedCharPointer

> **JSBorrowedCharPointer**: `Pointer`\<`"js const char"`\>

Used internally for Javascript-to-C calls that may contain strings too large
for the Emscripten stack.

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:80

***

### JSContextPointer

> **JSContextPointer**: `Pointer`\<`"JSContext"`\>

`JSContext*`.

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:20

***

### JSContextPointerPointer

> **JSContextPointerPointer**: `Pointer`\<`"JSContext"`\>

`JSContext**`. Used internally for execute pending jobs.

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:24

***

### JSModuleDefPointer

> **JSModuleDefPointer**: `Pointer`\<`"JSModuleDef"`\>

`JSModuleDef*`.

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:28

***

### JSModuleLoadFailure

> **JSModuleLoadFailure**: `Error` \| [`QuickJSHandle`](exports.md#quickjshandle)

#### Source

[packages/quickjs-emscripten-core/src/types.ts:69](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L69)

***

### JSModuleLoadResult

> **JSModuleLoadResult**: [`JSModuleLoadSuccess`](exports.md#jsmoduleloadsuccess) \| [`SuccessOrFail`](exports.md#successorfails-f)\<[`JSModuleLoadSuccess`](exports.md#jsmoduleloadsuccess), [`JSModuleLoadFailure`](exports.md#jsmoduleloadfailure)\>

#### Source

[packages/quickjs-emscripten-core/src/types.ts:70](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L70)

***

### JSModuleLoadSuccess

> **JSModuleLoadSuccess**: `string`

#### Source

[packages/quickjs-emscripten-core/src/types.ts:68](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L68)

***

### JSModuleNormalizeFailure

> **JSModuleNormalizeFailure**: `Error` \| [`QuickJSHandle`](exports.md#quickjshandle)

#### Source

[packages/quickjs-emscripten-core/src/types.ts:87](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L87)

***

### JSModuleNormalizeResult

> **JSModuleNormalizeResult**: [`JSModuleNormalizeSuccess`](exports.md#jsmodulenormalizesuccess) \| [`SuccessOrFail`](exports.md#successorfails-f)\<[`JSModuleNormalizeSuccess`](exports.md#jsmodulenormalizesuccess), [`JSModuleNormalizeFailure`](exports.md#jsmodulenormalizefailure)\>

#### Source

[packages/quickjs-emscripten-core/src/types.ts:88](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L88)

***

### JSModuleNormalizeSuccess

> **JSModuleNormalizeSuccess**: `string`

#### Source

[packages/quickjs-emscripten-core/src/types.ts:86](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L86)

***

### JSPromiseState

> **JSPromiseState**: [`JSPromiseStatePending`](interfaces/JSPromiseStatePending.md) \| [`JSPromiseStateFulfilled`](interfaces/JSPromiseStateFulfilled.md) \| [`JSPromiseStateRejected`](interfaces/JSPromiseStateRejected.md)

A promise state inside QuickJS, which can be pending, fulfilled, or rejected.
You can unwrap a JSPromiseState with [QuickJSContext#unwrapResult](classes/QuickJSContext.md#unwrapresult).

#### Source

[packages/quickjs-emscripten-core/src/deferred-promise.ts:11](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/deferred-promise.ts#L11)

***

### JSPromiseStateEnum

> **JSPromiseStateEnum**: `Brand`\<*typeof* [`JSPromiseStateEnum`](exports.md#jspromisestateenum-1)\[keyof *typeof* [`JSPromiseStateEnum`](exports.md#jspromisestateenum-1)\], `"JSPromiseStateEnum"`\>

State of a promise.

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:149

***

### JSRuntimePointer

> **JSRuntimePointer**: `Pointer`\<`"JSRuntime"`\>

`JSRuntime*`.

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:16

***

### JSValue

> **JSValue**: [`Lifetime`](classes/Lifetime.md)\<[`JSValuePointer`](exports.md#jsvaluepointer), [`JSValuePointer`](exports.md#jsvaluepointer), [`QuickJSRuntime`](classes/QuickJSRuntime.md)\>

A owned QuickJSHandle that should be disposed or returned.

The QuickJS interpreter passes Javascript values between functions as
`JSValue` structs that references some internal data. Because passing
structs cross the Empscripten FFI interfaces is bothersome, we use pointers
to these structs instead.

A JSValue reference is "owned" in its scope. before exiting the scope, it
should be freed,  by calling `JS_FreeValue(ctx, js_value)`) or returned from
the scope. We extend that contract - a JSValuePointer (`JSValue*`) must also
be `free`d.

You can do so from Javascript by calling the .dispose() method.

#### Source

[packages/quickjs-emscripten-core/src/types.ts:43](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L43)

***

### JSValueConst

> **JSValueConst**: [`Lifetime`](classes/Lifetime.md)\<[`JSValueConstPointer`](exports.md#jsvalueconstpointer), [`JSValuePointer`](exports.md#jsvaluepointer), [`QuickJSRuntime`](classes/QuickJSRuntime.md)\>

A QuickJSHandle to a borrowed value that does not need to be disposed.

In QuickJS, a JSValueConst is a "borrowed" reference that isn't owned by the
current scope. That means that the current scope should not `JS_FreeValue`
it, or retain a reference to it after the scope exits, because it may be
freed by its owner.

quickjs-emscripten takes care of disposing JSValueConst references.

#### Source

[packages/quickjs-emscripten-core/src/types.ts:26](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L26)

***

### JSValueConstPointer

> **JSValueConstPointer**: `Pointer`\<`"JSValueConst"`\>

`JSValueConst*
See [JSValueConst](exports.md#jsvalueconst) and [StaticJSValue](exports.md#staticjsvalue).

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:38

***

### JSValueConstPointerPointer

> **JSValueConstPointerPointer**: `Pointer`\<`"JSValueConst[]"`\>

Used internally for Javascript-to-C function calls.

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:50

***

### JSValuePointer

> **JSValuePointer**: `Pointer`\<`"JSValue"`\>

`JSValue*`.
See [JSValue](exports.md#jsvalue).

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:33

***

### JSValuePointerPointer

> **JSValuePointerPointer**: `Pointer`\<`"JSValue[]"`\>

Used internally for Javascript-to-C function calls.

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:42

***

### JSValuePointerPointerPointer

> **JSValuePointerPointerPointer**: `Pointer`\<`"*JSValue[]"`\>

Used internally for Javascript-to-C function calls.

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:46

***

### JSVoidPointer

> **JSVoidPointer**: `Pointer`\<`any`\>

Opaque pointer that was allocated by js_malloc.

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:84

***

### OrLoader\<T\>

> **OrLoader**\<`T`\>: `T` \| () => `Promise`\<`T`\>

#### Type parameters

• **T**

#### Source

[packages/quickjs-emscripten-core/src/from-variant.ts:117](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/from-variant.ts#L117)

***

### OwnedHeapCharPointer

> **OwnedHeapCharPointer**: `Pointer`\<`"char"`\>

Used internally for Javascript-to-C calls that may contain strings too large
for the Emscripten stack.

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:75

***

### PromiseExecutor\<ResolveT, RejectT\>

> **PromiseExecutor**\<`ResolveT`, `RejectT`\>: (`resolve`, `reject`) => `void`

#### Type parameters

• **ResolveT**

• **RejectT**

#### Parameters

• **resolve**: (`value`) => `void`

• **reject**: (`reason`) => `void`

#### Returns

`void`

#### Source

[packages/quickjs-emscripten-core/src/types.ts:333](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L333)

***

### PromisedDefault\<T\>

> **PromisedDefault**\<`T`\>: `T` \| `Promise`\<`T`\> \| `Promise`\<`Object`\> \| `Promise`\<`Object`\>

#### Type parameters

• **T**

#### Source

[packages/quickjs-emscripten-core/src/from-variant.ts:17](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/from-variant.ts#L17)

***

### QTS\_C\_To\_HostCallbackFuncPointer

> **QTS\_C\_To\_HostCallbackFuncPointer**: `Pointer`\<`"C_To_HostCallbackFunc"`\>

Used internally for C-to-Javascript function calls.

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:57

***

### QTS\_C\_To\_HostInterruptFuncPointer

> **QTS\_C\_To\_HostInterruptFuncPointer**: `Pointer`\<`"C_To_HostInterruptFunc"`\>

Used internally for C-to-Javascript interrupt handlers.

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:61

***

### QTS\_C\_To\_HostLoadModuleFuncPointer

> **QTS\_C\_To\_HostLoadModuleFuncPointer**: `Pointer`\<`"C_To_HostLoadModuleFunc"`\>

Used internally for C-to-Javascript module loading.

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:65

***

### QuickJSHandle

> **QuickJSHandle**: [`StaticJSValue`](exports.md#staticjsvalue) \| [`JSValue`](exports.md#jsvalue) \| [`JSValueConst`](exports.md#jsvalueconst)

Wraps a C pointer to a QuickJS JSValue, which represents a Javascript value inside
a QuickJS virtual machine.

Values must not be shared between QuickJSContext instances.
You must dispose of any handles you create by calling the `.dispose()` method.

#### Source

[packages/quickjs-emscripten-core/src/types.ts:53](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L53)

***

### QuickJSPropertyKey

> **QuickJSPropertyKey**: `number` \| `string` \| [`QuickJSHandle`](exports.md#quickjshandle)

Property key for getting or setting a property on a handle with
[QuickJSContext#getProp](classes/QuickJSContext.md#getprop), [QuickJSContext#setProp](classes/QuickJSContext.md#setprop), or [QuickJSContext#defineProp](classes/QuickJSContext.md#defineprop).

#### Source

[packages/quickjs-emscripten-core/src/context.ts:68](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L68)

***

### QuickJSVariant

> **QuickJSVariant**: [`QuickJSSyncVariant`](interfaces/QuickJSSyncVariant.md) \| [`QuickJSAsyncVariant`](interfaces/QuickJSAsyncVariant.md)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:533

***

### StaticJSValue

> **StaticJSValue**: [`Lifetime`](classes/Lifetime.md)\<[`JSValueConstPointer`](exports.md#jsvalueconstpointer), [`JSValueConstPointer`](exports.md#jsvalueconstpointer), [`QuickJSRuntime`](classes/QuickJSRuntime.md)\>

A QuickJSHandle to a constant that will never change, and does not need to
be disposed.

#### Source

[packages/quickjs-emscripten-core/src/types.ts:14](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L14)

***

### SuccessOrFail\<S, F\>

> **SuccessOrFail**\<`S`, `F`\>: `Object` \| `Object`

Used as an optional.
`{ value: S } | { error: E }`.

#### Type parameters

• **S**

• **F**

#### Source

[packages/quickjs-emscripten-core/src/vm-interface.ts:5](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L5)

***

### UInt32Pointer

> **UInt32Pointer**: `Pointer`\<`"uint32_t"`\>

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:85

***

### VmCallResult\<VmHandle\>

> **VmCallResult**\<`VmHandle`\>: [`SuccessOrFail`](exports.md#successorfails-f)\<`VmHandle`, `VmHandle`\>

Used as an optional for results of a Vm call.
`{ value: VmHandle } | { error: VmHandle }`.

#### Type parameters

• **VmHandle**

#### Source

[packages/quickjs-emscripten-core/src/vm-interface.ts:26](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L26)

***

### VmFunctionImplementation\<VmHandle\>

> **VmFunctionImplementation**\<`VmHandle`\>: (`this`, ...`args`) => `VmHandle` \| [`VmCallResult`](exports.md#vmcallresultvmhandle)\<`VmHandle`\> \| `void`

#### Type parameters

• **VmHandle**

A VmFunctionImplementation takes handles as arguments.
It should return a handle, or be void.

To indicate an exception, a VMs can throw either a handle (transferred
directly) or any other Javascript value (only the poperties `name` and
`message` will be transferred). Or, the VmFunctionImplementation may return
a VmCallResult's `{ error: handle }` error variant.

VmFunctionImplementation should not free its arguments or its return value.
It should not retain a reference to its return value or thrown error.

#### Parameters

• **this**: `VmHandle`

• ...**args**: `VmHandle`[]

#### Returns

`VmHandle` \| [`VmCallResult`](exports.md#vmcallresultvmhandle)\<`VmHandle`\> \| `void`

#### Source

[packages/quickjs-emscripten-core/src/vm-interface.ts:40](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L40)

## Variables

### DEBUG\_ASYNC

> **`const`** **DEBUG\_ASYNC**: [`QuickJSAsyncVariant`](interfaces/QuickJSAsyncVariant.md)

### @jitl/quickjs-wasmfile-debug-asyncify

[Docs](https://github.com/justjake/quickjs-emscripten/blob/main/doc/@jitl/quickjs-wasmfile-debug-asyncify/README.md) |
Variant with separate .WASM file. Supports browser ESM, NodeJS ESM, and NodeJS CommonJS.

| Variable            |    Setting                     |    Description    |
| --                  | --                             | --                |
| library             | quickjs             | The original [bellard/quickjs](https://github.com/bellard/quickjs) library. Version [2024-02-14+36911f0d](https://github.com/bellard/quickjs/commit/36911f0d3ab1a4c190a4d5cbe7c2db225a455389) vendored to quickjs-emscripten on 2024-06-15. |
| releaseMode         | debug         | Enables assertions and memory sanitizers. Try to run your tests against debug variants, in addition to your preferred production variant, to catch more bugs. |
| syncMode            | asyncify            | Build run through the ASYNCIFY WebAssembly transform. This imposes substantial size (2x the size of sync) and speed penalties (40% the speed of sync). In return, allows synchronous calls from the QuickJS WASM runtime to async functions on the host. The extra magic makes this variant slower than sync variants. Note that both variants support regular async functions. Only adopt ASYNCIFY if you need to! The [QuickJSAsyncRuntime](https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten/classes/QuickJSAsyncRuntime.md) and [QuickJSAsyncContext](https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten/classes/QuickJSAsyncContext.md) classes expose the ASYNCIFY-specific APIs. |
| emscriptenInclusion | wasm | Has a separate .wasm file. May offer better caching in your browser, and reduces the size of your JS bundle. If you have issues, try a 'singlefile' variant. |
| exports             | require import browser workerd                  | Has these package.json export conditions |

#### Source

packages/variant-quickjs-wasmfile-debug-asyncify/dist/index.d.ts:18

***

### DEBUG\_SYNC

> **`const`** **DEBUG\_SYNC**: [`QuickJSSyncVariant`](interfaces/QuickJSSyncVariant.md)

### @jitl/quickjs-wasmfile-debug-sync

[Docs](https://github.com/justjake/quickjs-emscripten/blob/main/doc/@jitl/quickjs-wasmfile-debug-sync/README.md) |
Variant with separate .WASM file. Supports browser ESM, NodeJS ESM, and NodeJS CommonJS.

| Variable            |    Setting                     |    Description    |
| --                  | --                             | --                |
| library             | quickjs             | The original [bellard/quickjs](https://github.com/bellard/quickjs) library. Version [2024-02-14+36911f0d](https://github.com/bellard/quickjs/commit/36911f0d3ab1a4c190a4d5cbe7c2db225a455389) vendored to quickjs-emscripten on 2024-06-15. |
| releaseMode         | debug         | Enables assertions and memory sanitizers. Try to run your tests against debug variants, in addition to your preferred production variant, to catch more bugs. |
| syncMode            | sync            | The default, normal build. Note that both variants support regular async functions. |
| emscriptenInclusion | wasm | Has a separate .wasm file. May offer better caching in your browser, and reduces the size of your JS bundle. If you have issues, try a 'singlefile' variant. |
| exports             | require import browser workerd                  | Has these package.json export conditions |

#### Source

packages/variant-quickjs-wasmfile-debug-sync/dist/index.d.ts:18

***

### DefaultIntrinsics

> **`const`** **DefaultIntrinsics**: `Readonly`\<`Object`\>

The default [Intrinsics](exports.md#intrinsics) language features enabled in a QuickJSContext.

#### See

[ContextOptions](interfaces/ContextOptions.md)

#### Type declaration

##### BaseObjects

> **`readonly`** **BaseObjects**: `true` = `true`

##### Date

> **`readonly`** **Date**: `true` = `true`

##### Eval

> **`readonly`** **Eval**: `true` = `true`

##### JSON

> **`readonly`** **JSON**: `true` = `true`

##### MapSet

> **`readonly`** **MapSet**: `true` = `true`

##### Promise

> **`readonly`** **Promise**: `true` = `true`

##### Proxy

> **`readonly`** **Proxy**: `true` = `true`

##### RegExp

> **`readonly`** **RegExp**: `true` = `true`

##### StringNormalize

> **`readonly`** **StringNormalize**: `true` = `true`

##### TypedArrays

> **`readonly`** **TypedArrays**: `true` = `true`

#### Source

[packages/quickjs-emscripten-core/src/types.ts:173](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L173)

***

### DisposableResult

> **DisposableResult**: *typeof* `AbstractDisposableResult`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:478](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L478)

***

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

packages/quickjs-ffi-types/dist/index.d.ts:98

***

### GetOwnPropertyNamesFlags

> **GetOwnPropertyNamesFlags**: `Object`

Bitfield options for QTS_GetOwnPropertyNames

#### Type declaration

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

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:158

***

### IntrinsicsFlags

> **IntrinsicsFlags**: `Object`

Bitfield options for QTS_NewContext intrinsics

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

packages/quickjs-ffi-types/dist/index.d.ts:126

***

### IsEqualOp

> **IsEqualOp**: `Object`

#### Type declaration

##### IsSameValue

> **IsSameValue**: [`IsEqualOp`](exports.md#isequalop)

##### IsSameValueZero

> **IsSameValueZero**: [`IsEqualOp`](exports.md#isequalop)

##### IsStrictlyEqual

> **IsStrictlyEqual**: [`IsEqualOp`](exports.md#isequalop)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:172

***

### JSPromiseStateEnum

> **JSPromiseStateEnum**: `Object`

#### Type declaration

##### Fulfilled

> **`readonly`** **Fulfilled**: `1`

##### Pending

> **`readonly`** **Pending**: `0`

##### Rejected

> **`readonly`** **Rejected**: `2`

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:149

***

### RELEASE\_ASYNC

> **`const`** **RELEASE\_ASYNC**: [`QuickJSAsyncVariant`](interfaces/QuickJSAsyncVariant.md)

### @jitl/quickjs-wasmfile-release-asyncify

[Docs](https://github.com/justjake/quickjs-emscripten/blob/main/doc/@jitl/quickjs-wasmfile-release-asyncify/README.md) |
Variant with separate .WASM file. Supports browser ESM, NodeJS ESM, and NodeJS CommonJS.

| Variable            |    Setting                     |    Description    |
| --                  | --                             | --                |
| library             | quickjs             | The original [bellard/quickjs](https://github.com/bellard/quickjs) library. Version [2024-02-14+36911f0d](https://github.com/bellard/quickjs/commit/36911f0d3ab1a4c190a4d5cbe7c2db225a455389) vendored to quickjs-emscripten on 2024-06-15. |
| releaseMode         | release         | Optimized for performance; use when building/deploying your application. |
| syncMode            | asyncify            | Build run through the ASYNCIFY WebAssembly transform. This imposes substantial size (2x the size of sync) and speed penalties (40% the speed of sync). In return, allows synchronous calls from the QuickJS WASM runtime to async functions on the host. The extra magic makes this variant slower than sync variants. Note that both variants support regular async functions. Only adopt ASYNCIFY if you need to! The [QuickJSAsyncRuntime](https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten/classes/QuickJSAsyncRuntime.md) and [QuickJSAsyncContext](https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten/classes/QuickJSAsyncContext.md) classes expose the ASYNCIFY-specific APIs. |
| emscriptenInclusion | wasm | Has a separate .wasm file. May offer better caching in your browser, and reduces the size of your JS bundle. If you have issues, try a 'singlefile' variant. |
| exports             | require import browser workerd                  | Has these package.json export conditions |

#### Source

packages/variant-quickjs-wasmfile-release-asyncify/dist/index.d.ts:18

***

### RELEASE\_SYNC

> **`const`** **RELEASE\_SYNC**: [`QuickJSSyncVariant`](interfaces/QuickJSSyncVariant.md)

### @jitl/quickjs-wasmfile-release-sync

[Docs](https://github.com/justjake/quickjs-emscripten/blob/main/doc/@jitl/quickjs-wasmfile-release-sync/README.md) |
Variant with separate .WASM file. Supports browser ESM, NodeJS ESM, and NodeJS CommonJS.

| Variable            |    Setting                     |    Description    |
| --                  | --                             | --                |
| library             | quickjs             | The original [bellard/quickjs](https://github.com/bellard/quickjs) library. Version [2024-02-14+36911f0d](https://github.com/bellard/quickjs/commit/36911f0d3ab1a4c190a4d5cbe7c2db225a455389) vendored to quickjs-emscripten on 2024-06-15. |
| releaseMode         | release         | Optimized for performance; use when building/deploying your application. |
| syncMode            | sync            | The default, normal build. Note that both variants support regular async functions. |
| emscriptenInclusion | wasm | Has a separate .wasm file. May offer better caching in your browser, and reduces the size of your JS bundle. If you have issues, try a 'singlefile' variant. |
| exports             | require import browser workerd                  | Has these package.json export conditions |

#### Source

packages/variant-quickjs-wasmfile-release-sync/dist/index.d.ts:18

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

packages/quickjs-ffi-types/dist/index.d.ts:94

***

### createDisposableArray()

> **createDisposableArray**\<`T`\>(`items`?): [`DisposableArray`](exports.md#disposablearrayt)\<`T`\>

Create an array that also implements [Disposable](interfaces/Disposable.md).

#### Type parameters

• **T** extends [`Disposable`](interfaces/Disposable.md)

#### Parameters

• **items?**: `Iterable`\<`T`\>

#### Returns

[`DisposableArray`](exports.md#disposablearrayt)\<`T`\>

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:359](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L359)

***

### getQuickJS()

> **getQuickJS**(): `Promise`\<[`QuickJSWASMModule`](classes/QuickJSWASMModule.md)\>

Get a shared singleton [QuickJSWASMModule](classes/QuickJSWASMModule.md). Use this to evaluate code
or create Javascript environments.

This is the top-level entrypoint for the quickjs-emscripten library.

If you need strictest possible isolation guarantees, you may create a
separate [QuickJSWASMModule](classes/QuickJSWASMModule.md) via [newQuickJSWASMModule](exports.md#newquickjswasmmodule).

To work with the asyncified version of this library, see these functions:

- [newAsyncRuntime](exports.md#newasyncruntime).
- [newAsyncContext](exports.md#newasynccontext).
- [newQuickJSAsyncWASMModule](exports.md#newquickjsasyncwasmmodule).

#### Returns

`Promise`\<[`QuickJSWASMModule`](classes/QuickJSWASMModule.md)\>

#### Source

[packages/quickjs-emscripten/src/mod.ts:28](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten/src/mod.ts#L28)

***

### getQuickJSSync()

> **getQuickJSSync**(): [`QuickJSWASMModule`](classes/QuickJSWASMModule.md)

Provides synchronous access to the shared [QuickJSWASMModule](classes/QuickJSWASMModule.md) instance returned by [getQuickJS](exports.md#getquickjs), as long as
least once.

#### Returns

[`QuickJSWASMModule`](classes/QuickJSWASMModule.md)

#### Throws

If called before `getQuickJS` resolves.

#### Source

[packages/quickjs-emscripten/src/mod.ts:41](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten/src/mod.ts#L41)

***

### isFail()

> **isFail**\<`S`, `F`\>(`successOrFail`): `successOrFail is Object`

#### Type parameters

• **S**

• **F**

#### Parameters

• **successOrFail**: [`SuccessOrFail`](exports.md#successorfails-f)\<`S`, `F`\>

#### Returns

`successOrFail is Object`

#### Source

[packages/quickjs-emscripten-core/src/vm-interface.ts:18](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L18)

***

### isSuccess()

> **isSuccess**\<`S`, `F`\>(`successOrFail`): `successOrFail is Object`

#### Type parameters

• **S**

• **F**

#### Parameters

• **successOrFail**: [`SuccessOrFail`](exports.md#successorfails-f)\<`S`, `F`\>

#### Returns

`successOrFail is Object`

#### Source

[packages/quickjs-emscripten-core/src/vm-interface.ts:14](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L14)

***

### memoizePromiseFactory()

> **memoizePromiseFactory**\<`T`\>(`fn`): () => `Promise`\<`T`\>

Helper intended to memoize the creation of a WebAssembly module.
```typescript
const getDebugModule = memoizePromiseFactory(() => newQuickJSWASMModule(DEBUG_SYNC))
```

#### Type parameters

• **T**

#### Parameters

• **fn**: () => `Promise`\<`T`\>

#### Returns

`Function`

> ##### Returns
>
> `Promise`\<`T`\>
>

#### Source

[packages/quickjs-emscripten-core/src/from-variant.ts:100](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/from-variant.ts#L100)

***

### newAsyncContext()

> **newAsyncContext**(`options`?): `Promise`\<[`QuickJSAsyncContext`](classes/QuickJSAsyncContext.md)\>

Create a new [QuickJSAsyncContext](classes/QuickJSAsyncContext.md) (with an associated runtime) in an
separate WebAssembly module.

Each context is isolated in a separate WebAssembly module, so that errors in
one runtime cannot contaminate another runtime, and each runtime can execute
an asynchronous action without conflicts.

Note that there is a hard limit on the number of WebAssembly modules in older
versions of v8:
https://bugs.chromium.org/p/v8/issues/detail?id=12076

#### Parameters

• **options?**: [`ContextOptions`](interfaces/ContextOptions.md)

#### Returns

`Promise`\<[`QuickJSAsyncContext`](classes/QuickJSAsyncContext.md)\>

#### Source

[packages/quickjs-emscripten/src/mod.ts:76](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten/src/mod.ts#L76)

***

### newAsyncRuntime()

> **newAsyncRuntime**(`options`?): `Promise`\<[`QuickJSAsyncRuntime`](classes/QuickJSAsyncRuntime.md)\>

Create a new [QuickJSAsyncRuntime](classes/QuickJSAsyncRuntime.md) in a separate WebAssembly module.

Each runtime is isolated in a separate WebAssembly module, so that errors in
one runtime cannot contaminate another runtime, and each runtime can execute
an asynchronous action without conflicts.

Note that there is a hard limit on the number of WebAssembly modules in older
versions of v8:
https://bugs.chromium.org/p/v8/issues/detail?id=12076

#### Parameters

• **options?**: [`AsyncRuntimeOptions`](interfaces/AsyncRuntimeOptions.md)

#### Returns

`Promise`\<[`QuickJSAsyncRuntime`](classes/QuickJSAsyncRuntime.md)\>

#### Source

[packages/quickjs-emscripten/src/mod.ts:59](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten/src/mod.ts#L59)

***

### newQuickJSAsyncWASMModule()

> **newQuickJSAsyncWASMModule**(`variantOrPromise`): `Promise`\<[`QuickJSAsyncWASMModule`](classes/QuickJSAsyncWASMModule.md)\>

Create a new, completely isolated WebAssembly module containing a version of the QuickJS library
compiled with Emscripten's [ASYNCIFY](https://emscripten.org/docs/porting/asyncify.html) transform.

This version of the library offers features that enable synchronous code
inside the VM to interact with asynchronous code in the host environment.
See the documentation on [QuickJSAsyncWASMModule](classes/QuickJSAsyncWASMModule.md), [QuickJSAsyncRuntime](classes/QuickJSAsyncRuntime.md),
and [QuickJSAsyncContext](classes/QuickJSAsyncContext.md).

Note that there is a hard limit on the number of WebAssembly modules in older
versions of v8:
https://bugs.chromium.org/p/v8/issues/detail?id=12076

#### Parameters

• **variantOrPromise**: [`PromisedDefault`](exports.md#promiseddefaultt)\<[`QuickJSAsyncVariant`](interfaces/QuickJSAsyncVariant.md)\>= `RELEASE_ASYNC`

Optionally, pass a [QuickJSAsyncVariant](interfaces/QuickJSAsyncVariant.md) to construct a different WebAssembly module.

#### Returns

`Promise`\<[`QuickJSAsyncWASMModule`](classes/QuickJSAsyncWASMModule.md)\>

#### Source

[packages/quickjs-emscripten/src/variants.ts:47](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten/src/variants.ts#L47)

***

### newQuickJSAsyncWASMModuleFromVariant()

> **newQuickJSAsyncWASMModuleFromVariant**(`variantOrPromise`): `Promise`\<[`QuickJSAsyncWASMModule`](classes/QuickJSAsyncWASMModule.md)\>

Create a new, completely isolated WebAssembly module containing a version of the QuickJS library
compiled with Emscripten's [ASYNCIFY](https://emscripten.org/docs/porting/asyncify.html) transform.

This version of the library offers features that enable synchronous code
inside the VM to interact with asynchronous code in the host environment.
See the documentation on [QuickJSAsyncWASMModule](classes/QuickJSAsyncWASMModule.md), [QuickJSAsyncRuntime](classes/QuickJSAsyncRuntime.md),
and [QuickJSAsyncContext](classes/QuickJSAsyncContext.md).

Note that there is a hard limit on the number of WebAssembly modules in older
versions of v8:
https://bugs.chromium.org/p/v8/issues/detail?id=12076

#### Parameters

• **variantOrPromise**: [`PromisedDefault`](exports.md#promiseddefaultt)\<[`QuickJSAsyncVariant`](interfaces/QuickJSAsyncVariant.md)\>

A [QuickJSAsyncVariant](interfaces/QuickJSAsyncVariant.md) to construct the WebAssembly module.

#### Returns

`Promise`\<[`QuickJSAsyncWASMModule`](classes/QuickJSAsyncWASMModule.md)\>

#### Example

```ts
const quickjs = new newQuickJSAsyncWASMModuleFromVariant(
  import('@jitl/quickjs-browser-debug-asyncify-wasm')
)
```

#### Source

[packages/quickjs-emscripten-core/src/from-variant.ts:76](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/from-variant.ts#L76)

***

### newQuickJSWASMModule()

> **newQuickJSWASMModule**(`variantOrPromise`): `Promise`\<[`QuickJSWASMModule`](classes/QuickJSWASMModule.md)\>

Create a new, completely isolated WebAssembly module containing the QuickJS library.
See the documentation on [QuickJSWASMModule](classes/QuickJSWASMModule.md).

Note that there is a hard limit on the number of WebAssembly modules in older
versions of v8:
https://bugs.chromium.org/p/v8/issues/detail?id=12076

#### Parameters

• **variantOrPromise**: [`PromisedDefault`](exports.md#promiseddefaultt)\<[`QuickJSSyncVariant`](interfaces/QuickJSSyncVariant.md)\>= `RELEASE_SYNC`

Optionally, pass a [QuickJSSyncVariant](interfaces/QuickJSSyncVariant.md) to construct a different WebAssembly module.

#### Returns

`Promise`\<[`QuickJSWASMModule`](classes/QuickJSWASMModule.md)\>

#### Source

[packages/quickjs-emscripten/src/variants.ts:25](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten/src/variants.ts#L25)

***

### newQuickJSWASMModuleFromVariant()

> **newQuickJSWASMModuleFromVariant**(`variantOrPromise`): `Promise`\<[`QuickJSWASMModule`](classes/QuickJSWASMModule.md)\>

Create a new, completely isolated WebAssembly module containing the QuickJS library.
See the documentation on [QuickJSWASMModule](classes/QuickJSWASMModule.md).

Note that there is a hard limit on the number of WebAssembly modules in older
versions of v8:
https://bugs.chromium.org/p/v8/issues/detail?id=12076

#### Parameters

• **variantOrPromise**: [`PromisedDefault`](exports.md#promiseddefaultt)\<[`QuickJSSyncVariant`](interfaces/QuickJSSyncVariant.md)\>

A [QuickJSSyncVariant](interfaces/QuickJSSyncVariant.md) to construct the WebAssembly module.

#### Returns

`Promise`\<[`QuickJSWASMModule`](classes/QuickJSWASMModule.md)\>

#### Example

```ts
const quickjs = new newQuickJSWASMModuleFromVariant(
  import('@jitl/quickjs-browser-release-sync-wasm')
)
```

#### Source

[packages/quickjs-emscripten-core/src/from-variant.ts:38](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/from-variant.ts#L38)

***

### newVariant()

> **newVariant**\<`T`\>(`baseVariant`, `options`): `T`

Create a new variant by overriding how Emscripten obtains the WebAssembly module.
This may be necessary in Cloudflare Workers, which can't compile WebAssembly modules from binary data.

#### Type parameters

• **T** extends [`QuickJSVariant`](exports.md#quickjsvariant)

#### Parameters

• **baseVariant**: `T`

• **options**: [`CustomizeVariantOptions`](interfaces/CustomizeVariantOptions.md)

#### Returns

`T`

#### Source

[packages/quickjs-emscripten-core/src/from-variant.ts:162](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/from-variant.ts#L162)

***

### setDebugMode()

> **setDebugMode**(`enabled`): `void`

Enable (or disable) debug logging and object creation tracking globally.
This setting is inherited by newly created QuickJSRuntime instances.
To get debug logging in the WebAssembly module, you need to use a debug build variant.
See [the quickjs-emscripten-core README](https://github.com/justjake/quickjs-emscripten/tree/main/doc/quickjs-emscripten-core) for more about build variants.

#### Parameters

• **enabled**: `boolean`= `true`

#### Returns

`void`

#### Source

[packages/quickjs-emscripten-core/src/debug.ts:13](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/debug.ts#L13)

***

### shouldInterruptAfterDeadline()

> **shouldInterruptAfterDeadline**(`deadline`): [`InterruptHandler`](exports.md#interrupthandler)

Returns an interrupt handler that interrupts Javascript execution after a deadline time.

#### Parameters

• **deadline**: `number` \| `Date`

Interrupt execution if it's still running after this time.
  Number values are compared against `Date.now()`

#### Returns

[`InterruptHandler`](exports.md#interrupthandler)

#### Source

[packages/quickjs-emscripten-core/src/interrupt-helpers.ts:9](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/interrupt-helpers.ts#L9)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
