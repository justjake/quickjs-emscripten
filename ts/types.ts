import type { QuickJSFFI } from './ffi'
import type { QuickJSAsyncFFI } from './ffi-asyncify'

export type EitherFFI = QuickJSFFI | QuickJSAsyncFFI
