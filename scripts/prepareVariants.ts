#!/usr/bin/env -S npx tsx

/**
 * This file defines all the different variants of the quickjs WASM library.
 */

import path from "node:path"
import fs from "node:fs"
import type { PackageJson } from "./helpers"
import { writePretty, tryReadJson, repoRoot } from "./helpers"
import { Context, getMatches, buildFFI } from "./generate"
import type { TypeDocOptions } from "typedoc"

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
  emscriptenInclusion: EmscriptenInclusion
  exports: {
    browser?: {
      emscriptenEnvironment: EmscriptenEnvironment[]
    }
    import?: {
      emscriptenEnvironment: EmscriptenEnvironment[]
    }
    require?: {
      emscriptenEnvironment: EmscriptenEnvironment[]
    }
  }
}

const SEPARATE_FILE_INCLUSION: BuildVariant["exports"] = {
  require: {
    emscriptenEnvironment: [EmscriptenEnvironment.node],
  },
  import: {
    emscriptenEnvironment: [EmscriptenEnvironment.node],
  },
  browser: {
    emscriptenEnvironment: [EmscriptenEnvironment.web, EmscriptenEnvironment.worker],
  },
}

const buildMatrix = {
  library: [CLibrary.QuickJS],
  releaseMode: [ReleaseMode.Debug, ReleaseMode.Release],
  syncMode: [SyncMode.Sync, SyncMode.Asyncify],
} as const

// Targets: groups of variants.

const targets = {
  wasmfile: makeTarget({
    description: `Variant with separate .WASM file. Supports browser, NodeJS ESM, and NodeJS CJS.`,
    emscriptenInclusion: EmscriptenInclusion.Separate,
    exports: SEPARATE_FILE_INCLUSION,
  }),
  "singlefile-cjs": makeTarget({
    description: `Variant with the WASM data embedded into a NodeJS CommonJS module.`,
    emscriptenInclusion: EmscriptenInclusion.SingleFile,
    exports: {
      require: SEPARATE_FILE_INCLUSION.require,
    },
  }),
  "singlefile-mjs": makeTarget({
    description: `Variant with the WASM data embedded into a NodeJS ESModule.`,
    emscriptenInclusion: EmscriptenInclusion.SingleFile,
    exports: {
      import: SEPARATE_FILE_INCLUSION.import,
    },
  }),
  "singlefile-browser": makeTarget({
    description: `Variant with the WASM data embedded into a browser ESModule.`,
    emscriptenInclusion: EmscriptenInclusion.SingleFile,
    exports: {
      browser: SEPARATE_FILE_INCLUSION.browser,
    },
  }),
}

type TargetSpec = Partial<BuildVariant> &
  Pick<BuildVariant, Exclude<keyof BuildVariant, keyof typeof buildMatrix>>
