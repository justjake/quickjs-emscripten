import type {
  QuickJSSyncVariant,
  QuickJSAsyncVariant,
  QuickJSVariant,
  EmscriptenModuleLoaderOptions,
  SourceMapData,
  QuickJSEmscriptenExtensions,
} from "@jitl/quickjs-ffi-types"
import type { QuickJSWASMModule } from "./module.js"
import type { QuickJSAsyncWASMModule } from "./module-asyncify.js"
import { QuickJSEmscriptenModuleError } from "./errors.js"
import { debugLog } from "./debug.js"

// Otherwise we have build errors?
export { QuickJSSyncVariant, QuickJSAsyncVariant, QuickJSVariant }

export type PromisedDefault<T> =
  | T
  | Promise<T>
  | Promise<{ default: T }>
  | Promise<{ default: { default: T } }>

/**
 * Create a new, completely isolated WebAssembly module containing the QuickJS library.
 * See the documentation on {@link QuickJSWASMModule}.
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
    import("./module.js").then(smartUnwrap),
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
 * See the documentation on {@link QuickJSAsyncWASMModule}, {@link QuickJSAsyncRuntime},
 * and {@link QuickJSAsyncContext}.
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
    import("./module-asyncify.js").then(smartUnwrap),
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
  if (val && `default` in val && val.default) {
    if (val.default && `default` in val.default && val.default.default) {
      return val.default.default
    }
    return val.default as T
  }
  return val as T
}

export type OrLoader<T> = T | (() => Promise<T>)

export interface CustomizeVariantOptions {
  /** If given, Emscripten will try to load the WebAssembly module data from this location (path or URI) as appropriate for the current platform. */
  wasmLocation?: string
  /** If given, Emscripten will compile the WebAssembly.Module from these bytes. */
  wasmBinary?: OrLoader<ArrayBuffer>
  /** If given, Emscripten will instantiate the WebAssembly.Instance from this existing WebAssembly.Module */
  wasmModule?: OrLoader<WebAssembly.Module>
  /** If given, use the Memory when instantiating the WebAssembly.Instance. */
  wasmMemory?: OrLoader<WebAssembly.Memory>
  /** If given, Emscripten will try to load the source map for the WebAssembly module from this location (path or URI) as appropriate for the current platform. */
  wasmSourceMapLocation?: string
  /** If given, we will provide the source map to Emscripten directly. This may only be respected if wasmModule is also provided. */
  wasmSourceMapData?: OrLoader<string | SourceMapData>
  /**
   * If set, this method will be called when the runtime needs to load a file,
   * such as a .wasm WebAssembly file, .mem memory init file, or a file
   * generated by the file packager.
   *
   * The function receives two parameters:
   *
   * - `fileName`, the relative path to the file as configured in build
   * process, eg `"emscripten-module.wasm"`.
   * - `prefix` (path to the main JavaScript file’s directory). This may be `''`
   * (empty string) in some cases if the Emscripten Javascript code can't locate
   * itself. Try logging it in your environment.
   *
   * It should return the actual URI or path to the requested file.
   *
   * This lets you host file packages on a different location than the directory
   * of the JavaScript file (which is the default expectation), for example if
   * you want to host them on a CDN.
   */
  locateFile?: EmscriptenModuleLoaderOptions["locateFile"]
  /** The enumerable properties of this object will be passed verbatim, although they may be overwritten if you pass other options. */
  emscriptenModule?: EmscriptenModuleLoaderOptions
  /** Debug logger */
  log?: typeof console.log
}

/**
 * Create a new variant by overriding how Emscripten obtains the WebAssembly module.
 * This may be necessary in Cloudflare Workers, which can't compile WebAssembly modules from binary data.
 */
