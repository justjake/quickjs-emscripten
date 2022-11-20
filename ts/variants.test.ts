import assert from "assert"
import { getQuickJS, newQuickJSAsyncWASMModule, newQuickJSWASMModule } from "."
import { QuickJSWASMModule } from "./module"
import {
  AsyncBuildVariant,
  DEBUG_ASYNC,
  DEBUG_SYNC,
  RELEASE_ASYNC,
  RELEASE_SYNC,
  SyncBuildVariant,
} from "./variants"

// Verify that our variants are what we say they are.
async function getVariantBuildInfo(variant: SyncBuildVariant | AsyncBuildVariant) {
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
})
