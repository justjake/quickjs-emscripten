[quickjs-emscripten](../README.md) › [Globals](../globals.md) › [QuickJSEvalOptions](quickjsevaloptions.md)

# Interface: QuickJSEvalOptions

Options for [QuickJS.evalCode](../classes/quickjs.md#evalcode).

## Hierarchy

* **QuickJSEvalOptions**

## Index

### Properties

* [shouldInterrupt](quickjsevaloptions.md#optional-shouldinterrupt)

## Properties

### `Optional` shouldInterrupt

• **shouldInterrupt**? : *[ShouldInterruptHandler](../globals.md#shouldinterrupthandler)*

*Defined in [quickjs.ts:921](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L921)*

Interrupt evaluation if `shouldInterrupt` returns `true`.
See [shouldInterruptAfterDeadline](../globals.md#shouldinterruptafterdeadline).
