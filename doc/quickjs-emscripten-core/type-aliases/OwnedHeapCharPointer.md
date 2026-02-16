[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../README.md) / OwnedHeapCharPointer

# Type Alias: OwnedHeapCharPointer

> **OwnedHeapCharPointer** = `Pointer`<`"char"`>

Defined in: [packages/quickjs-ffi-types/src/ffi-types.ts:88](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L88)

Used internally for Javascript-to-C calls that may contain strings too large
for the Emscripten stack.
