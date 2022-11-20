import { QuickJSContext } from "./context"
import { debugLog } from "./debug"
import {
  Asyncify,
  AsyncifySleepResult,
  EitherModule,
  EmscriptenModuleCallbacks,
} from "./emscripten-types"
import { QuickJSAsyncifyError, QuickJSAsyncifySuspended } from "./errors"
import {
  BorrowedHeapCharPointer,
  JSContextPointer,
  JSRuntimePointer,
  JSValuePointer,
} from "./types-ffi"
import { Lifetime, Scope } from "./lifetime"
import { InterruptHandler, QuickJSRuntime } from "./runtime"
import {
  AsyncRuntimeOptions,
  concat,
  ContextOptions,
  EitherFFI,
  JSModuleLoader,
  RuntimeOptions,
  RuntimeOptionsBase,
} from "./types"

type EmscriptenCallback<BaseArgs extends any[], Result> = (
  ...args: [Asyncify | undefined, ...BaseArgs]
) => Result | AsyncifySleepResult<Result>
type MaybeAsyncEmscriptenCallback<T extends EmscriptenCallback<any, any>> =
  T extends EmscriptenCallback<infer Args, infer Result>
    ? (...args: Args) => Result | Promise<Result>
    : never
type MaybeAsyncEmscriptenCallbacks = {
  [K in keyof EmscriptenModuleCallbacks]: MaybeAsyncEmscriptenCallback<EmscriptenModuleCallbacks[K]>
}

/**
 * @private
 */
export interface ContextCallbacks {
  callFunction: MaybeAsyncEmscriptenCallbacks["callFunction"]
}

/**
 * @private
 */
export interface RuntimeCallbacks {
  shouldInterrupt: MaybeAsyncEmscriptenCallbacks["shouldInterrupt"]
  loadModuleSource: MaybeAsyncEmscriptenCallbacks["loadModuleSource"]
  normalizeModule: MaybeAsyncEmscriptenCallbacks["normalizeModule"]
}

class QuickJSEmscriptenModuleCallbacks implements EmscriptenModuleCallbacks {
  public callFunction: EmscriptenModuleCallbacks["callFunction"]
  public shouldInterrupt: EmscriptenModuleCallbacks["shouldInterrupt"]
  public loadModuleSource: EmscriptenModuleCallbacks["loadModuleSource"]
  public normalizeModule: EmscriptenModuleCallbacks["normalizeModule"]
  constructor(args: EmscriptenModuleCallbacks) {
    this.callFunction = args.callFunction
    this.shouldInterrupt = args.shouldInterrupt
    this.loadModuleSource = args.loadModuleSource
    this.normalizeModule = args.normalizeModule
  }
}

/**
 * Options for [[QuickJSWASMModule.evalCode]].
 */
export interface ModuleEvalOptions {
  /**
   * Interrupt evaluation if `shouldInterrupt` returns `true`.
   * See [[shouldInterruptAfterDeadline]].
   */
  shouldInterrupt?: InterruptHandler

  /**
   * Memory limit, in bytes, of WebAssembly heap memory used by the QuickJS VM.
   */
  memoryLimitBytes?: number

  /**
   * Stack size limit for this vm, in bytes
   * To remove the limit, set to `0`.
   */
  maxStackSizeBytes?: number

  /**
   * Module loader for any `import` statements or expressions.
   */
  moduleLoader?: JSModuleLoader
}

/**
 * We use static functions per module to dispatch runtime or context calls from
 * C to the host.  This class manages the indirection from a specific runtime or
 * context pointer to the appropriate callback handler.
 *
 * @private
 */
export class QuickJSModuleCallbacks {
  private module: EitherModule
  private contextCallbacks = new Map<JSContextPointer, ContextCallbacks>()
  private runtimeCallbacks = new Map<JSRuntimePointer, RuntimeCallbacks>()

  constructor(module: EitherModule) {
    this.module = module
    this.module.callbacks = this.cToHostCallbacks
  }

  setRuntimeCallbacks(rt: JSRuntimePointer, callbacks: RuntimeCallbacks) {
    this.runtimeCallbacks.set(rt, callbacks)
  }

  deleteRuntime(rt: JSRuntimePointer) {
    this.runtimeCallbacks.delete(rt)
  }

  setContextCallbacks(ctx: JSContextPointer, callbacks: ContextCallbacks) {
    this.contextCallbacks.set(ctx, callbacks)
  }

  deleteContext(ctx: JSContextPointer) {
    this.contextCallbacks.delete(ctx)
  }

  private suspendedCount = 0
  private suspended: QuickJSAsyncifySuspended | undefined

