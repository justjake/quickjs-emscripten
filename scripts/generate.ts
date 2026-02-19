#!/usr/bin/env -S npx tsx
// Generate symbols list
// Generate header file
import * as crypto from "crypto"
import * as pathlib from "path"

import * as fs from "fs-extra"
import { CFunc } from "./CFunc"
import { repoRoot } from "./helpers"
import type { CommandDataDef, CommandDef, OpName, ParamDef, ParamPath } from "./idl"
import { COMMANDS, OPCODE_TO_COMMAND, TsOpName } from "./idl"
const USAGE =
  "Usage: generate.ts [symbols | header | ffi | ops | c-ops] WRITE_PATH" +
  "\ngenerate.ts hash READ_PATH WRITE_PATH"

const rooted = (path: string) => pathlib.join(repoRoot, path)

export class Context {
  public INTERFACE_FILE_PATH = process.env.HEADER_FILE_PATH || rooted("./c/interface.c")
  public FFI_TYPES_PATH =
    process.env.FFI_TYPES_PATH || rooted("packages/quickjs-ffi-types/src/ffi-types.ts")
  public DEBUG = process.env.DEBUG === "true"
  public ASYNCIFY = process.env.ASYNCIFY === "true"
  public TYPE_ONLY = process.env.TYPE_ONLY === "true"
}

const ASSERT_SYNC_FN = "assertSync"

