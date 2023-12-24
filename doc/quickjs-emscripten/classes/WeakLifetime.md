[quickjs-emscripten](../../packages.md) • **quickjs-emscripten** • [Readme](../index.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../exports.md) / WeakLifetime

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

[`quickjs-emscripten.Lifetime.constructor`](Lifetime.md#constructors)

#### Source

quickjs-emscripten-core/dist/index.d.ts:558

## Properties

### \_alive

> **`protected`** **\_alive**: `boolean`

#### Inherited from

[`quickjs-emscripten.Lifetime._alive`](Lifetime.md#alive)

#### Source

quickjs-emscripten-core/dist/index.d.ts:504

***

### \_constructorStack

> **`protected`** **\_constructorStack**: `undefined` \| `string`

#### Inherited from

[`quickjs-emscripten.Lifetime._constructorStack`](Lifetime.md#constructorstack)

#### Source

quickjs-emscripten-core/dist/index.d.ts:505

***

### \_owner?

> **`protected`** **`readonly`** **\_owner**?: `Owner`

#### Inherited from

[`quickjs-emscripten.Lifetime._owner`](Lifetime.md#owner)

#### Source

quickjs-emscripten-core/dist/index.d.ts:503

***

### \_value

> **`protected`** **`readonly`** **\_value**: `T`

#### Inherited from

[`quickjs-emscripten.Lifetime._value`](Lifetime.md#value)

#### Source

quickjs-emscripten-core/dist/index.d.ts:500

***

### copier?

> **`protected`** **`readonly`** **copier**?: (`value`) => `TCopy`

#### Parameters

• **value**: `T` \| `TCopy`

#### Returns

`TCopy`

#### Inherited from

[`quickjs-emscripten.Lifetime.copier`](Lifetime.md#copier)

#### Source

quickjs-emscripten-core/dist/index.d.ts:501

***

### disposer?

> **`protected`** **`readonly`** **disposer**?: (`value`) => `void`

#### Parameters

• **value**: `T` \| `TCopy`

#### Returns

`void`

#### Inherited from

[`quickjs-emscripten.Lifetime.disposer`](Lifetime.md#disposer)

#### Source

quickjs-emscripten-core/dist/index.d.ts:502

## Accessors

### alive

> **`get`** **alive**(): `boolean`

#### Returns

`boolean`

true if the object is alive

false after the object has been [[dispose]]d

#### Source

quickjs-emscripten-core/dist/index.d.ts:515

***

### dupable

> **`get`** **dupable**(): `boolean`

#### Returns

`boolean`

#### Source

quickjs-emscripten-core/dist/index.d.ts:524

***

### owner

> **`get`** **owner**(): `undefined` \| `Owner`

#### Returns

`undefined` \| `Owner`

#### Source

quickjs-emscripten-core/dist/index.d.ts:523

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

quickjs-emscripten-core/dist/index.d.ts:522

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

[`quickjs-emscripten.Lifetime.consume`](Lifetime.md#consume)

##### Source

quickjs-emscripten-core/dist/index.d.ts:533

#### consume(map)

> **consume**\<`O`\>(`map`): `O`

##### Type parameters

• **O**

##### Parameters

• **map**: (`lifetime`) => `O`

##### Returns

`O`

##### Inherited from

[`quickjs-emscripten.Lifetime.consume`](Lifetime.md#consume)

##### Source

quickjs-emscripten-core/dist/index.d.ts:534

***

### dispose()

> **dispose**(): `void`

Dispose of [[value]] and perform cleanup.

#### Returns

`void`

#### Overrides

[`quickjs-emscripten.Lifetime.dispose`](Lifetime.md#dispose)

#### Source

quickjs-emscripten-core/dist/index.d.ts:559

***

### dup()

> **dup**(): [`Lifetime`](Lifetime.md)\<`TCopy`, `TCopy`, `Owner`\>

Create a new handle pointing to the same [[value]].

#### Returns

[`Lifetime`](Lifetime.md)\<`TCopy`, `TCopy`, `Owner`\>

#### Inherited from

[`quickjs-emscripten.Lifetime.dup`](Lifetime.md#dup)

#### Source

quickjs-emscripten-core/dist/index.d.ts:528

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
