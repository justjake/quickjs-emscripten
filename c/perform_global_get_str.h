// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run ops:c'
#ifndef QTS_PERFORM_GLOBAL_GET_STR_H
#define QTS_PERFORM_GLOBAL_GET_STR_H

#include "command.h"

/**
 * Get property by string key from global object (JS_GetPropertyStr)
 * @param env Command execution environment
 * @param result_slot result will be written to this slot
 * @param key_ptr Property name/key string; must be null-terminated if maybe_name_len is not set
 * @param key_len Property name/key length
 */
QTS_CommandStatus perform_global_get_str(QTS_CommandEnv *env, JSValueSlot result_slot, char *key_ptr, uint32_t key_len);

#endif // QTS_PERFORM_GLOBAL_GET_STR_H
