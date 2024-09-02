# @jitl/quickjs-asmjs-mjs-release-sync

Compiled to pure Javascript, no WebAssembly required.

This generated package is part of [quickjs-emscripten](https://github.com/justjake/quickjs-emscripten).
It contains a variant of the quickjs WASM library, and can be used with quickjs-emscripten-core.

```typescript
import variant from "@jitl/quickjs-asmjs-mjs-release-sync"
import { newQuickJSWASMModuleFromVariant } from "quickjs-emscripten-core"
const QuickJS = await newQuickJSWASMModuleFromVariant(variant)
```

This variant was built with the following settings:

## Library: quickjs

The original [bellard/quickjs](https://github.com/bellard/quickjs) library.

Version [2024-02-14+36911f0d](https://github.com/bellard/quickjs/commit/36911f0d3ab1a4c190a4d5cbe7c2db225a455389) vendored to quickjs-emscripten on 2024-06-15.

## Release mode: release

Optimized for performance; use when building/deploying your application.

## Exports: import

Exports the following in package.json for the package entrypoint:

- Exports a NodeJS-compatible ESModule. Cannot be imported synchronously from a NodeJS CommonJS module.

## Extra async magic? No

The default, normal build. Note that both variants support regular async functions.

## Single-file, or separate .wasm file? asmjs

The C library code is compiled to Javascript, no WebAssembly used. Sometimes called "asmjs". This is the slowest possible option, and is intended for constrained environments that do not support WebAssembly, like quickjs-for-quickjs.

## More details

Full variant JSON description:

```json
{
  "library": "quickjs",
  "releaseMode": "release",
  "syncMode": "sync",
  "description": "Compiled to pure Javascript, no WebAssembly required.",
  "emscriptenInclusion": "asmjs",
  "exports": {
    "import": {
      "emscriptenEnvironment": ["web", "worker", "node"]
    }
  }
}
```

Variant-specific Emscripten build flags:

```json
[
  "-Oz",
  "-flto",
  "--closure 1",
  "-s FILESYSTEM=0",
  "--pre-js $(TEMPLATES)/pre-extension.js",
  "--pre-js $(TEMPLATES)/pre-wasmMemory.js",
  "-s WASM=0",
  "-s SINGLE_FILE=1",
  "-s STACK_SIZE=32MB",
  "-s INITIAL_MEMORY=64MB"
]
```
