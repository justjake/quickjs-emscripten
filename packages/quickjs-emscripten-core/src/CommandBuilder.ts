import type {
  Brand,
  Float64,
  HostRefId,
  Int32,
  Int64,
  JSPropFlags,
  SetPropFlags,
  Uint32,
  Uint8,
} from "@jitl/quickjs-ffi-types"
import {
  FuncListSlotType,
  JSValueSlotType,
  SetPropFlags as SetPropFlagBits,
  SlotType,
} from "@jitl/quickjs-ffi-types"
import type { FuncListRef, JSValueRef } from "./command-types"
import { assertCommandRef, CommandRef } from "./command-types"
import type { QuickJSContext, QuickJSPropertyKey } from "./context"
import { finalizeConsumedInputBindings } from "./internal/command-input-ownership"
import { JSValueLifetime } from "./lifetime"
import type { Command } from "./ops"
import * as Ops from "./ops"
import type { QuickJSHandle } from "./types"
import type { VmFunctionImplementation } from "./vm-interface"

const JS_PROP_CONFIGURABLE = 0b00001
const JS_PROP_WRITABLE = 0b00010
const JS_PROP_ENUMERABLE = 0b00100
const SET_PROP_ASSIGNMENT = 0 as SetPropFlags

export type PlainNumber = Float64 | (number & { brand?: never })
export type Primitive = null | undefined | boolean | PlainNumber | bigint | string
export type InputBindingMode = "borrowed" | "consume_on_success"
export type JSValueInput = JSValueRef | QuickJSHandle

export interface JSValueBinding {
  ref: JSValueRef
  handle: QuickJSHandle
  mode: InputBindingMode
}

export interface FunctionBinding {
  ref: JSValueRef
  hostRefId: HostRefId
  fn: VmFunctionImplementation<QuickJSHandle>
}

export interface DefinePropOptions {
  configurable?: boolean
  enumerable?: boolean
  writable?: boolean
  throwOnError?: boolean
}

export interface DefineFuncListPropOptions {
  configurable?: boolean
  enumerable?: boolean
  writable?: boolean
}

export type FuncListPropValue = Primitive | { object: FuncListRef }

function isUint32(value: number): value is Uint32 {
  return Number.isInteger(value) && value >= 0 && value <= 0xffffffff
}

function isInt32(value: number): value is Int32 {
  return Number.isInteger(value) && value >= -2147483648 && value <= 2147483647
}

function isBigInt64(value: bigint): value is Int64 {
  return value >= -9223372036854775808n && value <= 9223372036854775807n
}

function setPropFlagsFromDefineOptions(options: DefinePropOptions | undefined): SetPropFlags {
  let flags = SetPropFlagBits.DEFINE as number
  if (options?.configurable) {
    flags |= SetPropFlagBits.CONFIGURABLE
  }
  if (options?.writable) {
    flags |= SetPropFlagBits.WRITABLE
  }
  if (options?.enumerable) {
    flags |= SetPropFlagBits.ENUMERABLE
  }
  if (options?.throwOnError) {
    flags |= SetPropFlagBits.THROW
  }
  return flags as SetPropFlags
}

function jsPropFlagsFromOptions(options: DefineFuncListPropOptions | undefined): JSPropFlags {
  let flags = 0
  if (options?.configurable) {
    flags |= JS_PROP_CONFIGURABLE
  }
  if (options?.writable) {
    flags |= JS_PROP_WRITABLE
  }
  if (options?.enumerable) {
    flags |= JS_PROP_ENUMERABLE
  }
  return flags as JSPropFlags
}

function assertUint32(value: number, name: string): asserts value is Uint32 {
  if (!isUint32(value)) {
    throw new Error(`${name} must fit in uint32_t (positive integer <= 0xffffffff): ${value}`)
  }
}

function assertUint8(value: number, name: string): asserts value is Uint8 {
  if (!isUint8(value)) {
    throw new Error(`${name} must fit in uint8_t (positive integer <= 0xff): ${value}`)
  }
}

