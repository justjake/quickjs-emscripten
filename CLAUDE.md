# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

quickjs-emscripten provides JavaScript/TypeScript bindings for QuickJS (a JavaScript interpreter) compiled to WebAssembly. It enables safe evaluation of untrusted JavaScript in browsers, Node.js, Deno, Bun, and Cloudflare Workers.

## Common Commands

```bash
yarn check              # Run all checks (build, format, tests, type-checking, linting)
yarn build              # Full build: codegen + packages + docs
yarn build:codegen      # Generate variant packages from templates
yarn build:packages     # Build all variant packages in parallel
yarn test               # Run all tests
yarn test:fast          # Fast tests only (skip async variants)
yarn test:slow          # Tests with memory leak detection
yarn lint               # ESLint
yarn lint --fix         # Auto-fix lint issues
yarn prettier           # Format with Prettier
yarn doc                # Generate TypeDoc documentation
```

## Architecture

### Package Structure

The monorepo contains these key packages in `packages/`:

1. **@jitl/quickjs-ffi-types** - Low-level FFI types defining the C interface. No WebAssembly linkage.

2. **quickjs-emscripten-core** - High-level TypeScript abstractions (QuickJSContext, QuickJSRuntime, QuickJSWASMModule, Lifetime, Scope). Does NOT include WebAssembly - callers must provide a variant.

3. **quickjs-emscripten** - Main user-facing package. Combines core with pre-built WASM variants. Entry point: `getQuickJS()`.

4. **Variant packages** (28 total) - Pre-compiled WebAssembly modules with different configurations:
   - Naming: `variant-{BASE}-{FORMAT}-{OPTIMIZATION}-{MODE}`
   - BASE: `quickjs` or `quickjs-ng`
   - FORMAT: `wasmfile` or `singlefile`
   - OPTIMIZATION: `release` or `debug`
   - MODE: `sync` or `asyncify`

### C/WASM Layer

- **c/interface.c** - Main C wrapper around QuickJS. Functions prefixed `QTS_` are exported to JavaScript via FFI.
- **vendor/quickjs/** - Official QuickJS C library
- **vendor/quickjs-ng/** - QuickJS-ng fork
- **templates/Variant.mk** - Makefile template for building variants

### Code Generation

- `scripts/prepareVariants.ts` - Generates variant packages from templates
- `scripts/generate.ts` - Generates FFI bindings from C function signatures
- `scripts/emcc.sh` - Emscripten wrapper with Docker fallback

## Key Concepts

### Memory Management

Handles to QuickJS values must be manually disposed with `.dispose()`. The library supports:
- Explicit `.dispose()` calls
- `using` statement (Stage 3 proposal)
- `Scope` class for batch disposal
- `Lifetime.consume(fn)` for use-then-dispose pattern

### Asyncify

Special build variants use Emscripten's ASYNCIFY transform to allow synchronous QuickJS code to call async host functions. Comes with 2x size overhead. Only one async operation can suspend at a time per module.

### Build Variants

- RELEASE_SYNC - Default production variant
- RELEASE_ASYNC - Production with asyncify
- DEBUG_SYNC - Development with memory leak detection
- DEBUG_ASYNC - Development with asyncify

## Testing

Main test suite: `packages/quickjs-emscripten/src/quickjs.test.ts`

Tests use Vitest. The DEBUG_SYNC variant enables memory leak detection - use `TestQuickJSWASMModule.assertNoMemoryAllocated()` to verify handles are disposed.

## Build Requirements

- Node.js 16+
- Yarn 4.0.2 (workspaces)
- Emscripten 3.1.65 (or Docker fallback via `scripts/emcc.sh`)
