#include "perform_free.h"

// Perform op FREE
// To change function signature, update scripts/idl.ts and run 'pnpm run generate:c-ops'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Free a value (JS_FreeValue) - decrement refcount
 * @param env Command execution environment
 * @param target_slot Target object to modify
 */
QTS_CommandStatus perform_free(QTS_CommandEnv *env, JSValueSlot target_slot) {
    OP_ERROR_IF(env, target_slot >= env->jsvalue_slots_count, "free: slot out of range");
    JS_FreeValue(env->ctx, env->jsvalue_slots[target_slot]);
    env->jsvalue_slots[target_slot] = JS_UNDEFINED;
    return QTS_COMMAND_OK;
}
