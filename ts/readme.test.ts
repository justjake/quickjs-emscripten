import assert from "assert"
import { getQuickJS, QuickJSWASMModule, shouldInterruptAfterDeadline } from "."
import { QuickJSDeferredPromise } from "./deferred-promise"
import { Scope } from "./lifetime"
import { TestQuickJSWASMModule } from "./module-test"
import { QuickJSHandle } from "./types"

describe("README.md", () => {
  const originalConsoleLog = console.log
  const boundConsoleLog = originalConsoleLog.bind(console)
  let consoleLogCalls: unknown[][] = []
  let QuickJS: TestQuickJSWASMModule

  beforeEach(async () => {
    consoleLogCalls = []
    console.log = (...args: unknown[]) => {
      consoleLogCalls.push(args)
      boundConsoleLog(...args)
    }
    QuickJS = new TestQuickJSWASMModule(await getQuickJS())
  })

  afterEach(() => {
    console.log = originalConsoleLog
    QuickJS?.disposeAll()
  })

  describe("intro", () => {
    it("first example", async () => {
      {
        async function main() {
          const QuickJS = await getQuickJS()
          const vm = QuickJS.newContext()

          const world = vm.newString("world")
          vm.setProp(vm.global, "NAME", world)
          world.dispose()

          const result = vm.evalCode(`"Hello " + NAME + "!"`)
          if (result.error) {
            console.log("Execution failed:", vm.dump(result.error))
            result.error.dispose()
          } else {
            console.log("Success:", vm.dump(result.value))
            result.value.dispose()
          }

          vm.dispose()
        }

        await main()
      }

      assert.strictEqual(consoleLogCalls[0].join(" "), "Success: Hello world!")
    })

    it("eval example", async () => {
      {
        await getQuickJS().then((QuickJS) => {
          const result = QuickJS.evalCode("1 + 1", {
            shouldInterrupt: shouldInterruptAfterDeadline(Date.now() + 1000),
            memoryLimitBytes: 1024 * 1024,
          })
          console.log(result)
        })
      }

      assert.strictEqual(consoleLogCalls[0].join(" "), "2")
    })
  })

  describe("interpreter", () => {
    it("context example", () => {
      {
        const vm = QuickJS.newContext()
        let state = 0

        const fnHandle = vm.newFunction("nextId", () => {
          return vm.newNumber(++state)
        })

        vm.setProp(vm.global, "nextId", fnHandle)
        fnHandle.dispose()

        const nextId = vm.unwrapResult(vm.evalCode(`nextId(); nextId(); nextId()`))
        console.log("vm result:", vm.getNumber(nextId), "native state:", state)

        nextId.dispose()
        vm.dispose()
      }

      assert.strictEqual(consoleLogCalls[0].join(" "), "vm result: 3 native state: 3")
    })

    it("runtime example", () => {
      // prettier-ignore
      {
const runtime = QuickJS.newRuntime()
// "Should be enough for everyone" -- attributed to B. Gates
runtime.setMemoryLimit(1024 * 640)
// Interrupt computation after 1024 calls to the interrupt handler
let interruptCycles = 0
runtime.setInterruptHandler(() => ++interruptCycles > 1024)
// Toy module system that always returns the module name
// as the default export
runtime.setModuleLoader((context, moduleName) =>
  `export default '${moduleName}'`)
const context = runtime.newContext()
const ok = context.evalCode(`
import fooName from './foo.js'
globalThis.result = fooName
`)
context.unwrapResult(ok).dispose()
// logs "foo.js"
console.log(
  context
    .getProp(context.global, 'result')
    .consume(context.dump)
)
context.dispose()
runtime.dispose()
    }

      assert.strictEqual(consoleLogCalls[0].join(" "), "foo.js")
    })

    it("function example", () => {
      {
        const vm = QuickJS.newContext()
        // `console.log`
        const logHandle = vm.newFunction("log", (...args) => {
          const nativeArgs = args.map(vm.dump)
          console.log("QuickJS:", ...nativeArgs)
        })
        // Partially implement `console` object
        const consoleHandle = vm.newObject()
        vm.setProp(consoleHandle, "log", logHandle)
        vm.setProp(vm.global, "console", consoleHandle)
        consoleHandle.dispose()
        logHandle.dispose()

        vm.unwrapResult(vm.evalCode(`console.log("Hello from QuickJS!")`)).dispose()
      }

      assert.strictEqual(consoleLogCalls[0].join(" "), "QuickJS: Hello from QuickJS!")
    })

    it("promise example", async () => {
      {
        const vm = QuickJS.newContext()
        const fakeFileSystem = new Map([["example.txt", "Example file content"]])

        // Function that simulates reading data asynchronously
        const readFileHandle = vm.newFunction("readFile", (pathHandle) => {
          const path = vm.getString(pathHandle)
          const promise = vm.newPromise()
          setTimeout(() => {
            const content = fakeFileSystem.get(path)
            promise.resolve(vm.newString(content || ""))
          }, 100)
          // IMPORTANT: Once you resolve an async action inside QuickJS,
          // call runtime.executePendingJobs() to run any code that was
          // waiting on the promise or callback.
          promise.settled.then(vm.runtime.executePendingJobs)
          return promise.handle
        })
        readFileHandle.consume((handle) => vm.setProp(vm.global, "readFile", handle))

        // Evaluate code that uses `readFile`, which returns a promise
        const result = vm.evalCode(`(async () => {
          const content = await readFile('example.txt')
          return content.toUpperCase()
        })()`)
        const promiseHandle = vm.unwrapResult(result)

        // Convert the promise handle into a native promise and await it.
        // If code like this deadlocks, make sure you are calling
        // runtime.executePendingJobs appropriately.
        const resolvedResult = await vm.resolvePromise(promiseHandle)
        promiseHandle.dispose()
        const resolvedHandle = vm.unwrapResult(resolvedResult)
        console.log("Result:", vm.getString(resolvedHandle))
        resolvedHandle.dispose()
      }

      assert.strictEqual(consoleLogCalls[0].join(" "), "Result: EXAMPLE FILE CONTENT")
    })
  })
})
