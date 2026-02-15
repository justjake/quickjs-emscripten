[quickjs-emscripten](../../packages.md) • **@jitl/mquickjs-wasmfile-debug-sync** • [Readme](README.md) \| [Exports](exports.md)

***

# @jitl/mquickjs-wasmfile-debug-sync

Variant with separate .WASM file. Supports browser ESM, NodeJS ESM, and NodeJS CommonJS.

This generated package is part of [quickjs-emscripten](https://github.com/justjake/quickjs-emscripten).
It contains a variant of the quickjs WASM library, and can be used with quickjs-emscripten-core.

```typescript
import variant from "@jitl/mquickjs-wasmfile-debug-sync"
import { newQuickJSWASMModuleFromVariant } from "quickjs-emscripten-core"
const QuickJS = await newQuickJSWASMModuleFromVariant(variant)
```

This variant was built with the following settings:

## Contents

- [Library: mquickjs](README.md#library-mquickjs)
- [Release mode: debug](README.md#release-mode-debug)
- [Exports: require import browser workerd](README.md#exports-require-import-browser-workerd)
- [Extra async magic? No](README.md#extra-async-magic-no)
- [Single-file, or separate .wasm file? wasm](README.md#single-file-or-separate-wasm-file-wasm)
- [More details](README.md#more-details)

## Library: mquickjs

[mquickjs](https://github.com/bellard/mquickjs) is a minimal/micro version of QuickJS by Fabrice Bellard, optimized for small size.

Version [git+ee50431e](https://github.com/bellard/mquickjs/commit/ee50431eac9b14b99f722b537ec4cac0c8dd75ab) vendored to quickjs-emscripten on 2026-02-15.

## Release mode: debug

Enables assertions and memory sanitizers. Try to run your tests against debug variants, in addition to your preferred production variant, to catch more bugs.

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
  "library": "mquickjs",
  "releaseMode": "debug",
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
  "-O0",
  "-DQTS_DEBUG_MODE",
  "-DDUMP_LEAKS=1",
  "-gsource-map",
  "-s ASSERTIONS=1",
  "--pre-js $(TEMPLATES)/pre-extension.js",
  "--pre-js $(TEMPLATES)/pre-sourceMapJson.js",
  "--pre-js $(TEMPLATES)/pre-wasmOffsetConverter.js",
  "--pre-js $(TEMPLATES)/pre-wasmMemory.js",
  "-DQTS_SANITIZE_LEAK",
  "-fsanitize=leak",
  "-g2"
]
```

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
