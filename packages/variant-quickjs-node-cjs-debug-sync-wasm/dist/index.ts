import { QuickJSSyncVariant } from "@jitl/quickjs-ffi-types"

/**
 * This export is a variant of the quickjs WASM library:
 * ### [@jitl/quickjs-node-cjs-debug-sync-wasm](https://www.npmjs.com/package/@jitl/quickjs-node-cjs-debug-sync-wasm)
 *
 * Node.js CommonJS module
 *
 * | Variable            |    Setting                     |    Description    |
 * | --                  | --                             | --                |
 * | releaseMode         | debug | Enables assertions and memory sanitizers. Try to run your tests against debug variants, in addition to your preferred production variant, to catch more bugs. |
 * | syncMode            | sync | The default, normal build. Note that both variants support regular async functions. |
 * | moduleSystem        | commonjs | This variant exports a CommonJS module, which is faster to load and run in Node.js. |
 * | emscriptenInclusion | wasm | Has a separate .wasm file. May offer better caching in your browser, and reduces the size of your JS bundle. If you have issues, try a 'singlefile' variant. |
 *
 */
const variant = {
  type: "sync",
  importFFI: () => import("./ffi.js").then((mod) => mod.QuickJSFFI),
  importModuleLoader: () => import("./emscripten-module.js").then((mod) => mod.default),
} as const satisfies QuickJSSyncVariant

export default variant
