// ts/ffi-types.ts
type Pointer<Brand extends string> = number & { ctype: Brand }
type JSRuntimePointer = Pointer<'JSRuntime'>
type JSContextPointer = Pointer<'JSContext'>
type JSValuePointer = Pointer<'JSValue'>
type JSValueConstPointer = Pointer<'JSValueConst'>
type JSValueConstPointerPointer = Pointer<'JSValueConst[]'>
type JSCFunctionPointer = Pointer<'JSCFunction'>
type QTS_C_To_HostCallbackFuncPointer = Pointer<'C_To_HostCallbackFuncPointer'>
