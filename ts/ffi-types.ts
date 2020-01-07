// ts/ffi-types.ts
// This file is copied into build/wrapper/wasm to provide typings.
type Pointer<Brand extends string> = number & { ctype: Brand }
type JSRuntimePointer = Pointer<'JSRuntime'>
type JSContextPointer = Pointer<'JSContext'>
type JSValuePointer = Pointer<'JSValue'>
type JSValueConstPointer = Pointer<'JSValueConst'>
type JSValueConstPointerPointer = Pointer<'JSValueConst[]'>
type JSCFunctionPointer = Pointer<'JSCFunction'>
