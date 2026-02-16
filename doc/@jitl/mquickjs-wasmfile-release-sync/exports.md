[quickjs-emscripten](../../packages.md) • **@jitl/mquickjs-wasmfile-release-sync** • [Readme](README.md) \| [Exports](exports.md)

***

[quickjs-emscripten](../../packages.md) / @jitl/mquickjs-wasmfile-release-sync

# @jitl/mquickjs-wasmfile-release-sync

## Contents

- [Variables](exports.md#variables)
  - [default](exports.md#default)
  - [@jitl/mquickjs-wasmfile-release-sync](exports.md#jitlmquickjs-wasmfile-release-sync)

## Variables

### default

> **`const`** **default**: [`QuickJSSyncVariant`](../../quickjs-emscripten/interfaces/QuickJSSyncVariant.md)

### @jitl/mquickjs-wasmfile-release-sync

[Docs](https://github.com/justjake/quickjs-emscripten/blob/main/doc/@jitl/mquickjs-wasmfile-release-sync/README.md) |
Variant with separate .WASM file. Supports browser ESM, NodeJS ESM, and NodeJS CommonJS.

| Variable            |    Setting                     |    Description    |
| --                  | --                             | --                |
| library             | mquickjs             | [mquickjs](https://github.com/bellard/mquickjs) is a minimal/micro version of QuickJS by Fabrice Bellard, optimized for small size. Version [git+ee50431e](https://github.com/bellard/mquickjs/commit/ee50431eac9b14b99f722b537ec4cac0c8dd75ab) vendored to quickjs-emscripten on 2026-02-16. |
| releaseMode         | release         | Optimized for performance; use when building/deploying your application. |
| syncMode            | sync            | The default, normal build. Note that both variants support regular async functions. |
| emscriptenInclusion | wasm | Has a separate .wasm file. May offer better caching in your browser, and reduces the size of your JS bundle. If you have issues, try a 'singlefile' variant. |
| exports             | require import browser workerd                  | Has these package.json export conditions |

#### Source

[index.ts:18](https://github.com/justjake/quickjs-emscripten/blob/main/packages/variant-mquickjs-wasmfile-release-sync/src/index.ts#L18)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
