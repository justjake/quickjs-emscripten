[quickjs-emscripten](../../packages.md) • **quickjs-emscripten** • [Readme](../README.md) \| [Exports](../exports.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../exports.md) / Scope

# Class: Scope

Scope helps reduce the burden of manually tracking and disposing of
Lifetimes. See [withScope](Scope.md#withscope). and [withScopeAsync](Scope.md#withscopeasync).

## Contents

- [Extends](Scope.md#extends)
- [Implements](Scope.md#implements)
- [Constructors](Scope.md#constructors)
  - [new Scope(undefined)](Scope.md#new-scopeundefined)
- [Accessors](Scope.md#accessors)
  - [alive](Scope.md#alive)
- [Methods](Scope.md#methods)
  - [`[dispose]`()](Scope.md#dispose)
  - [dispose()](Scope.md#dispose)
  - [manage()](Scope.md#manage)
  - [withScope()](Scope.md#withscope)
  - [withScopeAsync()](Scope.md#withscopeasync)
  - [withScopeMaybeAsync()](Scope.md#withscopemaybeasync)

## Extends

- [`UsingDisposable`](UsingDisposable.md)

## Implements

- [`Disposable`](../interfaces/Disposable.md)

## Constructors

### new Scope(undefined)

> **new Scope**(): [`Scope`](Scope.md)

#### Returns

[`Scope`](Scope.md)

#### Inherited from

[`quickjs-emscripten.UsingDisposable.constructor`](UsingDisposable.md#constructors)

## Accessors

### alive

> **`get`** **alive**(): `boolean`

#### Returns

`boolean`

true if the object is alive

false after the object has been [dispose](Scope.md#dispose-1)d

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:308](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L308)

## Methods

### `[dispose]`()

> **[dispose]**(): `void`

Just calls the standard .dispose() method of this class.

#### Returns

`void`

#### Implementation of

[`quickjs-emscripten.Disposable.[dispose]`](../interfaces/Disposable.md#dispose)

#### Inherited from

[`quickjs-emscripten.UsingDisposable.[dispose]`](UsingDisposable.md#dispose)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:47](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L47)

***

### dispose()

> **dispose**(): `void`

Dispose of the underlying resources used by this object.

#### Returns

`void`

#### Implementation of

[`quickjs-emscripten.Disposable.dispose`](../interfaces/Disposable.md#dispose-1)

#### Overrides

[`quickjs-emscripten.UsingDisposable.dispose`](UsingDisposable.md#abstract-dispose)

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:312](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L312)

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

[packages/quickjs-emscripten-core/src/lifetime.ts:303](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L303)

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

Do not use with async functions. Instead, use [withScopeAsync](Scope.md#withscopeasync).

#### Source

[packages/quickjs-emscripten-core/src/lifetime.ts:248](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L248)

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

[packages/quickjs-emscripten-core/src/lifetime.ts:285](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L285)

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

[packages/quickjs-emscripten-core/src/lifetime.ts:261](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L261)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
