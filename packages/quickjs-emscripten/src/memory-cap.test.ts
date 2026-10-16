import assert from "assert"
import { describe, it } from "vitest"
import NG_RELEASE_ASYNC from "@jitl/quickjs-ng-wasmfile-release-asyncify"
import NG_RELEASE_SYNC from "@jitl/quickjs-ng-wasmfile-release-sync"
import {
  newQuickJSAsyncWASMModuleFromVariant,
  newQuickJSWASMModuleFromVariant,
  newVariant,
  RELEASE_ASYNC,
  RELEASE_SYNC,
} from "."

/**
 * `maxMemoryBytes` is a hard cap on WebAssembly linear memory. Unlike `setMemoryLimit` it does not
 * rely on QuickJS counting allocations. Release variants only: the debug (sanitizer) builds abort
 * the whole module when the heap cannot grow, so exhaustion is not survivable there.
 */
const MiB = 1024 * 1024
const CAP = 64 * MiB

// Allocates ~1 MiB distinct strings until something gives, reporting heap size to the host each time.
const ALLOCATE_UNTIL_FAILURE = (caught: boolean) => `
  const kept = []
  ${caught ? "try {" : ""}
    for (let i = 0; i < 400; i++) {
      kept.push(("x" + i).repeat(262144))
      heapBytes()
    }
  ${caught ? `} catch (e) { globalThis.caught = e.name + ": " + e.message }` : ""}
  kept.length
`

const sync = { name: "quickjs sync", base: RELEASE_SYNC, create: newQuickJSWASMModuleFromVariant }
const ng = {
  name: "quickjs-ng sync",
  base: NG_RELEASE_SYNC,
  create: newQuickJSWASMModuleFromVariant,
}
const async = {
  name: "quickjs asyncify",
  base: RELEASE_ASYNC,
  create: newQuickJSAsyncWASMModuleFromVariant,
}
const ngAsync = {
  name: "quickjs-ng asyncify",
  base: NG_RELEASE_ASYNC,
  create: newQuickJSAsyncWASMModuleFromVariant,
}

for (const { name, base, create } of [sync, ng, async, ngAsync]) {
  describe(`maxMemoryBytes (${name})`, () => {
    async function setup(options: { memoryLimit?: number } = {}) {
      const module = await (create as typeof newQuickJSWASMModuleFromVariant)(
        newVariant(base as any, { maxMemoryBytes: CAP }) as any,
      )
      const memory = module.getWasmMemory()
      const runtime = module.newRuntime()
      if (options.memoryLimit) runtime.setMemoryLimit(options.memoryLimit)
      const vm = runtime.newContext()
      let peakBytes = memory.buffer.byteLength
      vm.newFunction("heapBytes", () => {
        peakBytes = Math.max(peakBytes, memory.buffer.byteLength)
      }).consume((fn) => vm.setProp(vm.global, "heapBytes", fn))
      return { memory, runtime, vm, peak: () => Math.max(peakBytes, memory.buffer.byteLength) }
    }

    it("never grows linear memory past the cap, and guest code can catch the failure", async () => {
      const { memory, runtime, vm, peak } = await setup()
      const result = vm.unwrapResult(vm.evalCode(ALLOCATE_UNTIL_FAILURE(true)))
      const kept = vm.getNumber(result)
      result.dispose()

      assert.ok(kept < 400, `allocation should have failed before 400 MiB (kept ${kept})`)
      assert.match(vm.dump(vm.getProp(vm.global, "caught")) as string, /^InternalError: .*memory/)
      assert.ok(peak() <= CAP, `heap peaked at ${peak()} bytes, cap is ${CAP}`)
      assert.ok(memory.buffer.byteLength <= CAP)

      // Still usable, and teardown does not trip QuickJS's list_empty(gc_obj_list) assertion.
      assert.strictEqual(vm.getNumber(vm.unwrapResult(vm.evalCode(`1 + 1`))), 2)
      vm.dispose()
      runtime.dispose()
    })

    it("surfaces an uncaught failure as a guest error, not a crash", async () => {
      const { runtime, vm, peak } = await setup()
      const result = vm.evalCode(ALLOCATE_UNTIL_FAILURE(false))
      assert.ok(result.error, "expected the allocation to fail")
      assert.strictEqual(vm.dump(result.error).name, "InternalError")
      result.error.dispose()
      assert.ok(peak() <= CAP)
      vm.dispose()
      runtime.dispose()
    })

    it("holds even when setMemoryLimit is far larger than the cap", async () => {
      const { runtime, vm, peak } = await setup({ memoryLimit: 1024 * MiB })
      const result = vm.evalCode(ALLOCATE_UNTIL_FAILURE(true))
      if (result.error) result.error.dispose()
      else result.value.dispose()
      assert.ok(peak() <= CAP, `heap peaked at ${peak()} bytes, cap is ${CAP}`)
      vm.dispose()
      runtime.dispose()
    })
  })
}

describe("maxMemoryBytes validation", () => {
  it("rejects caps below the 16 MiB initial memory", async () => {
    await assert.rejects(
      newQuickJSWASMModuleFromVariant(newVariant(RELEASE_SYNC, { maxMemoryBytes: 8 * MiB })),
      RangeError,
    )
  })

  it("rejects combining maxMemoryBytes with wasmMemory", async () => {
    await assert.rejects(
      newQuickJSWASMModuleFromVariant(
        newVariant(RELEASE_SYNC, {
          maxMemoryBytes: CAP,
          wasmMemory: new WebAssembly.Memory({ initial: 256, maximum: 1024 }),
        }),
      ),
      TypeError,
    )
  })
})
