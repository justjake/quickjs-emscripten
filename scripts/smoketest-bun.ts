#!/usr/bin/env -S npx tsx
import * as sh from "./helpers"

const target = sh.resolve(__dirname, "../examples/bun-typescript")
sh.installDependencyGraphFromTar(target, "quickjs-emscripten")
sh.exec(`cd ${target} && bun ./index.ts`)
