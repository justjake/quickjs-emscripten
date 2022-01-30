[quickjs-emscripten](../README.md) / [Exports](../modules.md) / [lifetime](../modules/lifetime.md) / Lifetime

# Class: Lifetime<T, TCopy, Owner\>

[lifetime](../modules/lifetime.md).Lifetime

A lifetime prevents access to a value after the lifetime has been
[dispose](lifetime.Lifetime.md#dispose)ed.

Typically, quickjs-emscripten uses Lifetimes to protect C memory pointers.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `TCopy` | `never` |
| `Owner` | `never` |

## Hierarchy

- **`Lifetime`**

  ↳ [`StaticLifetime`](lifetime.StaticLifetime.md)

  ↳ [`WeakLifetime`](lifetime.WeakLifetime.md)

## Implements

- [`Disposable`](../interfaces/lifetime.Disposable.md)

## Table of contents

### Constructors

- [constructor](lifetime.Lifetime.md#constructor)

### Properties

- [\_alive](lifetime.Lifetime.md#_alive)
- [\_owner](lifetime.Lifetime.md#_owner)
- [\_value](lifetime.Lifetime.md#_value)
- [copier](lifetime.Lifetime.md#copier)
- [disposer](lifetime.Lifetime.md#disposer)

### Accessors

- [alive](lifetime.Lifetime.md#alive)
- [dupable](lifetime.Lifetime.md#dupable)
- [owner](lifetime.Lifetime.md#owner)
- [value](lifetime.Lifetime.md#value)

### Methods

- [consume](lifetime.Lifetime.md#consume)
- [dispose](lifetime.Lifetime.md#dispose)
- [dup](lifetime.Lifetime.md#dup)

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

[lifetime.ts:38](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L38)

## Properties

### \_alive

• `Protected` **\_alive**: `boolean` = `true`

#### Defined in

[lifetime.ts:28](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L28)

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

[Disposable](../interfaces/lifetime.Disposable.md).[alive](../interfaces/lifetime.Disposable.md#alive)

#### Defined in

[lifetime.ts:45](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L45)

___

### dupable

• `get` **dupable**(): `boolean`

#### Returns

`boolean`

#### Defined in

[lifetime.ts:64](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L64)

___

### owner

• `get` **owner**(): `undefined` \| `Owner`

#### Returns

`undefined` \| `Owner`

#### Defined in

[lifetime.ts:60](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L60)

___

### value

• `get` **value**(): `T`

The value this Lifetime protects. You must never retain the value - it
may become invalid, leading to memory errors.

**`throws`** If the lifetime has been [dispose](lifetime.Lifetime.md#dispose)d already.

#### Returns

`T`

#### Defined in

[lifetime.ts:55](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L55)

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
| `map` | (`lifetime`: [`Lifetime`](lifetime.Lifetime.md)<`T`, `TCopy`, `Owner`\>) => `O` |

#### Returns

`O`

the result of `map(this)`.

#### Defined in

[lifetime.ts:88](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L88)

▸ **consume**<`O`\>(`map`): `O`

#### Type parameters

| Name |
| :------ |
| `O` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `map` | (`lifetime`: [`QuickJSHandle`](../modules/quickjsvm.md#quickjshandle)) => `O` |

#### Returns

`O`

#### Defined in

[lifetime.ts:91](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L91)

___

### dispose

▸ **dispose**(): `void`

Dispose of [value](lifetime.Lifetime.md#value) and perform cleanup.

#### Returns

`void`

#### Implementation of

[Disposable](../interfaces/lifetime.Disposable.md).[dispose](../interfaces/lifetime.Disposable.md#dispose)

#### Defined in

[lifetime.ts:102](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L102)

___

### dup

▸ **dup**(): [`Lifetime`](lifetime.Lifetime.md)<`TCopy`, `TCopy`, `Owner`\>

Create a new handle pointing to the same [value](lifetime.Lifetime.md#value).

#### Returns

[`Lifetime`](lifetime.Lifetime.md)<`TCopy`, `TCopy`, `Owner`\>

#### Defined in

[lifetime.ts:71](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L71)
