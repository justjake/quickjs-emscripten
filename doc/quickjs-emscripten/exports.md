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
  - [EitherModule](exports.md#eithermodule)
  - [ExecutePendingJobsResult](exports.md#executependingjobsresult)
  - [InterruptHandler](exports.md#interrupthandler)
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
  - [JSRuntimePointer](exports.md#jsruntimepointer)
  - [JSValue](exports.md#jsvalue)
  - [JSValueConst](exports.md#jsvalueconst)
  - [JSValueConstPointer](exports.md#jsvalueconstpointer)
  - [JSValueConstPointerPointer](exports.md#jsvalueconstpointerpointer)
  - [JSValuePointer](exports.md#jsvaluepointer)
  - [JSValuePointerPointer](exports.md#jsvaluepointerpointer)
  - [JSVoidPointer](exports.md#jsvoidpointer)
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
  - [VmCallResult\<VmHandle\>](exports.md#vmcallresultvmhandle)
  - [VmFunctionImplementation\<VmHandle\>](exports.md#vmfunctionimplementationvmhandle)
- [Variables](exports.md#variables)
  - [DEBUG\_ASYNC](exports.md#debug-async)
  - [[@jitl/quickjs-wasmfile-debug-asyncify](https://github.com/justjake/quickjs-emscripten/blob/main/doc/packages/@jitl/quickjs-wasmfile-debug-asyncify/README.md)](exports.md#jitlquickjs-wasmfile-debug-asyncifyhttpsgithubcomjustjakequickjs-emscriptenblobmaindocpackagesjitlquickjs-wasmfile-debug-asyncifyreadmemd)
  - [DEBUG\_SYNC](exports.md#debug-sync)
  - [[@jitl/quickjs-wasmfile-debug-sync](https://github.com/justjake/quickjs-emscripten/blob/main/doc/packages/@jitl/quickjs-wasmfile-debug-sync/README.md)](exports.md#jitlquickjs-wasmfile-debug-synchttpsgithubcomjustjakequickjs-emscriptenblobmaindocpackagesjitlquickjs-wasmfile-debug-syncreadmemd)
  - [EvalFlags](exports.md#evalflags)
  - [RELEASE\_ASYNC](exports.md#release-async)
  - [[@jitl/quickjs-wasmfile-release-asyncify](https://github.com/justjake/quickjs-emscripten/blob/main/doc/packages/@jitl/quickjs-wasmfile-release-asyncify/README.md)](exports.md#jitlquickjs-wasmfile-release-asyncifyhttpsgithubcomjustjakequickjs-emscriptenblobmaindocpackagesjitlquickjs-wasmfile-release-asyncifyreadmemd)
  - [RELEASE\_SYNC](exports.md#release-sync)
  - [[@jitl/quickjs-wasmfile-release-sync](https://github.com/justjake/quickjs-emscripten/blob/main/doc/packages/@jitl/quickjs-wasmfile-release-sync/README.md)](exports.md#jitlquickjs-wasmfile-release-synchttpsgithubcomjustjakequickjs-emscriptenblobmaindocpackagesjitlquickjs-wasmfile-release-syncreadmemd)
- [Functions](exports.md#functions)
  - [assertSync()](exports.md#assertsync)
  - [debugLog()](exports.md#debuglog)
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
  - [shouldInterruptAfterDeadline()](exports.md#shouldinterruptafterdeadline)

## Namespaces

- [errors](namespaces/errors/README.md)

## Classes

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
- [WeakLifetime](classes/WeakLifetime.md)

## Interfaces

- [AsyncRuntimeOptions](interfaces/AsyncRuntimeOptions.md)
- [ContextEvalOptions](interfaces/ContextEvalOptions.md)
- [ContextOptions](interfaces/ContextOptions.md)
- [Disposable](interfaces/Disposable.md)
- [EmscriptenModule](interfaces/EmscriptenModule.md)
- [EmscriptenModuleLoader](interfaces/EmscriptenModuleLoader.md)
- [JSModuleLoader](interfaces/JSModuleLoader.md)
- [JSModuleLoaderAsync](interfaces/JSModuleLoaderAsync.md)
- [JSModuleNormalizer](interfaces/JSModuleNormalizer.md)
- [JSModuleNormalizerAsync](interfaces/JSModuleNormalizerAsync.md)
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

quickjs-emscripten-core/dist/index.d.ts:302

***

### BorrowedHeapCharPointer

> **BorrowedHeapCharPointer**: `Pointer`\<`"const char"` \| `"char"` \| `"js const char"`\>

Used internally for Javascript-to-C calls that may contain strings too large
for the Emscripten stack.

#### Source

quickjs-ffi-types/dist/index.d.ts:66

***

### EitherModule

> **EitherModule**: [`QuickJSEmscriptenModule`](interfaces/QuickJSEmscriptenModule.md) \| [`QuickJSAsyncEmscriptenModule`](interfaces/QuickJSAsyncEmscriptenModule.md)

#### Source

quickjs-ffi-types/dist/index.d.ts:206

***

### ExecutePendingJobsResult

> **ExecutePendingJobsResult**: [`SuccessOrFail`](exports.md#successorfails-f)\<`number`, [`QuickJSHandle`](exports.md#quickjshandle) & `Object`\>

Used as an optional for the results of executing pendingJobs.
On success, `value` contains the number of async jobs executed
by the runtime.

#### Source

#### Source

quickjs-emscripten-core/dist/index.d.ts:118

***

### InterruptHandler

> **InterruptHandler**: (`runtime`) => `boolean` \| `undefined`

Callback called regularly while the VM executes code.
Determines if a VM's execution should be interrupted.

#### Parameters

• **runtime**: [`QuickJSRuntime`](classes/QuickJSRuntime.md)

#### Returns

`boolean` \| `undefined`

`true` to interrupt JS execution inside the VM.

`false` or `undefined` to continue JS execution inside the VM.

#### Source

quickjs-emscripten-core/dist/index.d.ts:111

***

### JSBorrowedCharPointer

> **JSBorrowedCharPointer**: `Pointer`\<`"js const char"`\>

Used internally for Javascript-to-C calls that may contain strings too large
for the Emscripten stack.

#### Source

quickjs-ffi-types/dist/index.d.ts:76

***

### JSContextPointer

> **JSContextPointer**: `Pointer`\<`"JSContext"`\>

`JSContext*`.

#### Source

quickjs-ffi-types/dist/index.d.ts:20

***

### JSContextPointerPointer

> **JSContextPointerPointer**: `Pointer`\<`"JSContext"`\>

`JSContext**`. Used internally for execute pending jobs.

#### Source

quickjs-ffi-types/dist/index.d.ts:24

***

### JSModuleDefPointer

> **JSModuleDefPointer**: `Pointer`\<`"JSModuleDef"`\>

`JSModuleDef*`.

#### Source

quickjs-ffi-types/dist/index.d.ts:28

***

### JSModuleLoadFailure

> **JSModuleLoadFailure**: `Error` \| [`QuickJSHandle`](exports.md#quickjshandle)

#### Source

quickjs-emscripten-core/dist/index.d.ts:384

***

### JSModuleLoadResult

> **JSModuleLoadResult**: [`JSModuleLoadSuccess`](exports.md#jsmoduleloadsuccess) \| [`SuccessOrFail`](exports.md#successorfails-f)\<[`JSModuleLoadSuccess`](exports.md#jsmoduleloadsuccess), [`JSModuleLoadFailure`](exports.md#jsmoduleloadfailure)\>

#### Source

quickjs-emscripten-core/dist/index.d.ts:385

***

### JSModuleLoadSuccess

> **JSModuleLoadSuccess**: `string`

#### Source

quickjs-emscripten-core/dist/index.d.ts:383

***

### JSModuleNormalizeFailure

> **JSModuleNormalizeFailure**: `Error` \| [`QuickJSHandle`](exports.md#quickjshandle)

#### Source

quickjs-emscripten-core/dist/index.d.ts:395

***

### JSModuleNormalizeResult

> **JSModuleNormalizeResult**: [`JSModuleNormalizeSuccess`](exports.md#jsmodulenormalizesuccess) \| [`SuccessOrFail`](exports.md#successorfails-f)\<[`JSModuleNormalizeSuccess`](exports.md#jsmodulenormalizesuccess), [`JSModuleNormalizeFailure`](exports.md#jsmodulenormalizefailure)\>

#### Source

quickjs-emscripten-core/dist/index.d.ts:396

***

### JSModuleNormalizeSuccess

> **JSModuleNormalizeSuccess**: `string`

#### Source

quickjs-emscripten-core/dist/index.d.ts:394

***

### JSRuntimePointer

> **JSRuntimePointer**: `Pointer`\<`"JSRuntime"`\>

`JSRuntime*`.

#### Source

quickjs-ffi-types/dist/index.d.ts:16

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

quickjs-emscripten-core/dist/index.d.ts:374

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

quickjs-emscripten-core/dist/index.d.ts:358

***

### JSValueConstPointer

> **JSValueConstPointer**: `Pointer`\<`"JSValueConst"`\>

`JSValueConst*
See [JSValueConst](exports.md#jsvalueconst) and [StaticJSValue](exports.md#staticjsvalue).

#### Source

quickjs-ffi-types/dist/index.d.ts:38

***

### JSValueConstPointerPointer

> **JSValueConstPointerPointer**: `Pointer`\<`"JSValueConst[]"`\>

Used internally for Javascript-to-C function calls.

#### Source

quickjs-ffi-types/dist/index.d.ts:46

***

### JSValuePointer

> **JSValuePointer**: `Pointer`\<`"JSValue"`\>

`JSValue*`.
See [JSValue](exports.md#jsvalue).

#### Source

quickjs-ffi-types/dist/index.d.ts:33

***

### JSValuePointerPointer

> **JSValuePointerPointer**: `Pointer`\<`"JSValue[]"`\>

Used internally for Javascript-to-C function calls.

#### Source

quickjs-ffi-types/dist/index.d.ts:42

***

### JSVoidPointer

> **JSVoidPointer**: `Pointer`\<`any`\>

Opaque pointer that was allocated by js_malloc.

#### Source

quickjs-ffi-types/dist/index.d.ts:80

***

### OwnedHeapCharPointer

> **OwnedHeapCharPointer**: `Pointer`\<`"char"`\>

Used internally for Javascript-to-C calls that may contain strings too large
for the Emscripten stack.

#### Source

quickjs-ffi-types/dist/index.d.ts:71

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

quickjs-emscripten-core/dist/index.d.ts:475

***

### PromisedDefault\<T\>

> **PromisedDefault**\<`T`\>: `T` \| `Promise`\<`T`\> \| `Promise`\<`Object`\> \| `Promise`\<`Object`\>

#### Type parameters

• **T**

#### Source

quickjs-emscripten-core/dist/index.d.ts:1245

***

### QTS\_C\_To\_HostCallbackFuncPointer

> **QTS\_C\_To\_HostCallbackFuncPointer**: `Pointer`\<`"C_To_HostCallbackFunc"`\>

Used internally for C-to-Javascript function calls.

#### Source

quickjs-ffi-types/dist/index.d.ts:53

***

### QTS\_C\_To\_HostInterruptFuncPointer

> **QTS\_C\_To\_HostInterruptFuncPointer**: `Pointer`\<`"C_To_HostInterruptFunc"`\>

Used internally for C-to-Javascript interrupt handlers.

#### Source

quickjs-ffi-types/dist/index.d.ts:57

***

### QTS\_C\_To\_HostLoadModuleFuncPointer

> **QTS\_C\_To\_HostLoadModuleFuncPointer**: `Pointer`\<`"C_To_HostLoadModuleFunc"`\>

Used internally for C-to-Javascript module loading.

#### Source

quickjs-ffi-types/dist/index.d.ts:61

***

### QuickJSHandle

> **QuickJSHandle**: [`StaticJSValue`](exports.md#staticjsvalue) \| [`JSValue`](exports.md#jsvalue) \| [`JSValueConst`](exports.md#jsvalueconst)

Wraps a C pointer to a QuickJS JSValue, which represents a Javascript value inside
a QuickJS virtual machine.

Values must not be shared between QuickJSContext instances.
You must dispose of any handles you create by calling the `.dispose()` method.

#### Source

quickjs-emscripten-core/dist/index.d.ts:382

***

### QuickJSPropertyKey

> **QuickJSPropertyKey**: `number` \| `string` \| [`QuickJSHandle`](exports.md#quickjshandle)

Property key for getting or setting a property on a handle with
[[QuickJSContext.getProp]], [[QuickJSContext.setProp]], or [[QuickJSContext.defineProp]].

#### Source

quickjs-emscripten-core/dist/index.d.ts:666

***

### QuickJSVariant

> **QuickJSVariant**: [`QuickJSSyncVariant`](interfaces/QuickJSSyncVariant.md) \| [`QuickJSAsyncVariant`](interfaces/QuickJSAsyncVariant.md)

#### Source

quickjs-ffi-types/dist/index.d.ts:391

***

### StaticJSValue

> **StaticJSValue**: [`Lifetime`](classes/Lifetime.md)\<[`JSValueConstPointer`](exports.md#jsvalueconstpointer), [`JSValueConstPointer`](exports.md#jsvalueconstpointer), [`QuickJSRuntime`](classes/QuickJSRuntime.md)\>

A QuickJSHandle to a constant that will never change, and does not need to
be disposed.

#### Source

quickjs-emscripten-core/dist/index.d.ts:347

***

### SuccessOrFail\<S, F\>

> **SuccessOrFail**\<`S`, `F`\>: `Object` \| `Object`

Used as an optional.
`{ value: S } | { error: E }`.

#### Type parameters

• **S**

• **F**

#### Source

quickjs-emscripten-core/dist/index.d.ts:16

***

### VmCallResult\<VmHandle\>

> **VmCallResult**\<`VmHandle`\>: [`SuccessOrFail`](exports.md#successorfails-f)\<`VmHandle`, `VmHandle`\>

Used as an optional for results of a Vm call.
`{ value: VmHandle } | { error: VmHandle }`.

#### Type parameters

• **VmHandle**

#### Source

quickjs-emscripten-core/dist/index.d.ts:32

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

quickjs-emscripten-core/dist/index.d.ts:45

## Variables

### DEBUG\_ASYNC

> **`const`** **DEBUG\_ASYNC**: `Object`

This export is a variant of the quickjs WASM library:
### [@jitl/quickjs-wasmfile-debug-asyncify](https://github.com/justjake/quickjs-emscripten/blob/main/doc/packages/@jitl/quickjs-wasmfile-debug-asyncify/README.md)

Variant with separate .WASM file. Supports browser, NodeJS ESM, and NodeJS CJS.

| Variable            |    Setting                     |    Description    |
| --                  | --                             | --                |
| releaseMode         | debug         | Enables assertions and memory sanitizers. Try to run your tests against debug variants, in addition to your preferred production variant, to catch more bugs. |
| syncMode            | asyncify            | Build run through the ASYNCIFY WebAssembly transform. Larger and slower. Allows synchronous calls from the WASM runtime to async functions on the host. The extra magic makes this variant slower than sync variants. Note that both variants support regular async functions. Only adopt ASYNCIFY if you need to! |
| emscriptenInclusion | wasm | Has a separate .wasm file. May offer better caching in your browser, and reduces the size of your JS bundle. If you have issues, try a 'singlefile' variant. |
| exports             | require import browser                  | Has these package.json export conditions |

#### Type declaration

##### importFFI

> **`readonly`** **importFFI**: () => `Promise`\<(`module`) => [`QuickJSAsyncFFI`](interfaces/QuickJSAsyncFFI.md) \| *typeof* `QuickJSAsyncFFI`\>

###### Returns

`Promise`\<(`module`) => [`QuickJSAsyncFFI`](interfaces/QuickJSAsyncFFI.md) \| *typeof* `QuickJSAsyncFFI`\>

##### importModuleLoader

> **`readonly`** **importModuleLoader**: () => `Promise`\<*typeof* `___dist_emscripten_module_browser_js` \| [`EmscriptenModuleLoader`](interfaces/EmscriptenModuleLoader.md)\<[`QuickJSAsyncEmscriptenModule`](interfaces/QuickJSAsyncEmscriptenModule.md)\> \| `Object` \| `Object`\>

###### Returns

`Promise`\<*typeof* `___dist_emscripten_module_browser_js` \| [`EmscriptenModuleLoader`](interfaces/EmscriptenModuleLoader.md)\<[`QuickJSAsyncEmscriptenModule`](interfaces/QuickJSAsyncEmscriptenModule.md)\> \| `Object` \| `Object`\>

##### type

> **`readonly`** **type**: `"async"`

#### Source

variant-quickjs-wasmfile-debug-asyncify/dist/index.d.ts:38

***

### DEBUG\_SYNC

> **`const`** **DEBUG\_SYNC**: `Object`

This export is a variant of the quickjs WASM library:
### [@jitl/quickjs-wasmfile-debug-sync](https://github.com/justjake/quickjs-emscripten/blob/main/doc/packages/@jitl/quickjs-wasmfile-debug-sync/README.md)

Variant with separate .WASM file. Supports browser, NodeJS ESM, and NodeJS CJS.

| Variable            |    Setting                     |    Description    |
| --                  | --                             | --                |
| releaseMode         | debug         | Enables assertions and memory sanitizers. Try to run your tests against debug variants, in addition to your preferred production variant, to catch more bugs. |
| syncMode            | sync            | The default, normal build. Note that both variants support regular async functions. |
| emscriptenInclusion | wasm | Has a separate .wasm file. May offer better caching in your browser, and reduces the size of your JS bundle. If you have issues, try a 'singlefile' variant. |
| exports             | require import browser                  | Has these package.json export conditions |

#### Type declaration

##### importFFI

> **`readonly`** **importFFI**: () => `Promise`\<(`module`) => [`QuickJSFFI`](interfaces/QuickJSFFI.md) \| *typeof* `QuickJSFFI`\>

###### Returns

`Promise`\<(`module`) => [`QuickJSFFI`](interfaces/QuickJSFFI.md) \| *typeof* `QuickJSFFI`\>

##### importModuleLoader

> **`readonly`** **importModuleLoader**: () => `Promise`\<*typeof* `___dist_emscripten_module_browser_js` \| [`EmscriptenModuleLoader`](interfaces/EmscriptenModuleLoader.md)\<[`QuickJSEmscriptenModule`](interfaces/QuickJSEmscriptenModule.md)\> \| `Object` \| `Object`\>

###### Returns

`Promise`\<*typeof* `___dist_emscripten_module_browser_js` \| [`EmscriptenModuleLoader`](interfaces/EmscriptenModuleLoader.md)\<[`QuickJSEmscriptenModule`](interfaces/QuickJSEmscriptenModule.md)\> \| `Object` \| `Object`\>

##### type

> **`readonly`** **type**: `"sync"`

#### Source

variant-quickjs-wasmfile-debug-sync/dist/index.d.ts:34

***

### EvalFlags

> **EvalFlags**: `Object`

Bitfield options for JS_Eval() C function.

#### Type declaration

##### JS\_EVAL\_FLAG\_BACKTRACE\_BARRIER

> **JS\_EVAL\_FLAG\_BACKTRACE\_BARRIER**: `number`

don't include the stack frames before this eval in the Error() backtraces

##### JS\_EVAL\_FLAG\_COMPILE\_ONLY

> **JS\_EVAL\_FLAG\_COMPILE\_ONLY**: `number`

compile but do not run. The result is an object with a
JS_TAG_FUNCTION_BYTECODE or JS_TAG_MODULE tag. It can be executed
with JS_EvalFunction().

##### JS\_EVAL\_FLAG\_STRICT

> **JS\_EVAL\_FLAG\_STRICT**: `number`

force 'strict' mode

##### JS\_EVAL\_FLAG\_STRIP

> **JS\_EVAL\_FLAG\_STRIP**: `number`

force 'strip' mode

##### JS\_EVAL\_TYPE\_DIRECT

> **JS\_EVAL\_TYPE\_DIRECT**: `number`

direct call (internal use)

##### JS\_EVAL\_TYPE\_GLOBAL

> **JS\_EVAL\_TYPE\_GLOBAL**: `number`

global code (default)

##### JS\_EVAL\_TYPE\_INDIRECT

> **JS\_EVAL\_TYPE\_INDIRECT**: `number`

indirect call (internal use)

##### JS\_EVAL\_TYPE\_MASK

> **JS\_EVAL\_TYPE\_MASK**: `number`

##### JS\_EVAL\_TYPE\_MODULE

> **JS\_EVAL\_TYPE\_MODULE**: `number`

module code

#### Source

quickjs-ffi-types/dist/index.d.ts:89

***

### RELEASE\_ASYNC

> **`const`** **RELEASE\_ASYNC**: `Object`

This export is a variant of the quickjs WASM library:
### [@jitl/quickjs-wasmfile-release-asyncify](https://github.com/justjake/quickjs-emscripten/blob/main/doc/packages/@jitl/quickjs-wasmfile-release-asyncify/README.md)

Variant with separate .WASM file. Supports browser, NodeJS ESM, and NodeJS CJS.

| Variable            |    Setting                     |    Description    |
| --                  | --                             | --                |
| releaseMode         | release         | Optimized for performance; use when building/deploying your application. |
| syncMode            | asyncify            | Build run through the ASYNCIFY WebAssembly transform. Larger and slower. Allows synchronous calls from the WASM runtime to async functions on the host. The extra magic makes this variant slower than sync variants. Note that both variants support regular async functions. Only adopt ASYNCIFY if you need to! |
| emscriptenInclusion | wasm | Has a separate .wasm file. May offer better caching in your browser, and reduces the size of your JS bundle. If you have issues, try a 'singlefile' variant. |
| exports             | require import browser                  | Has these package.json export conditions |

#### Type declaration

##### importFFI

> **`readonly`** **importFFI**: () => `Promise`\<(`module`) => [`QuickJSAsyncFFI`](interfaces/QuickJSAsyncFFI.md) \| *typeof* `QuickJSAsyncFFI`\>

###### Returns

`Promise`\<(`module`) => [`QuickJSAsyncFFI`](interfaces/QuickJSAsyncFFI.md) \| *typeof* `QuickJSAsyncFFI`\>

##### importModuleLoader

> **`readonly`** **importModuleLoader**: () => `Promise`\<*typeof* `___dist_emscripten_module_browser_js` \| [`EmscriptenModuleLoader`](interfaces/EmscriptenModuleLoader.md)\<[`QuickJSAsyncEmscriptenModule`](interfaces/QuickJSAsyncEmscriptenModule.md)\> \| `Object` \| `Object`\>

###### Returns

`Promise`\<*typeof* `___dist_emscripten_module_browser_js` \| [`EmscriptenModuleLoader`](interfaces/EmscriptenModuleLoader.md)\<[`QuickJSAsyncEmscriptenModule`](interfaces/QuickJSAsyncEmscriptenModule.md)\> \| `Object` \| `Object`\>

##### type

> **`readonly`** **type**: `"async"`

#### Source

variant-quickjs-wasmfile-release-asyncify/dist/index.d.ts:38

***

### RELEASE\_SYNC

> **`const`** **RELEASE\_SYNC**: `Object`

This export is a variant of the quickjs WASM library:
### [@jitl/quickjs-wasmfile-release-sync](https://github.com/justjake/quickjs-emscripten/blob/main/doc/packages/@jitl/quickjs-wasmfile-release-sync/README.md)

Variant with separate .WASM file. Supports browser, NodeJS ESM, and NodeJS CJS.

| Variable            |    Setting                     |    Description    |
| --                  | --                             | --                |
| releaseMode         | release         | Optimized for performance; use when building/deploying your application. |
| syncMode            | sync            | The default, normal build. Note that both variants support regular async functions. |
| emscriptenInclusion | wasm | Has a separate .wasm file. May offer better caching in your browser, and reduces the size of your JS bundle. If you have issues, try a 'singlefile' variant. |
| exports             | require import browser                  | Has these package.json export conditions |

#### Type declaration

##### importFFI

> **`readonly`** **importFFI**: () => `Promise`\<(`module`) => [`QuickJSFFI`](interfaces/QuickJSFFI.md) \| *typeof* `QuickJSFFI`\>

###### Returns

`Promise`\<(`module`) => [`QuickJSFFI`](interfaces/QuickJSFFI.md) \| *typeof* `QuickJSFFI`\>

##### importModuleLoader

> **`readonly`** **importModuleLoader**: () => `Promise`\<*typeof* `___dist_emscripten_module_browser_js` \| [`EmscriptenModuleLoader`](interfaces/EmscriptenModuleLoader.md)\<[`QuickJSEmscriptenModule`](interfaces/QuickJSEmscriptenModule.md)\> \| `Object` \| `Object`\>

###### Returns

`Promise`\<*typeof* `___dist_emscripten_module_browser_js` \| [`EmscriptenModuleLoader`](interfaces/EmscriptenModuleLoader.md)\<[`QuickJSEmscriptenModule`](interfaces/QuickJSEmscriptenModule.md)\> \| `Object` \| `Object`\>

##### type

> **`readonly`** **type**: `"sync"`

#### Source

variant-quickjs-wasmfile-release-sync/dist/index.d.ts:34

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

quickjs-ffi-types/dist/index.d.ts:85

***

### debugLog()

#### debugLog(data)

> **debugLog**(...`data`): `void`

##### Parameters

• ...**data**: `any`[]

##### Returns

`void`

##### Source

quickjs-emscripten-core/dist/index.d.ts:1384

#### debugLog(message, optionalParams)

> **debugLog**(`message`?, ...`optionalParams`?): `void`

##### Parameters

• **message?**: `any`

• ...**optionalParams?**: `any`[]

##### Returns

`void`

##### Source

quickjs-emscripten-core/dist/index.d.ts:1385

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

[quickjs-emscripten/src/mod.ts:28](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten/src/mod.ts#L28)

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

[quickjs-emscripten/src/mod.ts:41](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten/src/mod.ts#L41)

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

quickjs-emscripten-core/dist/index.d.ts:25

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

quickjs-emscripten-core/dist/index.d.ts:22

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

quickjs-emscripten-core/dist/index.d.ts:1303

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

[quickjs-emscripten/src/mod.ts:76](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten/src/mod.ts#L76)

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

[quickjs-emscripten/src/mod.ts:59](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten/src/mod.ts#L59)

***

### newQuickJSAsyncWASMModule()

> **newQuickJSAsyncWASMModule**(`variant`): `Promise`\<[`QuickJSAsyncWASMModule`](classes/QuickJSAsyncWASMModule.md)\>

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

• **variant**: [`QuickJSAsyncVariant`](interfaces/QuickJSAsyncVariant.md)= `RELEASE_ASYNC`

Optionally, pass a [QuickJSAsyncVariant](interfaces/QuickJSAsyncVariant.md) to construct a different WebAssembly module.

#### Returns

`Promise`\<[`QuickJSAsyncWASMModule`](classes/QuickJSAsyncWASMModule.md)\>

#### Source

[quickjs-emscripten/src/variants.ts:44](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten/src/variants.ts#L44)

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

quickjs-emscripten-core/dist/index.d.ts:1292

***

### newQuickJSWASMModule()

> **newQuickJSWASMModule**(`variant`): `Promise`\<[`QuickJSWASMModule`](classes/QuickJSWASMModule.md)\>

Create a new, completely isolated WebAssembly module containing the QuickJS library.
See the documentation on [QuickJSWASMModule](classes/QuickJSWASMModule.md).

Note that there is a hard limit on the number of WebAssembly modules in older
versions of v8:
https://bugs.chromium.org/p/v8/issues/detail?id=12076

#### Parameters

• **variant**: [`QuickJSSyncVariant`](interfaces/QuickJSSyncVariant.md)= `RELEASE_SYNC`

Optionally, pass a [QuickJSSyncVariant](interfaces/QuickJSSyncVariant.md) to construct a different WebAssembly module.

#### Returns

`Promise`\<[`QuickJSWASMModule`](classes/QuickJSWASMModule.md)\>

#### Source

[quickjs-emscripten/src/variants.ts:22](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten/src/variants.ts#L22)

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

quickjs-emscripten-core/dist/index.d.ts:1267

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

quickjs-emscripten-core/dist/index.d.ts:1311

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
