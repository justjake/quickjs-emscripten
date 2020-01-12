[quickjs-emscripten - v0.1.0b](../README.md) › [Globals](../globals.md) › [QuickJS](quickjs.md)

# Class: QuickJS

QuickJS presents a Javascript interface to QuickJS, a Javascript interpreter that
supports ES2019.

QuickJS is a singleton. Use the [getInstance](../globals.md#getinstance) function to instantiate
or retrieve an instance.

Use the [QuickJS.createVm](quickjs.md#createvm) method to create a [QuickJSVm](quickjsvm.md).

Use the [QuickJS.evalCode](quickjs.md#evalcode) method as a shortcut evaluate Javascript safely
and return the result as a native Javascript value.

## Hierarchy

* **QuickJS**

## Index

### Constructors

* [constructor](quickjs.md#constructor)

### Methods

* [createVm](quickjs.md#createvm)
* [evalCode](quickjs.md#evalcode)

## Constructors

###  constructor

\+ **new QuickJS**(): *[QuickJS](quickjs.md)*

*Defined in [quickjs.ts:599](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/quickjs.ts#L599)*

**Returns:** *[QuickJS](quickjs.md)*

## Methods

###  createVm

▸ **createVm**(): *[QuickJSVm](quickjsvm.md)*

*Defined in [quickjs.ts:640](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/quickjs.ts#L640)*

Create a QuickJS VM.

Each VM is completely independent - you cannot share handles between
VMs.

**Returns:** *[QuickJSVm](quickjsvm.md)*

___

###  evalCode

▸ **evalCode**(`code`: string): *unknown*

*Defined in [quickjs.ts:661](https://github.com/justjake/quickjs-emscripten/blob/ce3ee3a/ts/quickjs.ts#L661)*

One-off evaluate code without needing to create a VM.
The result is coerced to a native Javascript value using JSON
serialization, so values unsupported by JSON will be dropped.

**Parameters:**

Name | Type |
------ | ------ |
`code` | string |

**Returns:** *unknown*
