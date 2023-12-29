#!/usr/bin/env bash
#
# quickjs-emscripten exposes an export for the .wasm file, but Cloudflare refuses to accept it.
# Cloudflare's build system only allows importing .wasm files using a relative path.
# Github issue: https://github.com/cloudflare/workers-sdk/issues/1672
#
# Instead the easy way out is to just copy the .wasm files we need into the build directory.
# Once there, we can import them and use them to make a new quickjs variant.
#

set -eo pipefail

VARIANTS=(
	DEBUG_SYNC
	RELEASE_SYNC
)

for VARIANT in "${VARIANTS[@]}"; do
	kebab="$(echo "$VARIANT" | tr '[:upper:]' '[:lower:]' | tr '_' '-')"
	WASM_FILE="$(node -p 'require.resolve("@jitl/quickjs-wasmfile-'$kebab'/wasm")')"
	cp -v "$WASM_FILE" src/$VARIANT.wasm
	if [[ -f "$WASM_FILE.map" ]]; then
		cp -v "$WASM_FILE.map" src/$VARIANT.wasm.map.txt
	fi
done
