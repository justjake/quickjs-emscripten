#include "perform_funclist_prop_int32.h"

QTS_CommandStatus perform_funclist_prop_int32(QTS_CommandEnv *env, FuncListSlot list, JSPropFlags flags, uint32_t index, char *name_ptr, int32_t int_val) {
    OP_ERROR_IF(env, list >= env->funclist_slots_count, "funclist_prop_int32: list slot out of range");

    QTS_FuncList *funclist = &env->funclist_slots[list];
    OP_ERROR_IF(env, funclist->entries == NULL, "funclist_prop_int32: list not initialized");
    OP_ERROR_IF(env, index >= funclist->count, "funclist_prop_int32: index out of range");

    funclist->entries[index] = (JSCFunctionListEntry)JS_PROP_INT32_DEF(name_ptr, int_val, flags);

    return QTS_COMMAND_OK;
}
