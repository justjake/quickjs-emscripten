[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../README.md) / JSModuleNormalizer

# Interface: JSModuleNormalizer()

Defined in: [packages/quickjs-emscripten-core/src/types.ts:99](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L99)

* [Extends](#extends)

* [Call Signature](#call-signature)

  * [Parameters](#parameters)
  * [Returns](#returns)

* [Call Signature](#call-signature-1)

  * [Parameters](#parameters-1)
  * [Returns](#returns-1)

## Extends

* [`JSModuleNormalizerAsync`](JSModuleNormalizerAsync.md)

## Call Signature

> **JSModuleNormalizer**(`baseModuleName`, `requestedName`, `vm`): [`JSModuleNormalizeResult`](../type-aliases/JSModuleNormalizeResult.md)

Defined in: [packages/quickjs-emscripten-core/src/types.ts:100](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L100)

### Parameters

#### baseModuleName

`string`

#### requestedName

`string`

#### vm

[`QuickJSContext`](../classes/QuickJSContext.md)

### Returns

[`JSModuleNormalizeResult`](../type-aliases/JSModuleNormalizeResult.md)

## Call Signature

> **JSModuleNormalizer**(`baseModuleName`, `requestedName`, `vm`): [`JSModuleNormalizeResult`](../type-aliases/JSModuleNormalizeResult.md) | `Promise`<[`JSModuleNormalizeResult`](../type-aliases/JSModuleNormalizeResult.md)>

Defined in: [packages/quickjs-emscripten-core/src/types.ts:99](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L99)

### Parameters

#### baseModuleName

`string`

#### requestedName

`string`

#### vm

[`QuickJSAsyncContext`](../classes/QuickJSAsyncContext.md)

### Returns

[`JSModuleNormalizeResult`](../type-aliases/JSModuleNormalizeResult.md) | `Promise`<[`JSModuleNormalizeResult`](../type-aliases/JSModuleNormalizeResult.md)>
