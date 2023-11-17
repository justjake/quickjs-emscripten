import { getQuickJS, InterruptHandler, QuickJSContext, QuickJSRuntime, RuntimeOptions, shouldInterruptAfterDeadline } from "quickjs-emscripten";
import { Arena } from "quickjs-emscripten-sync";
import "regenerator-runtime/runtime";



declare global {
    interface Window {
        grafxStudio: GrafxStudioVM;
    }

    interface GrafxStudioVM {
        $createInterrupt: (deadline: number | Date) => InterruptHandler;
        createQuickJSContext: (ctx?: QuickJSContext) => Promise<Arena>;
        createQuickJSRuntime: (options?: RuntimeOptions) => Promise<QuickJSRuntime>;
    }
}

const quickJsLibrary = getQuickJS();

const _createContext = async (ctx?: QuickJSContext): Promise<Arena> => {
    let vm;
    if (ctx == null) {
        const quickjs = await quickJsLibrary;
        vm = quickjs.newContext();
    } else {
        vm = ctx;
    }

    return new Arena(vm, {
        isMarshalable: (o: any) => {
            if (o && o.hasOwnProperty && o.hasOwnProperty('$dart_jsFunction')) {
                return false;
            }
            if (o && o instanceof Window) return false;
            return true;
        },
    });
};

const _createRuntime = async (options?: RuntimeOptions): Promise<QuickJSRuntime> => {
    const quickjs = await quickJsLibrary;
    const vm = quickjs.newRuntime(options);
    return vm;
};

function main() {
    window.grafxStudio =
    {
        $createInterrupt: shouldInterruptAfterDeadline,
        createQuickJSContext: _createContext,
        createQuickJSRuntime: _createRuntime,
    }
}

main();