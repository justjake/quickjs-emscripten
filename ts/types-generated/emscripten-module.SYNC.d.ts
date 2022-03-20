import { EmscriptenModuleLoader, QuickJSEmscriptenModule } from "../emscripten-types"
/**
 *  Emscripten module built from the unmodified [`quickjs/quickjs.h`](../quickjs/quickjs.h)
 *  and our FFI support functions [c/interface.c](../c/interface.c).
 *
 * Note that emscripten modules returned by a `MODULARIZE=1` emscripten build
 * (like this one) load asynchronously.
 */
declare const ModuleLoader: EmscriptenModuleLoader<QuickJSEmscriptenModule>
export default ModuleLoader
