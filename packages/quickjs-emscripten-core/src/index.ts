export * from "@jitl/quickjs-ffi-types"

// Sync classes
export { QuickJSWASMModule } from "./module"
export { QuickJSContext } from "./context"
export { QuickJSRuntime } from "./runtime"
export type { InterruptHandler, ExecutePendingJobsResult } from "./runtime"

// Async classes
export { QuickJSAsyncWASMModule } from "./module-asyncify"
export { QuickJSAsyncRuntime } from "./runtime-asyncify"
export { QuickJSAsyncContext } from "./context-asyncify"
export type { AsyncFunctionImplementation } from "./context-asyncify"

// Build variants
export * from "./from-variant"

// Export helpers
export * from "./vm-interface"
export * from "./lifetime"
export * from "./interrupt-helpers"
/** Collects the informative errors this library may throw. */
export * as errors from "./errors"
export * from "./deferred-promise"
export * from "./module-test"
export type {
  StaticJSValue,
  JSValueConst,
  JSValue,
  QuickJSHandle,
  ContextOptions,
  ContextEvalOptions,
  RuntimeOptions,
  AsyncRuntimeOptions,
  RuntimeOptionsBase,
  JSModuleLoader,
  JSModuleLoadResult,
  JSModuleLoaderAsync,
  JSModuleLoadSuccess,
  JSModuleLoadFailure,
  JSModuleNormalizer,
  JSModuleNormalizerAsync,
  JSModuleNormalizeResult,
  JSModuleNormalizeFailure,
  JSModuleNormalizeSuccess,
  Intrinsics,
} from "./types"
export { DefaultIntrinsics } from "./types"
export type { ModuleEvalOptions } from "./module"
export type { QuickJSPropertyKey } from "./context"
export { debugLog, setDebugMode } from "./debug"
