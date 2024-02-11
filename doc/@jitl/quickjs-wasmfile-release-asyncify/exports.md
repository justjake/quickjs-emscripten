[quickjs-emscripten](../../packages.md) • **@jitl/quickjs-wasmfile-release-asyncify** • [Readme](README.md) \| [Exports](exports.md)

***

[quickjs-emscripten](../../packages.md) / @jitl/quickjs-wasmfile-release-asyncify

# @jitl/quickjs-wasmfile-release-asyncify

## Contents

- [Variables](exports.md#variables)
  - [default](exports.md#default)
  - [@jitl/quickjs-wasmfile-release-asyncify](exports.md#jitlquickjs-wasmfile-release-asyncify)

## Variables

### default

> **`const`** **default**: [`QuickJSAsyncVariant`](../../quickjs-emscripten/interfaces/QuickJSAsyncVariant.md)

### @jitl/quickjs-wasmfile-release-asyncify

[Docs](https://github.com/justjake/quickjs-emscripten/blob/main/doc/@jitl/quickjs-wasmfile-release-asyncify/README.md) |
Variant with separate .WASM file. Supports browser ESM, NodeJS ESM, and NodeJS CommonJS.

| Variable            |    Setting                     |    Description    |
| --                  | --                             | --                |
| library             | quickjs             | The original [bellard/quickjs](https://github.com/bellard/quickjs) library. Version [2024-01-13+229b07b9](https://github.com/bellard/quickjs/commit/229b07b9b2c811eaf84db209a1d6f9e2a8a7b0d9) vendored to quickjs-emscripten on 2024-02-11. |
| releaseMode         | release         | Optimized for performance; use when building/deploying your application. |
| syncMode            | asyncify            | Build run through the ASYNCIFY WebAssembly transform. This imposes substantial size (2x the size of sync) and speed penalties (40% the speed of sync). In return, allows synchronous calls from the QuickJS WASM runtime to async functions on the host. The extra magic makes this variant slower than sync variants. Note that both variants support regular async functions. Only adopt ASYNCIFY if you need to! The [QuickJSAsyncRuntime](https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten/classes/QuickJSAsyncRuntime.md) and [QuickJSAsyncContext](https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten/classes/QuickJSAsyncContext.md) classes expose the ASYNCIFY-specific APIs. |
| emscriptenInclusion | wasm | Has a separate .wasm file. May offer better caching in your browser, and reduces the size of your JS bundle. If you have issues, try a 'singlefile' variant. |
| exports             | require import browser workerd                  | Has these package.json export conditions |

#### Source

[index.ts:18](https://github.com/justjake/quickjs-emscripten/blob/main/packages/variant-quickjs-wasmfile-release-asyncify/src/index.ts#L18)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
