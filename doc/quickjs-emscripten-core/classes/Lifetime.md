[quickjs-emscripten](../../packages.md) • **quickjs-emscripten-core** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../exports.md) / Lifetime

# Class: Lifetime\<T, TCopy, Owner\>

A lifetime prevents access to a value after the lifetime has been
[dispose](Lifetime.md#dispose-1)ed.

Typically, quickjs-emscripten uses Lifetimes to protect C memory pointers.

## Contents

- [Extends](Lifetime.md#extends)
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
  - [`[dispose]`()](Lifetime.md#dispose)
  - [consume()](Lifetime.md#consume)
  - [dispose()](Lifetime.md#dispose)
  - [dup()](Lifetime.md#dup)

## Extends

- [`UsingDisposable`](UsingDisposable.md)

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

#### Overrides

[`quickjs-emscripten-core.UsingDisposable.constructor`](UsingDisposable.md#constructors)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:75](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L75)

## Properties

### \_alive

> **`protected`** **\_alive**: `boolean` = `true`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:64](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L64)

***

### \_constructorStack

> **`protected`** **\_constructorStack**: `undefined` \| `string`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:65](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L65)

***

### \_owner?

> **`protected`** **`readonly`** **\_owner**?: `Owner`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:79](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L79)

***

### \_value

> **`protected`** **`readonly`** **\_value**: `T`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:76](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L76)

***

### copier?

> **`protected`** **`readonly`** **copier**?: (`value`) => `TCopy`

#### Parameters

• **value**: `T` \| `TCopy`

#### Returns

`TCopy`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:77](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L77)

***

### disposer?

> **`protected`** **`readonly`** **disposer**?: (`value`) => `void`

#### Parameters

• **value**: `T` \| `TCopy`

#### Returns

`void`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:78](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L78)

## Accessors

### alive

> **`get`** **alive**(): `boolean`

#### Returns

`boolean`

true if the object is alive

false after the object has been [dispose](Lifetime.md#dispose-1)d

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:84](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L84)

***

### dupable

> **`get`** **dupable**(): `boolean`

#### Returns

`boolean`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:103](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L103)

***

### owner

> **`get`** **owner**(): `undefined` \| `Owner`

#### Returns

`undefined` \| `Owner`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:99](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L99)

***

### value

> **`get`** **value**(): `T`

The value this Lifetime protects. You must never retain the value - it
may become invalid, leading to memory errors.

#### Throws

If the lifetime has been [dispose](Lifetime.md#dispose-1)d already.

#### Returns

`T`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:94](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L94)

## Methods

### `[dispose]`()

> **[dispose]**(): `void`

Just calls the standard .dispose() method of this class.

#### Returns

`void`

#### Implementation of

[`quickjs-emscripten-core.Disposable.[dispose]`](../interfaces/Disposable.md#dispose)

#### Inherited from

[`quickjs-emscripten-core.UsingDisposable.[dispose]`](UsingDisposable.md#dispose)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:49](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L49)

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

##### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:127](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L127)

#### consume(map)

> **consume**\<`O`\>(`map`): `O`

##### Type parameters

• **O**

##### Parameters

• **map**: (`lifetime`) => `O`

##### Returns

`O`

##### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:130](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L130)

***

### dispose()

> **dispose**(): `void`

Dispose of [value](Lifetime.md#value-1) and perform cleanup.

#### Returns

`void`

#### Implementation of

[`quickjs-emscripten-core.Disposable.dispose`](../interfaces/Disposable.md#dispose-1)

#### Overrides

[`quickjs-emscripten-core.UsingDisposable.dispose`](UsingDisposable.md#abstract-dispose)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:141](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L141)

***

### dup()

> **dup**(): [`Lifetime`](Lifetime.md)\<`TCopy`, `TCopy`, `Owner`\>

Create a new handle pointing to the same [value](Lifetime.md#value-1).

#### Returns

[`Lifetime`](Lifetime.md)\<`TCopy`, `TCopy`, `Owner`\>

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:110](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L110)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
