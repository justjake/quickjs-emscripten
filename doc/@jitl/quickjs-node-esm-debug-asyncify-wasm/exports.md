[quickjs-emscripten](../../packages.md) • **@jitl/quickjs-node-esm-debug-asyncify-wasm** • [Readme](README.md) \| [Exports](exports.md)

***

[quickjs-emscripten](../../packages.md) / @jitl/quickjs-node-esm-debug-asyncify-wasm

# @jitl/quickjs-node-esm-debug-asyncify-wasm

## Contents

- [Variables](exports.md#variables)
  - [default](exports.md#default)
  - [[@jitl/quickjs-node-esm-debug-asyncify-wasm](https://github.com/justjake/quickjs-emscripten/blob/main/doc/packages/@jitl/quickjs-node-esm-debug-asyncify-wasm/README.md)](exports.md#jitlquickjs-node-esm-debug-asyncify-wasmhttpsgithubcomjustjakequickjs-emscriptenblobmaindocpackagesjitlquickjs-node-esm-debug-asyncify-wasmreadmemd)

## Variables

### default

> **`const`** **default**: `Object`

This export is a variant of the quickjs WASM library:
### [@jitl/quickjs-node-esm-debug-asyncify-wasm](https://github.com/justjake/quickjs-emscripten/blob/main/doc/packages/@jitl/quickjs-node-esm-debug-asyncify-wasm/README.md)

Node.js ESModule

| Variable            |    Setting                     |    Description    |
| --                  | --                             | --                |
| releaseMode         | debug | Enables assertions and memory sanitizers. Try to run your tests against debug variants, in addition to your preferred production variant, to catch more bugs. |
| syncMode            | asyncify | Build run through the ASYNCIFY WebAssembly transform. Larger and slower. Allows synchronous calls from the WASM runtime to async functions on the host. The extra magic makes this variant slower than sync variants. Note that both variants support regular async functions. Only adopt ASYNCIFY if you need to! |
| moduleSystem        | esm | This variant exports an ESModule, which is standardized for browsers and more modern browser-like environments. It cannot be imported from CommonJS without shenanigans. |
| emscriptenInclusion | wasm | Has a separate .wasm file. May offer better caching in your browser, and reduces the size of your JS bundle. If you have issues, try a 'singlefile' variant. |

#### Type declaration

##### importFFI

> **`readonly`** **importFFI**: () => `Promise`\<*typeof* `QuickJSAsyncFFI` \| (`module`) => [`QuickJSAsyncFFI`](../../quickjs-emscripten/interfaces/QuickJSAsyncFFI.md)\>

###### Returns

`Promise`\<*typeof* `QuickJSAsyncFFI` \| (`module`) => [`QuickJSAsyncFFI`](../../quickjs-emscripten/interfaces/QuickJSAsyncFFI.md)\>

##### importModuleLoader

> **`readonly`** **importModuleLoader**: () => `Promise`\<[`EmscriptenModuleLoader`](../../quickjs-emscripten/interfaces/EmscriptenModuleLoader.md)\<[`QuickJSAsyncEmscriptenModule`](../../quickjs-emscripten/interfaces/QuickJSAsyncEmscriptenModule.md)\> \| `Object` \| `Object`\>

###### Returns

`Promise`\<[`EmscriptenModuleLoader`](../../quickjs-emscripten/interfaces/EmscriptenModuleLoader.md)\<[`QuickJSAsyncEmscriptenModule`](../../quickjs-emscripten/interfaces/QuickJSAsyncEmscriptenModule.md)\> \| `Object` \| `Object`\>

##### type

> **`readonly`** **type**: `"async"` = `"async"`

#### Source

[variant-quickjs-node-esm-debug-asyncify-wasm/dist/index.ts:17](https://github.com/justjake/quickjs-emscripten/blob/main/packages/variant-quickjs-node-esm-debug-asyncify-wasm/dist/index.ts#L17)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
