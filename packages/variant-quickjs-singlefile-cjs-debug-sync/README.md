# @jitl/quickjs-singlefile-cjs-debug-sync

Variant with the WASM data embedded into a universal (Node and Browser compatible) CommonJS module.

This generated package is part of [quickjs-emscripten](https://github.com/justjake/quickjs-emscripten).
It contains a variant of the quickjs WASM library, and can be used with quickjs-emscripten-core.

```typescript
import variant from "@jitl/quickjs-singlefile-cjs-debug-sync"
import { newQuickJSWASMModuleFromVariant } from "quickjs-emscripten-core"
const QuickJS = await newQuickJSWASMModuleFromVariant(variant)
```

This variant was built with the following settings:

## Library: quickjs

The original [bellard/quickjs](https://github.com/bellard/quickjs) library.

## Release mode: debug

Enables assertions and memory sanitizers. Try to run your tests against debug variants, in addition to your preferred production variant, to catch more bugs.

## Exports: require

Exports the following in package.json for the package entrypoint:

- Exports a NodeJS-compatible CommonJS module, which is faster to load and run compared to an ESModule.

## Extra async magic? No

The default, normal build. Note that both variants support regular async functions.

## Single-file, or separate .wasm file? singlefile

The WASM runtime is included directly in the JS file. Use if you run into issues with missing .wasm files when building or deploying your app.

## More details

Full variant JSON description:

```json
{
  "library": "quickjs",
  "releaseMode": "debug",
  "syncMode": "sync",
  "description": "Variant with the WASM data embedded into a universal (Node and Browser compatible) CommonJS module.",
  "emscriptenInclusion": "singlefile",
  "exports": {
    "require": {
      "emscriptenEnvironment": ["web", "worker", "node"]
    }
  }
}
```

Variant-specific Emscripten build flags:

```json
[
  "-O0",
  "-DQTS_DEBUG_MODE",
  "-gsource-map",
  "-s ASSERTIONS=1",
  "--pre-js $(TEMPLATES)/pre-extension.js",
  "--pre-js $(TEMPLATES)/pre-sourceMapJson.js",
  "--pre-js $(TEMPLATES)/pre-wasmOffsetConverter.js",
  "-s SINGLE_FILE=1",
  "-DQTS_SANITIZE_LEAK",
  "-fsanitize=leak",
  "-g2"
]
```
