/** Typescript thinks import('...js/.d.ts') needs mod.default.default */
function fakeUnwrapDefault<T>(mod: { default: T }): T {
  // console.log("fakeUnwrapDefault", mod)
  return mod as T
}

/** Typescript thinks import('...ts') doesn't need mod.default.default, but does */
function actualUnwrapDefault<T>(mod: T): T {
  // console.log("actualUnwrapDefault", mod)
  const maybeUnwrap = (mod as any).default
  return maybeUnwrap ?? mod
}

// I'm not sure if this behavior is needed in all runtimes,
// or just for mocha + ts-node.
export const unwrapTypescript = actualUnwrapDefault
export const unwrapJavascript = fakeUnwrapDefault
