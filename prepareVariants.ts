#!/usr/bin/env npx tsx

/**
 * This file defines all the different variants of the quickjs WASM library.
 */

import path from "path"
import fs, { write } from "fs"
import prettier from "prettier"
import { Context, getMatches, buildFFI } from "./generate"
import { TypeDocOptions } from "typedoc"

const CLEAN = Boolean(process.env.CLEAN)

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
          "-O3",
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
  main().catch((error) => {
    console.error(error)
    process.exit(2)
  })
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
  exports: Record<string, { types: string; import: string; require: string } | string>
  types?: string
  main?: string
  module?: string
  author: {
    name: string
    email?: string
    url: string
  }
}

interface TsConfig {
  extends: string
  include: string[]
  files?: string[]
  exclude: string[]
}

interface FinalVariant {
  basename: string
  targetName: string
  dir: string
  packageJson: PackageJson
  variant: BuildVariant
  indexJs: string
}

async function main() {
  const variantsJson: Record<string, FinalVariant> = {}
  const makeOutputFiles: string[] = []
  const coreReadmeVariantDescriptions: string[] = []

  const ffiTypesDir = path.join(__dirname, "packages/quickjs-ffi-types")
  await writePretty(
    path.join(ffiTypesDir, "src/ffi.ts"),
    buildFFI(
      ...createContext({
        TYPE_ONLY: true,
        ASYNCIFY: false,
      }),
    ),
  )
  await writePretty(
    path.join(ffiTypesDir, "src/ffi-async.ts"),
    buildFFI(
      ...createContext({
        TYPE_ONLY: true,
        ASYNCIFY: true,
      }),
    ),
  )

  for (const [targetName, variants] of Object.entries(targets)) {
    for (const variant of variants) {
      const basename = getTargetPackageSuffix(targetName, variant)
      const dir = path.join(__dirname, "packages", `variant-${basename}`)
      const dist = path.join(dir, "dist")
      if (CLEAN) {
        try {
          fs.rmdirSync(dist, { recursive: true })
        } catch (e) {
          console.log("ignore", e)
        }
      }
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
        author: {
          name: "Jake Teton-Landis",
          url: "https://jake.tl",
        },
        scripts: {
          build: "yarn build:c && yarn build:ts",
          "build:c": "make -j2",
          "build:ts": "npx tsc --project .",
          clean: "make clean",
          prepare: "yarn clean && yarn build",
        },
        files: ["dist/**/*", "!dist/ffi.ts", "!dist/index.ts", "!dist/*.tsbuildinfo"],
        types: "./dist/index.d.ts",
        main: "./dist/index.js",
        module: "./dist/index.js",
        exports: {
          ".": {
            types: "./dist/index.d.ts",
            import: "./dist/index.js",
            require: "./dist/index.js",
          },
          "./package.json": "./package.json",
          "./ffi": {
            types: "./dist/ffi.d.ts",
            import: "./dist/ffi.js",
            require: "./dist/ffi.js",
          },
          "./wasm": "./dist/emscripten-module.wasm",
          "./emscripten": {
            types: "./dist/emscripten-module.d.ts",
            import: "./dist/emscripten-module.js",
            require: "./dist/emscripten-module.js",
          },
        },
        dependencies: {
          "@jitl/quickjs-ffi-types": "workspace:*",
        },
      }

      const tsConfig: TsConfig = {
        extends: "@jitl/tsconfig/tsconfig.json",
        include: ["dist/ffi.ts", "dist/index.ts"],
        exclude: ["node_modules"],
      }

      const typedocConfig: Partial<TypeDocOptions> & { extends?: string; mergeReadme?: boolean } = {
        extends: "../../typedoc.base.js",
        entryPoints: ["./dist/index.ts"],
        mergeReadme: true,
      }

      const finalVariant: FinalVariant = {
        basename,
        targetName,
        dir: path.relative(__dirname, dir),
        packageJson,
        indexJs: path.relative(__dirname, path.join(dist, "index.js")),
        variant,
      }
      variantsJson[finalVariant.dir] = finalVariant

      await writePretty(path.join(dir, "package.json"), JSON.stringify(packageJson))
      await writePretty(path.join(dir, "tsconfig.json"), JSON.stringify(tsConfig))
      await writePretty(path.join(dir, "typedoc.json"), JSON.stringify(typedocConfig))
      await writePretty(path.join(dir, "README.md"), renderReadme(targetName, variant, packageJson))
      await writePretty(path.join(dir, "Makefile"), renderMakefile(targetName, variant))
      const readmeSummary = renderReadmeSummary(targetName, variant, packageJson)
      await writePretty(
        path.join(dist, "index.ts"),
        renderIndexTs(targetName, variant, readmeSummary),
      )
      await writePretty(path.join(dist, "ffi.ts"), renderFfiTs(targetName, variant))
      makeOutputFiles.push(finalVariant.indexJs)
      coreReadmeVariantDescriptions.push(readmeSummary)
    }
  }

  await writePretty(
    path.join(__dirname, "packages/quickjs-emscripten-core/README.md"),
    renderCoreReadme(coreReadmeVariantDescriptions),
  )
  await writePretty(path.join(__dirname, "variants.json"), JSON.stringify(variantsJson))
}

