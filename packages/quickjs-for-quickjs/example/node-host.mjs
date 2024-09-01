import fs from "node:fs/promises"
import module from "node:module"
const require = module.createRequire(import.meta.url)

const quickjsSource = await fs.readFile(require.resolve("quickjs-for-quickjs"), "utf8")
const exportQuickjsSource = `export default ${JSON.stringify(quickjsSource)}`

const exampleQuickjsHostSource = await fs.readFile(require.resolve("./quickjs-host.mjs"), "utf8")
const exportExampleQuickjsHostSource = `export default ${JSON.stringify(exampleQuickjsHostSource)}`

const QuickJS = await import("quickjs-emscripten").then((mod) => mod.getQuickJS())
const context = QuickJS.newContext()
context.runtime.setModuleLoader((name) => {
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
context.setProp(
  context.global,
  "random",
  context.newFunction("random", () => context.newNumber(Math.random())),
)
const promise = context.resolvePromise(context.evalCode(exampleQuickjsHostSource).unwrap())
context.runtime.executePendingJobs()
console.log("result:", context.dump(await promise))
