#include "perform_funclist_cfunc_ctor.h"

extern JSValue qts_funclist_call_constructor(JSContext *ctx, JSValueConst new_target, int argc, JSValueConst *argv, int magic);

QTS_CommandStatus perform_funclist_cfunc_ctor(QTS_CommandEnv *env, FuncListSlot list, uint8_t length, JSPropFlags flags, uint32_t index, char *name_ptr, HostRefId host_ref_id) {
    OP_ERROR_IF(env, list >= env->funclist_slots_count, "funclist_cfunc_ctor: list slot out of range");
    QTS_FuncList *funclist = &env->funclist_slots[list];
    OP_ERROR_IF(env, index >= funclist->count, "funclist_cfunc_ctor: index out of range");

    const char *name = (const char *)(uintptr_t)name_ptr;
    JSCFunctionListEntry *entry = &funclist->entries[index];
    entry->name = name;
    entry->prop_flags = flags;
    entry->def_type = JS_DEF_CFUNC;
    entry->magic = (int16_t)host_ref_id;
    entry->u.func.length = length;
    entry->u.func.cproto = JS_CFUNC_constructor_magic;
    entry->u.func.cfunc.constructor_magic = qts_funclist_call_constructor;

    return QTS_COMMAND_OK;
}
