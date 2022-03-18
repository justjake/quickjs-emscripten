[quickjs-emscripten](../README.md) / [Exports](../modules.md) / JSModuleLoader

# Interface: JSModuleLoader

## Hierarchy

- `JSModuleLoaderAsync`

  ↳ **`JSModuleLoader`**

## Callable

### JSModuleLoader

▸ **JSModuleLoader**(`vm`, `moduleName`): [`JSModuleLoadResult`](../modules.md#jsmoduleloadresult)

Load module (sync)

#### Parameters

| Name | Type |
| :------ | :------ |
| `vm` | [`QuickJSContext`](../classes/QuickJSContext.md) |
| `moduleName` | `string` |

#### Returns

[`JSModuleLoadResult`](../modules.md#jsmoduleloadresult)

#### Defined in

[ts/types.ts:81](https://github.com/justjake/quickjs-emscripten/blob/master/ts/types.ts#L81)

### JSModuleLoader

▸ **JSModuleLoader**(`vm`, `moduleName`): [`JSModuleLoadResult`](../modules.md#jsmoduleloadresult) \| `Promise`<[`JSModuleLoadResult`](../modules.md#jsmoduleloadresult)\>

Load module (async)

#### Parameters

| Name | Type |
| :------ | :------ |
| `vm` | [`QuickJSAsyncContext`](../classes/QuickJSAsyncContext.md) |
| `moduleName` | `string` |

#### Returns

[`JSModuleLoadResult`](../modules.md#jsmoduleloadresult) \| `Promise`<[`JSModuleLoadResult`](../modules.md#jsmoduleloadresult)\>

#### Defined in

[ts/types.ts:77](https://github.com/justjake/quickjs-emscripten/blob/master/ts/types.ts#L77)
