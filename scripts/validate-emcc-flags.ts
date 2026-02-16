#!/usr/bin/env -S npx tsx

/**
 * Validates emcc flag classification by testing each flag against emcc.
 *
 * Flags that emit "linker setting ignored during compilation" or
 * "linker flag ignored during compilation" warnings are linker-only flags.
 * Flags that compile without warnings are compiler flags (or work for both).
 *
 * Usage:
 *   corepack yarn tsx scripts/validate-emcc-flags.ts
 */

import { execFile } from "node:child_process"
import { promisify } from "node:util"
import fs from "node:fs"
import path from "node:path"
import os from "node:os"

const execFileAsync = promisify(execFile)

// Flags expected to be compiler-only (or work for both compilation and linking)
const EXPECTED_COMPILER_FLAGS = [
  "-Oz",
  "-O0",
  "-O3",
  "-flto",
  "-DQTS_DEBUG_MODE",
  "-DDUMP_LEAKS=1",
  "-D_GNU_SOURCE",
  '-DCONFIG_VERSION="test"',
  "-DCONFIG_STACK_CHECK",
  "-DQTS_ASYNCIFY=1",
  "-DQTS_ASYNCIFY_DEFAULT_STACK_SIZE=81920",
  "-DQTS_SANITIZE_LEAK",
  "-DQTS_USE_QUICKJS_NG",
  "-DQJS_BUILD_LIBC",
  "-fsanitize=leak",
  "-gsource-map",
  "-g2",
  "-Wcast-function-type",
]

// Flags expected to be linker-only (should produce warnings during -c compilation)
const EXPECTED_LINKER_FLAGS = [
  "-s MODULARIZE=1",
  "-s IMPORTED_MEMORY=1",
  "-s EXPORT_NAME=Test",
  "-s INVOKE_RUN=0",
  "-s ALLOW_MEMORY_GROWTH=1",
  "-s ALLOW_TABLE_GROWTH=1",
  "-s STACK_SIZE=5MB",
  "-s SUPPORT_ERRNO=0",
  "-s IGNORE_MISSING_MAIN=0",
  "--no-entry",
  "-s AUTO_JS_LIBRARIES=0",
  "-s AUTO_NATIVE_LIBRARIES=0",
  "-s AUTO_ARCHIVE_INDEXES=0",
  "-s DEFAULT_TO_CXX=0",
  "-s ALLOW_UNIMPLEMENTED_SYSCALLS=0",
  "-s MIN_NODE_VERSION=160000",
  "-s NODEJS_CATCH_EXIT=0",
  "-s FILESYSTEM=0",
  "-s EXPORT_ES6=1",
  "-s ENVIRONMENT=node",
  "-s ASSERTIONS=1",
  "--closure 1",
  "-s ASYNCIFY=1",
  "-s ASYNCIFY_STACK_SIZE=81920",
  "-s SINGLE_FILE=1",
  "-s WASM=0",
  "-s WASM_ASYNC_COMPILATION=0",
]

type FlagType = "compiler" | "linker" | "error"

interface TestResult {
  flag: string
  expected: FlagType
  actual: FlagType
  passed: boolean
  stderr?: string
}

async function testFlag(flag: string, testCFile: string, testOFile: string): Promise<FlagType> {
  // Split flag into parts (e.g., "-s MODULARIZE=1" -> ["-s", "MODULARIZE=1"])
  const flagParts = flag.split(" ")

  try {
    const { stderr } = await execFileAsync(
      "emcc",
      [...flagParts, "-c", "-o", testOFile, testCFile],
      {
        encoding: "utf-8",
        timeout: 30000,
      },
    )

    // Check for linker warning patterns
    if (
      stderr.includes("linker setting ignored during compilation") ||
      stderr.includes("linker flag ignored during compilation") ||
      stderr.includes("linker input unused")
    ) {
      return "linker"
    }

    return "compiler"
  } catch (error: unknown) {
    const err = error as { stderr?: string; message?: string }
    // Some flags may cause compilation to fail entirely
    if (
      err.stderr?.includes("linker setting ignored during compilation") ||
      err.stderr?.includes("linker flag ignored during compilation")
    ) {
      return "linker"
    }
    console.error(`Error testing flag "${flag}": ${err.message || err}`)
    return "error"
  }
}

async function main() {
  // Check if emcc is available
  try {
    await execFileAsync("emcc", ["--version"], { encoding: "utf-8" })
  } catch (error) {
    console.error("Error: emcc not found. Please ensure Emscripten is installed and in PATH.")
    console.error(
      "You can install it via: brew install emscripten (macOS) or see https://emscripten.org/docs/getting_started/downloads.html",
    )
    process.exit(1)
  }

  // Create temporary test files
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "emcc-flag-test-"))
  const testCFile = path.join(tmpDir, "test.c")
  const testOFile = path.join(tmpDir, "test.o")

  fs.writeFileSync(testCFile, "int main() { return 0; }\n")

  const results: TestResult[] = []
  let passCount = 0
  let failCount = 0

  console.log("Testing compiler flags (should NOT produce linker warnings)...")
  console.log("=".repeat(60))

  for (const flag of EXPECTED_COMPILER_FLAGS) {
    const actual = await testFlag(flag, testCFile, testOFile)
    const passed = actual === "compiler"
    results.push({ flag, expected: "compiler", actual, passed })

    if (passed) {
      passCount++
      console.log(`  [PASS] ${flag}`)
    } else {
      failCount++
      console.log(`  [FAIL] ${flag} - expected compiler, got ${actual}`)
    }

    // Clean up .o file
    try {
      fs.unlinkSync(testOFile)
    } catch {
      // Ignore
    }
  }

  console.log("")
  console.log("Testing linker flags (should produce linker warnings)...")
  console.log("=".repeat(60))

  for (const flag of EXPECTED_LINKER_FLAGS) {
    const actual = await testFlag(flag, testCFile, testOFile)
    const passed = actual === "linker"
    results.push({ flag, expected: "linker", actual, passed })

    if (passed) {
      passCount++
      console.log(`  [PASS] ${flag}`)
    } else {
      failCount++
      console.log(`  [FAIL] ${flag} - expected linker, got ${actual}`)
    }

    // Clean up .o file
    try {
      fs.unlinkSync(testOFile)
    } catch {
      // Ignore
    }
  }

  // Clean up
  fs.rmSync(tmpDir, { recursive: true })

  console.log("")
  console.log("=".repeat(60))
  console.log(`Results: ${passCount} passed, ${failCount} failed`)

  if (failCount > 0) {
    console.log("")
    console.log("Failed flags:")
    for (const result of results) {
      if (!result.passed) {
        console.log(`  - ${result.flag}: expected ${result.expected}, got ${result.actual}`)
      }
    }
    process.exit(1)
  }

  console.log("")
  console.log("All flags correctly classified!")
  process.exit(0)
}

main().catch((error) => {
  console.error("Unexpected error:", error)
  process.exit(2)
})
