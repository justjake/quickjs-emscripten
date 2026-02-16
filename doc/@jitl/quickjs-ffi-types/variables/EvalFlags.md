[**quickjs-emscripten**](../../../README.md)

***

[quickjs-emscripten](../../../packages.md) / [@jitl/quickjs-ffi-types](../README.md) / EvalFlags

# Variable: EvalFlags

> **EvalFlags**: `object`

Defined in: [ffi-types.ts:106](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L106)

Bitfield options for JS\_Eval() C function.

## Type Declaration

### JS\_EVAL\_FLAG\_BACKTRACE\_BARRIER

> `readonly` **JS\_EVAL\_FLAG\_BACKTRACE\_BARRIER**: `number`

don't include the stack frames before this eval in the Error() backtraces

### JS\_EVAL\_FLAG\_COMPILE\_ONLY

> `readonly` **JS\_EVAL\_FLAG\_COMPILE\_ONLY**: `number`

compile but do not run. The result is an object with a
JS\_TAG\_FUNCTION\_BYTECODE or JS\_TAG\_MODULE tag. It can be executed
with JS\_EvalFunction().

### JS\_EVAL\_FLAG\_STRICT

> `readonly` **JS\_EVAL\_FLAG\_STRICT**: `number`

force 'strict' mode

### JS\_EVAL\_FLAG\_STRIP

> `readonly` **JS\_EVAL\_FLAG\_STRIP**: `number`

force 'strip' mode

### JS\_EVAL\_TYPE\_DIRECT

> `readonly` **JS\_EVAL\_TYPE\_DIRECT**: `number`

direct call (internal use)

### JS\_EVAL\_TYPE\_GLOBAL

> `readonly` **JS\_EVAL\_TYPE\_GLOBAL**: `number`

global code (default)

### JS\_EVAL\_TYPE\_INDIRECT

> `readonly` **JS\_EVAL\_TYPE\_INDIRECT**: `number`

indirect call (internal use)

### JS\_EVAL\_TYPE\_MASK

> `readonly` **JS\_EVAL\_TYPE\_MASK**: `number`

### JS\_EVAL\_TYPE\_MODULE

> `readonly` **JS\_EVAL\_TYPE\_MODULE**: `number`

module code
