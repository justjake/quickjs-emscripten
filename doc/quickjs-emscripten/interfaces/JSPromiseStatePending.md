[quickjs-emscripten](../../packages.md) • **quickjs-emscripten** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../exports.md) / JSPromiseStatePending

# Interface: JSPromiseStatePending

Pending promise state.
See [JSPromiseState](../exports.md#jspromisestate).

## Contents

- [Properties](JSPromiseStatePending.md#properties)
  - [type](JSPromiseStatePending.md#type)
- [Accessors](JSPromiseStatePending.md#accessors)
  - [error](JSPromiseStatePending.md#error)

## Properties

### type

> **type**: `"pending"`

#### Source

[packages/quickjs-emscripten-core/src/deferred-promise.ts:21](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/deferred-promise.ts#L21)

## Accessors

### error

> **`get`** **error**(): `Error`

The error property here allows unwrapping a JSPromiseState with [QuickJSContext#unwrapResult](../classes/QuickJSContext.md#unwrapresult).
Unwrapping a pending promise will throw a QuickJSPromisePending error.

#### Returns

`Error`

#### Source

[packages/quickjs-emscripten-core/src/deferred-promise.ts:26](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/deferred-promise.ts#L26)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
