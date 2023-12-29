[quickjs-emscripten](../../packages.md) • **quickjs-emscripten-core** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../exports.md) / Disposable

# Interface: Disposable

An object that can be disposed.
[Lifetime](../classes/Lifetime.md) is the canonical implementation of Disposable.
Use [Scope](../classes/Scope.md) to manage cleaning up multiple disposables.

## Contents

- [Properties](Disposable.md#properties)
  - [alive](Disposable.md#alive)
- [Methods](Disposable.md#methods)
  - [`[dispose]`()](Disposable.md#dispose)
  - [dispose()](Disposable.md#dispose)

## Properties

### alive

> **alive**: `boolean`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:25](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L25)

## Methods

### `[dispose]`()

> **[dispose]**(): `void`

A method that is used to release resources held by an object. Called by the semantics of the `using` statement.

#### Returns

`void`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:30](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L30)

***

### dispose()

> **dispose**(): `void`

Dispose of the underlying resources used by this object.

#### Returns

`void`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:19](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L19)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
