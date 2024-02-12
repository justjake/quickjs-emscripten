import type { QuickJSSyncVariant } from "@jitl/quickjs-ffi-types"

/**
 * ### @jitl/quickjs-singlefile-cjs-debug-sync
 *
 * [Docs](https://github.com/justjake/quickjs-emscripten/blob/main/doc/@jitl/quickjs-singlefile-cjs-debug-sync/README.md) |
 * Variant with the WASM data embedded into a universal (Node and Browser compatible) CommonJS module.
 *
 * | Variable            |    Setting                     |    Description    |
 * | --                  | --                             | --                |
 * | library             | quickjs             | The original [bellard/quickjs](https://github.com/bellard/quickjs) library. Version [2024-01-13+626e0d4e](https://github.com/bellard/quickjs/commit/626e0d4e60db2b81a0505fa9c61941e608624e7e) vendored to quickjs-emscripten on 2024-02-11. |
 * | releaseMode         | debug         | Enables assertions and memory sanitizers. Try to run your tests against debug variants, in addition to your preferred production variant, to catch more bugs. |
 * | syncMode            | sync            | The default, normal build. Note that both variants support regular async functions. |
 * | emscriptenInclusion | singlefile | The WASM runtime is included directly in the JS file. Use if you run into issues with missing .wasm files when building or deploying your app. |
 * | exports             | require                  | Has these package.json export conditions |
 *
 */
const variant: QuickJSSyncVariant = {
  type: "sync",
  importFFI: () => import("./ffi.js").then((mod) => mod.QuickJSFFI),
  importModuleLoader: () =>
    import("@jitl/quickjs-singlefile-cjs-debug-sync/emscripten-module").then((mod) => mod.default),
} as const

export default variant
