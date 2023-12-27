/**
 * @private
 * Mutable variable. Use {@link setDebugMode} to enable.
 */
export let QTS_DEBUG = false

/**
 * Enable (or disable) debug logging and object creation tracking in the Javascript API.
 * To get debug logging in the WebAssembly module, you need to use a debug build variant.
 */
export function setDebugMode(enabled: boolean = true) {
  QTS_DEBUG = enabled
}

/**
 * @private
 */
export function debugLog(...args: any[]) {
  if (QTS_DEBUG) {
    console.log(...args)
  }
}
