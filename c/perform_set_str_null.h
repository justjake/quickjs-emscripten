// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run generate:c-ops'
#ifndef QTS_PERFORM_SET_STR_NULL_H
#define QTS_PERFORM_SET_STR_NULL_H

#include "command.h"

/**
 * Set property by string key to null
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param flags SetPropFlags: property flags controlling set vs define behavior
 * @param key_ptr Property name/key string; must be null-terminated if maybe_name_len is not set
 * @param key_len Property name/key length
 */
QTS_CommandStatus perform_set_str_null(QTS_CommandEnv *env, JSValueSlot target_slot, SetPropFlags flags, char *key_ptr, uint32_t key_len);

#endif // QTS_PERFORM_SET_STR_NULL_H
