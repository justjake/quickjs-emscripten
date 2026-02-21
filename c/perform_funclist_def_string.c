#include "perform_funclist_def_string.h"

// Perform op FUNCLIST_DEF_STRING
// To change function signature, update scripts/idl.ts and run 'pnpm run ops:c'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Set funclist entry to JS_DEF_PROP_STRING
 * @param env Command execution environment
 * @param target_funclist_slot Target funclist to modify
 * @param index Index to set in the target funclist (0-255 / uint8_t)
 * @param flags JS_PROP_* property flags
 * @param str_ptr String value pointer
 * @param str_len String value length
 * @param name_ptr Property name pointer (MUST be null-terminated)
 */
QTS_CommandStatus perform_funclist_def_string(QTS_CommandEnv *env, FuncListSlot target_funclist_slot, uint8_t index, JSPropFlags flags, char *str_ptr, uint32_t str_len, char *name_ptr) {
    QTS_FuncList *funclist = OP_GET_FUNCLIST(env, target_funclist_slot, "funclist_def_string");
    OP_ERROR_IF(env, index >= funclist->count, "funclist_def_string: index out of range");

    // Use JS_PROP_STRING_DEF macro
    // Note: str_ptr must be null-terminated for JS_DEF_PROP_STRING to work correctly
    funclist->entries[index] = (JSCFunctionListEntry)JS_PROP_STRING_DEF(name_ptr, str_ptr, flags);

    return QTS_COMMAND_OK;
}
