import * as quickjsEmscripten from "."

import { describe, it } from "node:test"
import { testSuite } from "./variant-test-suite"

const VARIANT_LOADERS = {
  import_debug_sync: () => import("#variants/debug"),
  import_release_sync: () => import("#variants/release"),
  import_debug_async: () => import("#variants/debug-asyncify"),
  import_release_async: () => import("#variants/release-asyncify"),
  require_debug_sync: () => Promise.resolve(require("#variants/debug")),
  require_release_sync: () => Promise.resolve(require("#variants/release")),
  require_debug_async: () => Promise.resolve(require("#variants/debug-asyncify")),
  require_release_async: () => Promise.resolve(require("#variants/release-asyncify")),
}

describe("variants (node:test)", () => {
  testSuite({ describe, it }, VARIANT_LOADERS, quickjsEmscripten)
})
