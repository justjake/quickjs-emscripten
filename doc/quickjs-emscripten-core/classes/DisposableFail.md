[quickjs-emscripten](../../packages.md) • **quickjs-emscripten-core** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../exports.md) / DisposableFail

# Class: DisposableFail\<S, F\>

## Contents

- [Extends](DisposableFail.md#extends)
- [Type parameters](DisposableFail.md#type-parameters)
- [Constructors](DisposableFail.md#constructors)
  - [new DisposableFail(error, onUnwrap)](DisposableFail.md#new-disposablefailerror-onunwrap)
- [Properties](DisposableFail.md#properties)
  - [error](DisposableFail.md#error)
- [Accessors](DisposableFail.md#accessors)
  - [alive](DisposableFail.md#alive)
- [Methods](DisposableFail.md#methods)
  - [`[dispose]`()](DisposableFail.md#dispose)
  - [cast()](DisposableFail.md#cast)
  - [dispose()](DisposableFail.md#dispose)
  - [unwrap()](DisposableFail.md#unwrap)
  - [unwrapOr()](DisposableFail.md#unwrapor)
  - [fail()](DisposableFail.md#fail)
  - [is()](DisposableFail.md#is)
  - [success()](DisposableFail.md#success)

## Extends

- `AbstractDisposableResult`\<`S`, `F`\>

## Type parameters

• **S**

• **F**

## Constructors

### new DisposableFail(error, onUnwrap)

> **new DisposableFail**\<`S`, `F`\>(`error`, `onUnwrap`): [`DisposableFail`](DisposableFail.md)\<`S`, `F`\>

#### Parameters

• **error**: `F`

• **onUnwrap**: (`status`) => `void`

#### Returns

[`DisposableFail`](DisposableFail.md)\<`S`, `F`\>

#### Overrides

`AbstractDisposableResult<S, F>.constructor`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:428](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L428)

## Properties

### error

> **`readonly`** **error**: `F`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:429](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L429)

## Accessors

### alive

> **`get`** **alive**(): `boolean`

#### Returns

`boolean`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:435](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L435)

## Methods

### `[dispose]`()

> **[dispose]**(): `void`

Just calls the standard .dispose() method of this class.

#### Returns

`void`

#### Inherited from

`AbstractDisposableResult.[dispose]`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:47](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L47)

***

### cast()

> **cast**\<`S2`\>(): [`DisposableFail`](DisposableFail.md)\<`S2`, `F`\>

#### Type parameters

• **S2** = `never`

#### Returns

[`DisposableFail`](DisposableFail.md)\<`S2`, `F`\>

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:452](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L452)

***

### dispose()

> **dispose**(): `void`

#### Returns

`void`

#### Overrides

`AbstractDisposableResult.dispose`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:439](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L439)

***

### unwrap()

> **unwrap**(): `S`

#### Returns

`S`

#### Overrides

`AbstractDisposableResult.unwrap`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:443](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L443)

***

### unwrapOr()

> **unwrapOr**\<`T`\>(`fallback`): `S` \| `T`

#### Type parameters

• **T**

#### Parameters

• **fallback**: `T`

#### Returns

`S` \| `T`

#### Overrides

`AbstractDisposableResult.unwrapOr`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:448](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L448)

***

### fail()

> **`static`** **fail**\<`S`, `F`\>(`error`, `onUnwrap`): [`DisposableFail`](DisposableFail.md)\<`S`, `F`\>

#### Type parameters

• **S**

• **F**

#### Parameters

• **error**: `F`

• **onUnwrap**: (`status`) => `void`

#### Returns

[`DisposableFail`](DisposableFail.md)\<`S`, `F`\>

#### Inherited from

`AbstractDisposableResult.fail`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:384](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L384)

***

### is()

> **`static`** **is**\<`S`, `F`\>(`result`): `result is DisposableResult<S, F>`

#### Type parameters

• **S**

• **F**

#### Parameters

• **result**: [`SuccessOrFail`](../exports.md#successorfails-f)\<`S`, `F`\>

#### Returns

`result is DisposableResult<S, F>`

#### Inherited from

`AbstractDisposableResult.is`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:391](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L391)

***

### success()

> **`static`** **success**\<`S`, `F`\>(`value`): [`DisposableSuccess`](DisposableSuccess.md)\<`S`, `F`\>

#### Type parameters

• **S**

• **F**

#### Parameters

• **value**: `S`

#### Returns

[`DisposableSuccess`](DisposableSuccess.md)\<`S`, `F`\>

#### Inherited from

`AbstractDisposableResult.success`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:380](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L380)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
