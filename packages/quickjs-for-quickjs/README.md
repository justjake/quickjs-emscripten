# quickjs-for-quickjs

![yo dawg i herd u like quickjs so i put quickjs in ur quickjs so u can eval while u eval](./yodawg.jpg)

This package is a build of [quickjs-emscripten](https://github.com/justjake/quickjs-emscripten) that can run inside QuickJS or any other JavaScript runtime without WebAssembly support. The QuickJS C library is compiled to Asm.js, and then bundled together with the quickjs-emscripten JavaScript wrapper into a single standalone file with no external dependencies.

`quickjs-for-quickjs` has been tested in the following configurations:

- ✅ NodeJS -> quickjs-for-quickjs
- ✅ NodeJS -> quickjs-emscripten RELEASE_SYNC -> quickjs-for-quickjs
- ❌ NodeJS -> quickjs-emscripten RELEASE_SYNC -> quickjs-for-quickjs -> quickjs-for-quickjs (This hits stack overflow in QuickJS. It could work with a larger stack size for the outer QuickJS instance)

## Why?

For fun!

This could have practical applications, like if you're a user writing a plugin for a 3rd-party system using quickjs-emscripten for scripting, and you as a plugin author also want your plugin to have its own plugin ecosystem.

## Usage

For a more detailed example, see [the "example" directory][example] in the repo.

[example]: https://github.com/justjake/quickjs-emscripte/tree/main/packages/quickjs-for-quickjs/example

```javascript
// nodejs-host.mjs
import fs from "node:fs/promises"
import module from "node:module"
import { getQuickJS, setUpContext } from "quickjs-for-quickjs"

// get quickjs source code
const require = module.createRequire(import.meta.url)
const quickjsSource = await fs.readFile(require.resolve("quickjs-for-quickjs"), "utf8")

// create the host QuickJS context
const QuickJS = await getQuickJS()
const context = QuickJS.createContext()

// inject console.log, which is required for quickjs-for-quickjs to work
setUpContext(context)

// allow the host QuickJS to import quickjs-for-quickjs module
context.runtime.setModuleLoader((name) => {
  if (name === "quickjs-for-quickjs") {
    return quickjsSource
  }
  throw new Error(`Module not found: ${name}`)
})

const quickjsHost = `
// import and create inner QuickJS guest context
import { getQuickJS } from "quickjs-for-quickjs"
const context = await getQuickJS().then(mod => mod.createContext())

// eval some code in the inner context
const innerResult = context.evalCode('1 + 2', "quickjs-guest.mjs").unwrap()

// export the result
export const result = innerResult.consume(context.dump)
`

// eval the quickjs host
const handle = context.evalCode(quickjsHost, "quickjs-host.mjs").unwrap()

// get the result
context.runtime.executePendingJob()
const result = context.unwrapResult(context.getPromiseState(handle))

console.log(result.consume(context.dump))
```
