import fs from "node:fs/promises"
import module from "node:module"
import { getQuickJS, setUpContext } from "quickjs-for-quickjs"
const require = module.createRequire(import.meta.url)

console.log("hello")

const quickjsSource = await fs.readFile(require.resolve("quickjs-for-quickjs"), "utf8")
const exportQuickjsSource = `export default ${JSON.stringify(quickjsSource)}`

const exampleQuickjsHostSource = await fs.readFile(require.resolve("./quickjs-host.mjs"), "utf8")
const exportExampleQuickjsHostSource = `export default ${JSON.stringify(exampleQuickjsHostSource)}`

const QuickJS = await getQuickJS()
const context = setUpContext(QuickJS.newContext())
context.runtime.setModuleLoader((name) => {
  console.log(`0: import ${name}`)
  if (name === "quickjs-for-quickjs") {
    return quickjsSource
  }
  if (name === "quickjs-for-quickjs-source") {
    return exportQuickjsSource
  }
  if (name === "example-quickjs-host-source") {
    return exportExampleQuickjsHostSource
  }
  return { error: new Error("not found") }
})

let nestingLimit = 2
context.setProp(
  context.global,
  "done",
  context.newFunction("done", () => context.newNumber(--nestingLimit <= 0 ? 1 : 0)),
)
const handle = context
  .evalCode(exampleQuickjsHostSource, "quickjs-host.mjs", {
    type: "module",
  })
  .unwrap()

const promise = context.resolvePromise(handle)
context.runtime.executePendingJobs()

const result = (await promise).unwrap()

console.log({
  result: context.dump(context.getProp(result, "result")),
})

console.log("result:", context.dump(context.getProp(await promise, "result")))
