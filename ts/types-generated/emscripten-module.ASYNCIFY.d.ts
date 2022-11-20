import { EmscriptenModuleLoader, QuickJSAsyncEmscriptenModule } from "../emscripten-types"
/**
 * Emscripten module built from [`quickjs/quickjs.h`](../quickjs/quickjs.h) and
 * our FFI support functions [c/interface.c](../c/interface.c), compiled with -s
 * ASYNCIFY=1.
 *
 * Because this version is built with ASYNCIFY, the C code can call asynchronous
 * Javascript functions as though they were synchronous.
 *
 * Note that emscripten modules returned by a `MODULARIZE=1` emscripten build
 * (like this one) load asynchronously.
 */
declare const ModuleLoader: EmscriptenModuleLoader<QuickJSAsyncEmscriptenModule>
export default ModuleLoader
