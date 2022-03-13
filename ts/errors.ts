/**
 * Error thrown if [[QuickJSContext.unwrapResult]] unwraps an error value that isn't an object.
 */
export class QuickJSUnwrapError extends Error {
  name = "QuickJSUnwrapError"
  constructor(public cause: unknown) {
    super(String(cause))
  }
}

export class QuickJSWrongOwner extends Error {
  name = "QuickJSWrongOwner"
}

export class QuickJSUseAfterFree extends Error {
  name = "QuickJSUseAfterFree"
}
