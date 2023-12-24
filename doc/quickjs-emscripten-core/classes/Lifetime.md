[quickjs-emscripten](../../packages.md) • **quickjs-emscripten-core** • [Readme](../index.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../exports.md) / Lifetime

# Class: Lifetime\<T, TCopy, Owner\>

A lifetime prevents access to a value after the lifetime has been
[[dispose]]ed.

Typically, quickjs-emscripten uses Lifetimes to protect C memory pointers.

## Contents

- [Extended By](Lifetime.md#extended-by)
- [Type parameters](Lifetime.md#type-parameters)
- [Implements](Lifetime.md#implements)
- [Constructors](Lifetime.md#constructors)
  - [new Lifetime(_value, copier, disposer, _owner)](Lifetime.md#new-lifetime-value-copier-disposer-owner)
- [Properties](Lifetime.md#properties)
  - [\_alive](Lifetime.md#alive)
  - [\_constructorStack](Lifetime.md#constructorstack)
  - [\_owner?](Lifetime.md#owner)
  - [\_value](Lifetime.md#value)
  - [copier?](Lifetime.md#copier)
  - [disposer?](Lifetime.md#disposer)
- [Accessors](Lifetime.md#accessors)
  - [alive](Lifetime.md#alive)
  - [dupable](Lifetime.md#dupable)
  - [owner](Lifetime.md#owner)
  - [value](Lifetime.md#value)
- [Methods](Lifetime.md#methods)
  - [consume()](Lifetime.md#consume)
  - [dispose()](Lifetime.md#dispose)
  - [dup()](Lifetime.md#dup)

## Extended By

- [`StaticLifetime`](StaticLifetime.md)
- [`WeakLifetime`](WeakLifetime.md)

## Type parameters

• **T**

• **TCopy** = `never`

• **Owner** = `never`

## Implements

- [`Disposable`](../interfaces/Disposable.md)

## Constructors

### new Lifetime(_value, copier, disposer, _owner)

> **new Lifetime**\<`T`, `TCopy`, `Owner`\>(`_value`, `copier`?, `disposer`?, `_owner`?): [`Lifetime`](Lifetime.md)\<`T`, `TCopy`, `Owner`\>

When the Lifetime is disposed, it will call `disposer(_value)`. Use the
disposer function to implement whatever cleanup needs to happen at the end
of `value`'s lifetime.

`_owner` is not used or controlled by the lifetime. It's just metadata for
the creator.

#### Parameters

• **\_value**: `T`

• **copier?**: (`value`) => `TCopy`

• **disposer?**: (`value`) => `void`

• **\_owner?**: `Owner`

#### Returns

[`Lifetime`](Lifetime.md)\<`T`, `TCopy`, `Owner`\>

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:42](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L42)

## Properties

### \_alive

> **`protected`** **\_alive**: `boolean` = `true`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:31](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L31)

***

### \_constructorStack

> **`protected`** **\_constructorStack**: `undefined` \| `string`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:32](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L32)

***

### \_owner?

> **`protected`** **`readonly`** **\_owner**?: `Owner`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:46](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L46)

***

### \_value

> **`protected`** **`readonly`** **\_value**: `T`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:43](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L43)

***

### copier?

> **`protected`** **`readonly`** **copier**?: (`value`) => `TCopy`

#### Parameters

• **value**: `T` \| `TCopy`

#### Returns

`TCopy`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:44](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L44)

***

### disposer?

> **`protected`** **`readonly`** **disposer**?: (`value`) => `void`

#### Parameters

• **value**: `T` \| `TCopy`

#### Returns

`void`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:45](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L45)

## Accessors

### alive

> **`get`** **alive**(): `boolean`

#### Returns

`boolean`

true if the object is alive

false after the object has been [[dispose]]d

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:49](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L49)

***

### dupable

> **`get`** **dupable**(): `boolean`

#### Returns

`boolean`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:68](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L68)

***

### owner

> **`get`** **owner**(): `undefined` \| `Owner`

#### Returns

`undefined` \| `Owner`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:64](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L64)

***

### value

> **`get`** **value**(): `T`

The value this Lifetime protects. You must never retain the value - it
may become invalid, leading to memory errors.

#### Throws

If the lifetime has been [[dispose]]d already.

#### Returns

`T`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:59](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L59)

## Methods

### consume()

#### consume(map)

> **consume**\<`O`\>(`map`): `O`

Call `map` with this lifetime, then dispose the lifetime.

##### Type parameters

• **O**

##### Parameters

• **map**: (`lifetime`) => `O`

##### Returns

`O`

the result of `map(this)`.

##### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:92](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L92)

#### consume(map)

> **consume**\<`O`\>(`map`): `O`

##### Type parameters

• **O**

##### Parameters

• **map**: (`lifetime`) => `O`

##### Returns

`O`

##### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:95](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L95)

***

### dispose()

> **dispose**(): `void`

Dispose of [[value]] and perform cleanup.

#### Returns

`void`

#### Implementation of

[`quickjs-emscripten-core.Disposable.dispose`](../interfaces/Disposable.md#dispose)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:106](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L106)

***

### dup()

> **dup**(): [`Lifetime`](Lifetime.md)\<`TCopy`, `TCopy`, `Owner`\>

Create a new handle pointing to the same [[value]].

#### Returns

[`Lifetime`](Lifetime.md)\<`TCopy`, `TCopy`, `Owner`\>

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:75](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L75)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
