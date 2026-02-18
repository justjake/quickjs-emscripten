// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run generate:c-ops'
#ifndef QTS_PERFORM_SET_STR_F64_H
#define QTS_PERFORM_SET_STR_F64_H

#include "command.h"

/**
 * Set property by string key to float64
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param maybe_key_len if >0, length of key_ptr. if 0, key_ptr is null-terminated
 * @param flags JS_PROP_* property flags
 * @param f64_val The float64 value
 * @param key_ptr Property name/key string; must be null-terminated if maybe_name_len is not set
 */
QTS_CommandStatus perform_set_str_f64(QTS_CommandEnv *env, JSValueSlot target_slot, uint8_t maybe_key_len, JSPropFlags flags, double f64_val, char *key_ptr);

#endif // QTS_PERFORM_SET_STR_F64_H
