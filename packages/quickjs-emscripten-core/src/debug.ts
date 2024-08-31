/**
 * @private
 * Mutable variable. Use {@link setDebugMode} to enable.
 */
export let QTS_DEBUG = false

/**
 * Enable (or disable) debug logging and object creation tracking globally.
 * This setting is inherited by newly created QuickJSRuntime instances.
 * To get debug logging in the WebAssembly module, you need to use a debug build variant.
 * See [the quickjs-emscripten-core README](https://github.com/justjake/quickjs-emscripten/tree/main/doc/quickjs-emscripten-core) for more about build variants.
 */
export function setDebugMode(enabled: boolean = true) {
  QTS_DEBUG = enabled
}

/** Get the global debug mode */
export function isDebugMode() {
  return QTS_DEBUG
}

/**
 * @private
 */
export function debugLog(...args: any[]) {
  if (QTS_DEBUG) {
    console.log("quickjs-emscripten:", ...args)
  }
}
