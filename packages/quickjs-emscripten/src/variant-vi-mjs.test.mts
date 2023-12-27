import { describe, it } from "vitest"
import { testSuite } from "./variant-test-suite.js"
import * as quickjsEmscripten from "./index.js"

describe("variants (vi mjs)", () => {
  testSuite({ describe, it }, {}, quickjsEmscripten)
})
