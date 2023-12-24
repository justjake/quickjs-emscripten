[quickjs-emscripten](../../packages.md) • **@jitl/quickjs-browser-debug-sync-wasm** • [Readme](README.md) \| [Exports](exports.md)

***

[quickjs-emscripten](../../packages.md) / @jitl/quickjs-browser-debug-sync-wasm

# @jitl/quickjs-browser-debug-sync-wasm

## Contents

- [Variables](exports.md#variables)
  - [default](exports.md#default)
  - [[@jitl/quickjs-browser-debug-sync-wasm](https://github.com/justjake/quickjs-emscripten/blob/main/doc/packages/@jitl/quickjs-browser-debug-sync-wasm/README.md)](exports.md#jitlquickjs-browser-debug-sync-wasmhttpsgithubcomjustjakequickjs-emscriptenblobmaindocpackagesjitlquickjs-browser-debug-sync-wasmreadmemd)

## Variables

### default

> **`const`** **default**: `Object`

This export is a variant of the quickjs WASM library:
### [@jitl/quickjs-browser-debug-sync-wasm](https://github.com/justjake/quickjs-emscripten/blob/main/doc/packages/@jitl/quickjs-browser-debug-sync-wasm/README.md)

ESModule for browsers or browser-like environments

| Variable            |    Setting                     |    Description    |
| --                  | --                             | --                |
| releaseMode         | debug | Enables assertions and memory sanitizers. Try to run your tests against debug variants, in addition to your preferred production variant, to catch more bugs. |
| syncMode            | sync | The default, normal build. Note that both variants support regular async functions. |
| moduleSystem        | esm | This variant exports an ESModule, which is standardized for browsers and more modern browser-like environments. It cannot be imported from CommonJS without shenanigans. |
| emscriptenInclusion | wasm | Has a separate .wasm file. May offer better caching in your browser, and reduces the size of your JS bundle. If you have issues, try a 'singlefile' variant. |

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

[variant-quickjs-browser-debug-sync-wasm/dist/index.ts:17](https://github.com/justjake/quickjs-emscripten/blob/main/packages/variant-quickjs-browser-debug-sync-wasm/dist/index.ts#L17)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
