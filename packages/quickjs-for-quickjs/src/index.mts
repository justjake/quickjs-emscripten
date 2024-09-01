import type { QuickJSWASMModule } from "quickjs-emscripten-core"
import { newQuickJSWASMModuleFromVariant } from "quickjs-emscripten-core"
import RELEASE_SYNC from "@jitl/quickjs-asmjs-mjs-release-sync"

export * from "quickjs-emscripten-core"

let promise: Promise<QuickJSWASMModule> | undefined

export function getQuickJS(): Promise<QuickJSWASMModule> {
  return (promise ??= newQuickJSWASMModule())
}

export function newQuickJSWASMModule(): Promise<QuickJSWASMModule> {
  // TODO: why are the types mad?
  return newQuickJSWASMModuleFromVariant(RELEASE_SYNC as any)
}

export { RELEASE_SYNC }
