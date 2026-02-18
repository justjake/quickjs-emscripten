#include "perform_funclist_free.h"
#include <stdlib.h>

/**
 * Free a funclist array
 * @param env Command execution environment
 * @param target_funclist_slot Target funclist to modify
 */
QTS_CommandStatus perform_funclist_free(QTS_CommandEnv *env, FuncListSlot target_funclist_slot) {
    OP_ERROR_IF(env, target_funclist_slot >= env->funclist_slots_count, "funclist_free: funclist slot out of range");

    js_free_rt(JS_GetRuntime(env->ctx), env->funclist_slots[target_funclist_slot].entries);
    env->funclist_slots[target_funclist_slot].entries = NULL;
    env->funclist_slots[target_funclist_slot].count = 0;

    return QTS_COMMAND_OK;
}
