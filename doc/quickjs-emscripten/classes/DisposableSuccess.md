[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../README.md) / DisposableSuccess

# Class: DisposableSuccess\<S>

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:424](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L424)

* [Extends](#extends)

* [Type Parameters](#type-parameters)

  * [S](#s)

* [Constructors](#constructors)

  * [Constructor](#constructor)

* [Properties](#properties)

  * [error?](#error)
  * [value](#value-1)

* [Accessors](#accessors)

  * [alive](#alive)

* [Methods](#methods)

  * [\[dispose\]()](#dispose)
  * [dispose()](#dispose-1)
  * [unwrap()](#unwrap)
  * [unwrapOr()](#unwrapor)
  * [fail()](#fail)
  * [is()](#is)
  * [success()](#success)

## Extends

* `AbstractDisposableResult`

## Type Parameters

### S

`S`

## Constructors

### Constructor

> **new DisposableSuccess**<`S`>(`value`): `DisposableSuccess`<`S`>

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:427](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L427)

#### Parameters

##### value

`S`

#### Returns

`DisposableSuccess`<`S`>

#### Overrides

`AbstractDisposableResult.constructor`

## Properties

### error?

> `optional` **error**: `undefined`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:425](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L425)

***

### value

> `readonly` **value**: `S`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:427](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L427)

## Accessors

### alive

#### Get Signature

> **get** **alive**(): `boolean`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:431](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L431)

##### Returns

`boolean`

#### Overrides

`AbstractDisposableResult.alive`

## Methods

### \[dispose]\()

> **\[dispose]**(): `void`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:47](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L47)

Just calls the standard .dispose() method of this class.

#### Returns

`void`

#### Inherited from

`AbstractDisposableResult.[dispose]`

***

### dispose()

> **dispose**(): `void`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:435](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L435)

#### Returns

`void`

#### Overrides

`AbstractDisposableResult.dispose`

***

### unwrap()

> **unwrap**(): `S`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:441](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L441)

#### Returns

`S`

***

### unwrapOr()

> **unwrapOr**<`T`>(`_fallback`): `S` | `T`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:445](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L445)

#### Type Parameters

##### T

`T`

#### Parameters

##### \_fallback

`T`

#### Returns

`S` | `T`

***

### fail()

> `static` **fail**<`S`, `F`>(`error`, `onUnwrap`): [`DisposableFail`](DisposableFail.md)<`F`>

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:409](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L409)

#### Type Parameters

##### S

`S`

##### F

`F`

#### Parameters

##### error

`F`

##### onUnwrap

(`status`) => `void`

#### Returns

[`DisposableFail`](DisposableFail.md)<`F`>

#### Inherited from

`AbstractDisposableResult.fail`

***

### is()

> `static` **is**<`S`, `F`>(`result`): `result is DisposableResult<S, F>`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:416](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L416)

#### Type Parameters

##### S

`S`

##### F

`F`

#### Parameters

##### result

[`SuccessOrFail`](../type-aliases/SuccessOrFail.md)<`S`, `F`>

#### Returns

`result is DisposableResult<S, F>`

#### Inherited from

`AbstractDisposableResult.is`

***

### success()

> `static` **success**<`S`, `F`>(`value`): `DisposableSuccess`<`S`>

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:405](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L405)

#### Type Parameters

##### S

`S`

##### F

`F`

#### Parameters

##### value

`S`

#### Returns

`DisposableSuccess`<`S`>

#### Inherited from

`AbstractDisposableResult.success`
