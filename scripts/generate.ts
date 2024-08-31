#!/usr/bin/env -S npx tsx
// Generate symbols list
// Generate header file
import * as pathlib from "path"
import * as crypto from "crypto"
import * as fs from "fs-extra"
import { repoRoot } from "./helpers"
const USAGE =
  "Usage: generate.ts [symbols | header | ffi] WRITE_PATH" +
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

function cTypeToTypescriptType(ctype: string): ParsedType {
  // eslint-disable-next-line prefer-const
  let { type, attributes } = parseAttributes(ctype)

  // simplify
  // remove const: ignored in JS
  type = type.replace(/\bconst\b/, "").trim()
  // collapse spaces (around a *, maybe)
  type = type.split(" ").join("")

  // mapping
  if (type.includes("char*")) {
    return { ffi: "string", typescript: "string", ctype, attributes }
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
  if (
    type === "double" ||
    type === "int" ||
    type === "size_t" ||
    type === "uint16_t" ||
    type === "uint32_t"
  ) {
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
  return filtered.map((fn) => "_" + fn.functionName)
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

if (require.main === module) {
  main()
}
