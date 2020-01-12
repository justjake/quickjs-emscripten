[quickjs-emscripten - v0.1.0b](../README.md) › [Globals](../globals.md) › ["quickjs"](../modules/_quickjs_.md) › [Lifetime](_quickjs_.lifetime.md)

# Class: Lifetime <**T, Owner**>

## Type parameters

▪ **T**

▪ **Owner**

## Hierarchy

* **Lifetime**

## Index

### Constructors

* [constructor](_quickjs_.lifetime.md#constructor)

### Accessors

* [alive](_quickjs_.lifetime.md#alive)
* [owner](_quickjs_.lifetime.md#owner)
* [value](_quickjs_.lifetime.md#value)

### Methods

* [dispose](_quickjs_.lifetime.md#dispose)

## Constructors

###  constructor

\+ **new Lifetime**(`_value`: T, `disposer?`: undefined | function, `_owner?`: Owner): *[Lifetime](_quickjs_.lifetime.md)*

*Defined in [quickjs.ts:41](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/quickjs.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`_value` | T |
`disposer?` | undefined &#124; function |
`_owner?` | Owner |

**Returns:** *[Lifetime](_quickjs_.lifetime.md)*

## Accessors

###  alive

• **get alive**(): *boolean*

*Defined in [quickjs.ts:49](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/quickjs.ts#L49)*

**Returns:** *boolean*

___

###  owner

• **get owner**(): *undefined | Owner*

*Defined in [quickjs.ts:58](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/quickjs.ts#L58)*

**Returns:** *undefined | Owner*

___

###  value

• **get value**(): *T*

*Defined in [quickjs.ts:53](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/quickjs.ts#L53)*

**Returns:** *T*

## Methods

###  dispose

▸ **dispose**(): *void*

*Defined in [quickjs.ts:62](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/quickjs.ts#L62)*

**Returns:** *void*
