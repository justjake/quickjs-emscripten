import { maybeAsyncFn } from "./asyncify-helpers"
import { QuickJSContext } from "./context"
import { debugLog } from "./debug"
import { EitherModule } from "./emscripten-types"
import { QuickJSWrongOwner } from "./errors"
import {
  BorrowedHeapCharPointer,
  JSContextPointer,
  JSContextPointerPointer,
  JSModuleDefPointer,
  JSRuntimePointer,
} from "./types-ffi"
import { Disposable, Lifetime, Scope } from "./lifetime"
import { ModuleMemory } from "./memory"
import { QuickJSModuleCallbacks, RuntimeCallbacks } from "./module"
import {
  ContextOptions,
  DefaultIntrinsics,
  EitherFFI,
  JSModuleLoader,
  JSModuleNormalizer,
  QuickJSHandle,
} from "./types"
import { SuccessOrFail } from "./vm-interface"

/**
 * Callback called regularly while the VM executes code.
 * Determines if a VM's execution should be interrupted.
 *
 * @returns `true` to interrupt JS execution inside the VM.
 * @returns `false` or `undefined` to continue JS execution inside the VM.
 */
export type InterruptHandler = (runtime: QuickJSRuntime) => boolean | undefined

/**
 * Used as an optional for the results of executing pendingJobs.
 * On success, `value` contains the number of async jobs executed
 * by the runtime.
 * @source
 */
export type ExecutePendingJobsResult = SuccessOrFail<
  /** Number of jobs successfully executed. */
  number,
  /** The error that occurred. */
  QuickJSHandle & {
    /** The context where the error occurred. */
    context: QuickJSContext
  }
>

/**
 * A runtime represents a Javascript runtime corresponding to an object heap.
 * Several runtimes can exist at the same time but they cannot exchange objects.
 * Inside a given runtime, no multi-threading is supported.
 *
 * You can think of separate runtimes like different domains in a browser, and
 * the contexts within a runtime like the different windows open to the same
 * domain.
 *
 * Create a runtime via {@link QuickJSWASMModule.newRuntime}.
 *
 * You should create separate runtime instances for untrusted code from
 * different sources for isolation. However, stronger isolation is also
 * available (at the cost of memory usage), by creating separate WebAssembly
 * modules to further isolate untrusted code.
 * See {@link newQuickJSWASMModule}.
 *
 * Implement memory and CPU constraints with [[setInterruptHandler]]
 * (called regularly while the interpreter runs), [[setMemoryLimit]], and
 * [[setMaxStackSize]].
 * Use [[computeMemoryUsage]] or [[dumpMemoryUsage]] to guide memory limit
 * tuning.
 *
 * Configure ES module loading with [[setModuleLoader]].
 */
export class QuickJSRuntime implements Disposable {
  /**
   * If this runtime was created as as part of a context, points to the context
   * associated with the runtime.
   *
   * If this runtime was created stand-alone, this may or may not contain a context.
   * A context here may be allocated if one is needed by the runtime, eg for [[computeMemoryUsage]].
   */
  public context: QuickJSContext | undefined

  /** @private */
  protected module: EitherModule
  /** @private */
  protected memory: ModuleMemory
  /** @private */
  protected ffi: EitherFFI
  /** @private */
  protected rt: Lifetime<JSRuntimePointer>
  /** @private */
  protected callbacks: QuickJSModuleCallbacks
  /** @private */
  protected scope = new Scope()

  /** @private */
  protected contextMap = new Map<JSContextPointer, QuickJSContext>()
  /** @private */
  protected moduleLoader: JSModuleLoader | undefined
  /** @private */
  protected moduleNormalizer: JSModuleNormalizer | undefined

  /** @private */
  constructor(args: {
    module: EitherModule
    ffi: EitherFFI
    rt: Lifetime<JSRuntimePointer>
    callbacks: QuickJSModuleCallbacks
    ownedLifetimes?: Disposable[]
  }) {
    args.ownedLifetimes?.forEach((lifetime) => this.scope.manage(lifetime))
    this.module = args.module
    this.memory = new ModuleMemory(this.module)
    this.ffi = args.ffi
    this.rt = args.rt
    this.callbacks = args.callbacks
    this.scope.manage(this.rt)
    this.callbacks.setRuntimeCallbacks(this.rt.value, this.cToHostCallbacks)

    this.executePendingJobs = this.executePendingJobs.bind(this)
  }

  get alive() {
    return this.scope.alive
  }

  dispose() {
    return this.scope.dispose()
  }

