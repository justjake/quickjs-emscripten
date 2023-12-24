[quickjs-emscripten](../../packages.md) • **@jitl/quickjs-browser-release-sync-wasm** • [Readme](index.md) \| [Exports](exports.md)

***

[quickjs-emscripten](../../packages.md) / @jitl/quickjs-browser-release-sync-wasm

# @jitl/quickjs-browser-release-sync-wasm

## Contents

- [Variables](exports.md#variables)
  - [default](exports.md#default)
  - [[@jitl/quickjs-browser-release-sync-wasm](https://www.npmjs.com/package/@jitl/quickjs-browser-release-sync-wasm)](exports.md#jitlquickjs-browser-release-sync-wasmhttpswwwnpmjscompackagejitlquickjs-browser-release-sync-wasm)

## Variables

### default

> **`const`** **default**: `Object`

This export is a variant of the quickjs WASM library:
### [@jitl/quickjs-browser-release-sync-wasm](https://www.npmjs.com/package/@jitl/quickjs-browser-release-sync-wasm)

ESModule for browsers or browser-like environments

| Variable            |    Setting                     |    Description    |
| --                  | --                             | --                |
| releaseMode         | release | Optimized for performance; use when building/deploying your application. |
| syncMode            | sync | The default, normal build. Note that both variants support regular async functions. |
| moduleSystem        | esm | This variant exports an ESModule, which is standardized for browsers and more modern browser-like environments. It cannot be imported from CommonJS without shenanigans. |
| emscriptenInclusion | wasm | Has a separate .wasm file. May offer better caching in your browser, and reduces the size of your JS bundle. If you have issues, try a 'singlefile' variant. |

#### Type declaration

##### importFFI

> **`readonly`** **importFFI**: () => `Promise`\<(`module`) => [`QuickJSFFI`](../../quickjs-emscripten/interfaces/QuickJSFFI.md) \| *typeof* `QuickJSFFI`\>

###### Returns

`Promise`\<(`module`) => [`QuickJSFFI`](../../quickjs-emscripten/interfaces/QuickJSFFI.md) \| *typeof* `QuickJSFFI`\>

##### importModuleLoader

> **`readonly`** **importModuleLoader**: () => `Promise`\<[`EmscriptenModuleLoader`](../../quickjs-emscripten/interfaces/EmscriptenModuleLoader.md)\<[`QuickJSEmscriptenModule`](../../quickjs-emscripten/interfaces/QuickJSEmscriptenModule.md)\> \| `Object` \| `Object`\>

###### Returns

`Promise`\<[`EmscriptenModuleLoader`](../../quickjs-emscripten/interfaces/EmscriptenModuleLoader.md)\<[`QuickJSEmscriptenModule`](../../quickjs-emscripten/interfaces/QuickJSEmscriptenModule.md)\> \| `Object` \| `Object`\>

##### type

> **`readonly`** **type**: `"sync"` = `"sync"`

#### Source

[variant-quickjs-browser-release-sync-wasm/dist/index.ts:17](https://github.com/justjake/quickjs-emscripten/blob/main/packages/variant-quickjs-browser-release-sync-wasm/dist/index.ts#L17)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
