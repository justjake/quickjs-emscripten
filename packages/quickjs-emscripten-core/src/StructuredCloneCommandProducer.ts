import { JSValueLifetime } from "./lifetime"
import type { JSValueRef } from "./command-types"
import { CommandBuilder } from "./CommandBuilder"
import type { QuickJSHandle } from "./types"

type PendingObjectContainer = {
  kind: "object"
  source: Record<string, unknown>
  ref: JSValueRef
}

type PendingArrayContainer = {
  kind: "array"
  source: unknown[]
  ref: JSValueRef
}

type PendingMapContainer = {
  kind: "map"
  source: Map<unknown, unknown>
  ref: JSValueRef
}

type PendingSetContainer = {
  kind: "set"
  source: Set<unknown>
  ref: JSValueRef
}

type PendingContainer =
  | PendingObjectContainer
  | PendingArrayContainer
  | PendingMapContainer
  | PendingSetContainer

function assertUnknownPendingContainer(container: never): never {
  throw new Error(
    `Unknown structured clone pending container kind: ${String((container as { kind?: unknown }).kind)}`,
  )
}

export interface AppendStructuredCloneResult {
  rootRef: JSValueRef
  encounteredHandles: Set<QuickJSHandle>
}

function isInlinePrimitive(value: unknown): value is null | undefined | boolean | number | bigint | string {
  return (
    value === null ||
    value === undefined ||
    typeof value === "boolean" ||
    typeof value === "number" ||
    typeof value === "bigint" ||
    typeof value === "string"
  )
}

export function appendStructuredClone(
  builder: CommandBuilder,
  input: unknown,
): AppendStructuredCloneResult {
  const objectToRef = new WeakMap<object, JSValueRef>()
  const pending: PendingContainer[] = []
  const encounteredHandles = new Set<QuickJSHandle>()

  const materialize = (value: unknown): JSValueRef => {
    if (value === null) {
      return builder.bindInput(builder.context.null)
    }
    if (value === undefined) {
      return builder.bindInput(builder.context.undefined)
    }
    if (typeof value === "boolean") {
      return builder.bindInput(value ? builder.context.true : builder.context.false)
    }
    if (typeof value === "number") {
      return builder.newNumber(value)
    }
    if (typeof value === "string") {
      return builder.newString(value)
    }
    if (typeof value === "bigint") {
      return builder.newBigInt(value)
    }

    if (typeof value !== "object") {
      throw new TypeError(`Unsupported structuredClone value type: ${typeof value}`)
    }

    if (value instanceof JSValueLifetime) {
      encounteredHandles.add(value)
      return builder.bindInput(value)
    }

    const existing = objectToRef.get(value)
    if (existing !== undefined) {
      return existing
    }

    if (Array.isArray(value)) {
      const ref = builder.newArray()
      objectToRef.set(value, ref)
      pending.push({ kind: "array", source: value, ref })
      return ref
    }

    if (value instanceof Date) {
      const ref = builder.newDate(value.getTime())
      objectToRef.set(value, ref)
      return ref
    }

    if (value instanceof Map) {
      const ref = builder.newMap()
      objectToRef.set(value, ref)
      pending.push({ kind: "map", source: value, ref })
      return ref
    }

    if (value instanceof Set) {
      const ref = builder.newSet()
      objectToRef.set(value, ref)
      pending.push({ kind: "set", source: value, ref })
      return ref
    }

    if (ArrayBuffer.isView(value) || value instanceof ArrayBuffer) {
      throw new TypeError("Typed arrays and ArrayBuffer are not yet supported by this clone producer")
    }

    const ref = builder.newObject()
    objectToRef.set(value, ref)
    pending.push({ kind: "object", source: value as Record<string, unknown>, ref })
    return ref
  }

  const rootRef = materialize(input)

  for (let i = 0; i < pending.length; i++) {
    const next = pending[i]
    switch (next.kind) {
      case "object": {
        for (const [key, value] of Object.entries(next.source)) {
          if (isInlinePrimitive(value)) {
            builder.setProp(next.ref, key, value)
            continue
          }
          if (value instanceof JSValueLifetime) {
            encounteredHandles.add(value)
            builder.setProp(next.ref, key, value)
          } else {
            builder.setPropRef(next.ref, key, materialize(value))
          }
        }
        break
      }
      case "array": {
        for (let index = 0; index < next.source.length; index++) {
          if (!Object.prototype.hasOwnProperty.call(next.source, index)) {
            continue
          }
          const value = next.source[index]
          if (isInlinePrimitive(value)) {
            builder.setProp(next.ref, index, value)
            continue
          }
          if (value instanceof JSValueLifetime) {
            encounteredHandles.add(value)
            builder.setProp(next.ref, index, value)
          } else {
            builder.setPropRef(next.ref, index, materialize(value))
          }
        }
        break
      }
      case "map": {
        for (const [key, value] of next.source.entries()) {
          builder.mapSet(next.ref, materialize(key), materialize(value))
        }
        break
      }
      case "set": {
        for (const value of next.source.values()) {
          builder.setAdd(next.ref, materialize(value))
        }
        break
      }
      default:
        return assertUnknownPendingContainer(next)
    }
  }

  return {
    rootRef,
    encounteredHandles,
  }
}
