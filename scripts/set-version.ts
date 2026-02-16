#!/usr/bin/env -S npx tsx
import type { PackageJson } from "./helpers.js"
import { getWorkspaces, readJson, writePretty } from "./helpers.js"

async function main() {
  const NEXT_VERSION = process.argv[2]
  if (!NEXT_VERSION) {
    throw new Error(`Usage: ${process.argv[0]} <version>`)
  }

  const set: Record<string, string> = {}
  for (const workspace of getWorkspaces()) {
    const packageJson: PackageJson = readJson(workspace.location + "/package.json")
    if (packageJson.version === NEXT_VERSION) {
      set[packageJson.name] = `unchanged (${NEXT_VERSION})`
      continue
    }

    set[packageJson.name] = `${packageJson.version} -> ${NEXT_VERSION}`
    packageJson.version = NEXT_VERSION
    // get rid of annoying Yarn thingy
    ;(packageJson as any).stableVersion = undefined
    await writePretty(workspace.location + "/package.json", JSON.stringify(packageJson, null, 2))
  }
  console.log(set)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
