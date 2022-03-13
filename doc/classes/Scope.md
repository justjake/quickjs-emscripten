[quickjs-emscripten](../README.md) / [Exports](../modules.md) / Scope

# Class: Scope

Scope helps reduce the burden of manually tracking and disposing of
Lifetimes. See [withScope](Scope.md#withscope). and [withScopeAsync](Scope.md#withscopeasync).

## Implements

- [`Disposable`](../interfaces/Disposable.md)

## Table of contents

### Constructors

- [constructor](Scope.md#constructor)

### Accessors

- [alive](Scope.md#alive)

### Methods

- [dispose](Scope.md#dispose)
- [manage](Scope.md#manage)
- [withScope](Scope.md#withscope)
- [withScopeAsync](Scope.md#withscopeasync)
- [withScopeMaybeAsync](Scope.md#withscopemaybeasync)

## Constructors

### constructor

• **new Scope**()

## Accessors

### alive

• `get` **alive**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[Disposable](../interfaces/Disposable.md).[alive](../interfaces/Disposable.md#alive)

#### Defined in

[ts/lifetime.ts:261](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L261)

## Methods

### dispose

▸ **dispose**(): `void`

Dispose of the underlying resources used by this object.

#### Returns

`void`

#### Implementation of

[Disposable](../interfaces/Disposable.md).[dispose](../interfaces/Disposable.md#dispose)

#### Defined in

[ts/lifetime.ts:265](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L265)

___

### manage

▸ **manage**<`T`\>(`lifetime`): `T`

Track `lifetime` so that it is disposed when this scope is disposed.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Disposable`](../interfaces/Disposable.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `lifetime` | `T` |

#### Returns

`T`

#### Defined in

[ts/lifetime.ts:256](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L256)

___

### withScope

▸ `Static` **withScope**<`R`\>(`block`): `R`

Run `block` with a new Scope instance that will be disposed after the block returns.
Inside `block`, call `scope.manage` on each lifetime you create to have the lifetime
automatically disposed after the block returns.

**`warning`** Do not use with async functions. Instead, use [withScopeAsync](Scope.md#withscopeasync).

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `block` | (`scope`: [`Scope`](Scope.md)) => `R` |

#### Returns

`R`

#### Defined in

[ts/lifetime.ts:205](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L205)

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
| `block` | (`scope`: [`Scope`](Scope.md)) => `Promise`<`R`\> |

#### Returns

`Promise`<`R`\>

#### Defined in

[ts/lifetime.ts:238](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L238)

___

### withScopeMaybeAsync

▸ `Static` **withScopeMaybeAsync**<`R`\>(`block`): `R` \| `Promise`<`R`\>

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `block` | (`scope`: [`Scope`](Scope.md)) => `R` \| `Promise`<`R`\> |

#### Returns

`R` \| `Promise`<`R`\>

#### Defined in

[ts/lifetime.ts:218](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L218)
