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
  - [assertAlive()](WeakLifetime.md#assertalive)
  - [consume()](WeakLifetime.md#consume)
  - [dispose()](WeakLifetime.md#dispose)
  - [dup()](WeakLifetime.md#dup)
  - [map()](WeakLifetime.md#map)
  - [tap()](WeakLifetime.md#tap)

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

[packages/quickjs-emscripten-core/src/lifetime.ts:224](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L224)

## Properties

### \_alive

> **`protected`** **\_alive**: `boolean` = `true`

#### Inherited from

[`quickjs-emscripten.Lifetime._alive`](Lifetime.md#alive)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:72](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L72)

***

### \_constructorStack

> **`protected`** **\_constructorStack**: `undefined` \| `string`

#### Inherited from

[`quickjs-emscripten.Lifetime._constructorStack`](Lifetime.md#constructorstack)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:73](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L73)

***

### \_owner?

> **`protected`** **`readonly`** **\_owner**?: `Owner`

#### Inherited from

[`quickjs-emscripten.Lifetime._owner`](Lifetime.md#owner)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:87](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L87)

***

### \_value

> **`protected`** **`readonly`** **\_value**: `T`

#### Inherited from

[`quickjs-emscripten.Lifetime._value`](Lifetime.md#value)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:84](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L84)

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

[packages/quickjs-emscripten-core/src/lifetime.ts:85](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L85)

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

[packages/quickjs-emscripten-core/src/lifetime.ts:86](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L86)

## Accessors

### alive

> **`get`** **alive**(): `boolean`

#### Returns

`boolean`

true if the object is alive

false after the object has been [dispose](WeakLifetime.md#dispose-1)d

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:92](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L92)

***

### dupable

> **`get`** **dupable**(): `boolean`

#### Returns

`boolean`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:111](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L111)

***

### owner

> **`get`** **owner**(): `undefined` \| `Owner`

#### Returns

`undefined` \| `Owner`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:107](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L107)

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

[packages/quickjs-emscripten-core/src/lifetime.ts:102](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L102)

## Methods

### `[dispose]`()

> **[dispose]**(): `void`

Just calls the standard .dispose() method of this class.

#### Returns

`void`

#### Inherited from

[`quickjs-emscripten.Lifetime.[dispose]`](Lifetime.md#dispose)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:47](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L47)

***

### assertAlive()

> **`protected`** **assertAlive**(): `void`

#### Returns

`void`

#### Inherited from

[`quickjs-emscripten.Lifetime.assertAlive`](Lifetime.md#assertalive)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:182](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L182)

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

[packages/quickjs-emscripten-core/src/lifetime.ts:135](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L135)

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

[packages/quickjs-emscripten-core/src/lifetime.ts:138](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L138)

***

### dispose()

> **dispose**(): `void`

Dispose of [value](WeakLifetime.md#value-1) and perform cleanup.

#### Returns

`void`

#### Overrides

[`quickjs-emscripten.Lifetime.dispose`](Lifetime.md#dispose-1)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:234](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L234)

***

### dup()

> **dup**(): [`Lifetime`](Lifetime.md)\<`TCopy`, `TCopy`, `Owner`\>

Create a new handle pointing to the same [value](WeakLifetime.md#value-1).

#### Returns

[`Lifetime`](Lifetime.md)\<`TCopy`, `TCopy`, `Owner`\>

#### Inherited from

[`quickjs-emscripten.Lifetime.dup`](Lifetime.md#dup)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:118](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L118)

***

### map()

#### map(map)

> **map**\<`O`\>(`map`): `O`

Call `map` with this lifetime, returning the result.
Does not dispose the lifetime.

##### Type parameters

• **O**

##### Parameters

• **map**: (`lifetime`) => `O`

##### Returns

`O`

the result of `map(this)`.

##### Inherited from

[`quickjs-emscripten.Lifetime.map`](Lifetime.md#map)

##### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:151](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L151)

#### map(map)

> **map**\<`O`\>(`map`): `O`

##### Type parameters

• **O**

##### Parameters

• **map**: (`lifetime`) => `O`

##### Returns

`O`

##### Inherited from

[`quickjs-emscripten.Lifetime.map`](Lifetime.md#map)

##### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:152](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L152)

***

### tap()

#### tap(fn)

> **tap**(`fn`): [`WeakLifetime`](WeakLifetime.md)\<`T`, `TCopy`, `Owner`\>

Call `fn` with this lifetime, then return `this`. Does not dispose the
lifetime. Useful for imperative operations within an expression, like when
you're building up objects, or to add logging in the middle of a call chain.

##### Parameters

• **fn**: (`lifetime`) => `void`

##### Returns

[`WeakLifetime`](WeakLifetime.md)\<`T`, `TCopy`, `Owner`\>

this

##### Inherited from

[`quickjs-emscripten.Lifetime.tap`](Lifetime.md#tap)

##### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:164](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L164)

#### tap(fn)

> **tap**(`fn`): [`QuickJSHandle`](../exports.md#quickjshandle)

##### Parameters

• **fn**: (`lifetime`) => `void`

##### Returns

[`QuickJSHandle`](../exports.md#quickjshandle)

##### Inherited from

[`quickjs-emscripten.Lifetime.tap`](Lifetime.md#tap)

##### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:165](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L165)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
