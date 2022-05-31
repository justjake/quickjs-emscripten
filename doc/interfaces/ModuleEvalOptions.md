[quickjs-emscripten](../README.md) / [Exports](../modules.md) / ModuleEvalOptions

# Interface: ModuleEvalOptions

Options for [QuickJSWASMModule.evalCode](../classes/QuickJSWASMModule.md#evalcode).

## Table of contents

### Properties

- [maxStackSizeBytes](ModuleEvalOptions.md#maxstacksizebytes)
- [memoryLimitBytes](ModuleEvalOptions.md#memorylimitbytes)
- [moduleLoader](ModuleEvalOptions.md#moduleloader)
- [shouldInterrupt](ModuleEvalOptions.md#shouldinterrupt)

## Properties

### maxStackSizeBytes

• `Optional` **maxStackSizeBytes**: `number`

Stack size limit for this vm, in bytes
To remove the limit, set to `0`.

#### Defined in

[ts/module.ts:87](https://github.com/justjake/quickjs-emscripten/blob/main/ts/module.ts#L87)

___

### memoryLimitBytes

• `Optional` **memoryLimitBytes**: `number`

Memory limit, in bytes, of WebAssembly heap memory used by the QuickJS VM.

#### Defined in

[ts/module.ts:81](https://github.com/justjake/quickjs-emscripten/blob/main/ts/module.ts#L81)

___

### moduleLoader

• `Optional` **moduleLoader**: [`JSModuleLoader`](JSModuleLoader.md)

Module loader for any `import` statements or expressions.

#### Defined in

[ts/module.ts:92](https://github.com/justjake/quickjs-emscripten/blob/main/ts/module.ts#L92)

___

### shouldInterrupt

• `Optional` **shouldInterrupt**: [`InterruptHandler`](../modules.md#interrupthandler)

Interrupt evaluation if `shouldInterrupt` returns `true`.
See [shouldInterruptAfterDeadline](../modules.md#shouldinterruptafterdeadline).

#### Defined in

[ts/module.ts:76](https://github.com/justjake/quickjs-emscripten/blob/main/ts/module.ts#L76)
