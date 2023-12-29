#!/usr/bin/env -S npx tsx
import * as sh from "./helpers"

const target = sh.resolve(__dirname, "../examples/node-minimal")
sh.installDependencyGraphFromTar(target, [
  "quickjs-emscripten-core",
  "@jitl/quickjs-wasmfile-release-sync",
])
sh.exec(`cd ${target} && node main.mjs`)
