import { QuickJSSyncVariant } from "@jitl/quickjs-ffi-types"

/**
 * This export is a variant of the quickjs WASM library:
 * ### [@jitl/quickjs-wasmfile-release-sync](https://github.com/justjake/quickjs-emscripten/blob/main/doc/packages/@jitl/quickjs-wasmfile-release-sync/README.md)
 *
 * Variant with separate .WASM file. Supports browser, NodeJS ESM, and NodeJS CJS.
 *
 * | Variable            |    Setting                     |    Description    |
 * | --                  | --                             | --                |
 * | releaseMode         | release         | Optimized for performance; use when building/deploying your application. |
 * | syncMode            | sync            | The default, normal build. Note that both variants support regular async functions. |
 * | emscriptenInclusion | wasm | Has a separate .wasm file. May offer better caching in your browser, and reduces the size of your JS bundle. If you have issues, try a 'singlefile' variant. |
 * | exports             | require import browser                  | Has these package.json export conditions |
 *
 */
const variant = {
  type: "sync",
  importFFI: () => import("./ffi.js").then((mod) => mod.QuickJSFFI),
  importModuleLoader: () =>
    import("@jitl/quickjs-wasmfile-release-sync/emscripten-module").then((mod) => mod.default),
} as const satisfies QuickJSSyncVariant

export default variant
