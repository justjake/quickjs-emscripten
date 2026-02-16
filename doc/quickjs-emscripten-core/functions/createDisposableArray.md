[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../README.md) / createDisposableArray

# Function: createDisposableArray()

> **createDisposableArray**<`T`>(`items?`): [`DisposableArray`](../type-aliases/DisposableArray.md)<`T`>

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:359](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L359)

Create an array that also implements [Disposable](../interfaces/Disposable.md).

* [Type Parameters](#type-parameters)

  * [T](#t)

* [Parameters](#parameters)

  * [items?](#items)

* [Returns](#returns)

## Type Parameters

### T

`T` *extends* [`Disposable`](../interfaces/Disposable.md)

## Parameters

### items?

`Iterable`<`T`, `any`, `any`>

## Returns

[`DisposableArray`](../type-aliases/DisposableArray.md)<`T`>
