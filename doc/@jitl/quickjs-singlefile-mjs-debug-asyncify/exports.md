[quickjs-emscripten](../../packages.md) • **@jitl/quickjs-singlefile-mjs-debug-asyncify** • [Readme](README.md) \| [Exports](exports.md)

***

[quickjs-emscripten](../../packages.md) / @jitl/quickjs-singlefile-mjs-debug-asyncify

# @jitl/quickjs-singlefile-mjs-debug-asyncify

## Contents

- [Variables](exports.md#variables)
  - [default](exports.md#default)
  - [@jitl/quickjs-singlefile-mjs-debug-asyncify](exports.md#jitlquickjs-singlefile-mjs-debug-asyncify)

## Variables

### default

> **`const`** **default**: [`QuickJSAsyncVariant`](../../quickjs-emscripten/interfaces/QuickJSAsyncVariant.md)

### @jitl/quickjs-singlefile-mjs-debug-asyncify

[Docs](https://github.com/justjake/quickjs-emscripten/blob/main/doc/@jitl/quickjs-singlefile-mjs-debug-asyncify/README.md) |
Variant with the WASM data embedded into a NodeJS ESModule.

| Variable            |    Setting                     |    Description    |
| --                  | --                             | --                |
| library             | quickjs             | The original [bellard/quickjs](https://github.com/bellard/quickjs) library. Version [2025-09-13+f1139494](https://github.com/bellard/quickjs/commit/f1139494d18a2053630c5ed3384a42bb70db3c53) vendored to quickjs-emscripten on 2026-02-15. |
| releaseMode         | debug         | Enables assertions and memory sanitizers. Try to run your tests against debug variants, in addition to your preferred production variant, to catch more bugs. |
| syncMode            | asyncify            | Build run through the ASYNCIFY WebAssembly transform. This imposes substantial size (2x the size of sync) and speed penalties (40% the speed of sync). In return, allows synchronous calls from the QuickJS WASM runtime to async functions on the host. The extra magic makes this variant slower than sync variants. Note that both variants support regular async functions. Only adopt ASYNCIFY if you need to! The [QuickJSAsyncRuntime](https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten/classes/QuickJSAsyncRuntime.md) and [QuickJSAsyncContext](https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten/classes/QuickJSAsyncContext.md) classes expose the ASYNCIFY-specific APIs. |
| emscriptenInclusion | singlefile | The WASM runtime is included directly in the JS file. Use if you run into issues with missing .wasm files when building or deploying your app. |
| exports             | import                  | Has these package.json export conditions |

#### Source

[index.ts:18](https://github.com/justjake/quickjs-emscripten/blob/main/packages/variant-quickjs-singlefile-mjs-debug-asyncify/src/index.ts#L18)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
