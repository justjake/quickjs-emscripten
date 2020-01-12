[quickjs-emscripten - v0.1.0b](../README.md) › [Globals](../globals.md) › ["quickjs"](../modules/_quickjs_.md) › [QuickJS](_quickjs_.quickjs.md)

# Class: QuickJS

QuickJS presents a Javascript interface to QuickJS, a Javascript interpreter that
supports ES2019.

QuickJS is a singleton. Use the [getInstance](../modules/_quickjs_.md#getinstance) function to instantiate
or retrieve an instance.

Use the {@link QuickJS#createVm} method to create a [QuickJSVm](_quickjs_.quickjsvm.md).

Use the {@link QuickJS#evalCode} method as a shortcut evaluate Javascript safely
and return the result as a native Javascript value.

## Hierarchy

* **QuickJS**

## Index

### Constructors

* [constructor](_quickjs_.quickjs.md#constructor)

### Methods

* [createVm](_quickjs_.quickjs.md#createvm)
* [evalCode](_quickjs_.quickjs.md#evalcode)

## Constructors

###  constructor

\+ **new QuickJS**(): *[QuickJS](_quickjs_.quickjs.md)*

*Defined in [quickjs.ts:492](https://github.com/justjake/quickjs-emscripten/blob/aff5edf/ts/quickjs.ts#L492)*

**Returns:** *[QuickJS](_quickjs_.quickjs.md)*

## Methods

###  createVm

▸ **createVm**(): *[QuickJSVm](_quickjs_.quickjsvm.md)*

*Defined in [quickjs.ts:533](https://github.com/justjake/quickjs-emscripten/blob/aff5edf/ts/quickjs.ts#L533)*

Create a QuickJS VM.

Each VM is completely independent - you cannot share handles between
VMs.

**Returns:** *[QuickJSVm](_quickjs_.quickjsvm.md)*

___

###  evalCode

▸ **evalCode**(`code`: string): *unknown*

*Defined in [quickjs.ts:554](https://github.com/justjake/quickjs-emscripten/blob/aff5edf/ts/quickjs.ts#L554)*

One-off evaluate code without needing to create a VM.
The result is coerced to a native Javascript value using JSON
serialization, so values unsupported by JSON will be dropped.

**Parameters:**

Name | Type |
------ | ------ |
`code` | string |

**Returns:** *unknown*
