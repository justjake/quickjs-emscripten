#include "perform_funclist_object.h"

QTS_CommandStatus perform_funclist_object(QTS_CommandEnv *env, FuncListSlot list, JSPropFlags flags, uint32_t index, char *name_ptr, Uint16Pair nested_packed) {
    OP_ERROR_IF(env, list >= env->funclist_slots_count, "funclist_object: list slot out of range");

    QTS_FuncList *funclist = &env->funclist_slots[list];
    OP_ERROR_IF(env, funclist->entries == NULL, "funclist_object: list not initialized");
    OP_ERROR_IF(env, index >= funclist->count, "funclist_object: index out of range");

    // nested_packed.low = funclist slot index for nested list
    // nested_packed.high = count of entries in nested list
    FuncListSlot nested_slot = nested_packed.low;
    uint16_t nested_count = nested_packed.high;

    OP_ERROR_IF(env, nested_slot >= env->funclist_slots_count, "funclist_object: nested slot out of range");

    QTS_FuncList *nested_funclist = &env->funclist_slots[nested_slot];
    OP_ERROR_IF(env, nested_funclist->entries == NULL, "funclist_object: nested list not initialized");

    funclist->entries[index] = (JSCFunctionListEntry)JS_OBJECT_DEF(name_ptr, nested_funclist->entries, nested_count, flags);

    return QTS_COMMAND_OK;
}
