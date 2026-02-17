#include "perform_funclist_prop_undefined.h"

QTS_CommandStatus perform_funclist_prop_undefined(QTS_CommandEnv *env, FuncListSlot list, JSPropFlags flags, uint32_t index, char *name_ptr) {
    OP_ERROR_IF(env, list >= env->funclist_slots_count, "funclist_prop_undefined: list slot out of range");
    QTS_FuncList *funclist = &env->funclist_slots[list];
    OP_ERROR_IF(env, index >= funclist->count, "funclist_prop_undefined: index out of range");

    const char *name = (const char *)(uintptr_t)name_ptr;
    funclist->entries[index] = (JSCFunctionListEntry)JS_PROP_UNDEFINED_DEF(name, flags);

    return QTS_COMMAND_OK;
}
