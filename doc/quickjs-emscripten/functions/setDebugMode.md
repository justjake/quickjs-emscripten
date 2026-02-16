[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../README.md) / setDebugMode

# Function: setDebugMode()

> **setDebugMode**(`enabled?`): `void`

Defined in: [packages/quickjs-emscripten-core/src/debug.ts:13](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/debug.ts#L13)

Enable (or disable) debug logging and object creation tracking globally.
This setting is inherited by newly created QuickJSRuntime instances.
To get debug logging in the WebAssembly module, you need to use a debug build variant.
See [the quickjs-emscripten-core README](https://github.com/justjake/quickjs-emscripten/tree/main/doc/quickjs-emscripten-core) for more about build variants.

* [Parameters](#parameters)

  * [enabled?](#enabled)

* [Returns](#returns)

## Parameters

### enabled?

`boolean` = `true`

## Returns

`void`
