import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  esbuild: {
    target: "es2020",
  },
  plugins: [tsconfigPaths()],
})
