[quickjs-emscripten](../../packages.md) • **quickjs-emscripten** • [Readme](../index.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../exports.md) / StaticLifetime

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

[`quickjs-emscripten.Lifetime.constructor`](Lifetime.md#constructors)

#### Source

quickjs-emscripten-core/dist/index.d.ts:545

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

> **`protected`** **`readonly`** **copier**?: (`value`) => `T`

#### Parameters

• **value**: `T`

#### Returns

`T`

#### Inherited from

[`quickjs-emscripten.Lifetime.copier`](Lifetime.md#copier)

#### Source

quickjs-emscripten-core/dist/index.d.ts:501

***

### disposer?

> **`protected`** **`readonly`** **disposer**?: (`value`) => `void`

#### Parameters

• **value**: `T`

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

quickjs-emscripten-core/dist/index.d.ts:546

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

quickjs-emscripten-core/dist/index.d.ts:548

***

### dup()

> **dup**(): [`StaticLifetime`](StaticLifetime.md)\<`T`, `Owner`\>

Create a new handle pointing to the same [[value]].

#### Returns

[`StaticLifetime`](StaticLifetime.md)\<`T`, `Owner`\>

#### Overrides

[`quickjs-emscripten.Lifetime.dup`](Lifetime.md#dup)

#### Source

quickjs-emscripten-core/dist/index.d.ts:547

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
