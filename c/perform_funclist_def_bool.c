#include "perform_funclist_def_bool.h"

// Perform op FUNCLIST_DEF_BOOL
// To change function signature, update scripts/idl.ts and run 'pnpm run ops:c'.
// Add new utilities to qts_utils.{h,c} if needed.

// quickjs-ng doesn't have JS_PROP_BOOL_DEF, fall back to INT32
#ifndef JS_PROP_BOOL_DEF
#define JS_PROP_BOOL_DEF(name, val, prop_flags) JS_PROP_INT32_DEF(name, (val) ? 1 : 0, prop_flags)
#endif

/**
 * Set funclist entry to JS_DEF_PROP_BOOL
 * @param env Command execution environment
 * @param target_funclist_slot Target funclist to modify
 * @param maybe_key_len if >0, length of key_ptr. if 0, key_ptr is null-terminated
 * @param flags JS_PROP_* property flags
 * @param index Index to set in the target funclist (uint32_t)
 * @param bool_val Boolean value as 0 or 1
 * @param key_ptr Property name/key string; must be null-terminated if maybe_name_len is not set
 */
QTS_CommandStatus perform_funclist_def_bool(QTS_CommandEnv *env, FuncListSlot target_funclist_slot, uint8_t maybe_key_len, JSPropFlags flags, uint32_t index, int32_t bool_val, char *key_ptr) {
    QTS_FuncList *funclist = OP_GET_FUNCLIST(env, target_funclist_slot, "funclist_def_bool");
    OP_ERROR_IF(env, index >= funclist->count, "funclist_def_bool: index out of range");

    funclist->entries[index] = (JSCFunctionListEntry)JS_PROP_BOOL_DEF(key_ptr, bool_val, flags);

    return QTS_COMMAND_OK;
}
