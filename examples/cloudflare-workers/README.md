# quickjs-emscripten + cloudflare workers

Cloudflare Workers need some extra setup steps because of the unusual environment and limitations with the bundling defaults, because Cloudflare refuses to let us read these files and compile them from bytes.

1. We need to copy the WASM files for the QuickJS variants in use into the `src` directory, so we can import them directly. See [copy-wasm-file-into-src.sh](./copy-wasm-file-into-src.sh).
2. We need to override the normal loading behavior to use the special imported WebAssembly.Module. See [src/index.mts](./src/index.mts).
