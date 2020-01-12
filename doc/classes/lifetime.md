[quickjs-emscripten - v0.1.0b](../README.md) › [Globals](../globals.md) › [Lifetime](lifetime.md)

# Class: Lifetime <**T, Owner**>

A lifetime prevents access to a value after the lifetime has been
[dispose](lifetime.md#dispose)ed.

## Type parameters

▪ **T**

▪ **Owner**

## Hierarchy

* **Lifetime**

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

*Defined in [quickjs.ts:45](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/quickjs.ts#L45)*

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

*Defined in [quickjs.ts:61](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/quickjs.ts#L61)*

**Returns:** *boolean*

___

###  owner

• **get owner**(): *undefined | Owner*

*Defined in [quickjs.ts:76](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/quickjs.ts#L76)*

**Returns:** *undefined | Owner*

___

###  value

• **get value**(): *T*

*Defined in [quickjs.ts:71](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/quickjs.ts#L71)*

The value this Lifetime protects. You must never retain the value - it
may become invalid, leading to memory errors.

**`throws`** If the lifetime has been [dispose](lifetime.md#dispose)d already.

**Returns:** *T*

## Methods

###  dispose

▸ **dispose**(): *void*

*Defined in [quickjs.ts:83](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/quickjs.ts#L83)*

Dispose of [value](lifetime.md#value) and perform cleanup.

**Returns:** *void*
