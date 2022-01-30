[quickjs-emscripten](../README.md) / [Exports](../modules.md) / [quickjsvm](../modules/quickjsvm.md) / QuickJSEvalOptions

# Interface: QuickJSEvalOptions

[quickjsvm](../modules/quickjsvm.md).QuickJSEvalOptions

Options for [QuickJS.evalCode](../classes/quickjs.QuickJS.md#evalcode).

## Table of contents

### Properties

- [memoryLimitBytes](quickjsvm.QuickJSEvalOptions.md#memorylimitbytes)
- [shouldInterrupt](quickjsvm.QuickJSEvalOptions.md#shouldinterrupt)

## Properties

### memoryLimitBytes

• `Optional` **memoryLimitBytes**: `number`

Memory limit, in bytes, of WASM heap memory used by the QuickJS VM.

#### Defined in

[quickjsvm.ts:114](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L114)

___

### shouldInterrupt

• `Optional` **shouldInterrupt**: [`InterruptHandler`](../modules/quickjsvm.md#interrupthandler)

Interrupt evaluation if `shouldInterrupt` returns `true`.
See [shouldInterruptAfterDeadline](../modules/quickjs.md#shouldinterruptafterdeadline).

#### Defined in

[quickjsvm.ts:109](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjsvm.ts#L109)
