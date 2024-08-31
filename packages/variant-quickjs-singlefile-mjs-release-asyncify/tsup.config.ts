import { extendConfig } from "@jitl/tsconfig/tsup.base.config.js"
export default extendConfig({
  entry: ["src/index.ts", "src/ffi.ts"],
  external: [],
  format: ["esm"],
  clean: false,
})
