import path from "node:path"
import fs from "node:fs"
import p from "node:child_process"
import prettier from "prettier"

const packagesDir = path.resolve(__dirname, "../packages")
const tarDir = path.resolve(__dirname, "../build/tar")
const packageSubdirs = fs.readdirSync(packagesDir).map((name) => path.join(packagesDir, name))

function getPackageJson(packageName: string) {
  const subname = packageName.split("/").at(-1) ?? "none"
  let searchDirs = packageSubdirs.filter((dir) => dir.endsWith(subname))
  if (searchDirs.length === 0) {
    searchDirs = packageSubdirs
  }
  for (const dir of searchDirs) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(path.join(dir, "package.json"), "utf8"))
      if (packageJson.name === packageName) {
        return packageJson
      }
    } catch (e) {
      console.warn(e)
    }
  }
  throw new Error(`Could not find package.json for ${packageName} in ${searchDirs}`)
}

function getTarFile(packageName: string) {
  return path.join(tarDir, packageName.replace("/", "-") + ".tgz")
}

export function exec(command: string) {
  console.log(`+ ${command}`)
  p.execSync(command, { encoding: "utf-8", stdio: "inherit" })
}

const alreadyInstalled = new Map<string, Set<string>>()

export function installDependencyGraphFromTar(
  into: string,
  packageName: string,
  cmd = "npm install",
) {
  const have = alreadyInstalled.get(into)?.has(packageName)
  if (have) {
    return
  }

  console.log(`install ${packageName}`)
  const packageJson = getPackageJson(packageName)
  for (const dependency of Object.keys(packageJson.dependencies ?? {})) {
    installDependencyGraphFromTar(into, dependency, cmd)
  }
  const tarFile = getTarFile(packageName)
  exec(`cd ${into} && ${cmd} ${packageName}@${tarFile}`)
  alreadyInstalled.set(into, alreadyInstalled.get(into)?.add(packageName) ?? new Set([packageName]))
}

export function resolve(...parts: string[]) {
  return path.resolve(...parts)
}

export async function writePretty(filePath: string, text: string) {
  let output = text

  const isPrettierUnsupportedType = filePath.endsWith(".mk") || filePath.endsWith("Makefile")
  if (!isPrettierUnsupportedType) {
    const prettierConfig = (await prettier.resolveConfig(filePath)) ?? {}
    output = await prettier.format(text, {
      ...prettierConfig,
      filepath: filePath,
    })
  }
  console.warn(`write`, path.relative(process.cwd(), filePath))
  fs.writeFileSync(filePath, output)
}

export interface WorkspaceJson {
  location: string
  name: string
}

export function getYarnWorkspaces(): WorkspaceJson[] {
  return p
    .execSync("yarn workspaces list --json", { encoding: "utf-8" })
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line) as WorkspaceJson)
}

export function readJson<T>(filepath: string): T {
  return JSON.parse(fs.readFileSync(filepath, "utf8"))
}

export function tryReadJson<T>(filepath: string): T | undefined {
  try {
    return readJson(filepath)
  } catch (e) {
    return undefined
  }
}

export interface PackageJson {
  name: string
  type?: "module"
  private?: boolean
  version: string
  description: string
  sideEffects: false
  repository: {
    type: string
    url: string
  }
  scripts: Record<string, string>
  files: string[]
  dependencies: Record<string, string>
  devDependencies?: Record<string, string>
  exports: Record<
    string,
    { types: string; import: string | undefined; require: string | undefined } | string | undefined
  >
  types?: string
  main?: string
  module?: string
  author: {
    name: string
    email?: string
    url: string
  }
}
