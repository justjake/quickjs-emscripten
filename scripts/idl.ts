/**
 * Interface definition language for a command type in our command buffer
 * protocol.
 *
 * All commands are exactly 16 bytes long.
 * Assumes wasm32 (32-bit pointers).
 */
type CommandDef = {
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

/** Describes a scalar parameter in a command. */
type ParamDef<T extends string = string> = {
  /** Parameter name. */
  name: string
  /** Parameter c type. */
  type: T
  /** Documenatation. */
  doc: string
  /**
   * Whether the parameter is an input, output, or both.
   * Eg, if the parameter is a pointer or slot:
   * - use 'in' if the command reads from the pointer or slot
   * - use 'out' if the command writes to the pointer or slot
   * - use 'in-out' if the command reads from and writes to the pointer or slot
   */
  usage: "in" | "out" | "in-out"
}

/**
 * Type aliases for uint8_t; any type that fits in 8 bits.
 *
 * Add more types as needed.
 */
type UInt8Types = "uint8_t" | "JSValueSlot" | "FuncListSlot"

/**
 * Type aliases for uint32_t; any type that fits in 32 bits.
 *
 * Add more types as needed.
 */
type UInt32Types = "uint32_t" | "int32_t"

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
  ptr: ParamDef<"char*">
  len: ParamDef<"uint32_t">
  extra?: ParamDef<UInt32Types>
}

type CommandDataCallDef = {
  type: "jsvalues"
  ptr: ParamDef<"JSValue*">
  len: ParamDef<"uint32_t">
  extra?: ParamDef<UInt32Types>
}

type CommandDataUnion = {
  raw: CommandDataRawDef
  f64: CommandDataF64Def
  i64: CommandDataI64Def
  buf: CommandDataBufDef
  jsvalues: CommandDataCallDef
}

/**
 * 12 bytes of data.
 *
 * New CommandDataXxxDef variants may be added after a design discussion.
 */
type CommandDataDef = CommandDataUnion[keyof CommandDataUnion]

