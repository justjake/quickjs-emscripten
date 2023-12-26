import { describe, it } from "vitest"
import * as quickjsEmscripten from "."
import { testSuite } from "./variant-test-suite"

describe("variants (vi cjs)", () => {
  testSuite({ describe, it }, {}, quickjsEmscripten)
})
