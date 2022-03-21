import type {
  EmscriptenModuleLoader,
  QuickJSEmscriptenModule,
  QuickJSAsyncEmscriptenModule,
  EmscriptenModuleOptions,
} from "./emscripten-types"
import type { QuickJSWASMModule } from "./module"
import type { QuickJSAsyncWASMModule } from "./module-asyncify"
import { QuickJSFFI } from "./generated/interface.SYNC"
import { QuickJSAsyncFFI } from "./generated/interface.ASYNCIFY"

export { QuickJSFFI, QuickJSAsyncFFI }

type SyncConstructorParams = ConstructorParameters<
  typeof import("./generated/ffi.WASM_RELEASE_SYNC")["default"]
>
type QuickJSFFIConstructor = new (...args: SyncConstructorParams) => QuickJSFFI

type AsyncConstructorParams = ConstructorParameters<
  typeof import("./generated/ffi.WASM_RELEASE_ASYNCIFY")["default"]
>
type QuickJSAsyncFFIConstructor = new (...args: AsyncConstructorParams) => QuickJSAsyncFFI

/**
 * quickjs-emscripten provides multiple build variants of the core WebAssembly
 * module. These variants are each intended for a different use case.
 *
 * To create an instance of the library using a specific build variant, pass the
 * build variant to {@link newQuickJSWASMModule} or {@link newQuickJSAsyncWASMModule}.
 *
 * Notable synchronous build variants:
 *
 * - {@link RELEASE_SYNC} - This is the default synchronous variant, for general purpose use.
 * - {@link DEBUG_ASYNC} - Synchronous build variant for debugging memory leaks.
async*/
export interface SyncBuildVariant {
  type: "sync"
  singleFile: boolean
  importFFI: () => Promise<QuickJSFFIConstructor>
  importModuleLoader: () => Promise<EmscriptenModuleLoader<QuickJSEmscriptenModule>>
}

/**
 * quickjs-emscripten provides multiple build variants of the core WebAssembly
 * module. These variants are each intended for a different use case.
 *
 * To create an instance of the library using a specific build variant, pass the
 * build variant to {@link newQuickJSWASMModule} or {@link newQuickJSAsyncWASMModule}.
 *
 * Notable asyncified build variants:
 *
 * - {@link RELEASE_ASYNC} - This is the default asyncified build variant, for general purpose use.
 * - {@link DEBUG_ASYNC} - Asyncified build variant with debug logging.
 */
export interface AsyncBuildVariant {
  type: "async"
  singleFile: boolean
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
  /**
   * Optionally, pass a {@link SyncBuildVariant} to construct a different WebAssembly module.
   */
  variant: SyncBuildVariant = RELEASE_SYNC,
  /** Options to pass through to Emscripten module loader. */
  emscriptenOptions?: Partial<EmscriptenModuleOptions>
): Promise<QuickJSWASMModule> {
  const [wasmModuleLoader, QuickJSFFI, { QuickJSWASMModule }] = await Promise.all([
    variant.importModuleLoader(),
    variant.importFFI(),
    import("./module"),
  ])
  const wasmModule = await wasmModuleLoader(emscriptenOptions)
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
  /**
   * Optionally, pass a {@link AsyncBuildVariant} to construct a different WebAssembly module.
   */
  variant: AsyncBuildVariant = RELEASE_ASYNC,
  /** Options to pass through to Emscripten module loader. */
  emscriptenOptions?: Partial<EmscriptenModuleOptions>
): Promise<QuickJSAsyncWASMModule> {
  const [wasmModuleLoader, QuickJSAsyncFFI, { QuickJSAsyncWASMModule }] = await Promise.all([
    variant.importModuleLoader(),
    variant.importFFI(),
    import("./module-asyncify"),
  ])
  const wasmModule = await wasmModuleLoader(emscriptenOptions)
  wasmModule.type = "async"
  const ffi = new QuickJSAsyncFFI(wasmModule)
  return new QuickJSAsyncWASMModule(wasmModule, ffi)
}

/**
 * Helper intended to memoize the creation of a WebAssembly module.
 * ```typescript
 * const getDebugModule = memoizePromiseFactory(() => newQuickJSWASMModule(DEBUG_SYNC))
 * ```
 */
export function memoizePromiseFactory<T>(fn: () => Promise<T>): () => Promise<T> {
  let promise: Promise<T> | undefined
  return () => {
    return (promise ??= fn())
  }
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
  singleFile: false,
  importFFI: () => import("./generated/ffi.WASM_DEBUG_SYNC").then((mod) => mod.default),
  importModuleLoader: () =>
    import("./generated/emscripten-module.WASM_DEBUG_SYNC_LOADER").then((mod) => mod.default),
}

export const DEBUG_SYNC_SINGLE_FILE: SyncBuildVariant = {
  type: "sync",
  singleFile: true,
  importFFI: () => import("./generated/ffi.WASM_DEBUG_SYNC").then((mod) => mod.default),
  importModuleLoader: () =>
    import("./generated/emscripten-module.WASM_DEBUG_SYNC_SINGLEFILE").then((mod) => mod.default),
}

/**
 * This is the default (synchronous) build variant.
 * {@link getQuickJS} returns a memoized instance of this build variant.
 */
export const RELEASE_SYNC: SyncBuildVariant = {
  type: "sync",
  singleFile: true,
  importFFI: () => import("./generated/ffi.WASM_RELEASE_SYNC").then((mod) => mod.default),
  importModuleLoader: () =>
    import("./generated/emscripten-module.WASM_RELEASE_SYNC_SINGLEFILE").then((mod) => mod.default),
}

export const RELEASE_SYNC_LOADER: SyncBuildVariant = {
  type: "sync",
  singleFile: false,
  importFFI: () => import("./generated/ffi.WASM_RELEASE_SYNC").then((mod) => mod.default),
  importModuleLoader: () =>
    import("./generated/emscripten-module.WASM_RELEASE_SYNC_LOADER").then((mod) => mod.default),
}

/**
 * The async debug build variant may or may not have the sanitizer enabled.
 * It does print a lot of debug logs.
 *
 * Suggested use case: interactive debugging only.
 */
export const DEBUG_ASYNC: AsyncBuildVariant = {
  type: "async",
  singleFile: false,
  importFFI: () => import("./generated/ffi.WASM_DEBUG_ASYNCIFY").then((mod) => mod.default),
  importModuleLoader: () =>
    import("./generated/emscripten-module.WASM_DEBUG_ASYNCIFY_LOADER").then((mod) => mod.default),
}

/**
 * This is the default asyncified build variant.
 */
export const RELEASE_ASYNC: AsyncBuildVariant = {
  type: "async",
  singleFile: true,
  importFFI: () => import("./generated/ffi.WASM_DEBUG_ASYNCIFY").then((mod) => mod.default),
  importModuleLoader: () =>
    import("./generated/emscripten-module.WASM_RELEASE_ASYNCIFY_SINGLEFILE").then(
      (mod) => mod.default
    ),
}

export const RELEASE_ASYNC_LOADER: AsyncBuildVariant = {
  type: "async",
  singleFile: false,
  importFFI: () => import("./generated/ffi.WASM_DEBUG_ASYNCIFY").then((mod) => mod.default),
  importModuleLoader: () =>
    import("./generated/emscripten-module.WASM_RELEASE_ASYNCIFY_LOADER").then((mod) => mod.default),
}
