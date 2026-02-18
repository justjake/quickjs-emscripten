#include "perform_global.h"

// Perform op GLOBAL
// To change function signature, update scripts/idl.ts and run 'pnpm run generate:c-ops'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Get the global object (JS_GetGlobalObject)
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 */
QTS_CommandStatus perform_global(QTS_CommandEnv *env, JSValueSlot result_slot) {
    OP_UNIMPLEMENTED(env, "perform_global");
}
