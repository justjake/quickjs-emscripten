[quickjs-emscripten](../README.md) / [Exports](../modules.md) / JSModuleNormalizer

# Interface: JSModuleNormalizer

## Hierarchy

- [`JSModuleNormalizerAsync`](JSModuleNormalizerAsync.md)

  ↳ **`JSModuleNormalizer`**

## Callable

### JSModuleNormalizer

▸ **JSModuleNormalizer**(`baseModuleName`, `requestedName`, `vm`): [`JSModuleNormalizeResult`](../modules.md#jsmodulenormalizeresult)

#### Parameters

| Name | Type |
| :------ | :------ |
| `baseModuleName` | `string` |
| `requestedName` | `string` |
| `vm` | [`QuickJSContext`](../classes/QuickJSContext.md) |

#### Returns

[`JSModuleNormalizeResult`](../modules.md#jsmodulenormalizeresult)

#### Defined in

[ts/types.ts:97](https://github.com/justjake/quickjs-emscripten/blob/main/ts/types.ts#L97)

### JSModuleNormalizer

▸ **JSModuleNormalizer**(`baseModuleName`, `requestedName`, `vm`): [`JSModuleNormalizeResult`](../modules.md#jsmodulenormalizeresult) \| `Promise`<[`JSModuleNormalizeResult`](../modules.md#jsmodulenormalizeresult)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `baseModuleName` | `string` |
| `requestedName` | `string` |
| `vm` | [`QuickJSAsyncContext`](../classes/QuickJSAsyncContext.md) |

#### Returns

[`JSModuleNormalizeResult`](../modules.md#jsmodulenormalizeresult) \| `Promise`<[`JSModuleNormalizeResult`](../modules.md#jsmodulenormalizeresult)\>

#### Defined in

[ts/types.ts:92](https://github.com/justjake/quickjs-emscripten/blob/main/ts/types.ts#L92)
