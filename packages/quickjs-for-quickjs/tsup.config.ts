import { extendConfig } from "@jitl/tsconfig/tsup.base.config.js"

export default extendConfig({
  entry: ["src/index.mts"],
  format: ["esm"],
  external: [],
  clean: true,
  splitting: false,
  sourcemap: false,
})
