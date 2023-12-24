[quickjs-emscripten](../../packages.md) • **@jitl/quickjs-node-esm-debug-asyncify-wasm** • [Readme](index.md) \| [Exports](exports.md)

***

# @jitl/quickjs-node-esm-debug-asyncify-wasm

Node.js ESModule

This generated package is part of [quickjs-emscripten](https://github.com/justjake/quickjs-emscripten).
It contains a variant of the quickjs WASM library, and can be used with quickjs-emscripten-core.

```typescript
import variant from "@jitl/quickjs-node-esm-debug-asyncify-wasm"
import { newQuickJSAsyncWASMModuleFromVariant } from "quickjs-emscripten-core"
const QuickJS = await newQuickJSAsyncWASMModuleFromVariant(variant)
```

This variant was built with the following settings:

## Contents

- [Library: quickjs](index.md#library-quickjs)
- [Release mode: debug](index.md#release-mode-debug)
- [Module system: esm](index.md#module-system-esm)
- [Extra async magic? Yes](index.md#extra-async-magic-yes)
- [Single-file, or separate .wasm file? wasm](index.md#single-file-or-separate-wasm-file-wasm)
- [More details](index.md#more-details)

## Library: quickjs

The original [bellard/quickjs](https://github.com/bellard/quickjs) library.

## Release mode: debug

Enables assertions and memory sanitizers. Try to run your tests against debug variants, in addition to your preferred production variant, to catch more bugs.

## Module system: esm

This variant exports an ESModule, which is standardized for browsers and more modern browser-like environments. It cannot be imported from CommonJS without shenanigans.

## Extra async magic? Yes

Build run through the ASYNCIFY WebAssembly transform. Larger and slower. Allows synchronous calls from the WASM runtime to async functions on the host. The extra magic makes this variant slower than sync variants. Note that both variants support regular async functions. Only adopt ASYNCIFY if you need to!

## Single-file, or separate .wasm file? wasm

Has a separate .wasm file. May offer better caching in your browser, and reduces the size of your JS bundle. If you have issues, try a 'singlefile' variant.

## More details

Full variant JSON description:

```json
{
  "library": "quickjs",
  "releaseMode": "debug",
  "syncMode": "asyncify",
  "emscriptenInclusion": "wasm",
  "description": "Node.js ESModule",
  "emscriptenEnvironment": ["node"],
  "moduleSystem": "esm"
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
  "-O0",
  "-DQTS_DEBUG_MODE",
  "-gsource-map",
  "-s ASSERTIONS=1",
  "-s EXPORT_ES6=1",
  "-s ENVIRONMENT=node",
  "-s ASYNCIFY_ADVISE=1",
  "-O3"
]
```

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)