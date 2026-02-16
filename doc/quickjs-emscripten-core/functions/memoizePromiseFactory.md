[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../README.md) / memoizePromiseFactory

# Function: memoizePromiseFactory()

> **memoizePromiseFactory**<`T`>(`fn`): () => `Promise`<`T`>

Defined in: [packages/quickjs-emscripten-core/src/from-variant.ts:100](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/from-variant.ts#L100)

Helper intended to memoize the creation of a WebAssembly module.

```typescript
const getDebugModule = memoizePromiseFactory(() => newQuickJSWASMModule(DEBUG_SYNC))
```

## Contents

* [Type Parameters](#type-parameters)
  * [T](#t)
* [Parameters](#parameters)
  * [fn](#fn)
* [Returns](#returns)
  * [Returns](#returns-1)

## Type Parameters

### T

`T`

## Parameters

### fn

() => `Promise`<`T`>

## Returns

> (): `Promise`<`T`>

### Returns

`Promise`<`T`>
