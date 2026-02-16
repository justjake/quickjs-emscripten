[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../README.md) / QuickJSWASMModule

# Class: QuickJSWASMModule

Defined in: [packages/quickjs-emscripten-core/src/module.ts:326](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module.ts#L326)

This class presents a Javascript interface to QuickJS, a Javascript interpreter
that supports EcmaScript 2020 (ES2020).

It wraps a single WebAssembly module containing the QuickJS library and
associated helper C code. WebAssembly modules are completely isolated from
each other by the host's WebAssembly runtime. Separate WebAssembly modules
have the most isolation guarantees possible with this library.

The simplest way to start running code is [evalCode](#evalcode). This shortcut
method will evaluate Javascript safely and return the result as a native
Javascript value.

For more control over the execution environment, or to interact with values
inside QuickJS, create a context with [newContext](#newcontext) or a runtime with
[newRuntime](#newruntime).

## Contents

* [Extended by](#extended-by)
* [Methods](#methods)
  * [evalCode()](#evalcode)
  * [getWasmMemory()](#getwasmmemory)
  * [newContext()](#newcontext)
  * [newRuntime()](#newruntime)

## Extended by

* [`QuickJSAsyncWASMModule`](QuickJSAsyncWASMModule.md)

## Methods

### evalCode()

> **evalCode**(`code`, `options?`): `unknown`

Defined in: [packages/quickjs-emscripten-core/src/module.ts:410](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module.ts#L410)

One-off evaluate code without needing to create a [QuickJSRuntime](QuickJSRuntime.md) or
[QuickJSContext](QuickJSContext.md) explicitly.

To protect against infinite loops, use the `shouldInterrupt` option. The
[shouldInterruptAfterDeadline](../functions/shouldInterruptAfterDeadline.md) function will create a time-based deadline.

If you need more control over how the code executes, create a
[QuickJSRuntime](QuickJSRuntime.md) (with [newRuntime](#newruntime)) or a [QuickJSContext](QuickJSContext.md) (with
[newContext](#newcontext) or [QuickJSRuntime#newContext](QuickJSRuntime.md#newcontext)), and use its
[QuickJSContext#evalCode](QuickJSContext.md#evalcode) method.

Asynchronous callbacks may not run during the first call to `evalCode`. If
you need to work with async code inside QuickJS, create a runtime and use
[QuickJSRuntime#executePendingJobs](QuickJSRuntime.md#executependingjobs).

#### Parameters

##### code

`string`

##### options?

[`ModuleEvalOptions`](../interfaces/ModuleEvalOptions.md) = `{}`

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

***

### getWasmMemory()

> **getWasmMemory**(): `Memory`

Defined in: [packages/quickjs-emscripten-core/src/module.ts:441](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module.ts#L441)

**`Experimental`**

Retrieve the WebAssembly memory used by this QuickJS module.
Use this access very carefully - you are responsible for safe interaction with the memory.

To supply a custom, pre-initialized memory to QuickJS, create a new variant
and provide the [CustomizeVariantOptions#wasmMemory](../interfaces/CustomizeVariantOptions.md#wasmmemory) option.

#### Returns

`Memory`

***

### newContext()

> **newContext**(`options?`): [`QuickJSContext`](QuickJSContext.md)

Defined in: [packages/quickjs-emscripten-core/src/module.ts:375](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module.ts#L375)

A simplified API to create a new [QuickJSRuntime](QuickJSRuntime.md) and a
[QuickJSContext](QuickJSContext.md) inside that runtime at the same time. The runtime will
be disposed when the context is disposed.

#### Parameters

##### options?

[`ContextOptions`](../interfaces/ContextOptions.md) = `{}`

#### Returns

[`QuickJSContext`](QuickJSContext.md)

***

### newRuntime()

> **newRuntime**(`options?`): [`QuickJSRuntime`](QuickJSRuntime.md)

Defined in: [packages/quickjs-emscripten-core/src/module.ts:346](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module.ts#L346)

Create a runtime.
Use the runtime to set limits on CPU and memory usage and configure module
loading for one or more [QuickJSContext](QuickJSContext.md)s inside the runtime.

#### Parameters

##### options?

[`RuntimeOptions`](../interfaces/RuntimeOptions.md) = `{}`

#### Returns

[`QuickJSRuntime`](QuickJSRuntime.md)
