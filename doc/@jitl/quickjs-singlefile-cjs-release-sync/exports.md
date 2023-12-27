[quickjs-emscripten](../../packages.md) • **@jitl/quickjs-singlefile-cjs-release-sync** • [Readme](README.md) \| [Exports](exports.md)

***

[quickjs-emscripten](../../packages.md) / @jitl/quickjs-singlefile-cjs-release-sync

# @jitl/quickjs-singlefile-cjs-release-sync

## Contents

- [Variables](exports.md#variables)
  - [default](exports.md#default)
  - [[@jitl/quickjs-singlefile-cjs-release-sync](https://github.com/justjake/quickjs-emscripten/blob/main/doc/@jitl/quickjs-singlefile-cjs-release-sync/README.md)](exports.md#jitlquickjs-singlefile-cjs-release-synchttpsgithubcomjustjakequickjs-emscriptenblobmaindocjitlquickjs-singlefile-cjs-release-syncreadmemd)

## Variables

### default

> **`const`** **default**: [`QuickJSSyncVariant`](../../quickjs-emscripten/interfaces/QuickJSSyncVariant.md)

This export is a variant of the quickjs WASM library:
### [@jitl/quickjs-singlefile-cjs-release-sync](https://github.com/justjake/quickjs-emscripten/blob/main/doc/@jitl/quickjs-singlefile-cjs-release-sync/README.md)

Variant with the WASM data embedded into a universal (Node and Browser compatible) CommonJS module.

| Variable            |    Setting                     |    Description    |
| --                  | --                             | --                |
| releaseMode         | release         | Optimized for performance; use when building/deploying your application. |
| syncMode            | sync            | The default, normal build. Note that both variants support regular async functions. |
| emscriptenInclusion | singlefile | The WASM runtime is included directly in the JS file. Use if you run into issues with missing .wasm files when building or deploying your app. |
| exports             | require                  | Has these package.json export conditions |

#### Source

[index.ts:17](https://github.com/justjake/quickjs-emscripten/blob/main/packages/variant-quickjs-singlefile-cjs-release-sync/src/index.ts#L17)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
