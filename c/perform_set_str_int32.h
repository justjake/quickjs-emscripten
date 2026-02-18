// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run generate:c-ops'
#ifndef QTS_PERFORM_SET_STR_INT32_H
#define QTS_PERFORM_SET_STR_INT32_H

#include "command.h"

/**
 * Set property by string key to int32
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param flags JS_PROP_* property flags
 * @param key_ptr Property name/key string; must be null-terminated if maybe_name_len is not set
 * @param key_len Property name/key length
 * @param int_val The int32 value
 */
QTS_CommandStatus perform_set_str_int32(QTS_CommandEnv *env, JSValueSlot target_slot, JSPropFlags flags, char *key_ptr, uint32_t key_len, int32_t int_val);

#endif // QTS_PERFORM_SET_STR_INT32_H
