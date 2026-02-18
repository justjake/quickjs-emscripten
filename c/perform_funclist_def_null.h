// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run generate:c-ops'
#ifndef QTS_PERFORM_FUNCLIST_DEF_NULL_H
#define QTS_PERFORM_FUNCLIST_DEF_NULL_H

#include "command.h"

/**
 * Set funclist entry to JS_DEF_PROP_NULL
 * @param env Command execution environment
 * @param target_funclist_slot Target funclist to modify
 * @param flags JS_PROP_* property flags
 * @param key_ptr Property name/key string; must be null-terminated if maybe_name_len is not set
 * @param key_len Property name/key length
 * @param index Index to set in the target funclist (uint32_t)
 */
QTS_CommandStatus perform_funclist_def_null(QTS_CommandEnv *env, FuncListSlot target_funclist_slot, JSPropFlags flags, char *key_ptr, uint32_t key_len, uint32_t index);

#endif // QTS_PERFORM_FUNCLIST_DEF_NULL_H
