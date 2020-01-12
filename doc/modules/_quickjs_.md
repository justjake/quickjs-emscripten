[quickjs-emscripten - v0.1.0b](../README.md) › [Globals](../globals.md) › ["quickjs"](_quickjs_.md)

# External module: "quickjs"

## Index

### Classes

* [QuickJS](../classes/_quickjs_.quickjs.md)
* [QuickJSVm](../classes/_quickjs_.quickjsvm.md)

### Type aliases

* [QuickJSHandle](_quickjs_.md#quickjshandle)

### Functions

* [getInstance](_quickjs_.md#getinstance)

## Type aliases

###  QuickJSHandle

Ƭ **QuickJSHandle**: *StaticJSValue | JSValue | JSValueConst*

*Defined in [quickjs.ts:475](https://github.com/justjake/quickjs-emscripten/blob/aff5edf/ts/quickjs.ts#L475)*

Wraps a C pointer to a QuickJS JSValue, which represents a Javascript value inside
a QuickJS virtual machine.

Values must not be shared between QuickJSVm instances.
You must dispose of any handles you create by calling the `.dispose()` method.

## Functions

###  getInstance

▸ **getInstance**(): *Promise‹[QuickJS](../classes/_quickjs_.quickjs.md)›*

*Defined in [quickjs.ts:599](https://github.com/justjake/quickjs-emscripten/blob/aff5edf/ts/quickjs.ts#L599)*

Get the root QuickJS API.

**Returns:** *Promise‹[QuickJS](../classes/_quickjs_.quickjs.md)›*
