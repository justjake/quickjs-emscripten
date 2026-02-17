#include "perform_funclist_prop_double.h"

QTS_CommandStatus perform_funclist_prop_double(QTS_CommandEnv *env, FuncListSlot list, JSPropFlags flags, uint8_t index, double f64_val, char *name_ptr) {
    OP_ERROR_IF(env, list >= env->funclist_slots_count, "funclist_prop_double: list slot out of range");

    QTS_FuncList *funclist = &env->funclist_slots[list];
    OP_ERROR_IF(env, funclist->entries == NULL, "funclist_prop_double: list not initialized");
    OP_ERROR_IF(env, index >= funclist->count, "funclist_prop_double: index out of range");

    funclist->entries[index] = (JSCFunctionListEntry)JS_PROP_DOUBLE_DEF(name_ptr, f64_val, flags);

    return QTS_COMMAND_OK;
}
