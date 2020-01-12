[quickjs-emscripten - v0.1.0b](../README.md) › [Globals](../globals.md) › ["ffi"](../modules/_ffi_.md) › [QuickJSFFI](_ffi_.quickjsffi.md)

# Class: QuickJSFFI

Low-level FFI bindings to QuickJS's Emscripten module

## Hierarchy

* **QuickJSFFI**

## Index

### Constructors

* [constructor](_ffi_.quickjsffi.md#constructor)

### Properties

* [QTS_ArgvGetJSValueConstPointer](_ffi_.quickjsffi.md#qts_argvgetjsvalueconstpointer)
* [QTS_Call](_ffi_.quickjsffi.md#qts_call)
* [QTS_DefineProp](_ffi_.quickjsffi.md#qts_defineprop)
* [QTS_Dump](_ffi_.quickjsffi.md#qts_dump)
* [QTS_DupValue](_ffi_.quickjsffi.md#qts_dupvalue)
* [QTS_DupValuePointer](_ffi_.quickjsffi.md#qts_dupvaluepointer)
* [QTS_Eval](_ffi_.quickjsffi.md#qts_eval)
* [QTS_FreeContext](_ffi_.quickjsffi.md#qts_freecontext)
* [QTS_FreeRuntime](_ffi_.quickjsffi.md#qts_freeruntime)
* [QTS_FreeValuePointer](_ffi_.quickjsffi.md#qts_freevaluepointer)
* [QTS_GetFloat64](_ffi_.quickjsffi.md#qts_getfloat64)
* [QTS_GetGlobalObject](_ffi_.quickjsffi.md#qts_getglobalobject)
* [QTS_GetProp](_ffi_.quickjsffi.md#qts_getprop)
* [QTS_GetString](_ffi_.quickjsffi.md#qts_getstring)
* [QTS_GetUndefined](_ffi_.quickjsffi.md#qts_getundefined)
* [QTS_NewContext](_ffi_.quickjsffi.md#qts_newcontext)
* [QTS_NewError](_ffi_.quickjsffi.md#qts_newerror)
* [QTS_NewFloat64](_ffi_.quickjsffi.md#qts_newfloat64)
* [QTS_NewFunction](_ffi_.quickjsffi.md#qts_newfunction)
* [QTS_NewObject](_ffi_.quickjsffi.md#qts_newobject)
* [QTS_NewObjectProto](_ffi_.quickjsffi.md#qts_newobjectproto)
* [QTS_NewRuntime](_ffi_.quickjsffi.md#qts_newruntime)
* [QTS_NewString](_ffi_.quickjsffi.md#qts_newstring)
* [QTS_ResolveException](_ffi_.quickjsffi.md#qts_resolveexception)
* [QTS_SetHostCallback](_ffi_.quickjsffi.md#qts_sethostcallback)
* [QTS_SetProp](_ffi_.quickjsffi.md#qts_setprop)
* [QTS_Throw](_ffi_.quickjsffi.md#qts_throw)
* [QTS_Typeof](_ffi_.quickjsffi.md#qts_typeof)

## Constructors

###  constructor

\+ **new QuickJSFFI**(`module`: EmscriptenModule): *[QuickJSFFI](_ffi_.quickjsffi.md)*

*Defined in [ffi.ts:19](https://github.com/justjake/quickjs-emscripten/blob/aff5edf/ts/ffi.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`module` | EmscriptenModule |

**Returns:** *[QuickJSFFI](_ffi_.quickjsffi.md)*

## Properties

###  QTS_ArgvGetJSValueConstPointer

• **QTS_ArgvGetJSValueConstPointer**: *function* = 
    this.module.cwrap("QTS_ArgvGetJSValueConstPointer", "number", ["number","number"])

*Defined in [ffi.ts:25](https://github.com/justjake/quickjs-emscripten/blob/aff5edf/ts/ffi.ts#L25)*

#### Type declaration:

▸ (`argv`: [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) | [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer), `index`: number): *[JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer)*

**Parameters:**

Name | Type |
------ | ------ |
`argv` | [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) &#124; [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer) |
`index` | number |

___

###  QTS_Call

• **QTS_Call**: *function* = 
    this.module.cwrap("QTS_Call", "number", ["number","number","number","number","number"])

*Defined in [ffi.ts:85](https://github.com/justjake/quickjs-emscripten/blob/aff5edf/ts/ffi.ts#L85)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../modules/_ffi_.md#jscontextpointer), `func_obj`: [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) | [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer), `this_obj`: [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) | [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer), `argc`: number, `argv_ptrs`: [JSValueConstPointerPointer](../modules/_ffi_.md#jsvalueconstpointerpointer)): *[JSValuePointer](../modules/_ffi_.md#jsvaluepointer)*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../modules/_ffi_.md#jscontextpointer) |
`func_obj` | [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) &#124; [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer) |
`this_obj` | [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) &#124; [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer) |
`argc` | number |
`argv_ptrs` | [JSValueConstPointerPointer](../modules/_ffi_.md#jsvalueconstpointerpointer) |

___

###  QTS_DefineProp

• **QTS_DefineProp**: *function* = 
    this.module.cwrap("QTS_DefineProp", null, ["number","number","number","number","number","number","boolean","boolean","boolean"])

*Defined in [ffi.ts:82](https://github.com/justjake/quickjs-emscripten/blob/aff5edf/ts/ffi.ts#L82)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../modules/_ffi_.md#jscontextpointer), `this_val`: [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) | [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer), `prop_name`: [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) | [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer), `prop_value`: [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) | [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer), `get`: [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) | [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer), `set`: [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) | [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer), `configurable`: boolean, `enumerable`: boolean, `has_value`: boolean): *void*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../modules/_ffi_.md#jscontextpointer) |
`this_val` | [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) &#124; [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer) |
`prop_name` | [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) &#124; [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer) |
`prop_value` | [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) &#124; [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer) |
`get` | [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) &#124; [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer) |
`set` | [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) &#124; [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer) |
`configurable` | boolean |
`enumerable` | boolean |
`has_value` | boolean |

___

###  QTS_Dump

• **QTS_Dump**: *function* = 
    this.module.cwrap("QTS_Dump", "string", ["number","number"])

*Defined in [ffi.ts:91](https://github.com/justjake/quickjs-emscripten/blob/aff5edf/ts/ffi.ts#L91)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../modules/_ffi_.md#jscontextpointer), `obj`: [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) | [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer)): *string*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../modules/_ffi_.md#jscontextpointer) |
`obj` | [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) &#124; [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer) |

___

###  QTS_DupValue

• **QTS_DupValue**: *function* = 
    this.module.cwrap("QTS_DupValue", "number", ["number","number"])

*Defined in [ffi.ts:100](https://github.com/justjake/quickjs-emscripten/blob/aff5edf/ts/ffi.ts#L100)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../modules/_ffi_.md#jscontextpointer), `value_ptr`: [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) | [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer)): *[JSValuePointer](../modules/_ffi_.md#jsvaluepointer)*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../modules/_ffi_.md#jscontextpointer) |
`value_ptr` | [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) &#124; [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer) |

___

###  QTS_DupValuePointer

• **QTS_DupValuePointer**: *function* = 
    this.module.cwrap("QTS_DupValuePointer", "number", ["number","number"])

*Defined in [ffi.ts:55](https://github.com/justjake/quickjs-emscripten/blob/aff5edf/ts/ffi.ts#L55)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../modules/_ffi_.md#jscontextpointer), `val`: [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) | [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer)): *[JSValuePointer](../modules/_ffi_.md#jsvaluepointer)*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../modules/_ffi_.md#jscontextpointer) |
`val` | [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) &#124; [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer) |

___

###  QTS_Eval

• **QTS_Eval**: *function* = 
    this.module.cwrap("QTS_Eval", "number", ["number","string"])

*Defined in [ffi.ts:94](https://github.com/justjake/quickjs-emscripten/blob/aff5edf/ts/ffi.ts#L94)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../modules/_ffi_.md#jscontextpointer), `js_code`: string): *[JSValuePointer](../modules/_ffi_.md#jsvaluepointer)*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../modules/_ffi_.md#jscontextpointer) |
`js_code` | string |

___

###  QTS_FreeContext

• **QTS_FreeContext**: *function* = 
    this.module.cwrap("QTS_FreeContext", null, ["number"])

*Defined in [ffi.ts:49](https://github.com/justjake/quickjs-emscripten/blob/aff5edf/ts/ffi.ts#L49)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../modules/_ffi_.md#jscontextpointer)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../modules/_ffi_.md#jscontextpointer) |

___

###  QTS_FreeRuntime

• **QTS_FreeRuntime**: *function* = 
    this.module.cwrap("QTS_FreeRuntime", null, ["number"])

*Defined in [ffi.ts:43](https://github.com/justjake/quickjs-emscripten/blob/aff5edf/ts/ffi.ts#L43)*

#### Type declaration:

▸ (`rt`: [JSRuntimePointer](../modules/_ffi_.md#jsruntimepointer)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`rt` | [JSRuntimePointer](../modules/_ffi_.md#jsruntimepointer) |

___

###  QTS_FreeValuePointer

• **QTS_FreeValuePointer**: *function* = 
    this.module.cwrap("QTS_FreeValuePointer", null, ["number","number"])

*Defined in [ffi.ts:52](https://github.com/justjake/quickjs-emscripten/blob/aff5edf/ts/ffi.ts#L52)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../modules/_ffi_.md#jscontextpointer), `value`: [JSValuePointer](../modules/_ffi_.md#jsvaluepointer)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../modules/_ffi_.md#jscontextpointer) |
`value` | [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) |

___

###  QTS_GetFloat64

• **QTS_GetFloat64**: *function* = 
    this.module.cwrap("QTS_GetFloat64", "number", ["number","number"])

*Defined in [ffi.ts:67](https://github.com/justjake/quickjs-emscripten/blob/aff5edf/ts/ffi.ts#L67)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../modules/_ffi_.md#jscontextpointer), `value`: [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) | [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer)): *number*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../modules/_ffi_.md#jscontextpointer) |
`value` | [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) &#124; [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer) |

___

###  QTS_GetGlobalObject

• **QTS_GetGlobalObject**: *function* = 
    this.module.cwrap("QTS_GetGlobalObject", "number", ["number"])

*Defined in [ffi.ts:103](https://github.com/justjake/quickjs-emscripten/blob/aff5edf/ts/ffi.ts#L103)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../modules/_ffi_.md#jscontextpointer)): *[JSValuePointer](../modules/_ffi_.md#jsvaluepointer)*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../modules/_ffi_.md#jscontextpointer) |

___

###  QTS_GetProp

• **QTS_GetProp**: *function* = 
    this.module.cwrap("QTS_GetProp", "number", ["number","number","number"])

*Defined in [ffi.ts:76](https://github.com/justjake/quickjs-emscripten/blob/aff5edf/ts/ffi.ts#L76)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../modules/_ffi_.md#jscontextpointer), `this_val`: [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) | [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer), `prop_name`: [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) | [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer)): *[JSValuePointer](../modules/_ffi_.md#jsvaluepointer)*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../modules/_ffi_.md#jscontextpointer) |
`this_val` | [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) &#124; [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer) |
`prop_name` | [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) &#124; [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer) |

___

###  QTS_GetString

• **QTS_GetString**: *function* = 
    this.module.cwrap("QTS_GetString", "string", ["number","number"])

*Defined in [ffi.ts:73](https://github.com/justjake/quickjs-emscripten/blob/aff5edf/ts/ffi.ts#L73)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../modules/_ffi_.md#jscontextpointer), `value`: [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) | [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer)): *string*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../modules/_ffi_.md#jscontextpointer) |
`value` | [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) &#124; [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer) |

___

###  QTS_GetUndefined

• **QTS_GetUndefined**: *function* = 
    this.module.cwrap("QTS_GetUndefined", "number", [])

*Defined in [ffi.ts:37](https://github.com/justjake/quickjs-emscripten/blob/aff5edf/ts/ffi.ts#L37)*

#### Type declaration:

▸ (): *[JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer)*

___

###  QTS_NewContext

• **QTS_NewContext**: *function* = 
    this.module.cwrap("QTS_NewContext", "number", ["number"])

*Defined in [ffi.ts:46](https://github.com/justjake/quickjs-emscripten/blob/aff5edf/ts/ffi.ts#L46)*

#### Type declaration:

▸ (`rt`: [JSRuntimePointer](../modules/_ffi_.md#jsruntimepointer)): *[JSContextPointer](../modules/_ffi_.md#jscontextpointer)*

**Parameters:**

Name | Type |
------ | ------ |
`rt` | [JSRuntimePointer](../modules/_ffi_.md#jsruntimepointer) |

___

###  QTS_NewError

• **QTS_NewError**: *function* = 
    this.module.cwrap("QTS_NewError", "number", ["number"])

*Defined in [ffi.ts:34](https://github.com/justjake/quickjs-emscripten/blob/aff5edf/ts/ffi.ts#L34)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../modules/_ffi_.md#jscontextpointer)): *[JSValuePointer](../modules/_ffi_.md#jsvaluepointer)*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../modules/_ffi_.md#jscontextpointer) |

___

###  QTS_NewFloat64

• **QTS_NewFloat64**: *function* = 
    this.module.cwrap("QTS_NewFloat64", "number", ["number","number"])

*Defined in [ffi.ts:64](https://github.com/justjake/quickjs-emscripten/blob/aff5edf/ts/ffi.ts#L64)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../modules/_ffi_.md#jscontextpointer), `num`: number): *[JSValuePointer](../modules/_ffi_.md#jsvaluepointer)*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../modules/_ffi_.md#jscontextpointer) |
`num` | number |

___

###  QTS_NewFunction

• **QTS_NewFunction**: *function* = 
    this.module.cwrap("QTS_NewFunction", "number", ["number","number","string"])

*Defined in [ffi.ts:28](https://github.com/justjake/quickjs-emscripten/blob/aff5edf/ts/ffi.ts#L28)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../modules/_ffi_.md#jscontextpointer), `func_data`: [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) | [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer), `name`: string): *[JSValuePointer](../modules/_ffi_.md#jsvaluepointer)*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../modules/_ffi_.md#jscontextpointer) |
`func_data` | [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) &#124; [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer) |
`name` | string |

___

###  QTS_NewObject

• **QTS_NewObject**: *function* = 
    this.module.cwrap("QTS_NewObject", "number", ["number"])

*Defined in [ffi.ts:58](https://github.com/justjake/quickjs-emscripten/blob/aff5edf/ts/ffi.ts#L58)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../modules/_ffi_.md#jscontextpointer)): *[JSValuePointer](../modules/_ffi_.md#jsvaluepointer)*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../modules/_ffi_.md#jscontextpointer) |

___

###  QTS_NewObjectProto

• **QTS_NewObjectProto**: *function* = 
    this.module.cwrap("QTS_NewObjectProto", "number", ["number","number"])

*Defined in [ffi.ts:61](https://github.com/justjake/quickjs-emscripten/blob/aff5edf/ts/ffi.ts#L61)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../modules/_ffi_.md#jscontextpointer), `proto`: [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) | [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer)): *[JSValuePointer](../modules/_ffi_.md#jsvaluepointer)*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../modules/_ffi_.md#jscontextpointer) |
`proto` | [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) &#124; [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer) |

___

###  QTS_NewRuntime

• **QTS_NewRuntime**: *function* = 
    this.module.cwrap("QTS_NewRuntime", "number", [])

*Defined in [ffi.ts:40](https://github.com/justjake/quickjs-emscripten/blob/aff5edf/ts/ffi.ts#L40)*

#### Type declaration:

▸ (): *[JSRuntimePointer](../modules/_ffi_.md#jsruntimepointer)*

___

###  QTS_NewString

• **QTS_NewString**: *function* = 
    this.module.cwrap("QTS_NewString", "number", ["number","string"])

*Defined in [ffi.ts:70](https://github.com/justjake/quickjs-emscripten/blob/aff5edf/ts/ffi.ts#L70)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../modules/_ffi_.md#jscontextpointer), `string`: string): *[JSValuePointer](../modules/_ffi_.md#jsvaluepointer)*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../modules/_ffi_.md#jscontextpointer) |
`string` | string |

___

###  QTS_ResolveException

• **QTS_ResolveException**: *function* = 
    this.module.cwrap("QTS_ResolveException", "number", ["number","number"])

*Defined in [ffi.ts:88](https://github.com/justjake/quickjs-emscripten/blob/aff5edf/ts/ffi.ts#L88)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../modules/_ffi_.md#jscontextpointer), `maybe_exception`: [JSValuePointer](../modules/_ffi_.md#jsvaluepointer)): *[JSValuePointer](../modules/_ffi_.md#jsvaluepointer)*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../modules/_ffi_.md#jscontextpointer) |
`maybe_exception` | [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) |

___

###  QTS_SetHostCallback

• **QTS_SetHostCallback**: *function* = 
    this.module.cwrap("QTS_SetHostCallback", null, ["number"])

*Defined in [ffi.ts:22](https://github.com/justjake/quickjs-emscripten/blob/aff5edf/ts/ffi.ts#L22)*

#### Type declaration:

▸ (`fp`: [QTS_C_To_HostCallbackFuncPointer](../modules/_ffi_.md#qts_c_to_hostcallbackfuncpointer)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`fp` | [QTS_C_To_HostCallbackFuncPointer](../modules/_ffi_.md#qts_c_to_hostcallbackfuncpointer) |

___

###  QTS_SetProp

• **QTS_SetProp**: *function* = 
    this.module.cwrap("QTS_SetProp", null, ["number","number","number","number"])

*Defined in [ffi.ts:79](https://github.com/justjake/quickjs-emscripten/blob/aff5edf/ts/ffi.ts#L79)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../modules/_ffi_.md#jscontextpointer), `this_val`: [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) | [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer), `prop_name`: [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) | [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer), `prop_value`: [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) | [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../modules/_ffi_.md#jscontextpointer) |
`this_val` | [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) &#124; [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer) |
`prop_name` | [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) &#124; [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer) |
`prop_value` | [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) &#124; [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer) |

___

###  QTS_Throw

• **QTS_Throw**: *function* = 
    this.module.cwrap("QTS_Throw", "number", ["number","number"])

*Defined in [ffi.ts:31](https://github.com/justjake/quickjs-emscripten/blob/aff5edf/ts/ffi.ts#L31)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../modules/_ffi_.md#jscontextpointer), `error`: [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) | [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer)): *[JSValuePointer](../modules/_ffi_.md#jsvaluepointer)*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../modules/_ffi_.md#jscontextpointer) |
`error` | [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) &#124; [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer) |

___

###  QTS_Typeof

• **QTS_Typeof**: *function* = 
    this.module.cwrap("QTS_Typeof", "string", ["number","number"])

*Defined in [ffi.ts:97](https://github.com/justjake/quickjs-emscripten/blob/aff5edf/ts/ffi.ts#L97)*

#### Type declaration:

▸ (`ctx`: [JSContextPointer](../modules/_ffi_.md#jscontextpointer), `value`: [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) | [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer)): *string*

**Parameters:**

Name | Type |
------ | ------ |
`ctx` | [JSContextPointer](../modules/_ffi_.md#jscontextpointer) |
`value` | [JSValuePointer](../modules/_ffi_.md#jsvaluepointer) &#124; [JSValueConstPointer](../modules/_ffi_.md#jsvalueconstpointer) |
