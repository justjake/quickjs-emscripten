/**
 * Interface definition language for a command type in our command buffer
 * protocol.
 *
 * All commands are exactly 16 bytes long.
 * Assumes wasm32 (32-bit pointers).
 */
export type CommandDef = {
  doc: string

  /** byte 0: uint8_t opcode (implicit) */
  opcode?: never
  /** byte 1: typically result slot or object slot */
  slot_a?: ParamDef<UInt8Types>
  /** byte 2: typically source/value slot, or flags */
  slot_b?: ParamDef<UInt8Types>
  /** byte 3: additional slot, or small value */
  slot_c?: ParamDef<UInt8Types>
  /** byte 4-15: 12 bytes of data */
  data?: CommandDataDef
}

export type ParamPath =
  | "slot_a"
  | "slot_b"
  | "slot_c"
  | "data.d1"
  | "data.d2"
  | "data.d3"
  | "data.value"
  | "data.ptr"
  | "data.len"
  | "data.extra"
  | "data.byte00"
  | "data.byte01"
  | "data.byte02"
  | "data.byte03"
  | "data.byte04"
  | "data.byte05"
  | "data.byte06"
  | "data.byte07"
  | "data.byte08"
  | "data.byte09"
  | "data.byte10"
  | "data.byte11"

/** Non-scalar pointer types. */
type ArrayPointerTypes = "uint8_t*" | "char*"

/**
 * Type aliases for uint8_t; any type that fits in 8 bits.
 * These strings are the *c* types.
 * The TypeScript types are defined in ffi-types.ts
 *
 * Add more types as needed.
 */
type UInt8Types =
  | "uint8_t"
  | SlotType
  | "JSPropFlags"
  | "SetPropFlags"
  | "EvalFlags"
  | "NewErrorFlags"
  | "NewTypedArrayFlags"
  | "SlotType"

/**
 * Type aliases for uint32_t; any type that fits in 32 bits.
 * Includes pointer types since wasm32 pointers are 32-bit.
 * These strings are the *c* types.
 * The TypeScript types are defined in ffi-types.ts
 *
 * Add more types as needed.
 */
type UInt32Types =
  | "uint32_t"
  | "int32_t"
  | ArrayPointerTypes
  | "HostRefId"
  | "JSCFunctionType*"
  | "JSPropFlags"
  | "SetPropFlags"
  | "JSValue*"
  | "void*"

/**
 * Extra details for non-scalar pointer parameters.
 * In general, we should pass {ptr, len} pairs where possible.
 * All char* must be null-terminated regardless of presence of lenParam.
 */
export type ArrayPointerDef =
  /**
   * string ->char* passed with no length and terminated by null byte
   * It is an error if the input string contains a null byte.
   */
  | { kind: "utf8.nullTerminated"; lenParam?: undefined }
  /** string -> char*, len pair. Can contain null bytes. */
  | { kind: "utf8"; lenParam: ParamPath }
  /** string -> char*, maybe_len pair. If it contains a null byte, maybe_len must be set. */
  | { kind: "utf8.optionalLength"; lenParam: ParamPath }
  /** ArrayBuffer-like -> uint8_t*, len pair. Can contain null bytes. */
  | { kind: "bytes"; lenParam: ParamPath }

/**
 * Whether the parameter is an input, output, or both.
 * Eg, if the parameter is a pointer or slot:
 * - use 'in' if the command reads from the pointer or slot
 * - use 'in-consumed' if the command implicitly consumes/frees the parameter.
 *   The command executor must take this into account: consumed parameters
 *   cannot be used again, and should not be double-freed.
 * - use 'out' if the command writes a new value to the pointer/slot.
 *   The command executor must take this into account: any new values that are
 *   not returned to the caller must be freed.
 */
export type ParamUsage = "in" | "in-consumed" | "out"

/** Describes a scalar parameter in a command. */
export type ParamDef<T extends string = string> = {
  /** Parameter name. */
  name: string
  /** Parameter c type. */
  type: T
  /** Documenatation. */
  doc: string
  /** See {@link ParamUsage}. */
  usage: ParamUsage
} & (T extends ArrayPointerTypes ? { pointer: ArrayPointerDef } : { pointer?: never })

type CommandDataRawDef = {
  type: "raw"
  d1: ParamDef<UInt32Types>
  d2?: ParamDef<UInt32Types>
  d3?: ParamDef<UInt32Types>
}

type CommandDataF64Def = {
  type: "f64"
  value: ParamDef<"double">
  extra?: ParamDef<UInt32Types>
}

type CommandDataI64Def = {
  type: "i64"
  value: ParamDef<"int64_t">
  extra?: ParamDef<UInt32Types>
}

type CommandDataBufDef = {
  type: "buf"
  ptr: ParamDef<"uint8_t*" | "char*">
  len: ParamDef<"uint32_t">
  extra?: ParamDef<UInt32Types>
}

type CommandDataByteDef = {
  type: "bytes"

  // d1
  byte00?: ParamDef<UInt8Types>
  byte01?: ParamDef<UInt8Types>
  byte02?: ParamDef<UInt8Types>
  byte03?: ParamDef<UInt8Types>

  // d2
  byte04?: ParamDef<UInt8Types>
  byte05?: ParamDef<UInt8Types>
  byte06?: ParamDef<UInt8Types>
  byte07?: ParamDef<UInt8Types>

  // d3
  byte08?: ParamDef<UInt8Types>
  byte09?: ParamDef<UInt8Types>
  byte10?: ParamDef<UInt8Types>
  byte11?: ParamDef<UInt8Types>
}

type CommandDataUnion = {
  raw: CommandDataRawDef
  f64: CommandDataF64Def
  i64: CommandDataI64Def
  buf: CommandDataBufDef
  bytes: CommandDataByteDef
}

/**
 * 12 bytes of data.
 *
 * New CommandDataXxxDef variants may be added after a design discussion.
 */
export type CommandDataDef = CommandDataUnion[keyof CommandDataUnion]

