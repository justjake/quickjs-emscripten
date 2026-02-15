import type { QuickJSSyncVariant } from "@jitl/quickjs-ffi-types"

/**
 * ### @jitl/mquickjs-wasmfile-release-sync
 *
 * [Docs](https://github.com/justjake/quickjs-emscripten/blob/main/doc/@jitl/mquickjs-wasmfile-release-sync/README.md) |
 * Variant with separate .WASM file. Supports browser ESM, NodeJS ESM, and NodeJS CommonJS.
 *
 * | Variable            |    Setting                     |    Description    |
 * | --                  | --                             | --                |
 * | library             | mquickjs             | [mquickjs](https://github.com/bellard/mquickjs) is a minimal/micro version of QuickJS by Fabrice Bellard, optimized for small size. Version [git+ee50431e](https://github.com/bellard/mquickjs/commit/ee50431eac9b14b99f722b537ec4cac0c8dd75ab) vendored to quickjs-emscripten on 2026-02-15. |
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
    import("@jitl/mquickjs-wasmfile-release-sync/emscripten-module").then((mod) => mod.default),
} as const

export default variant
