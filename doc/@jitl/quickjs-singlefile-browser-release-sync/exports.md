[quickjs-emscripten](../../packages.md) • **@jitl/quickjs-singlefile-browser-release-sync** • [Readme](README.md) \| [Exports](exports.md)

***

[quickjs-emscripten](../../packages.md) / @jitl/quickjs-singlefile-browser-release-sync

# @jitl/quickjs-singlefile-browser-release-sync

## Contents

- [Variables](exports.md#variables)
  - [default](exports.md#default)
  - [[@jitl/quickjs-singlefile-browser-release-sync](https://github.com/justjake/quickjs-emscripten/blob/main/doc/@jitl/quickjs-singlefile-browser-release-sync/README.md)](exports.md#jitlquickjs-singlefile-browser-release-synchttpsgithubcomjustjakequickjs-emscriptenblobmaindocjitlquickjs-singlefile-browser-release-syncreadmemd)

## Variables

### default

> **`const`** **default**: `Object`

This export is a variant of the quickjs WASM library:
### [@jitl/quickjs-singlefile-browser-release-sync](https://github.com/justjake/quickjs-emscripten/blob/main/doc/@jitl/quickjs-singlefile-browser-release-sync/README.md)

Variant with the WASM data embedded into a browser ESModule.

| Variable            |    Setting                     |    Description    |
| --                  | --                             | --                |
| releaseMode         | release         | Optimized for performance; use when building/deploying your application. |
| syncMode            | sync            | The default, normal build. Note that both variants support regular async functions. |
| emscriptenInclusion | singlefile | The WASM runtime is included directly in the JS file. Use if you run into issues with missing .wasm files when building or deploying your app. |
| exports             | browser                  | Has these package.json export conditions |

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

[variant-quickjs-singlefile-browser-release-sync/src/index.ts:17](https://github.com/justjake/quickjs-emscripten/blob/main/packages/variant-quickjs-singlefile-browser-release-sync/src/index.ts#L17)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
