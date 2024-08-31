[quickjs-emscripten](../../packages.md) • **quickjs-emscripten-core** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../exports.md) / JSModuleNormalizer

# Interface: JSModuleNormalizer()

## Extends

- [`JSModuleNormalizerAsync`](JSModuleNormalizerAsync.md)

> **JSModuleNormalizer**(`baseModuleName`, `requestedName`, `vm`): [`JSModuleNormalizeResult`](../exports.md#jsmodulenormalizeresult)

## Parameters

• **baseModuleName**: `string`

• **requestedName**: `string`

• **vm**: [`QuickJSContext`](../classes/QuickJSContext.md)

## Returns

[`JSModuleNormalizeResult`](../exports.md#jsmodulenormalizeresult)

## Source

[packages/quickjs-emscripten-core/src/types.ts:100](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L100)

> **JSModuleNormalizer**(`baseModuleName`, `requestedName`, `vm`): [`JSModuleNormalizeResult`](../exports.md#jsmodulenormalizeresult) \| `Promise`\<[`JSModuleNormalizeResult`](../exports.md#jsmodulenormalizeresult)\>

## Parameters

• **baseModuleName**: `string`

• **requestedName**: `string`

• **vm**: [`QuickJSAsyncContext`](../classes/QuickJSAsyncContext.md)

## Returns

[`JSModuleNormalizeResult`](../exports.md#jsmodulenormalizeresult) \| `Promise`\<[`JSModuleNormalizeResult`](../exports.md#jsmodulenormalizeresult)\>

## Source

[packages/quickjs-emscripten-core/src/types.ts:93](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L93)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
