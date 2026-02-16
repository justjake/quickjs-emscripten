[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../README.md) / Scope

# Class: Scope

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:265](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L265)

Scope helps reduce the burden of manually tracking and disposing of
Lifetimes. See [withScope](#withscope). and [withScopeAsync](#withscopeasync).

## Extends

- [`UsingDisposable`](UsingDisposable.md)

## Implements

- [`Disposable`](../interfaces/Disposable.md)

## Constructors

### Constructor

> **new Scope**(): `Scope`

#### Returns

`Scope`

#### Inherited from

[`UsingDisposable`](UsingDisposable.md).[`constructor`](UsingDisposable.md#constructor)

## Accessors

### alive

#### Get Signature

> **get** **alive**(): `boolean`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:333](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L333)

##### Returns

`boolean`

true if the object is alive

#### Implementation of

[`Disposable`](../interfaces/Disposable.md).[`alive`](../interfaces/Disposable.md#alive)

#### Overrides

[`UsingDisposable`](UsingDisposable.md).[`alive`](UsingDisposable.md#alive)

## Methods

### \[dispose\]()

> **\[dispose\]**(): `void`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:47](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L47)

Just calls the standard .dispose() method of this class.

#### Returns

`void`

#### Implementation of

[`Disposable`](../interfaces/Disposable.md).[`[dispose]`](../interfaces/Disposable.md#dispose)

#### Inherited from

[`UsingDisposable`](UsingDisposable.md).[`[dispose]`](UsingDisposable.md#dispose)

***

### dispose()

> **dispose**(): `void`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:337](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L337)

Dispose of the underlying resources used by this object.

#### Returns

`void`

#### Implementation of

[`Disposable`](../interfaces/Disposable.md).[`dispose`](../interfaces/Disposable.md#dispose-1)

#### Overrides

[`UsingDisposable`](UsingDisposable.md).[`dispose`](UsingDisposable.md#dispose-1)

***

### manage()

> **manage**\<`T`\>(`lifetime`): `T`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:328](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L328)

Track `lifetime` so that it is disposed when this scope is disposed.

#### Type Parameters

##### T

`T` *extends* [`Disposable`](../interfaces/Disposable.md)

#### Parameters

##### lifetime

`T`

#### Returns

`T`

***

### withScope()

> `static` **withScope**\<`R`\>(`block`): `R`

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:273](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L273)

Run `block` with a new Scope instance that will be disposed after the block returns.
Inside `block`, call `scope.manage` on each lifetime you create to have the lifetime
automatically disposed after the block returns.

#### Type Parameters

##### R

`R`

#### Parameters

##### block

(`scope`) => `R`

#### Returns

`R`

#### Warning

Do not use with async functions. Instead, use [withScopeAsync](#withscopeasync).

***

### withScopeAsync()

> `static` **withScopeAsync**\<`R`\>(`block`): `Promise`\<`R`\>

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:310](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L310)

Run `block` with a new Scope instance that will be disposed after the
block's returned promise settles. Inside `block`, call `scope.manage` on each
lifetime you create to have the lifetime automatically disposed after the
block returns.

#### Type Parameters

##### R

`R`

#### Parameters

##### block

(`scope`) => `Promise`\<`R`\>

#### Returns

`Promise`\<`R`\>

***

### withScopeMaybeAsync()

> `static` **withScopeMaybeAsync**\<`Return`, `This`, `Yielded`\>(`_this`, `block`): `Return` \| `Promise`\<`Return`\>

Defined in: [packages/quickjs-emscripten-core/src/lifetime.ts:286](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/lifetime.ts#L286)

#### Type Parameters

##### Return

`Return`

##### This

`This`

##### Yielded

`Yielded`

#### Parameters

##### \_this

`This`

##### block

`MaybeAsyncBlock`\<`Return`, `This`, `Yielded`, \[`Scope`\]\>

#### Returns

`Return` \| `Promise`\<`Return`\>
