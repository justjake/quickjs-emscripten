[quickjs-emscripten](../README.md) / [Exports](../modules.md) / [vm](../modules/vm.md) / QuickJSEvalOptions

# Interface: QuickJSEvalOptions

[vm](../modules/vm.md).QuickJSEvalOptions

Options for [[QuickJS.evalCode]].

## Table of contents

### Properties

- [memoryLimitBytes](vm.QuickJSEvalOptions.md#memorylimitbytes)
- [shouldInterrupt](vm.QuickJSEvalOptions.md#shouldinterrupt)

## Properties

### memoryLimitBytes

• `Optional` **memoryLimitBytes**: `number`

Memory limit, in bytes, of WASM heap memory used by the QuickJS VM.

#### Defined in

[vm.ts:119](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L119)

___

### shouldInterrupt

• `Optional` **shouldInterrupt**: [`InterruptHandler`](../modules/vm.md#interrupthandler)

Interrupt evaluation if `shouldInterrupt` returns `true`.
See [shouldInterruptAfterDeadline](../modules/quickjs.md#shouldinterruptafterdeadline).

#### Defined in

[vm.ts:114](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L114)