// Commonly used params
const RESULT_JSVALUE_SLOT = {
  doc: "result will be written to this slot",
  name: "result_slot",
  type: "JSValueSlot",
  usage: "out",
} as const satisfies ParamDef<"JSValueSlot">

const SOURCE_JSVALUE_SLOT = {
  doc: "source value will be read from this slot",
  name: "source_slot",
  type: "JSValueSlot",
  usage: "in",
} as const satisfies ParamDef<"JSValueSlot">

const KEY_JSVALUE_SLOT = {
  doc: "slot containing property key",
  name: "key_slot",
  type: "JSValueSlot",
  usage: "in",
} as const satisfies ParamDef<"JSValueSlot">

const VALUE_JSVALUE_SLOT = {
  doc: "slot containing value",
  name: "value_slot",
  type: "JSValueSlot",
  usage: "in",
} as const satisfies ParamDef<"JSValueSlot">

const TARGET_JSVALUE_SLOT = {
  doc: "Target object to modify",
  name: "target_slot",
  type: "JSValueSlot",
  usage: "in",
} as const satisfies ParamDef<"JSValueSlot">

const TARGET_FUNCLIST_SLOT = {
  doc: "Target funclist to modify",
  name: "target_funclist_slot",
  type: "FuncListSlot",
  usage: "in",
} as const satisfies ParamDef<"FuncListSlot">

const TARGET_FUNCLIST_INDEX = {
  doc: "Index to set in the target funclist (uint32_t)",
  name: "index",
  type: "uint32_t",
  usage: "in",
} as const satisfies ParamDef<"uint32_t">

const TARGET_FUNCLIST_INDEX_SLOT = {
  doc: "Index to set in the target funclist (0-255 / uint8_t)",
  name: "index",
  type: "uint8_t",
  usage: "in",
} as const satisfies ParamDef<"uint8_t">

const C_FUNC_PTR = {
  doc: "Pointer to C function implementing one of JSFunctionType (*not* a HostRef, this is a raw function pointer)",
  name: "c_func_ptr",
  type: "JSCFunctionType*",
  usage: "in",
} as const satisfies ParamDef<"JSCFunctionType*">

const PROP_FLAGS = {
  doc: "JS_PROP_* property flags",
  name: "flags",
  type: "JSPropFlags",
  usage: "in",
} as const satisfies ParamDef<"JSPropFlags">

const SET_PROP_FLAGS = {
  doc: "SetPropFlags: property flags controlling set vs define behavior",
  name: "flags",
  type: "SetPropFlags",
  usage: "in",
} as const satisfies ParamDef<"SetPropFlags">

const BOOL_VAL_SLOT = {
  doc: "Boolean value (0 or 1)",
  name: "bool_val",
  type: "uint8_t",
  usage: "in",
} as const satisfies ParamDef<"uint8_t">

const FUNC_ARITY_SLOT = {
  doc: "Function.length (arity)",
  name: "arity",
  type: "uint8_t",
  usage: "in",
} as const satisfies ParamDef<"uint8_t">

const PROP_KEY_PTR = {
  name: "key_ptr",
  type: "char*",
  doc: "Property name/key string; must be null-terminated if maybe_name_len is not set",
  usage: "in",
  pointer: { kind: "utf8.optionalLength", lenParam: "slot_b" },
} as const satisfies ParamDef<"char*">

const PROP_KEY_PTR_NULL_TERMINATED = {
  ...PROP_KEY_PTR,
  pointer: { kind: "utf8.nullTerminated" },
} as const satisfies ParamDef<"char*">

const PROP_MAYBE_NAME_LEN_SLOT = {
  doc: `if >0, length of ${PROP_KEY_PTR.name}. if 0, ${PROP_KEY_PTR.name} is null-terminated`,
  name: "maybe_key_len",
  type: "uint8_t",
  usage: "in",
} as const satisfies ParamDef<"uint8_t">

const PROP_KEY_DATA = {
  type: "buf",
  ptr: {
    ...PROP_KEY_PTR,
    pointer: { kind: "utf8", lenParam: "data.len" },
  },
  len: { name: "key_len", type: "uint32_t", doc: "Property name/key length", usage: "in" },
} as const satisfies CommandDataBufDef

const ARRAY_INDEX = {
  name: "index",
  type: "uint32_t",
  doc: "Array index",
  usage: "in",
} as const satisfies ParamDef<"uint32_t">

const ARRAY_INDEX_DATA = {
  type: "raw",
  d1: ARRAY_INDEX,
} as const satisfies CommandDataRawDef

const callArg = (idx: number) => {
  return {
    name: `arg${idx}`,
    type: "JSValueSlot",
    doc: `Argument ${idx}`,
    usage: "in",
  } as const satisfies ParamDef<"JSValueSlot">
}

export type SlotType = "JSValueSlot" | "FuncListSlot" | "AnySlot"
export type SlotDef = {
  itemType: string
  itemBytes: number
  free?: keyof typeof COMMANDS
}

export const REGISTER_BANKS = {
  /**
   * Most common slot type, for passing JSValues.
   */
  JSValueSlot: {
    itemType: "JSValue",
    itemBytes: 16,
  },
  /**
   * Used when defining classes.
   * struct QTS_FuncList { uint32_t count; JSCFunctionListEntry *entries; }
   */
  FuncListSlot: {
    itemType: "QTS_FuncList",
    itemBytes: 8,
  },
  // /** Used to return additional values from a command, not expected to be used as command inputs */
  // OutSlot: {
  //   itemType: "uint32_t",
  //   itemBytes: 4,
  // },
} as const satisfies Record<Exclude<SlotType, "AnySlot">, SlotDef>

