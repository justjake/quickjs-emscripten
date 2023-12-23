declare const variant: {
    readonly type: "sync";
    readonly importFFI: () => Promise<(new (module: import("@jitl/quickjs-ffi-types").QuickJSEmscriptenModule) => import("@jitl/quickjs-ffi-types").QuickJSFFI) | typeof import("./ffi.js").QuickJSFFI>;
    readonly importModuleLoader: () => Promise<import("@jitl/quickjs-ffi-types").EmscriptenModuleLoader<import("@jitl/quickjs-ffi-types").QuickJSEmscriptenModule> | {
        default: import("@jitl/quickjs-ffi-types").EmscriptenModuleLoader<import("@jitl/quickjs-ffi-types").QuickJSEmscriptenModule>;
    } | {
        default: {
            default: import("@jitl/quickjs-ffi-types").EmscriptenModuleLoader<import("@jitl/quickjs-ffi-types").QuickJSEmscriptenModule>;
        };
    } | typeof import("./emscripten-module.js")>;
};
export default variant;
