[quickjs-emscripten](../../packages.md) • **@jitl/quickjs-singlefile-browser-debug-sync** • [Readme](README.md) \| [Exports](exports.md)

***

[quickjs-emscripten](../../packages.md) / @jitl/quickjs-singlefile-browser-debug-sync

# @jitl/quickjs-singlefile-browser-debug-sync

## Contents

- [Variables](exports.md#variables)
  - [default](exports.md#default)
  - [@jitl/quickjs-singlefile-browser-debug-sync](exports.md#jitlquickjs-singlefile-browser-debug-sync)

## Variables

### default

> **`const`** **default**: [`QuickJSSyncVariant`](../../quickjs-emscripten/interfaces/QuickJSSyncVariant.md)

### @jitl/quickjs-singlefile-browser-debug-sync

[Docs](https://github.com/justjake/quickjs-emscripten/blob/main/doc/@jitl/quickjs-singlefile-browser-debug-sync/README.md) |
Variant with the WASM data embedded into a browser ESModule.

| Variable            |    Setting                     |    Description    |
| --                  | --                             | --                |
| releaseMode         | debug         | Enables assertions and memory sanitizers. Try to run your tests against debug variants, in addition to your preferred production variant, to catch more bugs. |
| syncMode            | sync            | The default, normal build. Note that both variants support regular async functions. |
| emscriptenInclusion | singlefile | The WASM runtime is included directly in the JS file. Use if you run into issues with missing .wasm files when building or deploying your app. |
| exports             | browser                  | Has these package.json export conditions |

#### Source

[index.ts:17](https://github.com/justjake/quickjs-emscripten/blob/main/packages/variant-quickjs-singlefile-browser-debug-sync/src/index.ts#L17)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