export const COMMANDS = {
  // ============================================================================
  // Protocol operations
  // ============================================================================

  /** Opcode 0: detect uninitialized commands (mallocz zeros memory) */
  INVALID: {
    doc: "Invalid opcode - indicates uninitialized command",
  },

  // These operations are generic to simplify command planning
  SLOT_STORE: {
    doc: "Copy slot memory contents to a memory location owned by the caller",
    slot_a: {
      name: "in_slot",
      doc: "The slot to save",
      type: "AnySlot",
      usage: "in",
    },
    slot_b: {
      name: "in_slot_type",
      type: "SlotType",
      doc: "The type of the slot",
      usage: "in",
    },
    data: {
      type: "raw",
      d1: {
        name: "out_ptr",
        doc: "Pointer to the memory location to copy the slot memory contents to",
        type: "void*",
        usage: "out",
      },
    },
  },

  SLOT_LOAD: {
    doc: "Copy data from a memory location into a slot",
    slot_a: {
      name: "out_slot",
      doc: "The slot load into",
      type: "AnySlot",
      usage: "out",
    },
    slot_b: {
      name: "out_slot_type",
      type: "SlotType",
      doc: "The type of the slot",
      usage: "in",
    },
    data: {
      type: "raw",
      d1: {
        name: "in_ptr",
        doc: "Pointer to the memory location to copy the slot memory contents from",
        type: "void*",
        usage: "in",
      },
    },
  },

  SLOT_FREE: {
    doc: "Free a slot: for JSValueSlot, call JS_FreeValue to decrement refcount; for FuncListSlot, free the array of JSCFunctionListEntry",
    slot_a: {
      name: "target_slot",
      type: "AnySlot",
      doc: "The slot to free",
      usage: "in-consumed",
    },
    slot_b: {
      name: "target_slot_type",
      type: "SlotType",
      doc: "The type of the slot",
      usage: "in",
    },
  },

  // ============================================================================
  // Container Creation
  // ============================================================================

  NEW_OBJECT: {
    doc: "Create a new empty object (JS_NewObject)",
    slot_a: RESULT_JSVALUE_SLOT,
  },

  NEW_OBJECT_PROTO: {
    doc: "Create a new object with prototype (JS_NewObjectProto)",
    slot_a: RESULT_JSVALUE_SLOT,
    slot_b: { name: "proto_slot", type: "JSValueSlot", doc: "Prototype object slot", usage: "in" },
  },

  NEW_ARRAY: {
    doc: "Create a new empty array (JS_NewArray)",
    slot_a: RESULT_JSVALUE_SLOT,
  },

  NEW_MAP: {
    doc: "Create a new empty Map (new Map())",
    slot_a: RESULT_JSVALUE_SLOT,
  },

  NEW_SET: {
    doc: "Create a new empty Set (new Set())",
    slot_a: RESULT_JSVALUE_SLOT,
  },

  // ============================================================================
  // Special Type Creation
  // ============================================================================

  NEW_DATE: {
    doc: "Create a Date object from timestamp (JS_NewDate)",
    slot_a: RESULT_JSVALUE_SLOT,
    data: {
      type: "f64",
      value: {
        name: "timestamp",
        type: "double",
        doc: "Unix timestamp in milliseconds, eg from Date.now()",
        usage: "in",
      },
    },
  },

  NEW_ERROR: {
    doc: "Create an Error object (JS_NewError or JS_New*Error)",
    slot_a: RESULT_JSVALUE_SLOT,
    slot_b: {
      name: "maybe_name_len",
      type: "uint8_t",
      doc: "If >0, length of error_name_ptr. if 0, error_name_ptr is null-terminated or not set",
      usage: "in",
    },
    slot_c: {
      name: "new_error_flags",
      type: "NewErrorFlags",
      doc: "Flags used when creating the error; specifies the error type",
      usage: "in",
    },
    data: {
      type: "buf",
      ptr: {
        name: "message_ptr",
        type: "char*",
        doc: "Pointer to error message",
        usage: "in",
        pointer: { kind: "utf8", lenParam: "data.len" },
      },
      len: { name: "message_len", type: "uint32_t", doc: "Length of error message", usage: "in" },
      extra: {
        name: "name_ptr",
        type: "char*",
        doc: "Optional. If given, override `error.name = NAME`. Otherwise use default name for given flags",
        usage: "in",
        pointer: { kind: "utf8.optionalLength", lenParam: "slot_b" },
      },
    },
  },

  NEW_ARRAYBUFFER: {
    doc: "Create an ArrayBuffer by copying data (JS_NewArrayBufferCopy)",
    slot_a: RESULT_JSVALUE_SLOT,
    // TODO: copy vs alias input buffer
    slot_c: {
      name: "class_is_shared_array_buffer",
      type: "uint8_t",
      doc: "1 if the ArrayBuffer is a SharedArrayBuffer",
      usage: "in",
    },
    data: {
      type: "buf",
      ptr: {
        name: "data_ptr",
        type: "uint8_t*",
        doc: "Pointer to source data",
        usage: "in",
        pointer: { kind: "bytes", lenParam: "data.len" },
      },
      len: { name: "data_len", type: "uint32_t", doc: "Length of data in bytes", usage: "in" },
    },
  },

  NEW_TYPED_ARRAY: {
    doc: "Create a TypedArray view (JS_NewTypedArray)",
    slot_a: RESULT_JSVALUE_SLOT,
    slot_b: SOURCE_JSVALUE_SLOT,
    slot_c: {
      name: "array_type",
      type: "NewTypedArrayFlags",
      doc: "TypedArray type enum",
      usage: "in",
    },
    data: {
      type: "raw",
      d1: {
        name: "source_offset",
        type: "uint32_t",
        doc: "Byte offset into source array buffer",
        usage: "in",
      },
      d2: { name: "length", type: "uint32_t", doc: "Number of elements", usage: "in" },
    },
  },

  NEW_SYMBOL: {
    doc: "Create a Symbol (JS_NewSymbol or global symbol)",
    slot_a: RESULT_JSVALUE_SLOT,
    slot_b: {
      name: "is_global",
      type: "uint8_t",
      doc: "1 for global symbol, 0 for local",
      usage: "in",
    },
    data: {
      type: "buf",
      ptr: {
        name: "desc_ptr",
        type: "char*",
        doc: "Pointer to description string",
        usage: "in",
        pointer: { kind: "utf8", lenParam: "data.len" },
      },
      len: { name: "desc_len", type: "uint32_t", doc: "Length of description", usage: "in" },
    },
  },

  // ============================================================================
  // Value Creation
  // ============================================================================

  NEW_FLOAT64: {
    doc: "Create a float64 number value (JS_NewFloat64)",
    slot_a: RESULT_JSVALUE_SLOT,
    data: {
      type: "f64",
      value: { name: "value", type: "double", doc: "The float64 value", usage: "in" },
    },
  },

  NEW_STRING: {
    doc: "Create a string value (JS_NewStringLen)",
    slot_a: RESULT_JSVALUE_SLOT,
    data: {
      type: "buf",
      ptr: {
        name: "str_ptr",
        type: "char*",
        doc: "Pointer to string data",
        usage: "in",
        pointer: { kind: "utf8", lenParam: "data.len" },
      },
      len: { name: "str_len", type: "uint32_t", doc: "Length of string in bytes", usage: "in" },
    },
  },

  NEW_BIGINT_INT64: {
    doc: "Create a BigInt value from i64 (JS_NewBigInt64)",
    slot_a: RESULT_JSVALUE_SLOT,
    data: {
      type: "i64",
      value: { name: "value", type: "int64_t", doc: "The int64 value", usage: "in" },
    },
  },

  NEW_BIGINT_STR: {
    doc: "Create a BigInt value from a decimal string",
    slot_a: RESULT_JSVALUE_SLOT,
    data: {
      type: "buf",
      ptr: {
        name: "str_ptr",
        type: "char*",
        doc: "Pointer to decimal string data",
        usage: "in",
        pointer: { kind: "utf8", lenParam: "data.len" },
      },
      len: { name: "str_len", type: "uint32_t", doc: "Length of string in bytes", usage: "in" },
    },
  },

  NEW_FUNC: {
    doc: "Create a host function (QTS_NewFunction)",
    slot_a: {
      name: "result_slot",
      type: "JSValueSlot",
      doc: "Slot to store the function",
      usage: "out",
    },
    slot_b: FUNC_ARITY_SLOT,
    slot_c: {
      name: "is_constructor",
      type: "uint8_t",
      doc: "1 if callable as constructor",
      usage: "in",
    },
    data: {
      type: "buf",
      ptr: {
        name: "name_ptr",
        type: "char*",
        doc: "Pointer to function name",
        usage: "in",
        pointer: { kind: "utf8", lenParam: "data.len" },
      },
      len: { name: "name_len", type: "uint32_t", doc: "Length of function name", usage: "in" },
      extra: {
        name: "host_ref_id",
        type: "HostRefId",
        doc: "Host reference ID for callback",
        usage: "in",
      },
    },
  },

  // ============================================================================
  // Property Set by String Key
  // ============================================================================

  SET_STR_VALUE: {
    doc: "Set property by string key to JSValue from slot (JS_SetPropertyStr)",
    slot_a: TARGET_JSVALUE_SLOT,
    slot_b: VALUE_JSVALUE_SLOT,
    slot_c: SET_PROP_FLAGS,
    data: PROP_KEY_DATA,
  },

  SET_STR_NULL: {
    doc: "Set property by string key to null",
    slot_a: TARGET_JSVALUE_SLOT,
    slot_c: SET_PROP_FLAGS,
    data: PROP_KEY_DATA,
  },

  SET_STR_UNDEF: {
    doc: "Set property by string key to undefined",
    slot_a: TARGET_JSVALUE_SLOT,
    slot_c: SET_PROP_FLAGS,
    data: PROP_KEY_DATA,
  },

  SET_STR_BOOL: {
    doc: "Set property by string key to boolean",
    slot_a: TARGET_JSVALUE_SLOT,
    slot_b: BOOL_VAL_SLOT,
    slot_c: SET_PROP_FLAGS,
    data: PROP_KEY_DATA,
  },

  SET_STR_INT32: {
    doc: "Set property by string key to int32",
    slot_a: TARGET_JSVALUE_SLOT,
    slot_c: SET_PROP_FLAGS,
    data: {
      ...PROP_KEY_DATA,
      extra: { name: "int_val", type: "int32_t", doc: "The int32 value", usage: "in" },
    },
  },

  SET_STR_F64: {
    doc: "Set property by string key to float64",
    slot_a: TARGET_JSVALUE_SLOT,
    slot_b: PROP_MAYBE_NAME_LEN_SLOT,
    slot_c: SET_PROP_FLAGS,
    data: {
      type: "f64",
      value: { name: "f64_val", type: "double", doc: "The float64 value", usage: "in" },
      extra: PROP_KEY_PTR,
    },
  },

  SET_STR_BIGINT: {
    doc: "Set property by string key to BigInt",
    slot_a: TARGET_JSVALUE_SLOT,
    slot_b: PROP_MAYBE_NAME_LEN_SLOT,
    slot_c: SET_PROP_FLAGS,
    data: {
      type: "i64",
      value: { name: "i64_val", type: "int64_t", doc: "The int64 value", usage: "in" },
      extra: PROP_KEY_PTR,
    },
  },

  SET_STR_STRING: {
    doc: "Set property by string key to string value",
    slot_a: { name: "target_slot", type: "JSValueSlot", doc: "Object slot", usage: "in" },
    slot_b: PROP_MAYBE_NAME_LEN_SLOT,
    slot_c: SET_PROP_FLAGS,
    data: {
      type: "buf",
      ptr: {
        name: "str_ptr",
        type: "char*",
        doc: "String value pointer",
        usage: "in",
        pointer: { kind: "utf8", lenParam: "data.len" },
      },
      len: { name: "str_len", type: "uint32_t", doc: "String value length", usage: "in" },
      extra: {
        ...PROP_KEY_PTR,
        pointer: { kind: "utf8.optionalLength", lenParam: "slot_b" },
      },
    },
  },

  // ============================================================================
  // Property Set by Index
  // ============================================================================

  SET_IDX_VALUE: {
    doc: "Set array element by index to JSValue from slot (JS_SetPropertyUint32)",
    slot_a: TARGET_JSVALUE_SLOT,
    slot_b: VALUE_JSVALUE_SLOT,
    slot_c: SET_PROP_FLAGS,
    data: ARRAY_INDEX_DATA,
  },

  SET_IDX_NULL: {
    doc: "Set array element by index to null",
    slot_a: TARGET_JSVALUE_SLOT,
    slot_c: SET_PROP_FLAGS,
    data: ARRAY_INDEX_DATA,
  },

  SET_IDX_UNDEF: {
    doc: "Set array element by index to undefined",
    slot_a: TARGET_JSVALUE_SLOT,
    slot_c: SET_PROP_FLAGS,
    data: ARRAY_INDEX_DATA,
  },

  SET_IDX_BOOL: {
    doc: "Set array element by index to boolean",
    slot_a: TARGET_JSVALUE_SLOT,
    slot_b: BOOL_VAL_SLOT,
    slot_c: SET_PROP_FLAGS,
    data: ARRAY_INDEX_DATA,
  },

  SET_IDX_INT32: {
    doc: "Set array element by index to int32",
    slot_a: TARGET_JSVALUE_SLOT,
    slot_c: SET_PROP_FLAGS,
    data: {
      ...ARRAY_INDEX_DATA,
      d2: { name: "int_val", type: "int32_t", doc: "The int32 value", usage: "in" },
    },
  },

  SET_IDX_F64: {
    doc: "Set array element by index to float64",
    slot_a: TARGET_JSVALUE_SLOT,
    slot_c: SET_PROP_FLAGS,
    data: {
      type: "f64",
      value: { name: "f64_val", type: "double", doc: "The float64 value", usage: "in" },
      extra: ARRAY_INDEX,
    },
  },

  SET_IDX_BIGINT: {
    doc: "Set array element by index to BigInt",
    slot_a: TARGET_JSVALUE_SLOT,
    slot_c: SET_PROP_FLAGS,
    data: {
      type: "i64",
      value: { name: "i64_val", type: "int64_t", doc: "The int64 value", usage: "in" },
      extra: ARRAY_INDEX,
    },
  },

  SET_IDX_STRING: {
    doc: "Set array element by index to string",
    slot_a: TARGET_JSVALUE_SLOT,
    slot_c: SET_PROP_FLAGS,
    data: {
      type: "buf",
      ptr: {
        name: "str_ptr",
        type: "char*",
        doc: "String value pointer",
        usage: "in",
        pointer: { kind: "utf8", lenParam: "data.len" },
      },
      len: { name: "str_len", type: "uint32_t", doc: "String value length", usage: "in" },
      extra: ARRAY_INDEX,
    },
  },

  // ============================================================================
  // Property Set by JSValue Key
  // ============================================================================

  SET_VALUE_VALUE: {
    doc: "Set property using JSValue key (JS_SetProperty)",
    slot_a: TARGET_JSVALUE_SLOT,
    slot_b: KEY_JSVALUE_SLOT,
    slot_c: VALUE_JSVALUE_SLOT,
    data: {
      type: "raw",
      d1: {
        doc: "SetPropFlags: property flags controlling set vs define behavior",
        name: "flags",
        type: "SetPropFlags",
        usage: "in",
      },
    },
  },

  DEF_VALUE_GETSET: {
    doc: "define a getter/setter property on object",
    slot_a: TARGET_JSVALUE_SLOT,
    slot_b: PROP_MAYBE_NAME_LEN_SLOT,
    slot_c: PROP_FLAGS,
    data: {
      type: "raw",
      d1: {
        name: "getter_ref",
        type: "HostRefId",
        doc: "Host reference ID for getter (0 = none)",
        usage: "in",
      },
      d2: {
        name: "setter_ref",
        type: "HostRefId",
        doc: "Host reference ID for setter (0 = none)",
        usage: "in",
      },
      d3: PROP_KEY_PTR,
    },
  },

  // ============================================================================
  // Property Get
  // ============================================================================

  GET_VALUE: {
    doc: "Get property using JSValue key (JS_GetProperty)",
    slot_a: RESULT_JSVALUE_SLOT,
    slot_b: SOURCE_JSVALUE_SLOT,
    slot_c: KEY_JSVALUE_SLOT,
  },

  GET_STR: {
    doc: "Get property by string key (JS_GetPropertyStr)",
    slot_a: RESULT_JSVALUE_SLOT,
    slot_b: SOURCE_JSVALUE_SLOT,
    data: PROP_KEY_DATA,
  },

  GET_IDX: {
    doc: "Get property by numeric index (JS_GetPropertyUint32)",
    slot_a: RESULT_JSVALUE_SLOT,
    slot_b: SOURCE_JSVALUE_SLOT,
    data: ARRAY_INDEX_DATA,
  },

  // ============================================================================
  // Global Object access
  // ============================================================================

  GLOBAL: {
    doc: "Get the global object (JS_GetGlobalObject)",
    slot_a: RESULT_JSVALUE_SLOT,
  },

  GLOBAL_GET_STR: {
    doc: "Get property by string key from global object (JS_GetPropertyStr)",
    slot_a: RESULT_JSVALUE_SLOT,
    data: PROP_KEY_DATA,
  },

  GLOBAL_SET_STR: {
    doc: "Set property by string key on global object (JS_SetPropertyStr)",
    slot_a: VALUE_JSVALUE_SLOT,
    slot_c: PROP_FLAGS,
    data: PROP_KEY_DATA,
  },

  // ============================================================================
  // Map/Set Operations
  // ============================================================================

  MAP_SET: {
    doc: "Call map.set(key, value) using JSValue key",
    slot_a: TARGET_JSVALUE_SLOT,
    slot_b: KEY_JSVALUE_SLOT,
    slot_c: VALUE_JSVALUE_SLOT,
  },

  MAP_SET_STR: {
    doc: "Call map.set(key, value) with string key",
    slot_a: TARGET_JSVALUE_SLOT,
    slot_b: VALUE_JSVALUE_SLOT,
    data: {
      type: "buf",
      ptr: {
        name: "key_ptr",
        type: "char*",
        doc: "Key string pointer",
        usage: "in",
        pointer: { kind: "utf8", lenParam: "data.len" },
      },
      len: { name: "key_len", type: "uint32_t", doc: "Key string length", usage: "in" },
    },
  },

  SET_ADD: {
    doc: "Call set.add(value)",
    slot_a: TARGET_JSVALUE_SLOT,
    slot_b: VALUE_JSVALUE_SLOT,
  },

  // ============================================================================
  // Call/Eval
  // ============================================================================

  CALL: {
    doc: "Call a function (JS_Call) eg `func(args)` with up to 10 arguments in slots",
    slot_a: RESULT_JSVALUE_SLOT,
    slot_b: { name: "func_slot", type: "JSValueSlot", doc: "Function slot", usage: "in" },
    slot_c: {
      name: "this_slot",
      type: "JSValueSlot",
      doc: "This value slot",
      usage: "in",
    },
    data: {
      type: "bytes",
      byte00: {
        name: "argc",
        type: "uint8_t",
        doc: "Number of arguments",
        usage: "in",
      },
      byte01: callArg(1),
      byte02: callArg(2),
      byte03: callArg(3),
      byte04: callArg(4),
      byte05: callArg(5),
      byte06: callArg(6),
      byte07: callArg(7),
      byte08: callArg(8),
      byte09: callArg(9),
      byte10: callArg(10),
      byte11: {
        name: "call_as_constructor",
        type: "uint8_t",
        doc: "Whether to call the function as a constructor, eg `new func(args)`",
        usage: "in",
      },
    },
  },

  CALL_ARGV: {
    doc: "Call a function with any number of arguments stored in adjacent memory (JS_Call)",
    slot_a: RESULT_JSVALUE_SLOT,
    slot_b: { name: "func_slot", type: "JSValueSlot", doc: "Function slot", usage: "in" },
    slot_c: {
      name: "this_slot",
      type: "JSValueSlot",
      doc: "This value slot",
      usage: "in",
    },
    data: {
      type: "raw",
      d1: {
        name: "argc",
        type: "uint32_t",
        doc: "Number of arguments in argv",
        usage: "in",
      },
      d2: {
        name: "argv",
        type: "JSValue*",
        doc: "Pointer to argument array",
        usage: "in",
      },
      d3: {
        name: "call_as_constructor",
        type: "uint32_t",
        doc: "Whether to call the function as a constructor, eg `new func(args)`",
        usage: "in",
      },
    },
  },

  EVAL: {
    doc: "Evaluate JavaScript code (JS_Eval)",
    slot_a: RESULT_JSVALUE_SLOT,
    slot_b: {
      name: "maybe_filename_len",
      type: "uint8_t",
      doc: "Length of filename; 0=filename is null-terminated (or no filename)",
      usage: "in",
    },
    slot_c: { name: "call_flags", type: "EvalFlags", doc: "Eval flags", usage: "in" },
    data: {
      type: "buf",
      ptr: {
        name: "code_ptr",
        type: "char*",
        doc: "Pointer to code string",
        usage: "in",
        pointer: { kind: "utf8", lenParam: "data.len" },
      },
      len: { name: "code_len", type: "uint32_t", doc: "Length of code in bytes", usage: "in" },
      extra: {
        name: "filename",
        type: "char*",
        doc: "Filename used for error messages",
        usage: "in",
        pointer: { kind: "utf8.optionalLength", lenParam: "slot_b" },
      },
    },
  },

  // ============================================================================
  // Error Handling
  // ============================================================================

  THROW: {
    doc: "Throw an exception (JS_Throw)",
    slot_a: {
      name: "error_slot",
      type: "JSValueSlot",
      doc: "Error value slot to throw",
      usage: "in",
    },
  },

  RESOLVE_EXC: {
    doc: "Resolve exception - if maybe_exc is exception, return the exception value",
    slot_a: RESULT_JSVALUE_SLOT,
    slot_b: {
      name: "maybe_exc_slot",
      type: "JSValueSlot",
      doc: "Value that may be an exception",
      usage: "in",
    },
  },

  // ============================================================================
  // Serialization
  // ============================================================================

  BYTECODE_WRITE: {
    doc: "Serialize a value to binary (JS_WriteObject)",
    slot_a: {
      ...RESULT_JSVALUE_SLOT,
      doc: "Serialized data written to this slot as a ArrayBuffer JSValue",
    },
    slot_b: SOURCE_JSVALUE_SLOT,
    data: {
      type: "raw",
      d1: { name: "flags", type: "uint32_t", doc: "JS_WRITE_OBJ_* flags", usage: "in" },
    },
  },

  BYTECODE_READ: {
    doc: "Deserialize a value from binary (JS_ReadObject)",
    slot_a: RESULT_JSVALUE_SLOT,
    slot_b: {
      ...SOURCE_JSVALUE_SLOT,
      doc: "ArrayBuffer JSValue containing serialized data",
    },
    data: {
      type: "raw",
      d1: { name: "flags", type: "uint32_t", doc: "JS_READ_OBJ_* flags", usage: "in" },
    },
  },

  // ============================================================================
  // FuncList Lifecycle
  // ============================================================================

  FUNCLIST_NEW: {
    doc: "Allocate a new JSCFunctionListEntry array",
    slot_a: {
      name: "result_funclist_slot",
      type: "FuncListSlot",
      doc: "Slot to store the funclist pointer",
      usage: "out",
    },
    data: {
      type: "raw",
      d1: { name: "count", type: "uint32_t", doc: "Number of entries to allocate", usage: "in" },
    },
  },

  FUNCLIST_ASSIGN: {
    doc: "Assign all properties defined in the funclist to the target object (JS_SetPropertyFunctionList)",
    slot_a: TARGET_JSVALUE_SLOT,
    slot_b: {
      name: "source_funclist_slot",
      type: "FuncListSlot",
      doc: "Funclist slot",
      usage: "in",
    },
  },

  // ============================================================================
  // FuncList Entry Setters
  // ============================================================================

  FUNCLIST_DEF_CFUNC: {
    doc: "Set funclist entry to JS_DEF_CFUNC",
    slot_a: TARGET_FUNCLIST_SLOT,
    slot_b: FUNC_ARITY_SLOT,
    slot_c: PROP_FLAGS,
    data: {
      type: "raw",
      d1: TARGET_FUNCLIST_INDEX,
      d2: {
        name: "func_name_ptr",
        type: "char*",
        doc: "Function name, MUST be null-terminated",
        usage: "in",
        pointer: { kind: "utf8.nullTerminated" },
      },
      d3: C_FUNC_PTR,
    },
  },

  FUNCLIST_DEF_CFUNC_CTOR: {
    doc: "Set funclist entry to JS_DEF_CFUNC with constructor proto",
    slot_a: TARGET_FUNCLIST_SLOT,
    slot_b: FUNC_ARITY_SLOT,
    slot_c: PROP_FLAGS,
    data: {
      type: "raw",
      d1: TARGET_FUNCLIST_INDEX,
      d2: {
        name: "func_name_ptr",
        type: "char*",
        doc: "Function name, MUST be null-terminated",
        usage: "in",
        pointer: { kind: "utf8.nullTerminated" },
      },
      d3: C_FUNC_PTR,
    },
  },

  FUNCLIST_DEF_CGETSET: {
    doc: "Set funclist entry to JS_DEF_CGETSET",
    slot_a: TARGET_FUNCLIST_SLOT,
    slot_b: TARGET_FUNCLIST_INDEX_SLOT,
    slot_c: PROP_FLAGS,
    data: {
      type: "raw",
      d1: PROP_KEY_PTR_NULL_TERMINATED,
      d2: {
        name: "getter_ptr",
        type: "JSCFunctionType*",
        doc: "Getter c function pointer (0=no getter)",
        usage: "in",
      },
      d3: {
        name: "setter_ptr",
        type: "JSCFunctionType*",
        doc: "Setter c function pointer (0=no setter)",
        usage: "in",
      },
    },
  },

  FUNCLIST_DEF_STRING: {
    doc: "Set funclist entry to JS_DEF_PROP_STRING",
    slot_a: TARGET_FUNCLIST_SLOT,
    slot_b: TARGET_FUNCLIST_INDEX_SLOT,
    slot_c: PROP_FLAGS,
    data: {
      type: "buf",
      ptr: {
        name: "str_ptr",
        type: "char*",
        doc: "String value pointer",
        usage: "in",
        pointer: { kind: "utf8", lenParam: "data.len" },
      },
      len: { name: "str_len", type: "uint32_t", doc: "String value length", usage: "in" },
      extra: {
        name: "name_ptr",
        type: "char*",
        doc: "Property name pointer (MUST be null-terminated)",
        usage: "in",
        pointer: { kind: "utf8.nullTerminated" },
      },
    },
  },

  FUNCLIST_DEF_INT32: {
    doc: "Set funclist entry to JS_DEF_PROP_INT32",
    slot_a: TARGET_FUNCLIST_SLOT,
    slot_b: PROP_MAYBE_NAME_LEN_SLOT,
    slot_c: PROP_FLAGS,
    data: {
      type: "raw",
      d1: TARGET_FUNCLIST_INDEX,
      d2: { name: "int_val", type: "int32_t", doc: "The int32 value", usage: "in" },
      d3: PROP_KEY_PTR,
    },
  },

  FUNCLIST_DEF_INT64: {
    doc: "Set funclist entry to JS_DEF_PROP_INT64 (index in slot_c)",
    slot_a: TARGET_FUNCLIST_SLOT,
    slot_b: TARGET_FUNCLIST_INDEX_SLOT,
    slot_c: PROP_FLAGS,
    data: {
      type: "i64",
      value: { name: "i64_val", type: "int64_t", doc: "The int64 value", usage: "in" },
      extra: {
        name: "name_ptr",
        type: "char*",
        doc: "Property name pointer (MUST be null-terminated)",
        usage: "in",
        pointer: { kind: "utf8.nullTerminated" },
      },
    },
  },

  FUNCLIST_DEF_DOUBLE: {
    doc: "Set funclist entry to JS_DEF_PROP_DOUBLE (index in slot_c)",
    slot_a: TARGET_FUNCLIST_SLOT,
    slot_b: TARGET_FUNCLIST_INDEX_SLOT,
    slot_c: PROP_FLAGS,
    data: {
      type: "f64",
      value: { name: "f64_val", type: "double", doc: "The double value", usage: "in" },
      extra: PROP_KEY_PTR_NULL_TERMINATED,
    },
  },

  FUNCLIST_DEF_NULL: {
    doc: "Set funclist entry to JS_DEF_PROP_NULL",
    slot_a: TARGET_FUNCLIST_SLOT,
    slot_c: PROP_FLAGS,
    data: {
      ...PROP_KEY_DATA,
      extra: TARGET_FUNCLIST_INDEX,
    },
  },

  FUNCLIST_DEF_UNDEFINED: {
    doc: "Set funclist entry to JS_DEF_PROP_UNDEFINED",
    slot_a: TARGET_FUNCLIST_SLOT,
    slot_c: PROP_FLAGS,
    data: {
      ...PROP_KEY_DATA,
      extra: TARGET_FUNCLIST_INDEX,
    },
  },

  FUNCLIST_DEF_OBJECT: {
    doc: "Set funclist entry to JS_DEF_OBJECT (nested object with its own funclist)",
    slot_a: TARGET_FUNCLIST_SLOT,
    slot_b: {
      name: "object_funclist_slot",
      doc: "A funclist defining the properties of the nested object to create",
      type: "FuncListSlot",
      usage: "in",
    },
    slot_c: PROP_FLAGS,
    data: {
      ...PROP_KEY_DATA,
      extra: TARGET_FUNCLIST_INDEX,
    },
  },

  FUNCLIST_DEF_BOOL: {
    doc: "Set funclist entry to JS_DEF_PROP_BOOL",
    slot_a: TARGET_FUNCLIST_SLOT,
    slot_b: PROP_MAYBE_NAME_LEN_SLOT,
    slot_c: PROP_FLAGS,
    data: {
      type: "raw",
      d1: TARGET_FUNCLIST_INDEX,
      d2: {
        name: "bool_val",
        type: "int32_t",
        doc: "Boolean value as 0 or 1",
        usage: "in",
      },
      d3: PROP_KEY_PTR,
    },
  },
} as const satisfies Record<string, CommandDef>

