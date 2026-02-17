#include "perform_funclist_prop_int64.h"

QTS_CommandStatus perform_funclist_prop_int64(QTS_CommandEnv *env, FuncListSlot list, JSPropFlags flags, uint8_t index, int64_t i64_val, char *name_ptr) {
    OP_ERROR_IF(env, list >= env->funclist_slots_count, "funclist_prop_int64: list slot out of range");
    QTS_FuncList *funclist = &env->funclist_slots[list];
    OP_ERROR_IF(env, index >= funclist->count, "funclist_prop_int64: index out of range");

    const char *name = (const char *)(uintptr_t)name_ptr;
    funclist->entries[index] = (JSCFunctionListEntry)JS_PROP_INT64_DEF(name, i64_val, flags);

    return QTS_COMMAND_OK;
}