function isUint8(value: number): value is Uint8 {
  return Number.isInteger(value) && value >= 0 && value <= 0xff
}

export type CommandIndex = Brand<number, "CommandIndex">
export type NotFound = Brand<-1, "NotFound">

// TODO: consider compact struct-of-arrays
export type RefLifetime = {
  firstRead: CommandIndex
  lastRead: CommandIndex
  reads: CommandIndex[] // todo: remove?
  producedAt: CommandIndex | NotFound
  consumedAt: CommandIndex | NotFound
}

const NOT_FOUND = -1 as NotFound

function forEachRef(
  command: Command,
  visit: (ref: CommandRef, usage: "read" | "write" | "consume") => void,
): void {
  Ops.forEachReadRef(command, (ref) => visit(ref, "read"))
  Ops.forEachWriteRef(command, (ref) => visit(ref, "write"))
  Ops.forEachConsumedRef(command, (ref) => visit(ref, "consume"))
}

function RefLifetime(commandIndex: CommandIndex): RefLifetime {
  return {
    firstRead: commandIndex,
    lastRead: commandIndex,
    reads: [],
    producedAt: NOT_FOUND,
    consumedAt: NOT_FOUND,
  }
}

export class CommandBuilder {
  public readonly context: QuickJSContext
  public readonly lifetimes = new Map<CommandRef, RefLifetime>()
  public readonly jsvalueBindings = new Map<QuickJSHandle, JSValueBinding>()
  public readonly functionBindings = new Map<
    VmFunctionImplementation<QuickJSHandle>,
    FunctionBinding
  >()

  private commands: Command[] = []
  private nextJsValueId = 1
  private nextFuncListId = 1

  constructor(context: QuickJSContext) {
    this.context = context
  }

  private push(command: Command): void {
    const commandIndex = this.commands.length as CommandIndex
    this.commands.push(command)

    forEachRef(command, (ref, usage) => {
      let lifetime = this.lifetimes.get(ref)
      if (!lifetime) {
        lifetime = RefLifetime(commandIndex)
        this.lifetimes.set(ref, lifetime)
      }
      switch (usage) {
        case "read":
          lifetime.lastRead = commandIndex
          lifetime.reads.push(commandIndex)
          break
        case "consume":
          lifetime.lastRead = commandIndex
          lifetime.reads.push(commandIndex)
          lifetime.consumedAt = commandIndex
          break
        case "write":
          lifetime.producedAt = commandIndex
          break
        default:
          unreachable(usage)
      }
    })
  }
  getCommands(): readonly Command[] {
    return this.commands
  }

  getInputBindings(): readonly JSValueBinding[] {
    return Array.from(this.jsvalueBindings.values())
  }

  finalizeConsumedInputs(successfulCount: number): void {
    finalizeConsumedInputBindings(this.getInputBindings(), this.commands, successfulCount)
  }

  getFunctionBindings(): readonly FunctionBinding[] {
    return Array.from(this.functionBindings.values())
  }

  clear(): void {
    this.commands = []
    this.nextJsValueId = 1
    this.nextFuncListId = 1
    this.jsvalueBindings.clear()
    this.functionBindings.clear()
  }

  setProp(target: JSValueInput, key: QuickJSPropertyKey, value: Primitive | QuickJSHandle): void {
    if (value instanceof JSValueLifetime) {
      return this.setOrDefineRefProp(target, key, this.bindHandle(value), SET_PROP_ASSIGNMENT)
    }
    return this.setOrDefinePrimitiveProp(target, key, value, SET_PROP_ASSIGNMENT)
  }

  setProps(
    target: JSValueInput,
    entries: Iterable<[string | number, Primitive | QuickJSHandle]>,
  ): void {
    const targetRef = this.resolveJSValue(target)
    forEach(entries, ([key, value]) => {
      this.setProp(targetRef, key, value)
    })
  }

