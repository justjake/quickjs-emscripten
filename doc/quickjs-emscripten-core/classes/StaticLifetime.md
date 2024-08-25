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
  - [`[dispose]`()](StaticLifetime.md#dispose)
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

[packages/quickjs-emscripten-core/src/lifetime.ts:173](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L173)

## Properties

### \_alive

> **`protected`** **\_alive**: `boolean` = `true`

#### Inherited from

[`quickjs-emscripten-core.Lifetime._alive`](Lifetime.md#alive)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:72](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L72)

***

### \_constructorStack

> **`protected`** **\_constructorStack**: `undefined` \| `string`

#### Inherited from

[`quickjs-emscripten-core.Lifetime._constructorStack`](Lifetime.md#constructorstack)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:73](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L73)

***

### \_owner?

> **`protected`** **`readonly`** **\_owner**?: `Owner`

#### Inherited from

[`quickjs-emscripten-core.Lifetime._owner`](Lifetime.md#owner)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:87](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L87)

***

### \_value

> **`protected`** **`readonly`** **\_value**: `T`

#### Inherited from

[`quickjs-emscripten-core.Lifetime._value`](Lifetime.md#value)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:84](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L84)

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

[packages/quickjs-emscripten-core/src/lifetime.ts:85](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L85)

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

[packages/quickjs-emscripten-core/src/lifetime.ts:86](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L86)

## Accessors

### alive

> **`get`** **alive**(): `boolean`

#### Returns

`boolean`

true if the object is alive

false after the object has been [dispose](StaticLifetime.md#dispose-1)d

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:92](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L92)

***

### dupable

> **`get`** **dupable**(): `boolean`

#### Returns

`boolean`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:178](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L178)

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

If the lifetime has been [dispose](StaticLifetime.md#dispose-1)d already.

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

[`quickjs-emscripten-core.Lifetime.[dispose]`](Lifetime.md#dispose)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:47](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L47)

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

[`quickjs-emscripten-core.Lifetime.consume`](Lifetime.md#consume)

##### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:138](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L138)

***

### dispose()

> **dispose**(): `void`

Dispose of [value](StaticLifetime.md#value-1) and perform cleanup.

#### Returns

`void`

#### Overrides

[`quickjs-emscripten-core.Lifetime.dispose`](Lifetime.md#dispose-1)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:188](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L188)

***

### dup()

> **dup**(): [`StaticLifetime`](StaticLifetime.md)\<`T`, `Owner`\>

Create a new handle pointing to the same [value](StaticLifetime.md#value-1).

#### Returns

[`StaticLifetime`](StaticLifetime.md)\<`T`, `Owner`\>

#### Overrides

[`quickjs-emscripten-core.Lifetime.dup`](Lifetime.md#dup)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:183](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L183)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
