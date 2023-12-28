[quickjs-emscripten](../../packages.md) • **quickjs-emscripten** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../exports.md) / ContextEvalOptions

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

packages/quickjs-emscripten-core/dist/index.d.ts:480

***

### compileOnly?

> **compileOnly**?: `boolean`

compile but do not run. The result is an object with a
JS_TAG_FUNCTION_BYTECODE or JS_TAG_MODULE tag. It can be executed
with JS_EvalFunction().

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:478

***

### strict?

> **strict**?: `boolean`

Force "strict" mode

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:470

***

### strip?

> **strip**?: `boolean`

Force "strip" mode

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:472

***

### type?

> **type**?: `"global"` \| `"module"`

Global code (default)

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:468

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