  setPropRef(target: JSValueInput, key: QuickJSPropertyKey, value: JSValueRef): void {
    return this.setOrDefineRefProp(target, key, value, SET_PROP_ASSIGNMENT)
  }

  bindInput(handle: QuickJSHandle): JSValueRef {
    return this.bindHandle(handle)
  }

  consume(handle: QuickJSHandle): JSValueRef {
    return this.bindHandle(handle, "consume_on_success")
  }

  newObject(entries: Iterable<[string | number, Primitive | QuickJSHandle]>): JSValueRef
  newObject(prototype?: JSValueInput): JSValueRef
  newObject(
    prototype?: JSValueInput | Iterable<[string | number, Primitive | QuickJSHandle]>,
  ): JSValueRef {
    const result = this.allocateJsValueRef()
    if (prototype === undefined) {
      this.push(Ops.NewObjectCmd(result))
    } else if (prototype instanceof JSValueLifetime) {
      this.push(Ops.NewObjectProtoCmd(result, this.bindHandle(prototype)))
    } else if (typeof prototype === "number") {
      this.push(Ops.NewObjectProtoCmd(result, prototype))
    } else if (prototype && typeof prototype === "object") {
      this.setProps(result, prototype)
    } else {
      unreachable(prototype)
    }
    return result
  }

  newArray(items?: Iterable<Primitive | QuickJSHandle>): JSValueRef {
    const result = this.allocateJsValueRef()
    this.push(Ops.NewArrayCmd(result))
    if (items) {
      forEach(items, (item, index) => {
        this.setProp(result, index, item)
      })
    }
    return result
  }

  newMap(entries?: Iterable<[JSValueInput, JSValueInput]>): JSValueRef {
    const result = this.allocateJsValueRef()
    this.push(Ops.NewMapCmd(result))
    if (entries) {
      forEach(entries, ([key, value]) => {
        this.mapSet(result, key, value)
      })
    }
    return result
  }

  newSet(items?: Iterable<JSValueInput>): JSValueRef {
    const result = this.allocateJsValueRef()
    this.push(Ops.NewSetCmd(result))
    if (items) {
      forEach(items, (item) => {
        this.setAdd(result, item)
      })
    }
    return result
  }

  newDate(timestampMs: number): JSValueRef {
    const result = this.allocateJsValueRef()
    this.push(Ops.NewDateCmd(result, timestampMs))
    return result
  }

  newNumber(value: number): JSValueRef {
    const result = this.allocateJsValueRef()
    this.push(Ops.NewFloat64Cmd(result, value))
    return result
  }

  newString(value: string): JSValueRef {
    const result = this.allocateJsValueRef()
    this.push(Ops.NewStringCmd(result, value))
    return result
  }

  newBigInt(value: bigint): JSValueRef {
    const result = this.allocateJsValueRef()
    if (isBigInt64(value)) {
      this.push(Ops.NewBigintInt64Cmd(result, value))
    } else {
      this.push(Ops.NewBigintStrCmd(result, value.toString(10)))
    }
    return result
  }

  newPrimitive(value: Primitive): JSValueRef {
    if (value === null) {
      return this.bindHandle(this.context.null)
    }
    if (value === undefined) {
      return this.bindHandle(this.context.undefined)
    }
    if (typeof value === "boolean") {
      return this.bindHandle(value ? this.context.true : this.context.false)
    }
    if (typeof value === "string") {
      return this.newString(value)
    }
    if (typeof value === "bigint") {
      return this.newBigInt(value)
    }
    if (typeof value === "number") {
      return this.newNumber(value)
    }
    value satisfies never
    throw new TypeError(`Unsupported primitive value: ${typeof value}`)
  }

  Map = {
    new: (entries?: Iterable<[JSValueInput, JSValueInput]>) => this.newMap(entries),
    set: (target: JSValueInput, key: JSValueInput, value: JSValueInput) =>
      this.mapSet(target, key, value),
  } as const

