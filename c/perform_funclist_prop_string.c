#include "perform_funclist_prop_string.h"

QTS_CommandStatus perform_funclist_prop_string(QTS_CommandEnv *env, FuncListSlot list, JSPropFlags flags, uint8_t index, char *str_ptr, uint32_t str_len, char *name_ptr) {
    (void)str_len; // String value is null-terminated; length provided for consistency with buf type
    OP_ERROR_IF(env, list >= env->funclist_slots_count, "funclist_prop_string: list slot out of range");
    QTS_FuncList *funclist = &env->funclist_slots[list];
    OP_ERROR_IF(env, index >= funclist->count, "funclist_prop_string: index out of range");

    funclist->entries[index] = (JSCFunctionListEntry)JS_PROP_STRING_DEF(name_ptr, str_ptr, flags);

    return QTS_COMMAND_OK;
}
