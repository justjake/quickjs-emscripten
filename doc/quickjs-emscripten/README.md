[**quickjs-emscripten**](../README.md)

***

[quickjs-emscripten](../packages.md) / quickjs-emscripten

# quickjs-emscripten

Javascript/Typescript bindings for QuickJS, a modern Javascript interpreter,
compiled to WebAssembly.

- Safely evaluate untrusted Javascript (supports [most of ES2023](https://test262.fyi/#|qjs,qjs_ng)).
- Create and manipulate values inside the QuickJS runtime ([more][values]).
- Expose host functions to the QuickJS runtime ([more][functions]).
- Execute synchronous code that uses asynchronous functions, with [asyncify][asyncify].
- Supports browsers, NodeJS, Deno, Bun, Cloudflare Workers, QuickJS (via [quickjs-for-quickjs][]).

[Github] | [NPM] | [API Documentation][api] | [Variants][core] | [Examples][tests]

```typescript
import { getQuickJS } from "quickjs-emscripten"

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

main()
```

[github]: https://github.com/justjake/quickjs-emscripten
[npm]: https://www.npmjs.com/package/quickjs-emscripten
[api]: https://github.com/justjake/quickjs-emscripten/blob/main/doc/packages.md
[tests]: https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten/src/quickjs.test.ts
[values]: #interfacing-with-the-interpreter
[asyncify]: #asyncify
[functions]: #exposing-apis
[quickjs-for-quickjs]: https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-for-quickjs

- [quickjs-emscripten](#quickjs-emscripten)
  - [Usage](#usage)
    - [Safely evaluate Javascript code](#safely-evaluate-javascript-code)
    - [Interfacing with the interpreter](#interfacing-with-the-interpreter)
      - [Runtime](#runtime)
      - [EcmaScript Module Exports](#ecmascript-module-exports)
    - [Memory Management](#memory-management)
      - [`using` statement](#using-statement)
      - [Scope](#scope)
      - [`Lifetime.consume(fn)`](#lifetimeconsumefn)
    - [Exposing APIs](#exposing-apis)
      - [Promises](#promises)
        - [context.getPromiseState(handle)](#contextgetpromisestatehandle)
        - [context.resolvePromise(handle)](#contextresolvepromisehandle)
      - [Asyncify](#asyncify)
        - [Async module loader](#async-module-loader)
        - [Async on host, sync in QuickJS](#async-on-host-sync-in-quickjs)
    - [Testing your code](#testing-your-code)
    - [Packaging](#packaging)
      - [Reducing package size](#reducing-package-size)
      - [WebAssembly loading](#webassembly-loading)
      - [quickjs-ng](#quickjs-ng)
      - [Using in the browser without a build step](#using-in-the-browser-without-a-build-step)
    - [Debugging](#debugging)
    - [Supported Platforms](#supported-platforms)
    - [More Documentation](#more-documentation)
  - [Background](#background)
  - [Status \& Roadmap](#status--roadmap)
  - [Related](#related)
  - [Developing](#developing)
    - [The C parts](#the-c-parts)
    - [The Typescript parts](#the-typescript-parts)
    - [Yarn updates](#yarn-updates)

## Usage

Install from `npm`: `npm install --save quickjs-emscripten` or `yarn add quickjs-emscripten`.

The root entrypoint of this library is the `getQuickJS` function, which returns
a promise that resolves to a [QuickJSWASMModule](./doc/quickjs-emscripten/classes/QuickJSWASMModule.md) when
the QuickJS WASM module is ready.

Once `getQuickJS` has been awaited at least once, you also can use the `getQuickJSSync`
function to directly access the singleton in your synchronous code.

### Safely evaluate Javascript code

See [QuickJSWASMModule.evalCode](https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten/classes/QuickJSWASMModule.md#evalcode)

```typescript
import { getQuickJS, shouldInterruptAfterDeadline } from "quickjs-emscripten"

getQuickJS().then((QuickJS) => {
  const result = QuickJS.evalCode("1 + 1", {
    shouldInterrupt: shouldInterruptAfterDeadline(Date.now() + 1000),
    memoryLimitBytes: 1024 * 1024,
  })
  console.log(result)
})
```

### Interfacing with the interpreter

You can use [QuickJSContext](https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten/classes/QuickJSContext.md)
to build a scripting environment by modifying globals and exposing functions
into the QuickJS interpreter.

Each `QuickJSContext` instance has its own environment -- globals, built-in
classes -- and actions from one context won't leak into other contexts or
runtimes (with one exception, see [Asyncify][asyncify]).

Every context is created inside a
[QuickJSRuntime](https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten/classes/QuickJSRuntime.md).
A runtime represents a Javascript heap, and you can even share values between
contexts in the same runtime.

```typescript
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
```

When you create a context from a top-level API like in the example above,
instead of by calling `runtime.newContext()`, a runtime is automatically created
for the lifetime of the context, and disposed of when you dispose the context.

#### Runtime

The runtime has APIs for CPU and memory limits that apply to all contexts within
the runtime in aggregate. You can also use the runtime to configure EcmaScript
module loading.

```typescript
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
runtime.setModuleLoader((moduleName) => `export default '${moduleName}'`)
const context = runtime.newContext()
const ok = context.evalCode(`
import fooName from './foo.js'
globalThis.result = fooName
`)
context.unwrapResult(ok).dispose()
// logs "foo.js"
console.log(context.getProp(context.global, "result").consume(context.dump))
context.dispose()
runtime.dispose()
```

#### EcmaScript Module Exports

When you evaluate code as an ES Module, the result will be a handle to the
module's exports, or a handle to a promise that resolves to the module's
exports if the module depends on a top-level await.

```typescript
const context = QuickJS.newContext()
const result = context.evalCode(
  `
  export const name = 'Jake'
  export const favoriteBean = 'wax bean'
  export default 'potato'
`,
  "jake.js",
  { type: "module" },
)
const moduleExports = context.unwrapResult(result)
console.log(context.dump(moduleExports))
// -> { name: 'Jake', favoriteBean: 'wax bean', default: 'potato' }
moduleExports.dispose()
```

### Memory Management

Many methods in this library return handles to memory allocated inside the
WebAssembly heap. These types cannot be garbage-collected as usual in
Javascript. Instead, you must manually manage their memory by calling a
`.dispose()` method to free the underlying resources. Once a handle has been
disposed, it cannot be used anymore. Note that in the example above, we call
`.dispose()` on each handle once it is no longer needed.

Calling `QuickJSContext.dispose()` will throw a RuntimeError if you've forgotten to
dispose any handles associated with that VM, so it's good practice to create a
new VM instance for each of your tests, and to call `vm.dispose()` at the end
of every test.

```typescript
const vm = QuickJS.newContext()
const numberHandle = vm.newNumber(42)
// Note: numberHandle not disposed, so it leaks memory.
vm.dispose()
// throws RuntimeError: abort(Assertion failed: list_empty(&rt->gc_obj_list), at: quickjs/quickjs.c,1963,JS_FreeRuntime)
```

Here are some strategies to reduce the toil of calling `.dispose()` on each
handle you create:

#### `using` statement

The `using` statement is a Stage 3 (as of 2023-12-29) proposal for Javascript that declares a constant variable and automatically calls the `[Symbol.dispose]()` method of an object when it goes out of scope. Read more [in this Typescript release announcement][using]. Here's the "Interfacing with the interpreter" example re-written using `using`:

```typescript
using vm = QuickJS.newContext()
let state = 0

// The block here isn't needed for correctness, but it shows
// how to get a tighter bound on the lifetime of `fnHandle`.
{
  using fnHandle = vm.newFunction("nextId", () => {
    return vm.newNumber(++state)
  })

  vm.setProp(vm.global, "nextId", fnHandle)
  // fnHandle.dispose() is called automatically when the block exits
}

using nextId = vm.unwrapResult(vm.evalCode(`nextId(); nextId(); nextId()`))
console.log("vm result:", vm.getNumber(nextId), "native state:", state)
// nextId.dispose() is called automatically when the block exits
// vm.dispose() is called automatically when the block exits
```

[using]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html#using-declarations-and-explicit-resource-management

#### Scope

A
[`Scope`](https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten/classes/Scope.md#class-scope)
instance manages a set of disposables and calls their `.dispose()`
method in the reverse order in which they're added to the scope. Here's the
"Interfacing with the interpreter" example re-written using `Scope`:

```typescript
Scope.withScope((scope) => {
  const vm = scope.manage(QuickJS.newContext())
  let state = 0

  const fnHandle = scope.manage(
    vm.newFunction("nextId", () => {
      return vm.newNumber(++state)
    }),
  )

  vm.setProp(vm.global, "nextId", fnHandle)

  const nextId = scope.manage(vm.unwrapResult(vm.evalCode(`nextId(); nextId(); nextId()`)))
  console.log("vm result:", vm.getNumber(nextId), "native state:", state)

  // When the withScope block exits, it calls scope.dispose(), which in turn calls
  // the .dispose() methods of all the disposables managed by the scope.
})
```

You can also create `Scope` instances with `new Scope()` if you want to manage
calling `scope.dispose()` yourself.

#### `Lifetime.consume(fn)`

[`Lifetime.consume`](https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten/classes/lifetime.md#consume)
is sugar for the common pattern of using a handle and then
immediately disposing of it. `Lifetime.consume` takes a `map` function that
produces a result of any type. The `map` fuction is called with the handle,
then the handle is disposed, then the result is returned.

Here's the "Interfacing with interpreter" example re-written using `.consume()`:

```typescript
const vm = QuickJS.newContext()
let state = 0

vm.newFunction("nextId", () => {
  return vm.newNumber(++state)
}).consume((fnHandle) => vm.setProp(vm.global, "nextId", fnHandle))

vm.unwrapResult(vm.evalCode(`nextId(); nextId(); nextId()`)).consume((nextId) =>
  console.log("vm result:", vm.getNumber(nextId), "native state:", state),
)

vm.dispose()
```

Generally working with `Scope` leads to more straight-forward code, but
`Lifetime.consume` can be handy sugar as part of a method call chain.

### Exposing APIs

To add APIs inside the QuickJS environment, you'll need to [create objects][newObject] to
define the shape of your API, and [add properties][setProp] and [functions][newFunction] to those objects
to allow code inside QuickJS to call code on the host.
The [newFunction][] documentation covers writing functions in detail.

By default, no host functionality is exposed to code running inside QuickJS.

```typescript
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
```

[newObject]: https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten/classes/QuickJSContext.md#newobject
[newFunction]: https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten/classes/QuickJSContext.md#newfunction
[setProp]: https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten/classes/QuickJSContext.md#setprop

#### Promises

To expose an asynchronous function that _returns a promise_ to callers within
QuickJS, your function can return the handle of a `QuickJSDeferredPromise`
created via `context.newPromise()`.

When you resolve a `QuickJSDeferredPromise` -- and generally whenever async
behavior completes for the VM -- pending listeners inside QuickJS may not
execute immediately. Your code needs to explicitly call
`runtime.executePendingJobs()` to resume execution inside QuickJS. This API
gives your code maximum control to _schedule_ when QuickJS will block the host's
event loop by resuming execution.

To work with QuickJS handles that contain a promise inside the environment,
there are two options:

##### context.getPromiseState(handle)

You can synchronously peek into a QuickJS promise handle and get its state
without introducing asynchronous host code, described by the type [JSPromiseState][]:

```typescript
type JSPromiseState =
  | { type: "pending"; error: Error }
  | { type: "fulfilled"; value: QuickJSHandle; notAPromise?: boolean }
  | { type: "rejected"; error: QuickJSHandle }
```

The result conforms to the `SuccessOrFail` type returned by `context.evalCode`, so you can use `context.unwrapResult(context.getPromiseState(promiseHandle))` to assert a promise is settled successfully and retrieve its value. Calling `context.unwrapResult` on a pending or rejected promise will throw an error.

```typescript
const promiseHandle = context.evalCode(`Promise.resolve(42)`)
const resultHandle = context.unwrapResult(context.getPromiseState(promiseHandle))
context.getNumber(resultHandle) === 42 // true
resultHandle.dispose()
promiseHandle.dispose()
```

[JSPromiseState]: https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten/exports.md#jspromisestate

##### context.resolvePromise(handle)

You can convert the QuickJSHandle into a native promise using
`context.resolvePromise()`. Take care with this API to avoid 'deadlocks' where
the host awaits a guest promise, but the guest cannot make progress until the
host calls `runtime.executePendingJobs()`. The simplest way to avoid this kind
of deadlock is to always schedule `executePendingJobs` after any promise is
settled.

```typescript
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
```

#### Asyncify

Sometimes, we want to create a function that's synchronous from the perspective
of QuickJS, but prefer to implement that function _asynchronously_ in your host
code. The most obvious use-case is for EcmaScript module loading. The underlying
QuickJS C library expects the module loader function to return synchronously,
but loading data synchronously in the browser or server is somewhere between "a
bad idea" and "impossible". QuickJS also doesn't expose an API to "pause" the
execution of a runtime, and adding such an API is tricky due to the VM's
implementation.

As a work-around, we provide an alternate build of QuickJS processed by
Emscripten/Binaryen's [ASYNCIFY](https://emscripten.org/docs/porting/asyncify.html)
compiler transform. Here's how Emscripten's documentation describes Asyncify:

> Asyncify lets synchronous C or C++ code interact with asynchronous \[host] JavaScript. This allows things like:
>
> - A synchronous call in C that yields to the event loop, which allows browser events to be handled.
> - A synchronous call in C that waits for an asynchronous operation in \[host] JS to complete.
>
> Asyncify automatically transforms ... code into a form that can be paused and
> resumed ..., so that it is asynchronous (hence the name “Asyncify”) even though
> \[it is written] in a normal synchronous way.

This means we can suspend an _entire WebAssembly module_ (which could contain
multiple runtimes and contexts) while our host Javascript loads data
asynchronously, and then resume execution once the data load completes. This is
a very handy superpower, but it comes with a couple of major limitations:

1. _An asyncified WebAssembly module can only suspend to wait for a single
   asynchronous call at a time_. You may call back into a suspended WebAssembly
   module eg. to create a QuickJS value to return a result, but the system will
   crash if this call tries to suspend again. Take a look at Emscripten's documentation
   on [reentrancy](https://emscripten.org/docs/porting/asyncify.html#reentrancy).

2. _Asyncified code is bigger and runs slower_. The asyncified build of
   Quickjs-emscripten library is 1M, 2x larger than the 500K of the default
   version. There may be room for further
   [optimization](https://emscripten.org/docs/porting/asyncify.html#optimizing)
   Of our build in the future.

To use asyncify features, use the following functions:

- [newAsyncRuntime][]: create a runtime inside a new WebAssembly module.
- [newAsyncContext][]: create runtime and context together inside a new
  WebAssembly module.
- [newQuickJSAsyncWASMModule][]: create an empty WebAssembly module.

[newasyncruntime]: https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten/exports.md#newasyncruntime
[newasynccontext]: https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten/exports.md#newasynccontext
[newquickjsasyncwasmmodule]: https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten/exports.md#newquickjsasyncwasmmodule

These functions are asynchronous because they always create a new underlying
WebAssembly module so that each instance can suspend and resume independently,
and instantiating a WebAssembly module is an async operation. This also adds
substantial overhead compared to creating a runtime or context inside an
existing module; if you only need to wait for a single async action at a time,
you can create a single top-level module and create runtimes or contexts inside
of it.

##### Async module loader

Here's an example of valuating a script that loads React asynchronously as an ES
module. In our example, we're loading from the filesystem for reproducibility,
but you can use this technique to load using `fetch`.

```typescript
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
```

##### Async on host, sync in QuickJS

Here's an example of turning an async function into a sync function inside the
VM.

```typescript
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
// Not a promise! Sync! vvvvvvvvvvvvvvvvvvvv 
const data = JSON.parse(readFile('data.json'))
data.map(x => x.toUpperCase()).join(' ')
`)
const upperCaseData = context.unwrapResult(result).consume(context.getString)
console.log(upperCaseData) // 'VERY USEFUL DATA'
```

### Testing your code

This library is complicated to use, so please consider automated testing your
implementation. We highly writing your test suite to run with both the "release"
build variant of quickjs-emscripten, and also the [DEBUG_SYNC] build variant.
The debug sync build variant has extra instrumentation code for detecting memory
leaks.

The class [TestQuickJSWASMModule] exposes the memory leak detection API,
although this API is only accurate when using `DEBUG_SYNC` variant. You can also
enable [debug logging](#debugging) to help diagnose failures.

```typescript
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
```

For more testing examples, please explore the typescript source of [quickjs-emscripten][ts] repository.

[ts]: https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten/src/
[debug_sync]: https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten/exports.md#debug_sync
[testquickjswasmmodule]: https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten/classes/TestQuickJSWASMModule.md

### Packaging

The main `quickjs-emscripten` package includes several build variants of the WebAssembly module:

- `RELEASE...` build variants should be used in production. They offer better performance and smaller file size compared to `DEBUG...` build variants.
  - `RELEASE_SYNC`: This is the default variant used when you don't explicitly provide one. It offers the fastest performance and smallest file size.
  - `RELEASE_ASYNC`: The default variant if you need [asyncify][] magic, which comes at a performance cost. See the asyncify docs for details.
- `DEBUG...` build variants can be helpful during development and testing. They include source maps and assertions for catching bugs in your code. We recommend running your tests with _both_ a debug build variant and the release build variant you'll use in production.
  - `DEBUG_SYNC`: Instrumented to detect memory leaks, in addition to assertions and source maps.
  - `DEBUG_ASYNC`: An [asyncify][] variant with source maps.

To use a variant, call `newQuickJSWASMModule` or `newQuickJSAsyncWASMModule` with the variant object. These functions return a promise that resolves to a [QuickJSWASMModule](./doc/quickjs-emscripten/classes/QuickJSWASMModule.md), the same as `getQuickJS`.

```typescript
import {
  newQuickJSWASMModule,
  newQuickJSAsyncWASMModule,
  RELEASE_SYNC,
  DEBUG_SYNC,
  RELEASE_ASYNC,
  DEBUG_ASYNC,
} from "quickjs-emscripten"

const QuickJSReleaseSync = await newQuickJSWASMModule(RELEASE_SYNC)
const QuickJSDebugSync = await newQuickJSWASMModule(DEBUG_SYNC)
const QuickJSReleaseAsync = await newQuickJSAsyncWASMModule(RELEASE_ASYNC)
const QuickJSDebugAsync = await newQuickJSAsyncWASMModule(DEBUG_ASYNC)

for (const quickjs of [
  QuickJSReleaseSync,
  QuickJSDebugSync,
  QuickJSReleaseAsync,
  QuickJSDebugAsync,
]) {
  const vm = quickjs.newContext()
  const result = vm.unwrapResult(vm.evalCode("1 + 1")).consume(vm.getNumber)
  console.log(result)
  vm.dispose()
  quickjs.dispose()
}
```

#### Reducing package size

Including 4 different copies of the WebAssembly module in the main package gives it an install size of [about 9.04mb](https://packagephobia.com/result?p=quickjs-emscripten). If you're building a CLI package or library of your own, or otherwise don't need to include 4 different variants in your `node_modules`, you can switch to the `quickjs-emscripten-core` package, which contains only the Javascript code for this library, and install one (or more) variants a-la-carte as separate packages.

The most minimal setup would be to install `quickjs-emscripten-core` and `@jitl/quickjs-wasmfile-release-sync` (1.3mb total):

```bash
yarn add quickjs-emscripten-core @jitl/quickjs-wasmfile-release-sync
du -h node_modules
# 640K    node_modules/@jitl/quickjs-wasmfile-release-sync
#  80K    node_modules/@jitl/quickjs-ffi-types
# 588K    node_modules/quickjs-emscripten-core
# 1.3M    node_modules
```

Then, you can use quickjs-emscripten-core's `newQuickJSWASMModuleFromVariant` to create a QuickJS module (see [the minimal example][minimal]):

```typescript
// src/quickjs.mjs
import { newQuickJSWASMModuleFromVariant } from "quickjs-emscripten-core"
import RELEASE_SYNC from "@jitl/quickjs-wasmfile-release-sync"
export const QuickJS = await newQuickJSWASMModuleFromVariant(RELEASE_SYNC)

// src/app.mjs
import { QuickJS } from "./quickjs.mjs"
console.log(QuickJS.evalCode("1 + 1"))
```

See the [documentation of quickjs-emscripten-core][core] for more details and the list of variant packages.

[core]: https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten-core/README.md

#### WebAssembly loading

To run QuickJS, we need to load a WebAssembly module into the host Javascript runtime's memory (usually as an ArrayBuffer or TypedArray) and [compile it](https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript_interface/instantiate_static) to a [WebAssembly.Module](https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript_interface/Module). This means we need to find the file path or URI of the WebAssembly module, and then read it using an API like `fetch` (browser) or `fs.readFile` (NodeJS). `quickjs-emscripten` tries to handle this automatically using patterns like `new URL('./local-path', import.meta.url)` that work in the browser or are handled automatically by bundlers, or `__dirname` in NodeJS, but you may need to configure this manually if these don't work in your environment, or you want more control about how the WebAssembly module is loaded.

To customize the loading of an existing variant, create a new variant with your loading settings using `newVariant`, passing [CustomizeVariantOptions][newVariant]. For example, you need to customize loading in Cloudflare Workers (see [the full example][cloudflare]).

```typescript
import { newQuickJSWASMModule, DEBUG_SYNC as baseVariant, newVariant } from "quickjs-emscripten"
import cloudflareWasmModule from "./DEBUG_SYNC.wasm"
import cloudflareWasmModuleSourceMap from "./DEBUG_SYNC.wasm.map.txt"

/**
 * We need to make a new variant that directly passes the imported WebAssembly.Module
 * to Emscripten. Normally we'd load the wasm file as bytes from a URL, but
 * that's forbidden in Cloudflare workers.
 */
const cloudflareVariant = newVariant(baseVariant, {
  wasmModule: cloudflareWasmModule,
  wasmSourceMapData: cloudflareWasmModuleSourceMap,
})
```

[newVariant]: https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten/interfaces/CustomizeVariantOptions.md

#### quickjs-ng

[quickjs-ng/quickjs](https://github.com/quickjs-ng/quickjs) (aka quickjs-ng) is a fork of the original [bellard/quickjs](https://github.com/quickjs-ng/quickjs) under active development. It implements more EcmaScript standards and removes some of quickjs's custom language features like BigFloat.

There are several variants of quickjs-ng available, and quickjs-emscripten may switch to using quickjs-ng by default in the future. See [the list of variants][core].

#### Using in the browser without a build step

You can use quickjs-emscripten directly from an HTML file in two ways:

1. Import it in an ES Module script tag

   ```html
   <!doctype html>
   <!-- Import from a ES Module CDN -->
   <script type="module">
     import { getQuickJS } from "https://esm.sh/quickjs-emscripten@0.25.0"
     const QuickJS = await getQuickJS()
     console.log(QuickJS.evalCode("1+1"))
   </script>
   ```

1. In edge cases, you might want to use the IIFE build which provides QuickJS as the global `QJS`. You should probably use the ES module though, any recent browser supports it.

   ```html
   <!doctype html>
   <!-- Add a script tag to load the library as the QJS global -->
   <script
     src="https://cdn.jsdelivr.net/npm/quickjs-emscripten@0.25.0/dist/index.global.js"
     type="text/javascript"
   ></script>
   <!-- Then use the QJS global in a script tag -->
   <script type="text/javascript">
     QJS.getQuickJS().then((QuickJS) => {
       console.log(QuickJS.evalCode("1+1"))
     })
   </script>
   ```

### Debugging

Debug logging can be enabled globally, or for specific runtimes. You need to use a DEBUG build variant of the WebAssembly module to see debug log messages from the C part of this library.

```typescript
import { newQuickJSWASMModule, DEBUG_SYNC } from "quickjs-emscripten"

const QuickJS = await newQuickJSWASMModule(DEBUG_SYNC)
```

With quickjs-emscripten-core:

```typescript
import { newQuickJSWASMModuleFromVariant } from "quickjs-emscripten-core"
import DEBUG_SYNC from "@jitl/quickjs-wasmfile-debug-sync"

const QuickJS = await newQuickJSWASMModuleFromVariant(DEBUG_SYNC)
```

To enable debug logging globally, call [setDebugMode][setDebugMode]. This affects global Javascript parts of the library, like the module loader and asyncify internals, and is inherited by runtimes created after the call.

```typescript
import { setDebugMode } from "quickjs-emscripten"

setDebugMode(true)
```

With quickjs-emscripten-core:

```typescript
import { setDebugMode } from "quickjs-emscripten-core"

setDebugMode(true)
```

To enable debug logging for a specific runtime, call [setDebugModeRt][setDebugModeRt]. This affects only the runtime and its associated contexts.

```typescript
const runtime = QuickJS.newRuntime()
runtime.setDebugMode(true)

const context = QuickJS.newContext()
context.runtime.setDebugMode(true)
```

[setDebugMode]: doc/quickjs-emscripten/exports.md#setdebugmode
[setDebugModeRt]: https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten-core/classes/QuickJSRuntime.md#setdebugmode

### Supported Platforms

`quickjs-emscripten` and related packages should work in any environment that supports ES2020.

- Browsers: we estimate support for the following browser versions. See the [global-iife][iife] and [esmodule][esm-html] HTML examples.
  - Chrome 63+
  - Edge 79+
  - Safari 11.1+
  - Firefox 58+
- NodeJS: requires v16.0.0 or later for WebAssembly compatibility. Tested with node@18. See the [node-typescript][tsx-example] and [node-minimal][minimal] examples.
- Typescript: tested with typescript@4.5.5 and typescript@5.3.3. See the [node-typescript example][tsx-example].
- Vite: tested with vite@5.0.10. See the [Vite/Vue example][vite].
- Create react app: tested with react-scripts@5.0.1. See the [create-react-app example][cra].
- Webpack: tested with webpack@5.89.0 via create-react-app.
- Cloudflare Workers: tested with wrangler@3.22.1. See the [Cloudflare Workers example][cloudflare].
- Deno: tested with deno 1.39.1. See the [Deno example][deno].

[iife]: https://github.com/justjake/quickjs-emscripten/blob/main/examples/global-iife.html
[esm-html]: https://github.com/justjake/quickjs-emscripten/blob/main/examples/esmodule.html
[deno]: https://github.com/justjake/quickjs-emscripten/blob/main/examples/deno
[vite]: https://github.com/justjake/quickjs-emscripten/blob/main/examples/vite-vue
[cra]: https://github.com/justjake/quickjs-emscripten/blob/main/examples/create-react-app
[cloudflare]: https://github.com/justjake/quickjs-emscripten/blob/main/examples/cloudflare-workers
[tsx-example]: https://github.com/justjake/quickjs-emscripten/blob/main/examples/node-typescript
[minimal]: https://github.com/justjake/quickjs-emscripten/blob/main/examples/node-minimal

### More Documentation

[Github] | [NPM] | [API Documentation][api] | [Variants][core] | [Examples][tests]

## Background

This was inspired by seeing https://github.com/maple3142/duktape-eval
[on Hacker News](https://news.ycombinator.com/item?id=21946565) and Figma's
blogposts about using building a Javascript plugin runtime:

- [How Figma built the Figma plugin system](https://www.figma.com/blog/how-we-built-the-figma-plugin-system/): Describes the LowLevelJavascriptVm interface.
- [An update on plugin security](https://www.figma.com/blog/an-update-on-plugin-security/): Figma switches to QuickJS.

## Status & Roadmap

**Stability**: Because the version number of this project is below `1.0.0`,
\*expect occasional breaking API changes.

**Security**: This project makes every effort to be secure, but has not been
audited. Please use with care in production settings.

**Roadmap**: I work on this project in my free time, for fun. Here's I'm
thinking comes next. Last updated 2022-03-18.

1. Further work on module loading APIs:

   - Create modules via Javascript, instead of source text.
   - Scan source text for imports, for ahead of time or concurrent loading.
     (This is possible with third-party tools, so lower priority.)

2. Higher-level tools for reading QuickJS values:

   - Type guard functions: `context.isArray(handle)`, `context.isPromise(handle)`, etc.
   - Iteration utilities: `context.getIterable(handle)`, `context.iterateObjectEntries(handle)`.
     This better supports user-level code to deserialize complex handle objects.

3. Higher-level tools for creating QuickJS values:

   - Devise a way to avoid needing to mess around with handles when setting up
     the environment.
   - Consider integrating
     [quickjs-emscripten-sync](https://github.com/reearth/quickjs-emscripten-sync)
     for automatic translation.
   - Consider class-based or interface-type-based marshalling.

4. SQLite integration.

## Related

- Duktape wrapped in Wasm: https://github.com/maple3142/duktape-eval/blob/main/src/Makefile
- QuickJS wrapped in C++: https://github.com/ftk/quickjspp

## Developing

This library is implemented in two languages: C (compiled to WASM with
Emscripten), and Typescript.

You will need `node`, `yarn`, `make`, and `emscripten` to build this project.

### The C parts

The ./c directory contains C code that wraps the QuickJS C library (in ./quickjs).
Public functions (those starting with `QTS_`) in ./c/interface.c are
automatically exported to native code (via a generated header) and to
Typescript (via a generated FFI class). See ./generate.ts for how this works.

The C code builds with `emscripten` (using `emcc`), to produce WebAssembly.
The version of Emscripten used by the project is defined in templates/Variant.mk.

- On ARM64, you should install `emscripten` on your machine. For example on macOS, `brew install emscripten`.
- If _the correct version of emcc_ is not in your PATH, compilation falls back to using Docker.
  On ARM64, this is 10-50x slower than native compilation, but it's just fine on x64.

We produce multiple build variants of the C code compiled to WebAssembly using a
template script the ./packages directory. Each build variant uses its own copy of a Makefile
to build the C code. The Makefile is generated from a template in ./templates/Variant.mk.

Related NPM scripts:

- `yarn vendor:update` updates vendor/quickjs and vendor/quickjs-ng to the latest versions on Github.
- `yarn build:codegen` updates the ./packages from the template script `./prepareVariants.ts` and Variant.mk.
- `yarn build:packages` builds the variant packages in parallel.

### The Typescript parts

The Javascript/Typescript code is also organized into several NPM packages in ./packages:

- ./packages/quickjs-ffi-types: Low-level types that define the FFI interface to the C code.
  Each variant exposes an API conforming to these types that's consumed by the higher-level library.
- ./packages/quickjs-emscripten-core: The higher-level Typescript that implements the user-facing abstractions of the library.
  This package doesn't link directly to the WebAssembly/C code; callers must provide a build variant.
- ./packages/quicks-emscripten: The main entrypoint of the library, which provides the `getQuickJS` function.
  This package combines quickjs-emscripten-core with platform-appropriate WebAssembly/C code.

Related NPM scripts:

- `yarn check` runs all available checks (build, format, tests, etc).
- `yarn build` builds all the packages and generates the docs.
- `yarn test` runs the tests for all packages.
  - `yarn test:fast` runs the tests using only fast build variants.
- `yarn doc` generates the docs into `./doc`.
  - `yarn doc:serve` previews the current `./doc` in a browser.
- `yarn prettier` formats the repo.

### Yarn updates

Just run `yarn set version from sources` to upgrade the Yarn release.

## Namespaces

- [errors](namespaces/errors/README.md)

## Classes

- [DisposableFail](classes/DisposableFail.md)
- [DisposableSuccess](classes/DisposableSuccess.md)
- [Lifetime](classes/Lifetime.md)
- [QuickJSAsyncContext](classes/QuickJSAsyncContext.md)
- [QuickJSAsyncRuntime](classes/QuickJSAsyncRuntime.md)
- [QuickJSAsyncWASMModule](classes/QuickJSAsyncWASMModule.md)
- [QuickJSContext](classes/QuickJSContext.md)
- [QuickJSDeferredPromise](classes/QuickJSDeferredPromise.md)
- [QuickJSRuntime](classes/QuickJSRuntime.md)
- [QuickJSWASMModule](classes/QuickJSWASMModule.md)
- [Scope](classes/Scope.md)
- [StaticLifetime](classes/StaticLifetime.md)
- [TestQuickJSWASMModule](classes/TestQuickJSWASMModule.md)
- [UsingDisposable](classes/UsingDisposable.md)
- [WeakLifetime](classes/WeakLifetime.md)

## Interfaces

- [AsyncRuntimeOptions](interfaces/AsyncRuntimeOptions.md)
- [ContextEvalOptions](interfaces/ContextEvalOptions.md)
- [ContextOptions](interfaces/ContextOptions.md)
- [CustomizeVariantOptions](interfaces/CustomizeVariantOptions.md)
- [Disposable](interfaces/Disposable.md)
- [EmscriptenModule](interfaces/EmscriptenModule.md)
- [EmscriptenModuleLoader](interfaces/EmscriptenModuleLoader.md)
- [EmscriptenModuleLoaderOptions](interfaces/EmscriptenModuleLoaderOptions.md)
- [JSModuleLoader](interfaces/JSModuleLoader.md)
- [JSModuleLoaderAsync](interfaces/JSModuleLoaderAsync.md)
- [JSModuleNormalizer](interfaces/JSModuleNormalizer.md)
- [JSModuleNormalizerAsync](interfaces/JSModuleNormalizerAsync.md)
- [JSPromiseStateFulfilled](interfaces/JSPromiseStateFulfilled.md)
- [JSPromiseStatePending](interfaces/JSPromiseStatePending.md)
- [JSPromiseStateRejected](interfaces/JSPromiseStateRejected.md)
- [LowLevelJavascriptVm](interfaces/LowLevelJavascriptVm.md)
- [ModuleEvalOptions](interfaces/ModuleEvalOptions.md)
- [QuickJSAsyncEmscriptenModule](interfaces/QuickJSAsyncEmscriptenModule.md)
- [QuickJSAsyncFFI](interfaces/QuickJSAsyncFFI.md)
- [QuickJSAsyncVariant](interfaces/QuickJSAsyncVariant.md)
- [QuickJSEmscriptenModule](interfaces/QuickJSEmscriptenModule.md)
- [QuickJSFFI](interfaces/QuickJSFFI.md)
- [QuickJSSyncVariant](interfaces/QuickJSSyncVariant.md)
- [RuntimeOptions](interfaces/RuntimeOptions.md)
- [RuntimeOptionsBase](interfaces/RuntimeOptionsBase.md)
- [SourceMapData](interfaces/SourceMapData.md)
- [VmPropertyDescriptor](interfaces/VmPropertyDescriptor.md)

## Type Aliases

### AsyncFunctionImplementation()

> **AsyncFunctionImplementation** = (`this`, ...`args`) => `Promise`\<[`QuickJSHandle`](#quickjshandle) \| [`VmCallResult`](#vmcallresult)\<[`QuickJSHandle`](#quickjshandle)\> \| `void`\>

Defined in: [packages/quickjs-emscripten-core/src/context-asyncify.ts:18](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context-asyncify.ts#L18)

#### Parameters

##### this

[`QuickJSHandle`](#quickjshandle)

##### args

...[`QuickJSHandle`](#quickjshandle)[]

#### Returns

`Promise`\<[`QuickJSHandle`](#quickjshandle) \| [`VmCallResult`](#vmcallresult)\<[`QuickJSHandle`](#quickjshandle)\> \| `void`\>

***

### BorrowedHeapCharPointer

> **BorrowedHeapCharPointer** = `Pointer`\<`"const char"` \| `"char"` \| `"js const char"`\>

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:70

Used internally for Javascript-to-C calls that may contain strings too large
for the Emscripten stack.

***

### DisposableArray

> **DisposableArray**\<`T`\> = `T`[] & [`Disposable`](interfaces/Disposable.md)

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:354](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L354)

An `Array` that also implements [Disposable](interfaces/Disposable.md):

- Considered [Disposable#alive](interfaces/Disposable.md#alive) if any of its elements are `alive`.
- When [Disposable#dispose](interfaces/Disposable.md#dispose-1)d, it will dispose of all its elements that are `alive`.

#### Type Parameters

##### T

`T`

***

### DisposableResult

> **DisposableResult**\<`S`, `F`\> = [`DisposableSuccess`](classes/DisposableSuccess.md)\<`S`\> \| [`DisposableFail`](classes/DisposableFail.md)\<`F`\>

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:478](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L478)

#### Type Parameters

##### S

`S`

##### F

`F`

***

### EitherFFI

> **EitherFFI** = [`QuickJSFFI`](interfaces/QuickJSFFI.md) \| [`QuickJSAsyncFFI`](interfaces/QuickJSAsyncFFI.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:547

***

### EitherModule

> **EitherModule** = [`QuickJSEmscriptenModule`](interfaces/QuickJSEmscriptenModule.md) \| [`QuickJSAsyncEmscriptenModule`](interfaces/QuickJSAsyncEmscriptenModule.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:337

***

### ExecutePendingJobsResult

> **ExecutePendingJobsResult** = [`DisposableResult`](#disposableresult)\<`number`, [`QuickJSHandle`](#quickjshandle) & `object`\>

Defined in: [packages/quickjs-emscripten-core/src/runtime.ts:36](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L36)

Used as an optional for the results of executing pendingJobs.
On success, `value` contains the number of async jobs executed
by the runtime.

#### Source

***

### InterruptHandler()

> **InterruptHandler** = (`runtime`) => `boolean` \| `undefined` \| `void`

Defined in: [packages/quickjs-emscripten-core/src/runtime.ts:28](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L28)

Callback called regularly while the VM executes code.
Determines if a VM's execution should be interrupted.

#### Parameters

##### runtime

[`QuickJSRuntime`](classes/QuickJSRuntime.md)

#### Returns

`boolean` \| `undefined` \| `void`

`true` to interrupt JS execution inside the VM.

***

### Intrinsics

> **Intrinsics** = `object`

Defined in: [packages/quickjs-emscripten-core/src/types.ts:146](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L146)

Language features that can be enabled or disabled in a QuickJSContext.

#### See

[ContextOptions](interfaces/ContextOptions.md)

#### Properties

##### BaseObjects?

> `optional` **BaseObjects**: `boolean`

Defined in: [packages/quickjs-emscripten-core/src/types.ts:147](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L147)

##### BigDecimal?

> `optional` **BigDecimal**: `boolean`

Defined in: [packages/quickjs-emscripten-core/src/types.ts:160](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L160)

##### BigFloat?

> `optional` **BigFloat**: `boolean`

Defined in: [packages/quickjs-emscripten-core/src/types.ts:159](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L159)

##### BigInt?

> `optional` **BigInt**: `boolean`

Defined in: [packages/quickjs-emscripten-core/src/types.ts:158](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L158)

##### BignumExt?

> `optional` **BignumExt**: `boolean`

Defined in: [packages/quickjs-emscripten-core/src/types.ts:162](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L162)

##### Date?

> `optional` **Date**: `boolean`

Defined in: [packages/quickjs-emscripten-core/src/types.ts:148](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L148)

##### Eval?

> `optional` **Eval**: `boolean`

Defined in: [packages/quickjs-emscripten-core/src/types.ts:149](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L149)

##### JSON?

> `optional` **JSON**: `boolean`

Defined in: [packages/quickjs-emscripten-core/src/types.ts:153](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L153)

##### MapSet?

> `optional` **MapSet**: `boolean`

Defined in: [packages/quickjs-emscripten-core/src/types.ts:155](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L155)

##### OperatorOverloading?

> `optional` **OperatorOverloading**: `boolean`

Defined in: [packages/quickjs-emscripten-core/src/types.ts:161](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L161)

##### Promise?

> `optional` **Promise**: `boolean`

Defined in: [packages/quickjs-emscripten-core/src/types.ts:157](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L157)

##### Proxy?

> `optional` **Proxy**: `boolean`

Defined in: [packages/quickjs-emscripten-core/src/types.ts:154](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L154)

##### RegExp?

> `optional` **RegExp**: `boolean`

Defined in: [packages/quickjs-emscripten-core/src/types.ts:151](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L151)

##### RegExpCompiler?

> `optional` **RegExpCompiler**: `boolean`

Defined in: [packages/quickjs-emscripten-core/src/types.ts:152](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L152)

##### StringNormalize?

> `optional` **StringNormalize**: `boolean`

Defined in: [packages/quickjs-emscripten-core/src/types.ts:150](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L150)

##### TypedArrays?

> `optional` **TypedArrays**: `boolean`

Defined in: [packages/quickjs-emscripten-core/src/types.ts:156](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L156)

***

### JSBorrowedCharPointer

> **JSBorrowedCharPointer** = `Pointer`\<`"js const char"`\>

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:80

Used internally for Javascript-to-C calls that may contain strings too large
for the Emscripten stack.

***

### JSContextPointer

> **JSContextPointer** = `Pointer`\<`"JSContext"`\>

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:20

`JSContext*`.

***

### JSContextPointerPointer

> **JSContextPointerPointer** = `Pointer`\<`"JSContext"`\>

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:24

`JSContext**`. Used internally for execute pending jobs.

***

### JSModuleDefPointer

> **JSModuleDefPointer** = `Pointer`\<`"JSModuleDef"`\>

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:28

`JSModuleDef*`.

***

### JSModuleLoadFailure

> **JSModuleLoadFailure** = `Error` \| [`QuickJSHandle`](#quickjshandle)

Defined in: [packages/quickjs-emscripten-core/src/types.ts:69](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L69)

***

### JSModuleLoadResult

> **JSModuleLoadResult** = [`JSModuleLoadSuccess`](#jsmoduleloadsuccess) \| [`SuccessOrFail`](#successorfail)\<[`JSModuleLoadSuccess`](#jsmoduleloadsuccess), [`JSModuleLoadFailure`](#jsmoduleloadfailure)\>

Defined in: [packages/quickjs-emscripten-core/src/types.ts:70](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L70)

***

### JSModuleLoadSuccess

> **JSModuleLoadSuccess** = `string`

Defined in: [packages/quickjs-emscripten-core/src/types.ts:68](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L68)

***

### JSModuleNormalizeFailure

> **JSModuleNormalizeFailure** = `Error` \| [`QuickJSHandle`](#quickjshandle)

Defined in: [packages/quickjs-emscripten-core/src/types.ts:87](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L87)

***

### JSModuleNormalizeResult

> **JSModuleNormalizeResult** = [`JSModuleNormalizeSuccess`](#jsmodulenormalizesuccess) \| [`SuccessOrFail`](#successorfail)\<[`JSModuleNormalizeSuccess`](#jsmodulenormalizesuccess), [`JSModuleNormalizeFailure`](#jsmodulenormalizefailure)\>

Defined in: [packages/quickjs-emscripten-core/src/types.ts:88](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L88)

***

### JSModuleNormalizeSuccess

> **JSModuleNormalizeSuccess** = `string`

Defined in: [packages/quickjs-emscripten-core/src/types.ts:86](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L86)

***

### JSPromiseState

> **JSPromiseState** = [`JSPromiseStatePending`](interfaces/JSPromiseStatePending.md) \| [`JSPromiseStateFulfilled`](interfaces/JSPromiseStateFulfilled.md) \| [`JSPromiseStateRejected`](interfaces/JSPromiseStateRejected.md)

Defined in: [packages/quickjs-emscripten-core/src/deferred-promise.ts:11](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/deferred-promise.ts#L11)

A promise state inside QuickJS, which can be pending, fulfilled, or rejected.
You can unwrap a JSPromiseState with [QuickJSContext#unwrapResult](classes/QuickJSContext.md#unwrapresult).

***

### JSPromiseStateEnum

> **JSPromiseStateEnum** = `Brand`\<*typeof* [`JSPromiseStateEnum`](#jspromisestateenum-1)\[keyof *typeof* [`JSPromiseStateEnum`](#jspromisestateenum-1)\], `"JSPromiseStateEnum"`\>

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:149

State of a promise.

***

### JSRuntimePointer

> **JSRuntimePointer** = `Pointer`\<`"JSRuntime"`\>

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:16

`JSRuntime*`.

***

### JSValue

> **JSValue** = [`Lifetime`](classes/Lifetime.md)\<[`JSValuePointer`](#jsvaluepointer), [`JSValuePointer`](#jsvaluepointer), [`QuickJSRuntime`](classes/QuickJSRuntime.md)\>

Defined in: [packages/quickjs-emscripten-core/src/types.ts:43](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L43)

A owned QuickJSHandle that should be disposed or returned.

The QuickJS interpreter passes Javascript values between functions as
`JSValue` structs that references some internal data. Because passing
structs cross the Empscripten FFI interfaces is bothersome, we use pointers
to these structs instead.

A JSValue reference is "owned" in its scope. before exiting the scope, it
should be freed,  by calling `JS_FreeValue(ctx, js_value)`) or returned from
the scope. We extend that contract - a JSValuePointer (`JSValue*`) must also
be `free`d.

You can do so from Javascript by calling the .dispose() method.

***

### JSValueConst

> **JSValueConst** = [`Lifetime`](classes/Lifetime.md)\<[`JSValueConstPointer`](#jsvalueconstpointer), [`JSValuePointer`](#jsvaluepointer), [`QuickJSRuntime`](classes/QuickJSRuntime.md)\>

Defined in: [packages/quickjs-emscripten-core/src/types.ts:26](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L26)

A QuickJSHandle to a borrowed value that does not need to be disposed.

In QuickJS, a JSValueConst is a "borrowed" reference that isn't owned by the
current scope. That means that the current scope should not `JS_FreeValue`
it, or retain a reference to it after the scope exits, because it may be
freed by its owner.

quickjs-emscripten takes care of disposing JSValueConst references.

***

### JSValueConstPointer

> **JSValueConstPointer** = `Pointer`\<`"JSValueConst"`\>

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:38

`JSValueConst*
See [JSValueConst](#jsvalueconst) and [StaticJSValue](#staticjsvalue).

***

### JSValueConstPointerPointer

> **JSValueConstPointerPointer** = `Pointer`\<`"JSValueConst[]"`\>

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:50

Used internally for Javascript-to-C function calls.

***

### JSValuePointer

> **JSValuePointer** = `Pointer`\<`"JSValue"`\>

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:33

`JSValue*`.
See [JSValue](#jsvalue).

***

### JSValuePointerPointer

> **JSValuePointerPointer** = `Pointer`\<`"JSValue[]"`\>

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:42

Used internally for Javascript-to-C function calls.

***

### JSValuePointerPointerPointer

> **JSValuePointerPointerPointer** = `Pointer`\<`"*JSValue[]"`\>

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:46

Used internally for Javascript-to-C function calls.

***

### JSVoidPointer

> **JSVoidPointer** = `Pointer`\<`any`\>

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:84

Opaque pointer that was allocated by js_malloc.

***

### OrLoader

> **OrLoader**\<`T`\> = `T` \| () => `Promise`\<`T`\>

Defined in: [packages/quickjs-emscripten-core/src/from-variant.ts:117](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/from-variant.ts#L117)

#### Type Parameters

##### T

`T`

***

### OwnedHeapCharPointer

> **OwnedHeapCharPointer** = `Pointer`\<`"char"`\>

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:75

Used internally for Javascript-to-C calls that may contain strings too large
for the Emscripten stack.

***

### PromisedDefault

> **PromisedDefault**\<`T`\> = `T` \| `Promise`\<`T`\> \| `Promise`\<\{ `default`: `T`; \}\> \| `Promise`\<\{ `default`: \{ `default`: `T`; \}; \}\>

Defined in: [packages/quickjs-emscripten-core/src/from-variant.ts:17](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/from-variant.ts#L17)

#### Type Parameters

##### T

`T`

***

### PromiseExecutor()

> **PromiseExecutor**\<`ResolveT`, `RejectT`\> = (`resolve`, `reject`) => `void`

Defined in: [packages/quickjs-emscripten-core/src/types.ts:333](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L333)

#### Type Parameters

##### ResolveT

`ResolveT`

##### RejectT

`RejectT`

#### Parameters

##### resolve

(`value`) => `void`

##### reject

(`reason`) => `void`

#### Returns

`void`

***

### QTS\_C\_To\_HostCallbackFuncPointer

> **QTS\_C\_To\_HostCallbackFuncPointer** = `Pointer`\<`"C_To_HostCallbackFunc"`\>

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:57

Used internally for C-to-Javascript function calls.

***

### QTS\_C\_To\_HostInterruptFuncPointer

> **QTS\_C\_To\_HostInterruptFuncPointer** = `Pointer`\<`"C_To_HostInterruptFunc"`\>

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:61

Used internally for C-to-Javascript interrupt handlers.

***

### QTS\_C\_To\_HostLoadModuleFuncPointer

> **QTS\_C\_To\_HostLoadModuleFuncPointer** = `Pointer`\<`"C_To_HostLoadModuleFunc"`\>

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:65

Used internally for C-to-Javascript module loading.

***

### QuickJSHandle

> **QuickJSHandle** = [`StaticJSValue`](#staticjsvalue) \| [`JSValue`](#jsvalue) \| [`JSValueConst`](#jsvalueconst)

Defined in: [packages/quickjs-emscripten-core/src/types.ts:53](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L53)

Wraps a C pointer to a QuickJS JSValue, which represents a Javascript value inside
a QuickJS virtual machine.

Values must not be shared between QuickJSContext instances.
You must dispose of any handles you create by calling the `.dispose()` method.

***

### QuickJSPropertyKey

> **QuickJSPropertyKey** = `number` \| `string` \| [`QuickJSHandle`](#quickjshandle)

Defined in: [packages/quickjs-emscripten-core/src/context.ts:71](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/context.ts#L71)

Property key for getting or setting a property on a handle with
[QuickJSContext#getProp](classes/QuickJSContext.md#getprop), [QuickJSContext#setProp](classes/QuickJSContext.md#setprop), or [QuickJSContext#defineProp](classes/QuickJSContext.md#defineprop).

***

### QuickJSVariant

> **QuickJSVariant** = [`QuickJSSyncVariant`](interfaces/QuickJSSyncVariant.md) \| [`QuickJSAsyncVariant`](interfaces/QuickJSAsyncVariant.md)

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:546

***

### StaticJSValue

> **StaticJSValue** = [`Lifetime`](classes/Lifetime.md)\<[`JSValueConstPointer`](#jsvalueconstpointer), [`JSValueConstPointer`](#jsvalueconstpointer), [`QuickJSRuntime`](classes/QuickJSRuntime.md)\>

Defined in: [packages/quickjs-emscripten-core/src/types.ts:14](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L14)

A QuickJSHandle to a constant that will never change, and does not need to
be disposed.

***

### SuccessOrFail

> **SuccessOrFail**\<`S`, `F`\> = \{ `error?`: `undefined`; `value`: `S`; \} \| \{ `error`: `F`; \}

Defined in: [packages/quickjs-emscripten-core/src/vm-interface.ts:5](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L5)

Used as an optional.
`{ value: S } | { error: E }`.

#### Type Parameters

##### S

`S`

##### F

`F`

***

### UInt32Pointer

> **UInt32Pointer** = `Pointer`\<`"uint32_t"`\>

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:85

***

### VmCallResult

> **VmCallResult**\<`VmHandle`\> = [`SuccessOrFail`](#successorfail)\<`VmHandle`, `VmHandle`\>

Defined in: [packages/quickjs-emscripten-core/src/vm-interface.ts:26](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L26)

Used as an optional for results of a Vm call.
`{ value: VmHandle } | { error: VmHandle }`.

#### Type Parameters

##### VmHandle

`VmHandle`

***

### VmFunctionImplementation()

> **VmFunctionImplementation**\<`VmHandle`\> = (`this`, ...`args`) => `VmHandle` \| [`VmCallResult`](#vmcallresult)\<`VmHandle`\> \| `void`

Defined in: [packages/quickjs-emscripten-core/src/vm-interface.ts:40](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L40)

A VmFunctionImplementation takes handles as arguments.
It should return a handle, or be void.

To indicate an exception, a VMs can throw either a handle (transferred
directly) or any other Javascript value (only the poperties `name` and
`message` will be transferred). Or, the VmFunctionImplementation may return
a VmCallResult's `{ error: handle }` error variant.

VmFunctionImplementation should not free its arguments or its return value.
It should not retain a reference to its return value or thrown error.

#### Type Parameters

##### VmHandle

`VmHandle`

#### Parameters

##### this

`VmHandle`

##### args

...`VmHandle`[]

#### Returns

`VmHandle` \| [`VmCallResult`](#vmcallresult)\<`VmHandle`\> \| `void`

## Variables

### DEBUG\_ASYNC

> `const` **DEBUG\_ASYNC**: [`QuickJSAsyncVariant`](interfaces/QuickJSAsyncVariant.md)

Defined in: packages/variant-quickjs-wasmfile-debug-asyncify/dist/index.d.ts:18

### @jitl/quickjs-wasmfile-debug-asyncify

[Docs](https://github.com/justjake/quickjs-emscripten/blob/main/doc/@jitl/quickjs-wasmfile-debug-asyncify/README.md) |
Variant with separate .WASM file. Supports browser ESM, NodeJS ESM, and NodeJS CommonJS.

| Variable            |    Setting                     |    Description    |
| --                  | --                             | --                |
| library             | quickjs             | The original [bellard/quickjs](https://github.com/bellard/quickjs) library. Version [2025-09-13+f1139494](https://github.com/bellard/quickjs/commit/f1139494d18a2053630c5ed3384a42bb70db3c53) vendored to quickjs-emscripten on 2026-02-15. |
| releaseMode         | debug         | Enables assertions and memory sanitizers. Try to run your tests against debug variants, in addition to your preferred production variant, to catch more bugs. |
| syncMode            | asyncify            | Build run through the ASYNCIFY WebAssembly transform. This imposes substantial size (2x the size of sync) and speed penalties (40% the speed of sync). In return, allows synchronous calls from the QuickJS WASM runtime to async functions on the host. The extra magic makes this variant slower than sync variants. Note that both variants support regular async functions. Only adopt ASYNCIFY if you need to! The [QuickJSAsyncRuntime](https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten/classes/QuickJSAsyncRuntime.md) and [QuickJSAsyncContext](https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten/classes/QuickJSAsyncContext.md) classes expose the ASYNCIFY-specific APIs. |
| emscriptenInclusion | wasm | Has a separate .wasm file. May offer better caching in your browser, and reduces the size of your JS bundle. If you have issues, try a 'singlefile' variant. |
| exports             | require import browser workerd                  | Has these package.json export conditions |

***

### DEBUG\_SYNC

> `const` **DEBUG\_SYNC**: [`QuickJSSyncVariant`](interfaces/QuickJSSyncVariant.md)

Defined in: packages/variant-quickjs-wasmfile-debug-sync/dist/index.d.ts:18

### @jitl/quickjs-wasmfile-debug-sync

[Docs](https://github.com/justjake/quickjs-emscripten/blob/main/doc/@jitl/quickjs-wasmfile-debug-sync/README.md) |
Variant with separate .WASM file. Supports browser ESM, NodeJS ESM, and NodeJS CommonJS.

| Variable            |    Setting                     |    Description    |
| --                  | --                             | --                |
| library             | quickjs             | The original [bellard/quickjs](https://github.com/bellard/quickjs) library. Version [2025-09-13+f1139494](https://github.com/bellard/quickjs/commit/f1139494d18a2053630c5ed3384a42bb70db3c53) vendored to quickjs-emscripten on 2026-02-15. |
| releaseMode         | debug         | Enables assertions and memory sanitizers. Try to run your tests against debug variants, in addition to your preferred production variant, to catch more bugs. |
| syncMode            | sync            | The default, normal build. Note that both variants support regular async functions. |
| emscriptenInclusion | wasm | Has a separate .wasm file. May offer better caching in your browser, and reduces the size of your JS bundle. If you have issues, try a 'singlefile' variant. |
| exports             | require import browser workerd                  | Has these package.json export conditions |

***

### DefaultIntrinsics

> `const` **DefaultIntrinsics**: `Readonly`\<\{ `BaseObjects`: `true`; `Date`: `true`; `Eval`: `true`; `JSON`: `true`; `MapSet`: `true`; `Promise`: `true`; `Proxy`: `true`; `RegExp`: `true`; `StringNormalize`: `true`; `TypedArrays`: `true`; \}\>

Defined in: [packages/quickjs-emscripten-core/src/types.ts:173](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L173)

The default [Intrinsics](#intrinsics) language features enabled in a QuickJSContext.

#### See

[ContextOptions](interfaces/ContextOptions.md)

***

### DisposableResult

> **DisposableResult**: *typeof* `AbstractDisposableResult`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:478](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L478)

***

### EvalFlags

> **EvalFlags**: `object`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:98

Bitfield options for JS_Eval() C function.

#### Type Declaration

##### JS\_EVAL\_FLAG\_BACKTRACE\_BARRIER

> `readonly` **JS\_EVAL\_FLAG\_BACKTRACE\_BARRIER**: `number`

don't include the stack frames before this eval in the Error() backtraces

##### JS\_EVAL\_FLAG\_COMPILE\_ONLY

> `readonly` **JS\_EVAL\_FLAG\_COMPILE\_ONLY**: `number`

compile but do not run. The result is an object with a
JS_TAG_FUNCTION_BYTECODE or JS_TAG_MODULE tag. It can be executed
with JS_EvalFunction().

##### JS\_EVAL\_FLAG\_STRICT

> `readonly` **JS\_EVAL\_FLAG\_STRICT**: `number`

force 'strict' mode

##### JS\_EVAL\_FLAG\_STRIP

> `readonly` **JS\_EVAL\_FLAG\_STRIP**: `number`

force 'strip' mode

##### JS\_EVAL\_TYPE\_DIRECT

> `readonly` **JS\_EVAL\_TYPE\_DIRECT**: `number`

direct call (internal use)

##### JS\_EVAL\_TYPE\_GLOBAL

> `readonly` **JS\_EVAL\_TYPE\_GLOBAL**: `number`

global code (default)

##### JS\_EVAL\_TYPE\_INDIRECT

> `readonly` **JS\_EVAL\_TYPE\_INDIRECT**: `number`

indirect call (internal use)

##### JS\_EVAL\_TYPE\_MASK

> `readonly` **JS\_EVAL\_TYPE\_MASK**: `number`

##### JS\_EVAL\_TYPE\_MODULE

> `readonly` **JS\_EVAL\_TYPE\_MODULE**: `number`

module code

***

### GetOwnPropertyNamesFlags

> **GetOwnPropertyNamesFlags**: `object`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:158

Bitfield options for QTS_GetOwnPropertyNames

#### Type Declaration

##### JS\_GPN\_ENUM\_ONLY

> **JS\_GPN\_ENUM\_ONLY**: `number`

##### JS\_GPN\_PRIVATE\_MASK

> **JS\_GPN\_PRIVATE\_MASK**: `number`

##### JS\_GPN\_SET\_ENUM

> **JS\_GPN\_SET\_ENUM**: `number`

##### JS\_GPN\_STRING\_MASK

> **JS\_GPN\_STRING\_MASK**: `number`

##### JS\_GPN\_SYMBOL\_MASK

> **JS\_GPN\_SYMBOL\_MASK**: `number`

##### QTS\_GPN\_NUMBER\_MASK

> **QTS\_GPN\_NUMBER\_MASK**: `number`

##### QTS\_STANDARD\_COMPLIANT\_NUMBER

> **QTS\_STANDARD\_COMPLIANT\_NUMBER**: `number`

***

### IntrinsicsFlags

> **IntrinsicsFlags**: `object`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:126

Bitfield options for QTS_NewContext intrinsics

#### Type Declaration

##### BaseObjects

> `readonly` **BaseObjects**: `number`

##### BigDecimal

> `readonly` **BigDecimal**: `number`

##### BigFloat

> `readonly` **BigFloat**: `number`

##### BigInt

> `readonly` **BigInt**: `number`

##### BignumExt

> `readonly` **BignumExt**: `number`

##### Date

> `readonly` **Date**: `number`

##### Eval

> `readonly` **Eval**: `number`

##### JSON

> `readonly` **JSON**: `number`

##### MapSet

> `readonly` **MapSet**: `number`

##### OperatorOverloading

> `readonly` **OperatorOverloading**: `number`

##### Promise

> `readonly` **Promise**: `number`

##### Proxy

> `readonly` **Proxy**: `number`

##### RegExp

> `readonly` **RegExp**: `number`

##### RegExpCompiler

> `readonly` **RegExpCompiler**: `number`

##### StringNormalize

> `readonly` **StringNormalize**: `number`

##### TypedArrays

> `readonly` **TypedArrays**: `number`

***

### IsEqualOp

> **IsEqualOp**: `object`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:172

#### Type Declaration

##### IsSameValue

> **IsSameValue**: [`IsEqualOp`](#isequalop)

##### IsSameValueZero

> **IsSameValueZero**: [`IsEqualOp`](#isequalop)

##### IsStrictlyEqual

> **IsStrictlyEqual**: [`IsEqualOp`](#isequalop)

***

### JSPromiseStateEnum

> **JSPromiseStateEnum**: `object`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:149

#### Type Declaration

##### Fulfilled

> `readonly` **Fulfilled**: `1`

##### Pending

> `readonly` **Pending**: `0`

##### Rejected

> `readonly` **Rejected**: `2`

***

### RELEASE\_ASYNC

> `const` **RELEASE\_ASYNC**: [`QuickJSAsyncVariant`](interfaces/QuickJSAsyncVariant.md)

Defined in: packages/variant-quickjs-wasmfile-release-asyncify/dist/index.d.ts:18

### @jitl/quickjs-wasmfile-release-asyncify

[Docs](https://github.com/justjake/quickjs-emscripten/blob/main/doc/@jitl/quickjs-wasmfile-release-asyncify/README.md) |
Variant with separate .WASM file. Supports browser ESM, NodeJS ESM, and NodeJS CommonJS.

| Variable            |    Setting                     |    Description    |
| --                  | --                             | --                |
| library             | quickjs             | The original [bellard/quickjs](https://github.com/bellard/quickjs) library. Version [2025-09-13+f1139494](https://github.com/bellard/quickjs/commit/f1139494d18a2053630c5ed3384a42bb70db3c53) vendored to quickjs-emscripten on 2026-02-15. |
| releaseMode         | release         | Optimized for performance; use when building/deploying your application. |
| syncMode            | asyncify            | Build run through the ASYNCIFY WebAssembly transform. This imposes substantial size (2x the size of sync) and speed penalties (40% the speed of sync). In return, allows synchronous calls from the QuickJS WASM runtime to async functions on the host. The extra magic makes this variant slower than sync variants. Note that both variants support regular async functions. Only adopt ASYNCIFY if you need to! The [QuickJSAsyncRuntime](https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten/classes/QuickJSAsyncRuntime.md) and [QuickJSAsyncContext](https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten/classes/QuickJSAsyncContext.md) classes expose the ASYNCIFY-specific APIs. |
| emscriptenInclusion | wasm | Has a separate .wasm file. May offer better caching in your browser, and reduces the size of your JS bundle. If you have issues, try a 'singlefile' variant. |
| exports             | require import browser workerd                  | Has these package.json export conditions |

***

### RELEASE\_SYNC

> `const` **RELEASE\_SYNC**: [`QuickJSSyncVariant`](interfaces/QuickJSSyncVariant.md)

Defined in: packages/variant-quickjs-wasmfile-release-sync/dist/index.d.ts:18

### @jitl/quickjs-wasmfile-release-sync

[Docs](https://github.com/justjake/quickjs-emscripten/blob/main/doc/@jitl/quickjs-wasmfile-release-sync/README.md) |
Variant with separate .WASM file. Supports browser ESM, NodeJS ESM, and NodeJS CommonJS.

| Variable            |    Setting                     |    Description    |
| --                  | --                             | --                |
| library             | quickjs             | The original [bellard/quickjs](https://github.com/bellard/quickjs) library. Version [2025-09-13+f1139494](https://github.com/bellard/quickjs/commit/f1139494d18a2053630c5ed3384a42bb70db3c53) vendored to quickjs-emscripten on 2026-02-15. |
| releaseMode         | release         | Optimized for performance; use when building/deploying your application. |
| syncMode            | sync            | The default, normal build. Note that both variants support regular async functions. |
| emscriptenInclusion | wasm | Has a separate .wasm file. May offer better caching in your browser, and reduces the size of your JS bundle. If you have issues, try a 'singlefile' variant. |
| exports             | require import browser workerd                  | Has these package.json export conditions |

## Functions

### assertSync()

> **assertSync**\<`Args`, `R`\>(`fn`): (...`args`) => `R`

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:94

#### Type Parameters

##### Args

`Args` *extends* `any`[]

##### R

`R`

#### Parameters

##### fn

(...`args`) => `R`

#### Returns

> (...`args`): `R`

##### Parameters

###### args

...`Args`

##### Returns

`R`

***

### createDisposableArray()

> **createDisposableArray**\<`T`\>(`items?`): [`DisposableArray`](#disposablearray)\<`T`\>

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:359](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L359)

Create an array that also implements [Disposable](interfaces/Disposable.md).

#### Type Parameters

##### T

`T` *extends* [`Disposable`](interfaces/Disposable.md)

#### Parameters

##### items?

`Iterable`\<`T`, `any`, `any`\>

#### Returns

[`DisposableArray`](#disposablearray)\<`T`\>

***

### getQuickJS()

> **getQuickJS**(): `Promise`\<[`QuickJSWASMModule`](classes/QuickJSWASMModule.md)\>

Defined in: [packages/quickjs-emscripten/src/mod.ts:28](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten/src/mod.ts#L28)

Get a shared singleton [QuickJSWASMModule](classes/QuickJSWASMModule.md). Use this to evaluate code
or create Javascript environments.

This is the top-level entrypoint for the quickjs-emscripten library.

If you need strictest possible isolation guarantees, you may create a
separate [QuickJSWASMModule](classes/QuickJSWASMModule.md) via [newQuickJSWASMModule](#newquickjswasmmodule).

To work with the asyncified version of this library, see these functions:

- [newAsyncRuntime](#newasyncruntime).
- [newAsyncContext](#newasynccontext).
- [newQuickJSAsyncWASMModule](#newquickjsasyncwasmmodule).

#### Returns

`Promise`\<[`QuickJSWASMModule`](classes/QuickJSWASMModule.md)\>

***

### getQuickJSSync()

> **getQuickJSSync**(): [`QuickJSWASMModule`](classes/QuickJSWASMModule.md)

Defined in: [packages/quickjs-emscripten/src/mod.ts:41](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten/src/mod.ts#L41)

Provides synchronous access to the shared [QuickJSWASMModule](classes/QuickJSWASMModule.md) instance returned by [getQuickJS](#getquickjs), as long as
least once.

#### Returns

[`QuickJSWASMModule`](classes/QuickJSWASMModule.md)

#### Throws

If called before `getQuickJS` resolves.

***

### isFail()

> **isFail**\<`S`, `F`\>(`successOrFail`): `successOrFail is { error: F }`

Defined in: [packages/quickjs-emscripten-core/src/vm-interface.ts:18](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L18)

#### Type Parameters

##### S

`S`

##### F

`F`

#### Parameters

##### successOrFail

[`SuccessOrFail`](#successorfail)\<`S`, `F`\>

#### Returns

`successOrFail is { error: F }`

***

### isSuccess()

> **isSuccess**\<`S`, `F`\>(`successOrFail`): `successOrFail is { value: S }`

Defined in: [packages/quickjs-emscripten-core/src/vm-interface.ts:14](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L14)

#### Type Parameters

##### S

`S`

##### F

`F`

#### Parameters

##### successOrFail

[`SuccessOrFail`](#successorfail)\<`S`, `F`\>

#### Returns

`successOrFail is { value: S }`

***

### memoizePromiseFactory()

> **memoizePromiseFactory**\<`T`\>(`fn`): () => `Promise`\<`T`\>

Defined in: [packages/quickjs-emscripten-core/src/from-variant.ts:100](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/from-variant.ts#L100)

Helper intended to memoize the creation of a WebAssembly module.
```typescript
const getDebugModule = memoizePromiseFactory(() => newQuickJSWASMModule(DEBUG_SYNC))
```

#### Type Parameters

##### T

`T`

#### Parameters

##### fn

() => `Promise`\<`T`\>

#### Returns

> (): `Promise`\<`T`\>

##### Returns

`Promise`\<`T`\>

***

### newAsyncContext()

> **newAsyncContext**(`options?`): `Promise`\<[`QuickJSAsyncContext`](classes/QuickJSAsyncContext.md)\>

Defined in: [packages/quickjs-emscripten/src/mod.ts:76](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten/src/mod.ts#L76)

Create a new [QuickJSAsyncContext](classes/QuickJSAsyncContext.md) (with an associated runtime) in an
separate WebAssembly module.

Each context is isolated in a separate WebAssembly module, so that errors in
one runtime cannot contaminate another runtime, and each runtime can execute
an asynchronous action without conflicts.

Note that there is a hard limit on the number of WebAssembly modules in older
versions of v8:
https://bugs.chromium.org/p/v8/issues/detail?id=12076

#### Parameters

##### options?

[`ContextOptions`](interfaces/ContextOptions.md)

#### Returns

`Promise`\<[`QuickJSAsyncContext`](classes/QuickJSAsyncContext.md)\>

***

### newAsyncRuntime()

> **newAsyncRuntime**(`options?`): `Promise`\<[`QuickJSAsyncRuntime`](classes/QuickJSAsyncRuntime.md)\>

Defined in: [packages/quickjs-emscripten/src/mod.ts:59](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten/src/mod.ts#L59)

Create a new [QuickJSAsyncRuntime](classes/QuickJSAsyncRuntime.md) in a separate WebAssembly module.

Each runtime is isolated in a separate WebAssembly module, so that errors in
one runtime cannot contaminate another runtime, and each runtime can execute
an asynchronous action without conflicts.

Note that there is a hard limit on the number of WebAssembly modules in older
versions of v8:
https://bugs.chromium.org/p/v8/issues/detail?id=12076

#### Parameters

##### options?

[`AsyncRuntimeOptions`](interfaces/AsyncRuntimeOptions.md)

#### Returns

`Promise`\<[`QuickJSAsyncRuntime`](classes/QuickJSAsyncRuntime.md)\>

***

### newQuickJSAsyncWASMModule()

> **newQuickJSAsyncWASMModule**(`variantOrPromise?`): `Promise`\<[`QuickJSAsyncWASMModule`](classes/QuickJSAsyncWASMModule.md)\>

Defined in: [packages/quickjs-emscripten/src/variants.ts:47](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten/src/variants.ts#L47)

Create a new, completely isolated WebAssembly module containing a version of the QuickJS library
compiled with Emscripten's [ASYNCIFY](https://emscripten.org/docs/porting/asyncify.html) transform.

This version of the library offers features that enable synchronous code
inside the VM to interact with asynchronous code in the host environment.
See the documentation on [QuickJSAsyncWASMModule](classes/QuickJSAsyncWASMModule.md), [QuickJSAsyncRuntime](classes/QuickJSAsyncRuntime.md),
and [QuickJSAsyncContext](classes/QuickJSAsyncContext.md).

Note that there is a hard limit on the number of WebAssembly modules in older
versions of v8:
https://bugs.chromium.org/p/v8/issues/detail?id=12076

#### Parameters

##### variantOrPromise?

[`PromisedDefault`](#promiseddefault)\<[`QuickJSAsyncVariant`](interfaces/QuickJSAsyncVariant.md)\> = `RELEASE_ASYNC`

Optionally, pass a [QuickJSAsyncVariant](interfaces/QuickJSAsyncVariant.md) to construct a different WebAssembly module.

#### Returns

`Promise`\<[`QuickJSAsyncWASMModule`](classes/QuickJSAsyncWASMModule.md)\>

***

### newQuickJSAsyncWASMModuleFromVariant()

> **newQuickJSAsyncWASMModuleFromVariant**(`variantOrPromise`): `Promise`\<[`QuickJSAsyncWASMModule`](classes/QuickJSAsyncWASMModule.md)\>

Defined in: [packages/quickjs-emscripten-core/src/from-variant.ts:76](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/from-variant.ts#L76)

Create a new, completely isolated WebAssembly module containing a version of the QuickJS library
compiled with Emscripten's [ASYNCIFY](https://emscripten.org/docs/porting/asyncify.html) transform.

This version of the library offers features that enable synchronous code
inside the VM to interact with asynchronous code in the host environment.
See the documentation on [QuickJSAsyncWASMModule](classes/QuickJSAsyncWASMModule.md), [QuickJSAsyncRuntime](classes/QuickJSAsyncRuntime.md),
and [QuickJSAsyncContext](classes/QuickJSAsyncContext.md).

Note that there is a hard limit on the number of WebAssembly modules in older
versions of v8:
https://bugs.chromium.org/p/v8/issues/detail?id=12076

#### Parameters

##### variantOrPromise

[`PromisedDefault`](#promiseddefault)\<[`QuickJSAsyncVariant`](interfaces/QuickJSAsyncVariant.md)\>

A [QuickJSAsyncVariant](interfaces/QuickJSAsyncVariant.md) to construct the WebAssembly module.

#### Returns

`Promise`\<[`QuickJSAsyncWASMModule`](classes/QuickJSAsyncWASMModule.md)\>

#### Example

```ts
const quickjs = new newQuickJSAsyncWASMModuleFromVariant(
  import('@jitl/quickjs-browser-debug-asyncify-wasm')
)
```

***

### newQuickJSWASMModule()

> **newQuickJSWASMModule**(`variantOrPromise?`): `Promise`\<[`QuickJSWASMModule`](classes/QuickJSWASMModule.md)\>

Defined in: [packages/quickjs-emscripten/src/variants.ts:25](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten/src/variants.ts#L25)

Create a new, completely isolated WebAssembly module containing the QuickJS library.
See the documentation on [QuickJSWASMModule](classes/QuickJSWASMModule.md).

Note that there is a hard limit on the number of WebAssembly modules in older
versions of v8:
https://bugs.chromium.org/p/v8/issues/detail?id=12076

#### Parameters

##### variantOrPromise?

[`PromisedDefault`](#promiseddefault)\<[`QuickJSSyncVariant`](interfaces/QuickJSSyncVariant.md)\> = `RELEASE_SYNC`

Optionally, pass a [QuickJSSyncVariant](interfaces/QuickJSSyncVariant.md) to construct a different WebAssembly module.

#### Returns

`Promise`\<[`QuickJSWASMModule`](classes/QuickJSWASMModule.md)\>

***

### newQuickJSWASMModuleFromVariant()

> **newQuickJSWASMModuleFromVariant**(`variantOrPromise`): `Promise`\<[`QuickJSWASMModule`](classes/QuickJSWASMModule.md)\>

Defined in: [packages/quickjs-emscripten-core/src/from-variant.ts:38](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/from-variant.ts#L38)

Create a new, completely isolated WebAssembly module containing the QuickJS library.
See the documentation on [QuickJSWASMModule](classes/QuickJSWASMModule.md).

Note that there is a hard limit on the number of WebAssembly modules in older
versions of v8:
https://bugs.chromium.org/p/v8/issues/detail?id=12076

#### Parameters

##### variantOrPromise

[`PromisedDefault`](#promiseddefault)\<[`QuickJSSyncVariant`](interfaces/QuickJSSyncVariant.md)\>

A [QuickJSSyncVariant](interfaces/QuickJSSyncVariant.md) to construct the WebAssembly module.

#### Returns

`Promise`\<[`QuickJSWASMModule`](classes/QuickJSWASMModule.md)\>

#### Example

```ts
const quickjs = new newQuickJSWASMModuleFromVariant(
  import('@jitl/quickjs-browser-release-sync-wasm')
)
```

***

### newVariant()

> **newVariant**\<`T`\>(`baseVariant`, `options`): `T`

Defined in: [packages/quickjs-emscripten-core/src/from-variant.ts:162](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/from-variant.ts#L162)

Create a new variant by overriding how Emscripten obtains the WebAssembly module.
This may be necessary in Cloudflare Workers, which can't compile WebAssembly modules from binary data.

#### Type Parameters

##### T

`T` *extends* [`QuickJSVariant`](#quickjsvariant)

#### Parameters

##### baseVariant

`T`

##### options

[`CustomizeVariantOptions`](interfaces/CustomizeVariantOptions.md)

#### Returns

`T`

***

### setDebugMode()

> **setDebugMode**(`enabled?`): `void`

Defined in: [packages/quickjs-emscripten-core/src/debug.ts:13](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/debug.ts#L13)

Enable (or disable) debug logging and object creation tracking globally.
This setting is inherited by newly created QuickJSRuntime instances.
To get debug logging in the WebAssembly module, you need to use a debug build variant.
See [the quickjs-emscripten-core README](https://github.com/justjake/quickjs-emscripten/tree/main/doc/quickjs-emscripten-core) for more about build variants.

#### Parameters

##### enabled?

`boolean` = `true`

#### Returns

`void`

***

### shouldInterruptAfterDeadline()

> **shouldInterruptAfterDeadline**(`deadline`): [`InterruptHandler`](#interrupthandler)

Defined in: [packages/quickjs-emscripten-core/src/interrupt-helpers.ts:9](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/interrupt-helpers.ts#L9)

Returns an interrupt handler that interrupts Javascript execution after a deadline time.

#### Parameters

##### deadline

Interrupt execution if it's still running after this time.
  Number values are compared against `Date.now()`

`number` | `Date`

#### Returns

[`InterruptHandler`](#interrupthandler)
