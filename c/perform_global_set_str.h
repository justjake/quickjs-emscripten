// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run generate:c-ops'
#ifndef QTS_PERFORM_GLOBAL_SET_STR_H
#define QTS_PERFORM_GLOBAL_SET_STR_H

#include "command.h"

/**
 * Set property by string key on global object (JS_SetPropertyStr)
 * @param env Command execution environment
 * @param value_slot slot containing value
 * @param flags JS_PROP_* property flags
 * @param key_ptr Property name/key string; must be null-terminated if maybe_name_len is not set
 * @param key_len Property name/key length
 */
QTS_CommandStatus perform_global_set_str(QTS_CommandEnv *env, JSValueSlot value_slot, JSPropFlags flags, char *key_ptr, uint32_t key_len);

#endif // QTS_PERFORM_GLOBAL_SET_STR_H