export function newVariant<T extends QuickJSVariant>(
  baseVariant: T,
  options: CustomizeVariantOptions,
): T {
  const variant: T = {
    ...baseVariant,
    async importModuleLoader() {
      const moduleLoader = smartUnwrap(await baseVariant.importModuleLoader())
      return async function newModuleLoader() {
        const moduleLoaderArg: EmscriptenModuleLoaderOptions = options.emscriptenModule
          ? { ...options.emscriptenModule }
          : {}
        const log =
          options.log ?? ((...args: unknown[]) => debugLog("newVariant moduleLoader:", ...args))
        const tapValue = <T>(message: unknown[], val: T) => {
          log(...message, val)
          return val
        }

        const force = <T>(val: OrLoader<T> | undefined): T | undefined | Promise<T> => {
          if (typeof val === "function") {
            return (val as () => Promise<T>)()
          }
          return val
        }

        if (options.wasmLocation || options.wasmSourceMapLocation || options.locateFile) {
          moduleLoaderArg.locateFile = (fileName: string, relativeTo: string) => {
            const args = { fileName, relativeTo }
            if (fileName.endsWith(".wasm") && options.wasmLocation !== undefined) {
              return tapValue(
                ["locateFile .wasm: provide wasmLocation", args],
                options.wasmLocation,
              )
            }

            if (fileName.endsWith(".map")) {
              if (options.wasmSourceMapLocation !== undefined) {
                return tapValue(
                  ["locateFile .map: provide wasmSourceMapLocation", args],
                  options.wasmSourceMapLocation,
                )
              }

              if (options.wasmLocation && !options.locateFile) {
                return tapValue(
                  ["locateFile .map: infer from wasmLocation", args],
                  options.wasmLocation + ".map",
                )
              }
            }

            if (options.locateFile) {
              return tapValue(
                ["locateFile: use provided fn", args],
                options.locateFile(fileName, relativeTo),
              )
            }

            return tapValue(["locateFile: unhandled, passthrough", args], fileName)
          }
        }

        if (options.wasmBinary) {
          moduleLoaderArg.wasmBinary = await force(options.wasmBinary)
        }

        if (options.wasmMemory) {
          moduleLoaderArg.wasmMemory = await force(options.wasmMemory)
        }

        const optionsWasmModule = options.wasmModule
        let modulePromise: Promise<WebAssembly.Module | undefined> | undefined
        if (optionsWasmModule) {
          moduleLoaderArg.instantiateWasm = async (imports, onSuccess) => {
            modulePromise ??= Promise.resolve(force(optionsWasmModule))
            const wasmModule = await modulePromise
            if (!wasmModule) {
              // This should never happen
              throw new QuickJSEmscriptenModuleError(
                `options.wasmModule returned ${String(wasmModule)}`,
              )
            }
            const instance = await WebAssembly.instantiate(wasmModule, imports)
            onSuccess(instance)
            return instance.exports
          }
        }

        moduleLoaderArg.monitorRunDependencies = (left: number) => {
          log("monitorRunDependencies:", left)
        }

        // This will be replaced with the actual function by --pre-js
        // Having the mock around makes our code simpler gives us handy logging
        // if we need to understand any issues
        moduleLoaderArg.quickjsEmscriptenInit = () => newMockExtensions(log)

        const resultPromise = moduleLoader(moduleLoaderArg)
        const extensions = moduleLoaderArg.quickjsEmscriptenInit?.(log)
        if (
          optionsWasmModule &&
          extensions?.receiveWasmOffsetConverter &&
          !extensions.existingWasmOffsetConverter
        ) {
          // Unlikely to be available, we'll usually end up mocking this.
          // Still if the user has both, we'll take it.
          const wasmBinary = (await force(options.wasmBinary)) ?? new ArrayBuffer(0)

          modulePromise ??= Promise.resolve(force(optionsWasmModule))
          const wasmModule = await modulePromise
          if (!wasmModule) {
            // This should never happen
            throw new QuickJSEmscriptenModuleError(
              `options.wasmModule returned ${String(wasmModule)}`,
            )
          }
          extensions.receiveWasmOffsetConverter(wasmBinary, wasmModule)
        }

        if (extensions?.receiveSourceMapJSON) {
          const loadedSourceMapData = await force(options.wasmSourceMapData)
          if (typeof loadedSourceMapData === "string") {
            extensions.receiveSourceMapJSON(JSON.parse(loadedSourceMapData))
          } else if (loadedSourceMapData) {
            extensions.receiveSourceMapJSON(loadedSourceMapData)
          } else {
            extensions.receiveSourceMapJSON({ version: 3, names: [], sources: [], mappings: "" })
          }
        }

        return resultPromise
      }
    },
  }
  return variant
}

function newMockExtensions(log: typeof console.log): QuickJSEmscriptenExtensions {
  const mockMessage = `mock called, emscripten module may not be initialized yet`
  return {
    mock: true,
    removeRunDependency(name: string) {
      log(`${mockMessage}: removeRunDependency called:`, name)
    },
    receiveSourceMapJSON(data: unknown) {
      log(`${mockMessage}: receiveSourceMapJSON called:`, data)
    },
    WasmOffsetConverter: undefined,
    receiveWasmOffsetConverter(bytes: ArrayBuffer, mod: WebAssembly.Module) {
      log(`${mockMessage}: receiveWasmOffsetConverter called:`, bytes, mod)
    },
  }
}
