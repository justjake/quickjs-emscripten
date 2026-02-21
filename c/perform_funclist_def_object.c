#include "perform_funclist_def_object.h"

// Perform op FUNCLIST_DEF_OBJECT
// To change function signature, update scripts/idl.ts and run 'pnpm run ops:c'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Set funclist entry to JS_DEF_OBJECT (nested object with its own funclist)
 * @param env Command execution environment
 * @param target_funclist_slot Target funclist to modify
 * @param object_funclist_slot A funclist defining the properties of the nested object to create
 * @param flags JS_PROP_* property flags
 * @param key_ptr Property name/key string; must be null-terminated if maybe_name_len is not set
 * @param key_len Property name/key length
 * @param index Index to set in the target funclist (uint32_t)
 */
QTS_CommandStatus perform_funclist_def_object(QTS_CommandEnv *env, FuncListSlot target_funclist_slot, FuncListSlot object_funclist_slot, JSPropFlags flags, char *key_ptr, uint32_t key_len, uint32_t index) {
    QTS_FuncList *funclist = OP_GET_FUNCLIST(env, target_funclist_slot, "funclist_def_object target");
    QTS_FuncList *object_funclist = OP_GET_FUNCLIST(env, object_funclist_slot, "funclist_def_object object");
    OP_ERROR_IF(env, index >= funclist->count, "funclist_def_object: index out of range");

    // Use JS_OBJECT_DEF macro
    funclist->entries[index] = (JSCFunctionListEntry)JS_OBJECT_DEF(
        key_ptr,
        object_funclist->entries,
        object_funclist->count,
        flags
    );

    return QTS_COMMAND_OK;
}
