import { newQuickJSWASMModuleFromVariant } from "quickjs-emscripten-core"
import { getQuickJS, RELEASE_SYNC, newAsyncRuntime } from "quickjs-emscripten"

export const QuickJSFromVariant = await newQuickJSWASMModuleFromVariant(RELEASE_SYNC)
export const QuickJSDefault = await getQuickJS()
export const QuickJSAsync = await newAsyncRuntime()
