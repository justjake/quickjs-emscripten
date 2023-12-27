import { describe, it } from "node:test"
import { packageSpecifiers, testSuite } from "./variant-test-suite"
import * as quickjsEmscripten from "."

const VARIANT_LOADERS: Record<string, () => Promise<any>> = {}
for (const [name, conditions] of Object.entries(packageSpecifiers)) {
  if (conditions.import) {
    VARIANT_LOADERS[`import(${name})`] = () => import(name)
  }
  if (conditions.require) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    VARIANT_LOADERS[`require(${name})`] = () => Promise.resolve(require(name))
  }
}

describe("node:test load variants from CommonJS", () => {
  testSuite({ describe, it }, VARIANT_LOADERS, quickjsEmscripten)
})
