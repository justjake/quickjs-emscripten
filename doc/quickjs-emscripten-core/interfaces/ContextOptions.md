[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../README.md) / ContextOptions

# Interface: ContextOptions

Defined in: [packages/quickjs-emscripten-core/src/types.ts:212](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L212)

Options for creating a [QuickJSContext](../classes/QuickJSContext.md) or [QuickJSAsyncContext](../classes/QuickJSAsyncContext.md)
Pass to [QuickJSRuntime#newContext](../classes/QuickJSRuntime.md#newcontext).

* [Properties](#properties)

  * [intrinsics?](#intrinsics)

## Properties

### intrinsics?

> `optional` **intrinsics**: [`Intrinsics`](../type-aliases/Intrinsics.md)

Defined in: [packages/quickjs-emscripten-core/src/types.ts:229](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L229)

What built-in objects and language features to enable?
If unset, the default intrinsics will be used.
To omit all intrinsics, pass an empty array.

To remove a specific intrinsic, but retain the other defaults,
override it from [DefaultIntrinsics](../variables/DefaultIntrinsics.md)

```ts
const contextWithoutDateOrEval = runtime.newContext({
  intrinsics: {
    ...DefaultIntrinsics,
    Date: false,
  }
})
```
