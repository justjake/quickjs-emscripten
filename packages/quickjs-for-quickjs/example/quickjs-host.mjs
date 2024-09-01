import quickjsSource from "quickjs-for-quickjs-source"
import exampleQuickjsHostSource from "example-quickjs-host-source"
const QuickJS = await import("quickjs-for-quickjs").then((mod) => mod.getQuickJS())
const exportQuickjsSource = `export default ${JSON.stringify(quickjsSource)}`
const exportExampleQuickjsHostSource = `export default ${JSON.stringify(exampleQuickjsHostSource)}`

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
  context.newFunction("random", () => context.newNumber(random())),
)

const codeToEval =
  random() > 0.5 ? `export const result = ['hello', 'world'].join(' ')` : exampleQuickjsHostSource
const promise = context.resolvePromise(context.evalCode(codeToEval).unwrap())
context.runtime.executePendingJobs()
export const result = "hello " + context.dump(await promise)
