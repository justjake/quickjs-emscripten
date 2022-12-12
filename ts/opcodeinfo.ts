import { EitherModule } from "./emscripten-types"
import { EitherFFI } from "./types"

export class QuickJSOpcodeInfo {
  private module: EitherModule
  private ffi: EitherFFI

  constructor(module: EitherModule, ffi: EitherFFI) {
    this.module = module
    this.ffi = ffi
  }

  public resetOpcodeCounters() {
    this.ffi.QTS_ResetOpcodeCounter()
  }

  public getOpcodesCount() {
    const opcodesArrayPtr = this.ffi.QTS_GetOpcodeCounter()
    const values = new BigInt64Array(this.module.HEAP8.buffer, opcodesArrayPtr, 256)
    const mappedArray = Array.from(values).map((count, opcode) => ({ count, opcode }))

    return mappedArray.filter((item) => item.count > 0)
  }
}
