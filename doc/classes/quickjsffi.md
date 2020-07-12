[quickjs-emscripten](../README.md) › [Globals](../globals.md) › [QuickJSFFI](quickjsffi.md)

# Class: QuickJSFFI

Low-level FFI bindings to QuickJS's Emscripten module.
See instead [QuickJSVm](quickjsvm.md), the public Javascript interface exposed by this
library.

**`unstable`** The FFI interface is considered private and may change.

## Hierarchy

* **QuickJSFFI**

## Index

### Constructors

* [constructor](quickjsffi.md#constructor)

### Properties

* [QTS_ArgvGetJSValueConstPointer](quickjsffi.md#qts_argvgetjsvalueconstpointer)
* [QTS_Call](quickjsffi.md#qts_call)
* [QTS_DefineProp](quickjsffi.md#qts_defineprop)
* [QTS_Dump](quickjsffi.md#qts_dump)
* [QTS_DupValue](quickjsffi.md#qts_dupvalue)
* [QTS_DupValuePointer](quickjsffi.md#qts_dupvaluepointer)
* [QTS_Eval](quickjsffi.md#qts_eval)
* [QTS_ExecutePendingJob](quickjsffi.md#qts_executependingjob)
* [QTS_FreeContext](quickjsffi.md#qts_freecontext)
* [QTS_FreeRuntime](quickjsffi.md#qts_freeruntime)
* [QTS_FreeValuePointer](quickjsffi.md#qts_freevaluepointer)
* [QTS_GetFalse](quickjsffi.md#qts_getfalse)
* [QTS_GetFloat64](quickjsffi.md#qts_getfloat64)
* [QTS_GetGlobalObject](quickjsffi.md#qts_getglobalobject)
* [QTS_GetNull](quickjsffi.md#qts_getnull)
* [QTS_GetProp](quickjsffi.md#qts_getprop)
* [QTS_GetString](quickjsffi.md#qts_getstring)
* [QTS_GetTrue](quickjsffi.md#qts_gettrue)
* [QTS_GetUndefined](quickjsffi.md#qts_getundefined)
* [QTS_IsJobPending](quickjsffi.md#qts_isjobpending)
* [QTS_NewArray](quickjsffi.md#qts_newarray)
* [QTS_NewContext](quickjsffi.md#qts_newcontext)
* [QTS_NewError](quickjsffi.md#qts_newerror)
* [QTS_NewFloat64](quickjsffi.md#qts_newfloat64)
* [QTS_NewFunction](quickjsffi.md#qts_newfunction)
* [QTS_NewObject](quickjsffi.md#qts_newobject)
* [QTS_NewObjectProto](quickjsffi.md#qts_newobjectproto)
* [QTS_NewRuntime](quickjsffi.md#qts_newruntime)
* [QTS_NewString](quickjsffi.md#qts_newstring)
* [QTS_ResolveException](quickjsffi.md#qts_resolveexception)
* [QTS_RuntimeDisableInterruptHandler](quickjsffi.md#qts_runtimedisableinterrupthandler)
* [QTS_RuntimeEnableInterruptHandler](quickjsffi.md#qts_runtimeenableinterrupthandler)
* [QTS_SetHostCallback](quickjsffi.md#qts_sethostcallback)
* [QTS_SetInterruptCallback](quickjsffi.md#qts_setinterruptcallback)
* [QTS_SetProp](quickjsffi.md#qts_setprop)
* [QTS_Throw](quickjsffi.md#qts_throw)
* [QTS_Typeof](quickjsffi.md#qts_typeof)

## Constructors

###  constructor

\+ **new QuickJSFFI**(`module`: [QuickJSEmscriptenModule](../interfaces/quickjsemscriptenmodule.md)): *[QuickJSFFI](quickjsffi.md)*

*Defined in [ffi.ts:64](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L64)*

**Parameters:**

Name | Type |
------ | ------ |
`module` | [QuickJSEmscriptenModule](../interfaces/quickjsemscriptenmodule.md) |

**Returns:** *[QuickJSFFI](quickjsffi.md)*

## Properties

###  QTS_ArgvGetJSValueConstPointer

• **QTS_ArgvGetJSValueConstPointer**: *function* = 
    this.module.cwrap("QTS_ArgvGetJSValueConstPointer", "number", ["number","number"])

*Defined in [ffi.ts:70](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L70)*

#### Type declaration:

▸ (`argv`: [JSValuePointer](../globals.md#jsvaluepointer) | [JSValueConstPointer](../globals.md#jsvalueconstpointer), `index`: number): *[JSValueConstPointer](../globals.md#jsvalueconstpointer)*

**Parameters:**

Name | Type |
------ | ------ |
`argv` | [JSValuePointer](../globals.md#jsvaluepointer) &#124; [JSValueConstPointer](../globals.md#jsvalueconstpointer) |
`index` | number |

___

###  QTS_Call

• **QTS_Call**: *function* = 
    this.module.cwrap("QTS_Call", "number", ["number","number","number","number","number"])

*Defined in [ffi.ts:157](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L157)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../globals.md#jscontextpointer), `func_obj`: [JSValuePointer](../globals.md#jsvaluepointer) | [JSValueConstPointer](../globals.md#jsvalueconstpointer), `this_obj`: [JSValuePointer](../globals.md#jsvaluepointer) | [JSValueConstPointer](../globals.md#jsvalueconstpointer), `argc`: number, `argv_ptrs`: [JSValueConstPointerPointer](../globals.md#jsvalueconstpointerpointer)): *[JSValuePointer](../globals.md#jsvaluepointer)*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../globals.md#jscontextpointer) |
`func_obj` | [JSValuePointer](../globals.md#jsvaluepointer) &#124; [JSValueConstPointer](../globals.md#jsvalueconstpointer) |
`this_obj` | [JSValuePointer](../globals.md#jsvaluepointer) &#124; [JSValueConstPointer](../globals.md#jsvalueconstpointer) |
`argc` | number |
`argv_ptrs` | [JSValueConstPointerPointer](../globals.md#jsvalueconstpointerpointer) |

___

###  QTS_DefineProp

• **QTS_DefineProp**: *function* = 
    this.module.cwrap("QTS_DefineProp", null, ["number","number","number","number","number","number","boolean","boolean","boolean"])

*Defined in [ffi.ts:154](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L154)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../globals.md#jscontextpointer), `this_val`: [JSValuePointer](../globals.md#jsvaluepointer) | [JSValueConstPointer](../globals.md#jsvalueconstpointer), `prop_name`: [JSValuePointer](../globals.md#jsvaluepointer) | [JSValueConstPointer](../globals.md#jsvalueconstpointer), `prop_value`: [JSValuePointer](../globals.md#jsvaluepointer) | [JSValueConstPointer](../globals.md#jsvalueconstpointer), `get`: [JSValuePointer](../globals.md#jsvaluepointer) | [JSValueConstPointer](../globals.md#jsvalueconstpointer), `set`: [JSValuePointer](../globals.md#jsvaluepointer) | [JSValueConstPointer](../globals.md#jsvalueconstpointer), `configurable`: boolean, `enumerable`: boolean, `has_value`: boolean): *void*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../globals.md#jscontextpointer) |
`this_val` | [JSValuePointer](../globals.md#jsvaluepointer) &#124; [JSValueConstPointer](../globals.md#jsvalueconstpointer) |
`prop_name` | [JSValuePointer](../globals.md#jsvaluepointer) &#124; [JSValueConstPointer](../globals.md#jsvalueconstpointer) |
`prop_value` | [JSValuePointer](../globals.md#jsvaluepointer) &#124; [JSValueConstPointer](../globals.md#jsvalueconstpointer) |
`get` | [JSValuePointer](../globals.md#jsvaluepointer) &#124; [JSValueConstPointer](../globals.md#jsvalueconstpointer) |
`set` | [JSValuePointer](../globals.md#jsvaluepointer) &#124; [JSValueConstPointer](../globals.md#jsvalueconstpointer) |
`configurable` | boolean |
`enumerable` | boolean |
`has_value` | boolean |

___

###  QTS_Dump

• **QTS_Dump**: *function* = 
    this.module.cwrap("QTS_Dump", "string", ["number","number"])

*Defined in [ffi.ts:163](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L163)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../globals.md#jscontextpointer), `obj`: [JSValuePointer](../globals.md#jsvaluepointer) | [JSValueConstPointer](../globals.md#jsvalueconstpointer)): *string*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../globals.md#jscontextpointer) |
`obj` | [JSValuePointer](../globals.md#jsvaluepointer) &#124; [JSValueConstPointer](../globals.md#jsvalueconstpointer) |

___

###  QTS_DupValue

• **QTS_DupValue**: *function* = 
    this.module.cwrap("QTS_DupValue", "number", ["number","number"])

*Defined in [ffi.ts:172](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L172)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../globals.md#jscontextpointer), `value_ptr`: [JSValuePointer](../globals.md#jsvaluepointer) | [JSValueConstPointer](../globals.md#jsvalueconstpointer)): *[JSValuePointer](../globals.md#jsvaluepointer)*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../globals.md#jscontextpointer) |
`value_ptr` | [JSValuePointer](../globals.md#jsvaluepointer) &#124; [JSValueConstPointer](../globals.md#jsvalueconstpointer) |

___

###  QTS_DupValuePointer

• **QTS_DupValuePointer**: *function* = 
    this.module.cwrap("QTS_DupValuePointer", "number", ["number","number"])

*Defined in [ffi.ts:118](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L118)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../globals.md#jscontextpointer), `val`: [JSValuePointer](../globals.md#jsvaluepointer) | [JSValueConstPointer](../globals.md#jsvalueconstpointer)): *[JSValuePointer](../globals.md#jsvaluepointer)*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../globals.md#jscontextpointer) |
`val` | [JSValuePointer](../globals.md#jsvaluepointer) &#124; [JSValueConstPointer](../globals.md#jsvalueconstpointer) |

___

###  QTS_Eval

• **QTS_Eval**: *function* = 
    this.module.cwrap("QTS_Eval", "number", ["number","string"])

*Defined in [ffi.ts:166](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L166)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../globals.md#jscontextpointer), `js_code`: string): *[JSValuePointer](../globals.md#jsvaluepointer)*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../globals.md#jscontextpointer) |
`js_code` | string |

___

###  QTS_ExecutePendingJob

• **QTS_ExecutePendingJob**: *function* = 
    this.module.cwrap("QTS_ExecutePendingJob", "number", ["number","number"])

*Defined in [ffi.ts:145](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L145)*

#### Type declaration:

▸ (`rt`: [JSRuntimePointer](../globals.md#jsruntimepointer), `maxJobsToExecute`: number): *[JSValuePointer](../globals.md#jsvaluepointer)*

**Parameters:**

Name | Type |
------ | ------ |
`rt` | [JSRuntimePointer](../globals.md#jsruntimepointer) |
`maxJobsToExecute` | number |

___

###  QTS_FreeContext

• **QTS_FreeContext**: *function* = 
    this.module.cwrap("QTS_FreeContext", null, ["number"])

*Defined in [ffi.ts:112](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L112)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../globals.md#jscontextpointer)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../globals.md#jscontextpointer) |

___

###  QTS_FreeRuntime

• **QTS_FreeRuntime**: *function* = 
    this.module.cwrap("QTS_FreeRuntime", null, ["number"])

*Defined in [ffi.ts:106](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L106)*

#### Type declaration:

▸ (`rt`: [JSRuntimePointer](../globals.md#jsruntimepointer)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`rt` | [JSRuntimePointer](../globals.md#jsruntimepointer) |

___

###  QTS_FreeValuePointer

• **QTS_FreeValuePointer**: *function* = 
    this.module.cwrap("QTS_FreeValuePointer", null, ["number","number"])

*Defined in [ffi.ts:115](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L115)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../globals.md#jscontextpointer), `value`: [JSValuePointer](../globals.md#jsvaluepointer)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../globals.md#jscontextpointer) |
`value` | [JSValuePointer](../globals.md#jsvaluepointer) |

___

###  QTS_GetFalse

• **QTS_GetFalse**: *function* = 
    this.module.cwrap("QTS_GetFalse", "number", [])

*Defined in [ffi.ts:97](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L97)*

#### Type declaration:

▸ (): *[JSValueConstPointer](../globals.md#jsvalueconstpointer)*

___

###  QTS_GetFloat64

• **QTS_GetFloat64**: *function* = 
    this.module.cwrap("QTS_GetFloat64", "number", ["number","number"])

*Defined in [ffi.ts:133](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L133)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../globals.md#jscontextpointer), `value`: [JSValuePointer](../globals.md#jsvaluepointer) | [JSValueConstPointer](../globals.md#jsvalueconstpointer)): *number*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../globals.md#jscontextpointer) |
`value` | [JSValuePointer](../globals.md#jsvaluepointer) &#124; [JSValueConstPointer](../globals.md#jsvalueconstpointer) |

___

###  QTS_GetGlobalObject

• **QTS_GetGlobalObject**: *function* = 
    this.module.cwrap("QTS_GetGlobalObject", "number", ["number"])

*Defined in [ffi.ts:175](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L175)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../globals.md#jscontextpointer)): *[JSValuePointer](../globals.md#jsvaluepointer)*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../globals.md#jscontextpointer) |

___

###  QTS_GetNull

• **QTS_GetNull**: *function* = 
    this.module.cwrap("QTS_GetNull", "number", [])

*Defined in [ffi.ts:94](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L94)*

#### Type declaration:

▸ (): *[JSValueConstPointer](../globals.md#jsvalueconstpointer)*

___

###  QTS_GetProp

• **QTS_GetProp**: *function* = 
    this.module.cwrap("QTS_GetProp", "number", ["number","number","number"])

*Defined in [ffi.ts:148](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L148)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../globals.md#jscontextpointer), `this_val`: [JSValuePointer](../globals.md#jsvaluepointer) | [JSValueConstPointer](../globals.md#jsvalueconstpointer), `prop_name`: [JSValuePointer](../globals.md#jsvaluepointer) | [JSValueConstPointer](../globals.md#jsvalueconstpointer)): *[JSValuePointer](../globals.md#jsvaluepointer)*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../globals.md#jscontextpointer) |
`this_val` | [JSValuePointer](../globals.md#jsvaluepointer) &#124; [JSValueConstPointer](../globals.md#jsvalueconstpointer) |
`prop_name` | [JSValuePointer](../globals.md#jsvaluepointer) &#124; [JSValueConstPointer](../globals.md#jsvalueconstpointer) |

___

###  QTS_GetString

• **QTS_GetString**: *function* = 
    this.module.cwrap("QTS_GetString", "string", ["number","number"])

*Defined in [ffi.ts:139](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L139)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../globals.md#jscontextpointer), `value`: [JSValuePointer](../globals.md#jsvaluepointer) | [JSValueConstPointer](../globals.md#jsvalueconstpointer)): *string*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../globals.md#jscontextpointer) |
`value` | [JSValuePointer](../globals.md#jsvaluepointer) &#124; [JSValueConstPointer](../globals.md#jsvalueconstpointer) |

___

###  QTS_GetTrue

• **QTS_GetTrue**: *function* = 
    this.module.cwrap("QTS_GetTrue", "number", [])

*Defined in [ffi.ts:100](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L100)*

#### Type declaration:

▸ (): *[JSValueConstPointer](../globals.md#jsvalueconstpointer)*

___

###  QTS_GetUndefined

• **QTS_GetUndefined**: *function* = 
    this.module.cwrap("QTS_GetUndefined", "number", [])

*Defined in [ffi.ts:91](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L91)*

#### Type declaration:

▸ (): *[JSValueConstPointer](../globals.md#jsvalueconstpointer)*

___

###  QTS_IsJobPending

• **QTS_IsJobPending**: *function* = 
    this.module.cwrap("QTS_IsJobPending", "number", ["number"])

*Defined in [ffi.ts:142](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L142)*

#### Type declaration:

▸ (`rt`: [JSRuntimePointer](../globals.md#jsruntimepointer)): *number*

**Parameters:**

Name | Type |
------ | ------ |
`rt` | [JSRuntimePointer](../globals.md#jsruntimepointer) |

___

###  QTS_NewArray

• **QTS_NewArray**: *function* = 
    this.module.cwrap("QTS_NewArray", "number", ["number"])

*Defined in [ffi.ts:127](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L127)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../globals.md#jscontextpointer)): *[JSValuePointer](../globals.md#jsvaluepointer)*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../globals.md#jscontextpointer) |

___

###  QTS_NewContext

• **QTS_NewContext**: *function* = 
    this.module.cwrap("QTS_NewContext", "number", ["number"])

*Defined in [ffi.ts:109](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L109)*

#### Type declaration:

▸ (`rt`: [JSRuntimePointer](../globals.md#jsruntimepointer)): *[JSContextPointer](../globals.md#jscontextpointer)*

**Parameters:**

Name | Type |
------ | ------ |
`rt` | [JSRuntimePointer](../globals.md#jsruntimepointer) |

___

###  QTS_NewError

• **QTS_NewError**: *function* = 
    this.module.cwrap("QTS_NewError", "number", ["number"])

*Defined in [ffi.ts:79](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L79)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../globals.md#jscontextpointer)): *[JSValuePointer](../globals.md#jsvaluepointer)*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../globals.md#jscontextpointer) |

___

###  QTS_NewFloat64

• **QTS_NewFloat64**: *function* = 
    this.module.cwrap("QTS_NewFloat64", "number", ["number","number"])

*Defined in [ffi.ts:130](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L130)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../globals.md#jscontextpointer), `num`: number): *[JSValuePointer](../globals.md#jsvaluepointer)*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../globals.md#jscontextpointer) |
`num` | number |

___

###  QTS_NewFunction

• **QTS_NewFunction**: *function* = 
    this.module.cwrap("QTS_NewFunction", "number", ["number","number","string"])

*Defined in [ffi.ts:73](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L73)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../globals.md#jscontextpointer), `func_data`: [JSValuePointer](../globals.md#jsvaluepointer) | [JSValueConstPointer](../globals.md#jsvalueconstpointer), `name`: string): *[JSValuePointer](../globals.md#jsvaluepointer)*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../globals.md#jscontextpointer) |
`func_data` | [JSValuePointer](../globals.md#jsvaluepointer) &#124; [JSValueConstPointer](../globals.md#jsvalueconstpointer) |
`name` | string |

___

###  QTS_NewObject

• **QTS_NewObject**: *function* = 
    this.module.cwrap("QTS_NewObject", "number", ["number"])

*Defined in [ffi.ts:121](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L121)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../globals.md#jscontextpointer)): *[JSValuePointer](../globals.md#jsvaluepointer)*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../globals.md#jscontextpointer) |

___

###  QTS_NewObjectProto

• **QTS_NewObjectProto**: *function* = 
    this.module.cwrap("QTS_NewObjectProto", "number", ["number","number"])

*Defined in [ffi.ts:124](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L124)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../globals.md#jscontextpointer), `proto`: [JSValuePointer](../globals.md#jsvaluepointer) | [JSValueConstPointer](../globals.md#jsvalueconstpointer)): *[JSValuePointer](../globals.md#jsvaluepointer)*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../globals.md#jscontextpointer) |
`proto` | [JSValuePointer](../globals.md#jsvaluepointer) &#124; [JSValueConstPointer](../globals.md#jsvalueconstpointer) |

___

###  QTS_NewRuntime

• **QTS_NewRuntime**: *function* = 
    this.module.cwrap("QTS_NewRuntime", "number", [])

*Defined in [ffi.ts:103](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L103)*

#### Type declaration:

▸ (): *[JSRuntimePointer](../globals.md#jsruntimepointer)*

___

###  QTS_NewString

• **QTS_NewString**: *function* = 
    this.module.cwrap("QTS_NewString", "number", ["number","string"])

*Defined in [ffi.ts:136](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L136)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../globals.md#jscontextpointer), `string`: string): *[JSValuePointer](../globals.md#jsvaluepointer)*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../globals.md#jscontextpointer) |
`string` | string |

___

###  QTS_ResolveException

• **QTS_ResolveException**: *function* = 
    this.module.cwrap("QTS_ResolveException", "number", ["number","number"])

*Defined in [ffi.ts:160](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L160)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../globals.md#jscontextpointer), `maybe_exception`: [JSValuePointer](../globals.md#jsvaluepointer)): *[JSValuePointer](../globals.md#jsvaluepointer)*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../globals.md#jscontextpointer) |
`maybe_exception` | [JSValuePointer](../globals.md#jsvaluepointer) |

___

###  QTS_RuntimeDisableInterruptHandler

• **QTS_RuntimeDisableInterruptHandler**: *function* = 
    this.module.cwrap("QTS_RuntimeDisableInterruptHandler", null, ["number"])

*Defined in [ffi.ts:88](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L88)*

#### Type declaration:

▸ (`rt`: [JSRuntimePointer](../globals.md#jsruntimepointer)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`rt` | [JSRuntimePointer](../globals.md#jsruntimepointer) |

___

###  QTS_RuntimeEnableInterruptHandler

• **QTS_RuntimeEnableInterruptHandler**: *function* = 
    this.module.cwrap("QTS_RuntimeEnableInterruptHandler", null, ["number"])

*Defined in [ffi.ts:85](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L85)*

#### Type declaration:

▸ (`rt`: [JSRuntimePointer](../globals.md#jsruntimepointer)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`rt` | [JSRuntimePointer](../globals.md#jsruntimepointer) |

___

###  QTS_SetHostCallback

• **QTS_SetHostCallback**: *function* = 
    this.module.cwrap("QTS_SetHostCallback", null, ["number"])

*Defined in [ffi.ts:67](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L67)*

#### Type declaration:

▸ (`fp`: [QTS_C_To_HostCallbackFuncPointer](../globals.md#qts_c_to_hostcallbackfuncpointer)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`fp` | [QTS_C_To_HostCallbackFuncPointer](../globals.md#qts_c_to_hostcallbackfuncpointer) |

___

###  QTS_SetInterruptCallback

• **QTS_SetInterruptCallback**: *function* = 
    this.module.cwrap("QTS_SetInterruptCallback", null, ["number"])

*Defined in [ffi.ts:82](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L82)*

#### Type declaration:

▸ (`cb`: [QTS_C_To_HostInterruptFuncPointer](../globals.md#qts_c_to_hostinterruptfuncpointer)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`cb` | [QTS_C_To_HostInterruptFuncPointer](../globals.md#qts_c_to_hostinterruptfuncpointer) |

___

###  QTS_SetProp

• **QTS_SetProp**: *function* = 
    this.module.cwrap("QTS_SetProp", null, ["number","number","number","number"])

*Defined in [ffi.ts:151](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L151)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../globals.md#jscontextpointer), `this_val`: [JSValuePointer](../globals.md#jsvaluepointer) | [JSValueConstPointer](../globals.md#jsvalueconstpointer), `prop_name`: [JSValuePointer](../globals.md#jsvaluepointer) | [JSValueConstPointer](../globals.md#jsvalueconstpointer), `prop_value`: [JSValuePointer](../globals.md#jsvaluepointer) | [JSValueConstPointer](../globals.md#jsvalueconstpointer)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../globals.md#jscontextpointer) |
`this_val` | [JSValuePointer](../globals.md#jsvaluepointer) &#124; [JSValueConstPointer](../globals.md#jsvalueconstpointer) |
`prop_name` | [JSValuePointer](../globals.md#jsvaluepointer) &#124; [JSValueConstPointer](../globals.md#jsvalueconstpointer) |
`prop_value` | [JSValuePointer](../globals.md#jsvaluepointer) &#124; [JSValueConstPointer](../globals.md#jsvalueconstpointer) |

___

###  QTS_Throw

• **QTS_Throw**: *function* = 
    this.module.cwrap("QTS_Throw", "number", ["number","number"])

*Defined in [ffi.ts:76](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L76)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../globals.md#jscontextpointer), `error`: [JSValuePointer](../globals.md#jsvaluepointer) | [JSValueConstPointer](../globals.md#jsvalueconstpointer)): *[JSValuePointer](../globals.md#jsvaluepointer)*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../globals.md#jscontextpointer) |
`error` | [JSValuePointer](../globals.md#jsvaluepointer) &#124; [JSValueConstPointer](../globals.md#jsvalueconstpointer) |

___

###  QTS_Typeof

• **QTS_Typeof**: *function* = 
    this.module.cwrap("QTS_Typeof", "string", ["number","number"])

*Defined in [ffi.ts:169](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L169)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../globals.md#jscontextpointer), `value`: [JSValuePointer](../globals.md#jsvaluepointer) | [JSValueConstPointer](../globals.md#jsvalueconstpointer)): *string*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../globals.md#jscontextpointer) |
`value` | [JSValuePointer](../globals.md#jsvaluepointer) &#124; [JSValueConstPointer](../globals.md#jsvalueconstpointer) |
