[quickjs-emscripten](../../packages.md) • **@jitl/quickjs-singlefile-mjs-release-asyncify** • [Readme](README.md) \| [Exports](exports.md)

***

[quickjs-emscripten](../../packages.md) / @jitl/quickjs-singlefile-mjs-release-asyncify

# @jitl/quickjs-singlefile-mjs-release-asyncify

## Contents

- [Variables](exports.md#variables)
  - [default](exports.md#default)
  - [@jitl/quickjs-singlefile-mjs-release-asyncify](exports.md#jitlquickjs-singlefile-mjs-release-asyncify)

## Variables

### default

> **`const`** **default**: [`QuickJSAsyncVariant`](../../quickjs-emscripten/interfaces/QuickJSAsyncVariant.md)

### @jitl/quickjs-singlefile-mjs-release-asyncify

[Docs](https://github.com/justjake/quickjs-emscripten/blob/main/doc/@jitl/quickjs-singlefile-mjs-release-asyncify/README.md) |
Variant with the WASM data embedded into a NodeJS ESModule.

| Variable            |    Setting                     |    Description    |
| --                  | --                             | --                |
| library             | quickjs             | The original [bellard/quickjs](https://github.com/bellard/quickjs) library. Version [2024-01-13+626e0d4e](https://github.com/bellard/quickjs/commit/626e0d4e60db2b81a0505fa9c61941e608624e7e) vendored to quickjs-emscripten on 2024-02-11. |
| releaseMode         | release         | Optimized for performance; use when building/deploying your application. |
| syncMode            | asyncify            | Build run through the ASYNCIFY WebAssembly transform. This imposes substantial size (2x the size of sync) and speed penalties (40% the speed of sync). In return, allows synchronous calls from the QuickJS WASM runtime to async functions on the host. The extra magic makes this variant slower than sync variants. Note that both variants support regular async functions. Only adopt ASYNCIFY if you need to! The [QuickJSAsyncRuntime](https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten/classes/QuickJSAsyncRuntime.md) and [QuickJSAsyncContext](https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten/classes/QuickJSAsyncContext.md) classes expose the ASYNCIFY-specific APIs. |
| emscriptenInclusion | singlefile | The WASM runtime is included directly in the JS file. Use if you run into issues with missing .wasm files when building or deploying your app. |
| exports             | import                  | Has these package.json export conditions |

#### Source

[index.ts:18](https://github.com/justjake/quickjs-emscripten/blob/main/packages/variant-quickjs-singlefile-mjs-release-asyncify/src/index.ts#L18)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
