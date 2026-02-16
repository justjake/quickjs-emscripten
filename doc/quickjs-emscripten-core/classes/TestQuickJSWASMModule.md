[quickjs-emscripten](../../packages.md) • **quickjs-emscripten-core** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../exports.md) / TestQuickJSWASMModule

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
- [Accessors](TestQuickJSWASMModule.md#accessors)
  - [features](TestQuickJSWASMModule.md#features)
- [Methods](TestQuickJSWASMModule.md#methods)
  - [assertNoMemoryAllocated()](TestQuickJSWASMModule.md#assertnomemoryallocated)
  - [disposeAll()](TestQuickJSWASMModule.md#disposeall)
  - [evalCode()](TestQuickJSWASMModule.md#evalcode)
  - [getWasmMemory()](TestQuickJSWASMModule.md#getwasmmemory)
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

[packages/quickjs-emscripten-core/src/module-test.ts:22](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module-test.ts#L22)

## Properties

### contexts

> **contexts**: `Set`\<[`QuickJSContext`](QuickJSContext.md)\>

#### Source

[packages/quickjs-emscripten-core/src/module-test.ts:20](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module-test.ts#L20)

***

### runtimes

> **runtimes**: `Set`\<[`QuickJSRuntime`](QuickJSRuntime.md)\>

#### Source

[packages/quickjs-emscripten-core/src/module-test.ts:21](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module-test.ts#L21)

## Accessors

### features

> **`get`** **features**(): [`QuickJSFeatures`](QuickJSFeatures.md)

#### Returns

[`QuickJSFeatures`](QuickJSFeatures.md)

#### Source

[packages/quickjs-emscripten-core/src/module-test.ts:89](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module-test.ts#L89)

## Methods

### assertNoMemoryAllocated()

> **assertNoMemoryAllocated**(): `void`

#### Returns

`void`

#### Source

[packages/quickjs-emscripten-core/src/module-test.ts:63](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module-test.ts#L63)

***

### disposeAll()

> **disposeAll**(): `void`

#### Returns

`void`

#### Source

[packages/quickjs-emscripten-core/src/module-test.ts:52](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module-test.ts#L52)

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

[packages/quickjs-emscripten-core/src/module-test.ts:48](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module-test.ts#L48)

***

### getWasmMemory()

> **getWasmMemory**(): `Memory`

#### Returns

`Memory`

#### Implementation of

`Pick.getWasmMemory`

#### Source

[packages/quickjs-emscripten-core/src/module-test.ts:80](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module-test.ts#L80)

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

[packages/quickjs-emscripten-core/src/module-test.ts:36](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module-test.ts#L36)

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

[packages/quickjs-emscripten-core/src/module-test.ts:24](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module-test.ts#L24)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
