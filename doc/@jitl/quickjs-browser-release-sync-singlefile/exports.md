[quickjs-emscripten](../../packages.md) • **@jitl/quickjs-browser-release-sync-singlefile** • [Readme](README.md) \| [Exports](exports.md)

***

[quickjs-emscripten](../../packages.md) / @jitl/quickjs-browser-release-sync-singlefile

# @jitl/quickjs-browser-release-sync-singlefile

## Contents

- [Variables](exports.md#variables)
  - [default](exports.md#default)
  - [[@jitl/quickjs-browser-release-sync-singlefile](https://github.com/justjake/quickjs-emscripten/blob/main/doc/packages/@jitl/quickjs-browser-release-sync-singlefile/README.md)](exports.md#jitlquickjs-browser-release-sync-singlefilehttpsgithubcomjustjakequickjs-emscriptenblobmaindocpackagesjitlquickjs-browser-release-sync-singlefilereadmemd)

## Variables

### default

> **`const`** **default**: `Object`

This export is a variant of the quickjs WASM library:
### [@jitl/quickjs-browser-release-sync-singlefile](https://github.com/justjake/quickjs-emscripten/blob/main/doc/packages/@jitl/quickjs-browser-release-sync-singlefile/README.md)

ESModule for browsers or browser-like environments

| Variable            |    Setting                     |    Description    |
| --                  | --                             | --                |
| releaseMode         | release | Optimized for performance; use when building/deploying your application. |
| syncMode            | sync | The default, normal build. Note that both variants support regular async functions. |
| moduleSystem        | esm | This variant exports an ESModule, which is standardized for browsers and more modern browser-like environments. It cannot be imported from CommonJS without shenanigans. |
| emscriptenInclusion | singlefile | The WASM runtime is included directly in the JS file. Use if you run into issues with missing .wasm files when building or deploying your app. |

#### Type declaration

##### importFFI

> **`readonly`** **importFFI**: () => `Promise`\<*typeof* `QuickJSFFI` \| (`module`) => [`QuickJSFFI`](../../quickjs-emscripten/interfaces/QuickJSFFI.md)\>

###### Returns

`Promise`\<*typeof* `QuickJSFFI` \| (`module`) => [`QuickJSFFI`](../../quickjs-emscripten/interfaces/QuickJSFFI.md)\>

##### importModuleLoader

> **`readonly`** **importModuleLoader**: () => `Promise`\<[`EmscriptenModuleLoader`](../../quickjs-emscripten/interfaces/EmscriptenModuleLoader.md)\<[`QuickJSEmscriptenModule`](../../quickjs-emscripten/interfaces/QuickJSEmscriptenModule.md)\> \| `Object` \| `Object`\>

###### Returns

`Promise`\<[`EmscriptenModuleLoader`](../../quickjs-emscripten/interfaces/EmscriptenModuleLoader.md)\<[`QuickJSEmscriptenModule`](../../quickjs-emscripten/interfaces/QuickJSEmscriptenModule.md)\> \| `Object` \| `Object`\>

##### type

> **`readonly`** **type**: `"sync"` = `"sync"`

#### Source

[variant-quickjs-browser-release-sync-singlefile/dist/index.ts:17](https://github.com/justjake/quickjs-emscripten/blob/main/packages/variant-quickjs-browser-release-sync-singlefile/dist/index.ts#L17)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
