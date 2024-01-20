# @jitl/quickjs-ng-purejs-mjs-release-sync

Compiled to pure JS, no WebAssembly required. Very slow.

This generated package is part of [quickjs-emscripten](https://github.com/justjake/quickjs-emscripten).
It contains a variant of the quickjs WASM library, and can be used with quickjs-emscripten-core.

```typescript
import variant from "@jitl/quickjs-ng-purejs-mjs-release-sync"
import { newQuickJSWASMModuleFromVariant } from "quickjs-emscripten-core"
const QuickJS = await newQuickJSWASMModuleFromVariant(variant)
```

This variant was built with the following settings:

## Library: quickjs-ng

[quickjs-ng/quickjs](https://github.com/quickjs-ng/quickjs) is a newer fork of quickjs under active community development. It implements more EcmaScript features, and drop some non-standard QuickJS only features like BigFloat. May become the default library in a future version of quickjs-emscripten.

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
  "library": "quickjs-ng",
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
