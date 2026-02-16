[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../README.md) / Lifetime

# Class: Lifetime\<T, TCopy, Owner\>

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:68](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L68)

A lifetime prevents access to a value after the lifetime has been
[dispose](#dispose-1)ed.

Typically, quickjs-emscripten uses Lifetimes to protect C memory pointers.

## Extends

- [`UsingDisposable`](UsingDisposable.md)

## Extended by

- [`StaticLifetime`](StaticLifetime.md)
- [`WeakLifetime`](WeakLifetime.md)

## Type Parameters

### T

`T`

### TCopy

`TCopy` = `never`

### Owner

`Owner` = `never`

## Implements

- [`Disposable`](../interfaces/Disposable.md)

## Constructors

### Constructor

> **new Lifetime**\<`T`, `TCopy`, `Owner`\>(`_value`, `copier?`, `disposer?`, `_owner?`): `Lifetime`\<`T`, `TCopy`, `Owner`\>

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:83](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L83)

When the Lifetime is disposed, it will call `disposer(_value)`. Use the
disposer function to implement whatever cleanup needs to happen at the end
of `value`'s lifetime.

`_owner` is not used or controlled by the lifetime. It's just metadata for
the creator.

#### Parameters

##### \_value

`T`

##### copier?

(`value`) => `TCopy`

##### disposer?

(`value`) => `void`

##### \_owner?

`Owner`

#### Returns

`Lifetime`\<`T`, `TCopy`, `Owner`\>

#### Overrides

[`UsingDisposable`](UsingDisposable.md).[`constructor`](UsingDisposable.md#constructor)

## Properties

### \_alive

> `protected` **\_alive**: `boolean` = `true`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:72](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L72)

***

### \_constructorStack

> `protected` **\_constructorStack**: `string` \| `undefined`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:73](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L73)

***

### \_owner?

> `protected` `readonly` `optional` **\_owner**: `Owner`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:87](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L87)

***

### \_value

> `protected` `readonly` **\_value**: `T`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:84](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L84)

***

### copier()?

> `protected` `readonly` `optional` **copier**: (`value`) => `TCopy`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:85](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L85)

#### Parameters

##### value

`T` | `TCopy`

#### Returns

`TCopy`

***

### disposer()?

> `protected` `readonly` `optional` **disposer**: (`value`) => `void`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:86](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L86)

#### Parameters

##### value

`T` | `TCopy`

#### Returns

`void`

## Accessors

### alive

#### Get Signature

> **get** **alive**(): `boolean`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:92](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L92)

##### Returns

`boolean`

true if the object is alive

#### Implementation of

[`Disposable`](../interfaces/Disposable.md).[`alive`](../interfaces/Disposable.md#alive)

#### Overrides

[`UsingDisposable`](UsingDisposable.md).[`alive`](UsingDisposable.md#alive)

***

### dupable

#### Get Signature

> **get** **dupable**(): `boolean`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:111](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L111)

##### Returns

`boolean`

***

### owner

#### Get Signature

> **get** **owner**(): `Owner` \| `undefined`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:107](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L107)

##### Returns

`Owner` \| `undefined`

***

### value

#### Get Signature

> **get** **value**(): `T`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:102](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L102)

The value this Lifetime protects. You must never retain the value - it
may become invalid, leading to memory errors.

##### Throws

If the lifetime has been [dispose](#dispose-1)d already.

##### Returns

`T`

## Methods

### \[dispose\]()

> **\[dispose\]**(): `void`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:47](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L47)

Just calls the standard .dispose() method of this class.

#### Returns

`void`

#### Implementation of

[`Disposable`](../interfaces/Disposable.md).[`[dispose]`](../interfaces/Disposable.md#dispose)

#### Inherited from

[`UsingDisposable`](UsingDisposable.md).[`[dispose]`](UsingDisposable.md#dispose)

***

### assertAlive()

> `protected` **assertAlive**(): `void`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:182](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L182)

#### Returns

`void`

***

### consume()

#### Call Signature

> **consume**\<`O`\>(`map`): `O`

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

#### Call Signature

> **consume**\<`O`\>(`map`): `O`

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

***

### dispose()

> **dispose**(): `void`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:174](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L174)

Dispose of [value](#value) and perform cleanup.

#### Returns

`void`

#### Implementation of

[`Disposable`](../interfaces/Disposable.md).[`dispose`](../interfaces/Disposable.md#dispose-1)

#### Overrides

[`UsingDisposable`](UsingDisposable.md).[`dispose`](UsingDisposable.md#dispose-1)

***

### dup()

> **dup**(): `Lifetime`\<`TCopy`, `TCopy`, `Owner`\>

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:118](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L118)

Create a new handle pointing to the same [value](#value).

#### Returns

`Lifetime`\<`TCopy`, `TCopy`, `Owner`\>

***

### map()

#### Call Signature

> **map**\<`O`\>(`map`): `O`

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

#### Call Signature

> **map**\<`O`\>(`map`): `O`

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

#### Call Signature

> **tap**(`fn`): [`QuickJSHandle`](../README.md#quickjshandle)

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:165](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L165)

Call `fn` with this lifetime, then return `this`. Does not dispose the
lifetime. Useful for imperative operations within an expression, like when
you're building up objects, or to add logging in the middle of a call chain.

##### Parameters

###### fn

(`lifetime`) => `void`

##### Returns

[`QuickJSHandle`](../README.md#quickjshandle)

this
