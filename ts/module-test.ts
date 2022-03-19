import { QuickJSContext } from "./context"
import { QuickJSMemoryLeakDetected } from "./errors"
import { Lifetime } from "./lifetime"
import { ModuleEvalOptions, QuickJSWASMModule } from "./module"
import { QuickJSRuntime } from "./runtime"
import { ContextOptions, RuntimeOptions } from "./types"

/**
 * A test wrapper of QuickJSWASMModule that keeps a reference to each context or
 * runtime created.
 *
 * Call [[disposeAll]] to reset these sets and calls `dispose` on any left alive
 * (which may throw an error).
 */
export class TestQuickJSWASMModule implements Pick<QuickJSWASMModule, keyof QuickJSWASMModule> {
  contexts = new Set<QuickJSContext>()
  runtimes = new Set<QuickJSRuntime>()
  constructor(private parent: QuickJSWASMModule) {}

  newRuntime(options?: RuntimeOptions): QuickJSRuntime {
    const runtime = this.parent.newRuntime({
      ...options,
      ownedLifetimes: [
        new Lifetime(undefined, undefined, () => this.runtimes.delete(runtime)),
        ...(options?.ownedLifetimes ?? []),
      ],
    })
    this.runtimes.add(runtime)
    return runtime
  }

  newContext(options?: ContextOptions): QuickJSContext {
    const context = this.parent.newContext({
      ...options,
      ownedLifetimes: [
        new Lifetime(undefined, undefined, () => this.contexts.delete(context)),
        ...(options?.ownedLifetimes ?? []),
      ],
    })
    this.contexts.add(context)
    return context
  }

  evalCode(code: string, options?: ModuleEvalOptions): unknown {
    return this.parent.evalCode(code, options)
  }

  disposeAll() {
    const allDisposables = [...this.contexts, ...this.runtimes]
    this.runtimes.clear()
    this.contexts.clear()
    allDisposables.forEach((d) => {
      if (d.alive) {
        d.dispose()
      }
    })
  }

  assertNoMemoryAllocated() {
    const leaksDetected = this.getFFI().QTS_RecoverableLeakCheck()
    if (leaksDetected) {
      // Note: this is currently only available when building from source
      // with debug builds.
      throw new QuickJSMemoryLeakDetected("Leak sanitizer detected un-freed memory")
    }

    if (this.contexts.size > 0) {
      throw new QuickJSMemoryLeakDetected(`${this.contexts.size} contexts leaked`)
    }

    if (this.runtimes.size > 0) {
      throw new QuickJSMemoryLeakDetected(`${this.runtimes.size} runtimes leaked`)
    }
  }

  getFFI() {
    return this.parent.getFFI()
  }
}
