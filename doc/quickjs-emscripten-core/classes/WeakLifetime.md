[quickjs-emscripten](../../packages.md) • **quickjs-emscripten-core** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../exports.md) / WeakLifetime

# Class: WeakLifetime\<T, TCopy, Owner\>

A Lifetime that does not own its `value`. A WeakLifetime never calls its
`disposer` function, but can be `dup`ed to produce regular lifetimes that
do.

Used for function arguments.

## Contents

- [Extends](WeakLifetime.md#extends)
- [Type parameters](WeakLifetime.md#type-parameters)
- [Constructors](WeakLifetime.md#constructors)
  - [new WeakLifetime(value, copier, disposer, owner)](WeakLifetime.md#new-weaklifetimevalue-copier-disposer-owner)
- [Properties](WeakLifetime.md#properties)
  - [\_alive](WeakLifetime.md#alive)
  - [\_constructorStack](WeakLifetime.md#constructorstack)
  - [\_owner?](WeakLifetime.md#owner)
  - [\_value](WeakLifetime.md#value)
  - [copier?](WeakLifetime.md#copier)
  - [disposer?](WeakLifetime.md#disposer)
- [Accessors](WeakLifetime.md#accessors)
  - [alive](WeakLifetime.md#alive)
  - [dupable](WeakLifetime.md#dupable)
  - [owner](WeakLifetime.md#owner)
  - [value](WeakLifetime.md#value)
- [Methods](WeakLifetime.md#methods)
  - [`[dispose]`()](WeakLifetime.md#dispose)
  - [consume()](WeakLifetime.md#consume)
  - [dispose()](WeakLifetime.md#dispose)
  - [dup()](WeakLifetime.md#dup)

## Extends

- [`Lifetime`](Lifetime.md)\<`T`, `TCopy`, `Owner`\>

## Type parameters

• **T**

• **TCopy** = `never`

• **Owner** = `never`

## Constructors

### new WeakLifetime(value, copier, disposer, owner)

> **new WeakLifetime**\<`T`, `TCopy`, `Owner`\>(`value`, `copier`?, `disposer`?, `owner`?): [`WeakLifetime`](WeakLifetime.md)\<`T`, `TCopy`, `Owner`\>

#### Parameters

• **value**: `T`

• **copier?**: (`value`) => `TCopy`

• **disposer?**: (`value`) => `void`

• **owner?**: `Owner`

#### Returns

[`WeakLifetime`](WeakLifetime.md)\<`T`, `TCopy`, `Owner`\>

#### Overrides

[`quickjs-emscripten-core.Lifetime.constructor`](Lifetime.md#constructors)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:198](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L198)

## Properties

### \_alive

> **`protected`** **\_alive**: `boolean` = `true`

#### Inherited from

[`quickjs-emscripten-core.Lifetime._alive`](Lifetime.md#alive)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:71](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L71)

***

### \_constructorStack

> **`protected`** **\_constructorStack**: `undefined` \| `string`

#### Inherited from

[`quickjs-emscripten-core.Lifetime._constructorStack`](Lifetime.md#constructorstack)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:72](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L72)

***

### \_owner?

> **`protected`** **`readonly`** **\_owner**?: `Owner`

#### Inherited from

[`quickjs-emscripten-core.Lifetime._owner`](Lifetime.md#owner)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:86](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L86)

***

### \_value

> **`protected`** **`readonly`** **\_value**: `T`

#### Inherited from

[`quickjs-emscripten-core.Lifetime._value`](Lifetime.md#value)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:83](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L83)

***

### copier?

> **`protected`** **`readonly`** **copier**?: (`value`) => `TCopy`

#### Parameters

• **value**: `T` \| `TCopy`

#### Returns

`TCopy`

#### Inherited from

[`quickjs-emscripten-core.Lifetime.copier`](Lifetime.md#copier)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:84](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L84)

***

### disposer?

> **`protected`** **`readonly`** **disposer**?: (`value`) => `void`

#### Parameters

• **value**: `T` \| `TCopy`

#### Returns

`void`

#### Inherited from

[`quickjs-emscripten-core.Lifetime.disposer`](Lifetime.md#disposer)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:85](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L85)

## Accessors

### alive

> **`get`** **alive**(): `boolean`

#### Returns

`boolean`

true if the object is alive

false after the object has been [dispose](WeakLifetime.md#dispose-1)d

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:91](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L91)

***

### dupable

> **`get`** **dupable**(): `boolean`

#### Returns

`boolean`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:110](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L110)

***

### owner

> **`get`** **owner**(): `undefined` \| `Owner`

#### Returns

`undefined` \| `Owner`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:106](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L106)

***

### value

> **`get`** **value**(): `T`

The value this Lifetime protects. You must never retain the value - it
may become invalid, leading to memory errors.

#### Throws

If the lifetime has been [dispose](WeakLifetime.md#dispose-1)d already.

#### Returns

`T`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:101](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L101)

## Methods

### `[dispose]`()

> **[dispose]**(): `void`

Just calls the standard .dispose() method of this class.

#### Returns

`void`

#### Inherited from

[`quickjs-emscripten-core.Lifetime.[dispose]`](Lifetime.md#dispose)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:46](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L46)

***

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

[packages/quickjs-emscripten-core/src/lifetime.ts:134](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L134)

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

[packages/quickjs-emscripten-core/src/lifetime.ts:137](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L137)

***

### dispose()

> **dispose**(): `void`

Dispose of [value](WeakLifetime.md#value-1) and perform cleanup.

#### Returns

`void`

#### Overrides

[`quickjs-emscripten-core.Lifetime.dispose`](Lifetime.md#dispose-1)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:208](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L208)

***

### dup()

> **dup**(): [`Lifetime`](Lifetime.md)\<`TCopy`, `TCopy`, `Owner`\>

Create a new handle pointing to the same [value](WeakLifetime.md#value-1).

#### Returns

[`Lifetime`](Lifetime.md)\<`TCopy`, `TCopy`, `Owner`\>

#### Inherited from

[`quickjs-emscripten-core.Lifetime.dup`](Lifetime.md#dup)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:117](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L117)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
