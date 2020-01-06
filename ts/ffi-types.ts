// ts/ffi-types.ts
// This file is copied into build/wrapper/wasm to provide typings.
const pointerBrand = Symbol('pointer')
type Pointer<Brand extends string> = number & { [pointerBrand]: Brand }
type JSRuntimePointer = Pointer<'JSRuntime'>
type JSContextPointer = Pointer<'JSContext'>
type JSValuePointer = Pointer<'JSValue'>
