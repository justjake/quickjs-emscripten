import { newQuickJSWASMModuleFromVariant } from 'quickjs-emscripten-core'
import RELEASE_SYNC from '@jitl/quickjs-wasmfile-release-sync'

/**
 * Export the QuickJSWASMModule instance as a singleton.
 */
export const QuickJS = await newQuickJSWASMModuleFromVariant(RELEASE_SYNC)