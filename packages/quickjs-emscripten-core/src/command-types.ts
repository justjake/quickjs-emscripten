import type { Brand } from "@jitl/quickjs-ffi-types"

export type JSValueRef = Brand<number, "JSValueRef">
export type FuncListRef = Brand<number, "FuncListRef">
export type CommandRef = Brand<number, "CommandRef">
export type AnyRef = JSValueRef | FuncListRef | CommandRef
