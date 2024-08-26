import { defineConfig } from "vitest/config"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  // Incantation needed for vite to not barf on "using" statement
  esbuild: {
    target: "es2020",
  },
  plugins: [tsconfigPaths()],
  test: {
    onStackTrace(error, frame) {
      return true
    },
  },
})
