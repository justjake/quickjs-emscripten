import {
  AsyncRuntimeOptions,
  ContextOptions,
  QuickJSAsyncContext,
  QuickJSAsyncRuntime,
  QuickJSWASMModule,
} from "quickjs-emscripten-core"
import { newQuickJSAsyncWASMModule, newQuickJSWASMModule } from "./variants"

let singleton: QuickJSWASMModule | undefined = undefined
let singletonPromise: Promise<QuickJSWASMModule> | undefined = undefined

/**
 * Get a shared singleton {@link QuickJSWASMModule}. Use this to evaluate code
 * or create Javascript environments.
 *
 * This is the top-level entrypoint for the quickjs-emscripten library.
 *
 * If you need strictest possible isolation guarantees, you may create a
 * separate {@link QuickJSWASMModule} via {@link newQuickJSWASMModule}.
 *
 * To work with the asyncified version of this library, see these functions:
 *
 * - {@link newAsyncRuntime}.
 * - {@link newAsyncContext}.
 * - {@link newQuickJSAsyncWASMModule}.
 */
export async function getQuickJS(): Promise<QuickJSWASMModule> {
  singletonPromise ??= newQuickJSWASMModule().then((instance) => {
    singleton = instance
    return instance
  })
  return await singletonPromise
}

/**
 * Provides synchronous access to the shared {@link QuickJSWASMModule} instance returned by {@link getQuickJS}, as long as
 * least once.
 * @throws If called before `getQuickJS` resolves.
 */
export function getQuickJSSync(): QuickJSWASMModule {
  if (!singleton) {
    throw new Error("QuickJS not initialized. Await getQuickJS() at least once.")
  }
  return singleton
}

/**
 * Create a new {@link QuickJSAsyncRuntime} in a separate WebAssembly module.
 *
 * Each runtime is isolated in a separate WebAssembly module, so that errors in
 * one runtime cannot contaminate another runtime, and each runtime can execute
 * an asynchronous action without conflicts.
 *
 * Note that there is a hard limit on the number of WebAssembly modules in older
 * versions of v8:
 * https://bugs.chromium.org/p/v8/issues/detail?id=12076
 */
export async function newAsyncRuntime(options?: AsyncRuntimeOptions): Promise<QuickJSAsyncRuntime> {
  const module = await newQuickJSAsyncWASMModule()
  return module.newRuntime(options)
}

/**
 * Create a new {@link QuickJSAsyncContext} (with an associated runtime) in an
 * separate WebAssembly module.
 *
 * Each context is isolated in a separate WebAssembly module, so that errors in
 * one runtime cannot contaminate another runtime, and each runtime can execute
 * an asynchronous action without conflicts.
 *
 * Note that there is a hard limit on the number of WebAssembly modules in older
 * versions of v8:
 * https://bugs.chromium.org/p/v8/issues/detail?id=12076
 */
export async function newAsyncContext(options?: ContextOptions): Promise<QuickJSAsyncContext> {
  const module = await newQuickJSAsyncWASMModule()
  return module.newContext(options)
}
