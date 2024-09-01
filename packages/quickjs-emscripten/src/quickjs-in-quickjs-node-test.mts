import fs from "node:fs"
import util from "node:util"
import module from "node:module"
import { test } from "node:test"
import path from "node:path"
import assert from "node:assert"
import { getQuickJS } from "./index.js"
import type { JSModuleLoader, JSModuleNormalizer, QuickJSHandle, QuickJSContext } from "./index.js"

const ttyLog = (...args: unknown[]) => {
  const fd = fs.openSync("/dev/tty", "w")
  fs.writeSync(fd, util.format(...args) + "\n")
  fs.closeSync(fd)
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

test("quickjs-in-quickjs", () => {
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

  ttyLog("hi")

  const result = context.evalCode(
    `
import { newQuickJSWASMModuleFromVariant } from 'quickjs-emscripten-core/index.mjs'
import variant from '@jitl/quickjs-asmjs-mjs-release-sync/index.mjs'
globalThis.done = newQuickJSWASMModuleFromVariant(variant).then(QuickJS => {
  const result = QuickJS.evalCode('1+2')
  console.log('inner result', result)
})
`,
    "/script.mjs",
  )
  context.unwrapResult(result).dispose()
  runtime.executePendingJobs()
  assert.deepEqual(logs, [["inner result", 3]])
})
