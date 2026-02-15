import fs from "node:fs"
import util from "node:util"
import module from "node:module"
import { test } from "node:test"
import path from "node:path"
import assert from "node:assert"
import { getQuickJS } from "./index.js"
import type { JSModuleLoader, JSModuleNormalizer, QuickJSHandle, QuickJSContext } from "./index.js"

const DEBUG = true

const ttyLog = (...args: unknown[]) => {
  if (DEBUG) {
    console.error("[DEBUG]", util.format(...args))
  }
}

const QuickJS = await getQuickJS()

function addConsoleGlobal(context: QuickJSContext, logOfLogs: any[]) {
  const consoleHandle = context.newObject()
  const log = context.newFunction("log", (...args: QuickJSHandle[]) => {
    const logged = args.map((arg) => context.dump(arg))
    logOfLogs.push(logged)
    ttyLog(...logged)
  })
  context.setProp(consoleHandle, "log", log)
  context.setProp(consoleHandle, "error", log)
  context.setProp(context.global, "console", consoleHandle)
  log.dispose()
  consoleHandle.dispose()
}

function* pathAncestors(filepath: string) {
  yield filepath
  while (filepath !== "/") {
    filepath = path.dirname(filepath)
    yield filepath
  }
}

class QuickJSNodeModuleLoader {
  static convertPath(filepath: string, mountPoints: Map<string, string>) {
    filepath = path.normalize(filepath)
    for (const dirname of pathAncestors(filepath)) {
      const mappedDirname = mountPoints.get(dirname)
      if (!mappedDirname) {
        continue
      }
      return mappedDirname + filepath.slice(dirname.length)
    }
    return undefined
  }

  require = module.createRequire(import.meta.url)
  hostToGuest = new Map<string, string>()
  guestToHost = new Map<string, string>()

  mount(args: { hostPath: string; guestPath: string }) {
    const guestPath = path.normalize(args.guestPath)
    if (!path.isAbsolute(guestPath)) {
      throw new Error("guestPath must be absolute")
    }

    const hostPath = fs.realpathSync(args.hostPath)
    this.hostToGuest.set(hostPath, guestPath)
    this.guestToHost.set(guestPath, hostPath)

    ttyLog("mount", { hostPath, guestPath })
  }

  mountImport(args: { hostImport: string; guestImport: string; direct?: true }) {
    const hostFile = this.require.resolve(args.hostImport).replace(".js", ".mjs")
    this.mount({
      hostPath: args.direct ? hostFile : path.dirname(hostFile),
      guestPath: "/node_modules/" + args.guestImport,
    })
  }

  toGuestPath(hostPath: string) {
    return QuickJSNodeModuleLoader.convertPath(hostPath, this.hostToGuest)
  }

  toHostPath(guestPath: string) {
    return QuickJSNodeModuleLoader.convertPath(guestPath, this.guestToHost)
  }

  jsModuleNormalizer: JSModuleNormalizer = (baseModuleName, requestedName, _context) => {
    if (path.isAbsolute(requestedName)) {
      ttyLog("absolute", requestedName)
      return path.normalize(requestedName)
    }

    if (requestedName.startsWith(".")) {
      const resolved = path.resolve(path.dirname(baseModuleName), requestedName)
      ttyLog("relative", { resolved, baseModuleName, requestedName })
      return path.normalize(resolved)
    }

    const resolved = path.resolve("/node_modules/", requestedName)
    ttyLog("node_modules", { resolved, baseModuleName, requestedName })
    return path.normalize(resolved)
  }

  jsModuleLoader: JSModuleLoader = (moduleName, _context) => {
    try {
      const hostPath = this.toHostPath(moduleName)
      if (hostPath) {
        return fs.readFileSync(hostPath, "utf8")
      }
      throw new Error("Not found")
    } catch (error) {
      ttyLog("QuickJSNodeModuleLoader.loader error:", { moduleName, error })
      return {
        error: Error(`Not found: ${moduleName}`),
      }
    }
  }
}