  mapSet(target: JSValueInput, key: JSValueInput, value: JSValueInput): void {
    this.push(
      Ops.MapSetCmd(
        this.resolveJSValue(target),
        this.resolveJSValue(key),
        this.resolveJSValue(value),
      ),
    )
  }

  Set = {
    new: (items?: Iterable<JSValueInput>) => this.newSet(items),
    add: (target: JSValueInput, value: JSValueInput) => this.setAdd(target, value),
  } as const

  setAdd(target: JSValueInput, value: JSValueInput): void {
    this.push(Ops.SetAddCmd(this.resolveJSValue(target), this.resolveJSValue(value)))
  }

  defineProp(
    target: JSValueInput,
    key: QuickJSPropertyKey,
    value: Primitive,
    options?: DefinePropOptions,
  ): void {
    return this.setOrDefinePrimitiveProp(target, key, value, setPropFlagsFromDefineOptions(options))
  }

  definePropRef(
    target: JSValueInput,
    key: QuickJSPropertyKey,
    value: JSValueRef,
    options?: DefinePropOptions,
  ): void {
    return this.setOrDefineRefProp(target, key, value, setPropFlagsFromDefineOptions(options))
  }

  newFunction(fn: VmFunctionImplementation<QuickJSHandle>): JSValueRef
  newFunction(name: string | undefined, fn: VmFunctionImplementation<QuickJSHandle>): JSValueRef
  newFunction(
    nameOrFn: string | undefined | VmFunctionImplementation<QuickJSHandle>,
    maybeFn?: VmFunctionImplementation<QuickJSHandle>,
  ): JSValueRef {
    const fn = typeof nameOrFn === "function" ? nameOrFn : maybeFn
    if (!fn) {
      throw new TypeError("Expected a function")
    }
    const name = typeof nameOrFn === "string" ? nameOrFn : undefined
    return this.newFunctionWithRef(name, fn, false)
  }

  newConstructorFunction(fn: VmFunctionImplementation<QuickJSHandle>): JSValueRef
  newConstructorFunction(
    name: string | undefined,
    fn: VmFunctionImplementation<QuickJSHandle>,
  ): JSValueRef
  newConstructorFunction(
    nameOrFn: string | undefined | VmFunctionImplementation<QuickJSHandle>,
    maybeFn?: VmFunctionImplementation<QuickJSHandle>,
  ): JSValueRef {
    const fn = typeof nameOrFn === "function" ? nameOrFn : maybeFn
    if (!fn) {
      throw new TypeError("Expected a function")
    }
    const name = typeof nameOrFn === "string" ? nameOrFn : undefined
    return this.newFunctionWithRef(name, fn, true)
  }

  newFuncList(count: number): FuncListRef {
    assertUint32(count, "funclist count")
    const resultFunclistSlot = this.allocateFuncListRef()
    this.push(Ops.FunclistNewCmd(resultFunclistSlot, count))
    return resultFunclistSlot
  }

  assignFuncList(target: JSValueInput, funclist: FuncListRef): void {
    this.push(Ops.FunclistAssignCmd(this.resolveJSValue(target), this.resolveFuncListRef(funclist)))
  }

  freeFuncList(funclist: FuncListRef): void {
    this.push(Ops.SlotFreeCmd(this.resolveFuncListRef(funclist), SlotType.FuncListSlotType))
  }

