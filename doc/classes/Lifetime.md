[quickjs-emscripten](../README.md) / [Exports](../modules.md) / Lifetime

# Class: Lifetime<T, TCopy, Owner\>

A lifetime prevents access to a value after the lifetime has been
[dispose](Lifetime.md#dispose)ed.

Typically, quickjs-emscripten uses Lifetimes to protect C memory pointers.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `TCopy` | `never` |
| `Owner` | `never` |

## Hierarchy

- **`Lifetime`**

  ↳ [`StaticLifetime`](StaticLifetime.md)

  ↳ [`WeakLifetime`](WeakLifetime.md)

## Implements

- [`Disposable`](../interfaces/Disposable.md)

## Table of contents

### Constructors

- [constructor](Lifetime.md#constructor)

### Properties

- [\_alive](Lifetime.md#_alive)
- [\_constructorStack](Lifetime.md#_constructorstack)
- [\_owner](Lifetime.md#_owner)
- [\_value](Lifetime.md#_value)
- [copier](Lifetime.md#copier)
- [disposer](Lifetime.md#disposer)

### Accessors

- [alive](Lifetime.md#alive)
- [dupable](Lifetime.md#dupable)
- [owner](Lifetime.md#owner)
- [value](Lifetime.md#value)

### Methods

- [consume](Lifetime.md#consume)
- [dispose](Lifetime.md#dispose)
- [dup](Lifetime.md#dup)

## Constructors

### constructor

• **new Lifetime**<`T`, `TCopy`, `Owner`\>(`_value`, `copier?`, `disposer?`, `_owner?`)

When the Lifetime is disposed, it will call `disposer(_value)`. Use the
disposer function to implement whatever cleanup needs to happen at the end
of `value`'s lifetime.

`_owner` is not used or controlled by the lifetime. It's just metadata for
the creator.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `TCopy` | `never` |
| `Owner` | `never` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `_value` | `T` |
| `copier?` | (`value`: `T` \| `TCopy`) => `TCopy` |
| `disposer?` | (`value`: `T` \| `TCopy`) => `void` |
| `_owner?` | `Owner` |

#### Defined in

[ts/lifetime.ts:42](https://github.com/justjake/quickjs-emscripten/blob/main/ts/lifetime.ts#L42)

## Properties

### \_alive

• `Protected` **\_alive**: `boolean` = `true`

#### Defined in

[ts/lifetime.ts:31](https://github.com/justjake/quickjs-emscripten/blob/main/ts/lifetime.ts#L31)

___

### \_constructorStack

• `Protected` **\_constructorStack**: `undefined` \| `string`

#### Defined in

[ts/lifetime.ts:32](https://github.com/justjake/quickjs-emscripten/blob/main/ts/lifetime.ts#L32)

___

### \_owner

• `Protected` `Optional` `Readonly` **\_owner**: `Owner`

___

### \_value

• `Protected` `Readonly` **\_value**: `T`

___

### copier

• `Protected` `Optional` `Readonly` **copier**: (`value`: `T` \| `TCopy`) => `TCopy`

#### Type declaration

▸ (`value`): `TCopy`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` \| `TCopy` |

##### Returns

`TCopy`

___

### disposer

• `Protected` `Optional` `Readonly` **disposer**: (`value`: `T` \| `TCopy`) => `void`

#### Type declaration

▸ (`value`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` \| `TCopy` |

##### Returns

`void`

## Accessors

### alive

• `get` **alive**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[Disposable](../interfaces/Disposable.md).[alive](../interfaces/Disposable.md#alive)

#### Defined in

[ts/lifetime.ts:49](https://github.com/justjake/quickjs-emscripten/blob/main/ts/lifetime.ts#L49)

___

### dupable

• `get` **dupable**(): `boolean`

#### Returns

`boolean`

#### Defined in

[ts/lifetime.ts:68](https://github.com/justjake/quickjs-emscripten/blob/main/ts/lifetime.ts#L68)

___

### owner

• `get` **owner**(): `undefined` \| `Owner`

#### Returns

`undefined` \| `Owner`

#### Defined in

[ts/lifetime.ts:64](https://github.com/justjake/quickjs-emscripten/blob/main/ts/lifetime.ts#L64)

___

### value

• `get` **value**(): `T`

The value this Lifetime protects. You must never retain the value - it
may become invalid, leading to memory errors.

**`throws`** If the lifetime has been [dispose](Lifetime.md#dispose)d already.

#### Returns

`T`

#### Defined in

[ts/lifetime.ts:59](https://github.com/justjake/quickjs-emscripten/blob/main/ts/lifetime.ts#L59)

## Methods

### consume

▸ **consume**<`O`\>(`map`): `O`

Call `map` with this lifetime, then dispose the lifetime.

#### Type parameters

| Name |
| :------ |
| `O` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `map` | (`lifetime`: [`Lifetime`](Lifetime.md)<`T`, `TCopy`, `Owner`\>) => `O` |

#### Returns

`O`

the result of `map(this)`.

#### Defined in

[ts/lifetime.ts:92](https://github.com/justjake/quickjs-emscripten/blob/main/ts/lifetime.ts#L92)

▸ **consume**<`O`\>(`map`): `O`

#### Type parameters

| Name |
| :------ |
| `O` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `map` | (`lifetime`: [`QuickJSHandle`](../modules.md#quickjshandle)) => `O` |

#### Returns

`O`

#### Defined in

[ts/lifetime.ts:95](https://github.com/justjake/quickjs-emscripten/blob/main/ts/lifetime.ts#L95)

___

### dispose

▸ **dispose**(): `void`

Dispose of [value](Lifetime.md#value) and perform cleanup.

#### Returns

`void`

#### Implementation of

[Disposable](../interfaces/Disposable.md).[dispose](../interfaces/Disposable.md#dispose)

#### Defined in

[ts/lifetime.ts:106](https://github.com/justjake/quickjs-emscripten/blob/main/ts/lifetime.ts#L106)

___

### dup

▸ **dup**(): [`Lifetime`](Lifetime.md)<`TCopy`, `TCopy`, `Owner`\>

Create a new handle pointing to the same [value](Lifetime.md#value).

#### Returns

[`Lifetime`](Lifetime.md)<`TCopy`, `TCopy`, `Owner`\>

#### Defined in

[ts/lifetime.ts:75](https://github.com/justjake/quickjs-emscripten/blob/main/ts/lifetime.ts#L75)
