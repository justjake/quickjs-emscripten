import assert from "assert"
import {
  getQuickJS,
  newQuickJSAsyncWASMModule,
  newQuickJSWASMModule,
  QuickJSWASMModule,
  QuickJSSyncVariant,
  QuickJSAsyncVariant,
  DEBUG_ASYNC,
  DEBUG_SYNC,
  RELEASE_ASYNC,
  RELEASE_SYNC,
} from "."

import { describe, it } from "node:test"

const VARIANT_LOADERS = {
  import_debug_sync: () => import("#variants/debug"),
  import_release_sync: () => import("#variants/release"),
  import_debug_async: () => import("#variants/debug-asyncify"),
  import_release_async: () => import("#variants/release-asyncify"),
  require_debug_sync: () => Promise.resolve(require("#variants/debug")),
  require_release_sync: () => Promise.resolve(require("#variants/release")),
  require_debug_async: () => Promise.resolve(require("#variants/debug-asyncify")),
  require_release_async: () => Promise.resolve(require("#variants/release-asyncify")),
  static_debug_sync: () => Promise.resolve(DEBUG_SYNC),
  static_release_sync: () => Promise.resolve(RELEASE_SYNC),
  static_debug_async: () => Promise.resolve(DEBUG_ASYNC),
  static_release_async: () => Promise.resolve(RELEASE_ASYNC),
}

// Verify that our variants are what we say they are.
async function getVariantBuildInfo(variant: QuickJSSyncVariant | QuickJSAsyncVariant) {
  const wasmModule =
    variant.type === "sync"
      ? await newQuickJSWASMModule(variant)
      : await newQuickJSAsyncWASMModule(variant)
  return getModuleBuildInfo(wasmModule)
}

function getModuleBuildInfo(wasmModule: QuickJSWASMModule) {
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

describe("variants", () => {
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

  for (const [name, loader] of Object.entries(VARIANT_LOADERS)) {
    describe(name, () => {
      it("can be loaded dynamically", async () => {
        const mod = await loader()
        const buildInfo = await getVariantBuildInfo(mod.default ?? mod)
        assert.ok(buildInfo)
      })
    })
  }
})
