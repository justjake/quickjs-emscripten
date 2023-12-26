# @jitl/quickjs-wasmfile-release-asyncify

Variant with separate .WASM file. Supports browser, NodeJS ESM, and NodeJS CJS.

This generated package is part of [quickjs-emscripten](https://github.com/justjake/quickjs-emscripten).
It contains a variant of the quickjs WASM library, and can be used with quickjs-emscripten-core.

```typescript
import variant from "@jitl/quickjs-wasmfile-release-asyncify"
import { newQuickJSAsyncWASMModuleFromVariant } from "quickjs-emscripten-core"
const QuickJS = await newQuickJSAsyncWASMModuleFromVariant(variant)
```

This variant was built with the following settings:

## Library: quickjs

The original [bellard/quickjs](https://github.com/bellard/quickjs) library.

## Release mode: release

Optimized for performance; use when building/deploying your application.

## Exports: require import browser

Exports the following in package.json for the package entrypoint:

- undefined
- undefined
- Exports a browser-compatible ESModule.

## Extra async magic? Yes

Build run through the ASYNCIFY WebAssembly transform. Larger and slower. Allows synchronous calls from the WASM runtime to async functions on the host. The extra magic makes this variant slower than sync variants. Note that both variants support regular async functions. Only adopt ASYNCIFY if you need to!

## Single-file, or separate .wasm file? wasm

Has a separate .wasm file. May offer better caching in your browser, and reduces the size of your JS bundle. If you have issues, try a 'singlefile' variant.

## More details

Full variant JSON description:

```json
{
  "library": "quickjs",
  "releaseMode": "release",
  "syncMode": "asyncify",
  "description": "Variant with separate .WASM file. Supports browser, NodeJS ESM, and NodeJS CJS.",
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
    }
  }
}
```

Variant-specific Emscripten build flags:

```json
[
  "-s ASYNCIFY=1",
  "-DQTS_ASYNCIFY=1",
  "-DQTS_ASYNCIFY_DEFAULT_STACK_SIZE=81920",
  "-s ASYNCIFY_STACK_SIZE=81920",
  "-s ASYNCIFY_REMOVE=@$(BUILD_WRAPPER)/asyncify-remove.json",
  "-s ASYNCIFY_IMPORTS=@$(BUILD_WRAPPER)/asyncify-imports.json",
  "-lasync.js",
  "-Oz",
  "-flto",
  "--closure 1",
  "-s FILESYSTEM=0"
]
```
