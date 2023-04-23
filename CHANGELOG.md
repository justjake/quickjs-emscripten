# Changelog

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
