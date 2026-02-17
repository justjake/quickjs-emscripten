#include "perform_funclist_new.h"

QTS_CommandStatus perform_funclist_new(QTS_CommandEnv *env, FuncListSlot result, uint32_t count) {
    JSCFunctionListEntry *entries = NULL;
    if (count > 0) {
        entries = js_mallocz_rt(JS_GetRuntime(env->ctx), sizeof(JSCFunctionListEntry) * count);
        OP_ERROR_IF(env, !entries, "funclist_new: allocation failed");
    }

    env->funclist_slots[result].entries = entries;
    env->funclist_slots[result].count = count;

    return QTS_COMMAND_OK;
}
