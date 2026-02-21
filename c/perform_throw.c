#include "perform_throw.h"

// Perform op THROW
// To change function signature, update scripts/idl.ts and run 'pnpm run ops:c'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Throw an exception (JS_Throw)
 * @param env Command execution environment
 * @param error_slot Error value slot to throw
 */
QTS_CommandStatus perform_throw(QTS_CommandEnv *env, JSValueSlot error_slot) {
    JSValue error = OP_GET_JSVALUE(env, error_slot, "throw: error");
    // JS_Throw consumes the error value, so we need to dup it
    JS_Throw(env->ctx, JS_DupValue(env->ctx, error));
    // Always return error after throwing
    OP_ERROR(env, "throw: exception thrown");
}
