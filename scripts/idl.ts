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
  ptr: ParamDef<"char *">
  len: ParamDef<"uint32_t">
  extra?: ParamDef<UInt32Types>
}

type CommandDataCallDef = {
  type: "jsvalues"
  ptr: ParamDef<"JSValue *">
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
  // TODO: fill in commands.
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
  const functionName = `perform_${name}` as const
  const returnType = `qts_status` as const
  const params: Record<string, ParamDef & { path?: string[] }> = {
    /**
     * ```
     * typedef struct QTS_FuncList {
     *   JSCFunctionListEntry *entries;
     *   uint32_t count;
     * } QTS_FuncList;
     *
     * typedef struct QTS_CommandEnv {
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
      type: "qts_command_env",
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
        return param.path.join(".")
      }
      return param.name
    })
    .join(", ")

  const opcodeName = COpName(name)
  const switchCase = `case ${opcodeName}: return ${functionName}(${callParams});`

  return {
    functionName,
    signature,
    switchCase,
    opcodeName,
    params,
    returnType,
    toString: () => `CFunc(${signature}) { ${switchCase} }`,
  } as const
}
