[quickjs-emscripten](../../packages.md) • **quickjs-emscripten-core** • [Readme](../index.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../exports.md) / Scope

# Class: Scope

Scope helps reduce the burden of manually tracking and disposing of
Lifetimes. See [[withScope]]. and [[withScopeAsync]].

## Contents

- [Implements](Scope.md#implements)
- [Constructors](Scope.md#constructors)
  - [new Scope(undefined)](Scope.md#new-scopeundefined)
- [Accessors](Scope.md#accessors)
  - [alive](Scope.md#alive)
- [Methods](Scope.md#methods)
  - [dispose()](Scope.md#dispose)
  - [manage()](Scope.md#manage)
  - [withScope()](Scope.md#withscope)
  - [withScopeAsync()](Scope.md#withscopeasync)
  - [withScopeMaybeAsync()](Scope.md#withscopemaybeasync)

## Implements

- [`Disposable`](../interfaces/Disposable.md)

## Constructors

### new Scope(undefined)

> **new Scope**(): [`Scope`](Scope.md)

#### Returns

[`Scope`](Scope.md)

## Accessors

### alive

> **`get`** **alive**(): `boolean`

#### Returns

`boolean`

true if the object is alive

false after the object has been [[dispose]]d

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:265](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L265)

## Methods

### dispose()

> **dispose**(): `void`

Dispose of the underlying resources used by this object.

#### Returns

`void`

#### Implementation of

[`quickjs-emscripten-core.Disposable.dispose`](../interfaces/Disposable.md#dispose)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:269](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L269)

***

### manage()

> **manage**\<`T`\>(`lifetime`): `T`

Track `lifetime` so that it is disposed when this scope is disposed.

#### Type parameters

• **T** extends [`Disposable`](../interfaces/Disposable.md)

#### Parameters

• **lifetime**: `T`

#### Returns

`T`

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:260](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L260)

***

### withScope()

> **`static`** **withScope**\<`R`\>(`block`): `R`

Run `block` with a new Scope instance that will be disposed after the block returns.
Inside `block`, call `scope.manage` on each lifetime you create to have the lifetime
automatically disposed after the block returns.

#### Type parameters

• **R**

#### Parameters

• **block**: (`scope`) => `R`

#### Returns

`R`

#### Warning

Do not use with async functions. Instead, use [[withScopeAsync]].

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:205](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L205)

***

### withScopeAsync()

> **`static`** **withScopeAsync**\<`R`\>(`block`): `Promise`\<`R`\>

Run `block` with a new Scope instance that will be disposed after the
block's returned promise settles. Inside `block`, call `scope.manage` on each
lifetime you create to have the lifetime automatically disposed after the
block returns.

#### Type parameters

• **R**

#### Parameters

• **block**: (`scope`) => `Promise`\<`R`\>

#### Returns

`Promise`\<`R`\>

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:242](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L242)

***

### withScopeMaybeAsync()

> **`static`** **withScopeMaybeAsync**\<`Return`, `This`, `Yielded`\>(`_this`, `block`): `Return` \| `Promise`\<`Return`\>

#### Type parameters

• **Return**

• **This**

• **Yielded**

#### Parameters

• **\_this**: `This`

• **block**: `MaybeAsyncBlock`\<`Return`, `This`, `Yielded`, [[`Scope`](Scope.md)]\>

#### Returns

`Return` \| `Promise`\<`Return`\>

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:218](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L218)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
