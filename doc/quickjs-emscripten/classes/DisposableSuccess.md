[quickjs-emscripten](../../packages.md) • **quickjs-emscripten** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../exports.md) / DisposableSuccess

# Class: DisposableSuccess\<S\>

## Contents

- [Extends](DisposableSuccess.md#extends)
- [Type parameters](DisposableSuccess.md#type-parameters)
- [Constructors](DisposableSuccess.md#constructors)
  - [new DisposableSuccess(value)](DisposableSuccess.md#new-disposablesuccessvalue)
- [Properties](DisposableSuccess.md#properties)
  - [error?](DisposableSuccess.md#error)
  - [value](DisposableSuccess.md#value)
- [Accessors](DisposableSuccess.md#accessors)
  - [alive](DisposableSuccess.md#alive)
- [Methods](DisposableSuccess.md#methods)
  - [`[dispose]`()](DisposableSuccess.md#dispose)
  - [dispose()](DisposableSuccess.md#dispose)
  - [unwrap()](DisposableSuccess.md#unwrap)
  - [unwrapOr()](DisposableSuccess.md#unwrapor)
  - [fail()](DisposableSuccess.md#fail)
  - [is()](DisposableSuccess.md#is)
  - [success()](DisposableSuccess.md#success)

## Extends

- `AbstractDisposableResult`

## Type parameters

• **S**

## Constructors

### new DisposableSuccess(value)

> **new DisposableSuccess**\<`S`\>(`value`): [`DisposableSuccess`](DisposableSuccess.md)\<`S`\>

#### Parameters

• **value**: `S`

#### Returns

[`DisposableSuccess`](DisposableSuccess.md)\<`S`\>

#### Overrides

`AbstractDisposableResult.constructor`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:427](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L427)

## Properties

### error?

> **error**?: `undefined`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:425](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L425)

***

### value

> **`readonly`** **value**: `S`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:427](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L427)

## Accessors

### alive

> **`get`** **alive**(): `boolean`

#### Returns

`boolean`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:431](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L431)

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

### dispose()

> **dispose**(): `void`

#### Returns

`void`

#### Overrides

`AbstractDisposableResult.dispose`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:435](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L435)

***

### unwrap()

> **unwrap**(): `S`

#### Returns

`S`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:441](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L441)

***

### unwrapOr()

> **unwrapOr**\<`T`\>(`_fallback`): `S` \| `T`

#### Type parameters

• **T**

#### Parameters

• **\_fallback**: `T`

#### Returns

`S` \| `T`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:445](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L445)

***

### fail()

> **`static`** **fail**\<`S`, `F`\>(`error`, `onUnwrap`): [`DisposableFail`](DisposableFail.md)\<`F`\>

#### Type parameters

• **S**

• **F**

#### Parameters

• **error**: `F`

• **onUnwrap**: (`status`) => `void`

#### Returns

[`DisposableFail`](DisposableFail.md)\<`F`\>

#### Inherited from

`AbstractDisposableResult.fail`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:409](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L409)

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

[packages/quickjs-emscripten-core/src/lifetime.ts:416](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L416)

***

### success()

> **`static`** **success**\<`S`, `F`\>(`value`): [`DisposableSuccess`](DisposableSuccess.md)\<`S`\>

#### Type parameters

• **S**

• **F**

#### Parameters

• **value**: `S`

#### Returns

[`DisposableSuccess`](DisposableSuccess.md)\<`S`\>

#### Inherited from

`AbstractDisposableResult.success`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:405](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L405)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
