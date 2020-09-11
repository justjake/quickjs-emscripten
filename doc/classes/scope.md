[quickjs-emscripten](../README.md) › [Globals](../globals.md) › [Scope](scope.md)

# Class: Scope

Scope helps reduce the burden of manually tracking and disposing of
Lifetimes. See [withScope](scope.md#static-withscope). and [withScopeAsync](scope.md#static-withscopeasync).

## Hierarchy

* **Scope**

## Implements

* [Disposable](../interfaces/disposable.md)

## Index

### Accessors

* [alive](scope.md#alive)

### Methods

* [dispose](scope.md#dispose)
* [manage](scope.md#manage)
* [withScope](scope.md#static-withscope)
* [withScopeAsync](scope.md#static-withscopeasync)

## Accessors

###  alive

• **get alive**(): *boolean*

*Defined in [lifetime.ts:208](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L208)*

**Returns:** *boolean*

## Methods

###  dispose

▸ **dispose**(): *void*

*Implementation of [Disposable](../interfaces/disposable.md)*

*Defined in [lifetime.ts:212](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L212)*

**Returns:** *void*

___

###  manage

▸ **manage**<**T**>(`lifetime`: T): *T*

*Defined in [lifetime.ts:203](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L203)*

Track `lifetime` so that it is disposed when this scope is disposed.

**Type parameters:**

▪ **T**: *[Disposable](../interfaces/disposable.md)*

**Parameters:**

Name | Type |
------ | ------ |
`lifetime` | T |

**Returns:** *T*

___

### `Static` withScope

▸ **withScope**<**R**>(`block`: function): *R*

*Defined in [lifetime.ts:174](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L174)*

Run `block` with a new Scope instance that will be disposed after the block returns.
Inside `block`, call `scope.manage` on each lifetime you create to have the lifetime
automatically disposed after the block returns.

**`warning`** Do not use with async functions. Instead, use [withScopeAsync](scope.md#static-withscopeasync).

**Type parameters:**

▪ **R**

**Parameters:**

▪ **block**: *function*

▸ (`scope`: [Scope](scope.md)): *R*

**Parameters:**

Name | Type |
------ | ------ |
`scope` | [Scope](scope.md) |

**Returns:** *R*

___

### `Static` withScopeAsync

▸ **withScopeAsync**<**R**>(`block`: function): *Promise‹R›*

*Defined in [lifetime.ts:189](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L189)*

Run `block` with a new Scope instance that will be disposed after the
block's returned promise settles. Inside `block`, call `scope.manage` on each
lifetime you create to have the lifetime automatically disposed after the
block returns.

**Type parameters:**

▪ **R**

**Parameters:**

▪ **block**: *function*

▸ (`scope`: [Scope](scope.md)): *Promise‹R›*

**Parameters:**

Name | Type |
------ | ------ |
`scope` | [Scope](scope.md) |

**Returns:** *Promise‹R›*
