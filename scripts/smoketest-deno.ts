#!/usr/bin/env -S npx tsx
import * as sh from "./helpers"

const target = sh.resolve(__dirname, "../examples/deno")
sh.installDependencyGraphFromTar(target, "quickjs-emscripten", {
  fromRegistry: true,
  install: "npm install",
  remove: "npm remove",
})
sh.exec(`cd ${target} && ./main.ts`)
