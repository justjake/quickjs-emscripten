# quickjs-emscripten

Javascript/Typescript bindings for QuickJS, a modern Javascript interpreter,
compiled to WebAssembly.

- Safely evaluate untrusted Javascript (up to ES2020).
- Create and manipulate values inside the QuickJS runtime ([more][values]).
- Expose host functions to the QuickJS runtime ([more][functions]).
- Execute synchronous code that uses asynchronous functions, with [asyncify][asyncify].

[Github] | [NPM] | [API Documentation][API] | [Examples][tests]


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

[Github]: https://github.com/justjake/quickjs-emscripten
[NPM]: https://www.npmjs.com/package/quickjs-emscripten
[API]: https://github.com/justjake/quickjs-emscripten/blob/master/doc/modules.md
[tests]: https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.test.ts
[values]: #interfacing-with-the-interpreter
[asyncify]: #asyncify
[functons]: #exposing-apis

## Usage

Install from `npm`: `npm install --save quickjs-emscripten` or `yarn add quickjs-emscripten`.

The root entrypoint of this library is the `getQuickJS` function, which returns
a promise that resolves to a [QuickJS singleton](./doc/classes/quickjs.md) when
the QuickJS WASM module is ready.

Once `getQuickJS` has been awaited at least once, you also can use the `getQuickJSSync`
function to directly access the singleton engine in your synchronous code.

### Safely evaluate Javascript code

See [QuickJS.evalCode](https://github.com/justjake/quickjs-emscripten/blob/master/doc/classes/quickjs.md#evalcode)

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

You can use [QuickJSContext](https://github.com/justjake/quickjs-emscripten/blob/master/doc/classes/QuickJSContext.md)
to build a scripting environment by modifying globals and exposing functions
into the QuickJS interpreter.

Each `QuickJSContext` instance has its own environment -- globals, built-in
classes -- and actions from one context won't leak into other contexts or
runtimes (with one exception, see [Asyncify][asyncify]).

Every context is created inside a
[QuickJSRuntime](https://github.com/justjake/quickjs-emscripten/blob/master/doc/classes/QuickJSRuntime.md).
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
```

### Exposing APIs

To add APIs inside the QuickJS environment, you'll need to create objects to
define the shape of your API, and add properties and functions to those objects
to allow code inside QuickJS to call code on the host.

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

#### Promises

To expose an asynchronous function that *returns a promise* to callers within
QuickJS, your function can return the handle of a `QuickJSDeferredPromise`
created via `context.newPromise()`.

When you resolve a `QuickJSDeferredPromise` -- and generally whenever async
behavior completes for the VM -- pending listeners inside QuickJS may not
execute immediately. Your code needs to explicitly call
`runtime.executePendingJobs()` to resume execution inside QuickJS.  This API
gives your code maximum control to *schedule* when QuickJS will block the host's
event loop by resuming execution.

To work with QuickJS handles that contain a promise inside the environment, you
can convert the QuickJSHandle into a native promise using
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

TODO.

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

#### Scope

A
[`Scope`](https://github.com/justjake/quickjs-emscripten/blob/master/doc/classes/scope.md#class-scope)
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
    })
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

[`Lifetime.consume`](https://github.com/justjake/quickjs-emscripten/blob/master/doc/classes/lifetime.md#consume)
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
  console.log("vm result:", vm.getNumber(nextId), "native state:", state)
)

vm.dispose()
```

Generally working with `Scope` leads to more straight-forward code, but
`Lifetime.consume` can be handy sugar as part of a method call chain.

### More Documentation

[Github](https://github.com/justjake/quickjs-emscripten) | [NPM](https://www.npmjs.com/package/quickjs-emscripten) | [API Documentation](https://github.com/justjake/quickjs-emscripten/blob/master/doc/modules.md) | [Examples](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.test.ts)

## Background

This was inspired by seeing https://github.com/maple3142/duktape-eval
[on Hacker News](https://news.ycombinator.com/item?id=21946565) and Figma's
blogposts about using building a Javascript plugin runtime:

- [How Figma built the Figma plugin system](https://www.figma.com/blog/how-we-built-the-figma-plugin-system/): Describes the LowLevelJavascriptVm interface.
- [An update on plugin security](https://www.figma.com/blog/an-update-on-plugin-security/): Figma switches to QuickJS.

## Status & TODOs

Because the version number of this project is below `1.0.0`, expect occasional
breaking API changes.

- There is a test suite for most APIs reachable from `QuickJSContext`, but the suite could be more thorough.
- 

Both the original project quickjs and this project are still in the early stage
of development.
There [are tests](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.test.ts), but I haven't built anything
on top of this. Please use this project carefully in a production
environment.


Ideas for future work:

- quickjs-emscripten only exposes a small subset of the QuickJS APIs. Add more QuickJS bindings!
  - Expose tools for object and array iteration and creation.
  - Stretch goals: class support, an event emitter bridge implementation
- Higher-level abstractions for translating values into (and out of) QuickJS.
- Remove the singleton limitations. Each QuickJS class instance could create
  its own copy of the emscripten module.
- Run quickjs-emscripten inside quickjs-emscripten.
- Remove the `LowLevelJavascriptVm` interface and definition. Those types
  provide no value, since there is no other implementations, and complicate the
  types and documentation for quickjs-emscripten.
- Improve our testing strategy by running the tests with each of the Emscripten santizers, as well as with the SAFE_HEAP. This should catch more bugs in the C code.
  [See the Emscripten docs for more details](https://emscripten.org/docs/debugging/Sanitizers.html#comparison-to-safe-heap)

## Related

- Duktape wrapped in Wasm: https://github.com/maple3142/duktape-eval/blob/master/src/Makefile
- QuickJS wrapped in C++: https://github.com/ftk/quickjspp

## Developing

This library is implemented in two languages: C (compiled to WASM with
Emscripten), and Typescript.

### The C parts

The ./c directory contains C code that wraps the QuickJS C library (in ./quickjs).
Public functions (those starting with `QTS_`) in ./c/interface.c are
automatically exported to native code (via a generated header) and to
Typescript (via a generated FFI class). See ./generate.ts for how this works.

The C code builds as both with `emscripten` (using `emcc`), to produce WASM (or
ASM.js) and with `clang`. Build outputs are checked in, so
Intermediate object files from QuickJS end up in ./build/quickjs/{wasm,native}.

This project uses `emscripten 1.39.19`. The install should be handled automatically
if you're working from Linux or OSX (if using Windows, the best is to use WSL to work
on this repository). If everything is right, running `yarn embin emcc -v` should print
something like this:

```
emcc (Emscripten gcc/clang-like replacement + linker emulating GNU ld) 1.39.18
clang version 11.0.0 (/b/s/w/ir/cache/git/chromium.googlesource.com-external-github.com-llvm-llvm--project 613c4a87ba9bb39d1927402f4dd4c1ef1f9a02f7)
```

Related NPM scripts:

- `yarn update-quickjs` will sync the ./quickjs folder with a
  github repo tracking the upstream QuickJS.
- `yarn make-debug` will rebuild C outputs into ./build/wrapper
- `yarn run-n` builds and runs ./c/test.c

### The Typescript parts

The ./ts directory contains Typescript types and wraps the generated Emscripten
FFI in a more usable interface.

You'll need `node` and `npm` or `yarn`. Install dependencies with `npm install`
or `yarn install`.

- `yarn build` produces ./dist.
- `yarn test` runs the tests.
- `yarn test --watch` watches for changes and re-runs the tests.

### Yarn updates

Just run `yarn set version from sources` to upgrade the Yarn release.
