[**quickjs-emscripten**](../../../README.md)

***

[quickjs-emscripten](../../../packages.md) / [@jitl/quickjs-ffi-types](../README.md) / JSBorrowedCharPointer

# Type Alias: JSBorrowedCharPointer

> **JSBorrowedCharPointer** = `Pointer`<`"js const char"`>

Defined in: [ffi-types.ts:94](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-ffi-types/src/ffi-types.ts#L94)

Used internally for Javascript-to-C calls that may contain strings too large
for the Emscripten stack.
