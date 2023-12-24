import { QuickJSAsyncVariant } from "@jitl/quickjs-ffi-types"

/**
 * This export is a variant of the quickjs WASM library:
 * ### [@jitl/quickjs-node-cjs-release-asyncify-wasm](https://www.npmjs.com/package/@jitl/quickjs-node-cjs-release-asyncify-wasm)
 *
 * Node.js CommonJS module
 *
 * | Variable            |    Setting                     |    Description    |
 * | --                  | --                             | --                |
 * | releaseMode         | release | Optimized for performance; use when building/deploying your application. |
 * | syncMode            | asyncify | Build run through the ASYNCIFY WebAssembly transform. Larger and slower. Allows synchronous calls from the WASM runtime to async functions on the host. The extra magic makes this variant slower than sync variants. Note that both variants support regular async functions. Only adopt ASYNCIFY if you need to! |
 * | moduleSystem        | commonjs | This variant exports a CommonJS module, which is faster to load and run in Node.js. |
 * | emscriptenInclusion | wasm | Has a separate .wasm file. May offer better caching in your browser, and reduces the size of your JS bundle. If you have issues, try a 'singlefile' variant. |
 *
 */
const variant = {
  type: "async",
  importFFI: () => import("./ffi.js").then((mod) => mod.QuickJSAsyncFFI),
  importModuleLoader: () => import("./emscripten-module.js").then((mod) => mod.default),
} as const satisfies QuickJSAsyncVariant

export default variant
