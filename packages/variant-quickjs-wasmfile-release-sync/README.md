# @jitl/quickjs-wasmfile-release-sync

Variant with separate .WASM file. Supports browser ESM, NodeJS ESM, and NodeJS CommonJS.

This generated package is part of [quickjs-emscripten](https://github.com/justjake/quickjs-emscripten).
It contains a variant of the quickjs WASM library, and can be used with quickjs-emscripten-core.

```typescript
import variant from "@jitl/quickjs-wasmfile-release-sync"
import { newQuickJSWASMModuleFromVariant } from "quickjs-emscripten-core"
const QuickJS = await newQuickJSWASMModuleFromVariant(variant)
```

This variant was built with the following settings:

## Library: quickjs

The original [bellard/quickjs](https://github.com/bellard/quickjs) library.

Version [2024-02-14+36911f0d](https://github.com/bellard/quickjs/commit/36911f0d3ab1a4c190a4d5cbe7c2db225a455389) vendored to quickjs-emscripten on 2024-06-15.

## Release mode: release

Optimized for performance; use when building/deploying your application.

## Exports: require import browser workerd

Exports the following in package.json for the package entrypoint:

- Exports a NodeJS-compatible CommonJS module, which is faster to load and run compared to an ESModule.
- Exports a NodeJS-compatible ESModule. Cannot be imported synchronously from a NodeJS CommonJS module.
- Exports a browser-compatible ESModule, designed to work in browsers and browser-like environments.
- Targets Cloudflare Workers.

## Extra async magic? No

The default, normal build. Note that both variants support regular async functions.

## Single-file, or separate .wasm file? wasm

Has a separate .wasm file. May offer better caching in your browser, and reduces the size of your JS bundle. If you have issues, try a 'singlefile' variant.

## More details

Full variant JSON description:

```json
{
  "library": "quickjs",
  "releaseMode": "release",
  "syncMode": "sync",
  "description": "Variant with separate .WASM file. Supports browser ESM, NodeJS ESM, and NodeJS CommonJS.",
  "emscriptenInclusion": "wasm",
  "exports": {
    "require": {
      "emscriptenEnvironment": ["node"]
    },
    "import": {
      "emscriptenEnvironment": ["node"]
    },
    "browser": {
      "emscriptenEnvironment": ["web", "worker"]
    },
    "workerd": {
      "emscriptenEnvironment": ["web"]
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
  "--pre-js $(TEMPLATES)/pre-wasmMemory.js"
]
```
