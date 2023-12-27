[quickjs-emscripten](../../packages.md) • **quickjs-emscripten-core** • [Readme](../README.md) \| [Exports](../exports.md)

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

[packages/quickjs-emscripten-core/src/lifetime.ts:131](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L131)

## Properties

### \_alive

> **`protected`** **\_alive**: `boolean` = `true`

#### Inherited from

[`quickjs-emscripten-core.Lifetime._alive`](Lifetime.md#alive)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:32](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L32)

***

### \_constructorStack

> **`protected`** **\_constructorStack**: `undefined` \| `string`

#### Inherited from

[`quickjs-emscripten-core.Lifetime._constructorStack`](Lifetime.md#constructorstack)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:33](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L33)

***

### \_owner?

> **`protected`** **`readonly`** **\_owner**?: `Owner`

#### Inherited from

[`quickjs-emscripten-core.Lifetime._owner`](Lifetime.md#owner)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:47](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L47)

***

### \_value

> **`protected`** **`readonly`** **\_value**: `T`

#### Inherited from

[`quickjs-emscripten-core.Lifetime._value`](Lifetime.md#value)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:44](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L44)

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

[packages/quickjs-emscripten-core/src/lifetime.ts:45](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L45)

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

[packages/quickjs-emscripten-core/src/lifetime.ts:46](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L46)

## Accessors

### alive

> **`get`** **alive**(): `boolean`

#### Returns

`boolean`

true if the object is alive

false after the object has been [dispose](StaticLifetime.md#dispose)d

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:50](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L50)

***

### dupable

> **`get`** **dupable**(): `boolean`

#### Returns

`boolean`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:136](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L136)

***

### owner

> **`get`** **owner**(): `undefined` \| `Owner`

#### Returns

`undefined` \| `Owner`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:65](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L65)

***

### value

> **`get`** **value**(): `T`

The value this Lifetime protects. You must never retain the value - it
may become invalid, leading to memory errors.

#### Throws

If the lifetime has been [dispose](StaticLifetime.md#dispose)d already.

#### Returns

`T`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:60](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L60)

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

[packages/quickjs-emscripten-core/src/lifetime.ts:93](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L93)

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

[packages/quickjs-emscripten-core/src/lifetime.ts:96](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L96)

***

### dispose()

> **dispose**(): `void`

Dispose of [value](StaticLifetime.md#value-1) and perform cleanup.

#### Returns

`void`

#### Overrides

[`quickjs-emscripten-core.Lifetime.dispose`](Lifetime.md#dispose)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:146](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L146)

***

### dup()

> **dup**(): [`StaticLifetime`](StaticLifetime.md)\<`T`, `Owner`\>

Create a new handle pointing to the same [value](StaticLifetime.md#value-1).

#### Returns

[`StaticLifetime`](StaticLifetime.md)\<`T`, `Owner`\>

#### Overrides

[`quickjs-emscripten-core.Lifetime.dup`](Lifetime.md#dup)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:141](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L141)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
