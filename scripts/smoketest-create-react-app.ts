#!/usr/bin/env -S npx tsx
import * as sh from "./helpers"

const target = sh.resolve(__dirname, "../examples/create-react-app")
// Use --legacy-peer-deps because react-scripts@5 only supports TypeScript 3.x/4.x
// but our library requires TypeScript 5.9+
sh.installDependencyGraphFromTar(target, "quickjs-emscripten", {
  install: "npm install --legacy-peer-deps",
  remove: "npm remove",
  fromRegistry: false,
})
sh.exec(`cd ${target} && npm run build`)
