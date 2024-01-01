[quickjs-emscripten](../../packages.md) • **quickjs-emscripten** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../exports.md) / QuickJSAsyncWASMModule

# Class: QuickJSAsyncWASMModule

Asyncified version of [QuickJSWASMModule](QuickJSWASMModule.md).

Due to limitations of Emscripten's ASYNCIFY process, only a single async
function call can happen at a time across the entire WebAssembly module.

That means that all runtimes, contexts, functions, etc created inside this
WebAssembly are limited to a single concurrent async action.
**Multiple concurrent async actions is an error.**

To allow for multiple concurrent async actions, you must create multiple WebAssembly
modules.

## Contents

- [Extends](QuickJSAsyncWASMModule.md#extends)
- [Methods](QuickJSAsyncWASMModule.md#methods)
  - [evalCode()](QuickJSAsyncWASMModule.md#evalcode)
  - [evalCodeAsync()](QuickJSAsyncWASMModule.md#evalcodeasync)
  - [newContext()](QuickJSAsyncWASMModule.md#newcontext)
  - [newRuntime()](QuickJSAsyncWASMModule.md#newruntime)

## Extends

- [`QuickJSWASMModule`](QuickJSWASMModule.md)

## Methods

### evalCode()

> **evalCode**(): `never`

Synchronous evalCode is not supported.

#### Returns

`never`

#### Overrides

[`quickjs-emscripten.QuickJSWASMModule.evalCode`](QuickJSWASMModule.md#evalcode)

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:1300

***

### evalCodeAsync()

> **evalCodeAsync**(`code`, `options`): `Promise`\<`unknown`\>

One-off evaluate code without needing to create a [QuickJSAsyncRuntime](QuickJSAsyncRuntime.md) or
[QuickJSAsyncContext](QuickJSAsyncContext.md) explicitly.

This version allows for asynchronous Ecmascript module loading.

Note that only a single async action can occur at a time inside the entire WebAssembly module.
**Multiple concurrent async actions is an error.**

See the documentation for [QuickJSWASMModule#evalCode](QuickJSWASMModule.md#evalcode) for more details.

#### Parameters

• **code**: `string`

• **options**: [`ModuleEvalOptions`](../interfaces/ModuleEvalOptions.md)

#### Returns

`Promise`\<`unknown`\>

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:1312

***

### newContext()

> **newContext**(`options`?): [`QuickJSAsyncContext`](QuickJSAsyncContext.md)

A simplified API to create a new [QuickJSAsyncRuntime](QuickJSAsyncRuntime.md) and a
[QuickJSAsyncContext](QuickJSAsyncContext.md) inside that runtime at the same time. The runtime will
be disposed when the context is disposed.

#### Parameters

• **options?**: [`ContextOptions`](../interfaces/ContextOptions.md)

#### Returns

[`QuickJSAsyncContext`](QuickJSAsyncContext.md)

#### Overrides

[`quickjs-emscripten.QuickJSWASMModule.newContext`](QuickJSWASMModule.md#newcontext)

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:1298

***

### newRuntime()

> **newRuntime**(`options`?): [`QuickJSAsyncRuntime`](QuickJSAsyncRuntime.md)

Create a new async runtime inside this WebAssembly module. All runtimes inside a
module are limited to a single async call at a time. For multiple
concurrent async actions, create multiple WebAssembly modules.

#### Parameters

• **options?**: [`AsyncRuntimeOptions`](../interfaces/AsyncRuntimeOptions.md)

#### Returns

[`QuickJSAsyncRuntime`](QuickJSAsyncRuntime.md)

#### Overrides

[`quickjs-emscripten.QuickJSWASMModule.newRuntime`](QuickJSWASMModule.md#newruntime)

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:1292

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
