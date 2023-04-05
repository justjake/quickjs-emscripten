[quickjs-emscripten](../README.md) / [Exports](../modules.md) / QuickJSWASMModule

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

## Hierarchy

- **`QuickJSWASMModule`**

  ↳ [`QuickJSAsyncWASMModule`](QuickJSAsyncWASMModule.md)

## Table of contents

### Methods

- [evalCode](QuickJSWASMModule.md#evalcode)
- [newContext](QuickJSWASMModule.md#newcontext)
- [newRuntime](QuickJSWASMModule.md#newruntime)

## Methods

### evalCode

▸ **evalCode**(`code`, `options?`): `unknown`

One-off evaluate code without needing to create a [QuickJSRuntime](QuickJSRuntime.md) or
[QuickJSContext](QuickJSContext.md) explicitly.

To protect against infinite loops, use the `shouldInterrupt` option. The
[shouldInterruptAfterDeadline](../modules.md#shouldinterruptafterdeadline) function will create a time-based deadline.

If you need more control over how the code executes, create a
[QuickJSRuntime](QuickJSRuntime.md) (with [newRuntime](QuickJSWASMModule.md#newruntime)) or a [QuickJSContext](QuickJSContext.md) (with
[newContext](QuickJSWASMModule.md#newcontext) or [QuickJSRuntime.newContext](QuickJSRuntime.md#newcontext)), and use its
[QuickJSContext.evalCode](QuickJSContext.md#evalcode) method.

Asynchronous callbacks may not run during the first call to `evalCode`. If
you need to work with async code inside QuickJS, create a runtime and use
[QuickJSRuntime.executePendingJobs](QuickJSRuntime.md#executependingjobs).

**`throws`** If `code` throws during evaluation, the exception will be
converted into a native Javascript value and thrown.

**`throws`** if `options.shouldInterrupt` interrupted execution, will throw a Error
with name `"InternalError"` and  message `"interrupted"`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `string` |
| `options` | [`ModuleEvalOptions`](../interfaces/ModuleEvalOptions.md) |

#### Returns

`unknown`

The result is coerced to a native Javascript value using JSON
serialization, so properties and values unsupported by JSON will be dropped.

#### Defined in

[ts/module.ts:400](https://github.com/justjake/quickjs-emscripten/blob/main/ts/module.ts#L400)

___

### newContext

▸ **newContext**(`options?`): [`QuickJSContext`](QuickJSContext.md)

A simplified API to create a new [QuickJSRuntime](QuickJSRuntime.md) and a
[QuickJSContext](QuickJSContext.md) inside that runtime at the same time. The runtime will
be disposed when the context is disposed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ContextOptions`](../interfaces/ContextOptions.md) |

#### Returns

[`QuickJSContext`](QuickJSContext.md)

#### Defined in

[ts/module.ts:365](https://github.com/justjake/quickjs-emscripten/blob/main/ts/module.ts#L365)

___

### newRuntime

▸ **newRuntime**(`options?`): [`QuickJSRuntime`](QuickJSRuntime.md)

Create a runtime.
Use the runtime to set limits on CPU and memory usage and configure module
loading for one or more [QuickJSContext](QuickJSContext.md)s inside the runtime.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`RuntimeOptions`](../interfaces/RuntimeOptions.md) |

#### Returns

[`QuickJSRuntime`](QuickJSRuntime.md)

#### Defined in

[ts/module.ts:338](https://github.com/justjake/quickjs-emscripten/blob/main/ts/module.ts#L338)
