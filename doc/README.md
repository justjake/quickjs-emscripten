[quickjs-emscripten](README.md) › [Globals](globals.md)

# quickjs-emscripten

# quickjs-emscripten

Javascript/Typescript bindings for [QuickJS, a modern Javascript interpreter written in
C by Fabrice Bellard](https://bellard.org/quickjs/) compiled to WebAssembly.

- Safely evaluate untrusted Javascript (up to ES2020).
- Create and manipulate values inside the QuickJS runtime.
- Expose host functions to the QuickJS runtime.

```typescript
import { getQuickJS } from 'quickjs-emscripten'

async function main() {
  const QuickJS = await getQuickJS()
  const vm = QuickJS.createVm()

  const world = vm.createString('world')
  vm.setProp(vm.global, 'NAME', world)
  world.dispose()

  const result = vm.evalCode(`"Hello " + NAME + "!"`)
  if (result.error) {
    console.log('Execution failed:', vm.dump(result.error))
    result.error.dispose()
  } else {
    console.log('Success:', vm.dump(result.value))
    result.value.dispose()
  }

  vm.dispose()
}

main()
```

## Usage

Install from `npm`: `npm install --save quickjs-emscripten` or `yarn add quickjs-emscripten`.

The root entrypoint of this library is the `getQuickJS` function, which returns
a promise that resolves to a [QuickJS singleton](doc/classes/quickjs.md) when
the Emscripten WASM module is ready.

Once `getQuickJS` has been awaited at least once, you also can use the `getQuickJSSync`
function to directly access the singleton engine in your synchronous code.

### Safely evaluate Javascript code

See [QuickJS.evalCode](https://github.com/justjake/quickjs-emscripten/blob/master/doc/classes/quickjs.md#evalcode)

```typescript
import { getQuickJS, shouldInterruptAfterDeadline } from 'quickjs-emscripten'

getQuickJS().then(QuickJS => {
  const result = QuickJS.evalCode('1 + 1', {
    shouldInterrupt: shouldInterruptAfterDeadline(Date.now() + 1000),
    memoryLimitBytes: 1024 * 1024,
  })
  console.log(result)
})
```

### Interfacing with the interpreter

You can use [QuickJSVm](https://github.com/justjake/quickjs-emscripten/blob/master/doc/classes/quickjsvm.md)
to build a scripting environment by modifying globals and exposing functions
into the QuickJS interpreter.

Each `QuickJSVm` instance has its own environment, CPU limit, and memory
limit. See the documentation for details.

```typescript
const vm = QuickJS.createVm()
let state = 0

const fnHandle = vm.newFunction('nextId', () => {
  return vm.newNumber(++state)
})

vm.setProp(vm.global, 'nextId', fnHandle)
fnHandle.dispose()

const nextId = vm.unwrapResult(vm.evalCode(`nextId(); nextId(); nextId()`))
console.log('vm result:', vm.getNumber(nextId), 'native state:', state)

nextId.dispose()
vm.dispose()
```

### Memory Management

Many methods in this library return handles to memory allocated inside the
WebAssembly heap. These types cannot be garbage-collected as usual in
Javascript. Instead, you must manually manage their memory by calling a
`.dispose()` method to free the underlying resources. Once a handle has been
disposed, it cannot be used anymore. Note that in the example above, we call
`.dispose()` on each handle once it is no longer needed.

Calling `QuickJSVm.dispose()` will throw a RuntimeError if you've forgotten to
dispose any handles associated with that VM, so it's good practice to create a
new VM instance for each of your tests, and to call `vm.dispose()` at the end
of every test.

```typescript
const vm = QuickJS.createVm()
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
Scope.withScope(scope => {
  const vm = scope.manage(QuickJS.createVm())
  let state = 0

  const fnHandle = scope.manage(
    vm.newFunction('nextId', () => {
      return vm.newNumber(++state)
    })
  )

  vm.setProp(vm.global, 'nextId', fnHandle)

  const nextId = scope.manage(vm.unwrapResult(vm.evalCode(`nextId(); nextId(); nextId()`)))
  console.log('vm result:', vm.getNumber(nextId), 'native state:', state)

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
const vm = QuickJS.createVm()
let state = 0

vm.newFunction('nextId', () => {
  return vm.newNumber(++state)
}).consume(fnHandle => vm.setProp(vm.global, 'nextId', fnHandle))

vm.unwrapResult(vm.evalCode(`nextId(); nextId(); nextId()`)).consume(nextId =>
  console.log('vm result:', vm.getNumber(nextId), 'native state:', state)
)

vm.dispose()
```

Generally working with `Scope` leads to more straight-forward code, but
`Lifetime.consume` can be handy sugar as part of a method call chain.

### More Documentation

- [API Documentation](https://github.com/justjake/quickjs-emscripten/blob/master/doc/globals.md)
- [Examples](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.test.ts)

## Background

This was inspired by seeing https://github.com/maple3142/duktape-eval
[on Hacker News](https://news.ycombinator.com/item?id=21946565) and Figma's
blogposts about using building a Javascript plugin runtime:

- [How Figma built the Figma plugin system](https://www.figma.com/blog/how-we-built-the-figma-plugin-system/): Describes the LowLevelJavascriptVm interface.
- [An update on plugin security](https://www.figma.com/blog/an-update-on-plugin-security/): Figma switches to QuickJS.

## Status & TODOs

Both the original project quickjs and this project are still in the early stage
of development.
There [are tests](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.test.ts), but I haven't built anything
on top of this. Please use this project carefully in a production
environment.

Because the version number of this project is below `1.0.0`, expect occasional
breaking API changes.

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
