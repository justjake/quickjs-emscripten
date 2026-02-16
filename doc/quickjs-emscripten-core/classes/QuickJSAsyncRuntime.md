[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../README.md) / QuickJSAsyncRuntime

# Class: QuickJSAsyncRuntime

Defined in: [packages/quickjs-emscripten-core/src/runtime-asyncify.ts:25](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime-asyncify.ts#L25)

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

* [Extends](#extends)

* [Properties](#properties)

  * [context](#context)

* [Accessors](#accessors)

  * [alive](#alive)

* [Methods](#methods)

  * [\[dispose\]()](#dispose)
  * [assertOwned()](#assertowned)
  * [computeMemoryUsage()](#computememoryusage)
  * [debugLog()](#debuglog)
  * [dispose()](#dispose-1)
  * [dumpMemoryUsage()](#dumpmemoryusage)
  * [executePendingJobs()](#executependingjobs)
  * [hasPendingJob()](#haspendingjob)
  * [isDebugMode()](#isdebugmode)
  * [newContext()](#newcontext)
  * [removeInterruptHandler()](#removeinterrupthandler)
  * [removeModuleLoader()](#removemoduleloader)
  * [setDebugMode()](#setdebugmode)
  * [setInterruptHandler()](#setinterrupthandler)
  * [setMaxStackSize()](#setmaxstacksize)
  * [setMemoryLimit()](#setmemorylimit)
  * [setModuleLoader()](#setmoduleloader)

## Extends

* [`QuickJSRuntime`](QuickJSRuntime.md)

## Properties

### context

> **context**: [`QuickJSAsyncContext`](QuickJSAsyncContext.md) | `undefined`

Defined in: [packages/quickjs-emscripten-core/src/runtime-asyncify.ts:26](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime-asyncify.ts#L26)

If this runtime was created as as part of a context, points to the context
associated with the runtime.

If this runtime was created stand-alone, this may or may not contain a context.
A context here may be allocated if one is needed by the runtime, eg for [computeMemoryUsage](QuickJSRuntime.md#computememoryusage).

#### Overrides

[`QuickJSRuntime`](QuickJSRuntime.md).[`context`](QuickJSRuntime.md#context)

## Accessors

### alive

#### Get Signature

> **get** **alive**(): `boolean`

Defined in: [packages/quickjs-emscripten-core/src/runtime.ts:128](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L128)

##### Returns

`boolean`

true if the object is alive

#### Inherited from

[`QuickJSRuntime`](QuickJSRuntime.md).[`alive`](QuickJSRuntime.md#alive)

## Methods

### \[dispose]\()

> **\[dispose]**(): `void`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:47](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L47)

Just calls the standard .dispose() method of this class.

#### Returns

`void`

#### Inherited from

[`QuickJSRuntime`](QuickJSRuntime.md).[`[dispose]`](QuickJSRuntime.md#dispose)

***

### assertOwned()

> **assertOwned**(`handle`): `void`

Defined in: [packages/quickjs-emscripten-core/src/runtime.ts:330](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L330)

Assert that `handle` is owned by this runtime.

#### Parameters

##### handle

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

#### Returns

`void`

#### Throws

QuickJSWrongOwner if owned by a different runtime.

#### Inherited from

[`QuickJSRuntime`](QuickJSRuntime.md).[`assertOwned`](QuickJSRuntime.md#assertowned)

***

### computeMemoryUsage()

> **computeMemoryUsage**(): [`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

Defined in: [packages/quickjs-emscripten-core/src/runtime.ts:299](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L299)

Compute memory usage for this runtime. Returns the result as a handle to a
JSValue object. Use [QuickJSContext#dump](QuickJSContext.md#dump) to convert to a native object.
Calling this method will allocate more memory inside the runtime. The information
is accurate as of just before the call to `computeMemoryUsage`.
For a human-digestible representation, see [dumpMemoryUsage](QuickJSRuntime.md#dumpmemoryusage).

#### Returns

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

#### Inherited from

[`QuickJSRuntime`](QuickJSRuntime.md).[`computeMemoryUsage`](QuickJSRuntime.md#computememoryusage)

***

### debugLog()

> **debugLog**(...`msg`): `void`

Defined in: [packages/quickjs-emscripten-core/src/runtime.ts:366](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L366)

In debug mode, log the result of calling `msg()`.

We take a function instead of a log message to avoid expensive string
manipulation if debug logging is disabled.

#### Parameters

##### msg

...`unknown`\[]

#### Returns

`void`

#### Inherited from

[`QuickJSRuntime`](QuickJSRuntime.md).[`debugLog`](QuickJSRuntime.md#debuglog)

***

### dispose()

> **dispose**(): `void`

Defined in: [packages/quickjs-emscripten-core/src/runtime.ts:132](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L132)

Dispose of the underlying resources used by this object.

#### Returns

`void`

#### Inherited from

[`QuickJSRuntime`](QuickJSRuntime.md).[`dispose`](QuickJSRuntime.md#dispose-1)

***

### dumpMemoryUsage()

> **dumpMemoryUsage**(): `string`

Defined in: [packages/quickjs-emscripten-core/src/runtime.ts:310](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L310)

#### Returns

`string`

a human-readable description of memory usage in this runtime.
For programmatic access to this information, see [computeMemoryUsage](QuickJSRuntime.md#computememoryusage).

#### Inherited from

[`QuickJSRuntime`](QuickJSRuntime.md).[`dumpMemoryUsage`](QuickJSRuntime.md#dumpmemoryusage)

***

### executePendingJobs()

> **executePendingJobs**(`maxJobsToExecute?`): [`ExecutePendingJobsResult`](../type-aliases/ExecutePendingJobsResult.md)

Defined in: [packages/quickjs-emscripten-core/src/runtime.ts:246](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L246)

Execute pendingJobs on the runtime until `maxJobsToExecute` jobs are
executed (default all pendingJobs), the queue is exhausted, or the runtime
encounters an exception.

In QuickJS, promises and async functions *inside the runtime* create
pendingJobs. These do not execute immediately and need to triggered to run.

#### Parameters

##### maxJobsToExecute?

When negative, run all pending jobs. Otherwise execute
at most `maxJobsToExecute` before returning.

`number` | `void`

#### Returns

[`ExecutePendingJobsResult`](../type-aliases/ExecutePendingJobsResult.md)

On success, the number of executed jobs. On error, the exception
that stopped execution, and the context it occurred in. Note that
executePendingJobs will not normally return errors thrown inside async
functions or rejected promises. Those errors are available by calling
[QuickJSContext#resolvePromise](QuickJSContext.md#resolvepromise) on the promise handle returned by the async function.

#### Inherited from

[`QuickJSRuntime`](QuickJSRuntime.md).[`executePendingJobs`](QuickJSRuntime.md#executependingjobs)

***

### hasPendingJob()

> **hasPendingJob**(): `boolean`

Defined in: [packages/quickjs-emscripten-core/src/runtime.ts:197](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L197)

In QuickJS, promises and async functions create pendingJobs. These do not execute
immediately and need to be run by calling [executePendingJobs](QuickJSRuntime.md#executependingjobs).

#### Returns

`boolean`

true if there is at least one pendingJob queued up.

#### Inherited from

[`QuickJSRuntime`](QuickJSRuntime.md).[`hasPendingJob`](QuickJSRuntime.md#haspendingjob)

***

### isDebugMode()

> **isDebugMode**(): `boolean`

Defined in: [packages/quickjs-emscripten-core/src/runtime.ts:356](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L356)

#### Returns

`boolean`

true if debug logging is enabled

#### Inherited from

[`QuickJSRuntime`](QuickJSRuntime.md).[`isDebugMode`](QuickJSRuntime.md#isdebugmode)

***

### newContext()

> **newContext**(`options?`): [`QuickJSAsyncContext`](QuickJSAsyncContext.md)

Defined in: [packages/quickjs-emscripten-core/src/runtime-asyncify.ts:49](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime-asyncify.ts#L49)

Create a new context within this runtime. Contexts have isolated globals,
but you can explicitly share objects between contexts with the same
runtime.

You should dispose a created context before disposing this runtime.

#### Parameters

##### options?

[`ContextOptions`](../interfaces/ContextOptions.md) = `{}`

#### Returns

[`QuickJSAsyncContext`](QuickJSAsyncContext.md)

#### Overrides

[`QuickJSRuntime`](QuickJSRuntime.md).[`newContext`](QuickJSRuntime.md#newcontext)

***

### removeInterruptHandler()

> **removeInterruptHandler**(): `void`

Defined in: [packages/quickjs-emscripten-core/src/runtime.ts:222](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L222)

Remove the interrupt handler, if any.
See [setInterruptHandler](QuickJSRuntime.md#setinterrupthandler).

#### Returns

`void`

#### Inherited from

[`QuickJSRuntime`](QuickJSRuntime.md).[`removeInterruptHandler`](QuickJSRuntime.md#removeinterrupthandler)

***

### removeModuleLoader()

> **removeModuleLoader**(): `void`

Defined in: [packages/quickjs-emscripten-core/src/runtime.ts:184](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L184)

Remove the the loader set by [setModuleLoader](QuickJSRuntime.md#setmoduleloader). This disables module loading.

#### Returns

`void`

#### Inherited from

[`QuickJSRuntime`](QuickJSRuntime.md).[`removeModuleLoader`](QuickJSRuntime.md#removemoduleloader)

***

### setDebugMode()

> **setDebugMode**(`enabled`): `void`

Defined in: [packages/quickjs-emscripten-core/src/runtime.ts:346](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L346)

Enable or disable debug logging.

If this module is a DEBUG variant, more logs will be printed from the C
code.

#### Parameters

##### enabled

`boolean`

#### Returns

`void`

#### Inherited from

[`QuickJSRuntime`](QuickJSRuntime.md).[`setDebugMode`](QuickJSRuntime.md#setdebugmode)

***

### setInterruptHandler()

> **setInterruptHandler**(`cb`): `void`

Defined in: [packages/quickjs-emscripten-core/src/runtime.ts:210](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L210)

Set a callback which is regularly called by the QuickJS engine when it is
executing code. This callback can be used to implement an execution
timeout.

The interrupt handler can be removed with [removeInterruptHandler](QuickJSRuntime.md#removeinterrupthandler).

#### Parameters

##### cb

[`InterruptHandler`](../type-aliases/InterruptHandler.md)

#### Returns

`void`

#### Inherited from

[`QuickJSRuntime`](QuickJSRuntime.md).[`setInterruptHandler`](QuickJSRuntime.md#setinterrupthandler)

***

### setMaxStackSize()

> **setMaxStackSize**(`stackSize`): `void`

Defined in: [packages/quickjs-emscripten-core/src/runtime-asyncify.ts:92](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime-asyncify.ts#L92)

Set the max stack size for this runtime in bytes.
To remove the limit, set to `0`.

Setting this limit also adjusts the global `ASYNCIFY_STACK_SIZE` for the entire [QuickJSAsyncWASMModule](QuickJSAsyncWASMModule.md).
See the [pull request](https://github.com/justjake/quickjs-emscripten/pull/114) for more details.

#### Parameters

##### stackSize

`number`

#### Returns

`void`

#### Overrides

[`QuickJSRuntime`](QuickJSRuntime.md).[`setMaxStackSize`](QuickJSRuntime.md#setmaxstacksize)

***

### setMemoryLimit()

> **setMemoryLimit**(`limitBytes`): `void`

Defined in: [packages/quickjs-emscripten-core/src/runtime.ts:284](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L284)

Set the max memory this runtime can allocate.
To remove the limit, set to `-1`.

#### Parameters

##### limitBytes

`number`

#### Returns

`void`

#### Inherited from

[`QuickJSRuntime`](QuickJSRuntime.md).[`setMemoryLimit`](QuickJSRuntime.md#setmemorylimit)

***

### setModuleLoader()

> **setModuleLoader**(`moduleLoader`, `moduleNormalizer?`): `void`

Defined in: [packages/quickjs-emscripten-core/src/runtime-asyncify.ts:75](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime-asyncify.ts#L75)

Set the loader for EcmaScript modules requested by any context in this
runtime.

The loader can be removed with [removeModuleLoader](QuickJSRuntime.md#removemoduleloader).

#### Parameters

##### moduleLoader

[`JSModuleLoaderAsync`](../interfaces/JSModuleLoaderAsync.md)

##### moduleNormalizer?

[`JSModuleNormalizerAsync`](../interfaces/JSModuleNormalizerAsync.md)

#### Returns

`void`

#### Overrides

[`QuickJSRuntime`](QuickJSRuntime.md).[`setModuleLoader`](QuickJSRuntime.md#setmoduleloader)
