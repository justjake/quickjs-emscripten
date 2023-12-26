import { assert, test } from "vitest"
import packageJson from "../package.json"

test("all export subpaths start with ./", () => {
  for (const [name, mappings] of Object.entries(packageJson.exports)) {
    if (typeof mappings === "string") {
      assert.isTrue(
        mappings.startsWith("./"),
        `package.json export "${name}" points to ${mappings}, but it doesn't start with ./`,
      )
      continue
    }

    for (const [condition, subpath] of Object.entries(mappings)) {
      assert.isTrue(
        subpath.startsWith("./"),
        `package.json export "${name}" condition ${condition} subpath ${subpath} does not start with ./`,
      )
    }
  }
})
