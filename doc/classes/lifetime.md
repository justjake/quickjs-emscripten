[quickjs-emscripten](../README.md) › [Globals](../globals.md) › [Lifetime](lifetime.md)

# Class: Lifetime <**T, TCopy, Owner**>

A lifetime prevents access to a value after the lifetime has been
[dispose](lifetime.md#dispose)ed.

Typically, quickjs-emscripten uses Lifetimes to protect C memory pointers.

## Type parameters

▪ **T**

▪ **TCopy**

▪ **Owner**

## Hierarchy

* **Lifetime**

  ↳ [StaticLifetime](staticlifetime.md)

  ↳ [WeakLifetime](weaklifetime.md)

## Implements

* [Disposable](../interfaces/disposable.md)

## Index

### Constructors

* [constructor](lifetime.md#constructor)

### Properties

* [_alive](lifetime.md#protected-_alive)
* [_owner](lifetime.md#protected-optional-_owner)
* [_value](lifetime.md#protected-_value)
* [copier](lifetime.md#protected-optional-copier)
* [disposer](lifetime.md#protected-optional-disposer)

### Accessors

* [alive](lifetime.md#alive)
* [dupable](lifetime.md#dupable)
* [owner](lifetime.md#owner)
* [value](lifetime.md#value)

### Methods

* [consume](lifetime.md#consume)
* [dispose](lifetime.md#dispose)
* [dup](lifetime.md#dup)

## Constructors

###  constructor

\+ **new Lifetime**(`_value`: T, `copier?`: undefined | function, `disposer?`: undefined | function, `_owner?`: Owner): *[Lifetime](lifetime.md)*

*Defined in [lifetime.ts:28](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L28)*

When the Lifetime is disposed, it will call `disposer(_value)`. Use the
disposer function to implement whatever cleanup needs to happen at the end
of `value`'s lifetime.

`_owner` is not used or controlled by the lifetime. It's just metadata for
the creator.

**Parameters:**

Name | Type |
------ | ------ |
`_value` | T |
`copier?` | undefined &#124; function |
`disposer?` | undefined &#124; function |
`_owner?` | Owner |

**Returns:** *[Lifetime](lifetime.md)*

## Properties

### `Protected` _alive

• **_alive**: *boolean* = true

*Defined in [lifetime.ts:28](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L28)*

___

### `Protected` `Optional` _owner

• **_owner**? : *Owner*

*Defined in [lifetime.ts:42](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L42)*

___

### `Protected` _value

• **_value**: *T*

*Defined in [lifetime.ts:39](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L39)*

___

### `Protected` `Optional` copier

• **copier**? : *undefined | function*

*Defined in [lifetime.ts:40](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L40)*

___

### `Protected` `Optional` disposer

• **disposer**? : *undefined | function*

*Defined in [lifetime.ts:41](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L41)*

## Accessors

###  alive

• **get alive**(): *boolean*

*Defined in [lifetime.ts:45](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L45)*

**Returns:** *boolean*

___

###  dupable

• **get dupable**(): *boolean*

*Defined in [lifetime.ts:64](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L64)*

**Returns:** *boolean*

___

###  owner

• **get owner**(): *undefined | Owner*

*Defined in [lifetime.ts:60](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L60)*

**Returns:** *undefined | Owner*

___

###  value

• **get value**(): *T*

*Defined in [lifetime.ts:55](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L55)*

The value this Lifetime protects. You must never retain the value - it
may become invalid, leading to memory errors.

**`throws`** If the lifetime has been [dispose](lifetime.md#dispose)d already.

**Returns:** *T*

## Methods

###  consume

▸ **consume**<**O**>(`map`: function): *O*

*Defined in [lifetime.ts:88](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L88)*

Call `map` with this lifetime, then dispose the lifetime.

**Type parameters:**

▪ **O**

**Parameters:**

▪ **map**: *function*

▸ (`lifetime`: this): *O*

**Parameters:**

Name | Type |
------ | ------ |
`lifetime` | this |

**Returns:** *O*

the result of `map(this)`.

▸ **consume**<**O**>(`map`: function): *O*

*Defined in [lifetime.ts:91](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L91)*

**Type parameters:**

▪ **O**

**Parameters:**

▪ **map**: *function*

▸ (`lifetime`: [QuickJSHandle](../globals.md#quickjshandle)): *O*

**Parameters:**

Name | Type |
------ | ------ |
`lifetime` | [QuickJSHandle](../globals.md#quickjshandle) |

**Returns:** *O*

___

###  dispose

▸ **dispose**(): *void*

*Implementation of [Disposable](../interfaces/disposable.md)*

*Defined in [lifetime.ts:102](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L102)*

Dispose of [value](lifetime.md#value) and perform cleanup.

**Returns:** *void*

___

###  dup

▸ **dup**(): *[Lifetime](lifetime.md)‹TCopy, TCopy, Owner›*

*Defined in [lifetime.ts:71](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L71)*

Create a new handle pointing to the same [value](lifetime.md#value).

**Returns:** *[Lifetime](lifetime.md)‹TCopy, TCopy, Owner›*
