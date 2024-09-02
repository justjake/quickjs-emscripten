# Changelog

## v0.30.1

- [#137](https://github.com/justjake/quickjs-emscripten/pull/137)
  - Add `quickjs-for-quickjs`, a package that can run inside quickjs, so you can put quickjs inside your quickjs.
  - Fix a build system bug that made commonjs or esm variants include both types, thus being larger than they needed to be.

## v0.30.0

- [#200](https://github.com/justjake/quickjs-emscripten/pull/200) Inspect and iterate handles, equality, changes to result types, changes to debug logging.
- [#195](https://github.com/justjake/quickjs-emscripten/pull/195) Export `setDebugMode`

### Collection & Iteration

- For objects and arrays: add `context.getOwnPropertyNames(handle, options)` to iterate the key or array index handles.
- For arrays: add `context.getLength(handle)` which reads `handle.length` and returns it as a number or undefined to make writing `for (i=0;i<length;i++)` loops easier.
- For iterable collections like Map, Set, Array: add `context.getIterator(handle)` calls `handle[Symbol.iterator]()` and then exposes the result as an `IterableIterator` to host javascript.

### Usability improvements

- The `SuccessOrFail<T, QuickJSHandle>` return type is largely replaced with a new return type `DisposableSuccess<T> | DisposableFail<QuickJSHandle>`. The new type implements `result.unwrap()` as a replacement for `context.unwrapResult(result)`. It also implements `dispose()` directly, so you no longer need to distinguish between success and failure to clean up.
- add `context.callMethod(handle, 'methodName')`, this makes it easier to call methods like `context.callMethod(handle, 'keys')` or `context.callMethod('values')` which can be used with the new iterator.

### Equality

- Added `context.eq(a, b)`, `context.sameValue(a, b)`, `context.sameValueZero(a, b)`

### Debug logging changes

Debug logging is now disabled by default, even when using a DEBUG variant. It can be enabled on a runtime-by-runtime basis with `runtime.setDebugMode(boolean)` or `context.runtime.setDebugMode(boolean)`, or globally using `setDebugMode(boolean)`. As with before, you should use a DEBUG variant to see logs from the WebAssembly C code.

## v0.29.2

- [#179](https://github.com/justjake/quickjs-emscripten/pull/161) Add a work-around for a bug in Webkit ARM to quickjs build variants. quickjs-ng is still affected by this bug.

## v0.29.1

- [#161](https://github.com/justjake/quickjs-emscripten/pull/161) Fix a bug where `context.evalCode(..., { type: 'module' })` would return success when some kinds of error occurred when using `quickjs` variants.
  - Also adds `context.getPromiseState(handle)` to resolve promises synchronously.

## v0.29.0

- [#154](https://github.com/justjake/quickjs-emscripten/pull/154) ESModule exports
  - `context.evalCode(code, filename, { type: "module" })` or when `code` is detected to be a module: now returns a handle to the module's exports, or a promise handle that resolves to the module's exports.
  - Added `context.getPromiseState(handle)` which returns the state of a promise handle, and can be unwrapped with `context.unwrapResult(promiseState)`.
- [#159](https://github.com/justjake/quickjs-emscripten/pull/159) add LICENSE file and SPDX license identifiers to all packages.

## v0.28.0

- [#155](https://github.com/justjake/quickjs-emscripten/pull/155) Update library versions and add versions to documentation.
  - quickjs version [2024-01-13+229b07b9](https://github.com/bellard/quickjs/commit/229b07b9b2c811eaf84db209a1d6f9e2a8a7b0d9) vendored to quickjs-emscripten on 2024-02-11.
    - Evaluating a ES Module with `context.evalCode(...)` now returns a Promise object instead of `undefined`.
  - quickjs-ng version [git+229b07b9](https://github.com/quickjs-ng/quickjs/commit/229b07b9b2c811eaf84db209a1d6f9e2a8a7b0d9) vendored to quickjs-emscripten on 2024-02-11.

## v0.27.0

- [#147](https://github.com/justjake/quickjs-emscripten/pull/147) Support providing and retrieving WebAssembly.Memory
  - Fixes #146 by adding `wasmMemory: WebAssembly.Memory` option for `newVariant`, and `mod.getWasmMemory()` method for `QuickJS[Async]WASMModule`.
  - Fixes #138 by
    - removing internal use of `using` statement.
    - Use ESBuild `Symbol.for('Symbol.dispose')` if `Symbol.dispose` isn't defined globally.

## v0.26.0

- [#136](https://github.com/justjake/quickjs-emscripten/pull/136), [#116](https://github.com/justjake/quickjs-emscripten/pull/116) (thanks to @GrantMatejka) Expose ability to configure Context's intrinsic objects.
- [#135](https://github.com/justjake/quickjs-emscripten/pull/135) (thanks to @saghul) Add `quickjs-ng` variants. quickjs-ng is a fork of quickjs under active development. It implements more EcmaScript standards and removes some of quickjs's custom language features like BigFloat.
- [#134](https://github.com/justjake/quickjs-emscripten/pull/134) Support using statement for Disposable. If you `using value = vm.unwrapResult(vm.evalCode("1+1"))`, the value will be automatically disposed when the scope exits.
- [#133](https://github.com/justjake/quickjs-emscripten/pull/133) WebAssembly loading options & Cloudflare Worker support. Added an example of using quickjs-emscripten in a Cloudflare Worker.

## v0.25.1

- [#130](https://github.com/justjake/quickjs-emscripten/pull/129) Fix some README and docs quibbles.

## v0.25.0

- [#129](https://github.com/justjake/quickjs-emscripten/pull/129) Improve packaging strategy, native ES Modules, and browser-first builds.

### New package layout

`quickjs-emscripten` is re-organized into several NPM packages in a monorepo structure:

- `quickjs-emscripten` (install size 7.5mb) - mostly backwards compatible all-in-one package. This package installs the WASM files for DEBUG_SYNC, DEBUG_ASYNC, RELEASE_SYNC and RELEASE_ASYNC variants as NPM dependencies. Its total install size is reduced from ~
- `quickjs-emscripten-core` (install size 573kb) - just the Typescript code, should be compatible with almost any runtime. You can use this with a single a-la-carte build variant, such as `@jitl/quickjs-wasmfile-release-sync` to reduce the total install size needed to run QuickJS to ~1.1mb.
- Several a-la-carte build variants, named `@jitl/quickjs-{wasmfile,singlefile-{esm,cjs,browser}}-{debug,release}-{sync,asyncify}`. See the [quickjs-emscripten-core docs][core-docs] for more details.

[core-docs]: doc/quickjs-emscripten-core/README.md

### ESModules & Browser support

`quickjs-emscripten` uses [package.json export conditions][conditions] to provide native ES Modules for NodeJS and the browser when appropriate. Most bundlers, like Webpack@5 and Vite, will understand conditions and work out of the box. This should enable advanced tree-shaking, although I'm not sure how much benefit is possible with the library.

You can also use quickjs-emscripten directly from an HTML file in two ways:

```html
<!doctype html>
<!-- Import from a ES Module CDN -->
<script type="module">
  import { getQuickJS } from "https://esm.run/quickjs-emscripten@0.25.0"
  const QuickJS = await getQuickJS()
  console.log(QuickJS.evalCode("1+1"))
</script>
```

In edge cases, you might want to use the IIFE build which provides QuickJS as the global `QJS`.

```html
<!doctype html>
<!-- Add a script tag to load the library as the QJS global -->
<script
  src="https://cdn.jsdelivr.net/npm/quickjs-emscripten@0.25.0-rc.11/dist/index.global.js"
  type="text/javascript"
></script>
<!-- Then use the QJS global in a script tag -->
<script type="text/javascript">
  QJS.getQuickJS().then((QuickJS) => {
    console.log(QuickJS.evalCode("1+1"))
  })
</script>
```

### Breaking Changes

- We now differentiate between runtime environments at build time using Node.JS package.json [export conditions in subpath exports][conditions], instead of including support for all environments in a single build. While this resolves open issues with relatively modern bundlers like webpack@5 and vite, it may cause regressions if you use an older bundler that doesn't understand the "browser" condition.
- The release variants - RELEASE_SYNC (the default), and RELEASE_ASYNC - no longer embed the WebAssembly code inside a JS file. Instead, they attempt to load the WebAssembly code from a separate file. Very old bundlers may not understand this syntax, or your web server may not serve the .wasm files correctly. Please test in a staging environment to verify your production build works as expected.
- quickjs-emscripten now uses [subpath exports in package.json][conditions]. Imports of specific files must be removed. The only valid import paths for quickjs-emscripten are:

  - `import * from 'quickjs-emscripten'` (the library)
  - `import packageJson from 'quickjs-emscripten/package.json'`
  - `import { DEBUG_SYNC, DEBUG_ASYNC, RELEASE_SYNC, RELEASE_ASYNC } from 'quickjs-emscripten/variants'` (these are exported from the main import, but are also available as their own files)

  You should update your imports to use one of these paths. Notably, the WASM files can no longer be directly imported from the `quickjs-emscripten` package.

- If you have errors about missing type files, you may need to upgrade to `typescript@5` and set moduleResolution to `node16` in your tsconfig.json. This shouldn't be necessary for most users.

[conditions]: https://nodejs.org/api/packages.html#conditional-exports

## v0.24.0

- [#127](https://github.com/justjake/quickjs-emscripten/pull/127) Upgrade to quickjs 2023-12-09:

  - added Object.hasOwn, {String|Array|TypedArray}.prototype.at, {Array|TypedArray}.prototype.findLast{Index}
  - BigInt support is enabled even if CONFIG_BIGNUM disabled
  - updated to Unicode 15.0.0
  - misc bug fixes

- [#125](https://github.com/justjake/quickjs-emscripten/pull/125) (thanks to @tbrockman):

  - Synchronizes quickjs to include the recent commit to address CVE-2023-31922.

- [#111](https://github.com/justjake/quickjs-emscripten/pull/111) (thanks to @yourWaifu) ArrayBuffer and binary json encoding:
  - `context.newArrayBuffer(bufferLike)` creates an ArrayBuffer in the VM from a buffer-like object.
  - `context.getArrayBuffer(handle)` creates a view on an ArrayBuffer in the VM as a UInt8Array on the host.
  - `context.encodeBinaryJSON(handle)` encodes a QuickJS handle in QuickJS's binary format (like JSON.stringify)
  - `context.decodeBinaryJSON(handle)` decodes a QuickJS handle containing the binary format (like JSON.parse)

## v0.23.0

- [#114](https://github.com/justjake/quickjs-emscripten/pull/114) (thanks to @yar2001) improve stack size for ASYNCIFY build variants:
  - Change the default ASYNCIFY_STACK_SIZE from 4096 bytes to 81920 bytes. This equates to an increase from approximately 12 to 297 function frames. See the PR for more details.
  - `QuickJSAsyncRuntime.setMaxStackSize(stackSizeBytes)` now also adjusts the ASYNCIFY_STACK_SIZE for the entire module.

## v0.22.0

- [#78](https://github.com/justjake/quickjs-emscripten/pull/78), [#105](https://github.com/justjake/quickjs-emscripten/pull/105) (thanks to @ayaboy) add Symbol helpers `context.newUniqueSymbol`, `context.newSymbolFor`, as well as support for symbols in `context.dump`.
- [#104](https://github.com/justjake/quickjs-emscripten/pull/104) BigInt support.
- [#100](https://github.com/justjake/quickjs-emscripten/pull/100) **Breaking change** upgrade Emscripten version and switch to `async import(...)` for loading variants.
  We also drop support for older browsers and Node versions:

  - Node >= 16 is required
  - Safari >= 14.1 is required
  - Typescript >= 4.7 is recommended, but not required.

## v0.21.2

- [#94](https://github.com/justjake/quickjs-emscripten/pull/94) (thanks to @swimmadude66) allows QuickJS to create many more functions before overflowing.

## v0.21.1

- [#66](https://github.com/justjake/quickjs-emscripten/pull/66) (thanks to @BickelLukas) fixes `ReferenceError` when running in browser due to `global.process`

## v0.21.0

- [#61](https://github.com/justjake/quickjs-emscripten/pull/61) (thanks to @torywheelwright):
  - Add `QuickJSRuntime.setMaxStackSize(stackSizeBytes)` to protect against stack overflows.
  - Add option `maxStackSizeBytes` when creating runtimes.
- Change default branch `master` to `main`.
- Add option `memoryLimitBytes` when creating runtimes.

## v0.20.0

This is a large release! The summary is:

- There are several breaking API changes to align our abstractions with the
  underlying QuickJS library.
- There's a new build variant build with [Emscripten's
  ASYNCIFY](https://emscripten.org/docs/porting/asyncify.html) that allows
  _synchronous_ code _inside_ QuickJS to use _asynchronous_ code running on the
  host.
- Both build variants have basic support for loading and evaluating EcmaScript
  modules, but only the ASYNCIFY variant can asynchronously load EcmaScript code.

### New features

This release introduces `class QuickJSRuntime`. This class wraps QuickJS's `JSRuntime*` type:

> `JSRuntime` represents a Javascript runtime corresponding to an object heap.
> Several runtimes can exist at the same time but they cannot exchange objects.
> Inside a given runtime, no multi-threading is supported.

- `QuickJSRuntime.newContext` creates a new context inside an existing runtime.
- `QuickJSRuntime.setModuleLoader` enables EcmaScript module loading.

This release renames `QuickJSVm` to `class QuickJSContext`, and removes some methods.
The new class wraps QuickJS's `JSContext*` type:

> `JSContext` represents a Javascript context (or Realm). Each JSContext has its
> own global objects and system objects. There can be several JSContexts per
> JSRuntime \[...], similar to frames of the same origin
> sharing Javascript objects in a web browser.

`QuickJSContext` replaces `QuickJSVm` as the main way to interact with the
environment inside the QuickJS virtual machine.

- `QuickJSContext.runtime` provides access to a context's parent runtime.
- `QuickJSContext.evalCode` now takes an options argument to set eval mode
  to `'module'`.

There are also **Asyncified** versions of both `QuickJSRuntime` (`QuickJSRuntimeAsync`) and `QuickJSContext` (`QuickJSContextAsync`). These variants trade some runtime performance for additional features.

- `QuickJSRuntimeAsync.setModuleLoader` accepts module loaders that return
  `Promise<string>`.
- `QuickJSContextAsync.newAsyncifiedFunction` allows creating async functions that
  act like sync functions inside the VM.

### Breaking changes

**`class QuickJSVm` is removed**. Most functionality is available on
`QuickJSContext`, with identical function signatures. Functionality related to
runtime limits, memory limits, and pending jobs moved to `QuickJSRuntime`.

**Migration guide**:

1. Replace usages with QuickJSContext.
2. Replace the following methods:
   - `vm.hasPendingJob` -> `context.runtime.hasPendingJob`
   - `vm.setInterruptHandler` -> `context.runtime.setInterruptHandler`
   - `vm.removeInterruptHandler` -> `context.runtime.removeInterruptHandler`
   - `vm.executePendingJobs` -> `context.runtime.executePendingJobs`
   - `vm.setMemoryLimit` -> `context.runtime.setMemoryLimit`
   - `vm.computeMemoryUsage` -> `context.runtime.computeMemoryUsage`

**`QuickJS.createVm()` is removed.**

**Migration guide**: use `QuickJS.newContext()` instead.

## v0.15.0

This is the last version containing `class QuickJSVm` and constructor
`QuickJS.createVm()`.
