[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../README.md) / UsingDisposable

# Abstract Class: UsingDisposable

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:34](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L34)

Base abstract class that helps implement [Disposable](../interfaces/Disposable.md) by providing a default implementation of Symbol.dispose.

* [Extended by](#extended-by)

* [Implements](#implements)

* [Constructors](#constructors)

  * [Constructor](#constructor)

* [Properties](#properties)

  * [alive](#alive)

* [Methods](#methods)

  * [\[dispose\]()](#dispose)
  * [dispose()](#dispose-1)

## Extended by

* [`Lifetime`](Lifetime.md)
* [`Scope`](Scope.md)
* [`QuickJSDeferredPromise`](QuickJSDeferredPromise.md)
* [`QuickJSContext`](QuickJSContext.md)
* [`QuickJSRuntime`](QuickJSRuntime.md)

## Implements

* [`Disposable`](../interfaces/Disposable.md)

## Constructors

### Constructor

> **new UsingDisposable**(): `UsingDisposable`

#### Returns

`UsingDisposable`

## Properties

### alive

> `abstract` `readonly` **alive**: `boolean`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:39](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L39)

#### Returns

true if the object is alive

#### Returns

false after the object has been [dispose](../interfaces/Disposable.md#dispose-1)d

#### Implementation of

[`Disposable`](../interfaces/Disposable.md).[`alive`](../interfaces/Disposable.md#alive)

## Methods

### \[dispose]\()

> **\[dispose]**(): `void`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:47](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L47)

Just calls the standard .dispose() method of this class.

#### Returns

`void`

#### Implementation of

[`Disposable`](../interfaces/Disposable.md).[`[dispose]`](../interfaces/Disposable.md#dispose)

***

### dispose()

> `abstract` **dispose**(): `void`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:43](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L43)

Dispose of the underlying resources used by this object.

#### Returns

`void`

#### Implementation of

[`Disposable`](../interfaces/Disposable.md).[`dispose`](../interfaces/Disposable.md#dispose-1)
