[quickjs-emscripten](../../packages.md) • **quickjs-emscripten** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../exports.md) / ModuleEvalOptions

# Interface: ModuleEvalOptions

Options for [[QuickJSWASMModule.evalCode]].

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

quickjs-emscripten-core/dist/index.d.ts:1095

***

### memoryLimitBytes?

> **memoryLimitBytes**?: `number`

Memory limit, in bytes, of WebAssembly heap memory used by the QuickJS VM.

#### Source

quickjs-emscripten-core/dist/index.d.ts:1090

***

### moduleLoader?

> **moduleLoader**?: [`JSModuleLoader`](JSModuleLoader.md)

Module loader for any `import` statements or expressions.

#### Source

quickjs-emscripten-core/dist/index.d.ts:1099

***

### shouldInterrupt?

> **shouldInterrupt**?: [`InterruptHandler`](../exports.md#interrupthandler)

Interrupt evaluation if `shouldInterrupt` returns `true`.
See [[shouldInterruptAfterDeadline]].

#### Source

quickjs-emscripten-core/dist/index.d.ts:1086

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
