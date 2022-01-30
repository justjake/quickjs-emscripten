[quickjs-emscripten](../README.md) / [Exports](../modules.md) / [quickjs](../modules/quickjs.md) / QuickJS

# Class: QuickJS

[quickjs](../modules/quickjs.md).QuickJS

QuickJS presents a Javascript interface to QuickJS, a Javascript interpreter that
supports ES2019.

QuickJS is a singleton. Use the [getQuickJS](../modules/quickjs.md#getquickjs) function to instantiate
or retrieve an instance.

Use the [QuickJS.createVm](quickjs.QuickJS.md#createvm) method to create a [QuickJSVm](../modules/quickjs.md#quickjsvm).

Use the [QuickJS.evalCode](quickjs.QuickJS.md#evalcode) method as a shortcut evaluate Javascript safely
and return the result as a native Javascript value.

## Table of contents

### Constructors

- [constructor](quickjs.QuickJS.md#constructor)

### Methods

- [createAsyncVm](quickjs.QuickJS.md#createasyncvm)
- [createVm](quickjs.QuickJS.md#createvm)
- [evalCode](quickjs.QuickJS.md#evalcode)

## Constructors

### constructor

• **new QuickJS**(`module`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `module` | [`QuickJSEmscriptenModule`](../interfaces/emscripten_types.QuickJSEmscriptenModule.md) |

#### Defined in

[quickjs.ts:154](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L154)

## Methods

### createAsyncVm

▸ **createAsyncVm**(): `Promise`<[`QuickJSAsyncVm`](quickjsasyncvm.QuickJSAsyncVm.md)\>

Create an asyncified QuickJS VM.

**`todo`** Better docs

#### Returns

`Promise`<[`QuickJSAsyncVm`](quickjsasyncvm.QuickJSAsyncVm.md)\>

#### Defined in

[quickjs.ts:189](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L189)

___

### createVm

▸ **createVm**(): [`QuickJSVm`](quickjsvm.QuickJSVm.md)

Create a QuickJS VM.

Each VM is completely independent - you cannot share handles between
VMs.

#### Returns

[`QuickJSVm`](quickjsvm.QuickJSVm.md)

#### Defined in

[quickjs.ts:166](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L166)

___

### evalCode

▸ **evalCode**(`code`, `options?`): `unknown`

One-off evaluate code without needing to create a VM.

To protect against infinite loops, use the `shouldInterrupt` option. The
[shouldInterruptAfterDeadline](../modules/quickjs.md#shouldinterruptafterdeadline) function will create a time-based deadline.

If you need more control over how the code executes, create a
[QuickJSVm](../modules/quickjs.md#quickjsvm) instance and use its [QuickJSVm.evalCode](quickjsvm.QuickJSVm.md#evalcode) method.

Asynchronous callbacks may not run during the first call to `evalCode`. If you need to
work with async code inside QuickJS, you should create a VM and use [QuickJSVm.executePendingJobs](quickjsvm.QuickJSVm.md#executependingjobs).

**`throws`** If `code` throws during evaluation, the exception will be
converted into a native Javascript value and thrown.

**`throws`** if `options.shouldInterrupt` interrupted execution, will throw a Error
with name `"InternalError"` and  message `"interrupted"`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `string` |
| `options` | [`QuickJSEvalOptions`](../interfaces/quickjsvm.QuickJSEvalOptions.md) |

#### Returns

`unknown`

The result is coerced to a native Javascript value using JSON
serialization, so properties and values unsupported by JSON will be dropped.

#### Defined in

[quickjs.ts:236](https://github.com/justjake/quickjs-emscripten/blob/master/ts/quickjs.ts#L236)
