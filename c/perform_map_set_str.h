// Generated - do not edit. To change, update scripts/idl.ts and run 'pnpm run generate:c-ops'
#ifndef QTS_PERFORM_MAP_SET_STR_H
#define QTS_PERFORM_MAP_SET_STR_H

#include "command.h"

/**
 * Call map.set(key, value) with string key
 * @param env Command execution environment
 * @param target_slot Target object to modify
 * @param value_slot slot containing value
 * @param key_ptr Key string pointer
 * @param key_len Key string length
 */
QTS_CommandStatus perform_map_set_str(QTS_CommandEnv *env, JSValueSlot target_slot, JSValueSlot value_slot, char *key_ptr, uint32_t key_len);

#endif // QTS_PERFORM_MAP_SET_STR_H
