import { newQuickJSWASMModuleFromVariant } from "quickjs-emscripten-core"
import { getQuickJS, RELEASE_SYNC, newAsyncRuntime } from "quickjs-emscripten"

export async function load() {
  const QuickJSFromVariant = await newQuickJSWASMModuleFromVariant(RELEASE_SYNC)
  const QuickJSDefault = await getQuickJS()
  const QuickJSAsync = await newAsyncRuntime()
  return {
    QuickJSFromVariant,
    QuickJSDefault,
    QuickJSAsync,
  } as const
}
