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

[ts/types.ts:177](https://github.com/justjake/quickjs-emscripten/blob/master/ts/types.ts#L177)

___

### compileOnly

• `Optional` **compileOnly**: `boolean`

compile but do not run. The result is an object with a
JS_TAG_FUNCTION_BYTECODE or JS_TAG_MODULE tag. It can be executed
with JS_EvalFunction().

#### Defined in

[ts/types.ts:175](https://github.com/justjake/quickjs-emscripten/blob/master/ts/types.ts#L175)

___

### strict

• `Optional` **strict**: `boolean`

Force "strict" mode

#### Defined in

[ts/types.ts:167](https://github.com/justjake/quickjs-emscripten/blob/master/ts/types.ts#L167)

___

### strip

• `Optional` **strip**: `boolean`

Force "strip" mode

#### Defined in

[ts/types.ts:169](https://github.com/justjake/quickjs-emscripten/blob/master/ts/types.ts#L169)

___

### type

• `Optional` **type**: ``"global"`` \| ``"module"``

Global code (default)

#### Defined in

[ts/types.ts:165](https://github.com/justjake/quickjs-emscripten/blob/master/ts/types.ts#L165)
