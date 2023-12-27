#!/usr/bin/env -S npx tsx
import fs from "node:fs"
import * as glob from "glob"
import * as sh from "./helpers"

function hasMagic(str: string) {
  return glob.hasMagic(str) || str.includes("!")
}

function checkFiles(pkg: sh.WorkspaceJson, packageJson: sh.PackageJson) {
  const mustExist = (fileName: string, msg: string) => {
    const abs = fileName.startsWith(pkg.location) ? fileName : sh.resolve(pkg.location, fileName)
    if (!fs.existsSync(abs)) {
      throw new Error(`${msg}: ${abs}`)
    }
  }

  const globs = packageJson.files?.map((file) => sh.resolve(pkg.location, file))
  if (!globs) return

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

  for (const [exportName, exportConditions] of Object.entries(packageJson.exports ?? {})) {
    if (typeof exportConditions === "string") {
      mustExist(exportConditions, `export ${exportName} file does not exist`)
    } else if (!exportConditions) {
      throw new Error(`export ${exportName} has no conditions`)
    } else {
      for (const [condition, exportFile] of Object.entries(exportConditions)) {
        if (!exportFile) {
          throw new Error(`export ${exportName} condition ${condition} has no file`)
        }
        mustExist(exportFile, `export ${exportName} condition ${condition} file does not exist`)
      }
    }
  }

  packageJson.main && mustExist(packageJson.main, `package.json main file does not exist`)
  packageJson.module && mustExist(packageJson.module, `package.json module file does not exist`)
  packageJson.types && mustExist(packageJson.types, `package.json types file does not exist`)
}

function checkReadme(
  pkg: sh.WorkspaceJson,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _packageJson: sh.PackageJson,
) {
  if (!fs.existsSync(sh.resolve(pkg.location, "README.md"))) {
    throw new Error(`package.json files entry must include README.md`)
  }
}

function checkProperties(pkg: sh.WorkspaceJson, packageJson: sh.PackageJson) {
  if (!packageJson.name) {
    throw new Error(`package.json must include name`)
  }
  if (!packageJson.version) {
    throw new Error(`package.json must include name`)
  }

  if (packageJson.files || packageJson.exports) {
    if (!packageJson.main) {
      throw new Error(`package.json must include main`)
    }

    if (packageJson.main) {
      if (!packageJson.types) {
        throw new Error(`package.json must include types`)
      }
    }
  }
}

for (const pkg of sh.getYarnWorkspaces()) {
  const packageJson: sh.PackageJson = sh.readJson(sh.resolve(pkg.location, "package.json"))
  if (packageJson.private) {
    continue
  }

  try {
    checkFiles(pkg, packageJson)
    checkReadme(pkg, packageJson)
    checkProperties(pkg, packageJson)
  } catch (error: any) {
    error.message = `${pkg.location}: ${error.message}`
    throw error
  }
}
