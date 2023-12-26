import { describe, it } from "vitest"
import * as quickjsEmscripten from "quickjs-emscripten"
import { testSuite } from "./variant-test-suite.js"

describe("variants (vi mjs)", () => {
  testSuite({ describe, it }, {}, quickjsEmscripten)
})
