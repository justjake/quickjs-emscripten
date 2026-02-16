/**
 * These tests demonstrate some common patterns for using quickjs-emscripten.
 */

import assert from "assert"
import fs from "fs"
import { inspect as baseInspect } from "node:util"
import {
  describe,
  beforeEach,
  afterEach,
  afterAll as after,
  it,
  expect,
  onTestFailed,
} from "vitest"
import type {
  QuickJSHandle,
  InterruptHandler,
  QuickJSDeferredPromise,
  VmCallResult,
  QuickJSFFI,
  QuickJSAsyncFFI,
  ContextOptions,
  QuickJSFeature,
} from "."
import type { QuickJSFeatures } from "."
import {
  QuickJSContext,
  QuickJSAsyncContext,
  QuickJSWASMModule,
  QuickJSRuntime,
  QuickJSAsyncRuntime,
  getQuickJS,
  newQuickJSAsyncWASMModule,
  newQuickJSWASMModule,
  isFail,
  DEBUG_ASYNC,
  DEBUG_SYNC,
  MQUICKJS_DEBUG_SYNC,
  MQUICKJS_RELEASE_SYNC,
  memoizePromiseFactory,
  debugLog,
  errors,
  DefaultIntrinsics,
  RELEASE_SYNC,
  RELEASE_ASYNC,
  newVariant,
  shouldInterruptAfterDeadline,
  Scope,
  setDebugMode,
} from "."

const TEST_SLOW = !process.env.TEST_FAST
const TEST_NG = TEST_SLOW && !process.env.TEST_NO_NG
const TEST_DEBUG = TEST_SLOW && !process.env.TEST_NO_DEBUG
const TEST_ASYNC = TEST_SLOW && !process.env.TEST_NO_ASYNC
const TEST_MQUICKJS = TEST_SLOW && !process.env.TEST_NO_MQUICKJS
const TEST_RELEASE = !process.env.TEST_NO_RELEASE
const DEBUG = Boolean(process.env.DEBUG)
console.log("test sets:", {
  TEST_RELEASE,
  TEST_DEBUG,
  TEST_NG,
  TEST_ASYNC,
  TEST_MQUICKJS,
  TEST_SLOW,
  DEBUG,
})

if (DEBUG) {
  setDebugMode(true)
}

type GetTestContext = (options?: ContextOptions) => Promise<QuickJSContext>

interface ContextTestOptions {
  isDebug?: boolean
  isNG?: boolean
}

