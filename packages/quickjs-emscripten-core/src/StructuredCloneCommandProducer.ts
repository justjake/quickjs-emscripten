import { QuickJSWrongOwner } from "./errors"
import { Lifetime } from "./lifetime"
import type { QuickJSHandle } from "./types"
import * as Op from "./ops"
import {
  type CommandShape,
  DEFAULT_JS_VALUE_BANK_ID,
  REF_MAX_BANK_ID,
  type CommandOperandAccessors,
  executeCommandPlan,
  packRef,
  refBankId,
  refValueId,
  type BankId,
  type ExecuteCommandPlanOptions,
  type ExecuteCommandPlanResult,
  type LogicalRef,
  type OwnedValueId,
  type QuickJSBatchDriver,
  type SlotId,
} from "./CommandPlanner"

export const STRUCTURED_CLONE_KIND = {
  NEW_OBJECT: Op.NEW_OBJECT,
  NEW_ARRAY: Op.NEW_ARRAY,
  NEW_DATE: Op.NEW_DATE,
  NEW_FLOAT64: Op.NEW_FLOAT64,
  NEW_STRING: Op.NEW_STRING,
  NEW_BIGINT: Op.NEW_BIGINT,
  SET_STR_VALUE: Op.SET_STR_VALUE,
  SET_STR_NULL: Op.SET_STR_NULL,
  SET_STR_UNDEF: Op.SET_STR_UNDEF,
  SET_STR_BOOL: Op.SET_STR_BOOL,
  SET_STR_INT32: Op.SET_STR_INT32,
  SET_STR_F64: Op.SET_STR_F64,
  SET_STR_BIGINT: Op.SET_STR_BIGINT,
  SET_STR_STRING: Op.SET_STR_STRING,
  SET_IDX_VALUE: Op.SET_IDX_VALUE,
  SET_IDX_NULL: Op.SET_IDX_NULL,
  SET_IDX_UNDEF: Op.SET_IDX_UNDEF,
  SET_IDX_BOOL: Op.SET_IDX_BOOL,
  SET_IDX_INT32: Op.SET_IDX_INT32,
  SET_IDX_F64: Op.SET_IDX_F64,
  SET_IDX_BIGINT: Op.SET_IDX_BIGINT,
  SET_IDX_STRING: Op.SET_IDX_STRING,
  MAP_SET: Op.MAP_SET,
  SET_ADD: Op.SET_ADD,

  // Planner-only pseudo opcodes (not present in ops.ts yet)
  NEW_MAP: 1001,
  NEW_SET: 1002,
  NEW_INT32: 1003,
  NEW_BOOL: 1004,
  NEW_NULL: 1005,
  NEW_UNDEFINED: 1006,
  LOAD_HANDLE: 1007,
} as const

