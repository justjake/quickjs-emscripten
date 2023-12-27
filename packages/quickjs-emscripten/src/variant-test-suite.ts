import assert from "assert"
import variantsManifest from "../../../variants.json"
import type { QuickJSAsyncVariant, QuickJSSyncVariant, QuickJSWASMModule } from "."

function buildImportSpecifiers() {
  const specifiers: Record<string, { browser: boolean; import: boolean; require: boolean }> = {}
  for (const [, variant] of Object.entries(variantsManifest)) {
    specifiers[variant.packageJson.name] = {
      browser: "browser" in variant.variant.exports,
      import: "import" in variant.variant.exports,
      require: "require" in variant.variant.exports,
    }
  }
  return specifiers
}

export const packageSpecifiers = buildImportSpecifiers()

interface TestFramework {
  it(name: string, fn: () => void | Promise<void>): void
  describe(name: string, fn: () => void): void
}

export async function getVariantBuildInfoFromModule(
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  mod: typeof import("."),
  variant: QuickJSSyncVariant | QuickJSAsyncVariant,
) {
  const wasmModule =
    variant.type === "sync"
      ? await mod.newQuickJSWASMModule(variant)
      : await mod.newQuickJSAsyncWASMModule(variant)
  return getModuleBuildInfo(wasmModule)
}

export function getModuleBuildInfo(wasmModule: QuickJSWASMModule) {
  const ffi = wasmModule.getFFI()
  return {
    ffiDebug: ffi.DEBUG,
    debug: ffi.QTS_BuildIsDebug(),
    asyncify: ffi.QTS_BuildIsAsyncify(),
    sanitize: ffi.QTS_BuildIsSanitizeLeak(),
  }
}

const DEFAULT_VARIANT = {
  ffiDebug: false,
  debug: 0,
  asyncify: 0,
  sanitize: 0,
}

export function testSuite(
  test: TestFramework,
  dynamicLoaders: Record<string, () => any>,
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  mod: typeof import("."),
) {
  const { describe, it } = test
  const { getQuickJS, DEBUG_SYNC, RELEASE_SYNC, DEBUG_ASYNC, RELEASE_ASYNC } = mod
  const getVariantBuildInfo = (variant: QuickJSSyncVariant | QuickJSAsyncVariant) =>
    getVariantBuildInfoFromModule(mod, variant)

  const loaders: Record<string, () => any> = {
    static_debug_sync: () => Promise.resolve(DEBUG_SYNC),
    static_release_sync: () => Promise.resolve(RELEASE_SYNC),
    static_debug_async: () => Promise.resolve(DEBUG_ASYNC),
    static_release_async: () => Promise.resolve(RELEASE_ASYNC),
    ...dynamicLoaders,
  }

  describe("getQuickJS (alias of RELEASE_SYNC)", () => {
    it("has expected build settings", async () => {
      assert.deepStrictEqual(getModuleBuildInfo(await getQuickJS()), DEFAULT_VARIANT)
    })
  })

  describe("DEBUG_SYNC", () => {
    it("has expected build settings", async () => {
      assert.deepStrictEqual(await getVariantBuildInfo(DEBUG_SYNC), {
        ffiDebug: true,
        debug: 1,
        asyncify: 0,
        sanitize: 1,
      })
    })
  })

  describe("RELEASE_SYNC", () => {
    it("has expected build settings", async () => {
      assert.deepStrictEqual(await getVariantBuildInfo(RELEASE_SYNC), DEFAULT_VARIANT)
    })
  })

  describe("DEBUG_ASYNC", () => {
    it("has expected build settings", async () => {
      assert.deepStrictEqual(await getVariantBuildInfo(DEBUG_ASYNC), {
        ffiDebug: true,
        debug: 1,
        asyncify: 1,
        sanitize: 0,
      })
    })
  })

  describe("RELEASE_ASYNC", () => {
    it("has expected build settings", async () => {
      assert.deepStrictEqual(await getVariantBuildInfo(RELEASE_ASYNC), {
        ffiDebug: false,
        debug: 0,
        asyncify: 1,
        sanitize: 0,
      })
    })
  })

  for (const [name, loader] of Object.entries(loaders)) {
    test.describe(name, () => {
      test.it("can be loaded dynamically", async () => {
        const loaded = await loader()
        const buildInfo = await getVariantBuildInfo(loaded.default ?? loaded)
        assert.ok(buildInfo)
      })
    })
  }
}
