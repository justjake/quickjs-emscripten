[quickjs-emscripten](../README.md) / [Exports](../modules.md) / ModuleEvalOptions

# Interface: ModuleEvalOptions

Options for [QuickJSWASMModule.evalCode](../classes/QuickJSWASMModule.md#evalcode).

## Table of contents

### Properties

- [memoryLimitBytes](ModuleEvalOptions.md#memorylimitbytes)
- [moduleLoader](ModuleEvalOptions.md#moduleloader)
- [shouldInterrupt](ModuleEvalOptions.md#shouldinterrupt)

## Properties

### memoryLimitBytes

• `Optional` **memoryLimitBytes**: `number`

Memory limit, in bytes, of WebAssembly heap memory used by the QuickJS VM.

#### Defined in

ts/module.ts:95

___

### moduleLoader

• `Optional` **moduleLoader**: [`JSModuleLoader`](JSModuleLoader.md)

Module loader for any `import` statements or expressions.

#### Defined in

ts/module.ts:100

___

### shouldInterrupt

• `Optional` **shouldInterrupt**: [`InterruptHandler`](../modules.md#interrupthandler)

Interrupt evaluation if `shouldInterrupt` returns `true`.
See [shouldInterruptAfterDeadline](../modules.md#shouldinterruptafterdeadline).

#### Defined in

ts/module.ts:90
