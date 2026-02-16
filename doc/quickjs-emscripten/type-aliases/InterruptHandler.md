[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../README.md) / InterruptHandler

# Type Alias: InterruptHandler()

> **InterruptHandler** = (`runtime`) => `boolean` | `undefined` | `void`

Defined in: [packages/quickjs-emscripten-core/src/runtime.ts:28](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/runtime.ts#L28)

Callback called regularly while the VM executes code.
Determines if a VM's execution should be interrupted.

## Contents

* [Parameters](#parameters)
  * [runtime](#runtime)
* [Returns](#returns)

## Parameters

### runtime

[`QuickJSRuntime`](../classes/QuickJSRuntime.md)

## Returns

`boolean` | `undefined` | `void`

`true` to interrupt JS execution inside the VM.
