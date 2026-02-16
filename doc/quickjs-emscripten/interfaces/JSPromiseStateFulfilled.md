[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../README.md) / JSPromiseStateFulfilled

# Interface: JSPromiseStateFulfilled

Defined in: [packages/quickjs-emscripten-core/src/deferred-promise.ts:33](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/deferred-promise.ts#L33)

Fulfilled promise state.
See [JSPromiseState](../type-aliases/JSPromiseState.md).

## Contents

* [Properties](#properties)
  * [error?](#error)
  * [notAPromise?](#notapromise)
  * [type](#type)
  * [value](#value)

## Properties

### error?

> `optional` **error**: `undefined`

Defined in: [packages/quickjs-emscripten-core/src/deferred-promise.ts:36](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/deferred-promise.ts#L36)

***

### notAPromise?

> `optional` **notAPromise**: `boolean`

Defined in: [packages/quickjs-emscripten-core/src/deferred-promise.ts:38](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/deferred-promise.ts#L38)

Trying to get the promise state of a non-Promise value returns a fulfilled state with the original value, and `notAPromise: true`.

***

### type

> **type**: `"fulfilled"`

Defined in: [packages/quickjs-emscripten-core/src/deferred-promise.ts:34](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/deferred-promise.ts#L34)

***

### value

> **value**: [`QuickJSHandle`](../type-aliases/QuickJSHandle.md)

Defined in: [packages/quickjs-emscripten-core/src/deferred-promise.ts:35](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/deferred-promise.ts#L35)
