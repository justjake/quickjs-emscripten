[quickjs-emscripten](../README.md) / [Exports](../modules.md) / [errors](../modules/errors.md) / QuickJSUnwrapError

# Class: QuickJSUnwrapError

[errors](../modules/errors.md).QuickJSUnwrapError

Error thrown if [QuickJSContext.unwrapResult](QuickJSContext.md#unwrapresult) unwraps an error value that isn't an object.

## Hierarchy

- `Error`

  ↳ **`QuickJSUnwrapError`**

## Table of contents

### Constructors

- [constructor](errors.QuickJSUnwrapError.md#constructor)

### Properties

- [cause](errors.QuickJSUnwrapError.md#cause)
- [context](errors.QuickJSUnwrapError.md#context)
- [name](errors.QuickJSUnwrapError.md#name)

## Constructors

### constructor

• **new QuickJSUnwrapError**(`cause`, `context?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cause` | `unknown` |
| `context?` | [`QuickJSContext`](QuickJSContext.md) |

#### Overrides

Error.constructor

#### Defined in

[ts/errors.ts:8](https://github.com/justjake/quickjs-emscripten/blob/main/ts/errors.ts#L8)

## Properties

### cause

• **cause**: `unknown`

___

### context

• `Optional` **context**: [`QuickJSContext`](QuickJSContext.md)

___

### name

• **name**: `string` = `"QuickJSUnwrapError"`

#### Overrides

Error.name

#### Defined in

[ts/errors.ts:7](https://github.com/justjake/quickjs-emscripten/blob/main/ts/errors.ts#L7)