export type StructuredClonePayload =
  | { kind: typeof STRUCTURED_CLONE_KIND.NEW_OBJECT; resultRef: LogicalRef }
  | { kind: typeof STRUCTURED_CLONE_KIND.NEW_ARRAY; resultRef: LogicalRef }
  | { kind: typeof STRUCTURED_CLONE_KIND.NEW_MAP; resultRef: LogicalRef }
  | { kind: typeof STRUCTURED_CLONE_KIND.NEW_SET; resultRef: LogicalRef }
  | { kind: typeof STRUCTURED_CLONE_KIND.NEW_DATE; resultRef: LogicalRef; timestampMs: number }
  | { kind: typeof STRUCTURED_CLONE_KIND.NEW_FLOAT64; resultRef: LogicalRef; value: number }
  | { kind: typeof STRUCTURED_CLONE_KIND.NEW_INT32; resultRef: LogicalRef; value: number }
  | { kind: typeof STRUCTURED_CLONE_KIND.NEW_BIGINT; resultRef: LogicalRef; value: bigint }
  | { kind: typeof STRUCTURED_CLONE_KIND.NEW_STRING; resultRef: LogicalRef; value: string }
  | { kind: typeof STRUCTURED_CLONE_KIND.NEW_BOOL; resultRef: LogicalRef; value: boolean }
  | { kind: typeof STRUCTURED_CLONE_KIND.NEW_NULL; resultRef: LogicalRef }
  | { kind: typeof STRUCTURED_CLONE_KIND.NEW_UNDEFINED; resultRef: LogicalRef }
  | { kind: typeof STRUCTURED_CLONE_KIND.LOAD_HANDLE; resultRef: LogicalRef; handle: QuickJSHandle }
  | { kind: typeof STRUCTURED_CLONE_KIND.SET_STR_VALUE; targetRef: LogicalRef; valueRef: LogicalRef; key: string }
  | { kind: typeof STRUCTURED_CLONE_KIND.SET_STR_NULL; targetRef: LogicalRef; key: string }
  | { kind: typeof STRUCTURED_CLONE_KIND.SET_STR_UNDEF; targetRef: LogicalRef; key: string }
  | { kind: typeof STRUCTURED_CLONE_KIND.SET_STR_BOOL; targetRef: LogicalRef; key: string; value: boolean }
  | { kind: typeof STRUCTURED_CLONE_KIND.SET_STR_INT32; targetRef: LogicalRef; key: string; value: number }
  | { kind: typeof STRUCTURED_CLONE_KIND.SET_STR_F64; targetRef: LogicalRef; key: string; value: number }
  | { kind: typeof STRUCTURED_CLONE_KIND.SET_STR_BIGINT; targetRef: LogicalRef; key: string; value: bigint }
  | { kind: typeof STRUCTURED_CLONE_KIND.SET_STR_STRING; targetRef: LogicalRef; key: string; value: string }
  | { kind: typeof STRUCTURED_CLONE_KIND.SET_IDX_VALUE; targetRef: LogicalRef; valueRef: LogicalRef; index: number }
  | { kind: typeof STRUCTURED_CLONE_KIND.SET_IDX_NULL; targetRef: LogicalRef; index: number }
  | { kind: typeof STRUCTURED_CLONE_KIND.SET_IDX_UNDEF; targetRef: LogicalRef; index: number }
  | { kind: typeof STRUCTURED_CLONE_KIND.SET_IDX_BOOL; targetRef: LogicalRef; index: number; value: boolean }
  | { kind: typeof STRUCTURED_CLONE_KIND.SET_IDX_INT32; targetRef: LogicalRef; index: number; value: number }
  | { kind: typeof STRUCTURED_CLONE_KIND.SET_IDX_F64; targetRef: LogicalRef; index: number; value: number }
  | { kind: typeof STRUCTURED_CLONE_KIND.SET_IDX_BIGINT; targetRef: LogicalRef; index: number; value: bigint }
  | { kind: typeof STRUCTURED_CLONE_KIND.SET_IDX_STRING; targetRef: LogicalRef; index: number; value: string }
  | {
      kind: typeof STRUCTURED_CLONE_KIND.MAP_SET
      targetRef: LogicalRef
      keyRef: LogicalRef
      valueRef: LogicalRef
    }
  | { kind: typeof STRUCTURED_CLONE_KIND.SET_ADD; targetRef: LogicalRef; valueRef: LogicalRef }

export type StructuredCloneCommand = StructuredClonePayload & CommandShape

export interface StructuredCloneBuildOptions {
  move?: boolean
  targetOwner?: unknown
  jsValueBankId?: BankId
}

export interface StructuredClonePlan {
  commands: StructuredCloneCommand[]
  rootRef: LogicalRef
  rootValueId: OwnedValueId
  movedHandles: QuickJSHandle[]
}

