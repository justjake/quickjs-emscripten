import path from "node:path"
import fs from "node:fs"
import p from "node:child_process"
import prettier from "prettier"

export const repoRoot = path.resolve(__dirname, "..")
const packagesDir = path.resolve(repoRoot, "./packages")
const tarDir = path.resolve(repoRoot, "./build/tar")
let packageSubdirs: string[] | undefined

const INSTALL_FROM_REGISTRY = Boolean(process.env.INSTALL_FROM_REGISTRY)

function getPackageJson(packageName: string) {
  packageSubdirs ??= fs.readdirSync(packagesDir).map((dir) => path.join(packagesDir, dir))
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

class InstallFlow {
  steps: Array<() => void> = []

  constructor(
    public into: string,
    public commands: { install: string; remove: string; fromRegistry: boolean },
  ) {}

  add(packageName: string) {
    const removed = new Set<string>()
    const added = new Set<string>()
    this.visit(packageName, {
      after: (pkg) => {
        removed.add(pkg.name)
      },
    })
    this.steps.push(() =>
      exec(`cd ${this.into} && ${this.commands.remove} ${[...removed].join(" ")}`),
    )

    this.visit(packageName, {
      after: (pkg) => {
        if (this.commands.fromRegistry) {
          if (pkg.name === packageName) {
            added.add(`${pkg.name}@${pkg.version}`)
          }
          return
        }

        const tarFile = getTarFile(pkg.name)
        added.add(`${pkg.name}@${tarFile}`)
      },
    })
    this.steps.push(() =>
      exec(`cd ${this.into} && ${this.commands.install} ${[...added].join(" ")}`),
    )

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
    fromRegistry: boolean
  } = {
    install: "npm install",
    remove: "npm remove",
    fromRegistry: INSTALL_FROM_REGISTRY,
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
        module?: string
        iife?: string
        workerd?: string
        import: string | undefined
        require: string | undefined
        default: string | undefined
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
