import { SetPropFlags } from "@jitl/quickjs-ffi-types"
import * as fs from "fs"
import * as path from "path"
import { describe, expect, it, vi } from "vitest"
import { HostRefMap } from "./host-ref"
import { JSValueLifetime } from "./lifetime"
import * as Op from "./ops"
import { CommandBuilder } from "./CommandBuilder"
import type { QuickJSContext } from "./context"
import type { QuickJSHandle } from "./types"

function makeFakeHandle(): QuickJSHandle {
  return new JSValueLifetime(0 as any) as unknown as QuickJSHandle
}

function makeFakeContext(): QuickJSContext {
  const runtime = {
    hostRefs: new HostRefMap(),
    assertOwned: vi.fn(),
  }
  return { runtime } as unknown as QuickJSContext
}

describe("CommandBuilder", () => {
  it("dispatches setProp by key/value shape", () => {
    const context = makeFakeContext()
    const builder = new CommandBuilder(context)
    const target = makeFakeHandle()

    builder.setProp(target, "a", 123)
    builder.setProp(target, 2, "ok")

    const commands = builder.getCommands()
    expect(commands).toHaveLength(2)
    expect(commands[0]?.kind).toBe(Op.SET_STR_INT32)
    expect(commands[1]?.kind).toBe(Op.SET_IDX_STRING)
    expect(builder.getInputBindings()).toHaveLength(1)
  })

  it("routes setPropRef through value-ref op variants", () => {
    const context = makeFakeContext()
    const builder = new CommandBuilder(context)
    const target = builder.newObject()
    const valueRef = builder.newNumber(7)
    const keyHandle = makeFakeHandle()

    builder.setPropRef(target, "a", valueRef)
    builder.setPropRef(target, 2, valueRef)
    builder.setPropRef(target, keyHandle, valueRef)

    const commands = builder.getCommands()
    expect(commands.map((command) => command.kind)).toEqual([
      Op.NEW_OBJECT,
      Op.NEW_FLOAT64,
      Op.SET_STR_VALUE,
      Op.SET_IDX_VALUE,
      Op.SET_VALUE_VALUE,
    ])
    expect(builder.getInputBindings()).toHaveLength(1)
  })

  it("accepts QuickJSHandle values in setProp", () => {
    const context = makeFakeContext()
    const builder = new CommandBuilder(context)
    const target = builder.newObject()
    const valueHandle = makeFakeHandle()

    builder.setProp(target, "a", valueHandle)

    const command = builder.getCommands()[1]
    expect(command?.kind).toBe(Op.SET_STR_VALUE)
    expect(builder.getInputBindings()).toHaveLength(1)
  })

  it("supports map/set command helpers and bindInput dedupe", () => {
    const context = makeFakeContext()
    const builder = new CommandBuilder(context)
    const mapRef = builder.newMap()
    const setRef = builder.newSet()
    const keyRef = builder.newString("k")
    const valueRef = builder.newNumber(1)

    builder.mapSet(mapRef, keyRef, valueRef)
    builder.setAdd(setRef, valueRef)

    const handle = makeFakeHandle()
    const boundA = builder.bindInput(handle)
    const boundB = builder.bindInput(handle)

    expect(boundA).toBe(boundB)
    expect(builder.getInputBindings()).toHaveLength(1)
    expect(builder.getCommands().map((c) => c.kind)).toEqual([
      Op.NEW_MAP,
      Op.NEW_SET,
      Op.NEW_STRING,
      Op.NEW_FLOAT64,
      Op.MAP_SET,
      Op.SET_ADD,
    ])
  })

  it("marks consumed inputs for deferred move semantics", () => {
    const context = makeFakeContext()
    const builder = new CommandBuilder(context)
    const target = makeFakeHandle()
    const moved = makeFakeHandle()

    builder.setProp(target, "x", builder.consume(moved))

    const bindings = builder.getInputBindings()
    expect(bindings).toHaveLength(2)
    expect(bindings.find((binding) => binding.handle === target)?.mode).toBe("borrowed")
    expect(bindings.find((binding) => binding.handle === moved)?.mode).toBe(
      "consume_on_success",
    )
  })

  it("upgrades existing input binding mode to consume_on_success", () => {
    const context = makeFakeContext()
    const builder = new CommandBuilder(context)
    const handle = makeFakeHandle()

    builder.bindInput(handle)
    builder.setProp(makeFakeHandle(), "x", builder.consume(handle))

    const binding = builder
      .getInputBindings()
      .find((candidate) => candidate.handle === handle)
    expect(binding?.mode).toBe("consume_on_success")
  })

  it("finalizeConsumedInputs disposes consume_on_success bindings on success", () => {
    const context = makeFakeContext()
    const builder = new CommandBuilder(context)
    const target = makeFakeHandle()
    const moved = makeFakeHandle()
    const disposeSpy = vi.spyOn(moved, "dispose")
    const invalidateSpy = vi.spyOn(moved, "invalidateHandle")

    builder.setProp(target, "x", builder.consume(moved))
    builder.finalizeConsumedInputs(builder.getCommands().length)

    expect(moved.alive).toBe(false)
    expect(disposeSpy).toHaveBeenCalledTimes(1)
    expect(invalidateSpy).not.toHaveBeenCalled()
  })

  it("uses define flags for defineProp", () => {
    const context = makeFakeContext()
    const builder = new CommandBuilder(context)

    builder.defineProp(makeFakeHandle(), "x", true, {
      configurable: true,
      writable: true,
      enumerable: true,
      throwOnError: true,
    })

    const command = builder.getCommands()[0]
    expect(command?.kind).toBe(Op.SET_STR_BOOL)
    if (!command || command.kind !== Op.SET_STR_BOOL) {
      return
    }
    const expectedFlags =
      SetPropFlags.DEFINE |
      SetPropFlags.CONFIGURABLE |
      SetPropFlags.WRITABLE |
      SetPropFlags.ENUMERABLE |
      SetPropFlags.THROW
    expect(command.flags).toBe(expectedFlags)
  })

  it("uses define flags for definePropRef", () => {
    const context = makeFakeContext()
    const builder = new CommandBuilder(context)
    const target = builder.newObject()
    const value = builder.newNumber(1)

    builder.definePropRef(target, "x", value, {
      configurable: true,
      writable: true,
      enumerable: true,
      throwOnError: true,
    })

    const command = builder.getCommands()[2]
    expect(command?.kind).toBe(Op.SET_STR_VALUE)
    if (!command || command.kind !== Op.SET_STR_VALUE) {
      return
    }
    const expectedFlags =
      SetPropFlags.DEFINE |
      SetPropFlags.CONFIGURABLE |
      SetPropFlags.WRITABLE |
      SetPropFlags.ENUMERABLE |
      SetPropFlags.THROW
    expect(command.flags).toBe(expectedFlags)
  })

  it("matches QuickJSContext newFunction/newConstructorFunction overload behavior", () => {
    const context = makeFakeContext()
    const builder = new CommandBuilder(context)

    const fn = (a: QuickJSHandle, b: QuickJSHandle) => a ?? b
    const ctorFn = (_x: QuickJSHandle) => undefined
    const refA = builder.newFunction(fn)
    const refB = builder.newConstructorFunction("Ctor", ctorFn)

    const commands = builder.getCommands()
    expect(commands).toHaveLength(2)
    expect(commands[0]?.kind).toBe(Op.NEW_FUNC)
    expect(commands[1]?.kind).toBe(Op.NEW_FUNC)

    if (!commands[0] || commands[0].kind !== Op.NEW_FUNC) {
      return
    }
    if (!commands[1] || commands[1].kind !== Op.NEW_FUNC) {
      return
    }

    expect(commands[0].arity).toBe(fn.length)
    expect(commands[0].isConstructor).toBe(0)
    expect(commands[0].name).toBe("")
    expect(commands[1].arity).toBe(ctorFn.length)
    expect(commands[1].isConstructor).toBe(1)
    expect(commands[1].name).toBe("Ctor")

    const bindings = builder.getFunctionBindings()
    expect(bindings).toHaveLength(2)
    expect(bindings[0]).toMatchObject({ ref: refA, fn })
    expect(bindings[1]).toMatchObject({ ref: refB, fn: ctorFn })
    expect(context.runtime.hostRefs.get(bindings[0]!.hostRefId)).toBe(fn)
    expect(context.runtime.hostRefs.get(bindings[1]!.hostRefId)).toBe(ctorFn)
  })

  it("defines funclist props with a single API", () => {
    const context = makeFakeContext()
    const builder = new CommandBuilder(context)

    const root = builder.newFuncList(4)
    const child = builder.newFuncList(1)
    builder.defineFuncListProp(root, 0, "name", "value")
    builder.defineFuncListProp(root, 1, "pi", 3.14)
    builder.defineFuncListProp(root, 2, "none", null)
    builder.defineFuncListProp(root, 3, "nested", { object: child }, { enumerable: true })

    const commands = builder.getCommands()
    expect(commands.map((c) => c.kind)).toEqual([
      Op.FUNCLIST_NEW,
      Op.FUNCLIST_NEW,
      Op.FUNCLIST_DEF_STRING,
      Op.FUNCLIST_DEF_DOUBLE,
      Op.FUNCLIST_DEF_NULL,
      Op.FUNCLIST_DEF_OBJECT,
    ])

    const last = commands[5]
    if (!last || last.kind !== Op.FUNCLIST_DEF_OBJECT) {
      return
    }
    expect(last.flags).toBe(0b00100)
  })

  it("throws a clear error when defineFuncListProp receives a QuickJSHandle", () => {
    const context = makeFakeContext()
    const builder = new CommandBuilder(context)
    const root = builder.newFuncList(1)
    const handle = makeFakeHandle()

    expect(() =>
      builder.defineFuncListProp(root, 0, "bad", handle as any),
    ).toThrow(
      "defineFuncListProp does not accept QuickJSHandle values. FuncList entries must be literals or nested `{ object: FuncListRef }` definitions.",
    )
  })

  it("clear resets queued state and bindings", () => {
    const context = makeFakeContext()
    const builder = new CommandBuilder(context)
    const handle = makeFakeHandle()
    const staleRef = builder.newFunction(() => undefined)
    builder.setProp(handle, "x", 1)

    expect(builder.getCommands().length).toBeGreaterThan(0)
    expect(builder.getInputBindings().length).toBe(1)
    expect(builder.getFunctionBindings().length).toBe(1)

    builder.clear()

    expect(builder.getCommands()).toHaveLength(0)
    expect(builder.getInputBindings()).toHaveLength(0)
    expect(builder.getFunctionBindings()).toHaveLength(0)
    expect(() => builder.setProp(staleRef, "x", 1)).toThrow("Unknown JSValueRef")
  })

  it("does not use mixed Primitive|JSValueInput property value paths", () => {
    const source = fs.readFileSync(path.join(__dirname, "CommandBuilder.ts"), "utf8")
    expect(source.includes("Primitive | JSValueInput")).toBe(false)
    expect(source.includes("tryResolveValueRef")).toBe(false)
    expect(source.includes("resolveValueRef")).toBe(false)
  })
})