export const STRUCTURED_CLONE_OPERAND_ACCESSORS: CommandOperandAccessors<StructuredCloneCommand> = {
  forEachReadRef(command, visit) {
    switch (command.kind) {
      case STRUCTURED_CLONE_KIND.SET_STR_VALUE:
      case STRUCTURED_CLONE_KIND.SET_IDX_VALUE:
        visit(command.targetRef)
        visit(command.valueRef)
        return
      case STRUCTURED_CLONE_KIND.MAP_SET:
        visit(command.targetRef)
        visit(command.keyRef)
        visit(command.valueRef)
        return
      case STRUCTURED_CLONE_KIND.SET_ADD:
        visit(command.targetRef)
        visit(command.valueRef)
        return
      case STRUCTURED_CLONE_KIND.SET_STR_NULL:
      case STRUCTURED_CLONE_KIND.SET_STR_UNDEF:
      case STRUCTURED_CLONE_KIND.SET_STR_BOOL:
      case STRUCTURED_CLONE_KIND.SET_STR_INT32:
      case STRUCTURED_CLONE_KIND.SET_STR_F64:
      case STRUCTURED_CLONE_KIND.SET_STR_BIGINT:
      case STRUCTURED_CLONE_KIND.SET_STR_STRING:
      case STRUCTURED_CLONE_KIND.SET_IDX_NULL:
      case STRUCTURED_CLONE_KIND.SET_IDX_UNDEF:
      case STRUCTURED_CLONE_KIND.SET_IDX_BOOL:
      case STRUCTURED_CLONE_KIND.SET_IDX_INT32:
      case STRUCTURED_CLONE_KIND.SET_IDX_F64:
      case STRUCTURED_CLONE_KIND.SET_IDX_BIGINT:
      case STRUCTURED_CLONE_KIND.SET_IDX_STRING:
        visit(command.targetRef)
        return
      default:
        return
    }
  },
  forEachWriteRef(command, visit) {
    switch (command.kind) {
      case STRUCTURED_CLONE_KIND.NEW_OBJECT:
      case STRUCTURED_CLONE_KIND.NEW_ARRAY:
      case STRUCTURED_CLONE_KIND.NEW_MAP:
      case STRUCTURED_CLONE_KIND.NEW_SET:
      case STRUCTURED_CLONE_KIND.NEW_DATE:
      case STRUCTURED_CLONE_KIND.NEW_FLOAT64:
      case STRUCTURED_CLONE_KIND.NEW_INT32:
      case STRUCTURED_CLONE_KIND.NEW_BIGINT:
      case STRUCTURED_CLONE_KIND.NEW_STRING:
      case STRUCTURED_CLONE_KIND.NEW_BOOL:
      case STRUCTURED_CLONE_KIND.NEW_NULL:
      case STRUCTURED_CLONE_KIND.NEW_UNDEFINED:
      case STRUCTURED_CLONE_KIND.LOAD_HANDLE:
        visit(command.resultRef)
        return
      default:
        return
    }
  },
  forEachConsumedReadRef(_command, _visit) {},
}

type ContainerKind = "object" | "array" | "map" | "set"

type PendingContainer = {
  kind: ContainerKind
  input: object
  valueId: OwnedValueId
}

function isQuickJSHandleLike(value: unknown): value is QuickJSHandle {
  return value instanceof Lifetime
}

function isInt32(value: number): boolean {
  return Number.isInteger(value) && value >= -2147483648 && value <= 2147483647
}

function addCommand(
  commands: StructuredCloneCommand[],
  payload: StructuredClonePayload,
): void {
  commands.push(payload)
}

function materializePrimitive(
  value: null | undefined | boolean | number | bigint | string,
  bankId: BankId,
  nextValueId: () => number,
  commands: StructuredCloneCommand[],
): OwnedValueId {
  const valueId = nextValueId()
  const writeRef = packRef(bankId, valueId)

  if (value === null) {
    addCommand(commands, { kind: STRUCTURED_CLONE_KIND.NEW_NULL, resultRef: writeRef })
    return valueId
  }
  if (value === undefined) {
    addCommand(commands, { kind: STRUCTURED_CLONE_KIND.NEW_UNDEFINED, resultRef: writeRef })
    return valueId
  }
  if (typeof value === "boolean") {
    addCommand(commands, { kind: STRUCTURED_CLONE_KIND.NEW_BOOL, value, resultRef: writeRef })
    return valueId
  }
  if (typeof value === "string") {
    addCommand(commands, { kind: STRUCTURED_CLONE_KIND.NEW_STRING, value, resultRef: writeRef })
    return valueId
  }
  if (typeof value === "bigint") {
    addCommand(commands, { kind: STRUCTURED_CLONE_KIND.NEW_BIGINT, value, resultRef: writeRef })
    return valueId
  }
  if (Number.isNaN(value) || !Number.isFinite(value)) {
    addCommand(commands, { kind: STRUCTURED_CLONE_KIND.NEW_FLOAT64, value, resultRef: writeRef })
    return valueId
  }
  if (isInt32(value)) {
    addCommand(commands, { kind: STRUCTURED_CLONE_KIND.NEW_INT32, value, resultRef: writeRef })
    return valueId
  }
  addCommand(commands, { kind: STRUCTURED_CLONE_KIND.NEW_FLOAT64, value, resultRef: writeRef })
  return valueId
}

