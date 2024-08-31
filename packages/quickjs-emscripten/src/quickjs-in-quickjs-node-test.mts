import * as fs from "node:fs"
import { test } from "node:test"
import { fileURLToPath } from "node:url"
import path, { resolve } from "node:path"
import assert from "node:assert"
import { debugLog, getQuickJS } from "./index.js"
import type { JSModuleLoader, JSModuleNormalizer, QuickJSHandle, QuickJSContext } from "./index.js"

const QuickJS = await getQuickJS()

function addConsoleGlobal(context: QuickJSContext, logOfLogs: any[]) {
  const consoleHandle = context.newObject()
  const log = context.newFunction("log", (...args: QuickJSHandle[]) => {
    const logged = args.map((arg) => context.dump(arg))
    logOfLogs.push(logged)
    console.log(...logged)
  })
  context.setProp(consoleHandle, "log", log)
  context.setProp(consoleHandle, "error", log)
  context.setProp(context.global, "console", consoleHandle)
  log.dispose()
  consoleHandle.dispose()
}

test("quickjs-in-quickjs", () => {
  const loader: JSModuleLoader = (moduleName, _context) => {
    const resolved = resolver(moduleName)
    const [first, rest] = resolved.split("/GUEST")
    debugLog("loader", { moduleName, resolved, first, rest })
    const data = fs.readFileSync(rest || first, "utf8")
    return data
  }

  const normalizer: JSModuleNormalizer = (baseModuleName, requestedName, _context) => {
    const resolvedRequestedName = resolver(requestedName)
    debugLog("normalizer", { baseModuleName, requestedName, resolvedRequestedName })
    const baseUrl = resolver(baseModuleName)
    const resolved = resolve(baseUrl, "..", resolvedRequestedName)
    debugLog("normalizer resolved", resolved)
    return resolved
  }

  function resolver(moduleName: string) {
    if (moduleName.startsWith(".")) {
      return moduleName
    }

    if (path.isAbsolute(moduleName)) {
      return moduleName
    }

    try {
      return "/GUEST" + fileURLToPath(import.meta.resolve(moduleName))
    } catch (e) {
      debugLog("import.meta.resolve failed", { moduleName, e })
      return moduleName
    }
  }

  const runtime = QuickJS.newRuntime()
  runtime.setModuleLoader(loader, normalizer)

  const context = runtime.newContext()
  const logs: any[] = []
  addConsoleGlobal(context, logs)

  const filename = "/GUEST" + fileURLToPath(import.meta.url)
  const result = context.evalCode(
    `
import { newQuickJSWASMModuleFromVariant } from 'quickjs-emscripten-core'
import variant from '@jitl/quickjs-asmjs-mjs-release-sync'
throw new Error('oops')
globalThis.done = newQuickJSWASMModuleFromVariant(variant).then(QuickJS => {
  const result = QuickJS.evalCode('1+2')
  console.log('inner result', result)
})
`,
    filename,
  )
  context.unwrapResult(result).dispose()
  runtime.executePendingJobs()
  assert.deepEqual(logs, [["inner result", 3]])
})
