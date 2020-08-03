[quickjs-emscripten](../README.md) › [Globals](../globals.md) › [StaticLifetime](staticlifetime.md)

# Class: StaticLifetime <**T, Owner**>

A Lifetime that lives forever. Used for constants.

## Type parameters

▪ **T**

▪ **Owner**

## Hierarchy

* [Lifetime](lifetime.md)‹T, T, Owner›

  ↳ **StaticLifetime**

## Index

### Constructors

* [constructor](staticlifetime.md#constructor)

### Properties

* [_alive](staticlifetime.md#protected-_alive)
* [_owner](staticlifetime.md#protected-optional-_owner)
* [_value](staticlifetime.md#protected-_value)
* [copier](staticlifetime.md#protected-optional-copier)
* [disposer](staticlifetime.md#protected-optional-disposer)

### Accessors

* [alive](staticlifetime.md#alive)
* [dupable](staticlifetime.md#dupable)
* [owner](staticlifetime.md#owner)
* [value](staticlifetime.md#value)

### Methods

* [dispose](staticlifetime.md#dispose)
* [dup](staticlifetime.md#dup)

## Constructors

###  constructor

\+ **new StaticLifetime**(`value`: T, `owner?`: Owner): *[StaticLifetime](staticlifetime.md)*

*Overrides [Lifetime](lifetime.md).[constructor](lifetime.md#constructor)*

*Defined in [quickjs.ts:149](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L149)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |
`owner?` | Owner |

**Returns:** *[StaticLifetime](staticlifetime.md)*

## Properties

### `Protected` _alive

• **_alive**: *boolean* = true

*Inherited from [Lifetime](lifetime.md).[_alive](lifetime.md#protected-_alive)*

*Defined in [quickjs.ts:72](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L72)*

___

### `Protected` `Optional` _owner

• **_owner**? : *Owner*

*Inherited from [Lifetime](lifetime.md).[_owner](lifetime.md#protected-optional-_owner)*

*Defined in [quickjs.ts:86](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L86)*

___

### `Protected` _value

• **_value**: *T*

*Inherited from [Lifetime](lifetime.md).[_value](lifetime.md#protected-_value)*

*Defined in [quickjs.ts:83](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L83)*

___

### `Protected` `Optional` copier

• **copier**? : *undefined | function*

*Inherited from [Lifetime](lifetime.md).[copier](lifetime.md#protected-optional-copier)*

*Defined in [quickjs.ts:84](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L84)*

___

### `Protected` `Optional` disposer

• **disposer**? : *undefined | function*

*Inherited from [Lifetime](lifetime.md).[disposer](lifetime.md#protected-optional-disposer)*

*Defined in [quickjs.ts:85](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L85)*

## Accessors

###  alive

• **get alive**(): *boolean*

*Inherited from [Lifetime](lifetime.md).[alive](lifetime.md#alive)*

*Defined in [quickjs.ts:89](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L89)*

**Returns:** *boolean*

___

###  dupable

• **get dupable**(): *boolean*

*Overrides [Lifetime](lifetime.md).[dupable](lifetime.md#dupable)*

*Defined in [quickjs.ts:155](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L155)*

**Returns:** *boolean*

___

###  owner

• **get owner**(): *undefined | Owner*

*Inherited from [Lifetime](lifetime.md).[owner](lifetime.md#owner)*

*Defined in [quickjs.ts:104](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L104)*

**Returns:** *undefined | Owner*

___

###  value

• **get value**(): *T*

*Inherited from [Lifetime](lifetime.md).[value](lifetime.md#value)*

*Defined in [quickjs.ts:99](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L99)*

The value this Lifetime protects. You must never retain the value - it
may become invalid, leading to memory errors.

**`throws`** If the lifetime has been [dispose](staticlifetime.md#dispose)d already.

**Returns:** *T*

## Methods

###  dispose

▸ **dispose**(): *void*

*Overrides [Lifetime](lifetime.md).[dispose](lifetime.md#dispose)*

*Defined in [quickjs.ts:165](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L165)*

**Returns:** *void*

___

###  dup

▸ **dup**(): *this*

*Overrides [Lifetime](lifetime.md).[dup](lifetime.md#dup)*

*Defined in [quickjs.ts:160](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L160)*

**Returns:** *this*
