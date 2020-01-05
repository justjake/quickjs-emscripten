# quickjs-typescript

This was inspired by https://github.com/maple3142/duktape-eval and Figma's
blogposts about using building a Javascript plugin runtime:

* [Theory and considerations](https://www.figma.com/blog/how-we-built-the-figma-plugin-system/)
* [Security follow-up where they switch to QuickJS](https://www.figma.com/blog/an-update-on-plugin-security/)

## Status

**Segfaulting.** This is a learning experience.

## Related

* Duktape wrapped in Wasm: https://github.com/maple3142/duktape-eval/blob/master/src/Makefile
* QuickJS wrapped in C++: https://github.com/ftk/quickjspp

## Developing

This library is implemented in two languages: C and Typescript.

### The C parts

The ./c directory contains C code that wraps the QuickJS C linrary (in ./quickjs).

The C code builds as both with `emscripten` (using `emcc`), to produce WASM (or
ASM.js) and with `clang`. Build outputs end up in ./build/wrapper.
Intermediate object files from QuickJS end up in ./build/quickjs.

You'll need to install `emscripten`. Following the offical instructions here, using `emsdk`:
https://emscripten.org/docs/getting_started/downloads.html#installation-instructions

Related NPM scripts:

* `yarn update-quickjs` will sync the ./quickjs folder with a
  github repo tracking the upstream QuickJS.
* `yarn make-debug` will rebuild C outputs into ./build/wrapper

### The Typescript parts

The ./ts directory contains Typescript bindings (via Emscripten & our wrapper) to QuickJS.

You'll need `node` and `npm` or `yarn` to work on them.
Install dependencies with `npm install` or `yarn install`.

* Build the C parts first: `yarn make-debug`, then:
* `yarn build` produces ./build/js
* `yarn watch` will watch ./ts for changes and build into ./build/js