export const COMMANDS = {
  // ============================================================================
  // Container Creation (3 ops)
  // ============================================================================

  OBJECT: {
    doc: "Create a new empty object (JS_NewObject)",
    slot_a: {
      name: "result",
      type: "JSValueSlot",
      doc: "Slot to store the new object",
      usage: "out",
    },
  },

  OBJECT_PROTO: {
    doc: "Create a new object with prototype (JS_NewObjectProto)",
    slot_a: {
      name: "result",
      type: "JSValueSlot",
      doc: "Slot to store the new object",
      usage: "out",
    },
    slot_b: { name: "proto", type: "JSValueSlot", doc: "Prototype object slot", usage: "in" },
  },

  ARRAY: {
    doc: "Create a new empty array (JS_NewArray)",
    slot_a: {
      name: "result",
      type: "JSValueSlot",
      doc: "Slot to store the new array",
      usage: "out",
    },
  },

  // ============================================================================
  // Special Type Creation (5 ops)
  // ============================================================================

  DATE: {
    doc: "Create a Date object from timestamp (JS_NewDate)",
    slot_a: {
      name: "result",
      type: "JSValueSlot",
      doc: "Slot to store the new Date",
      usage: "out",
    },
    data: {
      type: "f64",
      value: {
        name: "timestamp",
        type: "double",
        doc: "Unix timestamp in milliseconds",
        usage: "in",
      },
    },
  },

  ERROR: {
    doc: "Create an Error object (JS_NewError or JS_New*Error)",
    slot_a: {
      name: "result",
      type: "JSValueSlot",
      doc: "Slot to store the new Error",
      usage: "out",
    },
    slot_b: {
      name: "error_type",
      type: "uint8_t",
      doc: "Error type enum (0=Error, 1=RangeError, etc.)",
      usage: "in",
    },
    data: {
      type: "buf",
      ptr: { name: "message_ptr", type: "char*", doc: "Pointer to error message", usage: "in" },
      len: { name: "message_len", type: "uint32_t", doc: "Length of error message", usage: "in" },
    },
  },

  ARRAYBUFFER: {
    doc: "Create an ArrayBuffer by copying data (JS_NewArrayBufferCopy)",
    slot_a: {
      name: "result",
      type: "JSValueSlot",
      doc: "Slot to store the new ArrayBuffer",
      usage: "out",
    },
    data: {
      type: "buf",
      ptr: { name: "data_ptr", type: "char*", doc: "Pointer to source data", usage: "in" },
      len: { name: "data_len", type: "uint32_t", doc: "Length of data in bytes", usage: "in" },
    },
  },

  TYPED_ARRAY: {
    doc: "Create a TypedArray view (JS_NewTypedArray)",
    slot_a: {
      name: "result",
      type: "JSValueSlot",
      doc: "Slot to store the new TypedArray",
      usage: "out",
    },
    slot_b: { name: "buffer", type: "JSValueSlot", doc: "ArrayBuffer slot", usage: "in" },
    slot_c: { name: "array_type", type: "uint8_t", doc: "TypedArray type enum", usage: "in" },
    data: {
      type: "raw",
      d1: { name: "byte_offset", type: "uint32_t", doc: "Byte offset into buffer", usage: "in" },
      d2: { name: "length", type: "uint32_t", doc: "Number of elements", usage: "in" },
    },
  },

  SYMBOL: {
    doc: "Create a Symbol (JS_NewSymbol or global symbol)",
    slot_a: {
      name: "result",
      type: "JSValueSlot",
      doc: "Slot to store the new Symbol",
      usage: "out",
    },
    slot_b: {
      name: "is_global",
      type: "uint8_t",
      doc: "1 for global symbol, 0 for local",
      usage: "in",
    },
    data: {
      type: "buf",
      ptr: { name: "desc_ptr", type: "char*", doc: "Pointer to description string", usage: "in" },
      len: { name: "desc_len", type: "uint32_t", doc: "Length of description", usage: "in" },
    },
  },

  // ============================================================================
  // Value Creation (4 ops)
  // ============================================================================

  FLOAT64: {
    doc: "Create a float64 number value (JS_NewFloat64)",
    slot_a: { name: "result", type: "JSValueSlot", doc: "Slot to store the number", usage: "out" },
    data: {
      type: "f64",
      value: { name: "value", type: "double", doc: "The float64 value", usage: "in" },
    },
  },

  STRING: {
    doc: "Create a string value (JS_NewStringLen)",
    slot_a: { name: "result", type: "JSValueSlot", doc: "Slot to store the string", usage: "out" },
    data: {
      type: "buf",
      ptr: { name: "str_ptr", type: "char*", doc: "Pointer to string data", usage: "in" },
      len: { name: "str_len", type: "uint32_t", doc: "Length of string in bytes", usage: "in" },
    },
  },

  BIGINT: {
    doc: "Create a BigInt value from i64 (JS_NewBigInt64)",
    slot_a: { name: "result", type: "JSValueSlot", doc: "Slot to store the BigInt", usage: "out" },
    data: {
      type: "i64",
      value: { name: "value", type: "int64_t", doc: "The int64 value", usage: "in" },
    },
  },

  FUNCTION: {
    doc: "Create a host function (QTS_NewFunction)",
    slot_a: {
      name: "result",
      type: "JSValueSlot",
      doc: "Slot to store the function",
      usage: "out",
    },
    slot_b: { name: "length", type: "uint8_t", doc: "Function.length (arity)", usage: "in" },
    slot_c: {
      name: "is_constructor",
      type: "uint8_t",
      doc: "1 if callable as constructor",
      usage: "in",
    },
    data: {
      type: "buf",
      ptr: { name: "name_ptr", type: "char*", doc: "Pointer to function name", usage: "in" },
      len: { name: "name_len", type: "uint32_t", doc: "Length of function name", usage: "in" },
      extra: {
        name: "host_ref_id",
        type: "int32_t",
        doc: "Host reference ID for callback",
        usage: "in",
      },
    },
  },

  // ============================================================================
  // Property Set by String Key (8 ops)
  // ============================================================================

  SET_STR_SLOT: {
    doc: "Set property by string key to JSValue from slot (JS_SetPropertyStr)",
    slot_a: { name: "obj", type: "JSValueSlot", doc: "Object slot", usage: "in" },
    slot_b: { name: "val", type: "JSValueSlot", doc: "Value slot", usage: "in" },
    data: {
      type: "buf",
      ptr: { name: "name_ptr", type: "char*", doc: "Property name pointer", usage: "in" },
      len: { name: "name_len", type: "uint32_t", doc: "Property name length", usage: "in" },
    },
  },

  SET_STR_NULL: {
    doc: "Set property by string key to null",
    slot_a: { name: "obj", type: "JSValueSlot", doc: "Object slot", usage: "in" },
    data: {
      type: "buf",
      ptr: { name: "name_ptr", type: "char*", doc: "Property name pointer", usage: "in" },
      len: { name: "name_len", type: "uint32_t", doc: "Property name length", usage: "in" },
    },
  },

  SET_STR_UNDEF: {
    doc: "Set property by string key to undefined",
    slot_a: { name: "obj", type: "JSValueSlot", doc: "Object slot", usage: "in" },
    data: {
      type: "buf",
      ptr: { name: "name_ptr", type: "char*", doc: "Property name pointer", usage: "in" },
      len: { name: "name_len", type: "uint32_t", doc: "Property name length", usage: "in" },
    },
  },

  SET_STR_BOOL: {
    doc: "Set property by string key to boolean",
    slot_a: { name: "obj", type: "JSValueSlot", doc: "Object slot", usage: "in" },
    slot_b: { name: "bool_val", type: "uint8_t", doc: "Boolean value (0 or 1)", usage: "in" },
    data: {
      type: "buf",
      ptr: { name: "name_ptr", type: "char*", doc: "Property name pointer", usage: "in" },
      len: { name: "name_len", type: "uint32_t", doc: "Property name length", usage: "in" },
    },
  },

  SET_STR_INT32: {
    doc: "Set property by string key to int32",
    slot_a: { name: "obj", type: "JSValueSlot", doc: "Object slot", usage: "in" },
    data: {
      type: "buf",
      ptr: { name: "name_ptr", type: "char*", doc: "Property name pointer", usage: "in" },
      len: { name: "name_len", type: "uint32_t", doc: "Property name length", usage: "in" },
      extra: { name: "int_val", type: "int32_t", doc: "The int32 value", usage: "in" },
    },
  },

  SET_STR_F64: {
    doc: "Set property by string key to float64 (name must be null-terminated)",
    slot_a: { name: "obj", type: "JSValueSlot", doc: "Object slot", usage: "in" },
    data: {
      type: "f64",
      value: { name: "f64_val", type: "double", doc: "The float64 value", usage: "in" },
      extra: {
        name: "name_ptr",
        type: "uint32_t",
        doc: "Property name pointer (null-terminated)",
        usage: "in",
      },
    },
  },

  SET_STR_BIGINT: {
    doc: "Set property by string key to BigInt (name must be null-terminated)",
    slot_a: { name: "obj", type: "JSValueSlot", doc: "Object slot", usage: "in" },
    data: {
      type: "i64",
      value: { name: "i64_val", type: "int64_t", doc: "The int64 value", usage: "in" },
      extra: {
        name: "name_ptr",
        type: "uint32_t",
        doc: "Property name pointer (null-terminated)",
        usage: "in",
      },
    },
  },

  SET_STR_STRING: {
    doc: "Set property by string key to string value (name must be null-terminated)",
    slot_a: { name: "obj", type: "JSValueSlot", doc: "Object slot", usage: "in" },
    data: {
      type: "buf",
      ptr: { name: "str_ptr", type: "char*", doc: "String value pointer", usage: "in" },
      len: { name: "str_len", type: "uint32_t", doc: "String value length", usage: "in" },
      extra: {
        name: "name_ptr",
        type: "uint32_t",
        doc: "Property name pointer (null-terminated)",
        usage: "in",
      },
    },
  },

  // ============================================================================
  // Property Set by Index (8 ops)
  // ============================================================================

  SET_IDX_SLOT: {
    doc: "Set array element by index to JSValue from slot (JS_SetPropertyUint32)",
    slot_a: { name: "obj", type: "JSValueSlot", doc: "Array/object slot", usage: "in" },
    slot_b: { name: "val", type: "JSValueSlot", doc: "Value slot", usage: "in" },
    data: {
      type: "raw",
      d1: { name: "index", type: "uint32_t", doc: "Array index", usage: "in" },
    },
  },

  SET_IDX_NULL: {
    doc: "Set array element by index to null",
    slot_a: { name: "obj", type: "JSValueSlot", doc: "Array/object slot", usage: "in" },
    data: {
      type: "raw",
      d1: { name: "index", type: "uint32_t", doc: "Array index", usage: "in" },
    },
  },

  SET_IDX_UNDEF: {
    doc: "Set array element by index to undefined",
    slot_a: { name: "obj", type: "JSValueSlot", doc: "Array/object slot", usage: "in" },
    data: {
      type: "raw",
      d1: { name: "index", type: "uint32_t", doc: "Array index", usage: "in" },
    },
  },

  SET_IDX_BOOL: {
    doc: "Set array element by index to boolean",
    slot_a: { name: "obj", type: "JSValueSlot", doc: "Array/object slot", usage: "in" },
    slot_b: { name: "bool_val", type: "uint8_t", doc: "Boolean value (0 or 1)", usage: "in" },
    data: {
      type: "raw",
      d1: { name: "index", type: "uint32_t", doc: "Array index", usage: "in" },
    },
  },

  SET_IDX_INT32: {
    doc: "Set array element by index to int32",
    slot_a: { name: "obj", type: "JSValueSlot", doc: "Array/object slot", usage: "in" },
    data: {
      type: "raw",
      d1: { name: "index", type: "uint32_t", doc: "Array index", usage: "in" },
      d2: { name: "int_val", type: "int32_t", doc: "The int32 value", usage: "in" },
    },
  },

  SET_IDX_F64: {
    doc: "Set array element by index to float64",
    slot_a: { name: "obj", type: "JSValueSlot", doc: "Array/object slot", usage: "in" },
    data: {
      type: "f64",
      value: { name: "f64_val", type: "double", doc: "The float64 value", usage: "in" },
      extra: { name: "index", type: "uint32_t", doc: "Array index", usage: "in" },
    },
  },

  SET_IDX_BIGINT: {
    doc: "Set array element by index to BigInt",
    slot_a: { name: "obj", type: "JSValueSlot", doc: "Array/object slot", usage: "in" },
    data: {
      type: "i64",
      value: { name: "i64_val", type: "int64_t", doc: "The int64 value", usage: "in" },
      extra: { name: "index", type: "uint32_t", doc: "Array index", usage: "in" },
    },
  },

  SET_IDX_STRING: {
    doc: "Set array element by index to string",
    slot_a: { name: "obj", type: "JSValueSlot", doc: "Array/object slot", usage: "in" },
    data: {
      type: "buf",
      ptr: { name: "str_ptr", type: "char*", doc: "String value pointer", usage: "in" },
      len: { name: "str_len", type: "uint32_t", doc: "String value length", usage: "in" },
      extra: { name: "index", type: "uint32_t", doc: "Array index", usage: "in" },
    },
  },

  // ============================================================================
  // Property Set by JSValue Key (1 op)
  // ============================================================================

  SET_PROP: {
    doc: "Set property using JSValue key (JS_SetProperty)",
    slot_a: { name: "obj", type: "JSValueSlot", doc: "Object slot", usage: "in" },
    slot_b: { name: "key", type: "JSValueSlot", doc: "Property key slot", usage: "in" },
    slot_c: { name: "val", type: "JSValueSlot", doc: "Value slot", usage: "in" },
  },

  // ============================================================================
  // Property Get (4 ops)
  // ============================================================================

  GET_PROP: {
    doc: "Get property using JSValue key (JS_GetProperty)",
    slot_a: { name: "result", type: "JSValueSlot", doc: "Slot to store the result", usage: "out" },
    slot_b: { name: "obj", type: "JSValueSlot", doc: "Object slot", usage: "in" },
    slot_c: { name: "key", type: "JSValueSlot", doc: "Property key slot", usage: "in" },
  },

  GET_STR: {
    doc: "Get property by string key (JS_GetPropertyStr)",
    slot_a: { name: "result", type: "JSValueSlot", doc: "Slot to store the result", usage: "out" },
    slot_b: { name: "obj", type: "JSValueSlot", doc: "Object slot", usage: "in" },
    data: {
      type: "buf",
      ptr: { name: "name_ptr", type: "char*", doc: "Property name pointer", usage: "in" },
      len: { name: "name_len", type: "uint32_t", doc: "Property name length", usage: "in" },
    },
  },

  GET_IDX: {
    doc: "Get property by numeric index (JS_GetPropertyUint32)",
    slot_a: { name: "result", type: "JSValueSlot", doc: "Slot to store the result", usage: "out" },
    slot_b: { name: "obj", type: "JSValueSlot", doc: "Object slot", usage: "in" },
    data: {
      type: "raw",
      d1: { name: "index", type: "uint32_t", doc: "Array index", usage: "in" },
    },
  },

  GET_GLOBAL: {
    doc: "Get the global object (JS_GetGlobalObject)",
    slot_a: {
      name: "result",
      type: "JSValueSlot",
      doc: "Slot to store the global object",
      usage: "out",
    },
  },

  // ============================================================================
  // Map/Set Operations (3 ops)
  // ============================================================================

  MAP_SET: {
    doc: "Call map.set(key, value) using JSValue key",
    slot_a: { name: "map", type: "JSValueSlot", doc: "Map object slot", usage: "in" },
    slot_b: { name: "key", type: "JSValueSlot", doc: "Key slot", usage: "in" },
    slot_c: { name: "val", type: "JSValueSlot", doc: "Value slot", usage: "in" },
  },

  MAP_SET_STR: {
    doc: "Call map.set(key, value) with string key",
    slot_a: { name: "map", type: "JSValueSlot", doc: "Map object slot", usage: "in" },
    slot_b: { name: "val", type: "JSValueSlot", doc: "Value slot", usage: "in" },
    data: {
      type: "buf",
      ptr: { name: "key_ptr", type: "char*", doc: "Key string pointer", usage: "in" },
      len: { name: "key_len", type: "uint32_t", doc: "Key string length", usage: "in" },
    },
  },

  SET_ADD: {
    doc: "Call set.add(value)",
    slot_a: { name: "set", type: "JSValueSlot", doc: "Set object slot", usage: "in" },
    slot_b: { name: "val", type: "JSValueSlot", doc: "Value slot", usage: "in" },
  },

  // ============================================================================
  // Host Function Definition (3 ops)
  // ============================================================================

  DEF_CFUNC: {
    doc: "Define a host function property on object",
    slot_a: { name: "obj", type: "JSValueSlot", doc: "Object slot", usage: "in" },
    slot_b: { name: "length", type: "uint8_t", doc: "Function.length (arity)", usage: "in" },
    slot_c: { name: "flags", type: "uint8_t", doc: "JS_PROP_* flags", usage: "in" },
    data: {
      type: "buf",
      ptr: { name: "name_ptr", type: "char*", doc: "Function name pointer", usage: "in" },
      len: { name: "name_len", type: "uint32_t", doc: "Function name length", usage: "in" },
      extra: {
        name: "host_ref_id",
        type: "int32_t",
        doc: "Host reference ID for callback",
        usage: "in",
      },
    },
  },

  DEF_CFUNC_CTOR: {
    doc: "Define a host constructor function property on object",
    slot_a: { name: "obj", type: "JSValueSlot", doc: "Object slot", usage: "in" },
    slot_b: { name: "length", type: "uint8_t", doc: "Function.length (arity)", usage: "in" },
    slot_c: { name: "flags", type: "uint8_t", doc: "JS_PROP_* flags", usage: "in" },
    data: {
      type: "buf",
      ptr: { name: "name_ptr", type: "char*", doc: "Function name pointer", usage: "in" },
      len: { name: "name_len", type: "uint32_t", doc: "Function name length", usage: "in" },
      extra: {
        name: "host_ref_id",
        type: "int32_t",
        doc: "Host reference ID for callback",
        usage: "in",
      },
    },
  },

  DEF_CGETSET: {
    doc: "Define a host getter/setter property on object (name must be null-terminated)",
    slot_a: { name: "obj", type: "JSValueSlot", doc: "Object slot", usage: "in" },
    slot_b: { name: "flags", type: "uint8_t", doc: "JS_PROP_* flags", usage: "in" },
    data: {
      type: "raw",
      d1: {
        name: "name_ptr",
        type: "uint32_t",
        doc: "Property name pointer (null-terminated)",
        usage: "in",
      },
      d2: {
        name: "getter_ref",
        type: "int32_t",
        doc: "Host reference ID for getter (0 = none)",
        usage: "in",
      },
      d3: {
        name: "setter_ref",
        type: "int32_t",
        doc: "Host reference ID for setter (0 = none)",
        usage: "in",
      },
    },
  },

  // ============================================================================
  // Property Definition with Inline Values (8 ops)
  // ============================================================================

  DEF_PROP_SLOT: {
    doc: "Define property with JSValue from slot (JS_DefinePropertyValueStr)",
    slot_a: { name: "obj", type: "JSValueSlot", doc: "Object slot", usage: "in" },
    slot_b: { name: "val", type: "JSValueSlot", doc: "Value slot", usage: "in" },
    slot_c: { name: "flags", type: "uint8_t", doc: "JS_PROP_* flags", usage: "in" },
    data: {
      type: "buf",
      ptr: { name: "name_ptr", type: "char*", doc: "Property name pointer", usage: "in" },
      len: { name: "name_len", type: "uint32_t", doc: "Property name length", usage: "in" },
    },
  },

  DEF_PROP_NULL: {
    doc: "Define property with null value",
    slot_a: { name: "obj", type: "JSValueSlot", doc: "Object slot", usage: "in" },
    slot_b: { name: "flags", type: "uint8_t", doc: "JS_PROP_* flags", usage: "in" },
    data: {
      type: "buf",
      ptr: { name: "name_ptr", type: "char*", doc: "Property name pointer", usage: "in" },
      len: { name: "name_len", type: "uint32_t", doc: "Property name length", usage: "in" },
    },
  },

  DEF_PROP_UNDEF: {
    doc: "Define property with undefined value",
    slot_a: { name: "obj", type: "JSValueSlot", doc: "Object slot", usage: "in" },
    slot_b: { name: "flags", type: "uint8_t", doc: "JS_PROP_* flags", usage: "in" },
    data: {
      type: "buf",
      ptr: { name: "name_ptr", type: "char*", doc: "Property name pointer", usage: "in" },
      len: { name: "name_len", type: "uint32_t", doc: "Property name length", usage: "in" },
    },
  },

  DEF_PROP_BOOL: {
    doc: "Define property with boolean value",
    slot_a: { name: "obj", type: "JSValueSlot", doc: "Object slot", usage: "in" },
    slot_b: { name: "flags", type: "uint8_t", doc: "JS_PROP_* flags", usage: "in" },
    slot_c: { name: "bool_val", type: "uint8_t", doc: "Boolean value (0 or 1)", usage: "in" },
    data: {
      type: "buf",
      ptr: { name: "name_ptr", type: "char*", doc: "Property name pointer", usage: "in" },
      len: { name: "name_len", type: "uint32_t", doc: "Property name length", usage: "in" },
    },
  },

  DEF_PROP_INT32: {
    doc: "Define property with int32 value",
    slot_a: { name: "obj", type: "JSValueSlot", doc: "Object slot", usage: "in" },
    slot_b: { name: "flags", type: "uint8_t", doc: "JS_PROP_* flags", usage: "in" },
    data: {
      type: "buf",
      ptr: { name: "name_ptr", type: "char*", doc: "Property name pointer", usage: "in" },
      len: { name: "name_len", type: "uint32_t", doc: "Property name length", usage: "in" },
      extra: { name: "int_val", type: "int32_t", doc: "The int32 value", usage: "in" },
    },
  },

  DEF_PROP_I64: {
    doc: "Define property with int64/BigInt value (name must be null-terminated)",
    slot_a: { name: "obj", type: "JSValueSlot", doc: "Object slot", usage: "in" },
    slot_b: { name: "flags", type: "uint8_t", doc: "JS_PROP_* flags", usage: "in" },
    data: {
      type: "i64",
      value: { name: "i64_val", type: "int64_t", doc: "The int64 value", usage: "in" },
      extra: {
        name: "name_ptr",
        type: "uint32_t",
        doc: "Property name pointer (null-terminated)",
        usage: "in",
      },
    },
  },

  DEF_PROP_F64: {
    doc: "Define property with float64 value (name must be null-terminated)",
    slot_a: { name: "obj", type: "JSValueSlot", doc: "Object slot", usage: "in" },
    slot_b: { name: "flags", type: "uint8_t", doc: "JS_PROP_* flags", usage: "in" },
    data: {
      type: "f64",
      value: { name: "f64_val", type: "double", doc: "The float64 value", usage: "in" },
      extra: {
        name: "name_ptr",
        type: "uint32_t",
        doc: "Property name pointer (null-terminated)",
        usage: "in",
      },
    },
  },

  DEF_PROP_STRING: {
    doc: "Define property with string value (name must be null-terminated)",
    slot_a: { name: "obj", type: "JSValueSlot", doc: "Object slot", usage: "in" },
    slot_b: { name: "flags", type: "uint8_t", doc: "JS_PROP_* flags", usage: "in" },
    data: {
      type: "buf",
      ptr: { name: "str_ptr", type: "char*", doc: "String value pointer", usage: "in" },
      len: { name: "str_len", type: "uint32_t", doc: "String value length", usage: "in" },
      extra: {
        name: "name_ptr",
        type: "uint32_t",
        doc: "Property name pointer (null-terminated)",
        usage: "in",
      },
    },
  },

  // ============================================================================
  // Full Property Definition (2 ops)
  // ============================================================================

  DEFINE_VALUE: {
    doc: "Define property with value from slot and flags (JS_DefinePropertyValueStr)",
    slot_a: { name: "obj", type: "JSValueSlot", doc: "Object slot", usage: "in" },
    slot_b: { name: "val", type: "JSValueSlot", doc: "Value slot", usage: "in" },
    slot_c: { name: "flags", type: "uint8_t", doc: "JS_PROP_* flags", usage: "in" },
    data: {
      type: "buf",
      ptr: { name: "name_ptr", type: "char*", doc: "Property name pointer", usage: "in" },
      len: { name: "name_len", type: "uint32_t", doc: "Property name length", usage: "in" },
    },
  },

  DEFINE_GETSET: {
    doc: "Define property with getter/setter from slots (JS_DefinePropertyGetSet)",
    slot_a: { name: "obj", type: "JSValueSlot", doc: "Object slot", usage: "in" },
    slot_b: {
      name: "getter",
      type: "JSValueSlot",
      doc: "Getter function slot (0xFF = none)",
      usage: "in",
    },
    slot_c: {
      name: "setter",
      type: "JSValueSlot",
      doc: "Setter function slot (0xFF = none)",
      usage: "in",
    },
    data: {
      type: "buf",
      ptr: { name: "name_ptr", type: "char*", doc: "Property name pointer", usage: "in" },
      len: { name: "name_len", type: "uint32_t", doc: "Property name length", usage: "in" },
      extra: { name: "flags", type: "uint32_t", doc: "JS_PROP_* flags", usage: "in" },
    },
  },

  // ============================================================================
  // Call/Eval (3 ops)
  // ============================================================================

  CALL: {
    doc: "Call a function (JS_Call)",
    slot_a: { name: "result", type: "JSValueSlot", doc: "Slot to store the result", usage: "out" },
    slot_b: { name: "func", type: "JSValueSlot", doc: "Function slot", usage: "in" },
    slot_c: { name: "this_val", type: "JSValueSlot", doc: "This value slot", usage: "in" },
    data: {
      type: "jsvalues",
      ptr: { name: "argv", type: "JSValue*", doc: "Pointer to argument array", usage: "in" },
      len: { name: "argc", type: "uint32_t", doc: "Number of arguments", usage: "in" },
    },
  },

  CALL_CONSTRUCT: {
    doc: "Call a constructor (JS_CallConstructor)",
    slot_a: { name: "result", type: "JSValueSlot", doc: "Slot to store the result", usage: "out" },
    slot_b: { name: "ctor", type: "JSValueSlot", doc: "Constructor function slot", usage: "in" },
    data: {
      type: "jsvalues",
      ptr: { name: "argv", type: "JSValue*", doc: "Pointer to argument array", usage: "in" },
      len: { name: "argc", type: "uint32_t", doc: "Number of arguments", usage: "in" },
    },
  },

  EVAL: {
    doc: "Evaluate JavaScript code (JS_Eval)",
    slot_a: { name: "result", type: "JSValueSlot", doc: "Slot to store the result", usage: "out" },
    data: {
      type: "buf",
      ptr: { name: "code_ptr", type: "char*", doc: "Pointer to code string", usage: "in" },
      len: { name: "code_len", type: "uint32_t", doc: "Length of code in bytes", usage: "in" },
      extra: {
        name: "filename_and_flags",
        type: "uint32_t",
        doc: "Packed: filename_ptr (low 16) | flags (high 16)",
        usage: "in",
      },
    },
  },

  // ============================================================================
  // Error Handling (2 ops)
  // ============================================================================

  THROW: {
    doc: "Throw an exception (JS_Throw)",
    slot_a: { name: "error", type: "JSValueSlot", doc: "Error value slot to throw", usage: "in" },
  },

  RESOLVE_EXC: {
    doc: "Resolve exception - if maybe_exc is exception, return the exception value",
    slot_a: {
      name: "result",
      type: "JSValueSlot",
      doc: "Slot to store result (exception or null)",
      usage: "out",
    },
    slot_b: {
      name: "maybe_exc",
      type: "JSValueSlot",
      doc: "Value that may be an exception",
      usage: "in",
    },
  },

  // ============================================================================
  // Reference Counting (2 ops)
  // ============================================================================

  DUP: {
    doc: "Duplicate a value (JS_DupValue) - increment refcount",
    slot_a: {
      name: "result",
      type: "JSValueSlot",
      doc: "Slot to store the duplicated value",
      usage: "out",
    },
    slot_b: { name: "src", type: "JSValueSlot", doc: "Source value slot", usage: "in" },
  },

  FREE: {
    doc: "Free a value (JS_FreeValue) - decrement refcount",
    slot_a: {
      name: "slot",
      type: "JSValueSlot",
      doc: "Slot containing value to free",
      usage: "in",
    },
  },

  // ============================================================================
  // Serialization (2 ops)
  // ============================================================================

  WRITE_OBJECT: {
    doc: "Serialize a value to binary (JS_WriteObject)",
    slot_a: {
      name: "result",
      type: "JSValueSlot",
      doc: "Slot to store the ArrayBuffer result",
      usage: "out",
    },
    slot_b: { name: "val", type: "JSValueSlot", doc: "Value to serialize", usage: "in" },
    data: {
      type: "raw",
      d1: { name: "flags", type: "uint32_t", doc: "JS_WRITE_OBJ_* flags", usage: "in" },
    },
  },

  READ_OBJECT: {
    doc: "Deserialize a value from binary (JS_ReadObject)",
    slot_a: {
      name: "result",
      type: "JSValueSlot",
      doc: "Slot to store the deserialized value",
      usage: "out",
    },
    slot_b: {
      name: "data",
      type: "JSValueSlot",
      doc: "ArrayBuffer containing serialized data",
      usage: "in",
    },
    data: {
      type: "raw",
      d1: { name: "flags", type: "uint32_t", doc: "JS_READ_OBJ_* flags", usage: "in" },
    },
  },

  // ============================================================================
  // FuncList Lifecycle (3 ops)
  // ============================================================================

  FUNCLIST_NEW: {
    doc: "Allocate a new JSCFunctionListEntry array",
    slot_a: {
      name: "result",
      type: "FuncListSlot",
      doc: "Slot to store the funclist pointer",
      usage: "out",
    },
    data: {
      type: "raw",
      d1: { name: "count", type: "uint32_t", doc: "Number of entries to allocate", usage: "in" },
    },
  },

  FUNCLIST_APPLY: {
    doc: "Apply funclist to object (JS_SetPropertyFunctionList)",
    slot_a: { name: "obj", type: "JSValueSlot", doc: "Object slot", usage: "in" },
    slot_b: { name: "list", type: "FuncListSlot", doc: "Funclist slot", usage: "in" },
    data: {
      type: "raw",
      d1: { name: "count", type: "uint32_t", doc: "Number of entries", usage: "in" },
    },
  },

  FUNCLIST_FREE: {
    doc: "Free a funclist array",
    slot_a: { name: "list", type: "FuncListSlot", doc: "Funclist slot to free", usage: "in" },
  },

  // ============================================================================
  // FuncList Entry Setters (11 ops)
  // ============================================================================

  FUNCLIST_CFUNC: {
    doc: "Set funclist entry to JS_DEF_CFUNC",
    slot_a: { name: "list", type: "FuncListSlot", doc: "Funclist slot", usage: "in" },
    slot_b: { name: "length", type: "uint8_t", doc: "Function.length (arity)", usage: "in" },
    slot_c: { name: "flags", type: "uint8_t", doc: "JS_PROP_* flags", usage: "in" },
    data: {
      type: "raw",
      d1: { name: "index", type: "uint32_t", doc: "Entry index in funclist", usage: "in" },
      d2: {
        name: "name_ptr",
        type: "uint32_t",
        doc: "Function name pointer (null-terminated)",
        usage: "in",
      },
      d3: {
        name: "host_ref_id",
        type: "int32_t",
        doc: "Host reference ID for callback",
        usage: "in",
      },
    },
  },

  FUNCLIST_CFUNC_CTOR: {
    doc: "Set funclist entry to JS_DEF_CFUNC with constructor proto",
    slot_a: { name: "list", type: "FuncListSlot", doc: "Funclist slot", usage: "in" },
    slot_b: { name: "length", type: "uint8_t", doc: "Function.length (arity)", usage: "in" },
    slot_c: { name: "flags", type: "uint8_t", doc: "JS_PROP_* flags", usage: "in" },
    data: {
      type: "raw",
      d1: { name: "index", type: "uint32_t", doc: "Entry index in funclist", usage: "in" },
      d2: {
        name: "name_ptr",
        type: "uint32_t",
        doc: "Function name pointer (null-terminated)",
        usage: "in",
      },
      d3: {
        name: "host_ref_id",
        type: "int32_t",
        doc: "Host reference ID for callback",
        usage: "in",
      },
    },
  },

  FUNCLIST_CGETSET: {
    doc: "Set funclist entry to JS_DEF_CGETSET",
    slot_a: { name: "list", type: "FuncListSlot", doc: "Funclist slot", usage: "in" },
    slot_b: { name: "flags", type: "uint8_t", doc: "JS_PROP_* flags", usage: "in" },
    data: {
      type: "raw",
      d1: { name: "index", type: "uint32_t", doc: "Entry index in funclist", usage: "in" },
      d2: {
        name: "name_ptr",
        type: "uint32_t",
        doc: "Property name pointer (null-terminated)",
        usage: "in",
      },
      d3: {
        name: "getter_setter_packed",
        type: "uint32_t",
        doc: "Packed: getter_ref (low 16) | setter_ref (high 16)",
        usage: "in",
      },
    },
  },

  FUNCLIST_CGETSET_MAGIC: {
    doc: "Set funclist entry to JS_DEF_CGETSET_MAGIC",
    slot_a: { name: "list", type: "FuncListSlot", doc: "Funclist slot", usage: "in" },
    slot_b: { name: "flags", type: "uint8_t", doc: "JS_PROP_* flags", usage: "in" },
    slot_c: { name: "magic", type: "uint8_t", doc: "Magic value (low 8 bits)", usage: "in" },
    data: {
      type: "raw",
      d1: { name: "index", type: "uint32_t", doc: "Entry index in funclist", usage: "in" },
      d2: {
        name: "name_ptr",
        type: "uint32_t",
        doc: "Property name pointer (null-terminated)",
        usage: "in",
      },
      d3: {
        name: "getter_setter_packed",
        type: "uint32_t",
        doc: "Packed: getter_ref (low 16) | setter_ref (high 16)",
        usage: "in",
      },
    },
  },

  FUNCLIST_PROP_STRING: {
    doc: "Set funclist entry to JS_DEF_PROP_STRING",
    slot_a: { name: "list", type: "FuncListSlot", doc: "Funclist slot", usage: "in" },
    slot_b: { name: "flags", type: "uint8_t", doc: "JS_PROP_* flags", usage: "in" },
    data: {
      type: "raw",
      d1: { name: "index", type: "uint32_t", doc: "Entry index in funclist", usage: "in" },
      d2: {
        name: "name_ptr",
        type: "uint32_t",
        doc: "Property name pointer (null-terminated)",
        usage: "in",
      },
      d3: {
        name: "val_ptr",
        type: "uint32_t",
        doc: "String value pointer (null-terminated)",
        usage: "in",
      },
    },
  },

  FUNCLIST_PROP_INT32: {
    doc: "Set funclist entry to JS_DEF_PROP_INT32",
    slot_a: { name: "list", type: "FuncListSlot", doc: "Funclist slot", usage: "in" },
    slot_b: { name: "flags", type: "uint8_t", doc: "JS_PROP_* flags", usage: "in" },
    data: {
      type: "raw",
      d1: { name: "index", type: "uint32_t", doc: "Entry index in funclist", usage: "in" },
      d2: {
        name: "name_ptr",
        type: "uint32_t",
        doc: "Property name pointer (null-terminated)",
        usage: "in",
      },
      d3: { name: "int_val", type: "int32_t", doc: "The int32 value", usage: "in" },
    },
  },

  FUNCLIST_PROP_INT64: {
    doc: "Set funclist entry to JS_DEF_PROP_INT64 (index in slot_c)",
    slot_a: { name: "list", type: "FuncListSlot", doc: "Funclist slot", usage: "in" },
    slot_b: { name: "flags", type: "uint8_t", doc: "JS_PROP_* flags", usage: "in" },
    slot_c: { name: "index", type: "uint8_t", doc: "Entry index in funclist (0-255)", usage: "in" },
    data: {
      type: "i64",
      value: { name: "i64_val", type: "int64_t", doc: "The int64 value", usage: "in" },
      extra: {
        name: "name_ptr",
        type: "uint32_t",
        doc: "Property name pointer (null-terminated)",
        usage: "in",
      },
    },
  },

  FUNCLIST_PROP_DOUBLE: {
    doc: "Set funclist entry to JS_DEF_PROP_DOUBLE (index in slot_c)",
    slot_a: { name: "list", type: "FuncListSlot", doc: "Funclist slot", usage: "in" },
    slot_b: { name: "flags", type: "uint8_t", doc: "JS_PROP_* flags", usage: "in" },
    slot_c: { name: "index", type: "uint8_t", doc: "Entry index in funclist (0-255)", usage: "in" },
    data: {
      type: "f64",
      value: { name: "f64_val", type: "double", doc: "The double value", usage: "in" },
      extra: {
        name: "name_ptr",
        type: "uint32_t",
        doc: "Property name pointer (null-terminated)",
        usage: "in",
      },
    },
  },

  FUNCLIST_PROP_UNDEFINED: {
    doc: "Set funclist entry to JS_DEF_PROP_UNDEFINED",
    slot_a: { name: "list", type: "FuncListSlot", doc: "Funclist slot", usage: "in" },
    slot_b: { name: "flags", type: "uint8_t", doc: "JS_PROP_* flags", usage: "in" },
    data: {
      type: "raw",
      d1: { name: "index", type: "uint32_t", doc: "Entry index in funclist", usage: "in" },
      d2: {
        name: "name_ptr",
        type: "uint32_t",
        doc: "Property name pointer (null-terminated)",
        usage: "in",
      },
    },
  },

  FUNCLIST_ALIAS: {
    doc: "Set funclist entry to JS_DEF_ALIAS",
    slot_a: { name: "list", type: "FuncListSlot", doc: "Funclist slot", usage: "in" },
    slot_b: { name: "flags", type: "uint8_t", doc: "JS_PROP_* flags", usage: "in" },
    data: {
      type: "raw",
      d1: { name: "index", type: "uint32_t", doc: "Entry index in funclist", usage: "in" },
      d2: {
        name: "name_ptr",
        type: "uint32_t",
        doc: "Property name pointer (null-terminated)",
        usage: "in",
      },
      d3: {
        name: "from_ptr",
        type: "uint32_t",
        doc: "Source property name pointer (null-terminated)",
        usage: "in",
      },
    },
  },

  FUNCLIST_OBJECT: {
    doc: "Set funclist entry to JS_DEF_OBJECT (nested object with its own funclist)",
    slot_a: { name: "list", type: "FuncListSlot", doc: "Funclist slot", usage: "in" },
    slot_b: { name: "flags", type: "uint8_t", doc: "JS_PROP_* flags", usage: "in" },
    data: {
      type: "raw",
      d1: { name: "index", type: "uint32_t", doc: "Entry index in funclist", usage: "in" },
      d2: {
        name: "name_ptr",
        type: "uint32_t",
        doc: "Property name pointer (null-terminated)",
        usage: "in",
      },
      d3: {
        name: "nested_packed",
        type: "uint32_t",
        doc: "Packed: nested_list_ptr (low 16) | count (high 16)",
        usage: "in",
      },
    },
  },
} as const satisfies Record<string, CommandDef>

