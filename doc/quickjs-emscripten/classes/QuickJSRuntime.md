[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../README.md) / QuickJSRuntime

# Class: QuickJSRuntime

Defined in: [packages/quickjs-emscripten-core/src/runtime.ts:71](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L71)

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
See [newQuickJSWASMModule](../functions/newQuickJSWASMModule.md).

Implement memory and CPU constraints with [setInterruptHandler](#setinterrupthandler)
(called regularly while the interpreter runs), [setMemoryLimit](#setmemorylimit), and
[setMaxStackSize](#setmaxstacksize).
Use [computeMemoryUsage](#computememoryusage) or [dumpMemoryUsage](#dumpmemoryusage) to guide memory limit
tuning.

Configure ES module loading with [setModuleLoader](#setmoduleloader).

## Contents

* [Extends](#extends)
* [Extended by](#extended-by)
* [Implements](#implements)
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

* [`UsingDisposable`](UsingDisposable.md)

## Extended by

* [`QuickJSAsyncRuntime`](QuickJSAsyncRuntime.md)

## Implements

* [`Disposable`](../interfaces/Disposable.md)

## Properties

### context

> **context**: [`QuickJSContext`](QuickJSContext.md) | `undefined`

Defined in: [packages/quickjs-emscripten-core/src/runtime.ts:79](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L79)

If this runtime was created as as part of a context, points to the context
associated with the runtime.

If this runtime was created stand-alone, this may or may not contain a context.
A context here may be allocated if one is needed by the runtime, eg for [computeMemoryUsage](#computememoryusage).

## Accessors

### alive

#### Get Signature

> **get** **alive**(): `boolean`

Defined in: [packages/quickjs-emscripten-core/src/runtime.ts:128](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L128)

##### Returns

`boolean`

true if the object is alive

#### Implementation of

[`Disposable`](../interfaces/Disposable.md).[`alive`](../interfaces/Disposable.md#alive)

#### Overrides

[`UsingDisposable`](UsingDisposable.md).[`alive`](UsingDisposable.md#alive)

## Methods

### \[dispose]\()

> **\[dispose]**(): `void`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:47](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L47)

Just calls the standard .dispose() method of this class.

#### Returns

`void`

#### Implementation of

[`Disposable`](../interfaces/Disposable.md).[`[dispose]`](../interfaces/Disposable.md#dispose)

#### Inherited from

[`UsingDisposable`](UsingDisposable.md).[`[dispose]`](UsingDisposable.md#dispose)

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

***

### computeMemoryUsage()

> **computeMemoryUsage**(): [`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

Defined in: [packages/quickjs-emscripten-core/src/runtime.ts:299](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L299)

Compute memory usage for this runtime. Returns the result as a handle to a
JSValue object. Use [QuickJSContext#dump](QuickJSContext.md#dump) to convert to a native object.
Calling this method will allocate more memory inside the runtime. The information
is accurate as of just before the call to `computeMemoryUsage`.
For a human-digestible representation, see [dumpMemoryUsage](#dumpmemoryusage).

#### Returns

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

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

***

### dispose()

> **dispose**(): `void`

Defined in: [packages/quickjs-emscripten-core/src/runtime.ts:132](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L132)

Dispose of the underlying resources used by this object.

#### Returns

`void`

#### Implementation of

[`Disposable`](../interfaces/Disposable.md).[`dispose`](../interfaces/Disposable.md#dispose-1)

#### Overrides

[`UsingDisposable`](UsingDisposable.md).[`dispose`](UsingDisposable.md#dispose-1)

***

### dumpMemoryUsage()

> **dumpMemoryUsage**(): `string`

Defined in: [packages/quickjs-emscripten-core/src/runtime.ts:310](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L310)

#### Returns

`string`

a human-readable description of memory usage in this runtime.
For programmatic access to this information, see [computeMemoryUsage](#computememoryusage).

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

***

### hasPendingJob()

> **hasPendingJob**(): `boolean`

Defined in: [packages/quickjs-emscripten-core/src/runtime.ts:197](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L197)

In QuickJS, promises and async functions create pendingJobs. These do not execute
immediately and need to be run by calling [executePendingJobs](#executependingjobs).

#### Returns

`boolean`

true if there is at least one pendingJob queued up.

***

### isDebugMode()

> **isDebugMode**(): `boolean`

Defined in: [packages/quickjs-emscripten-core/src/runtime.ts:356](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L356)

#### Returns

`boolean`

true if debug logging is enabled

***

### newContext()

> **newContext**(`options?`): [`QuickJSContext`](QuickJSContext.md)

Defined in: [packages/quickjs-emscripten-core/src/runtime.ts:143](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L143)

Create a new context within this runtime. Contexts have isolated globals,
but you can explicitly share objects between contexts with the same
runtime.

You should dispose a created context before disposing this runtime.

#### Parameters

##### options?

[`ContextOptions`](../interfaces/ContextOptions.md) = `{}`

#### Returns

[`QuickJSContext`](QuickJSContext.md)

***

### removeInterruptHandler()

> **removeInterruptHandler**(): `void`

Defined in: [packages/quickjs-emscripten-core/src/runtime.ts:222](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L222)

Remove the interrupt handler, if any.
See [setInterruptHandler](#setinterrupthandler).

#### Returns

`void`

***

### removeModuleLoader()

> **removeModuleLoader**(): `void`

Defined in: [packages/quickjs-emscripten-core/src/runtime.ts:184](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L184)

Remove the the loader set by [setModuleLoader](#setmoduleloader). This disables module loading.

#### Returns

`void`

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

***

### setInterruptHandler()

> **setInterruptHandler**(`cb`): `void`

Defined in: [packages/quickjs-emscripten-core/src/runtime.ts:210](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L210)

Set a callback which is regularly called by the QuickJS engine when it is
executing code. This callback can be used to implement an execution
timeout.

The interrupt handler can be removed with [removeInterruptHandler](#removeinterrupthandler).

#### Parameters

##### cb

[`InterruptHandler`](../type-aliases/InterruptHandler.md)

#### Returns

`void`

***

### setMaxStackSize()

> **setMaxStackSize**(`stackSize`): `void`

Defined in: [packages/quickjs-emscripten-core/src/runtime.ts:318](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L318)

Set the max stack size for this runtime, in bytes.
To remove the limit, set to `0`.

#### Parameters

##### stackSize

`number`

#### Returns

`void`

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

***

### setModuleLoader()

> **setModuleLoader**(`moduleLoader`, `moduleNormalizer?`): `void`

Defined in: [packages/quickjs-emscripten-core/src/runtime.ts:175](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L175)

Set the loader for EcmaScript modules requested by any context in this
runtime.

The loader can be removed with [removeModuleLoader](#removemoduleloader).

#### Parameters

##### moduleLoader

[`JSModuleLoader`](../interfaces/JSModuleLoader.md)

##### moduleNormalizer?

[`JSModuleNormalizer`](../interfaces/JSModuleNormalizer.md)

#### Returns

`void`