function emitInlineObjectSet(
  commands: StructuredCloneCommand[],
  bankId: BankId,
  targetValueId: OwnedValueId,
  key: string,
  value: unknown,
): boolean {
  const targetRef = packRef(bankId, targetValueId)

  if (value === null) {
    addCommand(commands, { kind: STRUCTURED_CLONE_KIND.SET_STR_NULL, key, targetRef })
    return true
  }
  if (value === undefined) {
    addCommand(commands, { kind: STRUCTURED_CLONE_KIND.SET_STR_UNDEF, key, targetRef })
    return true
  }
  if (typeof value === "boolean") {
    addCommand(commands, { kind: STRUCTURED_CLONE_KIND.SET_STR_BOOL, key, value, targetRef })
    return true
  }
  if (typeof value === "string") {
    addCommand(commands, { kind: STRUCTURED_CLONE_KIND.SET_STR_STRING, key, value, targetRef })
    return true
  }
  if (typeof value === "bigint") {
    addCommand(commands, { kind: STRUCTURED_CLONE_KIND.SET_STR_BIGINT, key, value, targetRef })
    return true
  }
  if (typeof value === "number") {
    if (isInt32(value)) {
      addCommand(commands, { kind: STRUCTURED_CLONE_KIND.SET_STR_INT32, key, value, targetRef })
    } else {
      addCommand(commands, { kind: STRUCTURED_CLONE_KIND.SET_STR_F64, key, value, targetRef })
    }
    return true
  }
  return false
}

function emitInlineArraySet(
  commands: StructuredCloneCommand[],
  bankId: BankId,
  targetValueId: OwnedValueId,
  index: number,
  value: unknown,
): boolean {
  const targetRef = packRef(bankId, targetValueId)

  if (value === null) {
    addCommand(commands, { kind: STRUCTURED_CLONE_KIND.SET_IDX_NULL, index, targetRef })
    return true
  }
  if (value === undefined) {
    addCommand(commands, { kind: STRUCTURED_CLONE_KIND.SET_IDX_UNDEF, index, targetRef })
    return true
  }
  if (typeof value === "boolean") {
    addCommand(commands, { kind: STRUCTURED_CLONE_KIND.SET_IDX_BOOL, index, value, targetRef })
    return true
  }
  if (typeof value === "string") {
    addCommand(commands, { kind: STRUCTURED_CLONE_KIND.SET_IDX_STRING, index, value, targetRef })
    return true
  }
  if (typeof value === "bigint") {
    addCommand(commands, { kind: STRUCTURED_CLONE_KIND.SET_IDX_BIGINT, index, value, targetRef })
    return true
  }
  if (typeof value === "number") {
    if (isInt32(value)) {
      addCommand(commands, { kind: STRUCTURED_CLONE_KIND.SET_IDX_INT32, index, value, targetRef })
    } else {
      addCommand(commands, { kind: STRUCTURED_CLONE_KIND.SET_IDX_F64, index, value, targetRef })
    }
    return true
  }
  return false
}