const baseIt = it
function contextTests(getContext: GetTestContext, options: ContextTestOptions = {}) {
  const { isDebug = false, isNG = false } = options
  let vm: QuickJSContext = undefined as any
  let ffi: QuickJSFFI | QuickJSAsyncFFI = undefined as any
  let testId = 0
  let anyTestFailed = false
  let thisTestFailed = false

  const it = (name: string, fn: (scope: Scope) => unknown) =>
    baseIt(name, async () => {
      onTestFailed(() => {
        anyTestFailed = true
      })

      try {
        await Scope.withScopeAsync(async (scope) => {
          await fn(scope)
        })
      } catch (error) {
        thisTestFailed = true
        throw error
      }
    })

  /**
   * Helper for tests that require a specific feature.
   * - If feature is supported: runs the test function normally
   * - If feature is NOT supported: test passes if it either succeeds OR throws QuickJSUnsupported
   *
   * @param feature - The feature required by this test
   * @param featuresOrFn - Either a QuickJSFeatures object, or the test function (uses vm.features)
   * @param maybeFn - The test function if featuresOrFn is a QuickJSFeatures object
   * @returns Promise if the test function is async, void otherwise
   */
  function requiresFeature(
    feature: QuickJSFeature,
    featuresOrFn: QuickJSFeatures | (() => unknown),
    maybeFn?: () => unknown,
  ): unknown {
    let features: QuickJSFeatures
    let fn: () => unknown

    if (typeof featuresOrFn === "function") {
      // requiresFeature('bigint', () => ...)
      features = vm.features
      fn = featuresOrFn
    } else {
      // requiresFeature('bigint', someFeatures, () => ...)
      features = featuresOrFn
      fn = maybeFn!
    }

    const handleResult = (result: unknown): unknown => {
      // If the result is a promise, we need to handle rejections
      if (result && typeof result === "object" && "then" in result) {
        return (result as Promise<unknown>).catch((error) => {
          if (features.has(feature) || !(error instanceof errors.QuickJSUnsupported)) {
            throw error
          }
          // QuickJSUnsupported is expected when feature not supported
        })
      }
      return result
    }

    if (features.has(feature)) {
      // Feature supported - run normally
      return handleResult(fn())
    } else {
      // Feature not supported - allow success OR QuickJSUnsupported error
      try {
        return handleResult(fn())
      } catch (error) {
        if (!(error instanceof errors.QuickJSUnsupported)) {
          // Unexpected error type - rethrow
          throw error
        }
        // QuickJSUnsupported is expected when feature not supported
        return undefined
      }
    }
  }

  beforeEach(async () => {
    testId++
    thisTestFailed = false
    vm = await getContext()
    ffi = (vm as any).ffi
    assertBuildIsConsistent(vm)
  })

  afterEach(() => {
    if (!thisTestFailed) {
      // this will assert we disposed everything in the test
      // however, if we failed we may not have disposed
      vm.dispose()
    }
    vm = undefined as any
  })

  after(() => {
    if (!ffi) {
      return
    }

    if (ffi.QTS_BuildIsAsyncify()) {
      // Asyncify explodes during leak checking.
      return
    }
    if (anyTestFailed) {
      // we probably threw an error before disposing
      return
    }
    // https://web.dev/webassembly-memory-debugging/
    assert.strictEqual(ffi.QTS_RecoverableLeakCheck(), 0, "No lsan errors")
    debugLog("Leaks checked (OK)")
  })

  const getTestId = () => `test-${getContext.name}-${testId}`

  describe("primitives", () => {
    it("can round-trip a number", () => {
      const jsNumber = 42
      const numHandle = vm.newNumber(jsNumber)
      assert.equal(vm.getNumber(numHandle), jsNumber)
      numHandle.dispose()
    })

    it("can round-trip a bigint", () => {
      requiresFeature("bigint", () => {
        const int = 2n ** 64n
        const numHandle = vm.newBigInt(int)
        assert.equal(vm.getBigInt(numHandle), int)
        numHandle.dispose()
      })
    })

    it("can dump a bigint", () => {
      const int = 2n ** 64n
      const numHandle = vm.newBigInt(int)
      assert.equal(vm.dump(numHandle), int)
      numHandle.dispose()
    })

    it("can round-trip a string", () => {
      const jsString = "an example 🤔 string with unicode 🎉"
      const stringHandle = vm.newString(jsString)
      assert.equal(vm.getString(stringHandle), jsString)
      stringHandle.dispose()
    })

    it("can round-trip a global symbol", () => {
      requiresFeature("symbols", () => {
        const handle = vm.newSymbolFor("potatoes")
        const dumped = vm.getSymbol(handle)
        assert.equal(dumped, Symbol.for("potatoes"))
        handle.dispose()
      })
    })

    it("can round trip a unique symbol's description", () => {
      requiresFeature("symbols", () => {
        const symbol = Symbol("cats")
        const handle = vm.newUniqueSymbol(symbol)
        const dumped = vm.getSymbol(handle)
        assert.notStrictEqual(dumped, symbol)
        assert.notStrictEqual(dumped, Symbol.for("cats"))
        assert.equal(dumped.description, symbol.description)
        handle.dispose()
      })
    })

    it("can dump a symbol", () => {
      const cows = Symbol.for("cows")
      const birds = Symbol("birds")

      const handles = [vm.newSymbolFor(cows), vm.newUniqueSymbol(birds)]

      const [cowDump, birdDump] = handles.map((h) => vm.dump(h))

      assert.strictEqual(cowDump, cows)
      assert.strictEqual(birdDump.description, birds.description)
      assert.notStrictEqual(birdDump, birds)

      handles.map((h) => h.dispose())
    })

    it("can round-trip undefined", () => {
      assert.strictEqual(vm.dump(vm.undefined), undefined)
    })

    it("can round-trip true", () => {
      assert.strictEqual(vm.dump(vm.true), true)
    })

    it("can round-trip false", () => {
      assert.strictEqual(vm.dump(vm.false), false)
    })

    it("can round-trip null", () => {
      assert.strictEqual(vm.dump(vm.null), null)
    })
  })

  describe(
    "functions",
    () => {
      it("can wrap a Javascript function and call it", () => {
        const some = 9
        const fnHandle = vm.newFunction("addSome", (num) => {
          return vm.newNumber(some + vm.getNumber(num))
        })
        const result = vm
          .newNumber(1)
          .consume((num) => vm.callFunction(fnHandle, vm.undefined, num))
        if (result.error) {
          result.error.dispose()
          assert.fail("calling fnHandle must succeed")
        }
        assert.equal(vm.getNumber(result.value), 10)
        result.value.dispose()
        fnHandle.dispose()
      })

      it("passes through native exceptions", () => {
        const fnHandle = vm.newFunction("jsOops", () => {
          throw new Error("oops")
        })

        const result = vm.callFunction(fnHandle, vm.undefined)
        if (!result.error) {
          assert.fail("function call must return error")
        }
        const error = vm.dump(result.error)
        // quickjs-ng includes a stack property, bellard/quickjs does not
        assert.strictEqual(error.name, "Error")
        assert.strictEqual(error.message, "oops")
        result.error.dispose()
        fnHandle.dispose()
      })

      it("can return undefined twice", () => {
        const fnHandle = vm.newFunction("returnUndef", () => {
          return vm.undefined
        })

        vm.unwrapResult(vm.callFunction(fnHandle, vm.undefined)).dispose()
        const result = vm.unwrapResult(vm.callFunction(fnHandle, vm.undefined))

        assert.equal(vm.typeof(result), "undefined")
        result.dispose()
        fnHandle.dispose()
      })

      it("can see its arguments being cloned", () => {
        let value: QuickJSHandle | undefined

        const fnHandle = vm.newFunction("doSomething", (arg) => {
          value = arg.dup()
        })

        const argHandle = vm.newString("something")
        const callHandle = vm.callFunction(fnHandle, vm.undefined, argHandle)

        argHandle.dispose()
        vm.unwrapResult(callHandle).dispose()

        if (!value) throw new Error(`Value unset`)

        assert.equal(vm.getString(value), "something")
        value.dispose()

        fnHandle.dispose()
      })

      const itForMaxFuns = isDebug && TEST_SLOW ? it : baseIt.skip
      itForMaxFuns(
        "can handle more than signed int max functions being registered",
        () =>
          new Promise((done) => {
            // test for unsigned func_id impl

            for (let i = 0; i < Math.pow(2, 16); i++) {
              const funcID = i
              const fnHandle = vm.newFunction(`__func-${i}`, () => {
                return vm.newNumber(funcID)
              })
              if (i % 1024 === 0) {
                // spot check every 1024 funcs
                const res = vm.unwrapResult(vm.callFunction(fnHandle, vm.undefined))
                const calledFuncID = vm.dump(res)
                assert(calledFuncID === i)
                res.dispose()
              }
              fnHandle.dispose()
            }
            done(undefined)
          }),
      )
    },
    {
      // we need more time to register 2^16 functions
      timeout: 30000,
    },
  )

  describe("properties", () => {
    it("defining a property does not leak", () => {
      vm.defineProp(vm.global, "Name", {
        enumerable: false,
        configurable: false,
        get: () => vm.newString("World"),
      })
      const result = vm.unwrapResult(vm.evalCode('"Hello " + Name'))
      assert.equal(vm.dump(result), "Hello World")
      result.dispose()
    })
  })

  describe("objects", () => {
    it("can set and get properties by native string", () => {
      const object = vm.newObject()
      const value = vm.newNumber(42)
      vm.setProp(object, "propName", value)

      const value2 = vm.getProp(object, "propName")
      assert.equal(vm.getNumber(value2), 42)

      object.dispose()
      value.dispose()
      value2.dispose()
    })

    it("can set and get properties by handle string", () => {
      const object = vm.newObject()
      const key = vm.newString("prop as a QuickJS string")
      const value = vm.newNumber(42)
      vm.setProp(object, key, value)

      const value2 = vm.getProp(object, key)
      assert.equal(vm.getNumber(value2), 42)

      object.dispose()
      key.dispose()
      value.dispose()
      value2.dispose()
    })

    it("can create objects with a prototype", () => {
      const defaultGreeting = vm.newString("SUP DAWG")
      const greeterPrototype = vm.newObject()
      vm.setProp(greeterPrototype, "greeting", defaultGreeting)
      defaultGreeting.dispose()
      const greeter = vm.newObject(greeterPrototype)

      // Gets something from the prototype
      const getGreeting = vm.getProp(greeter, "greeting")
      assert.equal(vm.getString(getGreeting), "SUP DAWG")
      getGreeting.dispose()

      // But setting a property from the prototype does not modify the prototype
      const newGreeting = vm.newString("How do you do?")
      vm.setProp(greeter, "greeting", newGreeting)
      newGreeting.dispose()

      const originalGreeting = vm.getProp(greeterPrototype, "greeting")
      assert.equal(vm.getString(originalGreeting), "SUP DAWG")
      originalGreeting.dispose()

      greeterPrototype.dispose()
      greeter.dispose()
    })
  })

  describe("arrays", () => {
    it("can set and get entries by native number", () => {
      const array = vm.newArray()
      const val1 = vm.newNumber(101)
      vm.setProp(array, 0, val1)

      const val2 = vm.getProp(array, 0)
      assert.strictEqual(vm.getNumber(val2), 101)

      array.dispose()
      val1.dispose()
      val2.dispose()
    })

    it("adding items sets array.length", () => {
      const vals = [vm.newNumber(0), vm.newNumber(1), vm.newString("cow")]
      const array = vm.newArray()
      for (let i = 0; i < vals.length; i++) {
        vm.setProp(array, i, vals[i])
      }

      const length = vm.getProp(array, "length")
      assert.strictEqual(vm.getNumber(length), 3)

      length.dispose()
      array.dispose()
      vals.forEach((val) => val.dispose())
    })

    it("can access .length as a number", () => {
      const array = vm.newArray()
      assert.strictEqual(vm.getLength(array), 0)
      vm.newNumber(100).consume((n) => vm.setProp(array, 5, n))
      assert.strictEqual(vm.getLength(array), 6)
      array.dispose()
    })
  })

  describe("getOwnPropertyNames", () => {
    it("gets array indexes as *numbers*", ({ manage }) => {
      const array = manage(vm.newArray())
      vm.setProp(array, 0, vm.undefined)
      vm.setProp(array, 1, vm.undefined)
      vm.setProp(array, 2, vm.undefined)

      const props = manage(
        vm
          .getOwnPropertyNames(array, {
            numbers: true,
          })
          .unwrap(),
      )

      assert.strictEqual(props.length, 3)
      assert.strictEqual(vm.dump(props[0]), 0)
      assert.strictEqual(vm.dump(props[1]), 1)
      assert.strictEqual(vm.dump(props[2]), 2)
    })

    it("gets object keys as *strings*, but does not include symbols", ({ manage }) => {
      const obj = manage(vm.newObject())
      vm.setProp(obj, "a", vm.true)
      vm.setProp(obj, "b", vm.undefined)
      vm.setProp(obj, "c", vm.undefined)
      const sym = vm.newUniqueSymbol("d")
      vm.setProp(obj, sym, vm.undefined)
      sym.dispose()

      const props = manage(
        vm
          .getOwnPropertyNames(obj, {
            onlyEnumerable: true,
            strings: true,
          })
          .unwrap(),
      )

      assert.strictEqual(props.length, 3)
      assert.strictEqual(vm.dump(props[0]), "a")
      assert.strictEqual(vm.dump(props[1]), "b")
      assert.strictEqual(vm.dump(props[2]), "c")
    })

    it('gets object keys that are symbols only when "includeSymbols" is true', ({ manage }) => {
      const obj = manage(vm.newObject())
      const symA = manage(vm.newUniqueSymbol("a"))
      vm.setProp(obj, symA, vm.undefined)
      vm.setProp(obj, "b", vm.undefined)
      vm.setProp(obj, "c", vm.undefined)

      const props = manage(
        vm.unwrapResult(
          vm.getOwnPropertyNames(obj, {
            onlyEnumerable: true,
            symbols: true,
          }),
        ),
      )

      assert.strictEqual(props.length, 1)
      assert.strictEqual(vm.typeof(props[0]), "symbol")
    })

    it("gets number keys as strings when in standard compliant mode", ({ manage }) => {
      const array = manage(vm.newArray())
      vm.setProp(array, 0, vm.undefined)
      vm.setProp(array, 1, vm.undefined)
      vm.setProp(array, 2, vm.undefined)
      vm.setProp(array, "dog", vm.undefined)
      const props = manage(
        vm.getOwnPropertyNames(array, {
          strings: true,
          numbersAsStrings: true,
          onlyEnumerable: true,
        }),
      )
        .unwrap()
        .map((p) => vm.dump(p))

      assert.deepStrictEqual(["0", "1", "2", "dog"], props)
    })
  })

  describe(".unwrapResult", () => {
    it("successful result: returns the value", () => {
      const handle = vm.newString("OK!")
      const result: VmCallResult<QuickJSHandle> = {
        value: handle,
      }

      assert.strictEqual(vm.unwrapResult(result), handle)
      handle.dispose()
    })

    it("error result: throws the error as a Javascript value", () => {
      const handle = vm.newString("ERROR!")
      const result: VmCallResult<QuickJSHandle> = {
        error: handle,
      }

      try {
        vm.unwrapResult(result)
        assert.fail("vm.unwrapResult(error) must throw")
      } catch (error) {
        if (error instanceof errors.QuickJSUnwrapError) {
          assert.strictEqual(error.cause, "ERROR!", "QuickJSUnwrapError.cause set correctly")
          return
        }
        throw error
      } finally {
        if (handle.alive) {
          handle.dispose()
        }
      }
    })
  })

  describe(".evalCode", () => {
    it("on success: returns { value: success }", () => {
      const value = vm.unwrapResult(vm.evalCode(`["this", "should", "work"].join(' ')`))
      assert.equal(vm.getString(value), "this should work")
      value.dispose()
    })

    it("on syntax error: returns { error: exception }", () => {
      const result = vm.evalCode(`["this", "should", "fail].join(' ')`)
      if (!result.error) {
        assert.fail("result should be an error")
      }
      assertError(vm.dump(result.error), {
        name: "SyntaxError",
        message: "unexpected end of string",
      })
      result.error.dispose()
    })

    it("module: on syntax error: returns { error: exception }", () => {
      requiresFeature("modules", () => {
        const result = vm.evalCode(`["this", "should", "fail].join(' ')`, "mod.js", {
          type: "module",
        })
        if (!result.error) {
          assert.fail("result should be an error")
        }
        assertError(vm.dump(result.error), {
          name: "SyntaxError",
          message: "unexpected end of string",
        })
        result.error.dispose()
      })
    })

    it("module: on TypeError: returns { error: exception }", () => {
      requiresFeature("modules", () => {
        const result = vm.evalCode(`null.prop`, "mod.js", { type: "module" })
        if (!result.error) {
          result.value.consume((val) =>
            assert.fail(`result should be an error, instead is: ${inspect(vm.dump(val))}`),
          )
          return
        }
        const error = result.error.consume(vm.dump)
        assertError(error, {
          name: "TypeError",
          message: "cannot read property 'prop' of null",
        })
      })
    })

    it("runs in the global context", () => {
      vm.unwrapResult(vm.evalCode(`var declaredWithEval = 'Nice!'`)).dispose()
      const declaredWithEval = vm.getProp(vm.global, "declaredWithEval")
      assert.equal(vm.getString(declaredWithEval), "Nice!")
      declaredWithEval.dispose()
    })

    it("can access assigned globals", () => {
      let i = 0
      const fnHandle = vm.newFunction("nextId", () => {
        return vm.newNumber(++i)
      })
      vm.setProp(vm.global, "nextId", fnHandle)
      fnHandle.dispose()

      const nextId = vm.unwrapResult(vm.evalCode(`nextId(); nextId(); nextId()`))
      assert.equal(i, 3)
      assert.equal(vm.getNumber(nextId), 3)
      nextId.dispose()
    })

    it("can handle imports", () => {
      requiresFeature("modules", () => {
        let moduleLoaderCalls = 0
        vm.runtime.setModuleLoader(() => {
          moduleLoaderCalls++
          return `export const name = "from import";`
        })
        vm.unwrapResult(
          vm.evalCode(
            `
            import {name} from './foo.js'
            globalThis.declaredWithEval = name
            `,
            "importer.js",
          ),
        ).dispose()
        const declaredWithEval = vm.getProp(vm.global, "declaredWithEval")
        assert.equal(vm.getString(declaredWithEval), "from import")
        declaredWithEval.dispose()

        assert.equal(moduleLoaderCalls, 1, "Only called once")
      })
    })

    it("respects maxStackSize", async () => {
      try {
        ;(await getQuickJS()).evalCode('"ok"', { maxStackSizeBytes: 1 })
      } catch (e) {
        return
      }
    })

    it("returns the module exports", () => {
      requiresFeature("modules", () => {
        const modExports = vm.unwrapResult(
          vm.evalCode(
            `export const s = "hello"; export const n = 42; export default "the default";`,
          ),
        )

        const s = vm.getProp(modExports, "s").consume(vm.dump)
        const n = vm.getProp(modExports, "n").consume(vm.dump)
        const defaultExport = vm.getProp(modExports, "default").consume(vm.dump)
        const asJson = modExports.consume(vm.dump)
        try {
          assert.equal(s, "hello")
          assert.equal(n, 42)
          assert.equal(defaultExport, "the default")
        } catch (error) {
          console.log("Error with module exports:", asJson)
          throw error
        }
      })
    })

    it("returns a promise of module exports", () => {
      requiresFeature("modules", () => {
        const promise = vm.unwrapResult(
          vm.evalCode(
            `
await Promise.resolve(0);
export const s = "hello";
export const n = 42;
export default "the default";
`,
            "mod.js",
            { type: "module" },
          ),
        )

        vm.runtime.executePendingJobs()
        const promiseState = promise.consume((p) => vm.getPromiseState(p))
        if (promiseState.type === "pending") {
          throw new Error(`By now promise should be resolved.`)
        }

        const modExports = vm.unwrapResult(promiseState)
        const s = vm.getProp(modExports, "s").consume(vm.dump)
        const n = vm.getProp(modExports, "n").consume(vm.dump)
        const defaultExport = vm.getProp(modExports, "default").consume(vm.dump)
        const asJson = modExports.consume(vm.dump)
        try {
          assert.equal(s, "hello")
          assert.equal(n, 42)
          assert.equal(defaultExport, "the default")
        } catch (error) {
          console.log("Error with module exports:", asJson)
          throw error
        }
      })
    })
  })

  describe("intrinsics", () => {
    it("evalCode - context respects intrinsic options - Date Unavailable", async () => {
      return requiresFeature("intrinsics", async () => {
        // Eval is required to use `evalCode`
        const newContext = await getContext({
          intrinsics: {
            BaseObjects: true,
            Eval: true,
          },
        })

        const result = newContext.evalCode(`new Date()`)

        if (!result.error) {
          result.value.dispose()
          assert.fail("result should be an error")
        }

        const error = newContext.dump(result.error)
        assert.strictEqual(error.name, "ReferenceError")
        // quickjs-ng: "Date is not defined", bellard: "'Date' is not defined"
        const expectedMessage = isNG ? "Date is not defined" : "'Date' is not defined"
        assert.strictEqual(error.message, expectedMessage)

        result.error.dispose()
        newContext.dispose()
      })
    })

    it("evalCode - context executes as expected with default intrinsics", async () => {
      return requiresFeature("intrinsics", async () => {
        // Eval is required to use `evalCode`
        const newContext = await getContext({ intrinsics: DefaultIntrinsics })

        let handle
        try {
          handle = newContext.unwrapResult(newContext.evalCode(`new Date()`))
        } finally {
          if (handle?.alive) {
            handle.dispose()
          }
          newContext.dispose()
        }
      })
    })
  })

  describe(".executePendingJobs", () => {
    it("runs pending jobs", () => {
      requiresFeature("promises", () => {
        let i = 0
        const fnHandle = vm.newFunction("nextId", () => {
          return vm.newNumber(++i)
        })
        vm.setProp(vm.global, "nextId", fnHandle)
        fnHandle.dispose()

        const result = vm.unwrapResult(
          vm.evalCode(
            `(new Promise(resolve => resolve())).then(nextId).then(nextId).then(nextId);1`,
          ),
        )
        assert.equal(i, 0)
        vm.runtime.executePendingJobs()
        assert.equal(i, 3)
        assert.equal(vm.getNumber(result), 1)
        result.dispose()
      })
    })
  })

  describe(".hasPendingJob", () => {
    it("returns true when job pending", () => {
      requiresFeature("promises", () => {
        let i = 0
        const fnHandle = vm.newFunction("nextId", () => {
          return vm.newNumber(++i)
        })
        vm.setProp(vm.global, "nextId", fnHandle)
        fnHandle.dispose()

        vm.unwrapResult(
          vm.evalCode(`(new Promise(resolve => resolve(5)).then(nextId));1`),
        ).dispose()
        assert.strictEqual(
          vm.runtime.hasPendingJob(),
          true,
          "has a pending job after creating a promise",
        )

        const executed = vm.unwrapResult(vm.runtime.executePendingJobs())
        assert.strictEqual(executed, 1, "executed exactly 1 job")

        assert.strictEqual(vm.runtime.hasPendingJob(), false, "no longer any jobs after execution")
      })
    })
  })

  describe(".dump", () => {
    function dumpTestExample(val: unknown) {
      const json = typeof val === "undefined" ? "undefined" : JSON.stringify(val)
      const nativeType = typeof val
      it(`supports ${nativeType} (${json})`, () => {
        const handle = vm.unwrapResult(vm.evalCode(`(${json})`))
        assert.deepEqual(vm.dump(handle), val)
        handle.dispose()
      })
    }
    dumpTestExample(1)
    dumpTestExample("hi")
    dumpTestExample(true)
    dumpTestExample(false)
    dumpTestExample(undefined)
    dumpTestExample(null)
    dumpTestExample({ cow: true })
    dumpTestExample([1, 2, 3])
  })

  describe(".typeof", () => {
    function typeofTestExample(val: unknown, toCode = JSON.stringify) {
      const json = toCode(val)
      const nativeType = typeof val
      it(`supports ${nativeType} (${json})`, () => {
        const handle = vm.unwrapResult(vm.evalCode(`(${json})`))
        assert.equal(vm.typeof(handle), nativeType)
        handle.dispose()
      })
    }

    typeofTestExample(1)
    typeofTestExample("hi")
    typeofTestExample(true)
    typeofTestExample(false)
    typeofTestExample(undefined)
    typeofTestExample(null)
    typeofTestExample({ cow: true })
    typeofTestExample([1, 2, 3])
    typeofTestExample(
      function () {},
      (val: any) => val.toString(),
    )
  })

  describe("interrupt handler", () => {
    it("is called with the expected VM", () => {
      let calls = 0
      const interruptId = getTestId()
      const interruptHandler: InterruptHandler = (interruptVm) => {
        assert.strictEqual(
          interruptVm,
          vm.runtime,
          "ShouldInterruptHandler callback runtime is the runtime",
        )
        debugLog("interruptHandler called", interruptId)
        calls++
        return false
      }

      debugLog("setInterruptHandler", interruptId)
      vm.runtime.setInterruptHandler(interruptHandler)

      vm.unwrapResult(vm.evalCode("1 + 1")).dispose()

      assert(calls > 0, "interruptHandler called at least once")
    })

    it("interrupts infinite loop execution", () => {
      let calls = 0
      const interruptId = getTestId()
      const interruptHandler: InterruptHandler = () => {
        debugLog("interruptHandler called", interruptId)
        if (calls > 10) {
          return true
        }
        calls++
        return false
      }

      debugLog("setInterruptHandler", interruptId)
      vm.runtime.setInterruptHandler(interruptHandler)

      const result = vm.evalCode("i = 0; while (1) { i++ }")

      // Make sure we actually got to interrupt the loop.
      const iHandle = vm.getProp(vm.global, "i")
      const i = vm.getNumber(iHandle)
      iHandle.dispose()

      assert(i > 10, "incremented i")
      assert(i > calls, "incremented i more than called the interrupt handler")
      // debug('Javascript loop iterrations:', i, 'interrupt handler calls:', calls)

      if (result.error) {
        const errorJson = vm.dump(result.error)
        result.error.dispose()
        assert.equal(errorJson.name, "InternalError")
        assert.equal(errorJson.message, "interrupted")
      } else {
        result.value.dispose()
        assert.fail("Should have returned an interrupt error")
      }
    })

    it("shouldInterruptAfterDeadline: interrupts", () => {
      const deadline = Date.now() + 100
      vm.runtime.setInterruptHandler(shouldInterruptAfterDeadline(deadline))

      const result = vm.evalCode("i = 0; while (1) { i++ }")
      try {
        const interruptedAfterIterations = vm.getProp(vm.global, "i").consume(vm.dump)
        assert(interruptedAfterIterations > 0, "Allowed at least 1 iteration")

        if (result.error) {
          const errorJson = vm.dump(result.error)
          assert.equal(errorJson.name, "InternalError")
          assert.equal(errorJson.message, "interrupted")
        } else {
          assert.fail("Should have returned an interrupt error")
        }
      } finally {
        result.error ? result.error.dispose() : result.value.dispose()
      }
    })
  })

  describe(".computeMemoryUsage", () => {
    it("returns an object with JSON memory usage info", () => {
      const result = vm.runtime.computeMemoryUsage()
      const resultObj = vm.dump(result)
      result.dispose()

      const example = {
        array_count: 1,
        atom_count: 414,
        atom_size: 13593,
        binary_object_count: 0,
        binary_object_size: 0,
        c_func_count: 46,
        fast_array_count: 1,
        fast_array_elements: 0,
        js_func_code_size: 0,
        js_func_count: 0,
        js_func_pc2line_count: 0,
        js_func_pc2line_size: 0,
        js_func_size: 0,
        malloc_count: 665,
        malloc_limit: 4294967295,
        memory_used_count: 665,
        memory_used_size: 36305,
        obj_count: 97,
        obj_size: 4656,
        prop_count: 654,
        prop_size: 5936,
        shape_count: 50,
        shape_size: 10328,
        str_count: 0,
        str_size: 0,
      }

      assert.deepEqual(Object.keys(resultObj).sort(), Object.keys(example).sort())
    })
  })

  describe(".setMemoryLimit", () => {
    it("sets an enforced limit", () => {
      vm.runtime.setMemoryLimit(100)
      const result = vm.evalCode(`new Uint8Array(101); "ok"`)

      if (!result.error) {
        result.value.dispose()
        throw new Error("should be an error")
      }

      vm.runtime.setMemoryLimit(-1) // so we can dump
      const error = vm.dump(result.error)
      result.error.dispose()

      assert.strictEqual(error, null)
    })

    it("removes limit when set to -1", () => {
      vm.runtime.setMemoryLimit(100)
      vm.runtime.setMemoryLimit(-1)

      const result = vm.unwrapResult(vm.evalCode(`new Uint8Array(101); "ok"`))
      const value = vm.dump(result)
      result.dispose()
      assert.strictEqual(value, "ok")
    })
  })

  describe(".dumpMemoryUsage()", () => {
    it("logs memory usage", () => {
      assert(
        vm.runtime.dumpMemoryUsage().endsWith("per fast array)\n"),
        'should end with "per fast array)\\n"',
      )
    })
  })

  describe(".setMaxStackSize", () => {
    it("sets an enforced limit", () => {
      vm.runtime.setMaxStackSize(1)
      const result = vm.evalCode('"ok"')

      if (!result.error) {
        result.value.dispose()
        throw new Error("should be an error")
      }

      vm.runtime.setMaxStackSize(0) // so we can dump
      const error = vm.dump(result.error)
      result.error.dispose()
      // quickjs-ng throws RangeError with different message, bellard throws SyntaxError
      const expectedErrorName = isNG ? "RangeError" : "SyntaxError"
      const expectedMessage = isNG ? "Maximum call stack size exceeded" : "stack overflow"
      assert.strictEqual(error.name, expectedErrorName)
      assert.strictEqual(error.message, expectedMessage)
    })

    it("removes limit when set to 0", () => {
      vm.runtime.setMaxStackSize(1)
      vm.runtime.setMaxStackSize(0)
      const result = vm.unwrapResult(vm.evalCode('"ok"'))
      const value = vm.dump(result)
      result.dispose()
      assert.strictEqual(value, "ok")
    })
  })

  describe("sharing objects between contexts", () => {
    it("can share objects between same runtime", () => {
      const otherContext = vm.runtime.newContext()

      const object = vm.newObject()
      vm.newString("bar").consume((it) => vm.setProp(object, "foo", it))
      otherContext.setProp(otherContext.global, "myObject", object)
      object.dispose()

      const value = vm.unwrapResult(otherContext.evalCode(`myObject`)).consume(otherContext.dump)
      assert.deepStrictEqual(value, { foo: "bar" }, "ok")
      otherContext.dispose()
    })
  })

  describe(".newPromise()", () => {
    it("dispose does not leak", () => {
      requiresFeature("promises", () => {
        vm.newPromise().dispose()
      })
    })

    it("passes an end-to-end test", async () => {
      return requiresFeature("promises", async () => {
        const expectedValue = Math.random()
        let deferred: QuickJSDeferredPromise = undefined as any

        function timeout(ms: number) {
          return new Promise<void>((resolve) => {
            setTimeout(() => resolve(), ms)
          })
        }

        const asyncFuncHandle = vm.newFunction("getThingy", () => {
          deferred = vm.newPromise()
          timeout(5).then(() => vm.newNumber(expectedValue).consume((val) => deferred.resolve(val)))
          return deferred.handle
        })

        asyncFuncHandle.consume((func) => vm.setProp(vm.global, "getThingy", func))

        vm.unwrapResult(
          vm.evalCode(`
            var globalThingy = 'not set by promise';
            getThingy().then(thingy => { globalThingy = thingy })
          `),
        ).dispose()

        // Wait for the promise to settle
        await deferred.settled

        // Execute promise callbacks inside the VM
        vm.runtime.executePendingJobs()

        // Check that the promise executed.
        const vmValue = vm.unwrapResult(vm.evalCode(`globalThingy`)).consume((x) => vm.dump(x))
        assert.equal(vmValue, expectedValue)
      })
    })
  })

  describe(".resolvePromise()", () => {
    it("retrieves async function return value as a successful VM result", async () => {
      return requiresFeature("promises", async () => {
        const result = vm.unwrapResult(
          vm.evalCode(`
          async function return1() {
            return 1
          }

          return1()
          `),
        )

        assert.equal(vm.typeof(result), "object", "Async function returns an object (promise)")

        const promise = result.consume((result) => vm.resolvePromise(result))
        vm.runtime.executePendingJobs()
        const asyncResult = vm.unwrapResult(await promise)

        assert.equal(vm.dump(asyncResult), 1, "Awaited promise returns 1")

        asyncResult.dispose()
      })
    })

    it("retrieves async function error as a error VM result", async () => {
      return requiresFeature("promises", async () => {
        const result = vm.unwrapResult(
          vm.evalCode(`
          async function throwOops() {
            throw new Error('oops')
          }

          throwOops()
          `),
        )

        assert.equal(vm.typeof(result), "object", "Async function returns an object (promise)")

        const promise = result.consume((result) => vm.resolvePromise(result))
        vm.runtime.executePendingJobs()
        const asyncResult = await promise

        if (!asyncResult.error) {
          throw new Error("Should have returned an error")
        }
        const error = vm.dump(asyncResult.error)
        asyncResult.error.dispose()

        assert.equal(error.name, "Error")
        assert.equal(error.message, "oops")
      })
    })

    it("converts non-promise handles into a promise, too", async () => {
      return requiresFeature("promises", async () => {
        const stringHandle = vm.newString("foo")
        const promise = vm.resolvePromise(stringHandle)
        stringHandle.dispose()

        vm.runtime.executePendingJobs()

        const final = await promise.then((result) => {
          const stringHandle2 = vm.unwrapResult(result)
          return `unwrapped: ${stringHandle2.consume((stringHandle2) => vm.dump(stringHandle2))}`
        })
        assert.equal(final, `unwrapped: foo`)
      })
    })
  })

  describe("memory pressure", () => {
    it("can pass a large string to a C function", async () => {
      const jsonString = await fs.promises.readFile(
        `${__dirname}/../test/json-generator-dot-com-1024-rows.json`,
        "utf-8",
      )
      const stringHandle = vm.newString(jsonString)
      const roundTripped = vm.getString(stringHandle)
      stringHandle.dispose()

      assert.strictEqual(roundTripped, jsonString)
    })
  })
}