function unreachable(val: never): never {
  throw new Error(`Should never happen: ${typeof val === "object" ? JSON.stringify(val) : val}`)
}

function collectParamMap(command: CommandDef): Map<ParamPath, ParamDef<any>> {
  const map = new Map<ParamPath, ParamDef<any>>()
  if (command.slot_a) map.set("slot_a", command.slot_a)
  if (command.slot_b) map.set("slot_b", command.slot_b)
  if (command.slot_c) map.set("slot_c", command.slot_c)
  if (!command.data) return map

  switch (command.data.type) {
    case "raw":
      map.set("data.d1", command.data.d1)
      if (command.data.d2) map.set("data.d2", command.data.d2)
      if (command.data.d3) map.set("data.d3", command.data.d3)
      break
    case "f64":
      map.set("data.value", command.data.value)
      if (command.data.extra) map.set("data.extra", command.data.extra)
      break
    case "i64":
      map.set("data.value", command.data.value)
      if (command.data.extra) map.set("data.extra", command.data.extra)
      break
    case "buf":
      map.set("data.ptr", command.data.ptr)
      map.set("data.len", command.data.len)
      if (command.data.extra) map.set("data.extra", command.data.extra)
      break
    case "bytes":
      if (command.data.byte00) map.set("data.byte00", command.data.byte00)
      if (command.data.byte01) map.set("data.byte01", command.data.byte01)
      if (command.data.byte02) map.set("data.byte02", command.data.byte02)
      if (command.data.byte03) map.set("data.byte03", command.data.byte03)
      if (command.data.byte04) map.set("data.byte04", command.data.byte04)
      if (command.data.byte05) map.set("data.byte05", command.data.byte05)
      if (command.data.byte06) map.set("data.byte06", command.data.byte06)
      if (command.data.byte07) map.set("data.byte07", command.data.byte07)
      if (command.data.byte08) map.set("data.byte08", command.data.byte08)
      if (command.data.byte09) map.set("data.byte09", command.data.byte09)
      if (command.data.byte10) map.set("data.byte10", command.data.byte10)
      if (command.data.byte11) map.set("data.byte11", command.data.byte11)
      break
    default:
      unreachable(command.data)
  }
  return map
}

