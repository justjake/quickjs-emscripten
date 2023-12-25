import { extendConfig } from "@jitl/tsconfig/tsup.base.config.js"

export default extendConfig({
  entry: ["src/index.ts", "src/variants.ts", "src/barrel.ts"],
  external: [
    "#variants/debug",
    "#variants/debug-asyncify",
    "#variants/release",
    "#variants/release-asyncify",
  ],
})