function asyncContextTests(
  getContext: () => Promise<QuickJSAsyncContext>,
  options: ContextTestOptions = {},
) {
  const { isNG: _isNG = false } = options
  let vm: QuickJSAsyncContext = undefined as any

  beforeEach(async () => {
    vm = await getContext()
    assertBuildIsConsistent(vm)
  })

  afterEach(() => {
    vm.dispose()
    vm = undefined as any
  })

  describe("asyncify functions", () => {
    it("sees Promise<handle> as synchronous", async () => {
      let asyncFunctionCalls = 0
      const asyncFn = async () => {
        asyncFunctionCalls++
        await new Promise((resolve) => setTimeout(resolve, 50))
        return vm.newString("hello from async")
      }
      const fnHandle = vm.newAsyncifiedFunction("asyncFn", asyncFn)
      vm.setProp(vm.global, "asyncFn", fnHandle)
      fnHandle.dispose()

      const callResultPromise = vm.evalCodeAsync("asyncFn()")
      assert(callResultPromise instanceof Promise)

      const callResult = await callResultPromise
      const unwrapped = vm.unwrapResult(callResult)

      const dumped = unwrapped.consume(vm.dump)
      assert.equal(dumped, "hello from async")

      assert.equal(asyncFunctionCalls, 1, "one call")
    })

    it("passes through native promise rejection", async () => {
      const asyncFn = async () => {
        await new Promise((resolve) => setTimeout(resolve, 50))
        throw new Error("async oops")
      }

      vm.newAsyncifiedFunction("asyncFn", asyncFn).consume((fn) =>
        vm.setProp(vm.global, "asyncFn", fn),
      )

      const callResultPromise = vm.evalCodeAsync("asyncFn()")
      assert(callResultPromise instanceof Promise)

      const result = await callResultPromise
      assert(isFail(result), "VM eval call errored")

      assert.throws(() => vm.unwrapResult(result), /async oops/)
    })
  })

  describe("module loading", () => {
    it("supports async module loading", async () => {
      async function testBody() {
        let moduleLoaderCalls = 0
        const moduleLoader = async () => {
          moduleLoaderCalls++
          if (moduleLoaderCalls > 1) {
            throw new Error("Module loader should only be called once")
          }
          debugLog("moduleLoader: sleeping")
          await new Promise((resolve) => setTimeout(resolve, 50))
          debugLog("moduleLoader: done sleeping")
          return 'export default function() { return "hello from module" }'
        }
        debugLog("defined module loader")

        vm.runtime.setModuleLoader(moduleLoader)
        debugLog("set module loader")

        const promise = vm.evalCodeAsync(`
        import otherModule from './other-module'
        globalThis.stuff = otherModule()
      `)
        debugLog("promise", promise)

        const result = await promise
        debugLog("awaited vm.evalCodeAsync", result, { alive: vm.alive })
        vm.unwrapResult(result).dispose()

        const stuff = vm.getProp(vm.global, "stuff").consume(vm.dump)
        assert.strictEqual(stuff, "hello from module")
      }

      try {
        await testBody()
      } catch (error) {
        debugLog("test body threw", error)
        throw error
      }
    })

    it("passes through the module name", () => {
      let callCtx: QuickJSAsyncContext
      let callModuleName: string
      vm.runtime.setModuleLoader((moduleName, moduleVM) => {
        callCtx = moduleVM
        callModuleName = moduleName
        return `export default 5`
      })

      const result = vm.evalCode("import otherModule from './other-module.js'")
      vm.unwrapResult(result).dispose()

      assert.strictEqual(callCtx!, vm, "expected VM")
      assert.strictEqual(
        callModuleName!,
        "other-module.js",
        `expected module name, got ${callModuleName!}`,
      )
    })

    it("calls the module loader with the name returned from the module normalizer", async () => {
      const EVAL_FILE_NAME = "EVAL FILE NAME.ts"
      const NORMALIZED_NAME = "VERY NORMAL NAME"
      const IMPORT_PATH = "./other-module/index.js"
      let requestedBaseName: string | undefined
      let requestedName: string | undefined
      let loadedName: string | undefined

      vm.runtime.setModuleLoader(
        function load(moduleName: string) {
          loadedName = moduleName
          return `export default 5`
        },
        function normalize(
          baseName: string,
          name: string,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          _moduleVM: QuickJSAsyncContext,
        ) {
          requestedBaseName = baseName
          requestedName = name
          return NORMALIZED_NAME
        },
      )

      // Asserts that the eval worked without incident
      const result = vm.evalCode(`import otherModule from '${IMPORT_PATH}'`, EVAL_FILE_NAME)
      vm.unwrapResult(result).dispose()

      // Check our request
      assert.strictEqual(requestedName, IMPORT_PATH, "requested name is the literal import string")
      assert.strictEqual(requestedBaseName, EVAL_FILE_NAME, "base name is our eval file name")
      assert.strictEqual(
        loadedName,
        NORMALIZED_NAME,
        "loader received the normalized name we returned",
      )
    })
  })

  describe("ASYNCIFY_STACK_SIZE", () => {
    // | ASYNCIFY_STACK_SIZE | Max Nesting Levels |
    // |---------------------|--------------------|
    // | 4096 (default)      | 12                 |
    // | 81920               | 297                |
    it("is enough to support at least 20 levels of function nesting", async () => {
      // The nesting levels of the test cannot be too high, otherwise the
      // node.js call stack will overflow when executing `yarn test`
      const buildName = isBuildDebug(vm) ? "debug" : "release"
      const EXPECTED_NESTING_LEVEL = isBuildDebug(vm) ? 18 : 20

      let asyncFunctionCalls = 0
      const asyncFn = async () => {
        asyncFunctionCalls++
      }
      vm.newAsyncifiedFunction("asyncFn", asyncFn).consume((fn) =>
        vm.setProp(vm.global, "asyncFn", fn),
      )

      try {
        await vm.evalCodeAsync(`
        let nestingLevels = 0
        function nestingFn() {
          nestingLevels++
          asyncFn()
          if (nestingLevels < ${EXPECTED_NESTING_LEVEL}) {
            nestingFn()
          }
        }
        nestingFn();
      `)
      } catch (error) {
        ;(error as Error).message +=
          `\nasync calls: ${asyncFunctionCalls} (expected ${EXPECTED_NESTING_LEVEL})`
        throw error
      }

      assert.equal(
        asyncFunctionCalls,
        EXPECTED_NESTING_LEVEL,
        `${EXPECTED_NESTING_LEVEL} levels of nesting for ${buildName} build`,
      )
    })
  })
}

