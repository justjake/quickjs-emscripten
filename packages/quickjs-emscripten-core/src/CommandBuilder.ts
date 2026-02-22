import type {
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
import {
  CommandRef,
  CommandRefId,
  CommandRefType,
  type FuncListRef,
  type JSValueRef,
} from "./command-types"
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

export interface InputBinding {
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
  if (!Number.isInteger(value) || value < 0 || value > 0xff) {
    throw new Error(`${name} must fit in uint8_t (positive integer <= 0xff): ${value}`)
  }
}

export class CommandBuilder {
  public readonly context: QuickJSContext

  private commands: Command[] = []
  private nextJsValueId = 1
  private nextFuncListId = 1
  private inputBindings: InputBinding[] = []
  private functionBindings: FunctionBinding[] = []
  private inputBindingByHandle = new WeakMap<QuickJSHandle, InputBinding>()
  private consumeOnSuccessHandles = new WeakSet<QuickJSHandle>()

  constructor(context: QuickJSContext) {
    this.context = context
  }

  private push(command: Command): void {
    this.commands.push(command)
  }

  private allocateJsValueRef(): JSValueRef {
    return CommandRef(JSValueSlotType, this.nextJsValueId++)
  }

  private allocateFuncListRef(): FuncListRef {
    return CommandRef(FuncListSlotType, this.nextFuncListId++)
  }

  getCommands(): readonly Command[] {
    return this.commands
  }

  getInputBindings(): readonly InputBinding[] {
    return this.inputBindings
  }

  finalizeConsumedInputs(successfulCount: number): void {
    finalizeConsumedInputBindings(this.inputBindings, this.commands, successfulCount)
  }

  getFunctionBindings(): readonly FunctionBinding[] {
    return this.functionBindings
  }

  clear(): void {
    this.commands = []
    this.nextJsValueId = 1
    this.nextFuncListId = 1
    this.inputBindings = []
    this.functionBindings = []
    this.inputBindingByHandle = new WeakMap<QuickJSHandle, InputBinding>()
    this.consumeOnSuccessHandles = new WeakSet<QuickJSHandle>()
  }

  setProp(target: JSValueInput, key: QuickJSPropertyKey, value: Primitive | QuickJSHandle): void {
    if (value instanceof JSValueLifetime) {
      return this.setOrDefineRefProp(target, key, this.bindHandle(value), SET_PROP_ASSIGNMENT)
    }
    return this.setOrDefinePrimitiveProp(target, key, value, SET_PROP_ASSIGNMENT)
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

  newObject(prototype?: JSValueInput): JSValueRef {
    const result = this.allocateJsValueRef()
    if (prototype === undefined) {
      this.push(Ops.NewObjectCmd(result))
      return result
    }
    this.push(Ops.NewObjectProtoCmd(result, this.resolveJsValueInput(prototype)))
    return result
  }

  newArray(items?: Iterable<Primitive | QuickJSHandle>): JSValueRef {
    const result = this.allocateJsValueRef()
    this.push(Ops.NewArrayCmd(result))
    if (items) {
      let index = 0
      for (const item of items) {
        this.setProp(result, index++, item)
      }
    }
    return result
  }

  newMap(): JSValueRef {
    const result = this.allocateJsValueRef()
    this.push(Ops.NewMapCmd(result))
    return result
  }

  newSet(): JSValueRef {
    const result = this.allocateJsValueRef()
    this.push(Ops.NewSetCmd(result))
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

  mapSet(target: JSValueInput, key: JSValueInput, value: JSValueInput): void {
    this.push(
      Ops.MapSetCmd(
        this.resolveJsValueInput(target),
        this.resolveJsValueInput(key),
        this.resolveJsValueInput(value),
      ),
    )
  }

  setAdd(target: JSValueInput, value: JSValueInput): void {
    this.push(Ops.SetAddCmd(this.resolveJsValueInput(target), this.resolveJsValueInput(value)))
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
    this.push(
      Ops.FunclistAssignCmd(this.resolveJsValueInput(target), this.resolveFuncListRef(funclist)),
    )
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
      this.functionBindings.push({ ref: result, hostRefId, fn })
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
    const targetRef = this.resolveJsValueInput(target)
    if (typeof key === "string") {
      return this.emitSetPrimitiveByStringKey(targetRef, key, value, flags)
    }
    if (typeof key === "number") {
      if (isUint32(key)) {
        return this.emitSetPrimitiveByIndex(targetRef, key, value, flags)
      }
      const valueRef = this.materializePrimitiveToRef(value)
      this.push(Ops.SetValueValueCmd(targetRef, this.newNumber(key), valueRef, flags))
      return
    }

    const valueRef = this.materializePrimitiveToRef(value)
    this.push(Ops.SetValueValueCmd(targetRef, this.bindHandle(key), valueRef, flags))
  }

  private setOrDefineRefProp(
    target: JSValueInput,
    key: QuickJSPropertyKey,
    value: JSValueRef,
    flags: SetPropFlags,
  ): void {
    const targetRef = this.resolveJsValueInput(target)
    const valueRef = this.resolveJsValueRef(value)
    if (typeof key === "string") {
      this.push(Ops.SetStrValueCmd(targetRef, valueRef, flags, key))
      return
    }
    if (typeof key === "number") {
      if (isUint32(key)) {
        this.push(Ops.SetIdxValueCmd(targetRef, valueRef, flags, key))
        return
      }
      this.push(Ops.SetValueValueCmd(targetRef, this.newNumber(key), valueRef, flags))
      return
    }

    this.push(Ops.SetValueValueCmd(targetRef, this.bindHandle(key), valueRef, flags))
  }

  private emitSetPrimitiveByStringKey(
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

  private emitSetPrimitiveByIndex(
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

    throw new TypeError("Unsupported value for setProp/defineProp")
  }

  private materializePrimitiveToRef(value: Primitive): JSValueRef {
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
    throw new TypeError("Unsupported primitive value")
  }

  private resolveJsValueInput(input: JSValueInput): JSValueRef {
    if (typeof input === "number") {
      if (!this.isKnownJsValueRef(input)) {
        throw new TypeError("Unknown JSValueRef")
      }
      return input
    }
    if (input instanceof JSValueLifetime) {
      return this.bindHandle(input)
    }
    throw new TypeError("Expected JSValueRef or QuickJSHandle")
  }

  private resolveJsValueRef(ref: JSValueRef): JSValueRef {
    if (typeof ref !== "number" || !this.isKnownJsValueRef(ref)) {
      throw new TypeError("Unknown JSValueRef")
    }
    return ref
  }

  private bindHandle(handle: QuickJSHandle, mode: InputBindingMode = "borrowed"): JSValueRef {
    const existing = this.inputBindingByHandle.get(handle)
    if (existing !== undefined) {
      if (existing.mode === "borrowed" && mode !== "borrowed") {
        existing.mode = mode
      }
      return existing.ref
    }
    this.context.runtime.assertOwned(handle)
    const ref = this.allocateJsValueRef()
    const binding: InputBinding = { ref, handle, mode }
    if (mode === "consume_on_success") {
      this.consumeOnSuccessHandles.add(handle)
    }
    this.inputBindingByHandle.set(handle, binding)
    this.inputBindings.push(binding)
    return ref
  }

  private isKnownJsValueRef(ref: number): boolean {
    const id = CommandRefId(ref as JSValueRef)
    return (
      CommandRefType(ref as JSValueRef) === JSValueSlotType && id >= 1 && id < this.nextJsValueId
    )
  }

  private resolveFuncListRef(ref: FuncListRef): FuncListRef {
    const id = CommandRefId(ref)
    if (CommandRefType(ref) !== FuncListSlotType || id < 1 || id >= this.nextFuncListId) {
      throw new TypeError("Unknown FuncListRef")
    }
    return ref
  }
}
