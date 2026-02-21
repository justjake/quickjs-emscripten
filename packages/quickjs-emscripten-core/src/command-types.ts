import type { Brand, FuncListSlotType, JSValueSlotType, SlotType } from "@jitl/quickjs-ffi-types"

/** Logical reference ID to a JSValue mentioned in a command. */
export type JSValueRef = Brand<number, JSValueSlotType>
/** Logical reference ID to a FuncList mentioned in a command. */
export type FuncListRef = Brand<number, FuncListSlotType>

export type SlotToRef = {
  [JSValueSlotType]: JSValueRef
  [FuncListSlotType]: FuncListRef
}

/**
 * Any reference ID used in a command.
 * Refs are represented as a uint32 who's high 8 bits are the slot type and the low 24 bits are the id.
 */
export type CommandRef = JSValueRef | FuncListRef

const REF_VALUE_MASK = 0x00ffffff
const REF_TYPE_MASK = 0xff000000
const REF_TYPE_SHIFT = 24

function isUint24(value: number): value is number {
  return value >= 0 && value <= REF_VALUE_MASK
}

/** Pack a slot type and id into a command reference. */
export function CommandRef<S extends SlotType>(type: S, id: number): SlotToRef[S] {
  if (!isUint24(id)) {
    throw new RangeError(`ref id out not represnetable as a 24-bit unsigned integer: ${id}`)
  }
  return ((type << REF_TYPE_SHIFT) | id) as SlotToRef[S]
}

/** Get the {@link SlotType} of a {@link CommandRef}. */
export function CommandRefType(ref: CommandRef): SlotType {
  return ((ref & REF_TYPE_MASK) >> REF_TYPE_SHIFT) as SlotType
}

/** Get the numeric id of a {@link CommandRef}. */
export function CommandRefId(ref: CommandRef): number {
  return ref & REF_VALUE_MASK
}

/** Visitor function for visiting references within a command. */
export type RefVisitor = (ref: CommandRef) => void
