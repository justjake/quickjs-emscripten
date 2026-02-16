[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../README.md) / shouldInterruptAfterDeadline

# Function: shouldInterruptAfterDeadline()

> **shouldInterruptAfterDeadline**(`deadline`): [`InterruptHandler`](../type-aliases/InterruptHandler.md)

Defined in: [packages/quickjs-emscripten-core/src/interrupt-helpers.ts:9](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/interrupt-helpers.ts#L9)

Returns an interrupt handler that interrupts Javascript execution after a deadline time.

## Contents

* [Parameters](#parameters)
  * [deadline](#deadline)
* [Returns](#returns)

## Parameters

### deadline

Interrupt execution if it's still running after this time.
Number values are compared against `Date.now()`

`number` | `Date`

## Returns

[`InterruptHandler`](../type-aliases/InterruptHandler.md)
