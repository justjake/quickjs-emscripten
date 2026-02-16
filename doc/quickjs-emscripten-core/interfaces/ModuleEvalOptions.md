[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../README.md) / ModuleEvalOptions

# Interface: ModuleEvalOptions

Defined in: [packages/quickjs-emscripten-core/src/module.ts:69](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module.ts#L69)

Options for [QuickJSWASMModule#evalCode](../classes/QuickJSWASMModule.md#evalcode).

* [Properties](#properties)

  * [maxStackSizeBytes?](#maxstacksizebytes)
  * [memoryLimitBytes?](#memorylimitbytes)
  * [moduleLoader?](#moduleloader)
  * [shouldInterrupt?](#shouldinterrupt)

## Properties

### maxStackSizeBytes?

> `optional` **maxStackSizeBytes**: `number`

Defined in: [packages/quickjs-emscripten-core/src/module.ts:85](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module.ts#L85)

Stack size limit for this vm, in bytes
To remove the limit, set to `0`.

***

### memoryLimitBytes?

> `optional` **memoryLimitBytes**: `number`

Defined in: [packages/quickjs-emscripten-core/src/module.ts:79](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module.ts#L79)

Memory limit, in bytes, of WebAssembly heap memory used by the QuickJS VM.

***

### moduleLoader?

> `optional` **moduleLoader**: [`JSModuleLoader`](JSModuleLoader.md)

Defined in: [packages/quickjs-emscripten-core/src/module.ts:90](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module.ts#L90)

Module loader for any `import` statements or expressions.

***

### shouldInterrupt?

> `optional` **shouldInterrupt**: [`InterruptHandler`](../type-aliases/InterruptHandler.md)

Defined in: [packages/quickjs-emscripten-core/src/module.ts:74](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/module.ts#L74)

Interrupt evaluation if `shouldInterrupt` returns `true`.
See [shouldInterruptAfterDeadline](../functions/shouldInterruptAfterDeadline.md).
