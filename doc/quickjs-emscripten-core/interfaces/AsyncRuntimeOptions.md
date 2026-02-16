[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../README.md) / AsyncRuntimeOptions

# Interface: AsyncRuntimeOptions

Defined in: [packages/quickjs-emscripten-core/src/types.ts:136](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L136)

## Contents

* [Extends](#extends)
* [Properties](#properties)
  * [gcThreshold?](#gcthreshold)
  * [interruptHandler?](#interrupthandler)
  * [maxStackSizeBytes?](#maxstacksizebytes)
  * [memoryLimitBytes?](#memorylimitbytes)
  * [moduleLoader?](#moduleloader)
  * [promiseRejectionHandler?](#promiserejectionhandler)
  * [runtimeInfo?](#runtimeinfo)
  * [sharedArrayBufferFunctions?](#sharedarraybufferfunctions)

## Extends

* [`RuntimeOptionsBase`](RuntimeOptionsBase.md)

## Properties

### gcThreshold?

> `optional` **gcThreshold**: `undefined`

Defined in: [packages/quickjs-emscripten-core/src/types.ts:119](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L119)

#### Inherited from

[`RuntimeOptionsBase`](RuntimeOptionsBase.md).[`gcThreshold`](RuntimeOptionsBase.md#gcthreshold)

***

### interruptHandler?

> `optional` **interruptHandler**: [`InterruptHandler`](../type-aliases/InterruptHandler.md)

Defined in: [packages/quickjs-emscripten-core/src/types.ts:113](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L113)

#### Inherited from

[`RuntimeOptionsBase`](RuntimeOptionsBase.md).[`interruptHandler`](RuntimeOptionsBase.md#interrupthandler)

***

### maxStackSizeBytes?

> `optional` **maxStackSizeBytes**: `number`

Defined in: [packages/quickjs-emscripten-core/src/types.ts:114](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L114)

#### Inherited from

[`RuntimeOptionsBase`](RuntimeOptionsBase.md).[`maxStackSizeBytes`](RuntimeOptionsBase.md#maxstacksizebytes)

***

### memoryLimitBytes?

> `optional` **memoryLimitBytes**: `number`

Defined in: [packages/quickjs-emscripten-core/src/types.ts:115](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L115)

#### Inherited from

[`RuntimeOptionsBase`](RuntimeOptionsBase.md).[`memoryLimitBytes`](RuntimeOptionsBase.md#memorylimitbytes)

***

### moduleLoader?

> `optional` **moduleLoader**: [`JSModuleLoader`](JSModuleLoader.md) | [`JSModuleLoaderAsync`](JSModuleLoaderAsync.md)

Defined in: [packages/quickjs-emscripten-core/src/types.ts:137](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L137)

***

### promiseRejectionHandler?

> `optional` **promiseRejectionHandler**: `undefined`

Defined in: [packages/quickjs-emscripten-core/src/types.ts:117](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L117)

#### Inherited from

[`RuntimeOptionsBase`](RuntimeOptionsBase.md).[`promiseRejectionHandler`](RuntimeOptionsBase.md#promiserejectionhandler)

***

### runtimeInfo?

> `optional` **runtimeInfo**: `undefined`

Defined in: [packages/quickjs-emscripten-core/src/types.ts:118](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L118)

#### Inherited from

[`RuntimeOptionsBase`](RuntimeOptionsBase.md).[`runtimeInfo`](RuntimeOptionsBase.md#runtimeinfo)

***

### sharedArrayBufferFunctions?

> `optional` **sharedArrayBufferFunctions**: `undefined`

Defined in: [packages/quickjs-emscripten-core/src/types.ts:120](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/types.ts#L120)

#### Inherited from

[`RuntimeOptionsBase`](RuntimeOptionsBase.md).[`sharedArrayBufferFunctions`](RuntimeOptionsBase.md#sharedarraybufferfunctions)
