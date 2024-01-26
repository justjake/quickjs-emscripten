# quickjs-emscripten + cloudflare workers

Cloudflare Workers need some extra setup steps because of the unusual environment and limitations with the bundling defaults, because Cloudflare refuses to let us read these files and compile them from bytes.

1. We need to copy the WASM files for the QuickJS variants in use into the `src` directory, so we can import them directly. The script [copy-wasm-file-into-src.sh](./copy-wasm-file-into-src.sh) does this. You should copy it to your project, and run it whenever you update `quickjs-emscripten` to a new version. It will copy the WASM and SourceMap files from `node_modules` into the src directory every time you run it.
   - This creates the files `src/DEBUG_SYNC.wasm` and `src/DEBUG_SYNC.wasm.map.txt`. Add them to your .gitignore.
2. We need to override the normal loading behavior to use the special imported WebAssembly.Module. See [src/index.mts](./src/index.mts). Copy and paste the code in index.mts into your project, or do something similar:
   - import the quickjs-emscripten WASM files directly, like `import wasmModule from './DEBUG_SYNC.wasm'`.
   - import the quickjs-emscripten SourceMap.txt files directly as well, like `import wasmSourceMapData from './DEBUG_SYNC.wasm.map.txt'`.
   - create a new variant using those files: `const cloudflareVariant = newVariant(DEBUG_SYNC, { wasmModule, wasmSourceMapData })`.
   - Instead of using `await getQuickJS()`, use `newQuickJSWASMModule(cloudflareVariant)`.
