[quickjs-emscripten](../README.md) › [Globals](../globals.md) › [QuickJSEvalOptions](quickjsevaloptions.md)

# Interface: QuickJSEvalOptions

Options for [QuickJS.evalCode](../classes/quickjs.md#evalcode).

## Hierarchy

* **QuickJSEvalOptions**

## Index

### Properties

* [memoryLimitBytes](quickjsevaloptions.md#optional-memorylimitbytes)
* [shouldInterrupt](quickjsevaloptions.md#optional-shouldinterrupt)

## Properties

### `Optional` memoryLimitBytes

• **memoryLimitBytes**? : *undefined | number*

*Defined in [quickjs.ts:986](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L986)*

Memory limit, in bytes, of WASM heap memory used by the QuickJS VM.

___

### `Optional` shouldInterrupt

• **shouldInterrupt**? : *[InterruptHandler](../globals.md#interrupthandler)*

*Defined in [quickjs.ts:981](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L981)*

Interrupt evaluation if `shouldInterrupt` returns `true`.
See [shouldInterruptAfterDeadline](../globals.md#shouldinterruptafterdeadline).
