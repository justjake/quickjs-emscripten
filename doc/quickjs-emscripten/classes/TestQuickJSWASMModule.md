[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../README.md) / TestQuickJSWASMModule

# Class: TestQuickJSWASMModule

Defined in: [packages/quickjs-emscripten-core/src/module-test.ts:18](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module-test.ts#L18)

A test wrapper of [QuickJSWASMModule](QuickJSWASMModule.md) that keeps a reference to each
context or runtime created.

Call [disposeAll](#disposeall) to reset these sets and calls `dispose` on any left alive
(which may throw an error).

Call [assertNoMemoryAllocated](#assertnomemoryallocated) at the end of a test, when you expect that you've
freed all the memory you've ever allocated.

* [Implements](#implements)

* [Constructors](#constructors)

  * [Constructor](#constructor)

* [Properties](#properties)

  * [contexts](#contexts)
  * [runtimes](#runtimes)

* [Methods](#methods)

  * [assertNoMemoryAllocated()](#assertnomemoryallocated)
  * [disposeAll()](#disposeall)
  * [evalCode()](#evalcode)
  * [getWasmMemory()](#getwasmmemory)
  * [newContext()](#newcontext)
  * [newRuntime()](#newruntime)

## Implements

* `Pick`<[`QuickJSWASMModule`](QuickJSWASMModule.md), keyof [`QuickJSWASMModule`](QuickJSWASMModule.md)>

## Constructors

### Constructor

> **new TestQuickJSWASMModule**(`parent`): `TestQuickJSWASMModule`

Defined in: [packages/quickjs-emscripten-core/src/module-test.ts:21](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module-test.ts#L21)

#### Parameters

##### parent

[`QuickJSWASMModule`](QuickJSWASMModule.md)

#### Returns

`TestQuickJSWASMModule`

## Properties

### contexts

> **contexts**: `Set`<[`QuickJSContext`](QuickJSContext.md)>

Defined in: [packages/quickjs-emscripten-core/src/module-test.ts:19](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module-test.ts#L19)

***

### runtimes

> **runtimes**: `Set`<[`QuickJSRuntime`](QuickJSRuntime.md)>

Defined in: [packages/quickjs-emscripten-core/src/module-test.ts:20](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module-test.ts#L20)

## Methods

### assertNoMemoryAllocated()

> **assertNoMemoryAllocated**(): `void`

Defined in: [packages/quickjs-emscripten-core/src/module-test.ts:62](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module-test.ts#L62)

#### Returns

`void`

***

### disposeAll()

> **disposeAll**(): `void`

Defined in: [packages/quickjs-emscripten-core/src/module-test.ts:51](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module-test.ts#L51)

#### Returns

`void`

***

### evalCode()

> **evalCode**(`code`, `options?`): `unknown`

Defined in: [packages/quickjs-emscripten-core/src/module-test.ts:47](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module-test.ts#L47)

One-off evaluate code without needing to create a [QuickJSRuntime](QuickJSRuntime.md) or
[QuickJSContext](QuickJSContext.md) explicitly.

To protect against infinite loops, use the `shouldInterrupt` option. The
[shouldInterruptAfterDeadline](../functions/shouldInterruptAfterDeadline.md) function will create a time-based deadline.

If you need more control over how the code executes, create a
[QuickJSRuntime](QuickJSRuntime.md) (with [newRuntime](QuickJSWASMModule.md#newruntime)) or a [QuickJSContext](QuickJSContext.md) (with
[newContext](QuickJSWASMModule.md#newcontext) or [QuickJSRuntime#newContext](QuickJSRuntime.md#newcontext)), and use its
[QuickJSContext#evalCode](QuickJSContext.md#evalcode) method.

Asynchronous callbacks may not run during the first call to `evalCode`. If
you need to work with async code inside QuickJS, create a runtime and use
[QuickJSRuntime#executePendingJobs](QuickJSRuntime.md#executependingjobs).

#### Parameters

##### code

`string`

##### options?

[`ModuleEvalOptions`](../interfaces/ModuleEvalOptions.md)

#### Returns

`unknown`

The result is coerced to a native Javascript value using JSON
serialization, so properties and values unsupported by JSON will be dropped.

#### Throws

If `code` throws during evaluation, the exception will be
converted into a native Javascript value and thrown.

#### Throws

if `options.shouldInterrupt` interrupted execution, will throw a Error
with name `"InternalError"` and  message `"interrupted"`.

#### Implementation of

[`QuickJSWASMModule`](QuickJSWASMModule.md).[`evalCode`](QuickJSWASMModule.md#evalcode)

***

### getWasmMemory()

> **getWasmMemory**(): `Memory`

Defined in: [packages/quickjs-emscripten-core/src/module-test.ts:79](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module-test.ts#L79)

**`Experimental`**

Retrieve the WebAssembly memory used by this QuickJS module.
Use this access very carefully - you are responsible for safe interaction with the memory.

To supply a custom, pre-initialized memory to QuickJS, create a new variant
and provide the [CustomizeVariantOptions#wasmMemory](../interfaces/CustomizeVariantOptions.md#wasmmemory) option.

#### Returns

`Memory`

#### Implementation of

[`QuickJSWASMModule`](QuickJSWASMModule.md).[`getWasmMemory`](QuickJSWASMModule.md#getwasmmemory)

***

### newContext()

> **newContext**(`options?`): [`QuickJSContext`](QuickJSContext.md)

Defined in: [packages/quickjs-emscripten-core/src/module-test.ts:35](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module-test.ts#L35)

A simplified API to create a new [QuickJSRuntime](QuickJSRuntime.md) and a
[QuickJSContext](QuickJSContext.md) inside that runtime at the same time. The runtime will
be disposed when the context is disposed.

#### Parameters

##### options?

[`ContextOptions`](../interfaces/ContextOptions.md)

#### Returns

[`QuickJSContext`](QuickJSContext.md)

#### Implementation of

[`QuickJSWASMModule`](QuickJSWASMModule.md).[`newContext`](QuickJSWASMModule.md#newcontext)

***

### newRuntime()

> **newRuntime**(`options?`): [`QuickJSRuntime`](QuickJSRuntime.md)

Defined in: [packages/quickjs-emscripten-core/src/module-test.ts:23](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module-test.ts#L23)

Create a runtime.
Use the runtime to set limits on CPU and memory usage and configure module
loading for one or more [QuickJSContext](QuickJSContext.md)s inside the runtime.

#### Parameters

##### options?

[`RuntimeOptions`](../interfaces/RuntimeOptions.md)

#### Returns

[`QuickJSRuntime`](QuickJSRuntime.md)

#### Implementation of

[`QuickJSWASMModule`](QuickJSWASMModule.md).[`newRuntime`](QuickJSWASMModule.md#newruntime)
