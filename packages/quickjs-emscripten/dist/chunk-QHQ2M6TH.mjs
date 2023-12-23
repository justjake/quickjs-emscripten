// src/variants.ts
import {
  newQuickJSWASMModuleFromVariant,
  newQuickJSAsyncWASMModuleFromVariant
} from "quickjs-emscripten-core";
import DEBUG_SYNC from "quickjs-emscripten/variants/debug";
import RELEASE_SYNC from "quickjs-emscripten/variants/release";
import DEBUG_ASYNC from "quickjs-emscripten/variants/debug-asyncify";
import RELEASE_ASYNC from "quickjs-emscripten/variants/release-asyncify";
async function newQuickJSWASMModule(variant = RELEASE_SYNC) {
  return newQuickJSWASMModuleFromVariant(variant);
}
async function newQuickJSAsyncWASMModule(variant = RELEASE_ASYNC) {
  return newQuickJSAsyncWASMModuleFromVariant(variant);
}

export {
  DEBUG_SYNC,
  RELEASE_SYNC,
  DEBUG_ASYNC,
  RELEASE_ASYNC,
  newQuickJSWASMModule,
  newQuickJSAsyncWASMModule
};
//# sourceMappingURL=chunk-QHQ2M6TH.mjs.map