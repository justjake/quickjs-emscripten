[quickjs-emscripten](../README.md) / [Exports](../modules.md) / QuickJSAsyncRuntime

# Class: QuickJSAsyncRuntime

## Hierarchy

- [`QuickJSRuntime`](QuickJSRuntime.md)

  ↳ **`QuickJSAsyncRuntime`**

## Table of contents

### Properties

- [context](QuickJSAsyncRuntime.md#context)

### Accessors

- [alive](QuickJSAsyncRuntime.md#alive)

### Methods

- [assertOwned](QuickJSAsyncRuntime.md#assertowned)
- [computeMemoryUsage](QuickJSAsyncRuntime.md#computememoryusage)
- [dispose](QuickJSAsyncRuntime.md#dispose)
- [dumpMemoryUsage](QuickJSAsyncRuntime.md#dumpmemoryusage)
- [executePendingJobs](QuickJSAsyncRuntime.md#executependingjobs)
- [hasPendingJob](QuickJSAsyncRuntime.md#haspendingjob)
- [newContext](QuickJSAsyncRuntime.md#newcontext)
- [removeInterruptHandler](QuickJSAsyncRuntime.md#removeinterrupthandler)
- [removeModuleLoader](QuickJSAsyncRuntime.md#removemoduleloader)
- [setInterruptHandler](QuickJSAsyncRuntime.md#setinterrupthandler)
- [setMemoryLimit](QuickJSAsyncRuntime.md#setmemorylimit)
- [setModuleLoader](QuickJSAsyncRuntime.md#setmoduleloader)

## Properties

### context

• **context**: `undefined` \| [`QuickJSAsyncContext`](QuickJSAsyncContext.md)

If this runtime was created as as part of a context, points to the context
associated with the runtime.

If this runtime was created stand-alone, this may or may not contain a context.
A context here may be allocated if one is needed by the runtime, eg for [computeMemoryUsage](QuickJSAsyncRuntime.md#computememoryusage).

#### Overrides

[QuickJSRuntime](QuickJSRuntime.md).[context](QuickJSRuntime.md#context)

#### Defined in

[ts/runtime-asyncify.ts:11](https://github.com/justjake/quickjs-emscripten/blob/master/ts/runtime-asyncify.ts#L11)

## Accessors

### alive

• `get` **alive**(): `boolean`

#### Returns

`boolean`

#### Inherited from

QuickJSRuntime.alive

#### Defined in

[ts/runtime.ts:112](https://github.com/justjake/quickjs-emscripten/blob/master/ts/runtime.ts#L112)

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

#### Inherited from

[QuickJSRuntime](QuickJSRuntime.md).[assertOwned](QuickJSRuntime.md#assertowned)

#### Defined in

[ts/runtime.ts:298](https://github.com/justjake/quickjs-emscripten/blob/master/ts/runtime.ts#L298)

___

### computeMemoryUsage

▸ **computeMemoryUsage**(): [`QuickJSHandle`](../modules.md#quickjshandle)

Compute memory usage for this runtime. Returns the result as a handle to a
JSValue object. Use [QuickJSContext.dump](QuickJSContext.md#dump) to convert to a native object.
Calling this method will allocate more memory inside the runtime. The information
is accurate as of just before the call to `computeMemoryUsage`.
For a human-digestible representation, see [dumpMemoryUsage](QuickJSAsyncRuntime.md#dumpmemoryusage).

#### Returns

[`QuickJSHandle`](../modules.md#quickjshandle)

#### Inherited from

[QuickJSRuntime](QuickJSRuntime.md).[computeMemoryUsage](QuickJSRuntime.md#computememoryusage)

#### Defined in

[ts/runtime.ts:279](https://github.com/justjake/quickjs-emscripten/blob/master/ts/runtime.ts#L279)

___

### dispose

▸ **dispose**(): `void`

Dispose of the underlying resources used by this object.

#### Returns

`void`

#### Inherited from

[QuickJSRuntime](QuickJSRuntime.md).[dispose](QuickJSRuntime.md#dispose)

#### Defined in

[ts/runtime.ts:116](https://github.com/justjake/quickjs-emscripten/blob/master/ts/runtime.ts#L116)

___

### dumpMemoryUsage

▸ **dumpMemoryUsage**(): `string`

#### Returns

`string`

a human-readable description of memory usage in this runtime.
For programmatic access to this information, see [computeMemoryUsage](QuickJSAsyncRuntime.md#computememoryusage).

#### Inherited from

[QuickJSRuntime](QuickJSRuntime.md).[dumpMemoryUsage](QuickJSRuntime.md#dumpmemoryusage)

#### Defined in

[ts/runtime.ts:290](https://github.com/justjake/quickjs-emscripten/blob/master/ts/runtime.ts#L290)

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
| `maxJobsToExecute` | `number` | `-1` | When negative, run all pending jobs. Otherwise execute at most `maxJobsToExecute` before returning. |

#### Returns

[`ExecutePendingJobsResult`](../modules.md#executependingjobsresult)

On success, the number of executed jobs. On error, the exception
that stopped execution, and the context it occurred in. Note that
executePendingJobs will not normally return errors thrown inside async
functions or rejected promises. Those errors are available by calling
[resolvePromise](QuickJSContext.md#resolvepromise) on the promise handle returned by the async function.

#### Inherited from

[QuickJSRuntime](QuickJSRuntime.md).[executePendingJobs](QuickJSRuntime.md#executependingjobs)

#### Defined in

[ts/runtime.ts:225](https://github.com/justjake/quickjs-emscripten/blob/master/ts/runtime.ts#L225)

___

### hasPendingJob

▸ **hasPendingJob**(): `boolean`

In QuickJS, promises and async functions create pendingJobs. These do not execute
immediately and need to be run by calling [executePendingJobs](QuickJSAsyncRuntime.md#executependingjobs).

#### Returns

`boolean`

true if there is at least one pendingJob queued up.

#### Inherited from

[QuickJSRuntime](QuickJSRuntime.md).[hasPendingJob](QuickJSRuntime.md#haspendingjob)

#### Defined in

[ts/runtime.ts:176](https://github.com/justjake/quickjs-emscripten/blob/master/ts/runtime.ts#L176)

___

### newContext

▸ **newContext**(`options?`): [`QuickJSAsyncContext`](QuickJSAsyncContext.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ContextOptions`](../interfaces/ContextOptions.md) |

#### Returns

[`QuickJSAsyncContext`](QuickJSAsyncContext.md)

#### Overrides

[QuickJSRuntime](QuickJSRuntime.md).[newContext](QuickJSRuntime.md#newcontext)

#### Defined in

[ts/runtime-asyncify.ts:34](https://github.com/justjake/quickjs-emscripten/blob/master/ts/runtime-asyncify.ts#L34)

___

### removeInterruptHandler

▸ **removeInterruptHandler**(): `void`

Remove the interrupt handler, if any.
See [setInterruptHandler](QuickJSAsyncRuntime.md#setinterrupthandler).

#### Returns

`void`

#### Inherited from

[QuickJSRuntime](QuickJSRuntime.md).[removeInterruptHandler](QuickJSRuntime.md#removeinterrupthandler)

#### Defined in

[ts/runtime.ts:201](https://github.com/justjake/quickjs-emscripten/blob/master/ts/runtime.ts#L201)

___

### removeModuleLoader

▸ **removeModuleLoader**(): `void`

Remove the the loader set by [setModuleLoader](QuickJSAsyncRuntime.md#setmoduleloader). This disables module loading.

#### Returns

`void`

#### Inherited from

[QuickJSRuntime](QuickJSRuntime.md).[removeModuleLoader](QuickJSRuntime.md#removemoduleloader)

#### Defined in

[ts/runtime.ts:163](https://github.com/justjake/quickjs-emscripten/blob/master/ts/runtime.ts#L163)

___

### setInterruptHandler

▸ **setInterruptHandler**(`cb`): `void`

Set a callback which is regularly called by the QuickJS engine when it is
executing code. This callback can be used to implement an execution
timeout.

The interrupt handler can be removed with [removeInterruptHandler](QuickJSAsyncRuntime.md#removeinterrupthandler).

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | [`InterruptHandler`](../modules.md#interrupthandler) |

#### Returns

`void`

#### Inherited from

[QuickJSRuntime](QuickJSRuntime.md).[setInterruptHandler](QuickJSRuntime.md#setinterrupthandler)

#### Defined in

[ts/runtime.ts:189](https://github.com/justjake/quickjs-emscripten/blob/master/ts/runtime.ts#L189)

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

#### Inherited from

[QuickJSRuntime](QuickJSRuntime.md).[setMemoryLimit](QuickJSRuntime.md#setmemorylimit)

#### Defined in

[ts/runtime.ts:264](https://github.com/justjake/quickjs-emscripten/blob/master/ts/runtime.ts#L264)

___

### setModuleLoader

▸ **setModuleLoader**(`moduleLoader`): `void`

Set the loader for EcmasScript modules requested by any context in this
runtime.

The loader can be removed with [removeModuleLoader](QuickJSAsyncRuntime.md#removemoduleloader).

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleLoader` | [`JSModuleLoader`](../interfaces/JSModuleLoader.md) \| `JSModuleLoaderAsync` |

#### Returns

`void`

#### Overrides

[QuickJSRuntime](QuickJSRuntime.md).[setModuleLoader](QuickJSRuntime.md#setmoduleloader)

#### Defined in

[ts/runtime-asyncify.ts:59](https://github.com/justjake/quickjs-emscripten/blob/master/ts/runtime-asyncify.ts#L59)
