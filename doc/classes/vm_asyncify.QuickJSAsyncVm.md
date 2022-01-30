[quickjs-emscripten](../README.md) / [Exports](../modules.md) / [vm-asyncify](../modules/vm_asyncify.md) / QuickJSAsyncVm

# Class: QuickJSAsyncVm

[vm-asyncify](../modules/vm_asyncify.md).QuickJSAsyncVm

## Hierarchy

- `PureQuickJSVm`

  ↳ **`QuickJSAsyncVm`**

## Table of contents

### Constructors

- [constructor](vm_asyncify.QuickJSAsyncVm.md#constructor)

### Properties

- [asyncFFI](vm_asyncify.QuickJSAsyncVm.md#asyncffi)
- [module](vm_asyncify.QuickJSAsyncVm.md#module)

### Accessors

- [alive](vm_asyncify.QuickJSAsyncVm.md#alive)
- [false](vm_asyncify.QuickJSAsyncVm.md#false)
- [global](vm_asyncify.QuickJSAsyncVm.md#global)
- [null](vm_asyncify.QuickJSAsyncVm.md#null)
- [true](vm_asyncify.QuickJSAsyncVm.md#true)
- [undefined](vm_asyncify.QuickJSAsyncVm.md#undefined)

### Methods

- [computeMemoryUsage](vm_asyncify.QuickJSAsyncVm.md#computememoryusage)
- [dispose](vm_asyncify.QuickJSAsyncVm.md#dispose)
- [dumpMemoryUsage](vm_asyncify.QuickJSAsyncVm.md#dumpmemoryusage)
- [hasPendingJob](vm_asyncify.QuickJSAsyncVm.md#haspendingjob)
- [newArray](vm_asyncify.QuickJSAsyncVm.md#newarray)
- [newNumber](vm_asyncify.QuickJSAsyncVm.md#newnumber)
- [newObject](vm_asyncify.QuickJSAsyncVm.md#newobject)
- [newPromise](vm_asyncify.QuickJSAsyncVm.md#newpromise)
- [newString](vm_asyncify.QuickJSAsyncVm.md#newstring)
- [removeInterruptHandler](vm_asyncify.QuickJSAsyncVm.md#removeinterrupthandler)
- [setInterruptHandler](vm_asyncify.QuickJSAsyncVm.md#setinterrupthandler)
- [setMemoryLimit](vm_asyncify.QuickJSAsyncVm.md#setmemorylimit)

## Constructors

### constructor

• **new QuickJSAsyncVm**(`args`)

Use {@link QuickJS.createAsyncVm} to create a QuickJSAsyncVm instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.asyncFFI` | [`QuickJSAsyncFFI`](ffi_asyncify.QuickJSAsyncFFI.md) |
| `args.ctx` | [`Lifetime`](lifetime.Lifetime.md)<[`JSContextPointer`](../modules/ffi_types.md#jscontextpointer), `never`, `never`\> |
| `args.ffi` | [`QuickJSFFI`](ffi.QuickJSFFI.md) |
| `args.module` | [`QuickJSAsyncEmscriptenModule`](../interfaces/emscripten_types.QuickJSAsyncEmscriptenModule.md) |
| `args.rt` | [`Lifetime`](lifetime.Lifetime.md)<[`JSRuntimePointer`](../modules/ffi_types.md#jsruntimepointer), `never`, `never`\> |

#### Overrides

PureQuickJSVm.constructor

#### Defined in

[vm-asyncify.ts:15](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm-asyncify.ts#L15)

## Properties

### asyncFFI

• `Protected` `Readonly` **asyncFFI**: [`QuickJSAsyncFFI`](ffi_asyncify.QuickJSAsyncFFI.md)

#### Defined in

[vm-asyncify.ts:10](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm-asyncify.ts#L10)

___

### module

• `Protected` `Readonly` **module**: [`QuickJSAsyncEmscriptenModule`](../interfaces/emscripten_types.QuickJSAsyncEmscriptenModule.md)

#### Overrides

PureQuickJSVm.module

#### Defined in

[vm-asyncify.ts:9](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm-asyncify.ts#L9)

## Accessors

### alive

• `get` **alive**(): `boolean`

#### Returns

`boolean`

#### Inherited from

PureQuickJSVm.alive

#### Defined in

[vm.ts:263](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L263)

___

### false

• `get` **false**(): [`QuickJSHandle`](../modules/vm.md#quickjshandle)

[`false`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/false).

#### Returns

[`QuickJSHandle`](../modules/vm.md#quickjshandle)

#### Inherited from

PureQuickJSVm.false

#### Defined in

[vm.ts:321](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L321)

___

### global

• `get` **global**(): [`QuickJSHandle`](../modules/vm.md#quickjshandle)

[`global`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects).
A handle to the global object inside the interpreter.
You can set properties to create global variables.

#### Returns

[`QuickJSHandle`](../modules/vm.md#quickjshandle)

#### Inherited from

PureQuickJSVm.global

#### Defined in

[vm.ts:336](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L336)

___

### null

• `get` **null**(): [`QuickJSHandle`](../modules/vm.md#quickjshandle)

[`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null).

#### Returns

[`QuickJSHandle`](../modules/vm.md#quickjshandle)

#### Inherited from

PureQuickJSVm.null

#### Defined in

[vm.ts:295](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L295)

___

### true

• `get` **true**(): [`QuickJSHandle`](../modules/vm.md#quickjshandle)

[`true`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/true).

#### Returns

[`QuickJSHandle`](../modules/vm.md#quickjshandle)

#### Inherited from

PureQuickJSVm.true

#### Defined in

[vm.ts:308](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L308)

___

### undefined

• `get` **undefined**(): [`QuickJSHandle`](../modules/vm.md#quickjshandle)

[`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined).

#### Returns

[`QuickJSHandle`](../modules/vm.md#quickjshandle)

#### Inherited from

PureQuickJSVm.undefined

#### Defined in

[vm.ts:282](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L282)

## Methods

### computeMemoryUsage

▸ **computeMemoryUsage**(): [`QuickJSHandle`](../modules/vm.md#quickjshandle)

Compute memory usage for this runtime. Returns the result as a handle to a
JSValue object. Use [dump](vm.QuickJSVm.md#dump) to convert to a native object.
Calling this method will allocate more memory inside the runtime. The information
is accurate as of just before the call to `computeMemoryUsage`.
For a human-digestible representation, see [dumpMemoryUsage](vm_asyncify.QuickJSAsyncVm.md#dumpmemoryusage).

#### Returns

[`QuickJSHandle`](../modules/vm.md#quickjshandle)

#### Inherited from

PureQuickJSVm.computeMemoryUsage

#### Defined in

[vm.ts:501](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L501)

___

### dispose

▸ **dispose**(): `void`

Dispose of this VM's underlying resources.

**`throws`** Calling this method without disposing of all created handles
will result in an error.

#### Returns

`void`

#### Inherited from

PureQuickJSVm.dispose

#### Defined in

[vm.ts:273](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L273)

___

### dumpMemoryUsage

▸ **dumpMemoryUsage**(): `string`

#### Returns

`string`

a human-readable description of memory usage in this runtime.
For programmatic access to this information, see [computeMemoryUsage](vm_asyncify.QuickJSAsyncVm.md#computememoryusage).

#### Inherited from

PureQuickJSVm.dumpMemoryUsage

#### Defined in

[vm.ts:511](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L511)

___

### hasPendingJob

▸ **hasPendingJob**(): `boolean`

In QuickJS, promises and async functions create pendingJobs. These do not execute
immediately and need to be run by calling [executePendingJobs](vm.QuickJSVm.md#executependingjobs).

#### Returns

`boolean`

true if there is at least one pendingJob queued up.

#### Inherited from

PureQuickJSVm.hasPendingJob

#### Defined in

[vm.ts:433](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L433)

___

### newArray

▸ **newArray**(): [`QuickJSHandle`](../modules/vm.md#quickjshandle)

`[]`.
Create a new QuickJS [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

#### Returns

[`QuickJSHandle`](../modules/vm.md#quickjshandle)

#### Inherited from

PureQuickJSVm.newArray

#### Defined in

[vm.ts:394](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L394)

___

### newNumber

▸ **newNumber**(`num`): [`QuickJSHandle`](../modules/vm.md#quickjshandle)

Converts a Javascript number into a QuickJS value.

#### Parameters

| Name | Type |
| :------ | :------ |
| `num` | `number` |

#### Returns

[`QuickJSHandle`](../modules/vm.md#quickjshandle)

#### Inherited from

PureQuickJSVm.newNumber

#### Defined in

[vm.ts:360](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L360)

___

### newObject

▸ **newObject**(`prototype?`): [`QuickJSHandle`](../modules/vm.md#quickjshandle)

`{}`.
Create a new QuickJS [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prototype?` | [`QuickJSHandle`](../modules/vm.md#quickjshandle) | Like [`Object.create`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create). |

#### Returns

[`QuickJSHandle`](../modules/vm.md#quickjshandle)

#### Inherited from

PureQuickJSVm.newObject

#### Defined in

[vm.ts:380](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L380)

___

### newPromise

▸ **newPromise**(): [`QuickJSDeferredPromise`](deferred_promise.QuickJSDeferredPromise.md)

Create a new [QuickJSDeferredPromise](deferred_promise.QuickJSDeferredPromise.md). Use `deferred.resolve(handle)` and
`deferred.reject(handle)` to fulfill the promise handle available at `deferred.handle`.
Note that you are responsible for calling `deferred.dispose()` to free the underlying
resources; see the documentation on [QuickJSDeferredPromise](deferred_promise.QuickJSDeferredPromise.md) for details.

#### Returns

[`QuickJSDeferredPromise`](deferred_promise.QuickJSDeferredPromise.md)

#### Inherited from

PureQuickJSVm.newPromise

#### Defined in

[vm.ts:405](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L405)

___

### newString

▸ **newString**(`str`): [`QuickJSHandle`](../modules/vm.md#quickjshandle)

Create a QuickJS [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) value.

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

[`QuickJSHandle`](../modules/vm.md#quickjshandle)

#### Inherited from

PureQuickJSVm.newString

#### Defined in

[vm.ts:367](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L367)

___

### removeInterruptHandler

▸ **removeInterruptHandler**(): `void`

Remove the interrupt handler, if any.
See [setInterruptHandler](vm_asyncify.QuickJSAsyncVm.md#setinterrupthandler).

#### Returns

`void`

#### Inherited from

PureQuickJSVm.removeInterruptHandler

#### Defined in

[vm.ts:459](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L459)

___

### setInterruptHandler

▸ **setInterruptHandler**(`cb`): `void`

Set a callback which is regularly called by the QuickJS engine when it is
executing code. This callback can be used to implement an execution
timeout.

The interrupt handler can be removed with [removeInterruptHandler](vm_asyncify.QuickJSAsyncVm.md#removeinterrupthandler).

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb` | [`InterruptHandler`](../modules/vm.md#interrupthandler) |

#### Returns

`void`

#### Inherited from

PureQuickJSVm.setInterruptHandler

#### Defined in

[vm.ts:447](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L447)

___

### setMemoryLimit

▸ **setMemoryLimit**(`limitBytes`): `void`

Set the max memory this runtime can allocate.
To remove the limit, set to `-1`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `limitBytes` | `number` |

#### Returns

`void`

#### Inherited from

PureQuickJSVm.setMemoryLimit

#### Defined in

[vm.ts:486](https://github.com/justjake/quickjs-emscripten/blob/master/ts/vm.ts#L486)
