[quickjs-emscripten](../../../../packages.md) • **quickjs-emscripten-core** • [Readme](../../../README.md) \| [Exports](../../../exports.md)

***

[quickjs-emscripten](../../../../packages.md) / [quickjs-emscripten-core](../../../exports.md) / [errors](../README.md) / QuickJSUnwrapError

# Class: QuickJSUnwrapError

Error thrown if [[QuickJSContext.unwrapResult]] unwraps an error value that isn't an object.

## Contents

- [Extends](QuickJSUnwrapError.md#extends)
- [Constructors](QuickJSUnwrapError.md#constructors)
  - [new QuickJSUnwrapError(cause, context)](QuickJSUnwrapError.md#new-quickjsunwraperrorcause-context)
- [Properties](QuickJSUnwrapError.md#properties)
  - [cause](QuickJSUnwrapError.md#cause)
  - [context?](QuickJSUnwrapError.md#context)
  - [name](QuickJSUnwrapError.md#name)

## Extends

- `Error`

## Constructors

### new QuickJSUnwrapError(cause, context)

> **new QuickJSUnwrapError**(`cause`, `context`?): [`QuickJSUnwrapError`](QuickJSUnwrapError.md)

#### Parameters

• **cause**: `unknown`

• **context?**: [`QuickJSContext`](../../../classes/QuickJSContext.md)

#### Returns

[`QuickJSUnwrapError`](QuickJSUnwrapError.md)

#### Overrides

`Error.constructor`

#### Source

[packages/quickjs-emscripten-core/src/errors.ts:8](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/errors.ts#L8)

## Properties

### cause

> **cause**: `unknown`

#### Source

[packages/quickjs-emscripten-core/src/errors.ts:9](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/errors.ts#L9)

***

### context?

> **context**?: [`QuickJSContext`](../../../classes/QuickJSContext.md)

#### Source

[packages/quickjs-emscripten-core/src/errors.ts:10](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/errors.ts#L10)

***

### name

> **name**: `string` = `"QuickJSUnwrapError"`

#### Overrides

`Error.name`

#### Source

[packages/quickjs-emscripten-core/src/errors.ts:7](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/errors.ts#L7)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