const INCLUDE_RE = /^#include.*$/gm
const TYPEDEF_RE = /^\s*typedef\s+(.+)$/gm
const DECL_RE = /^([\w()* ]+[\s*]+)(QTS_\w+)(\((.*?)\)) ?{$/gm
const TS_EXPORT_TYPE_RE = /^export type (\w+)/gm
const EM_JS_RE = /^\s*EM_JS\((.+), ?\{$/gm

function writeFile(filename: string, content: string) {
  if (filename === "-") {
    console.log(content)
    return
  }

  fs.writeFileSync(filename, content + "\n", "utf-8")
}

export function getMatches(context: Context) {
  const interfaceFile = fs.readFileSync(context.INTERFACE_FILE_PATH, "utf-8")
  const matches = matchAll(DECL_RE, interfaceFile)
  const includeMatches = matchAll(INCLUDE_RE, interfaceFile)
  const typedefMatches = matchAll(TYPEDEF_RE, interfaceFile)
  const emJsMatches = matchAll(EM_JS_RE, interfaceFile)
  return {
    matches,
    includeMatches,
    typedefMatches,
    emJsMatches,
  }
}

function main() {
  const [, , command, destination, hashDestination] = process.argv
  const context = new Context()

  if (!command || !destination) {
    throw new Error(USAGE)
  }

  const { matches, includeMatches, typedefMatches, emJsMatches } = getMatches(context)

  if (command === "symbols") {
    const symbols = buildSymbols(context, matches)
    writeFile(destination, JSON.stringify(symbols))
    return
  }

  if (command === "sync-symbols") {
    const symbols = buildSyncSymbols(context, matches)
    writeFile(destination, JSON.stringify(symbols))
    return
  }

  if (command === "async-callback-symbols") {
    const symbols = buildAsyncifySymbols(emJsMatches)
    writeFile(destination, JSON.stringify(symbols))
    return
  }

  if (command === "header") {
    const includes = includeMatches
      .map((match) => match[0])
      .filter((match) => !match.includes("emscripten"))
      .join("\n")
    const typedefs = typedefMatches.map((match) => match[0]).join("\n")
    const decls = matches
      .map((match) => {
        const returnType = match[1]
        const name = match[2]
        const params = match[3]
        return `${returnType}${name}${params};`
      })
      .join("\n")
    writeFile(destination, [includes, typedefs, decls].join("\n\n"))
    return
  }

  if (command === "ffi") {
    writeFile(destination, buildFFI(context, matches))
    return
  }

  if (command === "hash") {
    updateHashFile(destination, hashDestination)
    return
  }

  if (command === "ops") {
    // Use relative import if destination is in quickjs-ffi-types package
    const useRelativeImport = destination.includes("quickjs-ffi-types")
    const built = buildOpsFiles(useRelativeImport)
    writeFile(destination, built)
    return
  }

  if (command === "c-ops") {
    buildCOps(destination)
    return
  }

  throw new Error(`Bad command "${command}". ${USAGE}`)
}

// $1: attribute name
// $2: inner type
const ATTRIBUTE_REGEX = /^(\w+)\((.+)\)$/
type Attribute = "MaybeAsync" | "AsyncifyOnly" | "DebugOnly"

function parseAttributes(type: string) {
  let text = type
  let match: RegExpExecArray | null = null
  const attributes = new Set<Attribute>()
  while ((match = ATTRIBUTE_REGEX.exec(text.trim())) !== null) {
    attributes.add(match[1] as Attribute)
    text = match[2]
  }

  if (text.includes(")")) {
    throw new Error(`parseAttributes should consume all attributes, but did not: ${text}`)
  }

  return { type: text, attributes }
}

interface ParsedType {
  typescript: string
  ffi: string | null
  ctype: string
  attributes: Set<Attribute>
}

function cTypeToTypescriptType(ctype: string, branded = false): ParsedType {
  // eslint-disable-next-line prefer-const
  let { type, attributes } = parseAttributes(ctype)

  // simplify
  // remove const: ignored in JS
  type = type.replace(/\bconst\b/, "").trim()
  // collapse spaces (around a *, maybe)
  type = type.split(" ").join("")

  // IDL branded types - these map directly to their TypeScript branded equivalents
  const brandedTypes: Record<string, string> = {
    // Slot types
    JSValueSlot: "JSValueSlot",
    FuncListSlot: "FuncListSlot",
    // Flag types
    JSPropFlags: "JSPropFlags",
    SetPropFlags: "SetPropFlags",
    EvalFlags: "EvalFlags",
    NewErrorFlags: "NewErrorFlags",
    NewTypedArrayFlags: "NewTypedArrayFlags",
    // Other semantic types
    HostRefId: "HostRefId",
  }
  if (type in brandedTypes) {
    return { ffi: "number", typescript: brandedTypes[type], ctype, attributes }
  }

  // mapping
  if (type.includes("char*")) {
    return {
      ffi: "number",
      typescript: branded ? "BorrowedHeapCharPointer" : "string",
      ctype,
      attributes,
    }
  }

  // JSValue* pointer type
  if (type === "JSValue*") {
    return { ffi: "number", typescript: "JSValuePointer", ctype, attributes }
  }

  if (type === "uint32_t*") {
    return { ffi: "number", typescript: "UInt32Pointer", ctype, attributes }
  }

  if (type.startsWith("enum")) {
    return { ffi: "number", typescript: "number", ctype, attributes }
  }

  let typescript = type.replace(/\*/g, "Pointer")
  let ffi: string | null = "number"

  if (type === "bool") {
    ffi = "boolean"
    typescript = "boolean"
  }
  if (type === "void") {
    ffi = null
  }

  // Scalar types - branded or plain based on flag
  if (type === "uint8_t") {
    return { ffi: "number", typescript: branded ? "Uint8" : "number", ctype, attributes }
  }
  if (type === "uint32_t") {
    return { ffi: "number", typescript: branded ? "Uint32" : "number", ctype, attributes }
  }
  if (type === "int32_t") {
    return { ffi: "number", typescript: branded ? "Int32" : "number", ctype, attributes }
  }
  if (type === "double") {
    return { ffi: "number", typescript: branded ? "Float64" : "number", ctype, attributes }
  }
  if (type === "int64_t") {
    return { ffi: "bigint", typescript: branded ? "Int64" : "bigint", ctype, attributes }
  }

  if (type === "int" || type === "size_t" || type === "uint16_t") {
    ffi = "number"
    typescript = "number"
  }
  if (type.includes("*")) {
    ffi = "number"
  }

  return { typescript, ffi, ctype, attributes }
}

function renderFunction(args: {
  context: Context
  functionName: string
  returnType: ParsedType
  params: Array<{ name: string; type: ParsedType }>
  async: boolean
}) {
  const { functionName, returnType, params, async, context } = args
  const typescriptParams = params
    .map((param) => {
      // Allow JSValue wherever JSValueConst is accepted.
      const tsType =
        param.type.typescript === "JSValueConstPointer"
          ? "JSValuePointer | JSValueConstPointer"
          : param.type.typescript
      return `${param.name}: ${tsType}`
    })
    .join(", ")

  const forceSync = context.ASYNCIFY && !async && returnType.attributes.has("MaybeAsync")
  const markAsync = async && returnType.attributes.has("MaybeAsync")

  let typescriptFunctionName = functionName
  if (markAsync) {
    typescriptFunctionName += "_MaybeAsync"
  }

  const typescriptReturnType =
    async && returnType.attributes.has("MaybeAsync")
      ? `${returnType.typescript} | Promise<${returnType.typescript}>`
      : returnType.typescript
  const typescriptFunctionType = `(${typescriptParams}) => ${typescriptReturnType}`

  const ffiParams = JSON.stringify(params.map((param) => param.type.ffi))
  const cwrapArgs = [JSON.stringify(functionName), JSON.stringify(returnType.ffi), ffiParams]
  if (context.DEBUG && async) {
    // https://emscripten.org/docs/porting/asyncify.html#usage-with-ccall
    // Passing {async:true} to cwrap/ccall will wrap all return values in
    // Promise.resolve(...), even if the c code doesn't suspend and returns a
    // primitive value.
    //
    // When compiled with -s ASSERTIONS=1, Emscripten will throw if the
    // function suspends and {async: true} wasn't passed.
    //
    // However, we'd like to avoid Promise/async overhead if the call can
    // return a primitive value directly. So, we compile in {async:true}
    // only in DEBUG mode, where assertions are enabled.
    //
    // Then we rely on our type system to ensure our code supports both
    // primitive and promise-wrapped return values in production mode.
    cwrapArgs.push("{ async: true }")
  }

  let cwrap = `this.module.cwrap(${cwrapArgs.join(", ")})`
  if (forceSync) {
    cwrap = `${ASSERT_SYNC_FN}(${cwrap})`
  }

  let result = `  ${typescriptFunctionName}: ${typescriptFunctionType}`
  if (!context.TYPE_ONLY) {
    result += ` =\n    ${cwrap}`
  }

  return result
}

function getAvailableDefinitions(context: Context, matches: RegExpMatchArray[]) {
  const parsed = matches.map((match) => {
    const [, returnType, functionName, , rawParams] = match
    const params = parseParams(rawParams)
    return { functionName, returnType: cTypeToTypescriptType(returnType.trim()), params }
  })
  const filtered = parsed.filter((fn) => {
    if (fn.returnType.attributes.has("AsyncifyOnly")) {
      return context.ASYNCIFY
    }

    if (fn.returnType.attributes.has("DebugOnly")) {
      return context.DEBUG
    }

    return true
  })
  return filtered
}

function buildSymbols(context: Context, matches: RegExpMatchArray[]) {
  const names = getAvailableDefinitions(context, matches).map((fn) => "_" + fn.functionName)
  return names.concat("_malloc", "_free")
}

function buildSyncSymbols(context: Context, matches: RegExpMatchArray[]) {
  const parsed = getAvailableDefinitions(context, matches)
  const filtered = parsed.filter((fn) => !fn.returnType.attributes.has("MaybeAsync"))
  // Note: emscripten 5.0.1+ uses function names without underscore prefix in ASYNCIFY_REMOVE
  return filtered.map((fn) => fn.functionName)
}

// Input: EM_JS(MaybeAsync(JSValue *), qts_host_call_function, (JSContext * ctx, JSValueConst *this_ptr, int argc, JSValueConst *argv, uint32_t magic_func_id), {
// Match: MaybeAsync(JSValue *), qts_host_call_function, (JSContext * ctx, JSValueConst *this_ptr, int argc, JSValueConst *argv, uint32_t magic_func_id)
function buildAsyncifySymbols(matches: RegExpMatchArray[]) {
  const parsed = matches.map((match) => {
    const [, contents] = match
    const [returnType, functionName] = contents.split(/\s*,/g).map((x) => x.trim())
    return { functionName, returnType: cTypeToTypescriptType(returnType) }
  })
  const filtered = parsed.filter((fn) => fn.returnType.attributes.has("MaybeAsync"))
  // TODO: does this need _?
  return filtered.map((fn) => fn.functionName)
}

export function buildFFI(context: Context, matches: RegExpExecArray[]) {
  const parsed = getAvailableDefinitions(context, matches)
  const decls: string[] = []
  parsed.forEach((fn) => {
    if (!fn.returnType.attributes.has("AsyncifyOnly") || context.ASYNCIFY) {
      decls.push(renderFunction({ ...fn, async: false, context }))
    }

    if (fn.returnType.attributes.has("MaybeAsync") && context.ASYNCIFY) {
      decls.push(renderFunction({ ...fn, async: true, context }))
    }
  })

  const { FFI_TYPES_PATH, ASYNCIFY, TYPE_ONLY, DEBUG } = context
  const ffiTypes = fs.readFileSync(FFI_TYPES_PATH, "utf-8")
  const importFromFfiTypes = matchAll(TS_EXPORT_TYPE_RE, ffiTypes).map((match) => match[1])
  if (ASYNCIFY) {
    importFromFfiTypes.push(ASSERT_SYNC_FN)
  }

  const ffiClassName = ASYNCIFY ? "QuickJSAsyncFFI" : "QuickJSFFI"
  const moduleTypeName = ASYNCIFY ? "QuickJSAsyncEmscriptenModule" : "QuickJSEmscriptenModule"
  const declType = TYPE_ONLY ? "interface" : "class"
  const importFrom = TYPE_ONLY ? "." : "@jitl/quickjs-ffi-types"

  const classString = `
// This file generated by "generate.ts ffi" in the root of the repo.
import {
  ${moduleTypeName},
  ${importFromFfiTypes.join(",\n  ")}
} from "${importFrom}"

/**
 * Low-level FFI bindings to QuickJS's Emscripten module.
 * See instead {@link QuickJSContext}, the public Javascript interface exposed by this
 * library.
 *
 * @unstable The FFI interface is considered private and may change.
 */
export ${declType} ${ffiClassName} {
  ${TYPE_ONLY ? "" : `constructor(private module: ${moduleTypeName}) {}`}
  /** Set at compile time. */
  ${TYPE_ONLY ? "readonly DEBUG: boolean" : `readonly DEBUG = ${DEBUG}`}

${decls.join(TYPE_ONLY ? "\n" : "\n\n")}
}
  `.trim()
  return classString
}

function parseParams(paramListString: string) {
  if (paramListString.trim().length === 0) {
    return []
  }
  const params = paramListString.split(",")
  return params.map((paramString) => {
    const lastWord = /\b\w+$/
    const name = paramString.match(lastWord)
    const type = paramString.replace(lastWord, "").trim()
    return { name: name ? name[0] : "", type: cTypeToTypescriptType(type) }
  })
}

export function matchAll(regexp: RegExp, text: string) {
  // We're using .exec, which mutates the regexp by setting the .lastIndex
  const initialLastIndex = regexp.lastIndex
  const result: RegExpExecArray[] = []
  let match: RegExpExecArray | null = null
  while ((match = regexp.exec(text)) !== null) {
    result.push(match)
  }
  regexp.lastIndex = initialLastIndex
  return result
}

export function replaceAll(
  regexp: RegExp,
  text: string,
  replacement: (match: RegExpExecArray) => string,
) {
  const matches = matchAll(regexp, text)
  let i = 0
  const result = text.replace(regexp, () => {
    const match = matches[i]
    i++
    const result = replacement(match)
    return result
  })
  if (i !== matches.length) {
    throw new Error(`Expected ${matches.length} matches, but got ${i}`)
  }
  return result
}

function updateHashFile(src: string, dest: string) {
  const bytes = fs.readFileSync(src)
  const hash = crypto.createHash("md5").update(bytes).digest("hex") + "\n"
  try {
    const existing = fs.readFileSync(dest, "utf-8")
    if (existing === hash) {
      return
    }
  } catch (e) {
    // pass
  }
  fs.writeFileSync(dest, hash)
}

// =============================================================================
// ops.ts Generation
// =============================================================================

/** Map of setter name -> function code. Only used setters are emitted. */
const SETTER_DEFS: Record<string, string> = {
  setOpcode: `function setOpcode(view: DataView, offset: number, opcode: number): void {
  view.setUint8(offset + 0, opcode)
}`,
  setSlotA: `function setSlotA(view: DataView, offset: number, slot: number): void {
  view.setUint8(offset + 1, slot)
}`,
  setSlotB: `function setSlotB(view: DataView, offset: number, slot: number): void {
  view.setUint8(offset + 2, slot)
}`,
  setSlotC: `function setSlotC(view: DataView, offset: number, slot: number): void {
  view.setUint8(offset + 3, slot)
}`,
  setD1_u32: `function setD1_u32(view: DataView, offset: number, value: number): void {
  view.setUint32(offset + 4, value, true)
}`,
  setD1_i32: `function setD1_i32(view: DataView, offset: number, value: number): void {
  view.setInt32(offset + 4, value, true)
}`,
  setD2_u32: `function setD2_u32(view: DataView, offset: number, value: number): void {
  view.setUint32(offset + 8, value, true)
}`,
  setD2_i32: `function setD2_i32(view: DataView, offset: number, value: number): void {
  view.setInt32(offset + 8, value, true)
}`,
  setD3_u32: `function setD3_u32(view: DataView, offset: number, value: number): void {
  view.setUint32(offset + 12, value, true)
}`,
  setD3_i32: `function setD3_i32(view: DataView, offset: number, value: number): void {
  view.setInt32(offset + 12, value, true)
}`,
  setData_f64: `function setData_f64(view: DataView, offset: number, value: number): void {
  view.setFloat64(offset + 4, value, true)
}`,
  setData_i64: `function setData_i64(view: DataView, offset: number, value: bigint): void {
  view.setBigInt64(offset + 4, value, true)
}`,
}

function TSFunc(
  name: string,
  opcode: number,
  command: CommandDef,
  usedSetters: Set<string>,
  usedTypes: Set<string>,
) {
  const functionName = `write${TsOpName(name)}`
  const params: Array<{ name: string; tsType: string }> = []
  const body: string[] = []

  const useSetter = (setter: string, call: string) => {
    usedSetters.add(setter)
    body.push(call)
  }

  const tsType = (ctype: string) => {
    const ts = cTypeToTypescriptType(ctype, true).typescript
    usedTypes.add(ts)
    return ts
  }

  useSetter("setOpcode", `setOpcode(view, offset, ${opcode})`)

  // Collect params and body statements from slots
  if (command.slot_a) {
    params.push({ name: command.slot_a.name, tsType: tsType(command.slot_a.type) })
    useSetter("setSlotA", `setSlotA(view, offset, ${command.slot_a.name})`)
  }
  if (command.slot_b) {
    params.push({ name: command.slot_b.name, tsType: tsType(command.slot_b.type) })
    useSetter("setSlotB", `setSlotB(view, offset, ${command.slot_b.name})`)
  }
  if (command.slot_c) {
    params.push({ name: command.slot_c.name, tsType: tsType(command.slot_c.type) })
    useSetter("setSlotC", `setSlotC(view, offset, ${command.slot_c.name})`)
  }

  // Collect params and body from data fields
  if (command.data) {
    addDataParams(command.data, params, body, tsType, usedSetters)
  }

  const paramList =
    params.length > 0 ? `, ${params.map((p) => `${p.name}: ${p.tsType}`).join(", ")}` : ""
  const signature = `export function ${functionName}(view: DataView, offset: CommandPtr${paramList}): void`
  return { functionName, opcode, params, body, signature }
}

type WriterInfo = ReturnType<typeof TSFunc>

type WriterPatternGroup = {
  helperName: string
  params: Array<{ name: string; tsType: string }>
  normalizedBody: string[]
  writers: WriterInfo[]
}

function normalizeWriterBody(lines: readonly string[], params: readonly { name: string }[]): string[] {
  if (params.length === 0) {
    return [...lines]
  }
  const substitutions = params.map((param, idx) => ({
    pattern: new RegExp(`\\b${param.name}\\b`, "g"),
    replacement: `p${idx}`,
  }))
  return lines.map((line) => {
    let out = line
    for (const { pattern, replacement } of substitutions) {
      out = out.replace(pattern, replacement)
    }
    return out
  })
}

function renderWriterCode(writer: WriterInfo, helperName?: string): string {
  if (!helperName) {
    return `${writer.signature} {\n  ${writer.body.join("\n  ")}\n}`
  }
  const args = writer.params.map((param) => param.name).join(", ")
  const helperCall = args.length > 0 ? `${helperName}(view, offset, ${args})` : `${helperName}(view, offset)`
  return `${writer.signature} {\n  ${writer.body[0]}\n  ${helperCall}\n}`
}

function addDataParams(
  data: CommandDataDef,
  params: Array<{ name: string; tsType: string }>,
  body: string[],
  tsType: (ctype: string) => string,
  usedSetters: Set<string>,
) {
  const useSetter = (setter: string, call: string) => {
    usedSetters.add(setter)
    body.push(call)
  }

  switch (data.type) {
    case "raw":
      params.push({ name: data.d1.name, tsType: tsType(data.d1.type) })
      if (data.d1.type === "int32_t") {
        useSetter("setD1_i32", `setD1_i32(view, offset, ${data.d1.name})`)
      } else {
        useSetter("setD1_u32", `setD1_u32(view, offset, ${data.d1.name})`)
      }
      if (data.d2) {
        params.push({ name: data.d2.name, tsType: tsType(data.d2.type) })
        if (data.d2.type === "int32_t") {
          useSetter("setD2_i32", `setD2_i32(view, offset, ${data.d2.name})`)
        } else {
          useSetter("setD2_u32", `setD2_u32(view, offset, ${data.d2.name})`)
        }
      }
      if (data.d3) {
        params.push({ name: data.d3.name, tsType: tsType(data.d3.type) })
        if (data.d3.type === "int32_t") {
          useSetter("setD3_i32", `setD3_i32(view, offset, ${data.d3.name})`)
        } else {
          useSetter("setD3_u32", `setD3_u32(view, offset, ${data.d3.name})`)
        }
      }
      break

    case "f64":
      params.push({ name: data.value.name, tsType: tsType(data.value.type) })
      useSetter("setData_f64", `setData_f64(view, offset, ${data.value.name})`)
      if (data.extra) {
        params.push({ name: data.extra.name, tsType: tsType(data.extra.type) })
        useSetter("setD3_u32", `setD3_u32(view, offset, ${data.extra.name})`)
      }
      break

    case "i64":
      params.push({ name: data.value.name, tsType: tsType(data.value.type) })
      useSetter("setData_i64", `setData_i64(view, offset, ${data.value.name})`)
      if (data.extra) {
        params.push({ name: data.extra.name, tsType: tsType(data.extra.type) })
        useSetter("setD3_u32", `setD3_u32(view, offset, ${data.extra.name})`)
      }
      break

    case "buf":
      params.push({ name: data.ptr.name, tsType: tsType(data.ptr.type) })
      useSetter("setD1_u32", `setD1_u32(view, offset, ${data.ptr.name})`)
      params.push({ name: data.len.name, tsType: tsType(data.len.type) })
      useSetter("setD2_u32", `setD2_u32(view, offset, ${data.len.name})`)
      if (data.extra) {
        params.push({ name: data.extra.name, tsType: tsType(data.extra.type) })
        if (data.extra.type === "int32_t") {
          useSetter("setD3_i32", `setD3_i32(view, offset, ${data.extra.name})`)
        } else {
          useSetter("setD3_u32", `setD3_u32(view, offset, ${data.extra.name})`)
        }
      }
      break

    case "jsvalues":
      params.push({ name: data.ptr.name, tsType: tsType(data.ptr.type) })
      useSetter("setD1_u32", `setD1_u32(view, offset, ${data.ptr.name})`)
      params.push({ name: data.len.name, tsType: tsType(data.len.type) })
      useSetter("setD2_u32", `setD2_u32(view, offset, ${data.len.name})`)
      if (data.extra) {
        params.push({ name: data.extra.name, tsType: tsType(data.extra.type) })
        if (data.extra.type === "int32_t") {
          useSetter("setD3_i32", `setD3_i32(view, offset, ${data.extra.name})`)
        } else {
          useSetter("setD3_u32", `setD3_u32(view, offset, ${data.extra.name})`)
        }
      }
      break
  }
}

type ParamWithPath = {
  path: ParamPath
  param: ParamDef<any>
  isJsValuesArrayPtr: boolean
}

type RefOperand = {
  fieldName: string
  isMany: boolean
  read: boolean
  write: boolean
}

function snakeToCamel(name: string): string {
  return name.replace(/_([a-z])/g, (_m, p1: string) => p1.toUpperCase())
}

function pascalToCamel(name: string): string {
  if (name.length === 0) {
    return name
  }
  return name[0].toLowerCase() + name.slice(1)
}

function commandFieldName(param: ParamDef<any>): string {
  const fieldName = snakeToCamel(param.name)
  if (param.type === "char*" && fieldName.endsWith("Ptr")) {
    if (param.pointer.kind === "bytes") {
      return fieldName.replace(/Ptr$/, "Bytes")
    }
    return fieldName.replace(/Ptr$/, "")
  }
  return fieldName
}

function collectCommandParams(command: CommandDef): ParamWithPath[] {
  const out: ParamWithPath[] = []
  if (command.slot_a) out.push({ path: "slot_a", param: command.slot_a, isJsValuesArrayPtr: false })
  if (command.slot_b) out.push({ path: "slot_b", param: command.slot_b, isJsValuesArrayPtr: false })
  if (command.slot_c) out.push({ path: "slot_c", param: command.slot_c, isJsValuesArrayPtr: false })
  if (!command.data) return out

  switch (command.data.type) {
    case "raw":
      out.push({ path: "data.d1", param: command.data.d1, isJsValuesArrayPtr: false })
      if (command.data.d2) out.push({ path: "data.d2", param: command.data.d2, isJsValuesArrayPtr: false })
      if (command.data.d3) out.push({ path: "data.d3", param: command.data.d3, isJsValuesArrayPtr: false })
      break
    case "f64":
      out.push({ path: "data.value", param: command.data.value, isJsValuesArrayPtr: false })
      if (command.data.extra) out.push({ path: "data.extra", param: command.data.extra, isJsValuesArrayPtr: false })
      break
    case "i64":
      out.push({ path: "data.value", param: command.data.value, isJsValuesArrayPtr: false })
      if (command.data.extra) out.push({ path: "data.extra", param: command.data.extra, isJsValuesArrayPtr: false })
      break
    case "buf":
      out.push({ path: "data.ptr", param: command.data.ptr, isJsValuesArrayPtr: false })
      out.push({ path: "data.len", param: command.data.len, isJsValuesArrayPtr: false })
      if (command.data.extra) out.push({ path: "data.extra", param: command.data.extra, isJsValuesArrayPtr: false })
      break
    case "jsvalues":
      out.push({ path: "data.ptr", param: command.data.ptr, isJsValuesArrayPtr: true })
      out.push({ path: "data.len", param: command.data.len, isJsValuesArrayPtr: false })
      if (command.data.extra) out.push({ path: "data.extra", param: command.data.extra, isJsValuesArrayPtr: false })
      break
  }
  return out
}

function isRefSlotType(type: string): boolean {
  return type === "JSValueSlot" || type === "FuncListSlot"
}

function refTypeForSlot(type: string): string {
  if (type === "JSValueSlot") return "JSValueRef"
  if (type === "FuncListSlot") return "FuncListRef"
  throw new Error(`Not a slot ref type: ${type}`)
}

function commandParamType(param: ParamDef<any>, isJsValuesArrayPtr: boolean): string {
  if (param.type === "JSValueSlot") return "JSValueRef"
  if (param.type === "FuncListSlot") return "FuncListRef"
  if (param.type === "char*") {
    if (param.pointer.kind === "bytes") {
      return "Uint8Array"
    }
    return "string"
  }
  if (param.type === "JSValue*") {
    return isJsValuesArrayPtr ? "readonly JSValueRef[]" : "JSValueRef"
  }
  return cTypeToTypescriptType(param.type, false).typescript
}

function hiddenLenPaths(params: readonly ParamWithPath[]): Set<ParamPath> {
  const out = new Set<ParamPath>()
  for (const entry of params) {
    if (entry.param.type === "char*" && entry.param.pointer.kind !== "utf8.nullTerminated") {
      out.add(entry.param.pointer.lenParam)
      continue
    }
    if (entry.param.type === "JSValue*" && entry.isJsValuesArrayPtr) {
      out.add("data.len")
    }
  }
  return out
}

function collectRefOperands(params: readonly ParamWithPath[]): RefOperand[] {
  const out: RefOperand[] = []
  for (const { param, isJsValuesArrayPtr } of params) {
    const fieldName = commandFieldName(param)

    if (isRefSlotType(param.type)) {
      out.push({
        fieldName,
        isMany: false,
        read: param.usage === "in" || param.usage === "in-out",
        write: param.usage === "out" || param.usage === "in-out",
      })
      continue
    }

    if (param.type === "JSValue*") {
      out.push({
        fieldName,
        isMany: isJsValuesArrayPtr,
        read: param.usage === "in" || param.usage === "in-out",
        write: param.usage === "out" || param.usage === "in-out",
      })
    }
  }
  return out
}

function renderVisitStatements(operands: readonly RefOperand[]): string[] {
  const lines: string[] = []
  for (const operand of operands) {
    if (operand.isMany) {
      lines.push(`command.${operand.fieldName}.forEach(visit)`)
    } else {
      lines.push(`visit(command.${operand.fieldName})`)
    }
  }
  return lines
}

type CaseGroup = {
  names: string[]
  statements: string[]
}

function addCaseGroup(groups: Map<string, CaseGroup>, name: string, statements: readonly string[]): void {
  if (statements.length === 0) {
    return
  }
  const key = statements.join("\n")
  const existing = groups.get(key)
  if (existing) {
    existing.names.push(name)
    return
  }
  groups.set(key, { names: [name], statements: [...statements] })
}

function renderCaseGroups(groups: Map<string, CaseGroup>): string[] {
  const out: string[] = []
  for (const group of groups.values()) {
    for (const name of group.names) {
      out.push(`    case ${name}:`)
    }
    for (const statement of group.statements) {
      out.push(`      ${statement}`)
    }
    out.push("      return")
  }
  return out
}

function buildOpsFiles(useRelativeImport = false): string {
  const usedSetters = new Set<string>()
  const usedTypes = new Set<string>()

  // CommandPtr is always used in writer signatures
  usedTypes.add("CommandPtr")

  const writerInfos = OPCODE_TO_COMMAND.map((name, opcode) => {
    const cmd = COMMANDS[name as OpName]
    return TSFunc(name, opcode, cmd, usedSetters, usedTypes)
  })

  const writerPatternGroupsByKey = new Map<string, WriterPatternGroup>()
  let nextPatternId = 0

  for (const writer of writerInfos) {
    const nonOpcodeBody = writer.body.slice(1)
    if (nonOpcodeBody.length === 0) {
      continue
    }
    const normalizedBody = normalizeWriterBody(nonOpcodeBody, writer.params)
    const key = `${writer.params.map((param) => param.tsType).join("|")}::${normalizedBody.join("\n")}`
    const existing = writerPatternGroupsByKey.get(key)
    if (existing) {
      existing.writers.push(writer)
      continue
    }
    writerPatternGroupsByKey.set(key, {
      helperName: `writePattern${nextPatternId++}`,
      params: writer.params.map((param) => ({ ...param })),
      normalizedBody,
      writers: [writer],
    })
  }

  const writerHelperByFunction = new Map<string, string>()
  const writerPatternHelpers: string[] = []
  for (const group of writerPatternGroupsByKey.values()) {
    if (group.writers.length < 2) {
      continue
    }
    for (const writer of group.writers) {
      writerHelperByFunction.set(writer.functionName, group.helperName)
    }
    const helperParams =
      group.params.length > 0
        ? `, ${group.params.map((param, idx) => `p${idx}: ${param.tsType}`).join(", ")}`
        : ""
    writerPatternHelpers.push(
      `function ${group.helperName}(view: DataView, offset: CommandPtr${helperParams}): void {\n  ${group.normalizedBody.join(
        "\n  ",
      )}\n}`,
    )
  }

  const writers = writerInfos.map((writer) =>
    renderWriterCode(writer, writerHelperByFunction.get(writer.functionName)),
  )

  const primitiveTypes = new Set(["number", "bigint", "boolean", "string", "void", "Uint8Array"])
  const importTypes = [...usedTypes].filter((t) => !primitiveTypes.has(t)).sort()

  const importFrom = useRelativeImport ? "./ffi-types" : "@jitl/quickjs-ffi-types"
  const imports = `import type {
  ${importTypes.join(",\n  ")},
} from "${importFrom}"`

  const opcodeConsts = OPCODE_TO_COMMAND.map(
    (name, opcode) => `export const ${name} = ${opcode} as const`,
  ).join("\n")

  const commandTypeNames: string[] = []
  const commandTypeInterfaces: string[] = []
  const builderMethods: string[] = []
  const readCaseGroups = new Map<string, CaseGroup>()
  const writeCaseGroups = new Map<string, CaseGroup>()

  for (let opcode = 0; opcode < OPCODE_TO_COMMAND.length; opcode++) {
    const name = OPCODE_TO_COMMAND[opcode] as OpName
    const commandDef = COMMANDS[name]
    const typeName = `${TsOpName(name)}Command`
    commandTypeNames.push(typeName)

    const params = collectCommandParams(commandDef)
    const omittedPaths = hiddenLenPaths(params)
    const visibleParams = params.filter((entry) => !omittedPaths.has(entry.path))
    const refOperands = collectRefOperands(visibleParams)
    const readOperands = refOperands.filter((operand) => operand.read)
    const writeOperands = refOperands.filter((operand) => operand.write)

    const readStatements = renderVisitStatements(readOperands)
    const writeStatements = renderVisitStatements(writeOperands)
    addCaseGroup(readCaseGroups, name, readStatements)
    addCaseGroup(writeCaseGroups, name, writeStatements)

    const fieldRows = visibleParams.map(({ param, isJsValuesArrayPtr }) => {
      const fieldName = commandFieldName(param)
      const fieldType = commandParamType(param, isJsValuesArrayPtr)
      return `  ${fieldName}: ${fieldType}`
    })

    const interfaceLines = [
      `export interface ${typeName} extends BaseCommand {`,
      `  kind: typeof ${name}`,
      commandDef.barrier ? `  barrier: true` : "",
      ...fieldRows,
      `}`,
    ].filter(Boolean)
    commandTypeInterfaces.push(interfaceLines.join("\n"))

    const methodName = pascalToCamel(TsOpName(name))
    const methodArgs: string[] = []
    const outParamFields: Array<{ fieldName: string; slotType: string }> = []
    const fieldAssignments: string[] = []

    for (const { param, isJsValuesArrayPtr } of visibleParams) {
      const fieldName = commandFieldName(param)
      if (isRefSlotType(param.type) && param.usage === "out") {
        outParamFields.push({ fieldName, slotType: param.type })
      } else {
        methodArgs.push(`${fieldName}: ${commandParamType(param, isJsValuesArrayPtr)}`)
      }
      fieldAssignments.push(`      ${fieldName},`)
    }

    const outAlloc = outParamFields.map(({ fieldName, slotType }) => {
      if (slotType === "JSValueSlot") {
        return `    const ${fieldName} = this.allocateJsValueRef()`
      }
      return `    const ${fieldName} = this.allocateFuncListRef()`
    })

    const commandInit = [
      `    this.pushCommand({`,
      `      kind: ${name},`,
      commandDef.barrier ? `      barrier: true,` : "",
      ...fieldAssignments,
      `    } as ${typeName})`,
    ].filter(Boolean)

    let returnBlock = ""
    if (outParamFields.length === 1) {
      returnBlock = `\n    return ${outParamFields[0].fieldName}`
    } else if (outParamFields.length > 1) {
      returnBlock = `\n    return [${outParamFields.map((f) => f.fieldName).join(", ")}] as const`
    }

    const returnType =
      outParamFields.length === 0
        ? "void"
        : outParamFields.length === 1
          ? refTypeForSlot(outParamFields[0].slotType)
          : `[${outParamFields.map((f) => refTypeForSlot(f.slotType)).join(", ")}]`

    builderMethods.push(
      `  ${methodName}(${methodArgs.join(", ")}): ${returnType} {\n${[...outAlloc, ...commandInit].join(
        "\n",
      )}${returnBlock}\n  }`,
    )
  }

  const setterOrder = [
    "setOpcode",
    "setSlotA",
    "setSlotB",
    "setSlotC",
    "setD1_u32",
    "setD1_i32",
    "setD2_u32",
    "setD2_i32",
    "setD3_u32",
    "setD3_i32",
    "setData_f64",
    "setData_i64",
  ]
  const setterHelpers = setterOrder
    .filter((name) => usedSetters.has(name))
    .map((name) => SETTER_DEFS[name])
    .join("\n\n")

  const encoderArray = `export const OP_ENCODERS = [
  ${OPCODE_TO_COMMAND.map((name) => `write${TsOpName(name)}`).join(",\n  ")},
] as const`

  const commandTypes = `
export type LogicalRef = number
export type JSValueRef = LogicalRef
export type FuncListRef = LogicalRef
export type CommandRef = LogicalRef

const REF_VALUE_BITS = 24
const JS_VALUE_BANK_ID = 0
const FUNC_LIST_BANK_ID = 1

function packGeneratedRef(bankId: number, valueId: number): LogicalRef {
  return (((bankId << REF_VALUE_BITS) | valueId) >>> 0) as LogicalRef
}

interface BaseCommand {
  kind: number
  barrier?: boolean
  label?: string
}

${commandTypeInterfaces.join("\n\n")}

export type Command = ${commandTypeNames.join(" |\n  ")}

export class GeneratedCommandBuilder {
  private commands: Command[] = []
  private nextJsValueId = 1
  private nextFuncListId = 1

  private pushCommand(command: Command): void {
    this.commands.push(command)
  }

  getCommands(): readonly Command[] {
    return this.commands
  }

  takeCommands(): Command[] {
    const out = this.commands
    this.commands = []
    return out
  }

  protected allocateJsValueRef(): JSValueRef {
    const ref = packGeneratedRef(JS_VALUE_BANK_ID, this.nextJsValueId++)
    return ref as JSValueRef
  }

  protected allocateFuncListRef(): FuncListRef {
    const ref = packGeneratedRef(FUNC_LIST_BANK_ID, this.nextFuncListId++)
    return ref as FuncListRef
  }

${builderMethods.join("\n\n")}
}
`.trim()

  const plannerAccessors = `
export type RefVisitor = (ref: LogicalRef) => void

export function forEachReadRef(command: Command, visit: RefVisitor): void {
  switch (command.kind) {
${renderCaseGroups(readCaseGroups).join("\n")}
    default:
      return
  }
}

export function forEachWriteRef(command: Command, visit: RefVisitor): void {
  switch (command.kind) {
${renderCaseGroups(writeCaseGroups).join("\n")}
    default:
      return
  }
}
`.trim()

  const writerTypes = `
type OpcodeToEncoder = typeof OP_ENCODERS

type OpcodeToParams = {
  [Op in keyof OpcodeToEncoder]: OpcodeToEncoder[Op] extends (
    view: DataView,
    offset: CommandPtr,
    ...args: infer P
  ) => void
    ? P
    : never
}

export type OpcodeToCommand = {
  [Op in keyof OpcodeToParams]: { op: Op; args: OpcodeToParams[Op] }
}
`.trim()

  const ops = [
    "// This file is generated by scripts/generate.ts ops - do not edit manually",
    imports,
    opcodeConsts,
    commandTypes,
    plannerAccessors,
    "// =============================================================================",
    "// Setter Helpers",
    "// =============================================================================",
    "",
    setterHelpers,
    writerPatternHelpers.join("\n\n"),
    "// =============================================================================",
    "// Writer Functions (generated)",
    "// =============================================================================",
    "",
    ...writers,
    encoderArray,
    writerTypes,
  ].join("\n\n")

  return ops
}

// =============================================================================
// C Ops Generation (c-ops command)
// =============================================================================

/**
 * Build the op.h header file containing just the opcode enum.
 * Command struct and utilities are in the hand-authored command.h.
 */
function buildOpHeader(): string {
  const opcodeEnumEntries = OPCODE_TO_COMMAND.map((name, index) => {
    const cmd = COMMANDS[name as OpName]
    const doc = cmd.doc ? ` /** ${cmd.doc} */` : ""
    return `    QTS_OP_${name} = ${index},${doc}`
  }).join("\n")

  return `// Generated by scripts/generate.ts - do not edit
#ifndef QTS_OP_H
#define QTS_OP_H

typedef enum {
${opcodeEnumEntries}
} QTS_Opcode;

#endif // QTS_OP_H
`
}

/**
 * Build the perform_op.h header file.
 */
function buildPerformOpHeader(): string {
  return `// Generated - do not edit
#ifndef QTS_PERFORM_OP_H
#define QTS_PERFORM_OP_H

#include "command.h"

QTS_CommandStatus QTS_PerformOp(QTS_CommandEnv *env, QTS_Command cmd);

#endif // QTS_PERFORM_OP_H
`
}

/**
 * Build the perform_op.c dispatcher file.
 */
function buildPerformOpC(): string {
  // Filter out INVALID - it's handled specially
  const validOps = OPCODE_TO_COMMAND.filter((name) => name !== "INVALID")
  const cfuncs = validOps.map((name) => CFunc(name, COMMANDS[name as OpName]))

  const includes = cfuncs.map((cf) => cf.includeDirective).join("\n")
  const switchCases = cfuncs.map((cf) => `        ${cf.switchCase}`).join("\n")

  return `// Generated - do not edit
#include "perform_op.h"
${includes}

QTS_CommandStatus QTS_PerformOp(QTS_CommandEnv *env, QTS_Command cmd) {
    switch (cmd.opcode) {
        case QTS_OP_INVALID:
            env->error = "Invalid opcode (uninitialized command)";
            return QTS_COMMAND_ERROR;
${switchCases}
        default:
            env->error = "Unknown opcode";
            return QTS_COMMAND_ERROR;
    }
}
`
}

/**
 * Update the function signature and doc comment in an existing .c file while preserving the implementation body.
 * Returns the updated content, or the original content if the signature couldn't be found/updated.
 */
function updateFunctionSignature(
  content: string,
  functionName: string,
  newSignature: string,
  newDocComment: string,
): string {
  // Match an optional doc comment followed by the function definition
  // Pattern: (optional /** ... */) QTS_CommandStatus perform_xxx(...) {
  const signatureWithDocPattern = new RegExp(
    `(/\\*\\*[\\s\\S]*?\\*/\\s*)?` + // Optional doc comment (non-greedy)
      `(QTS_CommandStatus\\s+${functionName}\\s*\\([^)]*\\))\\s*\\{`,
    "s",
  )

  const match = content.match(signatureWithDocPattern)
  if (!match) {
    // Couldn't find the function signature - return unchanged
    return content
  }

  const oldDocComment = match[1] || ""
  const oldSignature = match[2]

  // Normalize whitespace for comparison
  const normalizedOldSig = oldSignature.replace(/\s+/g, " ").trim()
  const normalizedNewSig = newSignature.replace(/\s+/g, " ").trim()
  const normalizedOldDoc = oldDocComment.replace(/\s+/g, " ").trim()
  const normalizedNewDoc = newDocComment.replace(/\s+/g, " ").trim()

  if (normalizedOldSig === normalizedNewSig && normalizedOldDoc === normalizedNewDoc) {
    // Neither signature nor doc comment has changed
    return content
  }

  // Replace the old doc comment + signature with the new ones
  return content.replace(signatureWithDocPattern, `${newDocComment}\n${newSignature} {`)
}

/**
 * Build all C ops files in the specified output directory.
 */
function buildCOps(outputDir: string): void {
  // Ensure output directory exists
  fs.ensureDirSync(outputDir)

  // 1. Generate c/op.h
  const opHeaderPath = pathlib.join(outputDir, "op.h")
  fs.writeFileSync(opHeaderPath, buildOpHeader())
  console.log(`Generated ${opHeaderPath}`)

  // 2. Generate c/perform_op.h
  const performOpHeaderPath = pathlib.join(outputDir, "perform_op.h")
  fs.writeFileSync(performOpHeaderPath, buildPerformOpHeader())
  console.log(`Generated ${performOpHeaderPath}`)

  // 3. Generate c/perform_op.c
  const performOpCPath = pathlib.join(outputDir, "perform_op.c")
  fs.writeFileSync(performOpCPath, buildPerformOpC())
  console.log(`Generated ${performOpCPath}`)

  // 5. For each op, generate .h and .c files (skip INVALID - handled specially)
  let headersGenerated = 0
  let scaffoldsGenerated = 0
  let signaturesUpdated = 0
  let signaturesUnchanged = 0

  for (const name of OPCODE_TO_COMMAND) {
    if (name === "INVALID") continue
    const cf = CFunc(name, COMMANDS[name as OpName])

    // Always regenerate .h
    const headerPath = pathlib.join(outputDir, `perform_${cf.lcName}.h`)
    fs.writeFileSync(headerPath, cf.headerContent)
    headersGenerated++

    // For .c files: create if missing, or update signature if it changed
    const cPath = pathlib.join(outputDir, `perform_${cf.lcName}.c`)
    if (!fs.existsSync(cPath)) {
      fs.writeFileSync(cPath, cf.scaffoldContent)
      scaffoldsGenerated++
    } else {
      // Read existing file and try to update the function signature and doc comment
      const existingContent = fs.readFileSync(cPath, "utf-8")
      const updatedContent = updateFunctionSignature(
        existingContent,
        cf.functionName,
        cf.signature,
        cf.docComment,
      )
      if (updatedContent !== existingContent) {
        fs.writeFileSync(cPath, updatedContent)
        signaturesUpdated++
      } else {
        signaturesUnchanged++
      }
    }
  }

  console.log(
    `Generated ${headersGenerated} .h files, ${scaffoldsGenerated} new .c scaffolds, ${signaturesUpdated} signatures updated, ${signaturesUnchanged} unchanged`,
  )
}

if (require.main === module) {
  main()
}
