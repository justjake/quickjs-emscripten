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

*Defined in [quickjs.ts:173](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L173)*

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

*Defined in [quickjs.ts:70](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L70)*

___

### `Protected` `Optional` _owner

• **_owner**? : *Owner*

*Inherited from [Lifetime](lifetime.md).[_owner](lifetime.md#protected-optional-_owner)*

*Defined in [quickjs.ts:84](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L84)*

___

### `Protected` _value

• **_value**: *T*

*Inherited from [Lifetime](lifetime.md).[_value](lifetime.md#protected-_value)*

*Defined in [quickjs.ts:81](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L81)*

___

### `Protected` `Optional` copier

• **copier**? : *undefined | function*

*Inherited from [Lifetime](lifetime.md).[copier](lifetime.md#protected-optional-copier)*

*Defined in [quickjs.ts:82](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L82)*

___

### `Protected` `Optional` disposer

• **disposer**? : *undefined | function*

*Inherited from [Lifetime](lifetime.md).[disposer](lifetime.md#protected-optional-disposer)*

*Defined in [quickjs.ts:83](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L83)*

## Accessors

###  alive

• **get alive**(): *boolean*

*Inherited from [Lifetime](lifetime.md).[alive](lifetime.md#alive)*

*Defined in [quickjs.ts:87](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L87)*

**Returns:** *boolean*

___

###  dupable

• **get dupable**(): *boolean*

*Inherited from [Lifetime](lifetime.md).[dupable](lifetime.md#dupable)*

*Defined in [quickjs.ts:106](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L106)*

**Returns:** *boolean*

___

###  owner

• **get owner**(): *undefined | Owner*

*Inherited from [Lifetime](lifetime.md).[owner](lifetime.md#owner)*

*Defined in [quickjs.ts:102](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L102)*

**Returns:** *undefined | Owner*

___

###  value

• **get value**(): *T*

*Inherited from [Lifetime](lifetime.md).[value](lifetime.md#value)*

*Defined in [quickjs.ts:97](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L97)*

The value this Lifetime protects. You must never retain the value - it
may become invalid, leading to memory errors.

**`throws`** If the lifetime has been [dispose](weaklifetime.md#dispose)d already.

**Returns:** *T*

## Methods

###  dispose

▸ **dispose**(): *void*

*Overrides [Lifetime](lifetime.md).[dispose](lifetime.md#dispose)*

*Defined in [quickjs.ts:184](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L184)*

**Returns:** *void*

___

###  dup

▸ **dup**(): *[Lifetime](lifetime.md)‹TCopy, TCopy, Owner›*

*Inherited from [Lifetime](lifetime.md).[dup](lifetime.md#dup)*

*Defined in [quickjs.ts:113](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L113)*

Create a new handle pointing to the same [value](weaklifetime.md#value).

**Returns:** *[Lifetime](lifetime.md)‹TCopy, TCopy, Owner›*
