[quickjs-emscripten](../README.md) › [Globals](../globals.md) › [StaticLifetime](staticlifetime.md)

# Class: StaticLifetime <**T, Owner**>

A Lifetime that lives forever. Used for constants.

## Type parameters

▪ **T**

▪ **Owner**

## Hierarchy

* [Lifetime](lifetime.md)‹T, T, Owner›

  ↳ **StaticLifetime**

## Implements

* [Disposable](../interfaces/disposable.md)

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

* [consume](staticlifetime.md#consume)
* [dispose](staticlifetime.md#dispose)
* [dup](staticlifetime.md#dup)

## Constructors

###  constructor

\+ **new StaticLifetime**(`value`: T, `owner?`: Owner): *[StaticLifetime](staticlifetime.md)*

*Overrides [Lifetime](lifetime.md).[constructor](lifetime.md#constructor)*

*Defined in [lifetime.ts:120](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L120)*

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

*Defined in [lifetime.ts:28](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L28)*

___

### `Protected` `Optional` _owner

• **_owner**? : *Owner*

*Inherited from [Lifetime](lifetime.md).[_owner](lifetime.md#protected-optional-_owner)*

*Defined in [lifetime.ts:42](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L42)*

___

### `Protected` _value

• **_value**: *T*

*Inherited from [Lifetime](lifetime.md).[_value](lifetime.md#protected-_value)*

*Defined in [lifetime.ts:39](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L39)*

___

### `Protected` `Optional` copier

• **copier**? : *undefined | function*

*Inherited from [Lifetime](lifetime.md).[copier](lifetime.md#protected-optional-copier)*

*Defined in [lifetime.ts:40](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L40)*

___

### `Protected` `Optional` disposer

• **disposer**? : *undefined | function*

*Inherited from [Lifetime](lifetime.md).[disposer](lifetime.md#protected-optional-disposer)*

*Defined in [lifetime.ts:41](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L41)*

## Accessors

###  alive

• **get alive**(): *boolean*

*Inherited from [Lifetime](lifetime.md).[alive](lifetime.md#alive)*

*Defined in [lifetime.ts:45](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L45)*

**Returns:** *boolean*

___

###  dupable

• **get dupable**(): *boolean*

*Overrides [Lifetime](lifetime.md).[dupable](lifetime.md#dupable)*

*Defined in [lifetime.ts:126](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L126)*

**Returns:** *boolean*

___

###  owner

• **get owner**(): *undefined | Owner*

*Inherited from [Lifetime](lifetime.md).[owner](lifetime.md#owner)*

*Defined in [lifetime.ts:60](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L60)*

**Returns:** *undefined | Owner*

___

###  value

• **get value**(): *T*

*Inherited from [Lifetime](lifetime.md).[value](lifetime.md#value)*

*Defined in [lifetime.ts:55](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L55)*

The value this Lifetime protects. You must never retain the value - it
may become invalid, leading to memory errors.

**`throws`** If the lifetime has been [dispose](staticlifetime.md#dispose)d already.

**Returns:** *T*

## Methods

###  consume

▸ **consume**<**O**>(`map`: function): *O*

*Inherited from [Lifetime](lifetime.md).[consume](lifetime.md#consume)*

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

*Inherited from [Lifetime](lifetime.md).[consume](lifetime.md#consume)*

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

*Overrides [Lifetime](lifetime.md).[dispose](lifetime.md#dispose)*

*Defined in [lifetime.ts:136](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L136)*

**Returns:** *void*

___

###  dup

▸ **dup**(): *this*

*Overrides [Lifetime](lifetime.md).[dup](lifetime.md#dup)*

*Defined in [lifetime.ts:131](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L131)*

**Returns:** *this*
