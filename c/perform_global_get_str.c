#include "perform_global_get_str.h"

// Perform op GLOBAL_GET_STR
// To change function signature, update scripts/idl.ts and run 'pnpm run generate:c-ops'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Get property by string key from global object (JS_GetPropertyStr)
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param key_ptr Property name/key string; must be null-terminated if maybe_name_len is not set
 * @param key_len Property name/key length
 */
QTS_CommandStatus perform_global_get_str(QTS_CommandEnv *env, JSValueSlot result_slot, char *key_ptr, uint32_t key_len) {
    OP_UNIMPLEMENTED(env, "perform_global_get_str");
}
