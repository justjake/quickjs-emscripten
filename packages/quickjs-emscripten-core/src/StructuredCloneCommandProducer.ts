import { JSValueLifetime } from "./lifetime"
import type { JSValueRef } from "./command-types"
import { CommandBuilder } from "./CommandBuilder"
import type { QuickJSHandle } from "./types"

type ContainerKind = "object" | "array" | "map" | "set"

type PendingContainer = {
  kind: ContainerKind
  source: object
  ref: JSValueRef
}

export interface AppendStructuredCloneResult {
  rootRef: JSValueRef
  encounteredHandles: QuickJSHandle[]
}

function isInlineSetValue(value: unknown): value is null | undefined | boolean | number | bigint | string | QuickJSHandle {
  return (
    value === null ||
    value === undefined ||
    typeof value === "boolean" ||
    typeof value === "number" ||
    typeof value === "bigint" ||
    typeof value === "string" ||
    value instanceof JSValueLifetime
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
    pending.push({ kind: "object", source: value, ref })
    return ref
  }

  const rootRef = materialize(input)

  for (let i = 0; i < pending.length; i++) {
    const next = pending[i]

    if (next.kind === "object") {
      const source = next.source as Record<string, unknown>
      for (const [key, value] of Object.entries(source)) {
        if (isInlineSetValue(value)) {
          if (value instanceof JSValueLifetime) {
            encounteredHandles.add(value)
          }
          builder.setProp(next.ref, key, value)
        } else {
          builder.setProp(next.ref, key, materialize(value))
        }
      }
      continue
    }

    if (next.kind === "array") {
      const source = next.source as unknown[]
      for (let index = 0; index < source.length; index++) {
        if (!Object.prototype.hasOwnProperty.call(source, index)) {
          continue
        }
        const value = source[index]
        if (isInlineSetValue(value)) {
          if (value instanceof JSValueLifetime) {
            encounteredHandles.add(value)
          }
          builder.setProp(next.ref, index, value)
        } else {
          builder.setProp(next.ref, index, materialize(value))
        }
      }
      continue
    }

    if (next.kind === "map") {
      const source = next.source as Map<unknown, unknown>
      for (const [key, value] of source.entries()) {
        builder.mapSet(next.ref, materialize(key), materialize(value))
      }
      continue
    }

    const source = next.source as Set<unknown>
    for (const value of source.values()) {
      builder.setAdd(next.ref, materialize(value))
    }
  }

  return {
    rootRef,
    encounteredHandles: [...encounteredHandles],
  }
}
