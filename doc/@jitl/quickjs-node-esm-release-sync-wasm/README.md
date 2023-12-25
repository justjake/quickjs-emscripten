[quickjs-emscripten](../../packages.md) • **@jitl/quickjs-node-esm-release-sync-wasm** • [Readme](README.md) \| [Exports](exports.md)

***

# @jitl/quickjs-node-esm-release-sync-wasm

Node.js ESModule

This generated package is part of [quickjs-emscripten](https://github.com/justjake/quickjs-emscripten).
It contains a variant of the quickjs WASM library, and can be used with quickjs-emscripten-core.

```typescript
import variant from "@jitl/quickjs-node-esm-release-sync-wasm"
import { newQuickJSWASMModuleFromVariant } from "quickjs-emscripten-core"
const QuickJS = await newQuickJSWASMModuleFromVariant(variant)
```

This variant was built with the following settings:

## Contents

- [Library: quickjs](README.md#library-quickjs)
- [Release mode: release](README.md#release-mode-release)
- [Module system: esm](README.md#module-system-esm)
- [Extra async magic? No](README.md#extra-async-magic-no)
- [Single-file, or separate .wasm file? wasm](README.md#single-file-or-separate-wasm-file-wasm)
- [More details](README.md#more-details)

## Library: quickjs

The original [bellard/quickjs](https://github.com/bellard/quickjs) library.

## Release mode: release

Optimized for performance; use when building/deploying your application.

## Module system: esm

This variant exports an ESModule, which is standardized for browsers and more modern browser-like environments. It cannot be imported from CommonJS without shenanigans.

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
  "emscriptenInclusion": "wasm",
  "description": "Node.js ESModule",
  "emscriptenEnvironment": ["node"],
  "moduleSystem": "esm"
}
```

Variant-specific Emscripten build flags:

```json
["-Oz", "-flto", "--closure 1", "-s FILESYSTEM=0", "-s EXPORT_ES6=1", "-s ENVIRONMENT=node"]
```

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
