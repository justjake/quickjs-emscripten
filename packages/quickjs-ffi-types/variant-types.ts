import type {
  EmscriptenModuleLoader,
  QuickJSAsyncEmscriptenModule,
  QuickJSEmscriptenModule,
  EmscriptenModule,
} from "./emscripten-types.js"
import type { QuickJSFFI } from "./ffi.js"
import type { QuickJSAsyncFFI } from "./ffi-asyncify.js"

type EmscriptenImport<T extends EmscriptenModule> =
  | EmscriptenModuleLoader<T>
  | { default: EmscriptenModuleLoader<T> }
  | {
      default: {
        default: EmscriptenModuleLoader<T>
      }
    }

export interface QuickJSSyncVariant {
  readonly type: "sync"
  readonly importFFI: () => Promise<new (module: QuickJSEmscriptenModule) => QuickJSFFI>
  readonly importModuleLoader: () => Promise<EmscriptenImport<QuickJSEmscriptenModule>>
}

export interface QuickJSAsyncVariant {
  readonly type: "async"
  readonly importFFI: () => Promise<new (module: QuickJSAsyncEmscriptenModule) => QuickJSAsyncFFI>
  readonly importModuleLoader: () => Promise<EmscriptenImport<QuickJSAsyncEmscriptenModule>>
}

export type QuickJSVariant = QuickJSSyncVariant | QuickJSAsyncVariant
