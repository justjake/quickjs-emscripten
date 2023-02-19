[quickjs-emscripten](../README.md) / [Exports](../modules.md) / ContextEvalOptions

# Interface: ContextEvalOptions

## Table of contents

### Properties

- [backtraceBarrier](ContextEvalOptions.md#backtracebarrier)
- [compileOnly](ContextEvalOptions.md#compileonly)
- [strict](ContextEvalOptions.md#strict)
- [strip](ContextEvalOptions.md#strip)
- [type](ContextEvalOptions.md#type)

## Properties

### backtraceBarrier

• `Optional` **backtraceBarrier**: `boolean`

don't include the stack frames before this eval in the Error() backtraces

#### Defined in

[ts/types.ts:212](https://github.com/justjake/quickjs-emscripten/blob/main/ts/types.ts#L212)

___

### compileOnly

• `Optional` **compileOnly**: `boolean`

compile but do not run. The result is an object with a
JS_TAG_FUNCTION_BYTECODE or JS_TAG_MODULE tag. It can be executed
with JS_EvalFunction().

#### Defined in

[ts/types.ts:210](https://github.com/justjake/quickjs-emscripten/blob/main/ts/types.ts#L210)

___

### strict

• `Optional` **strict**: `boolean`

Force "strict" mode

#### Defined in

[ts/types.ts:202](https://github.com/justjake/quickjs-emscripten/blob/main/ts/types.ts#L202)

___

### strip

• `Optional` **strip**: `boolean`

Force "strip" mode

#### Defined in

[ts/types.ts:204](https://github.com/justjake/quickjs-emscripten/blob/main/ts/types.ts#L204)

___

### type

• `Optional` **type**: ``"module"`` \| ``"global"``

Global code (default)

#### Defined in

[ts/types.ts:200](https://github.com/justjake/quickjs-emscripten/blob/main/ts/types.ts#L200)
