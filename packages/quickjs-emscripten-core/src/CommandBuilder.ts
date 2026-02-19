import {
  SetPropFlags as SetPropFlagBits,
  type HostRefId,
  type JSPropFlags,
  type SetPropFlags,
} from "@jitl/quickjs-ffi-types"
import { JSValueLifetime } from "./lifetime"
import { GeneratedCommandBuilder, type Command } from "./ops"
import type { FuncListRef, JSValueRef } from "./command-types"
import type { QuickJSContext, QuickJSPropertyKey } from "./context"
import type { QuickJSHandle } from "./types"
import type { VmFunctionImplementation } from "./vm-interface"

const JS_PROP_CONFIGURABLE = 0b00001
const JS_PROP_WRITABLE = 0b00010
const JS_PROP_ENUMERABLE = 0b00100
const SET_PROP_ASSIGNMENT = 0 as SetPropFlags

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

export class CommandBuilder extends GeneratedCommandBuilder {
  public readonly context: QuickJSContext

  private inputBindings: InputBinding[] = []
  private functionBindings: FunctionBinding[] = []
  private inputRefByHandle = new WeakMap<QuickJSHandle, JSValueRef>()
  private knownJsValueRefs = new Set<number>()
  private knownFuncListRefs = new Set<number>()

  constructor(context: QuickJSContext) {
    super()
    this.context = context
  }

  protected allocateJsValueRef(): JSValueRef {
    const ref = super.allocateJsValueRef()
    this.knownJsValueRefs.add(ref as number)
    return ref
  }

  protected allocateFuncListRef(): FuncListRef {
    const ref = super.allocateFuncListRef()
    this.knownFuncListRefs.add(ref as number)
    return ref
  }

  getCommands(): readonly Command[] {
    return super.getCommands()
  }

  getInputBindings(): readonly InputBinding[] {
    return this.inputBindings
  }

  getFunctionBindings(): readonly FunctionBinding[] {
    return this.functionBindings
  }

