import { QuickJSSyncVariant } from "@jitl/quickjs-ffi-types"

/**
 * This export is a variant of the quickjs WASM library:
 * ### [@jitl/quickjs-node-release-sync-wasm](https://github.com/justjake/quickjs-emscripten/blob/main/doc/packages/@jitl/quickjs-node-release-sync-wasm/README.md)
 *
 * Node.js build with both CommonJS and ESModule exports
 *
 * | Variable            |    Setting                     |    Description    |
 * | --                  | --                             | --                |
 * | releaseMode         | release | Optimized for performance; use when building/deploying your application. |
 * | syncMode            | sync | The default, normal build. Note that both variants support regular async functions. |
 * | moduleSystem        | both | Contains both CommonJS and ESModule exports. |
 * | emscriptenInclusion | wasm | Has a separate .wasm file. May offer better caching in your browser, and reduces the size of your JS bundle. If you have issues, try a 'singlefile' variant. |
 *
 */
const variant = {
  type: "sync",
  importFFI: () => import("./ffi.js").then((mod) => mod.QuickJSFFI),
  importModuleLoader: () => import("@jitl/quickjs-node-release-sync-wasm/emscripten-module"),
} as const satisfies QuickJSSyncVariant

export default variant
