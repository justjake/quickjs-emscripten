[quickjs-emscripten](../README.md) / [Exports](../modules.md) / [lifetime](../modules/lifetime.md) / WeakLifetime

# Class: WeakLifetime<T, TCopy, Owner\>

[lifetime](../modules/lifetime.md).WeakLifetime

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

- [`Lifetime`](lifetime.Lifetime.md)<`T`, `TCopy`, `Owner`\>

  ↳ **`WeakLifetime`**

## Table of contents

### Constructors

- [constructor](lifetime.WeakLifetime.md#constructor)

### Properties

- [\_alive](lifetime.WeakLifetime.md#_alive)
- [\_owner](lifetime.WeakLifetime.md#_owner)
- [\_value](lifetime.WeakLifetime.md#_value)
- [copier](lifetime.WeakLifetime.md#copier)
- [disposer](lifetime.WeakLifetime.md#disposer)

### Accessors

- [alive](lifetime.WeakLifetime.md#alive)
- [dupable](lifetime.WeakLifetime.md#dupable)
- [owner](lifetime.WeakLifetime.md#owner)
- [value](lifetime.WeakLifetime.md#value)

### Methods

- [consume](lifetime.WeakLifetime.md#consume)
- [dispose](lifetime.WeakLifetime.md#dispose)
- [dup](lifetime.WeakLifetime.md#dup)

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

[Lifetime](lifetime.Lifetime.md).[constructor](lifetime.Lifetime.md#constructor)

#### Defined in

[lifetime.ts:147](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L147)

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

[Lifetime](lifetime.Lifetime.md).[copier](lifetime.Lifetime.md#copier)

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

#### Inherited from

Lifetime.dupable

#### Defined in

[lifetime.ts:64](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L64)

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

**`throws`** If the lifetime has been [dispose](lifetime.WeakLifetime.md#dispose)d already.

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
| `map` | (`lifetime`: [`WeakLifetime`](lifetime.WeakLifetime.md)<`T`, `TCopy`, `Owner`\>) => `O` |

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

Dispose of [value](lifetime.WeakLifetime.md#value) and perform cleanup.

#### Returns

`void`

#### Overrides

[Lifetime](lifetime.Lifetime.md).[dispose](lifetime.Lifetime.md#dispose)

#### Defined in

[lifetime.ts:157](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L157)

___

### dup

▸ **dup**(): [`Lifetime`](lifetime.Lifetime.md)<`TCopy`, `TCopy`, `Owner`\>

Create a new handle pointing to the same [value](lifetime.WeakLifetime.md#value).

#### Returns

[`Lifetime`](lifetime.Lifetime.md)<`TCopy`, `TCopy`, `Owner`\>

#### Inherited from

[Lifetime](lifetime.Lifetime.md).[dup](lifetime.Lifetime.md#dup)

#### Defined in

[lifetime.ts:71](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L71)
