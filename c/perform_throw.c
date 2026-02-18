#include "perform_throw.h"

// Perform op THROW
// To change function signature, update scripts/idl.ts and run 'pnpm run generate:c-ops'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Throw an exception (JS_Throw)
 * @param env Command execution environment
 * @param error_slot Error value slot to throw
 */
QTS_CommandStatus perform_throw(QTS_CommandEnv *env, JSValueSlot error_slot) {
    OP_UNIMPLEMENTED(env, "perform_throw");
}