function makeTarget(partialVariant: TargetSpec): BuildVariant[] {
  const allVariants = buildMatrix.library.flatMap<BuildVariant>((library) => {
    return buildMatrix.releaseMode.flatMap((releaseMode) => {
      return buildMatrix.syncMode.flatMap((syncMode) => {
        return {
          library,
          releaseMode,
          syncMode,
          ...partialVariant,
        }
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
  [ReleaseMode.Release]: [`-Oz`, `-flto`, `--closure 1`, `-s FILESYSTEM=0`],
  [ReleaseMode.Debug]: [`-O0`, "-DQTS_DEBUG_MODE", `-gsource-map`, `-s ASSERTIONS=1`],
}

const EmscriptenInclusionFlags = {
  [EmscriptenInclusion.Separate]: [],
  [EmscriptenInclusion.SingleFile]: [`-s SINGLE_FILE=1`],
}

function getCflags(targetName: string, variant: BuildVariant) {
  const flags: string[] = []

  flags.push(...SyncModeFlags[variant.syncMode])
  flags.push(...ReleaseModeFlags[variant.releaseMode])
  flags.push(...EmscriptenInclusionFlags[variant.emscriptenInclusion])

  if (variant.releaseMode === ReleaseMode.Debug) {
    switch (variant.syncMode) {
      case SyncMode.Sync:
        flags.push("-DQTS_SANITIZE_LEAK")
        flags.push("-fsanitize=leak")
        flags.push("-g2")
        break
      case SyncMode.Asyncify:
        flags.push("-s ASYNCIFY_ADVISE=1")
        flags.push(
          // # Need to use -O3 - otherwise ASYNCIFY leads to stack overflows (why?)
          "-O3",
        )
        break
    }
  }

  return flags
}

function getExportCflags(variant: BuildVariant, exportName: keyof BuildVariant["exports"]) {
  const exportVariant = variant.exports[exportName]
  if (!exportVariant) {
    return []
  }

  const emscriptenEnvironment = exportVariant.emscriptenEnvironment.join(",")
  return [`-s ENVIRONMENT=${emscriptenEnvironment}`]
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
  const coreReadmeVariantDescriptions: string[] = []

  const ffiTypesDir = path.join(repoRoot, "packages/quickjs-ffi-types")
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
      const dir = path.join(repoRoot, "packages", `variant-${basename}`)
      const dist = path.join(dir, "dist")
      const src = path.join(dir, "src")

      const makeDirs = [dist, src]
      for (const dirToMake of makeDirs) {
        if (CLEAN) {
          try {
            fs.rmdirSync(dirToMake, { recursive: true })
          } catch (e) {
            console.log("ignore", e)
          }
        }
        fs.mkdirSync(dirToMake, { recursive: true })
      }

      const rootPackageJson: PackageJson | undefined = tryReadJson(
        path.join(repoRoot, "package.json"),
      )
      const packageJsonPath = path.join(dir, "package.json")
      const existingPackageJson: PackageJson | undefined = tryReadJson(packageJsonPath)

      const { js, mjs } = getTsupExtensions(variant)
      const indexExports = {
        types: js ? "./dist/index.d.ts" : "./dist/index.d.mts",
        main: js ? "./dist/index.js" : "./dist/index.mjs",
        module: mjs ? "./dist/index.mjs" : undefined,
      }

      const packageJson: PackageJson = {
        name: `@jitl/${basename}`,
        version: existingPackageJson?.version ?? rootPackageJson?.version ?? "0.0.0",
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
          "build:c": variant.exports.import && variant.exports.require ? "make" : "make -j2",
          "build:ts": "npx tsup",
          "check:types": "npx tsc --project . --noEmit",
          clean: "make clean",
          prepare: "yarn clean && yarn build",
        },
        files: ["dist/**/*", "!dist/*.tsbuildinfo"],
        types: indexExports.types,
        main: indexExports.main,
        module: indexExports.module,
        browser: variant.exports.browser ? "./dist/index.mjs" : undefined,
        exports: {
          ".": {
            types: indexExports.types,
            import: indexExports.module ?? indexExports.main,
            require: js ? "./dist/index.js" : undefined,
          },
          "./package.json": "./package.json",
          "./ffi": {
            types: "./dist/ffi.d.ts",
            import: mjs ? "./dist/ffi.mjs" : "./dist/ffi.js",
            require: js ? "./dist/ffi.js" : undefined,
          },
          "./wasm":
            variant.emscriptenInclusion === EmscriptenInclusion.Separate
              ? "./dist/emscripten-module.wasm"
              : undefined,
          "./emscripten-module": {
            types: variant.exports.browser
              ? "./dist/emscripten-module.browser.d.ts"
              : "./dist/emscripten-module.d.ts",
            browser: variant.exports.browser ? "./dist/emscripten-module.browser.mjs" : undefined,
            import: variant.exports.import
              ? "./dist/emscripten-module.mjs"
              : variant.exports.browser
                ? "./dist/emscripten-module.browser.mjs"
                : "./dist/emscripten-module.cjs",
            require: variant.exports.require ? "./dist/emscripten-module.cjs" : undefined,
          },
        },
        dependencies: {
          "@jitl/quickjs-ffi-types": "workspace:*",
        },
      }

      const tsConfig: TsConfig = {
        extends: "@jitl/tsconfig/tsconfig.json",
        include: ["src/*"],
        exclude: ["node_modules"],
      }

      const typedocConfig: Partial<TypeDocOptions> & { extends?: string; mergeReadme?: boolean } = {
        extends: "../../typedoc.base.js",
        entryPoints: ["./src/index.ts"],
        mergeReadme: true,
      }

      const finalVariant: FinalVariant = {
        basename,
        targetName,
        dir: path.relative(repoRoot, dir),
        packageJson,
        indexJs: path.relative(repoRoot, path.join(dist, "index.js")),
        variant,
      }

      if (finalVariant.dir in variantsJson) {
        throw new Error(`Duplicate variant dir ${finalVariant.dir}`)
      }
      variantsJson[finalVariant.dir] = finalVariant

      await writePretty(path.join(dir, "package.json"), JSON.stringify(packageJson))
      await writePretty(path.join(dir, "tsconfig.json"), JSON.stringify(tsConfig))
      await writePretty(path.join(dir, "typedoc.json"), JSON.stringify(typedocConfig))
      await writePretty(path.join(dir, "README.md"), renderReadme(targetName, variant, packageJson))
      await writePretty(path.join(dir, "Makefile"), renderMakefile(targetName, variant))
      await writePretty(path.join(dir, "tsup.config.ts"), renderTsupConfig(variant, packageJson))
      const readmeSummary = renderReadmeSummary(targetName, variant, packageJson)
      await writePretty(
        path.join(src, "index.ts"),
        renderIndexTs(targetName, variant, readmeSummary, packageJson),
      )
      await writePretty(path.join(src, "ffi.ts"), renderFfiTs(targetName, variant))
      coreReadmeVariantDescriptions.push(readmeSummary)
    }
  }

  await writePretty(
    path.join(repoRoot, "packages/quickjs-emscripten-core/README.md"),
    renderCoreReadme(coreReadmeVariantDescriptions),
  )
  await writePretty(path.join(repoRoot, "variants.json"), JSON.stringify(variantsJson))
}

const describeInclusion = {
  [EmscriptenInclusion.SingleFile]: `The WASM runtime is included directly in the JS file. Use if you run into issues with missing .wasm files when building or deploying your app.`,
  [EmscriptenInclusion.Separate]: `Has a separate .wasm file. May offer better caching in your browser, and reduces the size of your JS bundle. If you have issues, try a 'singlefile' variant.`,
}

const describeMode = {
  [ReleaseMode.Debug]: `Enables assertions and memory sanitizers. Try to run your tests against debug variants, in addition to your preferred production variant, to catch more bugs.`,
  [ReleaseMode.Release]: `Optimized for performance; use when building/deploying your application.`,
}

const DOC_ROOT_URL = `https://github.com/justjake/quickjs-emscripten/blob/main/doc`

const describeSyncMode = {
  [SyncMode.Sync]: `The default, normal build. Note that both variants support regular async functions.`,
  [SyncMode.Asyncify]: `
Build run through the ASYNCIFY WebAssembly transform.
This imposes substantial size (2x the size of sync) and speed penalties (40% the speed of sync).
In return, allows synchronous calls from the QuickJS WASM runtime to async functions on the host.
The extra magic makes this variant slower than sync variants.
Note that both variants support regular async functions.
Only adopt ASYNCIFY if you need to!
The [QuickJSAsyncRuntime](${DOC_ROOT_URL}/quickjs-emscripten/classes/QuickJSAsyncRuntime.md)
and [QuickJSAsyncContext](${DOC_ROOT_URL}/quickjs-emscripten/classes/QuickJSAsyncContext.md) classes expose the ASYNCIFY-specific APIs.
`
    .trim()
    .split("\n")
    .join(" "),
}

const describeLibrary = {
  [CLibrary.QuickJS]: `The original [bellard/quickjs](https://github.com/bellard/quickjs) library.`,
  [CLibrary.NG]: `[quickjs-ng](https://github.com/quickjs-ng/quickjs) is a newer fork of quickjs with more language features.`,
}

const describeModuleFactory = {
  [SyncMode.Sync]: `newQuickJSWASMModuleFromVariant`,
  [SyncMode.Asyncify]: `newQuickJSAsyncWASMModuleFromVariant`,
}

const describeExport = {
  browser: `Exports a browser-compatible ESModule, designed to work in browsers and browser-like environments.`,
  require: `Exports a NodeJS-compatible CommonJS module, which is faster to load and run compared to an ESModule.`,
  import: `Exports a NodeJS-compatible ESModule. Cannot be imported synchronously from a NodeJS CommonJS module.`,
}

function renderCoreReadme(variantDescriptions: string[]): string {
  const template = new TemplateFile(
    fs.readFileSync(
      path.join(repoRoot, "packages/quickjs-emscripten-core/README.template.md"),
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
  const baseURL = "https://github.com/justjake/quickjs-emscripten/blob/main/doc"
  const packageURL = `${baseURL}/${packageJson.name}/README.md`
  const inclusion = describeInclusion[variant.emscriptenInclusion]
  const hasExports = Object.keys(variant.exports).join(" ")
  return `### [${packageJson.name}](${packageURL})

${variant.description}

| Variable            |    Setting                     |    Description    |
| --                  | --                             | --                |
| releaseMode         | ${variant.releaseMode}         | ${describeMode[variant.releaseMode]} |
| syncMode            | ${variant.syncMode}            | ${describeSyncMode[variant.syncMode]} |
| emscriptenInclusion | ${variant.emscriptenInclusion} | ${inclusion} |
| exports             | ${hasExports}                  | Has these package.json export conditions |
`
}

function renderReadme(targetName: string, variant: BuildVariant, packageJson: PackageJson): string {
  const codeFence = (lang: string, text: string) => `\`\`\`${lang}\n${text}\n\`\`\``
  const json = (obj: any) => codeFence("json", JSON.stringify(obj, null, 2))
  const create = describeModuleFactory[variant.syncMode]
  const hasExports = Object.keys(variant.exports).join(" ")
  const exportsList = (Object.keys(variant.exports) as Array<keyof (typeof variant)["exports"]>)
    .map((exportName) => `- ${describeExport[exportName]}`)
    .join("\n")

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

## Exports: ${hasExports}

Exports the following in package.json for the package entrypoint:

${exportsList}

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
    fs.readFileSync(path.join(repoRoot, "templates/Variant.mk"), "utf-8"),
  )

  const appendEnvVars = (varname: string, flags: string[]) =>
    flags.map((flag) => `${varname}+=${flag}`).join("\n")

  template.replace(
    "CFLAGS_ALL=REPLACE_THIS",
    appendEnvVars("CFLAGS_WASM", getCflags(targetName, variant)),
  )

  template.replace(
    "CFLAGS_CJS=REPLACE_THIS",
    appendEnvVars("CFLAGS_CJS", getExportCflags(variant, "require")),
  )

  template.replace(
    "CFLAGS_MJS=REPLACE_THIS",
    appendEnvVars("CFLAGS_MJS", getExportCflags(variant, "import")),
  )

  template.replace(
    "CFLAGS_BROWSER=REPLACE_THIS",
    appendEnvVars("CFLAGS_BROWSER", getExportCflags(variant, "browser")),
  )

  template.replace(
    "GENERATE_TS_ENV_VARIANT=REPLACE_THIS",
    appendEnvVars(
      "GENERATE_TS_ENV",
      Object.entries(getGenerateTsEnv(targetName, variant)).map(
        ([key, value]) => `${key}=${value}`,
      ),
    ),
  )

  template.replace("VARIANT=REPLACE_THIS", `VARIANT=${JSON.stringify(variant)}`)
  template.replace("SYNC=REPLACE_THIS", `SYNC=${variant.syncMode.toUpperCase()}`)

  const targets: string[] = []
  if (variant.exports.browser) {
    targets.push("BROWSER")
  }
  if (variant.exports.import) {
    targets.push("MJS")
  }
  if (variant.exports.require) {
    targets.push("CJS")
  }
  template.replace(/^EXPORTS: __REPLACE_THIS__/gm, `EXPORTS: ${targets.join(" ")}`)

  if (template.text.includes("REPLACE_THIS")) {
    throw new Error(`Didn't replace all REPLACE_THIS in Variant.mk`)
  }

  return template.text
}

function renderIndexTs(
  targetName: string,
  variant: BuildVariant,
  docCommentContents: string,
  packageJson: PackageJson,
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
import type { ${variantTypeName} } from '@jitl/quickjs-ffi-types'

/**
 * This export is a variant of the quickjs WASM library:
${docComment}
 */
const variant: ${variantTypeName} = {
  type: '${modeName}',
  importFFI: () => import('./ffi.js').then(mod => mod.${className}),
  importModuleLoader: () => import('${packageJson.name}/emscripten-module').then(mod => mod.default),
} as const

export default variant
`
}

function renderFfiTs(targetName: string, variant: BuildVariant): string {
  const env = getGenerateTsEnv(targetName, variant)
  return buildFFI(...createContext(env))
}

function getTsupExtensions(variant: BuildVariant) {
  const wantsESM = Boolean(variant.exports.import || variant.exports.browser)
  const wantsCJS = Boolean(variant.exports.require)
  return {
    js: wantsCJS,
    mjs: wantsESM,
  }
}

function renderTsupConfig(variant: BuildVariant, packageJson: PackageJson): string {
  const { js, mjs } = getTsupExtensions(variant)
  const formats = [mjs && "esm", js && "cjs"].filter(Boolean)
  return `
import { extendConfig } from "@jitl/tsconfig/tsup.base.config.js"

export default extendConfig({
  entry: ["src/index.ts", "src/ffi.ts"],
  external: [
    "${packageJson.name}/emscripten-module",
  ],
  formats: ${JSON.stringify(formats)},
  clean: false,
})
`
}

function createContext(merged: Partial<Context> = {}) {
  const context = new Context()
  Object.assign(context, merged)
  const matches = getMatches(context).matches
  return [context, matches] as const
}

function getTargetPackageSuffix(targetName: string, variant: BuildVariant): string {
  const { releaseMode, syncMode, library } = variant
  const filename = [
    library, // quickjs
    targetName, // node-cjs
    releaseMode, // debug
    syncMode, // sync
  ].join("-")
  return filename
}
