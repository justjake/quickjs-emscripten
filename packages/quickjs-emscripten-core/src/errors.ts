import type { QuickJSContext } from "./context"

/**
 * Error thrown if {@link QuickJSContext#unwrapResult} unwraps an error value that isn't an object.
 */
export class QuickJSUnwrapError extends Error {
  name = "QuickJSUnwrapError"
  constructor(
    public cause: unknown,
    public context?: QuickJSContext,
  ) {
    const message =
      typeof cause === "object" && cause && "message" in cause
        ? String(cause.message)
        : String(cause)
    super(message)
  }
}

export class QuickJSWrongOwner extends Error {
  name = "QuickJSWrongOwner"
}

export class QuickJSUseAfterFree extends Error {
  name = "QuickJSUseAfterFree"
}

export class QuickJSNotImplemented extends Error {
  name = "QuickJSNotImplemented"
}

export class QuickJSAsyncifyError extends Error {
  name = "QuickJSAsyncifyError"
}

export class QuickJSAsyncifySuspended extends Error {
  name = "QuickJSAsyncifySuspended"
}

export class QuickJSMemoryLeakDetected extends Error {
  name = "QuickJSMemoryLeakDetected"
}

export class QuickJSEmscriptenModuleError extends Error {
  name = "QuickJSEmscriptenModuleError"
}

export class QuickJSUnknownIntrinsic extends TypeError {
  name = "QuickJSUnknownIntrinsic"
}

export class QuickJSPromisePending extends Error {
  name = "QuickJSPromisePending"
}

export class QuickJSEmptyGetOwnPropertyNames extends Error {
  name = "QuickJSEmptyGetOwnPropertyNames"
}
