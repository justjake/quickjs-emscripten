import { assert, describe, it } from "vitest"
import { newQuickJSAsyncWASMModuleFromVariant } from "quickjs-emscripten-core"
import { RELEASE_ASYNC } from "./variants"

// Same gates as the release async tests in quickjs.test.ts.
const TEST_SLOW = !process.env.TEST_FAST
const TEST_ASYNC = TEST_SLOW && !process.env.TEST_NO_ASYNC
const TEST_RELEASE = !process.env.TEST_NO_RELEASE

// Lives in its own file on purpose. A suspension that is reported rather than resumed leaves the
// Emscripten module suspended, and that state outlives the context it happened in — in a debug
// build the same case trips an Emscripten assertion, which aborts the module outright. Either
// way the damage is module-wide, so nothing else may share this one.
describe.skipIf(!(TEST_ASYNC && TEST_RELEASE))("asyncify synchronous job driver", () => {
  it("reports a suspended job instead of returning a value it never produced", async () => {
    const wasm = await newQuickJSAsyncWASMModuleFromVariant(RELEASE_ASYNC)
    const vm = wasm.newContext()

    vm.newAsyncifiedFunction("get", async (pathHandle) =>
      vm.newString(vm.getString(pathHandle)),
    ).consume((fn) => vm.setProp(vm.global, "get", fn))

    const result = await vm.evalCodeAsync(`
      (async () => {
        await get("/a")
        await get("/b")
      })()
    `)
    vm.unwrapResult(result).dispose()

    // The second await resumes from a pending job and suspends into the host function.
    // executePendingJobs cannot deliver that result synchronously, so it has to say so —
    // silently continuing means reading a pointer the unwound call never wrote.
    assert.throws(() => vm.runtime.executePendingJobs(), /returned a Promise/)

    // The call that suspended is still resumed in the background once the host function
    // settles, and it works on this context. Let that finish before disposing, or it runs
    // against a freed context. A macrotask turn is enough: the resume is promise-driven.
    await new Promise((resolve) => setImmediate(resolve))
    vm.dispose()
  })
})
