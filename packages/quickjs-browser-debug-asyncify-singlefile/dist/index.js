const variant = {
    type: 'async',
    importFFI: () => import('./ffi.js').then(mod => mod.QuickJSAsyncFFI),
    importModuleLoader: () => import('./emscripten-module.js').then(mod => mod.default),
};
export default variant;
//# sourceMappingURL=index.js.map