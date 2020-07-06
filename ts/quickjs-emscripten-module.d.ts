import { QuickJSEmscriptenModule } from './emscripten-types'
/**
 *  Emscripten module built from the unmodified [`quickjs/quickjs.h`](../quickjs/quickjs.h)
 *  and our FFI support functions [c/interface.c](../c/interface.c).
 *
 * Note that emscripten modules returned by a `MODULARIZE=1` emscripten build
 * (like this one). load asynchronously.
 *
 * With emcc < 1.39.16, this returned an asynchronously initialized QuickJSEmscriptenModule object.
 * With emcc >= 1.39.17, this now returns a Promise<QuickJSEmscriptenModule> that resolves once
 * the module is initialized.
 *
 * See https://github.com/justjake/quickjs-emscripten/issues/8 for more info.
 */
declare function ModuleLoader(): Promise<QuickJSEmscriptenModule>
export default ModuleLoader
