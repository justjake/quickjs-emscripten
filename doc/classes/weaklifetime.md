[quickjs-emscripten](../README.md) › [Globals](../globals.md) › [WeakLifetime](weaklifetime.md)

# Class: WeakLifetime <**T, TCopy, Owner**>

A Lifetime that does not own its `value`. A WeakLifetime never calls its
`disposer` function, but can be `dup`ed to produce regular lifetimes that
do.

Used for function arguments.

## Type parameters

▪ **T**

▪ **TCopy**

▪ **Owner**

## Hierarchy

* [Lifetime](lifetime.md)‹T, TCopy, Owner›

  ↳ **WeakLifetime**

## Index

### Constructors

* [constructor](weaklifetime.md#constructor)

### Properties

* [_alive](weaklifetime.md#protected-_alive)
* [_owner](weaklifetime.md#protected-optional-_owner)
* [_value](weaklifetime.md#protected-_value)
* [copier](weaklifetime.md#protected-optional-copier)
* [disposer](weaklifetime.md#protected-optional-disposer)

### Accessors

* [alive](weaklifetime.md#alive)
* [dupable](weaklifetime.md#dupable)
* [owner](weaklifetime.md#owner)
* [value](weaklifetime.md#value)

### Methods

* [dispose](weaklifetime.md#dispose)
* [dup](weaklifetime.md#dup)

## Constructors

###  constructor

\+ **new WeakLifetime**(`value`: T, `copier?`: undefined | function, `disposer?`: undefined | function, `owner?`: Owner): *[WeakLifetime](weaklifetime.md)*

*Overrides [Lifetime](lifetime.md).[constructor](lifetime.md#constructor)*

*Defined in [quickjs.ts:174](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L174)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |
`copier?` | undefined &#124; function |
`disposer?` | undefined &#124; function |
`owner?` | Owner |

**Returns:** *[WeakLifetime](weaklifetime.md)*

## Properties

### `Protected` _alive

• **_alive**: *boolean* = true

*Inherited from [Lifetime](lifetime.md).[_alive](lifetime.md#protected-_alive)*

*Defined in [quickjs.ts:71](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L71)*

___

### `Protected` `Optional` _owner

• **_owner**? : *Owner*

*Inherited from [Lifetime](lifetime.md).[_owner](lifetime.md#protected-optional-_owner)*

*Defined in [quickjs.ts:85](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L85)*

___

### `Protected` _value

• **_value**: *T*

*Inherited from [Lifetime](lifetime.md).[_value](lifetime.md#protected-_value)*

*Defined in [quickjs.ts:82](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L82)*

___

### `Protected` `Optional` copier

• **copier**? : *undefined | function*

*Inherited from [Lifetime](lifetime.md).[copier](lifetime.md#protected-optional-copier)*

*Defined in [quickjs.ts:83](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L83)*

___

### `Protected` `Optional` disposer

• **disposer**? : *undefined | function*

*Inherited from [Lifetime](lifetime.md).[disposer](lifetime.md#protected-optional-disposer)*

*Defined in [quickjs.ts:84](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L84)*

## Accessors

###  alive

• **get alive**(): *boolean*

*Inherited from [Lifetime](lifetime.md).[alive](lifetime.md#alive)*

*Defined in [quickjs.ts:88](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L88)*

**Returns:** *boolean*

___

###  dupable

• **get dupable**(): *boolean*

*Inherited from [Lifetime](lifetime.md).[dupable](lifetime.md#dupable)*

*Defined in [quickjs.ts:107](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L107)*

**Returns:** *boolean*

___

###  owner

• **get owner**(): *undefined | Owner*

*Inherited from [Lifetime](lifetime.md).[owner](lifetime.md#owner)*

*Defined in [quickjs.ts:103](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L103)*

**Returns:** *undefined | Owner*

___

###  value

• **get value**(): *T*

*Inherited from [Lifetime](lifetime.md).[value](lifetime.md#value)*

*Defined in [quickjs.ts:98](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L98)*

The value this Lifetime protects. You must never retain the value - it
may become invalid, leading to memory errors.

**`throws`** If the lifetime has been [dispose](weaklifetime.md#dispose)d already.

**Returns:** *T*

## Methods

###  dispose

▸ **dispose**(): *void*

*Overrides [Lifetime](lifetime.md).[dispose](lifetime.md#dispose)*

*Defined in [quickjs.ts:185](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L185)*

**Returns:** *void*

___

###  dup

▸ **dup**(): *[Lifetime](lifetime.md)‹TCopy, TCopy, Owner›*

*Inherited from [Lifetime](lifetime.md).[dup](lifetime.md#dup)*

*Defined in [quickjs.ts:114](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L114)*

Create a new handle pointing to the same [value](weaklifetime.md#value).

**Returns:** *[Lifetime](lifetime.md)‹TCopy, TCopy, Owner›*