  newContext(options: ContextOptions = {}): QuickJSContext {
    if (options.intrinsics && options.intrinsics !== DefaultIntrinsics) {
      throw new Error("TODO: Custom intrinsics are not supported yet")
    }

    const ctx = new Lifetime(
      options.contextPointer || this.ffi.QTS_NewContext(this.rt.value),
      undefined,
      (ctx_ptr) => {
        this.contextMap.delete(ctx_ptr)
        this.callbacks.deleteContext(ctx_ptr)
        this.ffi.QTS_FreeContext(ctx_ptr)
      }
    )

    const context = new QuickJSContext({
      module: this.module,
      ctx,
      ffi: this.ffi,
      rt: this.rt,
      ownedLifetimes: options.ownedLifetimes,
      runtime: this,
      callbacks: this.callbacks,
    })
    this.contextMap.set(ctx.value, context)

    return context
  }

  /**
   * Set the loader for EcmaScript modules requested by any context in this
   * runtime.
   *
   * The loader can be removed with [[removeModuleLoader]].
   */
  setModuleLoader(moduleLoader: JSModuleLoader, moduleNormalizer?: JSModuleNormalizer): void {
    this.moduleLoader = moduleLoader
    this.moduleNormalizer = moduleNormalizer
    this.ffi.QTS_RuntimeEnableModuleLoader(this.rt.value, this.moduleNormalizer ? 1 : 0)
  }

  /**
   * Remove the the loader set by [[setModuleLoader]]. This disables module loading.
   */
  removeModuleLoader(): void {
    this.moduleLoader = undefined
    this.ffi.QTS_RuntimeDisableModuleLoader(this.rt.value)
  }

  // Runtime management -------------------------------------------------------

  /**
   * In QuickJS, promises and async functions create pendingJobs. These do not execute
   * immediately and need to be run by calling [[executePendingJobs]].
   *
   * @return true if there is at least one pendingJob queued up.
   */
  hasPendingJob(): boolean {
    return Boolean(this.ffi.QTS_IsJobPending(this.rt.value))
  }

  private interruptHandler: InterruptHandler | undefined

  /**
   * Set a callback which is regularly called by the QuickJS engine when it is
   * executing code. This callback can be used to implement an execution
   * timeout.
   *
   * The interrupt handler can be removed with [[removeInterruptHandler]].
   */
  setInterruptHandler(cb: InterruptHandler) {
    const prevInterruptHandler = this.interruptHandler
    this.interruptHandler = cb
    if (!prevInterruptHandler) {
      this.ffi.QTS_RuntimeEnableInterruptHandler(this.rt.value)
    }
  }

  /**
   * Remove the interrupt handler, if any.
   * See [[setInterruptHandler]].
   */
  removeInterruptHandler() {
    if (this.interruptHandler) {
      this.ffi.QTS_RuntimeDisableInterruptHandler(this.rt.value)
      this.interruptHandler = undefined
    }
  }

  /**
   * Execute pendingJobs on the runtime until `maxJobsToExecute` jobs are
   * executed (default all pendingJobs), the queue is exhausted, or the runtime
   * encounters an exception.
   *
   * In QuickJS, promises and async functions *inside the runtime* create
   * pendingJobs. These do not execute immediately and need to triggered to run.
   *
   * @param maxJobsToExecute - When negative, run all pending jobs. Otherwise execute
   * at most `maxJobsToExecute` before returning.
   *
   * @return On success, the number of executed jobs. On error, the exception
   * that stopped execution, and the context it occurred in. Note that
   * executePendingJobs will not normally return errors thrown inside async
   * functions or rejected promises. Those errors are available by calling
   * [[resolvePromise]] on the promise handle returned by the async function.
   */
  executePendingJobs(maxJobsToExecute: number | void = -1): ExecutePendingJobsResult {
    const ctxPtrOut = this.memory.newMutablePointerArray<JSContextPointerPointer>(1)
    const valuePtr = this.ffi.QTS_ExecutePendingJob(
      this.rt.value,
      maxJobsToExecute ?? -1,
      ctxPtrOut.value.ptr
    )

    const ctxPtr = ctxPtrOut.value.typedArray[0] as JSContextPointer
    ctxPtrOut.dispose()
    if (ctxPtr === 0) {
      // No jobs executed.
      this.ffi.QTS_FreeValuePointerRuntime(this.rt.value, valuePtr)
      return { value: 0 }
    }

    const context =
      this.contextMap.get(ctxPtr) ??
      this.newContext({
        contextPointer: ctxPtr,
      })

    const resultValue = context.getMemory(this.rt.value).heapValueHandle(valuePtr)
    const typeOfRet = context.typeof(resultValue)
    if (typeOfRet === "number") {
      const executedJobs = context.getNumber(resultValue)
      resultValue.dispose()
      return { value: executedJobs }
    } else {
      const error = Object.assign(resultValue, { context })
      return {
        error,
      }
    }
  }

