import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  // Incantation needed for vite to not barf on "using" statement
  esbuild: {
    target: "es2020",
  },
  plugins: [tsconfigPaths()],
})
