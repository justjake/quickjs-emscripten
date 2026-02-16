[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../README.md) / OwnedHeapCharPointer

# Type Alias: OwnedHeapCharPointer

> **OwnedHeapCharPointer** = `Pointer`<`"char"`>

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:75

Used internally for Javascript-to-C calls that may contain strings too large
for the Emscripten stack.
