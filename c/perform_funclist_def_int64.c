#include "perform_funclist_def_int64.h"

// Perform op FUNCLIST_DEF_INT64
// To change function signature, update scripts/idl.ts and run 'pnpm run generate:c-ops'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Set funclist entry to JS_DEF_PROP_INT64 (index in slot_c)
 * @param env Command execution environment
 * @param target_funclist_slot Target funclist to modify
 * @param index Index to set in the target funclist (0-255 / uint8_t)
 * @param flags JS_PROP_* property flags
 * @param i64_val The int64 value
 * @param name_ptr Property name pointer (MUST be null-terminated)
 */
QTS_CommandStatus perform_funclist_def_int64(QTS_CommandEnv *env, FuncListSlot target_funclist_slot, uint8_t index, JSPropFlags flags, int64_t i64_val, char *name_ptr) {
    OP_UNIMPLEMENTED(env, "perform_funclist_def_int64");
}
