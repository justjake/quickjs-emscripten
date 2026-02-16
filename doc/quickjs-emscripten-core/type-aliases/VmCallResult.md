[**quickjs-emscripten**](../../README.md)

***

[quickjs-emscripten](../../packages.md) / [quickjs-emscripten-core](../README.md) / VmCallResult

# Type Alias: VmCallResult\<VmHandle>

> **VmCallResult**<`VmHandle`> = [`SuccessOrFail`](SuccessOrFail.md)<`VmHandle`, `VmHandle`>

Defined in: [packages/quickjs-emscripten-core/src/vm-interface.ts:26](https://github.com/justjake/quickjs-emscripten/blob/main/packages/quickjs-emscripten-core/src/vm-interface.ts#L26)

Used as an optional for results of a Vm call.
`{ value: VmHandle } | { error: VmHandle }`.

## Contents

* [Type Parameters](#type-parameters)
  * [VmHandle](#vmhandle)

## Type Parameters

### VmHandle

`VmHandle`
