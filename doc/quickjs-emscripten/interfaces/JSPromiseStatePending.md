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

packages/quickjs-emscripten-core/dist/index.d.ts:679

## Accessors

### error

> **`get`** **error**(): `Error`

The error property here allows unwrapping a JSPromiseState with [QuickJSContext#unwrapResult](../classes/QuickJSContext.md#unwrapresult).
Unwrapping a pending promise will throw a [QuickJSPromisePending]([object Object]) error.

#### Returns

`Error`

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:684

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
