[quickjs-emscripten](../../packages.md) • **quickjs-emscripten-core** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../exports.md) / QuickJSAsyncRuntime

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
See newQuickJSWASMModule.

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
  - [features](QuickJSAsyncRuntime.md#features)
- [Accessors](QuickJSAsyncRuntime.md#accessors)
  - [alive](QuickJSAsyncRuntime.md#alive)
- [Methods](QuickJSAsyncRuntime.md#methods)
  - [`[dispose]`()](QuickJSAsyncRuntime.md#dispose)
  - [assertOwned()](QuickJSAsyncRuntime.md#assertowned)
  - [computeMemoryUsage()](QuickJSAsyncRuntime.md#computememoryusage)
  - [debugLog()](QuickJSAsyncRuntime.md#debuglog)
  - [dispose()](QuickJSAsyncRuntime.md#dispose)
  - [dumpMemoryUsage()](QuickJSAsyncRuntime.md#dumpmemoryusage)
  - [executePendingJobs()](QuickJSAsyncRuntime.md#executependingjobs)
  - [hasPendingJob()](QuickJSAsyncRuntime.md#haspendingjob)
  - [isDebugMode()](QuickJSAsyncRuntime.md#isdebugmode)
  - [newContext()](QuickJSAsyncRuntime.md#newcontext)
  - [removeInterruptHandler()](QuickJSAsyncRuntime.md#removeinterrupthandler)
  - [removeModuleLoader()](QuickJSAsyncRuntime.md#removemoduleloader)
  - [setDebugMode()](QuickJSAsyncRuntime.md#setdebugmode)
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

[`quickjs-emscripten-core.QuickJSRuntime.context`](QuickJSRuntime.md#context)

#### Source

[packages/quickjs-emscripten-core/src/runtime-asyncify.ts:27](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime-asyncify.ts#L27)

***

### features

> **`readonly`** **features**: [`QuickJSFeatures`](QuickJSFeatures.md)

Feature detection for this QuickJS variant.
Different builds may have different feature sets (e.g., mquickjs lacks modules, promises).

#### Inherited from

[`quickjs-emscripten-core.QuickJSRuntime.features`](QuickJSRuntime.md#features)

#### Source

[packages/quickjs-emscripten-core/src/runtime.ts:86](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L86)

## Accessors

### alive

> **`get`** **alive**(): `boolean`

#### Returns

`boolean`

true if the object is alive

false after the object has been [dispose](QuickJSAsyncRuntime.md#dispose-1)d

#### Source

[packages/quickjs-emscripten-core/src/runtime.ts:137](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L137)

## Methods

### `[dispose]`()

> **[dispose]**(): `void`

Just calls the standard .dispose() method of this class.

#### Returns

`void`

#### Inherited from

[`quickjs-emscripten-core.QuickJSRuntime.[dispose]`](QuickJSRuntime.md#dispose)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:47](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L47)

***

### assertOwned()

> **assertOwned**(`handle`): `void`

Assert that `handle` is owned by this runtime.

#### Parameters

• **handle**: [`QuickJSHandle`](../exports.md#quickjshandle)

#### Returns

`void`

#### Inherited from

[`quickjs-emscripten-core.QuickJSRuntime.assertOwned`](QuickJSRuntime.md#assertowned)

#### Throws

QuickJSWrongOwner if owned by a different runtime.

#### Source

[packages/quickjs-emscripten-core/src/runtime.ts:340](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L340)

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

[`quickjs-emscripten-core.QuickJSRuntime.computeMemoryUsage`](QuickJSRuntime.md#computememoryusage)

#### Source

[packages/quickjs-emscripten-core/src/runtime.ts:309](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L309)

***

### debugLog()

> **debugLog**(...`msg`): `void`

In debug mode, log the result of calling `msg()`.

We take a function instead of a log message to avoid expensive string
manipulation if debug logging is disabled.

#### Parameters

• ...**msg**: `unknown`[]

#### Returns

`void`

#### Inherited from

[`quickjs-emscripten-core.QuickJSRuntime.debugLog`](QuickJSRuntime.md#debuglog)

#### Source

[packages/quickjs-emscripten-core/src/runtime.ts:376](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L376)

***

### dispose()

> **dispose**(): `void`

Dispose of the underlying resources used by this object.

#### Returns

`void`

#### Inherited from

[`quickjs-emscripten-core.QuickJSRuntime.dispose`](QuickJSRuntime.md#dispose-1)

#### Source

[packages/quickjs-emscripten-core/src/runtime.ts:141](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L141)

***

### dumpMemoryUsage()

> **dumpMemoryUsage**(): `string`

#### Returns

`string`

a human-readable description of memory usage in this runtime.
For programmatic access to this information, see [computeMemoryUsage](QuickJSAsyncRuntime.md#computememoryusage).

#### Inherited from

[`quickjs-emscripten-core.QuickJSRuntime.dumpMemoryUsage`](QuickJSRuntime.md#dumpmemoryusage)

#### Source

[packages/quickjs-emscripten-core/src/runtime.ts:320](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L320)

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

#### Inherited from

[`quickjs-emscripten-core.QuickJSRuntime.executePendingJobs`](QuickJSRuntime.md#executependingjobs)

#### Source

[packages/quickjs-emscripten-core/src/runtime.ts:256](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L256)

***

### hasPendingJob()

> **hasPendingJob**(): `boolean`

In QuickJS, promises and async functions create pendingJobs. These do not execute
immediately and need to be run by calling [executePendingJobs](QuickJSAsyncRuntime.md#executependingjobs).

#### Returns

`boolean`

true if there is at least one pendingJob queued up.

#### Inherited from

[`quickjs-emscripten-core.QuickJSRuntime.hasPendingJob`](QuickJSRuntime.md#haspendingjob)

#### Source

[packages/quickjs-emscripten-core/src/runtime.ts:207](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L207)

***

### isDebugMode()

> **isDebugMode**(): `boolean`

#### Returns

`boolean`

true if debug logging is enabled

#### Inherited from

[`quickjs-emscripten-core.QuickJSRuntime.isDebugMode`](QuickJSRuntime.md#isdebugmode)

#### Source

[packages/quickjs-emscripten-core/src/runtime.ts:366](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L366)

***

### newContext()

> **newContext**(`options`): [`QuickJSAsyncContext`](QuickJSAsyncContext.md)

Create a new context within this runtime. Contexts have isolated globals,
but you can explicitly share objects between contexts with the same
runtime.

You should dispose a created context before disposing this runtime.

#### Parameters

• **options**: [`ContextOptions`](../interfaces/ContextOptions.md)= `{}`

#### Returns

[`QuickJSAsyncContext`](QuickJSAsyncContext.md)

#### Overrides

[`quickjs-emscripten-core.QuickJSRuntime.newContext`](QuickJSRuntime.md#newcontext)

#### Source

[packages/quickjs-emscripten-core/src/runtime-asyncify.ts:51](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime-asyncify.ts#L51)

***

### removeInterruptHandler()

> **removeInterruptHandler**(): `void`

Remove the interrupt handler, if any.
See [setInterruptHandler](QuickJSAsyncRuntime.md#setinterrupthandler).

#### Returns

`void`

#### Inherited from

[`quickjs-emscripten-core.QuickJSRuntime.removeInterruptHandler`](QuickJSRuntime.md#removeinterrupthandler)

#### Source

[packages/quickjs-emscripten-core/src/runtime.ts:232](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L232)

***

### removeModuleLoader()

> **removeModuleLoader**(): `void`

Remove the the loader set by [setModuleLoader](QuickJSAsyncRuntime.md#setmoduleloader). This disables module loading.

#### Returns

`void`

#### Inherited from

[`quickjs-emscripten-core.QuickJSRuntime.removeModuleLoader`](QuickJSRuntime.md#removemoduleloader)

#### Source

[packages/quickjs-emscripten-core/src/runtime.ts:194](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L194)

***

### setDebugMode()

> **setDebugMode**(`enabled`): `void`

Enable or disable debug logging.

If this module is a DEBUG variant, more logs will be printed from the C
code.

#### Parameters

• **enabled**: `boolean`

#### Returns

`void`

#### Inherited from

[`quickjs-emscripten-core.QuickJSRuntime.setDebugMode`](QuickJSRuntime.md#setdebugmode)

#### Source

[packages/quickjs-emscripten-core/src/runtime.ts:356](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L356)

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

[`quickjs-emscripten-core.QuickJSRuntime.setInterruptHandler`](QuickJSRuntime.md#setinterrupthandler)

#### Source

[packages/quickjs-emscripten-core/src/runtime.ts:220](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L220)

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

[`quickjs-emscripten-core.QuickJSRuntime.setMaxStackSize`](QuickJSRuntime.md#setmaxstacksize)

#### Source

[packages/quickjs-emscripten-core/src/runtime-asyncify.ts:94](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime-asyncify.ts#L94)

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

[`quickjs-emscripten-core.QuickJSRuntime.setMemoryLimit`](QuickJSRuntime.md#setmemorylimit)

#### Source

[packages/quickjs-emscripten-core/src/runtime.ts:294](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L294)

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

[`quickjs-emscripten-core.QuickJSRuntime.setModuleLoader`](QuickJSRuntime.md#setmoduleloader)

#### Source

[packages/quickjs-emscripten-core/src/runtime-asyncify.ts:77](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime-asyncify.ts#L77)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
