[quickjs-emscripten](../../packages.md) • **@jitl/quickjs-purejs-mjs-release-sync** • [Readme](README.md) \| [Exports](exports.md)

***

# @jitl/quickjs-purejs-mjs-release-sync

Compiled to pure JS, no WebAssembly required. Very slow.

This generated package is part of [quickjs-emscripten](https://github.com/justjake/quickjs-emscripten).
It contains a variant of the quickjs WASM library, and can be used with quickjs-emscripten-core.

```typescript
import variant from "@jitl/quickjs-purejs-mjs-release-sync"
import { newQuickJSWASMModuleFromVariant } from "quickjs-emscripten-core"
const QuickJS = await newQuickJSWASMModuleFromVariant(variant)
```

This variant was built with the following settings:

## Contents

- [Library: quickjs](README.md#library-quickjs)
- [Release mode: release](README.md#release-mode-release)
- [Exports: import](README.md#exports-import)
- [Extra async magic? No](README.md#extra-async-magic-no)
- [Single-file, or separate .wasm file? purejs](README.md#single-file-or-separate-wasm-file-purejs)
- [More details](README.md#more-details)

## Library: quickjs

The original [bellard/quickjs](https://github.com/bellard/quickjs) library.

## Release mode: release

Optimized for performance; use when building/deploying your application.

## Exports: import

Exports the following in package.json for the package entrypoint:

- Exports a NodeJS-compatible ESModule. Cannot be imported synchronously from a NodeJS CommonJS module.

## Extra async magic? No

The default, normal build. Note that both variants support regular async functions.

## Single-file, or separate .wasm file? purejs

The C library code is compiled directly to JS. This is the slowest possible option, and is intended only for humorous (quickjs-in-quickjs) use.

## More details

Full variant JSON description:

```json
{
  "library": "quickjs",
  "releaseMode": "release",
  "syncMode": "sync",
  "description": "Compiled to pure JS, no WebAssembly required. Very slow.",
  "emscriptenInclusion": "purejs",
  "exports": {
    "import": {
      "emscriptenEnvironment": ["web", "worker", "node"]
    }
  }
}
```

Variant-specific Emscripten build flags:

```json
["-Oz", "-flto", "--closure 1", "-s FILESYSTEM=0", "-s WASM=0", "-s SINGLE_FILE=1"]
```

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
