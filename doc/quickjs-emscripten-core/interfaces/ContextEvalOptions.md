[quickjs-emscripten](../../packages.md) • **quickjs-emscripten-core** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../exports.md) / ContextEvalOptions

# Interface: ContextEvalOptions

## Contents

- [Properties](ContextEvalOptions.md#properties)
  - [backtraceBarrier?](ContextEvalOptions.md#backtracebarrier)
  - [compileOnly?](ContextEvalOptions.md#compileonly)
  - [strict?](ContextEvalOptions.md#strict)
  - [strip?](ContextEvalOptions.md#strip)
  - [type?](ContextEvalOptions.md#type)

## Properties

### backtraceBarrier?

> **backtraceBarrier**?: `boolean`

don't include the stack frames before this eval in the Error() backtraces

#### Source

[packages/quickjs-emscripten-core/src/types.ts:257](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L257)

***

### compileOnly?

> **compileOnly**?: `boolean`

compile but do not run. The result is an object with a
JS_TAG_FUNCTION_BYTECODE or JS_TAG_MODULE tag. It can be executed
with JS_EvalFunction().

#### Source

[packages/quickjs-emscripten-core/src/types.ts:255](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L255)

***

### strict?

> **strict**?: `boolean`

Force "strict" mode

#### Source

[packages/quickjs-emscripten-core/src/types.ts:247](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L247)

***

### strip?

> **strip**?: `boolean`

Force "strip" mode

#### Source

[packages/quickjs-emscripten-core/src/types.ts:249](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L249)

***

### type?

> **type**?: `"global"` \| `"module"`

Global code (default)

#### Source

[packages/quickjs-emscripten-core/src/types.ts:245](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L245)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