describe("QuickJSContext", function () {
  if (TEST_RELEASE) {
    describe("QuickJS.newContext", function () {
      const loader = getQuickJS
      const getContext: GetTestContext = (opts) => loader().then((mod) => mod.newContext(opts))
      contextTests(getContext)
    })
  }

  if (TEST_DEBUG) {
    describe("DEBUG sync module", function () {
      const loader = memoizePromiseFactory(() => newQuickJSWASMModule(DEBUG_SYNC))
      const getContext: GetTestContext = (opts) => loader().then((mod) => mod.newContext(opts))
      contextTests(getContext, { isDebug: true })
    })
  }

  if (TEST_NG) {
    if (TEST_RELEASE) {
      describe("quickjs-ng RELEASE_SYNC", function () {
        const loader = memoizePromiseFactory(() =>
          newQuickJSWASMModule(import("@jitl/quickjs-ng-wasmfile-release-sync")),
        )
        const getContext: GetTestContext = (opts) => loader().then((mod) => mod.newContext(opts))
        contextTests(getContext, { isNG: true })
      })
    }

    if (TEST_DEBUG) {
      describe("quickjs-ng DEBUG_SYNC", function () {
        const loader = memoizePromiseFactory(() =>
          newQuickJSWASMModule(import("@jitl/quickjs-ng-wasmfile-debug-sync")),
        )
        const getContext: GetTestContext = (opts) => loader().then((mod) => mod.newContext(opts))
        contextTests(getContext, { isNG: true, isDebug: true })
      })
    }
  }

  if (TEST_MQUICKJS) {
    if (TEST_RELEASE) {
      describe("mquickjs RELEASE_SYNC", function () {
        const loader = memoizePromiseFactory(() => newQuickJSWASMModule(MQUICKJS_RELEASE_SYNC))
        const getContext: GetTestContext = (opts) => loader().then((mod) => mod.newContext(opts))
        contextTests(getContext)
      })
    }

    if (TEST_DEBUG) {
      describe("mquickjs DEBUG_SYNC", function () {
        const loader = memoizePromiseFactory(() => newQuickJSWASMModule(MQUICKJS_DEBUG_SYNC))
        const getContext: GetTestContext = (opts) => loader().then((mod) => mod.newContext(opts))
        contextTests(getContext, { isDebug: true })
      })
    }
  }
})

