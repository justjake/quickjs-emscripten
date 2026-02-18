#include "perform_funclist_new.h"

QTS_CommandStatus perform_funclist_new(QTS_CommandEnv *env, FuncListSlot result_funclist_slot, uint32_t count) {
    OP_ERROR_IF(env, count == 0, "funclist_new: count must be greater than 0");

    JSCFunctionListEntry *entries = NULL;
    entries = js_mallocz_rt(JS_GetRuntime(env->ctx), sizeof(*entries) * count);
    OP_ERROR_IF(env, !entries, "funclist_new: allocation failed");

    env->funclist_slots[result_funclist_slot].entries = entries;
    env->funclist_slots[result_funclist_slot].count = count;

    return QTS_COMMAND_OK;
}
