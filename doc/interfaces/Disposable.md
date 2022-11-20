[quickjs-emscripten](../README.md) / [Exports](../modules.md) / Disposable

# Interface: Disposable

An object that can be disposed.
[Lifetime](../classes/Lifetime.md) is the canonical implementation of Disposable.
Use [Scope](../classes/Scope.md) to manage cleaning up multiple disposables.

## Implemented by

- [`Lifetime`](../classes/Lifetime.md)
- [`QuickJSContext`](../classes/QuickJSContext.md)
- [`QuickJSDeferredPromise`](../classes/QuickJSDeferredPromise.md)
- [`QuickJSRuntime`](../classes/QuickJSRuntime.md)
- [`Scope`](../classes/Scope.md)

## Table of contents

### Properties

- [alive](Disposable.md#alive)

### Methods

- [dispose](Disposable.md#dispose)

## Properties

### alive

• **alive**: `boolean`

**`returns`** true if the object is alive

**`returns`** false after the object has been [dispose](Disposable.md#dispose)d

#### Defined in

[ts/lifetime.ts:21](https://github.com/justjake/quickjs-emscripten/blob/main/ts/lifetime.ts#L21)

## Methods

### dispose

▸ **dispose**(): `void`

Dispose of the underlying resources used by this object.

#### Returns

`void`

#### Defined in

[ts/lifetime.ts:15](https://github.com/justjake/quickjs-emscripten/blob/main/ts/lifetime.ts#L15)
