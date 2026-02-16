[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../README.md) / QuickJSAsyncWASMModule

# Class: QuickJSAsyncWASMModule

Defined in: [packages/quickjs-emscripten-core/src/module-asyncify.ts:23](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module-asyncify.ts#L23)

Asyncified version of [QuickJSWASMModule](QuickJSWASMModule.md).

Due to limitations of Emscripten's ASYNCIFY process, only a single async
function call can happen at a time across the entire WebAssembly module.

That means that all runtimes, contexts, functions, etc created inside this
WebAssembly are limited to a single concurrent async action.
**Multiple concurrent async actions is an error.**

To allow for multiple concurrent async actions, you must create multiple WebAssembly
modules.

## Contents

* [Extends](#extends)
* [Methods](#methods)
  * [evalCode()](#evalcode)
  * [evalCodeAsync()](#evalcodeasync)
  * [getWasmMemory()](#getwasmmemory)
  * [newContext()](#newcontext)
  * [newRuntime()](#newruntime)

## Extends

* [`QuickJSWASMModule`](QuickJSWASMModule.md)

## Methods

### evalCode()

> **evalCode**(): `never`

Defined in: [packages/quickjs-emscripten-core/src/module-asyncify.ts:76](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module-asyncify.ts#L76)

Synchronous evalCode is not supported.

#### Returns

`never`

#### Overrides

[`QuickJSWASMModule`](QuickJSWASMModule.md).[`evalCode`](QuickJSWASMModule.md#evalcode)

***

### evalCodeAsync()

> **evalCodeAsync**(`code`, `options`): `Promise`<`unknown`>

Defined in: [packages/quickjs-emscripten-core/src/module-asyncify.ts:91](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module-asyncify.ts#L91)

One-off evaluate code without needing to create a [QuickJSAsyncRuntime](QuickJSAsyncRuntime.md) or
[QuickJSAsyncContext](QuickJSAsyncContext.md) explicitly.

This version allows for asynchronous Ecmascript module loading.

Note that only a single async action can occur at a time inside the entire WebAssembly module.
**Multiple concurrent async actions is an error.**

See the documentation for [QuickJSWASMModule#evalCode](QuickJSWASMModule.md#evalcode) for more details.

#### Parameters

##### code

`string`

##### options

[`ModuleEvalOptions`](../interfaces/ModuleEvalOptions.md)

#### Returns

`Promise`<`unknown`>

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

#### Inherited from

[`QuickJSWASMModule`](QuickJSWASMModule.md).[`getWasmMemory`](QuickJSWASMModule.md#getwasmmemory)

***

### newContext()

> **newContext**(`options?`): [`QuickJSAsyncContext`](QuickJSAsyncContext.md)

Defined in: [packages/quickjs-emscripten-core/src/module-asyncify.ts:67](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module-asyncify.ts#L67)

A simplified API to create a new [QuickJSAsyncRuntime](QuickJSAsyncRuntime.md) and a
[QuickJSAsyncContext](QuickJSAsyncContext.md) inside that runtime at the same time. The runtime will
be disposed when the context is disposed.

#### Parameters

##### options?

[`ContextOptions`](../interfaces/ContextOptions.md) = `{}`

#### Returns

[`QuickJSAsyncContext`](QuickJSAsyncContext.md)

#### Overrides

[`QuickJSWASMModule`](QuickJSWASMModule.md).[`newContext`](QuickJSWASMModule.md#newcontext)

***

### newRuntime()

> **newRuntime**(`options?`): [`QuickJSAsyncRuntime`](QuickJSAsyncRuntime.md)

Defined in: [packages/quickjs-emscripten-core/src/module-asyncify.ts:41](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module-asyncify.ts#L41)

Create a new async runtime inside this WebAssembly module. All runtimes inside a
module are limited to a single async call at a time. For multiple
concurrent async actions, create multiple WebAssembly modules.

#### Parameters

##### options?

[`AsyncRuntimeOptions`](../interfaces/AsyncRuntimeOptions.md) = `{}`

#### Returns

[`QuickJSAsyncRuntime`](QuickJSAsyncRuntime.md)

#### Overrides

[`QuickJSWASMModule`](QuickJSWASMModule.md).[`newRuntime`](QuickJSWASMModule.md#newruntime)