  defineFuncListProp(
    funclist: FuncListRef,
    index: number,
    key: string,
    value: FuncListPropValue,
    options?: DefineFuncListPropOptions,
  ): void {
    const targetFunclist = this.resolveFuncListRef(funclist)
    const flags = jsPropFlagsFromOptions(options)
    assertUint32(index, "funclist entry index")

    if (value === null) {
      return this.push(Ops.FunclistDefNullCmd(targetFunclist, flags, key, index))
    }
    if (value === undefined) {
      return this.push(Ops.FunclistDefUndefinedCmd(targetFunclist, flags, key, index))
    }
    if (typeof value === "string") {
      assertUint8(index, "funclist entry index for string value")
      return this.push(Ops.FunclistDefStringCmd(targetFunclist, index, flags, value, key))
    }
    if (typeof value === "bigint") {
      assertUint8(index, "funclist entry index for bigint value")
      return this.push(Ops.FunclistDefInt64Cmd(targetFunclist, index, flags, value as Int64, key))
    }
    if (typeof value === "number") {
      if (isInt32(value)) {
        return this.push(Ops.FunclistDefInt32Cmd(targetFunclist, flags, index, value, key))
      }
      assertUint8(index, "funclist entry index for double value")
      return this.push(Ops.FunclistDefDoubleCmd(targetFunclist, index, flags, value, key))
    }
    if (typeof value === "boolean") {
      return this.push(
        Ops.FunclistDefBoolCmd(targetFunclist, flags, index, (value ? 1 : 0) as Int32, key),
      )
    }

    if (value instanceof JSValueLifetime) {
      throw new TypeError(
        "defineFuncListProp does not accept QuickJSHandle values. FuncList entries must be literals or nested `{ object: FuncListRef }` definitions.",
      )
    }

    if (typeof value === "object" && "object" in value) {
      this.push(
        Ops.FunclistDefObjectCmd(
          targetFunclist,
          this.resolveFuncListRef(value.object),
          flags,
          key,
          index,
        ),
      )
      return
    }

    throw new TypeError("Unsupported funclist property value")
  }

  private newFunctionWithRef(
    name: string | undefined,
    fn: VmFunctionImplementation<QuickJSHandle>,
    isConstructor: boolean,
  ): JSValueRef {
    const length = fn.length
    assertUint8(length, "fn.length (arity)")
    const hostRefId = this.context.runtime.hostRefs.put(fn)
    try {
      const result = this.allocateJsValueRef()
      this.push(
        Ops.NewFuncCmd(
          result,
          length,
          isConstructor ? (1 as Uint8) : (0 as Uint8),
          name ?? "",
          hostRefId,
        ),
      )
      this.functionBindings.set(fn, { ref: result, hostRefId, fn })
      return result
    } catch (error) {
      this.context.runtime.hostRefs.delete(hostRefId)
      throw error
    }
  }

  private setOrDefinePrimitiveProp(
    target: JSValueInput,
    key: QuickJSPropertyKey,
    value: Primitive,
    flags: SetPropFlags,
  ): void {
    const targetRef = this.resolveJSValue(target)
    if (typeof key === "string") {
      return this.setOrDefinePropByString(targetRef, key, value, flags)
    }
    if (typeof key === "number" && isUint32(key)) {
      return this.setOrDefinePropByIndex(targetRef, key, value, flags)
    }
    const keyRef = typeof key === "number" ? this.newNumber(key) : this.bindHandle(key)
    const valueRef = this.newPrimitive(value)
    this.push(Ops.SetValueValueCmd(targetRef, keyRef, valueRef, flags))
  }

  private setOrDefineRefProp(
    target: JSValueInput,
    key: QuickJSPropertyKey,
    value: JSValueRef,
    flags: SetPropFlags,
  ): void {
    const targetRef = this.resolveJSValue(target)
    if (typeof key === "string") {
      return this.push(Ops.SetStrValueCmd(targetRef, value, flags, key))
    }
    if (typeof key === "number") {
      if (isUint32(key)) {
        return this.push(Ops.SetIdxValueCmd(targetRef, value, flags, key))
      }
      return this.push(Ops.SetValueValueCmd(targetRef, this.newNumber(key), value, flags))
    }

    this.push(Ops.SetValueValueCmd(targetRef, this.bindHandle(key), value, flags))
  }

