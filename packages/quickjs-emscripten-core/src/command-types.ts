import type {
  Brand,
  FuncListSlot,
  FuncListSlotType,
  JSValueSlot,
  JSValueSlotType,
  SlotType,
} from "@jitl/quickjs-ffi-types"

/** Logical reference ID to a JSValue mentioned in a command. */
export type JSValueRef = Brand<number, JSValueSlotType>
/** Logical reference ID to a FuncList mentioned in a command. */
export type FuncListRef = Brand<number, FuncListSlotType>

export type SlotTypeToRef = {
  [JSValueSlotType]: JSValueRef
  [FuncListSlotType]: FuncListRef
}

export type SlotTypeToSlot = {
  [JSValueSlotType]: JSValueSlot
  [FuncListSlotType]: FuncListSlot
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
export function CommandRef<S extends SlotType>(type: S, id: number): SlotTypeToRef[S] {
  if (!isUint24(id)) {
    throw new RangeError(`ref id out not represnetable as a 24-bit unsigned integer: ${id}`)
  }
  return ((type << REF_TYPE_SHIFT) | id) as SlotTypeToRef[S]
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

/** Resolve the current slot storing a reference's value. */
export type RefResolver = <T extends Brand<number, any>>(
  ref: T,
) => T["brand"] extends JSValueSlotType
  ? JSValueSlot
  : T["brand"] extends FuncListSlotType
    ? FuncListSlot
    : never

export interface EncodedBufferRef<Ptr extends number = number, Len extends number = number> {
  ptr: Ptr
  len: Len
}

export interface CommandWriteHelpers {
  resolveRef: RefResolver
  encodeUtf8<Ptr extends number = number, Len extends number = number>(
    value: string,
    maxLength?: number,
    errorOnNull?: boolean,
  ): EncodedBufferRef<Ptr, Len>
  encodeBytes<Ptr extends number = number, Len extends number = number>(
    value: Uint8Array,
    maxLength?: number,
  ): EncodedBufferRef<Ptr, Len>
}
