# quickjs-for-quickjs

This package is a build of [quickjs-emscripten](https://github.com/justjake/quickjs-emscripten) that can run inside QuickJS or any other JavaScript runtime without WebAssembly support. The QuickJS C library is compiled to Asm.js, and then bundled together with the quickjs-emscripten JavaScript wrapper into a single standalone file with no external dependencies.
