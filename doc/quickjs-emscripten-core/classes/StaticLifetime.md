[quickjs-emscripten](../../packages.md) • **quickjs-emscripten-core** • [Readme](../index.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../exports.md) / StaticLifetime

# Class: StaticLifetime\<T, Owner\>

A Lifetime that lives forever. Used for constants.

## Contents

- [Extends](StaticLifetime.md#extends)
- [Type parameters](StaticLifetime.md#type-parameters)
- [Constructors](StaticLifetime.md#constructors)
  - [new StaticLifetime(value, owner)](StaticLifetime.md#new-staticlifetimevalue-owner)
- [Properties](StaticLifetime.md#properties)
  - [\_alive](StaticLifetime.md#alive)
  - [\_constructorStack](StaticLifetime.md#constructorstack)
  - [\_owner?](StaticLifetime.md#owner)
  - [\_value](StaticLifetime.md#value)
  - [copier?](StaticLifetime.md#copier)
  - [disposer?](StaticLifetime.md#disposer)
- [Accessors](StaticLifetime.md#accessors)
  - [alive](StaticLifetime.md#alive)
  - [dupable](StaticLifetime.md#dupable)
  - [owner](StaticLifetime.md#owner)
  - [value](StaticLifetime.md#value)
- [Methods](StaticLifetime.md#methods)
  - [consume()](StaticLifetime.md#consume)
  - [dispose()](StaticLifetime.md#dispose)
  - [dup()](StaticLifetime.md#dup)

## Extends

- [`Lifetime`](Lifetime.md)\<`T`, `T`, `Owner`\>

## Type parameters

• **T**

• **Owner** = `never`

## Constructors

### new StaticLifetime(value, owner)

> **new StaticLifetime**\<`T`, `Owner`\>(`value`, `owner`?): [`StaticLifetime`](StaticLifetime.md)\<`T`, `Owner`\>

#### Parameters

• **value**: `T`

• **owner?**: `Owner`

#### Returns

[`StaticLifetime`](StaticLifetime.md)\<`T`, `Owner`\>

#### Overrides

[`quickjs-emscripten-core.Lifetime.constructor`](Lifetime.md#constructors)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:130](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L130)

## Properties

### \_alive

> **`protected`** **\_alive**: `boolean` = `true`

#### Inherited from

[`quickjs-emscripten-core.Lifetime._alive`](Lifetime.md#alive)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:31](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L31)

***

### \_constructorStack

> **`protected`** **\_constructorStack**: `undefined` \| `string`

#### Inherited from

[`quickjs-emscripten-core.Lifetime._constructorStack`](Lifetime.md#constructorstack)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:32](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L32)

***

### \_owner?

> **`protected`** **`readonly`** **\_owner**?: `Owner`

#### Inherited from

[`quickjs-emscripten-core.Lifetime._owner`](Lifetime.md#owner)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:46](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L46)

***

### \_value

> **`protected`** **`readonly`** **\_value**: `T`

#### Inherited from

[`quickjs-emscripten-core.Lifetime._value`](Lifetime.md#value)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:43](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L43)

***

### copier?

> **`protected`** **`readonly`** **copier**?: (`value`) => `T`

#### Parameters

• **value**: `T`

#### Returns

`T`

#### Inherited from

[`quickjs-emscripten-core.Lifetime.copier`](Lifetime.md#copier)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:44](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L44)

***

### disposer?

> **`protected`** **`readonly`** **disposer**?: (`value`) => `void`

#### Parameters

• **value**: `T`

#### Returns

`void`

#### Inherited from

[`quickjs-emscripten-core.Lifetime.disposer`](Lifetime.md#disposer)

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

[packages/quickjs-emscripten-core/src/lifetime.ts:135](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L135)

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

##### Inherited from

[`quickjs-emscripten-core.Lifetime.consume`](Lifetime.md#consume)

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

##### Inherited from

[`quickjs-emscripten-core.Lifetime.consume`](Lifetime.md#consume)

##### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:95](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L95)

***

### dispose()

> **dispose**(): `void`

Dispose of [[value]] and perform cleanup.

#### Returns

`void`

#### Overrides

[`quickjs-emscripten-core.Lifetime.dispose`](Lifetime.md#dispose)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:145](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L145)

***

### dup()

> **dup**(): [`StaticLifetime`](StaticLifetime.md)\<`T`, `Owner`\>

Create a new handle pointing to the same [[value]].

#### Returns

[`StaticLifetime`](StaticLifetime.md)\<`T`, `Owner`\>

#### Overrides

[`quickjs-emscripten-core.Lifetime.dup`](Lifetime.md#dup)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:140](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L140)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
