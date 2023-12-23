const variant = {
    type: 'sync',
    importFFI: () => import('./ffi.js').then(mod => mod.QuickJSFFI),
    importModuleLoader: () => import('./emscripten-module.js').then(mod => mod.default),
};
export default variant;
//# sourceMappingURL=index.js.map