if (TEST_ASYNC) {
  describe("QuickJSAsyncContext", () => {
    describe("newQuickJSAsyncWASMModule", function () {
      const loader = memoizePromiseFactory(() => newQuickJSAsyncWASMModule())
      const getContext = (opts?: ContextOptions) => loader().then((mod) => mod.newContext(opts))

      describe("sync API", () => {
        contextTests(getContext)
      })

      describe("async API", () => {
        asyncContextTests(getContext)
      })
    })

    describe("DEBUG async module", function () {
      const loader = memoizePromiseFactory(() => newQuickJSAsyncWASMModule(DEBUG_ASYNC))
      const getContext = (opts?: ContextOptions) => loader().then((mod) => mod.newContext(opts))

      describe("sync API", () => {
        contextTests(getContext, { isDebug: true })
      })

      describe("async API", () => {
        asyncContextTests(getContext)
      })
    })

    if (TEST_NG) {
      describe("quickjs-ng RELEASE_ASYNC", function () {
        const loader = memoizePromiseFactory(() =>
          newQuickJSAsyncWASMModule(import("@jitl/quickjs-ng-wasmfile-release-asyncify")),
        )
        const getContext = (opts?: ContextOptions) => loader().then((mod) => mod.newContext(opts))

        describe("sync API", () => {
          contextTests(getContext, { isNG: true })
        })

        describe("async API", () => {
          asyncContextTests(getContext, { isNG: true })
        })
      })
    }
  })
}

