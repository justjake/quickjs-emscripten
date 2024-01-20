import type { QuickJSAsyncVariant } from "@jitl/quickjs-ffi-types"

/**
 * ### @jitl/quickjs-ng-wasmfile-release-asyncify
 *
 * [Docs](https://github.com/justjake/quickjs-emscripten/blob/main/doc/@jitl/quickjs-ng-wasmfile-release-asyncify/README.md) |
 * Variant with separate .WASM file. Supports browser ESM, NodeJS ESM, and NodeJS CommonJS.
 *
 * | Variable            |    Setting                     |    Description    |
 * | --                  | --                             | --                |
 * | library             | quickjs-ng             | [quickjs-ng/quickjs](https://github.com/quickjs-ng/quickjs) is a newer fork of quickjs under active community development. It implements more EcmaScript features, and drop some non-standard QuickJS only features like BigFloat. May become the default library in a future version of quickjs-emscripten. |
 * | releaseMode         | release         | Optimized for performance; use when building/deploying your application. |
 * | syncMode            | asyncify            | Build run through the ASYNCIFY WebAssembly transform. This imposes substantial size (2x the size of sync) and speed penalties (40% the speed of sync). In return, allows synchronous calls from the QuickJS WASM runtime to async functions on the host. The extra magic makes this variant slower than sync variants. Note that both variants support regular async functions. Only adopt ASYNCIFY if you need to! The [QuickJSAsyncRuntime](https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten/classes/QuickJSAsyncRuntime.md) and [QuickJSAsyncContext](https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten/classes/QuickJSAsyncContext.md) classes expose the ASYNCIFY-specific APIs. |
 * | emscriptenInclusion | wasm | Has a separate .wasm file. May offer better caching in your browser, and reduces the size of your JS bundle. If you have issues, try a 'singlefile' variant. |
 * | exports             | require import browser workerd                  | Has these package.json export conditions |
 *
 */
const variant: QuickJSAsyncVariant = {
  type: "async",
  importFFI: () => import("./ffi.js").then((mod) => mod.QuickJSAsyncFFI),
  importModuleLoader: () =>
    import("@jitl/quickjs-ng-wasmfile-release-asyncify/emscripten-module").then(
      (mod) => mod.default,
    ),
} as const

export default variant
