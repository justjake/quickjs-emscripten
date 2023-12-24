[quickjs-emscripten](../../packages.md) • **quickjs-emscripten** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../exports.md) / QuickJSWASMModule

# Class: QuickJSWASMModule

This class presents a Javascript interface to QuickJS, a Javascript interpreter
that supports EcmaScript 2020 (ES2020).

It wraps a single WebAssembly module containing the QuickJS library and
associated helper C code. WebAssembly modules are completely isolated from
each other by the host's WebAssembly runtime. Separate WebAssembly modules
have the most isolation guarantees possible with this library.

The simplest way to start running code is [evalCode](QuickJSWASMModule.md#evalcode). This shortcut
method will evaluate Javascript safely and return the result as a native
Javascript value.

For more control over the execution environment, or to interact with values
inside QuickJS, create a context with [newContext](QuickJSWASMModule.md#newcontext) or a runtime with
[newRuntime](QuickJSWASMModule.md#newruntime).

## Contents

- [Extended By](QuickJSWASMModule.md#extended-by)
- [Methods](QuickJSWASMModule.md#methods)
  - [evalCode()](QuickJSWASMModule.md#evalcode)
  - [newContext()](QuickJSWASMModule.md#newcontext)
  - [newRuntime()](QuickJSWASMModule.md#newruntime)

## Extended By

- [`QuickJSAsyncWASMModule`](QuickJSAsyncWASMModule.md)

## Methods

### evalCode()

> **evalCode**(`code`, `options`?): `unknown`

One-off evaluate code without needing to create a [[QuickJSRuntime]] or
[[QuickJSContext]] explicitly.

To protect against infinite loops, use the `shouldInterrupt` option. The
[[shouldInterruptAfterDeadline]] function will create a time-based deadline.

If you need more control over how the code executes, create a
[[QuickJSRuntime]] (with [[newRuntime]]) or a [[QuickJSContext]] (with
[[newContext]] or [[QuickJSRuntime.newContext]]), and use its
[[QuickJSContext.evalCode]] method.

Asynchronous callbacks may not run during the first call to `evalCode`. If
you need to work with async code inside QuickJS, create a runtime and use
[[QuickJSRuntime.executePendingJobs]].

#### Parameters

• **code**: `string`

• **options?**: [`ModuleEvalOptions`](../interfaces/ModuleEvalOptions.md)

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

#### Source

quickjs-emscripten-core/dist/index.d.ts:1185

***

### newContext()

> **newContext**(`options`?): [`QuickJSContext`](QuickJSContext.md)

A simplified API to create a new [[QuickJSRuntime]] and a
[[QuickJSContext]] inside that runtime at the same time. The runtime will
be disposed when the context is disposed.

#### Parameters

• **options?**: [`ContextOptions`](../interfaces/ContextOptions.md)

#### Returns

[`QuickJSContext`](QuickJSContext.md)

#### Source

quickjs-emscripten-core/dist/index.d.ts:1159

***

### newRuntime()

> **newRuntime**(`options`?): `QuickJSRuntime`

Create a runtime.
Use the runtime to set limits on CPU and memory usage and configure module
loading for one or more [[QuickJSContext]]s inside the runtime.

#### Parameters

• **options?**: [`RuntimeOptions`](../interfaces/RuntimeOptions.md)

#### Returns

`QuickJSRuntime`

#### Source

quickjs-emscripten-core/dist/index.d.ts:1153

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
