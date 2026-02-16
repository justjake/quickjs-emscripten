[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../README.md) / JSModuleNormalizer

# Interface: JSModuleNormalizer()

Defined in: [packages/quickjs-emscripten-core/src/types.ts:99](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L99)

## Extends

- [`JSModuleNormalizerAsync`](JSModuleNormalizerAsync.md)

## Call Signature

> **JSModuleNormalizer**(`baseModuleName`, `requestedName`, `vm`): [`JSModuleNormalizeResult`](../README.md#jsmodulenormalizeresult)

Defined in: [packages/quickjs-emscripten-core/src/types.ts:100](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L100)

### Parameters

#### baseModuleName

`string`

#### requestedName

`string`

#### vm

[`QuickJSContext`](../classes/QuickJSContext.md)

### Returns

[`JSModuleNormalizeResult`](../README.md#jsmodulenormalizeresult)

## Call Signature

> **JSModuleNormalizer**(`baseModuleName`, `requestedName`, `vm`): [`JSModuleNormalizeResult`](../README.md#jsmodulenormalizeresult) \| `Promise`\<[`JSModuleNormalizeResult`](../README.md#jsmodulenormalizeresult)\>

Defined in: [packages/quickjs-emscripten-core/src/types.ts:99](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L99)

### Parameters

#### baseModuleName

`string`

#### requestedName

`string`

#### vm

[`QuickJSAsyncContext`](../classes/QuickJSAsyncContext.md)

### Returns

[`JSModuleNormalizeResult`](../README.md#jsmodulenormalizeresult) \| `Promise`\<[`JSModuleNormalizeResult`](../README.md#jsmodulenormalizeresult)\>
