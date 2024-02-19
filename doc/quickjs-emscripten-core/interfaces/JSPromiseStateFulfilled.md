[quickjs-emscripten](../../packages.md) • **quickjs-emscripten-core** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../exports.md) / JSPromiseStateFulfilled

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

[packages/quickjs-emscripten-core/src/deferred-promise.ts:36](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/deferred-promise.ts#L36)

***

### notAPromise?

> **notAPromise**?: `boolean`

Trying to get the promise state of a non-Promise value returns a fulfilled state with the original value, and `notAPromise: true`.

#### Source

[packages/quickjs-emscripten-core/src/deferred-promise.ts:38](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/deferred-promise.ts#L38)

***

### type

> **type**: `"fulfilled"`

#### Source

[packages/quickjs-emscripten-core/src/deferred-promise.ts:34](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/deferred-promise.ts#L34)

***

### value

> **value**: [`QuickJSHandle`](../exports.md#quickjshandle)

#### Source

[packages/quickjs-emscripten-core/src/deferred-promise.ts:35](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/deferred-promise.ts#L35)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
