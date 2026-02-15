import type { EitherFFI } from "@jitl/quickjs-ffi-types"
import { QuickJSUnsupported } from "./errors"
import type { QuickJSFeature } from "./types"

/**
 * Provides feature detection for a QuickJS variant.
 * Different QuickJS builds may have different feature sets. For example,
 * mquickjs is a minimal build that doesn't support modules, promises,
 * symbols, or BigInt.
 *
 * Access via {@link QuickJSWASMModule#features}, {@link QuickJSRuntime#features},
 * or {@link QuickJSContext#features}.
 */
export class QuickJSFeatures {
  private cache = new Map<QuickJSFeature, boolean>()

  /** @private */
  constructor(private ffi: EitherFFI) {}

  /**
   * Check if this QuickJS variant supports a specific feature.
   * @param feature - The feature to check support for
   * @returns `true` if the feature is supported, `false` otherwise
   */
  has(feature: QuickJSFeature): boolean {
    const cached = this.cache.get(feature)
    if (cached !== undefined) {
      return cached
    }

    let result: number
    switch (feature) {
      case "modules":
        result = this.ffi.QTS_HasModuleSupport()
        break
      case "promises":
        result = this.ffi.QTS_HasPromiseSupport()
        break
      case "symbols":
        result = this.ffi.QTS_HasSymbolSupport()
        break
      case "bigint":
        result = this.ffi.QTS_HasBigIntSupport()
        break
      case "intrinsics":
        result = this.ffi.QTS_HasIntrinsicsSupport()
        break
      case "eval":
        result = this.ffi.QTS_HasEvalSupport()
        break
      default:
        return unreachable(feature)
    }

    const supported = result === 1
    this.cache.set(feature, supported)
    return supported
  }

  /**
   * Assert that this QuickJS variant supports a specific feature.
   * @param feature - The feature to check support for
   * @param operation - Optional description of the operation being attempted
   * @throws {QuickJSUnsupported} If the feature is not supported
   */
  assertHas(feature: QuickJSFeature, operation?: string): void {
    if (!this.has(feature)) {
      throw new QuickJSUnsupported(feature, operation, undefined)
    }
  }
}

function unreachable(x: never): never {
  throw new Error(`Unreachable: ${x}`)
}
