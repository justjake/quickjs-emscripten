[quickjs-emscripten](../../packages.md) • **@jitl/quickjs-wasmfile-release-asyncify** • [Readme](README.md) \| [Exports](exports.md)

***

[quickjs-emscripten](../../packages.md) / @jitl/quickjs-wasmfile-release-asyncify

# @jitl/quickjs-wasmfile-release-asyncify

## Contents

- [Variables](exports.md#variables)
  - [default](exports.md#default)
  - [[@jitl/quickjs-wasmfile-release-asyncify](https://github.com/justjake/quickjs-emscripten/blob/main/doc/@jitl/quickjs-wasmfile-release-asyncify/README.md)](exports.md#jitlquickjs-wasmfile-release-asyncifyhttpsgithubcomjustjakequickjs-emscriptenblobmaindocjitlquickjs-wasmfile-release-asyncifyreadmemd)

## Variables

### default

> **`const`** **default**: `Object`

This export is a variant of the quickjs WASM library:
### [@jitl/quickjs-wasmfile-release-asyncify](https://github.com/justjake/quickjs-emscripten/blob/main/doc/@jitl/quickjs-wasmfile-release-asyncify/README.md)

Variant with separate .WASM file. Supports browser, NodeJS ESM, and NodeJS CJS.

| Variable            |    Setting                     |    Description    |
| --                  | --                             | --                |
| releaseMode         | release         | Optimized for performance; use when building/deploying your application. |
| syncMode            | asyncify            | Build run through the ASYNCIFY WebAssembly transform. This imposes substantial size (2x the size of sync) and speed penalties (40% the speed of sync). In return, allows synchronous calls from the QuickJS WASM runtime to async functions on the host. The extra magic makes this variant slower than sync variants. Note that both variants support regular async functions. Only adopt ASYNCIFY if you need to! The [QuickJSAsyncRuntime](https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten/classes/QuickJSAsyncRuntime.md) and [QuickJSAsyncContext](https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten/classes/QuickJSAsyncContext.md) classes expose the ASYNCIFY-specific APIs. |
| emscriptenInclusion | wasm | Has a separate .wasm file. May offer better caching in your browser, and reduces the size of your JS bundle. If you have issues, try a 'singlefile' variant. |
| exports             | require import browser                  | Has these package.json export conditions |

#### Type declaration

##### importFFI

> **`readonly`** **importFFI**: () => `Promise`\<*typeof* `QuickJSAsyncFFI` \| (`module`) => [`QuickJSAsyncFFI`](../../quickjs-emscripten/interfaces/QuickJSAsyncFFI.md)\>

###### Returns

`Promise`\<*typeof* `QuickJSAsyncFFI` \| (`module`) => [`QuickJSAsyncFFI`](../../quickjs-emscripten/interfaces/QuickJSAsyncFFI.md)\>

##### importModuleLoader

> **`readonly`** **importModuleLoader**: () => `Promise`\<`__module` \| [`EmscriptenModuleLoader`](../../quickjs-emscripten/interfaces/EmscriptenModuleLoader.md)\<[`QuickJSAsyncEmscriptenModule`](../../quickjs-emscripten/interfaces/QuickJSAsyncEmscriptenModule.md)\> \| `Object` \| `Object`\>

###### Returns

`Promise`\<`__module` \| [`EmscriptenModuleLoader`](../../quickjs-emscripten/interfaces/EmscriptenModuleLoader.md)\<[`QuickJSAsyncEmscriptenModule`](../../quickjs-emscripten/interfaces/QuickJSAsyncEmscriptenModule.md)\> \| `Object` \| `Object`\>

##### type

> **`readonly`** **type**: `"async"` = `"async"`

#### Source

[variant-quickjs-wasmfile-release-asyncify/src/index.ts:17](https://github.com/justjake/quickjs-emscripten/blob/main/packages/variant-quickjs-wasmfile-release-asyncify/src/index.ts#L17)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
