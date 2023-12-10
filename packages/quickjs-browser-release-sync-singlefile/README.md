# @jitl/quickjs-browser-release-sync-singlefile

ESModule for browsers or browser-like environments

This generated package is part of [quickjs-emscripten](https://github.com/justjake/quickjs-emscripten).
It contains a variant of the quickjs WASM library built with the following configuration:

## Library: quickjs

The original [bellard/quickjs](https://github.com/bellard/quickjs) library.

## Release mode: release

Optimized for performance; use when building/deploying your application.

## Module system: esm

This variant exports an ESModule, which is standardized for browsers and more modern browser-like environments. It cannot be imported from CommonJS without shenanigans.

## Extra async magic? No

The default, normal build. Note that both variants support regular async functions.

## Single-file, or separate .wasm file? singlefile

The WASM runtime is included directly in the JS file. Use if you run into issues with missing .wasm files when building or deploying your app

## More details

Full variant JSON description:

```json
{
  "library": "quickjs",
  "releaseMode": "release",
  "syncMode": "sync",
  "emscriptenInclusion": "singlefile",
  "description": "ESModule for browsers or browser-like environments",
  "emscriptenEnvironment": [
    "web",
    "worker"
  ],
  "moduleSystem": "esm"
}
```

Variant-specific Emscripten build flags:

```json
[
  "-0z",
  "-flto"
]
```
