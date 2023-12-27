import { describe, it } from "vitest"
import { testSuite } from "./variant-test-suite"
import * as quickjsEmscripten from "."

describe("variants (vi cjs)", () => {
  testSuite({ describe, it }, {}, quickjsEmscripten)
})
