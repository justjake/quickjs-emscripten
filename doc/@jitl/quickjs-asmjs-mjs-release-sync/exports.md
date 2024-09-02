[quickjs-emscripten](../../packages.md) • **@jitl/quickjs-asmjs-mjs-release-sync** • [Readme](README.md) \| [Exports](exports.md)

***

[quickjs-emscripten](../../packages.md) / @jitl/quickjs-asmjs-mjs-release-sync

# @jitl/quickjs-asmjs-mjs-release-sync

## Contents

- [Variables](exports.md#variables)
  - [default](exports.md#default)
  - [@jitl/quickjs-asmjs-mjs-release-sync](exports.md#jitlquickjs-asmjs-mjs-release-sync)

## Variables

### default

> **`const`** **default**: [`QuickJSSyncVariant`](../../quickjs-emscripten/interfaces/QuickJSSyncVariant.md)

### @jitl/quickjs-asmjs-mjs-release-sync

[Docs](https://github.com/justjake/quickjs-emscripten/blob/main/doc/@jitl/quickjs-asmjs-mjs-release-sync/README.md) |
Compiled to pure Javascript, no WebAssembly required.

| Variable            |    Setting                     |    Description    |
| --                  | --                             | --                |
| library             | quickjs             | The original [bellard/quickjs](https://github.com/bellard/quickjs) library. Version [2024-02-14+36911f0d](https://github.com/bellard/quickjs/commit/36911f0d3ab1a4c190a4d5cbe7c2db225a455389) vendored to quickjs-emscripten on 2024-06-15. |
| releaseMode         | release         | Optimized for performance; use when building/deploying your application. |
| syncMode            | sync            | The default, normal build. Note that both variants support regular async functions. |
| emscriptenInclusion | asmjs | The C library code is compiled to Javascript, no WebAssembly used. Sometimes called "asmjs". This is the slowest possible option, and is intended for constrained environments that do not support WebAssembly, like quickjs-for-quickjs. |
| exports             | import                  | Has these package.json export conditions |

#### Source

[index.ts:19](https://github.com/justjake/quickjs-emscripten/blob/main/packages/variant-quickjs-asmjs-mjs-release-sync/src/index.ts#L19)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
