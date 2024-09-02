import { getQuickJS, setUpContext } from "quickjs-for-quickjs"
import quickjsSource from "quickjs-for-quickjs-source"
import exampleQuickjsHostSource from "example-quickjs-host-source"

console.log(`${console.depth}: started`)
const QuickJS = await getQuickJS()

const exportQuickjsSource = `export default ${JSON.stringify(quickjsSource)}`
const exportExampleQuickjsHostSource = `export default ${JSON.stringify(exampleQuickjsHostSource)}`

console.log(`${console.depth}: imported`)

const context = setUpContext(QuickJS.newContext())
context.runtime.setModuleLoader((name) => {
  console.log(`${console.depth}: import ${name}`)
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
  "done",
  context.newFunction("random", () => context.newNumber(done())),
)

console.log(`${console.depth}: evaluating`)

const codeToEval = done()
  ? `export const result = ['hello', 'world', console.depth].join(' ')`
  : exampleQuickjsHostSource
const promise = context.resolvePromise(context.evalCode(codeToEval).unwrap())

console.log(`${console.depth}: executing pending jobs`)
context.runtime.executePendingJobs()

console.log("awaiting")
const promised = (await promise).unwrap()
console.log(`${console.depth}:`, { promised, type: context.typeof(promised) })

export const result = "hello " + context.dump(context.getProp(promised, "result"))

console.log(`${console.depth}: done`)
