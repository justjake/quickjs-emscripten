[quickjs-emscripten](../README.md) / [Exports](../modules.md) / [lifetime](../modules/lifetime.md) / Disposable

# Interface: Disposable

[lifetime](../modules/lifetime.md).Disposable

An object that can be disposed.
[Lifetime](../classes/lifetime.Lifetime.md) is the canonical implementation of Disposable.
Use [Scope](../classes/lifetime.Scope.md) to manage cleaning up multiple disposables.

## Implemented by

- [`Lifetime`](../classes/lifetime.Lifetime.md)
- [`QuickJSDeferredPromise`](../classes/deferred_promise.QuickJSDeferredPromise.md)
- [`QuickJSVm`](../classes/quickjsvm.QuickJSVm.md)
- [`Scope`](../classes/lifetime.Scope.md)

## Table of contents

### Properties

- [alive](lifetime.Disposable.md#alive)

### Methods

- [dispose](lifetime.Disposable.md#dispose)

## Properties

### alive

• **alive**: `boolean`

**`returns`** true if the object is alive

**`returns`** false after the object has been [dispose](lifetime.Disposable.md#dispose)d

#### Defined in

[lifetime.ts:18](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L18)

## Methods

### dispose

▸ **dispose**(): `void`

Dispose of the underlying resources used by this object.

#### Returns

`void`

#### Defined in

[lifetime.ts:12](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L12)
