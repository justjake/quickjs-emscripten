[quickjs-emscripten](../README.md) / [Exports](../modules.md) / QuickJSRuntime

# Class: QuickJSRuntime

A runtime represents a Javascript runtime corresponding to an object heap.
Several runtimes can exist at the same time but they cannot exchange objects.
Inside a given runtime, no multi-threading is supported.

You can think of separate runtimes like different domains in a browser, and
the contexts within a runtime like the different windows open to the same
domain.

Create a runtime via [QuickJSWASMModule.newRuntime](QuickJSWASMModule.md#newruntime).

You should create separate runtime instances for untrusted code from
different sources for isolation. However, stronger isolation is also
available (at the cost of memory usage), by creating separate WebAssembly
modules to further isolate untrusted code.
See [newQuickJSWASMModule](../modules.md#newquickjswasmmodule).

Implement memory and CPU constraints with [setInterruptHandler](QuickJSRuntime.md#setinterrupthandler)
(called regularly while the interpreter runs), [setMemoryLimit](QuickJSRuntime.md#setmemorylimit), and
[setMaxStackSize](QuickJSRuntime.md#setmaxstacksize).
Use [computeMemoryUsage](QuickJSRuntime.md#computememoryusage) or [dumpMemoryUsage](QuickJSRuntime.md#dumpmemoryusage) to guide memory limit
tuning.

Configure ES module loading with [setModuleLoader](QuickJSRuntime.md#setmoduleloader).

## Hierarchy

- **`QuickJSRuntime`**

  ↳ [`QuickJSAsyncRuntime`](QuickJSAsyncRuntime.md)

## Implements

- [`Disposable`](../interfaces/Disposable.md)

## Table of contents

### Properties

- [context](QuickJSRuntime.md#context)

### Accessors

- [alive](QuickJSRuntime.md#alive)

### Methods

- [assertOwned](QuickJSRuntime.md#assertowned)
- [computeMemoryUsage](QuickJSRuntime.md#computememoryusage)
- [dispose](QuickJSRuntime.md#dispose)
- [dumpMemoryUsage](QuickJSRuntime.md#dumpmemoryusage)
- [executePendingJobs](QuickJSRuntime.md#executependingjobs)
- [hasPendingJob](QuickJSRuntime.md#haspendingjob)
- [newContext](QuickJSRuntime.md#newcontext)
- [removeInterruptHandler](QuickJSRuntime.md#removeinterrupthandler)
- [removeModuleLoader](QuickJSRuntime.md#removemoduleloader)
- [setInterruptHandler](QuickJSRuntime.md#setinterrupthandler)
- [setMaxStackSize](QuickJSRuntime.md#setmaxstacksize)
- [setMemoryLimit](QuickJSRuntime.md#setmemorylimit)
- [setModuleLoader](QuickJSRuntime.md#setmoduleloader)

## Properties

### context

• **context**: `undefined` \| [`QuickJSContext`](QuickJSContext.md)

If this runtime was created as as part of a context, points to the context
associated with the runtime.

If this runtime was created stand-alone, this may or may not contain a context.
A context here may be allocated if one is needed by the runtime, eg for [computeMemoryUsage](QuickJSRuntime.md#computememoryusage).

#### Defined in

[ts/runtime.ts:84](https://github.com/justjake/quickjs-emscripten/blob/main/ts/runtime.ts#L84)

## Accessors

### alive

• `get` **alive**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[Disposable](../interfaces/Disposable.md).[alive](../interfaces/Disposable.md#alive)

#### Defined in

[ts/runtime.ts:126](https://github.com/justjake/quickjs-emscripten/blob/main/ts/runtime.ts#L126)

## Methods

### assertOwned

▸ **assertOwned**(`handle`): `void`

Assert that `handle` is owned by this runtime.

**`throws`** QuickJSWrongOwner if owned by a different runtime.

#### Parameters

| Name | Type |
| :------ | :------ |
| `handle` | [`QuickJSHandle`](../modules.md#quickjshandle) |

#### Returns

`void`

#### Defined in

[ts/runtime.ts:326](https://github.com/justjake/quickjs-emscripten/blob/main/ts/runtime.ts#L326)

___

### computeMemoryUsage

▸ **computeMemoryUsage**(): [`QuickJSHandle`](../modules.md#quickjshandle)

Compute memory usage for this runtime. Returns the result as a handle to a
JSValue object. Use [QuickJSContext.dump](QuickJSContext.md#dump) to convert to a native object.
Calling this method will allocate more memory inside the runtime. The information
is accurate as of just before the call to `computeMemoryUsage`.
For a human-digestible representation, see [dumpMemoryUsage](QuickJSRuntime.md#dumpmemoryusage).

#### Returns

[`QuickJSHandle`](../modules.md#quickjshandle)

#### Defined in

[ts/runtime.ts:295](https://github.com/justjake/quickjs-emscripten/blob/main/ts/runtime.ts#L295)

___

### dispose

▸ **dispose**(): `void`

Dispose of the underlying resources used by this object.

#### Returns

`void`

#### Implementation of

[Disposable](../interfaces/Disposable.md).[dispose](../interfaces/Disposable.md#dispose)

#### Defined in

[ts/runtime.ts:130](https://github.com/justjake/quickjs-emscripten/blob/main/ts/runtime.ts#L130)

___

### dumpMemoryUsage

▸ **dumpMemoryUsage**(): `string`

#### Returns

`string`

a human-readable description of memory usage in this runtime.
For programmatic access to this information, see [computeMemoryUsage](QuickJSRuntime.md#computememoryusage).

#### Defined in

[ts/runtime.ts:306](https://github.com/justjake/quickjs-emscripten/blob/main/ts/runtime.ts#L306)

___

### executePendingJobs

▸ **executePendingJobs**(`maxJobsToExecute?`): [`ExecutePendingJobsResult`](../modules.md#executependingjobsresult)

Execute pendingJobs on the runtime until `maxJobsToExecute` jobs are
executed (default all pendingJobs), the queue is exhausted, or the runtime
encounters an exception.

In QuickJS, promises and async functions *inside the runtime* create
pendingJobs. These do not execute immediately and need to triggered to run.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `maxJobsToExecute` | `number` \| `void` | `-1` | When negative, run all pending jobs. Otherwise execute at most `maxJobsToExecute` before returning. |

#### Returns

[`ExecutePendingJobsResult`](../modules.md#executependingjobsresult)

On success, the number of executed jobs. On error, the exception
that stopped execution, and the context it occurred in. Note that
executePendingJobs will not normally return errors thrown inside async
functions or rejected promises. Those errors are available by calling
[resolvePromise](QuickJSContext.md#resolvepromise) on the promise handle returned by the async function.

#### Defined in

[ts/runtime.ts:240](https://github.com/justjake/quickjs-emscripten/blob/main/ts/runtime.ts#L240)

___

### hasPendingJob

▸ **hasPendingJob**(): `boolean`

In QuickJS, promises and async functions create pendingJobs. These do not execute
immediately and need to be run by calling [executePendingJobs](QuickJSRuntime.md#executependingjobs).

#### Returns

`boolean`

true if there is at least one pendingJob queued up.

#### Defined in

[ts/runtime.ts:191](https://github.com/justjake/quickjs-emscripten/blob/main/ts/runtime.ts#L191)

___

### newContext

▸ **newContext**(`options?`): [`QuickJSContext`](QuickJSContext.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ContextOptions`](../interfaces/ContextOptions.md) |

#### Returns

[`QuickJSContext`](QuickJSContext.md)

#### Defined in

[ts/runtime.ts:134](https://github.com/justjake/quickjs-emscripten/blob/main/ts/runtime.ts#L134)

___

### removeInterruptHandler

▸ **removeInterruptHandler**(): `void`

Remove the interrupt handler, if any.
See [setInterruptHandler](QuickJSRuntime.md#setinterrupthandler).

#### Returns

`void`

#### Defined in

[ts/runtime.ts:216](https://github.com/justjake/quickjs-emscripten/blob/main/ts/runtime.ts#L216)

___

### removeModuleLoader

▸ **removeModuleLoader**(): `void`

Remove the the loader set by [setModuleLoader](QuickJSRuntime.md#setmoduleloader). This disables module loading.

#### Returns

`void`

#### Defined in

[ts/runtime.ts:178](https://github.com/justjake/quickjs-emscripten/blob/main/ts/runtime.ts#L178)

___

### setInterruptHandler

▸ **setInterruptHandler**(`cb`): `void`

Set a callback which is regularly called by the QuickJS engine when it is
executing code. This callback can be used to implement an execution
timeout.

The interrupt handler can be removed with [removeInterruptHandler](QuickJSRuntime.md#removeinterrupthandler).

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | [`InterruptHandler`](../modules.md#interrupthandler) |

#### Returns

`void`

#### Defined in

[ts/runtime.ts:204](https://github.com/justjake/quickjs-emscripten/blob/main/ts/runtime.ts#L204)

___

### setMaxStackSize

▸ **setMaxStackSize**(`stackSize`): `void`

Set the max stack size for this runtime, in bytes.
To remove the limit, set to `0`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `stackSize` | `number` |

#### Returns

`void`

#### Defined in

[ts/runtime.ts:314](https://github.com/justjake/quickjs-emscripten/blob/main/ts/runtime.ts#L314)

___

### setMemoryLimit

▸ **setMemoryLimit**(`limitBytes`): `void`

Set the max memory this runtime can allocate.
To remove the limit, set to `-1`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `limitBytes` | `number` |

#### Returns

`void`

#### Defined in

[ts/runtime.ts:280](https://github.com/justjake/quickjs-emscripten/blob/main/ts/runtime.ts#L280)

___

### setModuleLoader

▸ **setModuleLoader**(`moduleLoader`, `moduleNormalizer?`): `void`

Set the loader for EcmaScript modules requested by any context in this
runtime.

The loader can be removed with [removeModuleLoader](QuickJSRuntime.md#removemoduleloader).

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleLoader` | [`JSModuleLoader`](../interfaces/JSModuleLoader.md) |
| `moduleNormalizer?` | [`JSModuleNormalizer`](../interfaces/JSModuleNormalizer.md) |

#### Returns

`void`

#### Defined in

[ts/runtime.ts:169](https://github.com/justjake/quickjs-emscripten/blob/main/ts/runtime.ts#L169)
