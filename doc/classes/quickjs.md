[quickjs-emscripten](../README.md) › [Globals](../globals.md) › [QuickJS](quickjs.md)

# Class: QuickJS

QuickJS presents a Javascript interface to QuickJS, a Javascript interpreter that
supports ES2019.

QuickJS is a singleton. Use the [getQuickJS](../globals.md#getquickjs) function to instantiate
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

*Defined in [quickjs.ts:630](https://github.com/justjake/quickjs-emscripten/blob/2557c41/ts/quickjs.ts#L630)*

**Returns:** *[QuickJS](quickjs.md)*

## Methods

###  createVm

▸ **createVm**(): *[QuickJSVm](quickjsvm.md)*

*Defined in [quickjs.ts:671](https://github.com/justjake/quickjs-emscripten/blob/2557c41/ts/quickjs.ts#L671)*

Create a QuickJS VM.

Each VM is completely independent - you cannot share handles between
VMs.

**Returns:** *[QuickJSVm](quickjsvm.md)*

___

###  evalCode

▸ **evalCode**(`code`: string): *unknown*

*Defined in [quickjs.ts:700](https://github.com/justjake/quickjs-emscripten/blob/2557c41/ts/quickjs.ts#L700)*

One-off evaluate code without needing to create a VM.
The result is coerced to a native Javascript value using JSON
serialization, so values unsupported by JSON will be dropped.

If you need more control over how the code executes, create a
[QuickJSVm](quickjsvm.md) instance and use its [QuickJSVm.evalCode](quickjsvm.md#evalcode) method.

*Note: this does not protect against infinite loops.*

**`throws`** If `code` throws during evaluation, the exception will be
converted into a Javascript value and throw.

**Parameters:**

Name | Type |
------ | ------ |
`code` | string |

**Returns:** *unknown*
