[quickjs-emscripten - v0.1.0b](../README.md) › [Globals](../globals.md) › ["quickjs"](_quickjs_.md)

# External module: "quickjs"

## Index

### Classes

* [Lifetime](../classes/_quickjs_.lifetime.md)
* [QuickJS](../classes/_quickjs_.quickjs.md)
* [QuickJSVm](../classes/_quickjs_.quickjsvm.md)

### Type aliases

* [JSValue](_quickjs_.md#jsvalue)
* [JSValueConst](_quickjs_.md#jsvalueconst)
* [QuickJSHandle](_quickjs_.md#quickjshandle)
* [StaticJSValue](_quickjs_.md#staticjsvalue)

### Functions

* [getInstance](_quickjs_.md#getinstance)

## Type aliases

###  JSValue

Ƭ **JSValue**: *[Lifetime](../classes/_quickjs_.lifetime.md)‹[JSValuePointer](_ffi_.md#jsvaluepointer), [QuickJSVm](../classes/_quickjs_.quickjsvm.md)›*

*Defined in [quickjs.ts:469](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/quickjs.ts#L469)*

A owned QuickJSHandle that should be disposed.

___

###  JSValueConst

Ƭ **JSValueConst**: *[Lifetime](../classes/_quickjs_.lifetime.md)‹[JSValueConstPointer](_ffi_.md#jsvalueconstpointer), [QuickJSVm](../classes/_quickjs_.quickjsvm.md)›*

*Defined in [quickjs.ts:464](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/quickjs.ts#L464)*

A QuickJSHandle to a borrowed value that does not need to be disposed.

___

###  QuickJSHandle

Ƭ **QuickJSHandle**: *[StaticJSValue](_quickjs_.md#staticjsvalue) | [JSValue](_quickjs_.md#jsvalue) | [JSValueConst](_quickjs_.md#jsvalueconst)*

*Defined in [quickjs.ts:478](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/quickjs.ts#L478)*

Wraps a C pointer to a QuickJS JSValue, which represents a Javascript value inside
a QuickJS virtual machine.

Values must not be shared between QuickJSVm instances.
You must dispose of any handles you create by calling the `.dispose()` method.

___

###  StaticJSValue

Ƭ **StaticJSValue**: *[Lifetime](../classes/_quickjs_.lifetime.md)‹[JSValueConstPointer](_ffi_.md#jsvalueconstpointer)›*

*Defined in [quickjs.ts:459](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/quickjs.ts#L459)*

A QuickJSHandle to a constant that will never change, and does not need to be disposed.

## Functions

###  getInstance

▸ **getInstance**(): *Promise‹[QuickJS](../classes/_quickjs_.quickjs.md)›*

*Defined in [quickjs.ts:602](https://github.com/justjake/quickjs-emscripten/blob/5fb2234/ts/quickjs.ts#L602)*

Get the root QuickJS API.

**Returns:** *Promise‹[QuickJS](../classes/_quickjs_.quickjs.md)›*
