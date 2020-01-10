export type SuccessOrFail<S, F> = {
  value: S
  error?: undefined
} | {
  error: F
}

export type VmCallResult<VmHandle> = SuccessOrFail<VmHandle, VmHandle>
export type VmFunctionImplementation<VmHandle> = (this: VmHandle, ...args: VmHandle[]) => VmHandle | void

/**
 * A minimal interface to a Javascript execution environment.
 *
 * Higher-level tools should build over the LowLevelJavascriptVm interface to
 * share as much as possible between executors.
 *
 * From https://www.figma.com/blog/how-we-built-the-figma-plugin-system/
 */
export interface LowLevelJavascriptVm<VmHandle> {
  global: VmHandle
  undefined: VmHandle

  typeof(handle: VmHandle): string

  getNumber(handle: VmHandle): number
  getString(handle: VmHandle): string

  newNumber(value: number): VmHandle
  newString(value: string): VmHandle
  newObject(prototype?: VmHandle): VmHandle
  newFunction(name: string, value: VmFunctionImplementation<VmHandle>): VmHandle

  // For accessing properties of objects
  getProp(handle: VmHandle, key: string | VmHandle): VmHandle
  setProp(handle: VmHandle, key: string | VmHandle, value: VmHandle): void
  defineProp(handle: VmHandle, key: string | VmHandle, descriptor: VmPropertyDescriptor<VmHandle>): void

  callFunction(func: VmHandle, thisVal: VmHandle, ...args: VmHandle[]): VmCallResult<VmHandle>
  evalCode(code: string): VmCallResult<VmHandle>
}

/**
 * From https://www.figma.com/blog/how-we-built-the-figma-plugin-system/
 */
export interface VmPropertyDescriptor<VmHandle> {
  value?: VmHandle
  configurable?: boolean
  enumerable?: boolean
  get?: (this: VmHandle) => VmHandle
  set?: (this: VmHandle, value: VmHandle) => void
}
