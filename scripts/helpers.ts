import path from "node:path"
import fs from "node:fs"
import p from "node:child_process"
import prettier from "prettier"
import { remove } from "fs-extra"

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

class InstallFlow {
  steps: Array<() => void> = []

  constructor(
    public into: string,
    public commands: { install: string; remove: string },
  ) {}

  add(packageName: string) {
    const removed = new Set<string>()
    const added = new Set<string>()
    this.visit(packageName, {
      after: (pkg) => {
        if (removed.has(pkg.name)) {
          return
        }
        this.steps.push(() => exec(`cd ${this.into} && ${this.commands.remove} ${pkg.name}`))
        removed.add(pkg.name)
      },
    })
    this.visit(packageName, {
      after: (pkg) => {
        if (added.has(pkg.name)) {
          return
        }
        const tarFile = getTarFile(pkg.name)
        this.steps.push(() =>
          exec(`cd ${this.into} && ${this.commands.install} ${pkg.name}@${tarFile}`),
        )
        added.add(pkg.name)
      },
    })
    return this
  }

  private visit(
    packageName: string,
    handle: { before?(pkg: PackageJson): void; after?(pkg: PackageJson): void },
  ) {
    const packageJson = getPackageJson(packageName)
    handle.before?.(packageJson)
    for (const dependency of Object.keys(packageJson.dependencies ?? {})) {
      this.visit(dependency, handle)
    }
    handle.after?.(packageJson)
  }

  run() {
    for (const step of this.steps) {
      step()
    }
  }
}

export function installDependencyGraphFromTar(
  into: string,
  packageName: string,
  cmds: {
    install: string
    remove: string
  } = {
    install: "npm install",
    remove: "npm remove",
  },
) {
  new InstallFlow(into, cmds).add(packageName).run()
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
    | {
        types: string
        browser?: string
        import: string | undefined
        require: string | undefined
      }
    | string
    | undefined
  >
  types?: string
  main?: string
  module?: string
  browser?: string
  author: {
    name: string
    email?: string
    url: string
  }
}
