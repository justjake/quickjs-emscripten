#!/usr/bin/env npx tsx
import fs from "node:fs"
import * as sh from "./helpers"
import * as glob from "glob"

function hasMagic(str: string) {
  return glob.hasMagic(str) || str.includes("!")
}

for (const pkg of sh.getYarnWorkspaces()) {
  const packageJson: Partial<sh.PackageJson> = sh.readJson(sh.resolve(pkg.location, "package.json"))
  const globs = packageJson.files?.map((file) => sh.resolve(pkg.location, file))
  if (!globs) continue

  const noMagic = globs.filter((str) => !hasMagic(str))
  for (const mustExist of noMagic) {
    if (!fs.existsSync(mustExist)) {
      throw new Error(`package.json files entry ${mustExist} does not exist`)
    }
  }

  const magic = globs.filter(hasMagic)
  if (magic.length) {
    const files = glob.sync(magic, { nodir: true })
    if (!files.length) {
      throw new Error(`package.json globs ${JSON.stringify(magic)} did not match any files`)
    }
  }

  if (!fs.existsSync(sh.resolve(pkg.location, "README.md"))) {
    throw new Error(`package.json files entry must include README.md`)
  }
}
