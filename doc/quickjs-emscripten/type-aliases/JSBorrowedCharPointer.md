[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten](../README.md) / JSBorrowedCharPointer

# Type Alias: JSBorrowedCharPointer

> **JSBorrowedCharPointer** = `Pointer`<`"js const char"`>

Defined in: packages/quickjs-ffi-types/dist/index.d.ts:80

Used internally for Javascript-to-C calls that may contain strings too large
for the Emscripten stack.
