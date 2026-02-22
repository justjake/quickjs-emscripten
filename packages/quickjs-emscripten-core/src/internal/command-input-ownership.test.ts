import { SlotType } from "@jitl/quickjs-ffi-types"
import { describe, expect, it, vi } from "vitest"
import type { InputBinding } from "../CommandBuilder"
import type { JSValueRef } from "../command-types"
import { JSValueLifetime } from "../lifetime"
import * as Ops from "../ops"
import type { QuickJSHandle } from "../types"
import { finalizeConsumedInputBindings } from "./command-input-ownership"

function makeBinding(refId: number): { binding: InputBinding; handle: QuickJSHandle; ref: JSValueRef } {
  const ref = refId as unknown as JSValueRef
  const handle = new JSValueLifetime(0 as any) as unknown as QuickJSHandle
  return {
    binding: {
      ref,
      handle,
      mode: "consume_on_success",
    },
    handle,
    ref,
  }
}

describe("finalizeConsumedInputBindings", () => {
  it("disposes consume_on_success bindings when execution succeeds and no consume op ran", () => {
    const { binding, handle } = makeBinding(1)
    const disposeSpy = vi.spyOn(handle, "dispose")
    const invalidateSpy = vi.spyOn(handle, "invalidateHandle")

    finalizeConsumedInputBindings([binding], [Ops.NewObjectCmd(2 as JSValueRef)], 1)

    expect(handle.alive).toBe(false)
    expect(disposeSpy).toHaveBeenCalledTimes(1)
    expect(invalidateSpy).not.toHaveBeenCalled()
  })

  it("invalidates consume_on_success bindings when consumed by a reached command", () => {
    const { binding, handle, ref } = makeBinding(1)
    const disposeSpy = vi.spyOn(handle, "dispose")
    const invalidateSpy = vi.spyOn(handle, "invalidateHandle")
    const commands = [Ops.SlotFreeCmd(ref, SlotType.JSValueSlotType)]

    finalizeConsumedInputBindings([binding], commands, commands.length)

    expect(handle.alive).toBe(false)
    expect(disposeSpy).not.toHaveBeenCalled()
    expect(invalidateSpy).toHaveBeenCalledTimes(1)
  })

  it("keeps consume_on_success bindings alive on failure before consume op", () => {
    const { binding, handle, ref } = makeBinding(1)
    const disposeSpy = vi.spyOn(handle, "dispose")
    const invalidateSpy = vi.spyOn(handle, "invalidateHandle")
    const commands = [
      Ops.NewObjectCmd(2 as JSValueRef),
      Ops.SlotFreeCmd(ref, SlotType.JSValueSlotType),
    ]

    finalizeConsumedInputBindings([binding], commands, 1)

    expect(handle.alive).toBe(true)
    expect(disposeSpy).not.toHaveBeenCalled()
    expect(invalidateSpy).not.toHaveBeenCalled()
  })

  it("invalidates consume_on_success bindings on failure after consume op", () => {
    const { binding, handle, ref } = makeBinding(1)
    const disposeSpy = vi.spyOn(handle, "dispose")
    const invalidateSpy = vi.spyOn(handle, "invalidateHandle")
    const commands = [
      Ops.SlotFreeCmd(ref, SlotType.JSValueSlotType),
      Ops.NewObjectCmd(2 as JSValueRef),
    ]

    finalizeConsumedInputBindings([binding], commands, 1)

    expect(handle.alive).toBe(false)
    expect(disposeSpy).not.toHaveBeenCalled()
    expect(invalidateSpy).toHaveBeenCalledTimes(1)
  })
})
