#include "perform_funclist_apply.h"

QTS_CommandStatus perform_funclist_apply(QTS_CommandEnv *env, JSValueSlot obj, FuncListSlot list, uint32_t count) {
    OP_ERROR_IF(env, obj >= env->jsvalue_slots_count, "funclist_apply: obj slot out of range");
    OP_ERROR_IF(env, list >= env->funclist_slots_count, "funclist_apply: list slot out of range");

    JSValue obj_val = env->jsvalue_slots[obj];
    JSCFunctionListEntry *entries = env->funclist_slots[list].entries;

    OP_ERROR_IF(env, count > 0 && entries == NULL, "funclist_apply: funclist entries is NULL");
    OP_ERROR_IF(env, JS_SetPropertyFunctionList(env->ctx, obj_val, entries, (int)count) < 0,  "funclist_apply: JS_SetPropertyFunctionList failed");

    return QTS_COMMAND_OK;
}
