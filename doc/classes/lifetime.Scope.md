[quickjs-emscripten](../README.md) / [Exports](../modules.md) / [lifetime](../modules/lifetime.md) / Scope

# Class: Scope

[lifetime](../modules/lifetime.md).Scope

Scope helps reduce the burden of manually tracking and disposing of
Lifetimes. See [withScope](lifetime.Scope.md#withscope). and [withScopeAsync](lifetime.Scope.md#withscopeasync).

## Implements

- [`Disposable`](../interfaces/lifetime.Disposable.md)

## Table of contents

### Constructors

- [constructor](lifetime.Scope.md#constructor)

### Accessors

- [alive](lifetime.Scope.md#alive)

### Methods

- [dispose](lifetime.Scope.md#dispose)
- [manage](lifetime.Scope.md#manage)
- [withScope](lifetime.Scope.md#withscope)
- [withScopeAsync](lifetime.Scope.md#withscopeasync)

## Constructors

### constructor

• **new Scope**()

## Accessors

### alive

• `get` **alive**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[Disposable](../interfaces/lifetime.Disposable.md).[alive](../interfaces/lifetime.Disposable.md#alive)

#### Defined in

[lifetime.ts:237](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L237)

## Methods

### dispose

▸ **dispose**(): `void`

Dispose of the underlying resources used by this object.

#### Returns

`void`

#### Implementation of

[Disposable](../interfaces/lifetime.Disposable.md).[dispose](../interfaces/lifetime.Disposable.md#dispose)

#### Defined in

[lifetime.ts:241](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L241)

___

### manage

▸ **manage**<`T`\>(`lifetime`): `T`

Track `lifetime` so that it is disposed when this scope is disposed.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Disposable`](../interfaces/lifetime.Disposable.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `lifetime` | `T` |

#### Returns

`T`

#### Defined in

[lifetime.ts:232](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L232)

___

### withScope

▸ `Static` **withScope**<`R`\>(`block`): `R`

Run `block` with a new Scope instance that will be disposed after the block returns.
Inside `block`, call `scope.manage` on each lifetime you create to have the lifetime
automatically disposed after the block returns.

**`warning`** Do not use with async functions. Instead, use [withScopeAsync](lifetime.Scope.md#withscopeasync).

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `block` | (`scope`: [`Scope`](lifetime.Scope.md)) => `R` |

#### Returns

`R`

#### Defined in

[lifetime.ts:195](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L195)

___

### withScopeAsync

▸ `Static` **withScopeAsync**<`R`\>(`block`): `Promise`<`R`\>

Run `block` with a new Scope instance that will be disposed after the
block's returned promise settles. Inside `block`, call `scope.manage` on each
lifetime you create to have the lifetime automatically disposed after the
block returns.

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `block` | (`scope`: [`Scope`](lifetime.Scope.md)) => `Promise`<`R`\> |

#### Returns

`Promise`<`R`\>

#### Defined in

[lifetime.ts:214](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L214)
