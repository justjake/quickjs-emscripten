import assert from "assert"
import { getQuickJS, newQuickJSAsyncWASMModule, newQuickJSWASMModule } from "."
import { QuickJSWASMModule } from "./module"
import { DEBUG_ASYNC, DEBUG_SYNC, memoizePromiseFactory as memoizeNewModule } from "./variants"

const TEST_LEAK = Boolean(process.env.TEST_LEAK)

function checkModuleForLeaks(this: Mocha.Suite, getModule: () => Promise<QuickJSWASMModule>) {
  let wasmModule: QuickJSWASMModule
  this.timeout(Infinity)

  beforeEach(async function () {
    wasmModule = await getModule()
    const ffi = wasmModule.getFFI()
    if (!ffi.QTS_BuildIsSanitizeLeak()) {
      console.warn("Note: leak sanitizer not enabled in this build.")
    }
  })

  it("if DEBUG and not ASYNCIFY, should have sanitizer.", () => {
    const ffi = wasmModule.getFFI()
    if (ffi.QTS_BuildIsSanitizeLeak()) {
      // Ok! sanitizer enabled
      return
    }

    if (ffi.QTS_BuildIsDebug() && !ffi.QTS_BuildIsAsyncify()) {
      assert.fail("Sanitizer should be enabled in sync debug build.")
    }
  })

  const DURATION_MS = TEST_LEAK ? 10 * 1000 : 100
  const MAX_ITERATIONS = 1000
  const PASSED_RECENTLY: Array<keyof typeof checks> = ["runtime", "runtimeContext"]
  const PRIORITY: Array<keyof typeof checks> = ["eval", "dumpEval"]

  const checks = {
    runtime() {
      const rt = wasmModule.newRuntime()
      rt.dispose()
    },
    runtimeContext() {
      const rt = wasmModule.newRuntime()
      const ctx = rt.newContext()
      ctx.dispose()
      rt.dispose()
    },
    moduleContext() {
      const ctx = wasmModule.newContext()
      ctx.dispose()
    },
    newString() {
      const ctx = wasmModule.newContext()
      const longString = "a".repeat(1024 * 1024)
      const string = ctx.newString(longString)
      string.dispose()
      ctx.dispose()
    },
    getString() {
      const ctx = wasmModule.newContext()
      const longString = "a".repeat(1024 * 1024)
      const string = ctx.newString(longString)
      ctx.getString(string)
      string.dispose()
      ctx.dispose()
    },
    dumpString() {
      const ctx = wasmModule.newContext()
      const longString = "a".repeat(1024 * 1024)
      const string = ctx.newString(longString)
      ctx.dump(string)
      string.dispose()
      ctx.dispose()
    },
    newNumber() {
      const ctx = wasmModule.newContext()
      const number = ctx.newNumber(42)
      number.dispose()
      ctx.dispose()
    },
    getNumber() {
      const ctx = wasmModule.newContext()
      const number = ctx.newNumber(42)
      ctx.getNumber(number)
      number.dispose()
      ctx.dispose()
    },
    dumpNumber() {
      const ctx = wasmModule.newContext()
      const number = ctx.newNumber(42)
      ctx.dump(number)
      number.dispose()
      ctx.dispose()
    },
    eval() {
      const ctx = wasmModule.newContext()
      const arrayValue = "[" + '"a",'.repeat(1024) + "]"
      const result = ctx.evalCode(arrayValue)
      ctx.unwrapResult(result).dispose()
      ctx.dispose()
    },
    dumpEval() {
      const ctx = wasmModule.newContext()
      const arrayValue = "[" + '"a",'.repeat(1024) + "]"
      const result = ctx.evalCode(arrayValue)
      const handle = ctx.unwrapResult(result)
      ctx.dump(handle)
      handle.dispose()
      ctx.dispose()
    },
  }

  const checkNames = Object.keys(checks) as Array<keyof typeof checks>
  checkNames.sort((a, b) => {
    if (PRIORITY.includes(a) && PRIORITY.includes(b)) {
      return 0
    }

    if (PRIORITY.includes(a)) {
      return -1
    }

    if (PRIORITY.includes(b)) {
      return 1
    }

    const aIndex = PASSED_RECENTLY.indexOf(a)
    const bIndex = PASSED_RECENTLY.indexOf(b)
    return aIndex - bIndex
  })

  for (const checkName of checkNames) {
    const fn = checks[checkName as keyof typeof checks]
    it(`should not leak: ${checkName}`, () => {
      console.log(`Running ${checkName}...`)
      const startedAt = Date.now()
      let i = 0
      for (; i < MAX_ITERATIONS; i++) {
        fn()
        if (i > 1 && Date.now() - startedAt > DURATION_MS) {
          break
        }
      }

      console.log(i, "iterations,", i / DURATION_MS, "iterations/ms")

      const didLeak = wasmModule.getFFI().QTS_RecoverableLeakCheck()
      assert.strictEqual(didLeak, 0, "no leaks")
    })
  }
}

describe("Leak checks (most accurate with debug build)", function () {
  describe("DEBUG sync module", function () {
    const loader = memoizeNewModule(() => newQuickJSWASMModule(DEBUG_SYNC))
    checkModuleForLeaks.call(this, loader)
  })

  describe("RELEASE sync module", function () {
    checkModuleForLeaks.call(this, getQuickJS)
  })

  describe.skip("DEBUG async module", function () {
    const loader = memoizeNewModule(() => newQuickJSAsyncWASMModule(DEBUG_ASYNC))
    checkModuleForLeaks.call(this, loader)
  })

  // Leaving this enabled, but note that we now disable
  // leak sanitizer for ASYNCIFY since it's not reliable.
  describe("RELEASE async module", function () {
    const loader = memoizeNewModule(() => newQuickJSAsyncWASMModule())
    checkModuleForLeaks.call(this, loader)
  })
})
