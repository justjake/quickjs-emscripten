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

packages/quickjs-emscripten-core/dist/index.d.ts:529

***

### compileOnly?

> **compileOnly**?: `boolean`

compile but do not run. The result is an object with a
JS_TAG_FUNCTION_BYTECODE or JS_TAG_MODULE tag. It can be executed
with JS_EvalFunction().

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:527

***

### strict?

> **strict**?: `boolean`

Force "strict" mode

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:519

***

### strip?

> **strip**?: `boolean`

Force "strip" mode

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:521

***

### type?

> **type**?: `"global"` \| `"module"`

Global code (default), or "module" code?

- When type is `"global"`, the code is evaluated in the global scope of the QuickJSContext, and the return value is the result of the last expression.
- When type is `"module"`, the code is evaluated is a module scope, may use `import`, `export`, and top-level `await`. The return value is the module's exports, or a promise for the module's exports.

#### Source

packages/quickjs-emscripten-core/dist/index.d.ts:517

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
