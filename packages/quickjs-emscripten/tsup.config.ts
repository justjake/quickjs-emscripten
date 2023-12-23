import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts", "src/variants.ts"],
  sourcemap: true,
  dts: true,
  format: ["cjs", "esm"],
  external: [
    "quickjs-emscripten/variants/debug",
    "quickjs-emscripten/variants/debug-asyncify",
    "quickjs-emscripten/variants/release",
    "quickjs-emscripten/variants/release-asyncify",
  ],
})
