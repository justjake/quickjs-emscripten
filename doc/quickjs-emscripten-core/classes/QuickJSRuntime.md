[quickjs-emscripten](../../packages.md) • **quickjs-emscripten-core** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../exports.md) / QuickJSRuntime

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
See newQuickJSWASMModule.

Implement memory and CPU constraints with [setInterruptHandler](QuickJSRuntime.md#setinterrupthandler)
(called regularly while the interpreter runs), [setMemoryLimit](QuickJSRuntime.md#setmemorylimit), and
[setMaxStackSize](QuickJSRuntime.md#setmaxstacksize).
Use [computeMemoryUsage](QuickJSRuntime.md#computememoryusage) or [dumpMemoryUsage](QuickJSRuntime.md#dumpmemoryusage) to guide memory limit
tuning.

Configure ES module loading with [setModuleLoader](QuickJSRuntime.md#setmoduleloader).

## Contents

- [Extends](QuickJSRuntime.md#extends)
- [Implements](QuickJSRuntime.md#implements)
- [Properties](QuickJSRuntime.md#properties)
  - [context](QuickJSRuntime.md#context)
- [Accessors](QuickJSRuntime.md#accessors)
  - [alive](QuickJSRuntime.md#alive)
- [Methods](QuickJSRuntime.md#methods)
  - [`[dispose]`()](QuickJSRuntime.md#dispose)
  - [assertOwned()](QuickJSRuntime.md#assertowned)
  - [computeMemoryUsage()](QuickJSRuntime.md#computememoryusage)
  - [dispose()](QuickJSRuntime.md#dispose)
  - [dumpMemoryUsage()](QuickJSRuntime.md#dumpmemoryusage)
  - [executePendingJobs()](QuickJSRuntime.md#executependingjobs)
  - [hasPendingJob()](QuickJSRuntime.md#haspendingjob)
  - [newContext()](QuickJSRuntime.md#newcontext)
  - [removeInterruptHandler()](QuickJSRuntime.md#removeinterrupthandler)
  - [removeModuleLoader()](QuickJSRuntime.md#removemoduleloader)
  - [setInterruptHandler()](QuickJSRuntime.md#setinterrupthandler)
  - [setMaxStackSize()](QuickJSRuntime.md#setmaxstacksize)
  - [setMemoryLimit()](QuickJSRuntime.md#setmemorylimit)
  - [setModuleLoader()](QuickJSRuntime.md#setmoduleloader)

## Extends

- [`UsingDisposable`](UsingDisposable.md)

## Implements

- [`Disposable`](../interfaces/Disposable.md)

## Properties

### context

> **context**: `undefined` \| [`QuickJSContext`](QuickJSContext.md)

If this runtime was created as as part of a context, points to the context
associated with the runtime.

If this runtime was created stand-alone, this may or may not contain a context.
A context here may be allocated if one is needed by the runtime, eg for [computeMemoryUsage](QuickJSRuntime.md#computememoryusage).

#### Source

[packages/quickjs-emscripten-core/src/runtime.ts:79](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L79)

## Accessors

### alive

> **`get`** **alive**(): `boolean`

#### Returns

`boolean`

true if the object is alive

false after the object has been [dispose](QuickJSRuntime.md#dispose-1)d

#### Source

[packages/quickjs-emscripten-core/src/runtime.ts:122](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L122)

## Methods

### `[dispose]`()

> **[dispose]**(): `void`

Just calls the standard .dispose() method of this class.

#### Returns

`void`

#### Implementation of

[`quickjs-emscripten-core.Disposable.[dispose]`](../interfaces/Disposable.md#dispose)

#### Inherited from

[`quickjs-emscripten-core.UsingDisposable.[dispose]`](UsingDisposable.md#dispose)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:46](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L46)

***

### assertOwned()

> **assertOwned**(`handle`): `void`

Assert that `handle` is owned by this runtime.

#### Parameters

• **handle**: [`QuickJSHandle`](../exports.md#quickjshandle)

#### Returns

`void`

#### Throws

QuickJSWrongOwner if owned by a different runtime.

#### Source

[packages/quickjs-emscripten-core/src/runtime.ts:326](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L326)

***

### computeMemoryUsage()

> **computeMemoryUsage**(): [`QuickJSHandle`](../exports.md#quickjshandle)

Compute memory usage for this runtime. Returns the result as a handle to a
JSValue object. Use [QuickJSContext#dump](QuickJSContext.md#dump) to convert to a native object.
Calling this method will allocate more memory inside the runtime. The information
is accurate as of just before the call to `computeMemoryUsage`.
For a human-digestible representation, see [dumpMemoryUsage](QuickJSRuntime.md#dumpmemoryusage).

#### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

#### Source

[packages/quickjs-emscripten-core/src/runtime.ts:295](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L295)

***

### dispose()

> **dispose**(): `void`

Dispose of the underlying resources used by this object.

#### Returns

`void`

#### Implementation of

[`quickjs-emscripten-core.Disposable.dispose`](../interfaces/Disposable.md#dispose-1)

#### Overrides

[`quickjs-emscripten-core.UsingDisposable.dispose`](UsingDisposable.md#abstract-dispose)

#### Source

[packages/quickjs-emscripten-core/src/runtime.ts:126](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L126)

***

### dumpMemoryUsage()

> **dumpMemoryUsage**(): `string`

#### Returns

`string`

a human-readable description of memory usage in this runtime.
For programmatic access to this information, see [computeMemoryUsage](QuickJSRuntime.md#computememoryusage).

#### Source

[packages/quickjs-emscripten-core/src/runtime.ts:306](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L306)

***

### executePendingJobs()

> **executePendingJobs**(`maxJobsToExecute`): [`ExecutePendingJobsResult`](../exports.md#executependingjobsresult)

Execute pendingJobs on the runtime until `maxJobsToExecute` jobs are
executed (default all pendingJobs), the queue is exhausted, or the runtime
encounters an exception.

In QuickJS, promises and async functions *inside the runtime* create
pendingJobs. These do not execute immediately and need to triggered to run.

#### Parameters

• **maxJobsToExecute**: `number` \| `void`= `-1`

When negative, run all pending jobs. Otherwise execute
at most `maxJobsToExecute` before returning.

#### Returns

[`ExecutePendingJobsResult`](../exports.md#executependingjobsresult)

On success, the number of executed jobs. On error, the exception
that stopped execution, and the context it occurred in. Note that
executePendingJobs will not normally return errors thrown inside async
functions or rejected promises. Those errors are available by calling
[QuickJSContext#resolvePromise](QuickJSContext.md#resolvepromise) on the promise handle returned by the async function.

#### Source

[packages/quickjs-emscripten-core/src/runtime.ts:240](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L240)

***

### hasPendingJob()

> **hasPendingJob**(): `boolean`

In QuickJS, promises and async functions create pendingJobs. These do not execute
immediately and need to be run by calling [executePendingJobs](QuickJSRuntime.md#executependingjobs).

#### Returns

`boolean`

true if there is at least one pendingJob queued up.

#### Source

[packages/quickjs-emscripten-core/src/runtime.ts:191](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L191)

***

### newContext()

> **newContext**(`options`): [`QuickJSContext`](QuickJSContext.md)

Create a new context within this runtime. Contexts have isolated globals,
but you can explicitly share objects between contexts with the same
runtime.

You should dispose a created context before disposing this runtime.

#### Parameters

• **options**: [`ContextOptions`](../interfaces/ContextOptions.md)= `{}`

#### Returns

[`QuickJSContext`](QuickJSContext.md)

#### Source

[packages/quickjs-emscripten-core/src/runtime.ts:137](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L137)

***

### removeInterruptHandler()

> **removeInterruptHandler**(): `void`

Remove the interrupt handler, if any.
See [setInterruptHandler](QuickJSRuntime.md#setinterrupthandler).

#### Returns

`void`

#### Source

[packages/quickjs-emscripten-core/src/runtime.ts:216](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L216)

***

### removeModuleLoader()

> **removeModuleLoader**(): `void`

Remove the the loader set by [setModuleLoader](QuickJSRuntime.md#setmoduleloader). This disables module loading.

#### Returns

`void`

#### Source

[packages/quickjs-emscripten-core/src/runtime.ts:178](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L178)

***

### setInterruptHandler()

> **setInterruptHandler**(`cb`): `void`

Set a callback which is regularly called by the QuickJS engine when it is
executing code. This callback can be used to implement an execution
timeout.

The interrupt handler can be removed with [removeInterruptHandler](QuickJSRuntime.md#removeinterrupthandler).

#### Parameters

• **cb**: [`InterruptHandler`](../exports.md#interrupthandler)

#### Returns

`void`

#### Source

[packages/quickjs-emscripten-core/src/runtime.ts:204](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L204)

***

### setMaxStackSize()

> **setMaxStackSize**(`stackSize`): `void`

Set the max stack size for this runtime, in bytes.
To remove the limit, set to `0`.

#### Parameters

• **stackSize**: `number`

#### Returns

`void`

#### Source

[packages/quickjs-emscripten-core/src/runtime.ts:314](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L314)

***

### setMemoryLimit()

> **setMemoryLimit**(`limitBytes`): `void`

Set the max memory this runtime can allocate.
To remove the limit, set to `-1`.

#### Parameters

• **limitBytes**: `number`

#### Returns

`void`

#### Source

[packages/quickjs-emscripten-core/src/runtime.ts:280](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L280)

***

### setModuleLoader()

> **setModuleLoader**(`moduleLoader`, `moduleNormalizer`?): `void`

Set the loader for EcmaScript modules requested by any context in this
runtime.

The loader can be removed with [removeModuleLoader](QuickJSRuntime.md#removemoduleloader).

#### Parameters

• **moduleLoader**: [`JSModuleLoader`](../interfaces/JSModuleLoader.md)

• **moduleNormalizer?**: [`JSModuleNormalizer`](../interfaces/JSModuleNormalizer.md)

#### Returns

`void`

#### Source

[packages/quickjs-emscripten-core/src/runtime.ts:169](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L169)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
