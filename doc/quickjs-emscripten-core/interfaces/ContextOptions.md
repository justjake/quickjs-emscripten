[quickjs-emscripten](../../packages.md) • **quickjs-emscripten-core** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../exports.md) / ContextOptions

# Interface: ContextOptions

Options for creating a [QuickJSContext](../classes/QuickJSContext.md) or [QuickJSAsyncContext](../classes/QuickJSAsyncContext.md)
Pass to [QuickJSRuntime#newContext](../classes/QuickJSRuntime.md#newcontext).

## Contents

- [Properties](ContextOptions.md#properties)
  - [intrinsics?](ContextOptions.md#intrinsics)

## Properties

### intrinsics?

> **intrinsics**?: [`Intrinsics`](../exports.md#intrinsics)

What built-in objects and language features to enable?
If unset, the default intrinsics will be used.
To omit all intrinsics, pass an empty array.

To remove a specific intrinsic, but retain the other defaults,
override it from [DefaultIntrinsics](../exports.md#defaultintrinsics)
```ts
const contextWithoutDateOrEval = runtime.newContext({
  intrinsics: {
    ...DefaultIntrinsics,
    Date: false,
  }
})
```

#### Source

[packages/quickjs-emscripten-core/src/types.ts:228](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L228)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
