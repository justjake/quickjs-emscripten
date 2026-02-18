#include "perform_funclist_def_cfunc.h"

// Perform op FUNCLIST_DEF_CFUNC
// To change function signature, update scripts/idl.ts and run 'pnpm run generate:c-ops'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Set funclist entry to JS_DEF_CFUNC
 * @param env Command execution environment
 * @param target_funclist_slot Target funclist to modify
 * @param arity Function.length (arity)
 * @param flags JS_PROP_* property flags
 * @param index Index to set in the target funclist (uint32_t)
 * @param func_name_ptr Function name, MUST be null-terminated
 * @param c_func_ptr Pointer to C function implementing one of JSFunctionType (*not* a HostRef, this is a raw function pointer)
 */
QTS_CommandStatus perform_funclist_def_cfunc(QTS_CommandEnv *env, FuncListSlot target_funclist_slot, uint8_t arity, JSPropFlags flags, uint32_t index, char *func_name_ptr, JSCFunctionType *c_func_ptr) {
    QTS_FuncList *funclist = OP_GET_FUNCLIST(env, target_funclist_slot, "funclist_def_cfunc");
    OP_ERROR_IF(env, index >= funclist->count, "funclist_def_cfunc: index out of range");

    // Use JS_CFUNC_DEF macro pattern, but with custom flags
    funclist->entries[index] = (JSCFunctionListEntry)JS_CFUNC_DEF(func_name_ptr, arity, c_func_ptr->generic);
    funclist->entries[index].prop_flags = flags;

    return QTS_COMMAND_OK;
}
