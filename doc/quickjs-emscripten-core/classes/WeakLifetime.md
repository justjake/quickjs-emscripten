[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../README.md) / WeakLifetime

# Class: WeakLifetime\<T, TCopy, Owner>

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:223](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L223)

A Lifetime that does not own its `value`. A WeakLifetime never calls its
`disposer` function, but can be `dup`ed to produce regular lifetimes that
do.

Used for function arguments.

## Contents

* [Extends](#extends)
* [Type Parameters](#type-parameters)
  * [T](#t)
  * [TCopy](#tcopy)
  * [Owner](#owner)
* [Constructors](#constructors)
  * [Constructor](#constructor)
* [Properties](#properties)
  * [\_alive](#_alive)
  * [\_constructorStack](#_constructorstack)
  * [\_owner?](#_owner)
  * [\_value](#_value)
  * [copier()?](#copier-1)
  * [disposer()?](#disposer-1)
* [Accessors](#accessors)
  * [alive](#alive)
  * [dupable](#dupable)
  * [owner](#owner-2)
  * [value](#value-3)
* [Methods](#methods)
  * [\[dispose\]()](#dispose)
  * [assertAlive()](#assertalive)
  * [consume()](#consume)
  * [dispose()](#dispose-1)
  * [dup()](#dup)
  * [map()](#map-2)
  * [tap()](#tap)

## Extends

* [`Lifetime`](Lifetime.md)<`T`, `TCopy`, `Owner`>

## Type Parameters

### T

`T`

### TCopy

`TCopy` = `never`

### Owner

`Owner` = `never`

## Constructors

### Constructor

> **new WeakLifetime**<`T`, `TCopy`, `Owner`>(`value`, `copier?`, `disposer?`, `owner?`): `WeakLifetime`<`T`, `TCopy`, `Owner`>

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:224](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L224)

#### Parameters

##### value

`T`

##### copier?

(`value`) => `TCopy`

##### disposer?

(`value`) => `void`

##### owner?

`Owner`

#### Returns

`WeakLifetime`<`T`, `TCopy`, `Owner`>

#### Overrides

[`Lifetime`](Lifetime.md).[`constructor`](Lifetime.md#constructor)

## Properties

### \_alive

> `protected` **\_alive**: `boolean` = `true`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:72](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L72)

#### Inherited from

[`Lifetime`](Lifetime.md).[`_alive`](Lifetime.md#_alive)

***

### \_constructorStack

> `protected` **\_constructorStack**: `string` | `undefined`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:73](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L73)

#### Inherited from

[`Lifetime`](Lifetime.md).[`_constructorStack`](Lifetime.md#_constructorstack)

***

### \_owner?

> `protected` `readonly` `optional` **\_owner**: `Owner`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:87](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L87)

#### Inherited from

[`Lifetime`](Lifetime.md).[`_owner`](Lifetime.md#_owner)

***

### \_value

> `protected` `readonly` **\_value**: `T`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:84](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L84)

#### Inherited from

[`Lifetime`](Lifetime.md).[`_value`](Lifetime.md#_value)

***

### copier()?

> `protected` `readonly` `optional` **copier**: (`value`) => `TCopy`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:85](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L85)

#### Parameters

##### value

`T` | `TCopy`

#### Returns

`TCopy`

#### Inherited from

[`Lifetime`](Lifetime.md).[`copier`](Lifetime.md#copier)

***

### disposer()?

> `protected` `readonly` `optional` **disposer**: (`value`) => `void`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:86](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L86)

#### Parameters

##### value

`T` | `TCopy`

#### Returns

`void`

#### Inherited from

[`Lifetime`](Lifetime.md).[`disposer`](Lifetime.md#disposer)

## Accessors

### alive

#### Get Signature

> **get** **alive**(): `boolean`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:92](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L92)

##### Returns

`boolean`

true if the object is alive

#### Inherited from

[`Lifetime`](Lifetime.md).[`alive`](Lifetime.md#alive)

***

### dupable

#### Get Signature

> **get** **dupable**(): `boolean`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:111](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L111)

##### Returns

`boolean`

#### Inherited from

[`Lifetime`](Lifetime.md).[`dupable`](Lifetime.md#dupable)

***

### owner

#### Get Signature

> **get** **owner**(): `Owner` | `undefined`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:107](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L107)

##### Returns

`Owner` | `undefined`

#### Inherited from

[`Lifetime`](Lifetime.md).[`owner`](Lifetime.md#owner-1)

***

### value

#### Get Signature

> **get** **value**(): `T`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:102](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L102)

The value this Lifetime protects. You must never retain the value - it
may become invalid, leading to memory errors.

##### Throws

If the lifetime has been [dispose](Lifetime.md#dispose-1)d already.

##### Returns

`T`

#### Inherited from

[`Lifetime`](Lifetime.md).[`value`](Lifetime.md#value)

## Methods

### \[dispose]\()

> **\[dispose]**(): `void`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:47](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L47)

Just calls the standard .dispose() method of this class.

#### Returns

`void`

#### Inherited from

[`Lifetime`](Lifetime.md).[`[dispose]`](Lifetime.md#dispose)

***

### assertAlive()

> `protected` **assertAlive**(): `void`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:182](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L182)

#### Returns

`void`

#### Inherited from

[`Lifetime`](Lifetime.md).[`assertAlive`](Lifetime.md#assertalive)

***

### consume()

#### Call Signature

> **consume**<`O`>(`map`): `O`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:135](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L135)

Call `map` with this lifetime, then dispose the lifetime.

##### Type Parameters

###### O

`O`

##### Parameters

###### map

(`lifetime`) => `O`

##### Returns

`O`

the result of `map(this)`.

##### Inherited from

[`Lifetime`](Lifetime.md).[`consume`](Lifetime.md#consume)

#### Call Signature

> **consume**<`O`>(`map`): `O`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:138](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L138)

Call `map` with this lifetime, then dispose the lifetime.

##### Type Parameters

###### O

`O`

##### Parameters

###### map

(`lifetime`) => `O`

##### Returns

`O`

the result of `map(this)`.

##### Inherited from

[`Lifetime`](Lifetime.md).[`consume`](Lifetime.md#consume)

***

### dispose()

> **dispose**(): `void`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:234](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L234)

Dispose of [value](Lifetime.md#value) and perform cleanup.

#### Returns

`void`

#### Overrides

[`Lifetime`](Lifetime.md).[`dispose`](Lifetime.md#dispose-1)

***

### dup()

> **dup**(): [`Lifetime`](Lifetime.md)<`TCopy`, `TCopy`, `Owner`>

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:118](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L118)

Create a new handle pointing to the same [value](Lifetime.md#value).

#### Returns

[`Lifetime`](Lifetime.md)<`TCopy`, `TCopy`, `Owner`>

#### Inherited from

[`Lifetime`](Lifetime.md).[`dup`](Lifetime.md#dup)

***

### map()

#### Call Signature

> **map**<`O`>(`map`): `O`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:151](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L151)

Call `map` with this lifetime, returning the result.
Does not dispose the lifetime.

##### Type Parameters

###### O

`O`

##### Parameters

###### map

(`lifetime`) => `O`

##### Returns

`O`

the result of `map(this)`.

##### Inherited from

[`Lifetime`](Lifetime.md).[`map`](Lifetime.md#map)

#### Call Signature

> **map**<`O`>(`map`): `O`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:152](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L152)

Call `map` with this lifetime, returning the result.
Does not dispose the lifetime.

##### Type Parameters

###### O

`O`

##### Parameters

###### map

(`lifetime`) => `O`

##### Returns

`O`

the result of `map(this)`.

##### Inherited from

[`Lifetime`](Lifetime.md).[`map`](Lifetime.md#map)

***

### tap()

#### Call Signature

> **tap**(`fn`): `this`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:164](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L164)

Call `fn` with this lifetime, then return `this`. Does not dispose the
lifetime. Useful for imperative operations within an expression, like when
you're building up objects, or to add logging in the middle of a call chain.

##### Parameters

###### fn

(`lifetime`) => `void`

##### Returns

`this`

this

##### Inherited from

[`Lifetime`](Lifetime.md).[`tap`](Lifetime.md#tap)

#### Call Signature

> **tap**(`fn`): [`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:165](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L165)

Call `fn` with this lifetime, then return `this`. Does not dispose the
lifetime. Useful for imperative operations within an expression, like when
you're building up objects, or to add logging in the middle of a call chain.

##### Parameters

###### fn

(`lifetime`) => `void`

##### Returns

[`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

this

##### Inherited from

[`Lifetime`](Lifetime.md).[`tap`](Lifetime.md#tap)
