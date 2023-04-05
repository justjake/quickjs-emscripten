[quickjs-emscripten](README.md) / Exports

# quickjs-emscripten

## Table of contents

### Namespaces

- [errors](modules/errors.md)

### Classes

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

### Interfaces

- [AsyncBuildVariant](interfaces/AsyncBuildVariant.md)
- [AsyncRuntimeOptions](interfaces/AsyncRuntimeOptions.md)
- [ContextEvalOptions](interfaces/ContextEvalOptions.md)
- [ContextOptions](interfaces/ContextOptions.md)
- [Disposable](interfaces/Disposable.md)
- [JSModuleLoader](interfaces/JSModuleLoader.md)
- [JSModuleLoaderAsync](interfaces/JSModuleLoaderAsync.md)
- [JSModuleNormalizer](interfaces/JSModuleNormalizer.md)
- [JSModuleNormalizerAsync](interfaces/JSModuleNormalizerAsync.md)
- [LowLevelJavascriptVm](interfaces/LowLevelJavascriptVm.md)
- [ModuleEvalOptions](interfaces/ModuleEvalOptions.md)
- [RuntimeOptions](interfaces/RuntimeOptions.md)
- [RuntimeOptionsBase](interfaces/RuntimeOptionsBase.md)
- [SyncBuildVariant](interfaces/SyncBuildVariant.md)
- [VmPropertyDescriptor](interfaces/VmPropertyDescriptor.md)

### Type aliases

