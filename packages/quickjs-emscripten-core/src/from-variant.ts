import type { QuickJSSyncVariant, QuickJSAsyncVariant } from "@jitl/quickjs-ffi-types"
import type { QuickJSWASMModule } from "./module.js"
import type { QuickJSAsyncWASMModule } from "./module-asyncify.js"
import { unwrapTypescript } from "./esmHelpers.js"

// Otherwise we have build errors?
export { QuickJSSyncVariant, QuickJSAsyncVariant }

export type PromisedDefault<T> =
  | T
  | Promise<T>
  | Promise<{ default: T }>
  | Promise<{ default: { default: T } }>

/**
 * Create a new, completely isolated WebAssembly module containing the QuickJS library.
 * See the documentation on [[QuickJSWASMModule]].
 *
 * Note that there is a hard limit on the number of WebAssembly modules in older
 * versions of v8:
 * https://bugs.chromium.org/p/v8/issues/detail?id=12076
 *
 * @example
 * ```ts
 * const quickjs = new newQuickJSWASMModuleFromVariant(
 *   import('@jitl/quickjs-browser-release-sync-wasm')
 * )
 * ```
 */
export async function newQuickJSWASMModuleFromVariant(
  /**
   * A {@link QuickJSSyncVariant} to construct the WebAssembly module.
   */
  variantOrPromise: PromisedDefault<QuickJSSyncVariant>,
): Promise<QuickJSWASMModule> {
  const variant = smartUnwrap(await variantOrPromise)
  const [wasmModuleLoader, QuickJSFFI, { QuickJSWASMModule }] = await Promise.all([
    variant.importModuleLoader().then(smartUnwrap),
    variant.importFFI(),
    import("./module.js").then(unwrapTypescript),
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
 *
 * @example
 * ```ts
 * const quickjs = new newQuickJSAsyncWASMModuleFromVariant(
 *   import('@jitl/quickjs-browser-debug-asyncify-wasm')
 * )
 * ```
 */
export async function newQuickJSAsyncWASMModuleFromVariant(
  /**
   * A {@link QuickJSAsyncVariant} to construct the WebAssembly module.
   */
  variantOrPromise: PromisedDefault<QuickJSAsyncVariant>,
): Promise<QuickJSAsyncWASMModule> {
  const variant = smartUnwrap(await variantOrPromise)
  const [wasmModuleLoader, QuickJSAsyncFFI, { QuickJSAsyncWASMModule }] = await Promise.all([
    variant.importModuleLoader().then(smartUnwrap),
    variant.importFFI(),
    import("./module-asyncify.js").then(unwrapTypescript),
  ])
  const wasmModule = await wasmModuleLoader()
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

function smartUnwrap<T extends object>(val: T | { default: T } | { default: { default: T } }): T {
  if (`default` in val) {
    if (`default` in val.default) {
      return val.default.default
    }
    return val.default
  }
  return val as T
}
