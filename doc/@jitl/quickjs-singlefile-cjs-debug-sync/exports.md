[quickjs-emscripten](../../packages.md) • **@jitl/quickjs-singlefile-cjs-debug-sync** • [Readme](README.md) \| [Exports](exports.md)

***

[quickjs-emscripten](../../packages.md) / @jitl/quickjs-singlefile-cjs-debug-sync

# @jitl/quickjs-singlefile-cjs-debug-sync

## Contents

- [Variables](exports.md#variables)
  - [default](exports.md#default)
  - [@jitl/quickjs-singlefile-cjs-debug-sync](exports.md#jitlquickjs-singlefile-cjs-debug-sync)

## Variables

### default

> **`const`** **default**: [`QuickJSSyncVariant`](../../quickjs-emscripten/interfaces/QuickJSSyncVariant.md)

### @jitl/quickjs-singlefile-cjs-debug-sync

[Docs](https://github.com/justjake/quickjs-emscripten/blob/main/doc/@jitl/quickjs-singlefile-cjs-debug-sync/README.md) |
Variant with the WASM data embedded into a universal (Node and Browser compatible) CommonJS module.

| Variable            |    Setting                     |    Description    |
| --                  | --                             | --                |
| library             | quickjs             | The original [bellard/quickjs](https://github.com/bellard/quickjs) library. Version [2025-09-13+f1139494](https://github.com/bellard/quickjs/commit/f1139494d18a2053630c5ed3384a42bb70db3c53) vendored to quickjs-emscripten on 2026-02-15. |
| releaseMode         | debug         | Enables assertions and memory sanitizers. Try to run your tests against debug variants, in addition to your preferred production variant, to catch more bugs. |
| syncMode            | sync            | The default, normal build. Note that both variants support regular async functions. |
| emscriptenInclusion | singlefile | The WASM runtime is included directly in the JS file. Use if you run into issues with missing .wasm files when building or deploying your app. |
| exports             | require                  | Has these package.json export conditions |

#### Source

[index.ts:18](https://github.com/justjake/quickjs-emscripten/blob/main/packages/variant-quickjs-singlefile-cjs-debug-sync/src/index.ts#L18)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