  private handleAsyncify<T>(
    asyncify: Asyncify | undefined,
    fn: () => T | Promise<T>
  ): T | AsyncifySleepResult<T> {
    if (asyncify) {
      // We must always call asyncify.handleSync around our function.
      // This allows asyncify to resume suspended execution on the second call.
      // Asyncify internally can detect sync behavior, and avoid suspending.
      return asyncify.handleSleep((done) => {
        try {
          const result = fn()
          if (!(result instanceof Promise)) {
            debugLog("asyncify.handleSleep: not suspending:", result)
            done(result)
            return
          }

          // Is promise, we intend to suspend.
          if (this.suspended) {
            throw new QuickJSAsyncifyError(
              `Already suspended at: ${this.suspended.stack}\nAttempted to suspend at:`
            )
          } else {
            this.suspended = new QuickJSAsyncifySuspended(`(${this.suspendedCount++})`)
            debugLog("asyncify.handleSleep: suspending:", this.suspended)
          }

          result.then(
            (resolvedResult) => {
              this.suspended = undefined
              debugLog("asyncify.handleSleep: resolved:", resolvedResult)
              done(resolvedResult)
            },
            (error) => {
              debugLog("asyncify.handleSleep: rejected:", error)
              console.error("QuickJS: cannot handle error in suspended function", error)
              this.suspended = undefined
            }
          )
        } catch (error) {
          debugLog("asyncify.handleSleep: error:", error)
          this.suspended = undefined
          throw error
        }
      })
    }

    // No asyncify - we should never return a promise.
    const value = fn()
    if (value instanceof Promise) {
      throw new Error("Promise return value not supported in non-asyncify context.")
    }
    return value
  }

  private cToHostCallbacks = new QuickJSEmscriptenModuleCallbacks({
    callFunction: (asyncify, ctx, this_ptr, argc, argv, fn_id) =>
      this.handleAsyncify(asyncify, () => {
        try {
          const vm = this.contextCallbacks.get(ctx)
          if (!vm) {
            throw new Error(`QuickJSContext(ctx = ${ctx}) not found for C function call "${fn_id}"`)
          }
          return vm.callFunction(ctx, this_ptr, argc, argv, fn_id)
        } catch (error) {
          console.error("[C to host error: returning null]", error)
          return 0 as JSValuePointer
        }
      }),

    shouldInterrupt: (asyncify, rt) =>
      this.handleAsyncify(asyncify, () => {
        try {
          const vm = this.runtimeCallbacks.get(rt)
          if (!vm) {
            throw new Error(`QuickJSRuntime(rt = ${rt}) not found for C interrupt`)
          }
          return vm.shouldInterrupt(rt)
        } catch (error) {
          console.error("[C to host interrupt: returning error]", error)
          return 1
        }
      }),

    loadModuleSource: (asyncify, rt, ctx, moduleName) =>
      this.handleAsyncify(asyncify, () => {
        try {
          const runtimeCallbacks = this.runtimeCallbacks.get(rt)
          if (!runtimeCallbacks) {
            throw new Error(`QuickJSRuntime(rt = ${rt}) not found for C module loader`)
          }

          const loadModule = runtimeCallbacks.loadModuleSource
          if (!loadModule) {
            throw new Error(`QuickJSRuntime(rt = ${rt}) does not support module loading`)
          }
          return loadModule(rt, ctx, moduleName)
        } catch (error) {
          console.error("[C to host module loader error: returning null]", error)
          return 0 as BorrowedHeapCharPointer
        }
      }),

    normalizeModule: (asyncify, rt, ctx, moduleBaseName, moduleName) =>
      this.handleAsyncify(asyncify, () => {
        try {
          const runtimeCallbacks = this.runtimeCallbacks.get(rt)
          if (!runtimeCallbacks) {
            throw new Error(`QuickJSRuntime(rt = ${rt}) not found for C module loader`)
          }

          const normalizeModule = runtimeCallbacks.normalizeModule
          if (!normalizeModule) {
            throw new Error(`QuickJSRuntime(rt = ${rt}) does not support module loading`)
          }
          return normalizeModule(rt, ctx, moduleBaseName, moduleName)
        } catch (error) {
          console.error("[C to host module loader error: returning null]", error)
          return 0 as BorrowedHeapCharPointer
        }
      }),
  })
}

/**
 * Process RuntimeOptions and apply them to a QuickJSRuntime.
 * @private
 */
export function applyBaseRuntimeOptions(
  runtime: QuickJSRuntime,
  options: RuntimeOptionsBase
): void {
  if (options.interruptHandler) {
    runtime.setInterruptHandler(options.interruptHandler)
  }

  if (options.maxStackSizeBytes !== undefined) {
    runtime.setMaxStackSize(options.maxStackSizeBytes)
  }

  if (options.memoryLimitBytes !== undefined) {
    runtime.setMemoryLimit(options.memoryLimitBytes)
  }
}

/**
 * Process ModuleEvalOptions and apply them to a QuickJSRuntime.
 * @private
 */
