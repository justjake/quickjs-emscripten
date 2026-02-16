[**quickjs-emscripten**](../../../README.md)

***

[quickjs-emscripten](../../../packages.md) / [@jitl/quickjs-ffi-types](../README.md) / BorrowedHeapCharPointer

# Type Alias: BorrowedHeapCharPointer

> **BorrowedHeapCharPointer** = `Pointer`<`"const char"` | `"char"` | `"js const char"`>

Defined in: [ffi-types.ts:82](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L82)

Used internally for Javascript-to-C calls that may contain strings too large
for the Emscripten stack.
