[**quickjs-emscripten**](../../../../README.md)

***

[quickjs-emscripten](../../../../packages.md) / [quickjs-emscripten-core](../../../README.md) / [errors](../README.md) / QuickJSUnwrapError

# Class: QuickJSUnwrapError

Defined in: [packages/quickjs-emscripten-core/src/errors.ts:6](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/errors.ts#L6)

Error thrown if [QuickJSContext#unwrapResult](../../../classes/QuickJSContext.md#unwrapresult) unwraps an error value that isn't an object.

## Contents

* [Extends](#extends)
* [Constructors](#constructors)
  * [Constructor](#constructor)
* [Properties](#properties)
  * [cause](#cause-1)
  * [context?](#context-1)
  * [name](#name)

## Extends

* `Error`

## Constructors

### Constructor

> **new QuickJSUnwrapError**(`cause`, `context?`): `QuickJSUnwrapError`

Defined in: [packages/quickjs-emscripten-core/src/errors.ts:8](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/errors.ts#L8)

#### Parameters

##### cause

`unknown`

##### context?

[`QuickJSContext`](../../../classes/QuickJSContext.md)

#### Returns

`QuickJSUnwrapError`

#### Overrides

`Error.constructor`

## Properties

### cause

> **cause**: `unknown`

Defined in: [packages/quickjs-emscripten-core/src/errors.ts:9](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/errors.ts#L9)

***

### context?

> `optional` **context**: [`QuickJSContext`](../../../classes/QuickJSContext.md)

Defined in: [packages/quickjs-emscripten-core/src/errors.ts:10](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/errors.ts#L10)

***

### name

> **name**: `string` = `"QuickJSUnwrapError"`

Defined in: [packages/quickjs-emscripten-core/src/errors.ts:7](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/errors.ts#L7)

#### Overrides

`Error.name`
