declare const variant: {
    readonly type: "async";
    readonly importFFI: () => Promise<(new (module: import("@jitl/quickjs-ffi-types").QuickJSAsyncEmscriptenModule) => import("@jitl/quickjs-ffi-types").QuickJSAsyncFFI) | typeof import("./ffi.js").QuickJSAsyncFFI>;
    readonly importModuleLoader: () => Promise<import("@jitl/quickjs-ffi-types").EmscriptenModuleLoader<import("@jitl/quickjs-ffi-types").QuickJSAsyncEmscriptenModule> | {
        default: import("@jitl/quickjs-ffi-types").EmscriptenModuleLoader<import("@jitl/quickjs-ffi-types").QuickJSAsyncEmscriptenModule>;
    } | {
        default: {
            default: import("@jitl/quickjs-ffi-types").EmscriptenModuleLoader<import("@jitl/quickjs-ffi-types").QuickJSAsyncEmscriptenModule>;
        };
    }>;
};
export default variant;
