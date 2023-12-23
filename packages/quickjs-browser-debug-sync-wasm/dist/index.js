const variant = {
    type: 'sync',
    importFFI: () => import('./ffi.js').then(mod => mod.QuickJSFFI),
    importModuleLoader: () => import('./emscripten-module.js'),
};
export default variant;
//# sourceMappingURL=index.js.map