test("quickjs-for-quickjs", async () => {
  const moduleLoader = new QuickJSNodeModuleLoader()
  moduleLoader.mountImport({
    hostImport: "quickjs-emscripten-core",
    guestImport: "quickjs-emscripten-core",
  })
  moduleLoader.mountImport({
    hostImport: "@jitl/quickjs-asmjs-mjs-release-sync",
    guestImport: "@jitl/quickjs-asmjs-mjs-release-sync",
  })
  moduleLoader.mountImport({
    hostImport: "@jitl/quickjs-ffi-types",
    guestImport: "@jitl/quickjs-ffi-types",
    direct: true,
  })

  const runtime = QuickJS.newRuntime()
  runtime.setModuleLoader(moduleLoader.jsModuleLoader, moduleLoader.jsModuleNormalizer)

  const context = runtime.newContext()
  const logs: any[] = []
  addConsoleGlobal(context, logs)

  ttyLog("=== Starting quickjs-for-quickjs test ===")

  // First, let's test if simple async functions work
  ttyLog("--- Test 1: Simple async function ---")
  const simpleAsyncResult = context.evalCode(
    `
globalThis.simpleTest = (async () => {
  console.log('async step 1')
  await Promise.resolve()
  console.log('async step 2')
  return 42
})()
`,
    "/simple-async.mjs",
  )
  context.unwrapResult(simpleAsyncResult).dispose()

  // Execute pending jobs and see how many were executed
  let jobResult = runtime.executePendingJobs()
  ttyLog("After simple async, executePendingJobs result:", jobResult)
  ttyLog("Logs so far:", logs)

  // Check the Promise state
  const simpleTestHandle = context.getProp(context.global, "simpleTest")
  const simpleTestState = context.getPromiseState(simpleTestHandle)
  ttyLog("simpleTest Promise state:", simpleTestState)
  simpleTestHandle.dispose()

  // Now test the full scenario with more logging
  ttyLog("--- Test 2: Full quickjs-for-quickjs ---")
  const result = context.evalCode(
    `
import { newQuickJSWASMModuleFromVariant } from 'quickjs-emscripten-core/index.mjs'
import variant from '@jitl/quickjs-asmjs-mjs-release-sync/index.mjs'

console.log('starting main code')
console.log('variant type:', typeof variant)
console.log('variant keys:', Object.keys(variant))

globalThis.done = (async () => {
  try {
    console.log('async function started')

    // Test what the variant loader returns
    console.log('calling variant.importModuleLoader...')
    const loaderPromise = variant.importModuleLoader()
    console.log('importModuleLoader returned:', typeof loaderPromise)

    const loader = await loaderPromise
    console.log('loader awaited, type:', typeof loader)

    console.log('calling loader()...')
    const modulePromise = loader()
    console.log('loader() returned:', typeof modulePromise)

    const wasmModule = await modulePromise
    console.log('wasmModule awaited, type:', typeof wasmModule)
    console.log('wasmModule.type:', wasmModule?.type)

    // Now create the full QuickJS instance
    console.log('calling newQuickJSWASMModuleFromVariant...')
    const QuickJS = await newQuickJSWASMModuleFromVariant(variant)
    console.log('QuickJS created:', typeof QuickJS)

    const evalResult = QuickJS.evalCode('1+2')
    console.log('inner result', evalResult)

    return evalResult
  } catch (error) {
    console.log('ERROR in async function:', String(error))
    console.log('ERROR stack:', error?.stack || 'no stack')
    throw error
  }
})()

console.log('done promise created:', typeof globalThis.done)
`,
    "/script.mjs",
  )
  context.unwrapResult(result).dispose()

  // Execute pending jobs multiple times with logging
  ttyLog("After evalCode, executing pending jobs...")
  for (let i = 0; i < 10; i++) {
    jobResult = runtime.executePendingJobs()
    ttyLog(`executePendingJobs iteration ${i}:`, jobResult)

    // Check done Promise state
    const doneHandle = context.getProp(context.global, "done")
    const doneState = context.getPromiseState(doneHandle)
    ttyLog(`done Promise state at iteration ${i}:`, doneState)

    if (doneState.type !== 'pending') {
      ttyLog("Promise resolved/rejected, stopping loop")
      if (doneState.type === 'fulfilled') {
        const value = context.dump(doneState.value)
        ttyLog("Fulfilled with:", value)
        doneState.value.dispose()
      } else if (doneState.type === 'rejected') {
        const error = context.dump(doneState.error)
        ttyLog("Rejected with:", error)
        doneState.error.dispose()
      }
      doneHandle.dispose()
      break
    }
    doneHandle.dispose()

    // Small delay to let any host promises settle
    await new Promise(resolve => setTimeout(resolve, 10))
  }

  ttyLog("=== Final logs ===")
  ttyLog("Logs array:", logs)

  // For now, just check that we eventually see "inner result"
  const innerResultLog = logs.find((log: any[]) => log[0] === "inner result")
  ttyLog("Looking for 'inner result' log:", innerResultLog)
  assert.ok(innerResultLog, "Should have logged 'inner result'")
  assert.strictEqual(innerResultLog[1], 3, "Inner result should be 3")
})
