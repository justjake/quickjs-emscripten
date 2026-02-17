#include "perform_funclist_cgetset.h"

extern JSValue qts_funclist_getter(JSContext *ctx, JSValueConst this_val, int magic);
extern JSValue qts_funclist_setter(JSContext *ctx, JSValueConst this_val, JSValueConst val, int magic);

QTS_CommandStatus perform_funclist_cgetset(QTS_CommandEnv *env, FuncListSlot list, JSPropFlags flags, uint8_t index, char *name_ptr, JSCFunctionType *getter_ptr, JSCFunctionType *setter_ptr) {
    OP_ERROR_IF(env, list >= env->funclist_slots_count, "funclist_cgetset: list slot out of range");
    QTS_FuncList *funclist = &env->funclist_slots[list];
    OP_ERROR_IF(env, index >= funclist->count, "funclist_cgetset: index out of range");

    const char *name = (const char *)(uintptr_t)name_ptr;
    int16_t getter_ref = (int16_t)(getter_setter_packed & 0xFFFF);
    int16_t setter_ref = (int16_t)((getter_setter_packed >> 16) & 0xFFFF);

    funclist->entries[index] = (JSCFunctionListEntry)JS_CGETSET_MAGIC_DEF(
        name,
        (getter_ref != 0) ? qts_funclist_getter : NULL,
        (setter_ref != 0) ? qts_funclist_setter : NULL,
        getter_ref);
    funclist->entries[index].prop_flags = flags;

    return QTS_COMMAND_OK;
}
