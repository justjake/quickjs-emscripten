import { QuickJSSyncVariant } from "@jitl/quickjs-ffi-types"

/**
 * This export is a variant of the quickjs WASM library:
 * ### [@jitl/quickjs-browser-release-sync-singlefile](https://www.npmjs.com/package/@jitl/quickjs-browser-release-sync-singlefile)
 *
 * ESModule for browsers or browser-like environments
 *
 * | Variable            |    Setting                     |    Description    |
 * | --                  | --                             | --                |
 * | releaseMode         | release | Optimized for performance; use when building/deploying your application. |
 * | syncMode            | sync | The default, normal build. Note that both variants support regular async functions. |
 * | moduleSystem        | esm | This variant exports an ESModule, which is standardized for browsers and more modern browser-like environments. It cannot be imported from CommonJS without shenanigans. |
 * | emscriptenInclusion | singlefile | The WASM runtime is included directly in the JS file. Use if you run into issues with missing .wasm files when building or deploying your app. |
 *
 */
const variant = {
  type: "sync",
  importFFI: () => import("./ffi.js").then((mod) => mod.QuickJSFFI),
  importModuleLoader: () => import("./emscripten-module.js").then((mod) => mod.default),
} as const satisfies QuickJSSyncVariant

export default variant
