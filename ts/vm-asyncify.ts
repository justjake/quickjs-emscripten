import { QuickJSAsyncEmscriptenModule } from './emscripten-types'
import { QuickJSFFI } from './ffi'
import { QuickJSAsyncFFI } from './ffi-asyncify'
import { JSContextPointer, JSRuntimePointer } from './ffi-types'
import { Lifetime } from './lifetime'
import { PureQuickJSVm } from './vm'

export class QuickJSAsyncVm extends PureQuickJSVm {
  protected readonly module: QuickJSAsyncEmscriptenModule
  protected readonly asyncFFI: QuickJSAsyncFFI

  /**
   * Use {@link QuickJS.createAsyncVm} to create a QuickJSAsyncVm instance.
   */
  constructor(args: {
    module: QuickJSAsyncEmscriptenModule
    ffi: QuickJSFFI
    asyncFFI: QuickJSAsyncFFI
    ctx: Lifetime<JSContextPointer>
    rt: Lifetime<JSRuntimePointer>
  }) {
    const { module, asyncFFI } = args
    super(args)
    this.module = module
    this.asyncFFI = asyncFFI
  }
}
