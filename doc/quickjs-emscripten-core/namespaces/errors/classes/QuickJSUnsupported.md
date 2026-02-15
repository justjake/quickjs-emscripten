[quickjs-emscripten](../../../../packages.md) • **quickjs-emscripten-core** • [Readme](../../../README.md) \| [Exports](../../../exports.md)

***

[quickjs-emscripten](../../../../packages.md) / [quickjs-emscripten-core](../../../exports.md) / [errors](../README.md) / QuickJSUnsupported

# Class: QuickJSUnsupported

Error thrown when attempting to use a feature that is not supported by the
current QuickJS variant (e.g., modules in mquickjs).

## Contents

- [Extends](QuickJSUnsupported.md#extends)
- [Constructors](QuickJSUnsupported.md#constructors)
  - [new QuickJSUnsupported(feature, operation, variantName)](QuickJSUnsupported.md#new-quickjsunsupportedfeature-operation-variantname)
- [Properties](QuickJSUnsupported.md#properties)
  - [feature](QuickJSUnsupported.md#feature)
  - [name](QuickJSUnsupported.md#name)
  - [operation](QuickJSUnsupported.md#operation)
  - [variantName](QuickJSUnsupported.md#variantname)

## Extends

- `Error`

## Constructors

### new QuickJSUnsupported(feature, operation, variantName)

> **new QuickJSUnsupported**(`feature`, `operation`, `variantName`): [`QuickJSUnsupported`](QuickJSUnsupported.md)

#### Parameters

• **feature**: `string`

The feature that is not supported

• **operation**: `undefined` \| `string`

The operation that was attempted, if specified

• **variantName**: `undefined` \| `string`

The name of the variant that doesn't support this feature

#### Returns

[`QuickJSUnsupported`](QuickJSUnsupported.md)

#### Overrides

`Error.constructor`

#### Source

[packages/quickjs-emscripten-core/src/errors.ts:67](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/errors.ts#L67)

## Properties

### feature

> **feature**: `string`

The feature that is not supported

#### Source

[packages/quickjs-emscripten-core/src/errors.ts:69](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/errors.ts#L69)

***

### name

> **name**: `string` = `"QuickJSUnsupported"`

#### Overrides

`Error.name`

#### Source

[packages/quickjs-emscripten-core/src/errors.ts:65](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/errors.ts#L65)

***

### operation

> **operation**: `undefined` \| `string`

The operation that was attempted, if specified

#### Source

[packages/quickjs-emscripten-core/src/errors.ts:71](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/errors.ts#L71)

***

### variantName

> **variantName**: `undefined` \| `string`

The name of the variant that doesn't support this feature

#### Source

[packages/quickjs-emscripten-core/src/errors.ts:73](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/errors.ts#L73)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
