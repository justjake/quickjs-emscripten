/**
 * Allocator balance checks.
 *
 * Each test verifies that a sequence of operations leaves
 * JSMallocState.malloc_count unchanged — i.e., every js_malloc call in the C
 * layer is matched by exactly one js_free call.
 *
 * If malloc_count drifts downward by exactly N after N calls, a pointer was
 * freed via js_free() without ever having been allocated via js_malloc()
 * (e.g. by using the system malloc() instead).  Over time this causes the
 * internal allocator accounting to underflow, corrupting the GC threshold and
 * eventually causing bad behavior.
 */

import assert from "assert"
import { afterEach, beforeEach, describe, it } from "vitest"
import type { QuickJSContext, QuickJSWASMModule } from "."
import {
  DEBUG_ASYNC,
  DEBUG_SYNC,
  getQuickJS,
  memoizePromiseFactory as memoizeNewModule,
  newQuickJSAsyncWASMModule,
  newQuickJSWASMModule,
  Scope,
} from "."

// ---------------------------------------------------------------------------
// Harness

type AllocatorCheck = (ctx: QuickJSContext) => void

/**
 * Read malloc_count from the runtime's internal allocator state.
 *
 * The temporary handle from computeMemoryUsage() is disposed inside a nested
 * Scope so it does not inflate the count we return.
 */
function readMallocCount(ctx: QuickJSContext): number {
  return Scope.withScope((s) => {
    const handle = s.manage(ctx.runtime.computeMemoryUsage())
    return (ctx.dump(handle) as any).malloc_count as number
  })
}

/**
 * For each named check function, register a vitest test that:
 *
 *  1. Creates a fresh QuickJS context.
 *  2. Warms up the computeMemoryUsage atom cache so subsequent calls do not
 *     allocate new atoms and shift the baseline.
 *  3. Captures malloc_count before the check.
 *  4. Runs the check body (which controls its own loop count and any setup).
 *  5. Captures malloc_count after.
 *  6. Asserts the count is unchanged.
 *
 * A drop equal to the number of calls indicates one unmatched js_free per
 * call — a malloc/js_malloc mismatch in the C layer.
 */
function checkContextForAllocatorBalance(
  getModule: () => Promise<QuickJSWASMModule>,
  checks: Record<string, AllocatorCheck>,
) {
  let ctx: QuickJSContext

  beforeEach(async () => {
    const wasmModule = await getModule()
    ctx = wasmModule.newContext()
    // Warm up: ensure all property-name atoms used by computeMemoryUsage() are
    // already cached so they don't shift the baseline on our before/after reads.
    Scope.withScope((s) => {
      s.manage(ctx.runtime.computeMemoryUsage())
    })
  })

  afterEach(() => {
    ctx.dispose()
  })

  for (const [name, check] of Object.entries(checks)) {
    it(`allocator balance: ${name}`, () => {
      const countBefore = readMallocCount(ctx)
      check(ctx)
      const countAfter = readMallocCount(ctx)

      assert.strictEqual(
        countAfter,
        countBefore,
        `malloc_count must not drift during "${name}": ` +
          `was ${countBefore}, now ${countAfter} ` +
          `(drop: ${countBefore - countAfter}). ` +
          `A drop equal to the number of calls indicates one unmatched ` +
          `js_free per call (likely a malloc/js_malloc mismatch in the C layer).`,
      )
    })
  }
}

// ---------------------------------------------------------------------------
// Test cases

const checks: Record<string, AllocatorCheck> = {
  getOwnPropertyNames(ctx) {
    const obj = ctx.newObject()
    ctx.setProp(obj, "a", ctx.true)
    ctx.setProp(obj, "b", ctx.true)
    ctx.setProp(obj, "c", ctx.true)
    ctx.setProp(obj, "d", ctx.true)
    ctx.setProp(obj, "e", ctx.true)

    for (let i = 0; i < 1_000; i++) {
      const result = ctx.getOwnPropertyNames(obj, { strings: true })
      if (result.error) {
        result.error.dispose()
      } else {
        result.value.dispose()
      }
    }

    obj.dispose()
  },
}

describe("Allocator balance checks", () => {
  describe("DEBUG sync module", () => {
    const loader = memoizeNewModule(() => newQuickJSWASMModule(DEBUG_SYNC))
    checkContextForAllocatorBalance(loader, checks)
  })

  describe("RELEASE sync module", () => {
    checkContextForAllocatorBalance(getQuickJS, checks)
  })

  describe.skip("DEBUG async module", () => {
    const loader = memoizeNewModule(() => newQuickJSAsyncWASMModule(DEBUG_ASYNC))
    checkContextForAllocatorBalance(loader, checks)
  })

  describe("RELEASE async module", () => {
    const loader = memoizeNewModule(() => newQuickJSAsyncWASMModule())
    checkContextForAllocatorBalance(loader, checks)
  })
})