export type OpName = keyof typeof COMMANDS

export const OPCODE_TO_COMMAND = Object.keys(COMMANDS)
export const COMMAND_TO_OPCODE = Object.fromEntries(
  OPCODE_TO_COMMAND.map((command, opcode) => [command, opcode]),
)

if (OPCODE_TO_COMMAND.length > 256) {
  throw new Error("Too many commands: " + OPCODE_TO_COMMAND.length)
}

function COpName(name: OpName | string) {
  return `QTS_OP_${name}` as const
}

export function CFunc(name: string, command: CommandDef) {
  const lcName = lowercase_c_name(name)
  const functionName = `perform_${lcName}` as const
  const returnType = `QTS_CommandStatus` as const
  const params: Record<string, ParamDef & { path?: string[] }> = {
    /**
     * ```
     * typedef struct QTS_FuncList {
     *   JSCFunctionListEntry *entries;
     *   uint32_t count;
     * } QTS_FuncList;
     *
     * typedef struct QTS_CommandEnv {
     *   JSContext *ctx;
     *   JSValue *jsvalue_slots;
     *   uint32_t jsvalue_slots_count;
     *
     *   QTS_FuncList *funclist_slots;
     *   uint32_t funclist_slots_count;
     * } QTS_CommandEnv;
     * ```
     */
    env: {
      doc: "Command execution environment",
      name: "env",
      type: "QTS_CommandEnv*",
      usage: "in-out",
    },
  }

  const pathUsed = new Set<string>()
  const addParam = (path: string[], param: ParamDef | undefined) => {
    if (!param) {
      return
    }

    const pathString = path.join(".")
    if (pathUsed.has(pathString)) {
      throw new Error(`Path ${pathString} is used multiple times`)
    }
    pathUsed.add(pathString)

    if (param.name in params) {
      throw new Error(`Name ${param.name} is used multiple times`)
    }
    params[param.name] = {
      path,
      ...param,
    }
  }

  addParam(["cmd", "slot_a"], command.slot_a)
  addParam(["cmd", "slot_b"], command.slot_b)
  addParam(["cmd", "slot_c"], command.slot_c)
  if (command.data) {
    for (const [dataProp, dataValue] of Object.entries(command.data)) {
      if (typeof dataValue === "object") {
        addParam(["cmd", "data", command.data.type, dataProp], dataValue)
      }
    }
  }

  const signatureParams = Object.values(params)
    .map((param) => {
      if (param.type.endsWith("*")) {
        return param.type + param.name
      }
      return param.type + " " + param.name
    })
    .join(", ")
  const signature = `${returnType} ${functionName}(${signatureParams})`

  const callParams = Object.values(params)
    .map((param) => {
      if (param.path) {
        // cmd is passed by value, use . for all access
        return param.path.join(".")
      }
      return param.name
    })
    .join(", ")

  const opcodeName = COpName(name)
  const switchCase = `case ${opcodeName}: return ${functionName}(${callParams});`

  // Generate header file content
  const headerGuard = `QTS_PERFORM_${name}_H`
  const headerContent = `// Generated - do not edit
#ifndef ${headerGuard}
#define ${headerGuard}

#include "op.h"

${signature};

#endif // ${headerGuard}
`

  // Generate scaffold .c file content
  const scaffoldContent = `#include "perform_${lcName}.h"
#include "util.h"

${signature} {
    QTS_UNIMPLEMENTED(env, "${functionName}");
}
`

  // Include directive for perform_op.c
  const includeDirective = `#include "perform_${lcName}.h"`

  return {
    functionName,
    lcName,
    signature,
    switchCase,
    opcodeName,
    params,
    returnType,
    headerContent,
    scaffoldContent,
    includeDirective,
    toString: () => `CFunc(${signature}) { ${switchCase} }`,
  } as const
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
