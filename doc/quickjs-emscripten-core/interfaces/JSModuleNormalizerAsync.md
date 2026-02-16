[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../README.md) / JSModuleNormalizerAsync

# Interface: JSModuleNormalizerAsync()

Defined in: [packages/quickjs-emscripten-core/src/types.ts:92](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L92)

* [Extended by](#extended-by)

* [Parameters](#parameters)

  * [baseModuleName](#basemodulename)
  * [requestedName](#requestedname)
  * [vm](#vm)

* [Returns](#returns)

## Extended by

* [`JSModuleNormalizer`](JSModuleNormalizer.md)

> **JSModuleNormalizerAsync**(`baseModuleName`, `requestedName`, `vm`): [`JSModuleNormalizeResult`](../type-aliases/JSModuleNormalizeResult.md) | `Promise`<[`JSModuleNormalizeResult`](../type-aliases/JSModuleNormalizeResult.md)>

Defined in: [packages/quickjs-emscripten-core/src/types.ts:93](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L93)

## Parameters

### baseModuleName

`string`

### requestedName

`string`

### vm

[`QuickJSAsyncContext`](../classes/QuickJSAsyncContext.md)

## Returns

[`JSModuleNormalizeResult`](../type-aliases/JSModuleNormalizeResult.md) | `Promise`<[`JSModuleNormalizeResult`](../type-aliases/JSModuleNormalizeResult.md)>