  clear(): void {
    super.takeCommands()
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

  newObjectRef(): JSValueRef {
    return super.newObject()
  }

  newArrayRef(): JSValueRef {
    return super.newArray()
  }

  newMapRef(): JSValueRef {
    return super.newMap()
  }

  newSetRef(): JSValueRef {
    return super.newSet()
  }

  newDateRef(timestampMs: number): JSValueRef {
    return super.newDate(timestampMs)
  }

  newNumberRef(value: number): JSValueRef {
    return super.newFloat64(value)
  }

  newStringRef(value: string): JSValueRef {
    return super.newString(value)
  }

  newBigIntRef(value: bigint): JSValueRef {
    return super.newBigint(value)
  }

  mapSetValue(target: JSValueInput, key: JSValueInput, value: JSValueInput): void {
    return super.mapSet(
      this.resolveJsValueInput(target),
      this.resolveJsValueInput(key),
      this.resolveJsValueInput(value),
    )
  }

  setAddValue(target: JSValueInput, value: JSValueInput): void {
    return super.setAdd(this.resolveJsValueInput(target), this.resolveJsValueInput(value))
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
    return super.funclistNew(count)
  }

  assignFuncList(target: JSValueInput, funclist: FuncListRef): void {
    return super.funclistAssign(this.resolveJsValueInput(target), this.resolveFuncListRef(funclist))
  }

  freeFuncList(funclist: FuncListRef): void {
    return super.funclistFree(this.resolveFuncListRef(funclist))
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
      return super.funclistDefNull(targetFunclist, flags, key, index)
    }
    if (value === undefined) {
      return super.funclistDefUndefined(targetFunclist, flags, key, index)
    }
    if (typeof value === "string") {
      return super.funclistDefString(targetFunclist, index, flags, value, key)
    }
    if (typeof value === "bigint") {
      return super.funclistDefInt64(targetFunclist, index, flags, value, key)
    }
    if (typeof value === "number") {
      if (isInt32(value)) {
        return super.funclistDefInt32(targetFunclist, flags, index, value, key)
      }
      return super.funclistDefDouble(targetFunclist, index, flags, value, key)
    }
    if (typeof value === "boolean") {
      return super.funclistDefInt32(targetFunclist, flags, index, value ? 1 : 0, key)
    }

    if (value instanceof JSValueLifetime) {
      throw new TypeError(
        "defineFuncListProp does not accept QuickJSHandle values. FuncList entries must be literals or nested `{ object: FuncListRef }` definitions.",
      )
    }

    if (typeof value === "object" && "object" in value) {
      return super.funclistDefObject(
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
      const ref = super.newFunc(fn.length, isConstructor ? 1 : 0, name ?? "", hostRefId)
      this.functionBindings.push({ ref, hostRefId, fn })
      return ref
    } catch (error) {
      this.context.runtime.hostRefs.delete(hostRefId)
      throw error
    }
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
    return super.set(targetRef, keyRouting.keyRef, valueRef, flags)
  }

  private emitSetByStringKey(
    targetRef: JSValueRef,
    key: string,
    value: Primitive | JSValueInput,
    flags: SetPropFlags,
  ): void {
    const valueRef = this.tryResolveValueRef(value)
    if (valueRef !== undefined) {
      return super.setStrValue(targetRef, valueRef, flags, key)
    }

    if (value === null) {
      return super.setStrNull(targetRef, flags, key)
    }
    if (value === undefined) {
      return super.setStrUndef(targetRef, flags, key)
    }
    if (typeof value === "boolean") {
      return super.setStrBool(targetRef, value ? 1 : 0, flags, key)
    }
    if (typeof value === "string") {
      return super.setStrString(targetRef, flags, value, key)
    }
    if (typeof value === "bigint") {
      return super.setStrBigint(targetRef, flags, value, key)
    }
    if (typeof value === "number") {
      if (isInt32(value)) {
        return super.setStrInt32(targetRef, flags, key, value)
      }
      return super.setStrF64(targetRef, flags, value, key)
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
      return super.setIdxValue(targetRef, valueRef, flags, index)
    }

    if (value === null) {
      return super.setIdxNull(targetRef, flags, index)
    }
    if (value === undefined) {
      return super.setIdxUndef(targetRef, flags, index)
    }
    if (typeof value === "boolean") {
      return super.setIdxBool(targetRef, value ? 1 : 0, flags, index)
    }
    if (typeof value === "string") {
      return super.setIdxString(targetRef, flags, value, index)
    }
    if (typeof value === "bigint") {
      return super.setIdxBigint(targetRef, flags, value, index)
    }
    if (typeof value === "number") {
      if (isInt32(value)) {
        return super.setIdxInt32(targetRef, flags, index, value)
      }
      return super.setIdxF64(targetRef, flags, value, index)
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
      return { kind: "ref", keyRef: super.newFloat64(key) }
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
        super.setStrNull(targetRef, SET_PROP_ASSIGNMENT, key),
      )
    }
    if (value === undefined) {
      return this.materializeWithTempObject((targetRef, key) =>
        super.setStrUndef(targetRef, SET_PROP_ASSIGNMENT, key),
      )
    }
    if (typeof value === "boolean") {
      return this.materializeWithTempObject((targetRef, key) =>
        super.setStrBool(targetRef, value ? 1 : 0, SET_PROP_ASSIGNMENT, key),
      )
    }
    if (typeof value === "string") {
      return super.newString(value)
    }
    if (typeof value === "bigint") {
      return super.newBigint(value)
    }
    if (typeof value === "number") {
      return super.newFloat64(value)
    }
    throw new TypeError("Unsupported primitive value")
  }

  private materializeWithTempObject(
    writeValue: (targetRef: JSValueRef, key: string) => void,
  ): JSValueRef {
    const targetRef = super.newObject()
    const key = "value"
    writeValue(targetRef, key)
    return super.getStr(targetRef, key)
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
