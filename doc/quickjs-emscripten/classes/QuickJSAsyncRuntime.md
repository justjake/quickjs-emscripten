[quickjs-emscripten](../../packages.md) • **quickjs-emscripten** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../exports.md) / QuickJSAsyncRuntime

# Class: QuickJSAsyncRuntime

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
See [newQuickJSWASMModule](../exports.md#newquickjswasmmodule).

Implement memory and CPU constraints with [setInterruptHandler](QuickJSAsyncRuntime.md#setinterrupthandler)
(called regularly while the interpreter runs), [setMemoryLimit](QuickJSAsyncRuntime.md#setmemorylimit), and
[setMaxStackSize](QuickJSAsyncRuntime.md#setmaxstacksize).
Use [computeMemoryUsage](QuickJSAsyncRuntime.md#computememoryusage) or [dumpMemoryUsage](QuickJSAsyncRuntime.md#dumpmemoryusage) to guide memory limit
tuning.

Configure ES module loading with [setModuleLoader](QuickJSAsyncRuntime.md#setmoduleloader).

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

- [`QuickJSRuntime`](QuickJSRuntime.md)

## Properties

### context

> **context**: `undefined` \| [`QuickJSAsyncContext`](QuickJSAsyncContext.md)

If this runtime was created as as part of a context, points to the context
associated with the runtime.

If this runtime was created stand-alone, this may or may not contain a context.
A context here may be allocated if one is needed by the runtime, eg for [computeMemoryUsage](QuickJSAsyncRuntime.md#computememoryusage).

#### Overrides

[`quickjs-emscripten.QuickJSRuntime.context`](QuickJSRuntime.md#context)

#### Source

quickjs-emscripten-core/dist/index.d.ts:280

## Accessors

### alive

> **`get`** **alive**(): `boolean`

#### Returns

`boolean`

true if the object is alive

false after the object has been [dispose](QuickJSAsyncRuntime.md#dispose)d

#### Source

quickjs-emscripten-core/dist/index.d.ts:187

## Methods

### assertOwned()

> **assertOwned**(`handle`): `void`

Assert that `handle` is owned by this runtime.

#### Parameters

• **handle**: [`QuickJSHandle`](../exports.md#quickjshandle)

#### Returns

`void`

#### Inherited from

[`quickjs-emscripten.QuickJSRuntime.assertOwned`](QuickJSRuntime.md#assertowned)

#### Throws

QuickJSWrongOwner if owned by a different runtime.

#### Source

quickjs-emscripten-core/dist/index.d.ts:274

***

### computeMemoryUsage()

> **computeMemoryUsage**(): [`QuickJSHandle`](../exports.md#quickjshandle)

Compute memory usage for this runtime. Returns the result as a handle to a
JSValue object. Use [QuickJSContext#dump](QuickJSContext.md#dump) to convert to a native object.
Calling this method will allocate more memory inside the runtime. The information
is accurate as of just before the call to `computeMemoryUsage`.
For a human-digestible representation, see [dumpMemoryUsage](QuickJSAsyncRuntime.md#dumpmemoryusage).

#### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

#### Inherited from

[`quickjs-emscripten.QuickJSRuntime.computeMemoryUsage`](QuickJSRuntime.md#computememoryusage)

#### Source

quickjs-emscripten-core/dist/index.d.ts:259

***

### dispose()

> **dispose**(): `void`

Dispose of the underlying resources used by this object.

#### Returns

`void`

#### Inherited from

[`quickjs-emscripten.QuickJSRuntime.dispose`](QuickJSRuntime.md#dispose)

#### Source

quickjs-emscripten-core/dist/index.d.ts:188

***

### dumpMemoryUsage()

> **dumpMemoryUsage**(): `string`

#### Returns

`string`

a human-readable description of memory usage in this runtime.
For programmatic access to this information, see [computeMemoryUsage](QuickJSAsyncRuntime.md#computememoryusage).

#### Inherited from

[`quickjs-emscripten.QuickJSRuntime.dumpMemoryUsage`](QuickJSRuntime.md#dumpmemoryusage)

#### Source

quickjs-emscripten-core/dist/index.d.ts:264

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
[QuickJSContext#resolvePromise](QuickJSContext.md#resolvepromise) on the promise handle returned by the async function.

#### Inherited from

[`quickjs-emscripten.QuickJSRuntime.executePendingJobs`](QuickJSRuntime.md#executependingjobs)

#### Source

quickjs-emscripten-core/dist/index.d.ts:246

***

### hasPendingJob()

> **hasPendingJob**(): `boolean`

In QuickJS, promises and async functions create pendingJobs. These do not execute
immediately and need to be run by calling [executePendingJobs](QuickJSAsyncRuntime.md#executependingjobs).

#### Returns

`boolean`

true if there is at least one pendingJob queued up.

#### Inherited from

[`quickjs-emscripten.QuickJSRuntime.hasPendingJob`](QuickJSRuntime.md#haspendingjob)

#### Source

quickjs-emscripten-core/dist/index.d.ts:214

***

### newContext()

> **newContext**(`options`?): [`QuickJSAsyncContext`](QuickJSAsyncContext.md)

Create a new context within this runtime. Contexts have isolated globals,
but you can explicitly share objects between contexts with the same
runtime.

You should dispose a created context before disposing this runtime.

#### Parameters

• **options?**: [`ContextOptions`](../interfaces/ContextOptions.md)

#### Returns

[`QuickJSAsyncContext`](QuickJSAsyncContext.md)

#### Overrides

[`quickjs-emscripten.QuickJSRuntime.newContext`](QuickJSRuntime.md#newcontext)

#### Source

quickjs-emscripten-core/dist/index.d.ts:298

***

### removeInterruptHandler()

> **removeInterruptHandler**(): `void`

Remove the interrupt handler, if any.
See [setInterruptHandler](QuickJSAsyncRuntime.md#setinterrupthandler).

#### Returns

`void`

#### Inherited from

[`quickjs-emscripten.QuickJSRuntime.removeInterruptHandler`](QuickJSRuntime.md#removeinterrupthandler)

#### Source

quickjs-emscripten-core/dist/index.d.ts:228

***

### removeModuleLoader()

> **removeModuleLoader**(): `void`

Remove the the loader set by [setModuleLoader](QuickJSAsyncRuntime.md#setmoduleloader). This disables module loading.

#### Returns

`void`

#### Inherited from

[`quickjs-emscripten.QuickJSRuntime.removeModuleLoader`](QuickJSRuntime.md#removemoduleloader)

#### Source

quickjs-emscripten-core/dist/index.d.ts:207

***

### setInterruptHandler()

> **setInterruptHandler**(`cb`): `void`

Set a callback which is regularly called by the QuickJS engine when it is
executing code. This callback can be used to implement an execution
timeout.

The interrupt handler can be removed with [removeInterruptHandler](QuickJSAsyncRuntime.md#removeinterrupthandler).

#### Parameters

• **cb**: [`InterruptHandler`](../exports.md#interrupthandler)

#### Returns

`void`

#### Inherited from

[`quickjs-emscripten.QuickJSRuntime.setInterruptHandler`](QuickJSRuntime.md#setinterrupthandler)

#### Source

quickjs-emscripten-core/dist/index.d.ts:223

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

[`quickjs-emscripten.QuickJSRuntime.setMaxStackSize`](QuickJSRuntime.md#setmaxstacksize)

#### Source

quickjs-emscripten-core/dist/index.d.ts:307

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

[`quickjs-emscripten.QuickJSRuntime.setMemoryLimit`](QuickJSRuntime.md#setmemorylimit)

#### Source

quickjs-emscripten-core/dist/index.d.ts:251

***

### setModuleLoader()

> **setModuleLoader**(`moduleLoader`, `moduleNormalizer`?): `void`

Set the loader for EcmaScript modules requested by any context in this
runtime.

The loader can be removed with [removeModuleLoader](QuickJSAsyncRuntime.md#removemoduleloader).

#### Parameters

• **moduleLoader**: [`JSModuleLoaderAsync`](../interfaces/JSModuleLoaderAsync.md)

• **moduleNormalizer?**: [`JSModuleNormalizerAsync`](../interfaces/JSModuleNormalizerAsync.md)

#### Returns

`void`

#### Overrides

[`quickjs-emscripten.QuickJSRuntime.setModuleLoader`](QuickJSRuntime.md#setmoduleloader)

#### Source

quickjs-emscripten-core/dist/index.d.ts:299

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
