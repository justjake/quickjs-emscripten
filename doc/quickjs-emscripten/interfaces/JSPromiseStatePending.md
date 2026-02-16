[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../README.md) / JSPromiseStatePending

# Interface: JSPromiseStatePending

Defined in: [packages/quickjs-emscripten-core/src/deferred-promise.ts:20](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/deferred-promise.ts#L20)

Pending promise state.
See [JSPromiseState](../type-aliases/JSPromiseState.md).

* [Properties](#properties)

  * [type](#type)

* [Accessors](#accessors)

  * [error](#error)

## Properties

### type

> **type**: `"pending"`

Defined in: [packages/quickjs-emscripten-core/src/deferred-promise.ts:21](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/deferred-promise.ts#L21)

## Accessors

### error

#### Get Signature

> **get** **error**(): `Error`

Defined in: [packages/quickjs-emscripten-core/src/deferred-promise.ts:26](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/deferred-promise.ts#L26)

The error property here allows unwrapping a JSPromiseState with [QuickJSContext#unwrapResult](../classes/QuickJSContext.md#unwrapresult).
Unwrapping a pending promise will throw a QuickJSPromisePending error.

##### Returns

`Error`
