import type { QuickJSSyncVariant } from "@jitl/quickjs-ffi-types"
import { QuickJSFFI } from "./ffi.js"
import moduleLoader from "@jitl/quickjs-asmjs-mjs-release-sync/emscripten-module"
/**
 * ### @jitl/quickjs-asmjs-mjs-release-sync
 *
 * [Docs](https://github.com/justjake/quickjs-emscripten/blob/main/doc/@jitl/quickjs-asmjs-mjs-release-sync/README.md) |
 * Compiled to pure Javascript, no WebAssembly required.
 *
 * | Variable            |    Setting                     |    Description    |
 * | --                  | --                             | --                |
 * | library             | quickjs             | The original [bellard/quickjs](https://github.com/bellard/quickjs) library. Version [2024-02-14+36911f0d](https://github.com/bellard/quickjs/commit/36911f0d3ab1a4c190a4d5cbe7c2db225a455389) vendored to quickjs-emscripten on 2024-06-15. |
 * | releaseMode         | release         | Optimized for performance; use when building/deploying your application. |
 * | syncMode            | sync            | The default, normal build. Note that both variants support regular async functions. |
 * | emscriptenInclusion | asmjs | The C library code is compiled to Javascript, no WebAssembly used. Sometimes called "asmjs". This is the slowest possible option, and is intended for constrained environments that do not support WebAssembly, like quickjs-in-quickjs. |
 * | exports             | import                  | Has these package.json export conditions |
 *
 */
const variant: QuickJSSyncVariant = {
  type: "sync",
  importFFI: () => Promise.resolve(QuickJSFFI),
  importModuleLoader: () => Promise.resolve(moduleLoader),
} as const
export default variant
