import type { CommandDef, ParamDef } from "./idl"
import { COpName, lowercase_c_name } from "./idl"

/**
 * Get the raw C type for a path in the QTS_Command struct.
 * This is the actual type in the struct, not the semantic type from the IDL.
 */
function getRawCType(path: string[]): string {
  const key = path.join(".")
  const rawTypes: Record<string, string> = {
    "cmd.slot_a": "uint8_t",
    "cmd.slot_b": "uint8_t",
    "cmd.slot_c": "uint8_t",
    "cmd.data.raw.d1": "uint32_t",
    "cmd.data.raw.d2": "uint32_t",
    "cmd.data.raw.d3": "uint32_t",
    "cmd.data.f64.value": "double",
    "cmd.data.f64.extra": "uint32_t",
    "cmd.data.i64.value": "int64_t",
    "cmd.data.i64.extra": "uint32_t",
    "cmd.data.buf.ptr": "char*",
    "cmd.data.buf.len": "uint32_t",
    "cmd.data.buf.extra": "uint32_t",
    "cmd.data.jsvalues.ptr": "JSValue*",
    "cmd.data.jsvalues.len": "uint32_t",
    "cmd.data.jsvalues.extra": "uint32_t",
  }
  return rawTypes[key] ?? "unknown"
}

/**
 * Generate a C expression to extract a value from a path, with casting if needed.
 * - If semantic type matches raw type: just return the path
 * - If semantic type is a pointer: cast with (type)path
 * - Uint16Pair: reinterpret uint32_t as struct via pointer cast
 */
function cExtractExpr(path: string[], semanticType: string): string {
  const pathExpr = path.join(".")
  const rawType = getRawCType(path)

  if (semanticType === rawType) {
    return pathExpr
  }

  if (semanticType === "Uint16Pair") {
    // Reinterpret uint32_t as Uint16Pair struct
    return `*(Uint16Pair*)&${pathExpr}`
  }

  if (semanticType.endsWith("*")) {
    // Pointer cast
    return `(${semanticType})${pathExpr}`
  }

  // Default: simple cast for other scalar types
  return `(${semanticType})${pathExpr}`
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
      const stars = param.type.match(/\*+$/g)?.length || 0
      if (stars > 0) {
        return param.type.slice(0, -stars) + " " + "*".repeat(stars) + param.name
      }
      return param.type + " " + param.name
    })
    .join(", ")
  const signature = `${returnType} ${functionName}(${signatureParams})`

  const callParams = Object.values(params)
    .map((param) => {
      if (param.path) {
        // Extract value from cmd struct, with casting if needed
        return cExtractExpr(param.path, param.type)
      }
      return param.name
    })
    .join(", ")

  const opcodeName = COpName(name)
  const switchCase = `case ${opcodeName}: return ${functionName}(${callParams});`

  let docComment = `/**`
  docComment += `\n * ${command.doc}`
  Object.values(params).forEach((param) => {
    docComment += `\n * @param ${param.name} ${param.doc}`
  })
  docComment += "\n */"

  // Generate header file content
  const headerGuard = `QTS_PERFORM_${name}_H`
  const headerContent = `// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run generate:c-ops'
#ifndef ${headerGuard}
#define ${headerGuard}

#include "command.h"

${docComment}
${signature};

#endif // ${headerGuard}
`

  // Generate scaffold .c file content
  // Note: op.h (included via perform_*.h) provides OP_UNIMPLEMENTED and qts_utils.h
  const scaffoldContent = `#include "perform_${lcName}.h"

// Perform op ${name}
// To change function signature, update scripts/idl.ts and run 'pnpm run generate:c-ops'.
// Add new utilities to qts_utils.{h,c} if needed.

${docComment}
${signature} {
    OP_UNIMPLEMENTED(env, "${functionName}");
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
