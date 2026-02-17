#include "perform_funclist_cfunc_ctor.h"

QTS_CommandStatus perform_funclist_cfunc_ctor(QTS_CommandEnv *env, FuncListSlot list, uint8_t length, JSPropFlags flags, uint32_t index, char *name_ptr, HostRefId host_ref_id) {
    OP_ERROR_IF(env, list >= env->funclist_slots_count, "funclist_cfunc_ctor: list slot out of range");

    QTS_FuncList *funclist = &env->funclist_slots[list];
    OP_ERROR_IF(env, funclist->entries == NULL, "funclist_cfunc_ctor: list not initialized");
    OP_ERROR_IF(env, index >= funclist->count, "funclist_cfunc_ctor: index out of range");

    funclist->entries[index] = (JSCFunctionListEntry)JS_CFUNC_SPECIAL_DEF(name_ptr, length, constructor_magic, qts_funclist_call_constructor);
    funclist->entries[index].prop_flags = flags;
    funclist->entries[index].magic = (int16_t)host_ref_id;

    return QTS_COMMAND_OK;
}
