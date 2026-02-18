#include "perform_funclist_def_cgetset.h"

// Perform op FUNCLIST_DEF_CGETSET
// To change function signature, update scripts/idl.ts and run 'pnpm run generate:c-ops'.
// Add new utilities to qts_utils.{h,c} if needed.

/**
 * Set funclist entry to JS_DEF_CGETSET
 * @param env Command execution environment
 * @param target_funclist_slot Target funclist to modify
 * @param index Index to set in the target funclist (0-255 / uint8_t)
 * @param flags JS_PROP_* property flags
 * @param key_ptr Property name/key string; must be null-terminated if maybe_name_len is not set
 * @param getter_ptr Getter c function pointer (0=no getter)
 * @param setter_ptr Setter c function pointer (0=no setter)
 */
QTS_CommandStatus perform_funclist_def_cgetset(QTS_CommandEnv *env, FuncListSlot target_funclist_slot, uint8_t index, JSPropFlags flags, char *key_ptr, JSCFunctionType *getter_ptr, JSCFunctionType *setter_ptr) {
    QTS_FuncList *funclist = OP_GET_FUNCLIST(env, target_funclist_slot, "funclist_def_cgetset");
    OP_ERROR_IF(env, index >= funclist->count, "funclist_def_cgetset: index out of range");

    // Use JS_CGETSET_DEF macro pattern, with custom flags
    funclist->entries[index] = (JSCFunctionListEntry)JS_CGETSET_DEF(
        key_ptr,
        getter_ptr ? getter_ptr->getter : NULL,
        setter_ptr ? setter_ptr->setter : NULL
    );
    funclist->entries[index].prop_flags = flags;

    return QTS_COMMAND_OK;
}
