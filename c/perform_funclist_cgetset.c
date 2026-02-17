#include "perform_funclist_cgetset.h"

QTS_CommandStatus perform_funclist_cgetset(QTS_CommandEnv *env, FuncListSlot list, JSPropFlags flags, uint8_t index, char *name_ptr, JSCFunctionType *getter_ptr, JSCFunctionType *setter_ptr) {
    OP_ERROR_IF(env, list >= env->funclist_slots_count, "funclist_cgetset: list slot out of range");

    QTS_FuncList *funclist = &env->funclist_slots[list];
    OP_ERROR_IF(env, funclist->entries == NULL, "funclist_cgetset: list not initialized");
    OP_ERROR_IF(env, index >= funclist->count, "funclist_cgetset: index out of range");

    JSValue (*getter)(JSContext*, JSValueConst) = getter_ptr ? getter_ptr->getter : NULL;
    JSValue (*setter)(JSContext*, JSValueConst, JSValueConst) = setter_ptr ? setter_ptr->setter : NULL;

    funclist->entries[index] = (JSCFunctionListEntry)JS_CGETSET_DEF(name_ptr, getter, setter);
    funclist->entries[index].prop_flags = flags;

    return QTS_COMMAND_OK;
}