  private setOrDefinePropByString(
    targetRef: JSValueRef,
    key: string,
    value: Primitive,
    flags: SetPropFlags,
  ): void {
    if (value === null) {
      return this.push(Ops.SetStrNullCmd(targetRef, flags, key))
    }
    if (value === undefined) {
      return this.push(Ops.SetStrUndefCmd(targetRef, flags, key))
    }
    if (typeof value === "boolean") {
      return this.push(Ops.SetStrBoolCmd(targetRef, (value ? 1 : 0) as Uint8, flags, key))
    }
    if (typeof value === "string") {
      return this.push(Ops.SetStrStringCmd(targetRef, flags, value, key))
    }
    if (typeof value === "bigint") {
      return this.push(Ops.SetStrBigintCmd(targetRef, flags, value as Int64, key))
    }
    if (typeof value === "number") {
      if (isInt32(value)) {
        return this.push(Ops.SetStrInt32Cmd(targetRef, flags, key, value))
      }
      return this.push(Ops.SetStrF64Cmd(targetRef, flags, value, key))
    }

    throw new TypeError("Unsupported value for setProp/defineProp")
  }

  private setOrDefinePropByIndex(
    targetRef: JSValueRef,
    index: number,
    value: Primitive,
    flags: SetPropFlags,
  ): void {
    assertUint32(index, "array index")
    if (value === null) {
      return this.push(Ops.SetIdxNullCmd(targetRef, flags, index))
    }
    if (value === undefined) {
      return this.push(Ops.SetIdxUndefCmd(targetRef, flags, index))
    }
    if (typeof value === "boolean") {
      return this.push(Ops.SetIdxBoolCmd(targetRef, (value ? 1 : 0) as Uint8, flags, index))
    }
    if (typeof value === "string") {
      return this.push(Ops.SetIdxStringCmd(targetRef, flags, value, index))
    }
    if (typeof value === "bigint") {
      return this.push(Ops.SetIdxBigintCmd(targetRef, flags, value as Int64, index))
    }
    if (typeof value === "number") {
      if (isInt32(value)) {
        return this.push(Ops.SetIdxInt32Cmd(targetRef, flags, index, value))
      }
      return this.push(Ops.SetIdxF64Cmd(targetRef, flags, value, index))
    }

    throw new TypeError(`Unsupported value for setProp/defineProp: ${typeof value}`)
  }

  private allocateJsValueRef(): JSValueRef {
    return CommandRef(JSValueSlotType, this.nextJsValueId++)
  }

  private allocateFuncListRef(): FuncListRef {
    return CommandRef(FuncListSlotType, this.nextFuncListId++)
  }

  private resolveJSValue(input: JSValueInput): JSValueRef {
    if (typeof input === "number") {
      assertCommandRef(JSValueSlotType, this.nextJsValueId, input)
      return input
    }
    if (input instanceof JSValueLifetime) {
      return this.bindHandle(input)
    }
    throw new TypeError("Expected JSValueRef or QuickJSHandle")
  }

  private bindHandle(handle: QuickJSHandle, mode: InputBindingMode = "borrowed"): JSValueRef {
    const existing = this.jsvalueBindings.get(handle)
    if (existing !== undefined) {
      if (existing.mode === "borrowed" && mode !== "borrowed") {
        existing.mode = mode
      }
      return existing.ref
    }
    this.context.runtime.assertOwned(handle)
    const ref = this.allocateJsValueRef()
    const binding: JSValueBinding = { ref, handle, mode }
    if (mode === "consume_on_success") {
      binding.mode = "consume_on_success"
    }
    this.jsvalueBindings.set(handle, binding)
    return ref
  }

  private resolveFuncListRef(ref: FuncListRef): FuncListRef {
    assertCommandRef(FuncListSlotType, this.nextFuncListId, ref)
    return ref
  }
}

function unreachable(val: never): never {
  throw new Error(`Should never happen: ${typeof val === "object" ? JSON.stringify(val) : val}`)
}

function forEach<T>(iterable: Iterable<T>, callback: (item: T, index: number) => void): void {
  if (Array.isArray(iterable)) {
    iterable.forEach(callback)
  } else {
    let index = 0
    for (const item of iterable) {
      callback(item, index++)
    }
  }
}
