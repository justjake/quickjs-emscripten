import {
  SetPropFlags as SetPropFlagBits,
  type HostRefId,
  type JSPropFlags,
  type SetPropFlags,
} from "@jitl/quickjs-ffi-types"
import { JSValueLifetime } from "./lifetime"
import * as Ops from "./ops"
import type { Command } from "./ops"
import type { FuncListRef, JSValueRef } from "./command-types"
import type { QuickJSContext, QuickJSPropertyKey } from "./context"
import type { QuickJSHandle } from "./types"
import type { VmFunctionImplementation } from "./vm-interface"

const JS_PROP_CONFIGURABLE = 0b00001
const JS_PROP_WRITABLE = 0b00010
const JS_PROP_ENUMERABLE = 0b00100
const SET_PROP_ASSIGNMENT = 0 as SetPropFlags
const REF_VALUE_BITS = 24
const JS_VALUE_BANK_ID = 0
const FUNC_LIST_BANK_ID = 1

function packGeneratedRef(bankId: number, valueId: number): number {
  return ((bankId << REF_VALUE_BITS) | valueId) >>> 0
}

export type Primitive = null | undefined | boolean | number | bigint | string
export type JSValueInput = JSValueRef | QuickJSHandle

export interface InputBinding {
  ref: JSValueRef
  handle: QuickJSHandle
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

type KeyRouting =
  | { kind: "string"; key: string }
  | { kind: "index"; index: number }
  | { kind: "ref"; keyRef: JSValueRef }

function isArrayIndexKey(value: number): boolean {
  return Number.isInteger(value) && value >= 0 && value <= 0xffffffff
}

function isInt32(value: number): boolean {
  return Number.isInteger(value) && value >= -2147483648 && value <= 2147483647
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

export class CommandBuilder {
  public readonly context: QuickJSContext

  private commands: Command[] = []
  private nextJsValueId = 1
  private nextFuncListId = 1
  private inputBindings: InputBinding[] = []
  private functionBindings: FunctionBinding[] = []
  private inputRefByHandle = new WeakMap<QuickJSHandle, JSValueRef>()
  private knownJsValueRefs = new Set<number>()
  private knownFuncListRefs = new Set<number>()

  constructor(context: QuickJSContext) {
    this.context = context
  }

  private pushCommand(command: Command): void {
    this.commands.push(command)
  }

  private takeCommands(): Command[] {
    const out = this.commands
    this.commands = []
    return out
  }

  private allocateJsValueRef(): JSValueRef {
    const ref = packGeneratedRef(JS_VALUE_BANK_ID, this.nextJsValueId++) as JSValueRef
    this.knownJsValueRefs.add(ref as number)
    return ref
  }

  private allocateFuncListRef(): FuncListRef {
    const ref = packGeneratedRef(FUNC_LIST_BANK_ID, this.nextFuncListId++) as FuncListRef
    this.knownFuncListRefs.add(ref as number)
    return ref
  }

  getCommands(): readonly Command[] {
    return this.commands
  }

  getInputBindings(): readonly InputBinding[] {
    return this.inputBindings
  }

  getFunctionBindings(): readonly FunctionBinding[] {
    return this.functionBindings
  }

  clear(): void {
    this.takeCommands()
    this.inputBindings = []
    this.functionBindings = []
    this.inputRefByHandle = new WeakMap<QuickJSHandle, JSValueRef>()
    this.knownJsValueRefs.clear()
    this.knownFuncListRefs.clear()
  }

  setProp(target: JSValueInput, key: QuickJSPropertyKey, value: Primitive | JSValueInput): void {
    this.setOrDefineProp(target, key, value, SET_PROP_ASSIGNMENT)
  }

  bindInput(handle: QuickJSHandle): JSValueRef {
    return this.bindInputHandle(handle)
  }

  newObject(prototype?: JSValueInput): JSValueRef {
    if (prototype === undefined) {
      return this.rawNewObject()
    }
    return this.rawNewObjectProto(this.resolveJsValueInput(prototype))
  }

  newArray(): JSValueRef {
    return this.rawNewArray()
  }

  newMap(): JSValueRef {
    return this.rawNewMap()
  }

  newSet(): JSValueRef {
    return this.rawNewSet()
  }

  newDate(timestampMs: number): JSValueRef {
    return this.rawNewDate(timestampMs)
  }

  newNumber(value: number): JSValueRef {
    return this.rawNewFloat64(value)
  }

  newString(value: string): JSValueRef {
    return this.rawNewString(value)
  }

  newBigInt(value: bigint): JSValueRef {
    return this.rawNewBigint(value)
  }

  mapSet(target: JSValueInput, key: JSValueInput, value: JSValueInput): void {
    return this.rawMapSet(
      this.resolveJsValueInput(target),
      this.resolveJsValueInput(key),
      this.resolveJsValueInput(value),
    )
  }

  setAdd(target: JSValueInput, value: JSValueInput): void {
    return this.rawSetAdd(this.resolveJsValueInput(target), this.resolveJsValueInput(value))
  }

  defineProp(
    target: JSValueInput,
    key: QuickJSPropertyKey,
    value: Primitive | JSValueInput,
    options?: DefinePropOptions,
  ): void {
    this.setOrDefineProp(target, key, value, setPropFlagsFromDefineOptions(options))
  }

  newFunction(fn: VmFunctionImplementation<QuickJSHandle>): JSValueRef
  newFunction(
    name: string | undefined,
    fn: VmFunctionImplementation<QuickJSHandle>,
  ): JSValueRef
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
    return this.rawFunclistNew(count)
  }

  assignFuncList(target: JSValueInput, funclist: FuncListRef): void {
    return this.rawFunclistAssign(this.resolveJsValueInput(target), this.resolveFuncListRef(funclist))
  }

  freeFuncList(funclist: FuncListRef): void {
    return this.rawFunclistFree(this.resolveFuncListRef(funclist))
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

    if (value === null) {
      return this.rawFunclistDefNull(targetFunclist, flags, key, index)
    }
    if (value === undefined) {
      return this.rawFunclistDefUndefined(targetFunclist, flags, key, index)
    }
    if (typeof value === "string") {
      return this.rawFunclistDefString(targetFunclist, index, flags, value, key)
    }
    if (typeof value === "bigint") {
      return this.rawFunclistDefInt64(targetFunclist, index, flags, value, key)
    }
    if (typeof value === "number") {
      if (isInt32(value)) {
        return this.rawFunclistDefInt32(targetFunclist, flags, index, value, key)
      }
      return this.rawFunclistDefDouble(targetFunclist, index, flags, value, key)
    }
    if (typeof value === "boolean") {
      return this.rawFunclistDefInt32(targetFunclist, flags, index, value ? 1 : 0, key)
    }

    if (value instanceof JSValueLifetime) {
      throw new TypeError(
        "defineFuncListProp does not accept QuickJSHandle values. FuncList entries must be literals or nested `{ object: FuncListRef }` definitions.",
      )
    }

    if (typeof value === "object" && "object" in value) {
      return this.rawFunclistDefObject(
        targetFunclist,
        this.resolveFuncListRef(value.object),
        flags,
        key,
        index,
      )
    }

    throw new TypeError("Unsupported funclist property value")
  }

  private newFunctionWithRef(
    name: string | undefined,
    fn: VmFunctionImplementation<QuickJSHandle>,
    isConstructor: boolean,
  ): JSValueRef {
    const hostRefId = this.context.runtime.hostRefs.put(fn)
    try {
      const ref = this.rawNewFunc(fn.length, isConstructor ? 1 : 0, name ?? "", hostRefId)
      this.functionBindings.push({ ref, hostRefId, fn })
      return ref
    } catch (error) {
      this.context.runtime.hostRefs.delete(hostRefId)
      throw error
    }
  }

  private rawNewObject(): JSValueRef {
    const resultSlot = this.allocateJsValueRef()
    this.pushCommand(Ops.NewObjectCmd(resultSlot))
    return resultSlot
  }

  private rawNewObjectProto(protoSlot: JSValueRef): JSValueRef {
    const resultSlot = this.allocateJsValueRef()
    this.pushCommand(Ops.NewObjectProtoCmd(resultSlot, protoSlot))
    return resultSlot
  }

  private rawNewArray(): JSValueRef {
    const resultSlot = this.allocateJsValueRef()
    this.pushCommand(Ops.NewArrayCmd(resultSlot))
    return resultSlot
  }

  private rawNewMap(): JSValueRef {
    const resultSlot = this.allocateJsValueRef()
    this.pushCommand(Ops.NewMapCmd(resultSlot))
    return resultSlot
  }

  private rawNewSet(): JSValueRef {
    const resultSlot = this.allocateJsValueRef()
    this.pushCommand(Ops.NewSetCmd(resultSlot))
    return resultSlot
  }

  private rawNewDate(timestamp: number): JSValueRef {
    const resultSlot = this.allocateJsValueRef()
    this.pushCommand(Ops.NewDateCmd(resultSlot, timestamp))
    return resultSlot
  }

  private rawNewFloat64(value: number): JSValueRef {
    const resultSlot = this.allocateJsValueRef()
    this.pushCommand(Ops.NewFloat64Cmd(resultSlot, value))
    return resultSlot
  }

  private rawNewString(str: string): JSValueRef {
    const resultSlot = this.allocateJsValueRef()
    this.pushCommand(Ops.NewStringCmd(resultSlot, str))
    return resultSlot
  }

  private rawNewBigint(value: bigint): JSValueRef {
    const resultSlot = this.allocateJsValueRef()
    this.pushCommand(Ops.NewBigintCmd(resultSlot, value))
    return resultSlot
  }

  private rawNewFunc(
    arity: number,
    isConstructor: number,
    name: string,
    hostRefId: HostRefId,
  ): JSValueRef {
    const resultSlot = this.allocateJsValueRef()
    this.pushCommand(Ops.NewFuncCmd(resultSlot, arity, isConstructor, name, hostRefId))
    return resultSlot
  }

  private rawSetStrValue(
    targetSlot: JSValueRef,
    valueSlot: JSValueRef,
    flags: SetPropFlags,
    key: string,
  ): void {
    this.pushCommand(Ops.SetStrValueCmd(targetSlot, valueSlot, flags, key))
  }

  private rawSetStrNull(targetSlot: JSValueRef, flags: SetPropFlags, key: string): void {
    this.pushCommand(Ops.SetStrNullCmd(targetSlot, flags, key))
  }

  private rawSetStrUndef(targetSlot: JSValueRef, flags: SetPropFlags, key: string): void {
    this.pushCommand(Ops.SetStrUndefCmd(targetSlot, flags, key))
  }

  private rawSetStrBool(
    targetSlot: JSValueRef,
    boolVal: number,
    flags: SetPropFlags,
    key: string,
  ): void {
    this.pushCommand(Ops.SetStrBoolCmd(targetSlot, boolVal, flags, key))
  }

  private rawSetStrInt32(
    targetSlot: JSValueRef,
    flags: SetPropFlags,
    key: string,
    intVal: number,
  ): void {
    this.pushCommand(Ops.SetStrInt32Cmd(targetSlot, flags, key, intVal))
  }

  private rawSetStrF64(
    targetSlot: JSValueRef,
    flags: SetPropFlags,
    f64Val: number,
    key: string,
  ): void {
    this.pushCommand(Ops.SetStrF64Cmd(targetSlot, flags, f64Val, key))
  }

  private rawSetStrBigint(
    targetSlot: JSValueRef,
    flags: SetPropFlags,
    i64Val: bigint,
    key: string,
  ): void {
    this.pushCommand(Ops.SetStrBigintCmd(targetSlot, flags, i64Val, key))
  }

  private rawSetStrString(
    targetSlot: JSValueRef,
    flags: SetPropFlags,
    str: string,
    key: string,
  ): void {
    this.pushCommand(Ops.SetStrStringCmd(targetSlot, flags, str, key))
  }

  private rawSetIdxValue(
    targetSlot: JSValueRef,
    valueSlot: JSValueRef,
    flags: SetPropFlags,
    index: number,
  ): void {
    this.pushCommand(Ops.SetIdxValueCmd(targetSlot, valueSlot, flags, index))
  }

  private rawSetIdxNull(targetSlot: JSValueRef, flags: SetPropFlags, index: number): void {
    this.pushCommand(Ops.SetIdxNullCmd(targetSlot, flags, index))
  }

  private rawSetIdxUndef(targetSlot: JSValueRef, flags: SetPropFlags, index: number): void {
    this.pushCommand(Ops.SetIdxUndefCmd(targetSlot, flags, index))
  }

  private rawSetIdxBool(
    targetSlot: JSValueRef,
    boolVal: number,
    flags: SetPropFlags,
    index: number,
  ): void {
    this.pushCommand(Ops.SetIdxBoolCmd(targetSlot, boolVal, flags, index))
  }

  private rawSetIdxInt32(
    targetSlot: JSValueRef,
    flags: SetPropFlags,
    index: number,
    intVal: number,
  ): void {
    this.pushCommand(Ops.SetIdxInt32Cmd(targetSlot, flags, index, intVal))
  }

  private rawSetIdxF64(
    targetSlot: JSValueRef,
    flags: SetPropFlags,
    f64Val: number,
    index: number,
  ): void {
    this.pushCommand(Ops.SetIdxF64Cmd(targetSlot, flags, f64Val, index))
  }

  private rawSetIdxBigint(
    targetSlot: JSValueRef,
    flags: SetPropFlags,
    i64Val: bigint,
    index: number,
  ): void {
    this.pushCommand(Ops.SetIdxBigintCmd(targetSlot, flags, i64Val, index))
  }

  private rawSetIdxString(
    targetSlot: JSValueRef,
    flags: SetPropFlags,
    str: string,
    index: number,
  ): void {
    this.pushCommand(Ops.SetIdxStringCmd(targetSlot, flags, str, index))
  }

  private rawSet(
    targetSlot: JSValueRef,
    keySlot: JSValueRef,
    valueSlot: JSValueRef,
    flags: SetPropFlags,
  ): void {
    this.pushCommand(Ops.SetCmd(targetSlot, keySlot, valueSlot, flags))
  }

  private rawGetStr(sourceSlot: JSValueRef, key: string): JSValueRef {
    const resultSlot = this.allocateJsValueRef()
    this.pushCommand(Ops.GetStrCmd(resultSlot, sourceSlot, key))
    return resultSlot
  }

  private rawMapSet(targetSlot: JSValueRef, keySlot: JSValueRef, valueSlot: JSValueRef): void {
    this.pushCommand(Ops.MapSetCmd(targetSlot, keySlot, valueSlot))
  }

  private rawSetAdd(targetSlot: JSValueRef, valueSlot: JSValueRef): void {
    this.pushCommand(Ops.SetAddCmd(targetSlot, valueSlot))
  }

  private rawFunclistNew(count: number): FuncListRef {
    const resultFunclistSlot = this.allocateFuncListRef()
    this.pushCommand(Ops.FunclistNewCmd(resultFunclistSlot, count))
    return resultFunclistSlot
  }

  private rawFunclistAssign(targetSlot: JSValueRef, sourceFunclistSlot: FuncListRef): void {
    this.pushCommand(Ops.FunclistAssignCmd(targetSlot, sourceFunclistSlot))
  }

  private rawFunclistFree(targetFunclistSlot: FuncListRef): void {
    this.pushCommand(Ops.FunclistFreeCmd(targetFunclistSlot))
  }

  private rawFunclistDefString(
    targetFunclistSlot: FuncListRef,
    index: number,
    flags: JSPropFlags,
    str: string,
    name: string,
  ): void {
    this.pushCommand(Ops.FunclistDefStringCmd(targetFunclistSlot, index, flags, str, name))
  }

  private rawFunclistDefInt32(
    targetFunclistSlot: FuncListRef,
    flags: JSPropFlags,
    index: number,
    intVal: number,
    key: string,
  ): void {
    this.pushCommand(Ops.FunclistDefInt32Cmd(targetFunclistSlot, flags, index, intVal, key))
  }

  private rawFunclistDefInt64(
    targetFunclistSlot: FuncListRef,
    index: number,
    flags: JSPropFlags,
    i64Val: bigint,
    name: string,
  ): void {
    this.pushCommand(Ops.FunclistDefInt64Cmd(targetFunclistSlot, index, flags, i64Val, name))
  }

  private rawFunclistDefDouble(
    targetFunclistSlot: FuncListRef,
    index: number,
    flags: JSPropFlags,
    f64Val: number,
    key: string,
  ): void {
    this.pushCommand(Ops.FunclistDefDoubleCmd(targetFunclistSlot, index, flags, f64Val, key))
  }

  private rawFunclistDefNull(
    targetFunclistSlot: FuncListRef,
    flags: JSPropFlags,
    key: string,
    index: number,
  ): void {
    this.pushCommand(Ops.FunclistDefNullCmd(targetFunclistSlot, flags, key, index))
  }

  private rawFunclistDefUndefined(
    targetFunclistSlot: FuncListRef,
    flags: JSPropFlags,
    key: string,
    index: number,
  ): void {
    this.pushCommand(Ops.FunclistDefUndefinedCmd(targetFunclistSlot, flags, key, index))
  }

  private rawFunclistDefObject(
    targetFunclistSlot: FuncListRef,
    objectFunclistSlot: FuncListRef,
    flags: JSPropFlags,
    key: string,
    index: number,
  ): void {
    this.pushCommand(
      Ops.FunclistDefObjectCmd(targetFunclistSlot, objectFunclistSlot, flags, key, index),
    )
  }

  private setOrDefineProp(
    target: JSValueInput,
    key: QuickJSPropertyKey,
    value: Primitive | JSValueInput,
    flags: SetPropFlags,
  ): void {
    const targetRef = this.resolveJsValueInput(target)
    const keyRouting = this.routePropertyKey(key)

    if (keyRouting.kind === "string") {
      return this.emitSetByStringKey(targetRef, keyRouting.key, value, flags)
    }
    if (keyRouting.kind === "index") {
      return this.emitSetByIndex(targetRef, keyRouting.index, value, flags)
    }

    const valueRef = this.resolveValueRef(value)
    return this.rawSet(targetRef, keyRouting.keyRef, valueRef, flags)
  }

  private emitSetByStringKey(
    targetRef: JSValueRef,
    key: string,
    value: Primitive | JSValueInput,
    flags: SetPropFlags,
  ): void {
    const valueRef = this.tryResolveValueRef(value)
    if (valueRef !== undefined) {
      return this.rawSetStrValue(targetRef, valueRef, flags, key)
    }

    if (value === null) {
      return this.rawSetStrNull(targetRef, flags, key)
    }
    if (value === undefined) {
      return this.rawSetStrUndef(targetRef, flags, key)
    }
    if (typeof value === "boolean") {
      return this.rawSetStrBool(targetRef, value ? 1 : 0, flags, key)
    }
    if (typeof value === "string") {
      return this.rawSetStrString(targetRef, flags, value, key)
    }
    if (typeof value === "bigint") {
      return this.rawSetStrBigint(targetRef, flags, value, key)
    }
    if (typeof value === "number") {
      if (isInt32(value)) {
        return this.rawSetStrInt32(targetRef, flags, key, value)
      }
      return this.rawSetStrF64(targetRef, flags, value, key)
    }

    throw new TypeError("Unsupported value for setProp/defineProp")
  }

  private emitSetByIndex(
    targetRef: JSValueRef,
    index: number,
    value: Primitive | JSValueInput,
    flags: SetPropFlags,
  ): void {
    const valueRef = this.tryResolveValueRef(value)
    if (valueRef !== undefined) {
      return this.rawSetIdxValue(targetRef, valueRef, flags, index)
    }

    if (value === null) {
      return this.rawSetIdxNull(targetRef, flags, index)
    }
    if (value === undefined) {
      return this.rawSetIdxUndef(targetRef, flags, index)
    }
    if (typeof value === "boolean") {
      return this.rawSetIdxBool(targetRef, value ? 1 : 0, flags, index)
    }
    if (typeof value === "string") {
      return this.rawSetIdxString(targetRef, flags, value, index)
    }
    if (typeof value === "bigint") {
      return this.rawSetIdxBigint(targetRef, flags, value, index)
    }
    if (typeof value === "number") {
      if (isInt32(value)) {
        return this.rawSetIdxInt32(targetRef, flags, index, value)
      }
      return this.rawSetIdxF64(targetRef, flags, value, index)
    }

    throw new TypeError("Unsupported value for setProp/defineProp")
  }

  private routePropertyKey(key: QuickJSPropertyKey): KeyRouting {
    if (typeof key === "string") {
      return { kind: "string", key }
    }
    if (typeof key === "number") {
      if (isArrayIndexKey(key)) {
        return { kind: "index", index: key }
      }
      return { kind: "ref", keyRef: this.rawNewFloat64(key) }
    }
    return { kind: "ref", keyRef: this.bindInputHandle(key) }
  }

  private resolveValueRef(value: Primitive | JSValueInput): JSValueRef {
    const ref = this.tryResolveValueRef(value)
    if (ref !== undefined) {
      return ref
    }
    if (
      value === null ||
      value === undefined ||
      typeof value === "boolean" ||
      typeof value === "number" ||
      typeof value === "bigint" ||
      typeof value === "string"
    ) {
      return this.materializePrimitiveToRef(value)
    }
    throw new TypeError("Unsupported value for setProp/defineProp")
  }

  private tryResolveValueRef(value: Primitive | JSValueInput): JSValueRef | undefined {
    if (typeof value === "number") {
      if (this.isKnownJsValueRef(value)) {
        return value as JSValueRef
      }
      return undefined
    }
    if (value instanceof JSValueLifetime) {
      return this.bindInputHandle(value)
    }
    return undefined
  }

  private materializePrimitiveToRef(value: Primitive): JSValueRef {
    if (value === null) {
      return this.materializeWithTempObject((targetRef, key) =>
        this.rawSetStrNull(targetRef, SET_PROP_ASSIGNMENT, key),
      )
    }
    if (value === undefined) {
      return this.materializeWithTempObject((targetRef, key) =>
        this.rawSetStrUndef(targetRef, SET_PROP_ASSIGNMENT, key),
      )
    }
    if (typeof value === "boolean") {
      return this.materializeWithTempObject((targetRef, key) =>
        this.rawSetStrBool(targetRef, value ? 1 : 0, SET_PROP_ASSIGNMENT, key),
      )
    }
    if (typeof value === "string") {
      return this.rawNewString(value)
    }
    if (typeof value === "bigint") {
      return this.rawNewBigint(value)
    }
    if (typeof value === "number") {
      return this.rawNewFloat64(value)
    }
    throw new TypeError("Unsupported primitive value")
  }

  private materializeWithTempObject(
    writeValue: (targetRef: JSValueRef, key: string) => void,
  ): JSValueRef {
    const targetRef = this.rawNewObject()
    const key = "value"
    writeValue(targetRef, key)
    return this.rawGetStr(targetRef, key)
  }

  private resolveJsValueInput(input: JSValueInput): JSValueRef {
    if (typeof input === "number") {
      if (!this.isKnownJsValueRef(input)) {
        throw new TypeError("Unknown JSValueRef")
      }
      return input as JSValueRef
    }
    if (input instanceof JSValueLifetime) {
      return this.bindInputHandle(input)
    }
    throw new TypeError("Expected JSValueRef or QuickJSHandle")
  }

  private bindInputHandle(handle: QuickJSHandle): JSValueRef {
    const existing = this.inputRefByHandle.get(handle)
    if (existing !== undefined) {
      return existing
    }
    this.context.runtime.assertOwned(handle)
    const ref = this.allocateJsValueRef()
    this.inputRefByHandle.set(handle, ref)
    this.inputBindings.push({ ref, handle })
    return ref
  }

  private isKnownJsValueRef(value: number): boolean {
    return this.knownJsValueRefs.has(value)
  }

  private resolveFuncListRef(ref: FuncListRef): FuncListRef {
    if (!this.knownFuncListRefs.has(ref as number)) {
      throw new TypeError("Unknown FuncListRef")
    }
    return ref
  }
}