export function applyModuleEvalRuntimeOptions<T extends QuickJSRuntime>(
  runtime: T,
  options: ModuleEvalOptions
) {
  if (options.moduleLoader) {
    runtime.setModuleLoader(options.moduleLoader)
  }

  if (options.shouldInterrupt) {
    runtime.setInterruptHandler(options.shouldInterrupt)
  }

  if (options.memoryLimitBytes !== undefined) {
    runtime.setMemoryLimit(options.memoryLimitBytes)
  }

  if (options.maxStackSizeBytes !== undefined) {
    runtime.setMaxStackSize(options.maxStackSizeBytes)
  }
}

/**
 * This class presents a Javascript interface to QuickJS, a Javascript interpreter
 * that supports EcmaScript 2020 (ES2020).
 *
 * It wraps a single WebAssembly module containing the QuickJS library and
 * associated helper C code. WebAssembly modules are completely isolated from
 * each other by the host's WebAssembly runtime. Separate WebAssembly modules
 * have the most isolation guarantees possible with this library.
 *
 * The simplest way to start running code is {@link evalCode}. This shortcut
 * method will evaluate Javascript safely and return the result as a native
 * Javascript value.
 *
 * For more control over the execution environment, or to interact with values
 * inside QuickJS, create a context with {@link newContext} or a runtime with
 * {@link newRuntime}.
 */
export class QuickJSWASMModule {
  /** @private */
  protected ffi: EitherFFI
  /** @private */
  protected callbacks: QuickJSModuleCallbacks
  /** @private */
  protected module: EitherModule

  /** @private */
  constructor(module: EitherModule, ffi: EitherFFI) {
    this.module = module
    this.ffi = ffi
    this.callbacks = new QuickJSModuleCallbacks(module)
  }

  /**
   * Create a runtime.
   * Use the runtime to set limits on CPU and memory usage and configure module
   * loading for one or more [[QuickJSContext]]s inside the runtime.
   */
  newRuntime(options: RuntimeOptions = {}): QuickJSRuntime {
    const rt = new Lifetime(this.ffi.QTS_NewRuntime(), undefined, (rt_ptr) => {
      this.callbacks.deleteRuntime(rt_ptr)
      this.ffi.QTS_FreeRuntime(rt_ptr)
    })

    const runtime = new QuickJSRuntime({
      module: this.module,
      callbacks: this.callbacks,
      ffi: this.ffi,
      rt,
    })

    applyBaseRuntimeOptions(runtime, options)

    if (options.moduleLoader) {
      runtime.setModuleLoader(options.moduleLoader)
    }

    return runtime
  }

  /**
   * A simplified API to create a new [[QuickJSRuntime]] and a
   * [[QuickJSContext]] inside that runtime at the same time. The runtime will
   * be disposed when the context is disposed.
   */
  newContext(options: ContextOptions = {}): QuickJSContext {
    const runtime = this.newRuntime()
    const context = runtime.newContext({
      ...options,
      ownedLifetimes: concat(runtime, options.ownedLifetimes),
    })
    runtime.context = context
    return context
  }

  /**
   * One-off evaluate code without needing to create a [[QuickJSRuntime]] or
   * [[QuickJSContext]] explicitly.
   *
   * To protect against infinite loops, use the `shouldInterrupt` option. The
   * [[shouldInterruptAfterDeadline]] function will create a time-based deadline.
   *
   * If you need more control over how the code executes, create a
   * [[QuickJSRuntime]] (with [[newRuntime]]) or a [[QuickJSContext]] (with
   * [[newContext]] or [[QuickJSRuntime.newContext]]), and use its
   * [[QuickJSContext.evalCode]] method.
   *
   * Asynchronous callbacks may not run during the first call to `evalCode`. If
   * you need to work with async code inside QuickJS, create a runtime and use
   * [[QuickJSRuntime.executePendingJobs]].
   *
   * @returns The result is coerced to a native Javascript value using JSON
   * serialization, so properties and values unsupported by JSON will be dropped.
   *
   * @throws If `code` throws during evaluation, the exception will be
   * converted into a native Javascript value and thrown.
   *
   * @throws if `options.shouldInterrupt` interrupted execution, will throw a Error
   * with name `"InternalError"` and  message `"interrupted"`.
   */
  evalCode(code: string, options: ModuleEvalOptions = {}): unknown {
    return Scope.withScope((scope) => {
      const vm = scope.manage(this.newContext())

      applyModuleEvalRuntimeOptions(vm.runtime, options)
      const result = vm.evalCode(code, "eval.js")

      if (options.memoryLimitBytes !== undefined) {
        // Remove memory limit so we can dump the result without exceeding it.
        vm.runtime.setMemoryLimit(-1)
      }

      if (result.error) {
        const error = vm.dump(scope.manage(result.error))
        throw error
      }

      const value = vm.dump(scope.manage(result.value))
      return value
    })
  }

  /**
   * Get a low-level interface to the QuickJS functions in this WebAssembly
   * module.
   * @experimental
   * @unstable No warranty is provided with this API. It could change at any time.
   * @private
   */
  getFFI(): EitherFFI {
    return this.ffi
  }
}
