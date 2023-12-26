import { extendConfig } from "@jitl/tsconfig/tsup.base.config.js"

export default extendConfig({
  entry: ["src/index.ts", "src/ffi.ts"],
  external: ["@jitl/quickjs-singlefile-mjs-debug-sync/emscripten-module"],
  formats: ["esm"],
  clean: false,
})
