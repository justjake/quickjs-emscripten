#include "perform_funclist_assign.h"

// Perform op FUNCLIST_ASSIGN
// To change function signature, update scripts/idl.ts and run 'pnpm run generate:c-ops'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Assign all properties defined in the funclist to the target object (JS_SetPropertyFunctionList)
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param source_funclist_slot Funclist slot
 */
QTS_CommandStatus perform_funclist_assign(QTS_CommandEnv *env, JSValueSlot target_slot, FuncListSlot source_funclist_slot) {
    OP_ERROR_IF(env, source_funclist_slot >= env->funclist_slots_count, "funclist_assign: source funclist slot out of range");
    OP_ERROR_IF(env, !env->funclist_slots[source_funclist_slot].entries, "funclist_assign: source funclist not allocated");
    OP_ERROR_IF(env, env->funclist_slots[source_funclist_slot].count == 0, "funclist_assign: source funclist is empty");

    int retval = JS_SetPropertyFunctionList(env->ctx, env->jsvalue_slots[target_slot], env->funclist_slots[source_funclist_slot].entries, env->funclist_slots[source_funclist_slot].count);
    OP_ERROR_IF(env, retval != 0, "funclist_assign: JS_SetPropertyFunctionList failed");

    return QTS_COMMAND_OK;
}
