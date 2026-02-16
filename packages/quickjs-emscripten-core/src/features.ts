import type { QuickJSFeature, QuickJSFeatureRecord } from "@jitl/quickjs-ffi-types"
import { QuickJSUnsupported } from "./errors"

// Re-export types for convenience
export type { QuickJSFeature, QuickJSFeatureRecord }

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
  /** @private */
  constructor(private readonly featureRecord: QuickJSFeatureRecord) {}

  /**
   * Check if this QuickJS variant supports a specific feature.
   * @param feature - The feature to check support for
   * @returns `true` if the feature is supported, `false` otherwise
   */
  has(feature: QuickJSFeature): boolean {
    return this.featureRecord[feature]
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
