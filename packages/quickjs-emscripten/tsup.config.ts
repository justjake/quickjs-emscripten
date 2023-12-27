import { defineConfig, type Options } from "tsup"
import { extendConfig } from "@jitl/tsconfig/tsup.base.config.js"

const browsers: Extract<Options["target"], Array<any>> = [
  "deno1",
  "safari14",
  "chrome80",
  "firefox72",
  "ios16",
]

const configs = [
  extendConfig({
    entry: ["src/index.ts", "src/variants.ts"],
    format: "cjs",
  }),
  extendConfig({
    entry: ["src/index.ts", "src/variants.ts"],
    format: "esm",
    target: ["node16", ...browsers],
  }),
  extendConfig({
    entry: ["src/index.ts"],
    format: "iife",
    globalName: "QJS",
    target: [...browsers],
    tsconfig: "./tsconfig.iife.json",
    sourcemap: false,
    dts: false,
    esbuildOptions(options, _context) {
      options.conditions ??= []
      options.conditions.push("iife")
    },
  }),
]

export default defineConfig((options) => configs.map((cfg) => cfg(options)))
