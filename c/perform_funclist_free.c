#include "perform_funclist_free.h"
#include <stdlib.h>

QTS_CommandStatus perform_funclist_free(QTS_CommandEnv *env, FuncListSlot list) {
    OP_ERROR_IF(env, list >= env->funclist_slots_count, "funclist_free: list slot out of range");

    js_free_rt(JS_GetRuntime(env->ctx), env->funclist_slots[list].entries);
    env->funclist_slots[list].entries = NULL;
    env->funclist_slots[list].count = 0;

    return QTS_COMMAND_OK;
}
