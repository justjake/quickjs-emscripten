import type {
  Brand,
  FuncListSlot,
  FuncListSlotType,
  JSValueSlot,
  JSValueSlotType,
  SlotType,
} from "@jitl/quickjs-ffi-types"
import type { QuickJSHandle } from "./types"

/** Logical reference ID to a JSValue mentioned in a command. */
export type JSValueRef = Brand<number, JSValueSlotType>
/** Logical reference ID to a FuncList mentioned in a command. */
export type FuncListRef = Brand<number, FuncListSlotType>

export type SlotTypeToRef<T extends SlotType> = T extends JSValueSlotType
  ? JSValueRef
  : T extends FuncListSlotType
    ? FuncListRef
    : never

export type SlotTypeToSlot<T extends SlotType> = T extends JSValueSlotType
  ? JSValueSlot
  : T extends FuncListSlotType
    ? FuncListSlot
    : never

export type SlotTypeToValue<T extends SlotType> = T extends JSValueSlotType
  ? QuickJSHandle
  : T extends FuncListSlotType
    ? undefined
    : never

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
export function CommandRef<S extends SlotType>(type: S, id: number): SlotTypeToRef<S> {
  if (!isUint24(id)) {
    throw new RangeError(`ref id out not represnetable as a 24-bit unsigned integer: ${id}`)
  }
  return ((type << REF_TYPE_SHIFT) | id) as SlotTypeToRef<S>
}

/** Get the {@link SlotType} of a {@link CommandRef}. */
export function CommandRefType(ref: CommandRef): SlotType {
  return ((ref & REF_TYPE_MASK) >> REF_TYPE_SHIFT) as SlotType
}

/** Get the numeric id of a {@link CommandRef}. */
export function CommandRefId(ref: CommandRef): number {
  return ref & REF_VALUE_MASK
}

export function isCommandRef<T extends CommandRef>(type: T["brand"], ref: unknown): ref is T {
  if (typeof ref === "number" && CommandRefType(ref as CommandRef) === type) {
    return true
  }
  return false
}

export function assertCommandRef<T extends CommandRef>(
  type: T["brand"],
  nextId: number,
  ref: unknown,
): asserts ref is T {
  if (!isCommandRef(type, ref)) {
    throw new TypeError(
      `Expected ${type} ref, got ${typeof ref === "number" ? CommandRefType(ref as CommandRef) : typeof ref}`,
    )
  }
  if (CommandRefId(ref as CommandRef) >= nextId) {
    throw new RangeError(`Ref id out of range: ${CommandRefId(ref as CommandRef)} > ${nextId}`)
  }
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

// =============================================================================
// Command Buffer View
// =============================================================================

/** True if the host machine is little-endian (same as WASM). */
export const IS_LITTLE_ENDIAN = new Uint8Array(new Uint32Array([1]).buffer)[0] === 1

/**
 * Multi-view into a command buffer for efficient read/write operations.
 * On little-endian hosts (99.9% of real-world), we can use direct typed array
 * access instead of DataView for better performance.
 */
export interface CmdBuf {
  u8: Uint8Array
  u32: Uint32Array
  dv: DataView // needed for f64/i64 (not 8-byte aligned within 16-byte commands)
}

/** Create a {@link CmdBuf} view of an ArrayBuffer. */
export function createCmdBuf(buffer: ArrayBuffer): CmdBuf {
  return {
    u8: new Uint8Array(buffer),
    u32: new Uint32Array(buffer),
    dv: new DataView(buffer),
  }
}
