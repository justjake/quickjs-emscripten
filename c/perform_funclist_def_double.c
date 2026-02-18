#include "perform_funclist_def_double.h"

// Perform op FUNCLIST_DEF_DOUBLE
// To change function signature, update scripts/idl.ts and run 'pnpm run generate:c-ops'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Set funclist entry to JS_DEF_PROP_DOUBLE (index in slot_c)
 * @param env Command execution environment
 * @param target_funclist_slot Target funclist to modify
 * @param index Index to set in the target funclist (0-255 / uint8_t)
 * @param flags JS_PROP_* property flags
 * @param f64_val The double value
 * @param key_ptr Property name/key string; must be null-terminated if maybe_name_len is not set
 */
QTS_CommandStatus perform_funclist_def_double(QTS_CommandEnv *env, FuncListSlot target_funclist_slot, uint8_t index, JSPropFlags flags, double f64_val, char *key_ptr) {
    QTS_FuncList *funclist = OP_GET_FUNCLIST(env, target_funclist_slot, "funclist_def_double");
    OP_ERROR_IF(env, index >= funclist->count, "funclist_def_double: index out of range");

    // Use JS_PROP_DOUBLE_DEF macro
    funclist->entries[index] = (JSCFunctionListEntry)JS_PROP_DOUBLE_DEF(key_ptr, f64_val, flags);

    return QTS_COMMAND_OK;
}
