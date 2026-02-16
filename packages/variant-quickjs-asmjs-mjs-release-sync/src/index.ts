import type { QuickJSSyncVariant } from "@jitl/quickjs-ffi-types"
import moduleLoader from "@jitl/quickjs-asmjs-mjs-release-sync/emscripten-module"
import { QuickJSFFI } from "./ffi.js"
/**
 * ### @jitl/quickjs-asmjs-mjs-release-sync
 *
 * [Docs](https://github.com/justjake/quickjs-emscripten/blob/main/doc/@jitl/quickjs-asmjs-mjs-release-sync/README.md) |
 * Compiled to pure Javascript, no WebAssembly required.
 *
 * | Variable            |    Setting                     |    Description    |
 * | --                  | --                             | --                |
 * | library             | quickjs             | The original [bellard/quickjs](https://github.com/bellard/quickjs) library. Version [2025-09-13+f1139494](https://github.com/bellard/quickjs/commit/f1139494d18a2053630c5ed3384a42bb70db3c53) vendored to quickjs-emscripten on 2026-02-15. |
 * | releaseMode         | release         | Optimized for performance; use when building/deploying your application. |
 * | syncMode            | sync            | The default, normal build. Note that both variants support regular async functions. |
 * | emscriptenInclusion | asmjs | The C library code is compiled to Javascript, no WebAssembly used. Sometimes called "asmjs". This is the slowest possible option, and is intended for constrained environments that do not support WebAssembly, like quickjs-for-quickjs. |
 * | exports             | import                  | Has these package.json export conditions |
 *
 */
const variant: QuickJSSyncVariant = {
  type: "sync",
  importFFI: () => Promise.resolve(QuickJSFFI),
  importModuleLoader: () => Promise.resolve(moduleLoader),
  features: {
    modules: true,
    promises: true,
    symbols: true,
    bigint: true,
    intrinsics: true,
    eval: true,
    functions: true,
  },
} as const
export default variant