describe("QuickJSWASMModule", () => {
  const variants = [
    { name: "getQuickJS", loader: getQuickJS },
    { name: "RELEASE_SYNC", loader: () => newQuickJSWASMModule(RELEASE_SYNC) },
    { name: "DEBUG_SYNC", loader: () => newQuickJSWASMModule(DEBUG_SYNC) },
    { name: "DEBUG_ASYNC", loader: () => newQuickJSAsyncWASMModule(DEBUG_ASYNC) },
    { name: "RELEASE_ASYNC", loader: () => newQuickJSAsyncWASMModule(RELEASE_ASYNC) },
    ...(TEST_MQUICKJS
      ? [
          {
            name: "MQUICKJS_RELEASE_SYNC",
            loader: () => newQuickJSWASMModule(MQUICKJS_RELEASE_SYNC),
          },
          { name: "MQUICKJS_DEBUG_SYNC", loader: () => newQuickJSWASMModule(MQUICKJS_DEBUG_SYNC) },
        ]
      : []),
  ]

  for (const variant of variants) {
    moduleTests(variant)
  }

  describe("newVariant", () => {
    it("uses the provided WebAssembly.Memory", async () => {
      const wasmMemory = new WebAssembly.Memory({
        initial: 16777216 / 65536,
        maximum: 2147483648 / 65536,
      })
      const variant = newVariant(RELEASE_SYNC, {
        wasmMemory,
      })
      const mod = await newQuickJSWASMModule(variant)

      expect(mod.getWasmMemory()).toBe(wasmMemory)
    })
  })
})

