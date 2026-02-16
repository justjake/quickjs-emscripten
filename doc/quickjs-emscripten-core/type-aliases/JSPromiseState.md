[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../README.md) / JSPromiseState

# Type Alias: JSPromiseState

> **JSPromiseState** = [`JSPromiseStatePending`](../interfaces/JSPromiseStatePending.md) | [`JSPromiseStateFulfilled`](../interfaces/JSPromiseStateFulfilled.md) | [`JSPromiseStateRejected`](../interfaces/JSPromiseStateRejected.md)

Defined in: [packages/quickjs-emscripten-core/src/deferred-promise.ts:11](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/deferred-promise.ts#L11)

A promise state inside QuickJS, which can be pending, fulfilled, or rejected.
You can unwrap a JSPromiseState with [QuickJSContext#unwrapResult](../classes/QuickJSContext.md#unwrapresult).
