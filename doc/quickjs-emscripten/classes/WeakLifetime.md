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

packages/quickjs-emscripten-core/dist/index.d.ts:565

## Properties

### \_alive

> **`protected`** **\_alive**: `boolean`

#### Inherited from

[`quickjs-emscripten.Lifetime._alive`](Lifetime.md#alive)

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:511

***

### \_constructorStack

> **`protected`** **\_constructorStack**: `undefined` \| `string`

#### Inherited from

[`quickjs-emscripten.Lifetime._constructorStack`](Lifetime.md#constructorstack)

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:512

***

### \_owner?

> **`protected`** **`readonly`** **\_owner**?: `Owner`

#### Inherited from

[`quickjs-emscripten.Lifetime._owner`](Lifetime.md#owner)

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:510

***

### \_value

> **`protected`** **`readonly`** **\_value**: `T`

#### Inherited from

[`quickjs-emscripten.Lifetime._value`](Lifetime.md#value)

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:507

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

packages/quickjs-emscripten-core/dist/index.d.ts:508

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

packages/quickjs-emscripten-core/dist/index.d.ts:509

## Accessors

### alive

> **`get`** **alive**(): `boolean`

#### Returns

`boolean`

true if the object is alive

false after the object has been [dispose](WeakLifetime.md#dispose)d

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:522

***

### dupable

> **`get`** **dupable**(): `boolean`

#### Returns

`boolean`

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:531

***

### owner

> **`get`** **owner**(): `undefined` \| `Owner`

#### Returns

`undefined` \| `Owner`

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:530

***

### value

> **`get`** **value**(): `T`

The value this Lifetime protects. You must never retain the value - it
may become invalid, leading to memory errors.

#### Throws

If the lifetime has been [dispose](WeakLifetime.md#dispose)d already.

#### Returns

`T`

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:529

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

packages/quickjs-emscripten-core/dist/index.d.ts:540

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

packages/quickjs-emscripten-core/dist/index.d.ts:541

***

### dispose()

> **dispose**(): `void`

Dispose of [value](WeakLifetime.md#value-1) and perform cleanup.

#### Returns

`void`

#### Overrides

[`quickjs-emscripten.Lifetime.dispose`](Lifetime.md#dispose)

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:566

***

### dup()

> **dup**(): [`Lifetime`](Lifetime.md)\<`TCopy`, `TCopy`, `Owner`\>

Create a new handle pointing to the same [value](WeakLifetime.md#value-1).

#### Returns

[`Lifetime`](Lifetime.md)\<`TCopy`, `TCopy`, `Owner`\>

#### Inherited from

[`quickjs-emscripten.Lifetime.dup`](Lifetime.md#dup)

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:535

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
