import type { QuickJSSyncVariant } from "@jitl/quickjs-ffi-types"

/**
 * ### @jitl/quickjs-ng-wasmfile-release-sync
 *
 * [Docs](https://github.com/justjake/quickjs-emscripten/blob/main/doc/@jitl/quickjs-ng-wasmfile-release-sync/README.md) |
 * Variant with separate .WASM file. Supports browser ESM, NodeJS ESM, and NodeJS CommonJS.
 *
 * | Variable            |    Setting                     |    Description    |
 * | --                  | --                             | --                |
 * | library             | quickjs-ng             | [quickjs-ng](https://github.com/quickjs-ng/quickjs) is a fork of quickjs that tends to add features more quickly. Version [git+7ded62c5](https://github.com/quickjs-ng/quickjs/commit/7ded62c536fca860b8106c39fb75f2df8fe27180) vendored to quickjs-emscripten on 2024-02-12. |
 * | releaseMode         | release         | Optimized for performance; use when building/deploying your application. |
 * | syncMode            | sync            | The default, normal build. Note that both variants support regular async functions. |
 * | emscriptenInclusion | wasm | Has a separate .wasm file. May offer better caching in your browser, and reduces the size of your JS bundle. If you have issues, try a 'singlefile' variant. |
 * | exports             | require import browser workerd                  | Has these package.json export conditions |
 *
 */
const variant: QuickJSSyncVariant = {
  type: "sync",
  importFFI: () => import("./ffi.js").then((mod) => mod.QuickJSFFI),
  importModuleLoader: () =>
    import("@jitl/quickjs-ng-wasmfile-release-sync/emscripten-module").then((mod) => mod.default),
} as const

export default variant
