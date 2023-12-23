/**
 * This file defines all the different variants of the quickjs WASM library.
 */

import path from "path"
import fs from "fs"
import child_process from "child_process"

// Variant variables.

enum ReleaseMode {
  Debug = "debug",
  Release = "release",
}

enum SyncMode {
  Sync = "sync",
  Asyncify = "asyncify",
}

enum CLibrary {
  QuickJS = "quickjs",
  NG = "quickjs-ng",
}

enum ModuleSystem {
  CommonJS = "commonjs",
  ESModule = "esm",
}

enum EmscriptenInclusion {
  SingleFile = "singlefile",
  Separate = "wasm",
}

// https://github.com/emscripten-core/emscripten/blob/7bed0e2477000603c26766897e1f455c08bc3358/src/settings.js#L647
enum EmscriptenEnvironment {
  web = "web",
  webview = "webview",
  worker = "worker",
  node = "node",
}

interface BuildVariant {
  description: string
  releaseMode: ReleaseMode
  syncMode: SyncMode
  library: CLibrary
  moduleSystem: ModuleSystem
  emscriptenInclusion: EmscriptenInclusion
  emscriptenEnvironment: EmscriptenEnvironment[]
}

const buildMatrix = {
  library: [CLibrary.QuickJS],
  releaseMode: [ReleaseMode.Debug, ReleaseMode.Release],
  syncMode: [SyncMode.Sync, SyncMode.Asyncify],
  emscriptenInclusion: [EmscriptenInclusion.SingleFile, EmscriptenInclusion.Separate],
} as const

// Targets: groups of variants.

const targets = {
  "node-cjs": makeTarget({
    description: `Node.js CommonJS module`,
    emscriptenEnvironment: [EmscriptenEnvironment.node],
    moduleSystem: ModuleSystem.CommonJS,
    emscriptenInclusion: EmscriptenInclusion.Separate,
  }),
  "node-esm": makeTarget({
    description: `Node.js ESModule`,
    emscriptenEnvironment: [EmscriptenEnvironment.node],
    moduleSystem: ModuleSystem.ESModule,
    emscriptenInclusion: EmscriptenInclusion.Separate,
  }),
  browser: makeTarget({
    description: `ESModule for browsers or browser-like environments`,
    emscriptenEnvironment: [EmscriptenEnvironment.web, EmscriptenEnvironment.worker],
    moduleSystem: ModuleSystem.ESModule,
  }),
}

type TargetSpec = Partial<BuildVariant> &
  Pick<BuildVariant, Exclude<keyof BuildVariant, keyof typeof buildMatrix>>
function makeTarget(partialVariant: TargetSpec): BuildVariant[] {
  const allVariants = buildMatrix.library.flatMap<BuildVariant>((library) => {
    return buildMatrix.releaseMode.flatMap((releaseMode) => {
      return buildMatrix.syncMode.flatMap((syncMode) => {
        return buildMatrix.emscriptenInclusion.flatMap((emscriptenInclusion) => {
          return {
            library,
            releaseMode,
            syncMode,
            emscriptenInclusion,
            ...partialVariant,
          }
        })
      })
    })
  })

  const seen = new Set<string>()
  return allVariants.filter((variant) => {
    const key = JSON.stringify(variant)
    if (seen.has(key)) {
      return false
    } else {
      seen.add(key)
      return true
    }
  })
}

// Build settings for variables

const ASYNCIFY_STACK_SIZE = 81920
const SyncModeFlags = {
  [SyncMode.Sync]: [],
  [SyncMode.Asyncify]: [
    `-s ASYNCIFY=1`,
    `-DQTS_ASYNCIFY=1`,
    `-DQTS_ASYNCIFY_DEFAULT_STACK_SIZE=${ASYNCIFY_STACK_SIZE}`,
    `-s ASYNCIFY_STACK_SIZE=${ASYNCIFY_STACK_SIZE}`,
    `-s ASYNCIFY_REMOVE=@$(BUILD_WRAPPER)/asyncify-remove.json`,
    `-s ASYNCIFY_IMPORTS=@$(BUILD_WRAPPER)/asyncify-imports.json`,
    `-lasync.js`,
  ],
}

const ReleaseModeFlags = {
  [ReleaseMode.Release]: [`-Oz`, `-flto`, `-s SINGLE_FILE=1`, `--closure 1`, `-s FILESYSTEM=0`],
  [ReleaseMode.Debug]: [`-O0`, "-DQTS_DEBUG_MODE", `-gsource-map`, `-s ASSERTIONS=1`],
}

const EmscriptenInclusionFlags = {
  [EmscriptenInclusion.Separate]: [],
  [EmscriptenInclusion.SingleFile]: [`-s SINGLE_FILE=1`],
}

