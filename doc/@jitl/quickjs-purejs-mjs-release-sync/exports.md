[quickjs-emscripten](../../packages.md) • **@jitl/quickjs-purejs-mjs-release-sync** • [Readme](README.md) \| [Exports](exports.md)

***

[quickjs-emscripten](../../packages.md) / @jitl/quickjs-purejs-mjs-release-sync

# @jitl/quickjs-purejs-mjs-release-sync

## Contents

- [Variables](exports.md#variables)
  - [default](exports.md#default)
  - [@jitl/quickjs-purejs-mjs-release-sync](exports.md#jitlquickjs-purejs-mjs-release-sync)

## Variables

### default

> **`const`** **default**: [`QuickJSSyncVariant`](../../quickjs-emscripten/interfaces/QuickJSSyncVariant.md)

### @jitl/quickjs-purejs-mjs-release-sync

[Docs](https://github.com/justjake/quickjs-emscripten/blob/main/doc/@jitl/quickjs-purejs-mjs-release-sync/README.md) |
Compiled to pure JS, no WebAssembly required. Very slow.

| Variable            |    Setting                     |    Description    |
| --                  | --                             | --                |
| library             | quickjs             | The original [bellard/quickjs](https://github.com/bellard/quickjs) library. |
| releaseMode         | release         | Optimized for performance; use when building/deploying your application. |
| syncMode            | sync            | The default, normal build. Note that both variants support regular async functions. |
| emscriptenInclusion | purejs | The C library code is compiled directly to JS. This is the slowest possible option, and is intended only for humorous (quickjs-in-quickjs) use. |
| exports             | import                  | Has these package.json export conditions |

#### Source

[index.ts:20](https://github.com/justjake/quickjs-emscripten/blob/main/packages/variant-quickjs-purejs-mjs-release-sync/src/index.ts#L20)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
