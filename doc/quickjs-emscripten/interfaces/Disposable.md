[quickjs-emscripten](../../packages.md) • **quickjs-emscripten** • [Readme](../index.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../exports.md) / Disposable

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

quickjs-emscripten-core/dist/index.d.ts:491

## Methods

### dispose()

> **dispose**(): `void`

Dispose of the underlying resources used by this object.

#### Returns

`void`

#### Source

quickjs-emscripten-core/dist/index.d.ts:486

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