const ModuleSystemFlags = {
  [ModuleSystem.CommonJS]: [],
  [ModuleSystem.ESModule]: [`-s EXPORT_ES6=1`],
}

function getCflags(targetName: string, variant: BuildVariant) {
  const flags: string[] = []

  flags.push(...SyncModeFlags[variant.syncMode])
  flags.push(...ReleaseModeFlags[variant.releaseMode])
  flags.push(...EmscriptenInclusionFlags[variant.emscriptenInclusion])
  flags.push(...ModuleSystemFlags[variant.moduleSystem])

  const emscriptenEnvironment = variant.emscriptenEnvironment.join(",")
  flags.push(`-s ENVIRONMENT=${emscriptenEnvironment}`)

  if (variant.releaseMode === ReleaseMode.Debug) {
    switch (variant.syncMode) {
      case SyncMode.Sync:
        flags.push("-DQTS_SANITIZE_LEAK")
        flags.push("-fsanitize=leak")
        flags.push("-g2")
      case SyncMode.Asyncify:
        flags.push("-s ASYNCIFY_ADVISE=1")
        flags.push(
          // # Need to use -O3 - otherwise ASYNCIFY leads to stack overflows (why?)
          "-O3"
        )
    }
  }

  return flags
}

function getGenerateTsEnv(targetName: string, variant: BuildVariant): Record<string, string> {
  const env: Record<string, string> = {}

  if (variant.syncMode === SyncMode.Asyncify) {
    env.ASYNCIFY = "true"
  }

  if (variant.releaseMode === ReleaseMode.Debug) {
    env.DEBUG = "true"
  }

  return env
}

// Action

if (require.main === module) {
  main()
}

interface PackageJson {
  name: string
  type?: "module"
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
}

interface TsConfig {
  extends: string
  include: string[]
  files?: string[]
  exclude: string[]
}

function main() {
  for (const [targetName, variants] of Object.entries(targets)) {
    for (const variant of variants) {
      const basename = getTargetFilename(targetName, variant)
      const dir = path.join(__dirname, "packages", basename)
      const dist = path.join(dir, "dist")
      fs.mkdirSync(dist, { recursive: true })

      const packageJson: PackageJson = {
        name: `@jitl/${basename}`,
        version: "0.0.0",
        type: variant.moduleSystem === ModuleSystem.ESModule ? "module" : undefined,
        description: `Variant of quickjs library: ${variant.description}`,
        sideEffects: false,
        repository: {
          type: "git",
          url: "https://github.com/justjake/quickjs-emscripten",
        },
        scripts: {
          build: "make -j8",
          clean: "make clean",
          prepare: "make clean && rm -r dist && make",
        },
        files: ["dist/**/*", "!dist/ffi.ts", "!dist/index.ts", "!dist/*.tsbuildinfo"],
        dependencies: {
          "@jitl/quickjs-ffi-types": "workspace:*",
        },
      }

      const tsConfig: TsConfig = {
        extends: "@jitl/tsconfig/tsconfig.json",
        include: ["dist/ffi.ts", "dist/index.ts"],
        exclude: ["node_modules"],
      }

      fs.writeFileSync(path.join(dir, "package.json"), JSON.stringify(packageJson, null, 2) + "\n")
      fs.writeFileSync(path.join(dir, "tsconfig.json"), JSON.stringify(tsConfig, null, 2) + "\n")
      fs.writeFileSync(path.join(dir, "README.md"), renderReadme(targetName, variant, packageJson))
      fs.writeFileSync(path.join(dir, "Makefile"), renderMakefile(targetName, variant))
      fs.writeFileSync(path.join(dist, "index.ts"), renderIndexTs(targetName, variant))
      fs.writeFileSync(path.join(dist, "ffi.ts"), renderFfiTs(targetName, variant))
    }
  }
}

