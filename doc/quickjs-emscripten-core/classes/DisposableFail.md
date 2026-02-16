[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../README.md) / DisposableFail

# Class: DisposableFail\<F>

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:450](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L450)

* [Extends](#extends)

* [Type Parameters](#type-parameters)

  * [F](#f)

* [Constructors](#constructors)

  * [Constructor](#constructor)

* [Properties](#properties)

  * [error](#error-1)

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

### F

`F`

## Constructors

### Constructor

> **new DisposableFail**<`F`>(`error`, `onUnwrap`): `DisposableFail`<`F`>

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:451](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L451)

#### Parameters

##### error

`F`

##### onUnwrap

(`status`) => `void`

#### Returns

`DisposableFail`<`F`>

#### Overrides

`AbstractDisposableResult.constructor`

## Properties

### error

> `readonly` **error**: `F`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:452](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L452)

## Accessors

### alive

#### Get Signature

> **get** **alive**(): `boolean`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:458](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L458)

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

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:462](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L462)

#### Returns

`void`

#### Overrides

`AbstractDisposableResult.dispose`

***

### unwrap()

> **unwrap**(): `never`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:468](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L468)

#### Returns

`never`

***

### unwrapOr()

> **unwrapOr**<`T`>(`fallback`): `T`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:473](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L473)

#### Type Parameters

##### T

`T`

#### Parameters

##### fallback

`T`

#### Returns

`T`

***

### fail()

> `static` **fail**<`S`, `F`>(`error`, `onUnwrap`): `DisposableFail`<`F`>

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

`DisposableFail`<`F`>

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

> `static` **success**<`S`, `F`>(`value`): [`DisposableSuccess`](DisposableSuccess.md)<`S`>

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

[`DisposableSuccess`](DisposableSuccess.md)<`S`>

#### Inherited from

`AbstractDisposableResult.success`
