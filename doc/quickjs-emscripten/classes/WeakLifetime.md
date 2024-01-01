[quickjs-emscripten](../../packages.md) • **quickjs-emscripten** • [Readme](../README.md) \| [Exports](../exports.md)

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

[`quickjs-emscripten.Lifetime.constructor`](Lifetime.md#constructors)

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:587

## Properties

### \_alive

> **`protected`** **\_alive**: `boolean`

#### Inherited from

[`quickjs-emscripten.Lifetime._alive`](Lifetime.md#alive)

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:533

***

### \_constructorStack

> **`protected`** **\_constructorStack**: `undefined` \| `string`

#### Inherited from

[`quickjs-emscripten.Lifetime._constructorStack`](Lifetime.md#constructorstack)

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:534

***

### \_owner?

> **`protected`** **`readonly`** **\_owner**?: `Owner`

#### Inherited from

[`quickjs-emscripten.Lifetime._owner`](Lifetime.md#owner)

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:532

***

### \_value

> **`protected`** **`readonly`** **\_value**: `T`

#### Inherited from

[`quickjs-emscripten.Lifetime._value`](Lifetime.md#value)

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:529

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

packages/quickjs-emscripten-core/dist/index.d.ts:530

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

packages/quickjs-emscripten-core/dist/index.d.ts:531

## Accessors

### alive

> **`get`** **alive**(): `boolean`

#### Returns

`boolean`

true if the object is alive

false after the object has been [dispose](WeakLifetime.md#dispose-1)d

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:544

***

### dupable

> **`get`** **dupable**(): `boolean`

#### Returns

`boolean`

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:553

***

### owner

> **`get`** **owner**(): `undefined` \| `Owner`

#### Returns

`undefined` \| `Owner`

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:552

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

packages/quickjs-emscripten-core/dist/index.d.ts:551

## Methods

### `[dispose]`()

> **[dispose]**(): `void`

Just calls the standard .dispose() method of this class.

#### Returns

`void`

#### Inherited from

[`quickjs-emscripten.Lifetime.[dispose]`](Lifetime.md#dispose)

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:520

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

[`quickjs-emscripten.Lifetime.consume`](Lifetime.md#consume)

##### Source

packages/quickjs-emscripten-core/dist/index.d.ts:562

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

packages/quickjs-emscripten-core/dist/index.d.ts:563

***

### dispose()

> **dispose**(): `void`

Dispose of [value](WeakLifetime.md#value-1) and perform cleanup.

#### Returns

`void`

#### Overrides

[`quickjs-emscripten.Lifetime.dispose`](Lifetime.md#dispose-1)

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:588

***

### dup()

> **dup**(): [`Lifetime`](Lifetime.md)\<`TCopy`, `TCopy`, `Owner`\>

Create a new handle pointing to the same [value](WeakLifetime.md#value-1).

#### Returns

[`Lifetime`](Lifetime.md)\<`TCopy`, `TCopy`, `Owner`\>

#### Inherited from

[`quickjs-emscripten.Lifetime.dup`](Lifetime.md#dup)

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:557

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
