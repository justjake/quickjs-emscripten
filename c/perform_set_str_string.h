// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run ops:c'
#ifndef QTS_PERFORM_SET_STR_STRING_H
#define QTS_PERFORM_SET_STR_STRING_H

#include "command.h"

/**
 * Set property by string key to string value
 * @param env Command execution environment
 * @param target_slot Object slot
 * @param maybe_key_len if >0, length of key_ptr. if 0, key_ptr is null-terminated
 * @param flags SetPropFlags: property flags controlling set vs define behavior
 * @param str_ptr String value pointer
 * @param str_len String value length
 * @param key_ptr Property name/key string; must be null-terminated if maybe_name_len is not set
 */
QTS_CommandStatus perform_set_str_string(QTS_CommandEnv *env, JSValueSlot target_slot, uint8_t maybe_key_len, SetPropFlags flags, char *str_ptr, uint32_t str_len, char *key_ptr);

#endif // QTS_PERFORM_SET_STR_STRING_H
