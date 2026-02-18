#include "perform_dup.h"

// Perform op DUP
// To change function signature, update scripts/idl.ts and run 'pnpm run generate:c-ops'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Duplicate a value (JS_DupValue) - increment refcount
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param source_slot source value will be read from this slot
 */
QTS_CommandStatus perform_dup(QTS_CommandEnv *env, JSValueSlot result_slot, JSValueSlot source_slot) {
    JSValue source = OP_GET_JSVALUE(env, source_slot, "dup: source");
    OP_SET_JSVALUE(env, result_slot, JS_DupValue(env->ctx, source));
    return QTS_COMMAND_OK;
}
