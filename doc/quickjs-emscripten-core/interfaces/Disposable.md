[quickjs-emscripten](../../packages.md) • **quickjs-emscripten-core** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../exports.md) / Disposable

# Interface: Disposable

An object that can be disposed.
[[Lifetime]] is the canonical implementation of Disposable.
Use [[Scope]] to manage cleaning up multiple disposables.

## Contents

- [Properties](Disposable.md#properties)
  - [alive](Disposable.md#alive)
- [Methods](Disposable.md#methods)
  - [dispose()](Disposable.md#dispose)

## Properties

### alive

> **alive**: `boolean`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:21](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L21)

## Methods

### dispose()

> **dispose**(): `void`

Dispose of the underlying resources used by this object.

#### Returns

`void`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:15](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L15)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
