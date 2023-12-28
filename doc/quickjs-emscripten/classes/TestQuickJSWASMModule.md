[quickjs-emscripten](../../packages.md) • **quickjs-emscripten** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../exports.md) / TestQuickJSWASMModule

# Class: TestQuickJSWASMModule

A test wrapper of [QuickJSWASMModule](QuickJSWASMModule.md) that keeps a reference to each
context or runtime created.

Call [disposeAll](TestQuickJSWASMModule.md#disposeall) to reset these sets and calls `dispose` on any left alive
(which may throw an error).

Call [assertNoMemoryAllocated](TestQuickJSWASMModule.md#assertnomemoryallocated) at the end of a test, when you expect that you've
freed all the memory you've ever allocated.

## Contents

- [Implements](TestQuickJSWASMModule.md#implements)
- [Constructors](TestQuickJSWASMModule.md#constructors)
  - [new TestQuickJSWASMModule(parent)](TestQuickJSWASMModule.md#new-testquickjswasmmoduleparent)
- [Properties](TestQuickJSWASMModule.md#properties)
  - [contexts](TestQuickJSWASMModule.md#contexts)
  - [runtimes](TestQuickJSWASMModule.md#runtimes)
- [Methods](TestQuickJSWASMModule.md#methods)
  - [assertNoMemoryAllocated()](TestQuickJSWASMModule.md#assertnomemoryallocated)
  - [disposeAll()](TestQuickJSWASMModule.md#disposeall)
  - [evalCode()](TestQuickJSWASMModule.md#evalcode)
  - [newContext()](TestQuickJSWASMModule.md#newcontext)
  - [newRuntime()](TestQuickJSWASMModule.md#newruntime)

## Implements

- `Pick`\<[`QuickJSWASMModule`](QuickJSWASMModule.md), keyof [`QuickJSWASMModule`](QuickJSWASMModule.md)\>

## Constructors

### new TestQuickJSWASMModule(parent)

> **new TestQuickJSWASMModule**(`parent`): [`TestQuickJSWASMModule`](TestQuickJSWASMModule.md)

#### Parameters

• **parent**: [`QuickJSWASMModule`](QuickJSWASMModule.md)

#### Returns

[`TestQuickJSWASMModule`](TestQuickJSWASMModule.md)

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:1408

## Properties

### contexts

> **contexts**: `Set`\<[`QuickJSContext`](QuickJSContext.md)\>

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:1406

***

### runtimes

> **runtimes**: `Set`\<[`QuickJSRuntime`](QuickJSRuntime.md)\>

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:1407

## Methods

### assertNoMemoryAllocated()

> **assertNoMemoryAllocated**(): `void`

#### Returns

`void`

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:1413

***

### disposeAll()

> **disposeAll**(): `void`

#### Returns

`void`

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:1412

***

### evalCode()

> **evalCode**(`code`, `options`?): `unknown`

#### Parameters

• **code**: `string`

• **options?**: [`ModuleEvalOptions`](../interfaces/ModuleEvalOptions.md)

#### Returns

`unknown`

#### Implementation of

`Pick.evalCode`

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:1411

***

### newContext()

> **newContext**(`options`?): [`QuickJSContext`](QuickJSContext.md)

#### Parameters

• **options?**: [`ContextOptions`](../interfaces/ContextOptions.md)

#### Returns

[`QuickJSContext`](QuickJSContext.md)

#### Implementation of

`Pick.newContext`

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:1410

***

### newRuntime()

> **newRuntime**(`options`?): [`QuickJSRuntime`](QuickJSRuntime.md)

#### Parameters

• **options?**: [`RuntimeOptions`](../interfaces/RuntimeOptions.md)

#### Returns

[`QuickJSRuntime`](QuickJSRuntime.md)

#### Implementation of

`Pick.newRuntime`

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:1409

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
