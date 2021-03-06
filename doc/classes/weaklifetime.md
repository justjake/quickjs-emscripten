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

## Implements

* [Disposable](../interfaces/disposable.md)

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

* [consume](weaklifetime.md#consume)
* [dispose](weaklifetime.md#dispose)
* [dup](weaklifetime.md#dup)

## Constructors

###  constructor

\+ **new WeakLifetime**(`value`: T, `copier?`: undefined | function, `disposer?`: undefined | function, `owner?`: Owner): *[WeakLifetime](weaklifetime.md)*

*Overrides [Lifetime](lifetime.md).[constructor](lifetime.md#constructor)*

*Defined in [lifetime.ts:146](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L146)*

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

*Inherited from [Lifetime](lifetime.md).[dupable](lifetime.md#dupable)*

*Defined in [lifetime.ts:64](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L64)*

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

**`throws`** If the lifetime has been [dispose](weaklifetime.md#dispose)d already.

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

*Defined in [lifetime.ts:157](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L157)*

**Returns:** *void*

___

###  dup

▸ **dup**(): *[Lifetime](lifetime.md)‹TCopy, TCopy, Owner›*

*Inherited from [Lifetime](lifetime.md).[dup](lifetime.md#dup)*

*Defined in [lifetime.ts:71](https://github.com/justjake/quickjs-emscripten/blob/master/ts/lifetime.ts#L71)*

Create a new handle pointing to the same [value](weaklifetime.md#value).

**Returns:** *[Lifetime](lifetime.md)‹TCopy, TCopy, Owner›*
