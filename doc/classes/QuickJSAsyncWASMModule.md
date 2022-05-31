[quickjs-emscripten](../README.md) / [Exports](../modules.md) / QuickJSAsyncWASMModule

# Class: QuickJSAsyncWASMModule

Asyncified version of [QuickJSWASMModule](QuickJSWASMModule.md).

Due to limitations of Emscripten's ASYNCIFY process, only a single async
function call can happen at a time across the entire WebAssembly module.

That means that all runtimes, contexts, functions, etc created inside this
WebAssembly are limited to a single concurrent async action.
**Multiple concurrent async actions is an error.**

To allow for multiple concurrent async actions, you must create multiple WebAssembly
modules.

## Hierarchy

- [`QuickJSWASMModule`](QuickJSWASMModule.md)

  ↳ **`QuickJSAsyncWASMModule`**

## Table of contents

### Methods

- [evalCode](QuickJSAsyncWASMModule.md#evalcode)
- [evalCodeAsync](QuickJSAsyncWASMModule.md#evalcodeasync)
- [newContext](QuickJSAsyncWASMModule.md#newcontext)
- [newRuntime](QuickJSAsyncWASMModule.md#newruntime)

## Methods

### evalCode

▸ **evalCode**(): `never`

Synchronous evalCode is not supported.

#### Returns

`never`

#### Overrides

[QuickJSWASMModule](QuickJSWASMModule.md).[evalCode](QuickJSWASMModule.md#evalcode)

#### Defined in

[ts/module-asyncify.ts:81](https://github.com/justjake/quickjs-emscripten/blob/main/ts/module-asyncify.ts#L81)

___

### evalCodeAsync

▸ **evalCodeAsync**(`code`, `options`): `Promise`<`unknown`\>

One-off evaluate code without needing to create a [[QuickJSRuntimeAsync]] or
[[QuickJSContextSync]] explicitly.

This version allows for asynchronous Ecmascript module loading.

Note that only a single async action can occur at a time inside the entire WebAssembly module.
**Multiple concurrent async actions is an error.**

See the documentation for [QuickJSWASMModule.evalCode](QuickJSWASMModule.md#evalcode) for more details.

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `string` |
| `options` | [`ModuleEvalOptions`](../interfaces/ModuleEvalOptions.md) |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[ts/module-asyncify.ts:96](https://github.com/justjake/quickjs-emscripten/blob/main/ts/module-asyncify.ts#L96)

___

### newContext

▸ **newContext**(`options?`): [`QuickJSAsyncContext`](QuickJSAsyncContext.md)

A simplified API to create a new [QuickJSRuntime](QuickJSRuntime.md) and a
[QuickJSContext](QuickJSContext.md) inside that runtime at the same time. The runtime will
be disposed when the context is disposed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ContextOptions`](../interfaces/ContextOptions.md) |

#### Returns

[`QuickJSAsyncContext`](QuickJSAsyncContext.md)

#### Overrides

[QuickJSWASMModule](QuickJSWASMModule.md).[newContext](QuickJSWASMModule.md#newcontext)

#### Defined in

[ts/module-asyncify.ts:72](https://github.com/justjake/quickjs-emscripten/blob/main/ts/module-asyncify.ts#L72)

___

### newRuntime

▸ **newRuntime**(`options?`): [`QuickJSAsyncRuntime`](QuickJSAsyncRuntime.md)

Create a new async runtime inside this WebAssembly module. All runtimes inside a
module are limited to a single async call at a time. For multiple
concurrent async actions, create multiple WebAssembly modules.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`AsyncRuntimeOptions`](../interfaces/AsyncRuntimeOptions.md) |

#### Returns

[`QuickJSAsyncRuntime`](QuickJSAsyncRuntime.md)

#### Overrides

[QuickJSWASMModule](QuickJSWASMModule.md).[newRuntime](QuickJSWASMModule.md#newruntime)

#### Defined in

[ts/module-asyncify.ts:46](https://github.com/justjake/quickjs-emscripten/blob/main/ts/module-asyncify.ts#L46)
