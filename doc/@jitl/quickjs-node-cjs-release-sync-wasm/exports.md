[quickjs-emscripten](../../packages.md) • **@jitl/quickjs-node-cjs-release-sync-wasm** • [Readme](README.md) \| [Exports](exports.md)

***

[quickjs-emscripten](../../packages.md) / @jitl/quickjs-node-cjs-release-sync-wasm

# @jitl/quickjs-node-cjs-release-sync-wasm

## Contents

- [Variables](exports.md#variables)
  - [default](exports.md#default)
  - [[@jitl/quickjs-node-cjs-release-sync-wasm](https://github.com/justjake/quickjs-emscripten/blob/main/doc/packages/@jitl/quickjs-node-cjs-release-sync-wasm/README.md)](exports.md#jitlquickjs-node-cjs-release-sync-wasmhttpsgithubcomjustjakequickjs-emscriptenblobmaindocpackagesjitlquickjs-node-cjs-release-sync-wasmreadmemd)

## Variables

### default

> **`const`** **default**: `Object`

This export is a variant of the quickjs WASM library:
### [@jitl/quickjs-node-cjs-release-sync-wasm](https://github.com/justjake/quickjs-emscripten/blob/main/doc/packages/@jitl/quickjs-node-cjs-release-sync-wasm/README.md)

Node.js CommonJS module

| Variable            |    Setting                     |    Description    |
| --                  | --                             | --                |
| releaseMode         | release | Optimized for performance; use when building/deploying your application. |
| syncMode            | sync | The default, normal build. Note that both variants support regular async functions. |
| moduleSystem        | commonjs | This variant exports a CommonJS module, which is faster to load and run in Node.js. |
| emscriptenInclusion | wasm | Has a separate .wasm file. May offer better caching in your browser, and reduces the size of your JS bundle. If you have issues, try a 'singlefile' variant. |

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

[variant-quickjs-node-cjs-release-sync-wasm/dist/index.ts:17](https://github.com/justjake/quickjs-emscripten/blob/main/packages/variant-quickjs-node-cjs-release-sync-wasm/dist/index.ts#L17)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
