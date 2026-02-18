#include "perform_new_array.h"

// Perform op NEW_ARRAY
// To change function signature, update scripts/idl.ts and run 'pnpm run generate:c-ops'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Create a new empty array (JS_NewArray)
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 */
QTS_CommandStatus perform_new_array(QTS_CommandEnv *env, JSValueSlot result_slot) {
    OP_SET_JSVALUE(env, result_slot, JS_NewArray(env->ctx));
    return QTS_COMMAND_OK;
}
