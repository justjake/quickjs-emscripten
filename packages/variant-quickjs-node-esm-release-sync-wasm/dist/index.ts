import { QuickJSSyncVariant } from "@jitl/quickjs-ffi-types"

/**
 * This export is a variant of the quickjs WASM library:
 * ### [@jitl/quickjs-node-esm-release-sync-wasm](https://www.npmjs.com/package/@jitl/quickjs-node-esm-release-sync-wasm)
 *
 * Node.js ESModule
 *
 * | Variable            |    Setting                     |    Description    |
 * | --                  | --                             | --                |
 * | releaseMode         | release | Optimized for performance; use when building/deploying your application. |
 * | syncMode            | sync | The default, normal build. Note that both variants support regular async functions. |
 * | moduleSystem        | esm | This variant exports an ESModule, which is standardized for browsers and more modern browser-like environments. It cannot be imported from CommonJS without shenanigans. |
 * | emscriptenInclusion | wasm | Has a separate .wasm file. May offer better caching in your browser, and reduces the size of your JS bundle. If you have issues, try a 'singlefile' variant. |
 *
 */
const variant = {
  type: "sync",
  importFFI: () => import("./ffi.js").then((mod) => mod.QuickJSFFI),
  importModuleLoader: () => import("./emscripten-module.js").then((mod) => mod.default),
} as const satisfies QuickJSSyncVariant

export default variant
