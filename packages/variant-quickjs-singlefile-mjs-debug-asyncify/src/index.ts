import type { QuickJSAsyncVariant } from "@jitl/quickjs-ffi-types"

/**
 * ### @jitl/quickjs-singlefile-mjs-debug-asyncify
 *
 * [Docs](https://github.com/justjake/quickjs-emscripten/blob/main/doc/@jitl/quickjs-singlefile-mjs-debug-asyncify/README.md) |
 * Variant with the WASM data embedded into a NodeJS ESModule.
 *
 * | Variable            |    Setting                     |    Description    |
 * | --                  | --                             | --                |
 * | library             | quickjs             | The original [bellard/quickjs](https://github.com/bellard/quickjs) library. Version [2024-02-14+36911f0d](https://github.com/bellard/quickjs/commit/36911f0d3ab1a4c190a4d5cbe7c2db225a455389) vendored to quickjs-emscripten on 2024-06-15. |
 * | releaseMode         | debug         | Enables assertions and memory sanitizers. Try to run your tests against debug variants, in addition to your preferred production variant, to catch more bugs. |
 * | syncMode            | asyncify            | Build run through the ASYNCIFY WebAssembly transform. This imposes substantial size (2x the size of sync) and speed penalties (40% the speed of sync). In return, allows synchronous calls from the QuickJS WASM runtime to async functions on the host. The extra magic makes this variant slower than sync variants. Note that both variants support regular async functions. Only adopt ASYNCIFY if you need to! The [QuickJSAsyncRuntime](https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten/classes/QuickJSAsyncRuntime.md) and [QuickJSAsyncContext](https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten/classes/QuickJSAsyncContext.md) classes expose the ASYNCIFY-specific APIs. |
 * | emscriptenInclusion | singlefile | The WASM runtime is included directly in the JS file. Use if you run into issues with missing .wasm files when building or deploying your app. |
 * | exports             | import                  | Has these package.json export conditions |
 *
 */
const variant: QuickJSAsyncVariant = {
  type: "async",
  importFFI: () => import("./ffi.js").then((mod) => mod.QuickJSAsyncFFI),
  importModuleLoader: () =>
    import("@jitl/quickjs-singlefile-mjs-debug-asyncify/emscripten-module").then(
      (mod) => mod.default,
    ),
} as const

export default variant
