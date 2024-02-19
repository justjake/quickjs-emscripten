[quickjs-emscripten](../../packages.md) • **quickjs-emscripten** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../exports.md) / JSPromiseStateFulfilled

# Interface: JSPromiseStateFulfilled

Fulfilled promise state.
See [JSPromiseState](../exports.md#jspromisestate).

## Contents

- [Properties](JSPromiseStateFulfilled.md#properties)
  - [error?](JSPromiseStateFulfilled.md#error)
  - [notAPromise?](JSPromiseStateFulfilled.md#notapromise)
  - [type](JSPromiseStateFulfilled.md#type)
  - [value](JSPromiseStateFulfilled.md#value)

## Properties

### error?

> **error**?: `undefined`

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:693

***

### notAPromise?

> **notAPromise**?: `boolean`

Trying to get the promise state of a non-Promise value returns a fulfilled state with the original value, and `notAPromise: true`.

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:695

***

### type

> **type**: `"fulfilled"`

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:691

***

### value

> **value**: [`QuickJSHandle`](../exports.md#quickjshandle)

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:692

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