function isLengthFieldType(type: string): boolean {
  return type === "uint8_t" || type === "uint32_t"
}

for (const [name, command] of Object.entries(COMMANDS)) {
  const paramMap = collectParamMap(command)
  for (const [path, param] of paramMap.entries()) {
    if (param.type === "char*" || param.type === "uint8_t*") {
      if (!param.pointer) {
        throw new Error(`${name}.${path}: ${param.type} params require pointer metadata`)
      }
      const pointer = param.pointer
      if (pointer.kind === "utf8.nullTerminated") {
        if (param.type !== "char*") {
          throw new Error(`${name}.${path}: utf8.nullTerminated is only valid for char* params`)
        }
        continue
      }
      const lenParam = paramMap.get(pointer.lenParam)
      if (!lenParam) {
        throw new Error(`${name}.${path}: pointer lenParam ${pointer.lenParam} does not exist`)
      }
      if (!isLengthFieldType(lenParam.type)) {
        throw new Error(
          `${name}.${path}: pointer lenParam ${pointer.lenParam} has non-length type ${lenParam.type}`,
        )
      }
      continue
    }

    if (param.pointer) {
      throw new Error(
        `${name}.${path}: pointer metadata is only valid for char* and uint8_t* params`,
      )
    }
  }
}

export type OpName = keyof typeof COMMANDS

