[quickjs-emscripten](../packages.md) • **quickjs-emscripten-core** • [Readme](index.md) \| [Exports](exports.md)

***

[quickjs-emscripten](../packages.md) / quickjs-emscripten-core

# quickjs-emscripten-core

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
  - [EvalFlags](exports.md#evalflags)
- [Functions](exports.md#functions)
  - [assertSync()](exports.md#assertsync)
  - [debugLog()](exports.md#debuglog)
  - [isFail()](exports.md#isfail)
  - [isSuccess()](exports.md#issuccess)
  - [memoizePromiseFactory()](exports.md#memoizepromisefactory)
  - [newQuickJSAsyncWASMModuleFromVariant()](exports.md#newquickjsasyncwasmmodulefromvariant)
  - [newQuickJSWASMModuleFromVariant()](exports.md#newquickjswasmmodulefromvariant)
  - [shouldInterruptAfterDeadline()](exports.md#shouldinterruptafterdeadline)

## Namespaces

- [errors](namespaces/errors/index.md)

## Classes

- [Lifetime](classes/Lifetime.md)
- [QuickJSAsyncContext](classes/QuickJSAsyncContext.md)
- [QuickJSAsyncRuntime](classes/QuickJSAsyncRuntime.md)
- [QuickJSAsyncWASMModule](classes/QuickJSAsyncWASMModule.md)
- [QuickJSContext](classes/QuickJSContext.md)
- [QuickJSDeferredPromise](classes/QuickJSDeferredPromise.md)
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

[packages/quickjs-emscripten-core/src/context-asyncify.ts:17](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context-asyncify.ts#L17)

***

### BorrowedHeapCharPointer

> **BorrowedHeapCharPointer**: `Pointer`\<`"const char"` \| `"char"` \| `"js const char"`\>

Used internally for Javascript-to-C calls that may contain strings too large
for the Emscripten stack.

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:68

***

### EitherModule

> **EitherModule**: [`QuickJSEmscriptenModule`](interfaces/QuickJSEmscriptenModule.md) \| [`QuickJSAsyncEmscriptenModule`](interfaces/QuickJSAsyncEmscriptenModule.md)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:208

***

### ExecutePendingJobsResult

> **ExecutePendingJobsResult**: [`SuccessOrFail`](exports.md#successorfails-f)\<`number`, [`QuickJSHandle`](exports.md#quickjshandle) & `Object`\>

Used as an optional for the results of executing pendingJobs.
On success, `value` contains the number of async jobs executed
by the runtime.

#### Source

#### Source

[packages/quickjs-emscripten-core/src/runtime.ts:41](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L41)

***

### InterruptHandler

> **InterruptHandler**: (`runtime`) => `boolean` \| `undefined`

Callback called regularly while the VM executes code.
Determines if a VM's execution should be interrupted.

#### Parameters

• **runtime**: `QuickJSRuntime`

#### Returns

`boolean` \| `undefined`

`true` to interrupt JS execution inside the VM.

`false` or `undefined` to continue JS execution inside the VM.

#### Source

[packages/quickjs-emscripten-core/src/runtime.ts:33](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L33)

***

### JSBorrowedCharPointer

> **JSBorrowedCharPointer**: `Pointer`\<`"js const char"`\>

Used internally for Javascript-to-C calls that may contain strings too large
for the Emscripten stack.

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:78

***

### JSContextPointer

> **JSContextPointer**: `Pointer`\<`"JSContext"`\>

`JSContext*`.

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:22

***

### JSContextPointerPointer

> **JSContextPointerPointer**: `Pointer`\<`"JSContext"`\>

`JSContext**`. Used internally for execute pending jobs.

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:26

***

### JSModuleDefPointer

> **JSModuleDefPointer**: `Pointer`\<`"JSModuleDef"`\>

`JSModuleDef*`.

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:30

***

### JSModuleLoadFailure

> **JSModuleLoadFailure**: `Error` \| [`QuickJSHandle`](exports.md#quickjshandle)

#### Source

[packages/quickjs-emscripten-core/src/types.ts:74](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L74)

***

### JSModuleLoadResult

> **JSModuleLoadResult**: [`JSModuleLoadSuccess`](exports.md#jsmoduleloadsuccess) \| [`SuccessOrFail`](exports.md#successorfails-f)\<[`JSModuleLoadSuccess`](exports.md#jsmoduleloadsuccess), [`JSModuleLoadFailure`](exports.md#jsmoduleloadfailure)\>

#### Source

[packages/quickjs-emscripten-core/src/types.ts:75](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L75)

***

### JSModuleLoadSuccess

> **JSModuleLoadSuccess**: `string`

#### Source

[packages/quickjs-emscripten-core/src/types.ts:73](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L73)

***

### JSModuleNormalizeFailure

> **JSModuleNormalizeFailure**: `Error` \| [`QuickJSHandle`](exports.md#quickjshandle)

#### Source

[packages/quickjs-emscripten-core/src/types.ts:92](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L92)

***

### JSModuleNormalizeResult

> **JSModuleNormalizeResult**: [`JSModuleNormalizeSuccess`](exports.md#jsmodulenormalizesuccess) \| [`SuccessOrFail`](exports.md#successorfails-f)\<[`JSModuleNormalizeSuccess`](exports.md#jsmodulenormalizesuccess), [`JSModuleNormalizeFailure`](exports.md#jsmodulenormalizefailure)\>

#### Source

[packages/quickjs-emscripten-core/src/types.ts:93](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L93)

***

### JSModuleNormalizeSuccess

> **JSModuleNormalizeSuccess**: `string`

#### Source

[packages/quickjs-emscripten-core/src/types.ts:91](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L91)

***

### JSRuntimePointer

> **JSRuntimePointer**: `Pointer`\<`"JSRuntime"`\>

`JSRuntime*`.

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:18

***

### JSValue

> **JSValue**: [`Lifetime`](classes/Lifetime.md)\<[`JSValuePointer`](exports.md#jsvaluepointer), [`JSValuePointer`](exports.md#jsvaluepointer), `QuickJSRuntime`\>

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

[packages/quickjs-emscripten-core/src/types.ts:49](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L49)

***

### JSValueConst

> **JSValueConst**: [`Lifetime`](classes/Lifetime.md)\<[`JSValueConstPointer`](exports.md#jsvalueconstpointer), [`JSValuePointer`](exports.md#jsvaluepointer), `QuickJSRuntime`\>

A QuickJSHandle to a borrowed value that does not need to be disposed.

In QuickJS, a JSValueConst is a "borrowed" reference that isn't owned by the
current scope. That means that the current scope should not `JS_FreeValue`
it, or retain a reference to it after the scope exits, because it may be
freed by its owner.

quickjs-emscripten takes care of disposing JSValueConst references.

#### Source

[packages/quickjs-emscripten-core/src/types.ts:32](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L32)

***

### JSValueConstPointer

> **JSValueConstPointer**: `Pointer`\<`"JSValueConst"`\>

`JSValueConst*
See [[JSValueConst]] and [[StaticJSValue]].

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:40

***

### JSValueConstPointerPointer

> **JSValueConstPointerPointer**: `Pointer`\<`"JSValueConst[]"`\>

Used internally for Javascript-to-C function calls.

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:48

***

### JSValuePointer

> **JSValuePointer**: `Pointer`\<`"JSValue"`\>

`JSValue*`.
See [[JSValue]].

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:35

***

### JSValuePointerPointer

> **JSValuePointerPointer**: `Pointer`\<`"JSValue[]"`\>

Used internally for Javascript-to-C function calls.

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:44

***

### JSVoidPointer

> **JSVoidPointer**: `Pointer`\<`any`\>

Opaque pointer that was allocated by js_malloc.

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:82

***

### OwnedHeapCharPointer

> **OwnedHeapCharPointer**: `Pointer`\<`"char"`\>

Used internally for Javascript-to-C calls that may contain strings too large
for the Emscripten stack.

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:73

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

[packages/quickjs-emscripten-core/src/types.ts:244](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L244)

***

### PromisedDefault\<T\>

> **PromisedDefault**\<`T`\>: `T` \| `Promise`\<`T`\> \| `Promise`\<`Object`\> \| `Promise`\<`Object`\>

#### Type parameters

• **T**

#### Source

[packages/quickjs-emscripten-core/src/from-variant.ts:9](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/from-variant.ts#L9)

***

### QTS\_C\_To\_HostCallbackFuncPointer

> **QTS\_C\_To\_HostCallbackFuncPointer**: `Pointer`\<`"C_To_HostCallbackFunc"`\>

Used internally for C-to-Javascript function calls.

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:55

***

### QTS\_C\_To\_HostInterruptFuncPointer

> **QTS\_C\_To\_HostInterruptFuncPointer**: `Pointer`\<`"C_To_HostInterruptFunc"`\>

Used internally for C-to-Javascript interrupt handlers.

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:59

***

### QTS\_C\_To\_HostLoadModuleFuncPointer

> **QTS\_C\_To\_HostLoadModuleFuncPointer**: `Pointer`\<`"C_To_HostLoadModuleFunc"`\>

Used internally for C-to-Javascript module loading.

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:63

***

### QuickJSHandle

> **QuickJSHandle**: [`StaticJSValue`](exports.md#staticjsvalue) \| [`JSValue`](exports.md#jsvalue) \| [`JSValueConst`](exports.md#jsvalueconst)

Wraps a C pointer to a QuickJS JSValue, which represents a Javascript value inside
a QuickJS virtual machine.

Values must not be shared between QuickJSContext instances.
You must dispose of any handles you create by calling the `.dispose()` method.

#### Source

[packages/quickjs-emscripten-core/src/types.ts:58](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L58)

***

### QuickJSPropertyKey

> **QuickJSPropertyKey**: `number` \| `string` \| [`QuickJSHandle`](exports.md#quickjshandle)

Property key for getting or setting a property on a handle with
[[QuickJSContext.getProp]], [[QuickJSContext.setProp]], or [[QuickJSContext.defineProp]].

#### Source

[packages/quickjs-emscripten-core/src/context.ts:41](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L41)

***

### QuickJSVariant

> **QuickJSVariant**: [`QuickJSSyncVariant`](interfaces/QuickJSSyncVariant.md) \| [`QuickJSAsyncVariant`](interfaces/QuickJSAsyncVariant.md)

#### Source

packages/quickjs-ffi-types/dist/index.d.ts:393

***

### StaticJSValue

> **StaticJSValue**: [`Lifetime`](classes/Lifetime.md)\<[`JSValueConstPointer`](exports.md#jsvalueconstpointer), [`JSValueConstPointer`](exports.md#jsvalueconstpointer), `QuickJSRuntime`\>

A QuickJSHandle to a constant that will never change, and does not need to
be disposed.

#### Source

[packages/quickjs-emscripten-core/src/types.ts:20](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L20)

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

packages/quickjs-ffi-types/dist/index.d.ts:91

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

packages/quickjs-ffi-types/dist/index.d.ts:87

***

### debugLog()

#### debugLog(data)

> **debugLog**(...`data`): `void`

[MDN Reference](https://developer.mozilla.org/docs/Web/API/console/log)

##### Parameters

• ...**data**: `any`[]

##### Returns

`void`

##### Source

node\_modules/typescript/lib/lib.dom.d.ts:26455

#### debugLog(message, optionalParams)

> **debugLog**(`message`?, ...`optionalParams`?): `void`

Prints to `stdout` with newline. Multiple arguments can be passed, with the
first used as the primary message and all additional used as substitution
values similar to [`printf(3)`](http://man7.org/linux/man-pages/man3/printf.3.html) (the arguments are all passed to `util.format()`).

```js
const count = 5;
console.log('count: %d', count);
// Prints: count: 5, to stdout
console.log('count:', count);
// Prints: count: 5, to stdout
```

See `util.format()` for more information.

##### Parameters

• **message?**: `any`

• ...**optionalParams?**: `any`[]

##### Returns

`void`

##### Since

v0.1.100

##### Source

node\_modules/@types/node/console.d.ts:221

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

[packages/quickjs-emscripten-core/src/from-variant.ts:92](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/from-variant.ts#L92)

***

### newQuickJSAsyncWASMModuleFromVariant()

> **newQuickJSAsyncWASMModuleFromVariant**(`variantOrPromise`): `Promise`\<[`QuickJSAsyncWASMModule`](classes/QuickJSAsyncWASMModule.md)\>

Create a new, completely isolated WebAssembly module containing a version of the QuickJS library
compiled with Emscripten's [ASYNCIFY](https://emscripten.org/docs/porting/asyncify.html) transform.

This version of the library offers features that enable synchronous code
inside the VM to interact with asynchronous code in the host environment.
See the documentation on [[QuickJSAsyncWASMModule]], [[QuickJSAsyncRuntime]],
and [[QuickJSAsyncContext]].

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

[packages/quickjs-emscripten-core/src/from-variant.ts:68](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/from-variant.ts#L68)

***

### newQuickJSWASMModuleFromVariant()

> **newQuickJSWASMModuleFromVariant**(`variantOrPromise`): `Promise`\<[`QuickJSWASMModule`](classes/QuickJSWASMModule.md)\>

Create a new, completely isolated WebAssembly module containing the QuickJS library.
See the documentation on [[QuickJSWASMModule]].

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

[packages/quickjs-emscripten-core/src/from-variant.ts:30](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/from-variant.ts#L30)

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
