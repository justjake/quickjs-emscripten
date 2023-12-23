"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  DEBUG_ASYNC: () => import_debug_asyncify.default,
  DEBUG_SYNC: () => import_debug.default,
  RELEASE_ASYNC: () => import_release_asyncify.default,
  RELEASE_SYNC: () => import_release.default,
  newQuickJSAsyncWASMModule: () => newQuickJSAsyncWASMModule,
  newQuickJSWASMModule: () => newQuickJSWASMModule
});
module.exports = __toCommonJS(src_exports);
__reExport(src_exports, require("quickjs-emscripten-core"), module.exports);

// src/variants.ts
var import_quickjs_emscripten_core = require("quickjs-emscripten-core");
var import_debug = __toESM(require("quickjs-emscripten/variants/debug"));
var import_release = __toESM(require("quickjs-emscripten/variants/release"));
var import_debug_asyncify = __toESM(require("quickjs-emscripten/variants/debug-asyncify"));
var import_release_asyncify = __toESM(require("quickjs-emscripten/variants/release-asyncify"));
async function newQuickJSWASMModule(variant = import_release.default) {
  return (0, import_quickjs_emscripten_core.newQuickJSWASMModuleFromVariant)(variant);
}
async function newQuickJSAsyncWASMModule(variant = import_release_asyncify.default) {
  return (0, import_quickjs_emscripten_core.newQuickJSAsyncWASMModuleFromVariant)(variant);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DEBUG_ASYNC,
  DEBUG_SYNC,
  RELEASE_ASYNC,
  RELEASE_SYNC,
  newQuickJSAsyncWASMModule,
  newQuickJSWASMModule,
  ...require("quickjs-emscripten-core")
});
//# sourceMappingURL=index.js.map