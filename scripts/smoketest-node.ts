#!/usr/bin/env npx tsx
import * as sh from "./helpers"

const target = sh.resolve(__dirname, "../examples/typescript-smoketest")
sh.installDependencyGraphFromTar(target, "quickjs-emscripten")
sh.exec(`cd ${target} && npx tsc --project .`)
sh.exec(`cd ${target} && node index.js`)