async function writePretty(filePath: string, text: string) {
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

const describeInclusion = {
  [EmscriptenInclusion.SingleFile]: `The WASM runtime is included directly in the JS file. Use if you run into issues with missing .wasm files when building or deploying your app.`,
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

const describeModuleFactory = {
  [SyncMode.Sync]: `newQuickJSWASMModuleFromVariant`,
  [SyncMode.Asyncify]: `newQuickJSAsyncWASMModuleFromVariant`,
}

function renderCoreReadme(variantDescriptions: string[]): string {
  const template = new TemplateFile(
    fs.readFileSync(
      path.join(__dirname, "packages/quickjs-emscripten-core/README.template.md"),
      "utf-8",
    ),
  )
  template.replace("<!-- __VARIANTS__ -->", variantDescriptions.join("\n\n"))
  template.replace(
    "__EDIT_THIS_FILE_NOT_README_MD__",
    "DO NOT EDIT THIS FILE. Edit README.template.md instead.",
  )
  return template.text
}

function renderReadmeSummary(
  targetName: string,
  variant: BuildVariant,
  packageJson: PackageJson,
): string {
  const baseURL = "https://github.com/justjake/quickjs-emscripten/blob/main/doc/packages"
  const packageURL = `${baseURL}/${packageJson.name}/README.md`
  return `### [${packageJson.name}](${packageURL})

${variant.description}

| Variable            |    Setting                     |    Description    |
| --                  | --                             | --                |
| releaseMode         | ${variant.releaseMode} | ${describeMode[variant.releaseMode]} |
| syncMode            | ${variant.syncMode} | ${describeSyncMode[variant.syncMode]} |
| moduleSystem        | ${variant.moduleSystem} | ${describeModuleSystem[variant.moduleSystem]} |
| emscriptenInclusion | ${variant.emscriptenInclusion} | ${
    describeInclusion[variant.emscriptenInclusion]
  } |
`
}

function renderReadme(targetName: string, variant: BuildVariant, packageJson: PackageJson): string {
  const codeFence = (lang: string, text: string) => `\`\`\`${lang}\n${text}\n\`\`\``
  const json = (obj: any) => codeFence("json", JSON.stringify(obj, null, 2))
  const create = describeModuleFactory[variant.syncMode]

  return `# ${packageJson.name}

${variant.description}

This generated package is part of [quickjs-emscripten](https://github.com/justjake/quickjs-emscripten).
It contains a variant of the quickjs WASM library, and can be used with quickjs-emscripten-core.

${codeFence(
  "typescript",
  `
import variant from '${packageJson.name}'
import { ${create} } from 'quickjs-emscripten-core'
const QuickJS = await ${create}(variant)
`,
)}

This variant was built with the following settings:

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

class TemplateFile {
  constructor(public text: string) {}

  replace(pattern: string | RegExp, replacement: string) {
    const nextText = this.text.replace(pattern, replacement)
    if (nextText === this.text) {
      throw new Error(`Failed to replace ${pattern} with ${replacement}`)
    }
    this.text = nextText
  }

  toString() {
    return this.text
  }
}

function renderMakefile(targetName: string, variant: BuildVariant): string {
  const template = new TemplateFile(
    fs.readFileSync(path.join(__dirname, "templates/Variant.mk"), "utf-8"),
  )

  template.replace(
    "CFLAGS_WASM_VARIANT=REPLACE_THIS",
    getCflags(targetName, variant)
      .map((flag) => `CFLAGS_WASM+=${flag}`)
      .join("\n"),
  )
  template.replace(
    "GENERATE_TS_ENV_VARIANT=REPLACE_THIS",
    Object.entries(getGenerateTsEnv(targetName, variant))
      .map(([key, value]) => `GENERATE_TS_ENV+=${key}=${value}`)
      .join("\n"),
  )

  template.replace("VARIANT=REPLACE_THIS", `VARIANT=${JSON.stringify(variant)}`)
  template.replace("SYNC=REPLACE_THIS", `SYNC=${variant.syncMode.toUpperCase()}`)

  return template.text
}

function renderIndexTs(
  targetName: string,
  variant: BuildVariant,
  docCommentContents: string,
): string {
  const docComment = docCommentContents
    .split("\n")
    .map((line) => ` * ${line}`)
    .join("\n")

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

/**
 * This export is a variant of the quickjs WASM library:
${docComment}
 */
const variant = {
  type: '${modeName}',
  importFFI: () => import('./ffi.js').then(mod => mod.${className}),
  importModuleLoader: () => import('./emscripten-module.js').then(mod => mod.default),
} as const satisfies ${variantTypeName}

export default variant
`
}

function renderFfiTs(targetName: string, variant: BuildVariant): string {
  const env = getGenerateTsEnv(targetName, variant)
  return buildFFI(...createContext(env))
}

function createContext(merged: Partial<Context> = {}) {
  const context = new Context()
  Object.assign(context, merged)
  const matches = getMatches(context).matches
  return [context, matches] as const
}

function getTargetPackageSuffix(targetName: string, variant: BuildVariant): string {
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
