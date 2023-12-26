import { QuickJSAsyncVariant } from "@jitl/quickjs-ffi-types"

/**
 * This export is a variant of the quickjs WASM library:
 * ### [@jitl/quickjs-wasmfile-release-asyncify](https://github.com/justjake/quickjs-emscripten/blob/main/doc/packages/@jitl/quickjs-wasmfile-release-asyncify/README.md)
 *
 * Variant with separate .WASM file. Supports browser, NodeJS ESM, and NodeJS CJS.
 *
 * | Variable            |    Setting                     |    Description    |
 * | --                  | --                             | --                |
 * | releaseMode         | release         | Optimized for performance; use when building/deploying your application. |
 * | syncMode            | asyncify            | Build run through the ASYNCIFY WebAssembly transform. Larger and slower. Allows synchronous calls from the WASM runtime to async functions on the host. The extra magic makes this variant slower than sync variants. Note that both variants support regular async functions. Only adopt ASYNCIFY if you need to! |
 * | emscriptenInclusion | wasm | Has a separate .wasm file. May offer better caching in your browser, and reduces the size of your JS bundle. If you have issues, try a 'singlefile' variant. |
 * | exports             | require import browser                  | Has these package.json export conditions |
 *
 */
const variant = {
  type: "async",
  importFFI: () => import("./ffi.js").then((mod) => mod.QuickJSAsyncFFI),
  importModuleLoader: () =>
    import("@jitl/quickjs-wasmfile-release-asyncify/emscripten-module").then((mod) => mod.default),
} as const satisfies QuickJSAsyncVariant

export default variant
