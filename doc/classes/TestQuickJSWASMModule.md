[quickjs-emscripten](../README.md) / [Exports](../modules.md) / TestQuickJSWASMModule

# Class: TestQuickJSWASMModule

A test wrapper of [QuickJSWASMModule](QuickJSWASMModule.md) that keeps a reference to each
context or runtime created.

Call [disposeAll](TestQuickJSWASMModule.md#disposeall) to reset these sets and calls `dispose` on any left alive
(which may throw an error).

Call [assertNoMemoryAllocated](TestQuickJSWASMModule.md#assertnomemoryallocated) at the end of a test, when you expect that you've
freed all the memory you've ever allocated.

## Implements

- `Pick`<[`QuickJSWASMModule`](QuickJSWASMModule.md), keyof [`QuickJSWASMModule`](QuickJSWASMModule.md)\>

## Table of contents

### Constructors

- [constructor](TestQuickJSWASMModule.md#constructor)

### Properties

- [contexts](TestQuickJSWASMModule.md#contexts)
- [runtimes](TestQuickJSWASMModule.md#runtimes)

### Methods

- [assertNoMemoryAllocated](TestQuickJSWASMModule.md#assertnomemoryallocated)
- [disposeAll](TestQuickJSWASMModule.md#disposeall)
- [evalCode](TestQuickJSWASMModule.md#evalcode)
- [newContext](TestQuickJSWASMModule.md#newcontext)
- [newRuntime](TestQuickJSWASMModule.md#newruntime)

## Constructors

### constructor

• **new TestQuickJSWASMModule**(`parent`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `parent` | [`QuickJSWASMModule`](QuickJSWASMModule.md) |

#### Defined in

[ts/module-test.ts:21](https://github.com/justjake/quickjs-emscripten/blob/main/ts/module-test.ts#L21)

## Properties

### contexts

• **contexts**: `Set`<[`QuickJSContext`](QuickJSContext.md)\>

#### Defined in

[ts/module-test.ts:19](https://github.com/justjake/quickjs-emscripten/blob/main/ts/module-test.ts#L19)

___

### runtimes

• **runtimes**: `Set`<[`QuickJSRuntime`](QuickJSRuntime.md)\>

#### Defined in

[ts/module-test.ts:20](https://github.com/justjake/quickjs-emscripten/blob/main/ts/module-test.ts#L20)

## Methods

### assertNoMemoryAllocated

▸ **assertNoMemoryAllocated**(): `void`

#### Returns

`void`

#### Defined in

[ts/module-test.ts:62](https://github.com/justjake/quickjs-emscripten/blob/main/ts/module-test.ts#L62)

___

### disposeAll

▸ **disposeAll**(): `void`

#### Returns

`void`

#### Defined in

[ts/module-test.ts:51](https://github.com/justjake/quickjs-emscripten/blob/main/ts/module-test.ts#L51)

___

### evalCode

▸ **evalCode**(`code`, `options?`): `unknown`

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `string` |
| `options?` | [`ModuleEvalOptions`](../interfaces/ModuleEvalOptions.md) |

#### Returns

`unknown`

#### Implementation of

Pick.evalCode

#### Defined in

[ts/module-test.ts:47](https://github.com/justjake/quickjs-emscripten/blob/main/ts/module-test.ts#L47)

___

### newContext

▸ **newContext**(`options?`): [`QuickJSContext`](QuickJSContext.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`ContextOptions`](../interfaces/ContextOptions.md) |

#### Returns

[`QuickJSContext`](QuickJSContext.md)

#### Implementation of

Pick.newContext

#### Defined in

[ts/module-test.ts:35](https://github.com/justjake/quickjs-emscripten/blob/main/ts/module-test.ts#L35)

___

### newRuntime

▸ **newRuntime**(`options?`): [`QuickJSRuntime`](QuickJSRuntime.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`RuntimeOptions`](../interfaces/RuntimeOptions.md) |

#### Returns

[`QuickJSRuntime`](QuickJSRuntime.md)

#### Implementation of

Pick.newRuntime

#### Defined in

[ts/module-test.ts:23](https://github.com/justjake/quickjs-emscripten/blob/main/ts/module-test.ts#L23)
