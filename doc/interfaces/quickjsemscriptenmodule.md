[quickjs-emscripten](../README.md) › [Globals](../globals.md) › [QuickJSEmscriptenModule](quickjsemscriptenmodule.md)

# Interface: QuickJSEmscriptenModule

Typings for the featuers we use to interface with our Emscripten build of
QuickJS.

## Hierarchy

* **QuickJSEmscriptenModule**

## Index

### Properties

* [FAST_MEMORY](quickjsemscriptenmodule.md#fast_memory)
* [HEAP16](quickjsemscriptenmodule.md#heap16)
* [HEAP32](quickjsemscriptenmodule.md#heap32)
* [HEAP8](quickjsemscriptenmodule.md#heap8)
* [HEAPF32](quickjsemscriptenmodule.md#heapf32)
* [HEAPF64](quickjsemscriptenmodule.md#heapf64)
* [HEAPU16](quickjsemscriptenmodule.md#heapu16)
* [HEAPU32](quickjsemscriptenmodule.md#heapu32)
* [HEAPU8](quickjsemscriptenmodule.md#heapu8)
* [TOTAL_MEMORY](quickjsemscriptenmodule.md#total_memory)
* [TOTAL_STACK](quickjsemscriptenmodule.md#total_stack)

### Methods

* [_free](quickjsemscriptenmodule.md#_free)
* [_malloc](quickjsemscriptenmodule.md#_malloc)
* [addFunction](quickjsemscriptenmodule.md#addfunction)
* [cwrap](quickjsemscriptenmodule.md#cwrap)
* [removeFunction](quickjsemscriptenmodule.md#removefunction)

## Properties

###  FAST_MEMORY

• **FAST_MEMORY**: *number*

*Defined in [emscripten-types.ts:64](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L64)*

___

###  HEAP16

• **HEAP16**: *Int16Array*

*Defined in [emscripten-types.ts:54](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L54)*

___

###  HEAP32

• **HEAP32**: *Int32Array*

*Defined in [emscripten-types.ts:55](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L55)*

___

###  HEAP8

• **HEAP8**: *Int8Array*

*Defined in [emscripten-types.ts:53](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L53)*

___

###  HEAPF32

• **HEAPF32**: *Float32Array*

*Defined in [emscripten-types.ts:59](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L59)*

___

###  HEAPF64

• **HEAPF64**: *Float64Array*

*Defined in [emscripten-types.ts:60](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L60)*

___

###  HEAPU16

• **HEAPU16**: *Uint16Array*

*Defined in [emscripten-types.ts:57](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L57)*

___

###  HEAPU32

• **HEAPU32**: *Uint32Array*

*Defined in [emscripten-types.ts:58](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L58)*

___

###  HEAPU8

• **HEAPU8**: *Uint8Array*

*Defined in [emscripten-types.ts:56](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L56)*

___

###  TOTAL_MEMORY

• **TOTAL_MEMORY**: *number*

*Defined in [emscripten-types.ts:63](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L63)*

___

###  TOTAL_STACK

• **TOTAL_STACK**: *number*

*Defined in [emscripten-types.ts:62](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L62)*

## Methods

###  _free

▸ **_free**(`ptr`: number): *void*

*Defined in [emscripten-types.ts:44](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`ptr` | number |

**Returns:** *void*

___

###  _malloc

▸ **_malloc**(`size`: number): *number*

*Defined in [emscripten-types.ts:43](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L43)*

**Parameters:**

Name | Type |
------ | ------ |
`size` | number |

**Returns:** *number*

___

###  addFunction

▸ **addFunction**(`fn`: Function, `type`: string): *number*

*Defined in [emscripten-types.ts:41](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`fn` | Function |
`type` | string |

**Returns:** *number*

___

###  cwrap

▸ **cwrap**(`ident`: string, `returnType`: Emscripten.ValueType | null, `argTypes`: Emscripten.ValueType[], `opts?`: Emscripten.CCallOpts): *function*

*Defined in [emscripten-types.ts:45](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`ident` | string |
`returnType` | Emscripten.ValueType &#124; null |
`argTypes` | Emscripten.ValueType[] |
`opts?` | Emscripten.CCallOpts |

**Returns:** *function*

▸ (...`args`: any[]): *any*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

___

###  removeFunction

▸ **removeFunction**(`pointer`: number): *void*

*Defined in [emscripten-types.ts:42](https://github.com/justjake/quickjs-emscripten/blob/master/ts/emscripten-types.ts#L42)*

**Parameters:**

Name | Type |
------ | ------ |
`pointer` | number |

**Returns:** *void*
