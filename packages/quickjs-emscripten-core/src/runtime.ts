import type {
  BorrowedHeapCharPointer,
  JSContextPointer,
  JSContextPointerPointer,
  JSRuntimePointer,
  EitherFFI,
  EitherModule,
} from "@jitl/quickjs-ffi-types"
import { maybeAsyncFn } from "./asyncify-helpers"
import { QuickJSContext } from "./context"
import { QTS_DEBUG } from "./debug"
import { QuickJSWrongOwner } from "./errors"
import type { Disposable } from "./lifetime"
import { DisposableResult, Lifetime, Scope, UsingDisposable } from "./lifetime"
import { ModuleMemory } from "./memory"
import type { QuickJSModuleCallbacks, RuntimeCallbacks } from "./module"
import type { ContextOptions, JSModuleLoader, JSModuleNormalizer, QuickJSHandle } from "./types"
import { intrinsicsToFlags } from "./types"

/**
 * Callback called regularly while the VM executes code.
 * Determines if a VM's execution should be interrupted.
 *
 * @returns `true` to interrupt JS execution inside the VM.
 * @returns `false` or `undefined` to continue JS execution inside the VM.
 */
export type InterruptHandler = (runtime: QuickJSRuntime) => boolean | undefined | void

/**
 * Used as an optional for the results of executing pendingJobs.
 * On success, `value` contains the number of async jobs executed
 * by the runtime.
 * @source
 */
export type ExecutePendingJobsResult = DisposableResult<
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
 * Implement memory and CPU constraints with {@link setInterruptHandler}
 * (called regularly while the interpreter runs), {@link setMemoryLimit}, and
 * {@link setMaxStackSize}.
 * Use {@link computeMemoryUsage} or {@link dumpMemoryUsage} to guide memory limit
 * tuning.
 *
 * Configure ES module loading with {@link setModuleLoader}.
 */
