import { describe, it } from "node:test"
import { createRequire } from "node:module"

import * as quickjsEmscripten from "quickjs-emscripten"
import { packageSpecifiers, testSuite } from "./variant-test-suite.js"

const require = createRequire(import.meta.url)

const VARIANT_LOADERS: Record<string, () => Promise<any>> = {}
for (const [name, conditions] of Object.entries(packageSpecifiers)) {
  if (conditions.import) {
    VARIANT_LOADERS[`import(${name})`] = () => import(name)
  }
  if (conditions.require) {
    VARIANT_LOADERS[`require(${name})`] = () => Promise.resolve(require(name))
  }
}

describe("variants (node:test)", () => {
  testSuite({ describe, it }, VARIANT_LOADERS, quickjsEmscripten)
})
