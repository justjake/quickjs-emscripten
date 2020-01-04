# quickjs-typescript

This was inspired by https://github.com/maple3142/duktape-eval and Figma's
blogposts about using building a Javascript plugin runtime:

* [Theory and considerations](https://www.figma.com/blog/how-we-built-the-figma-plugin-system/)
* [Security follow-up where they switch to QuickJS](https://www.figma.com/blog/an-update-on-plugin-security/)

## Related

* Duktape wrapped in Wasm: https://github.com/maple3142/duktape-eval/blob/master/src/Makefile
* QuickJS wrapped in C++: https://github.com/ftk/quickjspp

## Developing

This library is implemented in two languages: C and Typescript.

### The C parts

The C parts are built using `emscripten`. Build outputs are committed
to the repo in src/quickjs-module.js.

To build the C codebase, you'll need `emscripten`.

 Install `emscripten` following the offical instructions here, using
 `emsdk`:
 https://emscripten.org/docs/getting_started/downloads.html#installation-instructions

Related NPM scripts:

* `yarn update-quickjs` will sync the ./quickjs folder with a
  github repo tracking the upstream QuickJS.
* `yarn make` will rebuild emscripten outputs inside ./src

### The Typescript parts

WIP.

You'll need `node` and `npm` or `yarn` to work on them.
Install dependencies with `npm install` or `yarn install`.

* `yarn build` will produce a fresh ./build output
* `yarn watch` will watch ./src for changes and build into ./build
