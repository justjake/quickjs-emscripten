[quickjs-emscripten](../README.md) › [Globals](../globals.md) › [Disposable](disposable.md)

# Interface: Disposable

An object that can be disposed.
[Lifetime](../classes/lifetime.md) is the canonical implementation of Disposable.
Use [Scope](../classes/scope.md) to manage cleaning up multiple disposables.

## Hierarchy

* **Disposable**

## Implemented by

* [Lifetime](../classes/lifetime.md)
* [QuickJSDeferredPromise](../classes/quickjsdeferredpromise.md)
* [QuickJSVm](../classes/quickjsvm.md)
* [Scope](../classes/scope.md)
* [StaticLifetime](../classes/staticlifetime.md)
* [WeakLifetime](../classes/weaklifetime.md)

## Index

### Properties

* [alive](disposable.md#alive)

### Methods

* [dispose](disposable.md#dispose)

## Properties

###  alive

• **alive**: *boolean*

*Defined in [lifetime.ts:18](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L18)*

**`returns`** true if the object is alive

**`returns`** false after the object has been [dispose](disposable.md#dispose)d

## Methods

###  dispose

▸ **dispose**(): *void*

*Defined in [lifetime.ts:12](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L12)*

Dispose of the underlying resources used by this object.

**Returns:** *void*
