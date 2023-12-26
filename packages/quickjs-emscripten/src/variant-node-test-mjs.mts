import * as quickjsEmscripten from "quickjs-emscripten"

import { describe, it } from "node:test"
import { importSpecifiers, testSuite } from "./variant-test-suite.js"
import { createRequire } from "node:module"

const require = createRequire(import.meta.url)

const VARIANT_LOADERS = {
  import_debug_sync: () => import(importSpecifiers.debug_sync),
  import_release_sync: () => import(importSpecifiers.release_sync),
  import_debug_async: () => import(importSpecifiers.debug_async),
  import_release_async: () => import(importSpecifiers.release_async),
  require_debug_sync: () => Promise.resolve(require(importSpecifiers.debug_sync)),
  require_release_sync: () => Promise.resolve(require(importSpecifiers.release_sync)),
  require_debug_async: () => Promise.resolve(require(importSpecifiers.debug_async)),
  require_release_async: () => Promise.resolve(require(importSpecifiers.release_async)),
}

describe("variants (node:test)", () => {
  testSuite({ describe, it }, VARIANT_LOADERS, quickjsEmscripten)
})
