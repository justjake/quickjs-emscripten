import { newQuickJSWASMModuleFromVariant, newVariant, RELEASE_SYNC } from "quickjs-emscripten"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error - ?url returns a URL resolving to the given asset.
import wasmLocation from "@jitl/quickjs-wasmfile-release-sync/wasm?url"

const variant = newVariant(RELEASE_SYNC, {
  wasmLocation,
})

export async function load() {
  return await newQuickJSWASMModuleFromVariant(variant)
}
