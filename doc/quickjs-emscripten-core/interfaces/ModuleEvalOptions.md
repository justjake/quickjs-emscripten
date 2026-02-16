[quickjs-emscripten](../../packages.md) • **quickjs-emscripten-core** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../exports.md) / ModuleEvalOptions

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

[packages/quickjs-emscripten-core/src/module.ts:86](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module.ts#L86)

***

### memoryLimitBytes?

> **memoryLimitBytes**?: `number`

Memory limit, in bytes, of WebAssembly heap memory used by the QuickJS VM.

#### Source

[packages/quickjs-emscripten-core/src/module.ts:80](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module.ts#L80)

***

### moduleLoader?

> **moduleLoader**?: [`JSModuleLoader`](JSModuleLoader.md)

Module loader for any `import` statements or expressions.

#### Source

[packages/quickjs-emscripten-core/src/module.ts:91](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module.ts#L91)

***

### shouldInterrupt?

> **shouldInterrupt**?: [`InterruptHandler`](../exports.md#interrupthandler)

Interrupt evaluation if `shouldInterrupt` returns `true`.
See [shouldInterruptAfterDeadline](../exports.md#shouldinterruptafterdeadline).

#### Source

[packages/quickjs-emscripten-core/src/module.ts:75](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module.ts#L75)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
