<!-- __EDIT_THIS_FILE_NOT_README_MD__ -->

# quickjs-emscripten-core

This package is part of [quickjs-emscripten](https://github.com/justjakel/quickjs-emscripten), a Javascript interface for QuickJS compiled to WebAssembly via Emscripten.

This package (`quickjs-emscripten-core`) contains only Javascript code - no WebAssembly. To use this package, you'll need to install one or more _variants_ of the QuickJS WebAssembly build, see [available variants](#Available-variants) below.

```typescript
// 1. Import a QuickJS module constructor function from quickjs-emscripten-core
import { newQuickJSWASMModuleFromVariant } from "quickjs-emscripten-core"

// 2. Import a variant suitable for your use case. For example, if you only care to
//    target with the fastest execution speed, import the release build variant
import releaseVariant from "@jitl/quickjs-singlefile-cjs-release-sync"

// 3. Create the "QuickJS" module that presents the quickjs-emscripten API.
//    Export and use in other files, or consume directly.
const QuickJS = await newQuickJSWASMModuleFromVariant(releaseVariant)
```

## What's a variant?

A variant describes how to load a QuickJS WebAssembly build and how to call the low-level C API functions used by the higher-level abstractions in `quickjs-emscripten-core`. A variant is an object with the following properties:

```typescript
const variant = {
  // This should be `async` if the variant is built with ASYNCIFY
  // so that the WebAssembly module execution can be suspended.
  //
  // Otherwise, this should be `sync`.
  type: "sync",
  // This should be a function that resolves to a QuickJSFFI class.
  importFFI: () => import("something/ffi.ts").then((mod) => mod.QuickJSFFI),
  // This should be a function that resolves to a Emscripten-shaped WASM module factory.
  importModuleLoader: () => import("something/emscripten-module.ts"),
}
```

You can provide your own variant to control exactly how the large WebAssembly object is loaded. `quickjs-emscripten-core` will call your variant's importXYZ methods during `newQuickJSWASMModuleFromVariant` or `newQuickJSAsyncWASMModuleFromVariant`.

## Environment-specific variants

You can use [subpath imports in package.json](https://nodejs.org/api/packages.html#subpath-imports) to select the appropriate variant for a runtime. This is how the main `quickjs-emscripten` package picks between browser, Node ESM and Node CommonJS variants.

```json
// in your package.json
{
  "imports": {
    "#my-quickjs-variant": {
      "types": "@jitl/quickjs-wasmfile-release-sync",
      // In the browser, use the singlefile variant that doesn't need an external file
      "browser": "@jitl/quickjs-singlefile-browser-release-sync",
      // Otherwise, use the wasmfile variant, compatible with all environments
      "default": "@jitl/quickjs-wasmfile-release-sync"
    }
  }
}
```

```typescript
// In your code
import { newQuickJSWASMModuleFromVariant } from "quickjs-emscripten-core"
import variant from "#my-quickjs-variant"
const QuickJS = await newQuickJSWASMModuleFromVariant(variant)
```

## Available variants

<!-- __VARIANTS__ -->
