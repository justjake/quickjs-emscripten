import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts", "src/variants.ts", "src/barrel.ts"],
  sourcemap: true,
  dts: true,
  clean: true,
  format: ["cjs", "esm"],
  external: [
    "#variants/debug",
    "#variants/debug-asyncify",
    "#variants/release",
    "#variants/release-asyncify",
  ],
})
