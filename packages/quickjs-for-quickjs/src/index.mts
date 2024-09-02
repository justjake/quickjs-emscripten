import type { QuickJSWASMModule, QuickJSContext } from "quickjs-emscripten-core"
import { newQuickJSWASMModuleFromVariant } from "quickjs-emscripten-core"
import RELEASE_SYNC from "@jitl/quickjs-asmjs-mjs-release-sync"

let promise: Promise<QuickJSWASMModule> | undefined

export function getQuickJS(): Promise<QuickJSWASMModule> {
  return (promise ??= newQuickJSWASMModule())
}

export function newQuickJSWASMModule(): Promise<QuickJSWASMModule> {
  // TODO: why are the types mad?
  return newQuickJSWASMModuleFromVariant(RELEASE_SYNC as any)
}

export function setUpContext(
  context: QuickJSContext,
  options: {
    log?: (...args: unknown[]) => void
  } = {},
) {
  const { log } = options
  const depth: number = (console as any)["depth"] ?? 0
  using consoleHandle = context.newObject()
  using logHandle = context.newFunction("console.log", (...args) => {
    const message = args.map(context.dump)
    if (log) {
      log(...message)
    } else {
      console.log(...message)
    }
  })
  using depthHandle = context.newNumber(1 + depth)

  context.setProp(consoleHandle, "log", logHandle)
  context.setProp(consoleHandle, "error", logHandle)
  context.setProp(consoleHandle, "depth", depthHandle)

  context.setProp(context.global, "console", consoleHandle)

  context.runtime.setMaxStackSize(0)
  context.runtime.setMemoryLimit(0)
  let interruptCount = 0
  context.runtime.setInterruptHandler(() => {
    console.log(`${depth}: ...eval... (${++interruptCount})`)
    return undefined
  })

  return context
}

export { RELEASE_SYNC }
