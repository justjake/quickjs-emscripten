import type { QuickJSFFI as DebugAsyncifyFFI } from "./generated/ffi.WASM_DEBUG_ASYNCIFY"
import type { QuickJSFFI as ReleaseAsyncifyFFI } from "./generated/ffi.WASM_RELEASE_ASYNCIFY"
import type { QuickJSFFI as DebugSyncFFI } from "./generated/ffi.WASM_DEBUG_SYNC"
import type { QuickJSFFI as ReleaseSyncFFI } from "./generated/ffi.WASM_RELEASE_SYNC"
import type {
  EmscriptenModuleLoader,
  QuickJSEmscriptenModule,
  QuickJSAsyncEmscriptenModule,
} from "./emscripten-types"
import type { QuickJSWASMModule } from "./module"
import type { QuickJSAsyncWASMModule } from "./module-asyncify"

/** @private */
export type QuickJSFFI = DebugSyncFFI | ReleaseSyncFFI
/** @private */
export type QuickJSFFIConstructor = typeof DebugSyncFFI | typeof ReleaseSyncFFI
/** @private */
export type QuickJSAsyncFFI = DebugAsyncifyFFI | ReleaseAsyncifyFFI
/** @private */
export type QuickJSAsyncFFIConstructor = typeof DebugAsyncifyFFI | typeof ReleaseAsyncifyFFI

/**
 * A build variant of quickjs-emscripten. Use the DEBUG variant for interactive
 * debugging or memory leak detection, and the RELEASE variant for all other
 * use-cases.
 */
export interface SyncBuildVariant {
  type: "sync"
  importFFI: () => Promise<QuickJSFFIConstructor>
  importModuleLoader: () => Promise<EmscriptenModuleLoader<QuickJSEmscriptenModule>>
}

/**
 * A build variant of quickjs-emscripten (asyncify version). Use the DEBUG
 * variant for interactive debugging, and the RELEASE variant for all other
 * use-cases.
 */
export interface AsyncBuildVariant {
  type: "async"
  importFFI: () => Promise<QuickJSAsyncFFIConstructor>
  importModuleLoader: () => Promise<EmscriptenModuleLoader<QuickJSAsyncEmscriptenModule>>
}

/**
 * Create a new, completely isolated WebAssembly module containing the QuickJS library.
 * See the documentation on [[QuickJSWASMModule]].
 *
 * Note that there is a hard limit on the number of WebAssembly modules in older
 * versions of v8:
 * https://bugs.chromium.org/p/v8/issues/detail?id=12076
 */
export async function newQuickJSWASMModule(
  variant: SyncBuildVariant = RELEASE_SYNC
): Promise<QuickJSWASMModule> {
  const [wasmModuleLoader, QuickJSFFI, { QuickJSWASMModule }] = await Promise.all([
    variant.importModuleLoader(),
    variant.importFFI(),
    import("./module"),
  ])
  const wasmModule = await wasmModuleLoader()
  wasmModule.type = "sync"
  const ffi = new QuickJSFFI(wasmModule)
  return new QuickJSWASMModule(wasmModule, ffi)
}

/**
 * Create a new, completely isolated WebAssembly module containing a version of the QuickJS library
 * compiled with Emscripten's [ASYNCIFY](https://emscripten.org/docs/porting/asyncify.html) transform.
 *
 * This version of the library offers features that enable synchronous code
 * inside the VM to interact with asynchronous code in the host environment.
 * See the documentation on [[QuickJSAsyncWASMModule]], [[QuickJSAsyncRuntime]],
 * and [[QuickJSAsyncContext]].
 *
 * Note that there is a hard limit on the number of WebAssembly modules in older
 * versions of v8:
 * https://bugs.chromium.org/p/v8/issues/detail?id=12076
 */
export async function newQuickJSAsyncWASMModule(
  variant: AsyncBuildVariant = RELEASE_ASYNC
): Promise<QuickJSAsyncWASMModule> {
  const [wasmModuleLoader, QuickJSAsyncFFI, { QuickJSAsyncWASMModule }] = await Promise.all([
    variant.importModuleLoader(),
    variant.importFFI(),
    import("./module-asyncify"),
  ])
  const wasmModule = await wasmModuleLoader()
  wasmModule.type = "async"
  const ffi = new QuickJSAsyncFFI(wasmModule)
  return new QuickJSAsyncWASMModule(wasmModule, ffi)
}

/**
 * This build variant is compiled with `-fsanitize=leak`. It instruments all
 * memory allocations and when combined with sourcemaps, can present stack trace
 * locations where memory leaks occur.
 *
 * See [[TestQuickJSWASMModule]] which provides access to the leak sanitizer via
 * {@link TestQuickJSWASMModule.assertNoMemoryAllocated}.
 *
 * The downside is that it's 100-1000x slower than the other variants.
 * Suggested use case: automated testing, regression testing, and interactive
 * debugging.
 */
export const DEBUG_SYNC: SyncBuildVariant = {
  type: "sync",
  async importFFI() {
    const { QuickJSFFI } = await import("./generated/ffi.WASM_DEBUG_SYNC")
    return QuickJSFFI
  },
  async importModuleLoader() {
    const { default: wasmModuleLoader } = await import(
      "./generated/emscripten-module.WASM_DEBUG_SYNC"
    )
    return wasmModuleLoader
  },
}

/**
 * This is the default (synchronous) build variant.
 */
export const RELEASE_SYNC: SyncBuildVariant = {
  type: "sync",
  async importFFI() {
    const { QuickJSFFI } = await import("./generated/ffi.WASM_RELEASE_SYNC")
    return QuickJSFFI
  },
  async importModuleLoader() {
    const { default: wasmModuleLoader } = await import(
      "./generated/emscripten-module.WASM_DEBUG_SYNC"
    )
    return wasmModuleLoader
  },
}

/**
 * The async debug build variant may or may not have the sanitizer enabled.
 * It does print a lot of debug logs.
 *
 * Suggested use case: interactive debugging only.
 */
export const DEBUG_ASYNC: AsyncBuildVariant = {
  type: "async",
  async importFFI() {
    const { QuickJSFFI } = await import("./generated/ffi.WASM_DEBUG_ASYNCIFY")
    return QuickJSFFI
  },
  async importModuleLoader() {
    const { default: wasmModuleLoader } = await import(
      "./generated/emscripten-module.WASM_DEBUG_ASYNCIFY"
    )
    return wasmModuleLoader
  },
}

/**
 * This is the default asyncified build variant.
 */
export const RELEASE_ASYNC: AsyncBuildVariant = {
  type: "async",
  async importFFI() {
    const { QuickJSFFI } = await import("./generated/ffi.WASM_RELEASE_ASYNCIFY")
    return QuickJSFFI
  },
  async importModuleLoader() {
    const { default: wasmModuleLoader } = await import(
      "./generated/emscripten-module.WASM_DEBUG_ASYNCIFY"
    )
    return wasmModuleLoader
  },
}
