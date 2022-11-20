[quickjs-emscripten](../README.md) / [Exports](../modules.md) / WeakLifetime

# Class: WeakLifetime<T, TCopy, Owner\>

A Lifetime that does not own its `value`. A WeakLifetime never calls its
`disposer` function, but can be `dup`ed to produce regular lifetimes that
do.

Used for function arguments.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `TCopy` | `never` |
| `Owner` | `never` |

## Hierarchy

- [`Lifetime`](Lifetime.md)<`T`, `TCopy`, `Owner`\>

  ↳ **`WeakLifetime`**

## Table of contents

### Constructors

- [constructor](WeakLifetime.md#constructor)

### Properties

- [\_alive](WeakLifetime.md#_alive)
- [\_constructorStack](WeakLifetime.md#_constructorstack)
- [\_owner](WeakLifetime.md#_owner)
- [\_value](WeakLifetime.md#_value)
- [copier](WeakLifetime.md#copier)
- [disposer](WeakLifetime.md#disposer)

### Accessors

- [alive](WeakLifetime.md#alive)
- [dupable](WeakLifetime.md#dupable)
- [owner](WeakLifetime.md#owner)
- [value](WeakLifetime.md#value)

### Methods

- [consume](WeakLifetime.md#consume)
- [dispose](WeakLifetime.md#dispose)
- [dup](WeakLifetime.md#dup)

## Constructors

### constructor

• **new WeakLifetime**<`T`, `TCopy`, `Owner`\>(`value`, `copier?`, `disposer?`, `owner?`)

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
| `value` | `T` |
| `copier?` | (`value`: `T` \| `TCopy`) => `TCopy` |
| `disposer?` | (`value`: `TCopy`) => `void` |
| `owner?` | `Owner` |

#### Overrides

[Lifetime](Lifetime.md).[constructor](Lifetime.md#constructor)

#### Defined in

[ts/lifetime.ts:156](https://github.com/justjake/quickjs-emscripten/blob/main/ts/lifetime.ts#L156)

## Properties

### \_alive

• `Protected` **\_alive**: `boolean` = `true`

#### Inherited from

[Lifetime](Lifetime.md).[_alive](Lifetime.md#_alive)

#### Defined in

[ts/lifetime.ts:31](https://github.com/justjake/quickjs-emscripten/blob/main/ts/lifetime.ts#L31)

___

### \_constructorStack

• `Protected` **\_constructorStack**: `undefined` \| `string`

#### Inherited from

[Lifetime](Lifetime.md).[_constructorStack](Lifetime.md#_constructorstack)

#### Defined in

[ts/lifetime.ts:32](https://github.com/justjake/quickjs-emscripten/blob/main/ts/lifetime.ts#L32)

___

### \_owner

• `Protected` `Optional` `Readonly` **\_owner**: `Owner`

#### Inherited from

[Lifetime](Lifetime.md).[_owner](Lifetime.md#_owner)

___

### \_value

• `Protected` `Readonly` **\_value**: `T`

#### Inherited from

[Lifetime](Lifetime.md).[_value](Lifetime.md#_value)

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

#### Inherited from

[Lifetime](Lifetime.md).[copier](Lifetime.md#copier)

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

#### Inherited from

[Lifetime](Lifetime.md).[disposer](Lifetime.md#disposer)

## Accessors

### alive

• `get` **alive**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Lifetime.alive

#### Defined in

[ts/lifetime.ts:49](https://github.com/justjake/quickjs-emscripten/blob/main/ts/lifetime.ts#L49)

___

### dupable

• `get` **dupable**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Lifetime.dupable

#### Defined in

[ts/lifetime.ts:68](https://github.com/justjake/quickjs-emscripten/blob/main/ts/lifetime.ts#L68)

___

### owner

• `get` **owner**(): `undefined` \| `Owner`

#### Returns

`undefined` \| `Owner`

#### Inherited from

Lifetime.owner

#### Defined in

[ts/lifetime.ts:64](https://github.com/justjake/quickjs-emscripten/blob/main/ts/lifetime.ts#L64)

___

### value

• `get` **value**(): `T`

The value this Lifetime protects. You must never retain the value - it
may become invalid, leading to memory errors.

**`throws`** If the lifetime has been [dispose](WeakLifetime.md#dispose)d already.

#### Returns

`T`

#### Inherited from

Lifetime.value

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
| `map` | (`lifetime`: [`WeakLifetime`](WeakLifetime.md)<`T`, `TCopy`, `Owner`\>) => `O` |

#### Returns

`O`

the result of `map(this)`.

#### Inherited from

[Lifetime](Lifetime.md).[consume](Lifetime.md#consume)

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

#### Inherited from

[Lifetime](Lifetime.md).[consume](Lifetime.md#consume)

#### Defined in

[ts/lifetime.ts:95](https://github.com/justjake/quickjs-emscripten/blob/main/ts/lifetime.ts#L95)

___

### dispose

▸ **dispose**(): `void`

Dispose of [value](WeakLifetime.md#value) and perform cleanup.

#### Returns

`void`

#### Overrides

[Lifetime](Lifetime.md).[dispose](Lifetime.md#dispose)

#### Defined in

[ts/lifetime.ts:166](https://github.com/justjake/quickjs-emscripten/blob/main/ts/lifetime.ts#L166)

___

### dup

▸ **dup**(): [`Lifetime`](Lifetime.md)<`TCopy`, `TCopy`, `Owner`\>

Create a new handle pointing to the same [value](WeakLifetime.md#value).

#### Returns

[`Lifetime`](Lifetime.md)<`TCopy`, `TCopy`, `Owner`\>

#### Inherited from

[Lifetime](Lifetime.md).[dup](Lifetime.md#dup)

#### Defined in

[ts/lifetime.ts:75](https://github.com/justjake/quickjs-emscripten/blob/main/ts/lifetime.ts#L75)