export function buildStructuredCloneCommands(
  input: unknown,
  options: StructuredCloneBuildOptions = {},
): StructuredClonePlan {
  const move = options.move ?? false
  const jsValueBankId = options.jsValueBankId ?? DEFAULT_JS_VALUE_BANK_ID
  if (!Number.isInteger(jsValueBankId) || jsValueBankId < 0 || jsValueBankId > REF_MAX_BANK_ID) {
    throw new Error(`Invalid jsValueBankId: ${jsValueBankId}`)
  }

  const commands: StructuredCloneCommand[] = []
  const movedHandles = move ? new Set<QuickJSHandle>() : undefined
  const objectToValueId = new WeakMap<object, OwnedValueId>()
  const pendingContainers: PendingContainer[] = []

  let nextId = 0
  const nextValueId = () => {
    const id = nextId
    nextId += 1
    return id
  }

  const materializeReference = (value: unknown): OwnedValueId => {
    if (
      value === null ||
      value === undefined ||
      typeof value === "boolean" ||
      typeof value === "number" ||
      typeof value === "bigint" ||
      typeof value === "string"
    ) {
      return materializePrimitive(value, jsValueBankId, nextValueId, commands)
    }

    if (typeof value !== "object") {
      throw new TypeError(`Unsupported structuredClone value type: ${typeof value}`)
    }

    if (isQuickJSHandleLike(value)) {
      if (options.targetOwner !== undefined && value.owner && value.owner !== options.targetOwner) {
        throw new QuickJSWrongOwner("Handle is not owned by target runtime")
      }

      const existingHandleId = objectToValueId.get(value)
      if (existingHandleId !== undefined) {
        return existingHandleId
      }

      const valueId = nextValueId()
      objectToValueId.set(value, valueId)
      addCommand(
        commands,
        { kind: STRUCTURED_CLONE_KIND.LOAD_HANDLE, handle: value, resultRef: packRef(jsValueBankId, valueId) },
      )
      if (move) {
        movedHandles?.add(value)
      }
      return valueId
    }

    const existing = objectToValueId.get(value)
    if (existing !== undefined) {
      return existing
    }

    if (Array.isArray(value)) {
      const valueId = nextValueId()
      objectToValueId.set(value, valueId)
      addCommand(commands, { kind: STRUCTURED_CLONE_KIND.NEW_ARRAY, resultRef: packRef(jsValueBankId, valueId) })
      pendingContainers.push({ kind: "array", input: value, valueId })
      return valueId
    }

    if (value instanceof Date) {
      const valueId = nextValueId()
      objectToValueId.set(value, valueId)
      addCommand(
        commands,
        {
          kind: STRUCTURED_CLONE_KIND.NEW_DATE,
          timestampMs: value.getTime(),
          resultRef: packRef(jsValueBankId, valueId),
        },
      )
      return valueId
    }

    if (value instanceof Map) {
      const valueId = nextValueId()
      objectToValueId.set(value, valueId)
      addCommand(commands, { kind: STRUCTURED_CLONE_KIND.NEW_MAP, resultRef: packRef(jsValueBankId, valueId) })
      pendingContainers.push({ kind: "map", input: value, valueId })
      return valueId
    }

    if (value instanceof Set) {
      const valueId = nextValueId()
      objectToValueId.set(value, valueId)
      addCommand(commands, { kind: STRUCTURED_CLONE_KIND.NEW_SET, resultRef: packRef(jsValueBankId, valueId) })
      pendingContainers.push({ kind: "set", input: value, valueId })
      return valueId
    }

    if (ArrayBuffer.isView(value) || value instanceof ArrayBuffer) {
      throw new TypeError("Typed arrays and ArrayBuffer are not yet supported by this clone producer")
    }

    const valueId = nextValueId()
    objectToValueId.set(value, valueId)
    addCommand(commands, { kind: STRUCTURED_CLONE_KIND.NEW_OBJECT, resultRef: packRef(jsValueBankId, valueId) })
    pendingContainers.push({ kind: "object", input: value, valueId })
    return valueId
  }

  const rootValueId = materializeReference(input)
  const rootRef = packRef(jsValueBankId, rootValueId)

  for (let i = 0; i < pendingContainers.length; i++) {
    const pending = pendingContainers[i]
    const targetId = pending.valueId
    const targetRef = packRef(jsValueBankId, targetId)

    if (pending.kind === "object") {
      const source = pending.input as Record<string, unknown>
      for (const [key, value] of Object.entries(source)) {
        if (emitInlineObjectSet(commands, jsValueBankId, targetId, key, value)) {
          continue
        }
        const childId = materializeReference(value)
        addCommand(commands, {
          kind: STRUCTURED_CLONE_KIND.SET_STR_VALUE,
          key,
          targetRef,
          valueRef: packRef(jsValueBankId, childId),
        })
      }
      continue
    }

    if (pending.kind === "array") {
      const source = pending.input as unknown[]
      for (let index = 0; index < source.length; index++) {
        if (!Object.prototype.hasOwnProperty.call(source, index)) {
          continue
        }
        const value = source[index]
        if (emitInlineArraySet(commands, jsValueBankId, targetId, index, value)) {
          continue
        }
        const childId = materializeReference(value)
        addCommand(commands, {
          kind: STRUCTURED_CLONE_KIND.SET_IDX_VALUE,
          index,
          targetRef,
          valueRef: packRef(jsValueBankId, childId),
        })
      }
      continue
    }

    if (pending.kind === "map") {
      const source = pending.input as Map<unknown, unknown>
      for (const [key, value] of source.entries()) {
        const keyId = materializeReference(key)
        const valueId = materializeReference(value)
        addCommand(commands, {
          kind: STRUCTURED_CLONE_KIND.MAP_SET,
          targetRef,
          keyRef: packRef(jsValueBankId, keyId),
          valueRef: packRef(jsValueBankId, valueId),
        })
      }
      continue
    }

    if (pending.kind === "set") {
      const source = pending.input as Set<unknown>
      for (const value of source.values()) {
        const valueId = materializeReference(value)
        addCommand(commands, {
          kind: STRUCTURED_CLONE_KIND.SET_ADD,
          targetRef,
          valueRef: packRef(jsValueBankId, valueId),
        })
      }
    }
  }

  return {
    commands,
    rootRef,
    rootValueId,
    movedHandles: movedHandles ? [...movedHandles] : [],
  }
}

