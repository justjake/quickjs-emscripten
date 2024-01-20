import type { QuickJSSyncVariant } from "@jitl/quickjs-ffi-types"

/**
 * ### @jitl/quickjs-ng-wasmfile-debug-sync
 *
 * [Docs](https://github.com/justjake/quickjs-emscripten/blob/main/doc/@jitl/quickjs-ng-wasmfile-debug-sync/README.md) |
 * Variant with separate .WASM file. Supports browser ESM, NodeJS ESM, and NodeJS CommonJS.
 *
 * | Variable            |    Setting                     |    Description    |
 * | --                  | --                             | --                |
 * | library             | quickjs-ng             | [quickjs-ng/quickjs](https://github.com/quickjs-ng/quickjs) is a newer fork of quickjs under active community development. It implements more EcmaScript features, and drop some non-standard QuickJS only features like BigFloat. May become the default library in a future version of quickjs-emscripten. |
 * | releaseMode         | debug         | Enables assertions and memory sanitizers. Try to run your tests against debug variants, in addition to your preferred production variant, to catch more bugs. |
 * | syncMode            | sync            | The default, normal build. Note that both variants support regular async functions. |
 * | emscriptenInclusion | wasm | Has a separate .wasm file. May offer better caching in your browser, and reduces the size of your JS bundle. If you have issues, try a 'singlefile' variant. |
 * | exports             | require import browser workerd                  | Has these package.json export conditions |
 *
 */
const variant: QuickJSSyncVariant = {
  type: "sync",
  importFFI: () => import("./ffi.js").then((mod) => mod.QuickJSFFI),
  importModuleLoader: () =>
    import("@jitl/quickjs-ng-wasmfile-debug-sync/emscripten-module").then((mod) => mod.default),
} as const

export default variant
