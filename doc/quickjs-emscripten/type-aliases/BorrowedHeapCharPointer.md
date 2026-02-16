[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../README.md) / BorrowedHeapCharPointer

# Type Alias: BorrowedHeapCharPointer

> **BorrowedHeapCharPointer** = `Pointer`<`"const char"` | `"char"` | `"js const char"`>

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:70

Used internally for Javascript-to-C calls that may contain strings too large
for the Emscripten stack.
