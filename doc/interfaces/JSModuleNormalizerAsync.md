[quickjs-emscripten](../README.md) / [Exports](../modules.md) / JSModuleNormalizerAsync

# Interface: JSModuleNormalizerAsync

## Hierarchy

- **`JSModuleNormalizerAsync`**

  ↳ [`JSModuleNormalizer`](JSModuleNormalizer.md)

## Callable

### JSModuleNormalizerAsync

▸ **JSModuleNormalizerAsync**(`baseModuleName`, `requestedName`, `vm`): [`JSModuleNormalizeResult`](../modules.md#jsmodulenormalizeresult) \| `Promise`<[`JSModuleNormalizeResult`](../modules.md#jsmodulenormalizeresult)\>

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
