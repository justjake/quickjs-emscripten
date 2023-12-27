#!/usr/bin/env -S npx tsx
import fs from "node:fs"
import pkg from "./package.json"
import update from "./node.package.json"
const newPkg = { ...pkg, ...update }
fs.writeFileSync(".output/package.json", JSON.stringify(newPkg, null, 2))