function renderReadme(targetName: string, variant: BuildVariant, packageJson: PackageJson): string {
  const json = (obj: any) => "```json\n" + JSON.stringify(obj, null, 2) + "\n```"

  const describeInclusion = {
    [EmscriptenInclusion.SingleFile]: `The WASM runtime is included directly in the JS file. Use if you run into issues with missing .wasm files when building or deploying your app`,
    [EmscriptenInclusion.Separate]: `Has a separate .wasm file. May offer better caching in your browser, and reduces the size of your JS bundle. If you have issues, try a 'singlefile' variant.`,
  }

  const describeMode = {
    [ReleaseMode.Debug]: `Enables assertions and memory sanitizers. Try to run your tests against debug variants, in addition to your preferred production variant, to catch more bugs.`,
    [ReleaseMode.Release]: `Optimized for performance; use when building/deploying your application.`,
  }

  const describeSyncMode = {
    [SyncMode.Sync]: `The default, normal build. Note that both variants support regular async functions.`,
    [SyncMode.Asyncify]: `Build run through the ASYNCIFY WebAssembly transform. Larger and slower. Allows synchronous calls from the WASM runtime to async functions on the host. The extra magic makes this variant slower than sync variants. Note that both variants support regular async functions. Only adopt ASYNCIFY if you need to!`,
  }

  const describeLibrary = {
    [CLibrary.QuickJS]: `The original [bellard/quickjs](https://github.com/bellard/quickjs) library.`,
    [CLibrary.NG]: `[quickjs-ng](https://github.com/quickjs-ng/quickjs) is a newer fork of quickjs with more language features.`,
  }

  const describeModuleSystem = {
    [ModuleSystem.CommonJS]: `This variant exports a CommonJS module, which is faster to load and run in Node.js.`,
    [ModuleSystem.ESModule]: `This variant exports an ESModule, which is standardized for browsers and more modern browser-like environments. It cannot be imported from CommonJS without shenanigans.`,
  }

  return `# ${packageJson.name}

${variant.description}

This generated package is part of [quickjs-emscripten](https://github.com/justjake/quickjs-emscripten).
It contains a variant of the quickjs WASM library built with the following configuration:

## Library: ${variant.library}

${describeLibrary[variant.library]}

## Release mode: ${variant.releaseMode}

${describeMode[variant.releaseMode]}

## Module system: ${variant.moduleSystem}

${describeModuleSystem[variant.moduleSystem]}

## Extra async magic? ${variant.syncMode === SyncMode.Asyncify ? "Yes" : "No"}

${describeSyncMode[variant.syncMode]}

## Single-file, or separate .wasm file? ${variant.emscriptenInclusion}

${describeInclusion[variant.emscriptenInclusion]}

## More details

Full variant JSON description:

${json(variant)}

Variant-specific Emscripten build flags:

${json(getCflags(targetName, variant))}
`
}

function renderMakefile(targetName: string, variant: BuildVariant): string {
  let template = fs.readFileSync(path.join(__dirname, "Variant.mk"), "utf-8")

  const replace = (pattern: string | RegExp, replacement: string) => {
    const nextTemplate = template.replace(pattern, replacement)
    if (nextTemplate === template) {
      throw new Error(`Failed to replace ${pattern} with ${replacement}`)
    }
    template = nextTemplate
  }

  replace(
    "CFLAGS_WASM_VARIANT=REPLACE_THIS",
    getCflags(targetName, variant)
      .map((flag) => `CFLAGS_WASM+=${flag}`)
      .join("\n")
  )
  replace(
    "GENERATE_TS_ENV_VARIANT=REPLACE_THIS",
    Object.entries(getGenerateTsEnv(targetName, variant))
      .map(([key, value]) => `GENERATE_TS_ENV+=${key}=${value}`)
      .join("\n")
  )

  replace("VARIANT=REPLACE_THIS", `VARIANT=${JSON.stringify(variant)}`)
  replace("SYNC=REPLACE_THIS", `SYNC=${variant.syncMode.toUpperCase()}`)

  return template
}

function renderIndexTs(targetName: string, variant: BuildVariant): string {
  const className = {
    [SyncMode.Sync]: "QuickJSFFI",
    [SyncMode.Asyncify]: "QuickJSAsyncFFI",
  }[variant.syncMode]

  const modeName = {
    [SyncMode.Sync]: "sync",
    [SyncMode.Asyncify]: "async",
  }[variant.syncMode]

  const variantTypeName = {
    [SyncMode.Sync]: "QuickJSSyncVariant",
    [SyncMode.Asyncify]: "QuickJSAsyncVariant",
  }[variant.syncMode]

  return `
import { ${variantTypeName} } from '@jitl/quickjs-ffi-types'

const variant = {
  type: '${modeName}',
  importFFI: () => import('./ffi.js').then(mod => mod.${className}),
  importModuleLoader: () => import('./emscripten-module.js').then(mod => mod.default),
} as const satisfies ${variantTypeName}

export default variant
`
}

function renderFfiTs(targetName: string, variant: BuildVariant): string {
  return child_process.execSync("npx tsx generate.ts ffi -", {
    env: {
      ...process.env,
      ...getGenerateTsEnv(targetName, variant),
    },
    encoding: "utf-8",
  })
}

function getTargetFilename(targetName: string, variant: BuildVariant): string {
  const { releaseMode, syncMode, library, moduleSystem, emscriptenInclusion } = variant
  const filename = [
    library, // quickjs
    targetName, // node-cjs
    releaseMode, // debug
    syncMode, // sync
    emscriptenInclusion, // singlefile
  ].join("-")
  return filename
}
