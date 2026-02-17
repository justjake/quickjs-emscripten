#include "perform_funclist_object.h"

QTS_CommandStatus perform_funclist_object(QTS_CommandEnv *env, FuncListSlot list, JSPropFlags flags, uint32_t index, char *name_ptr, Uint16Pair nested_packed) {
    OP_ERROR_IF(env, list >= env->funclist_slots_count, "funclist_object: list slot out of range");
    QTS_FuncList *funclist = &env->funclist_slots[list];
    OP_ERROR_IF(env, index >= funclist->count, "funclist_object: index out of range");

    uint8_t source_funclist_slot = (uint8_t)(nested_packed & 0xFF);
    uint32_t source_funclist_count = (nested_packed >> 8);

    OP_ERROR_IF(env, source_funclist_slot >= env->funclist_slots_count, "funclist_object: nested slot out of range");

    const char *name = (const char *)(uintptr_t)name_ptr;
    QTS_FuncList *nested_funclist = &env->funclist_slots[source_funclist_slot];

    funclist->entries[index] = (JSCFunctionListEntry)JS_OBJECT_DEF(name, nested_funclist->entries, (int)source_funclist_count, flags);

    return QTS_COMMAND_OK;
}
