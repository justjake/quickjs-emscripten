#include "perform_set_idx_value.h"

// Perform op SET_IDX_VALUE
// To change function signature, update scripts/idl.ts and run 'pnpm run generate:c-ops'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Set array element by index to JSValue from slot (JS_SetPropertyUint32)
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param value_slot slot containing value
 * @param index Array index
 */
QTS_CommandStatus perform_set_idx_value(QTS_CommandEnv *env, JSValueSlot target_slot, JSValueSlot value_slot, uint32_t index) {
    OP_UNIMPLEMENTED(env, "perform_set_idx_value");
}
