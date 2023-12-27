import type { Options } from "tsup"
import { defineConfig } from "tsup"

const baseConfig = defineConfig((options) => ({
  entry: ["src/index.ts"],
  minify: !options.watch,
  sourcemap: true,
  dts: true,
  clean: true,
  format: ["cjs", "esm"],
})) as (options: Options) => Options

export function extendConfig(options: Options = {}) {
  return defineConfig((config) => {
    const base = baseConfig(config)
    return {
      ...base,
      ...options,
    }
  }) as (options: Options) => Options
}
