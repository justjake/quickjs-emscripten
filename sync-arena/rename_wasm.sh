#!/usr/bin/env bash

base="grafx-studio-quickjs"

find dist_pack/. -type f | xargs sed -i "s/emscripten-module.WASM_RELEASE_SYNC.wasm/${base}.wasm/g"
find dist_pack/. -type f | xargs sed -i "s/emscripten-module.WASM_DEBUG_SYNC.wasm/${base}-debug.wasm/g"
find dist_pack/. -type f | xargs sed -i "s/emscripten-module.WASM_RELEASE_ASYNCIFY.wasm/${base}-async.wasm/g"
find dist_pack/. -type f | xargs sed -i "s/emscripten-module.WASM_DEBUG_ASYNCIFY.wasm/${base}-async-debug.wasm/g"

mv dist_pack/emscripten-module.WASM_RELEASE_SYNC.wasm dist_pack/${base}.wasm
mv dist_pack/emscripten-module.WASM_DEBUG_SYNC.wasm dist_pack/${base}-debug.wasm
mv dist_pack/emscripten-module.WASM_RELEASE_ASYNCIFY.wasm dist_pack/${base}-async.wasm
mv dist_pack/emscripten-module.WASM_DEBUG_ASYNCIFY.wasm dist_pack/${base}-async-debug.wasm