[quickjs-emscripten](../README.md) › [Globals](../globals.md) › [Lifetime](lifetime.md)

# Class: Lifetime <**T, Owner**>

A lifetime prevents access to a value after the lifetime has been
[dispose](lifetime.md#dispose)ed.

Typically, quickjs-emscripten uses Lifetimes to protect C memory pointers.

## Type parameters

▪ **T**

▪ **Owner**

## Hierarchy

* **Lifetime**

  ↳ [StaticLifetime](staticlifetime.md)

## Index

### Constructors

* [constructor](lifetime.md#constructor)

### Accessors

* [alive](lifetime.md#alive)
* [owner](lifetime.md#owner)
* [value](lifetime.md#value)

### Methods

* [dispose](lifetime.md#dispose)

## Constructors

###  constructor

\+ **new Lifetime**(`_value`: T, `disposer?`: undefined | function, `_owner?`: Owner): *[Lifetime](lifetime.md)*

*Defined in [quickjs.ts:60](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L60)*

When the Lifetime is disposed, it will call `disposer(_value)`. Use the
disposer function to implement whatever cleanup needs to happen at the end
of `value`'s lifetime.

`_owner` is not used or controlled by the lifetime. It's just metadata for
the creator.

**Parameters:**

Name | Type |
------ | ------ |
`_value` | T |
`disposer?` | undefined &#124; function |
`_owner?` | Owner |

**Returns:** *[Lifetime](lifetime.md)*

## Accessors

###  alive

• **get alive**(): *boolean*

*Defined in [quickjs.ts:76](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L76)*

**Returns:** *boolean*

___

###  owner

• **get owner**(): *undefined | Owner*

*Defined in [quickjs.ts:91](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L91)*

**Returns:** *undefined | Owner*

___

###  value

• **get value**(): *T*

*Defined in [quickjs.ts:86](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L86)*

The value this Lifetime protects. You must never retain the value - it
may become invalid, leading to memory errors.

**`throws`** If the lifetime has been [dispose](lifetime.md#dispose)d already.

**Returns:** *T*

## Methods

###  dispose

▸ **dispose**(): *void*

*Defined in [quickjs.ts:98](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L98)*

Dispose of [value](lifetime.md#value) and perform cleanup.

**Returns:** *void*
