// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run generate:c-ops'
#ifndef QTS_PERFORM_SET_STR_BOOL_H
#define QTS_PERFORM_SET_STR_BOOL_H

#include "command.h"

/**
 * Set property by string key to boolean
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param bool_val Boolean value (0 or 1)
 * @param flags JS_PROP_* property flags
 * @param key_ptr Property name/key string; must be null-terminated if maybe_name_len is not set
 * @param key_len Property name/key length
 */
QTS_CommandStatus perform_set_str_bool(QTS_CommandEnv *env, JSValueSlot target_slot, uint8_t bool_val, JSPropFlags flags, char *key_ptr, uint32_t key_len);

#endif // QTS_PERFORM_SET_STR_BOOL_H
