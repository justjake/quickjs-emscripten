[quickjs-emscripten](../README.md) / [Exports](../modules.md) / [lifetime](../modules/lifetime.md) / StaticLifetime

# Class: StaticLifetime<T, Owner\>

[lifetime](../modules/lifetime.md).StaticLifetime

A Lifetime that lives forever. Used for constants.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `Owner` | `never` |

## Hierarchy

- [`Lifetime`](lifetime.Lifetime.md)<`T`, `T`, `Owner`\>

  ↳ **`StaticLifetime`**

## Table of contents

### Constructors

- [constructor](lifetime.StaticLifetime.md#constructor)

### Properties

- [\_alive](lifetime.StaticLifetime.md#_alive)
- [\_owner](lifetime.StaticLifetime.md#_owner)
- [\_value](lifetime.StaticLifetime.md#_value)
- [copier](lifetime.StaticLifetime.md#copier)
- [disposer](lifetime.StaticLifetime.md#disposer)

### Accessors

- [alive](lifetime.StaticLifetime.md#alive)
- [dupable](lifetime.StaticLifetime.md#dupable)
- [owner](lifetime.StaticLifetime.md#owner)
- [value](lifetime.StaticLifetime.md#value)

### Methods

- [consume](lifetime.StaticLifetime.md#consume)
- [dispose](lifetime.StaticLifetime.md#dispose)
- [dup](lifetime.StaticLifetime.md#dup)

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

[Lifetime](lifetime.Lifetime.md).[constructor](lifetime.Lifetime.md#constructor)

#### Defined in

[lifetime.ts:121](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L121)

## Properties

### \_alive

• `Protected` **\_alive**: `boolean` = `true`

#### Inherited from

[Lifetime](lifetime.Lifetime.md).[_alive](lifetime.Lifetime.md#_alive)

#### Defined in

[lifetime.ts:28](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L28)

___

### \_owner

• `Protected` `Optional` `Readonly` **\_owner**: `Owner`

#### Inherited from

[Lifetime](lifetime.Lifetime.md).[_owner](lifetime.Lifetime.md#_owner)

___

### \_value

• `Protected` `Readonly` **\_value**: `T`

#### Inherited from

[Lifetime](lifetime.Lifetime.md).[_value](lifetime.Lifetime.md#_value)

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

[Lifetime](lifetime.Lifetime.md).[copier](lifetime.Lifetime.md#copier)

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

[Lifetime](lifetime.Lifetime.md).[disposer](lifetime.Lifetime.md#disposer)

## Accessors

### alive

• `get` **alive**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Lifetime.alive

#### Defined in

[lifetime.ts:45](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L45)

___

### dupable

• `get` **dupable**(): `boolean`

#### Returns

`boolean`

#### Overrides

Lifetime.dupable

#### Defined in

[lifetime.ts:126](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L126)

___

### owner

• `get` **owner**(): `undefined` \| `Owner`

#### Returns

`undefined` \| `Owner`

#### Inherited from

Lifetime.owner

#### Defined in

[lifetime.ts:60](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L60)

___

### value

• `get` **value**(): `T`

The value this Lifetime protects. You must never retain the value - it
may become invalid, leading to memory errors.

**`throws`** If the lifetime has been [dispose](lifetime.StaticLifetime.md#dispose)d already.

#### Returns

`T`

#### Inherited from

Lifetime.value

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
| `map` | (`lifetime`: [`StaticLifetime`](lifetime.StaticLifetime.md)<`T`, `Owner`\>) => `O` |

#### Returns

`O`

the result of `map(this)`.

#### Inherited from

[Lifetime](lifetime.Lifetime.md).[consume](lifetime.Lifetime.md#consume)

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

#### Inherited from

[Lifetime](lifetime.Lifetime.md).[consume](lifetime.Lifetime.md#consume)

#### Defined in

[lifetime.ts:91](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L91)

___

### dispose

▸ **dispose**(): `void`

Dispose of [value](lifetime.StaticLifetime.md#value) and perform cleanup.

#### Returns

`void`

#### Overrides

[Lifetime](lifetime.Lifetime.md).[dispose](lifetime.Lifetime.md#dispose)

#### Defined in

[lifetime.ts:136](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L136)

___

### dup

▸ **dup**(): [`StaticLifetime`](lifetime.StaticLifetime.md)<`T`, `Owner`\>

Create a new handle pointing to the same [value](lifetime.StaticLifetime.md#value).

#### Returns

[`StaticLifetime`](lifetime.StaticLifetime.md)<`T`, `Owner`\>

#### Overrides

[Lifetime](lifetime.Lifetime.md).[dup](lifetime.Lifetime.md#dup)

#### Defined in

[lifetime.ts:131](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L131)