function moduleTests(args: { name: string; loader: () => Promise<QuickJSWASMModule> }) {
  const { name, loader } = args
  describe(`variant ${name}`, () => {
    let instance: QuickJSWASMModule
    beforeEach(async () => {
      instance = await loader()
    })

    it(".getWasmMemory returns a memory", () => {
      const memory = instance.getWasmMemory()
      expect(memory).toBeInstanceOf(WebAssembly.Memory)
    })
  })
}

// TODO: test newRuntime
// TODO: test newAsyncRuntime

function isBuildDebug(vm: QuickJSContext) {
  const ffi: QuickJSFFI = (vm as any).ffi
  return Boolean(ffi.QTS_BuildIsDebug())
}

function assertBuildIsConsistent(vm: QuickJSContext) {
  const ffi: QuickJSFFI = (vm as any).ffi
  if (ffi.DEBUG) {
    assert.strictEqual(
      ffi.QTS_BuildIsDebug(),
      1,
      "when FFI is generated with DEBUG, C code is compiled with DEBUG",
    )
  } else {
    assert.strictEqual(
      ffi.QTS_BuildIsDebug(),
      0,
      "when FFI is generated without DEBUG, C code is compiled without DEBUG",
    )
  }
}

interface ErrorObj {
  name: string
  message: string
  /** Ignored */
  stack?: unknown
}
function assertError(actual: ErrorObj, expected: ErrorObj) {
  assert.strictEqual(`${actual.name}: ${actual.message}`, `${expected.name}: ${expected.message}`)
  assert.strictEqual(actual.message, expected.message)
  assert.strictEqual(actual.name, expected.name)
}

function applyVitestHack<T>(
  klass: new (...args: never[]) => T,
  serialize: (instance: T) => unknown,
) {
  klass.prototype["@@__IMMUTABLE_RECORD__@@"] = true
  klass.prototype.toJSON = function vitestHackToJSON() {
    return serialize(this)
  }
}

applyVitestHack(QuickJSContext, (vm) => ({
  type: "QuickJSContext",
  __vitest__: true,
  alive: vm.alive,
}))
applyVitestHack(QuickJSAsyncContext, (vm) => ({
  type: "QuickJSAsyncContext",
  __vitest__: true,
  alive: vm.alive,
}))
applyVitestHack(QuickJSRuntime, (rt) => ({
  type: "QuickJSRuntime",
  __vitest__: true,
  alive: rt.alive,
}))
applyVitestHack(QuickJSAsyncRuntime, (rt) => ({
  type: "QuickJSAsyncRuntime",
  __vitest__: true,
  alive: rt.alive,
}))
applyVitestHack(QuickJSWASMModule, () => ({
  type: "QuickJSWASMModule",
  __vitest__: true,
}))

const inspect = (val: unknown) => {
  return baseInspect(val, {
    depth: 30,
    colors: true,
  })
}