  /**
   * Set the max memory this runtime can allocate.
   * To remove the limit, set to `-1`.
   */
  setMemoryLimit(limitBytes: number) {
    if (limitBytes < 0 && limitBytes !== -1) {
      throw new Error("Cannot set memory limit to negative number. To unset, pass -1")
    }

    this.ffi.QTS_RuntimeSetMemoryLimit(this.rt.value, limitBytes)
  }

  /**
   * Compute memory usage for this runtime. Returns the result as a handle to a
   * JSValue object. Use [[QuickJSContext.dump]] to convert to a native object.
   * Calling this method will allocate more memory inside the runtime. The information
   * is accurate as of just before the call to `computeMemoryUsage`.
   * For a human-digestible representation, see [[dumpMemoryUsage]].
   */
  computeMemoryUsage(): QuickJSHandle {
    const serviceContextMemory = this.getSystemContext().getMemory(this.rt.value)
    return serviceContextMemory.heapValueHandle(
      this.ffi.QTS_RuntimeComputeMemoryUsage(this.rt.value, serviceContextMemory.ctx.value)
    )
  }

  /**
   * @returns a human-readable description of memory usage in this runtime.
   * For programmatic access to this information, see [[computeMemoryUsage]].
   */
  dumpMemoryUsage(): string {
    return this.memory.consumeHeapCharPointer(this.ffi.QTS_RuntimeDumpMemoryUsage(this.rt.value))
  }

  /**
   * Set the max stack size for this runtime, in bytes.
   * To remove the limit, set to `0`.
   */
  setMaxStackSize(stackSize: number) {
    if (stackSize < 0) {
      throw new Error("Cannot set memory limit to negative number. To unset, pass 0.")
    }

    this.ffi.QTS_RuntimeSetMaxStackSize(this.rt.value, stackSize)
  }

  /**
   * Assert that `handle` is owned by this runtime.
   * @throws QuickJSWrongOwner if owned by a different runtime.
   */
  assertOwned(handle: QuickJSHandle) {
    if (handle.owner && handle.owner.rt !== this.rt) {
      throw new QuickJSWrongOwner(
        `Handle is not owned by this runtime: ${handle.owner.rt.value} != ${this.rt.value}`
      )
    }
  }

  private getSystemContext() {
    if (!this.context) {
      // We own this context and should dispose of it.
      this.context = this.scope.manage(this.newContext())
    }
    return this.context
  }

  private cToHostCallbacks: RuntimeCallbacks = {
    shouldInterrupt: (rt) => {
      if (rt !== this.rt.value) {
        throw new Error("QuickJSContext instance received C -> JS interrupt with mismatched rt")
      }

      const fn = this.interruptHandler
      if (!fn) {
        throw new Error("QuickJSContext had no interrupt handler")
      }

      return fn(this) ? 1 : 0
    },

    loadModuleSource: maybeAsyncFn(this, function* (awaited, rt, ctx, moduleName) {
      const moduleLoader = this.moduleLoader
      if (!moduleLoader) {
        throw new Error("Runtime has no module loader")
      }

      if (rt !== this.rt.value) {
        throw new Error("Runtime pointer mismatch")
      }

      const context =
        this.contextMap.get(ctx) ??
        this.newContext({
          contextPointer: ctx,
        })

      try {
        const result = yield* awaited(moduleLoader(moduleName, context))

        if (typeof result === "object" && "error" in result && result.error) {
          debugLog("cToHostLoadModule: loader returned error", result.error)
          throw result.error
        }

        const moduleSource =
          typeof result === "string" ? result : "value" in result ? result.value : result

        return this.memory.newHeapCharPointer(moduleSource).value
      } catch (error) {
        debugLog("cToHostLoadModule: caught error", error)
        context.throw(error as any)
        return 0 as BorrowedHeapCharPointer
      }
    }),

    normalizeModule: maybeAsyncFn(
      this,
      function* (awaited, rt, ctx, baseModuleName, moduleNameRequest) {
        const moduleNormalizer = this.moduleNormalizer
        if (!moduleNormalizer) {
          throw new Error("Runtime has no module normalizer")
        }

        if (rt !== this.rt.value) {
          throw new Error("Runtime pointer mismatch")
        }

        const context =
          this.contextMap.get(ctx) ??
          this.newContext({
            /* TODO: Does this happen? Are we responsible for disposing? I don't think so */
            contextPointer: ctx,
          })

        try {
          const result = yield* awaited(
            moduleNormalizer(baseModuleName, moduleNameRequest, context)
          )

          if (typeof result === "object" && "error" in result && result.error) {
            debugLog("cToHostNormalizeModule: normalizer returned error", result.error)
            throw result.error
          }

          const name = typeof result === "string" ? result : result.value
          return context.getMemory(this.rt.value).newHeapCharPointer(name).value
        } catch (error) {
          debugLog("normalizeModule: caught error", error)
          context.throw(error as any)
          return 0 as BorrowedHeapCharPointer
        }
      }
    ),
  }
}
