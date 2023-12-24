#!/usr/bin/env npx tsx
import * as sh from "./helpers"

const target = sh.resolve(__dirname, "../examples/website")
sh.installDependencyGraphFromTar(target, "quickjs-emscripten")
sh.exec(`cd ${target} && npm run build`)
