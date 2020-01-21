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
* [QTS_FreeContext](quickjsffi.md#qts_freecontext)
* [QTS_FreeRuntime](quickjsffi.md#qts_freeruntime)
* [QTS_FreeValuePointer](quickjsffi.md#qts_freevaluepointer)
* [QTS_GetFloat64](quickjsffi.md#qts_getfloat64)
* [QTS_GetGlobalObject](quickjsffi.md#qts_getglobalobject)
* [QTS_GetProp](quickjsffi.md#qts_getprop)
* [QTS_GetString](quickjsffi.md#qts_getstring)
* [QTS_GetUndefined](quickjsffi.md#qts_getundefined)
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

\+ **new QuickJSFFI**(`module`: EmscriptenModule): *[QuickJSFFI](quickjsffi.md)*

*Defined in [ffi.ts:63](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L63)*

**Parameters:**

Name | Type |
------ | ------ |
`module` | EmscriptenModule |

**Returns:** *[QuickJSFFI](quickjsffi.md)*

## Properties

###  QTS_ArgvGetJSValueConstPointer

• **QTS_ArgvGetJSValueConstPointer**: *function* = 
    this.module.cwrap("QTS_ArgvGetJSValueConstPointer", "number", ["number","number"])

*Defined in [ffi.ts:69](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L69)*

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

*Defined in [ffi.ts:138](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L138)*

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

*Defined in [ffi.ts:135](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L135)*

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

*Defined in [ffi.ts:144](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L144)*

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

*Defined in [ffi.ts:153](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L153)*

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

*Defined in [ffi.ts:108](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L108)*

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

*Defined in [ffi.ts:147](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L147)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../globals.md#jscontextpointer), `js_code`: string): *[JSValuePointer](../globals.md#jsvaluepointer)*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../globals.md#jscontextpointer) |
`js_code` | string |

___

###  QTS_FreeContext

• **QTS_FreeContext**: *function* = 
    this.module.cwrap("QTS_FreeContext", null, ["number"])

*Defined in [ffi.ts:102](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L102)*

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

*Defined in [ffi.ts:96](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L96)*

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

*Defined in [ffi.ts:105](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L105)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../globals.md#jscontextpointer), `value`: [JSValuePointer](../globals.md#jsvaluepointer)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../globals.md#jscontextpointer) |
`value` | [JSValuePointer](../globals.md#jsvaluepointer) |

___

###  QTS_GetFloat64

• **QTS_GetFloat64**: *function* = 
    this.module.cwrap("QTS_GetFloat64", "number", ["number","number"])

*Defined in [ffi.ts:120](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L120)*

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

*Defined in [ffi.ts:156](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L156)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../globals.md#jscontextpointer)): *[JSValuePointer](../globals.md#jsvaluepointer)*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../globals.md#jscontextpointer) |

___

###  QTS_GetProp

• **QTS_GetProp**: *function* = 
    this.module.cwrap("QTS_GetProp", "number", ["number","number","number"])

*Defined in [ffi.ts:129](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L129)*

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

*Defined in [ffi.ts:126](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L126)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../globals.md#jscontextpointer), `value`: [JSValuePointer](../globals.md#jsvaluepointer) | [JSValueConstPointer](../globals.md#jsvalueconstpointer)): *string*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../globals.md#jscontextpointer) |
`value` | [JSValuePointer](../globals.md#jsvaluepointer) &#124; [JSValueConstPointer](../globals.md#jsvalueconstpointer) |

___

###  QTS_GetUndefined

• **QTS_GetUndefined**: *function* = 
    this.module.cwrap("QTS_GetUndefined", "number", [])

*Defined in [ffi.ts:90](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L90)*

#### Type declaration:

▸ (): *[JSValueConstPointer](../globals.md#jsvalueconstpointer)*

___

###  QTS_NewContext

• **QTS_NewContext**: *function* = 
    this.module.cwrap("QTS_NewContext", "number", ["number"])

*Defined in [ffi.ts:99](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L99)*

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

*Defined in [ffi.ts:78](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L78)*

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

*Defined in [ffi.ts:117](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L117)*

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

*Defined in [ffi.ts:72](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L72)*

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

*Defined in [ffi.ts:111](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L111)*

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

*Defined in [ffi.ts:114](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L114)*

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

*Defined in [ffi.ts:93](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L93)*

#### Type declaration:

▸ (): *[JSRuntimePointer](../globals.md#jsruntimepointer)*

___

###  QTS_NewString

• **QTS_NewString**: *function* = 
    this.module.cwrap("QTS_NewString", "number", ["number","string"])

*Defined in [ffi.ts:123](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L123)*

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

*Defined in [ffi.ts:141](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L141)*

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

*Defined in [ffi.ts:87](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L87)*

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

*Defined in [ffi.ts:84](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L84)*

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

*Defined in [ffi.ts:66](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L66)*

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

*Defined in [ffi.ts:81](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L81)*

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

*Defined in [ffi.ts:132](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L132)*

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

*Defined in [ffi.ts:75](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L75)*

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

*Defined in [ffi.ts:150](https://github.com/justjake/quickjs-emscripten/blob/master/ts/ffi.ts#L150)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../globals.md#jscontextpointer), `value`: [JSValuePointer](../globals.md#jsvaluepointer) | [JSValueConstPointer](../globals.md#jsvalueconstpointer)): *string*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../globals.md#jscontextpointer) |
`value` | [JSValuePointer](../globals.md#jsvaluepointer) &#124; [JSValueConstPointer](../globals.md#jsvalueconstpointer) |