export class QuickJSRuntime extends UsingDisposable implements Disposable {
  /**
   * If this runtime was created as as part of a context, points to the context
   * associated with the runtime.
   *
   * If this runtime was created stand-alone, this may or may not contain a context.
   * A context here may be allocated if one is needed by the runtime, eg for {@link computeMemoryUsage}.
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
    super()
    args.ownedLifetimes?.forEach((lifetime) => this.scope.manage(lifetime))
    this.module = args.module
    this.memory = new ModuleMemory(this.module)
    this.ffi = args.ffi
    this.rt = args.rt
    this.callbacks = args.callbacks
    this.scope.manage(this.rt)
    this.callbacks.setRuntimeCallbacks(this.rt.value, this.cToHostCallbacks)

    this.executePendingJobs = this.executePendingJobs.bind(this)

    if (QTS_DEBUG) {
      this.setDebugMode(true)
    }
  }

  get alive() {
    return this.scope.alive
  }

  dispose() {
    return this.scope.dispose()
  }

  /**
   * Create a new context within this runtime. Contexts have isolated globals,
   * but you can explicitly share objects between contexts with the same
   * runtime.
   *
   * You should dispose a created context before disposing this runtime.
   */
  newContext(options: ContextOptions = {}): QuickJSContext {
    const intrinsics = intrinsicsToFlags(options.intrinsics)
    const ctx = new Lifetime(
      options.contextPointer || this.ffi.QTS_NewContext(this.rt.value, intrinsics),
      undefined,
      (ctx_ptr) => {
        this.contextMap.delete(ctx_ptr)
        this.callbacks.deleteContext(ctx_ptr)
        this.ffi.QTS_FreeContext(ctx_ptr)
      },
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
   * The loader can be removed with {@link removeModuleLoader}.
   */
  setModuleLoader(moduleLoader: JSModuleLoader, moduleNormalizer?: JSModuleNormalizer): void {
    this.moduleLoader = moduleLoader
    this.moduleNormalizer = moduleNormalizer
    this.ffi.QTS_RuntimeEnableModuleLoader(this.rt.value, this.moduleNormalizer ? 1 : 0)
  }

  /**
   * Remove the the loader set by {@link setModuleLoader}. This disables module loading.
   */
  removeModuleLoader(): void {
    this.moduleLoader = undefined
    this.ffi.QTS_RuntimeDisableModuleLoader(this.rt.value)
  }

  // Runtime management -------------------------------------------------------

  /**
   * In QuickJS, promises and async functions create pendingJobs. These do not execute
   * immediately and need to be run by calling {@link executePendingJobs}.
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
   * The interrupt handler can be removed with {@link removeInterruptHandler}.
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
   * See {@link setInterruptHandler}.
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
   * {@link QuickJSContext#resolvePromise} on the promise handle returned by the async function.
   */
  executePendingJobs(maxJobsToExecute: number | void = -1): ExecutePendingJobsResult {
    const ctxPtrOut = this.memory.newMutablePointerArray<JSContextPointerPointer>(1)
    const valuePtr = this.ffi.QTS_ExecutePendingJob(
      this.rt.value,
      maxJobsToExecute ?? -1,
      ctxPtrOut.value.ptr,
    )

    const ctxPtr = ctxPtrOut.value.typedArray[0] as JSContextPointer
    ctxPtrOut.dispose()
    if (ctxPtr === 0) {
      // No jobs executed.
      this.ffi.QTS_FreeValuePointerRuntime(this.rt.value, valuePtr)
      return DisposableResult.success(0)
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
      return DisposableResult.success(executedJobs)
    } else {
      const error = Object.assign(resultValue as QuickJSHandle, { context })
      return DisposableResult.fail(error, (error) => context.unwrapResult(error))
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
   * JSValue object. Use {@link QuickJSContext#dump} to convert to a native object.
   * Calling this method will allocate more memory inside the runtime. The information
   * is accurate as of just before the call to `computeMemoryUsage`.
   * For a human-digestible representation, see {@link dumpMemoryUsage}.
   */
  computeMemoryUsage(): QuickJSHandle {
    const serviceContextMemory = this.getSystemContext().getMemory(this.rt.value)
    return serviceContextMemory.heapValueHandle(
      this.ffi.QTS_RuntimeComputeMemoryUsage(this.rt.value, serviceContextMemory.ctx.value),
    )
  }

  /**
   * @returns a human-readable description of memory usage in this runtime.
   * For programmatic access to this information, see {@link computeMemoryUsage}.
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
        `Handle is not owned by this runtime: ${handle.owner.rt.value} != ${this.rt.value}`,
      )
    }
  }

  private _debugMode = false

  /**
   * Enable or disable debug logging.
   *
   * If this module is a DEBUG variant, more logs will be printed from the C
   * code.
   */
  setDebugMode(enabled: boolean) {
    this._debugMode = enabled
    if (this.ffi.DEBUG && this.rt.alive) {
      this.ffi.QTS_SetDebugLogEnabled(this.rt.value, enabled ? 1 : 0)
    }
  }

  /**
   * @returns true if debug logging is enabled
   */
  isDebugMode(): boolean {
    return this._debugMode
  }

  /**
   * In debug mode, log the result of calling `msg()`.
   *
   * We take a function instead of a log message to avoid expensive string
   * manipulation if debug logging is disabled.
   */
  debugLog(...msg: unknown[]) {
    if (this._debugMode) {
      console.log("quickjs-emscripten:", ...msg)
    }
  }

  /** @private */
  [Symbol.for("nodejs.util.inspect.custom")]() {
    if (!this.alive) {
      return `${this.constructor.name} { disposed }`
    }
    return `${this.constructor.name} { rt: ${this.rt.value} }`
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
          this.debugLog("cToHostLoadModule: loader returned error", result.error)
          throw result.error
        }

        const moduleSource =
          typeof result === "string" ? result : "value" in result ? result.value : result

        return this.memory.newHeapCharPointer(moduleSource).value.ptr
      } catch (error) {
        this.debugLog("cToHostLoadModule: caught error", error)
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

        const context: QuickJSContext =
          this.contextMap.get(ctx) ??
          this.newContext({
            /* TODO: Does this happen? Are we responsible for disposing? I don't think so */
            contextPointer: ctx,
          })

        try {
          const result = yield* awaited(
            moduleNormalizer(baseModuleName, moduleNameRequest, context),
          )

          if (typeof result === "object" && "error" in result && result.error) {
            this.debugLog("cToHostNormalizeModule: normalizer returned error", result.error)
            throw result.error
          }

          const name = typeof result === "string" ? result : result.value
          return context.getMemory(this.rt.value).newHeapCharPointer(name).value.ptr
        } catch (error) {
          this.debugLog("normalizeModule: caught error", error)
          context.throw(error as any)
          return 0 as BorrowedHeapCharPointer
        }
      },
    ),
  }
}