export const OPCODE_TO_COMMAND = Object.keys(COMMANDS)
export const COMMAND_TO_OPCODE = Object.fromEntries(
  OPCODE_TO_COMMAND.map((command, opcode) => [command, opcode]),
)

if (OPCODE_TO_COMMAND.length > 256) {
  throw new Error("Too many commands: " + OPCODE_TO_COMMAND.length)
}

export function COpName(name: OpName | string) {
  return `QTS_OP_${name}` as const
}

/**
 * Convert C op name (SCREAMING_SNAKE_CASE) to TypeScript name (PascalCase).
 * Examples:
 * - "OBJECT" → "Object"
 * - "SET_STR_INT32" → "SetStrInt32"
 * - "FUNCLIST_CFUNC_CTOR" → "FunclistCfuncCtor"
 */
export function TsOpName(name: OpName | string): string {
  return name
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("")
}

/**
 * Convert C op name (SCREAMING_SNAKE_CASE) to lowercase_snake_case for C function names.
 * Examples:
 * - "OBJECT" → "object"
 * - "SET_STR_INT32" → "set_str_int32"
 * - "FUNCLIST_CFUNC_CTOR" → "funclist_cfunc_ctor"
 */
export function lowercase_c_name(name: OpName | string): string {
  return name.toLowerCase()
}
