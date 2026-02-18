#include "perform_dup_ptr.h"

// Perform op DUP_PTR
// To change function signature, update scripts/idl.ts and run 'pnpm run generate:c-ops'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Duplicate a JSValue* pointer into a JSValueSlot
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param value_ptr Pointer to value to duplicate
 */
QTS_CommandStatus perform_dup_ptr(QTS_CommandEnv *env, JSValueSlot result_slot, JSValue *value_ptr) {
    OP_UNIMPLEMENTED(env, "perform_dup_ptr");
}
