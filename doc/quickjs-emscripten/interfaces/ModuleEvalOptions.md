[quickjs-emscripten](../../packages.md) • **quickjs-emscripten** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../exports.md) / ModuleEvalOptions

# Interface: ModuleEvalOptions

Options for [QuickJSWASMModule#evalCode](../classes/QuickJSWASMModule.md#evalcode).

## Contents

- [Properties](ModuleEvalOptions.md#properties)
  - [maxStackSizeBytes?](ModuleEvalOptions.md#maxstacksizebytes)
  - [memoryLimitBytes?](ModuleEvalOptions.md#memorylimitbytes)
  - [moduleLoader?](ModuleEvalOptions.md#moduleloader)
  - [shouldInterrupt?](ModuleEvalOptions.md#shouldinterrupt)

## Properties

### maxStackSizeBytes?

> **maxStackSizeBytes**?: `number`

Stack size limit for this vm, in bytes
To remove the limit, set to `0`.

#### Source

[packages/quickjs-emscripten-core/src/module.ts:82](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module.ts#L82)

***

### memoryLimitBytes?

> **memoryLimitBytes**?: `number`

Memory limit, in bytes, of WebAssembly heap memory used by the QuickJS VM.

#### Source

[packages/quickjs-emscripten-core/src/module.ts:76](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module.ts#L76)

***

### moduleLoader?

> **moduleLoader**?: [`JSModuleLoader`](JSModuleLoader.md)

Module loader for any `import` statements or expressions.

#### Source

[packages/quickjs-emscripten-core/src/module.ts:87](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module.ts#L87)

***

### shouldInterrupt?

> **shouldInterrupt**?: [`InterruptHandler`](../exports.md#interrupthandler)

Interrupt evaluation if `shouldInterrupt` returns `true`.
See [shouldInterruptAfterDeadline](../exports.md#shouldinterruptafterdeadline).

#### Source

[packages/quickjs-emscripten-core/src/module.ts:71](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module.ts#L71)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
