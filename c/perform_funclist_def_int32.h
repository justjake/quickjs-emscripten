// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run ops:c'
#ifndef QTS_PERFORM_FUNCLIST_DEF_INT32_H
#define QTS_PERFORM_FUNCLIST_DEF_INT32_H

#include "command.h"

/**
 * Set funclist entry to JS_DEF_PROP_INT32
 * @param env Command execution environment
 * @param target_funclist_slot Target funclist to modify
 * @param maybe_key_len if >0, length of key_ptr. if 0, key_ptr is null-terminated
 * @param flags JS_PROP_* property flags
 * @param index Index to set in the target funclist (uint32_t)
 * @param int_val The int32 value
 * @param key_ptr Property name/key string; must be null-terminated if maybe_name_len is not set
 */
QTS_CommandStatus perform_funclist_def_int32(QTS_CommandEnv *env, FuncListSlot target_funclist_slot, uint8_t maybe_key_len, JSPropFlags flags, uint32_t index, int32_t int_val, char *key_ptr);

#endif // QTS_PERFORM_FUNCLIST_DEF_INT32_H
