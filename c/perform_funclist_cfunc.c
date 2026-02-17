#include "perform_funclist_cfunc.h"

extern JSValue qts_funclist_call_function(JSContext *ctx, JSValueConst this_val, int argc, JSValueConst *argv, int magic);

QTS_CommandStatus perform_funclist_cfunc(QTS_CommandEnv *env, FuncListSlot list, uint8_t length, JSPropFlags flags, uint32_t index, char *name_ptr, HostRefId host_ref_id) {
    OP_ERROR_IF(env, list >= env->funclist_slots_count, "funclist_cfunc: list slot out of range");
    QTS_FuncList *funclist = &env->funclist_slots[list];
    OP_ERROR_IF(env, index >= funclist->count, "funclist_cfunc: index out of range");

    const char *name = (const char *)(uintptr_t)name_ptr;
    funclist->entries[index] = (JSCFunctionListEntry)JS_CFUNC_MAGIC_DEF(name, length, qts_funclist_call_function, (int16_t)host_ref_id);
    funclist->entries[index].prop_flags = flags;

    return QTS_COMMAND_OK;
}
