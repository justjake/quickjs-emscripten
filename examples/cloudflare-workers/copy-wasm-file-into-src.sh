#!/usr/bin/env bash

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
		cp -v "$WASM_FILE.map" src/$VARIANT.wasm.map
	fi
done
