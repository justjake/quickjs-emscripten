import type {
  EmscriptenModuleLoader,
  QuickJSAsyncEmscriptenModule,
  QuickJSEmscriptenModule,
  EmscriptenModule,
} from "./emscripten-types.js"
import type { QuickJSFFI } from "./ffi.js"
import type { QuickJSAsyncFFI } from "./ffi-async.js"

type EmscriptenImport<T extends EmscriptenModule> =
  | EmscriptenModuleLoader<T>
  | { default: EmscriptenModuleLoader<T> }
  | {
      default: {
        default: EmscriptenModuleLoader<T>
      }
    }

/**
 * A standard (sync) build variant.
 *
 * quickjs-emscripten provides multiple build variants of the core WebAssembly
 * module. These variants are each intended for a different use case.
 *
 * To create an instance of the library using a specific build variant, pass the
 * build variant to {@link newQuickJSWASMModule} or {@link newQuickJSAsyncWASMModule}.
 */
export interface QuickJSSyncVariant {
  readonly type: "sync"
  readonly importFFI: () => Promise<new (module: QuickJSEmscriptenModule) => QuickJSFFI>
  readonly importModuleLoader: () => Promise<EmscriptenImport<QuickJSEmscriptenModule>>
}

/**
 * An ASYNCIFY build variant.
 *
 * quickjs-emscripten provides multiple build variants of the core WebAssembly
 * module. These variants are each intended for a different use case.
 *
 * To create an instance of the library using a specific build variant, pass the
 * build variant to {@link newQuickJSWASMModule} or {@link newQuickJSAsyncWASMModule}.
 */
export interface QuickJSAsyncVariant {
  readonly type: "async"
  readonly importFFI: () => Promise<new (module: QuickJSAsyncEmscriptenModule) => QuickJSAsyncFFI>
  readonly importModuleLoader: () => Promise<EmscriptenImport<QuickJSAsyncEmscriptenModule>>
}

export type QuickJSVariant = QuickJSSyncVariant | QuickJSAsyncVariant
export type EitherFFI = QuickJSFFI | QuickJSAsyncFFI
