[quickjs-emscripten](../../packages.md) • **quickjs-emscripten-core** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../exports.md) / UsingDisposable

# Class: `abstract` UsingDisposable

Base abstract class that helps implement [Disposable](../interfaces/Disposable.md) by providing a default implementation of [Symbol.dispose]([object Object]).

## Contents

- [Extended By](UsingDisposable.md#extended-by)
- [Implements](UsingDisposable.md#implements)
- [Constructors](UsingDisposable.md#constructors)
  - [new UsingDisposable(undefined)](UsingDisposable.md#new-usingdisposableundefined)
- [Properties](UsingDisposable.md#properties)
  - [`abstract` alive](UsingDisposable.md#abstract-alive)
- [Methods](UsingDisposable.md#methods)
  - [`[dispose]`()](UsingDisposable.md#dispose)
  - [`abstract` dispose()](UsingDisposable.md#abstract-dispose)

## Extended By

- [`QuickJSContext`](QuickJSContext.md)
- [`QuickJSRuntime`](QuickJSRuntime.md)
- [`Lifetime`](Lifetime.md)
- [`Scope`](Scope.md)
- [`QuickJSDeferredPromise`](QuickJSDeferredPromise.md)

## Implements

- [`Disposable`](../interfaces/Disposable.md)

## Constructors

### new UsingDisposable(undefined)

> **new UsingDisposable**(): [`UsingDisposable`](UsingDisposable.md)

#### Returns

[`UsingDisposable`](UsingDisposable.md)

## Properties

### `abstract` alive

> **`abstract`** **`readonly`** **alive**: `boolean`

#### Implementation of

[`quickjs-emscripten-core.Disposable.alive`](../interfaces/Disposable.md#alive)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:39](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L39)

## Methods

### `[dispose]`()

> **[dispose]**(): `void`

Just calls the standard .dispose() method of this class.

#### Returns

`void`

#### Implementation of

[`quickjs-emscripten-core.Disposable.[dispose]`](../interfaces/Disposable.md#dispose)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:47](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L47)

***

### `abstract` dispose()

> **`abstract`** **dispose**(): `void`

Dispose of the underlying resources used by this object.

#### Returns

`void`

#### Implementation of

[`quickjs-emscripten-core.Disposable.dispose`](../interfaces/Disposable.md#dispose-1)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:43](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L43)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
