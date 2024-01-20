import type { QuickJSSyncVariant } from "@jitl/quickjs-ffi-types"
import { QuickJSFFI } from "./ffi.js"
import moduleLoader from "@jitl/quickjs-purejs-mjs-release-sync/emscripten-module"

/**
 * ### @jitl/quickjs-purejs-mjs-release-sync
 *
 * [Docs](https://github.com/justjake/quickjs-emscripten/blob/main/doc/@jitl/quickjs-purejs-mjs-release-sync/README.md) |
 * Compiled to pure JS, no WebAssembly required. Very slow.
 *
 * | Variable            |    Setting                     |    Description    |
 * | --                  | --                             | --                |
 * | library             | quickjs             | The original [bellard/quickjs](https://github.com/bellard/quickjs) library. |
 * | releaseMode         | release         | Optimized for performance; use when building/deploying your application. |
 * | syncMode            | sync            | The default, normal build. Note that both variants support regular async functions. |
 * | emscriptenInclusion | purejs | The C library code is compiled directly to JS. This is the slowest possible option, and is intended only for humorous (quickjs-in-quickjs) use. |
 * | exports             | import                  | Has these package.json export conditions |
 *
 */
const variant: QuickJSSyncVariant = {
  type: "sync",
  importFFI: () => Promise.resolve(QuickJSFFI),
  importModuleLoader: () => Promise.resolve(moduleLoader),
} as const

export default variant
