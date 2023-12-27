# @jitl/quickjs-singlefile-browser-debug-sync

Variant with the WASM data embedded into a browser ESModule.

This generated package is part of [quickjs-emscripten](https://github.com/justjake/quickjs-emscripten).
It contains a variant of the quickjs WASM library, and can be used with quickjs-emscripten-core.

```typescript
import variant from "@jitl/quickjs-singlefile-browser-debug-sync"
import { newQuickJSWASMModuleFromVariant } from "quickjs-emscripten-core"
const QuickJS = await newQuickJSWASMModuleFromVariant(variant)
```

This variant was built with the following settings:

## Library: quickjs

The original [bellard/quickjs](https://github.com/bellard/quickjs) library.

## Release mode: debug

Enables assertions and memory sanitizers. Try to run your tests against debug variants, in addition to your preferred production variant, to catch more bugs.

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
  "releaseMode": "debug",
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
  "-O0",
  "-DQTS_DEBUG_MODE",
  "-gsource-map",
  "-s ASSERTIONS=1",
  "-s SINGLE_FILE=1",
  "-DQTS_SANITIZE_LEAK",
  "-fsanitize=leak",
  "-g2"
]
```
