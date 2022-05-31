[quickjs-emscripten](../README.md) / [Exports](../modules.md) / StaticLifetime

# Class: StaticLifetime<T, Owner\>

A Lifetime that lives forever. Used for constants.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `Owner` | `never` |

## Hierarchy

- [`Lifetime`](Lifetime.md)<`T`, `T`, `Owner`\>

  ↳ **`StaticLifetime`**

## Table of contents

### Constructors

- [constructor](StaticLifetime.md#constructor)

### Properties

- [\_alive](StaticLifetime.md#_alive)
- [\_constructorStack](StaticLifetime.md#_constructorstack)
- [\_owner](StaticLifetime.md#_owner)
- [\_value](StaticLifetime.md#_value)
- [copier](StaticLifetime.md#copier)
- [disposer](StaticLifetime.md#disposer)

### Accessors

- [alive](StaticLifetime.md#alive)
- [dupable](StaticLifetime.md#dupable)
- [owner](StaticLifetime.md#owner)
- [value](StaticLifetime.md#value)

### Methods

- [consume](StaticLifetime.md#consume)
- [dispose](StaticLifetime.md#dispose)
- [dup](StaticLifetime.md#dup)

## Constructors

### constructor

• **new StaticLifetime**<`T`, `Owner`\>(`value`, `owner?`)

When the Lifetime is disposed, it will call `disposer(_value)`. Use the
disposer function to implement whatever cleanup needs to happen at the end
of `value`'s lifetime.

`_owner` is not used or controlled by the lifetime. It's just metadata for
the creator.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `Owner` | `never` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |
| `owner?` | `Owner` |

#### Overrides

[Lifetime](Lifetime.md).[constructor](Lifetime.md#constructor)

#### Defined in

[ts/lifetime.ts:130](https://github.com/justjake/quickjs-emscripten/blob/main/ts/lifetime.ts#L130)

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

• `Protected` `Optional` `Readonly` **copier**: (`value`: `T`) => `T`

#### Type declaration

▸ (`value`): `T`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

##### Returns

`T`

#### Inherited from

[Lifetime](Lifetime.md).[copier](Lifetime.md#copier)

___

### disposer

• `Protected` `Optional` `Readonly` **disposer**: (`value`: `T`) => `void`

#### Type declaration

▸ (`value`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

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

#### Overrides

Lifetime.dupable

#### Defined in

[ts/lifetime.ts:135](https://github.com/justjake/quickjs-emscripten/blob/main/ts/lifetime.ts#L135)

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

**`throws`** If the lifetime has been [dispose](StaticLifetime.md#dispose)d already.

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
| `map` | (`lifetime`: [`StaticLifetime`](StaticLifetime.md)<`T`, `Owner`\>) => `O` |

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

Dispose of [value](StaticLifetime.md#value) and perform cleanup.

#### Returns

`void`

#### Overrides

[Lifetime](Lifetime.md).[dispose](Lifetime.md#dispose)

#### Defined in

[ts/lifetime.ts:145](https://github.com/justjake/quickjs-emscripten/blob/main/ts/lifetime.ts#L145)

___

### dup

▸ **dup**(): [`StaticLifetime`](StaticLifetime.md)<`T`, `Owner`\>

Create a new handle pointing to the same [value](StaticLifetime.md#value).

#### Returns

[`StaticLifetime`](StaticLifetime.md)<`T`, `Owner`\>

#### Overrides

[Lifetime](Lifetime.md).[dup](Lifetime.md#dup)

#### Defined in

[ts/lifetime.ts:140](https://github.com/justjake/quickjs-emscripten/blob/main/ts/lifetime.ts#L140)
