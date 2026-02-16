[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / @jitl/quickjs-ng-wasmfile-release-sync

# @jitl/quickjs-ng-wasmfile-release-sync

Variant with separate .WASM file. Supports browser ESM, NodeJS ESM, and NodeJS CommonJS.

This generated package is part of [quickjs-emscripten](https://github.com/justjake/quickjs-emscripten).
It contains a variant of the quickjs WASM library, and can be used with quickjs-emscripten-core.

```typescript
import variant from "@jitl/quickjs-ng-wasmfile-release-sync"
import { newQuickJSWASMModuleFromVariant } from "quickjs-emscripten-core"
const QuickJS = await newQuickJSWASMModuleFromVariant(variant)
```

This variant was built with the following settings:

## Library: quickjs-ng

[quickjs-ng](https://github.com/quickjs-ng/quickjs) is a fork of quickjs that tends to add features more quickly.

Version [v0.12.1](https://github.com/quickjs-ng/quickjs/releases/tag/v0.12.1) vendored to quickjs-emscripten.

## Release mode: release

Optimized for performance; use when building/deploying your application.

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
  "library": "quickjs-ng",
  "releaseMode": "release",
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
  "-Oz",
  "-flto",
  "--closure 1",
  "-s FILESYSTEM=0",
  "--pre-js $(TEMPLATES)/pre-extension.js",
  "--pre-js $(TEMPLATES)/pre-wasmMemory.js"
]
```

## Variables

### default

> `const` **default**: [`QuickJSSyncVariant`](../../quickjs-emscripten/interfaces/QuickJSSyncVariant.md)

Defined in: [index.ts:18](https://github.com/justjake/quickjs-emscripten/blob/main/packages/variant-quickjs-ng-wasmfile-release-sync/src/index.ts#L18)

### @jitl/quickjs-ng-wasmfile-release-sync

[Docs](https://github.com/justjake/quickjs-emscripten/blob/main/doc/@jitl/quickjs-ng-wasmfile-release-sync/README.md) |
Variant with separate .WASM file. Supports browser ESM, NodeJS ESM, and NodeJS CommonJS.

| Variable            |    Setting                     |    Description    |
| --                  | --                             | --                |
| library             | quickjs-ng             | [quickjs-ng](https://github.com/quickjs-ng/quickjs) is a fork of quickjs that tends to add features more quickly. Version [v0.12.1](https://github.com/quickjs-ng/quickjs/releases/tag/v0.12.1) vendored to quickjs-emscripten. |
| releaseMode         | release         | Optimized for performance; use when building/deploying your application. |
| syncMode            | sync            | The default, normal build. Note that both variants support regular async functions. |
| emscriptenInclusion | wasm | Has a separate .wasm file. May offer better caching in your browser, and reduces the size of your JS bundle. If you have issues, try a 'singlefile' variant. |
| exports             | require import browser workerd                  | Has these package.json export conditions |
