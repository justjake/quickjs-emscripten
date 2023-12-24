# @jitl/quickjs-node-cjs-debug-sync-wasm

Node.js CommonJS module

This generated package is part of [quickjs-emscripten](https://github.com/justjake/quickjs-emscripten).
It contains a variant of the quickjs WASM library, and can be used with quickjs-emscripten-core.

```typescript
import variant from "@jitl/quickjs-node-cjs-debug-sync-wasm"
import { newQuickJSWASMModuleFromVariant } from "quickjs-emscripten-core"
const QuickJS = await newQuickJSWASMModuleFromVariant(variant)
```

This variant was built with the following settings:

## Library: quickjs

The original [bellard/quickjs](https://github.com/bellard/quickjs) library.

## Release mode: debug

Enables assertions and memory sanitizers. Try to run your tests against debug variants, in addition to your preferred production variant, to catch more bugs.

## Module system: commonjs

This variant exports a CommonJS module, which is faster to load and run in Node.js.

## Extra async magic? No

The default, normal build. Note that both variants support regular async functions.

## Single-file, or separate .wasm file? wasm

Has a separate .wasm file. May offer better caching in your browser, and reduces the size of your JS bundle. If you have issues, try a 'singlefile' variant.

## More details

Full variant JSON description:

```json
{
  "library": "quickjs",
  "releaseMode": "debug",
  "syncMode": "sync",
  "emscriptenInclusion": "wasm",
  "description": "Node.js CommonJS module",
  "emscriptenEnvironment": ["node"],
  "moduleSystem": "commonjs"
}
```

Variant-specific Emscripten build flags:

```json
[
  "-O0",
  "-DQTS_DEBUG_MODE",
  "-gsource-map",
  "-s ASSERTIONS=1",
  "-s ENVIRONMENT=node",
  "-DQTS_SANITIZE_LEAK",
  "-fsanitize=leak",
  "-g2",
  "-s ASYNCIFY_ADVISE=1",
  "-O3"
]
```
