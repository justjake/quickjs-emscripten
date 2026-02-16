[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../README.md) / ContextEvalOptions

# Interface: ContextEvalOptions

Defined in: [packages/quickjs-emscripten-core/src/types.ts:244](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L244)

## Contents

* [Properties](#properties)
  * [backtraceBarrier?](#backtracebarrier)
  * [compileOnly?](#compileonly)
  * [strict?](#strict)
  * [strip?](#strip)
  * [type?](#type)

## Properties

### backtraceBarrier?

> `optional` **backtraceBarrier**: `boolean`

Defined in: [packages/quickjs-emscripten-core/src/types.ts:263](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L263)

don't include the stack frames before this eval in the Error() backtraces

***

### compileOnly?

> `optional` **compileOnly**: `boolean`

Defined in: [packages/quickjs-emscripten-core/src/types.ts:261](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L261)

compile but do not run. The result is an object with a
JS\_TAG\_FUNCTION\_BYTECODE or JS\_TAG\_MODULE tag. It can be executed
with JS\_EvalFunction().

***

### strict?

> `optional` **strict**: `boolean`

Defined in: [packages/quickjs-emscripten-core/src/types.ts:253](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L253)

Force "strict" mode

***

### strip?

> `optional` **strip**: `boolean`

Defined in: [packages/quickjs-emscripten-core/src/types.ts:255](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L255)

Force "strip" mode

***

### type?

> `optional` **type**: `"global"` | `"module"`

Defined in: [packages/quickjs-emscripten-core/src/types.ts:251](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L251)

Global code (default), or "module" code?

* When type is `"global"`, the code is evaluated in the global scope of the QuickJSContext, and the return value is the result of the last expression.
* When type is `"module"`, the code is evaluated is a module scope, may use `import`, `export`, and top-level `await`. The return value is the module's exports, or a promise for the module's exports.
