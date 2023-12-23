import { QuickJSAsyncVariant } from "@jitl/quickjs-ffi-types"

const variant = {
  type: "async",
  importFFI: () => import("./ffi.js").then((mod) => mod.QuickJSAsyncFFI),
  importModuleLoader: () => import("./emscripten-module.js").then((mod) => mod.default),
} as const satisfies QuickJSAsyncVariant

export default variant
