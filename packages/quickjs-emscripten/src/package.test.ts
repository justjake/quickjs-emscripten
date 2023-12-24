import { assert, test } from "vitest"
import packageJson from "../package.json"

test("all import remappings are specified as dependencies", () => {
  for (const [name, mappings] of Object.entries(packageJson.imports)) {
    for (const [condition, importTarget] of Object.entries(mappings)) {
      const importTargetInDependencies =
        packageJson.dependencies[importTarget as keyof typeof packageJson.dependencies]
      assert.isString(
        importTargetInDependencies,
        `package.json import "${name}" condition ${condition} points to ${importTarget}, but it isn't listed in dependencies`,
      )
    }
  }
})

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
