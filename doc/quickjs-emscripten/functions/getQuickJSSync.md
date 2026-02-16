[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../README.md) / getQuickJSSync

# Function: getQuickJSSync()

> **getQuickJSSync**(): [`QuickJSWASMModule`](../classes/QuickJSWASMModule.md)

Defined in: [packages/quickjs-emscripten/src/mod.ts:41](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten/src/mod.ts#L41)

Provides synchronous access to the shared [QuickJSWASMModule](../classes/QuickJSWASMModule.md) instance returned by [getQuickJS](getQuickJS.md), as long as
least once.

* [Returns](#returns)
* [Throws](#throws)

## Returns

[`QuickJSWASMModule`](../classes/QuickJSWASMModule.md)

## Throws

If called before `getQuickJS` resolves.
