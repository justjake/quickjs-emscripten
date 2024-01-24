[quickjs-emscripten](../../packages.md) • **@jitl/quickjs-singlefile-browser-release-sync** • [Readme](README.md) \| [Exports](exports.md)

***

# @jitl/quickjs-singlefile-browser-release-sync

Variant with the WASM data embedded into a browser ESModule.

This generated package is part of [quickjs-emscripten](https://github.com/justjake/quickjs-emscripten).
It contains a variant of the quickjs WASM library, and can be used with quickjs-emscripten-core.

```typescript
import variant from "@jitl/quickjs-singlefile-browser-release-sync"
import { newQuickJSWASMModuleFromVariant } from "quickjs-emscripten-core"
const QuickJS = await newQuickJSWASMModuleFromVariant(variant)
```

This variant was built with the following settings:

## Contents

- [Library: quickjs](README.md#library-quickjs)
- [Release mode: release](README.md#release-mode-release)
- [Exports: browser](README.md#exports-browser)
- [Extra async magic? No](README.md#extra-async-magic-no)
- [Single-file, or separate .wasm file? singlefile](README.md#single-file-or-separate-wasm-file-singlefile)
- [More details](README.md#more-details)

## Library: quickjs

The original [bellard/quickjs](https://github.com/bellard/quickjs) library.

## Release mode: release

Optimized for performance; use when building/deploying your application.

## Exports: browser

Exports the following in package.json for the package entrypoint:

- Exports a browser-compatible ESModule, designed to work in browsers and browser-like environments.

## Extra async magic? No

The default, normal build. Note that both variants support regular async functions.

## Single-file, or separate .wasm file? singlefile

The WASM runtime is included directly in the JS file. Use if you run into issues with missing .wasm files when building or deploying your app.

## More details

Full variant JSON description:

```json
{
  "library": "quickjs",
  "releaseMode": "release",
  "syncMode": "sync",
  "description": "Variant with the WASM data embedded into a browser ESModule.",
  "emscriptenInclusion": "singlefile",
  "exports": {
    "browser": {
      "emscriptenEnvironment": ["web", "worker"]
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
  "-s SINGLE_FILE=1"
]
```

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
