import assert from "assert"
import {
  DEBUG_SYNC,
  getQuickJS,
  newAsyncContext,
  newQuickJSAsyncWASMModule,
  newQuickJSWASMModule,
  shouldInterruptAfterDeadline,
} from "."
import { QuickJSWASMModule } from "./module"
import { TestQuickJSWASMModule } from "./module-test"
import { memoizePromiseFactory } from "./variants"

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
    QuickJS.disposeAll()
    QuickJS.assertNoMemoryAllocated()
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
// Limit stack size
runtime.setMaxStackSize(1024 * 320)
// Interrupt computation after 1024 calls to the interrupt handler
let interruptCycles = 0
runtime.setInterruptHandler(() => ++interruptCycles > 1024)
// Toy module system that always returns the module name
// as the default export
runtime.setModuleLoader(moduleName =>
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

    it("asyncify module loader example", async () => {
      {
        const module = await newQuickJSAsyncWASMModule()
        const runtime = module.newRuntime()
        const path = await import("path")
        const { promises: fs } = await import("fs")

        const importsPath = path.join(__dirname, "../examples/imports") + "/"
        // Module loaders can return promises.
        // Execution will suspend until the promise resolves.
        runtime.setModuleLoader((moduleName) => {
          const modulePath = path.join(importsPath, moduleName)
          if (!modulePath.startsWith(importsPath)) {
            throw new Error("out of bounds")
          }
          console.log("loading", moduleName, "from", modulePath)
          return fs.readFile(modulePath, "utf-8")
        })

        // evalCodeAsync is required when execution may suspend.
        const context = runtime.newContext()
        const result = await context.evalCodeAsync(`
        import * as React from 'esm.sh/react@17'
        import * as ReactDOMServer from 'esm.sh/react-dom@17/server'
        const e = React.createElement
        globalThis.html = ReactDOMServer.renderToStaticMarkup(
          e('div', null, e('strong', null, 'Hello world!'))
        )
        `)
        context.unwrapResult(result).dispose()
        const html = context.getProp(context.global, "html").consume(context.getString)
        console.log(html) // <div><strong>Hello world!</strong></div>
      }

      const lastLogMessage = consoleLogCalls[consoleLogCalls.length - 1].join(" ")
      assert.strictEqual(lastLogMessage, "<div><strong>Hello world!</strong></div>")
    })

    it("asyncify file reading example", async () => {
      {
        const context = await newAsyncContext()
        const path = await import("path")
        const { promises: fs } = await import("fs")

        const importsPath = path.join(__dirname, "../examples/imports") + "/"
        const readFileHandle = context.newAsyncifiedFunction("readFile", async (pathHandle) => {
          const pathString = path.join(importsPath, context.getString(pathHandle))
          if (!pathString.startsWith(importsPath)) {
            throw new Error("out of bounds")
          }
          const data = await fs.readFile(pathString, "utf-8")
          return context.newString(data)
        })
        readFileHandle.consume((fn) => context.setProp(context.global, "readFile", fn))

        // evalCodeAsync is required when execution may suspend.
        const result = await context.evalCodeAsync(`
        // Not a promise:       vvvvvvvvvvvvvvvvvvvv 
        const data = JSON.parse(readFile('data.json'))
        data.map(x => x.toUpperCase()).join(' ')
        `)
        const upperCaseData = context.unwrapResult(result).consume(context.getString)
        console.log(upperCaseData) // 'VERY USEFUL DATA'
      }

      assert.strictEqual(consoleLogCalls[0].join(" "), "VERY USEFUL DATA")
    })
  })

  describe("testing example", () => {
    // Define your test suite in a function, so that you can test against
    // different module loaders.
    function myTests(moduleLoader: () => Promise<QuickJSWASMModule>) {
      let QuickJS: TestQuickJSWASMModule
      beforeEach(async () => {
        // Get a unique TestQuickJSWASMModule instance for each test.
        const wasmModule = await moduleLoader()
        QuickJS = new TestQuickJSWASMModule(wasmModule)
      })
      afterEach(() => {
        // Assert that the test disposed all handles. The DEBUG_SYNC build
        // variant will show detailed traces for each leak.
        QuickJS.assertNoMemoryAllocated()
      })

      it("works well", () => {
        // TODO: write a test using QuickJS
        const context = QuickJS.newContext()
        context.unwrapResult(context.evalCode("1 + 1")).dispose()
        context.dispose()
      })
    }

    // Run the test suite against a matrix of module loaders.
    describe("Check for memory leaks with QuickJS DEBUG build", () => {
      const moduleLoader = memoizePromiseFactory(() => newQuickJSWASMModule(DEBUG_SYNC))
      myTests(moduleLoader)
    })

    describe("Realistic test with QuickJS RELEASE build", () => {
      myTests(getQuickJS)
    })
  })
})
