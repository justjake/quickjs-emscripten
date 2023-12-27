[quickjs-emscripten](../../packages.md) • **@jitl/quickjs-wasmfile-release-sync** • [Readme](README.md) \| [Exports](exports.md)

***

[quickjs-emscripten](../../packages.md) / @jitl/quickjs-wasmfile-release-sync

# @jitl/quickjs-wasmfile-release-sync

## Contents

- [Variables](exports.md#variables)
  - [default](exports.md#default)
  - [[@jitl/quickjs-wasmfile-release-sync](https://github.com/justjake/quickjs-emscripten/blob/main/doc/@jitl/quickjs-wasmfile-release-sync/README.md)](exports.md#jitlquickjs-wasmfile-release-synchttpsgithubcomjustjakequickjs-emscriptenblobmaindocjitlquickjs-wasmfile-release-syncreadmemd)

## Variables

### default

> **`const`** **default**: `Object`

This export is a variant of the quickjs WASM library:
### [@jitl/quickjs-wasmfile-release-sync](https://github.com/justjake/quickjs-emscripten/blob/main/doc/@jitl/quickjs-wasmfile-release-sync/README.md)

Variant with separate .WASM file. Supports browser, NodeJS ESM, and NodeJS CJS.

| Variable            |    Setting                     |    Description    |
| --                  | --                             | --                |
| releaseMode         | release         | Optimized for performance; use when building/deploying your application. |
| syncMode            | sync            | The default, normal build. Note that both variants support regular async functions. |
| emscriptenInclusion | wasm | Has a separate .wasm file. May offer better caching in your browser, and reduces the size of your JS bundle. If you have issues, try a 'singlefile' variant. |
| exports             | require import browser                  | Has these package.json export conditions |

#### Type declaration

##### importFFI

> **`readonly`** **importFFI**: () => `Promise`\<*typeof* `QuickJSFFI` \| (`module`) => [`QuickJSFFI`](../../quickjs-emscripten/interfaces/QuickJSFFI.md)\>

###### Returns

`Promise`\<*typeof* `QuickJSFFI` \| (`module`) => [`QuickJSFFI`](../../quickjs-emscripten/interfaces/QuickJSFFI.md)\>

##### importModuleLoader

> **`readonly`** **importModuleLoader**: () => `Promise`\<`__module` \| [`EmscriptenModuleLoader`](../../quickjs-emscripten/interfaces/EmscriptenModuleLoader.md)\<[`QuickJSEmscriptenModule`](../../quickjs-emscripten/interfaces/QuickJSEmscriptenModule.md)\> \| `Object` \| `Object`\>

###### Returns

`Promise`\<`__module` \| [`EmscriptenModuleLoader`](../../quickjs-emscripten/interfaces/EmscriptenModuleLoader.md)\<[`QuickJSEmscriptenModule`](../../quickjs-emscripten/interfaces/QuickJSEmscriptenModule.md)\> \| `Object` \| `Object`\>

##### type

> **`readonly`** **type**: `"sync"` = `"sync"`

#### Source

[variant-quickjs-wasmfile-release-sync/src/index.ts:17](https://github.com/justjake/quickjs-emscripten/blob/main/packages/variant-quickjs-wasmfile-release-sync/src/index.ts#L17)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
