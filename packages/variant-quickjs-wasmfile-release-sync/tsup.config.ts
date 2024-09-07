import { extendConfig } from "@jitl/tsconfig/tsup.base.config.js"
export default extendConfig({
  entry: ["src/index.ts", "src/ffi.ts"],
  external: ["@jitl/quickjs-wasmfile-release-sync/emscripten-module"],
  format: ["esm", "cjs"],
  clean: false,
})
