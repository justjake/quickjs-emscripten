import type { QuickJSSyncVariant } from "@jitl/quickjs-ffi-types"

/**
 * ### @jitl/quickjs-wasmfile-release-sync
 *
 * [Docs](https://github.com/justjake/quickjs-emscripten/blob/main/doc/@jitl/quickjs-wasmfile-release-sync/README.md) |
 * Variant with separate .WASM file. Supports browser ESM, NodeJS ESM, and NodeJS CommonJS.
 *
 * | Variable            |    Setting                     |    Description    |
 * | --                  | --                             | --                |
 * | library             | quickjs             | The original [bellard/quickjs](https://github.com/bellard/quickjs) library. Version [2024-01-13+626e0d4e](https://github.com/bellard/quickjs/commit/626e0d4e60db2b81a0505fa9c61941e608624e7e) vendored to quickjs-emscripten on 2024-02-11. |
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
    import("@jitl/quickjs-wasmfile-release-sync/emscripten-module").then((mod) => mod.default),
} as const

export default variant
