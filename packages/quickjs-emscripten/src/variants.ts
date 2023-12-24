import {
  QuickJSSyncVariant,
  QuickJSAsyncVariant,
  newQuickJSWASMModuleFromVariant,
  newQuickJSAsyncWASMModuleFromVariant,
  QuickJSWASMModule,
  QuickJSAsyncWASMModule,
} from "quickjs-emscripten-core"
import DEBUG_SYNC from "#variants/debug"
import RELEASE_SYNC from "#variants/release"
import DEBUG_ASYNC from "#variants/debug-asyncify"
import RELEASE_ASYNC from "#variants/release-asyncify"

/**
 * Create a new, completely isolated WebAssembly module containing the QuickJS library.
 * See the documentation on {@link QuickJSWASMModule}.
 *
 * Note that there is a hard limit on the number of WebAssembly modules in older
 * versions of v8:
 * https://bugs.chromium.org/p/v8/issues/detail?id=12076
 */
export async function newQuickJSWASMModule(
  /**
   * Optionally, pass a {@link QuickJSSyncVariant} to construct a different WebAssembly module.
   */
  variant: QuickJSSyncVariant = RELEASE_SYNC,
): Promise<QuickJSWASMModule> {
  return newQuickJSWASMModuleFromVariant(variant)
}

/**
 * Create a new, completely isolated WebAssembly module containing a version of the QuickJS library
 * compiled with Emscripten's [ASYNCIFY](https://emscripten.org/docs/porting/asyncify.html) transform.
 *
 * This version of the library offers features that enable synchronous code
 * inside the VM to interact with asynchronous code in the host environment.
 * See the documentation on {@link QuickJSAsyncWASMModule}, {@link QuickJSAsyncRuntime},
 * and {@link QuickJSAsyncContext}.
 *
 * Note that there is a hard limit on the number of WebAssembly modules in older
 * versions of v8:
 * https://bugs.chromium.org/p/v8/issues/detail?id=12076
 */
export async function newQuickJSAsyncWASMModule(
  /**
   * Optionally, pass a {@link QuickJSAsyncVariant} to construct a different WebAssembly module.
   */
  variant: QuickJSAsyncVariant = RELEASE_ASYNC,
): Promise<QuickJSAsyncWASMModule> {
  return newQuickJSAsyncWASMModuleFromVariant(variant)
}

export { DEBUG_SYNC, RELEASE_SYNC, DEBUG_ASYNC, RELEASE_ASYNC }