export interface ExecuteStructuredCloneOptions<ParkedAlias = unknown>
  extends StructuredCloneBuildOptions,
    Omit<ExecuteCommandPlanOptions<ParkedAlias, StructuredCloneCommand>, "retainedRefs" | "operandAccessors"> {}

export interface ExecuteStructuredCloneResult {
  rootRef: LogicalRef
  rootValueId: OwnedValueId
  rootSlot: SlotId
  plan: ExecuteCommandPlanResult
}

export function executeStructuredClone<ParkedAlias>(args: {
  input: unknown
  driver: QuickJSBatchDriver<StructuredCloneCommand, ParkedAlias>
  options?: ExecuteStructuredCloneOptions<ParkedAlias>
}): ExecuteStructuredCloneResult {
  const options = args.options ?? {}
  const built = buildStructuredCloneCommands(args.input, {
    move: options.move,
    targetOwner: options.targetOwner,
    jsValueBankId: options.jsValueBankId,
  })

  const plan = executeCommandPlan(built.commands, args.driver, {
    ...options,
    retainedRefs: [built.rootRef],
    operandAccessors: STRUCTURED_CLONE_OPERAND_ACCESSORS,
  })

  if (options.move) {
    for (const handle of built.movedHandles) {
      handle.dispose()
    }
  }

  const rootBank = plan.residentSlotByBankId.get(refBankId(built.rootRef))
  if (!rootBank) {
    throw new Error(`Root bank ${refBankId(built.rootRef)} has no resident slot map`)
  }

  const rootSlot = rootBank.get(refValueId(built.rootRef))
  if (rootSlot === undefined) {
    throw new Error(`Root value ${built.rootValueId} is not resident after clone execution`)
  }

  return {
    rootRef: built.rootRef,
    rootValueId: built.rootValueId,
    rootSlot,
    plan,
  }
}
