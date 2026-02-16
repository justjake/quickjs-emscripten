[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../README.md) / Disposable

# Interface: Disposable

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:13](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L13)

An object that can be disposed.
[Lifetime](../classes/Lifetime.md) is the canonical implementation of Disposable.
Use [Scope](../classes/Scope.md) to manage cleaning up multiple disposables.

## Contents

* [Properties](#properties)
  * [alive](#alive)
* [Methods](#methods)
  * [\[dispose\]()](#dispose)
  * [dispose()](#dispose-1)

## Properties

### alive

> **alive**: `boolean`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:23](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L23)

#### Returns

true if the object is alive

#### Returns

false after the object has been [dispose](#dispose-1)d

## Methods

### \[dispose]\()

> **\[dispose]**(): `void`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:28](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L28)

A method that is used to release resources held by an object. Called by the semantics of the `using` statement.

#### Returns

`void`

***

### dispose()

> **dispose**(): `void`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:17](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L17)

Dispose of the underlying resources used by this object.

#### Returns

`void`
