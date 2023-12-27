#!/usr/bin/env -S npx tsx
import * as sh from "./helpers"

const target = sh.resolve(__dirname, "../examples/create-react-app")
sh.installDependencyGraphFromTar(target, "quickjs-emscripten")
sh.exec(`cd ${target} && npm run build`)
