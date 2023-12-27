import type { QuickJSSyncVariant } from "@jitl/quickjs-ffi-types"

/**
 * This export is a variant of the quickjs WASM library:
 * ### [@jitl/quickjs-singlefile-browser-release-sync](https://github.com/justjake/quickjs-emscripten/blob/main/doc/@jitl/quickjs-singlefile-browser-release-sync/README.md)
 *
 * Variant with the WASM data embedded into a browser ESModule.
 *
 * | Variable            |    Setting                     |    Description    |
 * | --                  | --                             | --                |
 * | releaseMode         | release         | Optimized for performance; use when building/deploying your application. |
 * | syncMode            | sync            | The default, normal build. Note that both variants support regular async functions. |
 * | emscriptenInclusion | singlefile | The WASM runtime is included directly in the JS file. Use if you run into issues with missing .wasm files when building or deploying your app. |
 * | exports             | browser                  | Has these package.json export conditions |
 *
 */
const variant: QuickJSSyncVariant = {
  type: "sync",
  importFFI: () => import("./ffi.js").then((mod) => mod.QuickJSFFI),
  importModuleLoader: () =>
    import("@jitl/quickjs-singlefile-browser-release-sync/emscripten-module").then(
      (mod) => mod.default,
    ),
} as const

export default variant