- [AsyncFunctionImplementation](modules.md#asyncfunctionimplementation)
- [ExecutePendingJobsResult](modules.md#executependingjobsresult)
- [InterruptHandler](modules.md#interrupthandler)
- [JSModuleLoadFailure](modules.md#jsmoduleloadfailure)
- [JSModuleLoadResult](modules.md#jsmoduleloadresult)
- [JSModuleLoadSuccess](modules.md#jsmoduleloadsuccess)
- [JSModuleNormalizeFailure](modules.md#jsmodulenormalizefailure)
- [JSModuleNormalizeResult](modules.md#jsmodulenormalizeresult)
- [JSModuleNormalizeSuccess](modules.md#jsmodulenormalizesuccess)
- [JSValue](modules.md#jsvalue)
- [JSValueConst](modules.md#jsvalueconst)
- [PromiseExecutor](modules.md#promiseexecutor)
- [QuickJSHandle](modules.md#quickjshandle)
- [QuickJSPropertyKey](modules.md#quickjspropertykey)
- [StaticJSValue](modules.md#staticjsvalue)
- [SuccessOrFail](modules.md#successorfail)
- [VmCallResult](modules.md#vmcallresult)
- [VmFunctionImplementation](modules.md#vmfunctionimplementation)

### Variables

- [DEBUG\_ASYNC](modules.md#debug_async)
- [DEBUG\_SYNC](modules.md#debug_sync)
- [RELEASE\_ASYNC](modules.md#release_async)
- [RELEASE\_SYNC](modules.md#release_sync)

### Functions

- [getQuickJS](modules.md#getquickjs)
- [getQuickJSSync](modules.md#getquickjssync)
- [isFail](modules.md#isfail)
- [isSuccess](modules.md#issuccess)
- [newAsyncContext](modules.md#newasynccontext)
- [newAsyncRuntime](modules.md#newasyncruntime)
- [newQuickJSAsyncWASMModule](modules.md#newquickjsasyncwasmmodule)
- [newQuickJSWASMModule](modules.md#newquickjswasmmodule)
- [shouldInterruptAfterDeadline](modules.md#shouldinterruptafterdeadline)

## Type aliases

### AsyncFunctionImplementation

Ƭ **AsyncFunctionImplementation**: (`this`: [`QuickJSHandle`](modules.md#quickjshandle), ...`args`: [`QuickJSHandle`](modules.md#quickjshandle)[]) => `Promise`<[`QuickJSHandle`](modules.md#quickjshandle) \| [`VmCallResult`](modules.md#vmcallresult)<[`QuickJSHandle`](modules.md#quickjshandle)\> \| `void`\>

#### Type declaration

▸ (`this`, ...`args`): `Promise`<[`QuickJSHandle`](modules.md#quickjshandle) \| [`VmCallResult`](modules.md#vmcallresult)<[`QuickJSHandle`](modules.md#quickjshandle)\> \| `void`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | [`QuickJSHandle`](modules.md#quickjshandle) |
| `...args` | [`QuickJSHandle`](modules.md#quickjshandle)[] |

##### Returns

`Promise`<[`QuickJSHandle`](modules.md#quickjshandle) \| [`VmCallResult`](modules.md#vmcallresult)<[`QuickJSHandle`](modules.md#quickjshandle)\> \| `void`\>

#### Defined in

[ts/context-asyncify.ts:12](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context-asyncify.ts#L12)

___

### ExecutePendingJobsResult

Ƭ **ExecutePendingJobsResult**: [`SuccessOrFail`](modules.md#successorfail)<`number`, [`QuickJSHandle`](modules.md#quickjshandle) & { `context`: [`QuickJSContext`](classes/QuickJSContext.md)  }\>

Used as an optional for the results of executing pendingJobs.
On success, `value` contains the number of async jobs executed
by the runtime.

**`source`**

#### Defined in

[ts/runtime.ts:41](https://github.com/justjake/quickjs-emscripten/blob/main/ts/runtime.ts#L41)

___

### InterruptHandler

Ƭ **InterruptHandler**: (`runtime`: [`QuickJSRuntime`](classes/QuickJSRuntime.md)) => `boolean` \| `undefined`

#### Type declaration

▸ (`runtime`): `boolean` \| `undefined`

Callback called regularly while the VM executes code.
Determines if a VM's execution should be interrupted.

##### Parameters

| Name | Type |
| :------ | :------ |
| `runtime` | [`QuickJSRuntime`](classes/QuickJSRuntime.md) |

##### Returns

`boolean` \| `undefined`

`true` to interrupt JS execution inside the VM.

#### Defined in

[ts/runtime.ts:33](https://github.com/justjake/quickjs-emscripten/blob/main/ts/runtime.ts#L33)

___

### JSModuleLoadFailure

Ƭ **JSModuleLoadFailure**: `Error` \| [`QuickJSHandle`](modules.md#quickjshandle)

#### Defined in

[ts/types.ts:69](https://github.com/justjake/quickjs-emscripten/blob/main/ts/types.ts#L69)

___

### JSModuleLoadResult

Ƭ **JSModuleLoadResult**: [`JSModuleLoadSuccess`](modules.md#jsmoduleloadsuccess) \| [`SuccessOrFail`](modules.md#successorfail)<[`JSModuleLoadSuccess`](modules.md#jsmoduleloadsuccess), [`JSModuleLoadFailure`](modules.md#jsmoduleloadfailure)\>

#### Defined in

[ts/types.ts:70](https://github.com/justjake/quickjs-emscripten/blob/main/ts/types.ts#L70)

___

### JSModuleLoadSuccess

Ƭ **JSModuleLoadSuccess**: `string`

#### Defined in

[ts/types.ts:68](https://github.com/justjake/quickjs-emscripten/blob/main/ts/types.ts#L68)

___

### JSModuleNormalizeFailure

Ƭ **JSModuleNormalizeFailure**: `Error` \| [`QuickJSHandle`](modules.md#quickjshandle)

#### Defined in

[ts/types.ts:86](https://github.com/justjake/quickjs-emscripten/blob/main/ts/types.ts#L86)

___

### JSModuleNormalizeResult

Ƭ **JSModuleNormalizeResult**: [`JSModuleNormalizeSuccess`](modules.md#jsmodulenormalizesuccess) \| [`SuccessOrFail`](modules.md#successorfail)<[`JSModuleNormalizeSuccess`](modules.md#jsmodulenormalizesuccess), [`JSModuleNormalizeFailure`](modules.md#jsmodulenormalizefailure)\>

#### Defined in

[ts/types.ts:87](https://github.com/justjake/quickjs-emscripten/blob/main/ts/types.ts#L87)

___

### JSModuleNormalizeSuccess

Ƭ **JSModuleNormalizeSuccess**: `string`

#### Defined in

[ts/types.ts:85](https://github.com/justjake/quickjs-emscripten/blob/main/ts/types.ts#L85)

___

### JSValue

Ƭ **JSValue**: [`Lifetime`](classes/Lifetime.md)<`JSValuePointer`, `JSValuePointer`, [`QuickJSRuntime`](classes/QuickJSRuntime.md)\>

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

#### Defined in

[ts/types.ts:44](https://github.com/justjake/quickjs-emscripten/blob/main/ts/types.ts#L44)

___

### JSValueConst

Ƭ **JSValueConst**: [`Lifetime`](classes/Lifetime.md)<`JSValueConstPointer`, `JSValuePointer`, [`QuickJSRuntime`](classes/QuickJSRuntime.md)\>

A QuickJSHandle to a borrowed value that does not need to be disposed.

In QuickJS, a JSValueConst is a "borrowed" reference that isn't owned by the
current scope. That means that the current scope should not `JS_FreeValue`
it, or retain a reference to it after the scope exits, because it may be
freed by its owner.

quickjs-emscripten takes care of disposing JSValueConst references.

#### Defined in

[ts/types.ts:27](https://github.com/justjake/quickjs-emscripten/blob/main/ts/types.ts#L27)

___

### PromiseExecutor

Ƭ **PromiseExecutor**<`ResolveT`, `RejectT`\>: (`resolve`: (`value`: `ResolveT` \| `PromiseLike`<`ResolveT`\>) => `void`, `reject`: (`reason`: `RejectT`) => `void`) => `void`

#### Type parameters

| Name |
| :------ |
| `ResolveT` |
| `RejectT` |

#### Type declaration

▸ (`resolve`, `reject`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `resolve` | (`value`: `ResolveT` \| `PromiseLike`<`ResolveT`\>) => `void` |
| `reject` | (`reason`: `RejectT`) => `void` |

##### Returns

`void`

#### Defined in

[ts/types.ts:236](https://github.com/justjake/quickjs-emscripten/blob/main/ts/types.ts#L236)

___

### QuickJSHandle

Ƭ **QuickJSHandle**: [`StaticJSValue`](modules.md#staticjsvalue) \| [`JSValue`](modules.md#jsvalue) \| [`JSValueConst`](modules.md#jsvalueconst)

Wraps a C pointer to a QuickJS JSValue, which represents a Javascript value inside
a QuickJS virtual machine.

Values must not be shared between QuickJSContext instances.
You must dispose of any handles you create by calling the `.dispose()` method.

#### Defined in

[ts/types.ts:53](https://github.com/justjake/quickjs-emscripten/blob/main/ts/types.ts#L53)

___

### QuickJSPropertyKey

Ƭ **QuickJSPropertyKey**: `number` \| `string` \| [`QuickJSHandle`](modules.md#quickjshandle)

Property key for getting or setting a property on a handle with
[QuickJSContext.getProp](classes/QuickJSContext.md#getprop), [QuickJSContext.setProp](classes/QuickJSContext.md#setprop), or [QuickJSContext.defineProp](classes/QuickJSContext.md#defineprop).

#### Defined in

[ts/context.ts:41](https://github.com/justjake/quickjs-emscripten/blob/main/ts/context.ts#L41)

___

### StaticJSValue

Ƭ **StaticJSValue**: [`Lifetime`](classes/Lifetime.md)<`JSValueConstPointer`, `JSValueConstPointer`, [`QuickJSRuntime`](classes/QuickJSRuntime.md)\>

A QuickJSHandle to a constant that will never change, and does not need to
be disposed.

#### Defined in

[ts/types.ts:15](https://github.com/justjake/quickjs-emscripten/blob/main/ts/types.ts#L15)

___

### SuccessOrFail

Ƭ **SuccessOrFail**<`S`, `F`\>: { `error?`: `undefined` ; `value`: `S`  } \| { `error`: `F`  }

Used as an optional.
`{ value: S } | { error: E }`.

#### Type parameters

| Name |
| :------ |
| `S` |
| `F` |

#### Defined in

[ts/vm-interface.ts:5](https://github.com/justjake/quickjs-emscripten/blob/main/ts/vm-interface.ts#L5)

___

### VmCallResult

Ƭ **VmCallResult**<`VmHandle`\>: [`SuccessOrFail`](modules.md#successorfail)<`VmHandle`, `VmHandle`\>

Used as an optional for results of a Vm call.
`{ value: VmHandle } | { error: VmHandle }`.

#### Type parameters

| Name |
| :------ |
| `VmHandle` |

#### Defined in

[ts/vm-interface.ts:26](https://github.com/justjake/quickjs-emscripten/blob/main/ts/vm-interface.ts#L26)

___

### VmFunctionImplementation

Ƭ **VmFunctionImplementation**<`VmHandle`\>: (`this`: `VmHandle`, ...`args`: `VmHandle`[]) => `VmHandle` \| [`VmCallResult`](modules.md#vmcallresult)<`VmHandle`\> \| `void`

#### Type parameters

| Name |
| :------ |
| `VmHandle` |

#### Type declaration

▸ (`this`, ...`args`): `VmHandle` \| [`VmCallResult`](modules.md#vmcallresult)<`VmHandle`\> \| `void`

A VmFunctionImplementation takes handles as arguments.
It should return a handle, or be void.

To indicate an exception, a VMs can throw either a handle (transferred
directly) or any other Javascript value (only the poperties `name` and
`message` will be transferred). Or, the VmFunctionImplementation may return
a VmCallResult's `{ error: handle }` error variant.

VmFunctionImplementation should not free its arguments or its return value.
It should not retain a reference to its return value or thrown error.

##### Parameters

| Name | Type |
| :------ | :------ |
| `this` | `VmHandle` |
| `...args` | `VmHandle`[] |

##### Returns

`VmHandle` \| [`VmCallResult`](modules.md#vmcallresult)<`VmHandle`\> \| `void`

#### Defined in

[ts/vm-interface.ts:40](https://github.com/justjake/quickjs-emscripten/blob/main/ts/vm-interface.ts#L40)

## Variables

### DEBUG\_ASYNC

• **DEBUG\_ASYNC**: [`AsyncBuildVariant`](interfaces/AsyncBuildVariant.md)

The async debug build variant may or may not have the sanitizer enabled.
It does print a lot of debug logs.

Suggested use case: interactive debugging only.

#### Defined in

[ts/variants.ts:173](https://github.com/justjake/quickjs-emscripten/blob/main/ts/variants.ts#L173)

___

### DEBUG\_SYNC

• **DEBUG\_SYNC**: [`SyncBuildVariant`](interfaces/SyncBuildVariant.md)

This build variant is compiled with `-fsanitize=leak`. It instruments all
memory allocations and when combined with sourcemaps, can present stack trace
locations where memory leaks occur.

See [TestQuickJSWASMModule](classes/TestQuickJSWASMModule.md) which provides access to the leak sanitizer via
[TestQuickJSWASMModule.assertNoMemoryAllocated](classes/TestQuickJSWASMModule.md#assertnomemoryallocated).

The downside is that it's 100-1000x slower than the other variants.
Suggested use case: automated testing, regression testing, and interactive
debugging.

#### Defined in

[ts/variants.ts:139](https://github.com/justjake/quickjs-emscripten/blob/main/ts/variants.ts#L139)

___

### RELEASE\_ASYNC

• **RELEASE\_ASYNC**: [`AsyncBuildVariant`](interfaces/AsyncBuildVariant.md)

This is the default asyncified build variant.

#### Defined in

[ts/variants.ts:188](https://github.com/justjake/quickjs-emscripten/blob/main/ts/variants.ts#L188)

___

### RELEASE\_SYNC

• **RELEASE\_SYNC**: [`SyncBuildVariant`](interfaces/SyncBuildVariant.md)

This is the default (synchronous) build variant.
[getQuickJS](modules.md#getquickjs) returns a memoized instance of this build variant.

#### Defined in

[ts/variants.ts:155](https://github.com/justjake/quickjs-emscripten/blob/main/ts/variants.ts#L155)

## Functions

### getQuickJS

▸ **getQuickJS**(): `Promise`<[`QuickJSWASMModule`](classes/QuickJSWASMModule.md)\>

Get a shared singleton [QuickJSWASMModule](classes/QuickJSWASMModule.md). Use this to evaluate code
or create Javascript environments.

This is the top-level entrypoint for the quickjs-emscripten library.

If you need strictest possible isolation guarantees, you may create a
separate [QuickJSWASMModule](classes/QuickJSWASMModule.md) via [newQuickJSWASMModule](modules.md#newquickjswasmmodule).

To work with the asyncified version of this library, see these functions:

- [newAsyncRuntime](modules.md#newasyncruntime).
- [newAsyncContext](modules.md#newasynccontext).
- [newQuickJSAsyncWASMModule](modules.md#newquickjsasyncwasmmodule).

#### Returns

`Promise`<[`QuickJSWASMModule`](classes/QuickJSWASMModule.md)\>

#### Defined in

[ts/index.ts:91](https://github.com/justjake/quickjs-emscripten/blob/main/ts/index.ts#L91)

___

### getQuickJSSync

▸ **getQuickJSSync**(): [`QuickJSWASMModule`](classes/QuickJSWASMModule.md)

Provides synchronous access to the shared [QuickJSWASMModule](classes/QuickJSWASMModule.md) instance returned by [getQuickJS](modules.md#getquickjs), as long as
least once.

**`throws`** If called before `getQuickJS` resolves.

#### Returns

[`QuickJSWASMModule`](classes/QuickJSWASMModule.md)

#### Defined in

[ts/index.ts:104](https://github.com/justjake/quickjs-emscripten/blob/main/ts/index.ts#L104)

___

### isFail

▸ **isFail**<`S`, `F`\>(`successOrFail`): successOrFail is Object

#### Type parameters

| Name |
| :------ |
| `S` |
| `F` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `successOrFail` | [`SuccessOrFail`](modules.md#successorfail)<`S`, `F`\> |

#### Returns

successOrFail is Object

#### Defined in

[ts/vm-interface.ts:18](https://github.com/justjake/quickjs-emscripten/blob/main/ts/vm-interface.ts#L18)

___

### isSuccess

▸ **isSuccess**<`S`, `F`\>(`successOrFail`): successOrFail is Object

#### Type parameters

| Name |
| :------ |
| `S` |
| `F` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `successOrFail` | [`SuccessOrFail`](modules.md#successorfail)<`S`, `F`\> |

#### Returns

successOrFail is Object

#### Defined in

[ts/vm-interface.ts:14](https://github.com/justjake/quickjs-emscripten/blob/main/ts/vm-interface.ts#L14)

___

### newAsyncContext

▸ **newAsyncContext**(`options?`): `Promise`<[`QuickJSAsyncContext`](classes/QuickJSAsyncContext.md)\>

Create a new [QuickJSAsyncContext](classes/QuickJSAsyncContext.md) (with an associated runtime) in an
separate WebAssembly module.

Each context is isolated in a separate WebAssembly module, so that errors in
one runtime cannot contaminate another runtime, and each runtime can execute
an asynchronous action without conflicts.

Note that there is a hard limit on the number of WebAssembly modules in older
versions of v8:
https://bugs.chromium.org/p/v8/issues/detail?id=12076

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`ContextOptions`](interfaces/ContextOptions.md) |

#### Returns

`Promise`<[`QuickJSAsyncContext`](classes/QuickJSAsyncContext.md)\>

#### Defined in

[ts/index.ts:139](https://github.com/justjake/quickjs-emscripten/blob/main/ts/index.ts#L139)

___

### newAsyncRuntime

▸ **newAsyncRuntime**(`options?`): `Promise`<[`QuickJSAsyncRuntime`](classes/QuickJSAsyncRuntime.md)\>

Create a new [QuickJSAsyncRuntime](classes/QuickJSAsyncRuntime.md) in a separate WebAssembly module.

Each runtime is isolated in a separate WebAssembly module, so that errors in
one runtime cannot contaminate another runtime, and each runtime can execute
an asynchronous action without conflicts.

Note that there is a hard limit on the number of WebAssembly modules in older
versions of v8:
https://bugs.chromium.org/p/v8/issues/detail?id=12076

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`AsyncRuntimeOptions`](interfaces/AsyncRuntimeOptions.md) |

#### Returns

`Promise`<[`QuickJSAsyncRuntime`](classes/QuickJSAsyncRuntime.md)\>

#### Defined in

[ts/index.ts:122](https://github.com/justjake/quickjs-emscripten/blob/main/ts/index.ts#L122)

___

### newQuickJSAsyncWASMModule

▸ **newQuickJSAsyncWASMModule**(`variant?`): `Promise`<[`QuickJSAsyncWASMModule`](classes/QuickJSAsyncWASMModule.md)\>

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

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variant` | [`AsyncBuildVariant`](interfaces/AsyncBuildVariant.md) | `RELEASE_ASYNC` |

#### Returns

`Promise`<[`QuickJSAsyncWASMModule`](classes/QuickJSAsyncWASMModule.md)\>

#### Defined in

[ts/variants.ts:97](https://github.com/justjake/quickjs-emscripten/blob/main/ts/variants.ts#L97)

___

### newQuickJSWASMModule

▸ **newQuickJSWASMModule**(`variant?`): `Promise`<[`QuickJSWASMModule`](classes/QuickJSWASMModule.md)\>

Create a new, completely isolated WebAssembly module containing the QuickJS library.
See the documentation on [QuickJSWASMModule](classes/QuickJSWASMModule.md).

Note that there is a hard limit on the number of WebAssembly modules in older
versions of v8:
https://bugs.chromium.org/p/v8/issues/detail?id=12076

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `variant` | [`SyncBuildVariant`](interfaces/SyncBuildVariant.md) | `RELEASE_SYNC` |

#### Returns

`Promise`<[`QuickJSWASMModule`](classes/QuickJSWASMModule.md)\>

#### Defined in

[ts/variants.ts:67](https://github.com/justjake/quickjs-emscripten/blob/main/ts/variants.ts#L67)

___

### shouldInterruptAfterDeadline

▸ **shouldInterruptAfterDeadline**(`deadline`): [`InterruptHandler`](modules.md#interrupthandler)

Returns an interrupt handler that interrupts Javascript execution after a deadline time.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `deadline` | `number` \| `Date` | Interrupt execution if it's still running after this time.   Number values are compared against `Date.now()` |

#### Returns

[`InterruptHandler`](modules.md#interrupthandler)

#### Defined in

[ts/index.ts:150](https://github.com/justjake/quickjs-emscripten/blob/main/ts/index.ts#L150)
