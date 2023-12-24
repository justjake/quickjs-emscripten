[quickjs-emscripten](../../packages.md) • **@jitl/quickjs-browser-release-sync-singlefile** • [Readme](index.md) \| [Exports](exports.md)

***

# @jitl/quickjs-browser-release-sync-singlefile

ESModule for browsers or browser-like environments

This generated package is part of [quickjs-emscripten](https://github.com/justjake/quickjs-emscripten).
It contains a variant of the quickjs WASM library, and can be used with quickjs-emscripten-core.

```typescript
import variant from "@jitl/quickjs-browser-release-sync-singlefile"
import { newQuickJSWASMModuleFromVariant } from "quickjs-emscripten-core"
const QuickJS = await newQuickJSWASMModuleFromVariant(variant)
```

This variant was built with the following settings:

## Contents

- [Library: quickjs](index.md#library-quickjs)
- [Release mode: release](index.md#release-mode-release)
- [Module system: esm](index.md#module-system-esm)
- [Extra async magic? No](index.md#extra-async-magic-no)
- [Single-file, or separate .wasm file? singlefile](index.md#single-file-or-separate-wasm-file-singlefile)
- [More details](index.md#more-details)

## Library: quickjs

The original [bellard/quickjs](https://github.com/bellard/quickjs) library.

## Release mode: release

Optimized for performance; use when building/deploying your application.

## Module system: esm

This variant exports an ESModule, which is standardized for browsers and more modern browser-like environments. It cannot be imported from CommonJS without shenanigans.

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
  "emscriptenInclusion": "singlefile",
  "description": "ESModule for browsers or browser-like environments",
  "emscriptenEnvironment": ["web", "worker"],
  "moduleSystem": "esm"
}
```

Variant-specific Emscripten build flags:

```json
[
  "-Oz",
  "-flto",
  "-s SINGLE_FILE=1",
  "--closure 1",
  "-s FILESYSTEM=0",
  "-s SINGLE_FILE=1",
  "-s EXPORT_ES6=1",
  "-s ENVIRONMENT=web,worker"
]
```

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)