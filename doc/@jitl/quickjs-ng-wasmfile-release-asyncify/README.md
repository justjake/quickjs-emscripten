[quickjs-emscripten](../../packages.md) • **@jitl/quickjs-ng-wasmfile-release-asyncify** • [Readme](README.md) \| [Exports](exports.md)

***

# @jitl/quickjs-ng-wasmfile-release-asyncify

Variant with separate .WASM file. Supports browser ESM, NodeJS ESM, and NodeJS CommonJS.

This generated package is part of [quickjs-emscripten](https://github.com/justjake/quickjs-emscripten).
It contains a variant of the quickjs WASM library, and can be used with quickjs-emscripten-core.

```typescript
import variant from "@jitl/quickjs-ng-wasmfile-release-asyncify"
import { newQuickJSAsyncWASMModuleFromVariant } from "quickjs-emscripten-core"
const QuickJS = await newQuickJSAsyncWASMModuleFromVariant(variant)
```

This variant was built with the following settings:

## Contents

- [Library: quickjs-ng](README.md#library-quickjs-ng)
- [Release mode: release](README.md#release-mode-release)
- [Exports: require import browser workerd](README.md#exports-require-import-browser-workerd)
- [Extra async magic? Yes](README.md#extra-async-magic-yes)
- [Single-file, or separate .wasm file? wasm](README.md#single-file-or-separate-wasm-file-wasm)
- [More details](README.md#more-details)

## Library: quickjs-ng

[quickjs-ng](https://github.com/quickjs-ng/quickjs) is a fork of quickjs that tends to add features more quickly.

Version [git+7ded62c5](https://github.com/quickjs-ng/quickjs/commit/7ded62c536fca860b8106c39fb75f2df8fe27180) vendored to quickjs-emscripten on 2024-02-12.

## Release mode: release

Optimized for performance; use when building/deploying your application.

## Exports: require import browser workerd

Exports the following in package.json for the package entrypoint:

- Exports a NodeJS-compatible CommonJS module, which is faster to load and run compared to an ESModule.
- Exports a NodeJS-compatible ESModule. Cannot be imported synchronously from a NodeJS CommonJS module.
- Exports a browser-compatible ESModule, designed to work in browsers and browser-like environments.
- Targets Cloudflare Workers.

## Extra async magic? Yes

Build run through the ASYNCIFY WebAssembly transform. This imposes substantial size (2x the size of sync) and speed penalties (40% the speed of sync). In return, allows synchronous calls from the QuickJS WASM runtime to async functions on the host. The extra magic makes this variant slower than sync variants. Note that both variants support regular async functions. Only adopt ASYNCIFY if you need to! The [QuickJSAsyncRuntime](https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten/classes/QuickJSAsyncRuntime.md) and [QuickJSAsyncContext](https://github.com/justjake/quickjs-emscripten/blob/main/doc/quickjs-emscripten/classes/QuickJSAsyncContext.md) classes expose the ASYNCIFY-specific APIs.

## Single-file, or separate .wasm file? wasm

Has a separate .wasm file. May offer better caching in your browser, and reduces the size of your JS bundle. If you have issues, try a 'singlefile' variant.

## More details

Full variant JSON description:

```json
{
  "library": "quickjs-ng",
  "releaseMode": "release",
  "syncMode": "asyncify",
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
  "-s ASYNCIFY=1",
  "-DQTS_ASYNCIFY=1",
  "-DQTS_ASYNCIFY_DEFAULT_STACK_SIZE=81920",
  "-s ASYNCIFY_STACK_SIZE=81920",
  "-s ASYNCIFY_REMOVE=@$(BUILD_WRAPPER)/asyncify-remove.json",
  "-s ASYNCIFY_IMPORTS=@$(BUILD_WRAPPER)/asyncify-imports.json",
  "-lasync.js",
  "-Oz",
  "-flto",
  "--closure 1",
  "-s FILESYSTEM=0",
  "--pre-js $(TEMPLATES)/pre-extension.js",
  "--pre-js $(TEMPLATES)/pre-wasmMemory.js"
]
```

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
