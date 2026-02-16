[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../README.md) / DisposableArray

# Type Alias: DisposableArray\<T>

> **DisposableArray**<`T`> = `T`\[] & [`Disposable`](../interfaces/Disposable.md)

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:354](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L354)

An `Array` that also implements [Disposable](../interfaces/Disposable.md):

* Considered [Disposable#alive](../interfaces/Disposable.md#alive) if any of its elements are `alive`.
* When [Disposable#dispose](../interfaces/Disposable.md#dispose-1)d, it will dispose of all its elements that are `alive`.

## Contents

* [Type Parameters](#type-parameters)
  * [T](#t)

## Type Parameters

### T

`T`
