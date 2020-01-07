# quickjs-typescript

This was inspired by https://github.com/maple3142/duktape-eval and Figma's
blogposts about using building a Javascript plugin runtime:

* [Theory and considerations](https://www.figma.com/blog/how-we-built-the-figma-plugin-system/)
* [Security follow-up where they switch to QuickJS](https://www.figma.com/blog/an-update-on-plugin-security/)

## Status

**Appears to work**. This project is untested and still under rapid
development, but the approach has stabilized.

Open problems:

* Simplify memory management. We need to remove the `.free()` methods on
  handles and just use `vm.freeHandle(...)`. Should also rename `VM.free()` to `VM.freeVM`.

  * We chould use a Pool abstraction and do a Pool.freeAll() to free all handles and pointers
    in the pool.

* Think more about C -> JS function calls. Right now there is a fixed-size
  array for these pointers. Maybe we need to manage our own resizable array
  inside C code?

## Related

* Duktape wrapped in Wasm: https://github.com/maple3142/duktape-eval/blob/master/src/Makefile
* QuickJS wrapped in C++: https://github.com/ftk/quickjspp

## Developing

This library is implemented in two languages: C and Typescript.

### The C parts

The ./c directory contains C code that wraps the QuickJS C library (in ./quickjs).
Public functions (those starting with `QTS_`) in ./c/interface.c are
automatically exported to native code (via a generated header) and to
Typescript (via a generated FFI class). See ./generate.ts for how this works.

The C code builds as both with `emscripten` (using `emcc`), to produce WASM (or
ASM.js) and with `clang`. Build outputs end up in ./build/wrapper/{wasm,native}.
Intermediate object files from QuickJS end up in ./build/quickjs/{wasm,native}.

You'll need to install `emscripten`. Following the offical instructions here, using `emsdk`:
https://emscripten.org/docs/getting_started/downloads.html#installation-instructions

Related NPM scripts:

* `yarn update-quickjs` will sync the ./quickjs folder with a
  github repo tracking the upstream QuickJS.
* `yarn make-debug` will rebuild C outputs into ./build/wrapper
* `yarn run-n` builds and runs ./c/test.c

### The Typescript parts

The ./ts directory contains Typescript types and wraps the generated Emscripten
FFI in a more usable interface.

You'll need `node` and `npm` or `yarn`. Install dependencies with `npm install`
or `yarn install`.

* `yarn run-ts` runs an example file
* `yarn build` produces ./build/js
* `yarn watch` will watch ./ts for changes and build into ./build/js
