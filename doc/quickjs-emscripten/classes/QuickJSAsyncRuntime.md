[quickjs-emscripten](../../packages.md) • **quickjs-emscripten** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../exports.md) / QuickJSAsyncRuntime

# Class: QuickJSAsyncRuntime

## Contents

- [Extends](QuickJSAsyncRuntime.md#extends)
- [Properties](QuickJSAsyncRuntime.md#properties)
  - [context](QuickJSAsyncRuntime.md#context)
- [Accessors](QuickJSAsyncRuntime.md#accessors)
  - [alive](QuickJSAsyncRuntime.md#alive)
- [Methods](QuickJSAsyncRuntime.md#methods)
  - [assertOwned()](QuickJSAsyncRuntime.md#assertowned)
  - [computeMemoryUsage()](QuickJSAsyncRuntime.md#computememoryusage)
  - [dispose()](QuickJSAsyncRuntime.md#dispose)
  - [dumpMemoryUsage()](QuickJSAsyncRuntime.md#dumpmemoryusage)
  - [executePendingJobs()](QuickJSAsyncRuntime.md#executependingjobs)
  - [hasPendingJob()](QuickJSAsyncRuntime.md#haspendingjob)
  - [newContext()](QuickJSAsyncRuntime.md#newcontext)
  - [removeInterruptHandler()](QuickJSAsyncRuntime.md#removeinterrupthandler)
  - [removeModuleLoader()](QuickJSAsyncRuntime.md#removemoduleloader)
  - [setInterruptHandler()](QuickJSAsyncRuntime.md#setinterrupthandler)
  - [setMaxStackSize()](QuickJSAsyncRuntime.md#setmaxstacksize)
  - [setMemoryLimit()](QuickJSAsyncRuntime.md#setmemorylimit)
  - [setModuleLoader()](QuickJSAsyncRuntime.md#setmoduleloader)

## Extends

- `QuickJSRuntime`

## Properties

### context

> **context**: `undefined` \| [`QuickJSAsyncContext`](QuickJSAsyncContext.md)

#### Overrides

`QuickJSRuntime.context`

#### Source

quickjs-emscripten-core/dist/index.d.ts:272

## Accessors

### alive

> **`get`** **alive**(): `boolean`

#### Returns

`boolean`

#### Source

quickjs-emscripten-core/dist/index.d.ts:186

## Methods

### assertOwned()

> **assertOwned**(`handle`): `void`

Assert that `handle` is owned by this runtime.

#### Parameters

• **handle**: [`QuickJSHandle`](../exports.md#quickjshandle)

#### Returns

`void`

#### Inherited from

`QuickJSRuntime.assertOwned`

#### Throws

QuickJSWrongOwner if owned by a different runtime.

#### Source

quickjs-emscripten-core/dist/index.d.ts:266

***

### computeMemoryUsage()

> **computeMemoryUsage**(): [`QuickJSHandle`](../exports.md#quickjshandle)

Compute memory usage for this runtime. Returns the result as a handle to a
JSValue object. Use [[QuickJSContext.dump]] to convert to a native object.
Calling this method will allocate more memory inside the runtime. The information
is accurate as of just before the call to `computeMemoryUsage`.
For a human-digestible representation, see [[dumpMemoryUsage]].

#### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

#### Inherited from

`QuickJSRuntime.computeMemoryUsage`

#### Source

quickjs-emscripten-core/dist/index.d.ts:251

***

### dispose()

> **dispose**(): `void`

#### Returns

`void`

#### Inherited from

`QuickJSRuntime.dispose`

#### Source

quickjs-emscripten-core/dist/index.d.ts:187

***

### dumpMemoryUsage()

> **dumpMemoryUsage**(): `string`

#### Returns

`string`

a human-readable description of memory usage in this runtime.
For programmatic access to this information, see [[computeMemoryUsage]].

#### Inherited from

`QuickJSRuntime.dumpMemoryUsage`

#### Source

quickjs-emscripten-core/dist/index.d.ts:256

***

### executePendingJobs()

> **executePendingJobs**(`maxJobsToExecute`?): [`ExecutePendingJobsResult`](../exports.md#executependingjobsresult)

Execute pendingJobs on the runtime until `maxJobsToExecute` jobs are
executed (default all pendingJobs), the queue is exhausted, or the runtime
encounters an exception.

In QuickJS, promises and async functions *inside the runtime* create
pendingJobs. These do not execute immediately and need to triggered to run.

#### Parameters

• **maxJobsToExecute?**: `number` \| `void`

When negative, run all pending jobs. Otherwise execute
at most `maxJobsToExecute` before returning.

#### Returns

[`ExecutePendingJobsResult`](../exports.md#executependingjobsresult)

On success, the number of executed jobs. On error, the exception
that stopped execution, and the context it occurred in. Note that
executePendingJobs will not normally return errors thrown inside async
functions or rejected promises. Those errors are available by calling
[[resolvePromise]] on the promise handle returned by the async function.

#### Inherited from

`QuickJSRuntime.executePendingJobs`

#### Source

quickjs-emscripten-core/dist/index.d.ts:238

***

### hasPendingJob()

> **hasPendingJob**(): `boolean`

In QuickJS, promises and async functions create pendingJobs. These do not execute
immediately and need to be run by calling [[executePendingJobs]].

#### Returns

`boolean`

true if there is at least one pendingJob queued up.

#### Inherited from

`QuickJSRuntime.hasPendingJob`

#### Source

quickjs-emscripten-core/dist/index.d.ts:206

***

### newContext()

> **newContext**(`options`?): [`QuickJSAsyncContext`](QuickJSAsyncContext.md)

#### Parameters

• **options?**: [`ContextOptions`](../interfaces/ContextOptions.md)

#### Returns

[`QuickJSAsyncContext`](QuickJSAsyncContext.md)

#### Overrides

`QuickJSRuntime.newContext`

#### Source

quickjs-emscripten-core/dist/index.d.ts:290

***

### removeInterruptHandler()

> **removeInterruptHandler**(): `void`

Remove the interrupt handler, if any.
See [[setInterruptHandler]].

#### Returns

`void`

#### Inherited from

`QuickJSRuntime.removeInterruptHandler`

#### Source

quickjs-emscripten-core/dist/index.d.ts:220

***

### removeModuleLoader()

> **removeModuleLoader**(): `void`

Remove the the loader set by [[setModuleLoader]]. This disables module loading.

#### Returns

`void`

#### Inherited from

`QuickJSRuntime.removeModuleLoader`

#### Source

quickjs-emscripten-core/dist/index.d.ts:199

***

### setInterruptHandler()

> **setInterruptHandler**(`cb`): `void`

Set a callback which is regularly called by the QuickJS engine when it is
executing code. This callback can be used to implement an execution
timeout.

The interrupt handler can be removed with [[removeInterruptHandler]].

#### Parameters

• **cb**: [`InterruptHandler`](../exports.md#interrupthandler)

#### Returns

`void`

#### Inherited from

`QuickJSRuntime.setInterruptHandler`

#### Source

quickjs-emscripten-core/dist/index.d.ts:215

***

### setMaxStackSize()

> **setMaxStackSize**(`stackSize`): `void`

Set the max stack size for this runtime in bytes.
To remove the limit, set to `0`.

Setting this limit also adjusts the global `ASYNCIFY_STACK_SIZE` for the entire [QuickJSAsyncWASMModule](QuickJSAsyncWASMModule.md).
See the [pull request](https://github.com/justjake/quickjs-emscripten/pull/114) for more details.

#### Parameters

• **stackSize**: `number`

#### Returns

`void`

#### Overrides

`QuickJSRuntime.setMaxStackSize`

#### Source

quickjs-emscripten-core/dist/index.d.ts:299

***

### setMemoryLimit()

> **setMemoryLimit**(`limitBytes`): `void`

Set the max memory this runtime can allocate.
To remove the limit, set to `-1`.

#### Parameters

• **limitBytes**: `number`

#### Returns

`void`

#### Inherited from

`QuickJSRuntime.setMemoryLimit`

#### Source

quickjs-emscripten-core/dist/index.d.ts:243

***

### setModuleLoader()

> **setModuleLoader**(`moduleLoader`, `moduleNormalizer`?): `void`

#### Parameters

• **moduleLoader**: [`JSModuleLoaderAsync`](../interfaces/JSModuleLoaderAsync.md)

• **moduleNormalizer?**: [`JSModuleNormalizerAsync`](../interfaces/JSModuleNormalizerAsync.md)

#### Returns

`void`

#### Overrides

`QuickJSRuntime.setModuleLoader`

#### Source

quickjs-emscripten-core/dist/index.d.ts:291

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
